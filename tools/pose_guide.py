"""Tờ dáng mẫu (pose guide) cho chu kỳ đi của mèo nhìn nghiêng, đi sang phải.

Hình bóng xám đơn giản, đặt đúng ô của tờ Codex (1536x1024, 2x2 ô 768x512), để gửi kèm làm ảnh tham chiếu
(--ref) cho image_gen: chỉ để chốt VỊ TRÍ CHÂN, độ nhún thân, đuôi. Không dùng làm ảnh trong game.
  chân phía xa  = xám nhạt, thân/đầu = xám vừa, chân phía gần = xám đậm. Không chữ, không số.

Nhịp đi mèo thật (4 nhịp, thứ tự chân: sau-gần, trước-gần, sau-xa, trước-xa, mỗi chân lệch 1 khung):
mỗi chân đi 4 pha: 0 duỗi trước chạm sàn, 1 dưới thân, 2 duỗi sau (gót nhấc), 3 nhấc cong đưa ra trước.

  python tools/pose_guide.py <ra.png> [--gif <xem_thu.gif>]
"""
import math
import sys

from PIL import Image, ImageDraw

CW, CHH = 768, 512
CELLS = [(0, 0), (768, 0), (0, 512), (768, 512)]
GROUND = 470
SS = 2  # vẽ to 2 lần rồi thu nhỏ cho mép mịn

FAR, MID, NEAR = (178, 178, 178, 255), (128, 128, 128, 255), (78, 78, 78, 255)

SHOULDER = (455, 362)
HIP = (248, 356)
LEG = {"front": (48, 48), "hind": (50, 50)}  # (đoạn trên, đoạn dưới): đứng dưới thân gần thẳng
WID = {"front": 50, "hind": 54}
# vị trí bàn chân theo pha: (x, nhấc lên bao nhiêu px)
FOOT = {
    "front": [(518, 0), (458, 0), (398, 8), (482, 42)],
    "hind": [(304, 0), (246, 0), (186, 10), (262, 40)],
}
# offset pha của từng chân (khung k -> pha (k - off) % 4)
LEGS = [  # (tên, loại, gần/xa, offset)
    ("hind_far", "hind", "far", 2),
    ("front_far", "front", "far", 3),
    ("hind_near", "hind", "near", 0),
    ("front_near", "front", "near", 1),
]
BOB = [0, -9, 0, -9]          # thân nhún: cao hơn ở khung 1, 3
TAIL = [-22, 0, -22, 0]       # đuôi: nghiêng ra sau ở khung 0, 2, thẳng ở 1, 3


def ik(root, foot, l1, l2, bend):
    """Khớp giữa của chân 2 đoạn; bend=+1 khớp lùi ra sau (x nhỏ), -1 ra trước."""
    dx, dy = foot[0] - root[0], foot[1] - root[1]
    d = min(math.hypot(dx, dy), l1 + l2 - 1)
    a = math.atan2(dy, dx)
    c = (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d)
    t = math.acos(max(-1, min(1, c)))
    ang = a + t * bend
    return (root[0] + l1 * math.cos(ang), root[1] + l1 * math.sin(ang))


def capsule(dr, p, q, w, col):
    dr.line([p, q], fill=col, width=int(w))
    for pt in (p, q):
        r = w / 2
        dr.ellipse([pt[0] - r, pt[1] - r, pt[0] + r, pt[1] + r], fill=col)


def draw_leg(dr, kind, phase, col, bob, shade=0):
    root = SHOULDER if kind == "front" else HIP
    far = shade > 0
    root = (root[0] + (6 if far else 0), root[1] + bob - (4 if far else 0))
    fx, lift = FOOT[kind][phase]
    foot = (fx + (8 if far else 0), GROUND - 16 - lift - (4 if far else 0))
    l1, l2 = LEG[kind]
    # chân trước: khuỷu hơi lùi; chân sau: gối/khoeo lùi rõ. Khi nhấc lên thì gập mạnh hơn.
    bend = 1 if kind == "hind" else (-1 if phase == 3 else 1)
    d = math.hypot(foot[0] - root[0], foot[1] - root[1])
    if phase == 3:  # nhấc: đùi/cẳng trên đưa ra trước, cẳng dưới rủ xuống, bàn cụp
        knee = (root[0] + (46 if kind == "front" else 36), root[1] + 30)
        foot = (knee[0] - (8 if kind == "front" else 22), knee[1] + 26)
    elif d >= l1 + l2 - 2:  # duỗi: thẳng
        knee = ((root[0] + foot[0]) / 2, (root[1] + foot[1]) / 2)
    else:
        knee = ik(root, foot, l1, l2, bend)
    w = WID[kind] - shade
    if kind == "hind":  # khối đùi sau
        r = w * 0.7
        dr.ellipse([root[0] - r * 1.2, root[1] - r * 0.9, root[0] + r * 0.8, root[1] + r * 0.7], fill=col)
    capsule(dr, root, knee, w, col)
    capsule(dr, knee, foot, w * 0.8, col)
    # bàn chân: bầu dục hướng ra trước; khi duỗi sau thì nhón (nghiêng lên)
    pw, ph = (w * 0.8, w * 0.5) if phase == 3 else (w * 0.95, w * 0.55)
    tilt = 0.35 if phase == 2 else (0.95 if phase == 3 else 0)
    off = 0.15 if phase == 3 else 0.3
    cx, cy = foot[0] + pw * off * math.cos(tilt), foot[1] + 4 + pw * off * math.sin(tilt)
    pts = []
    for i in range(24):
        t = 2 * math.pi * i / 24
        x, y = pw * math.cos(t), ph * math.sin(t)
        pts.append((cx + x * math.cos(tilt) - y * math.sin(tilt), cy + x * math.sin(tilt) + y * math.cos(tilt)))
    dr.polygon(pts, fill=col)


def draw_tail(dr, sway, bob):
    base = (HIP[0] - 70, HIP[1] - 30 + bob)
    pts = []
    for i in range(21):
        t = i / 20
        x = base[0] - 40 * math.sin(t * 2.2) + sway * t * t
        y = base[1] - 210 * t + 12 * math.sin(t * 3)
        pts.append((x, y))
    for i in range(len(pts) - 1):
        w = 40 - 8 * (i / 20)
        capsule(dr, pts[i], pts[i + 1], w, MID)


def draw_cat(dr, k):
    bob = BOB[k]
    for name, kind, side, off in LEGS:
        if side == "far":
            draw_leg(dr, kind, (k - off) % 4, FAR, bob, shade=4)
    draw_tail(dr, TAIL[k], bob)
    # thân
    dr.ellipse([HIP[0] - 95, 250 + bob, SHOULDER[0] + 60, 395 + bob], fill=MID)
    # ngực / cổ nối đầu
    dr.ellipse([SHOULDER[0] - 70, 215 + bob, SHOULDER[0] + 75, 390 + bob], fill=MID)
    # đầu tròn to, hơi gật theo nhún
    hb = int(bob * 1.3)
    hx, hy = 532, 205 + hb
    dr.ellipse([hx - 135, hy - 118, hx + 125, hy + 118], fill=MID)
    # tai
    dr.polygon([(hx - 95, hy - 75), (hx - 70, hy - 190), (hx - 5, hy - 105)], fill=MID)
    dr.polygon([(hx + 10, hy - 110), (hx + 70, hy - 180), (hx + 95, hy - 70)], fill=MID)
    for name, kind, side, off in LEGS:
        if side == "near":
            draw_leg(dr, kind, (k - off) % 4, NEAR, bob)


def frame(k):
    im = Image.new("RGBA", (CW * SS, CHH * SS), (0, 0, 0, 0))
    big = ImageDraw.Draw(im)

    class Scaled:  # vẽ theo toạ độ ô, nhân SS
        def line(self, pts, fill, width):
            big.line([(x * SS, y * SS) for x, y in pts], fill=fill, width=width * SS)

        def ellipse(self, box, fill):
            big.ellipse([v * SS for v in box], fill=fill)

        def polygon(self, pts, fill):
            big.polygon([(x * SS, y * SS) for x, y in pts], fill=fill)

    draw_cat(Scaled(), k)
    return im.resize((CW, CHH), Image.LANCZOS)


def main():
    out = sys.argv[1]
    sheet = Image.new("RGBA", (1536, 1024), (0, 0, 0, 0))
    frames = [frame(k) for k in range(4)]
    for k, (x, y) in enumerate(CELLS):
        sheet.alpha_composite(frames[k], (x, y))
    sheet.save(out)
    print(out)
    if "--gif" in sys.argv:
        g = sys.argv[sys.argv.index("--gif") + 1]
        fr = []
        for f in frames:
            bg = Image.new("RGBA", f.size, (252, 241, 221, 255))
            bg.alpha_composite(f)
            ImageDraw.Draw(bg).line([(0, GROUND), (CW, GROUND)], fill=(200, 180, 160), width=2)
            fr.append(bg.convert("P", palette=Image.ADAPTIVE))
        fr[0].save(g, save_all=True, append_images=fr[1:], duration=125, loop=0)
        print(g)


if __name__ == "__main__":
    main()
