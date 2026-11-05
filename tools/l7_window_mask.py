"""G7-29: cắt lớp phòng trong l7_window_inside theo lòng khung cửa sổ (hình chữ nhật bao các lỗ trong l7_window_closed
và l7_window_open), nới 8px cho mép giấu dưới thanh gỗ. Cùng khung, cùng neo, không đổi màu.
Bản gốc: art/ref/backup/l7_g729/l7_window_inside.png."""
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

R = "D:/WebGames/Cat3D/"
SRC = R + "art/ref/backup/l7_g729/l7_window_inside.png"
PAD = 8
inside = np.array(Image.open(SRC).convert("RGBA"))


def hole_box(key):
    a = Image.open(R + f"art/out/level7/{key}.png").convert("RGBA").split()[3].point(lambda v: 255 if v >= 128 else 0)
    a = a.filter(ImageFilter.MaxFilter(5))              # nối khe nhỏ của nét khung
    m = Image.new("L", (a.width + 2, a.height + 2), 0)
    m.paste(a, (1, 1))
    ImageDraw.floodfill(m, (0, 0), 128)                  # 128 = ngoài khung
    h = np.array(m)[1:-1, 1:-1] == 0                     # lỗ: trong suốt, không thông ra ngoài
    ys, xs = np.where(h)
    return xs.min(), ys.min(), xs.max(), ys.max()


boxes = [hole_box("l7_window_closed"), hole_box("l7_window_open")]
x0 = min(b[0] for b in boxes) - PAD; y0 = min(b[1] for b in boxes) - PAD
x1 = max(b[2] for b in boxes) + PAD; y1 = max(b[3] for b in boxes) + PAD
mask = np.zeros(inside.shape[:2], bool); mask[y0:y1 + 1, x0:x1 + 1] = True
inside[..., 3] = np.where(mask, inside[..., 3], 0).astype(np.uint8)
Image.fromarray(inside).save(R + "art/out/level7/l7_window_inside.png")
print("lòng khung", boxes, "-> giữ", (x0, y0, x1, y1))
