"""Nới nền sang hai bên (G-SCREEN): 1024 rộng -> 1024 + 2*EXT, vùng giữa giữ nguyên từng điểm ảnh.

Cần Python 3 + Pillow + numpy. Chạy từ gốc dự án.

  python tools/bg_widen.py prep <nền.png> <thư_mục>
      Tạo canvas 1024x1536 cho Codex: mỗi bên (L, R) và mỗi khúc dọc (nền cao 1536: 1 khúc; 2304: 2 khúc chồng nhau 768px).
      Canvas = dải xám EXT px ở mép ngoài + phần cảnh gốc sát mép đó, đúng cỡ thật. Ghi <thư_mục>/<tên>_<L|R><khúc>_in.png.
  python tools/bg_widen.py merge <nền.png> <thư_mục> <ra.png>
      Đọc <tên>_<L|R><khúc>_done.png (Codex vẽ vào dải xám), lấy đúng dải mới, bù lệch màu theo hàng cho liền mép gốc
      (bù giảm dần ra ngoài), ghép khúc dọc mềm trong vùng chồng, dán vùng giữa nguyên bản.
  python tools/bg_widen.py vprep <nền 1024x1536> <thư_mục>   /   vmerge <nền> <thư_mục> <ra.png>
      Như trên nhưng nối trên/dưới 384px (1536 -> 2304): canvas <tên>_T_in.png, <tên>_B_in.png.
Thứ tự cho nền 1024x1536: vprep/vmerge (ra 1024x2304) rồi prep/merge trên ảnh đó (ra 1366x2304).
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

EXT = 171            # mỗi bên thêm (1366 = 1024 + 2*171)
CW, CH = 1024, 1536  # canvas Codex
GRAY = (128, 128, 128)
SEAM = 32            # số cột sát mép gốc dùng đo lệch màu
FALL = 120           # độ dài bù màu giảm dần vào dải mới (px)
MAXD = 18            # lệch màu tối đa được bù (mỗi kênh)


def pieces(h):
    if h <= CH:
        return [(0, h)]
    return [(0, CH), (h - CH, h)]


def prep(src, out):
    im = Image.open(src).convert("RGB")
    w, h = im.size
    assert w == 1024, w
    out = Path(out)
    out.mkdir(parents=True, exist_ok=True)
    name = Path(src).stem
    for k, (y0, y1) in enumerate(pieces(h)):
        part = im.crop((0, y0, w, y1))
        for side in "LR":
            c = Image.new("RGB", (CW, CH), GRAY)
            if side == "L":
                c.paste(part.crop((0, 0, CW - EXT, y1 - y0)), (EXT, 0))
            else:
                c.paste(part.crop((w - (CW - EXT), 0, w, y1 - y0)), (0, 0))
            p = out / f"{name}_{side}{k}_in.png"
            c.save(p)
            print(p)


def band(done, side, ph):
    """Dải mới (ph x EXT) và cột cảnh Codex vẽ lại sát mép (ph x SEAM)."""
    d = Image.open(done).convert("RGB")
    if d.size != (CW, CH):
        d = d.resize((CW, CH), Image.LANCZOS)
    a = np.asarray(d).astype(float)[:ph]
    if side == "L":
        return a[:, :EXT], a[:, EXT:EXT + SEAM]
    return a[:, CW - EXT:], a[:, CW - EXT - SEAM:CW - EXT]


def seam_diff(orig, seam, axis):
    """Lệch màu gốc - Codex tại mép: trung vị theo bề dày mép, giới hạn ±MAXD (bỏ chỗ Codex vẽ khác hẳn như móc, nét)."""
    d = np.median(orig - seam, axis=axis)
    return smooth_rows(np.clip(d, -MAXD, MAXD))


def smooth_rows(v, r=48):
    k = np.ones(2 * r + 1) / (2 * r + 1)
    pad = np.pad(v, ((r, r), (0, 0)), mode="edge")
    return np.stack([np.convolve(pad[:, c], k, mode="valid") for c in range(v.shape[1])], 1)


def merge(src, folder, dst):
    im = np.asarray(Image.open(src).convert("RGB")).astype(float)
    h, w, _ = im.shape
    name = Path(src).stem
    folder = Path(folder)
    out = np.zeros((h, w + 2 * EXT, 3))
    out[:, EXT:EXT + w] = im
    for side in "LR":
        acc = np.zeros((h, EXT, 3))
        wsum = np.zeros((h, 1, 1))
        ps = pieces(h)
        for k, (y0, y1) in enumerate(ps):
            ph = y1 - y0
            new, seam = band(folder / f"{name}_{side}{k}_done.png", side, ph)
            orig = im[y0:y1, :SEAM] if side == "L" else im[y0:y1, w - SEAM:]
            diff = seam_diff(orig, seam, 1)                      # lệch màu theo hàng (ph x 3)
            ramp = np.clip(1 - np.arange(EXT) / FALL, 0, 1)      # 1 sát mép gốc -> 0 ra ngoài
            if side == "L":
                ramp = ramp[::-1]
            new = new + diff[:, None, :] * ramp[None, :, None]
            wt = np.ones((ph, 1, 1))
            if len(ps) > 1:                                       # ghép khúc dọc mềm trong vùng chồng
                ov0, ov1 = ps[1][0], ps[0][1]
                t = np.clip((np.arange(y0, y1) - ov0) / (ov1 - ov0), 0, 1)
                wt[:, 0, 0] = 1 - t if k == 0 else t
            acc[y0:y1] += new * wt
            wsum[y0:y1] += wt
        acc /= np.maximum(wsum, 1e-6)
        if side == "L":
            out[:, :EXT] = acc
        else:
            out[:, EXT + w:] = acc
    res = Image.fromarray(np.clip(out, 0, 255).round().astype(np.uint8), "RGB")
    res.save(dst)
    chk = np.asarray(res).astype(int)[:, EXT:EXT + w]
    print(dst, res.size, "giữa khớp nguyên bản:", bool((chk == im.astype(int)).all()))


VEXT = 384           # nối trên/dưới: 1536 -> 2304 (như nền L5, MAX_H của game)


def vprep(src, out):
    """Nền 1024x1536: canvas T (dải xám VEXT ở trên + cảnh y 0..1536-VEXT) và B (cảnh y VEXT..1536 + dải xám ở dưới)."""
    im = Image.open(src).convert("RGB")
    assert im.size == (CW, CH), im.size
    out = Path(out)
    out.mkdir(parents=True, exist_ok=True)
    name = Path(src).stem
    for side in "TB":
        c = Image.new("RGB", (CW, CH), GRAY)
        if side == "T":
            c.paste(im.crop((0, 0, CW, CH - VEXT)), (0, VEXT))
        else:
            c.paste(im.crop((0, VEXT, CW, CH)), (0, 0))
        p = out / f"{name}_{side}_in.png"
        c.save(p)
        print(p)


def vmerge(src, folder, dst):
    im = np.asarray(Image.open(src).convert("RGB")).astype(float)
    name = Path(src).stem
    out = np.zeros((CH + 2 * VEXT, CW, 3))
    out[VEXT:VEXT + CH] = im
    for side in "TB":
        d = Image.open(Path(folder) / f"{name}_{side}_done.png").convert("RGB")
        if d.size != (CW, CH):
            d = d.resize((CW, CH), Image.LANCZOS)
        a = np.asarray(d).astype(float)
        if side == "T":
            new, seam, orig = a[:VEXT], a[VEXT:VEXT + SEAM], im[:SEAM]
        else:
            new, seam, orig = a[CH - VEXT:], a[CH - VEXT - SEAM:CH - VEXT], im[CH - SEAM:]
        diff = seam_diff(orig, seam, 0).reshape(1, CW, 3)    # lệch màu theo cột
        ramp = np.clip(1 - np.arange(VEXT) / FALL, 0, 1)
        if side == "T":
            ramp = ramp[::-1]
        new = new + diff * ramp[:, None, None]
        if side == "T":
            out[:VEXT] = new
        else:
            out[VEXT + CH:] = new
    res = Image.fromarray(np.clip(out, 0, 255).round().astype(np.uint8), "RGB")
    res.save(dst)
    chk = np.asarray(res).astype(int)[VEXT:VEXT + CH]
    print(dst, res.size, "giữa khớp nguyên bản:", bool((chk == im.astype(int)).all()))


if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "prep":
        prep(sys.argv[2], sys.argv[3])
    elif cmd == "merge":
        merge(sys.argv[2], sys.argv[3], sys.argv[4])
    elif cmd == "vprep":
        vprep(sys.argv[2], sys.argv[3])
    elif cmd == "vmerge":
        vmerge(sys.argv[2], sys.argv[3], sys.argv[4])
