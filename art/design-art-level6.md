# Design Art – Level 6: Xuống đây nào, Mun!

> Đọc kèm `style.md`. Bút chì màu, pastel nhạt theo `art/ref/owner_l1_style_ref.png` (O6), nét mảnh đậm nhạt (O5), cute, tối giản, **không chữ**.
>
> **Phòng:** Sân sau nhà hàng xóm, buổi chiều (một phòng). **Mèo:** Mun (`cats/mun_ref.png`, mặt tròn G5-32). **Nhân vật phụ mới:** Lu, chó vàng to hiền (`dogs/lu_ref.png`, chờ duyệt). **Ý chính:** Mun bị Lu dọa, kẹt trên mái nhà kho; cho Lu xương, xếp 4 bậc (phuy + hộp dụng cụ, thùng gỗ, ghế đẩu), đặt xúc xích lên bàn dụ Mun xuống ăn.

Nguồn gameplay: `levels/levels-01-10.md`, `levels/states-01-10.md` mục Level 6; `art/review/level6-thread.md` (G6-1…G6-8). Vị trí, cỡ, lớp lấy từ bản khối đã duyệt (`game/src/level6.js`, ảnh `art/review/l6_dev_check/g15_mo_man.jpg`, `g16_mun_an_tren_ban.jpg`, `g24_gang_tren_rao.jpg`, `g25_mo_man_cac_nhip_g67.jpg`).

Áp dụng mọi quy tắc đã chốt L1–L5: góc nhìn chung (`style.md` 2b), màu O6, tách theo demo (G4-26, G5-23), **cỡ file ≈ 1,5 lần cỡ hiển thị, cắt sát** (QUY-TRINH mục 6, G5-34, G5-35), **dùng lại ảnh lớn**.

## 1. Dùng lại / vẽ mới (QUY-TRINH mục 6)

- **Dùng lại, không vẽ:** nền `l5_bg_backyard` (bản rộng 1366x2304 theo G-SCREEN), `l5_wind_chime`, các dáng Mun đã có (`mun_run`, `mun_held`, `mun_face_icon`, `mun_look_paw`…), giao diện chung.
- Nền sân L5 có sẵn cửa sổ quán, cửa sau, cột dây phơi: các món L5 không có trong L6 thì không đặt sprite (nền vốn trống).
- **Vẽ mới:** danh sách mục 2. Không vẽ nền mới.

## 2. Danh sách key (chốt với Dev D6-8; bảng vị trí đầy đủ `art/review/l6_dev_check/l6_block_layout.md`)

Hiển thị = cỡ trong khung phòng 1024x1536 theo bản khối. File = cỡ xuất ≈ 1,5 lần. TS = trong suốt. Lớp theo `states-01-10.md`.

| Key | Hiển thị | File ≈ | Neo | Lớp | Nhóm / ghi chú |
|---|---|---|---|---|---|
| `l6_tree` | 240x520 | 360x780 | đáy | 2 | cây tán tròn, thân gỗ |
| `l6_bird_nest` | 90x46 | 135x70 | tâm | 2.5 | ổ chim trên cành |
| `l6_glove_black_idle` | 80x100 | 120x150 | đỉnh (vắt đỉnh rào y ≈ 365) | 4 | nhóm glove: dáng như mèo đen ngồi |
| `l6_glove_black_fallen` | 100x44 | 150x66 | đáy | 4 | nhóm glove |
| `l6_shed` | 460x414 | 690x620 | đáy | 5 | nhà kho gỗ mái tôn, cửa; mặt mái y ≈ 601 |
| `l6_shed_chimney` | 80x160 | 120x240 | đáy | 7 | ống khói riêng (Mun lùi ra sau) |
| `l6_dog_house` | ≈ 340x300 | 510x450 | đáy | 8 | chuồng Lu, cửa vòm tối; **G6-9: nâng từ 190x170 cho vừa Lu rộng 300** (cửa rộng ≈ 220) |
| `l6_veggie_bed` | 200x100 | 300x150 | đáy | 9 | bụi rau (luống nhỏ) |
| `l6_watering_can` | 80x76 | 120x115 | đáy | 9 | bình tưới |
| `l6_table` | 230x120 | 345x180 | đáy | 10 | bàn gỗ ngoài trời, mặt bàn y ≈ 948 |
| `l6_picnic_basket_closed` | 110x80 | 165x120 | đáy | 10.5 | nhóm basket |
| `l6_picnic_basket_open` | 110x96 | 165x145 | đáy | 10.5 | nhóm basket: nắp bật |
| `l6_barrel` | 110x240 | 165x360 | đáy | 11 | phuy nước, miệng thấy nước |
| `l6_toolbox` | 120x50 | 180x75 | đáy | 11.5 | hộp dụng cụ nhỏ, đậy khít miệng phuy |
| `l6_crate` | 130x198 | 195x300 | đáy | 11 | thùng gỗ |
| `l6_stool` | 110x111 | 165x165 | đáy | 11 | ghế đẩu |
| `l6_bone` | 80x36 | 120x54 | tâm | túi | khúc xương (cũng là icon bong bóng) |
| `l6_sausage` | 80x32 | 120x48 | tâm | túi / bàn | xúc xích |
| `l6_dog_bark` | rộng ≈ 300 | 450x395 | đáy | 13 | Lu ngồi ngẩng sủa vui, đuôi vẫy (G6-9: 1,4–1,5 lần Mun ngồi) |
| `l6_dog_run_bone` | rộng ≈ 320 | 480x340 | đáy | 13 | Lu ngậm xương chạy |
| `l6_dog_chew` | rộng ≈ 225 | 340x240 | đáy (cửa chuồng) | 8.5 | chỉ đầu + chân trước thò khỏi cửa chuồng, gặm xương, mắt híp |
| `l6_dog_beg` | rộng ≈ 280 | 420x480 | đáy | 13 | Lu chồm hít đòi |
| `l6_dog_belly` | rộng ≈ 340 | 510x255 | đáy | 13 | Lu lăn khoe bụng |
| `mun_roof_crouch` | 130x80 | 195x120 | đáy | 6 | nhóm crouch: nằm rạp, tai cụp |
| `mun_roof_crouch_ears_up` | 130x80 | 195x120 | đáy | 6 | nhóm crouch: cùng khung, cùng đáy, chỉ tai dựng, đầu hơi ngóc (D6-8, G6-9) |
| `mun_roof_edge` | 130x100 | 195x150 | đáy | 6 | ló ra mép mái nhìn xuống, run |
| `mun_step_down` | 120x110 | 180x165 | đáy | 12 | rón rén bước xuống |
| `mun_jump_up` | ≈ 120x130 | 180x195 | đáy | 12 | nhún nhảy lên (mở màn và lên bàn) |
| `mun_eat` | 120x100 | 180x150 | đáy | 12 | cúi ăn xúc xích trên bàn |
| `mun_sit_look` | 110x130 | 165x195 | đáy | 12 | **vẽ mới** (D6-8, G6-9): ngồi trên bàn, liếm mép, ngẩng nhìn người chơi (dáng lộ diện) |
| `mun_climb` | ≈ 110x150 | 165x225 | đáy | 12 | **vẽ (G6-9):** Mun bám leo cột dây phơi (mở màn) |
| `l6_dog_run` | rộng ≈ 375 | 560x390 | đáy | 13 | **vẽ (G6-9):** Lu chạy đuổi (mở màn) |
| `l6_dog_house_front` | ≈ 340x300 | 510x450 | đáy | 8.7 | khung vòm cửa chuồng, cùng khung và đáy `l6_dog_house`, đặt trên đầu Lu (như cửa sổ quán L5) để thấy Lu chui trong chuồng |

Cỡ Mun theo quy tắc mắt bằng nhau (A5-13): các dáng Mun mới rộng ≈ 200–220 như bộ mặt tròn; đo lại trên demo. **G6-16 (thay G6-9, G6-12, G6-13): Lu ngồi rộng ≈ 230 = 1,1 lần Mun 210, ngồi trên mặt sân trước kho; nhà kho 530 × 475; chuồng 265 × 235.** Các dáng Lu khác co theo (≈ 0,77 lần số ở bảng); số chốt đo lại trên demo. Không vẽ `l6_dog_play_glove` (G6-9): Lu vờn găng dùng ảnh có sẵn.

**Quy ước neo (D6-8):** mọi món neo giữa đáy. Với `l6_barrel`, `l6_toolbox`, `l6_crate`, `l6_stool`, `l6_table`: **đỉnh phần vẽ chính là mặt Mun đứng / mặt đặt đồ** (miệng phuy, nắp hộp, mặt thùng, mặt ghế, mặt bàn). Phần nhô trên mặt đó (quai hộp, gờ thùng) vẽ thấp, phẳng, Art ghi độ cao phần nhô. Hộp dụng cụ rộng xấp xỉ miệng phuy. Giữ chiều cao phần vẽ: phuy 240, hộp 50, thùng gỗ 198, ghế 111 (bậc hụt đều G6-2); khác thì báo Dev dời bậc. Chuông gió dùng lại `l5_wind_chime`.

## 3. Nhân vật Lu

Theo `art/review/l6_lu_ref_brief.md`: chó con lớn mũm mĩm vàng mật ong nhạt, to hơn Sữa ≈ 1,5 lần, đầu to tròn, chân ngắn mập, tai cụp, mõm kem, mũi tròn nâu, mắt đen nhỏ hiền, má hồng, miệng cười lưỡi hồng, đuôi xù, vòng cổ hồng đào. Ảnh chuẩn `art/out/dogs/lu_ref.png` sau khi chủ dự án duyệt.

## 4. Ảnh demo (sau khi duyệt `lu_ref`)

Khung 1080x1920 (9:16), **vẽ đủ vùng dư hai bên cho 3:4** (cảnh rộng tương ứng 1366 phòng). Nền theo `l5_bg_backyard` bản rộng; đúng bố cục bản khối; chỉ key có thật. Kèm `owner_l1_style_ref.png`, một demo L1, `l1_depth_angle_ref.png`, ảnh khối, `mun_ref`, `lu_ref`.
- `l6_demo_start`: mở màn. Mun nằm rạp trên mái kho cạnh ống khói, Lu ngồi sủa dưới mái, mọi món ở chỗ ban đầu (cây + ổ chim, chuông gió, găng vắt rào, bàn + giỏ đóng ở mép trái, ghế đẩu dưới bàn, thùng gỗ cạnh rào, hộp dụng cụ, phuy, bụi rau, bình tưới, chuồng).
- `l6_demo_path`: xếp xong đường. Phuy + hộp dụng cụ ở A sát tường kho, thùng gỗ ở B, ghế ở C sát bàn; giỏ mở ở mép trái mặt bàn; Mun ăn xúc xích trên bàn; Lu thò đầu khỏi chuồng gặm xương.

## 5. Tách asset theo demo đã duyệt (G6-21)

Chủ dự án chốt demo **`art/out/demo/l6_demo_path_916.png`** (vùng chơi không giao diện `l6_demo_path_play.png`). Tách từng món theo demo này; **vị trí Dev sắp lại** theo bố cục bản khối; riêng **cây vẽ lại đẹp hơn như cây ở cảnh Mun ăn trên bàn** (`l6_demo_table_play.png`).

Mỗi món một ảnh `art/out/_sheets/l6src_<key>.png` (Codex tách, brief `art/review/l6_tach_<lượt>_brief.md`, tối đa 7 món một lượt, G5-23). Ô = cả ảnh. **Hiển thị = bề rộng phần vẽ đo trên vùng chơi demo** (khung 1024x1536); món không có trong demo lấy cỡ theo tỉ lệ Mun ≈ 220, Lu ngồi ≈ 240. Ảnh cắt từng món: `art/ref/l6_cut/crops/`. Nhóm cùng khung, cùng neo: `basket`, `glove`, `mun_roof`. `l6_dog_house_front` (khung vòm đặt trên đầu Lu) Art cắt từ `l6_dog_house` bằng mặt nạ lòng cửa tối, không vẽ riêng. `l5_wind_chime` dùng lại. `mun_jump_up` bỏ (D6-19: Mun bước ngang sang bàn).

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l6src_l6_shed | 0,0,1536,1024 | l6_shed | level6 |  | đáy | rộng 560 | 5 |
| l6src_l6_shed_chimney | 0,0,1024,1536 | l6_shed_chimney | level6 |  | đáy | rộng 95 | 5 |
| l6src_l6_table | 0,0,1536,1024 | l6_table | level6 |  | đáy | rộng 320 | 5 |
| l6src_l6_crate | 0,0,1024,1536 | l6_crate | level6 |  | đáy | rộng 190 | 5 |
| l6src_l6_stool | 0,0,1024,1536 | l6_stool | level6 |  | đáy | rộng 165 | 5 |
| l6src_l6_barrel | 0,0,1024,1536 | l6_barrel | level6 |  | đáy | rộng 210 | 5 |
| l6src_l6_toolbox | 0,0,1536,1024 | l6_toolbox | level6 |  | đáy | rộng 175 | 5 |
| l6src_l6_tree | 0,0,1024,1536 | l6_tree | level6 |  | đáy | rộng 285 | 5 |
| l6src_l6_bird_nest | 0,0,1024,1024 | l6_bird_nest | level6 |  | tâm | rộng 70 | 5 |
| l6src_l6_glove_black_idle | 0,0,1024,1024 | l6_glove_black_idle | level6 | glove | đỉnh | rộng 75 | 5 |
| l6src_l6_veggie_bed | 0,0,1536,1024 | l6_veggie_bed | level6 |  | đáy | rộng 475 | 5 |
| l6src_l6_watering_can | 0,0,1024,1024 | l6_watering_can | level6 |  | đáy | rộng 205 | 5 |
| l6src_l6_picnic_basket_open | 0,0,1024,1024 | l6_picnic_basket_open | level6 | basket | đáy | rộng 190 | 5 |
| l6src_l6_dog_house | 0,0,1024,1024 | l6_dog_house | level6 | dog_house | đáy | rộng 320 | 5 |
| l6src_l6_picnic_basket_closed | 0,0,1024,1024 | l6_picnic_basket_closed | level6 | basket | đáy |  | 5 |
| l6src_l6_glove_black_fallen | 0,0,1024,1024 | l6_glove_black_fallen | level6 | glove | đáy |  | 5 |
| l6src_l6_bone | 0,0,1536,1024 | l6_bone | level6 |  | tâm | rộng 80 | 5 |
| l6src_l6_sausage | 0,0,1536,1024 | l6_sausage | level6 |  | tâm | rộng 90 | 5 |
| l6src_l6_dog_chew | 0,0,1024,1024 | l6_dog_chew | level6 |  | đáy | rộng 210 | 5 |
| l6src_mun_roof_crouch_ears_up | 0,0,1536,1024 | mun_roof_crouch_ears_up | cats | mun_roof | đáy | rộng 245 | 2.5 |
| l6src_mun_roof_crouch | 0,0,1536,1024 | mun_roof_crouch | cats | mun_roof | đáy |  | 2.5 |
| l6src_l6_dog_bark | 0,0,1024,1024 | l6_dog_bark | level6 |  | đáy | rộng 240 | 2.5 |
| l6src_l6_dog_run | 0,0,1536,1024 | l6_dog_run | level6 |  | đáy | rộng 300 | 2.5 |
| l6src_l6_dog_run_bone | 0,0,1536,1024 | l6_dog_run_bone | level6 |  | đáy | rộng 260 | 2.5 |
| l6src_l6_dog_beg | 0,0,1024,1024 | l6_dog_beg | level6 |  | đáy | rộng 230 | 2.5 |
| l6src_l6_dog_belly | 0,0,1536,1024 | l6_dog_belly | level6 |  | đáy | rộng 280 | 2.5 |
| l6src_mun_roof_edge | 0,0,1536,1024 | mun_roof_edge | cats |  | đáy | rộng 230 | 2.5 |
| l6src_mun_step_down | 0,0,1024,1024 | mun_step_down | cats |  | đáy | rộng 220 | 2.5 |
| l6src_mun_eat | 0,0,1024,1024 | mun_eat | cats |  | đáy | rộng 220 | 2.5 |
| l6src_mun_sit_look | 0,0,1024,1024 | mun_sit_look | cats |  | đáy | rộng 200 | 2.5 |
| l6src_mun_climb | 0,0,1024,1536 | mun_climb | cats |  | đáy | rộng 150 | 2.5 |

| Tờ hoặc key | Demo gốc | Vị trí trong demo |
|---|---|---|
| l6src_l6_shed | art/out/demo/l6_demo_path_916.png | x 520–1024 (mép phải bị khung cắt), y 440–950 |
| l6src_l6_shed_chimney | art/out/demo/l6_demo_path_916.png | x 912–1018, y 255–455 |
| l6src_l6_table | art/out/demo/l6_demo_path_916.png | x 0–300 (mép trái bị khung cắt), y 800–1020 |
| l6src_l6_crate | art/out/demo/l6_demo_path_916.png | x 300–490, y 720–985 |
| l6src_l6_stool | art/out/demo/l6_demo_path_916.png | x 240–405, y 820–1025 |
| l6src_l6_barrel | art/out/demo/l6_demo_path_916.png | x 430–640, y 670–975 |
| l6src_l6_toolbox | art/out/demo/l6_demo_path_916.png | x 440–615, y 590–680 |
| l6src_l6_tree | art/out/demo/l6_demo_path_916.png | x 0–280, y 140–810 (cảnh xếp xong đường) |
| l6src_l6_bird_nest | art/out/demo/l6_demo_path_916.png | x 85–150, y 455–500 |
| l6src_l6_glove_black_idle | art/out/demo/l6_demo_path_916.png | x 385–455, y 340–440 |
| l6src_l6_veggie_bed | art/out/demo/l6_demo_path_916.png | x 105–580, y 1045–1245 |
| l6src_l6_watering_can | art/out/demo/l6_demo_path_916.png | x 600–805, y 1105–1280 |
| l6src_l6_picnic_basket_open | art/out/demo/l6_demo_path_916.png | x 28–218, y 690–850 |
| l6src_l6_dog_house | art/out/demo/l6_demo_path_916.png | x 695–1015, y 830–1170 |
| l6src_l6_picnic_basket_closed | art/out/demo/l6_demo_path_916.png | giỏ đóng ở cảnh mở màn art/out/demo/l6_demo_start_play.png x 0–175, y 650–800 |
| l6src_l6_glove_black_fallen | art/out/demo/l6_demo_path_916.png | (không có trong demo) |
| l6src_l6_bone | art/out/demo/l6_demo_path_916.png | khúc xương Lu ngậm trong chuồng, x 830–960, y 1120–1160 |
| l6src_l6_sausage | art/out/demo/l6_demo_path_916.png | xúc xích Mun ăn trong art/out/demo/l6_demo_table_play.png, x 300–385, y 845–895 |
| l6src_l6_dog_chew | art/out/demo/l6_demo_path_916.png | đầu Lu trong cửa chuồng, x 750–960, y 985–1170 |
| l6src_mun_roof_crouch_ears_up | art/out/demo/l6_demo_path_916.png | Mun trên mái, x 600–845, y 310–475 |
| l6src_mun_roof_crouch | art/out/demo/l6_demo_path_916.png | dáng sợ ở cảnh mở màn art/out/demo/l6_demo_start_play.png x 630–900, y 320–470 |
| l6src_l6_dog_bark | art/out/demo/l6_demo_path_916.png | dáng ngồi sủa ở cảnh mở màn art/out/demo/l6_demo_start_play.png x 545–805, y 750–970 |
| l6src_l6_dog_run | art/out/demo/l6_demo_path_916.png | (không có trong demo) |
| l6src_l6_dog_run_bone | art/out/demo/l6_demo_path_916.png | (không có trong demo) |
| l6src_l6_dog_beg | art/out/demo/l6_demo_path_916.png | (không có trong demo) |
| l6src_l6_dog_belly | art/out/demo/l6_demo_path_916.png | (không có trong demo) |
| l6src_mun_roof_edge | art/out/demo/l6_demo_path_916.png | (không có trong demo) |
| l6src_mun_step_down | art/out/demo/l6_demo_path_916.png | (không có trong demo) |
| l6src_mun_eat | art/out/demo/l6_demo_path_916.png | Mun ăn trong art/out/demo/l6_demo_table_play.png x 165–400, y 680–885 |
| l6src_mun_sit_look | art/out/demo/l6_demo_path_916.png | (không có trong demo) |
| l6src_mun_climb | art/out/demo/l6_demo_path_916.png | (không có trong demo) |

**Mô tả từng món:**
- `l6_shed` (lượt `props_a`): Nhà kho gỗ mật ong nhạt, ván dọc, **mái tôn xanh trời nhạt gợn sóng** nhô ra hai bên, mặt mái phẳng thấy rõ; cửa gỗ ván dọc ở nửa phải có núm tròn vàng và bản lề. **Vẽ đủ cả nhà kho**, kể cả phần bên phải bị khung demo cắt (vẽ bù cho cân, mép phải giống mép trái). **Không lấy:** KHÔNG lấy ống khói (món riêng; chỗ ống khói che mái thì vẽ bù mái tôn), KHÔNG lấy Mun, phuy, hộp dụng cụ, chuồng Lu, cột dây phơi, hàng rào.
- `l6_shed_chimney` (lượt `props_a`): Ống khói gạch hồng đào nhạt, nắp kem trên đỉnh, gạch xếp so le đơn giản. Đáy phẳng (đứng trên mái). **Không lấy:** KHÔNG lấy mái tôn, dây phơi, hàng rào, trời.
- `l6_table` (lượt `props_a`): Bàn gỗ ngoài trời thấp, mặt bàn ván gỗ mật ong nhạt thấy rõ mặt trên, 4 chân vuông, thanh giằng. **Vẽ đủ cả bàn** (mép trái bị khung cắt thì vẽ bù cho cân). **Không lấy:** KHÔNG lấy giỏ picnic trên bàn, ghế đẩu phía trước, thùng gỗ, cây, hàng rào.
- `l6_crate` (lượt `props_a`): Thùng gỗ nan mật ong nhạt, mặt trên phẳng thấy rõ, nan ngang và cột góc. Đứng thẳng. **Không lấy:** KHÔNG lấy ghế đẩu che phía trước (vẽ bù phần bị che), KHÔNG lấy phuy, bàn, hàng rào.
- `l6_stool` (lượt `props_a`): Ghế đẩu gỗ mật ong nhạt, mặt ghế vuông bo góc thấy rõ mặt trên, 4 chân, thanh giằng ngang. **Không lấy:** KHÔNG lấy bàn, thùng gỗ phía sau.
- `l6_barrel` (lượt `props_a`): Thùng phuy gỗ sơn xanh trời nhạt, 3 đai nâu nhạt, bụng hơi phình; **miệng phuy hở, thấy mặt nước xanh nhạt** (vì trong demo hộp dụng cụ đang đậy, hãy vẽ miệng phuy hở như phuy chưa đậy). **Không lấy:** KHÔNG lấy hộp dụng cụ trên miệng, thùng gỗ, tường kho.
- `l6_toolbox` (lượt `props_a`): Hộp dụng cụ hồng đào nhạt, nắp phẳng thấy rõ mặt trên, quai vàng caramel thấp trên nắp, khoá vàng nhỏ ở giữa mặt trước. **Không lấy:** KHÔNG lấy phuy bên dưới.
- `l6_tree` (lượt `props_b`): **Vẽ lại cho đẹp như cây trong cảnh Mun ăn trên bàn** (ảnh tree_table_demo.png): thân gỗ nâu mật ong cong mềm chia 2–3 nhánh, **tán tròn mập nhiều cụm bông xù xanh lá nhạt pha kem**, vài lá nhỏ vẽ nét bên trong tán, một cành ngang bên phải để đặt ổ chim (không vẽ ổ). Tán dày, tròn đều, không lởm chởm. Màu xanh lá nhạt pha kem như mẫu L1, không xanh tươi. **Không lấy:** KHÔNG lấy ổ chim (món riêng), bụi cây dưới gốc, hàng rào, giỏ, Mun.
- `l6_bird_nest` (lượt `props_b`): Ổ chim rơm vàng caramel nhạt, hình bát tròn, thấy lòng ổ hơi tối, rơm đan vài nét. **Không lấy:** KHÔNG lấy cành cây, lá.
- `l6_glove_black_idle` (lượt `props_b`): Găng tay vải đen than ấm vắt qua đỉnh rào, **hai ngón dựng như hai tai mèo**, lòng găng tròn, cổ găng viền hồng đào thòng xuống. Vẽ găng như đang vắt trên một mép ngang (phần trên gập qua), nhưng không vẽ hàng rào. **Không lấy:** KHÔNG lấy hàng rào, trời.
- `l6_veggie_bed` (lượt `props_b`): Luống rau trong khung gỗ thấp mật ong nhạt, đất nâu, 3 cụm rau xanh lá nhạt (xà lách, cải) tròn mập. **Không lấy:** KHÔNG lấy sàn gạch.
- `l6_watering_can` (lượt `props_b`): Bình tưới xanh trời nhạt, quai cong trên, vòi dài chĩa phải, sen tưới tròn có lỗ chấm. **Không lấy:** KHÔNG lấy sàn, chuồng.
- `l6_picnic_basket_open` (lượt `props_b`): Giỏ picnic mây vàng caramel nhạt, **nắp mở lật ra sau**, trong giỏ trống thấy lòng giỏ, quai cầm hai bên. **Không lấy:** KHÔNG lấy mặt bàn, cây.
- `l6_dog_house` (lượt `props_b`): Chuồng gỗ mật ong nhạt ván dọc, **mái tam giác hồng phấn nhạt** nhô ra, cửa vòm. **Trong cửa vòm để TRỐNG, tô tối nâu ấm đặc** (không có Lu, không xương), ngưỡng cửa gỗ ở đáy. **Không lấy:** KHÔNG lấy Lu, khúc xương, bình tưới, tường kho.
- `l6_picnic_basket_closed` (lượt `states`): **Chỉnh sửa từ ảnh art/out/_sheets/l6src_l6_picnic_basket_open.png** (giữ nguyên khung, cỡ, vị trí, màu, nét): **nắp đóng** khít, khăn kẻ ô hồng kem thò ra mép nắp, quai cầm trên nắp như giỏ ở cảnh mở màn. **Không lấy:** KHÔNG lấy bàn.
- `l6_glove_black_fallen` (lượt `states`): **Chỉnh sửa từ ảnh art/out/_sheets/l6src_l6_glove_black_idle.png** (giữ màu, nét, cỡ găng): găng **nằm bẹp dưới đất**, xoè ngang, hai ngón không còn dựng, cổ găng hồng đào lộ ra. Đáy phẳng.
- `l6_bone` (lượt `states`): Khúc xương kem trắng ấm hai đầu tròn kép, đúng như khúc xương Lu ngậm trong demo. Nằm ngang. **Không lấy:** KHÔNG lấy Lu, chuồng.
- `l6_sausage` (lượt `states`): Khúc xúc xích hồng đào nhạt bóng nhẹ, hai đầu tròn, cong nhẹ, nguyên vẹn (chưa cắn). Nằm ngang. **Không lấy:** KHÔNG lấy Mun, bàn.
- `l6_dog_chew` (lượt `states`): Đầu Lu (lu_ref) + hai bàn chân trước, như đang thò ra khỏi cửa chuồng: tai cụp vàng mật ong, mắt híp vui, má hồng, **ngậm khúc xương kem ngang miệng**, hai chân trước tì đất. Đáy phẳng (cắt ngang ở ngưỡng cửa). **Không lấy:** KHÔNG lấy chuồng, cửa vòm tối, ngưỡng cửa.
- `mun_roof_crouch_ears_up` (lượt `states`): Mun (mun_ref, mặt tròn, đen than ấm, mắt vàng mật ong) **nằm rạp** trên mặt phẳng, nhìn sang phải và hơi xuống, **tai dựng**, mắt tò mò, đuôi dựng cong sau lưng, hai chân trước duỗi ra trước. Đáy phẳng (bụng và chân chạm mặt mái). **Không lấy:** KHÔNG lấy mái tôn, ống khói, dây phơi.
- `mun_roof_crouch` (lượt `states`): **Chỉnh sửa từ ảnh art/out/_sheets/l6src_mun_roof_crouch_ears_up.png** (giữ khung, cỡ, vị trí thân, màu, nét): chỉ đổi **hai tai CỤP rạp ra sau**, mắt to sợ hãi, **đuôi quấn sát người** (không dựng), thân nép sát xuống hơn một chút.
- `l6_dog_bark` (lượt `lu`): Lu (lu_ref; cùng đầu, màu, nét như đầu Lu trong demo đã chốt) **ngồi**, mặt quay phải và **ngẩng lên sủa vui**, miệng há thấy lưỡi hồng, tai cụp bay nhẹ, đuôi xù dựng vẫy, vòng cổ hồng đào khoen vàng. Bốn chân trên một đường đáy. **Không lấy:** KHÔNG lấy phuy, sàn.
- `l6_dog_run` (lượt `lu`): Lu **chạy đuổi** sang phải, bốn chân duỗi bay, tai cụp hất ra sau, miệng há sủa, đuôi xù duỗi sau. Mặt quay phải.
- `l6_dog_run_bone` (lượt `lu`): Lu **ngậm khúc xương** (như l6_bone) **chạy vui** sang phải, mắt híp sung sướng, tai bay, đuôi vẫy. Mặt quay phải.
- `l6_dog_beg` (lượt `lu`): Lu **chồm đứng hai chân sau**, hai chân trước giơ lên như tì vào mép bàn, mũi hít hít ngẩng lên, mắt long lanh đòi ăn, đuôi vẫy. Mặt quay phải.
- `l6_dog_belly` (lượt `lu`): Lu **lăn ngửa khoe bụng** kem, bốn chân co lên trời, mắt híp, lưỡi thè, đuôi vẫy, đầu bên phải. Lưng chạm một đường đáy phẳng.
- `mun_roof_edge` (lượt `mun`): Mun **bò ra mép, nửa người trước thò qua mép phẳng nhìn xuống**, mặt quay phải và cúi xuống, hai chân trước tì mép, tai dựng nửa, mắt tròn hơi sợ, người run (vài nét run nhỏ). Đáy phẳng.
- `mun_step_down` (lượt `mun`): Mun **rón rén bước xuống**: nhìn nghiêng sang phải, hai chân trước thấp hơn hai chân sau (đang bước xuống bậc), đầu cúi nhìn chân, đuôi dựng thăng bằng, tai dựng.
- `mun_eat` (lượt `mun`): Mun đứng bốn chân, nhìn sang phải, **cúi đầu gặm** (không vẽ xúc xích), mắt híp sung sướng, má hồng, tai dựng, đuôi dựng cong. Đáy phẳng. **Không lấy:** KHÔNG lấy xúc xích, bàn, giỏ.
- `mun_sit_look` (lượt `mun`): Mun **ngồi**, mặt quay ba phần tư sang phải rồi **ngẩng nhìn người chơi**, lưỡi hồng **liếm mép**, mắt vàng tròn hài lòng, đuôi quấn quanh chân.
- `mun_climb` (lượt `mun`): Mun **bám leo** một cột thẳng đứng (không vẽ cột): thân dựng đứng, bốn chân ôm vào trục giữa như ôm cột, đầu ngoái nhìn sang phải, tai cụp, mắt to hoảng, đuôi thõng xuống.
