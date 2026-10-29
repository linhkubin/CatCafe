# Level 5 – Bảng bố trí bản khối đã duyệt (Dev xuất cho Art, QUY-TRINH bước 3)

Nguồn: bản khối sau D5-9, chủ dự án duyệt gameplay (G5-16). Số liệu đo trong game (`l5_block_export.json`, `l5_block_placed.json`).

- **Toạ độ:** toạ độ phòng, khung 1024×1536. Hẻm trong game nằm ở x + 1024, nhưng bảng dưới đã trừ đi.
- **X, Y:** là điểm neo của sprite.
- **Rộng × cao:** cỡ hiển thị của khối. "Phần vẽ" là khung bao phần có hình (x0, y0 – x1, y1).
- **Lớp:** depth trong game, số lớn vẽ trên.

## Ảnh chụp (thư mục `layout/`, 1024×1536, không chữ nhãn, không giao diện)

| File | Nội dung |
|---|---|
| `l5_block_backyard_clean.png` / `_grid.png` | Sân sau lúc mở màn, đủ đồ. Bản `_grid` có lưới 50/100px và số toạ độ. |
| `l5_block_alley_dark_grid.png` | Hẻm lúc đầu: tối, bạt thả, dây kéo, chấm nắng, mắt Mun dưới gầm, CD treo móc. |
| `l5_block_alley_placed_clean.png` / `_grid.png` | Hẻm đã cuộn bạt, 3 đồ đã đặt ở A/B/C, đủ tia, đốm sáng trước gầm (F), Mun ló mặt. |

Mở bản khối không chữ: `game/index.html?level=5&nolabel=1`. Vòng trúng A/B/C/F: `?level=5&debug=1`.

## Đường chân tường (ranh giới tường / sàn)

| Phòng | y chân tường | Ghi chú nền |
|---|---|---|
| Sân sau | **820** | Tường sân (hàng rào gỗ) từ y ≈ 300. Cửa sau quán bên phải x 905–1021, y 300–820, vẽ trong nền. Hai cột dây phơi x 468–478 và 1000–1010, từ y 200 tới 820, vẽ trong nền. |
| Hẻm | **790** | Trời y 0–200, dây điện cong y ≈ 175–190 (vẽ trong nền, quạ đậu trên dây). Tường đối diện y 200–790, gạch từ y 400. Trong nền có: **bậu tường B** x 410–630, y 605–627; **cửa sổ hẻm** x 645–775, y 420–532; **bậu cửa sổ** x 632–788, y 532–546. |

Thanh túi đồ (giao diện) bắt đầu ở y 1183. Đồ dưới đất không vẽ thấp hơn y ≈ 1175.

## Sân sau

| key | X | Y | Neo | Rộng × cao | Phần vẽ | Lớp | Trạng thái / ghi chú |
|---|---|---|---|---|---|---|---|
| `l5_bg_backyard` | 0 | 0 | trái-trên | 1024×1536 | – | 0 | Nền trống: tường, hàng rào, cửa sau quán, cột dây phơi. |
| `l5_cafe_window_back` | 250 | 760 | đáy | 360×400 | 90,380 – 410,700 | 5 | Kính + trong quán (sau Sữa). Cập nhật D5-12 theo Art. |
| `l5_cafe_window_frame` | 250 | 760 | đáy | 360×400 | 74,364 – 426,756 | 6.5 | Khung + bậu + thanh ngang y ≈ 480, trên Sữa; ô kính trong suốt x 100–400, y 390–670, bậu che đáy Sữa. |
| `sua_press_window` | 250 | 715 | đáy | 150×150 | 189,577 – 313,713 | 6 | Sữa áp mặt kính, luôn hiện. Chạm cửa sổ thì nảy. Chạm chuông gió thì ngóc đầu (+10°, lên 16px). |
| `l5_clothesline` | 735 | 232 | tâm | 540×20 | 465,226 – 1005,236 | 7 | Dây phơi nối hai cột, có thể vẽ luôn vào nền. |
| `l5_shirt` | 700 | 236 | đỉnh | 150×140 | 627,238 – 775,374 | 8 | Áo phơi ✨. Xoay quanh điểm treo (đỉnh giữa). |
| `l5_clothespin` | 745 | 236 | đỉnh | 16×34 | 739,238 – 753,270 | 9 | Kẹp, sprite riêng: bật bay ra rồi về chỗ. |
| `l5_wind_chime` | 465 | 360 | đỉnh | 70×150 | 430,360 – 500,508 | 8 | Chuông gió ✨, treo ở mép phải cửa sổ quán. Đung đưa quanh điểm treo. |
| `l5_doorstep` | 955 | 1015 | đáy | 120×30 | 895,985 – 1015,1015 | 9 | Bậc cửa sau quán, có thể vẽ luôn vào nền. |
| `l5_cactus_pot` | 955 | 990 | đáy | 90×130 | 910,868 – 1000,990 | 10 | Chậu xương rồng ✨ trên bậc cửa. Lắc quanh đáy. |
| `l5_cactus_flower` | đỉnh xương rồng | | đáy | 34×30 | – | 10.5 | Hoa nhỏ bật nở ở ngọn cây rồi khép, sprite riêng. |
| `l5_vanity_table` | 740 | 1010 | đáy | 320×250 | 584,764 – 896,1006 | 10 | Bàn trang điểm, mặt bàn y ≈ 764. |
| `l5_mirror_small` | 740 | 775 | đáy | 110×150 | 693,627 – 789,775 | 11 | Gương 🎒 đứng trên mặt bàn. Chạm thì vào túi. |
| `l5_trash_bag_idle` | 200 | 960 | đáy | 210×190 | 101,774 – 299,956 | 12 | Túi rác 🎭, trông như mèo đen cuộn tròn. |
| `l5_trash_bag_after` | 200 | 960 | đáy | 220×130 | 96,840 – 304,956 | 12 | Túi xẹp, miệng mở. Cùng đáy với idle. |
| `l5_tin_lid` | 650 | 1168 | đáy | 110×110 | 595,1062 – 695,1166 | 13 | Nắp hộp bánh thiếc 🎒 dựa bên phải thùng giấy, nghiêng ~15°. |
| `l5_slippers` | 235 | 1168 | đáy | 120×50 | 177,1124 – 291,1166 | 13 | Dép tổ ong 🎁 bên trái thùng giấy. |
| `l5_slippers_flipped` | 235 | 1168 | đáy | 130×60 | 170,1120 – 298,1166 | 13 | Dép lật, lộ túi cá khô (phần bên phải). Cùng đáy. |
| `l5_cardboard_box` | 450 | 1170 | đáy | 270×200 | 319,976 – 581,1166 | 14 | Thùng giấy cũ 🔑. Rung quanh đáy. Bóng đen (`mun_run`) vụt ra từ đây. |
| `player_call` | 720 | 1250 | đáy | – | – | 50 | Nhân vật mở màn (ảnh chung, đã có). |

## Hẻm

| key | X | Y | Neo | Rộng × cao | Phần vẽ | Lớp | Trạng thái / ghi chú |
|---|---|---|---|---|---|---|---|
| `l5_bg_alley` | 0 | 0 | trái-trên | 1024×1536 | – | 0 | Nền trống: trời, dây điện, tường gạch, bậu tường B, cửa sổ hẻm + bậu, sàn. Lúc đầu code phủ lớp tối (alpha 0,42) lên cả hẻm. |
| `l5_puddle` | 105 | 1125 | tâm | 150×44 | 32,1105 – 178,1145 | 9 | Vũng nước ✨. Gợn sóng và giọt bắn do code vẽ. |
| `l5_sunbeam` | 180 | 1020 | đáy | 120×780 | 124,240 – 236,1004 | 10 | Dải nắng hẹp từ mép bạt (đỉnh rộng ≈ 44) xuống A (đáy rộng ≈ 108, vệt sáng elip trên đất). Ẩn tới khi cuộn bạt, hiện dần 0,5 giây. |
| `l5_gecko` | 330 | 470 | tâm | 60×120 | 310,414 – 350,530 | 11 | Thạch sùng 🎭, đầu hướng lên, đuôi cong như đuôi mèo. Chạm thì chạy tới (330, 300); chạm lần nữa thì bò về (code xoay 180° lúc bò xuống). |
| `l5_milk_can` | 708 | 545 | đáy | 50×70 | 685,479 – 731,545 | 11 | Ống bơ 🎁 trên bậu cửa sổ hẻm. Nghiêng −55° quanh đáy, cá rơi ra. |
| `l5_bike` | 750 | 905 | đáy | 240×150 | 630,761 – 868,903 | 15 | Xe đạp ✨ dựng tường, đầu xe bên phải. Gồm khung, bánh sau, ghi đông, chuông, yên, **giỏ** (x ≈ 818–866, y ≈ 781–809, là điểm C). |
| `l5_bike_wheel` | 818 | 873 | tâm | 84×84 | 778,833 – 860,915 | 15.5 | Bánh trước, sprite riêng, quay quanh tâm. |
| `l5_cart` | 640 | 1170 | đáy | 380×250 | 452,924 – 828,1166 | 20 | Xe ba gác: thùng y 924–1080, **gầm tối** x 485–795, y 1080–1165 (Mun nấp ở đây), 2 bánh. |
| `l5_cd_hanging` | 95 | 455 | đỉnh | 80×110 | 59,465 – 131,561 | 21 | Đĩa CD 🎒 treo bằng dây trên móc tường bên trái. Móc có thể vẽ vào nền. |
| `l5_drain_pipe` | 975 | 1170 | đáy | 90×760 | 934,414 – 1016,1162 | 24 | Ống thoát nước 🎁, sát mép phải. |
| `l5_awning_down` | 512 | 210 | đỉnh | 860×170 | 84,212 – 942,378 | 25 | Bạt thả, có vài lỗ thủng nhỏ (chấm nắng lọt xuống do code vẽ). |
| `l5_awning_rolled` | 512 | 210 | đỉnh | 860×60 | 84,212 – 940,268 | 25 | Bạt cuộn. Cùng mép trên, cùng bề ngang với bạt thả. |
| `l5_awning_cord` | 820 | 372 | đỉnh | 60×360 | 794,372 – 846,730 | 28 | Dây kéo có vòng tròn (vòng ở y ≈ 680–730), treo từ mép dưới bên phải bạt. Đung đưa ±4° quanh đỉnh. Ẩn sau khi kéo. |
| `l5_crow_idle` | 300 | 192 | đáy | 110×100 | 257,100 – 353,188 | 26 | Quạ 🎭 đậu dây điện. |
| `l5_crow_far` | 820 | 192 | đáy | 90×85 | 779,115 – 857,189 | 26 | Quạ đậu chỗ xa hơn trên dây. Bay qua lại giữa 2 chỗ. |
| `mun_eyes_dark` | 640 | 1122 | tâm | 130×56 | 597,1104 – 685,1140 | 28 | Đôi mắt vàng trong gầm, nằm trên lớp tối. Code co ×1,35 sau khi đặt ở A, dõi theo đốm sáng ±10px. |
| `mun_paw_reach` | mép phải gầm (785, 1122) | | trái-giữa | 150×54 | – | 28 | Một chân đen thò ra. Code co giãn theo chiều ngang (0,1 → 1), xoay hướng về đốm sáng ở giỏ xe. |
| `mun_peek_out` | 770 | 1168 | đáy | 150×110 | 713,1062 – 829,1168 | 28 | Mun ló cả mặt ở mép phải gầm, cùng phía đốm sáng. |
| `mun_run` | đuổi trên đất | | đáy | 220×130 | – | 30 | Chạy ngang. Code lật ngang khi chạy sang trái. Phóng ra từ (755, 1165). |
| `mun_pounce` | | | đáy | 220×160 | – | 30 | Vồ (0,28 giây). |
| `mun_pin_light` | 300 | 1175 | đáy | 200×160 | 232,1019 – 368,1173 | 30 | Hai chân trước đè đốm sáng trên đất. |
| `mun_look_paw` | 300 | 1175 | đáy | 190×210 | 225,995 – 377,1167 | 30 | Nhấc chân nhìn. Đốm sáng nhỏ (58px) hiện trên lưng chân ở ≈ (341, 1076). |

## Điểm nối tia, đốm sáng, đồ đã đặt

| Điểm | Toạ độ đốm sáng | Đồ đặt (key) | Neo đồ đặt | Phần vẽ đồ đặt | Ghi chú |
|---|---|---|---|---|---|
| A | (180, 980) | `l5_tin_lid_placed` (nắp thiếc) | đáy (180, 1010) | 122,916 – 208,1004 | Đất hẻm dưới mép bạt, trong vệt nắng. |
| B | (520, 575) | `l5_mirror_placed` (gương) | đáy (520, 605) | 464,503 – 540,595 | Đứng trên bậu tường B (y 605). |
| C | (842, 780) | `l5_cd_placed` (đĩa CD) | đáy (842, 786) | 786,694 – 868,778 (khối) | Gác trong giỏ xe đạp; đáy ảnh = miệng giỏ y ≈ 786, chỉ vẽ phần đĩa thò lên (D5-12). |
| F | (872, 1130) | – | – | – | Ngay trước gầm, phía bánh phải. Đốm sáng tự lượn ±16px. |

- **Đồ đã đặt:** khối 124×120, neo đáy giữa. Code không xoay, nên độ nghiêng (đĩa dựng nghiêng ~20°, mặt hướng về tia) phải vẽ sẵn trong ảnh. Phần có hình rộng ≈ 80, cao ≈ 90. Lớp 21,1, trên xe ba gác.
- **Đốm sáng `l5_light_spot`:** 96×96, neo tâm, lớp 21,4. Ảnh phẳng có vân chì. Quầng sáng (vòng 58px, phập phồng ×1,25) và tia phản chiếu (3 nét chồng) do code vẽ. Khi đứng yên, code cho nó nhảy ±3px.
- **Cảnh lộ diện:**
  - Đốm sáng chạy từ F ngang mặt đất sang trái, rồi 2 vòng elip tâm (300, 1110), x 175–425, y 1085–1135.
  - Mun đuổi trên đất, đáy Mun luôn thấp hơn đốm sáng 40px, thấp nhất y 1175.
  - Đè ở (300, 1135).
  - Tia từ đĩa trong giỏ bám đốm sáng, nên đi chéo qua thùng xe ba gác.

## Vùng chạm (theo phần vẽ, tối thiểu 115×115)

- Sân sau: cửa sổ, bàn, gương, túi rác, thùng giấy, nắp thiếc, áo phơi, chuông gió, xương rồng, dép.
- Hẻm:
  - Bạt (vuốt lên), dây kéo (vuốt xuống; vùng rộng 140 quanh dây, từ y 412 tới vòng).
  - Quạ, vũng nước, thạch sùng, ống bơ, xe đạp, ống nước, CD treo.
  - Xe ba gác (cả xe), gầm (vùng riêng x 485–795, y 1065–1180, ưu tiên hơn xe).
  - Chân Mun (lúc thò ra).
- Mũi tên phòng: tâm (960, 760) và (64, 760), rộng 110.

## Yêu cầu animation (Dev cần tách phần)

| Đồ | Tách thành | Điểm xoay / neo | Chuyển động code làm |
|---|---|---|---|
| Bạt + dây kéo | `l5_awning_down`, `l5_awning_rolled` (2 trạng thái), `l5_awning_cord` riêng | Bạt: neo đỉnh giữa, 2 ảnh cùng mép trên và cùng bề ngang. Dây: neo đỉnh, nối đúng mép dưới bạt ở x 820. | Dây đung đưa liên tục. Kéo thì dây giật xuống rồi kéo lên mất. Bạt co lại rồi đổi ảnh. |
| Áo phơi | `l5_shirt`, `l5_clothespin` riêng; dây và cột vẽ vào nền | Áo: đỉnh giữa (điểm treo trên dây). Kẹp: đỉnh. | Áo xoay ±14° và phồng ngang; kẹp bay ra rồi về. |
| Chuông gió | 1 ảnh | Đỉnh (móc treo) | Đung đưa tắt dần. |
| Xương rồng | Chậu + cây 1 ảnh, hoa riêng | Chậu: đáy. Hoa: đáy, đặt ở ngọn. | Chậu lắc. Hoa phóng to từ 0 rồi thu lại. |
| Xe đạp | Khung (có giỏ, yên, chuông, bánh sau), **bánh trước riêng** | Bánh: tâm (818, 873), phải khớp trục trên khung. | Bánh quay 3 vòng; khung rung nhẹ. |
| Ống bơ | 1 ảnh | Đáy | Nghiêng −55° rồi dựng lại. |
| Thạch sùng | 1 ảnh, đầu hướng lên | Tâm | Trượt lên hoặc xuống; xoay 180° khi bò xuống. |
| Quạ | `idle`, `far` | Đáy (chân trên dây) | Bay theo đường cong giữa 2 chỗ. |
| Túi rác, dép | 2 trạng thái mỗi thứ | Đáy, cùng đường đáy | Nhún rồi đổi ảnh / lật. |
| Thùng giấy, gương, nắp thiếc, CD treo | 1 ảnh mỗi thứ | Đáy (CD treo: đỉnh) | Rung; bay vào túi (icon cắt sát phần vẽ). |
| Đồ đã đặt (3 key) | 1 ảnh mỗi thứ, **dựng nghiêng vẽ sẵn** | Đáy giữa | Rơi vào chỗ rồi nhún. |
| Cửa sổ quán + Sữa | Cửa sổ và `sua_press_window` riêng | Sữa: đáy | Sữa nảy, ngóc đầu. Nên vẽ Sữa lọt trong khung kính (x 100–400, y 390–700), hoặc tách khung cửa sổ ra lớp trước Sữa. |
| Xe ba gác | 1 ảnh, gầm tối để trống | Đáy | Rung nhẹ. Mắt, mặt, chân Mun là sprite riêng nằm trong gầm. |
| Vũng nước, ống nước | 1 ảnh | Tâm / đáy | Gợn và giọt do code; ống rung. |
| Đốm sáng, dải nắng | 1 ảnh mỗi thứ, phẳng | Tâm / đáy | Quầng, tia, chấm nắng li ti, lớp tối hẻm: code vẽ, Art không cần vẽ. |

## Tư thế cần vẽ

**Mun** (mèo đen tuyền, mắt vàng to, tai hơi to, đuôi dài; cần `mun_ref` trước, G5-3):

| key | Cỡ khối | Mô tả |
|---|---|---|
| `mun_eyes_dark` | 130×56 | Chỉ đôi mắt vàng trong bóng tối (nền trong suốt). |
| `mun_paw_reach` | 150×54 | Một chân trước đen thò ngang sang phải, neo ở gốc chân (trái-giữa). |
| `mun_peek_out` | 150×110 | Ló đầu và hai tai ở mép gầm, mắt nhìn lên phải về giỏ xe. |
| `mun_run` | 220×130 | Chạy hướng phải (code lật khi chạy trái). Bóng đen ở sân sau cũng dùng ảnh này. |
| `mun_pounce` | 220×160 | Phóng vồ, chân trước duỗi. |
| `mun_pin_light` | 200×160 | Hai chân trước đè xuống đất, nhìn thẳng. |
| `mun_look_paw` | 190×210 | Ngồi, nhấc một chân trước lên nhìn mu chân (đốm sáng ở mu chân, chừa chỗ sáng ở ≈ phải-giữa). |
| `mun_held` | 260×320 | Cảnh bế chung, nách ở 42% chiều cao như `sua_held`. |
| `mun_face_icon` | 300×300 | Mặt Mun cho bong bóng nhiệm vụ và màn thưởng. Thêm `ui_star_frame` theo đặc tả. |

**Nhân vật và Sữa:**

| key | Mô tả |
|---|---|
| `player_cover_nose` | Bịt mũi, trồi lên từ mép dưới khi chạm túi rác. |
| `sua_press_window` | Sữa áp mặt vào kính cửa sổ quán. |
| (tuỳ chọn) | Tư thế "kẹp lại kẹp áo": hiện tạm dùng `player_surprised`. Nếu muốn đúng ý đặc tả thì cần một tư thế mới, ví dụ `player_clip_shirt`. |

**Ảnh code tạm, Art có thể vẽ thay:** `l5_icon_sun_covered`, bong bóng nhân vật hình mặt trời bị mây che, 120×100.
