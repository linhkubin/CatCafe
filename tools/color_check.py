# Đo màu theo quy tắc giữ màu O6 (QUY-TRINH.md bước 3): bão hoà HSV trung bình ≤ 0,25, phân vị 90 ≤ 0,46.
# Ảnh có alpha (tờ trong suốt): chỉ tính điểm ảnh có alpha > 128.
# Cách chạy: python tools/color_check.py <ảnh> [<ảnh> ...]
# In một dòng mỗi ảnh; mã thoát 1 nếu có ảnh vượt ngưỡng.
import sys
import numpy as np
from PIL import Image

MEAN_MAX, P90_MAX = 0.25, 0.46  # mức của ảnh mẫu art/ref/owner_l1_style_ref.png, so sau khi làm tròn 2 số


def measure(path):
    im = Image.open(path)
    rgba = np.asarray(im.convert("RGBA"))
    s = np.asarray(im.convert("RGB").convert("HSV"))[..., 1] / 255.0
    if "A" in im.getbands():
        s = s[rgba[..., 3] > 128]
    s = s.ravel()
    return float(s.mean()), float(np.percentile(s, 90))


def main(paths):
    sys.stdout.reconfigure(encoding="utf-8")
    bad = 0
    for p in paths:
        mean, p90 = measure(p)
        ok = round(mean, 2) <= MEAN_MAX and round(p90, 2) <= P90_MAX
        bad += not ok
        print(f"{'đạt' if ok else 'VƯỢT'}  trung bình {mean:.3f} (≤ {MEAN_MAX})  p90 {p90:.3f} (≤ {P90_MAX})  {p}")
    return 1 if bad else 0


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__ or "python tools/color_check.py <ảnh> ...")
        sys.exit(2)
    sys.exit(main(sys.argv[1:]))
