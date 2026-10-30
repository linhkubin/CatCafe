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
