#!/usr/bin/env python3
"""Cắt tờ vẽ thành từng key, dọn alpha, căn các trạng thái của một đồ vật vào cùng khung và điểm neo.

Cần Python 3 + Pillow + numpy. Chạy từ thư mục gốc dự án (không dùng cờ -I).

  python tools/sheet_cut.py cut <file.md> [--sheet TÊN ...] [--src ẢNH] [--out THƯ_MỤC] [--res 1.5]
      Đọc "bảng tờ" trong file .md, cắt mọi tờ (hoặc chỉ các tờ --sheet), lưu từng key:
        mặc định  -> art/out/<thư mục>/<key>.png, ghi điểm neo vào art/out/anchors.json
        có --out  -> <out>/<key>.png và <out>/anchors.json (dùng khi thử)
      Ảnh kiểm tra (chồng 50% các trạng thái, dấu + ở điểm neo, nền kem) ở <đích>/_check/<nhóm>.png.
      Ảnh tờ tìm theo thứ tự: --src, art/out/_sheets/<tờ>.png, art/out/demo/<tờ>.png.

  python tools/sheet_cut.py clean <vào.png> <ra.png> [--ghi-de]
      Chỉ dọn alpha một ảnh (không cắt, không đổi cỡ). Không ghi đè ảnh vào trừ khi có --ghi-de.

  python tools/sheet_cut.py compose <file.md> [--anchors anchors.json] [--bg ẢNH] --out ẢNH_RA [--res 1.5]
      Ghép các key đã cắt lên nền 1024x1536 theo "bảng vị trí" (Key | X | Y [| Cảnh]) trong file .md,
      theo thứ tự dòng (dòng trên nằm dưới), để duyệt tỉ lệ, nét, màu. Không có --bg thì dùng nền kem trơn.
      --canh đầu / --canh lộ: chỉ ghép dòng có cột Cảnh chứa chữ đó (dòng để trống Cảnh luôn ghép).

Bảng tờ (markdown, tên cột phải đúng, thứ tự cột tùy ý; cột có dấu * là bắt buộc):
  | Tờ* | Ô* | Key* | Thư mục* | Nhóm | Neo | Hiển thị | Nét |
  - Tờ: tên tờ, ví dụ l1_pate_sheet (file art/out/_sheets/l1_pate_sheet.png).
  - Ô: x,y,w,h theo px trong tờ, ví dụ 0,0,512,1024.
  - Nhóm: các key cùng nhóm (các trạng thái của một đồ vật) được căn chung khung và chung tỉ lệ.
          Bỏ trống = nhóm riêng của key đó.
  - Neo: đáy | đỉnh | tâm | x,y (px trong tờ). Bỏ trống = đáy.
          đáy  = giữa phần vật ở dải 5% thấp nhất, trên mép đáy (đồ đặt sàn, mèo, nhân vật, chân hơi thơm, gốc que chim, đầu đuôi bong bóng)
          đỉnh = giữa phần vật ở dải 5% cao nhất, trên mép trên (móc đồng hồ, khoen quả lắc, mép trên rèm)
          tâm  = tâm khung bao (bướm, tia nổ, mặt mèo, thảm)
  - Hiển thị: "rộng 85" hoặc "cao 480" = cỡ trong game (khung 1024x1536). Công cụ tự co ảnh về cỡ đó × res.
          Mỗi nhóm cần ít nhất một dòng có Hiển thị; các dòng khác trong nhóm dùng chung tỉ lệ của dòng đó.
  - Nét: độ dày viền ngoài ở chỗ đậm nhất, px trong tờ = 3k (đồ vật, UI) hoặc 2,5k (mèo, nhân vật), không dưới 2k;
          k = cỡ AI thực vẽ ÷ cỡ hiển thị. Chỉ để giao việc cho Codex, công cụ cắt không dùng.
"""
import argparse
import json
import math
import re
import sys
import unicodedata
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "art" / "out"
CREAM = (251, 244, 230, 255)
LO, HI = 48, 235          # alpha <= LO -> 0, alpha >= HI -> 255 (ngưỡng Art 2D đề xuất ở A4)
MIN_BLOB = 120            # mảng rời nhỏ hơn số px này (ở cỡ tờ) bị xoá
PAD = 8                   # lề trong suốt quanh khung chung (px ở cỡ xuất)
BAND = 0.05               # dải 5% dùng cho neo đáy/đỉnh


# ---------- đọc bảng markdown ----------

def norm(s):
    s = unicodedata.normalize("NFC", s.strip().strip("`*").strip()).lower()
    return s


def md_tables(path):
    """Trả về danh sách bảng: mỗi bảng là (tiêu đề đã chuẩn hoá, các dòng dạng dict)."""
    tables, cur = [], None
    for line in Path(path).read_text(encoding="utf8").splitlines():
        line = line.strip()
        if not line.startswith("|"):
            cur = None
            continue
        cells = [c.strip() for c in line.strip("|").split("|")]
        if cur is None:
            cur = ([norm(c) for c in cells], [])
            tables.append(cur)
        elif all(re.fullmatch(r":?-{2,}:?", c) for c in cells if c):
            continue
        else:
            cur[1].append(dict(zip(cur[0], [c.strip().strip("`").strip() for c in cells])))
    return tables


def sheet_rows(path):
    rows = []
    for head, body in md_tables(path):
        if {"tờ", "ô", "key", "thư mục"} <= set(head):
            rows += body
    return rows


def position_rows(path):
    rows = []
    for head, body in md_tables(path):
        if {"key", "x", "y"} <= set(head):
            rows += body
    return rows


def parse_anchor(s):
    s = norm(s or "đáy")
    for name, alts in {"đáy": ("đáy", "day", "bottom", ""), "đỉnh": ("đỉnh", "dinh", "top"),
                       "tâm": ("tâm", "tam", "center")}.items():
        if s in alts:
            return name
    m = re.fullmatch(r"(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)", s)
    if m:
        return (float(m.group(1)), float(m.group(2)))
    sys.exit(f"Neo không hiểu: '{s}' (dùng đáy, đỉnh, tâm hoặc x,y)")


def parse_display(s):
    s = norm(s or "")
    if not s:
        return None
    m = re.fullmatch(r"(rộng|rong|cao)\s*(\d+(?:\.\d+)?)", s)
    if not m:
        sys.exit(f"Hiển thị không hiểu: '{s}' (dùng 'rộng 85' hoặc 'cao 480')")
    return ("w" if m.group(1) != "cao" else "h", float(m.group(2)))


# ---------- dọn alpha ----------

def drop_specks(a, min_px):
    """Xoá các mảng rời nhỏ (quầng, chấm lạc). Gán nhãn trên lưới thu nhỏ 4 lần cho nhanh."""
    f = 4
    h, w = a.shape
    H, W = -(-h // f), -(-w // f)
    pad = np.zeros((H * f, W * f), bool)
    pad[:h, :w] = a > 0
    small = pad.reshape(H, f, W, f).any(axis=(1, 3))
    lab = np.zeros((H, W), np.int32)
    n = 0
    for y0, x0 in zip(*np.nonzero(small)):
        if lab[y0, x0]:
            continue
        n += 1
        lab[y0, x0] = n
        stack = [(y0, x0)]
        while stack:
            y, x = stack.pop()
            for yy in (y - 1, y, y + 1):
                for xx in (x - 1, x, x + 1):
                    if 0 <= yy < H and 0 <= xx < W and small[yy, xx] and not lab[yy, xx]:
                        lab[yy, xx] = n
                        stack.append((yy, xx))
    full = np.repeat(np.repeat(lab, f, 0), f, 1)[:h, :w]
    full = np.where(a > 0, full, 0)
    counts = np.bincount(full.ravel(), minlength=n + 1)
    tiny = np.nonzero(counts < min_px)[0]
    tiny = tiny[tiny > 0]
    a = a.copy()
    a[np.isin(full, tiny)] = 0
    return a, len(tiny)


def alpha_stats(a):
    return {"max": int(a.max()), "đặc": int((a == 255).sum()), "lửng": int(((a > 0) & (a < 255)).sum())}


def clean_alpha(im, min_blob=MIN_BLOB):
    im = im.convert("RGBA")
    a = np.array(im.getchannel("A"))
    before = alpha_stats(a)
    a = a.copy()
    a[a <= LO] = 0
    a[a >= HI] = 255
    a, specks = drop_specks(a, min_blob) if min_blob else (a, 0)
    out = im.copy()
    out.putalpha(Image.fromarray(a))
    return out, before, alpha_stats(a), specks


def bleed(im):
    """Tô màu viền vào các điểm alpha 0 (giữ alpha 0) để lọc tuyến tính trong game không ra viền tối."""
    arr = np.array(im).astype(np.float32)
    a = arr[..., 3:4] / 255.0
    prem = arr[..., :3] * a
    out = arr.copy()
    hole = arr[..., 3] == 0
    done = ~hole
    for r in (2, 8, 32):
        ch = [Image.fromarray(np.clip(prem[..., i], 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r)) for i in range(3)]
        ab = np.array(Image.fromarray((a[..., 0] * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r))).astype(np.float32)
        ok = (~done) & (ab > 0.5)
        for i in range(3):
            c = np.array(ch[i]).astype(np.float32) * 255.0 / np.maximum(ab, 1e-3)
            out[..., i] = np.where(ok, np.clip(c, 0, 255), out[..., i])
        done |= ok
    out[..., 3] = arr[..., 3]
    return Image.fromarray(out.astype(np.uint8), "RGBA")


# ---------- neo và khung ----------

def bbox(a):
    ys, xs = np.nonzero(a > 0)
    if not len(xs):
        return None
    return int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1


def find_anchor(a, box, mode, cell_xy):
    x0, y0, x1, y1 = box
    if isinstance(mode, tuple):
        return mode[0] - cell_xy[0], mode[1] - cell_xy[1]
    if mode == "tâm":
        return (x0 + x1) / 2, (y0 + y1) / 2
    band = max(2, round(BAND * (y1 - y0)))
    rows = a[y1 - band:y1, x0:x1] if mode == "đáy" else a[y0:y0 + band, x0:x1]
    cols = np.nonzero((rows > 0).any(axis=0))[0]
    return x0 + (cols.min() + cols.max() + 1) / 2, (y1 if mode == "đáy" else y0)


def find_sheet(name, src):
    if src:
        return Path(src)
    for p in (OUT / "_sheets" / f"{name}.png", OUT / "demo" / f"{name}.png"):
        if p.exists():
            return p
    sys.exit(f"Không thấy ảnh tờ {name} (đã tìm art/out/_sheets/ và art/out/demo/). Dùng --src.")


def cmd_cut(args):
    rows = sheet_rows(args.spec)
    if args.sheet:
        rows = [r for r in rows if r["tờ"] in args.sheet]
    if not rows:
        sys.exit("Không có dòng nào trong bảng tờ (cần cột Tờ | Ô | Key | Thư mục).")
    if args.src and len({r["tờ"] for r in rows}) > 1:
        sys.exit("--src chỉ dùng khi cắt một tờ (thêm --sheet).")

    # 1. Cắt từng ô, dọn alpha, tìm khung bao và neo (ở cỡ tờ).
    items, sheets = [], {}
    for r in rows:
        name = r["tờ"]
        if name not in sheets:
            sheets[name] = Image.open(find_sheet(name, args.src)).convert("RGBA")
        x, y, w, h = [int(v) for v in re.split(r"\s*,\s*", r["ô"])]
        cell = sheets[name].crop((x, y, x + w, y + h))
        cell, before, after, specks = clean_alpha(cell)
        a = np.array(cell.getchannel("A"))
        box = bbox(a)
        if not box:
            sys.exit(f"{r['key']}: ô {r['ô']} trống sau khi dọn alpha.")
        edge = min(box[0], box[1], w - box[2], h - box[3])
        ax, ay = find_anchor(a, box, parse_anchor(r.get("neo")), (x, y))
        items.append(dict(key=r["key"], folder=r["thư mục"].strip("/"), group=r.get("nhóm") or r["key"],
                          sheet=name, cell=cell, box=box, anchor=(ax, ay), edge=edge,
                          display=parse_display(r.get("hiển thị")), before=before, after=after, specks=specks))

    # 2. Tỉ lệ: mỗi nhóm lấy dòng đầu tiên có Hiển thị; dòng có Hiển thị riêng dùng của nó.
    groups = {}
    for it in items:
        groups.setdefault(it["group"], []).append(it)
    for g, members in groups.items():
        ref = next((m for m in members if m["display"]), None)
        if not ref:
            sys.exit(f"Nhóm {g}: chưa có dòng nào điền cột Hiển thị.")
        for m in members:
            src = m if m["display"] else ref
            dim, val = src["display"]
            bw = src["box"][2] - src["box"][0] if dim == "w" else src["box"][3] - src["box"][1]
            m["scale"] = args.res * val / bw
            m["k"] = bw / val

    # 3. Co ảnh, tính khung chung của nhóm theo neo, dán vào khung.
    out_root = Path(args.out).resolve() if args.out else OUT
    check_dir = out_root / "_check"
    check_dir.mkdir(parents=True, exist_ok=True)
    manifest_path = out_root / "anchors.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf8")) if manifest_path.exists() else {}

    print(f"res = {args.res} (ảnh xuất = cỡ hiển thị × {args.res})")
    for g, members in groups.items():
        for m in members:
            x0, y0, x1, y1 = m["box"]
            s = m["scale"]
            m["img"] = m["cell"].crop(m["box"]).resize((max(1, round((x1 - x0) * s)), max(1, round((y1 - y0) * s))), Image.LANCZOS)
            m["a"] = ((m["anchor"][0] - x0) * s, (m["anchor"][1] - y0) * s)
        left = max(m["a"][0] for m in members)
        up = max(m["a"][1] for m in members)
        right = max(m["img"].width - m["a"][0] for m in members)
        down = max(m["img"].height - m["a"][1] for m in members)
        W, H = math.ceil(left + right) + 2 * PAD, math.ceil(up + down) + 2 * PAD
        AX, AY = PAD + math.ceil(left), PAD + math.ceil(up)
        for m in members:
            frame = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            frame.alpha_composite(m["img"], (round(AX - m["a"][0]), round(AY - m["a"][1])))
            m["frame"] = bleed(frame)
            dest = (out_root / f"{m['key']}.png") if args.out else (OUT / m["folder"] / f"{m['key']}.png")
            dest.parent.mkdir(parents=True, exist_ok=True)
            m["frame"].save(dest, optimize=True)
            rel = dest.relative_to(OUT).as_posix() if dest.is_relative_to(OUT) else dest.as_posix()
            manifest[m["key"]] = {"file": rel, "w": W, "h": H, "ax": AX, "ay": AY,
                                  "ox": round(AX / W, 4), "oy": round(AY / H, 4), "res": args.res,
                                  "sheet": m["sheet"], "group": g}
            bw, bh = m["box"][2] - m["box"][0], m["box"][3] - m["box"][1]
            warn = "  << SÁT MÉP Ô (<40px)" if m["edge"] < 40 else ""
            print(f"{m['key']:<28} tờ {m['sheet']}: vật {bw}x{bh}px, cách mép ô {m['edge']}px{warn}; k={m['k']:.2f} (viền ngoài chỗ đậm nhất nên ≈ {2.5 * m['k']:.0f}–{3 * m['k']:.0f}px, không dưới {2 * m['k']:.0f}px); "
                  f"xuất {W}x{H}, neo ({AX},{AY}); alpha max {m['before']['max']}->{m['after']['max']}, "
                  f"điểm lửng {m['before']['lửng']}->{m['after']['lửng']}, mảng rời xoá {m['specks']}")
        save_check(members, (AX, AY), check_dir / f"{g}.png")
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=1, sort_keys=True), encoding="utf8")
    print(f"Ảnh kiểm tra: {check_dir}\nĐiểm neo: {manifest_path}")


def cross(draw, x, y, r=10, color=(220, 40, 40, 255)):
    draw.line((x - r, y, x + r, y), fill=color, width=2)
    draw.line((x, y - r, x, y + r), fill=color, width=2)


def save_check(members, anchor, path):
    """Từng trạng thái trên nền kem, rồi một ô chồng 50% tất cả, dấu + đỏ ở điểm neo."""
    W, H = members[0]["frame"].size
    panels = [m["frame"] for m in members]
    if len(members) > 1:
        over = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        for f in panels:
            ghost = f.copy()
            ghost.putalpha(ghost.getchannel("A").point(lambda v: v // 2))
            over.alpha_composite(ghost)
        panels.append(over)
    sheet = Image.new("RGBA", ((W + 16) * len(panels) + 16, H + 32), CREAM)
    d = ImageDraw.Draw(sheet)
    for i, p in enumerate(panels):
        ox = 16 + i * (W + 16)
        d.rectangle((ox - 1, 15, ox + W, 16 + H), outline=(200, 190, 175, 255))
        sheet.alpha_composite(p, (ox, 16))
        cross(d, ox + anchor[0], 16 + anchor[1])
    sheet.convert("RGB").save(path)


# ---------- clean, compose ----------

def cmd_clean(args):
    src, dst = Path(args.src), Path(args.dst)
    if src.resolve() == dst.resolve() and not args.ghi_de:
        sys.exit("Ảnh ra trùng ảnh vào. Thêm --ghi-de nếu thật sự muốn ghi đè.")
    im, before, after, specks = clean_alpha(Image.open(src))
    dst.parent.mkdir(parents=True, exist_ok=True)
    bleed(im).save(dst, optimize=True)
    a = np.array(im.getchannel("A"))
    print(f"{src.name}: alpha max {before['max']}->{after['max']}, điểm đặc {before['đặc']}->{after['đặc']}, "
          f"điểm lửng {before['lửng']}->{after['lửng']}, mảng rời xoá {specks}, khung bao {bbox(a)}")
    print(f"-> {dst}")


def cmd_compose(args):
    manifest = json.loads(Path(args.anchors).read_text(encoding="utf8"))
    base_dir = Path(args.anchors).parent
    bg = Image.open(args.bg).convert("RGBA") if args.bg else Image.new("RGBA", (1024, 1536), CREAM)
    d = ImageDraw.Draw(bg)
    for r in position_rows(args.spec):
        key = r["key"]
        scene = norm(r.get("cảnh", ""))
        if args.canh and scene and norm(args.canh) not in scene:
            continue
        if key not in manifest:
            print(f"bỏ qua {key}: chưa có trong {args.anchors}")
            continue
        info = manifest[key]
        f = Path(info["file"])
        f = f if f.is_absolute() else (OUT / f if (OUT / f).exists() else base_dir / f.name)
        im = Image.open(f).convert("RGBA")
        k = 1 / info.get("res", args.res)
        im = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
        x, y = float(r["x"]), float(r["y"])
        bg.alpha_composite(im, (round(x - info["ax"] * k), round(y - info["ay"] * k)))
        if args.marks:
            cross(d, x, y, 6)
    Path(args.out).parent.mkdir(parents=True, exist_ok=True)
    bg.convert("RGB").save(args.out)
    print(f"-> {args.out}")


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)
    c = sub.add_parser("cut")
    c.add_argument("spec")
    c.add_argument("--sheet", nargs="*")
    c.add_argument("--src")
    c.add_argument("--out")
    c.add_argument("--res", type=float, default=1.5)
    c.set_defaults(fn=cmd_cut)
    c = sub.add_parser("clean")
    c.add_argument("src")
    c.add_argument("dst")
    c.add_argument("--ghi-de", action="store_true")
    c.set_defaults(fn=cmd_clean)
    c = sub.add_parser("compose")
    c.add_argument("spec")
    c.add_argument("--anchors", default=str(OUT / "anchors.json"))
    c.add_argument("--bg")
    c.add_argument("--out", required=True)
    c.add_argument("--res", type=float, default=1.5)
    c.add_argument("--marks", action="store_true", help="vẽ dấu + ở điểm neo")
    c.add_argument("--canh", help="chỉ ghép các dòng có cột Cảnh chứa chữ này (dòng để trống Cảnh luôn được ghép)")
    c.set_defaults(fn=cmd_compose)
    a = p.parse_args()
    a.fn(a)


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
