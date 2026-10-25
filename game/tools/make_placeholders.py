#!/usr/bin/env python3
"""Tạo ảnh tạm cho bản chơi thử Level 1 từ hai tranh chuẩn (art/out/demo/l1_demo_start.png, l1_demo_reveal.png).

Chỉ đọc art/, chỉ ghi game/placeholders/. Chạy lại bất cứ lúc nào:
    python game/tools/make_placeholders.py

- l1_bg_living_room: tranh l1_demo_reveal đã xoá mọi đồ chạm được, mèo, giao diện (tô lấp bằng khuếch tán + vân chì),
  vẽ lại cửa sổ dưới rèm. Thảm giữ trong nền (l1_rug_flat tạm là ảnh trống).
- Đồ vật: cắt từ tranh theo độ lệch so với nền đã xoá, rồi lấp lỗ bên trong.
- Thứ không cắt được (chim, tay bế, bàn chân gợi ý, lấp lánh, cá khô, tia nổ, rèm mở, góc thảm cuộn...): vẽ hình đơn giản.
Ảnh tạm ở đúng cỡ hiển thị (res = 1). Điểm neo ghi vào game/placeholders/placeholders.json.
"""
import json
import math
import re
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
DEMO = ROOT / "art" / "out" / "demo"
OUT = ROOT / "game" / "placeholders"
SPEC = ROOT / "art" / "design-art-level1.md"
BROWN = (107, 74, 58)

OUT.mkdir(parents=True, exist_ok=True)
import sys
sys.stdout.reconfigure(encoding="utf-8")
reveal = np.array(Image.open(DEMO / "l1_demo_reveal.png").convert("RGB")).astype(np.float32)
start = np.array(Image.open(DEMO / "l1_demo_start.png").convert("RGB")).astype(np.float32)
sua_ref = Image.open(ROOT / "art" / "out" / "cats" / "sua_ref.png").convert("RGBA")


def positions():
    pos = {}
    for line in SPEC.read_text(encoding="utf8").splitlines():
        m = re.match(r"\|\s*([a-z0-9_]+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|", line)
        if m:
            pos[m.group(1)] = (int(m.group(2)), int(m.group(3)))
    return pos


POS = positions()
meta = {}


# ---------- tô lấp (inpaint) ----------

def diffuse(img, mask, iters=80):
    """Lấp vùng mask bằng khuếch tán nhiều tầng (nghiệm Laplace xấp xỉ)."""
    img = img.copy()
    h, w = mask.shape
    if mask.any() and min(h, w) > 8:
        H, W = (h + 1) // 2, (w + 1) // 2
        pi = np.zeros((H * 2, W * 2, 3), np.float32)
        pk = np.zeros((H * 2, W * 2), np.float32)
        pi[:h, :w] = img * (~mask)[..., None]
        pk[:h, :w] = (~mask)
        si = pi.reshape(H, 2, W, 2, 3).sum((1, 3))
        sk = pk.reshape(H, 2, W, 2).sum((1, 3))
        small = si / np.maximum(sk, 1e-6)[..., None]
        smask = sk < 0.5
        small = diffuse(small, smask, iters)
        up = np.repeat(np.repeat(small, 2, 0), 2, 1)[:h, :w]
        img[mask] = up[mask]
    for _ in range(iters):
        p = np.pad(img, ((1, 1), (1, 1), (0, 0)), mode="edge")
        avg = (p[:-2, 1:-1] + p[2:, 1:-1] + p[1:-1, :-2] + p[1:-1, 2:]) / 4
        img[mask] = avg[mask]
    return img


def grain_from(img, box):
    x0, y0, x1, y1 = box
    patch = Image.fromarray(img[y0:y1, x0:x1].astype(np.uint8))
    hp = np.array(patch).astype(np.float32) - np.array(patch.filter(ImageFilter.GaussianBlur(3))).astype(np.float32)
    return hp


def add_grain(img, mask, grain):
    gh, gw = grain.shape[:2]
    h, w = mask.shape
    tile = np.tile(grain, (h // gh + 1, w // gw + 1, 1))[:h, :w]
    out = img.copy()
    out[mask] = np.clip(out[mask] + tile[mask], 0, 255)
    return out


def inpaint(img, rects, grain):
    mask = np.zeros(img.shape[:2], bool)
    for x0, y0, x1, y1 in rects:
        mask[y0:y1, x0:x1] = True
    return add_grain(diffuse(img, mask), mask, grain), mask


WALL_GRAIN = grain_from(reveal, (560, 200, 740, 420))

REVEAL_OBJECTS = {
    "hud": (25, 0, 565, 118), "pause": (890, 10, 1012, 118),
    "clock": (745, 168, 990, 602), "pillow": (182, 698, 448, 888),
    "cushion": (520, 702, 912, 902), "hand": (262, 858, 488, 1002),
    "sua_can": (318, 962, 748, 1318), "box": (58, 1098, 328, 1294),
    "plant": (742, 1025, 1022, 1360), "bulb": (856, 1362, 1014, 1516),
}
CURTAIN = (55, 192, 528, 662)

clean_wall, _ = inpaint(reveal, list(REVEAL_OBJECTS.values()) + [CURTAIN], WALL_GRAIN)


def row_copy(img, rect, src_x0, src_x1):
    """Lấp rect bằng cách chép từng hàng từ cùng hàng ở dải cột [src_x0, src_x1) (lặp lại). Hợp với vân ngang."""
    x0, y0, x1, y1 = rect
    w = src_x1 - src_x0
    cols = src_x0 + (np.arange(x0, x1) - x0) % w
    img[y0:y1, x0:x1] = img[y0:y1][:, cols]


# Nền tạm: tường lấp bằng khuếch tán, sofa chép theo hàng / lấy đối xứng, sàn dựng lại, bỏ thảm.
bg = reveal.copy()
for k in ("hud", "pause", "clock"):
    x0, y0, x1, y1 = REVEAL_OBJECTS[k]
    bg[y0:y1, x0:x1] = clean_wall[y0:y1, x0:x1]
row_copy(bg, REVEAL_OBJECTS["pillow"], 445, 505)
row_copy(bg, REVEAL_OBJECTS["hand"], 185, 262)
for x0, y0, x1, y1 in ((520, 765, 905, 902), (520, 702, 850, 765)):
    bg[y0:y1, x0:x1] = bg[y0:y1, 1025 - x1 + 1:1025 - x0 + 1][:, ::-1]
row_copy(bg, (318, 962, 748, 1032), 130, 318)
# Sàn: khối hàng 1375–1536 (đã bỏ nút gợi ý) lặp lên tới y 1032.
row_copy(bg, (856, 1362, 1024, 1536), 690, 850)
block = bg[1375:1536].copy()
for y in range(1032, 1375):
    bg[y] = block[(y - 1375) % block.shape[0]]
clean = bg


# Cửa sổ vẽ lại dưới rèm (rèm mở sẽ thấy).
win = Image.fromarray(clean.astype(np.uint8))
d = ImageDraw.Draw(win)
wood, glass = (214, 164, 114), (184, 218, 242)
d.rounded_rectangle((64, 194, 514, 642), 6, fill=wood, outline=BROWN, width=4)
d.rectangle((86, 214, 492, 622), fill=glass, outline=BROWN, width=3)
d.line((289, 214, 289, 622), fill=wood, width=12)
d.line((86, 418, 492, 418), fill=wood, width=12)
d.line((289, 214, 289, 622), fill=BROWN, width=2)
d.line((86, 418, 492, 418), fill=BROWN, width=2)
for cx, cy, r in ((150, 300, 34), (190, 285, 42), (232, 302, 30), (370, 500, 26), (405, 488, 34)):
    d.ellipse((cx - r, cy - r * 0.7, cx + r, cy + r * 0.7), fill=(252, 250, 245))
d.rounded_rectangle((48, 628, 530, 660), 8, fill=wood, outline=BROWN, width=4)
win_arr = np.array(win).astype(np.float32)
wmask = np.zeros(clean.shape[:2], bool)
wmask[192:662, 48:532] = True
clean = add_grain(win_arr, wmask, WALL_GRAIN * 0.8)
Image.fromarray(clean.astype(np.uint8)).save(OUT / "l1_bg_living_room.png", optimize=True)
meta["l1_bg_living_room"] = {"ax": 0, "ay": 0, "res": 1}

# Nền sạch của tranh mở màn (để cắt nhân vật, bong bóng).
START_OBJECTS = {"player": (296, 776, 672, 1478), "bubble": (370, 415, 712, 702), "box": (82, 1098, 358, 1296),
                 "plant": (742, 1025, 1022, 1360)}
clean_start, _ = inpaint(start, list(START_OBJECTS.values()) + [REVEAL_OBJECTS["hud"], REVEAL_OBJECTS["pause"]],
                         grain_from(start, (560, 200, 740, 420)))


# ---------- cắt đồ vật ----------

FT = 18  # ngưỡng loang

def dilate(m, r=1):
    out = m.copy()
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1):
            out |= np.roll(np.roll(m, dy, 0), dx, 1)
    return out


def erode(m, r=1):
    return ~dilate(~m, r)


def fill_holes(m):
    h, w = m.shape
    outside = np.zeros_like(m)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if not m[y, x] and not outside[y, x]:
                outside[y, x] = True
                q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if not m[y, x] and not outside[y, x]:
                outside[y, x] = True
                q.append((y, x))
    while q:
        y, x = q.popleft()
        for yy, xx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
            if 0 <= yy < h and 0 <= xx < w and not m[yy, xx] and not outside[yy, xx]:
                outside[yy, xx] = True
                q.append((yy, xx))
    return ~outside


def keep_big(m, min_px=150):
    h, w = m.shape
    lab = np.zeros((h, w), np.int32)
    n, keep = 0, np.zeros_like(m)
    for y0, x0 in zip(*np.nonzero(m)):
        if lab[y0, x0]:
            continue
        n += 1
        lab[y0, x0] = n
        comp, q = [(y0, x0)], deque([(y0, x0)])
        while q:
            y, x = q.popleft()
            for yy, xx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
                if 0 <= yy < h and 0 <= xx < w and m[yy, xx] and not lab[yy, xx]:
                    lab[yy, xx] = n
                    q.append((yy, xx))
                    comp.append((yy, xx))
        if len(comp) >= min_px:
            ys, xs = zip(*comp)
            keep[list(ys), list(xs)] = True
    return keep


def flood_bg(a, thr, drift=32):
    """Loang từ mép ô: đi sang điểm kề nếu khác điểm hiện tại < thr và khác màu điểm xuất phát < drift.
    Nét viền nâu và đồ khác màu chặn lại. Trả về vùng nền."""
    h, w = a.shape[:2]
    seen = np.zeros((h, w), bool)
    origin = np.zeros((h, w, 3), np.int16)
    q = deque()
    border = [(y, x) for x in range(w) for y in (0, h - 1)] + [(y, x) for y in range(h) for x in (0, w - 1)]
    for y, x in border:
        if not seen[y, x]:
            seen[y, x] = True
            origin[y, x] = a[y, x]
            q.append((y, x))
    while q:
        y, x = q.popleft()
        c, o = a[y, x], origin[y, x]
        for yy, xx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
            if 0 <= yy < h and 0 <= xx < w and not seen[yy, xx]:
                n = a[yy, xx]
                if np.abs(n - c).max() < thr and np.abs(n - o).max() < drift:
                    seen[yy, xx] = True
                    origin[yy, xx] = o
                    q.append((yy, xx))
    return seen


def cutout(src, bg, box, thr=34, extra=None):
    """bg = None: cắt bằng loang từ mép (đồ có viền nâu). bg = ảnh nền sạch: cắt theo độ lệch với nền."""
    x0, y0, x1, y1 = box
    a = np.array(Image.fromarray(src[y0:y1, x0:x1].astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))).astype(np.int16)
    if bg is None:
        m = ~flood_bg(a, thr)
    else:
        b = Image.fromarray(bg[y0:y1, x0:x1].astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.5))
        diff = np.abs(a.astype(np.float32) - np.array(b).astype(np.float32)).max(axis=2)
        m = diff > thr
    m = erode(dilate(m, 2), 2)
    m = fill_holes(m)
    m = keep_big(m)
    if extra is not None:
        m = extra(m)
    alpha = Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8))
    rgba = np.dstack([src[y0:y1, x0:x1].astype(np.uint8), np.array(alpha)])
    return rgba, m


def save(key, rgba, anchor, crop_origin=None):
    """anchor: điểm neo trong ảnh. Nếu key có trong bảng vị trí và biết gốc cắt, neo = vị trí - gốc cắt (ảnh tạm rơi đúng chỗ trong tranh)."""
    im = Image.fromarray(rgba, "RGBA") if isinstance(rgba, np.ndarray) else rgba
    if crop_origin is not None and key in POS:
        anchor = (POS[key][0] - crop_origin[0], POS[key][1] - crop_origin[1])
    im.save(OUT / f"{key}.png", optimize=True)
    meta[key] = {"ax": round(anchor[0], 1), "ay": round(anchor[1], 1), "res": 1}
    return im


def crop_save(key, src, bg, box, anchor_mode="bottom", **kw):
    rgba, m = cutout(src, bg, box, **kw)
    ys, xs = np.nonzero(m)
    w, h = box[2] - box[0], box[3] - box[1]
    anchor = {"bottom": ((xs.min() + xs.max()) / 2, ys.max()), "top": ((xs.min() + xs.max()) / 2, ys.min()),
              "center": ((xs.min() + xs.max()) / 2, (ys.min() + ys.max()) / 2)}[anchor_mode]
    save(key, rgba, anchor, crop_origin=box[:2])
    return rgba, m


# Rèm: so với nền tường (chưa vẽ cửa sổ), chỉ lấy dải giữa khung cửa sổ.
def curtain_limit(m):
    m[:, :14] = False
    m[:, 448:] = False
    return m


curtain, _ = crop_save("l1_curtain_closed", reveal, clean_wall, (60, 180, 520, 652), "top", extra=curtain_limit)

# Rèm mở: hai nửa dồn về hai mép, buộc dải hồng.
cur = Image.fromarray(curtain, "RGBA")
cw, ch = cur.size
mid = 285 - 60
left, right = cur.crop((0, 0, mid, ch)), cur.crop((mid, 0, cw, ch))
opened = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
lw, rw = int(left.width * 0.3), int(right.width * 0.3)
opened.alpha_composite(left.resize((lw, ch), Image.LANCZOS), (0, 0))
opened.alpha_composite(right.resize((rw, ch), Image.LANCZOS), (cw - rw, 0))
d = ImageDraw.Draw(opened)
for x0 in (0, cw - rw):
    d.rounded_rectangle((x0 + 4, int(ch * 0.55), x0 + (lw if x0 == 0 else rw) - 4, int(ch * 0.55) + 22), 8,
                        fill=(248, 198, 204, 255), outline=BROWN + (255,), width=3)
save("l1_curtain_open", opened, (meta["l1_curtain_closed"]["ax"], meta["l1_curtain_closed"]["ay"]))

# Đồng hồ (thân, không quả lắc), quả lắc, đồng hồ mở.
clock, _ = crop_save("l1_wall_clock_closed", reveal, clean, (748, 168, 988, 480), "top")
pend, _ = crop_save("l1_wall_clock_pendulum", reveal, clean, (826, 487, 906, 600), "top")
meta["l1_wall_clock_pendulum"]["ay"] = POS["l1_wall_clock_pendulum"][1] - 487
op = Image.fromarray(clock, "RGBA")
d = ImageDraw.Draw(op)
dx, dy = 748, 168
d.rounded_rectangle((840 - dx, 270 - dy, 894 - dx, 324 - dy), 24, fill=(62, 44, 36, 255))
d.rectangle((840 - dx, 297 - dy, 894 - dx, 324 - dy), fill=(62, 44, 36, 255))
d.polygon([(894 - dx, 272 - dy), (912 - dx, 280 - dy), (912 - dx, 322 - dy), (894 - dx, 324 - dy)],
          fill=(196, 146, 98, 255), outline=BROWN + (255,))
save("l1_wall_clock_open", op, (meta["l1_wall_clock_closed"]["ax"], meta["l1_wall_clock_closed"]["ay"]))

# Chim cúc cu (vẽ): đầu + ngực xanh, mỏ há, que gỗ.
bird = Image.new("RGBA", (70, 90), (0, 0, 0, 0))
d = ImageDraw.Draw(bird)
d.rectangle((31, 55, 39, 90), fill=(196, 146, 98, 255), outline=BROWN + (255,), width=2)
d.ellipse((12, 30, 58, 68), fill=(150, 200, 236, 255), outline=BROWN + (255,), width=3)
d.ellipse((18, 6, 52, 40), fill=(170, 214, 242, 255), outline=BROWN + (255,), width=3)
d.polygon([(10, 22), (20, 18), (20, 26)], fill=(247, 170, 90, 255), outline=BROWN + (255,))
d.polygon([(10, 30), (20, 27), (20, 32)], fill=(247, 170, 90, 255), outline=BROWN + (255,))
d.ellipse((26, 17, 32, 23), fill=BROWN + (255,))
save("l1_wall_clock_bird", bird, (35, 90))

# Chậu cây và bướm: tách bướm theo màu (bướm vàng/hồng, lá xanh).
PLANT_BOX = (742, 1025, 1022, 1360)
prgba, pm = cutout(reveal, None, PLANT_BOX, thr=FT)
x0, y0 = PLANT_BOX[:2]
rgb = reveal[y0:PLANT_BOX[3], x0:PLANT_BOX[2]]
bm = np.zeros_like(pm)
bx0, by0, bx1, by1 = 912 - x0, 1028 - y0, 1006 - x0, 1120 - y0
sub = rgb[by0:by1, bx0:bx1]
warm = (sub[..., 0] > sub[..., 1] + 6) | ((sub.max(2) < 120) & (sub[..., 1] < sub[..., 0] + 10))
bm[by0:by1, bx0:bx1] = warm & pm[by0:by1, bx0:bx1]
bm = fill_holes(dilate(bm, 1)) & pm
bys, bxs = np.nonzero(bm)
bfly = np.zeros((bm.shape[0], bm.shape[1], 4), np.uint8)
bfly[..., :3] = rgb.astype(np.uint8)
bfly[..., 3] = (bm * 255).astype(np.uint8)
bb = (bxs.min(), bys.min(), bxs.max() + 1, bys.max() + 1)
bimg = Image.fromarray(bfly, "RGBA").crop(bb)
save("prop_butterfly", bimg, (bimg.width / 2, bimg.height / 2))
meta["prop_butterfly"]["home"] = [x0 + (bb[0] + bb[2]) / 2, y0 + (bb[1] + bb[3]) / 2]
# Bỏ bướm khỏi chậu cây (chỗ đó để trống, bướm đậu che lên).
prgba[..., 3] = np.where(bm, 0, prgba[..., 3])
ys, xs = np.nonzero(pm)
save("l1_plant", prgba, ((xs.min() + xs.max()) / 2, ys.max()), crop_origin=PLANT_BOX[:2])

# Hộp các-tông, gối, Sữa, bàn tay, nút gợi ý.
box, bmask = crop_save("l1_box_closed", reveal, None, REVEAL_OBJECTS["box"], "bottom", thr=FT)
def pillow_limit(m):
    m[868 - 690:, 268 - 176:] = False  # bỏ ống tay áo của bàn tay hướng dẫn
    return m


pil, _ = crop_save("l1_pillow_white_idle", reveal, None, (176, 690, 452, 896), "bottom", thr=FT, extra=pillow_limit)


def sua_limit(m):
    # bỏ phần hộp pate (bên phải, dưới) và bàn tay hướng dẫn (trên trái)
    m[1135 - 962:, 578 - 318:] = False
    m[:1000 - 962, :425 - 318] = False
    m[:, 615 - 318:] = False
    return m


sua, _ = crop_save("sua_sit_stare", reveal, None, REVEAL_OBJECTS["sua_can"], "bottom", thr=FT, extra=sua_limit)
hand, hm = crop_save("ui_hand_pointer", reveal, None, REVEAL_OBJECTS["hand"], "bottom", thr=FT)
meta["ui_hand_pointer"]["ax"], meta["ui_hand_pointer"]["ay"] = 408 - 262, 990 - 858  # đầu ngón trỏ
bulb, _ = crop_save("ui_bulb_button", reveal, None, REVEAL_OBJECTS["bulb"], "center", thr=FT)
player, _ = crop_save("player_call", start, None, START_OBJECTS["player"], "bottom", thr=FT)

# Hộp mở (vẽ thêm nắp và lòng hộp lên hộp đóng).
bx = Image.fromarray(box, "RGBA")
W, H = bx.size
canvas = Image.new("RGBA", (W + 80, H + 50), (0, 0, 0, 0))
canvas.alpha_composite(bx, (40, 50))
d = ImageDraw.Draw(canvas)
ys, xs = np.nonzero(bmask)
top = 50 + ys.min()
L, R = 40 + xs.min(), 40 + xs.max()
caramel, dark = (214, 164, 114, 255), (150, 104, 70, 255)
d.polygon([(L + 20, top + 6), (R - 60, top + 6), (R - 10, top + 30), (L + 60, top + 30)], fill=dark, outline=BROWN + (255,))
d.polygon([(L + 20, top + 6), (L - 30, top - 30), (L + 10, top + 34)], fill=caramel, outline=BROWN + (255,))
d.polygon([(R - 10, top + 30), (R + 30, top - 10), (R - 60, top + 6)], fill=caramel, outline=BROWN + (255,))
d.polygon([(L + 30, top + 6), (R - 70, top + 6), (R - 80, top - 45), (L + 40, top - 45)], fill=caramel, outline=BROWN + (255,))
save("l1_box_open_empty", canvas, (meta["l1_box_closed"]["ax"] + 40, meta["l1_box_closed"]["ay"] + 50))

# Gối lật: dựng đứng (xoay) cho đỡ giống tai mèo.
pl = Image.fromarray(pil, "RGBA").rotate(78, expand=True, resample=Image.BICUBIC)
pl = pl.crop(pl.getbbox())
save("l1_pillow_white_flipped", pl, (pl.width / 2, pl.height))

# Tư thế Sữa tạm: cùng một ảnh ngồi (ăn: nghiêng về phải).
for k in ("sua_meow_up",):
    save(k, sua, (meta["sua_sit_stare"]["ax"], meta["sua_sit_stare"]["ay"]))
s_img = Image.fromarray(sua, "RGBA")
for k, ang in (("sua_eat", -10), ("sua_eat_f2", -6)):
    r = s_img.rotate(ang, center=(meta["sua_sit_stare"]["ax"], meta["sua_sit_stare"]["ay"]), resample=Image.BICUBIC)
    save(k, r, (meta["sua_sit_stare"]["ax"], meta["sua_sit_stare"]["ay"]))
for k in ("player_scratch_head", "player_surprised", "player_shrug"):
    save(k, player, (meta["player_call"]["ax"], meta["player_call"]["ay"]))

# Sữa bế, mặt Sữa: từ sua_ref (tư thế ngồi nhìn thẳng).
front = sua_ref.crop((18, 236, 480, 778))
held = front.resize((int(front.width * 0.85), int(front.height * 0.85 * 1.25)), Image.LANCZOS)
save("sua_held", held, (held.width / 2, held.height * 0.42))
head = sua_ref.crop((18, 236, 480, 590))
head = head.resize((165, int(165 * head.height / head.width)), Image.LANCZOS)
save("sua_face_icon", head, (head.width / 2, head.height / 2))
a = np.array(head.getchannel("A")) > 100
dark = np.zeros((head.height, head.width, 4), np.uint8)
dark[..., :3] = (91, 84, 112)
ring = dilate(a, 2) & ~erode(a, 1)
dark[ring, :3] = BROWN
dark[..., 3] = (dilate(a, 2) * 255).astype(np.uint8)
save("ui_cat_head_dark", Image.fromarray(dark, "RGBA"), (head.width / 2, head.height / 2))


# ---------- hình vẽ đơn giản ----------

def blank(w, h):
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    return im, ImageDraw.Draw(im)


def heart(d, cx, cy, s, fill):
    d.ellipse((cx - s, cy - s * 0.8, cx, cy + s * 0.2), fill=fill, outline=BROWN + (255,), width=3)
    d.ellipse((cx, cy - s * 0.8, cx + s, cy + s * 0.2), fill=fill, outline=BROWN + (255,), width=3)
    d.polygon([(cx - s + 1, cy - 0.1 * s), (cx + s - 1, cy - 0.1 * s), (cx, cy + s)], fill=fill, outline=BROWN + (255,))
    d.ellipse((cx - s + 4, cy - s * 0.8 + 4, cx - 4, cy + s * 0.2 - 4), fill=fill)
    d.ellipse((cx + 4, cy - s * 0.8 + 4, cx + s - 4, cy + s * 0.2 - 4), fill=fill)
    d.polygon([(cx - s + 6, cy - 0.1 * s), (cx + s - 6, cy - 0.1 * s), (cx, cy + s - 6)], fill=fill)


im, d = blank(64, 60)
heart(d, 32, 28, 28, (247, 160, 175, 255))
save("ui_heart", im, (32, 30))

# Bong bóng lời thoại.
im, d = blank(340, 290)
d.polygon([(110, 220), (150, 222), (95, 285)], fill=(255, 252, 244, 255), outline=BROWN + (255,))
d.ellipse((6, 6, 334, 236), fill=(255, 252, 244, 255), outline=BROWN + (255,), width=5)
d.polygon([(112, 214), (148, 216), (99, 276)], fill=(255, 252, 244, 255))
d.line([(110, 226), (96, 282), (150, 228)], fill=BROWN + (255,), width=5, joint="curve")
save("ui_speech_bubble", im, (96, 284))
meta["ui_speech_bubble"]["inner"] = [170, 122]


def qmark(color):
    im, d = blank(60, 86)
    for width, col in ((16, BROWN + (255,)), (9, color)):
        d.arc((8, 4, 52, 46), 180, 90, fill=col, width=width)
        d.line([(30, 45), (30, 58)], fill=col, width=width)
    d.ellipse((21, 66, 39, 84), fill=BROWN + (255,))
    d.ellipse((24, 69, 36, 81), fill=color)
    return im


save("ui_question_mark_white", qmark((255, 253, 248, 255)), (30, 43))
save("ui_question_mark", qmark((247, 185, 163, 255)), (30, 43))

# Lấp lánh 4 cánh.
im, d = blank(64, 64)
pts = []
for i in range(8):
    r = 30 if i % 2 == 0 else 9
    ang = math.pi / 2 * (i / 2) - math.pi / 2
    pts.append((32 + r * math.cos(ang), 32 + r * math.sin(ang)))
d.polygon(pts, fill=(252, 227, 154, 255), outline=BROWN + (255,))
save("ui_sparkle", im, (32, 32))

# Tia nổ "tách".
im, d = blank(200, 200)
for i in range(6):
    ang = i * math.pi / 3 + 0.3
    x1, y1 = 100 + 52 * math.cos(ang), 100 + 52 * math.sin(ang)
    x2, y2 = 100 + 92 * math.cos(ang), 100 + 92 * math.sin(ang)
    d.line([(x1, y1), (x2, y2)], fill=BROWN + (255,), width=13)
    d.line([(x1, y1), (x2, y2)], fill=(252, 227, 154, 255), width=7)
pts = []
for i in range(16):
    r = 50 if i % 2 == 0 else 30
    ang = i * math.pi / 8
    pts.append((100 + r * math.cos(ang), 100 + r * math.sin(ang)))
d.polygon(pts, fill=(252, 227, 154, 255), outline=BROWN + (255,))
for ang in (0.9, 2.6, 4.4):
    x, y = 100 + 80 * math.cos(ang), 100 + 80 * math.sin(ang)
    d.ellipse((x - 6, y - 6, x + 6, y + 6), fill=(247, 185, 163, 255), outline=BROWN + (255,))
save("fx_pop", im, (100, 100))

# Cá khô.
im, d = blank(84, 44)
d.ellipse((6, 6, 62, 38), fill=(214, 164, 114, 255), outline=BROWN + (255,), width=3)
d.polygon([(58, 22), (80, 6), (80, 38)], fill=(214, 164, 114, 255), outline=BROWN + (255,))
d.ellipse((16, 16, 24, 24), fill=BROWN + (255,))
for x in (32, 40, 48):
    d.line([(x, 12), (x, 32)], fill=BROWN + (255,), width=2)
save("ui_dried_fish", im, (42, 22))

# Bàn chân mèo gợi ý.
im, d = blank(140, 150)
d.ellipse((30, 60, 110, 140), fill=(255, 252, 244, 255), outline=BROWN + (255,), width=4)
for cx, cy in ((30, 52), (58, 30), (86, 30), (112, 52)):
    d.ellipse((cx - 15, cy - 17, cx + 15, cy + 17), fill=(255, 252, 244, 255), outline=BROWN + (255,), width=4)
    d.ellipse((cx - 7, cy - 8, cx + 7, cy + 8), fill=(247, 185, 175, 255))
d.ellipse((50, 85, 90, 120), fill=(247, 185, 175, 255))
save("ui_hint_paw", im, (70, 14))

# Đôi tay bế (cẳng tay dài tới mép dưới).
im, d = blank(520, 1400)
skin, sweater = (250, 214, 190, 255), (252, 227, 154, 255)
for x0 in (20, 380):
    d.rounded_rectangle((x0, 300, x0 + 120, 1440), 40, fill=sweater, outline=BROWN + (255,), width=4)
    d.rounded_rectangle((x0 + 10, 120, x0 + 110, 330), 46, fill=skin, outline=BROWN + (255,), width=4)
    d.line([(x0 + 4, 300), (x0 + 116, 300)], fill=BROWN + (255,), width=4)
save("player_hands_lift", im, (260, 1400))
meta["player_hands_lift"]["grip"] = [260, 190]

# Thảm (vẽ): elip hồng có viền, màu lấy từ tranh. Cuộn = góc trước bên trái lật lên.
rim = tuple(int(v) for v in reveal[1215:1225, 12:22].reshape(-1, 3).mean(0)) + (255,)
inner = tuple(int(v) for v in reveal[1318:1328, 470:530].reshape(-1, 3).mean(0)) + (255,)
RW, RH, cx, cy, rx, ry = 1100, 330, 550, 165, 545, 157


def rug_image():
    im, d = blank(RW, RH)
    d.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), fill=rim, outline=BROWN + (255,), width=3)
    d.ellipse((cx - rx + 30, cy - ry + 22, cx + rx - 30, cy + ry - 22), fill=inner,
              outline=tuple(max(0, c - 25) for c in rim[:3]) + (255,), width=2)
    arr = np.array(im).astype(np.float32)
    m = arr[..., 3] > 0
    arr[..., :3] = add_grain(arr[..., :3], m, WALL_GRAIN * 1.4)
    return Image.fromarray(arr.astype(np.uint8), "RGBA")


flat = rug_image()
save("l1_rug_flat", flat, (cx, cy - ry))
cur = rug_image()
pt = lambda deg, k=1.0: (cx + rx * k * math.cos(math.radians(deg)), cy + ry * k * math.sin(math.radians(deg)))
A, B = pt(112), pt(158)
d = ImageDraw.Draw(cur)
d.polygon([A, pt(120, 1.3), pt(140, 1.4), pt(160, 1.3), B], fill=(0, 0, 0, 0))
A2, B2 = (A[0] + 25, A[1] - 95), (B[0] + 70, B[1] - 70)
d.polygon([A, B, B2, A2], fill=(252, 226, 230, 255), outline=BROWN + (255,))
d.line([A2, B2], fill=rim, width=26)
d.line([A2, B2], fill=BROWN + (255,), width=3)
save("l1_rug_curled", cur, (cx, cy - ry))

# G10: đuôi thò ra (sua_tail_peek) và dáng chạy vụt (sua_run), tạm lấy từ ảnh thật của Sữa.
eat = Image.open(ROOT / "art" / "out" / "cats" / "sua_eat.png").convert("RGBA")
tail = eat.crop((20, 65, 178, 268))
tail = tail.resize((tail.width * 2 // 3, tail.height * 2 // 3), Image.LANCZOS)  # ~ cỡ hiển thị
save("sua_tail_peek", tail, (tail.width * 0.5, tail.height - 2))
sit = Image.open(ROOT / "art" / "out" / "cats" / "sua_sit_stare.png").convert("RGBA")
sit = sit.crop(sit.getbbox())
run = sit.resize((int(sit.width / 1.5 * 1.3), int(sit.height / 1.5 * 0.8)), Image.LANCZOS).rotate(-10, expand=True, resample=Image.BICUBIC)
run = run.crop(run.getbbox())
save("sua_run", run, (run.width / 2, run.height))

meta["_note"] = "Ảnh tạm do game/tools/make_placeholders.py sinh ra từ art/out/demo; res = 1 (cỡ hiển thị)."
(OUT / "placeholders.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1), encoding="utf8")
print("xong:", len(meta) - 1, "ảnh tạm ->", OUT)
