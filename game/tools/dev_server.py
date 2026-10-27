#!/usr/bin/env python3
"""Server chạy thử local: như `python -m http.server` (có liệt kê thư mục, game cần để dò ảnh),
nhưng gửi Cache-Control: no-store để trình duyệt luôn nạp lại JS/ảnh mới sau khi sửa.

    python game/tools/dev_server.py [cổng=8080]     (chạy ở gốc dự án, mở http://127.0.0.1:8080/game/)
"""
import http.server
import sys
from functools import partial
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080


class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    # Lưu ảnh chụp trong game khi khung trình duyệt bị ẩn: POST /save?art/review/<...>.jpg, thân = data URL.
    # Chỉ ghi vào art/review/.
    def do_POST(self):
        import base64
        from urllib.parse import unquote
        rel = unquote(self.path.split("?", 1)[-1])
        dst = (ROOT / rel).resolve()
        if not self.path.startswith("/save?") or not str(dst).startswith(str(ROOT / "art" / "review")):
            self.send_error(403)
            return
        body = self.rfile.read(int(self.headers["Content-Length"])).decode()
        dst.parent.mkdir(parents=True, exist_ok=True)
        dst.write_bytes(base64.b64decode(body.split(",", 1)[1]))
        self.send_response(200)
        self.end_headers()


http.server.ThreadingHTTPServer(("127.0.0.1", PORT), partial(NoCache, directory=str(ROOT))).serve_forever()
