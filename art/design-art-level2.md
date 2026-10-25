# Design Art – Level 2: Giỏ tất

> Đọc kèm `style.md`. Mọi ảnh theo đúng phong cách chung: bút chì màu, pastel nhạt, nét tay, cute, tối giản, **không chữ**.
>
> **Phòng:** Phòng ngủ. **Mèo:** Sữa. **Ý chính:** Sữa trắng ngủ lẫn trong giỏ tất trắng. Chạm giỏ 3 lần, mỗi lần một chiếc tất bay ra, lần thứ 3 lộ Sữa cuộn tròn ngủ.

Lưu ảnh vào `art/out/level2/`. Ảnh Sữa lưu `art/out/cats/`. **Tên file và key trong bảng là tên chính thức để dev dùng thẳng trong code, không đổi** (quy tắc ở `style.md` mục 4).

---

## 1. Danh sách ảnh cần vẽ

| # | File (trong art/out/) | Key trong code | Kích thước | Nền | Loại |
|---|---|---|---|---|---|
| 1 | `level2/l2_bg_bedroom.png` | `l2_bg_bedroom` | 1024x1536 | Có nền | Nền phòng |
| 2 | `level2/l2_sock_basket_full.png` | `l2_sock_basket_full` | 1024x1024 | Trong suốt | 🔑 Giỏ tất đầy (Sữa lẫn bên trong) |
| 3 | `level2/l2_sock_basket_2.png` | `l2_sock_basket_2` | 1024x1024 | Trong suốt | 🔑 Giỏ sau lần chạm 1 |
| 4 | `level2/l2_sock_basket_3.png` | `l2_sock_basket_3` | 1024x1024 | Trong suốt | 🔑 Giỏ sau lần chạm 2 |
| 5 | `level2/l2_sock_basket_reveal.png` | `l2_sock_basket_reveal` | 1024x1024 | Trong suốt | 🔑 Giỏ lộ Sữa ngủ |
| 6 | `level2/l2_sock_striped.png` | `l2_sock_striped` | 1024x1024 | Trong suốt | Tất kẻ sọc (bay ra lần 1) |
| 7 | `level2/l2_sock_dotted.png` | `l2_sock_dotted` | 1024x1024 | Trong suốt | Tất chấm bi (bay ra lần 2) |
| 8 | `level2/l2_sock_white_big.png` | `l2_sock_white_big` | 1024x1024 | Trong suốt | Tất trắng to (bay ra lần 3) |
| 9 | `level2/l2_bed_blanket_flat.png` | `l2_bed_blanket_flat` | 1536x1024 | Trong suốt | 🎭 Giường, chăn phủ có cục phồng |
| 10 | `level2/l2_bed_blanket_flipped.png` | `l2_bed_blanket_flipped` | 1536x1024 | Trong suốt | 🎭 Giường, chăn lật lộ gối |
| 11 | `level2/l2_slipper.png` | `l2_slipper` | 1024x1024 | Trong suốt | ✨ Chiếc dép trượt ra gầm giường |
| 12 | `level2/l2_wardrobe_closed.png` | `l2_wardrobe_closed` | 1024x1536 | Trong suốt | ✨ Tủ quần áo đóng |
| 13 | `level2/l2_wardrobe_open.png` | `l2_wardrobe_open` | 1024x1536 | Trong suốt | ✨ Tủ quần áo mở |
| 14 | `level2/l2_shoebox.png` | `l2_shoebox` | 1024x1024 | Trong suốt | ✨ Hộp giày trên nóc tủ |
| 15 | `level2/l2_curtain_closed.png` | `l2_curtain_closed` | 1024x1536 | Trong suốt | ✨ Rèm đóng |
| 16 | `level2/l2_curtain_open.png` | `l2_curtain_open` | 1024x1536 | Trong suốt | ✨ Rèm mở, có nắng |
| 17 | `level2/l2_plush_cat.png` | `l2_plush_cat` | 1024x1024 | Trong suốt | 🎭 Mèo nhồi bông trên kệ |
| 18 | `cats/sua_run.png` | `sua_run` | 1536x1024 | Trong suốt | Sữa chạy vụt (mở màn) |
| 19 | `cats/sua_one_eye_open.png` | `sua_one_eye_open` | 1024x1024 | Trong suốt | Sữa cuộn tròn, hé một mắt |
| 20 | `cats/sua_yawn.png` | `sua_yawn` | 1024x1024 | Trong suốt | Sữa cuộn tròn ngáp |
| 21 | `level2/l2_ceiling_lamp.png` | `l2_ceiling_lamp` | 1024x1536 | Trong suốt | ✨ Đèn trần có chao (tách khỏi nền) |
| 22 | `level2/l2_plush_cat_fallen.png` | `l2_plush_cat_fallen` | 1024x1024 | Trong suốt | 🎭 Mèo nhồi bông nằm ngửa dưới sàn |
| 23 | `level2/l2_coat_hook.png` | `l2_coat_hook` | 1024x1024 | Trong suốt | ✨ Móc treo tường |
| 24 | `level2/l2_beanie_white_idle.png` | `l2_beanie_white_idle` | 1024x1024 | Trong suốt | 🎭 Mũ len trắng treo móc (giống mèo) |
| 25 | `level2/l2_beanie_white_floor.png` | `l2_beanie_white_floor` | 1024x1024 | Trong suốt | 🎭 Mũ len trắng rơi dưới sàn |
| 26 | `player/player_wear_beanie.png` | `player_wear_beanie` | 1024x1536 | Trong suốt | Nhân vật đội thử mũ len |
| 27 | `level2/l2_sock_ball.png` | `l2_sock_ball` | 1024x1024 | Trong suốt | 🎭 Cuộn tất trắng tròn (giống mèo con) |
| 28 | `level2/l2_sock_unrolled.png` | `l2_sock_unrolled` | 1536x1024 | Trong suốt | 🎭 Chiếc tất dài nằm dưới sàn |
| 29 | `level2/l2_slippers_cat_idle.png` | `l2_slippers_cat_idle` | 1024x1024 | Trong suốt | 🎭 Đôi dép bông trắng tai mèo |
| 30 | `level2/l2_slippers_cat_after.png` | `l2_slippers_cat_after` | 1024x1024 | Trong suốt | 🎭 Đôi dép tai mèo, một chiếc lật nghiêng |
| 31 | `level2/l2_chair.png` | `l2_chair` | 1024x1536 | Trong suốt | ✨ Ghế gỗ nhỏ |
| 32 | `level2/l2_sweater_rolled.png` | `l2_sweater_rolled` | 1024x1024 | Trong suốt | 🎭 Áo len trắng cuộn tròn (giống mèo) |
| 33 | `level2/l2_sweater_unrolled.png` | `l2_sweater_unrolled` | 1024x1024 | Trong suốt | 🎭 Áo len trắng bung ra trên ghế |

Dùng thêm đồ chung trong `style.md` mục 5: bàn tay hướng dẫn, lấp lánh, cá khô, trái tim, chân mèo gợi ý. Đồ chung vẽ ở level 1: `sua_held`, `sua_face_icon`, `player_hands_lift`, `ui_speech_bubble`, `ui_cat_head_dark`.

**Đồ ngụy trang trắng (#17, #24, #27, #29, #32 và cục phồng trong chăn #9):** phải **trắng ấm cùng tông với Sữa** (`#FFFDF8`), dáng tròn, **cỡ bằng Sữa khi cuộn tròn**, để người chơi nhìn lướt dễ nhầm. Nhìn kỹ thì phải nhận ra là đồ vật (có đường may, cúc, quả bông, cổ tay áo…). Mỗi món nên vẽ khi đã có ảnh tham chiếu Sữa trong Project để so cỡ và màu.

**Thứ tự nên vẽ:** nền (#1) → tất (#6–#8) → giỏ tất (#2–#5, vẽ liền nhau trong cùng cuộc chat để giữ giống nhau) → đồ khác (#9–#17, #21, #23, #31) → đồ ngụy trang trắng (#22, #24–#25, #27–#30, #32–#33, vẽ liền nhau để cùng tông) → Sữa (#18–#20) → nhân vật (#26).

---

## 2. Bố cục phòng

Màn hình dọc. Chia theo chiều cao:

```
┌──────────────────────────┐
│ [hộp giày]   [cửa sổ]    │  1/3 trên: tủ quần áo cao bên trái (hộp giày trên nóc),
│ ┌──────┐ [móc](rèm ở đây)│  cửa sổ bên phải, đèn trần có chao treo giữa (ảnh riêng #21),
│ │ TỦ   │ +mũ [đèn chao]  │  móc treo tường giữa tủ và cửa sổ (#23, treo mũ len #24)
│ │      │  [kệ: mèo bông] │  kệ treo tường nhỏ bên phải, dưới cửa sổ
│ └──────┘[giỏ][cuộn tất]  │  1/3 giữa: giỏ tất sát chân tủ, cuộn tất #27 cạnh giỏ;
│      [ghế + áo len]      │  ghế #31 có áo len #32 bên phải, cạnh đầu giường
│    ┌──────────────┐      │  1/3 dưới: giường đơn nằm ngang, đầu giường bên phải,
│    │   GIƯỜNG     │      │  gầm giường tối nhẹ (dép hồng #11 trượt ra từ đây)
│  [dép tai mèo]           │  đôi dép tai mèo #29 trên thảm trước giường
└──────────────────────────┘
```

Đồ nào người chơi chạm vào có phản ứng đều là **ảnh riêng**, không vẽ vào nền: tủ, hộp giày, đèn chao, móc + mũ, kệ + mèo bông (kệ vẽ trong nền, mèo bông riêng), giỏ tất, cuộn tất, ghế + áo len, giường, dép.

---

## 3. Đặc tả chi tiết từng ảnh

### #1 `l2_bg_bedroom.png` — Nền phòng ngủ
- Phòng ngủ nhỏ, buổi sáng dịu, nhìn thẳng hơi từ trên xuống. **Không người, không mèo.**
- **Tường:** hồng phấn rất nhạt, phẳng, không hoa văn.
- **Cửa sổ** bên phải phía trên: khung gỗ trắng kem, kính xanh da trời nhạt. **Không vẽ rèm.**
- **Không vẽ đèn trần** (đèn là ảnh riêng #21). Chỉ vẽ một **móc nhỏ trên trần** ở giữa phía trên để treo đèn.
- **Kệ treo tường** nhỏ dưới cửa sổ: tấm gỗ caramel, trên có 2 cuốn sách gáy trơn (không chữ) và **chỗ trống** cho mèo bông.
- **Sàn:** gỗ caramel nhạt, vài nét chì ngang. Một tấm thảm chữ nhật xanh bạc hà trước giường.
- **Để trống** vị trí của tủ (trái), móc treo (tường giữa tủ và cửa sổ), giỏ tất và cuộn tất (cạnh chân tủ), ghế (phải, cạnh đầu giường), giường (dưới), dép tai mèo (trên thảm): các thứ đó là ảnh riêng.

### #2 `l2_sock_basket_full.png` — Giỏ tất đầy
- Giỏ mây tròn thấp màu caramel nhạt, đan bằng vài đường chéo đơn giản (không đan chi tiết), có 2 quai nhỏ.
- **Đầy ụ tất**, chủ yếu tất trắng ấm, xen 1 chiếc **kẻ sọc** và 1 chiếc **chấm bi** nằm trên cùng.
- **Quan trọng:** giữa đống tất trắng có **Sữa đang cuộn tròn ngủ, vẽ cùng màu và cùng nét với tất**, gần như không phân biệt được. Chỉ lộ rất mờ **một cái tai tròn** và đường cong lưng. Người chơi nhìn lướt chỉ thấy tất.

### #3 `l2_sock_basket_2.png` — Giỏ sau lần chạm 1
- Giống hệt #2 nhưng **không còn chiếc tất kẻ sọc**. Đống tất thấp xuống một chút.
- Sữa vẫn lẫn trong tất như #2.

### #4 `l2_sock_basket_3.png` — Giỏ sau lần chạm 2
- Giống #3 nhưng **không còn chiếc tất chấm bi**. Chỉ còn tất trắng.
- Hình Sữa vẫn lẫn, nhưng **rõ hơn một chút**: thấy được 2 tai và đuôi.

### #5 `l2_sock_basket_reveal.png` — Giỏ lộ Sữa
- Cùng giỏ, chiếc tất trắng to phía trên đã bay đi. **Sữa lộ rõ, cuộn tròn ngủ say** giữa vài chiếc tất trắng còn lại.
- Mắt nhắm thành 2 đường cong, mũi hồng, má hồng, đuôi quấn quanh mũi. Một chân trước duỗi ra mép giỏ.
- Từ đây Sữa có màu và nét viền rõ ràng hơn tất (để người chơi thấy "à, là mèo!").

### #6 `l2_sock_striped.png` — Tất kẻ sọc
- Một chiếc tất cổ ngắn, **sọc ngang to: 4 sọc hồng đào xen kem**. Mũi và gót màu hồng đào.
- Hơi cong như đang bay.

### #7 `l2_sock_dotted.png` — Tất chấm bi
- Một chiếc tất cổ cao màu xanh da trời nhạt, **6 chấm tròn to màu trắng**.
- Hơi cong như đang bay.

### #8 `l2_sock_white_big.png` — Tất trắng to
- Một chiếc tất len trắng ấm **to bất thường** (gấp đôi tất thường), cổ xù, nhìn mềm.
- Vài nét chì thể hiện len, không vẽ mắt len chi tiết.

### #9 `l2_bed_blanket_flat.png` — Giường, chăn phủ
- Giường đơn gỗ caramel nằm ngang, đầu giường tròn bên phải, chân giường ngắn.
- Chăn màu xanh da trời nhạt phủ kín, **giữa chăn có một cục phồng tròn** trông như mèo đang nằm dưới chăn.
- Gầm giường là một mảng tối nhẹ màu tím oải hương.

### #10 `l2_bed_blanket_flipped.png` — Giường, chăn lật
- Cùng giường ở #9, chăn **lật gập về phía chân giường**, lộ ra **một chiếc gối trắng tròn** (là cục phồng lúc nãy). Không có mèo.

### #11 `l2_slipper.png` — Dép bông
- Một chiếc dép bông lê màu hồng phấn, mũi tròn có **hai tai thỏ nhỏ**, nằm nghiêng như vừa trượt ra.

### #12 `l2_wardrobe_closed.png` — Tủ quần áo đóng
- Tủ gỗ 2 cánh cao, màu kem với viền caramel, nóc phẳng, 2 núm cửa tròn.
- Tủ hơi phình mập như đồ chơi. Không hoa văn.

### #13 `l2_wardrobe_open.png` — Tủ quần áo mở
- Cùng tủ ở #12, **2 cánh mở rộng**. Bên trong: thanh treo, 3 chiếc móc treo áo đơn giản (áo vàng bơ, áo hồng, áo xanh bạc hà). Không có mèo.

### #14 `l2_shoebox.png` — Hộp giày
- Hộp giày chữ nhật thấp màu xanh bạc hà, nắp màu kem, hơi nhích lệch ra.
- Trên nắp vẽ **hình chiếc giày đơn giản**, không chữ.

### #15 `l2_curtain_closed.png` — Rèm đóng
- Hai tấm rèm màu vàng bơ nhạt treo thanh gỗ trắng, kéo kín. Vài nếp cong dọc đơn giản.

### #16 `l2_curtain_open.png` — Rèm mở, có nắng
- Cùng rèm ở #15, kéo dạt hai bên, buộc dải vải trắng.
- Giữa có **vệt nắng** màu vàng bơ trong suốt nhạt, chiếu xiên xuống dưới bên trái (về phía giỏ tất). Bệ cửa sổ trống.

### #17 `l2_plush_cat.png` — Mèo nhồi bông (đánh lừa)
- Mèo nhồi bông ngồi, **trông giống Sữa** (trắng, tròn) để đánh lừa, nhưng rõ là đồ chơi:
  - mắt là **2 cúc áo tròn màu nâu**,
  - có **đường khâu chỉ** chạy dọc giữa bụng và quanh cổ,
  - một miếng vá hình trái tim hồng trên chân.

### #18 `sua_run.png` — Sữa chạy vụt
- Sữa nhìn nghiêng, **chạy sang phải**, 4 chân duỗi, tai cụp ra sau, đuôi duỗi thẳng.
- Phía sau có 3 vệt gió cong và 2 cục bụi tròn nhỏ.

### #19 `sua_one_eye_open.png` — Sữa hé một mắt
- Sữa cuộn tròn như #5 (vẽ kèm giỏ tất và vài chiếc tất trắng), **mở hé một mắt** nhìn ra, mắt kia vẫn nhắm. Vẻ mặt lười biếng.

### #20 `sua_yawn.png` — Sữa ngáp
- Cùng tư thế #19, **miệng há to ngáp**, thấy lưỡi hồng nhỏ, mắt nhắm chặt, một chân trước duỗi ra.

### #21 `l2_ceiling_lamp.png` — Đèn trần
- Dây treo mảnh từ mép trên khung xuống, cuối dây là **chao đèn hình chuông màu vàng bơ**, bóng đèn tròn ló dưới chao.
- Đỉnh dây nằm sát mép trên khung (để khớp móc trần trong nền). Treo thẳng đứng (code sẽ đung đưa quanh điểm treo).
- Tất chấm bi sẽ mắc lên chao này, nên vành chao để rộng, rõ.

### #22 `l2_plush_cat_fallen.png` — Mèo nhồi bông nằm ngửa
- **Cùng con mèo bông ở #17**, giờ **nằm ngửa dưới sàn**, bốn chân giơ lên, hai mắt cúc áo nhìn lên trên.
- Thấy rõ đường khâu giữa bụng và miếng vá trái tim.

### #23 `l2_coat_hook.png` — Móc treo tường
- Một thanh gỗ nhỏ màu caramel gắn tường, có **2 móc tròn** nhô ra. Không treo gì.

### #24 `l2_beanie_white_idle.png` — Mũ len trắng treo móc (đánh lừa)
- Mũ len trắng ấm treo trên móc, nhìn từ phía trước.
- **Cố ý trông giống đầu mèo trắng**: mũ tròn trịa, trên đỉnh có **2 quả bông len nhỏ** cách nhau như hai tai mèo. Mép mũ gấp lên một vòng.
- Nhìn kỹ thì rõ là mũ: có vành gấp, vân len vài nét chì, không mặt.
- Vẽ mũ ở đúng vị trí treo trên móc #23 (khung hình khớp với #23 khi xếp chồng).

### #25 `l2_beanie_white_floor.png` — Mũ len rơi dưới sàn
- **Cùng chiếc mũ ở #24**, giờ nằm nghiêng dưới sàn, hơi xẹp xuống, hai quả bông rủ sang một bên.

### #26 `player_wear_beanie.png` — Nhân vật đội thử mũ len
- Nhân vật chính (theo ảnh tham chiếu) đứng, **đội chiếc mũ len trắng #24**, hai quả bông trên đỉnh trông như tai mèo.
- Hai tay chống hông, cười tinh nghịch, mắt nhắm một bên như đang làm mèo.

### #27 `l2_sock_ball.png` — Cuộn tất trắng (đánh lừa)
- Một **cuộn tất trắng ấm cuộn tròn thành quả bóng**, to bằng Sữa khi cuộn tròn.
- **Cố ý trông như mèo con trắng cuộn ngủ**: tròn, mềm, có một đầu cổ tất thò ra như cái đuôi ngắn.
- Nhìn kỹ thì thấy nếp gấp cổ tất, gót tất. Không mặt.

### #28 `l2_sock_unrolled.png` — Chiếc tất dài
- **Cùng chiếc tất ở #27** giờ đã bung ra thành **một chiếc tất dài thượt** nằm ngang trên sàn, hơi uốn cong như vừa lăn.

### #29 `l2_slippers_cat_idle.png` — Đôi dép bông tai mèo (đánh lừa)
- **Đôi dép bông trắng ấm** đặt sát nhau, mũi dép tròn mập.
- Mỗi chiếc có **hai tai mèo nhỏ** nhọn tròn đầu (trong tai hồng đào) và hai chấm mắt thêu nhỏ màu nâu.
- Đặt sát nhau nhìn lướt như **một con mèo trắng đang nằm**. Nhìn kỹ thì rõ là dép (thấy đế dép, lỗ xỏ chân).

### #30 `l2_slippers_cat_after.png` — Dép tai mèo, một chiếc lật
- **Cùng đôi dép ở #29**, cùng khung hình. Một chiếc vẫn đứng yên, **chiếc kia lật nghiêng** sang bên, thấy đế dép, hai tai cụp xuống.

### #31 `l2_chair.png` — Ghế gỗ nhỏ
- Ghế gỗ caramel nhạt có lưng tựa thấp bo tròn, 4 chân ngắn. Mặt ghế trống, phẳng (áo len là ảnh riêng).

### #32 `l2_sweater_rolled.png` — Áo len trắng cuộn tròn (đánh lừa)
- Áo len trắng ấm **cuộn tròn thành một khối** đặt trên mặt ghế #31, to bằng Sữa khi cuộn tròn.
- **Cố ý trông như mèo trắng đang ngủ cuộn tròn**: hai cổ tay áo gập lại nhô lên như hai tai.
- Nhìn kỹ thì thấy cổ áo, gấu áo có bo len. Không mặt.
- Vẽ đúng vị trí trên mặt ghế (khung hình khớp với #31 khi xếp chồng).

### #33 `l2_sweater_unrolled.png` — Áo len bung ra
- **Cùng chiếc áo ở #32**, cùng khung hình. Áo **bung ra vắt trên ghế**, hai tay áo **thõng xuống mép ghế** như hai chân trước, cổ áo rủ ra trước.

---

## 4. Ghi chú cho lập trình (không cần đưa ChatGPT)

- Giỏ tất đổi ảnh #2 → #3 → #4 → #5 theo từng lần chạm. Tất #6, #7, #8 bay theo đường cong bằng code, rơi tại đầu giường, chao đèn, tay nắm tủ (xoay sprite cho hợp).
- Giỏ phập phồng theo nhịp thở, tai giật, chăn lật, cánh tủ, hộp giày nhích: làm bằng code (scale, xoay, đổi ảnh), không cần vẽ khung hình riêng.
- Mèo bông kêu "chít": chỉ là âm thanh + nảy sprite.
- Trạng thái, điều kiện chuyển, hiệu ứng và âm thanh của từng ảnh: xem `levels/states-01-10.md` mục Level 2.
- Đèn #21 tách khỏi nền để đung đưa; tất chấm bi #7 mắc lên chao đèn thì đung đưa theo đèn (gắn vào cùng nhóm).
- Đồ ngụy trang đổi trạng thái rồi **giữ nguyên tới hết màn**: mèo bông #17 → #22, mũ #24 → #25 (kèm nhân vật #26 1,2 giây), cuộn tất #27 → #28 (lăn ra giữa phòng), dép #29 → #30, áo len #32 → #33.
- Các đồ ngụy trang **không có nhịp thở**. Chỉ giỏ tất có hiệu ứng thở ở gợi ý mức 1.
