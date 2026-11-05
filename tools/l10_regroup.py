"""Ghép lại demo L10 đúng bố cục bản khối (GD 1, G10 demo): cắt từng món trong ảnh demo Codex vẽ, co đúng khung hiển thị
trong bảng Dev (art/review/level10-thread.md, "Yêu cầu art từ Dev"), đặt đúng toạ độ và lớp. Không chỉnh màu.
- Tách món: lấp từ mép khung chọn qua mọi điểm không phải nét viền nâu sẫm -> phần không lấp tới = món.
- Thảm + ray: nắn theo elip (ray tâm 500,1167 bán trục 230x74; thảm tâm 500,1212, 598x275), xoá đồ chơi trên thảm trước.
- Nền: tường và sàn trơn lấy từ dải trống của demo, chân tường y 880.
Chạy: python tools/l10_regroup.py  -> art/out/demo/l10_demo_{fight,end}_play_fix.png, art/ref/l10_demo/cut/*.png"""
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

R = "D:/WebGames/Cat3D/"
FIGHT = R + "art/out/demo/l10_demo_fight_play_v3.png"
END = R + "art/out/demo/l10_demo_end_play.png"
CUT = R + "art/ref/l10_demo/cut/"


def load(p):
    im = Image.open(p).convert("RGB")
    return im if im.size == (1024, 1536) else im.resize((1024, 1536), Image.LANCZOS)


def segment(img, box, dark=118, close=2):
    """Mặt nạ món trong khung box (x0,y0,x1,y1) của ảnh img: lấp từ mép khung qua điểm không phải nét viền."""
    x0, y0, x1, y1 = box
    crop = img.crop(box)
    a = np.asarray(crop).astype(int)
    lum = a.mean(2)
    loc = np.asarray(Image.fromarray(lum.astype(np.uint8)).filter(ImageFilter.GaussianBlur(6))).astype(int)
    edge = (lum < dark) | (lum < loc - 22)                      # nét viền: tối tuyệt đối hoặc tối hơn hẳn xung quanh
    bar = Image.fromarray((edge * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(2 * close + 1))
    w, h = crop.size
    m = Image.new("L", (w + 2, h + 2), 0)
    m.paste(bar, (1, 1))
    ImageDraw.floodfill(m, (0, 0), 128)
    out = Image.fromarray(((np.asarray(m)[1:-1, 1:-1] == 128) * 255).astype(np.uint8))
    out = out.filter(ImageFilter.MaxFilter(2 * close + 1))          # trả phần ngoài về sát mép nét viền
    item = 255 - np.asarray(out)
    # giữ mảng lớn nhất
    lab = Image.fromarray(item.astype(np.uint8))
    return largest(np.asarray(lab) > 0)


def largest(mask):
    h, w = mask.shape
    seen = np.zeros_like(mask, bool)
    best, best_n = None, 0
    ys, xs = np.nonzero(mask)
    for sy, sx in zip(ys[::97], xs[::97]):
        if seen[sy, sx]:
            continue
        stack, comp = [(sy, sx)], []
        seen[sy, sx] = True
        while stack:
            y, x = stack.pop()
            comp.append((y, x))
            for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not seen[ny, nx]:
                    seen[ny, nx] = True
                    stack.append((ny, nx))
        if len(comp) > best_n:
            best, best_n = comp, len(comp)
    out = np.zeros_like(mask, bool)
    if best:
        yy, xx = zip(*best)
        out[list(yy), list(xx)] = True
    # lấp lỗ nhỏ bên trong (nét trong món)
    inv = Image.fromarray(((~out) * 255).astype(np.uint8))
    m = Image.new("L", (w + 2, h + 2), 255)
    m.paste(inv, (1, 1))
    ImageDraw.floodfill(m, (0, 0), 128)
    holes = np.asarray(m)[1:-1, 1:-1] == 255
    return out | holes


def cutout(img, box, **kw):
    """Ảnh RGBA của món (cắt sát mặt nạ) và khung mặt nạ trong toạ độ ảnh demo."""
    mask = segment(img, box, **kw)
    ys, xs = np.nonzero(mask)
    bx0, by0, bx1, by1 = xs.min(), ys.min(), xs.max() + 1, ys.max() + 1
    rgba = np.dstack([np.asarray(img.crop(box)), (mask * 255).astype(np.uint8)])[by0:by1, bx0:bx1]
    return Image.fromarray(rgba), (box[0] + bx0, box[1] + by0, box[0] + bx1, box[1] + by1)


def place(canvas, item, ref, target):
    """Co item để khung ref (toạ độ trong item) vừa đúng khung target (x0,y0,x1,y1 trên canvas), rồi dán."""
    rx0, ry0, rx1, ry1 = ref
    tx0, ty0, tx1, ty1 = target
    sx, sy = (tx1 - tx0) / (rx1 - rx0), (ty1 - ty0) / (ry1 - ry0)
    w, h = max(1, round(item.width * sx)), max(1, round(item.height * sy))
    it = item.resize((w, h), Image.LANCZOS)
    canvas.alpha_composite(it, (round(tx0 - rx0 * sx), round(ty0 - ry0 * sy)))
    return sx, sy


def tbox(x, y, w, h, neo):
    return (x - w / 2, y - h, x + w / 2, y) if neo == "đáy" else (x - w / 2, y - h / 2, x + w / 2, y + h / 2)


def background(end):
    a = np.asarray(end)
    wall, floor = a[404:448], a[1494:1536]

    def tile(strip, n):
        out, flip = [], False
        while sum(len(s) for s in out) < n:
            out.append(strip[::-1] if flip else strip)
            flip = not flip
        return np.concatenate(out, 0)[:n]

    return Image.fromarray(np.concatenate([tile(wall, 880), tile(floor, 1536 - 880)], 0)).convert("RGBA")


# ---- thảm: nắn elip ----
D_TRACK = (488, 1230, 256, 82)      # demo: tâm ray, bán trục
D_RUG = (504, 1304, 496, 186)       # demo: tâm thảm, bán trục
T_TRACK = (500, 1167, 230, 74)
T_RUG = (500, 1212, 299, 137.5)


def ray_k(track, rug, phi):
    """Hệ số k: điểm tâm_ray + k*(a cos phi, b sin phi) nằm trên elip thảm."""
    cx, cy, a, b = track
    rx, ry, A, B = rug
    dx, dy = a * np.cos(phi), b * np.sin(phi)
    ox, oy = cx - rx, cy - ry
    qa = (dx / A) ** 2 + (dy / B) ** 2
    qb = 2 * (ox * dx / A ** 2 + oy * dy / B ** 2)
    qc = (ox / A) ** 2 + (oy / B) ** 2 - 1
    return (-qb + np.sqrt(np.maximum(qb * qb - 4 * qa * qc, 0))) / (2 * qa)


def rug_layer(end, toy_mask):
    src = np.asarray(end).astype(float)
    H, W = src.shape[:2]
    # xoá đồ chơi trên thảm: lấy mẫu cùng bán kính elip thảm, góc khác
    clean = src.copy()
    ys, xs = np.nonzero(toy_mask)
    cx, cy, ax, ay = D_RUG
    tcx, tcy, tax, tay = D_TRACK
    for y, x in zip(ys, xs):
        u, v = (x - tcx) / tax, (y - tcy) / tay
        rho = math.hypot(u, v)
        if 0.82 < rho < 1.18:                        # trên ray: xoay theo elip ray
            c, ax_, ay_ = (tcx, tcy), tax, tay
            r, th = rho, math.atan2(v, u)
        else:
            c, ax_, ay_ = (cx, cy), ax, ay
            uu, vv = (x - cx) / ax, (y - cy) / ay
            r, th = math.hypot(uu, vv), math.atan2(vv, uu)
        for d in (0.5, -0.5, 0.9, -0.9, 1.4, -1.4, 2.0, -2.0, 2.6, -2.6):
            sx = int(round(c[0] + ax_ * r * math.cos(th + d)))
            sy = int(round(c[1] + ay_ * r * math.sin(th + d)))
            if 0 <= sx < W and 0 <= sy < H and not toy_mask[sy, sx]:
                clean[y, x] = src[sy, sx]
                break
    # nắn: điểm đích -> điểm nguồn. Tia từ tâm ray theo tham số elip ray phi; trong ray theo tỉ lệ, ngoài ray nội suy tới mép thảm.
    yy, xx = np.mgrid[0:H, 0:W].astype(float)
    U, V = (xx - T_RUG[0]) / T_RUG[2], (yy - T_RUG[1]) / T_RUG[3]
    inside = U * U + V * V <= 1.0
    tu, tv = (xx - T_TRACK[0]) / T_TRACK[2], (yy - T_TRACK[1]) / T_TRACK[3]
    rho, phi = np.hypot(tu, tv), np.arctan2(tv, tu)
    kt = ray_k(T_TRACK, T_RUG, phi)
    kd = ray_k(D_TRACK, D_RUG, phi)
    t = np.clip((rho - 1) / np.maximum(kt - 1, 1e-3), 0, 1)
    kk = np.where(rho <= 1, rho, 1 + t * (kd - 1))
    sx = D_TRACK[0] + D_TRACK[2] * kk * np.cos(phi)
    sy = D_TRACK[1] + D_TRACK[3] * kk * np.sin(phi)
    sxi, syi = np.clip(np.round(sx).astype(int), 0, W - 1), np.clip(np.round(sy).astype(int), 0, H - 1)
    out = np.zeros((H, W, 4), np.uint8)
    out[..., :3] = clean[syi, sxi].astype(np.uint8)
    edge = Image.fromarray((inside * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))
    out[..., 3] = np.asarray(edge)
    return Image.fromarray(out)


def fill_rows(arr, region, good):
    """Lấp điểm thuộc region mà không good bằng cách chép gương đoạn good gần nhất trên cùng hàng."""
    out = arr.copy()
    for y in range(region.shape[0]):
        bad = region[y] & ~good[y]
        if not bad.any():
            continue
        okx = np.nonzero(good[y])[0]
        if len(okx) == 0:
            continue
        xs = np.nonzero(bad)[0]
        spans, s = [], xs[0]
        for a, b in zip(xs, xs[1:]):
            if b != a + 1:
                spans.append((s, a + 1))
                s = b
        spans.append((s, xs[-1] + 1))
        for a, b in spans:
            L = b - a
            left, right = okx[okx < a], okx[okx >= b]
            if len(left) and (not len(right) or a - left.max() <= right.min() - b):
                src = [left.max() - (i % max(1, min(L, len(left)))) for i in range(L)]
            else:
                src = [right.min() + (i % max(1, min(L, len(right)))) for i in range(L)]
            src = [x if good[y, x] else okx[np.argmin(abs(okx - x))] for x in src]
            out[y, a:b] = arr[y, src]
    return out


def full_mask(img, box, **kw):
    m = np.zeros((1536, 1024), bool)
    x0, y0 = box[0], box[1]
    sub = segment(img, box, **kw)
    h, w = min(sub.shape[0], 1536 - y0), min(sub.shape[1], 1024 - x0)
    m[y0:y0 + h, x0:x0 + w] = sub[:h, :w]
    return m


def rgba_from(arr, mask):
    ys, xs = np.nonzero(mask)
    x0, y0, x1, y1 = xs.min(), ys.min(), xs.max() + 1, ys.max() + 1
    rgba = np.dstack([arr[y0:y1, x0:x1, :3], (mask[y0:y1, x0:x1] * 255).astype(np.uint8)])
    return Image.fromarray(rgba.astype(np.uint8)), (x0, y0, x1, y1)


def fire_cut(img, box):
    a = np.asarray(img).astype(int)
    x0, y0, x1, y1 = box
    m = np.zeros((1536, 1024), bool)
    sub = a[y0:y1, x0:x1]
    m[y0:y1, x0:x1] = (sub[..., 2] - sub[..., 0] > 14) & (sub[..., 2] > 150)
    m = largest(m)
    soft = np.asarray(Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.5))) > 40
    return rgba_from(a.astype(np.uint8), soft)


def build():
    end, fight = load(END), load(FIGHT)
    ea, fa = np.asarray(end), np.asarray(fight)
    lib = {}
    E = {'shelf_l': (40, 262, 300, 335), 'shelf_m': (335, 335, 585, 402), 'shelf_r': (635, 190, 897, 258),
         'books': (365, 160, 550, 350), 'plant': (880, 430, 1030, 1012), 'car': (378, 1168, 550, 1270),
         'train': (580, 1188, 704, 1294), 'tank': (246, 1310, 424, 1438), 'firetruck': (494, 1314, 724, 1450),
         'blocks_a': (98, 1086, 194, 1244), 'blocks_b': (770, 1062, 872, 1250), 'lamp': (168, 1210, 238, 1388),
         'ball': (38, 1283, 168, 1412), 'plane': (760, 1270, 957, 1402)}
    for k, b in E.items():
        lib[k] = cutout(end, b)
    for k, b in {'pillow_l': (68, 512, 382, 705), 'pillow_r': (640, 512, 900, 705),
                 'mun_real': (250, 790, 505, 1062), 'sua_real': (500, 780, 728, 1062)}.items():
        lib[k] = cutout(end, b, close=4)
    lib['box_open'] = cutout(end, (444, 996, 566, 1084), close=5)
    for k, b in {'scissors': (92, 165, 258, 278), 'soup': (675, 55, 858, 203), 'cake': (280, 898, 428, 1040),
                 'vase': (415, 840, 550, 1032), 'remote': (552, 975, 718, 1038)}.items():
        lib[k] = cutout(fight, b)
    lib['mun_g'] = cutout(fight, (20, 560, 470, 1060), close=3)
    lib['sua_l'] = cutout(fight, (560, 555, 960, 1060), close=3)
    lib['fire'] = fire_cut(fight, (330, 590, 660, 720))
    # sofa (ảnh kết): lấp gối, tim, chỗ hai mèo
    sm = full_mask(end, (25, 440, 975, 1025), close=3)
    sil = sm.copy()
    sil[790:986, 240:740] = True
    sil[440:800] |= np.maximum.accumulate(sm[440:800], 1) & np.maximum.accumulate(sm[440:800, ::-1], 1)[:, ::-1]
    foreign = full_mask(end, (68, 512, 382, 705), close=4) | full_mask(end, (640, 512, 900, 705), close=4)
    foreign[690:800, 420:600] = True
    for b in ((250, 790, 505, 1062), (500, 780, 728, 1062)):
        foreign |= full_mask(end, b, close=4)
    foreign[930:1084, 440:570] = True
    lib['sofa'] = rgba_from(fill_rows(ea, sil, sm & ~foreign), sil)
    # bàn trà (ảnh đánh nhau): lấp chỗ đồ trên bàn
    tm = full_mask(fight, (198, 960, 770, 1158), close=3)
    items = np.zeros_like(tm)
    for b in ((280, 898, 428, 1040), (415, 840, 550, 1032), (552, 975, 718, 1038)):
        items |= full_mask(fight, b)
    items[:976] = False
    tsil = tm | items
    lib['table'] = rgba_from(fill_rows(fa, tsil, tm & ~items), tsil)
    # thảm (ảnh kết)
    toys = np.zeros((1536, 1024), bool)
    for k in ('car', 'train', 'tank', 'firetruck', 'blocks_a', 'blocks_b', 'lamp', 'ball', 'plane'):
        it, (x0, y0, x1, y1) = lib[k]
        toys[y0:y1, x0:x1] |= np.asarray(it)[..., 3] > 0
    toys = np.asarray(Image.fromarray((toys * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(17))) > 0
    rug = rug_layer(end, toys)
    for k, (it, bb) in lib.items():
        it.save(CUT + k + '.png')
    return lib, rug, background(end)


T = {  # khung đích theo bảng Dev: x0, y0, x1, y1
    'shelf_l': tbox(170, 310, 240, 30, 'đáy'), 'shelf_m': tbox(470, 390, 200, 30, 'đáy'), 'shelf_r': tbox(770, 230, 240, 30, 'đáy'),
    'scissors': tbox(170, 280, 110, 60, 'đáy'), 'books': tbox(470, 360, 100, 150, 'đáy'), 'soup': tbox(770, 200, 130, 90, 'đáy'),
    'sofa': tbox(490, 860, 880, 400, 'đáy'), 'pillow_l': tbox(165, 610, 220, 150, 'đáy'), 'pillow_r': tbox(815, 610, 220, 150, 'đáy'),
    'plant': tbox(975, 880, 170, 400, 'đáy'), 'mun_g': tbox(220, 1010, 300, 470, 'đáy'), 'sua_l': tbox(740, 1020, 290, 450, 'đáy'),
    'table': tbox(490, 1060, 510, 230, 'đáy'), 'cake': tbox(300, 920, 120, 120, 'đáy'), 'vase': tbox(490, 900, 70, 130, 'đáy'),
    'remote': tbox(660, 920, 154, 48, 'đáy'), 'train': tbox(611, 1232, 98, 50, 'tâm'), 'car': tbox(500, 1167, 158, 78, 'tâm'),
    'tank': tbox(370, 1301, 168, 88, 'tâm'), 'firetruck': tbox(630, 1303, 183, 84, 'tâm'), 'blocks_a': tbox(160, 1170, 60, 90, 'đáy'),
    'blocks_b': tbox(800, 1175, 60, 110, 'đáy'), 'lamp': tbox(215, 1235, 30, 110, 'đáy'), 'ball': tbox(95, 1300, 78, 78, 'tâm'),
    'plane': tbox(900, 1300, 210, 98, 'tâm'), 'fire': (345, 625, 635, 685),
}


def ref_of(k, it):
    w, h = it.size
    if k.startswith('shelf_'):
        ys = np.nonzero(np.asarray(it)[:, w // 2, 3] > 0)[0]     # giữa kệ chỉ có tấm ván
        return (0, ys.min(), w, ys.max() + 1)
    if k == 'sua_l':
        return (0, 0, int(w * 0.74), h)                            # thân Sữa, không tính đuôi
    return (0, 0, w, h)


def put(c, lib, k):
    it = lib[k][0]
    place(c, it, ref_of(k, it), T[k])


def compose(lib, rug, bg, scene):
    c = bg.copy()
    for k in ['shelf_l', 'shelf_m', 'shelf_r', 'books'] + (['scissors', 'soup'] if scene == 'fight' else []):
        put(c, lib, k)
    c.alpha_composite(rug)
    for k in sorted(['train', 'car', 'tank', 'firetruck', 'blocks_a', 'blocks_b'], key=lambda k: T[k][3]):
        put(c, lib, k)
    for k in ['sofa', 'pillow_l', 'pillow_r', 'plant']:
        put(c, lib, k)
    if scene == 'fight':
        for k in ['mun_g', 'sua_l', 'table', 'cake', 'vase', 'remote']:
            put(c, lib, k)
    else:
        for k, (fx, fy), w in (('mun_real', (305, 1010), 190), ('sua_real', (655, 1020), 190), ('box_open', (482, 1020), 130)):
            it = lib[k][0]
            h = it.height * w / it.width
            place(c, it, (0, 0, it.width, it.height), (fx - w / 2, fy - h, fx + w / 2, fy))
    for k in ['lamp', 'ball', 'plane']:
        put(c, lib, k)
    if scene == 'fight':
        put(c, lib, 'fire')
    c.convert('RGB').save(R + f'art/out/demo/l10_demo_{scene}_play_fix.png')


if __name__ == '__main__':
    lib, rug, bg = build()
    for sc in ('fight', 'end'):
        compose(lib, rug, bg, sc)
    print('ok')
