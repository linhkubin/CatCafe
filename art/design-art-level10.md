# Đặc tả art Level 10 — "Đại chiến quái thú"

Trạng thái: **bước 3–4** (Art + Dev bàn art, vẽ demo). Chủ dự án đã duyệt gameplay bản khối tới G10-17 và dặn **màu và kích thước đúng mô tả thật kỹ**. Tờ tách asset viết sau khi chủ dự án duyệt demo (QUY-TRINH bước 5).

Phong cách, nhân vật, quy tắc vẽ: `art/style.md` (mục 1, 2b, 3). Gameplay: `levels/levels-01-10.md` mục Level 10 (bản 5, G10-5 … G10-17). Vị trí, cỡ, lớp, trạng thái: `art/review/level10-thread.md` mục "Yêu cầu art từ Dev (L10)" (Dev 1, 2026-11-03). Ảnh khối vị trí cho Codex: `art/ref/l10_demo/khoi_main.png`, `khoi_end.png` (dựng từ bảng Dev bằng `tools/l10_block_guide.py`).

## 1. Ý tưởng hình

- **Góc máy sát sàn**: đồ đạc to như một thành phố; hai mèo khổng lồ mặc đồ hóa trang đánh nhau giữa phòng khách. Trò nhại phim quái vật chung chung, **không theo phim nào**, không logo, không chữ.
- Vẫn đúng phong cách chì màu pastel nhạt của game (mẫu `art/ref/owner_l1_style_ref.png`). **Đồ chơi nhiều màu nhưng nhạt như mẫu L1**; lửa **xanh pastel**, không chói.
- Đồ phụ vẽ **đúng là đồ trong phòng / đồ chơi**; "thành phố" chỉ gợi bằng cách đặt và tỉ lệ (không vẽ cửa sổ nhà thật, bảng hiệu).

## 2. Hai bộ hóa trang

- **Mun — bộ khỉ đột** (đứng **trái**, quay **phải** về phía Sữa): bộ đồ vải lông xù **nâu sẫm ấm** (nâu cacao nhạt hơn lông Mun một chút để tách khỏi Mun), mũ trùm có hai tai tròn nhỏ của khỉ đột, **mặt Mun lộ trọn trong lỗ mũ** (mắt vàng tròn, mũi hồng, má hồng, hai tai mèo đen nhọn thò lên qua hai lỗ trên mũ). Ngực bộ đồ một mảng nỉ xám nâu nhạt; bàn tay, bàn chân bộ đồ là găng/ủng vải tròn. Thấy đường may, khóa kéo lưng mờ: **rõ là đồ vải**. Dáng to bè, tay dài.
- **Sữa — bộ thằn lằn gai lưng** (đứng **phải**, quay **trái** về phía Mun): bộ đồ vải **xanh bạc hà nhạt**, bụng kem nhạt, **hàng gai nỉ tam giác mềm** dọc sống lưng và đuôi (màu xanh lá nhạt hơn), **đuôi dài bằng vải nhồi bông**, mũ trùm có mõm thằn lằn tròn ở trên trán, **mặt Sữa lộ trọn trong lỗ mũ** (mèo trắng, mắt theo `sua_ref`), tai mèo thò qua lỗ mũ. Bàn tay, chân là găng/ủng vải có 3 móng nỉ tròn. Rõ là đồ vải.
- Cả hai **không giống nhân vật phim nào**, không logo, không chữ, không vảy thật, không răng nhọn đáng sợ. Dễ thương, buồn cười.
- **Cỡ** (vùng chơi): Mun bộ khỉ đột 300 x 470, neo chân giữa đáy (220, 1010); Sữa bộ thằn lằn 290 x 450, neo chân (740, 1020). Điểm hiệu ứng: miệng Sữa khè ngang ≈ (635, 650), khè ngửa ≈ (690, 610); tay Mun đỡ / đấm ≈ (345, 655).
- **Mèo thật cuối màn**: `mun_ref`, `sua_ref`, rộng 190, Mun neo chân (305, 1010) quay phải, Sữa (655, 1020) quay trái, hộp súp mở ở giữa (482, 1020).

## 3. Danh sách key (đúng tên trong `game/src/level10.js`, `assets.js`; bảng Dev 1)

Cỡ hiển thị theo bảng Dev (vùng chơi 1024x1536). File xuất = hiển thị × 1,5.

| Key | Món | Neo tại | Hiển thị | Neo | Mô tả vẽ |
|---|---|---|---|---|---|
| `l10_bg_living_kitchen` | Nền | — | 1366x2304 | — | Phòng khách nhìn sát sàn, **trống**: tường kem ấm có chân tường gỗ, **chân tường y 880**, sàn gỗ mật ong nhạt ván ngang bên dưới. **Không vẽ kệ, sofa, đồ** vào nền. Dư hai bên cho 3:4 |
| `l10_shelf_left` | Kệ treo trái | 170, 310 | 240 x 30 | đáy | Tấm kệ gỗ mật ong nhạt, hai pát đỡ nhỏ; mặt trên y 280 |
| `l10_scissors` | Cây kéo | 170, 280 | 110 x 60 | đáy | Kéo học sinh tay cầm nhựa hồng phấn, lưỡi bạc xám nhạt, nằm nghiêng trên kệ |
| `l10_shelf_mid` | Kệ treo giữa | 470, 390 | 200 x 30 | đáy | Như kệ trái, ngắn hơn; mặt trên y 360 |
| `l10_book_stack` | Chồng sách cao (tòa nhà chọc trời) | 470, 360 | 100 x 150 | đáy | 6–7 cuốn gáy màu pastel khác nhau (hồng, xanh trời, vàng bơ, bạc hà, oải hương), xếp hơi lệch, không chữ trên gáy |
| `l10_shelf_right` | Kệ treo phải (cao nhất) | 770, 230 | 240 x 30 | đáy | Như kệ trái; mặt trên y 200 |
| `l10_soup_box` | Hộp súp thưởng buộc ruy băng | 770, 200 | 130 x 90 | đáy | Hộp giấy vuông kem, **hình cá** đơn giản trên mặt (không chữ), ruy băng hồng phấn buộc chữ thập, nơ trên nắp |
| `l10_soup_box_open` | Hộp súp mở | (sàn 482, 1020) | 130 x ≥ 90 | đáy | Cùng thân hộp; nắp bật ngửa, ruy băng đứt vắt hai bên, thấy súp kem bên trong |
| `l10_sofa` | Sofa to | 490, 860 | 880 x 400 | đáy | Sofa vải oải hương nhạt, lưng cao đỉnh y 460, tay vịn tròn hai bên, chân gỗ ngắn; giữa bị mèo, bàn che |
| `l10_pillow` | Gối tựa (2 cái) | trái 165, 610; phải 815, 610 | 220 x 150 | đáy | Gối vuông mềm vàng bơ nhạt, chần chỉ giữa; (tuỳ chọn `l10_pillow_back` mặt sau) |
| `l10_plant` | Chậu cây lá to (rừng rậm) | 975, 880 | 170 x 400 | đáy | Chậu sứ kem, cây lá to bản xanh lá nhạt (kiểu trầu bà), lòi ra mép phải |
| `l10_table_arena` | Bàn trà (đấu trường) | 490, 1060 | 510 x 230 | đáy | Bàn gỗ mật ong nhạt chữ nhật thấp, mặt bàn y ≈ 830 thấy rõ, chân ngắn |
| `l10_cake_box` / `_lit` | Hộp bánh xếp tầng (chung cư) | 300, 920 | 120 x 120 | đáy | Hộp bánh 2–3 tầng giấy hồng phấn, **3–4 lỗ tròn như cửa sổ** (tối / sáng vàng bơ nhạt ở `_lit`) |
| `l10_vase` | Lọ hoa (công viên) | 490, 900 | 70 x 130 | đáy | Lọ sứ xanh trời nhạt, 3–4 bông hoa tròn hồng, vàng nhạt |
| `l10_remote` / `_open` | Điều khiển TV nằm phẳng | 660, 920 | 154 x 48 | đáy | Điều khiển xám nhạt, nút tròn pastel không chữ số; `_open`: nắp pin bật, khay trống |
| `l10_rug_loop` | Thảm (quảng trường) có ray | tâm 500, 1212 | 598 x 275 | tâm | Thảm tròn dẹt kem nhạt viền đào; **đường ray gỗ elip tâm (500,1167), bán trục 230 x 74** vẽ đúng elip |
| `l10_train` | Tàu hỏa nhỏ | trên ray | 98 x 50 | tâm | Đầu tàu gỗ xanh trời nhạt, ống khói đỏ đào nhạt, quay phải |
| `l10_toy_car` | Ô tô | tâm 500, 1167 | 158 x 78 | tâm | Ô tô nhựa đào nhạt, bánh tròn to |
| `l10_toy_tank` | Xe tăng | tâm 370, 1301 | 168 x 88 | tâm | Xe tăng đồ chơi xanh lá nhạt, nòng ngắn tròn, xích tròn |
| `l10_toy_firetruck` | Xe cứu hỏa | tâm 630, 1303 | 183 x 84 | tâm | Xe cứu hỏa đồ chơi đỏ đào nhạt (không đỏ gắt), thang vàng bơ |
| `l10_blocks_a` | Tòa khối thấp | 160, 1170 | 60 x 90 | đáy | 3 khối gỗ pastel xếp chồng |
| `l10_blocks_b` | Tòa khối cao | 800, 1175 | 60 x 110 | đáy | 4 khối pastel, khối trên tam giác |
| `l10_lamp_post` / `_on` | Cột đèn đồ chơi | 215, 1235 | 30 x 110 | đáy | Cột đèn nhựa xám nhạt, bóng tròn ở đỉnh (tắt kem / bật vàng bơ) |
| `l10_ball` | Quả bóng nhựa | tâm 95, 1300 | 78 x 78 | tâm | Bóng nhựa sọc 3 màu pastel (hồng, vàng, xanh trời) |
| `l10_plane` / `_fly` | Máy bay đồ chơi chạy pin | tâm 900, 1300 | 210 x 98 | tâm | Máy bay cánh quạt nhựa trắng kem sọc xanh trời, mũi sang phải, **càng móc nhỏ dưới bụng**; `_fly` cánh quạt quay mờ |
| `l10_battery` | 2 viên pin | — | 90 x 60 | tâm | Hai pin tròn vàng bơ đầu xám, không chữ |
| `l10_fire` | Luồng lửa của Sữa | gốc tại miệng | 300 x 60 (code kéo dài) | giữa mép trái | Dải lửa ngang **xanh pastel** (xanh trời nhạt tới bạc hà), gốc đậm hơn chút, đuôi loe nhạt dần, đầu tròn mềm; không đỏ, không khói đen |
| `l10_fish_smoke` | Khói thơm hình cá | — | ~100 x 50 | tâm | Làn khói kem trắng mờ hình cá |
| `mun_gorilla_*` | Mun bộ khỉ đột, 9 dáng | 220, 1010 | 300 x 470 | đáy | `idle`, `block`, `punch`, `chest`, `reach`, `look`, `sniff`, `lick`, `roar` (mục 2) |
| `sua_lizard_*` | Sữa bộ thằn lằn, 8 dáng | 740, 1020 | 290 x 450 | đáy | `idle`, `fire`, `fire_up`, `look`, `dodge`, `roar`, `sniff`, `lick` (mục 2) |
| `mun_l10_eat`, `sua_l10_eat` | Mèo thật cúi ăn | 305, 1010 / 655, 1020 | rộng 190 | đáy | Mun quay phải, Sữa quay trái, cúi vào hộp |
| `mun_l10_groom`, `sua_l10_groom` | Mèo thật liếm lông nhau | như trên | rộng 190 | đáy | Hai ảnh riêng cùng cỡ |

**Dùng lại, không vẽ:** `mun_face_icon`, `sua_face_icon`, `prop_butterfly` (L1).

## 4. Demo (bước 4)

Khung 1080x1920 (9:16), vùng chơi 1024x1536 ở giữa, dư 142px trên dưới; thanh tim + nút tạm dừng ở trên, túi đồ + 💡 ở dưới (lớp giao diện ghép sau). Codex vẽ vùng chơi 1024x1536 đúng ảnh khối, Art ghép dải tường/sàn trên dưới và giao diện.

| Ảnh | Nội dung | Ảnh khối |
|---|---|---|
| `art/out/demo/l10_demo_fight_*.png` | Cảnh chính: Sữa (bộ thằn lằn) khè lửa xanh nhạt, Mun (bộ khỉ đột) giơ hai tay chéo đỡ; đủ mọi đồ đúng chỗ | `art/ref/l10_demo/khoi_main.png` |
| `art/out/demo/l10_demo_end_*.png` | Cảnh kết: hai mèo thật cạnh hộp súp mở trên sàn, liếm lông cho nhau; bàn trà và đồ trên bàn đã biến mất | `art/ref/l10_demo/khoi_end.png` |

Kiểm sau khi vẽ: màu O6 (trung bình ≤ 0,25, p90 ≤ 0,46, `tools/color_check.py`); cỡ, vị trí từng món so bảng mục 3 (lệch > ~10% thì vẽ lại).

## 5. Tách asset (A10-2: tách trước khi duyệt demo)

Mỗi món một ảnh `art/out/_sheets/l10src_<key>.png` (Codex, brief `art/review/l10_tach_<lượt>_brief.md`, ≤ 7 món/lượt, kèm demo gốc; ảnh cắt món `art/ref/l10_cut/<key>.png`). Ô = cả ảnh. Hiển thị = bề rộng bảng Dev; chiều cao co về đúng bảng Dev bằng `tools/l10_fit.py` (co không đều, ghi lại tỉ lệ). `l10_shelf_right` dùng chung ảnh kệ trái. Thảm: nắn ray đúng elip bằng `tools/l10_rug_fix.py` (`l10src_l10_rug_loop_fix.png`).

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l10src_l10_sofa | 0,0,1860,845 | l10_sofa | level10 |  | đáy | rộng 880 | 5 |
| l10src_l10_shelf_left | 0,0,2172,724 | l10_shelf_left | level10 |  | đáy | rộng 240 | 5 |
| l10src_l10_shelf_mid | 0,0,1536,1024 | l10_shelf_mid | level10 |  | đáy | rộng 200 | 5 |
| l10src_l10_shelf_right | 0,0,2172,724 | l10_shelf_right | level10 |  | đáy | rộng 240 | 5 |
| l10src_l10_scissors | 0,0,1695,928 | l10_scissors | level10 |  | đáy | rộng 110 | 5 |
| l10src_l10_book_stack | 0,0,1024,1536 | l10_book_stack | level10 |  | đáy | rộng 100 | 5 |
| l10src_l10_soup_box | 0,0,1254,1254 | l10_soup_box | level10 | soup | đáy | rộng 130 | 5 |
| l10src_l10_soup_box_open | 0,0,1254,1254 | l10_soup_box_open | level10 | soup | đáy | rộng 140 | 5 |
| l10src_l10_vase | 0,0,1024,1536 | l10_vase | level10 |  | đáy | rộng 70 | 5 |
| l10src_l10_cake_box | 0,0,1254,1254 | l10_cake_box | level10 | cake | đáy | rộng 120 | 5 |
| l10src_l10_cake_box_lit | 0,0,1254,1254 | l10_cake_box_lit | level10 | cake | đáy | rộng 120 | 5 |
| l10src_l10_remote | 0,0,2172,724 | l10_remote | level10 | remote | đáy | rộng 154 | 5 |
| l10src_l10_remote_open | 0,0,2172,724 | l10_remote_open | level10 | remote | đáy | rộng 156 | 5 |
| l10src_l10_table_arena | 0,0,1536,1024 | l10_table_arena | level10 |  | đáy | rộng 510 | 5 |
| l10src_l10_pillow | 0,0,1536,1024 | l10_pillow | level10 |  | đáy | rộng 220 | 5 |
| l10src_l10_plant | 0,0,1024,1536 | l10_plant | level10 |  | đáy | rộng 170 | 5 |
| l10src_l10_rug_loop_fix | 0,0,921,436 | l10_rug_loop | level10 |  | tâm | rộng 598 | 5 |
| l10src_l10_train | 0,0,1774,887 | l10_train | level10 |  | tâm | rộng 98 | 5 |
| l10src_l10_toy_car | 0,0,1784,882 | l10_toy_car | level10 |  | tâm | rộng 158 | 5 |
| l10src_l10_toy_tank | 0,0,1731,908 | l10_toy_tank | level10 |  | tâm | rộng 168 | 5 |
| l10src_l10_toy_firetruck | 0,0,1851,849 | l10_toy_firetruck | level10 |  | tâm | rộng 183 | 5 |
| l10src_l10_blocks_a | 0,0,1024,1536 | l10_blocks_a | level10 |  | đáy | rộng 60 | 5 |
| l10src_l10_blocks_b | 0,0,926,1698 | l10_blocks_b | level10 |  | đáy | rộng 60 | 5 |
| l10src_l10_lamp_post | 0,0,1024,1536 | l10_lamp_post | level10 |  | đáy | rộng 30 | 5 |
| l10src_l10_lamp_post_on | 0,0,1024,1536 | l10_lamp_post_on | level10 |  | đáy | rộng 33 | 5 |
| l10src_l10_ball | 0,0,1254,1254 | l10_ball | level10 |  | tâm | rộng 78 | 5 |
| l10src_l10_plane | 0,0,1815,867 | l10_plane | level10 |  | tâm | rộng 210 | 5 |
| l10src_l10_plane_fly | 0,0,1815,867 | l10_plane_fly | level10 |  | tâm | rộng 210 | 5 |
| l10src_l10_battery | 0,0,1536,1024 | l10_battery | level10 |  | tâm | rộng 90 | 5 |
| l10src_l10_fire | 0,0,2172,724 | l10_fire | level10 |  | tâm | rộng 290 | 5 |
| l10src_sua_lizard_fire | 0,0,1024,1536 | sua_lizard_fire | cats |  | đáy | cao 450 | 5 |
| l10src_mun_l10_groom | 0,0,1254,1254 | mun_l10_groom | cats |  | đáy | rộng 190 | 5 |
| l10src_sua_l10_groom | 0,0,1254,1254 | sua_l10_groom | cats |  | đáy | rộng 190 | 5 |
| l10src_l10_cats_eat | 0,0,743,1024 | mun_l10_eat | cats |  | đáy | rộng 182 | 5 |
| l10src_l10_cats_eat | 743,0,793,1024 | sua_l10_eat | cats |  | đáy | rộng 198 | 5 |
| l10src_l10_fish_smoke | 0,0,1774,887 | l10_fish_smoke | level10 |  | tâm | rộng 100 | 5 |
| l10src_mun_bear_a | 0,0,512,1024 | mun_gorilla_idle | cats |  | đáy | cao 470 | 5 |
| l10src_mun_bear_a | 512,0,488,1024 | mun_gorilla_block | cats |  | đáy | cao 467 | 5 |
| l10src_mun_bear_a | 1000,0,536,1024 | mun_gorilla_punch | cats |  | đáy | cao 468 | 5 |
| l10src_mun_bear_b | 0,0,512,1024 | mun_gorilla_chest | cats |  | đáy | cao 470 | 5 |
| l10src_mun_bear_b | 1024,0,512,1024 | mun_gorilla_reach | cats |  | đáy | cao 477 | 5 |
| l10src_mun_bear_c | 0,0,487,1024 | mun_gorilla_look | cats |  | đáy | cao 491 | 5 |
| l10src_mun_bear_c | 487,0,505,1024 | mun_gorilla_sniff | cats |  | đáy | cao 445 | 5 |
| l10src_mun_bear_c | 992,0,544,1024 | mun_gorilla_lick | cats |  | đáy | cao 399 | 5 |
| l10src_mun_bear_b | 512,0,512,1024 | mun_gorilla_roar | cats |  | đáy | cao 469 | 5 |
| l10src_sua_lizard_idle | 0,0,1024,1536 | sua_lizard_idle | cats |  | đáy | cao 453 | 5 |
| l10src_sua_lizard_fire_up | 0,0,1024,1536 | sua_lizard_fire_up | cats |  | đáy | cao 455 | 5 |
| l10src_sua_lizard_look | 0,0,1024,1536 | sua_lizard_look | cats |  | đáy | cao 467 | 5 |
| l10src_sua_lizard_dodge | 0,0,1024,1536 | sua_lizard_dodge | cats |  | đáy | cao 441 | 5 |
| l10src_sua_lizard_roar | 0,0,1024,1536 | sua_lizard_roar | cats |  | đáy | cao 453 | 5 |
| l10src_sua_lizard_sniff | 0,0,1024,1536 | sua_lizard_sniff | cats |  | đáy | cao 419 | 5 |
| l10src_sua_lizard_lick | 0,0,1024,1536 | sua_lizard_lick | cats |  | đáy | cao 366 | 5 |

| Tờ hoặc key | Demo gốc | Vị trí trong demo |
|---|---|---|
| l10src_l10_shelf_left | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_shelf_left.png` |
| l10src_l10_shelf_mid | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_shelf_mid.png` |
| l10src_l10_shelf_right | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_shelf_left.png` |
| l10src_l10_scissors | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_scissors.png` |
| l10src_l10_book_stack | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_book_stack.png` |
| l10src_l10_soup_box | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_soup_box.png` |
| l10src_l10_soup_box_open | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_soup_box_open.png` |
| l10src_l10_vase | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_vase.png` |
| l10src_l10_cake_box | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_cake_box.png` |
| l10src_l10_cake_box_lit | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_cake_box_lit.png` |
| l10src_l10_remote | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_remote.png` |
| l10src_l10_remote_open | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_remote_open.png` |
| l10src_l10_table_arena | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_table_arena.png` |
| l10src_l10_pillow | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_pillow.png` |
| l10src_l10_plant | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_plant.png` |
| l10src_l10_rug_loop_fix | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_rug_loop.png` |
| l10src_l10_train | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_train.png` |
| l10src_l10_toy_car | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_toy_car.png` |
| l10src_l10_toy_tank | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_toy_tank.png` |
| l10src_l10_toy_firetruck | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_toy_firetruck.png` |
| l10src_l10_blocks_a | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_blocks_a.png` |
| l10src_l10_blocks_b | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_blocks_b.png` |
| l10src_l10_lamp_post | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_lamp_post.png` |
| l10src_l10_lamp_post_on | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_lamp_post_on.png` |
| l10src_l10_ball | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_ball.png` |
| l10src_l10_plane | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_plane.png` |
| l10src_l10_plane_fly | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_plane_fly.png` |
| l10src_l10_battery | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_battery.png` |
| l10src_l10_fire | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_fire.png` |
| l10src_sua_lizard_fire | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/sua_lizard_fire.png` |
| l10src_mun_l10_groom | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/mun_l10_groom.png` |
| l10src_sua_l10_groom | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/sua_l10_groom.png` |
| l10src_l10_fish_smoke | art/out/demo/l10_demo_fight_916.png | xem `art/ref/l10_cut/l10_fish_smoke.png` |
