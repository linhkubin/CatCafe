# Quy trình làm một level

Đội: **Claude** (Game Design + PM), **Art 2D** (đặc tả ảnh, chỉ đạo Codex), **Dev** (code, animation), **Codex** (chỉ vẽ).
Mỗi level có một file thảo luận `art/review/level<N>-thread.md`; mọi quyết định ghi vào đó.

## 1. Đọc level, đặc tả kỹ từng đồ vật và trạng thái

- GD đọc mục level trong `levels/levels-XX-YY.md` và `levels/states-XX-YY.md`, chốt các điểm gameplay còn mở.
- Art 2D viết `art/design-art-level<N>.md`: bối cảnh phòng, rồi **từng đồ vật** với góc nhìn (theo "Góc nhìn chung" trong `art/style.md`), mặt thấy được, tỉ lệ, chất liệu, màu.
- Với mỗi đồ, liệt kê **mọi trạng thái** (đóng/mở, trước/sau khi chạm, các nấc…) và điều gì giữ nguyên giữa các trạng thái (khung, đường đáy, góc nhìn), để các trạng thái vẽ khớp nhau.

- **Tách nền và đồ (chủ dự án chốt, áp cho mọi màn từ Level 4; Level 3 giữ như hiện tại):** ảnh nền chỉ gồm **phòng trống**: tường, sàn, chân tường, trần. **Mọi đồ vật đều vẽ riêng thành sprite**, kể cả đồ không tương tác như thảm, bàn, sofa, kệ, cửa sổ, tranh, đèn. Không vẽ đồ dính vào nền rồi cắt ra.

## 2. Dev code bản chơi thử bằng khối cơ bản (chủ dự án chốt, áp từ Level 5)

- Trước khi vẽ bất cứ ảnh nào, **Dev code cả màn bằng khối cơ bản** (hình chữ nhật, tròn, elip tô màu phẳng, nhãn chữ ngắn ghi tên đồ; nhân vật và mèo cũng là khối có nhãn). Không cần ảnh, không chờ Art.
- Bản khối phải **chơi được trọn màn**: đủ phòng và chuyển phòng, mọi đồ vật với đúng thao tác (chạm, vuốt, kéo-thả, giữ-kéo), mọi trạng thái (đổi màu/hình khối hoặc đổi nhãn), túi đồ dùng chung, đồ đánh lừa, bí mật, thang gợi ý, chạm sai, cao trào và cảnh thắng. Hiệu ứng chuyển động (rơi, bay, nảy, xoay) làm thật bằng tween để cảm được nhịp.
- Bố cục khối theo sơ đồ phòng trong đặc tả level; cỡ khối gần đúng cỡ đồ thật để kiểm vùng chạm và độ dễ nhìn.
- Mở bằng `?level=<N>` như màn thật (hoặc cờ `&proto=1` nếu màn đã có bản vẽ). Code dùng lại được khi thay khối bằng ảnh: đặt tên key, vị trí, lớp đúng đặc tả.
- **GD tự chơi hết bản khối** trước, rồi gửi chủ dự án link chơi thử. Chủ dự án **duyệt gameplay** (luật, nhịp, độ khó, vị trí đồ) rồi mới sang bước 3 (bàn art) và bước 4 (vẽ demo). Góp ý gameplay sửa ngay trên bản khối, rẻ hơn nhiều so với sửa sau khi đã vẽ.
- Kết quả đã duyệt của bản khối (vị trí, cỡ đồ, lớp) là đầu vào cho đặc tả art và demo.

## 3. Art 2D và Dev cùng phân tích yêu cầu art

- Dev nêu yêu cầu animation: tách lớp, điểm neo, vật con (đồ nằm trên đồ khác), lớp hiển thị, vùng chạm.
- Art 2D trả lời, chốt danh sách key, tờ vẽ, cỡ hiển thị. Điểm nào thuộc gameplay thì GD chốt.

## 4. Vẽ demo các phòng

- Trước mỗi lượt Codex vẽ demo, **gửi kèm ảnh chụp level 1** làm mẫu để giữ style, nét vẽ và màu: `art/ref/owner_l1_style_ref.png` (mẫu chuẩn) và các tranh `art/out/demo/l1_demo_*.png`.
- Lời giao việc dán thẳng khối quy tắc style + góc nhìn; Codex **nhắc lại quy tắc trước khi vẽ** và **tự kiểm** cuối lượt (thiếu thì coi như lượt hỏng). Xem `AGENTS.md`.
- Gửi demo cho chủ dự án, kèm ảnh đặt cạnh ảnh mẫu level 1.
- **Khung màn hình 1080x1920 (9:16), chủ dự án chốt từ Level 5:** demo và mọi ảnh kiểm (ảnh chụp trong game của Dev, Art, GD) trình theo khung 1080x1920. Game giữ 1024 ngang; trên màn 9:16 khung game là 1024x1820, vùng chơi chính 1024x1536 ở giữa, trên và dưới mỗi bên dư 142px. **Nền vẽ dư trên dưới** cho phần này (trời, tường, sàn kéo dài), không để trống. Demo đặt đúng thanh tim và nút tạm dừng ở mép trên, túi đồ và nút 💡 ngay trên dải banner 150px ở mép dưới. Dev chụp trong game ở khung 540x960 hoặc 1080x1920.
- **Co giãn theo màn (chủ dự án chốt 2026-10-30, G-SCREEN):** khung chuẩn 1080x1920 (toạ độ trong code vẫn 1024x1820, cùng tỉ lệ). Màn **dài hơn** 9:16: giữ đủ chiều ngang, mở thêm trên dưới. Màn **rộng hơn** 9:16: giữ đủ chiều dọc 1820, mở thêm hai bên, **tới tối đa 3:4** (rộng 1365, mỗi bên dư ~171). Rộng hơn 3:4 thì viền màu nền hai bên. Đồ tương tác chỉ nằm trong khung 1024 giữa; phần dư hai bên chỉ là cảnh nền. Giao diện (tim, tạm dừng, túi đồ, 💡) bám mép màn thật. **Mọi nền vẽ dư hai bên** cho đủ 3:4: rộng ≥ 1366 (ví dụ 1366x2304), cảnh kéo dài tự nhiên. Ảnh kiểm trình thêm khung 3:4 (1440x1920).

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

## 5. Chờ chủ dự án duyệt demo, rồi mới tách và ghép vào game

- **Chưa duyệt thì không tách asset, không ghép vào game.**
- Duyệt xong: Art 2D giao Codex vẽ từng tờ (mỗi lượt vẫn kèm demo đã duyệt + ảnh mẫu level 1, theo **Quy tắc giữ màu** ở bước 4), kiểm màu rồi mới cắt bằng `tools/sheet_cut.py`.
- Dev ráp vào game, đo vị trí theo demo, chơi thử, chụp ảnh để GD/PM kiểm.
- **Demo đã duyệt là chuẩn duy nhất (G4-22, sau lỗi duyệt level 4):**
  - Art vẽ tờ: lời giao việc của mỗi đồ kèm **ảnh cắt đúng món đó từ demo đã duyệt** và câu "vẽ lại đúng món này: cùng hình dáng, tỉ lệ, màu, chi tiết". Không tự thiết kế lại.
  - **Mọi lượt tách ảnh (vẽ tờ, ảnh lẻ, nền) đều gửi kèm ẢNH DEMO GỐC đã duyệt của phòng đó** (nguyên ảnh `art/out/demo/l<N>_demo_*.png`, không chỉ ảnh cắt), để Codex thấy món đồ nằm trong cảnh: cỡ so với đồ xung quanh, màu, nét, ánh sáng. Lời giao việc ghi rõ "ảnh demo gốc: <đường dẫn>, món cần vẽ nằm ở <vị trí trong demo>". Thiếu ảnh demo gốc thì lượt vẽ coi như hỏng (chủ dự án chốt, G4-26).
  - **Gom món theo demo (chủ dự án chốt, G5-23):** mỗi lượt Codex gửi **một lần ảnh demo** của phòng và giao **tối đa 7 món** cần tách, ra **7 ảnh riêng** (mỗi món một ảnh). Phòng có hơn 7 món thì chia làm 2 lượt (hoặc nhiều hơn), mỗi lượt ≤ 7. Quan trọng nhất là **prompt kỹ từng món**: món nằm ở đâu trong demo (toạ độ/vùng), gồm phần nào, **không lấy** phần nào (đồ chồng lên, bóng, đồ phía sau), trạng thái nào, cỡ ra bao nhiêu. Các trạng thái khác của cùng món (không có trong demo) ghi rõ là "chỉnh sửa từ món vừa tách, chỉ đổi <phần>".
  - **Cùng một món ở nhiều trạng thái hoặc nhiều chỗ** (vali lúc gấp và lúc trên tháp, sách rơi và chồng sách và sách trên tháp, gối trên giường và trên tháp…) phải **cùng thiết kế, cùng màu**; vẽ chung một tờ.
  - Dev đặt đồ: vị trí và cỡ đo trên demo; mỗi phòng **chồng ảnh game lên demo** (play_harness `compare`) và sửa tới khi khớp.
  - **Không ai báo xong bằng ảnh ghép tĩnh.** Art và Dev gửi GD ảnh chụp **trong game** từng phòng đặt cạnh demo, mọi trạng thái chính (trước/sau khi chạm, cao trào). **GD tự mở game chơi hết màn**, soi từng đồ với demo, rồi mới báo chủ dự án.
- Commit bằng tiếng Việt và push. **Chỉ đăng lên link online khi chủ dự án yêu cầu.**

## 6. Tối ưu dung lượng và dùng lại (chủ dự án chốt 2026-10-30, áp từ nay cho mọi màn)

**Art: mô tả kỹ, đúng cỡ, dùng lại ảnh lớn**
- **Mỗi ảnh một dòng yêu cầu rõ ràng** trong `design-art-level<N>.md` và trong lời giao việc: món gì, trạng thái nào, phần nào lấy, phần nào không, **cỡ hiển thị trong game** và **cỡ file cần ra**.
- **Cỡ file vừa đủ, không làm ảnh quá lớn:** cắt sát phần vẽ (bỏ viền trong suốt thừa), cỡ file không quá ~1,5 lần cỡ hiển thị trong game. Đồ nhỏ (cốc, đĩa, chìa khoá…) ra ảnh nhỏ tương ứng, không để mỗi món một khung 1024. Tờ to chỉ là ảnh nguồn để cắt, không đưa vào game.
- **Ảnh lớn dùng lại từ level cũ, không vẽ mới nếu có thể:** bầu trời, nền nhà (tường, sàn, trần, phòng trống), hàng rào, hẻm… Màn mới chỉ **thay đồ đạc và bố cục** trên nền cũ. Chỉ vẽ nền mới khi bối cảnh thật sự khác, và phải nói lý do trong thread cho GD duyệt.
- **Ảnh sát, ít nền trong suốt (chủ dự án chốt, G5-34):** lời giao việc cho Codex luôn yêu cầu món đồ **lấp gần kín khung**, lề trong suốt quanh món chỉ vừa đủ (khoảng 40px), chọn khung ngang/dọc/vuông theo dáng món. Sau khi cắt, ảnh đưa vào game phải sát phần vẽ, gần như không còn viền trong suốt thừa.
- Đồ dùng chung giữa các màn (cùng một món) dùng lại đúng ảnh cũ, không vẽ bản mới.
- Trước khi tách asset, Art liệt kê trong thread: ảnh nào dùng lại, ảnh nào vẽ mới, cỡ từng ảnh.

**Dev: tách code dùng lại, không chép code**
- Logic giống nhau giữa các màn (chuyển phòng, túi đồ, kéo-thả, phản ứng nhân vật, bong bóng, rung/nhún, tia sáng, khối tạm…) **đưa vào code chung** (`base.js`, `rooms.js`, `objects.js` hoặc file chung mới), các màn gọi lại. **Không copy một đoạn code sang màn khác rồi sửa.**
- Gặp đoạn đã bị chép ở nhiều màn thì gom về một chỗ khi sửa tới nó. Màn cũ phải chạy y như trước sau khi gom (chơi thử lại các màn bị đụng).
- Ảnh dùng lại giữa các màn: nạp chung một key, không nhân bản file.
- Mỗi lần build, Dev báo tổng dung lượng bản build và ảnh lớn nhất để GD theo dõi.
