# Đặc tả art Level 7 — "Về nhà thôi, Mun!"

Trạng thái: **demo đã duyệt** (`art/out/demo/l7_demo_s1..s3.png`, vùng chơi `l7_demo_s<N>_play.png`), đang tách asset (QUY-TRINH bước 5). Chủ dự án: "tách sao cho giống demo"; con chó vẽ theo chó Lu L6.

Phong cách, nhân vật, quy tắc vẽ: `art/style.md` (mục 1, 2b, 3). Gameplay và trạng thái: `levels/levels-01-10.md` (Level 7, G7-15 … G7-22), `levels/states-01-10.md`.

## 1. Danh sách key (đúng tên trong `game/src/level7.js`, `assets.js`; Dev 1 xác nhận)

Cỡ hiển thị theo khối trong `level7.js` (khung vùng chơi 1024x1536). File xuất = hiển thị × 1,5 (`tools/sheet_cut.py`).

| Key | Hiển thị | Neo | Cảnh | Ghi chú |
|---|---|---|---|---|
| `l7_bg_alley` | 1366x2304 | — | 1 | **mới** (thay `l5_bg_alley` ở L7): hẻm L5 bản đêm theo demo; chân tường y ≈ 860 (toạ độ vùng chơi) |
| `l7_bg_shop_street` | 1366x2304 | — | 2 | nền trước quán nước |
| `l7_bg_house_front` | 1366x2304 | — | 3 | nền trước nhà, một lớp xà mái |
| `l7_step_ladder_open` | 170x213 | đáy | 1 | thang chữ A 2 bậc, dáng bung (G7-19) |
| `l7_plank` | 300x56 | tâm | 1 | tấm ván |
| `l7_flood_strip` | 160x700 | tâm | 1 | dải nước ngập chạy dọc |
| `l7_branch` | 300x420 | đáy | 1 | một cành gãy to lá rậm (code dùng cho cả 3 cành, xoay mỗi cành) |
| `l7_tree_shop` | 260x760 | đáy | 2 | cây to đầu sân |
| `l7_shop_table` | 200x140 | đáy | 2 | bàn nhựa tròn có lỗ cắm ô |
| `l7_umbrella_closed` | 300x70 | tâm | 2 | ô gập nằm |
| `l7_umbrella_open` | 460x400 | đáy | 2 | ô bung cắm bàn (không có trong demo: chỉnh từ ô gập) |
| `l7_stray_dog_scared` | 300x340 | đáy | 2 | chó lạ nằm co ro (vẽ theo chó Lu L6) |
| `l7_stray_dog_inbox` | 110x70 | tâm | 2 | mũi + mõm chó thò khỏi miệng thùng |
| `l7_box_carton_open` | 380x340 | đáy | 2 | thùng các-tông ngửa mở nắp |
| `l7_box_carton_side` | 380x360 | đáy | 2 | thùng lật nằm ngang, miệng ra phía chó |
| `l7_window_inside` | 400x432 | đáy | 3 | phòng trong qua cửa sổ (ti vi, sofa; không người) |
| `l7_window_closed` | 400x432 | đáy | 3 | khung + kính đóng |
| `l7_window_open` | 400x432 | đáy | 3 | khung, 2 cánh mở vào trong |
| `l7_window_hook` | 30x44 | đỉnh | 3 | móc nhỏ (code dùng cả làm đinh treo chuông cạnh cửa chính) |
| `l7_front_door` | 345x573 | đáy | 3 | cửa chính |
| `player_back_tv` | 144x184 | đáy | 3 | nhân vật ngồi quay lưng xem ti vi (bắt buộc) |
| `l7_puddle` | 170x48 | tâm | cả 3 | vũng nước |
| `l7_branch_debris` | 150x54 | tâm | cả 3 | cành gãy trang trí |
| `l7_leaf` | 30x18 | tâm | cả 3 | lá bay (code) |
| `l7_twig` | 60x14 | tâm | cả 3 | cành nhỏ rơi (code) |

**Dùng lại, không vẽ:** `l5_awning_down` (rộng 540 ở cả 3 dáng), `l5_cart`, `l5_bike` + `l5_bike_wheel`, `l6_crate`, `l6_toolbox`, `l5_wind_chime`, `mun_eyes_dark`, `mun_peek_out`, các dáng Mun cũ.

**Dáng Mun / nhân vật chưa có ảnh** (Dev 1, mức cần): bắt buộc `player_back_tv`; rất nên có `mun_sit_wet`, `mun_paw_rain`, `mun_paw_glass`, `mun_paw_chime`, `player_arms_open`, `player_turn_surprised`, `mun_held_towel`; ưu tiên thấp `mun_run_b`, `mun_slip`, `mun_sneak`, `mun_shy_sill`, `player_face_icon`. Chủ dự án đồng ý vẽ 7 dáng nhóm "rất nên có" (lượt `art/review/l7_pose_*_brief.md`): tờ `l7_mun_wet_sheet` (4 dáng Mun ướt, quay phải như `mun_sit_look`, cùng tỉ lệ), `mun_held_towel` (dáng, cỡ, neo như `mun_held`, thêm khăn hồng), tờ `player_l7_sheet` (2 dáng nhân vật). Nhóm ưu tiên thấp chưa vẽ.

## 2. Nền

Chuẩn như L6: 1366x2304, vùng chơi 1024x1536 ở (171, 384). Làm 2 bước: (1) Codex xoá đồ rời và mưa trên demo cỡ thật → nền sạch 1024x1536 khớp demo (`art/ref/l7_demo/bg_s<N>_clean.png`); (2) Codex vẽ dư bốn phía từ nền sạch thu nhỏ (`l7src_<key>_ext.png`). Art căn ảnh vẽ dư theo mốc (mép tường, chân tường, cửa cuốn, ô văng), dán nền sạch vào giữa (viền ghép mềm 60 px; cảnh 1 trời lấy từ ảnh vẽ dư cho liền dây điện), phần thiếu ngoài khung 9:16 lấp bằng dải trời / nền trơn. Lời giao việc: `art/review/l7_tach_bg<N>_brief.md`. Ba phòng cách nhau 1024 nên mép trái/phải nền chờm sang phòng bên 171 px: mép nền chỉ là tường / nền trơn, không chi tiết nổi bật.

## 3. Tách đồ

Mỗi món một ảnh `art/out/_sheets/l7src_<key>.png` (Codex, brief `art/review/l7_tach_<lượt>_brief.md`, ≤ 7 món/lượt, một demo/lượt; ảnh cắt món `art/ref/l7_cut/<key>.png`). Ô = cả ảnh. **Hiển thị = cỡ đo trên demo** (vùng chơi 1024x1536), thiếu thì theo khối trong `level7.js`.

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l7src_l7_step_ladder_open | 0,0,1024,1536 | l7_step_ladder_open | level7 |  | 518,1378 | cao 215 | 5 |
| l7src_l7_plank | 0,0,1536,1024 | l7_plank | level7 |  | tâm | rộng 300 | 5 |
| l7src_l7_flood_strip | 0,0,1024,1536 | l7_flood_strip | level7 |  | tâm | cao 700 | 5 |
| l7src_l7_branch | 0,0,1024,1536 | l7_branch | level7 |  | 516,1438 | cao 420 | 5 |
| l7src_l7_puddle | 0,0,1536,1024 | l7_puddle | level7 |  | tâm | rộng 170 | 5 |
| l7src_l7_branch_debris | 0,0,1536,1024 | l7_branch_debris | level7 |  | tâm | rộng 150 | 5 |
| l7src_l7_leaf | 0,0,1536,1024 | l7_leaf | level7 |  | tâm | rộng 30 | 5 |
| l7src_l7_twig | 0,0,1536,1024 | l7_twig | level7 |  | tâm | rộng 60 | 5 |
| l7src_l7_tree_shop | 0,0,1024,1536 | l7_tree_shop | level7 |  | 493,1477 | cao 760 | 5 |
| l7src_l7_shop_table | 0,0,1536,1024 | l7_shop_table | level7 |  | 764,899 | rộng 225 | 5 |
| l7src_l7_umbrella_closed | 0,0,2172,724 | l7_umbrella_closed | level7 |  | tâm | rộng 420 | 5 |
| l7src_l7_umbrella_open | 0,0,1254,1254 | l7_umbrella_open | level7 |  | đáy | rộng 460 | 5 |
| l7src_l7_box_carton_open | 0,0,1254,1254 | l7_box_carton_open | level7 |  | 628,1178 | rộng 380 | 5 |
| l7src_l7_box_carton_side | 0,0,1254,1254 | l7_box_carton_side | level7 |  | 627,1008 | rộng 380 | 5 |
| l7src_l7_stray_dog_scared | 0,0,1536,1024 | l7_stray_dog_scared | level7 |  | 773,878 | rộng 315 | 5 |
| l7src_l7_stray_dog_inbox | 0,0,1536,1024 | l7_stray_dog_inbox | level7 |  | đáy | rộng 200 | 5 |
| l7src_l7_window_sheet | 0,0,512,1024 | l7_window_inside | level7 | l7_window | đáy | rộng 460 | 5 |
| l7src_l7_window_sheet | 512,0,512,1024 | l7_window_closed | level7 | l7_window | đáy |  | 5 |
| l7src_l7_window_sheet | 1024,0,512,1024 | l7_window_open | level7 | l7_window | đáy |  | 5 |
| l7src_l7_window_hook | 0,0,1254,1254 | l7_window_hook | level7 |  | đỉnh | cao 44 | 5 |
| l7src_l7_front_door | 0,0,1024,1536 | l7_front_door | level7 |  | 513,1426 | rộng 325 | 5 |
| l7src_player_back_tv | 0,0,1254,1254 | player_back_tv | player |  | 624,1146 | rộng 150 | 4 |
| l7_mun_wet_sheet | 0,0,476,782 | mun_sit_wet | cats | mun_l7_wet | đáy | cao 205 | 2.5 |
| l7_mun_wet_sheet | 476,0,504,782 | mun_paw_rain | cats | mun_l7_wet | đáy |  | 2.5 |
| l7_mun_wet_sheet | 980,0,527,782 | mun_paw_glass | cats | mun_l7_wet | đáy |  | 2.5 |
| l7_mun_wet_sheet | 1507,0,505,782 | mun_paw_chime | cats | mun_l7_wet | đáy |  | 2.5 |
| l7src_mun_held_towel | 0,0,1024,1536 | mun_held_towel | cats |  | đỉnh | cao 630 | 2.5 |
| player_l7_sheet | 0,0,768,1024 | player_turn_surprised | player | player_l7 | đáy | cao 657 | 4 |
| player_l7_sheet | 768,0,768,1024 | player_arms_open | player | player_l7 | đáy |  | 4 |
| l7_mun_run_b_sheet | 768,0,768,1024 | mun_run_b | cats |  | 1246,690 | rộng 320 | 5 |

**G7-23 (vẽ lại, brief `art/review/l7_g723_<món>_brief.md`, bản cũ `art/ref/backup/l7_g723/`):** cây tự nhiên nhiều chùm lá (neo gốc theo thân mới), bàn có lỗ cắm ô to, chó theo Lu L6 (nằm co ro, mắt sợ, giọt nước; trong thùng mắt cười), `mun_run_b` khung chạy 2 (ô phải tờ `l7_mun_run_b_sheet`, ô trái là `mun_run` gốc, cùng tỉ lệ rộng 320 như `mun_run` L5, neo chân trùng vị trí neo `mun_run`).

**G7-25:** vẽ lại hai ảnh chó bám sát Lu L6 (nét gọn, đầu to thân nhỏ, lông mượt, không vòng cổ), brief `art/review/l7_g725_dog_brief.md`, bản trước sao lưu `art/ref/backup/l7_g725/`.

**G7-27** (brief `art/review/l7_g727_brief.md`, bản trước `art/ref/backup/l7_g727/`): ô bung vẽ lại cán dài liền (khấc, mũi nhọn, dài thêm ≈ 60 px hiển thị, tán giữ nguyên); chó trong thùng vẽ Lu nằm trong lòng thùng, đầu + hai chân trước gác mép thùng (dáng như `l6_dog_chew`, không xương), neo đáy = mép thùng, rộng 125 ≈ 60% lòng thùng.

**G7-29** (bản trước `art/ref/backup/l7_g729/`): chó trong thùng vẽ lại cả người Lu nằm sấp trong lòng thùng, mặt cười, lông khô (sửa từ `l7_stray_dog_scared`, brief `art/review/l7_g729_dog_brief.md`), rộng 200 ≈ 83% lòng thùng. Lớp phòng trong `l7_window_inside` cắt theo lòng khung cửa sổ (`tools/l7_window_mask.py`), không vẽ lại, cùng khung và neo.

Lượt: `l7_tach_2` (cảnh 1 + trang trí), `l7_tach_3` (cảnh 2), `l7_tach_4` (chó, theo chó Lu L6, bỏ vòng cổ), `l7_tach_5` (cảnh 3: tờ cửa sổ 3 ô, móc, cửa chính, nhân vật quay lưng).

### Vị trí trong demo (vùng chơi 1024x1536, cho Dev đặt)

| Key | Vị trí demo |
|---|---|
| l7_step_ladder_open | x 870–1015, y 670–895 (mép phải bị cắt) |
| l7_plank | dựa tường x 195–325, y 495–880 (nghiêng) |
| l7_flood_strip | x 345–535, y 855–1536 |
| l7_branch ×3 | đống cành x 0–225, y 740–1285 |
| l7_puddle | quanh (960, 1200), (690, 1420), (110, 1415) |
| l7_branch_debris | quanh (270, 1310), (910, 1430) |
| l7_tree_shop | x 750–1024, y 335–1100 (gốc y ≈ 1100) |
| l7_shop_table | x 520–755, y 905–1075 |
| l7_umbrella_closed | x 515–935, y 1140–1230 |
| l7_box_carton_open | x 200–580, y 570–885 |
| l7_stray_dog_scared | x 190–505, y 830–1065 |
| l5_bike (dựng nghiêng) | x 20–230, y 790–1150 |
| l7_window_* (khung ngoài, không ô văng) | x 70–530, y 284–776 (đáy = mép dưới bậu) |
| l7_window_hook | giữa khung trên (304, 300) |
| l7_front_door | x 656–980, y 420–1005 |
| player_back_tv | x 310–500, y 510–690 |
| l5_wind_chime (lúc đầu) | móc (630, 440) |
| l6_crate | đáy (120, 1240), rộng ≈ 192 |
| l6_toolbox | đáy (740, 1220), rộng ≈ 180 |
