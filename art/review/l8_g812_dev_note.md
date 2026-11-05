# G8-12 — ghi chú ảnh cho Dev 2 (Art 2D 2, 2026-11-01)

Số liệu trong `art/out/anchors.json`. Ảnh kiểm: `art/review/l8_g812_check.jpg`. Chưa commit.

1. **Khay riêng** (`art/out/common/`), cắt từ `ui_bag_bar` gốc (bỏ đoạn giữa, quai/viền/chất liệu giữ nguyên):
   - `ui_bag_bar_2`: file 553x311, hiển thị 402x226, neo đáy (276, 303).
   - `ui_bag_bar_1`: file 356x311, hiển thị 259x226, neo đáy (178, 303).
   - Co **cùng hệ số** với khay 4 ô (`barK = 688 / bề rộng ui_bag_bar`), không co theo bề rộng mới (để viền dày bằng nhau).
   - Tâm ô: khay 2 ô ở x khay ± 71,5 (cách 143 như cũ); khay 1 ô ở x khay. Độ cao tâm ô như khay 4 ô (`trayY`).
2. **Đuôi** `mun_bath_tail_dirty / wet / fluffy / sleek`: vẽ lại, giữ tên key, hướng (gốc dưới-trái, đuôi cong lên phải) và góc nghỉ +25. **Không đổi gốc đuôi trong PTS.** Neo mới (code đọc tự động từ anchors.json):
   - dirty 151x241, neo (27, 207);
   - wet 150x256, neo (28, 224);
   - fluffy, sleek 156x238, neo (27, 202).
   Gốc đuôi to tròn, khuất sau thân khoảng 25 px.
3. **`l8_tool_brush_down`** (`art/out/level8/`): lược úp (thấy lưng gỗ, viền lông dưới mép). Cùng nhóm với `l8_tool_brush`: khung 242x124, neo tâm (121, 62), cùng tâm. Trong khay dùng `l8_tool_brush`; đang kéo đổi sang `l8_tool_brush_down`; thả ra về `l8_tool_brush`.

Bản cũ: `art/ref/backup/l8_g812/`.
