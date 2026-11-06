
**A9-? (Art, G9-17, chủ dự án chọn "vẽ tờ 4 khung").** Codex không có công cụ video (kiểm môi trường: `art/out/_logs/codex_env_report.txt`), nên vẽ lại 4 khung đi của Mun **chung một tờ, một lần gọi** (brief `art/review/l9_mun_walk4_sheet_brief.md`, tờ `art/out/_sheets/l9src_mun_walk4.png`):
- Mun mặt tròn, đi sang phải, chân chéo: chạm A → qua A → chạm B → qua B; thân nhún lên ≈ 18px (≈ 4% chiều cao) ở khung qua; đuôi đung đưa. Cả 4 khung cùng thân, mặt, màu, nét.
- Cắt bằng sheet_cut (design-art-level9, 4 dòng `l9src_mun_walk4`), neo mỗi ô = (mắt − 174, đường sàn) để bước tại chỗ không giật ngang. Ra `mun_soup_walk_0..3.png` 397x338, neo (195, 329) (cũ 403x352, neo (199, 343)), cỡ hiển thị như cũ (nhóm `mun_soup_walkc`, rộng 253.49). Khung cũ cất ở `art/out/_refs/walk_old/`.
- Xem thử (ghép từ 4 khung, không phải video AI): `art/review/l9_check/l9_mun_walk4_preview.mp4` (4 giây, 8 hình/giây, tại chỗ), GIF tại chỗ `l9_mun_walk4_inplace.gif`, GIF đi ngang `l9_mun_walk4_across.gif`, so cũ/mới `l9_mun_walk4_old_vs_new.png`. Vòng lặp liền: chênh lệch khung cuối → khung đầu bằng một bước thường.

### Art 2D – Mun đi bộ 4 khung theo tờ dáng mẫu (2026-11-06, chủ dự án duyệt "sửa rồi đưa vào")
- Tờ dáng mẫu mới `art/ref/pose/walk4_side_right.png` (dựng bằng `tools/pose_guide.py`): nhịp đi mèo thật, mỗi khung một chân nhấc, thứ tự trước-gần → sau-xa → trước-xa → sau-gần; thân nhún ở khung 1, 3.
- Codex vẽ `art/out/_sheets/l9src_mun_walk4_pose.png` theo tờ mẫu; khung 2 nhấc nhầm chân trước gần nên Codex sửa riêng khung đó (`art/out/_edit/l9_mun_walk_f2_done.png`), ghép thành tờ `l9src_mun_walk4b.png`.
- Đã cắt vào game: `art/out/cats/mun_soup_walk_0..3.png` 440x342, neo chung (237,331), cỡ hiển thị giữ như cũ (cùng chiều cao mèo). Bảng tờ trong design-art-level9.md trỏ sang `l9src_mun_walk4b`. Bộ trước lưu ở `art/out/_refs/walk_pose_prev/`.
- **Dev:** không cần sửa code (tên key, thứ tự khung, neo theo anchors.json). Chỉ cần tải lại. Xem thử ghép theo đúng code cảnh kết: `art/review/l9_check/l9_end_walk_final.mp4` (trái bộ trước, phải bộ mới).

### Dev – Mun đi bộ 4 khung mới trong cảnh kết (2026-11-06)
- Đã tải lại trong game (cổng 8080, khung 9:16), chạy `finale()` của L9. Ảnh mới đã vào: `mun_soup_walk_0..3` 440x342, neo chung (237, 331) đọc từ anchors.json. Không sửa code.
- **Neo:** đáy chân 4 khung lệch nhau ≤ 3px ảnh gốc; thân không giật ngang. Thân nhô lên ở khung 1, 3 đúng nhịp nảy của code (đỉnh nảy trùng khung giữa bước).
- **Nhịp khung:** đổi khung theo quãng đã đi (mỗi 35px một khung). Lúc đầu ≈ 10 hình/giây, chậm dần khi tới bát (Sine.out); đứng lại ở khung 0.
- **Chân trượt:** chân đang chạm sàn lùi ≈ 44–67px ảnh gốc mỗi khung. Mỗi khung thân đi 35px trên màn ≈ 47px ảnh gốc, nên chân gần như đứng yên trên sàn, không thấy trượt.
- **Một điểm nhỏ:** khung 0 có đuôi duỗi dài ra sau, rộng hơn bộ cũ ≈ 21px trên màn. Lúc vừa tới chỗ (x 90) và đứng ở khung 0 khoảng 0,07 giây, phần đuôi và mông bị mép trái màn 9:16 cắt; sang dáng ngạc nhiên thì lộ đủ. Không cần sửa trừ khi GD muốn Mun đứng lùi vào trong.
- Ảnh: `l9_check/d9_mun_walk_strip.jpg` (Mun vào từ mép trái, đang bước, tới bát, ngạc nhiên), ảnh lẻ `d9_walk_*.jpg`.
- Chưa build lại bản web. Chưa commit.
