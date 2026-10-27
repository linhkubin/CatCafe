# Ảnh kiểm quy luật chiều sâu O9 (art/style.md mục 2b): phủ lưới lên ảnh để so cạnh sâu của mọi đồ.
# Mặc định (O9 hiện tại, góc như sofa level 1): lưới đứng + ngang, cạnh sâu phải gần song song đường đứng,
# mặt trên đọc được chiều cao trên đường ngang. --goc <độ>: lưới chéo chếch lên phải (kiểu O9 cũ).
# Cách chạy: python tools/depth_check.py <ảnh vào> <ảnh ra> [--goc 32] [--buoc 70]
import argparse
import math
from PIL import Image, ImageDraw


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("out")
    ap.add_argument("--goc", type=float, default=None, help="lưới chéo chếch lên phải theo góc này (độ); bỏ trống = lưới đứng + ngang")
    ap.add_argument("--buoc", type=int, default=70, help="khoảng cách giữa các đường (px)")
    a = ap.parse_args()

    im = Image.open(a.src).convert("RGBA")
    w, h = im.size
    layer = Image.new("RGBA", im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    if a.goc is None:
        for x in range(0, w, a.buoc):
            d.line([(x, 0), (x, h)], fill=(230, 40, 40, 110), width=2)
        for y in range(0, h, a.buoc):
            d.line([(0, y), (w, y)], fill=(40, 90, 230, 70), width=1)
    else:
        t = math.tan(math.radians(a.goc))
        # Đường y = c - x*t (lên phải), quét c để phủ kín ảnh.
        c = 0
        while c < h + w * t:
            d.line([(0, c), (w, c - w * t)], fill=(230, 40, 40, 110), width=2)
            c += a.buoc
    Image.alpha_composite(im, layer).convert("RGB").save(a.out, quality=90)


if __name__ == "__main__":
    main()
