#!/usr/bin/env python3
"""Đóng gói bản chơi thử (Level 1–5) thành trang tĩnh trong game/dist/ (để đăng Artifact hoặc server bất kỳ).

    python game/tools/build_web.py

- Chép game/src/*.js (đổi BUILT = true trong assets.js để game đọc manifest.json thay vì dò thư mục).
- G5-32: ảnh nền đặc (key có `_bg_`, không có điểm trong suốt) đổi sang JPG chất lượng 92, giữ đủ màu (4:4:4) để trời,
  tường nhạt không có vệt nén. Ảnh gốc PNG trong art/out/ giữ nguyên; manifest trỏ tới file .jpg.
- Chép PNG đang dùng từ art/out/ (chỉ key trong KEYS của assets.js) vào dist/assets/<thư mục>/, nén lại bằng Pillow
  (optimize, không đổi cỡ ảnh). Key nào chưa có ảnh thật thì chép ảnh tạm từ game/placeholders/ vào dist/assets/placeholders/.
- Chép âm thanh có trong game/audio/.
- Sinh dist/manifest.json: entries (url tương đối, điểm neo, res), pos và info đọc từ art/design-art-level1.md.
- Sinh dist/index.html chỉ gồm phần thân (Artifact tự bọc doctype/head/body).
- Đăng từng phần (GD chọn, không nén ảnh): so với bản đã đăng (game/dist_published.json), in và ghi game/dist_changes.txt
  danh sách file mới / đã đổi / đã bỏ. Mỗi lần đăng chỉ gửi file mới + đã đổi, xoá file đã bỏ.
  Đăng xong chạy:  python game/tools/build_web.py --mark-published   (lấy dist hiện tại làm mốc cho lần sau).
"""
import hashlib
import io
import json
import re
import shutil
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
GAME = ROOT / "game"
ART_OUT = ROOT / "art" / "out"
DIST = GAME / "dist"
PUBLISHED = GAME / "dist_published.json"   # mã băm từng file của bản đã đăng (mốc so sánh)
CHANGES = GAME / "dist_changes.txt"
SPECS = {n: ROOT / "art" / f"design-art-level{n}.md" for n in (1, 2, 3, 4, 5, 6)}  # màn chưa có design-art (bản khối): bỏ qua
PHASER = "https://cdnjs.cloudflare.com/ajax/libs/phaser/3.80.1/phaser.min.js"

INDEX = f"""<title>Meo Đâu Rồi</title>
<style>
  html, body {{ margin: 0; padding: 0; height: 100%; background: #2b2420; overflow: hidden; touch-action: none; }}
  #game {{ width: 100%; height: 100%; }}
  canvas {{ display: block; }}
</style>
<script src="{PHASER}"></script>
<div id="game"></div>
<script type="module" src="src/main.js"></script>
"""


def keys_from_js():
    text = (GAME / "src" / "assets.js").read_text(encoding="utf8")
    start = text.index("const BAG_UI")  # danh sách dùng chung khai báo ngay trước KEYS, tính luôn
    block = text[start:text.index("\n};", start)]
    return re.findall(r"\['([a-z0-9_]+)', '([a-z0-9]+)'\]", block)


def parse_spec(spec):
    pos, info, fit = {}, {}, {}
    if not spec.exists():
        return pos, info, fit
    for raw in spec.read_text(encoding="utf8").splitlines():
        line = raw.strip()
        m = re.match(r"^\|\s*([a-z0-9_]+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*([^|]*)\|\s*(\d+)?", line)
        if m:
            pos[m.group(1)] = [int(m.group(2)), int(m.group(3))]
            if m.group(5):
                fit[m.group(1)] = int(m.group(5))  # cột "Rộng demo" (level 3+)
            continue
        m = re.match(r"^\|\s*`([a-z0-9_]+)`\s*\|\s*(\w+)\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|", line)
        if m:
            d = re.search(r"(rộng|cao)\s*(\d+)", m.group(3))
            info[m.group(1)] = {"folder": m.group(2),
                                "display": {"dim": "h" if d.group(1) == "cao" else "w", "val": int(d.group(2))} if d else None,
                                "neo": m.group(5).strip()}
    return pos, info, fit


def copy_png(src, dst):
    """Nén lại PNG (optimize, giữ nguyên cỡ và kênh màu); giữ bản nào nhỏ hơn."""
    dst.parent.mkdir(parents=True, exist_ok=True)
    raw = src.read_bytes()
    im = Image.open(src)
    buf = io.BytesIO()
    im.save(buf, "PNG", optimize=True)
    data = buf.getvalue()
    dst.write_bytes(data if len(data) < len(raw) else raw)
    return im.size


JPG_Q = 92  # G5-32: nền JPG, đủ cao để không thấy vệt nén ở vùng trời và tường nhạt


def is_solid_bg(key, src):
    """Ảnh nền đặc: key có `_bg_` và mọi điểm đều đục (không cần kênh trong suốt)."""
    if "_bg_" not in key:
        return False
    im = Image.open(src)
    return im.mode == "RGB" or (im.mode in ("RGBA", "LA") and im.getchannel("A").getextrema()[0] == 255)


def copy_jpg(src, dst):
    dst.parent.mkdir(parents=True, exist_ok=True)
    im = Image.open(src).convert("RGB")
    im.save(dst, "JPEG", quality=JPG_Q, subsampling=0, optimize=True, progressive=True)
    return im.size


def dist_hashes():
    return {p.relative_to(DIST).as_posix(): hashlib.sha1(p.read_bytes()).hexdigest()
            for p in sorted(DIST.rglob("*")) if p.is_file()}


def report_changes():
    """So dist với bản đã đăng: in và ghi danh sách file mới, đã đổi, đã bỏ."""
    now = dist_hashes()
    old = json.loads(PUBLISHED.read_text(encoding="utf8")) if PUBLISHED.exists() else {}
    added = sorted(k for k in now if k not in old)
    changed = sorted(k for k in now if k in old and old[k] != now[k])
    removed = sorted(k for k in old if k not in now)
    send = added + changed
    size = sum((DIST / k).stat().st_size for k in send)
    total = sum((DIST / k).stat().st_size for k in now)
    lines = [f"So với bản đã đăng ({'chưa có mốc: coi mọi file là mới' if not old else PUBLISHED.name}).",
             f"Cần gửi: {len(send)} file, {size / 1e6:.1f} MB (mới {len(added)}, đã đổi {len(changed)}); cần bỏ: {len(removed)} file.",
             f"Cả bản: {len(now)} file, {total / 1e6:.1f} MB.", ""]
    for title, items in (("MỚI", added), ("ĐÃ ĐỔI", changed), ("ĐÃ BỎ", removed)):
        lines.append(f"## {title} ({len(items)})")
        lines += items or ["(không có)"]
        lines.append("")
    CHANGES.write_text(chr(10).join(lines), encoding="utf8")
    print(chr(10).join(lines[:3]))
    for title, items in (("mới", added), ("đã đổi", changed), ("đã bỏ", removed)):
        if items:
            print(f"  {title}: " + ", ".join(items[:12]) + (f" … (+{len(items) - 12}, xem {CHANGES.name})" if len(items) > 12 else ""))
    if len(send) > 255 or size > 64e6:
        print("CẢNH BÁO: lượt gửi vượt 255 file hoặc 64 MB: chia làm nhiều lượt đăng.")
    if total > 256e6 or len(now) > 511:
        print("CẢNH BÁO: cả bản vượt 256 MB hoặc 511 file (giới hạn một phiên bản Artifact).")


def mark_published():
    PUBLISHED.write_text(json.dumps(dist_hashes(), indent=0), encoding="utf8")
    print(f"Đã lấy dist hiện tại làm mốc đã đăng ({PUBLISHED}).")


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    if "--mark-published" in sys.argv:
        mark_published()
        return
    sys.stdout.reconfigure(encoding="utf-8")
    # Xoá nội dung cũ nhưng giữ thư mục dist (trên Windows thư mục đang mở bởi tiến trình khác thì không xoá được).
    DIST.mkdir(parents=True, exist_ok=True)
    for child in DIST.iterdir():
        shutil.rmtree(child) if child.is_dir() else child.unlink()
    (DIST / "src").mkdir(parents=True)
    for f in (GAME / "src").glob("*.js"):
        text = f.read_text(encoding="utf8")
        if f.name == "assets.js":
            text, n = re.subn(r"export const BUILT = false;", "export const BUILT = true;", text)
            assert n == 1, "không thấy BUILT trong assets.js"
        (DIST / "src" / f.name).write_text(text, encoding="utf8")

    anchors = json.loads((ART_OUT / "anchors.json").read_text(encoding="utf8")) if (ART_OUT / "anchors.json").exists() else {}
    ph = json.loads((GAME / "placeholders" / "placeholders.json").read_text(encoding="utf8"))
    pos, info, fit = {}, {}, {}
    for lv, spec in SPECS.items():
        pos[lv], inf, fit[lv] = parse_spec(spec)
        info = {**inf, **info}
    entries, real, temp, drawn = {}, [], [], []
    for key, folder in keys_from_js():
        src = ART_OUT / folder / f"{key}.png"
        if src.exists():
            ext = "jpg" if is_solid_bg(key, src) else "png"
            (copy_jpg if ext == "jpg" else copy_png)(src, DIST / "assets" / folder / f"{key}.{ext}")
            url = f"assets/{folder}/{key}.{ext}"
            a = anchors.get(key)
            entries[key] = ({"url": url, "real": True, "ax": a["ax"], "ay": a["ay"], "res": a.get("res", 1.5)} if a
                            else {"url": url, "real": True, "auto": True})
            real.append(key)
        elif key in ph:
            copy_png(GAME / "placeholders" / f"{key}.png", DIST / "assets" / "placeholders" / f"{key}.png")
            entries[key] = {"url": f"assets/placeholders/{key}.png", "real": False, **ph[key]}
            temp.append(key)
        elif key not in drawn:
            drawn.append(key)  # chưa có ảnh: màn tự vẽ bằng code (makeFallback)

    audio = []
    for f in sorted((GAME / "audio").glob("*")):
        if re.fullmatch(r"[a-z0-9_]+\.(mp3|ogg|wav)", f.name):
            (DIST / "audio").mkdir(exist_ok=True)
            shutil.copy2(f, DIST / "audio" / f.name)
            audio.append(f.name)

    manifest = {"entries": entries, "pos": pos, "info": info, "fit": fit, "audio": audio,
                "phMeta": {k: v for k, v in ph.items() if k in temp}}
    (DIST / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding="utf8")
    (DIST / "index.html").write_text(INDEX, encoding="utf8")

    files = [p for p in DIST.rglob("*") if p.is_file()]
    total = sum(p.stat().st_size for p in files)
    biggest = max(files, key=lambda p: p.stat().st_size)
    print(f"dist: {len(files)} file, {total / 1e6:.1f} MB (lớn nhất {biggest.relative_to(DIST)} {biggest.stat().st_size / 1e6:.1f} MB)")
    print(f"ảnh thật: {len(real)}; ảnh tạm: {len(temp)}{' (' + ', '.join(temp) + ')' if temp else ''}")
    print(f"vẽ bằng code (chưa có ảnh): {len(drawn)}{' (' + ', '.join(drawn) + ')' if drawn else ''}")
    if biggest.stat().st_size > 15e6:
        print("CẢNH BÁO: có ảnh vượt 15 MB (giới hạn Artifact mỗi ảnh)")
    report_changes()


if __name__ == "__main__":
    main()
