# Design Art – Level 5: Đốm sáng

> Đọc kèm `style.md`. Bút chì màu, pastel nhạt theo `art/ref/owner_l1_style_ref.png` (O6), nét mảnh đậm nhạt (O5), cute, tối giản, **không chữ**.
>
> **Phòng:** **Sân sau** (bắt đầu) ► **Con hẻm**, buổi chiều. **Mèo:** Mun (theo `cats/mun_ref.png`, lần đầu xuất hiện), Sữa cameo ở cửa sổ quán. **Ý chính:** Mun nấp dưới gầm xe ba gác trong hẻm râm. Người chơi lấy 3 đồ sáng (nắp thiếc, gương, đĩa CD), kéo bạt cho nắng xuống, rồi nối tia nắng A → B → C tới trước gầm xe. Đốm sáng nhảy nhót, Mun phóng ra đuổi 2 vòng, đè đốm sáng.

Áp dụng mọi quy tắc đã chốt ở Level 1–4: vẽ theo tờ, đặt tên V23, cột Nét, vùng chạm ≥ 115px, neo theo công cụ, `anchors.json`, **góc nhìn chung** (`style.md` mục 2b), màu O6, túi đồ như level 3–4, **nền chỉ phòng trống, mọi đồ là sprite riêng** (từ L4).

Nguồn gameplay: `levels/levels-01-10.md` và `levels/states-01-10.md` mục Level 5; G5-1…G5-16, D5-1…D5-9, A5-1… trong `art/review/level5-thread.md`. Vị trí, cỡ, lớp lấy từ bản khối đã duyệt: `art/review/l5_dev_check/l5_block_layout.md` (ảnh `layout/l5_block_*_clean.png`, `_grid.png`).

**Ánh sáng (G5-3):** đốm sáng `l5_light_spot` và dải nắng `l5_sunbeam` là ảnh **phẳng có vân chì**, không glow. Quầng sáng, độ chói, tia phản chiếu, chấm nắng li ti, lớp tối hẻm (alpha 0,42), gợn nước, giọt bắn: **code vẽ**, Art không vẽ.

**Màu buổi chiều (A5-3):** vẫn bảng màu khóa. Chiều chỉ thể hiện bằng tường kem hơi ấm (mật ong nhạt) và trời xanh nhạt pha kem; không cam, không hoàng hôn. Hẻm tối do code phủ, nên nền hẻm vẽ **sáng như lúc đã có nắng**.

---

## 1. Danh sách key

Hiển thị = cỡ trong game trên khung phòng 1024x1536 (theo bản khối). TS = trong suốt.

### Sân sau

| Key | Hiển thị | Neo | Lớp | Tờ |
|---|---|---|---|---|
| `l5_bg_backyard` | 1024x1536, có nền | trên-trái | 0 | ảnh lẻ |
| `l5_cafe_window_back` | rộng 360 | đáy (250, 760) | 5 | `l5_yard_sheet` |
| `sua_press_window` | rộng 150 | đáy (250, 715) | 6 | `l5_sua_sheet` |
| `l5_cafe_window_frame` | rộng 360 | đáy (250, 760) | 6.5 | `l5_yard_sheet` |
| `l5_wind_chime` | 70x150 | đỉnh (465, 360) | 8 | `l5_yard_sheet` |
| `l5_shirt` | rộng 150 | đỉnh (700, 236) | 8 | `l5_yard_sheet` |
| `l5_clothespin` | 16x34 | đỉnh (745, 236) | 9 | `l5_yard_sheet` |
| `l5_cactus_pot` | rộng 90 | đáy (955, 990) | 10 | `l5_yard_sheet` |
| `l5_cactus_flower` | rộng 34 | đáy (ngọn cây) | 10.5 | `l5_yard_sheet` |
| `l5_vanity_table` | rộng 320 | đáy (740, 1010) | 10 | `l5_yard_sheet` |
| `l5_mirror_small` | rộng 110 | đáy (740, 775) | 11 | `l5_shiny_sheet` |
| `l5_trash_bag_idle` | rộng 210 | đáy (200, 960) | 12 | `l5_yard_b_sheet` (bag) |
| `l5_trash_bag_after` | rộng 220 | đáy (200, 960) | 12 | `l5_yard_b_sheet` (bag) |
| `l5_tin_lid` | rộng 110 | đáy (650, 1168) | 13 | `l5_shiny_sheet` |
| `l5_slippers` | rộng 120 | đáy (235, 1168) | 13 | `l5_yard_b_sheet` (slip) |
| `l5_slippers_flipped` | rộng 130 | đáy (235, 1168) | 13 | `l5_yard_b_sheet` (slip) |
| `l5_cardboard_box` | rộng 270 | đáy (450, 1170) | 14 | `l5_yard_b_sheet` |

Vẽ vào nền sân sau (không phải sprite): hàng rào gỗ, cửa sau quán (x 905–1021, y 300–820), hai cột dây phơi (x 468–478 và 1000–1010, y 200–820), **dây phơi** (y ≈ 226–236), **bậc cửa** (x 895–1015, y 985–1015).

### Hẻm

| Key | Hiển thị | Neo | Lớp | Tờ |
|---|---|---|---|---|
| `l5_bg_alley` | 1024x1536, có nền | trên-trái | 0 | ảnh lẻ |
| `l5_puddle` | rộng 150 | tâm (105, 1125) | 9 | `l5_alley_sheet` |
| `l5_sunbeam` | 120x780 | đáy (180, 1020) | 10 | `l5_light_sheet` |
| `l5_gecko` | 60x120 | tâm (330, 470) | 11 | `l5_alley_sheet` |
| `l5_milk_can` | rộng 50 | đáy (708, 545) | 11 | `l5_alley_sheet` |
| `l5_bike` | rộng 240 | đáy (750, 905) | 15 | `l5_bike_sheet` |
| `l5_bike_wheel` | 84x84 | tâm (818, 873) | 15.5 | `l5_bike_sheet` |
| `l5_cart` | rộng 380 | đáy (640, 1170) | 20 | `l5_cart_sheet` |
| `l5_cd_hanging` | rộng 80 | đỉnh (95, 455) | 21 | `l5_shiny_sheet` |
| `l5_tin_lid_placed` | rộng ≈ 86 | đáy (180, 1010) | 21.1 | `l5_shiny_sheet` |
| `l5_mirror_placed` | rộng ≈ 76 | đáy (520, 605) | 21.1 | `l5_shiny_sheet` |
| `l5_cd_placed` | rộng ≈ 82 | đáy (842, 786), miệng giỏ (D5-12) | 21.1 | `l5_shiny_sheet` |
| `l5_light_spot` | 96x96 | tâm | 21.4 | `l5_light_sheet` |
| `l5_drain_pipe` | 90x760 | đáy (975, 1170) | 24 | `l5_cart_sheet` |
| `l5_awning_down` | 860x170 | đỉnh (512, 210) | 25 | `l5_awning_sheet` (awning) |
| `l5_awning_rolled` | 860x60 | đỉnh (512, 210) | 25 | `l5_awning_sheet` (awning) |
| `l5_awning_cord` | 60x360 | đỉnh (820, 372) | 28 | `l5_awning_sheet` |
| `l5_crow_idle` | rộng 110 | đáy (300, 192) | 26 | `l5_alley_sheet` (crow) |
| `l5_crow_far` | rộng 90 | đáy (820, 192) | 26 | `l5_alley_sheet` (crow) |

Vẽ vào nền hẻm: trời (y 0–200), **dây điện** cong (y ≈ 175–190), tường đối diện (y 200–790, gạch từ y 400), **bậu tường B** (x 410–630, y 605–627), **cửa sổ hẻm** (x 645–775, y 420–532) và bậu (x 632–788, y 532–546), **móc tường** treo CD (≈ 95, 455), sàn hẻm (từ y 790).

### Mun (tham chiếu `cats/mun_ref.png`, sau khi chủ dự án duyệt)

| Key | Hiển thị | Neo | Tờ |
|---|---|---|---|
| `mun_eyes_dark` | 130x56 | tâm | `l5_mun_sheet` |
| `mun_paw_reach` | 150x54 | trái-giữa (gốc chân) | `l5_mun_sheet` |
| `mun_peek_out` | 150x110 | đáy | `l5_mun_sheet` |
| `mun_run` | 220x130 | đáy | `l5_mun_sheet` |
| `mun_pounce` | 220x160 | đáy | `l5_mun_sheet` |
| `mun_pin_light` | 200x160 | đáy | `l5_mun_b_sheet` |
| `mun_look_paw` | 190x210 | đáy | `l5_mun_b_sheet` |
| `mun_held` | 260x320 | nách ở 42% chiều cao (như `sua_held`) | `l5_mun_b_sheet` |
| `mun_face_icon` | 300x300 | tâm | `l5_mun_b_sheet` |

### Nhân vật, Sữa, giao diện

| Key | Ghi chú | Tờ |
|---|---|---|
| `sua_press_window` | Sữa áp mặt và hai bàn chân vào kính, nhìn ra hẻm, tò mò | `l5_sua_sheet` |
| `player_cover_nose` | Bịt mũi, nhăn mặt (trồi lên từ mép dưới khi chạm túi rác) | `player_l5_sheet` |
| `player_hands_lift` | Có sẵn (G5-18): lúc kẹp lại kẹp áo dùng tư thế hai tay giơ lên, thay `player_surprised`. Không vẽ tư thế mới | – |
| `l5_icon_sun_covered` | Bong bóng nhân vật: mặt trời bị đám mây che, 120x100 | `l5_light_sheet` |

---

## 2. Trả lời yêu cầu animation của Dev (QUY-TRINH bước 3)

- **Cửa sổ quán và Sữa:** tách 2 lớp, kẹp Sữa ở giữa:
  - `l5_cafe_window_back`: kính xanh nhạt, phía trong quán hơi tối ấm. Lớp 5.
  - `l5_cafe_window_frame`: khung gỗ, bậu và thanh ngang trên. Lớp 6.5, trên Sữa. Ô kính trong suốt x 100–400, y 390–670 (D5-12).
  - **Bỏ thanh dọc giữa kính** của bản khối, vì nó cắt qua mặt Sữa ở x 250. Thay bằng một thanh ngang ở 1/3 trên (y ≈ 480), trên đầu Sữa kể cả lúc Sữa ngóc +16px.
  - Bậu dưới khung che chân và đáy Sữa, để Sữa nảy không lộ mép cắt.
- **Dây phơi, cột, bậc cửa, móc CD, dây điện, bậu tường B, cửa sổ hẻm:** vẽ vào nền như Dev đề xuất.
- **Bạt:** 2 trạng thái cùng mép trên, cùng bề ngang 860 (cùng nhóm, vẽ chung một tờ). Bạt thả có 4–5 lỗ thủng nhỏ (lỗ trong suốt hoặc kem nhạt). Dây kéo riêng: dây thừng mảnh, vòng tròn ở cuối (y ≈ 680–730 trong toạ độ phòng). Đỉnh dây khớp mép dưới bạt ở x 820.
- **Xe đạp:** khung gồm bánh sau, ghi đông, chuông, yên, **giỏ đan mây** ở đầu xe (x ≈ 818–866, y ≈ 781–809, là điểm C, miệng giỏ đủ rộng để đĩa CD gác vào). Bánh trước tách riêng, tâm khớp trục (818, 873). Trên khung chỉ vẽ trục bánh trước, không vẽ bánh.
- **Xe ba gác:** 1 ảnh, gầm tối (x 485–795, y 1080–1165) tô nâu than ấm đậm, có vân chì, **không đen tuyền**, để mắt và mặt Mun nổi lên.
- **Đồ đã đặt (3 key):** vẽ sẵn độ nghiêng ~20°, mặt sáng quay về phía tia tới. Nắp thiếc dựng nghiêng trên đất. Gương nhỏ có chân đứng trên bậu. Đĩa CD gác nghiêng trong giỏ xe (phần dưới đĩa khuất trong giỏ, nên ảnh `l5_cd_placed` chỉ vẽ phần đĩa thò lên trên miệng giỏ, đáy cắt thẳng ngang theo miệng giỏ).
- **Đồ sáng:** mặt bóng thể hiện bằng 2–3 vệt kem trắng và nét chì, không glossy.
- **Đốm sáng:** đĩa tròn bơ vàng nhạt, tâm kem trắng, mép mềm bằng nét chì li ti (không viền nâu đặc). **Dải nắng:** hình thang bơ vàng rất nhạt, vân chì dọc, mép mờ bằng nét chì, đáy có vệt elip nhạt trên đất. Không glow (code làm).
- **Tư thế "kẹp lại kẹp áo" (G5-18):** không vẽ tư thế mới, dùng `player_hands_lift` có sẵn, bỏ `player_surprised` ở chỗ này.

---

## 3. Bố cục hai phòng (theo bản khối)

**Sân sau** (chân tường y 820): tường sân là hàng rào gỗ mật ong nhạt từ y ≈ 300, trên là trời chiều xanh nhạt pha kem. Cửa sau quán bên phải. Sàn sân lát gạch vuông lớn màu kem xám ấm nhạt (vài đường ngang, rất ít chi tiết).
- Cửa sổ quán bên trái tường (x 74–426, y 364–756), Sữa áp mặt kính ở giữa dưới.
- Chuông gió treo mép phải cửa sổ.
- Dây phơi giữa 2 cột, áo phơi bạc hà, kẹp gỗ.
- Bàn trang điểm hồng phấn bên phải (mặt bàn y ≈ 764), gương nhỏ trên bàn.
- Xương rồng trong chậu đất nung nhạt trên bậc cửa sau.
- Túi rác đen than (cùng màu than ấm như Mun, cuộn tròn như mèo, có nút buộc như tai) bên trái dưới cửa sổ.
- Thùng giấy cũ giữa sàn, nắp thiếc tròn dựa bên phải thùng, dép tổ ong xanh da trời bên trái thùng.

**Hẻm** (chân tường y 790): trời y 0–200, dây điện cong, quạ đậu trái.
- Bạt mái hiên sọc to 3–5 sọc (hồng đào và kem) y 212–378 (thả) hoặc cuộn y 212–268.
- Tường gạch kem hồng nhạt (gạch to, ít, nhạt).
- Thạch sùng trên tường.
- CD treo móc tường trái.
- Bậu tường B giữa.
- Cửa sổ hẻm nhỏ phải với ống bơ.
- Xe đạp cũ dựng tường phải.
- Xe ba gác dưới phải với gầm tối.
- Ống thoát nước sát mép phải.
- Vũng nước góc trái dưới.
- Điểm A trên đất trái (180, 980).

---

## 4. Ảnh lẻ (làm sau khi demo duyệt)

**G5-21:** nền phải phủ cả phần dư trên và dưới của màn dài: vẽ cao tới **1024x2304** (vùng chơi 1024x1536 ở giữa, dư 384px trên và dưới), trời, tường, sàn kéo dài tự nhiên. Codex chỉ ra 1024x1536, nên làm như demo 9:16: thu cảnh vào giữa rồi chỉnh sửa vẽ nối.

| File | Key | Kích thước | Nền |
|---|---|---|---|
| `level5/l5_bg_backyard.png` | `l5_bg_backyard` | **1024x2304** (vùng chơi y 384–1920) | Có nền |
| `level5/l5_bg_alley.png` | `l5_bg_alley` | **1024x2304** (vùng chơi y 384–1920) | Có nền |

## 5. Các tờ

Bảng ô (`x,y,w,h`), Nhóm, Nét cụ thể **viết sau khi chủ dự án duyệt demo**, theo mẫu `design-art-level4.md` mục 5.13: mỗi tờ kèm ảnh demo gốc (G4-26) và ảnh cắt đúng món đó. Tờ dự kiến:
- `l5_yard_sheet`: cửa sổ (back, frame), chuông gió, áo, kẹp, chậu xương rồng, hoa, bàn trang điểm.
- `l5_yard_b_sheet`: túi rác 2 trạng thái, dép 2 trạng thái, thùng giấy.
- `l5_shiny_sheet`: gương, nắp thiếc, CD treo, 3 đồ đã đặt.
- `l5_light_sheet`: đốm sáng, dải nắng, icon mặt trời bị che.
- `l5_alley_sheet`: vũng nước, thạch sùng, ống bơ, quạ 2 trạng thái.
- `l5_bike_sheet`: khung xe đạp, bánh trước.
- `l5_cart_sheet`: xe ba gác, ống thoát nước.
- `l5_awning_sheet`: bạt thả, bạt cuộn, dây kéo.
- `l5_mun_sheet`, `l5_mun_b_sheet`: tư thế Mun.
- `l5_sua_sheet`: Sữa áp kính.
- `player_l5_sheet`: bịt mũi.


### 5.1 Tách theo demo, lượt 1–4 (G5-22, G5-23, A5-11)

Mỗi món một ảnh `art/out/_sheets/l5src_<key>.png` (Codex tách từ demo đã duyệt, brief `art/review/l5_tach_<lượt>_brief.md`). Ô = cả ảnh. Hiển thị = bề rộng phần vẽ đo trên vùng chơi demo (bạt, xe đạp, xe ba gác, cửa sổ theo số Dev D5-16). Trạng thái vẽ sửa từ món gốc có Hiển thị riêng theo cùng tỉ lệ px (dép lật: chiếc phải 555px = chiếc ở `l5_slippers`).

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l5src_l5_cafe_window | 0,0,1254,1254 | l5_cafe_window | level5 |  | đáy | rộng 386 | 5 |
| l5src_l5_wind_chime | 0,0,1254,1254 | l5_wind_chime | level5 |  | đỉnh | rộng 62 | 5 |
| l5src_l5_shirt | 0,0,1254,1254 | l5_shirt | level5 |  | đỉnh | rộng 152 | 5 |
| l5src_l5_clothespin | 0,0,1254,1254 | l5_clothespin | level5 |  | đỉnh | cao 40 | 5 |
| l5src_l5_cactus_pot | 0,0,1254,1254 | l5_cactus_pot | level5 |  | đáy | rộng 108 | 5 |
| l5src_l5_cactus_flower | 0,0,1254,1254 | l5_cactus_flower | level5 |  | đáy | rộng 36 | 5 |
| l5src_l5_vanity_table | 0,0,1254,1254 | l5_vanity_table | level5 |  | đáy | rộng 366 | 5 |
| l5src_l5_mirror_small | 0,0,1254,1254 | l5_mirror_small | level5 |  | đáy | rộng 156 | 5 |
| l5src_l5_trash_bag_idle | 0,0,1254,1254 | l5_trash_bag_idle | level5 |  | đáy | rộng 282 | 5 |
| l5src_l5_trash_bag_after | 0,0,1254,1254 | l5_trash_bag_after | level5 |  | đáy | rộng 238 | 5 |
| l5src_l5_cardboard_box | 0,0,1254,1254 | l5_cardboard_box | level5 |  | đáy | rộng 336 | 5 |
| l5src_l5_tin_lid | 0,0,1254,1254 | l5_tin_lid | level5 |  | đáy | rộng 174 | 5 |
| l5src_l5_slippers | 0,0,1254,1254 | l5_slippers | level5 |  | đáy | rộng 216 | 5 |
| l5src_l5_slippers_flipped | 0,0,1536,1024 | l5_slippers_flipped | level5 |  | đáy | rộng 255 | 5 |
| l5src_l5_crow_idle | 0,0,1254,1254 | l5_crow_idle | level5 |  | đáy | rộng 100 | 5 |
| l5src_l5_crow_far | 0,0,1254,1254 | l5_crow_far | level5 |  | đáy | rộng 97 | 5 |
| l5src_l5_awning_rolled | 0,0,1904,826 | l5_awning_rolled | level5 |  | đỉnh | rộng 757 | 5 |
| l5src_l5_awning_down | 0,0,1536,1024 | l5_awning_down | level5 |  | đỉnh | rộng 757 | 5 |
| l5src_l5_awning_cord | 0,0,1024,1536 | l5_awning_cord | level5 |  | đỉnh | cao 250 | 5 |
| l5src_l5_gecko | 0,0,1254,1254 | l5_gecko | level5 |  | tâm | rộng 58 | 5 |
| l5src_l5_milk_can | 0,0,1254,1254 | l5_milk_can | level5 |  | đáy | rộng 74 | 5 |
| l5src_l5_bike | 0,0,1536,1024 | l5_bike | level5 |  | đáy | rộng 415 | 5 |
| l5src_l5_bike_wheel | 0,0,1254,1254 | l5_bike_wheel | level5 |  | tâm | rộng 150 | 5 |
| l5src_l5_cd_placed | 0,0,1536,1024 | l5_cd_placed | level5 |  | đáy | rộng 90 | 5 |
| l5src_l5_cd_hanging | 0,0,1254,1254 | l5_cd_hanging | level5 |  | đỉnh | rộng 90 | 5 |
| l5src_l5_cart | 0,0,1774,887 | l5_cart | level5 |  | đáy | rộng 536 | 5 |
| l5src_l5_drain_pipe | 0,0,1052,1495 | l5_drain_pipe | level5 |  | đáy | cao 936 | 5 |
| l5src_l5_puddle | 0,0,1254,1254 | l5_puddle | level5 |  | tâm | rộng 164 | 5 |


### 5.2 Tách theo demo, lượt 5–7 (A5-13)

Như 5.1. Tư thế Mun vẽ riêng từng ảnh nên không chung nhóm: cỡ hiển thị chọn để **mắt Mun cùng cỡ** với `mun_pin_light` (đo bề rộng tròng vàng), riêng `mun_run` nhìn nghiêng lấy 240, `mun_peek_out` theo demo 106, `mun_eyes_dark` cùng tỉ lệ với `mun_peek_out` (Art lấy đúng đôi mắt từ ảnh ló mặt bằng mặt nạ, vì Codex vẽ hai mắt xa nhau). `mun_paw_reach` neo gốc chân (mép trái, giữa).

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l5src_l5_mirror_placed | 0,0,1254,1254 | l5_mirror_placed | level5 |  | đáy | rộng 90 | 5 |
| l5src_l5_tin_lid_placed | 0,0,1254,1254 | l5_tin_lid_placed | level5 |  | đáy | rộng 130 | 5 |
| l5src_l5_sunbeam | 0,0,1024,1536 | l5_sunbeam | level5 |  | đáy | cao 700 | 5 |
| l5src_l5_light_spot | 0,0,1254,1254 | l5_light_spot | level5 |  | tâm | rộng 106 | 5 |
| l5src_l5_icon_sun_covered | 0,0,1254,1254 | l5_icon_sun_covered | level5 |  | tâm | rộng 120 | 5 |
| l5src_mun_peek_out | 0,0,1254,1254 | mun_peek_out | cats |  | đáy | rộng 106 | 5 |
| l5src_mun_pin_light | 0,0,1254,1254 | mun_pin_light | cats |  | đáy | rộng 160 | 5 |
| l5src_mun_eyes_dark | 0,0,1254,1254 | mun_eyes_dark | cats |  | tâm | rộng 57 | 5 |
| l5src_mun_paw_reach | 0,0,1254,1254 | mun_paw_reach | cats |  | 121,635 | rộng 150 | 5 |
| l5src_mun_run | 0,0,1254,1254 | mun_run | cats |  | đáy | rộng 240 | 5 |
| l5src_mun_pounce | 0,0,1254,1254 | mun_pounce | cats |  | đáy | rộng 220 | 5 |
| l5src_mun_look_paw | 0,0,1254,1254 | mun_look_paw | cats |  | đáy | rộng 194 | 5 |
| l5src_mun_held | 0,0,1024,1536 | mun_held | cats |  | đỉnh | cao 631 | 5 |
| l5src_mun_face_icon | 0,0,1254,1254 | mun_face_icon | cats |  | tâm | rộng 300 | 5 |
| l5src_sua_press_window | 0,0,1254,1254 | sua_press_window | cats |  | đáy | rộng 205 | 5 |
| l5src_player_cover_nose | 0,0,1024,1536 | player_cover_nose | player |  | đáy | cao 452 | 5 |

## 6. Bảng vị trí

Theo `art/review/l5_dev_check/l5_block_layout.md` (bản khối đã duyệt). Sau khi demo duyệt, đo lại trên demo và ghi vào đây như L4.

## 7. Ảnh demo

Tranh dựng cảnh, không dùng trong game, lưu ở `art/out/demo/`. **Từ G5-21 trình khung 1080x1920 (9:16)**: cảnh vẽ dư trên dưới, ghép lớp UI thật của game (A5-9). Vẽ đúng bố cục bản khối (ảnh `layout/*_clean.png`), đồ đúng mục 1–3, **chỉ chứa key có thật**. Mỗi lượt đính kèm: `art/ref/owner_l1_style_ref.png`, một demo level 1, `art/ref/l1_depth_angle_ref.png`, ảnh khối sạch của phòng, và ảnh tham chiếu nhân vật cần dùng.

Giao diện như L4: ♥ + 6 vòng trống, bong bóng nhiệm vụ mèo đen dấu hỏi, ⏸, túi đồ 4 ô, 💡, mũi tên chuyển phòng.

- `l5_demo_yard`: sân sau lúc mở màn, đủ đồ, Sữa áp kính. Mũi tên ►. Túi trống.
- `l5_demo_alley`: hẻm lúc **đã kéo bạt** (bạt cuộn), có:
  - dải nắng xuống A;
  - 3 đồ đã đặt: nắp ở A, gương ở B, CD trong giỏ xe;
  - đốm sáng ở F trước gầm;
  - **Mun ló mặt** ở mép phải gầm;
  - quạ, thạch sùng, ống bơ, vũng nước, ống nước.

  Không vẽ tia phản chiếu và quầng (code). Mũi tên ◄. Túi trống.
- `l5_demo_reveal` (nếu được): hẻm như trên nhưng Mun **đè hai chân trước lên đốm sáng** trên đất bên trái xe (300, 1135), đuôi dài, mắt vàng to.
