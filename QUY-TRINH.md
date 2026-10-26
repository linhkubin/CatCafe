# Quy trình làm một level

Đội: **Claude** (Game Design + PM), **Art 2D** (đặc tả ảnh, chỉ đạo Codex), **Dev** (code, animation), **Codex** (chỉ vẽ).
Mỗi level có một file thảo luận `art/review/level<N>-thread.md`; mọi quyết định ghi vào đó.

## 1. Đọc level, đặc tả kỹ từng đồ vật và trạng thái

- GD đọc mục level trong `levels/levels-XX-YY.md` và `levels/states-XX-YY.md`, chốt các điểm gameplay còn mở.
- Art 2D viết `art/design-art-level<N>.md`: bối cảnh phòng, rồi **từng đồ vật** với góc nhìn (theo "Góc nhìn chung" trong `art/style.md`), mặt thấy được, tỉ lệ, chất liệu, màu.
- Với mỗi đồ, liệt kê **mọi trạng thái** (đóng/mở, trước/sau khi chạm, các nấc…) và điều gì giữ nguyên giữa các trạng thái (khung, đường đáy, góc nhìn), để các trạng thái vẽ khớp nhau.

- **Tách nền và đồ (chủ dự án chốt, áp cho mọi màn từ Level 4; Level 3 giữ như hiện tại):** ảnh nền chỉ gồm **phòng trống**: tường, sàn, chân tường, trần. **Mọi đồ vật đều vẽ riêng thành sprite**, kể cả đồ không tương tác như thảm, bàn, sofa, kệ, cửa sổ, tranh, đèn. Không vẽ đồ dính vào nền rồi cắt ra.

## 2. Art 2D và Dev cùng phân tích yêu cầu art

- Dev nêu yêu cầu animation: tách lớp, điểm neo, vật con (đồ nằm trên đồ khác), lớp hiển thị, vùng chạm.
- Art 2D trả lời, chốt danh sách key, tờ vẽ, cỡ hiển thị. Điểm nào thuộc gameplay thì GD chốt.

## 3. Vẽ demo các phòng

- Trước mỗi lượt Codex vẽ demo, **gửi kèm ảnh chụp level 1** làm mẫu để giữ style, nét vẽ và màu: `art/ref/owner_l1_style_ref.png` (mẫu chuẩn) và các tranh `art/out/demo/l1_demo_*.png`.
- Lời giao việc dán thẳng khối quy tắc style + góc nhìn; Codex **nhắc lại quy tắc trước khi vẽ** và **tự kiểm** cuối lượt (thiếu thì coi như lượt hỏng). Xem `AGENTS.md`.
- Gửi demo cho chủ dự án, kèm ảnh đặt cạnh ảnh mẫu level 1.

## 4. Chờ chủ dự án duyệt demo, rồi mới tách và ghép vào game

- **Chưa duyệt thì không tách asset, không ghép vào game.**
- Duyệt xong: Art 2D giao Codex vẽ từng tờ (mỗi lượt vẫn kèm demo đã duyệt + ảnh mẫu level 1), cắt bằng `tools/sheet_cut.py`.
- Dev ráp vào game, đo vị trí theo demo, chơi thử, chụp ảnh để GD/PM kiểm.
- Commit bằng tiếng Việt và push. **Chỉ đăng lên link online khi chủ dự án yêu cầu.**
