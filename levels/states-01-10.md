# Trạng thái đồ vật và animation · Level 1–10

[← Luật chung](../leveldesign.md) · [Mô tả level 1–10](levels-01-10.md)

> File này dành cho **art và dev**. Mỗi level liệt kê: thứ tự lớp hiển thị, từng đồ vật với **ảnh của từng trạng thái**, điều kiện chuyển trạng thái, phản hồi khi chạm, âm thanh, tư thế mèo và kịch bản cảnh.
>
> - Tên hiệu ứng (`wiggle`, `squash`, `swap`…) và kiểu đồ vật chuẩn: xem [leveldesign.md](../leveldesign.md) mục 5.
> - Tư thế mèo cơ bản, đôi tay bế, bong bóng nhiệm vụ: xem [leveldesign.md](../leveldesign.md) mục 6.
> - Key ảnh = tên file bỏ `.png`, theo quy tắc `art/style.md` mục 4. Key đánh dấu **(có)** là đã có trong `art/design-art-levelN.md`; key đánh dấu **(mới)** là cần bổ sung vào file art.
> - Key âm thanh: `sfx_...` dùng chung, `lN_sfx_...` riêng level, `sua_sfx_...` / `mun_sfx_...` tiếng mèo.

---

## 0. Ảnh dùng chung còn thiếu (vẽ một lần cho cả game)

| Key | Thư mục | Kích thước | Mô tả |
|---|---|---|---|
| `ui_speech_bubble` | `common/` | 1024x1024 | Bong bóng lời thoại tròn trắng kem, viền nâu run tay, đuôi nhọn chỉ xuống. Bên trong trống |
| `ui_cat_head_dark` | `common/` | 1024x1024 | Bóng đầu mèo tím than nhạt, chỉ hai tai và viền đầu, không mặt |
| `ui_arrow_left`, `ui_arrow_right`, `ui_arrow_up`, `ui_arrow_down` | `common/` | 1024x1024 | Mũi tên chuyển phòng: mũi tên mập tròn màu kem, viền nâu, có bóng nhẹ. 4 hướng (hoặc vẽ 1 hướng, dev xoay) |
| `ui_close_button` | `common/` | 1024x1024 | Nút đóng cận cảnh: hình tròn hồng đào, giữa là dấu nhân mập màu kem (ký hiệu, không phải chữ) |
| `ui_minimap_frame` | `common/` | 1024x1024 | Khung bản đồ mini: tấm giấy kem bo góc, viền nâu |
| `ui_minimap_room`, `ui_minimap_room_current` | `common/` | 1024x1024 | Ô phòng trên bản đồ: ô vuông bo góc màu kem (thường) / vàng bơ (đang đứng) |
| `ui_minimap_eyes`, `ui_minimap_paw` | `common/` | 1024x1024 | Biểu tượng nhỏ trên bản đồ: đôi mắt vàng / dấu chân mèo |
| `ui_bag_bar`, `ui_bag_slot` | `common/` | 1536x1024 / 1024x1024 | Thanh túi đồ dưới đáy (dải vải kem) và ô túi (ô tròn bo góc màu be) |
| `ui_star_frame` | `common/` | 1024x1024 | Viền sao lấp lánh quanh bong bóng khi gặp mèo mới |
| `player_hands_lift` | `player/` | 1024x1536 | Đôi tay bế mèo (xem leveldesign mục 6.2). Cẳng tay và ống tay áo kéo tới mép dưới canvas (đổi từ 1024x1024 khi chốt level 1) |
| `sua_held`, `mun_held` | `cats/` | 1024x1536 | Dáng bế chung (không vẽ tay) |
| `sua_face_icon`, `mun_face_icon` | `cats/` | 1024x1024 | Mặt mèo cho bong bóng nhiệm vụ |
| `sua_sleep_curl`, `mun_sleep_curl`, `mun_sit_look`, `mun_run` | `cats/` | 1024x1024 / 1536x1024 | Tư thế cơ bản (leveldesign mục 6.1) |

**Âm dùng chung:** `sfx_tap` (chạm chỗ trống, rất nhẹ), `sfx_pickup`, `sfx_drop`, `sfx_merge`, `sfx_wrong`, `sfx_sparkle`, `sfx_heart`, `sfx_win`, `sfx_room_swipe` (chuyển phòng), `sfx_closeup_open`, `sfx_closeup_close`, `sfx_meow_question` (bong bóng nhiệm vụ).

---

## Level 1 — Hộp pate thần kỳ

> Đồng bộ với `art/design-art-level1.md` và `art/review/level1-thread.md` (vòng 5). Toạ độ, cỡ hiển thị: design-art mục 1 và bảng vị trí mục 6. Điểm neo thật: `art/out/anchors.json`. Mọi đồ chạm được có vùng chạm với cạnh ngắn ≥ 115px (P6); ảnh nhỏ hơn thì code nới vùng chạm.

### Lớp hiển thị (dưới → trên)

1. `l1_bg_living_room` (nền)
2. Các đồ vật sau:
   - Đồng hồ: `l1_wall_clock_pendulum` nằm sau thân, khoen khuất sau đáy thân; thân `l1_wall_clock_closed` / `l1_wall_clock_open`; `l1_wall_clock_bird` đặt trước lỗ vòm, ẩn khi không kêu.
   - Chậu cây: `l1_plant` (frame `pot` ở dưới, frame `leaves` ở trên) và `prop_butterfly` đậu trên lá.
   - Thảm: `l1_rug_flat` / `l1_rug_curled`.
3. `l1_box_*` (hộp các-tông, đặt trên thảm)
4. `l1_pate_can_closed`: nằm trên **bệ cửa sổ**, lớp dưới rèm: rèm đóng thì khuất hẳn, rèm mở thì lộ ra (G10).
5. `l1_sofa_cushion_flat` (đệm phải, tĩnh), `sua_tail_peek` (ngay dưới gối / dưới rèm), hai gối `l1_pillow_white_*` (gối phải là cùng ảnh lật ngang)
6. `l1_curtain_*` (khi đóng chia hai frame `left`/`right`), dải nắng (code)
7. Mèo (`sua_*`). Sau khi lăn xuống thảm, hộp pate (`l1_pate_can_*`) và hơi thơm (`l1_pate_can_steam`) chuyển lên **trên** Sữa, để `sua_eat` chúi mõm vào hộp.
8. Nhân vật (`player_*`)
9. Giao diện: bong bóng nhiệm vụ, thanh ♥, nút 💡 (level 1 chưa có túi đồ)

### Đồ vật

| # | Đồ vật | Ảnh trạng thái | Bắt đầu | Thao tác | Điều kiện | Chuyển sang | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|---|---|
| 1 | Rèm | `l1_curtain_closed`, `l1_curtain_open` | closed | Vuốt ngang / chạm | — | closed ↔ open | Mở: hai frame `left`/`right` co scaleX về hai mép ngoài 0,25 giây rồi `swap`; dải nắng vàng bơ (code) hiện dần; **lộ hộp pate trên bệ cửa sổ** (lần đầu). Nếu Sữa đang nấp sau rèm: Sữa bật ra 0,2 giây rồi vụt chạy ra khỏi màn hình, biến mất. Rèm đóng mở thoải mái: khi hộp còn trên bệ, đóng rèm thì rèm che hộp (hộp không nhận chạm, tay hướng dẫn và lấp lánh trên hộp tắt), mở lại thì hộp lộ và nhận chạm lại. Khi Sữa nấp sau rèm: rèm phồng nhẹ lặp lại, đuôi thò dưới mép rèm | `sfx_cloth` |
| 2 | Đồng hồ tường | `l1_wall_clock_closed`, `l1_wall_clock_open` (cửa vòm mở hé, lỗ tối), `l1_wall_clock_bird`, `l1_wall_clock_pendulum` | closed | Chạm | — | open 0,6 giây rồi về closed | Lúc thường: quả lắc tự đung đưa ±6°, 1 giây mỗi nhịp. Chạm: `swing` quả lắc ±14° tắt dần, `swap` sang open; chim thò ra từ lỗ (scale 0,4 → 1,1 → 1, nhô ra 20px), gật mỏ 2 lần quanh gốc que, thụt vào, `swap` về closed | `l1_sfx_cuckoo` |
| 3 | Đệm sofa phải | `l1_sofa_cushion_flat` | — | — | — | — | Tĩnh, không tương tác (G10). `l1_sofa_cushion_lifted` không còn dùng | — |
| 3a | Hộp pate | `l1_pate_can_closed`, `l1_pate_can_open`, `l1_pate_can_steam`, `fx_pop` | ẩn trên bệ cửa sổ | Chạm lần 1 | rèm đang mở | trên bệ → giữa màn hình | Hộp bay ra giữa màn hình, phóng to (~280px), lơ lửng nhún nhẹ, tay hướng dẫn chỉ vào hộp. Trong lúc này rèm và các đồ khác không nhận chạm. Sữa đang trốn ở đâu thì biến mất (đuôi tắt) | `sfx_pickup` |
| 3a | Hộp pate | — | giữa màn hình | Chạm lần 2 | — | closed → open | "Kịch bản lộ diện"; sau khựng, hộp mở bay dần xuống, thu nhỏ về chỗ cạnh Sữa (`l1_pate_can_open` trong bảng vị trí) | `sfx_pop_can` |
| 3a | Hộp pate | — | open | Chạm | — | — | `disabled` | — |
| 4 | Gối trái 🎭 (Sữa trốn sau, đuôi thò ra) | `l1_pillow_white_idle`, `l1_pillow_white_flipped`; `sua_tail_peek` | idle | Chạm gối hoặc đuôi | — | idle → flipped (giữ) | `squash` → `swap`. Nếu Sữa đang trốn ở đây: Sữa bật ra 0,2 giây (`sua_sit_stare`, squash giật mình), rồi vụt chạy (`sua_run`, tween 0,4 giây, vệt bụi nhỏ) sang trốn sau **gối phải**; gối phải đã lật thì chạy ra khỏi màn hình, biến mất. Không có Sữa: `player_scratch_head` trồi lên 1 giây | `sfx_cushion_soft`, `sua_sfx_meow`, `sfx_cloth` |
| 4b | Gối phải 🎭 (cùng gối trắng, lật ngang, trên đệm phải) | như gối trái, lật ngang | idle | Chạm gối hoặc đuôi | — | idle → flipped (giữ) | Như gối trái; Sữa chạy tiếp sang trốn **sau rèm** (rèm đã mở thì chạy ra khỏi màn hình, biến mất) | như gối trái |
| 4 | Gối (cả hai) | — | flipped | Chạm | — | giữ | `wiggle` nhỏ, không âm | — |
| 5 | Hộp các-tông 🎭 | `l1_box_closed`, `l1_box_open_empty` | closed | Chạm lần 1 | — | closed → open_empty | `swap`; `player_shrug` trồi lên 1 giây (nhún vai: trống trơn) | `l1_sfx_box_flaps` |
| 5 | Hộp các-tông | — | open_empty | Chạm lần 2 | — | giữ | Hộp xoay ngược 180°, lắc 3 nhịp rồi về (code) | `l1_sfx_box_shake` |
| 5 | Hộp các-tông | `player_box_on_head` (tùy chọn) | open_empty | Chạm lần 3 | — | giữ | Nhân vật đội hộp lên đầu 1,5 giây, hộp trong cảnh ẩn trong lúc đó. Chưa có ảnh thì lặp phản hồi lần 2 | `l1_sfx_box_flaps` |
| 6 | Chậu cây | `l1_plant` (code cắt frame `leaves`/`pot` tại miệng chậu), `prop_butterfly` | — | Chạm | — | — | Chỉ frame `leaves` `wiggle` quanh gốc thân, chậu đứng yên. Bướm đang đậu bay một vòng 1 giây (vỗ cánh bằng scaleX) rồi đậu lại trên lá | `sfx_leaves` |
| 7 | Thảm | `l1_rug_flat`, `l1_rug_curled` (góc **trước bên trái** cuộn lên) | flat | Vuốt | — | curled 0,5 giây rồi về flat | `swap` 2 lần | `sfx_cloth` |

**Gợi ý (G10):** trước khi lộ hộp pate không có gợi ý tự động. Nút 💡: bàn chân mèo chỉ vào đuôi (Sữa đang trốn sau gối), hoặc vẽ đường vuốt ngang trên rèm (Sữa đã ở sau rèm hoặc đã biến mất). Sau khi lộ hộp, khi rèm đang mở: bàn tay hướng dẫn chỉ vào hộp (level 1), 8 giây hộp nảy nhẹ, 16 giây hộp lấp lánh; nút 💡 chỉ vào hộp. Rèm đang đóng (che hộp): không có gợi ý tự động, nút 💡 vẽ đường vuốt trên rèm.

### Trạng thái mèo

| Giai đoạn | Tư thế | Chuyển động | Chạm Sữa |
|---|---|---|---|
| Trốn (né tránh có chủ ý, G10) | `sua_tail_peek` thò ra sau gối trái → gối phải → dưới mép rèm | Đuôi ve vẩy ±12°, 0,6 giây mỗi nhịp | Chạm đuôi: như chạm gối/rèm ở chỗ đó (Sữa bật ra 0,2 giây rồi vụt chạy) |
| Chạy trốn | `sua_sit_stare` 0,2 giây → `sua_run` | Vụt chạy 0,4 giây, vệt bụi nhỏ | — |
| Sau khi biến mất, trước khi mở hộp | Không có trên màn hình | — | — |
| Vừa xuất hiện | `sua_sit_stare`: ngồi trên thảm, **bên trái** hộp pate (hộp đã rơi khỏi bệ và lăn tới trước sofa), mặt hướng sang phải nhìn xuống pate, cao khoảng 250 | **Hiện tức thì**, không tween vào | Thắng |
| Kêu meo | `sua_meow_up` | `hop` nhỏ | Thắng |
| Ăn | `sua_eat` ↔ `sua_eat_f2` | Đổi khung 0,25 giây mỗi nhịp, kèm gật đầu nhẹ; `glow_outline` | Thắng |

### Nhân vật

Nhân vật không đứng trong cảnh suốt màn (G3). Mở màn: bước vào giữa dưới rồi lui ra. Mỗi lần phản ứng: **trồi lên từ mép dưới** khoảng 1 giây (dịch lên 120px, `squash` nhỏ) rồi lặn xuống.

| Lúc | Tư thế |
|---|---|
| Mở màn | `player_call` |
| Chạm gối (không có Sữa) | `player_scratch_head` |
| Mở hộp các-tông trống | `player_shrug` |
| Sữa lộ diện | `player_surprised` |
| Chạm hộp lần 3 (tùy chọn) | `player_box_on_head` |

### Kịch bản mở màn

| Thời gian | Diễn biến |
|---|---|
| 0–0,3 giây | Mờ vào từ đen |
| 0–… | Đuôi Sữa (`sua_tail_peek`) thò ra sau gối trái, ve vẩy suốt cho tới khi bị chạm |
| 0,3–2 giây | `player_call` bước vào giữa dưới (tween lắc lư, không cần khung đi), âm `l1_sfx_player_call` (tiếng gọi không lời). Không có mèo chạy ra |
| 2–3,9 giây | Bong bóng nhiệm vụ (leveldesign mục 6.3). Nhân vật vẫn đứng gọi (gọi thêm một nhịp lúc 2,3 giây) |
| 3,6–4 giây | Bong bóng đang thu về góc; nhân vật lui xuống mép dưới |

### Kịch bản lộ diện (khi chạm hộp pate)

Trước mốc 0: chạm lần 1, hộp đã bay từ bệ cửa sổ ra giữa màn hình (0,45 giây) và lơ lửng; mốc 0 là chạm lần 2.


| Thời gian | Diễn biến |
|---|---|
| 0 | `fx_pop` bung tại miệng hộp, âm `sfx_pop_can` |
| 0,1 giây | `swap` hộp sang `l1_pate_can_open` |
| 0,1–0,6 giây | **Khựng:** dừng mọi tween trong cảnh (kể cả quả lắc), nhạc tắt |
| 0,6 giây | `sua_sit_stare` **xuất hiện tức thì** ở chỗ ngồi trên thảm, nhạc trở lại. Hộp mở bay dần xuống, thu nhỏ về chỗ bên phải Sữa (0,65 giây). Khi hộp đáp xuống, hơi thơm bắt đầu: 3 bản `l1_pate_can_steam` lệch pha, lật ngang ngẫu nhiên, bay lên, lắc, mờ dần, lặp lại. `player_surprised` trồi lên 1 giây |
| 0,6–1,4 giây | Bong bóng nhiệm vụ bay ra giữa màn hình: `ui_cat_head_dark` mờ dần, `sua_face_icon` hiện lên |
| 1,4–2,2 giây | `sua_meow_up`, âm `sua_sfx_meow_long` |
| 2,2 giây trở đi | `sua_eat` ↔ `sua_eat_f2` lặp, `glow_outline`. Bàn tay hướng dẫn chỉ vào Sữa (chỉ có ở level 1) |

### Danh sách ảnh

Toàn bộ đã có trong `art/design-art-level1.md` (vẽ theo tờ, cắt bằng `tools/sheet_cut.py`).

- **Riêng level 1:** `l1_bg_living_room`, `l1_sofa_cushion_flat` (thay `l1_sofa_cushion_bulge`; `l1_sofa_cushion_lifted` không còn dùng từ G10), `l1_pate_can_closed`, `l1_pate_can_open`, `l1_pate_can_steam`, `l1_box_closed`, `l1_box_open_empty`, `l1_pillow_white_idle`, `l1_pillow_white_flipped`, `l1_curtain_closed`, `l1_curtain_open`, `l1_wall_clock_closed`, `l1_wall_clock_open`, `l1_wall_clock_bird`, `l1_wall_clock_pendulum`, `l1_plant`, `l1_rug_flat`, `l1_rug_curled`.
- **Dùng chung, vẽ lần đầu ở level 1:** `prop_butterfly`, `fx_pop`, `sua_tail_peek`, `sua_run`, `sua_sit_stare`, `sua_meow_up`, `sua_eat`, `sua_eat_f2`, `sua_held`, `sua_face_icon`, `ui_cat_head_dark`, `ui_speech_bubble`, `ui_question_mark`, `ui_question_mark_white`, `ui_heart`, `player_call`, `player_scratch_head`, `player_surprised`, `player_shrug`, `player_hands_lift`, `player_box_on_head` (tùy chọn), `ui_hand_pointer`, `ui_hint_paw`, `ui_sparkle`, `ui_bulb_button`, `ui_dried_fish`.
- **Không có file riêng** (frame do code cắt): `l1_plant` → `leaves`/`pot`; `l1_curtain_closed` → `left`/`right`.
- **Đổi tên so với bản trước:**

  | Tên cũ | Tên mới |
  |---|---|
  | `l1_wall_clock` | `l1_wall_clock_closed` |
  | `l1_wall_clock_cuckoo` | `l1_wall_clock_open` + `l1_wall_clock_bird` + `l1_wall_clock_pendulum` |
  | `l1_rug` | `l1_rug_flat` |
  | `l1_pillow_white` | `l1_pillow_white_idle` |
  | `l1_butterfly` | `prop_butterfly` |
  | `l1_fx_pop` | `fx_pop` |
  | âm `l1_sfx_pop_can` | `sfx_pop_can` (dùng lại ở level 10) |

---

## Level 2 — Giỏ tất

### Lớp hiển thị

1. `l2_bg_bedroom`
2. `l2_ceiling_lamp`, `l2_coat_hook` + `l2_beanie_white_*`
3. `l2_wardrobe_*`, `l2_shoebox`, `l2_plush_cat*` (kệ nằm trong nền)
4. `l2_bed_blanket_*`, `l2_slipper` (ẩn dưới gầm), `l2_slippers_cat_*`, `l2_chair` + `l2_sweater_*`
5. `l2_sock_basket_*`, `l2_sock_ball` / `l2_sock_unrolled`
6. `l2_curtain_*`
7. Tất đang bay (`l2_sock_striped`, `l2_sock_dotted`, `l2_sock_white_big`, `l2_sock_star`, `l2_sock_baby`, `l2_sock_long`), sau khi rơi nằm ở lớp của chỗ rơi
8. Giao diện

### Đồ vật

| # | Đồ vật | Ảnh trạng thái | Bắt đầu | Thao tác | Điều kiện | Chuyển sang | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|---|---|
| 1 | Rèm | `l2_curtain_closed`, `l2_curtain_open` (vệt nắng do code vẽ) | closed | Vuốt / chạm | — | closed ↔ open | `swap` | `sfx_cloth` |
| 1a | Dây buộc rèm 🎭 (như đuôi mèo, G2-7) | `l2_curtain_tie` (mới: dây bông trắng thò xuống, neo đỉnh ở chỗ buộc) | — | Chạm | — | — | `swing` dây ±22° tắt dần; rèm `wiggle` nhẹ | `sfx_cloth` |
| 2 | Mèo nhồi bông trắng 🎭 | `l2_plush_cat` (đặt trên kệ vẽ trong nền), `l2_plush_cat_fallen` (nằm ngửa dưới sàn) | idle | Chạm | — | idle → fallen (giữ) | `fly_arc` từ kệ xuống sàn | `l2_sfx_squeak` |
| 3 | Tủ quần áo | `l2_wardrobe_closed`, `l2_wardrobe_open` (quần áo **gấp** ngăn nắp từng ngăn, không treo; G2-7) | closed | Chạm | — | closed ↔ open | `swap` | `sfx_hinge` |
| 3a | Hộp giày 🎭 (G2-7) | `l2_shoebox_ears` (mới: nắp hé, hai tai mèo nhọn thò lên), `l2_shoebox_open` (mới: nắp bật), `l2_beanie_pink_cat` (mới: mũ len tai mèo hồng nhạt) | ears | Chạm | — | ears → open (giữ) | `swap`; mũ hồng nảy lên 150px rồi rơi lại vào hộp; chạm lại: `hop` nhỏ | `l1_sfx_box_flaps` |
| 4 | Chăn 🎭 | `l2_bed_blanket_flat` (cục phồng rõ), `l2_bed_blanket_flipped` (không có gì: gối trắng, nệm trống) | flat | Vuốt | — | flat → flipped (giữ) | `swap`; `player_shrug` trồi lên | `sfx_cloth` |
| 5 | Gầm giường 🎭 (G2-7) | vùng chạm dải dưới ảnh giường; `l2_fur_rug_peek` (góc thảm thò ra dưới mép giường như bàn chân mèo, lớp sau giường) → `l2_fur_rug` (cả tấm thảm lông trắng, 4 túm lông như đệm chân) | peek | Chạm lần đầu | — | peek → thảm trượt ra sàn (giữ) | ẩn `_peek`, cả tấm thảm trượt ra chỗ `l2_fur_rug` trong bảng vị trí + `puff`; `player_scratch_head` | `l2_sfx_slide` |
| 5 | Gầm giường | — | — | Chạm lần sau | — | — | `wiggle` giường | `sfx_tap` |
| 6 | Chao đèn | `l2_ceiling_lamp` (mới, tách khỏi nền) | — | Chạm | — | — | `swing`; bóng đổ lắc theo | `l2_sfx_creak` |
| 7 | **Giỏ tất** | `l2_sock_basket_full` → `_2` → `_3` → `_reveal`; `_one_eye`, `_yawn` (Sữa vẽ liền trong giỏ, cùng khung) | full | Chạm (6 lần, G2-8) | cách lần trước ≥ 0,4 giây | full → 2 (lần 2) → 3 (lần 4) → reveal (lần 6) | Mỗi lần một chiếc tất bay (bảng dưới); lần 1, 3, 5 giỏ `hop` nhỏ, lần 2, 4, 6 `swap`. Giỏ tĩnh, không `breathe` (G2-8) | `l2_sfx_sock_whoosh` |
| 7 | Giỏ tất | — | reveal | Chạm vào giỏ (ngoài Sữa) | — | — | `wiggle` nhỏ | — |
| 8 | Mũ len trắng 🎭 | `l2_coat_hook` (mới), `l2_beanie_white_idle` (mới: treo móc, 2 quả bông như tai), `l2_beanie_white_floor` (mới: nằm dưới sàn) | idle | Chạm | — | idle → floor (giữ) | `fly_arc` xuống sàn; nhân vật đội thử: `player_wear_beanie` (mới) 1,2 giây | `sfx_cushion_soft` |
| 9 | Cuộn tất trắng 🎭 | `l2_sock_ball` (mới: cuộn tròn như mèo con), `l2_sock_unrolled` (mới: chiếc tất dài nằm giữa sàn) | idle | Chạm | — | idle → unrolled (giữ) | Lăn ra giữa phòng: dịch 120px + xoay 540°, 0,5 giây, rồi `swap` | `l2_sfx_boing` |
| 10 | Dép bông trắng tai mèo 🎭 | `l2_slippers_cat_idle` (mới), `l2_slippers_cat_after` (mới: một chiếc lật nghiêng, tai cụp) | idle | Chạm | — | idle → after (giữ) | `squash` 2 lần (tai vểnh rồi cụp) rồi `swap` | `l2_sfx_squeak_double` |
| 11 | Áo len trắng cuộn 🎭 | `l2_chair` (mới), `l2_sweater_rolled` (mới), `l2_sweater_unrolled` (mới: bung ra, hai tay áo thõng xuống mép ghế) | rolled | Chạm | — | rolled → unrolled (giữ) | `squash` → `swap` | `sfx_cloth` |

**Tất bay ra từ giỏ:**

| Lần chạm | Ảnh | Bay tới | Đường bay | Sau khi rơi |
|---|---|---|---|---|
| 1 | `l2_sock_striped` (có) | Đầu giường | `fly_arc` cao, xoay 1 vòng, 0,6 giây | Nằm im trên đầu giường tới hết màn |
| 2 | `l2_sock_dotted` (có) | Chao đèn | `fly_arc` lên trên, 0,6 giây | Vắt trên chao đèn, đèn `swing` |
| 3 | `l2_sock_white_big` (có) | Núm tủ | `fly_arc` sang phải, 0,6 giây | Vắt trên núm tủ |
| 4 | `l2_sock_star` (mới, ảnh tạm) | Lưng ghế | `fly_arc`, 0,6 giây | Vắt trên lưng ghế |
| 5 | `l2_sock_baby` (mới, ảnh tạm) | Kệ cạnh mèo nhồi bông | `fly_arc`, 0,6 giây | Nằm trên kệ |
| 6 | `l2_sock_long` (mới, ảnh tạm) | Thanh rèm | `fly_arc` cao, 0,6 giây | Vắt trên thanh rèm |

### Trạng thái mèo

| Giai đoạn | Tư thế | Chuyển động | Chạm Sữa |
|---|---|---|---|
| Mở màn | `sua_run` | Chạy vụt **từ trái sang phải** dọc phía sau phòng (quay mặt sang phải) 0,75 giây, **khuất sau ghế** (ngay trên giỏ), không hiện ra nữa; giỏ khẽ nhún một cái (VL2-2) | — |
| Trong giỏ (tất 0–5) | Nằm sẵn trong ảnh giỏ, lẫn hẳn vào tất | Giỏ đứng yên (G2-8); tiếng ngáy `sua_sfx_snore` lặp, rất nhỏ, to dần 6 nấc theo số tất đã bay ra | Chạm vào giỏ = lật thêm 1 chiếc tất (Ẩn) |
| Lộ ra | `l2_sock_basket_reveal` | `zzz` | Thắng |
| Hé mắt | `l2_sock_basket_one_eye` | 0,8 giây | Thắng |
| Ngáp | `l2_sock_basket_yawn` | 0,8 giây | Thắng |
| Ngủ tiếp | `l2_sock_basket_reveal` | `zzz` + `glow_outline` vùng Sữa | Thắng |

**Vùng chạm Sữa** ở trạng thái reveal: chỉ phần thân Sữa trong giỏ (dev vẽ tay vùng đa giác).

### Kịch bản lộ diện (chạm giỏ lần 6)

| Thời gian | Diễn biến |
|---|---|
| 0 | Tất dài bay ra (bảng trên), `swap` giỏ sang `_reveal` |
| 0,3–1,0 giây | Hình Sữa hiện dần: bật một lớp viền mờ quanh Sữa từ 0 → 100% (tai → đuôi → mũi) |
| 1,0 giây | Bong bóng nhiệm vụ tô màu `sua_face_icon` |
| 1,5 giây | `l2_sock_basket_one_eye` 0,8 giây |
| 2,3 giây | `l2_sock_basket_yawn` 0,8 giây, âm `sua_sfx_yawn` |
| 3,1 giây → | Về `_reveal`, `zzz`, `glow_outline` |

### Danh sách ảnh

- **Có sẵn:** toàn bộ 20 ảnh trong `design-art-level2.md`.
- **Đổi tên (A2-4/VL2-5):** `sua_one_eye_open` → `l2_sock_basket_one_eye`, `sua_yawn` → `l2_sock_basket_yawn`; không có sprite `l2_shelf` (kệ trong nền). **Gợi ý:** không có gợi ý theo giờ (G2-2); 💡 chỉ vào giỏ.
- **Cần thêm:** `l2_ceiling_lamp` (nền phải bỏ chao đèn), `l2_plush_cat_fallen`, `l2_coat_hook`, `l2_beanie_white_idle`, `l2_beanie_white_floor`, `player_wear_beanie`, `l2_sock_ball`, `l2_sock_unrolled`, `l2_slippers_cat_idle`, `l2_slippers_cat_after`, `l2_chair`, `l2_sweater_rolled`, `l2_sweater_unrolled`, `l2_sock_star`, `l2_sock_baby`, `l2_sock_long` (G2-8; game dùng ảnh tạm tới khi có).
- **Lưu ý màu:** 4 đồ ngụy trang mới phải **trắng ấm cùng tông với Sữa**, tròn, cỡ bằng Sữa cuộn tròn. Dép gầm giường `l2_slipper` (hồng, tai thỏ) giữ nguyên, khác với dép ngụy trang tai mèo.

---

## Level 3 — Quà xịn, hộp còn xịn hơn

### Lớp hiển thị

1. `l3_bg_living_room_afternoon` (có thể dùng lại bố cục nền level 1, ánh chiều vàng hơn)
2. `l3_vase`, `l1_pillow_white_*` (dùng lại)
3. `l3_cat_tree` + `l3_pompom` (sau khi đặt)
4. `l3_gift_box_*` / `l3_box_*`
5. `l3_scissors` (trên bàn)
6. `l3_curtain_closed` + bóng Sữa (`sua_shadow`, code tạo từ `sua_sit_stare` tô đen 35% độ mờ, đặt **sau** rèm)
7. Mèo, nhân vật (`player_sad`), `l3_courier_arm`
8. Giao diện + túi đồ (`ui_bag_bar` trượt lên lần đầu)

### Đồ vật

| # | Đồ vật | Ảnh trạng thái | Bắt đầu | Thao tác | Điều kiện | Chuyển sang | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|---|---|
| 1 | Rèm + bóng Sữa | `l3_curtain_closed` (mới), `sua_shadow` (code) | Sữa ở góc trái rèm | Chạm / vuốt vào bóng | Sữa chưa bị dụ ra | Bóng chạy sang góc phải (hoặc qua gầm sofa rồi về rèm, luân phiên) | Bóng trượt nhanh 0,3 giây; rèm `wiggle` | `sua_sfx_meow_playful` |
| 1 | Rèm | — | — | Chạm lần 3, 6, 9… | — | — | Thay vì chạy: `sua_peek_tongue` (mới) thò đầu khỏi mép rèm 0,8 giây rồi thụt vào | `sua_sfx_blep` |
| 2 | Cây kéo | `l3_scissors` (mới) | trên bàn | Chạm | — | vào túi | `fly_to_bag` | `sfx_pickup` |
| 3 | Hộp quà | `l3_gift_box_taped` (mới: băng dính chữ thập) | taped | Chạm | chưa đặt kéo | giữ | `wiggle` + băng dính `shake_no` | `l3_sfx_box_thud` |
| 3 | Hộp quà | `l3_gift_box_open` (mới: 4 nắp bung, thấy 2 mảnh cột cào bên trong) | taped | Đặt kéo | — | taped → open → (0,4 giây) **úp** | Kéo tự cắt (tween kéo trượt dọc băng dính 0,3 giây), `swap` open, 2 mảnh `fly_to_bag`, rồi hộp `hop` + xoay 180° 0,35 giây, `swap` sang `l3_box_upside_down` | `l3_sfx_scissors_cut`, `l3_sfx_paper_rip`, `l3_sfx_box_thud` |
| 3' | Hộp úp | `l3_box_upside_down` (mới) | úp | Chạm | **Sữa chưa biến mất** | — | `disabled` | — |
| 3' | Hộp úp | — | úp | Chạm | Sữa đã biến mất | úp → `sua_in_box` (Sữa trong hộp ngửa) | `hop` + xoay 180°, `swap`, xem kịch bản | `l3_sfx_box_thud`, `sua_sfx_meow_question` |
| 4 | Gối lông trắng 🎭 | dùng lại `l1_pillow_white_idle`, `l1_pillow_white_flipped` | idle | Chạm | — | idle → flipped | `squash` → `swap` | `sfx_cushion_soft` |
| 5 | Lọ hoa 🎁 | `l3_vase` (mới) | — | Chạm | — | — | `tilt_back`; `ui_dried_fish` bay ra (một lần) | `sfx_clink` |
| 6 | Thảm (chỗ đặt cột cào) | vùng trong nền | trống | Đặt cột cào | — | có cột cào | `drop_in` cột cào `l3_cat_tree` (mới) + `l3_pompom` (mới, sprite riêng treo trên đỉnh) | `sfx_drop` |
| 6' | Cột cào | `l3_cat_tree`, `l3_pompom` | — | Chạm | Sữa đã biến mất | — | `l3_pompom` `swing`, không có ai vồ | `l3_sfx_pompom` |

**Đồ trong túi:** `l3_scissors` (icon), `l3_post_body` (mới: thân cột cào), `l3_post_base` (mới: đế), ghép → `l3_cat_tree_icon` (dùng `l3_cat_tree` thu nhỏ).

**Ghép sai** (thân lên kéo, đế lên kéo): `shake_no` hai món, `sfx_wrong`.

### Trạng thái mèo

| Giai đoạn | Tư thế | Chuyển động | Chạm Sữa |
|---|---|---|---|
| 1. Sau rèm (Lẩn tránh) | `sua_shadow` (code) | Lặng lẽ `breathe` | Chạy sang góc khác |
| 2. Vồ quả bông (Lẩn tránh) | `sua_run` → `sua_pounce` (mới) → `sua_scratch_post` (mới: đứng hai chân cào thân cột cào) | Chạy từ rèm tới cột cào 0,6 giây; vồ 2 lần, mỗi lần `l3_pompom` `swing` | **Chạy vụt ra sau cột cào, biến mất ngay** (sang giai đoạn 3) |
| 3. Biến mất (Ẩn) | Không hiện | Hộp úp: mép nhấc lên 6° rồi hạ, 0,2 giây | — |
| 4. Trong hộp (Lộ diện) | `sua_in_box` (mới) | Đuôi ve vẩy, `breathe`, `glow_outline` | Thắng |

### Kịch bản sau khi đặt cột cào

| Thời gian | Diễn biến |
|---|---|
| 0–0,3 giây | `drop_in` cột cào, `l3_pompom` `swing` |
| 0,3–0,9 giây | `sua_peek_tongue` ló khỏi rèm, rồi `sua_run` chạy tới cột cào |
| 0,9–2,1 giây | `sua_pounce` 2 lần (mỗi lần 0,4 giây, quả bông `swing`), âm `sua_sfx_chirp` |
| 2,1–2,6 giây | `sua_scratch_post` 0,5 giây, âm `l3_sfx_scratch` |
| 2,6–3,0 giây | `sua_run` vòng ra sau cột cào, khuất. Hộp úp nhấc mép rồi hạ, âm `l3_sfx_box_tap` rất nhỏ. Hộp úp chuyển sang **nhận chạm** |
| 3,0 giây → | `player_scratch_head` 1 giây. Bắt đầu đếm gợi ý (8 giây: hộp `nudge` + `sua_tail_peek` thò dưới mép hộp 0,6 giây) |

### Kịch bản lộ diện (chạm hộp úp)

| Thời gian | Diễn biến |
|---|---|
| 0–0,35 giây | Hộp `hop` + xoay 180°, `swap` sang `sua_in_box` |
| 0,35–1,1 giây | Bong bóng tô màu `sua_face_icon`. `player_sad` (mới: đứng cạnh cột cào, vai xuôi, mặt buồn hiu) |
| 1,1 giây → | `glow_outline` quanh Sữa trong hộp |

### Danh sách ảnh (tất cả mới, cần tạo `design-art-level3.md`)

`l3_bg_living_room_afternoon`, `l3_curtain_closed`, `l3_scissors`, `l3_gift_box_taped`, `l3_gift_box_open`, `l3_box_upside_down`, `l3_post_body`, `l3_post_base`, `l3_cat_tree`, `l3_pompom`, `l3_vase`, `l3_courier_arm` (cánh tay shipper đặt hộp qua khung cửa), `sua_peek_tongue`, `sua_pounce`, `sua_scratch_post`, `sua_in_box`, `sua_tail_peek`, `player_sad`. Dùng lại: `l1_pillow_white_idle`, `l1_pillow_white_flipped`, `sua_run`.

---

## Level 4 — Vòi nước nhỏ giọt

### Lớp hiển thị

**Nhà tắm:** `l4_bg_bathroom` → `l4_bathtub` + `l4_rubber_duck` → `l4_towel_rack` + `l4_towel_rolled*` → `l4_sink` + `l4_faucet` → nước (`l4_water_gush` / `l4_water_drip`, sprite phủ lên vòi) → `l4_mirror_cabinet` (+ `l4_mirror_fog` phủ) → Sữa trên nóc tủ → giao diện.

**Bếp:** `l4_bg_kitchen` → `l4_cookie_jar`, `l4_water_bowl` → `l4_kitchen_sink` → `l4_sink_cabinet_*` + `l4_valve` → giao diện.

### Đồ vật

| # | Phòng | Đồ vật | Ảnh trạng thái | Bắt đầu | Thao tác | Điều kiện | Chuyển sang | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Nhà tắm | Đuôi Sữa trên nóc tủ gương | `sua_tail_peek` | trên tủ gương | Chạm | Sữa đang trên cao | Sữa nhảy sang nóc giá khăn | `sua_jump` (mới) bay cong 0,4 giây, rồi `sua_tail_peek` ở chỗ mới | `sua_sfx_meow_short` |
| 1 | Nhà tắm | Đuôi Sữa trên giá khăn | `sua_tail_peek` | — | Chạm | — | nhảy về nóc tủ gương | như trên | như trên |
| 2 | Nhà tắm | Vòi rửa mặt | `l4_faucet` (mới) | khô | Vuốt xoay (bất kỳ) | **van chưa mở** | giữ khô | `wiggle`; bong bóng suy nghĩ vẽ `l4_valve_icon` (mới) | `l4_sfx_pipe_gurgle` |
| 2 | Nhà tắm | Vòi | + `l4_water_gush` (mới) | khô | Vuốt xoay **dài** (≥ 120px) | van đã mở | khô → **xối** | Sprite nước xối hiện, hạt nước bắn (particle); Sữa giật mình (bảng mèo) | `l4_sfx_water_gush` (lặp) |
| 2 | Nhà tắm | Vòi | + `l4_water_drip` (mới) | khô | Vuốt xoay **ngắn** (< 120px) | van đã mở | khô → **nhỏ giọt** | Giọt nước rơi đều 0,8 giây/giọt (tween giọt từ vòi xuống bồn) | `l4_sfx_drip` mỗi giọt |
| 2 | Nhà tắm | Vòi | — | xối | Vuốt ngược (bất kỳ độ dài) | — | xối → nhỏ giọt | Như trên | Dừng `l4_sfx_water_gush` |
| 2 | Nhà tắm | Vòi | — | nhỏ giọt | Vuốt ngược | Sữa chưa xuống | nhỏ giọt → khô | Ẩn sprite nước | — |
| 2 | Nhà tắm | Vòi | — | nhỏ giọt | Bất kỳ | **Sữa đã xuống bồn** | khóa ở nhỏ giọt | `disabled` | — |
| 2' | Nhà tắm | Gương mờ | `l4_mirror_fog` (mới, phủ lên gương) | — | (tự động) | nước xối liên tục ≥ 3 giây | hiện mờ dần 1 giây | — | — |
| 3 | Nhà tắm | Khăn trắng cuộn 🎭 | `l4_towel_rolled` (mới), `l4_towel_fallen` (mới: rơi dưới sàn, bung ra) | idle | Chạm | — | idle → fallen (giữ) | `fly_arc` xuống sàn | `sfx_cloth_drop` |
| 4 | Nhà tắm | Vịt cao su | `l4_rubber_duck` (mới) | — | Chạm | — | — | `hop` + xoay 360° | `l4_sfx_duck` |
| 5 | Bếp | Tủ dưới bồn | `l4_sink_cabinet_closed`, `l4_sink_cabinet_open` (mới) | closed | Chạm | — | closed ↔ open | `swap` | `sfx_hinge` |
| 6 | Bếp | Van đỏ | `l4_valve` (mới, sprite riêng để xoay) | đóng | Vuốt xoay | tủ đang mở | đóng → mở (không đóng lại được) | Xoay 90° 0,4 giây; vệt rung chạy dọc ống về phía nhà tắm | `l4_sfx_valve`, `l4_sfx_pipe_rumble` (âm định hướng sang trái) |
| 7 | Bếp | Vòi bếp | `l4_kitchen_sink` (mới) | — | Chạm | — | — | Một giọt rơi | `l4_sfx_drip` |
| 8 | Bếp | Bát nước của Sữa | `l4_water_bowl` (mới) | — | Chạm | — | — | Gợn sóng (vòng tròn nở trên mặt nước) | `l4_sfx_bloop` |
| 9 | Bếp | Hũ bánh quy 🎁 | `l4_cookie_jar` (mới) | — | Chạm | — | — | `hop` nắp; `ui_dried_fish` (một lần) | `sfx_lid` |

### Trạng thái mèo

| Giai đoạn | Tư thế | Chuyển động | Chạm Sữa |
|---|---|---|---|
| Mở màn | `sua_run` → `sua_jump` | Chạy vào, nhảy lên nóc tủ gương | — |
| Trên cao (Lẩn tránh) | `sua_tail_peek` | Đuôi ve vẩy | Nhảy sang chỗ cao kia |
| Nước xối | `sua_cover_face` (mới: thò đầu, một chân che mặt) | Rụt sâu: dịch lên 20px, chỉ còn chóp tai | Nhảy sang chỗ cao kia |
| Nghe nhỏ giọt | `sua_peek_down` (mới: thò đầu nhìn xuống, tai dựng) | Chờ 2 giọt (1,6 giây) | Nhảy sang chỗ cao kia (Lẩn tránh vẫn còn) |
| Nhảy xuống | `sua_jump` | Bay cong từ chỗ cao xuống bồn rửa 0,5 giây | — |
| Uống nước (Lộ diện) | `sua_drink` (mới: nghiêng đầu thè lưỡi dưới vòi) | Lặp; mỗi 3 giọt một lần `sua_head_shake` (mới, 0,4 giây) | **Thắng** |
| Uống xong | `sua_lick_lips` (mới: ngồi trong bồn liếm mép, mặt lấm tấm nước) | `glow_outline` | **Thắng** |

### Danh sách ảnh (tất cả mới, cần tạo `design-art-level4.md`)

`l4_bg_bathroom`, `l4_bg_kitchen`, `l4_mirror_cabinet`, `l4_mirror_fog`, `l4_sink`, `l4_faucet`, `l4_water_gush`, `l4_water_drip`, `l4_valve_icon`, `l4_towel_rack`, `l4_towel_rolled`, `l4_towel_fallen`, `l4_bathtub`, `l4_rubber_duck`, `l4_kitchen_sink`, `l4_sink_cabinet_closed`, `l4_sink_cabinet_open`, `l4_valve`, `l4_water_bowl`, `l4_cookie_jar`, `sua_jump`, `sua_cover_face`, `sua_peek_down`, `sua_drink`, `sua_head_shake`, `sua_lick_lips`. Cảnh vào quán và mini game Tắm: đặc tả riêng ở file quán cafe (chưa viết).

---

## Level 5 — Đốm sáng

### Lớp hiển thị

**Sân sau:** `l5_bg_backyard` → `l5_cafe_window` (+ Sữa ở cửa sổ) → `l5_vanity_table` + `l5_mirror_small` → `l5_cardboard_box` → `l5_trash_bag_*` → giao diện.

**Hẻm:** `l5_bg_alley` (có bức tường đối diện) → `l5_sunbeam` (ẩn tới khi cuộn bạt) → `l5_light_spot` → `l5_cart` (+ vùng gầm tối) + `mun_*` dưới gầm → `l5_drain_pipe` → `l5_awning_*` → `l5_crow_*` → giao diện.

### Đồ vật

| # | Phòng | Đồ vật | Ảnh trạng thái | Bắt đầu | Thao tác | Điều kiện | Chuyển sang | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Sân sau | Thùng giấy cũ | `l5_cardboard_box` (mới) | — | Chạm lần đầu | — | — | `wiggle_strong`; `mun_run` vụt ra khỏi thùng chạy sang phải (0,5 giây), mũi tên sang hẻm nhấp nháy | `mun_sfx_scamper` |
| 1 | Sân sau | Thùng giấy | — | — | Chạm lần sau | — | — | `wiggle` | `sfx_tap` |
| 2 | Sân sau | Gương nhỏ | `l5_mirror_small` (mới) trên `l5_vanity_table` (mới) | trên bàn | Chạm | — | vào túi | `fly_to_bag`, lóe một tia sáng khi bay | `l5_sfx_glass_ting` |
| 3 | Sân sau | Túi rác đen 🎭 | `l5_trash_bag_idle` (mới), `l5_trash_bag_after` (mới: xẹp xuống, miệng túi mở) | idle | Chạm | — | idle → after | `squash` → `swap`; `player_cover_nose` (mới) 1 giây | `l5_sfx_plastic` |
| 4 | Sân sau | Cửa sổ quán | `l5_cafe_window` (mới), `sua_press_window` (mới: Sữa áp mặt vào kính) | — | Chạm | — | — | Sữa `hop` nhỏ trong cửa sổ | `sua_sfx_meow_question` |
| 5 | Hẻm | Tấm bạt mái hiên | `l5_awning_down` (mới: bạt thả che), `l5_awning_rolled` (mới: bạt cuộn lên) | down | Vuốt lên | — | down → rolled (giữ) | `swap`; `l5_sunbeam` (mới) hiện dần 0,5 giây | `l5_sfx_canvas_flap` |
| 6 | Hẻm | Vệt nắng (chỗ đặt gương) | `l5_sunbeam` | ẩn | Đặt gương | bạt đã rolled | có gương | `drop_in` gương (`l5_mirror_placed`, mới: gương dựng nghiêng); `l5_light_spot` hiện trên tường | `l5_sfx_glass_ting` |
| 6 | Hẻm | Vệt nắng | — | ẩn | Đặt gương | **bạt chưa cuộn** | — | `return_to_bag`; bạt `sparkle` | `sfx_wrong` |
| 7 | Hẻm | **Đốm sáng** | `l5_light_spot` (mới: chấm tròn trắng vàng có quầng mờ) | trên tường | **Giữ và kéo** | — | di chuyển theo ngón tay | Giới hạn trong vùng tường + mặt đất hẻm. Khi đứng yên: nhảy nhót nhẹ ±3px. Kéo quá nhanh: nháy 2 lần | `l5_sfx_light_hum` (rất nhẹ, khi di chuyển) |
| 8 | Hẻm | Gầm xe ba gác | `l5_cart` (mới) | — | Chạm | Mun dưới gầm | — | `mun_eyes_dark` lùi sâu (mục 6.1); bong bóng suy nghĩ vẽ `l5_light_spot` | `mun_sfx_hiss_tiny` |
| 9 | Hẻm | Quạ 🎭 | `l5_crow_idle` (mới: đậu dây điện, bóng đen tròn), `l5_crow_far` (mới: đậu xa hơn trên dây) | idle | Chạm | — | idle → far (giữ) | Bay cong sang chỗ mới 0,6 giây | `l5_sfx_crow` |
| 10 | Hẻm | Ống thoát nước 🎁 | `l5_drain_pipe` (mới) | — | Chạm | — | — | `wiggle`; `ui_dried_fish` (một lần) | `sfx_clink` |

**Luật đốm sáng (dev):**

| Điều kiện | Mun phản ứng |
|---|---|
| Đốm sáng cách gầm xe > 200px | Đôi mắt nhìn theo (mắt dịch theo hướng đốm sáng), không gì khác |
| Tốc độ kéo > 600px/giây | Mắt đảo theo, không động đậy; đốm sáng nháy 2 lần |
| Cách gầm xe ≤ 200px, tốc độ ≤ 600px/giây | `mun_paw_reach` (mới: một bàn chân đen thò ra vồ) mỗi 1 giây |
| Đốm sáng nằm trong vùng "giữa hẻm" và di chuyển chậm, cộng dồn ≥ 2 giây | **Mun phóng ra** (bảng mèo) |

### Trạng thái mèo

| Giai đoạn | Tư thế | Chuyển động | Chạm Mun |
|---|---|---|---|
| Dưới gầm (Lẩn tránh) | `mun_eyes_dark` (mới) | Nháy mắt mỗi 2–3 giây | Lùi sâu, hiện lại sau 2 giây |
| Vồ thử (Lẩn tránh) | `mun_paw_reach` (mới) | Bàn chân thò ra 0,4 giây rồi rụt | Rụt lại ngay |
| Phóng ra đuổi (Lộ diện) | `mun_run` → `mun_pounce` (mới) | Đuổi theo đốm sáng: luôn chạy tới vị trí đốm sáng 0,5 giây trễ | **Thắng** |
| Đè đốm sáng (Lộ diện) | `mun_pin_light` (mới: hai chân trước đè xuống đất) → `mun_look_paw` (mới: nhấc chân nhìn lòng bàn chân, đốm sáng hiện trên mu chân) | 0,8 giây mỗi tư thế, `glow_outline` | **Thắng** |

**Bong bóng nhiệm vụ ở level này:** lúc vào màn nảy mạnh hơn (scale 0 → 1,3 → 1); lúc tô màu `mun_face_icon` có thêm `ui_star_frame`.

### Danh sách ảnh (tất cả mới)

`l5_bg_backyard`, `l5_bg_alley`, `l5_cafe_window`, `l5_vanity_table`, `l5_mirror_small`, `l5_mirror_placed`, `l5_cardboard_box`, `l5_trash_bag_idle`, `l5_trash_bag_after`, `l5_awning_down`, `l5_awning_rolled`, `l5_sunbeam`, `l5_light_spot`, `l5_cart`, `l5_crow_idle`, `l5_crow_far`, `l5_drain_pipe`, `player_cover_nose`, `sua_press_window`, `mun_eyes_dark`, `mun_paw_reach`, `mun_run`, `mun_pounce`, `mun_pin_light`, `mun_look_paw`.

---

## Level 6 — Túi giấy sột soạt

### Lớp hiển thị

`l6_bg_front_yard` → `l6_gate_*` → `l6_wind_chime` → `l6_flower_bush` (+ `mun_eyes_dark` bên trong, cắt theo bụi) → `l6_chair` + `l6_bread_bag_*` → `l6_paper_bag_*` (trên sân) → `l6_boot_black_*`, `l6_frog` → giao diện.

### Đồ vật

| # | Đồ vật | Ảnh trạng thái | Bắt đầu | Thao tác | Điều kiện | Chuyển sang | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|---|---|
| 1 | Bụi hoa | `l6_flower_bush` (mới) | — | Chạm | Mun trong bụi | — | `wiggle_strong` + vài cánh hoa bay ra; `mun_eyes_dark` lùi sâu | `sfx_leaves` |
| 2 | Túi bánh mì trên ghế | `l6_bread_bag_full` (mới), `l6_paper_bag_empty_chair` (mới: túi giấy rỗng dựng trên ghế) | full | Chạm | — | full → empty_chair | Ổ bánh mì `l6_bread` (mới) `fly_to_bag`; `swap` | `l6_sfx_paper_crinkle` |
| 3 | Túi giấy rỗng trên ghế | `l6_paper_bag_empty_chair` | empty_chair | Vuốt xuống (chạm cũng được) | — | rơi xuống sân → `l6_paper_bag_floor` (mới: nằm nghiêng, miệng túi hướng bụi hoa) | `fly_arc` ngắn xuống sân, `puff` | `l6_sfx_paper_thud` |
| 4 | Túi giấy trên sân | `l6_paper_bag_floor` | floor | Vuốt qua lại | — | đếm số lần vuốt | Túi `wiggle` theo hướng vuốt | `l6_sfx_paper_rustle` (to, rõ) |
| 4 | Túi giấy trên sân | — | floor | Chạm (không vuốt) | — | — | `wiggle` nhỏ; `mun_eyes_dark` ló ra rồi thụt vào | `l6_sfx_paper_crinkle` (nhỏ) |
| 4 | Túi giấy | `l6_paper_bag_mun` (mới: túi có 4 chân đen và đuôi thò ra), `l6_paper_bag_mun_peek` (mới: Mun thò đầu khỏi miệng túi) | floor | Vuốt qua lại lần **thứ 2** | — | → có Mun | Xem kịch bản | — |
| 5 | Ủng đen 🎭 | `l6_boot_black_idle` (mới: dựng như mèo ngồi), `l6_boot_black_fallen` (mới: đổ nghiêng), `l6_frog` (mới) | idle | Chạm | — | idle → fallen (giữ) | `swap`; ếch nhảy ra `hop` 3 lần rồi khuất | `l6_sfx_boot_thud`, `l6_sfx_frog` |
| 6 | Chuông gió | `l6_wind_chime` (mới) | — | Chạm | — | — | `swing`; Mun trong bụi vẫy tai (đôi mắt chớp) | `l6_sfx_chime` |
| 7 | Cổng | `l6_gate_closed`, `l6_gate_open` (mới) | closed | Chạm | — | open 1 giây rồi tự về closed | `swap` 2 lần | `l6_sfx_gate_creak` |
| 8 | Sân (đặt bánh mì) | `l6_bread` thả xuống sân, `l6_sparrow` (mới) | — | Đặt bánh mì | — | — | Chim sẻ sà xuống mổ 2 giây rồi bay đi (trang trí, không ảnh hưởng) | `l6_sfx_sparrow` |

### Trạng thái mèo

| Giai đoạn | Tư thế | Chuyển động | Chạm Mun |
|---|---|---|---|
| Mở màn | `mun_run` | Chạy vụt vào bụi hoa | — |
| Trong bụi (Lẩn tránh) | `mun_eyes_dark` | Nháy mắt; khi chuông gió kêu thì liếc | Lùi sâu |
| Phóng vào túi | `mun_run` | Từ bụi hoa lao thẳng vào miệng túi 0,3 giây, túi nảy | — |
| Túi chạy (Lộ diện) | `l6_paper_bag_mun` | Chạy quanh sân 2 vòng theo đường cong (2 giây), mỗi bước túi `squash` nhẹ, va vào chân ghế thì `hop` | **Thắng** |
| Thò đầu (Lộ diện) | `l6_paper_bag_mun_peek` | `breathe`, `glow_outline` | **Thắng** |

### Danh sách ảnh (tất cả mới)

`l6_bg_front_yard`, `l6_flower_bush`, `l6_chair`, `l6_bread_bag_full`, `l6_bread`, `l6_paper_bag_empty_chair`, `l6_paper_bag_floor`, `l6_paper_bag_mun`, `l6_paper_bag_mun_peek`, `l6_boot_black_idle`, `l6_boot_black_fallen`, `l6_frog`, `l6_wind_chime`, `l6_gate_closed`, `l6_gate_open`, `l6_sparrow`.

---

## Level 7 — Đồ rơi khỏi kệ

### Lớp hiển thị

**Phòng đọc:** `l7_bg_study` → `l7_grandfather_clock` + `l7_clock_pendulum` → `l7_bookshelf` → `l7_chair` + `l7_beanie_black_*` → đồ rơi trên sàn (`l7_pen`, `l7_eraser`, `l7_paperclip`, `l7_pencil`, `l7_cup_red`) → giao diện.

**Cận cảnh kệ:** `l7_closeup_shelf_bg` → `l7_books_a`, `l7_books_b`, `l7_books_c` (3 cụm sách, mỗi cụm sprite riêng) → bóng Mun (`mun_shadow`, code) → `l7_cactus_small` → `l7_cup_red` (khi đặt) → Mun ló ra → `ui_close_button`.

**Bếp:** `l7_bg_kitchen_neighbor` → `l7_teapot`, `l7_tea_tin` → `l7_cup_red` (trên bàn) → giao diện.

### Đồ vật

| # | Phòng | Đồ vật | Ảnh trạng thái | Bắt đầu | Thao tác | Điều kiện | Chuyển sang | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Phòng đọc | Kệ sách | `l7_bookshelf` (mới) | — | Chạm | — | mở cận cảnh | Phóng to vào kệ 0,3 giây | `sfx_closeup_open` |
| 2 | Phòng đọc | Cây bút dưới sàn | `l7_pen` (mới) | đang lăn | Chạm | — | — | Lăn thêm 30px | `l7_sfx_roll` |
| 2' | Phòng đọc | Đồ rơi định kỳ | `l7_eraser`, `l7_paperclip`, `l7_pencil` (mới) | — | (tự động mỗi 10 giây, khi Mun chưa lộ diện) | — | rơi từ đỉnh kệ xuống sàn | `fly_arc` + `hop` khi chạm sàn. Tối đa 3 món trên sàn, món thứ 4 thay món cũ nhất | `l7_sfx_clack` |
| 3 | Phòng đọc | Mũ len đen 🎭 | `l7_chair` (mới), `l7_beanie_black_idle` (mới: cuộn tròn như mèo đen trên ghế), `l7_beanie_black_after` (mới: rơi xuống sàn, bung ra) | idle | Chạm | — | idle → after (giữ) | `fly_arc` xuống sàn | `sfx_cushion_soft` |
| 4 | Phòng đọc | Đồng hồ quả lắc | `l7_grandfather_clock`, `l7_clock_pendulum` (mới) | — | Chạm | — | — | Quả lắc `swing` mạnh | `l7_sfx_bong` |
| 5 | Cận cảnh | Cụm sách (A, B, C) | `l7_books_a/b/c` (mới) | thẳng | Chạm | **Mun không nấp sau cụm này** | — | `tilt_back` (lung lay) | `l7_sfx_books` |
| 5 | Cận cảnh | Cụm sách có Mun nấp sau | — | thẳng | Chạm | Mun nấp sau cụm này | — | Sách nghiêng ra 20°, `mun_peek_books` (mới) hiện 0,8 giây, rồi `mun_shadow` chạy dọc kệ sang cụm kế tiếp (B → C → A → B…) 0,4 giây | `mun_sfx_scamper` |
| 6 | Cận cảnh | Xương rồng nhỏ | `l7_cactus_small` (mới) | — | Chạm | — | — | Màn hình rung nhẹ 0,15 giây | `l7_sfx_ouch` (tiếng kêu không lời) |
| 7 | Cận cảnh | Mép kệ trống (chỗ đặt) | vùng chạm trong `l7_closeup_shelf_bg` | trống | Đặt cốc | — | có cốc | `drop_in` `l7_cup_red` | `sfx_drop` |
| 7 | Cận cảnh | Chỗ khác trong kệ | — | — | Đặt cốc | — | — | `return_to_bag`, mép kệ `sparkle` | `sfx_wrong` |
| 8 | Bếp | Cốc nhựa đỏ | `l7_cup_red` (mới) | trên bàn | Chạm | — | vào túi | `fly_to_bag` | `sfx_pickup` |
| 9 | Bếp | Hộp trà 🎁 | `l7_tea_tin` (mới) | — | Chạm | — | — | `hop` nắp; `ui_dried_fish` | `sfx_lid` |
| 10 | Bếp | Ấm trà | `l7_teapot` (mới) | — | Chạm | — | — | Hơi nước bay lên (hạt) | `l7_sfx_kettle` |
| 11 | Cận cảnh | Nút đóng | `ui_close_button` | — | Chạm | — | về phòng đọc | Thu nhỏ 0,3 giây | `sfx_closeup_close` |

### Trạng thái mèo

| Giai đoạn | Tư thế | Chuyển động | Chạm Mun |
|---|---|---|---|
| Mở màn | `mun_run` | Chạy vào phòng đọc, nhảy lên kệ, khuất | — |
| Nấp sau sách (Ẩn → Lẩn tránh) | `mun_peek_books` khi bị lộ | Hiện 0,8 giây rồi lủi sang cụm khác | Lủi sang cụm khác |
| Thò chân đẩy cốc | `mun_paw_push` (mới: một bàn chân đen thò ra chạm cốc) | Thò 0,3 giây, rụt, thò lại 2 lần | Rụt lại, sau 2 giây thử lại |
| Nhìn người chơi | `mun_peek_face` (mới: ló cả mặt, nhìn thẳng ra màn hình) | Máy quay zoom 110% vào mặt Mun 0,3 giây, nhạc dừng 1 giây | **Thắng** |
| Đẩy cốc | `mun_paw_push` | Cốc `fly_arc` xuống sàn, nảy 2 lần (`hop` 24px rồi 10px) | **Thắng** |
| Nhìn theo cốc (Lộ diện) | `mun_peek_face` (đầu cúi nhìn xuống) | `glow_outline` | **Thắng** |

**Lưu ý:** khi đã đặt cốc, Mun ở cụm sách **gần cốc nhất**. Nếu người chơi ra khỏi cận cảnh, cảnh đẩy cốc vẫn chạy và cốc rơi xuống sàn phòng đọc; Mun ló đầu ở đỉnh kệ trong phòng đọc (dùng `mun_peek_face` thu nhỏ).

### Danh sách ảnh (tất cả mới)

`l7_bg_study`, `l7_bg_kitchen_neighbor`, `l7_bookshelf`, `l7_closeup_shelf_bg`, `l7_books_a`, `l7_books_b`, `l7_books_c`, `l7_cactus_small`, `l7_pen`, `l7_eraser`, `l7_paperclip`, `l7_pencil`, `l7_chair`, `l7_beanie_black_idle`, `l7_beanie_black_after`, `l7_grandfather_clock`, `l7_clock_pendulum`, `l7_cup_red`, `l7_tea_tin`, `l7_teapot`, `mun_peek_books`, `mun_paw_push`, `mun_peek_face`. **Gáy sách vẽ sọc màu, không chữ.**

---

## Level 8 — Gối cỏ mèo

### Lớp hiển thị

**Vườn trước:** `l8_bg_garden_front` (có lối mòn) → `l8_swing` → `l8_clothesline_*` → `l8_cat_statue_*` → `l8_watering_can` → `l8_catnip_pillow` (khi đặt) → Mun → giao diện.

**Giàn hoa:** `l8_bg_garden_arbor` → `l8_stone_bench` → `l8_catnip_pot_*` + `l8_net_*` → `l8_catnip_pillow` (khi đặt) → `l8_butterfly` → Mun → giao diện.

### Đồ vật

| # | Phòng | Đồ vật | Ảnh trạng thái | Bắt đầu | Thao tác | Điều kiện | Chuyển sang | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Vườn trước | Tượng mèo đá đen 🎭 | `l8_cat_statue` (mới), `l8_cat_statue_leaf` (mới: một chiếc lá rơi đậu trên đầu tượng) | idle | Chạm | — | idle → leaf (giữ) | `hop` rất nhỏ (tượng nặng), lá rơi xuống đậu | `l8_sfx_knock_stone` |
| 2 | Vườn trước | Dây phơi + chiếc tất | `l8_clothesline_sock` (mới), `l8_clothesline_empty` (mới) | sock | Chạm | — | sock → empty | `l8_sock_old` (mới) `fly_to_bag` | `sfx_clothespin` |
| 3 | Vườn trước | Bình tưới 🎁 | `l8_watering_can` (mới) | — | Chạm | — | — | `tilt_back`, nước bắn (hạt); `ui_dried_fish` | `l8_sfx_water_splash` |
| 4 | Vườn trước | Bãi cỏ (chỗ đặt) | vùng trong nền | — | Đặt gối cỏ mèo | — | có gối | `drop_in` `l8_catnip_pillow` (mới) + khói xanh nhạt bốc lên lặp (hạt) | `sfx_drop` |
| 5 | Vườn trước | Xích đu | `l8_swing` (mới) | — | Chạm | — | — | `swing` | `l8_sfx_swing_creak` |
| 6 | Giàn hoa | Lưới che chậu | `l8_net_on` (mới), `l8_net_off` (mới: lưới nằm cạnh chậu) | on | Vuốt | — | on → off | `swap` | `sfx_cloth` |
| 6 | Giàn hoa | Lưới | — | on | Chạm | — | — | `shake_no` nhẹ, bàn tay hướng dẫn vuốt (nếu 💡) | `sfx_tap` |
| 7 | Giàn hoa | Chậu cỏ mèo | `l8_catnip_pot_full` (mới), `l8_catnip_pot_cut` (mới: cỏ thấp hơn một nửa) | full | Chạm | lưới đã off | full → cut | `l8_catnip` (mới) `fly_to_bag` | `sfx_leaves` |
| 7 | Giàn hoa | Chậu cỏ mèo | — | full | Chạm | lưới còn on | — | `wiggle` | `sfx_tap` |
| 8 | Giàn hoa | Ghế đá (chỗ đặt) | `l8_stone_bench` (mới) | — | Đặt gối cỏ mèo | — | có gối | như bãi cỏ | `sfx_drop` |
| 9 | Giàn hoa | Bướm | `l8_butterfly` (mới) | bay vòng | Chạm | — | — | Bay vọt lên cao rồi vòng lại; nếu Mun đang ở giàn hoa thì Mun nhảy vồ theo (`mun_pounce` 0,4 giây) | — |

**Ghép:** `l8_sock_old` + `l8_catnip` → `l8_catnip_pillow` (chiếc tất phồng tròn, buộc nút). Chỉ có một chỗ đặt hợp lệ mỗi lần; đặt rồi không nhặt lại được.

### Trạng thái mèo

| Giai đoạn | Tư thế | Chuyển động | Chạm Mun |
|---|---|---|---|
| Chạy qua khung (Lẩn tránh) | `mun_run` | Vào từ một mép, chạy theo lối mòn (1,5 giây) | Chạy ngay sang khung kia |
| Dừng ở khung | `mun_sit_look` | Ngồi 2 giây ở điểm dừng (giữa bãi cỏ / cạnh ghế đá); ở giàn hoa thì `mun_sniff` (mới: ngửi về phía chậu cỏ mèo) | Chạy ngay sang khung kia |
| Đổi khung | `mun_run` | Ra mép bên kia 1,5 giây. Tổng mỗi khung 5 giây. Bản đồ mini: `ui_minimap_paw` nhảy sang ô kia | — |
| Gặp gối cỏ mèo | `mun_skid` (mới: phanh trượt, bốn chân chống) | Trượt 30px trên cỏ, `puff` | **Thắng** |
| Lăn ôm gối (Lộ diện) | `mun_catnip_roll` (mới: ôm gối lăn, má cọ vào gối) | Xoay qua lại ±20° 2 lần, 1,2 giây | **Thắng** |
| Phê (Lộ diện) | `mun_belly_up` (mới: nằm ngửa bụng, bốn chân giơ lên, ôm gối, mắt lim dim) | 2–3 ngôi sao nhỏ `ui_sparkle` bay quanh đầu, `glow_outline` | **Thắng** |

### Danh sách ảnh (tất cả mới)

`l8_bg_garden_front`, `l8_bg_garden_arbor`, `l8_cat_statue`, `l8_cat_statue_leaf`, `l8_clothesline_sock`, `l8_clothesline_empty`, `l8_sock_old`, `l8_watering_can`, `l8_swing`, `l8_net_on`, `l8_net_off`, `l8_catnip_pot_full`, `l8_catnip_pot_cut`, `l8_catnip`, `l8_catnip_pillow`, `l8_stone_bench`, `l8_butterfly`, `mun_sniff`, `mun_skid`, `mun_catnip_roll`, `mun_belly_up`.

---

## Level 9 — Ô vuông băng dính

### Lớp hiển thị

`l9_bg_porch` → `l9_mailbox_*` → `l9_plant` → `l9_shoe_cabinet` (+ `mun_eyes_dark` trong gầm) → `l9_chair` + `l9_gloves_black_*` → `l9_tape_square` (khi dán) → `l9_toolbox_*` (trên bậc thềm) → Mun → giao diện.

### Đồ vật

| # | Đồ vật | Ảnh trạng thái | Bắt đầu | Thao tác | Điều kiện | Chuyển sang | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|---|---|
| 1 | Gầm tủ giày | `l9_shoe_cabinet` (mới) | — | Chạm lần 1–2 | Mun trong gầm | — | `mun_eyes_dark` lùi sâu; bong bóng suy nghĩ vẽ ô vuông (`l9_tape_square` thu nhỏ) | `mun_sfx_meow_shy` |
| 1 | Gầm tủ giày | `l9_slipper_drop` (mới) | — | Chạm lần 3 | — | — | Một chiếc dép trượt ra khỏi gầm, `puff` | `l2_sfx_slide` (dùng lại) |
| 2 | Hộp đồ nghề | `l9_toolbox_closed`, `l9_toolbox_open` (mới) | closed | Chạm | — | closed → open | `swap`; `l9_tape_roll` (mới: cuộn băng dính vàng tươi) `fly_to_bag` | `l9_sfx_metal_clack`, `sfx_pickup` |
| 3 | Găng tay len đen 🎭 | `l9_chair` (mới), `l9_gloves_black_idle` (mới: cuộn tròn như mèo), `l9_gloves_black_after` (mới: bung thành 2 chiếc rời) | idle | Chạm | — | idle → after (giữ) | `squash` → `swap` | `sfx_cushion_soft` |
| 4 | Chậu cây | `l9_plant` (mới), dùng lại `prop_butterfly` | — | Chạm | — | — | `wiggle`, bướm bay ra | `sfx_leaves` |
| 5 | Hộp thư 🎁 | `l9_mailbox_closed`, `l9_mailbox_open` (mới), `l9_flyer` (mới: tờ giấy chỉ có hình) | closed | Chạm | — | closed → open (giữ) | `swap`; tờ giấy và `ui_dried_fish` rơi ra | `sfx_lid` |
| 6 | Sàn trống (chỗ đặt) | vùng trong nền; khung gợi ý vẽ bằng code (nét đứt vàng nhạt) | trống | Đặt băng dính | — | có ô vuông | Xem kịch bản dán | `l9_sfx_tape_pull` |
| 6 | Chỗ khác (sát tủ, bậc thềm) | — | — | Đặt băng dính | — | — | `return_to_bag`; khung nét đứt hiện trên sàn trống | `sfx_wrong` |

### Kịch bản dán băng dính

| Thời gian | Diễn biến |
|---|---|
| 0–0,3 giây | `drop_in` cuộn băng dính ở một góc ô |
| 0,3–1,5 giây | Cuộn lăn theo 4 cạnh ô vuông (mỗi cạnh 0,3 giây), **vạch băng dính được vẽ dần bằng code** theo cuộn lăn. Âm "xoẹt" mỗi cạnh |
| 1,5 giây | Cuộn biến mất (`puff` nhỏ), đổi vạch vẽ bằng code sang ảnh `l9_tape_square` (mới) cho đẹp |
| 1,5–2,5 giây | Im lặng, đôi mắt vàng trong gầm tủ nhìn ra (mắt dịch về phía ô) |

### Trạng thái mèo

| Giai đoạn | Tư thế | Chuyển động | Chạm Mun |
|---|---|---|---|
| Trong gầm (Lẩn tránh) | `mun_eyes_dark` | Nháy mắt | Lùi sâu |
| Bò ra (Lộ diện) | `mun_crawl_out` (mới: thân thấp, bò ra khỏi gầm) | 0,6 giây | **Thắng** |
| Đi tới ô | `mun_walk` (mới: đi chậm nhìn nghiêng) | Đi chậm 1,2 giây | **Thắng** |
| Bước qua vạch | `mun_step_over` (mới: nhấc cao một chân trước) | Dừng ở mép ô, mỗi chân 0,3 giây (4 lần, đổi ảnh lật ngang cho chân trái/phải) | **Thắng** |
| Ngồi trong ô (Lộ diện) | `mun_sit_square` (mới: ngồi thẳng lưng, đuôi cuộn gọn trong ô, nhìn lên) | `breathe`, `glow_outline` | **Thắng** |

### Danh sách ảnh (tất cả mới)

`l9_bg_porch`, `l9_shoe_cabinet`, `l9_slipper_drop`, `l9_toolbox_closed`, `l9_toolbox_open`, `l9_tape_roll`, `l9_tape_square`, `l9_chair`, `l9_gloves_black_idle`, `l9_gloves_black_after`, `l9_plant`, `l9_mailbox_closed`, `l9_mailbox_open`, `l9_flyer`, `mun_crawl_out`, `mun_walk`, `mun_step_over`, `mun_sit_square`.

---

## Level 10 — Hai mèo một hộp

### Lớp hiển thị

**Phòng khách:** `l10_bg_living_room` → `l10_sofa` → `l10_flower_pot` → `l10_boots_black_*` → `l10_parcel_box` → giao diện.

**Phòng ngủ:** `l10_bg_bedroom` → `l10_bed` → `l10_chair` + `l10_scarf_black_*` → `l10_wardrobe_*` → `l10_parcel_box_floor` (khi đặt) → Sữa / Mun → giao diện.

**Bếp:** `l10_bg_kitchen` → `l10_shelf` + `l10_kibble_box` → `l10_bowl_*` → `l10_cookie_jar` → Sữa (khi ở bếp) → giao diện.

### Đồ vật

| # | Phòng | Đồ vật | Ảnh trạng thái | Bắt đầu | Thao tác | Điều kiện | Chuyển sang | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Phòng khách | Hộp các-tông hàng mới | `l10_parcel_box` (mới) | — | Chạm | — | vào túi | `fly_to_bag` | `sfx_pickup` |
| 2 | Phòng khách | Đôi bốt đen 🎭 | `l10_boots_black_idle` (mới: đứng sát nhau như mèo đen ngồi), `l10_boots_black_after` (mới: một chiếc đổ) | idle | Chạm | — | idle → after (giữ) | `swap` + `puff` | `l10_sfx_boot_thud` |
| 3 | Phòng khách | Chậu hoa 🎁 | `l10_flower_pot` (mới) | — | Chạm | — | — | `wiggle`; `ui_dried_fish` | `sfx_clink` |
| 4 | Phòng khách | Sofa | `l10_sofa` (mới) | — | Chạm | — | — | `squash` | `sfx_cushion_soft` |
| 5 | Phòng ngủ | Tủ quần áo, ngăn dưới | `l10_wardrobe_drawer_closed`, `l10_wardrobe_drawer_ajar` (mới: ngăn dưới hé, có `mun_eyes_dark` bên trong) | ajar | Chạm | **Sữa đang canh** | ajar → closed 1 giây rồi về ajar | `swap`, Sữa gầm gừ | `l10_sfx_drawer_slam`, `sua_sfx_growl` |
| 5 | Phòng ngủ | Tủ, ngăn dưới | — | ajar | Chạm | Sữa đã đi | giữ ajar | `mun_eyes_dark` lùi sâu; bong bóng suy nghĩ vẽ `l10_parcel_box` | `mun_sfx_meow_shy` |
| 6 | Phòng ngủ | Khăn quàng lông đen 🎭 | `l10_chair` (mới), `l10_scarf_black_idle` (mới: cuộn tròn như mèo), `l10_scarf_black_after` (mới: rủ dài xuống ghế) | idle | Chạm | — | idle → after (giữ) | `squash` → `swap` | `sfx_cloth` |
| 7 | Phòng ngủ | Giường | `l10_bed` (mới) | — | Chạm | — | — | `squash` | `sfx_cushion_soft` |
| 8 | Phòng ngủ | Chỗ trống trước tủ (chỗ đặt) | vùng trong nền | trống | Đặt hộp | — | `l10_parcel_box_floor` (mới: hộp đặt dưới sàn, miệng hộp hướng về tủ) | `drop_in` | `sfx_drop` |
| 9 | Bếp | Hộp hạt | `l10_kibble_box` (mới) | trên kệ | **Vuốt lắc** (vuốt qua lại trên hộp) | — | — | Lắc ±10° 4 nhịp; nếu Sữa đang canh: Sữa chạy sang bếp | `l10_sfx_kibble_shake` (to) |
| 9 | Bếp | Hộp hạt | — | trên kệ | **Kéo thả vào bát** | — | vào bát (hộp quay về kệ) | Hộp nghiêng 60° trên bát, hạt rơi (hạt particle) 0,6 giây | `l10_sfx_kibble_pour` |
| 10 | Bếp | Bát của Sữa | `l10_bowl_empty`, `l10_bowl_full` (mới) | empty | (nhận hạt) | — | empty → full | `swap` | — |
| 11 | Bếp | Hũ bánh quy 🎁 | dùng lại `l4_cookie_jar` | — | Chạm | — | — | `hop` nắp; `ui_dried_fish` | `sfx_lid` |

### Trạng thái Sữa (không phải mèo cần tìm, chạm Sữa không thắng)

| Trạng thái | Ở đâu | Tư thế | Chuyển động | Chạm Sữa | Chuyển sang khi |
|---|---|---|---|---|---|
| Khè (mở màn) | Cửa phòng khách | `sua_hiss` (mới: lông xù to, lưng cong, miệng mở khè) | `wiggle_strong` 0,6 giây | — | Hết mở màn → Canh |
| **Canh** | Phòng ngủ, trước tủ | `sua_guard` (mới: ngồi chắn, đuôi xù to gấp đôi) | `breathe`, thỉnh thoảng gầm gừ | Gầm gừ, `wiggle` | Nghe lắc hộp hạt → Chạy sang bếp |
| Chạy | Giữa các phòng | `sua_run` | Dịch chuyển giữa phòng (nếu người chơi đứng ở phòng đó thì thấy chạy ngang) | — | Tới bếp → Chờ bát |
| Chờ bát | Bếp | `sua_sit_stare` | Nhìn bát | `sua_meow_up` | Bát full → Ăn. Bát empty 5 giây → `sua_glare` (mới: nhìn người chơi trách móc) 1 giây → Chạy về → Canh |
| **Ăn** | Bếp | `sua_eat` | Gật đầu lặp | `sua_meow_up` rồi ăn tiếp | Mun đã vào hộp + 3 giây → Về phòng ngủ |
| Nhảy vào hộp (khi hộp đặt lúc Sữa còn canh) | Phòng ngủ | `sua_in_box` (dùng lại, đổi hộp `l10_parcel_box_floor`) | Nhảy vào hộp | Nhảy ra, về Canh, hộp ở lại | — |
| Về và chen hộp | Phòng ngủ | `sua_walk_in` (mới: đi chậm, liếm mép) → `sua_sniff_nose` (mới) | Xem kịch bản kết | — | — |

### Trạng thái Mun (mèo cần tìm)

| Giai đoạn | Tư thế | Chuyển động | Chạm Mun |
|---|---|---|---|
| Mở màn | `mun_run` | Theo nhân vật vào nhà, bị khè thì chạy vụt vào phòng ngủ | — |
| Trong ngăn tủ (Lẩn tránh) | `mun_eyes_dark` (trong `l10_wardrobe_drawer_ajar`) | Nháy mắt | Lùi sâu |
| Bò ra (Lộ diện) | `mun_crawl_out` | Khi có hộp trước tủ **và** Sữa không ở phòng ngủ: ló đầu nhìn quanh 0,8 giây, bò ra 0,6 giây | **Thắng** |
| Trong hộp (Lộ diện) | `mun_in_box` (mới, với hộp `l10_parcel_box_floor`) | `breathe`, `glow_outline` | **Thắng** |

### Kịch bản kết (sau khi Mun vào hộp, nếu người chơi chưa chạm Mun)

| Thời gian | Diễn biến |
|---|---|
| 0–3 giây | Mun nằm trong hộp, `glow_outline` (người chơi chạm lúc nào cũng thắng) |
| 3–4,5 giây | Sữa đi vào phòng ngủ `sua_walk_in`, dừng lại nhìn Mun |
| 4,5–5,5 giây | Im lặng một nhịp. `sua_sniff_nose` + `mun_sniff_nose` (mới) chạm mũi nhau |
| 5,5–7 giây | Sữa chen vào hộp: `swap` cả cụm sang `l10_box_sua_mun` (mới: hộp nhỏ phình hai bên, đầu trắng và đầu đen cùng thò ra). Hộp `squash` 3 lần như hai con đang vặn vẹo |
| 7 giây → | `breathe`, `glow_outline` **chỉ quanh Mun** |

**Cảnh bế:** chạm Mun → cảnh bế chung với `mun_held`. Trong lúc bế, cảnh nền vẫn giữ `l10_box_sua_mun` nhưng đổi sang `l10_box_sua_only` (mới: Sữa một mình trong hộp, ngóc đầu nhìn theo) ngay khi tay nhấc Mun lên.

### Danh sách ảnh (tất cả mới)

`l10_bg_living_room`, `l10_bg_bedroom`, `l10_bg_kitchen`, `l10_sofa`, `l10_flower_pot`, `l10_boots_black_idle`, `l10_boots_black_after`, `l10_parcel_box`, `l10_parcel_box_floor`, `l10_wardrobe_drawer_closed`, `l10_wardrobe_drawer_ajar`, `l10_chair`, `l10_scarf_black_idle`, `l10_scarf_black_after`, `l10_bed`, `l10_shelf`, `l10_kibble_box`, `l10_bowl_empty`, `l10_bowl_full`, `l10_box_sua_mun`, `l10_box_sua_only`, `sua_hiss`, `sua_guard`, `sua_glare`, `sua_walk_in`, `sua_sniff_nose`, `mun_crawl_out`, `mun_in_box`, `mun_sniff_nose`. Dùng lại: `l4_cookie_jar`, `sua_run`, `sua_sit_stare`, `sua_eat`, `sua_meow_up`, `sua_in_box`, `mun_run`, `mun_eyes_dark`. Cảnh vào quán và mini game Cho ăn, Vuốt ve: đặc tả riêng ở file quán cafe (chưa viết).
