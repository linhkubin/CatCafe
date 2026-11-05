"""Nắn thảm L10 (A10-2): ảnh Codex tách l10src_l10_rug_loop.png có ray nhỏ, tâm ray gần tâm thảm. Bảng Dev cần thảm 598x275
(tâm 500,1212) và ray elip tâm (500,1167) bán trục 230x74 (đường giữa ray). Nắn theo tia từ tâm ray: trong ray co giãn theo
elip ray, ngoài ray nội suy tới mép thảm. Không đổi màu. Ra art/out/_sheets/l10src_l10_rug_loop_fix.png ở cỡ ×1,5."""
import numpy as np
from PIL import Image

R = "D:/WebGames/Cat3D/"
SRC = R + "art/out/_sheets/l10src_l10_rug_loop.png"
OUT = R + "art/out/_sheets/l10src_l10_rug_loop_fix.png"
S = 1.5
M = 12                                                   # lề trong suốt
D_RUG = (914, 438.5, 828, 336.5)                         # ảnh Codex: tâm, bán trục thảm
D_TRACK = (913, 420, 566, 205)                           # ảnh Codex: đường giữa ray
W, H = round(598 * S) + 2 * M, round(275 * S) + 2 * M
T_RUG = (W / 2, H / 2, 299 * S, 137.5 * S)
T_TRACK = (W / 2, H / 2 - 45 * S, 230 * S, 74 * S)


def ray_k(track, rug, phi):
    cx, cy, a, b = track
    rx, ry, A, B = rug
    dx, dy = a * np.cos(phi), b * np.sin(phi)
    ox, oy = cx - rx, cy - ry
    qa = (dx / A) ** 2 + (dy / B) ** 2
    qb = 2 * (ox * dx / A ** 2 + oy * dy / B ** 2)
    qc = (ox / A) ** 2 + (oy / B) ** 2 - 1
    return (-qb + np.sqrt(np.maximum(qb * qb - 4 * qa * qc, 0))) / (2 * qa)


src = np.asarray(Image.open(SRC).convert("RGBA"))
sh, sw = src.shape[:2]
yy, xx = np.mgrid[0:H, 0:W].astype(float)
tu, tv = (xx - T_TRACK[0]) / T_TRACK[2], (yy - T_TRACK[1]) / T_TRACK[3]
rho, phi = np.hypot(tu, tv), np.arctan2(tv, tu)
kt, kd = ray_k(T_TRACK, T_RUG, phi), ray_k(D_TRACK, D_RUG, phi)
t = (rho - 1) / np.maximum(kt - 1, 1e-3)
kk = np.where(rho <= 1, rho, 1 + t * (kd - 1))
sx = D_TRACK[0] + D_TRACK[2] * kk * np.cos(phi)
sy = D_TRACK[1] + D_TRACK[3] * kk * np.sin(phi)
# lấy mẫu song tuyến
x0, y0 = np.floor(sx).astype(int), np.floor(sy).astype(int)
fx, fy = (sx - x0)[..., None], (sy - y0)[..., None]
def px(x, y):
    ok = (x >= 0) & (x < sw) & (y >= 0) & (y < sh)
    v = src[np.clip(y, 0, sh - 1), np.clip(x, 0, sw - 1)].astype(float)
    v[~ok] = 0
    return v
out = (px(x0, y0) * (1 - fx) * (1 - fy) + px(x0 + 1, y0) * fx * (1 - fy)
       + px(x0, y0 + 1) * (1 - fx) * fy + px(x0 + 1, y0 + 1) * fx * fy)
Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)).save(OUT)
print("saved", W, H)
