"""Dựng l6_bg_backyard 1366x2304 từ l5_bg_backyard 1024x2304 (D6: bỏ cửa quán, bậc thềm; dư hai bên cho 3:4).
Không vẽ mới, không đổi màu: chỉ chép điểm ảnh gốc.
- Trời + rào (y < FENCE): soi gương theo khe ván. Phải: trục x 822, nên cột dây phơi 490 ra cột thứ hai ở 1154,
  dây võng đối xứng. Trái: trục x 52.
- Sàn (y >= FENCE): soi gương phối cảnh, mỗi hàng lật quanh vị trí một đường gạch xiên ở hàng đó
  (ảnh của phép lật quanh một đường gạch trên mặt sàn), nên đường gạch ngang, xiên đều nối liền.
Toạ độ trong hàm là toạ độ ảnh L5 (vùng chơi x 0..1024); ảnh ra lệch +171."""
import numpy as np
from PIL import Image

ROOT = "D:/WebGames/Cat3D/"
PAD = 171
FENCE = 1257
src = np.array(Image.open(ROOT + "art/out/level5/l5_bg_backyard.png").convert("RGB"))
H, W = src.shape[:2]
out = np.zeros((H, W + 2 * PAD, 3), np.uint8)
out[:, PAD:PAD + W] = src


def col(x):  # toạ độ L5 -> cột ảnh ra
    return x + PAD


# Trời + rào: phải lật quanh 822, trái lật quanh 52.
for x in range(822, W + PAD):
    out[:FENCE, col(x)] = out[:FENCE, col(2 * 822 - x)]
for x in range(-PAD, 52):
    out[:FENCE, col(x)] = out[:FENCE, col(2 * 52 - x)]

# Đường gạch xiên (đo trên ảnh L5), khớp bậc nhất.
ys = np.array([1400, 1800, 2000, 2200])
right = np.polyfit(ys, [760, 865, 912, 960], 1)
left = np.polyfit(np.array([1400, 1800, 2000, 2200, 2290]), [411, 325, 281, 237, 217], 1)

lum = src.mean(2)


def track(fit):
    """Tâm nét gạch thật ở từng hàng (tìm quanh đường khớp ±14px), làm mượt; hàng nằm trên vạch ngang dùng nội suy."""
    xs = np.full(H, np.nan)
    for y in range(FENCE + 8, H):
        p = np.polyval(fit, y)
        a, b = int(p) - 14, int(p) + 15
        seg = lum[y, a:b]
        base = np.median(lum[y, a - 40:b + 40])
        dark = np.where(seg < base - 18)[0]
        if 0 < len(dark) <= 8:
            xs[y] = a + dark.mean()
    ok = ~np.isnan(xs)
    rows = np.arange(H)
    xs = np.interp(rows, rows[ok], xs[ok])
    k = np.ones(15) / 15
    return np.convolve(np.pad(xs, 7, mode="edge"), k, mode="valid")


R, L = track(right), track(left)
for y in range(FENCE, H):
    lr = R[y]
    for x in range(int(np.ceil(lr)), W + PAD):
        out[y, col(x)] = out[y, col(int(round(2 * lr - x)))]
# Trái: dịch đúng một ô gạch theo phối cảnh (khoảng cách đường xiên ngoài cùng -> đường xiên trong ở hàng đó),
# để đường ngoài cùng (ra mép ảnh ở y ~1530) chạy tiếp sang phần nới.
oy = np.arange(1265, 1526, 20)
outer = np.polyfit(oy, [167.5, 155, 142.5, 130, 118, 106, 94.5, 83, 71, 59, 46, 33, 20.5, 8], 1)
for y in range(FENCE, H):
    s = L[y] - np.polyval(outer, y)
    for x in range(-PAD, 0):
        out[y, col(x)] = out[y, col(int(round(x + s)))]

Image.fromarray(out).save(ROOT + "art/out/level6/l6_bg_backyard.png")
print("saved", out.shape)
