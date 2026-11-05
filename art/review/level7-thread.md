# Level 7 — Về nhà thôi, Mun! · Thread

Đặc tả: `levels/levels-01-10.md` mục Level 7, `levels/states-01-10.md` mục Level 7.

## Quyết định chủ dự án

**G7-1 (2026-10-31).** Màn mới thay L7. "Đồ rơi khỏi kệ" thành L8, "Gối cỏ mèo" thành L9 (Normal*), "Ô vuông băng dính" dời sang L11. Bài dạy cận cảnh dời sang level sau. (Cập nhật cùng ngày: chủ dự án chốt L8 là "Tắm cho Mun" (Team 2); "Đồ rơi khỏi kệ" dời tiếp sang L12.)

**G7-2 (2026-10-31).** Mục tiêu là đưa Mun về nhà, không phải tìm mèo; bong bóng mở màn phải nói rõ. Chạm Mun dọc đường không thắng. Hard nhẹ 120 giây, 10 bước, không đồ thừa, không đồ đánh lừa, không bí mật. Ô sáng hiện sẵn: dễ hiểu, không đố.

**G7-3 (2026-10-31).** Mun đi từ phải sang trái. Cảnh 1 hẻm L5 (bạt che mái hẻm gãy, chổi, tấm ván, nắp cống). Cảnh 2 quán nước ven đường (két nhựa, bảng thực đơn chắn gió, 2 ghế nhựa xếp hàng ngang). Cảnh 3 nhà nhân vật: mở cửa sổ, thùng gỗ + hộp đồ làm 2 bậc, chạm hộp nhận luôn chuông gió, Mun ngại ngùng trên bậu không tự vào, treo chuông, Mun khều chuông, nhân vật quấn khăn bế vào. Kết màn như endgame chung, thêm Mun ướt và khăn.

## Bước 2: bản khối (Dev)

- 2026-10-31: GD giao Dev code bản khối.
- 2026-10-31: Dev báo xong, chơi trọn màn ở 9:16 và 3:4; ảnh `l7_blocks_3scenes.jpg`, `l7_s1..3.jpg`, `l7_home.jpg`. Code chung mới: ô sáng (objects.js), `trail.js` (mèo đi theo chặng), rooms.js chạy không mũi tên. Build 70,1 MB, L7 không thêm ảnh.

**G7-4 (GD chốt câu hỏi Dev, 2026-10-31).**
1. Mun khều kính (bậu, cửa đóng): Art vẽ dáng riêng `mun_paw_glass`; bản khối dùng dáng ngồi + code.
2. Cửa sổ đóng: chạm vùng cửa sổ, kể cả trên Mun, là mở cửa. Mở rồi chạm Mun mới meo.
3. Thêm `l7_icon_home`, `l7_icon_paw` (icon bong bóng) vào danh sách ảnh.
4. Cỡ Mun giữ như L6 (thống nhất mọi màn). Tỉ lệ nhà (cửa chính, cửa sổ) để Art chỉnh lúc làm demo cho Mun không to so với nhà; bản khối giữ nguyên.
5. 2 ghế vào ô nào cũng được; ô hộp hiện sẵn trên ô thùng từ đầu: đúng.
6. Không có đồng hồ đếm ngược trên màn hình, như mọi màn: đúng.
7. Cảnh 1 còn thấy trời xanh ban ngày có mây (nền L5): tông đêm phải rõ hơn ở cảnh 1 cho đồng bộ cảnh 2, 3 (vẫn nhạt, pastel).

- 2026-10-31: Dev sửa tông đêm cảnh 1 (`l7_g74_s1_night.jpg`): trời thành xanh tím chạng vạng, đạt cho bản khối; tranh đêm thật làm ở demo.
- 2026-10-31: **GD tự chơi hết bản khối** (play_harness, khung 9:16), đạt:
  - Chạm Mun không thắng. Thả sai món thì món nảy về.
  - Cảnh 1 đặt ngược thứ tự (nắp → ván → chổi): Mun đi thẳng qua, sang cảnh 2.
  - Cảnh 2: két → gió đẩy Mun lùi → bảng chắn gió → 2 ghế. Kéo ghế dưới thì game lấy ghế trên.
  - Cảnh 3: hộp đặt trước thùng thì nảy về; chạm hộp ra chuông; thùng + hộp → Mun lên bậu.
  - Treo chuông khi cửa còn đóng: chưa về nhà; mở cửa thì chạy kịch bản về nhà ngay (bỏ qua nhịp ngại ngùng, hợp lý) → màn thưởng.
  - Không lỗi console.

**G7-5 (chủ dự án chốt 2026-10-31): sửa cảnh và chướng ngại cho hợp lý** (áp dụng hết đề xuất review của GD):
- Chung: Mun ướt, lạnh, kiệt sức, mặt đồ trơn nên không tự nhảy qua; lần đầu gặp chỗ cao Mun nhảy thử, trượt. Chướng ngại đặt ở lối hẹp hoặc chắn tường→tường để Mun không đi vòng. Chỉ một chướng ngại dính nước. Mở màn có nhịp nhân vật bên cửa sổ lo cho Mun (người chơi là "bàn tay" giúp Mun).
- Cảnh 1: tấm tôn mái hiên sụp chặn khe xe–tường (thay bạt) → chổi chống; đoạn ngập tường→tường → tấm ván; cành cây gãy chắn lối → kéo ra bãi trống (thay nắp cống; không dùng dây điện đứt).
- Cảnh 2: biển đổ đè kín lối hẹp, trơn → két nhựa; cánh cửa sổ gỗ quán đập chắn lối → chèn bảng thực đơn (thay gió); con chó lạ ngủ dưới hiên → 2 ghế nhựa làm hàng che, Mun rón rén (thay nước cống trào).
- Cảnh 3: thùng gỗ + hộp đồ 2 bậc lên **nút chuông cửa chính**, Mun bấm chuông (thay mở cửa sổ + chuông gió). Hộp đồ đựng **khăn**. Cửa mở, Mun rụt rè (mèo hoang chưa vào nhà người); người chơi thả khăn lên Mun → nhân vật bế vào.
- Bản khối cần sửa theo.

- 2026-10-31: Dev sửa bản khối theo G7-5 (`l7_g75_3scenes.jpg`). **GD tự chơi hết**, đạt:
  - Chạm Mun không thắng.
  - Cảnh 1 đặt ngược thứ tự (cành → ván → chổi): qua.
  - Cảnh 2 đặt bảng và 2 ghế trước két: Mun vẫn trượt ở biển một lần, rồi đi qua hết.
  - Cảnh 3: hộp đặt trước thùng thì nảy về; chạm hộp ra khăn; thả khăn khi cửa chưa mở thì khăn về túi; thùng + hộp → Mun bấm chuông, cửa mở; thả khăn → màn thưởng.
  - Console chỉ có 404 của design-art-level7.md (chưa có, đúng như bản khối).

**G7-6 (GD chốt 4 điểm Dev tự chọn).**
1. Hàng ghế che: chó nằm sát tường dưới hiên, ghế ở giữa, Mun đi phía trước gần người xem: đúng ý (ghế nằm giữa chó và Mun).
2. Cánh cửa đập: bản khối co giãn quanh bản lề là được. Art chốt cách vẽ (ảnh chính diện để code co giãn, hay vài khung đập) ở bước bàn art.
3. Nhân vật dùng dáng tạm `player_call`, `player_scratch_head` tới khi có `player_door_open`, `player_window_worry`: được.
4. Mun nhảy thử và trượt chỉ một lần ở mỗi chỗ: đúng.

**G7-7 (chủ dự án chốt 2026-10-31, sau khi chơi bản G7-5).**
- Cảnh 3 quay lại **trèo lên cửa sổ + chuông gió** (bỏ nút chuông cửa, bỏ bước thả khăn). Hợp lý hoá: cửa sổ có **ô văng** nên hốc cửa sổ khuất gió; chuông gió đêm bão được **cất vào hộp đồ**, người chơi treo lại vào móc trống; chuông chỉ đung đưa khẽ, Mun khều mạnh sát kính thì nhân vật mới nghe. Nhân vật mở cửa sổ, quấn khăn bế vào (khăn như endgame).
- **Bỏ intro nhân vật trong nhà.** Mở màn chỉ có Mun: bong bóng nhớ **người đã cứu Mun** → căn nhà sáng đèn + dấu chân.
- **Chổi chống tôn hợp lý hơn:** tôn mỏng nhẹ, mép trên còn mắc khung, mép dưới tựa thành xe; chổi cán tre dài chống chéo, đầu chổi tì gờ chân tường, cán đỡ mép tôn nâng lên.
- **Tấm ván to hơn:** dài hơn đoạn ngập rõ, hai đầu gác chỗ khô, bản rộng gần gấp đôi thân Mun.
- **Thời tiết:** thêm sấm sét (chớp, tia sét xa, sấm rền), lá bay, cành nhỏ rơi (trang trí). Cành cây chắn lối rơi xuống ngay lúc mở màn.
- **Mun quay mặt lại giữa đường (trên ván) là lỗi:** Mun luôn quay mặt theo hướng đi; chỉ ngoái lại khi ngồi chờ bị chạm hoặc lúc gợi ý.
- **Bỏ cánh cửa sổ quán đập** (khó hiểu). Thay bằng **đoạn hở giữa hai mái hiên**: gió quật mưa xiên, Mun bị hất lùi; dựng **bảng thực đơn gỗ to chân sắt nặng** chắn gió.

- 2026-10-31: Dev 1 sửa bản khối theo G7-7 (không tự chơi, chỉ kiểm cú pháp và khoá ảnh/tiếng). Lỗi Mun quay mặt trên ván: do điểm bước xuống ván nằm bên phải; đã sửa, Mun giữ mặt quay trái mọi lúc di chuyển. Thêm tuỳ chọn `bubbleHold` trong base.js (mặc định như cũ).

**G7-8 (GD chốt câu hỏi Dev, 2026-10-31).**
1. Chân chổi: được đặt trên nền trước xe thay vì gờ chân tường; cho chân chổi **tì sát bánh xe** để thấy rõ chổi không trượt. Art chốt bố cục ở demo.
2. Bong bóng nhớ: Art vẽ `player_hug_mun` (nhân vật ôm Mun) riêng; bản khối tạm dùng `mun_held`.
3. Nhân vật mở cửa sổ: tạm dùng `player_surprised` tới khi có `player_window_open`.

**G7-9 (chủ dự án góp ý 2026-10-31 sau khi test bản G7-7/G7-8).**
- Mun vừa vào cảnh đã ngồi trên đoạn ngập: lỗi. Chỗ ngồi chờ luôn trên nền khô, trước chướng ngại ~40px.
- Tấm ván ngắn lại một chút (vẫn gác đủ hai đầu lên chỗ khô). Cành cây to hơn rõ (cao ~2 lần Mun ngồi).
- **Cảnh 2 thiết kế lại** (cũ chưa hay, chưa logic; ví dụ chó đang ngủ thì xếp ghế che là vô lý): sân quán không mái, mưa xối → **cắm ô to của quán vào lỗ giữa bàn**, Mun chạy dưới ô; **chó lạ sợ sấm** co ro chắn lối hiên → **đặt thùng các-tông làm hang**, chó chui vào trốn sấm; **xe đạp bị gió quật đổ** chắn lối ra → **dựng xe lên**. Bỏ biển + két, gió + bảng, ghế.
- Cảnh 3: cửa sổ thấp hơn. Bậc xếp cạnh nhau thấp dần: **hộp bé** (bậc 1) → **thùng gỗ** (bậc 2) → nhảy lên bậu. **Chạm cửa sổ là mở.** Chuông treo ở **móc giữa cửa sổ**. Chạm hộp lần đầu là có chuông. Kết khi đủ: chuông treo + cửa sổ mở + Mun ở bậu.
- Mở màn: bong bóng nhớ **hình nhân vật** (mặt cười hiền) rồi tới căn nhà + dấu chân.
- Mun chạy thêm **khung thứ 2** (`mun_run_b`) xen kẽ cho sinh động.

- 2026-10-31: Dev 1 sửa bản khối theo G7-9 (không tự chơi; kiểm cú pháp và khoá ảnh/tiếng).

**G7-10 (GD chốt câu hỏi Dev, 2026-10-31).**
1. Cành cây phải **thấy trọn ở khung 9:16** (đồ tương tác chỉ nằm trong khung 1024 giữa, QUY-TRINH bước 4). Dời xe ba gác sang phải và thu hẹp đoạn ngập một chút (ván vẫn gác đủ hai đầu), cho cành nằm trọn trong khung.
2. Cảnh 2: Mun chờ trước chó dưới tán ô (chưa vào hẳn hiên) là được: chỗ đó đã khô và có che.
3. Bậc thấp dần: thùng gỗ cao sát tường dưới cửa sổ, hộp bé thấp phía Mun: đúng.
4. Art vẽ `player_face_icon` (mặt nhân vật cười hiền) cho bong bóng nhớ; bản khối tạm dùng `player_call`.

**G7-11 (chủ dự án góp ý 2026-10-31 sau khi test bản G7-9/G7-10).**
- **Bỏ G7-10 điểm 1:** chủ dự án không yêu cầu đổi bố cục cảnh 1. Trả cảnh 1 về bố cục bản G7-9 (xe ba gác, tôn, chổi, đoạn ngập, ván, cành như trước khi dời).
- Cảnh 2: dựng xe đạp hơi khó → dựng tại chỗ: chạm giữ trên xe rồi kéo lên là xe đứng; ô sáng ngay trên chỗ xe đổ, bán kính khớp ~180px.
- Cảnh 3: lần chạm đầu tiên vào hộp bé (kể cả khi bắt đầu kéo) là ra chuông.
- Kết màn: **khăn to, lót dưới Mun** (nhân vật trải khăn trên hai tay đỡ Mun), không quấn kín.

**G7-12 (chủ dự án góp ý 2026-10-31 sau khi test bản G7-11).**
- **Cảnh 1 làm lại (cũ chán):** Mun phóng vào thùng giấy L5 khi sét đánh; ống máng gãy khớp xối nước trước miệng thùng → **kéo xoay đầu ống** sang bãi trống, Mun chui ra; **dòng nước chảy xiết** ngang hẻm → **đẩy xe ba gác** làm cầu, Mun chạy qua sàn xe; **cổng sắt** bị gió đóng sập → **gạt then**, cổng mở. Quạ L5 trú mưa (✨). Bỏ tôn, chổi, đoạn ngập, ván, cành cây.
- **Cảnh 2 tỉ lệ:** chó to hơn Mun rõ (~1,6 lần), thùng các-tông to hơn chó; xe đạp nhỏ lại (~2 lần Mun ngồi).
- **Cảnh 3 tỉ lệ:** Mun giữ cỡ; cửa sổ to (~3 × 2,5 lần Mun ngồi), cửa chính cao ~4 lần. Bậu giữ độ cao.
- **Hộp bé:** chạm lần đầu chỉ ra chuông, hộp không di chuyển; từ lần chạm thứ hai mới kéo được (sửa lại G7-11).
- **Kết màn:** chuông → nhân vật quay lại, cầm khăn to giang tay → Mun Lộ diện → **người chơi chạm Mun mới thắng**. Cảnh bế: khăn to lót dưới và vòng lên che sau lưng Mun.

- 2026-10-31: Dev 1 sửa bản khối theo G7-12 (không tự chơi). Phần chung objects.js: thay `liftUp` bằng 2 tuỳ chọn `swipe` (vuốt đủ dài theo một hướng là khớp) và `fixed` (món đứng yên, chỉ khớp bằng vuốt). Xe ba gác cảnh 1 thu còn rộng 420.

**G7-13 (GD chốt câu hỏi Dev, 2026-10-31).**
1. Xe đạp: số đo GD ghi ở G7-12 sai (to hơn cỡ đang có). Giữ cỡ xe hiện tại (dài ~260–300) vì chó và thùng đã to lên; chủ dự án test lại xem còn to không, còn thì thu tiếp.
2. Nước sau khi xoay ống đổ vào chân tường sau chỗ xe ba gác đỗ: được.

**G7-14 (chủ dự án chốt 2026-10-31):** cảnh 1 **trả về như cũ** (bản G7-9/G7-11: tôn sụp + chổi, đoạn ngập + ván 400, cành cây to kéo ra; bố cục như bản khối G7-11). Bỏ phần cảnh 1 của G7-12 (ống máng, xe ba gác làm cầu, cổng). Các sửa khác của G7-12 (tỉ lệ cảnh 2–3, hộp bé, kết màn chạm Mun, khăn) giữ nguyên.

**Dev (2026-10-31):** thêm bộ đếm FPS debug dùng chung: file mới `game/src/fps.js` (ô nhỏ góc trên trái, không nhận chạm, chỉ hiện khi URL có `?fps=1`; số FPS hiện tại + min 5 giây), `main.js` chỉ thêm 1 dòng `import './fps.js';`.

**G7-15 (chủ dự án góp ý 2026-10-31):**
1. Bong bóng nhớ mở màn **chỉ hình nhân vật**, bỏ hình nhà và dấu chân (`l7_icon_home`, `l7_icon_paw` bỏ).
2. Cảnh 1: Mun ngồi chờ **ngay mép đoạn ngập** trên nền khô, không đứng trong nước. Bước chổi chống tôn: chủ dự án muốn phương án khác hợp lý hơn, chủ dự án chọn **kê thùng xốp đỡ tôn**: kéo thùng xốp (`l7_foam_box`, thay `l7_broom`) vào ô ngay dưới mép tôn sát miệng khe, tôn gác lên nắp thùng thành mái che nhỏ, Mun bò ra.
3. Cảnh 2: ô **dễ cắm hơn** (vùng khớp rộng cỡ cả bàn). Thùng các-tông lúc đầu **mở nắp, đặt ngửa** (như hộp L3); thả vào ô thì **lật nằm ngang**, miệng quay ra cho chó trú. Ô thùng **cao hơn, sát tường hơn**. Ảnh: `l7_box_carton_open`, `l7_box_carton_side` thay `l7_box_carton`.
4. Kết màn: **khăn chỉ xuất hiện ở cảnh bế, trong đôi tay nhân vật**. Nhân vật ra cửa sổ giang tay không cầm khăn (`player_arms_open` thay `player_towel_open`, bỏ `l7_towel`).

**Dev (G7-15):** code chung `game/src/objects.js` thêm một tuỳ chọn nhỏ cho sceneDraggable: chỗ đặt có `area` (hình chữ nhật) thì thả trong vùng đó là khớp, thay cho bán kính snap (L7 dùng cho ô: cả bàn + 240 px phía trên). Màn khác không đổi.

**G7-16 (chủ dự án góp ý 2026-10-31):**
1. Cảnh 1 giữ nguyên, chỉ đổi **thùng xốp thành cành cây chạc chữ Y** (`l7_branch_prop`, bỏ `l7_foam_box`), chống dưới mép tôn ở đúng ô cũ; tôn mắc trong chạc thành mái che.
2. Cả 3 cảnh: **nhiều vũng nước** (gợn khi mưa rơi), **cành gãy nằm rải rác** (trang trí, không kéo được), **lá bay dày hơn** (khoảng gấp đôi). Ảnh: `l7_puddle`, `l7_branch_debris`.
3. Cảnh 3: **chuông gió đặt sẵn trên nắp hộp bé**; bỏ "chạm lần đầu lấy chuông". Chuông và hộp đều kéo được từ đầu: chuông kéo thẳng vào móc (không qua túi đồ), hộp kéo vào ô bậc 1, chuông còn trên nắp thì đi theo hộp (như giỏ trên thùng gỗ L6).
4. Kết màn: lúc nhân vật ra cửa sổ giang tay, vẽ nhân vật **to hơn và thấp xuống một chút**, sát sau khung cửa sổ, cảm giác ở gần cửa sổ.
5. (GD 1 chốt khi Dev hỏi) Hộp ở bậc 1 mà chuông còn trên nắp: Mun không trèo, ngồi dưới khều nhẹ chuông, chuông lấp lánh; nắp trống mới trèo. Cành chạc lúc đầu dựa nghiêng vào tường (nằm ngang thì khuất sau xe).

**G7-17 (chủ dự án góp ý 2026-10-31):** cảnh 1 Mun nấp/chờ dời xa rãnh nước (≥ 60 px); cành chạc → **thanh gỗ** `l7_wood_bar`; thêm 2 cành gãy nhỏ `l7_branch_small`, kéo cả 3 cành ra bãi trống mới mở lối (12 bước). Cảnh 2: xe đạp dùng `l5_bike` (đổ = xoay nằm); mưa xối sân quán tự nhiên hơn. Cảnh 3: chuông nằm ngang trên nắp hộp.
Bổ sung G7-17: thanh gỗ → **thang gỗ nhỏ 3 bậc chữ A** `l7_step_ladder` (gập dựa tường, kéo vào ô thì bung đứng dưới mép tôn). Bong bóng nhớ mở màn chỉ mặt nhân vật, nhỏ ~70%, ở góc trên phải Mun.

**G7-18 (chủ dự án góp ý 2026-10-31):** thang 2 bậc, cao ~2/3; chắn lối là 3 cành to nằm sát, chồng nhau; ván ngắn lại, dễ chọn hơn; xe đạp cảnh 2 thêm bánh trước `l5_bike_wheel` như L5; cảnh 3 cửa chính cao ~2/3, rộng hơn, cửa sổ ~4/5.
**G7-19 (chủ dự án góp ý 2026-10-31):** thang ở dáng bung từ đầu; bóng mờ ô chỉ hiện cho món đang cầm; 3 cành vào ô nào cũng được; kéo đồ bám tay nhanh hơn.

**Dev (G7-19):** code chung `game/src/objects.js` thêm tuỳ chọn màn `litHeldOnly` (mặc định tắt): bật thì ô sáng ẩn hẳn lúc thường, chỉ hiện khi đang cầm đúng món hoặc lúc gợi ý (litFocus / litFlash). Chỉ L7 bật; màn khác không đổi.


**G7-20 (chủ dự án góp ý 2026-10-31, qua GD 2):** cảnh 1 mái tôn dùng mái như L5 (`l5_awning_down`); cảnh 2 xe đạp để dọc, sửa tỉ lệ; cảnh 3 chuông xuất hiện treo ở góc cửa chính (đổi từ góc trên trái nhà), điểm đặt vẫn là móc cửa sổ.

**G7-21 (chủ dự án góp ý 2026-10-31):** cảnh 1 mái che lúc đầu to nhưng rơi xuống bé tẹo, không hợp logic → mái cùng một cỡ ở mọi trạng thái, đủ to che chỗ trú.

**G7-22 (chủ dự án góp ý 2026-10-31):** mái cảnh 1 lúc đầu ở trên cao như bối cảnh L5, rơi xuống đất; kê thang thành mái chéo, không về chỗ cao.

**A7 (chủ dự án 2026-10-31):** duyệt demo L7 (l7_demo_s1..s3), cho tách asset, cố tách giống demo; chó cảnh 2 vẽ theo con chó L6.

**G7-23 (chủ dự án góp ý 2026-11-01, sau ảnh GD chơi thử bản đã ráp asset):** ghi đè các dòng trước nếu khác.
Cảnh 1:
1. Mở màn: Mun chạy tới, **đứng lại lâu hơn một chút**, **sét chớp một cái**, rồi mới chạy vào trú dưới gầm xe ba gác.
2. Chỗ Mun nấp dời sâu vào trong gầm xe. Mái sụp dịch **sang phải 25 px, lên 4 px**.
3. Vùng đất phía dưới **nhiều vũng ngập hơn**, để cảm giác chỉ còn một lối đi ngang.
4. Bóng mờ ô sáng: **không hiện trước**; chạm (nhấc) món nào thì mới hiện bóng mờ của món đó. Nhấc một cành thì **chỉ sáng một ô cành** (không sáng cả 3).
5. Thêm **hoạt ảnh chạy cho Mun** (2 khung chạy luân phiên).
Cảnh 2:
6. **Vẽ lại cây** cho tự nhiên hơn.
7. **Mun nằm lớp trên cây** (không bị thân cây che).
8. Chỗ cắm ô trên bàn có **lỗ to hơn**, nhìn rõ.
9. **Vẽ lại con chó đẹp hơn** (vẫn là Lu L6).
10. Đoạn **chó chui vào thùng** diễn đẹp hơn.
11. Sàn phía dưới **nhiều vũng ngập hơn**.

**G7-24 (ĐÃ HUỶ, trả lại đường chạy cũ):** cảnh 2 Mun chạy qua xe đạp đi phía trước, thấp hơn, không đè lên xe.

**G7-25 (chủ dự án góp ý 2026-11-01, sau khi tự test):** ghi đè các dòng trước nếu khác.
Cảnh 1:
1. **Bỏ cái thang.** Bước mái: người chơi **kéo tấm mái sụp đặt lên xe ba gác** (ô sáng trên xe), thành mái che. Không còn món thang.
2. Mun qua tấm ván: **không nhảy, chạy thẳng qua**. Đường Mun đi **khớp với tấm ván** (hiện đường đi và ván lệch xa nhau).
3. Mun **đi ngang tới điểm tiếp theo** như demo chuyển tiếp cảnh 1→2 cũ (chạy ngang, không vòng lên xuống).
Cảnh 2:
4. **Ô dài thêm một chút**, cán ô **cắm xuyên qua lỗ** trên bàn.
5. **Xe đạp to hơn.**
6. **Chó vẽ lại theo style và độ cute của chó L6** (Lu).
7. Chó vào thùng: **mặt chó hiện bên trong thùng** (trong lòng thùng lật), **đầu to hơn** (hiện quá bé).
8. Mun **chạy qua tự nhiên như ở cảnh 1**.

**G7-26 (chủ dự án góp ý 2026-11-01):** cảnh 1: chỗ đặt mái dịch **sang trái 20 px** và mái **nằm ngang** trên thùng xe (góc 0, không nghiêng). Mun bò ra khỏi gầm xe thì **lớp Mun cao hơn xe** (không bị xe che). Chỗ đặt tấm ván **cao thêm 6 px**.

**G7-27 (chủ dự án góp ý 2026-11-01):** ghi đè các dòng trước nếu khác.
1. Cảnh 2: **vẽ lại cán ô dài** cho chỗ nối tự nhiên, nhìn giống gậy ô (bỏ cán nối vẽ bằng code).
2. Cảnh 2: **vẽ lại chó trong thùng** cho tự nhiên (không chỉ có cái đầu): nằm trong lòng thùng, thấy đầu và hai chân trước gác mép thùng.
3. Cảnh 3: Mun tới chỗ chờ thì **đứng lại, không nhảy**.
4. Cảnh 3: **toàn cảnh dịch lên 4 px**; thùng gỗ và hộp đồ nghề **to lên**, **dịch xuống 2 px**.
5. Cảnh 3: **đặt xong thùng và hộp là Mun nhảy lên bậu cửa sổ được** (không cần chờ treo chuông).
6. Cảnh 3: **khung cửa sổ to thêm 5 %**; thanh che (ô văng) trên cửa sổ **cao lên 3 px**.

**G7-28 (chủ dự án góp ý 2026-11-01):** cảnh 1: chỗ đặt mái trên xe dịch **sang phải 40 px** (so với G7-26); tấm ván **cao thêm 3 px**; Mun ra khỏi gầm xe thì **lớp Mun cao hơn cả các bụi cành cây**.

**G7-29 (chủ dự án góp ý 2026-11-01):** ghi đè các dòng trước nếu khác (kể cả G7-28 điểm 3).
Cảnh 1:
1. Mun **vẫn bị xe che**: Mun phải nằm trên lớp xe ba gác (và mái) khi bò ra và chạy đi.
2. Mái đặt trên xe dịch **sang phải thêm 20 px**.
3. Mun ra khỏi xe **dịch xuống 4 px**, **chỉ chạy ngang** sang (không lên xuống).
4. Mun nằm **lớp thấp hơn 3 bụi cành** (cành che Mun khi Mun chạy sau cành).
Cảnh 2:
5. Thùng carton **cao lên 10 px**.
6. **Vẽ lại chó trong thùng**: thấy **cả người** chó nằm trong thùng, **to hơn** (hiện quá bé, xấu).
Cảnh 3:
7. Thùng gỗ và hộp đồ nghề **dịch xuống 10 px**.
8. Cửa sổ **về lại cỡ cũ** (bỏ ×1,05 của G7-27).
9. **Art vẽ lại khung cửa sổ**: hiện ti vi, nội thất lộ ra ngoài mép khung cửa sổ.

**G7-30 (chủ dự án góp ý 2026-11-01):** cảnh 2: ô **lớp cao hơn cây**; lúc cắm **hạ thấp xuống**, cán **cắm xuyên lỗ** bàn (nhìn rõ cán đi vào lỗ: trên lỗ thấy cán, dưới mặt bàn cán bị mặt bàn che, mũi cán lộ dưới gầm).

**G7-31 (chủ dự án góp ý 2026-11-01):**
1. Cảnh 1: chỗ đặt mái dịch **sang phải thêm 7 px**.
2. Cảnh 1: chỗ đặt tấm ván **cao lên 4 px** (đường Mun theo mặt ván).
3. Cảnh 1: 3 cành **đã đặt** (dựng tường) nằm **lớp thấp hơn Mun**.
4. Cảnh 2: chó trong thùng **to hơn**.
5. Cảnh 3: chỗ Mun dừng trước cửa **thấp xuống 6 px**.
6. Cảnh 3: chỗ đặt thùng gỗ và hộp đồ nghề **thấp xuống 6 px**.
7. Cảnh 3: Mun trên bậu cửa sổ sau khi khều chuông **đứng thẳng lại** (đang hơi nghiêng).
8. Cảnh 3: Mun nghịch chuông được 1 giây thì **hiện mũi tên chỉ dẫn** như các level khác.

**G7-32 (chủ dự án góp ý 2026-11-01):** cảnh 3: chỗ chuông xuất hiện (treo cạnh cửa chính) dịch **sang trái 6 px**. Cảnh cuối, nhân vật quay lại (mở cửa sổ, dang tay) **×0,7** so với hiện tại và **thấp xuống 40 px**.

**G7-33 (chủ dự án góp ý 2026-11-01, "một chút" = cùng mức lần trước):** cảnh 1 chỗ đặt mái sang phải thêm 7 px; chỗ đặt ván cao thêm 4 px. Cảnh 3 chỗ chuông xuất hiện sang trái thêm 6 px; chỗ Mun chờ trước cửa thấp thêm 6 px; chỗ đặt thùng gỗ và hộp đồ nghề thấp thêm 6 px.

**G7-34 (chủ dự án góp ý 2026-11-01):** cảnh 1 chỗ đặt mái sang phải thêm 10 px; chỗ đặt ván cao thêm 4 px (đường Mun theo). Cảnh 3 chỗ chuông xuất hiện sang trái thêm 10 px; chỗ Mun chờ trước cửa thấp thêm 6 px; chỗ đặt thùng gỗ và hộp đồ nghề thấp thêm 14 px; dáng nhân vật giơ tay (player_arms_open) thấp thêm 40 px.

**G7-35 (chủ dự án góp ý 2026-11-01, đo bằng lưới grid=1, đơn vị px game):**
Cảnh 1:
1. Mái rơi (dáng sụp), xe ba gác, mắt Mun trong gầm và chỗ đặt mái trên xe **cùng cao lên 50 px**.
2. Mun khi ra khỏi xe **thấp xuống 10 px**.
Cảnh 2:
3. Mun tới chỗ chờ thì **ngồi nhìn một lúc** rồi mới giơ chân khều mưa, không giơ ngay.
4. **Vẽ lại dáng giơ chân** (mun_paw_rain): giơ **chân trước**, không phải chân sau.
5. Chỗ đặt thùng carton **cao lên 100 px**.
Cảnh 3:
6. Chỗ Mun ngồi đợi trước cửa **thấp xuống 25 px**.
7. Chỗ chuông xuất hiện **sang trái 18 px**.
8. Chỗ đặt thùng gỗ và hộp đồ nghề **thấp xuống 40 px**.

**G7-36 (chủ dự án góp ý 2026-11-01, px game):** cảnh 2 chỗ đặt thùng chó thấp xuống 35 px. Cảnh 3 chỗ đặt thùng gỗ và hộp đồ nghề cao lên 17 px; nhân vật giơ tay cuối màn (player_arms_open) sang trái 50 px, xuống 100 px.

**G7-37 (chủ dự án góp ý 2026-11-01, px game):** cảnh 3 điểm nhảy cuối của Mun sang phải 25 px. Cảnh 1 mặt Mun ló ra **đúng chỗ đôi mắt dưới gầm xe**, rồi Mun đi **hơi chéo xuống** tới điểm tiếp theo (đoạn sau vẫn chạy ngang). Cảnh 2 chỗ đặt thùng giấy thấp xuống 40 px.

**G7-38 (chủ dự án góp ý 2026-11-01):** cả 3 dáng giơ chân (mun_paw_rain, mun_paw_glass, mun_paw_chime) chưa đạt. Làm demo trên mun_paw_rain trước: từ ảnh cũ, chỉ xoá chân trước thừa, thay bằng chân sau đúng vị trí ảnh cũ, cong vừa phải, tự nhiên; giữ nguyên màu và style. Duyệt xong mới sửa 2 ảnh kia.