#!/usr/bin/env python3
"""Đóng gói bản chơi thử Level 1 thành trang tĩnh trong game/dist/ (để đăng Artifact hoặc server bất kỳ).

    python game/tools/build_web.py

- Chép game/src/*.js (đổi BUILT = true trong assets.js để game đọc manifest.json thay vì dò thư mục).
- Chép PNG đang dùng từ art/out/ (chỉ key trong KEYS của assets.js) vào dist/assets/<thư mục>/, nén lại bằng Pillow
  (optimize, không đổi cỡ ảnh). Key nào chưa có ảnh thật thì chép ảnh tạm từ game/placeholders/ vào dist/assets/placeholders/.
- Chép âm thanh có trong game/audio/.
- Sinh dist/manifest.json: entries (url tương đối, điểm neo, res), pos và info đọc từ art/design-art-level1.md.
- Sinh dist/index.html chỉ gồm phần thân (Artifact tự bọc doctype/head/body).
"""
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
SPEC = ROOT / "art" / "design-art-level1.md"
PHASER = "https://cdnjs.cloudflare.com/ajax/libs/phaser/3.80.1/phaser.min.js"

INDEX = f"""<title>Meo Đâu Rồi – Level 1</title>
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
    block = text[text.index("export const KEYS"):text.index("];", text.index("export const KEYS"))]
    return re.findall(r"\['([a-z0-9_]+)', '([a-z0-9]+)'\]", block)


def parse_spec():
    pos, info = {}, {}
    for raw in SPEC.read_text(encoding="utf8").splitlines():
        line = raw.strip()
        m = re.match(r"^\|\s*([a-z0-9_]+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*([^|]*)\|", line)
        if m:
            pos[m.group(1)] = [int(m.group(2)), int(m.group(3))]
            continue
        m = re.match(r"^\|\s*`([a-z0-9_]+)`\s*\|\s*(\w+)\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|", line)
        if m:
            d = re.search(r"(rộng|cao)\s*(\d+)", m.group(3))
            info[m.group(1)] = {"folder": m.group(2),
                                "display": {"dim": "h" if d.group(1) == "cao" else "w", "val": int(d.group(2))} if d else None,
                                "neo": m.group(5).strip()}
    return pos, info


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


def main():
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
    pos, info = parse_spec()
    entries, real, temp = {}, [], []
    for key, folder in keys_from_js():
        src = ART_OUT / folder / f"{key}.png"
        if src.exists():
            copy_png(src, DIST / "assets" / folder / f"{key}.png")
            url = f"assets/{folder}/{key}.png"
            a = anchors.get(key)
            entries[key] = ({"url": url, "real": True, "ax": a["ax"], "ay": a["ay"], "res": a.get("res", 1.5)} if a
                            else {"url": url, "real": True, "auto": True})
            real.append(key)
        elif key in ph:
            copy_png(GAME / "placeholders" / f"{key}.png", DIST / "assets" / "placeholders" / f"{key}.png")
            entries[key] = {"url": f"assets/placeholders/{key}.png", "real": False, **ph[key]}
            temp.append(key)

    audio = []
    for f in sorted((GAME / "audio").glob("*")):
        if re.fullmatch(r"[a-z0-9_]+\.(mp3|ogg|wav)", f.name):
            (DIST / "audio").mkdir(exist_ok=True)
            shutil.copy2(f, DIST / "audio" / f.name)
            audio.append(f.name)

    manifest = {"entries": entries, "pos": pos, "info": info, "audio": audio,
                "phMeta": {k: v for k, v in ph.items() if k in temp}}
    (DIST / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding="utf8")
    (DIST / "index.html").write_text(INDEX, encoding="utf8")

    files = [p for p in DIST.rglob("*") if p.is_file()]
    total = sum(p.stat().st_size for p in files)
    biggest = max(files, key=lambda p: p.stat().st_size)
    print(f"dist: {len(files)} file, {total / 1e6:.1f} MB (lớn nhất {biggest.relative_to(DIST)} {biggest.stat().st_size / 1e6:.1f} MB)")
    print(f"ảnh thật: {len(real)}; ảnh tạm: {len(temp)}{' (' + ', '.join(temp) + ')' if temp else ''}")
    if len(files) > 255 or total > 64e6 or biggest.stat().st_size > 15e6:
        print("CẢNH BÁO: vượt giới hạn Artifact (255 file, 64 MB, 15 MB mỗi ảnh)")


if __name__ == "__main__":
    main()
