# Design Art – Level 9: Súp thưởng

> Đọc kèm `style.md` (mục 1, 2, 2b, 3). Bút chì màu, pastel nhạt theo `art/ref/owner_l1_style_ref.png` (O6), nét mảnh đậm nhạt (O5), cute, tối giản, **không chữ** (kể cả trên nút máy xay, núm bếp, hộp khay).
>
> **Trạng thái (2026-11-03):** chủ dự án đã duyệt gameplay bản khối (G9-1 → G9-12, 15 bước). Đang ở **bước 4: vẽ demo**. Chưa tách asset, chưa ghép game. Chủ dự án dặn: **mô tả chi tiết, nhớ chi tiết màu sắc và style.**

Nguồn: `levels/levels-01-10.md` mục Level 9 (bảng 13 bước đầu là bản cũ; chuẩn là các khối G9-1 → G9-12); brief `art/review/l9_art_brief.md`; bản khối `game/src/level9.js` (toạ độ, cỡ khối, lớp); ảnh bản khối `art/review/l9_g92_34view.jpg`, `l9_g93_gestures.jpg`, `l9_g96_g98.jpg`, `l9_g910.jpg`, `l9_g910c_zoom_low.jpg`, `l9_g911.jpg`, `l9_g94_end_eat.jpg`, `l9_g912b.jpg`.

Áp dụng mọi quy tắc đã chốt: màu O6, tách theo demo (G4-22, G4-26, G5-23), cỡ file ≈ 1,5 lần cỡ hiển thị, cắt sát (G5-34, G5-35), khung 9:16 và nền rộng đủ 3:4 (G-SCREEN). Mọi lượt Codex: model **gpt-6.1-sol, mức medium**.

Toạ độ trong file này là **khung thế giới 1024x1536** (vùng chơi). Trên màn 9:16 (khung game 1024x1820) vùng chơi bắt đầu ở y 142. Nền 1366x2304 thì vùng chơi nằm ở x 171, y 384.

---

## 1. Bối cảnh

- **Góc bếp sau quầy quán cafe**, buổi chiều ấm. Máy quay **đứng yên** (chỉ zoom vào nồi ở bước 7–8, zoom vào cụm tô ở bước 13–15). Sạch, ấm, gọn, yên, như căn bếp nhỏ trong sách tranh.
- **Bố cục (bản khối đã duyệt):**
  - **Tường gạch men** phía sau, từ mép trên tới **mép sau mặt bàn y 260**.
  - **Mặt bàn gỗ** chiếm gần hết màn: từ y 260 (mép sau, xa) tới **mép trước y 1440**, rồi **dải mép bàn dày 80 px** (y 1440–1520). Dưới mép bàn là **dải chân tủ** (cửa tủ gỗ, ô vuông to đơn giản) tới đáy màn.
  - **Bếp ga** đặt trên mặt bàn phía sau, lệch phải: tâm (620, 470), rộng 520. Mặt trên có 2 họng (họng nhỏ trái ở x ≈ 490, họng lớn phải ở x ≈ 720, y ≈ 395); mặt trước có 2 núm (núm nhỏ trái, **núm lớn phải ở (720, 590)**).
  - **Nồi** đặt trên họng lớn: miệng nồi tâm (720, 265).
  - Vùng giữa mặt bàn (y 800–1300) là chỗ làm việc: đĩa, chậu, thớt, máy xay, tô, khay, bát lần lượt bay vào.
  - **Chân mèo** thò lên từ mép bàn phía dưới màn hình.
- **Nền yên:** tường và chân tủ trống. Mọi đồ kể trên là sprite riêng. Không treo dụng cụ, không kệ gia vị, không cửa sổ bận rộn.
- **Cảnh kết:** chuyển hẳn sang **sàn bếp** (nền riêng), Mun vào từ trái, Sữa vào từ phải, 2 bát trên sàn.

## 2. Góc nhìn (ngoại lệ L9, chủ dự án chốt G9-2)

- **Phần bếp: top-down 3/4.** Vẫn **thẳng mặt trước, không xoay chéo**: cạnh ngang nằm ngang, cạnh đứng thẳng đứng, như sofa L1. Chỉ khác là mắt **đặt cao hơn nhiều, nhìn dốc xuống khoảng 50–60°**:
  - **Mặt trên to, rõ:** lòng nồi, lòng chậu, lòng bát, lòng tô, mặt thớt, mặt bếp ga có họng, lòng cối máy xay, lưới rây, lòng khay. **Miệng tròn là elip dẹt, cao ≈ 0,5 rộng** (code dùng FLAT = 0,5).
  - **Mặt trước là một dải ngắn:** thành nồi, thân và đế máy xay (có nút), mặt trước bếp ga (có núm), cạnh dày thớt, thành bát, mép bàn.
  - **Mặt bàn gỗ là mặt phẳng lùi xa:** thớ gỗ dọc chụm nhẹ về phía sau (mép sau hơi hẹp và hơi tối hơn mép trước).
  - Đồ phía sau (bếp, nồi) nhỏ hơn đồ phía trước một chút và nằm cao hơn trên màn.
- **Khối CAMERA gửi Codex:** dán nguyên `style.md` 2b, rồi thêm khối:

```
LEVEL 9 KITCHEN EXCEPTION (owner decision G9-2, only for the kitchen counter scenes of Level 9):
same straight-on front view as the Level 1 sofa, no diagonal rotation, horizontal edges stay horizontal and vertical edges stay vertical,
but the eye is much higher, looking down steeply (about 50-60 degrees), like standing at the counter and looking down at your work.
Top faces are large and clear: pot interior, bowl and basin interiors, cutting board top, stove top with its burners, blender jar opening, sieve mesh.
Round openings are flat ellipses about half as tall as they are wide.
Only a short band of each front face shows: pot wall, blender base with its button, stove front with its knobs, board thickness, counter edge.
The wooden counter top is a plane receding away from the viewer: its back edge is slightly narrower and slightly darker.
```

- **Cảnh kết (sàn bếp, Mun và Sữa ăn): góc chung của game** (khối CAMERA 2b, sofa L1), không dùng khối ngoại lệ.
- **Ánh sáng:** từ trên trái, vài nét chì đổ bóng ở phải và dưới mỗi đồ. **Không bóng đổ trên mặt bàn** (code có thể thêm bóng mềm sau).

## 3. Màu (khóa L1, O6)

Chỉ dùng bảng màu khóa. **Mảng lớn nhạt nhất** (tường, mặt bàn, bếp). Mọi mảng thấy vân chì và chút giấy kem. Không màu nào đậm hơn ô màu của nó. Style cấm "orange", nên **súp và bí ghi rõ là cam mơ nhạt pha từ hồng đào và vàng bơ**, không bao giờ cam tươi.

| Món | Màu |
|---|---|
| Tường bếp | Gạch men vuông kem `#FCF1DD` (cạnh ≈ 80 px như bản khối), ron nâu viền rất nhạt, mảnh. Mảng nhạt nhất cảnh |
| Mặt bàn | Gỗ mật ong `#F2C796` nhạt, vài nét chì thớ dọc thưa (không vân gỗ thật). Mép sau hơi đậm hơn một chút |
| Mép bàn, chân tủ | Caramel `#D6A472` nhạt; mép bàn có một vệt sáng kem mảnh ở cạnh trên; cửa tủ là ô vuông to viền caramel đậm hơn chút, không tay nắm cầu kỳ (núm tròn nhỏ) |
| Bếp ga | Thân **trắng ấm `#FFFAF0`**, đổ bóng **lavender `#D8CCF0` nhạt** ở mặt trước và dưới. **Không xám kim loại, không đen.** Họng đốt: vòng nâu viền nhạt, kiềng 4–6 chấu nâu viền nhạt. Núm caramel, vạch chỉ vàng bơ |
| Lửa | Ngọn nhỏ hình giọt, **xanh da trời `#B8DAF2`** nhạt, lõi vàng bơ `#FCE39A` |
| Nồi | **Men bạc hà `#B9DDBE` nhạt** (thân), miệng viền trắng ấm, quai tai caramel. Lòng nồi trắng ấm. **Không inox xám** |
| Nước trong nồi, chậu | Xanh da trời rất nhạt, vài nét sáng trắng ấm |
| Súp, bí đỏ | **Cam mơ nhạt ≈ `#F9D2A6`**, pha hồng đào `#F7B9A3` với vàng bơ `#FCE39A`. Súp lợn cợn: nền mơ có hạt hồng đào (gà) và vàng bơ đậm hơn chút (bí). Súp mịn: một mảng mơ đều, vân chì xoáy nhẹ, 1–2 vệt sáng kem |
| Vỏ bí | Hồng đào đậm hơn ruột một chút (vẫn trong ô `#F7B9A3`), có múi dọc nét chì; cuống xanh lá `#9DC283` |
| Gà | Sống: **hồng phấn `#F8C6CC` pha trắng ấm**, thớ thịt vài nét chì hồng đào nhạt. Da gà: hồng đào nhạt hơn, mặt hơi gợn lấm tấm. Ướt: vài vệt sáng trắng ấm bóng nước. Mặt cắt nhạt hơn mặt trên |
| Đĩa | Trắng ấm, viền miệng xanh da trời rất nhạt |
| Chậu nước | Sky blue nhạt (thành), miệng trắng ấm, nước sky blue rất nhạt |
| Thớt | Gỗ mật ong **sáng hơn mặt bàn** (gần kem `#FCE39A` pha `#F2C796`) để tách khỏi bàn; cạnh dày caramel; lỗ treo tròn ở đầu phải |
| Dao | Lưỡi trắng ấm, mép lưỡi một vệt sáng, đổ bóng lavender; cán caramel, 2 chấm đinh tán kem |
| Dao gọt | Lưỡi nhỏ trắng ấm (dạng dao bào chữ Y hoặc lưỡi ngắn), **cán bạc hà** |
| Muôi | Lòng muôi trắng ấm (bóng lavender), cán dài caramel |
| Máy xay | Cối **thủy tinh xanh da trời rất nhạt, gần trong** (thấy súp bên trong), nắp trắng ấm; đế **trắng ấm**; **nút tròn hồng đào** ở mặt trước đế |
| Rây | Khung tròn và cán **caramel**, lưới nâu viền **mảnh, thưa, vẽ to, ít ô** (≈ 7–9 đường mỗi chiều) |
| Tô súp, 2 bát | Trắng ấm, **viền miệng hồng đào**; trong lòng bát có **vạch hình chân mèo hồng phấn nhạt** (1 đệm to + 4 ngón) |
| Khay hộp | Hộp **hồng phấn `#F8C6CC`**, nắp trắng ấm viền hồng phấn, **ruy băng và nơ vàng bơ `#FCE39A`** (chốt vàng bơ) |
| Hơi nóng, khói hình cá | Trắng ấm, nét mảnh, nhạt, hơi trong |
| Chân Mun | Đen than ấm `#3E3838` có vân chì xám nâu, nệm hồng đào |
| Chân Sữa | Trắng ấm, lông xù mép, nệm hồng phấn |
| Sàn cảnh kết | Gỗ mật ong như L1 (ván ngang), tường kem, tủ thấp caramel nhạt phía sau |
| Mun, Sữa | Đúng `art/out/cats/mun_ref.png`, `art/out/cats/sua_ref.png` |

Đo bão hoà demo (QUY-TRINH): **trung bình ≤ 0,25, phân vị 90 ≤ 0,46**, mục tiêu trung bình 0,20–0,24. Vượt thì vẽ lại, không chỉnh hậu kỳ.

## 4. Dùng lại / vẽ mới / code vẽ

| Món | Quyết định |
|---|---|
| Giao diện (tim, tạm dừng, 💡, vòng gợi ý cam, vòng tiến độ), sparkle | Dùng lại `common/` và code (như L8) |
| Màn thưởng 2 đầu mèo | Dùng lại `mun_face_icon`, `sua_face_icon` (G9-12), **không vẽ mới** |
| Dòng súp đổ, nước bắn, bọt bắn, hơi nóng, khói hình cá bay, trái tim, bong bóng sôi, vết cắt trên gà và bí, súp xoáy khi khuấy | **Code vẽ** (brief mục 3) |
| Còn lại (mục 5) | Vẽ mới |

## 5. Danh sách key

Hiển thị = cỡ khối trong bản khối (`level9.js` FB). File ≈ 1,5 lần hiển thị. TS = trong suốt. Mọi đồ trên bàn vẽ theo **góc 3/4 mục 2**. Key có dấu * là **đề xuất mới**, chờ Dev 2 xác nhận (mục 6).

### 5.1 Nền và lớp bàn

| Key | Hiển thị | Neo / vị trí | Mô tả |
|---|---|---|---|
| `l9_bg_kitchen` | 1366x2304, có nền | vùng chơi ở (171, 384) | Tường gạch men kem từ đỉnh ảnh xuống quá mép sau bàn (y thế giới 260 + 40 để khuất dưới lớp bàn); phần dưới mép bàn (y thế giới > 1520) là dải chân tủ caramel nhạt, cửa tủ ô vuông to, kéo tới đáy ảnh. Giữa là phần sẽ bị lớp bàn che (có thể để gỗ trơn). Kéo dài tự nhiên hai bên và trên dưới |
| `l9_counter` | 1366 x 1260 (y 260 → 1520) | đỉnh giữa (512, 260) | **Lớp riêng** mặt bàn gỗ mật ong 3/4 (mặt phẳng lùi xa, thớ dọc chụm nhẹ về sau) + dải **mép bàn dày 80** caramel (vệt sáng kem ở cạnh trên, đường viền nâu ở cạnh dưới). Rộng đủ 1366, mép sau thẳng ngang (giáp tường, có một dải len tường mảnh). Ẩn ở cảnh kết |
| `l9_bg_end` | 1366x2304, có nền | vùng chơi ở (171, 384) | Cảnh kết, **góc chung**: tường gạch kem tới chân tường y thế giới ≈ 1000; sát tường là **tủ bếp thấp** caramel nhạt (cao ≈ 120, cửa ô to); **sàn gỗ mật ong** ván ngang như L1 từ y 1000 xuống đáy, ván xa hẹp, ván gần rộng. Trống, không đồ |

### 5.2 Bếp

| Key | Hiển thị | Neo | Trạng thái và mô tả |
|---|---|---|---|
| `l9_stove` | 520x400 | tâm (620, 470) | Bếp ga 2 họng **trắng ấm**, 3/4: mặt trên to (y ≈ 0–250 của khối) có **họng nhỏ trái** (tâm (130,125) trong khối, rộng 140) và **họng lớn phải** (tâm (360,125), rộng 200): mỗi họng là elip dẹt, vòng nâu viền nhạt + kiềng 6 chấu nâu viền nhạt; mặt trước dải ngắn (cao ≈ 150) đổ bóng lavender nhạt, **núm nhỏ trái** caramel liền trong ảnh (tâm (130, 320)). Chỗ núm lớn phải để trống (lỗ tròn nhạt) cho `l9_knob`. Một trạng thái |
| `l9_knob` | 96x96 | tâm (720, 590) | Núm lớn caramel tròn mập, vạch chỉ vàng bơ. **Một ảnh, code xoay** (tắt: vạch lên; bật: xoay theo tay) |
| `l9_flame`* | ≈ 230x60 | tâm họng lớn | Vòng ngọn lửa nhỏ xanh da trời lõi vàng bơ quanh họng lớn (elip dẹt, ~10 ngọn hình giọt). Nếu Dev vẽ bằng code thì bỏ |

### 5.3 Sơ chế

| Key | Hiển thị | Neo | Trạng thái và mô tả |
|---|---|---|---|
| `l9_plate` | 300x170 | (150,75) tâm miệng; đặt (290, 900) | Đĩa nông trắng ấm, elip dẹt, viền miệng xanh da trời rất nhạt, lòng đĩa trũng nhẹ |
| `l9_basin` | 360x260 | (180,90) tâm miệng; đặt (730, 880) | Chậu tròn thành sky blue nhạt, miệng trắng ấm, **lòng nước sky blue rất nhạt** phẳng. Trạng thái: nước phẳng; **nước gợn bọt** (`l9_basin_foam`*: thêm vòng gợn và vài bọt trắng ấm) — hoặc code vẽ gợn |
| `l9_chicken_raw` | 230x130 | tâm; trên đĩa (290, 885) | Ức gà nguyên **còn da**: tảng thịt bầu dục mập, mặt trên phủ **lớp da hồng đào nhạt hơi gợn lấm tấm**, mép dưới lộ thịt hồng phấn. Trạng thái **ướt bóng** (`l9_chicken_wet`*: thêm 4–5 vệt sáng trắng ấm bóng nước, vài giọt) |
| `l9_chicken_peeled` | 230x130 | tâm; trên thớt (470, 1035) | Tảng ức gà **đã gỡ da, nguyên khối**: hồng phấn pha trắng ấm, thớ thịt vài nét chì dọc. Cùng dáng, cùng cỡ với `raw`. Vết cắt 1–4 nhát: **code vẽ** đường nâu mảnh ngang (CH_CUTS) |
| `l9_chicken_skin` | 200x90 | tâm | Miếng da gà mỏng rời, mép quăn nhẹ, hồng đào nhạt lấm tấm, 3–4 vệt sáng ướt |
| `l9_chicken_piece` | 210x40 | tâm | **Một dải gà ngang** (5 dải xếp trước sau sau khi cắt; code co rộng 0,75–1): dải thịt hồng phấn, mặt trên và một mép cắt nhạt hơn ở mặt trước. Dùng cả khi dồn trái thớt, nhảy vào nồi |
| `l9_board` | 500x240 | (250,105) tâm mặt trên; đặt (470, 1040) | Thớt gỗ chữ nhật bo góc, **mặt trên to** gỗ mật ong sáng, vài nét thớ ngang, **cạnh dày caramel** ở mặt trước, lỗ treo tròn ở đầu phải |
| `l9_knife` | 380x70 | tâm; điểm xoay **1/3 từ cán** (Dev chốt) | Dao bếp **nằm ngang, cán phải, lưỡi chĩa trái, mép lưỡi quay xuống**: lưỡi trắng ấm bản rộng vừa, vệt sáng mép, đổ bóng lavender; cán caramel bo tròn 2 đinh tán kem |
| `l9_peeler` | 220x60 | tâm; đầu lưỡi ở trái | Dao gọt nằm ngang: lưỡi ngắn trắng ấm bên trái, cán **bạc hà** bên phải |
| `l9_pumpkin` | 220x200 | tâm; (565, 1030) | Bí đỏ nguyên tròn dẹt có múi, **vỏ hồng đào đậm hơn ruột một chút**, cuống xanh lá ngắn ở đỉnh. Thấy đỉnh (3/4) |
| `l9_pumpkin_rind` | 40x84 | tâm | **Một miếng vỏ bí** cong (10 miếng, 5 cột × 2 hàng phủ quả; chạm thì bong rơi): hồng đào, mặt trong cam mơ nhạt |
| `l9_pumpkin_peeled`* | 220x200 | tâm | Bí đã gọt: ruột **cam mơ nhạt** mịn có múi nhẹ, cuống xanh lá còn. Cùng dáng `l9_pumpkin`. Xoay 90° (G9-10, cuống xoay theo): **code xoay ảnh** |
| `l9_pumpkin_dice` | 42x42 | tâm | Một hạt lựu bí: khối vuông bo góc, mặt trên mơ nhạt, mặt trước mơ đậm hơn chút |

### 5.4 Nấu, xay, rây, chia

| Key | Hiển thị | Neo | Trạng thái và mô tả |
|---|---|---|---|
| `l9_pot` | 300x290 | (150,70) tâm miệng; (720, 265) | Nồi **men bạc hà nhạt**, 3/4: miệng elip dẹt to (lòng nồi thấy rõ), thân trụ thấp, 2 quai tai caramel ngang miệng. **Lòng nồi trống trắng ấm**; nội dung lòng (nước, gà và bí, sôi bong bóng, súp) — code vẽ elip hoặc ảnh lớp `l9_pot_fill_*`* (chờ Dev 2) |
| `l9_ladle` | 300x90 | (45,45) tâm lòng muôi | Muôi nằm ngang: lòng muôi tròn trắng ấm bên trái (thấy lòng, 3/4), cán dài caramel sang phải |
| `l9_blender` | 240x400 | (120,60) tâm miệng cối; (300, 820) | Máy xay: **cối thủy tinh xanh da trời rất nhạt gần trong**, thon dần xuống, miệng elip; **đế trắng ấm** khối thấp bo tròn. Lòng cối: rỗng / lợn cợn / sánh / mịn — code vẽ hoặc ảnh lớp (chờ Dev 2) |
| `l9_blender_btn` | 90x90 | tâm; (300, 1090) | Nút tròn **hồng đào** ở mặt trước đế. Trạng thái nhấn (`l9_blender_btn_down`*: lún, nhạt hơn) hoặc code co |
| `l9_sieve` | 360x200 | (130,70) tâm vành; (720, 975) | Rây trên tô: vành tròn **caramel**, lòng lưới bán cầu nâu viền mảnh thưa vẽ to, cán caramel sang phải |
| `l9_tureen` | 360x260 | (180,80) tâm miệng; (720, 1000) | Tô to trắng ấm, **viền miệng hồng đào**, lòng sâu. Súp trong tô (nóng, nguội, vơi dần): code vẽ elip súp |
| `l9_tray` | 280x200 | (140,65) tâm miệng; (790, 1170) | Hộp đựng mở nắp **hồng phấn**, lòng trắng ấm, có vạch chân mèo nhạt trong lòng |
| `l9_tray_lid` | 292x150 | (146,62) | Nắp hộp trắng ấm viền hồng phấn |
| `l9_tray_ribbon`* | ≈ 300x200 | tâm | Hộp đã đậy + ruy băng chéo chữ thập và **nơ vàng bơ** to ở giữa nắp (trạng thái cuối trước khi bay đi). Ruy băng quấn dần: code (che dần) |
| `l9_bowl` | 240x170 | (120,55) tâm miệng; (200, 1240) và (824, 1240) | Bát nông rộng trắng ấm, viền miệng hồng đào, **vạch chân mèo hồng phấn nhạt** trong lòng. Súp trong bát: code vẽ |
| `l9_end_bowl` | 240x130 | đáy | Bát đầy súp **ở cảnh kết**, **góc chung** (nhìn ngang hơn, miệng elip dẹt hơn ≈ 0,25): súp mơ nhạt có vài hạt hồng đào |
| `l9_paw_black` | 120x560 | đáy | Chân Mun thò lên: cẳng dài đen than ấm có vân chì, bàn chân tròn, **4 nệm ngón + nệm to hồng đào** (nhìn lòng bàn chân hướng lên trên-ra phía người xem). Đáy cẳng cắt ngang (khuất dưới mép bàn) |
| `l9_paw_white` | 120x560 | đáy | Chân Sữa: như trên, **trắng ấm lông xù mép**, nệm hồng phấn |
| `l9_icon_soup` | 300x220 | tâm | Icon bong bóng nhiệm vụ: **1 bát súp** trắng ấm viền hồng đào đầy súp mơ nhạt có hạt, **khói thơm hình 2 con cá** trắng ấm bay lên. Góc chung |

### 5.5 Mèo cảnh kết (góc chung, nhìn nghiêng)

| Key | Hiển thị | Neo | Mô tả |
|---|---|---|---|
| `mun_soup_walk` | 320x250 | đáy; vào từ trái tới (165, 1125) | Mun **đi nhìn nghiêng sang phải**, như dáng đi trong `mun_ref`: thân thon, chân dài, đuôi dài cong lên, mắt vàng mật ong. Thấy rõ đầu, tai, mặt |
| `mun_soup_surprise` | 320x250 | đáy | Đứng khựng nhìn sang phải (về Sữa): **mắt tròn to, tai dựng, đuôi phồng nhẹ** |
| `mun_soup_eat` | 320x250 | đáy | Cúi đầu vào bát bên phải, **mắt híp cong**, đuôi cong thả lỏng |
| `sua_soup_walk` | 320x250 | đáy; vào từ phải tới (859, 1125) | Sữa **đi nhìn nghiêng sang trái**, như dáng đi trong `sua_ref`: đầu to tròn, lông bông, đuôi bông to, mắt xanh da trời |
| `sua_soup_surprise` | 320x250 | đáy | Khựng nhìn sang trái (về Mun), mắt tròn, tai dựng, đuôi phồng |
| `sua_soup_eat` | 320x250 | đáy | Cúi đầu vào bát bên trái, mắt híp, má hồng |

Hai con **giữ đúng cỡ cũ** (G9-3), không thu nhỏ; mỗi con cao hơn bát rõ, đầu luôn thấy rõ.

## 6. Tách lớp (bàn với Dev 2, chờ trả lời)

Dev 2 trả lời (2026-11-03). Các điểm sau ghi đè mục 5 khi khác nhau:
- **Nền:** `l9_bg_kitchen` gồm tường gạch phía trên và tủ phía dưới mép bàn. `l9_counter` 1366x1260, neo đỉnh ở (512, 260), ẩn ở cảnh kết. `l9_bg_end` là nền riêng, hiện dần lên.
- **Lửa:** code vẽ. **Bỏ `l9_flame`**; nếu sau muốn vẽ thì làm 1 ảnh vòng lửa, code chỉ lắc.
- **Súp, nước trong lòng đồ:** code vẽ hết (nồi, cối, rây, tô, bát, khay). Art chỉ vẽ **đồ rỗng**, lòng trống tối nhẹ. Bỏ `l9_basin_foam`, `l9_pot_fill_*`, `l9_blender_btn_down`.
  - Cối máy xay vẽ **thủy tinh trong** để thấy lòng.
  - Riêng `l9_end_bowl` vẽ sẵn đầy súp.
- **Gà:** `raw` (có da) → `peeled` + `skin` đè lên, kéo ra được. Vết cắt do code vẽ. 5 dải dùng chung `l9_chicken_piece`, code co ngang.
  - **Bỏ `l9_chicken_wet`**: bóng nước do code vẽ, hoặc vẽ sẵn nhẹ trên `raw`.
- **Bí:** `l9_pumpkin` là **thân đã gọt** (màu ruột mơ nhạt, **gần tròn, không gân lệch hướng**, **không cuống**). 10 miếng vỏ `l9_pumpkin_rind` đè lên thân.
  - Xoay 90° và vết cắt do code, thân giữ nguyên. **Bỏ `l9_pumpkin_peeled`.**
  - Cuống: Art đề xuất vẽ ảnh **`l9_pumpkin_stem`** (≈ 40x40, xanh lá, neo ở gốc cuống), code xoay theo quả.
- **Khay:** ruy băng và nơ hiện code vẽ. Art đề xuất vẽ ảnh cho đúng style: **`l9_tray_ribbon`** (dải dọc và ngang vàng bơ đè lên nắp, code hé dần) và **`l9_tray_bow`** (nơ vàng bơ, neo tâm nút nơ, code phóng 0→1). Bỏ `l9_tray_ribbon` dạng hộp kín cũ.
- **Dao:** 380x70, lưỡi trái (sống trên, mép lưỡi phẳng dưới), cán phải. Điểm tựa bập bênh trên mép lưỡi tại (252, 60). **Lưỡi dài ≥ 250.**
- **Dao gọt:** 220x60, lưỡi trái; đầu lưỡi cách tâm 104 là điểm chạm vỏ.
- **Muôi:** 300x90, neo tâm lòng (45, 45), cán sang phải hơi lên.
- **Chân mèo:** 120x560, neo đáy, đệm chân cách neo ≈ 500.
- **Ảnh khối demo:** `art/ref/l9_demo/khoi_prep|cook|blend|sieve|end.png`. Ở bước 5, đĩa và chậu đã bay ra và chưa có nồi.

## 7. Demo (bước 4)

Khung 1080x1920 có HUD (như L8), thêm bản 3:4 (1440x1920). Cách làm như L8: Codex vẽ **vùng chơi 1024x1536** đúng cỡ trong game theo ảnh vị trí khối (Dev 2 chụp `art/ref/l9_demo/khoi_*.png`), rồi nối mép trên dưới và hai bên, rồi Art ghép HUD.

| Tranh | Nội dung |
|---|---|
| `l9_demo_prep` | Sơ chế: thớt giữa bàn, **gà đã cắt thành dải dồn trái thớt**, **bí đỏ trên thớt**, dao nằm ngang bên phải (cán phải); đĩa trống và chậu nước phía trên thớt; bếp ga trắng ấm phía sau, nồi men bạc hà trên họng lớn (nước) |
| `l9_demo_cook` | Nấu, **khung zoom 1,4 vào nồi**: nồi sôi lục bục súp lợn cợn (gà hồng phấn, bí mơ), lửa xanh nhạt, hơi trắng ấm bốc lên; muôi nằm trên mặt bàn ngay dưới bếp; **chân Sữa trắng** thò lên từ mép dưới vỗ muôi |
| `l9_demo_blend` | Xay và rây: nồi nghiêng đổ dòng súp cong vào cối máy xay; bên phải là tô có rây phía trên, súp mịn trong rây và tô; bếp phía sau |
| `l9_demo_end` | Cảnh kết, **góc chung**: sàn bếp, 2 bát cách xa, Mun bên trái và Sữa bên phải cúi đầu ăn, mắt híp, trái tim nhỏ, khói cá |

Mỗi lượt Codex kèm: `owner_l1_style_ref.png`, `l1_depth_angle_ref.png`, ảnh khối đúng cảnh, `mun_ref` / `sua_ref` nếu có mèo; dán khối style mục 1, khối CAMERA 2b và khối ngoại lệ L9 (trừ cảnh kết); Codex viết Nhắc lại quy tắc và Tự kiểm.
- **Dev 2 đồng ý 3 ảnh thêm** (2026-11-03), thêm key lúc tách asset:
  - `l9_pumpkin_stem`: gốc cuống đặt trên mép trên thân quả, cách tâm quả ≈ 80 px theo chiều dọc, cuống chĩa lên; code xoay quanh tâm quả.
  - `l9_tray_ribbon`: vẽ khớp đúng khung `l9_tray_lid` (292x150, neo (146, 62)), dải dọc giữa và dải ngang giữa, chồng lên nắp là trùng.
  - `l9_tray_bow`: ≈ 120x70.

## 8. Tách asset (bước 5, chủ dự án duyệt 4 demo 2026-11-04)

Demo đã duyệt (chuẩn duy nhất): `art/out/demo/l9_demo_prep|cook|blend|end.png` (1080x1920). Vùng chơi tương ứng: `l9_demo_prep_play2.png`, `l9_demo_cook_play2.png`, `l9_demo_blend_play2.png`, `l9_demo_end_play.png`. Ảnh cắt từng món: `art/ref/l9_cut/`. Brief: `art/review/l9_tach_1..6_brief.md`.

**Chỗ khác demo (ghi rõ để Codex và Dev theo):**
- **Tay Mun và Sữa thò lên (`l9_paw_black`, `l9_paw_white`), chủ dự án dặn:** cẳng chân **thẳng dọc** từ mép dưới lên, không cong gập như demo. Nệm chân giữ như demo. `l9_paw_black` chỉnh sửa từ `l9_paw_white` (cùng dáng), lông Mun.
- **Dao:** lưỡi dài hơn demo (≈ 2/3 chiều dài dao, ≥ 250 trên dao 380) theo yêu cầu Dev 2.
- **Đồ rỗng** (súp, nước do code vẽ): `l9_pot`, `l9_basin`, `l9_blender`, `l9_sieve`, `l9_tureen`, `l9_bowl`, `l9_tray` vẽ lòng trống. Đế máy xay trơn, nút riêng. Bếp ga bỏ núm lớn (đế tròn trống), núm riêng.
- **Bí:** thân `l9_pumpkin` đã gọt, không cuống, không vết cắt; cuống `l9_pumpkin_stem` riêng.
- **Mun cảnh kết:** thân thon hơn, tai hơi cụp như `mun_ref` (Codex tự kiểm demo ghi Mun hơi mập).
- Vị trí và cỡ mọi món theo số Dev 2 (bản khối), không theo demo.
- **Nền:** `l9_bg_kitchen` và `l9_bg_end` dựng từ ảnh nền sạch Codex xoá đồ khỏi demo (lượt 6), nối rộng 1366x2304 (lặp ô gạch, tủ, ván sàn, vì nền sạch không có đồ sát mép). `l9_counter` cắt từ cùng ảnh nền bếp (y 260 → 1520).

### 8.1 Bảng tờ (tách theo demo, lượt 1–2)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l9src_l9_board | 0,0,1881,836 | l9_board | level9 |  | tâm | rộng 500 | 5 |
| l9src_l9_chicken_piece | 0,0,1536,1024 | l9_chicken_piece | level9 |  | tâm | rộng 210 | 5 |
| l9src_l9_chicken_peeled | 0,0,1536,1024 | l9_chicken_peeled | level9 | l9_chicken | 768,512 | rộng 230 | 5 |
| l9src_l9_chicken_raw | 0,0,1536,1024 | l9_chicken_raw | level9 | l9_chicken | 768,512 |  | 5 |
| l9src_l9_chicken_skin | 0,0,1536,1024 | l9_chicken_skin | level9 |  | tâm | rộng 200 | 5 |
| l9src_l9_knife | 0,0,2172,724 | l9_knife | level9 |  | tâm | rộng 380 | 5 |
| l9src_l9_knob_v2 | 0,0,1254,1254 | l9_knob | level9 |  | tâm | rộng 96 | 5 |
| l9src_l9_peeler | 0,0,1536,1024 | l9_peeler | level9 |  | tâm | rộng 220 | 5 |
| l9src_l9_plate | 0,0,1536,1024 | l9_plate | level9 |  | tâm | rộng 300 | 5 |
| l9src_l9_pumpkin_whole | 0,0,1254,1254 | l9_pumpkin | level9 | l9_pumpkin | 627,627 | rộng 220 | 5 |
| l9src_l9_pumpkin_dice | 0,0,1254,1254 | l9_pumpkin_dice | level9 |  | tâm | rộng 42 | 5 |
| l9src_l9_pumpkin_stem | 0,0,1254,1254 | l9_pumpkin_stem | level9 |  | đáy | cao 44 | 5 |
| l9src_l9_stove_v2 | 0,0,1484,1060 | l9_stove | level9 |  | tâm | rộng 520 | 5 |

### 8.2 Bảng tờ (tách theo demo, lượt 3–6)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l9src_l9_pot | 0,0,1536,1024 | l9_pot | level9 |  | tâm | rộng 300 | 5 |
| l9src_l9_ladle | 0,0,1536,1024 | l9_ladle | level9 |  | tâm | rộng 300 | 5 |
| l9src_l9_paw_white | 0,0,1024,1536 | l9_paw_white | level9 | l9_paw | đáy | cao 560 | 5 |
| l9src_l9_paw_black | 0,0,1024,1536 | l9_paw_black | level9 | l9_paw | đáy |  | 5 |
| l9src_l9_basin | 0,0,1536,1024 | l9_basin | level9 | l9_basin | 768,512 | rộng 360 | 5 |
| l9src_l9_blender | 0,0,1024,1536 | l9_blender | level9 | l9_blender | 512,768 | cao 400 | 5 |
| l9src_l9_blender_btn | 0,0,1254,1254 | l9_blender_btn | level9 |  | tâm | rộng 90 | 5 |
| l9src_l9_sieve | 0,0,1536,1024 | l9_sieve | level9 |  | tâm | rộng 360 | 5 |
| l9src_l9_tureen | 0,0,1536,1024 | l9_tureen | level9 |  | tâm | rộng 360 | 5 |
| l9src_l9_bowl | 0,0,1536,1024 | l9_bowl | level9 |  | tâm | rộng 240 | 5 |
| l9src_l9_tray | 0,0,1484,1060 | l9_tray | level9 |  | tâm | rộng 280 | 5 |
| l9src_l9_tray_lid | 0,0,1536,1024 | l9_tray_lid | level9 | l9_tray_lid | 768,512 | rộng 292 | 5 |
| l9src_l9_tray_ribbon | 0,0,1536,1024 | l9_tray_ribbon | level9 | l9_tray_lid | 768,512 |  | 5 |
| l9src_l9_tray_bow | 0,0,1536,1024 | l9_tray_bow | level9 |  | tâm | rộng 120 | 5 |
| l9src_l9_icon_soup | 0,0,1536,1024 | l9_icon_soup | level9 |  | tâm | rộng 300 | 5 |
| l9src_l9_end_bowl | 0,0,1536,1024 | l9_end_bowl | level9 |  | đáy | rộng 240 | 5 |
| l9src_mun_soup_eat | 0,0,1536,1024 | mun_soup_eat | cats | mun_soup | đáy | rộng 290 | 5 |
| l9src_mun_soup_walk | 0,0,1536,1024 | mun_soup_walk | cats | mun_soup | đáy |  | 5 |
| l9src_mun_soup_surprise | 0,0,1536,1024 | mun_soup_surprise | cats | mun_soup | đáy |  | 5 |
| l9src_sua_soup_eat | 0,0,1536,1024 | sua_soup_eat | cats | sua_soup | đáy | rộng 310 | 5 |
| l9src_sua_soup_walk | 0,0,1536,1024 | sua_soup_walk | cats | sua_soup | đáy |  | 5 |
| l9src_sua_soup_surprise | 0,0,1536,1024 | sua_soup_surprise | cats | sua_soup | đáy |  | 5 |

Nền (`l9_bg_kitchen`, `l9_counter`, `l9_bg_end`) dựng bằng script từ `l9src_l9_bg_kitchen_clean.png` và `l9src_l9_bg_end_clean.png` (không qua sheet_cut): 1366x2304, vùng chơi ở (171, 384); lớp bàn 1366x1260 cắt từ nền bếp y thế giới 260 → 1520.

### 8.3 Bảng tờ G9-14 (sửa theo góp ý chủ dự án)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l9src_l9_pumpkin_peeled | 0,0,1254,1254 | l9_pumpkin_peeled | level9 | l9_pumpkin | 627,627 |  | 5 |
| l9src_l9_flame_a | 0,0,1536,1024 | l9_flame_a | level9 | l9_flame | 768,512 | rộng 230 | 5 |
| l9src_l9_flame_b | 0,0,1536,1024 | l9_flame_b | level9 | l9_flame | 768,512 |  | 5 |
| l9src_l9_basin_full | 0,0,1536,1024 | l9_basin_full | level9 | l9_basin | 768,512 |  | 5 |
| l9src_l9_basin_ripple | 0,0,1536,1024 | l9_basin_ripple | level9 | l9_basin | 768,512 |  | 5 |
| l9src_l9_blender_lid | 0,0,1024,1536 | l9_blender_lid | level9 | l9_blender | 512,768 |  | 5 |
| l9src_l9_hint_arrow_straight | 0,0,1536,1024 | l9_hint_arrow_straight | level9 |  | tâm | rộng 160 | 5 |
| l9src_l9_hint_arrow_curve | 0,0,1536,1024 | l9_hint_arrow_curve | level9 |  | tâm | rộng 150 | 5 |
| l9src_l9_hint_arrow_circle | 0,0,1254,1254 | l9_hint_arrow_circle | level9 |  | tâm | rộng 140 | 5 |
| l9src_l9_hint_tap | 0,0,1254,1254 | l9_hint_tap | level9 |  | tâm | rộng 120 | 5 |

10 miếng vỏ `l9_pumpkin_rind_0..9` cắt bằng script từ `l9_pumpkin` (bí nguyên) theo lưới 5 cột × 2 hàng (cột theo đường múi cong), toạ độ từng miếng trong anchors.json (`on`). `l9_pumpkin_rind` cũ bỏ.

### 8.4 Khung bước đi cảnh kết (Dev 2 xin, 2026-11-05)

Khung 0 = ảnh đi hiện có. Khung 1–3 Codex chỉnh sửa từ ảnh đi (chỉ đổi chân). Nhóm riêng nhưng **cùng hệ số co** với nhóm `mun_soup` / `sua_soup` (Mun 1247/290, Sữa 1241/310 px tờ trên px hiển thị), neo cố định ở chân chạm sàn trên tờ. Khung 3 Sữa dịch (+12, +4) cho trùng thân (`l9src_sua_soup_walk_3a`).

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l9src_mun_soup_walk | 0,0,1536,1024 | mun_soup_walk_0 | cats | mun_soup_walkc | 735,982 | rộng 253.49 | 5 |
| l9src_mun_soup_walk_1 | 0,0,1536,1024 | mun_soup_walk_1 | cats | mun_soup_walkc | 735,982 |  | 5 |
| l9src_mun_soup_walk_2 | 0,0,1536,1024 | mun_soup_walk_2 | cats | mun_soup_walkc | 735,982 |  | 5 |
| l9src_mun_soup_walk_3 | 0,0,1536,1024 | mun_soup_walk_3 | cats | mun_soup_walkc | 735,982 |  | 5 |
| l9src_sua_soup_walk | 0,0,1536,1024 | sua_soup_walk_0 | cats | sua_soup_walkc | 858,998 | rộng 301.51 | 5 |
| l9src_sua_soup_walk_1 | 0,0,1536,1024 | sua_soup_walk_1 | cats | sua_soup_walkc | 858,998 |  | 5 |
| l9src_sua_soup_walk_2b | 0,0,1536,1024 | sua_soup_walk_2 | cats | sua_soup_walkc | 858,998 |  | 5 |
| l9src_sua_soup_walk_3a | 0,0,1536,1024 | sua_soup_walk_3 | cats | sua_soup_walkc | 858,998 |  | 5 |
