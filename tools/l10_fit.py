"""L10 (A10-2): co chiều cao ảnh đã cắt về đúng cỡ bảng Dev (rộng đã đúng nhờ sheet_cut "rộng N"). Co không đều, chỉ trục dọc,
cập nhật h, ay trong anchors.json. Ghi tỉ lệ co ra màn hình. Chạy sau sheet_cut: python tools/l10_fit.py"""
import json
import numpy as np
from PIL import Image

R = "D:/WebGames/Cat3D/art/out/"
RES = 1.5
# key: chiều cao hiển thị đích; nhóm dùng chung tỉ lệ của món đầu
# Lượt 1 (đã chạy, KHÔNG chạy lại): sofa 400, scissors 60, soup_box 90 (+open), table_arena 230, toy_tank 88, toy_firetruck 84, blocks_a 90.
# Lượt 2 (sau khi cắt lại sách, tàu vẽ lại và món đợt 2): chạy với tham số "2".
import sys
if sys.argv[1:] == ["2"]:
    FIT = {"l10_book_stack": 150, "l10_train": 50, "l10_plane": 98}
    FOLLOW = {"l10_plane_fly": "l10_plane"}
else:
    sys.exit("lượt 1 đã chạy; dùng: python tools/l10_fit.py 2 (chỉ chạy một lần sau khi cắt lại)")

A = json.load(open(R + "anchors.json", encoding="utf8"))
factor = {}


def drawn_h(im):
    a = np.asarray(im)[..., 3] > 40
    ys = np.nonzero(a.any(1))[0]
    return ys.max() - ys.min() + 1


for key in list(FIT) + list(FOLLOW):
    m = A[key]
    p = R + m["file"]
    im = Image.open(p).convert("RGBA")
    if key in FIT:
        f = FIT[key] * RES / drawn_h(im)
    else:
        f = factor[FOLLOW[key]]
    factor[key] = f
    nh = max(1, round(im.height * f))
    im.resize((im.width, nh), Image.LANCZOS).save(p)
    m["ay"] = round(m["ay"] * f)
    m["h"] = nh
    m["oy"] = round(m["ay"] / nh, 4)
    print(f"{key:20s} co dọc x{f:.2f} -> {im.width}x{nh}, neo ({m['ax']},{m['ay']})")
json.dump(A, open(R + "anchors.json", "w", encoding="utf8"), ensure_ascii=False, indent=1, sort_keys=True)
