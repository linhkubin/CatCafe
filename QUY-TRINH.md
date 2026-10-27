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

### Quy tắc giữ màu (chủ dự án chốt, O6; áp cho mọi lượt vẽ: demo, tờ, ảnh lẻ)

- **Mọi lời giao việc** cho Codex phải kèm `art/ref/owner_l1_style_ref.png` làm **ảnh tham chiếu màu và chất chì** (không chỉ tham chiếu nhân vật), và dán nguyên khối **COLOR** trong `art/style.md` mục 1 (bảng màu khóa, cấm màu đậm hơn ô màu, mảng lớn nhạt nhất, vân chì không tô phẳng).
- Codex phải nhắc lại khối màu trong phần "Nhắc lại quy tắc" và chấm **đạt / không đạt** về màu trong "Tự kiểm".
- **Art kiểm trước khi gửi** (demo) hoặc **trước khi cắt** (tờ):
  1. Đặt cạnh ảnh mẫu level 1 ở cùng cỡ, nhìn: tường, sàn, đồ to có nhạt và mềm như mẫu không; có mảng nào đậm, chói, tô phẳng không.
  2. Đo độ bão hoà HSV: **trung bình ≤ 0,25** và **phân vị 90 ≤ 0,46** (mức của ảnh mẫu). Với **demo và nền**: đo trên chính ảnh. Với **tờ trong suốt**: không đo riêng tờ (đồ nhỏ nhiều màu nên luôn "vượt", kể cả tờ L1–L3 đã duyệt); thay vào đó **ghép các key lên nền** thành cảnh như demo, đo cảnh ghép theo ngưỡng trên và nhìn đặt cạnh demo đã duyệt (G4-20). Vượt thì vẽ lại, góp ý chỉ đúng món bị đậm.
- Không sửa màu bằng hậu kỳ (giảm bão hoà, chỉnh màu) trên ảnh Codex trả về: vẽ lại cho đúng.

### Quy tắc góc nhìn (chủ dự án chốt: theo sofa level 1)

- Mọi lời giao việc kèm ảnh mẫu góc `art/ref/l1_depth_angle_ref.png` (sofa level 1) và dán nguyên khối **CAMERA** trong `art/style.md` mục 2b.
- **Art kiểm trước khi gửi/cắt:** đặt cạnh sofa level 1: đồ có nhìn hơi trực diện như sofa không, có thấy rõ mặt trên và độ dày không, mặt hông có rất hẹp không, có đồ nào xoay chéo hoặc phẳng không.
- Ảnh sai rõ thì **vẽ lại từ đầu với cùng lời giao việc**, không vá dần bằng nhiều lượt chỉnh sửa chồng lên nhau.

## 4. Chờ chủ dự án duyệt demo, rồi mới tách và ghép vào game

- **Chưa duyệt thì không tách asset, không ghép vào game.**
- Duyệt xong: Art 2D giao Codex vẽ từng tờ (mỗi lượt vẫn kèm demo đã duyệt + ảnh mẫu level 1, theo **Quy tắc giữ màu** ở bước 3), kiểm màu rồi mới cắt bằng `tools/sheet_cut.py`.
- Dev ráp vào game, đo vị trí theo demo, chơi thử, chụp ảnh để GD/PM kiểm.
- **Demo đã duyệt là chuẩn duy nhất (G4-22, sau lỗi duyệt level 4):**
  - Art vẽ tờ: lời giao việc của mỗi đồ kèm **ảnh cắt đúng món đó từ demo đã duyệt** và câu "vẽ lại đúng món này: cùng hình dáng, tỉ lệ, màu, chi tiết". Không tự thiết kế lại.
  - **Mọi lượt tách ảnh (vẽ tờ, ảnh lẻ, nền) đều gửi kèm ẢNH DEMO GỐC đã duyệt của phòng đó** (nguyên ảnh `art/out/demo/l<N>_demo_*.png`, không chỉ ảnh cắt), để Codex thấy món đồ nằm trong cảnh: cỡ so với đồ xung quanh, màu, nét, ánh sáng. Lời giao việc ghi rõ "ảnh demo gốc: <đường dẫn>, món cần vẽ nằm ở <vị trí trong demo>". Thiếu ảnh demo gốc thì lượt vẽ coi như hỏng (chủ dự án chốt, G4-26).
  - **Cùng một món ở nhiều trạng thái hoặc nhiều chỗ** (vali lúc gấp và lúc trên tháp, sách rơi và chồng sách và sách trên tháp, gối trên giường và trên tháp…) phải **cùng thiết kế, cùng màu**; vẽ chung một tờ.
  - Dev đặt đồ: vị trí và cỡ đo trên demo; mỗi phòng **chồng ảnh game lên demo** (play_harness `compare`) và sửa tới khi khớp.
  - **Không ai báo xong bằng ảnh ghép tĩnh.** Art và Dev gửi GD ảnh chụp **trong game** từng phòng đặt cạnh demo, mọi trạng thái chính (trước/sau khi chạm, cao trào). **GD tự mở game chơi hết màn**, soi từng đồ với demo, rồi mới báo chủ dự án.
- Commit bằng tiếng Việt và push. **Chỉ đăng lên link online khi chủ dự án yêu cầu.**
