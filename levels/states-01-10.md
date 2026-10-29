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
| Vừa xuất hiện | `sua_sit_stare`: ngồi trên thảm, **bên trái** hộp pate (hộp đã rơi khỏi bệ và lăn tới trước sofa), mặt hướng sang phải nhìn xuống pate, cao khoảng 250 | **Hiện tức thì**, không tween vào | Chưa chạm được (chạm hộp: hộp nảy nhẹ) |
| Kêu meo | `sua_meow_up` | `hop` nhỏ | Chưa chạm được; meo xong (~1,8 giây sau khi hộp bật) mới bật vùng chạm Sữa, tay hướng dẫn chỉ vào Sữa |
| Ăn | `sua_eat` ↔ `sua_eat_f2` | Đổi khung 0,25 giây mỗi nhịp, kèm gật đầu nhẹ; `glow_outline` | Thắng |

**Chạm Sữa (mọi level, O2-20):** phát `sua_sfx_meow_cute` (meo cao, ngắn, hai nhịp "mi-ao", vibrato nhẹ) rồi sang cảnh bế.

**Vùng chạm Sữa (đoạn cuối, chung 2 level):** chỉ bật sau khi cảnh lộ diện xong, ôm sát thân Sữa (không phủ hộp pate); trước đó chạm hộp chỉ làm hộp nảy nhẹ. Chỉ chạm vào Sữa mới sang cảnh bế.

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
| 0 | `fx_pop` bung tại miệng hộp, âm `sfx_pop_can` (O2-21: như mở lon nước ngọt, "tách" khoen kim loại giòn + xì hơi ngắn) |
| 0,1 giây | `swap` hộp sang `l1_pate_can_open` |
| 0,1–0,4 giây | **Bóng Sữa vụt tới (G1-30):** code dựng từ `sua_run` (không cần ảnh mới): thân kéo dài theo hướng chạy (×1,45 ngang, ×0,85 dọc), mờ 80%, hai bóng mờ nối đuôi, ba vệt gió nâu nhạt phía sau, âm `sfx_whoosh`. Chạy từ mép màn hình phía chỗ Sữa trốn cuối (rèm → mép trái) tới chỗ ngồi trên thảm trong 0,3 giây |
| 0,4 giây | **Phanh gấp:** bụi nhỏ (`dust`), âm `sfx_skid`; bóng biến mất, `sua_sit_stare` ngồi ngay ngắn ở chỗ ngồi |
| 0,4–0,9 giây | **Khựng:** dừng mọi tween trong cảnh (kể cả quả lắc), nhạc tắt |
| 0,9 giây | Nhạc trở lại. Hộp mở bay dần xuống, thu nhỏ về chỗ bên phải Sữa (0,65 giây). Khi hộp đáp xuống, hơi thơm bắt đầu: 3 bản `l1_pate_can_steam` lệch pha, lật ngang ngẫu nhiên, bay lên, lắc, mờ dần, lặp lại. `player_surprised` trồi lên 1 giây |
| 0,9–1,7 giây | Bong bóng nhiệm vụ bay ra giữa màn hình: `ui_cat_head_dark` mờ dần, `sua_face_icon` hiện lên |
| 1,7–2,5 giây | `sua_meow_up`, âm `sua_sfx_meow_long` |
| 2,5 giây trở đi | `sua_eat` ↔ `sua_eat_f2` lặp, `glow_outline`. Bàn tay hướng dẫn chỉ vào Sữa (chỉ có ở level 1) |

### Danh sách ảnh

Toàn bộ đã có trong `art/design-art-level1.md` (vẽ theo tờ, cắt bằng `tools/sheet_cut.py`).

- **Riêng level 1:** `l1_bg_living_room`, `l1_sofa_cushion_flat` (thay `l1_sofa_cushion_bulge`; `l1_sofa_cushion_lifted` không còn dùng từ G10), `l1_pate_can_closed`, `l1_pate_can_open`, `l1_pate_can_steam`, `l1_box_closed`, `l1_box_open_empty`, `l1_pillow_white_idle`, `l1_pillow_white_flipped`, `l1_curtain_closed`, `l1_curtain_open`, `l1_wall_clock_closed`, `l1_wall_clock_open`, `l1_wall_clock_bird`, `l1_wall_clock_pendulum`, `l1_plant`, `l1_rug_flat`, `l1_rug_curled`.
- **Dùng chung, vẽ lần đầu ở level 1:** `prop_butterfly`, `fx_pop`, `sua_tail_peek`, `sua_run`, `sua_sit_stare`, `sua_meow_up`, `sua_eat`, `sua_eat_f2`, `sua_held`, `sua_face_icon`, `ui_cat_head_dark`, `ui_speech_bubble`, `ui_question_mark`, `ui_question_mark_white`, `ui_heart`, `player_call`, `player_scratch_head`, `player_surprised`, `player_shrug`, `player_hands_lift`, `player_box_on_head` (tùy chọn), `ui_hand_pointer`, `ui_hint_paw`, `ui_sparkle`, `ui_bulb_button`, `ui_dried_fish`.
- **Không có file riêng** (frame do code cắt): `l1_plant` → `leaves`/`pot`; `l1_curtain_closed` → `left`/`right`.
- **Âm mới (G1-30, đang tổng hợp bằng code tới khi có file):** `sfx_whoosh` (vút), `sfx_skid` (phanh gấp).
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
5. `l2_sock_basket_*`
6. `l2_pampas_plume` + `l2_pampas_vase_pot` (hoặc `l2_pampas_vase` liền) trên bậu cửa sổ, **dưới** rèm (G2-30)
7. `l2_curtain_*`
8. Tất đang bay (`l2_sock_striped`, `l2_sock_dotted`, `l2_sock_white_big`, `l2_sock_star`, `l2_sock_baby`, `l2_sock_long`), sau khi rơi nằm ở lớp của chỗ rơi
9. Giao diện

### Đồ vật

| # | Đồ vật | Ảnh trạng thái | Bắt đầu | Thao tác | Điều kiện | Chuyển sang | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|---|---|
| 1 | Rèm | `l2_curtain_closed`, `l2_curtain_open` (vệt nắng do code vẽ) | closed | Vuốt / chạm | — | closed ↔ open | `swap`; mở: bình bông lau (1b) nhận chạm, đóng: bình bị che, tắt vùng chạm. **Lần đầu mở (G2-30):** gió lùa, chùm bông lau quất mạnh một cái (xoay quanh gốc tới 30°, bật về −12°, về 0) rồi đung đưa chậm ±3°, 1,6 giây | `sfx_cloth`; lần đầu thêm `sfx_wind` |
| 1b | Bình bông lau 🎭 (G2-30) | `l2_pampas_vase_pot` + `l2_pampas_plume` (chùm bông neo giữa đáy phần vẽ, cắm vào miệng bình, xoay quanh gốc); có `l2_pampas_vase` liền mà không có `_plume` thì cả bình đung đưa quanh đáy. Ảnh tạm: khối code | đung đưa chậm (sau lần mở rèm đầu) | Chạm (khi rèm mở) | Rèm mở | — | Bông lau quất qua quất lại 2 nhịp (22° → −18° → 16° → −8° → 0), 7 sợi bông trắng (code) bay lơ lửng rồi mờ; 0,45 giây sau nhân vật trồi lên hắt xì (`player_sneeze`, chưa có thì `player_surprised`) | `sfx_cloth` + `sfx_sneeze` |
| 1a | Dây buộc rèm 🎭 (như đuôi mèo, G2-7) | `l2_curtain_tie` (mới: dây bông trắng thò xuống, neo đỉnh ở chỗ buộc) | — | Chạm | — | — | `swing` dây ±22° tắt dần; rèm `wiggle` nhẹ | `sfx_cloth` |
| 2 | Mèo nhồi bông trắng 🎭 | `l2_plush_cat` (đặt trên kệ vẽ trong nền), `l2_plush_cat_fallen` (nằm ngửa dưới sàn) | idle | Chạm | — | idle → fallen (giữ) | `fly_arc` từ kệ xuống mặt giường, xoay 1 vòng quanh **tâm**; đổi sang ảnh nằm giữa đường bay (giữ tâm), đáp mượt rồi là vật con của giường (O2-14) | `l2_sfx_squeak` |
| 3 | Tủ quần áo | `l2_wardrobe_closed`, `l2_wardrobe_open` (quần áo **gấp** ngăn nắp từng ngăn, không treo; G2-7) | closed | Chạm | — | closed ↔ open | `swap` | `sfx_hinge` |
| 3a | Hộp giày 🎭 (G2-7) | `l2_shoebox_ears` (mới: nắp hé, hai tai mèo nhọn thò lên), `l2_shoebox_open` (mới: nắp bật), `l2_beanie_pink_cat` (mới: mũ len tai mèo hồng nhạt) | ears | Chạm | — | ears → open (giữ) | `swap`; mũ hồng nảy lên 150px rồi rơi lại vào hộp; chạm lại: `hop` nhỏ | `l1_sfx_box_flaps` |
| 4 | Chăn 🎭 | `l2_bed_blanket_flat` (cục phồng rõ), `l2_bed_blanket_flipped` (không có gì: gối trắng, nệm trống) | flat | Vuốt | — | flat → flipped (giữ) | `swap`; `player_shrug` trồi lên | `sfx_cloth` |
| 5 | Gầm giường 🎭 (G2-9) | vùng chạm dải dưới ảnh giường + túm lông; `l2_duster_peek` (túm lông thò ra, gốc khuất sau khung giường; G2-30: đẩy gốc sâu vào gầm 1/3 chiều cao ảnh nên phần thò ra ngắn lại) → `l2_duster` (cả cây chổi lông nằm ngang) | peek: ve vẩy như đuôi mèo, xoay ±8° quanh gốc, nhịp chậm 1,3 giây, thỉnh thoảng giật nhẹ | Chạm lần đầu | — | peek → chổi nằm trên sàn (giữ) | ẩn `_peek`, chổi trượt ra chỗ `l2_duster` trong bảng vị trí + `puff`; `player_scratch_head` | `l2_sfx_slide` |
| 5 | Gầm giường | — | — | Chạm lần sau | — | — | `wiggle` giường | `sfx_tap` |
| 6 | Chao đèn | `l2_ceiling_lamp` (mới, tách khỏi nền) | — | Chạm | — | — | `swing`; bóng đổ lắc theo | `l2_sfx_creak` |
| 7 | **Giỏ tất** | `l2_sock_basket_full` → `_2` → `_3` → `_reveal`; `_one_eye`, `_yawn` (Sữa vẽ liền trong giỏ, cùng khung) | full | Chạm (6 lần, G2-8) | cách lần trước ≥ 0,4 giây | full → 2 (lần 2) → 3 (lần 4) → reveal (lần 6) | Mỗi lần một chiếc tất bay (bảng dưới); lần 1, 3, 5 giỏ `hop` nhỏ, lần 2, 4, 6 `swap`. Giỏ tĩnh, không `breathe` (G2-8) | `l2_sfx_sock_whoosh` |
| 7 | Giỏ tất | — | reveal | Chạm vào giỏ (ngoài Sữa) | — | — | `wiggle` nhỏ | — |
| 8 | Mũ len trắng 🎭 | `l2_coat_hook` (mới), `l2_beanie_white_idle` (mới: treo móc, 2 quả bông như tai), `l2_beanie_white_floor` (mới: nằm dưới sàn) | idle | Chạm | — | idle → floor (giữ) | `fly_arc` xuống sàn; nhân vật đội thử: `player_wear_beanie` (mới) 1,2 giây | `sfx_cushion_soft` |
| 10 | Dép bông trắng tai mèo 🎭 | `l2_slippers_cat_idle` (mới), `l2_slippers_cat_after` (mới: một chiếc lật nghiêng, tai cụp) | idle | Chạm | — | idle → after (giữ) | `squash` 2 lần (tai vểnh rồi cụp) rồi `swap` | `l2_sfx_squeak_double` |
| 11 | Áo len trắng cuộn 🎭 | `l2_chair` (mới), `l2_sweater_rolled` (mới), `l2_sweater_unrolled` (mới: bung ra, hai tay áo thõng xuống mép ghế) | rolled | Chạm | — | rolled → unrolled (giữ) | `squash` → `swap` | `sfx_cloth` |

**Tất bay ra từ giỏ:**

| Lần chạm | Ảnh | Bay tới | Đường bay | Sau khi rơi |
|---|---|---|---|---|
| 1 | `l2_sock_striped` | Mặt giường (vật con của giường) | `fly_arc` cao rồi rơi đáp, nảy nhẹ, 0,65 giây | Nằm ngang trên chăn; giường nhún/lật thì tất nhún theo |
| 2 | `l2_sock_dotted` | Sàn cạnh chân giường | như trên | Nằm trên sàn |
| 3 | `l2_sock_white_big` | Thảm cạnh đôi dép | như trên | Nằm trên thảm |
| 4 | `l2_sock_star` | Kệ trái, cạnh sách | như trên | Nằm trên kệ |
| 5 | `l2_sock_baby` | Mặt ghế, cạnh áo len (vật con của ghế) | như trên | Nằm trên mặt ghế |
| 6 | `l2_sock_long` | Kệ cạnh chậu cây | như trên | Nằm trên kệ |

O2-19: tất hiển thị nhỏ (×0,6 cỡ trong design-art, cỡ thật so với giường), chỉ đáp ở chỗ đỡ được, không treo lên cánh tủ, chao đèn, lưng ghế. **Vật con (O2-18/19):** vật nằm trên vật khác (hộp giày trên nóc tủ, áo len và tất trên ghế, tất và mèo bông đã rơi trên giường) nhún, co giãn, xoay theo vật đỡ quanh điểm neo của vật đỡ.

### Trạng thái mèo

| Giai đoạn | Tư thế | Chuyển động | Chạm Sữa |
|---|---|---|---|
| Mở màn | Không có trên màn hình (O2-4: bỏ cảnh Sữa chạy lướt qua) | Chỉ có tiếng ngáy rất nhỏ | — |
| Trong giỏ (tất 0–5) | Nằm sẵn trong ảnh giỏ, lẫn hẳn vào tất | Giỏ đứng yên (G2-8); tiếng ngáy `sua_sfx_snore` lặp, rất nhỏ, to dần 6 nấc theo số tất đã bay ra | Chạm vào giỏ = lật thêm 1 chiếc tất (Ẩn) |
| Lộ ra | `l2_sock_basket_reveal` | `zzz` | Chưa chạm được (chạm giỏ: giỏ nảy nhẹ) |
| Hé mắt | `l2_sock_basket_one_eye` | 0,8 giây | Thắng (vùng chạm Sữa bật ~1,5 giây sau lần chạm giỏ thứ 6, tay hướng dẫn chỉ vào Sữa) |
| Ngáp | `l2_sock_basket_yawn` | 0,8 giây | Thắng |
| Ngủ tiếp | `l2_sock_basket_reveal` | `zzz` + `glow_outline` vùng Sữa | Thắng |

**Vùng chạm Sữa:** chỉ bật sau khi lộ diện xong (~1,5 giây), ôm sát thân Sữa ở miệng giỏ (không phủ cả giỏ); chạm phần dưới giỏ hay chạm trước lúc đó chỉ làm giỏ nảy nhẹ. Chỉ chạm vào Sữa mới sang cảnh bế.

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
- **Cần thêm:** `l2_ceiling_lamp` (nền phải bỏ chao đèn), `l2_plush_cat_fallen`, `l2_coat_hook`, `l2_beanie_white_idle`, `l2_beanie_white_floor`, `player_wear_beanie`, `l2_slippers_cat_idle`, `l2_slippers_cat_after`, `l2_chair`, `l2_sweater_rolled`, `l2_sweater_unrolled`, `l2_sock_star`, `l2_sock_baby`, `l2_sock_long` (G2-8; game dùng ảnh tạm tới khi có).
- **Thêm (G2-30):** `l2_pampas_vase_pot`, `l2_pampas_plume`, `l2_pampas_vase` (tờ `l2_pampas_sheet`), `player_sneeze` (tuỳ chọn, chưa có thì dùng `player_surprised`). Âm tạm bằng code: `sfx_wind`, `sfx_sneeze`.
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
7. Mèo, nhân vật (`player_dangle_pompom`; nằm trên cột cào: `l3_cat_tree_player` hoặc `player_curl_on_tree`), `l3_courier_arm`
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
| 0–0,35 giây | Hộp `hop` + xoay 180°, `swap` sang `l3_sua_in_box` |
| 0,35 giây | Bong bóng tô màu `sua_face_icon`. **Sữa nhận chạm ngay** (chạm lúc nào cũng cắt sang cảnh bế), `glow_outline` quanh hộp. Bắt đầu đoạn nhân vật ngốc (G3-30, thay cho `player_sad`; mốc dưới tính từ đây) |
| 0–0,55 giây | `player_dangle_pompom` chạy vào từ mép phải tới giữa hộp và cột cào, nhún 3 nhịp |
| 0,6–1,6 giây | Lắc quả bông đỏ trước mặt Sữa, nhún nhảy mời mọc (2 `hop`), âm `l3_sfx_pompom`. Chưa có ảnh: dùng `player_silly_laugh` + bản sao `l3_pompom` lắc ở tay, quả bông trên cột cào ẩn tạm |
| 1,6 giây | Sữa liếc: hộp `wiggle` nhẹ một nhịp |
| 1,9 giây | Sữa ngáp, rụt sâu vào hộp: `swap` sang `l3_sua_in_box_ears` (chỉ còn hai tai), âm `sua_sfx_yawn` |
| 2,5 giây | Nhân vật nhìn quả bông, nhìn hộp (lật ngang qua lại 0,25 giây) |
| 3,0–3,45 giây | Nhân vật leo lên tầng trên cùng cột cào, cuộn tròn như mèo: có `l3_cat_tree_player` thì đổi ảnh cột cào (ẩn nhân vật), không thì `player_curl_on_tree` nhảy lên đỉnh cột cào và bám theo cột |
| 3,45 giây → | Cột cào lắc lư ±2,5° bốn nhịp, âm `l3_sfx_creak`; quả bông đung đưa, lặp mỗi 1,8 giây (nhân vật vờn quả bông) |
| 4,0 giây | Sữa ló mắt nhìn: `swap` sang `l3_sua_in_box_peek` |
| 4,7 giây | Sữa rụt vào lại: `l3_sua_in_box_ears` |

### Danh sách ảnh (tất cả mới, cần tạo `design-art-level3.md`)

`l3_bg_living_room_afternoon`, `l3_curtain_closed`, `l3_scissors`, `l3_gift_box_taped`, `l3_gift_box_open`, `l3_box_upside_down`, `l3_post_body`, `l3_post_base`, `l3_cat_tree`, `l3_pompom`, `l3_vase`, `l3_courier_arm` (cánh tay shipper đặt hộp qua khung cửa), `sua_peek_tongue`, `sua_pounce`, `sua_scratch_post`, `l3_sua_in_box`, `sua_tail_peek`. Dùng lại: `l1_pillow_white_idle`, `l1_pillow_white_flipped`, `sua_run`.
**G3-30 (thay `player_sad`, bỏ):** `player_dangle_pompom`, `l3_sua_in_box_ears`, `l3_sua_in_box_peek` (cùng thân, cùng khung với `l3_sua_in_box`), `l3_cat_tree_player` (cột cào có nhân vật cuộn tròn trên tầng trên cùng) hoặc `player_curl_on_tree` (ảnh tạm code). Dùng lại `player_silly_laugh` khi chưa có `player_dangle_pompom`. Âm tạm bằng code: `sua_sfx_yawn`, `l3_sfx_creak`.

---

## Level 4 — Quả chuối trên rèm

### Lớp hiển thị

Ba phòng đặt cạnh nhau theo chiều ngang (phòng ngủ, phòng khách, phòng làm việc), chuyển phòng bằng camera trượt ngang. Nền **chỉ là phòng trống**, mọi đồ là sprite riêng.

**Phòng khách:** `l4_bg_living` → `l4_window` → `l4_curtain` → Sữa trên rèm (`sua_curtain_*`) → `l4_sofa` → tháp (`l4_stack_*`, xếp từ dưới lên) → nhân vật (`player_reach_up`, `player_silly_laugh`) → Sữa dưới sàn → giao diện.

**Phòng ngủ:** `l4_bg_bedroom` → `l4_bed` + `l4_pillow` → `l4_bedside_lamp` (+ `l4_sock_stuck`) → `l4_mattress_*` → `l4_teddy` → giao diện.

**Phòng làm việc:** `l4_bg_study` → `l4_bookshelf_*` → `l4_desk` → `l4_book_stack` → `l4_suitcase_*` → đồ rơi từ vali (`l4_spill_*`) → `l4_yoga_ball` → giao diện.

### Đồ vật

| # | Phòng | Đồ vật | Ảnh trạng thái | Bắt đầu | Thao tác | Điều kiện | Chuyển sang | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Khách | Rèm / Sữa trên rèm | `l4_curtain` (một ảnh, không đóng mở) | — | Chạm | Sữa đang treo | giữ | `sua_curtain_sulk` (quay mặt vào tường) 2 giây rồi về tư thế cũ; rèm `swing` | `sua_sfx_meow_short` |
| 2 | Ngủ | Đệm | `l4_mattress_standing`, `l4_mattress_fallen` | standing | Chạm | — | standing → fallen | `swap` (**không** `wiggle`, **không** `puff`; G4-21); layer: `standing` **sau** tủ đầu giường lúc đứng yên; **ngay khi chạm đệm bắt đầu đổ (đang co xuống)** đệm đã ở **trước** tủ đầu giường, `fallen` cũng trước tủ (G4-35, G4-38); `l4_sock_stuck` bay `fly_arc` rồi **vắt trên chao đèn** đúng điểm neo trên đèn (như demo) | `l4_sfx_mattress_thud` |
| 2' | Ngủ | Đệm trên sàn | `l4_mattress_fallen` | fallen | Chạm | — | vào túi | `fly_to_bag` | `sfx_pickup` |
| 3 | Ngủ | Gối | `l4_pillow` | trên giường | Chạm | — | vào túi | `fly_to_bag` | `sfx_pickup` |
| 4 | Ngủ | Gấu bông 🎭 | `l4_teddy` (một ảnh) | — | Chạm | — | giữ | `squash` + `hop` nhỏ (bật nhún nhẹ rồi ngồi lại); không vào túi. Ngoại lệ có chủ ý với luật "đồ đánh lừa giữ trạng thái after" (chủ dự án chốt) | `l4_sfx_teddy_boing` |
| 5 | Ngủ | Tất trên đèn 🎁 | `l4_sock_stuck` (trên đèn và trên giường, cùng một ảnh; G4-39) | trên đèn | Chạm | đệm đã đổ | trên đèn → trên giường | nhún nhẹ rồi `fly_arc` **nhảy lên mặt giường** (chỗ đáp thấp xuống một chút trên chăn, G4-42), **giữ nguyên ảnh `l4_sock_stuck`** (không đổi ảnh), **xoay vòng liên tục suốt lúc bay**, đáp thì dừng xoay ở góc ban đầu, nảy nhẹ (G4-39); nằm lại trên giường tới hết màn (vật con của giường); `ui_dried_fish` (một lần); G4-36 | `sfx_cloth_drop` |
| 9 | Làm việc | Kệ sách | `l4_bookshelf_full`, `l4_bookshelf_after` (giống hệt `_full`, chỉ **hàng trên cùng thiếu đúng 3 cuốn**; G4-30) | full | Chạm kệ | **vali đã vào túi** (G4-34). Chưa có vali: kệ `wiggle` nhỏ, bong bóng nhỏ hình vali (icon `l4_suitcase_folded`), giữ full | full → after | 3 cuốn `l4_book_single` (đúng 3 cuốn đã mất ở hàng trên cùng, cùng màu) lần lượt bật ra, rơi `fly_arc` xuống sàn **vừa rơi vừa xoay 90° từ dựng đứng sang nằm ngang** (ảnh sách nằm ngang khớp từng tầng của `l4_book_stack`), đáp chồng **khít** lên nhau đúng vị trí từng cuốn trong `l4_book_stack`, nảy rất nhẹ, rồi đổi sang ảnh chồng sách (không nhảy hình, không lệch; G4-37) | `l4_sfx_books_domino`, `l4_sfx_books_land` |
| 9' | Làm việc | Chồng sách | `l4_book_stack` | — | Chạm | kệ đã đổ | vào túi | `fly_to_bag` | `sfx_pickup` |
| 10 | Làm việc | Vali | `l4_suitcase_full` (căng phồng, khóa kéo căng), `l4_suitcase_folded` (rỗng, gập gọn) | full | Chạm lần 1 | — | full → folded | `wiggle_strong` 0,3 giây, đồ `l4_spill_*` bắn ra `fly_arc` rơi rải quanh, rồi `swap` sang folded | `l4_sfx_suitcase_burst` |
| 10' | Làm việc | Vali đã gấp | `l4_suitcase_folded` | folded | Chạm lần 2 | — | vào túi | `fly_to_bag` | `sfx_pickup` |
| 10a | Làm việc | Phao vịt 🎁 | `l4_spill_duck_ring` | dưới sàn | Chạm | vali đã bung | — | `hop`; `ui_dried_fish` (một lần) | `l4_sfx_duck` |
| 10b | Làm việc | Đồ rơi khác | `l4_spill_goggles`, `l4_spill_slipper`, `l4_spill_shirt` | dưới sàn | Chạm | — | — | `hop` | `sfx_tap` |
| 11 | Làm việc | Bóng yoga 🎭 | `l4_yoga_ball` | — | Chạm | — | giữ | Nảy lên rồi lăn một vòng quanh phòng (tween theo đường, xoay theo quãng lăn) về chỗ cũ; **neo xoay = tâm hình tròn của quả bóng** (không phải đáy hay góc ảnh), góc xoay = quãng lăn ÷ bán kính; không vào túi | `l4_sfx_ball_boing` |
| 12 | Khách | Chỗ xếp tháp | `l4_stack_mattress`, `l4_stack_suitcase`, `l4_stack_books`, `l4_stack_pillow` (bản "trên tháp", khớp chồng lên nhau) | trống | Kéo-thả từ túi | đúng món kế tiếp (đệm → vali → sách → gối) | thêm một tầng | `drop_in` | `sfx_drop` |
| 12 | Khách | Chỗ xếp tháp | — | — | Kéo-thả từ túi | **sai thứ tự** | giữ | `return_to_bag` thẳng (không chao nghiêng trên tháp), về tới ô thì `wiggle` ngắn trong túi (G4-43); Sữa nghiêng đầu theo | `sfx_wrong` |
| 12 | Khách | Tháp | — | 4 tầng | (tự động) | xếp xong gối | cảnh cao trào | `sparkle` cả tháp, rồi kịch bản lộ diện | `sfx_sparkle` |
| 13 | Khách | Sofa | `l4_sofa` | — | Chạm | — | — | `squash` | `sfx_cushion_soft` |
| 14 | Làm việc | Bàn làm việc | `l4_desk` | — | Chạm | — | — | `wiggle` nhẹ, **không hạt, không chấm bay ra** (G4-21) | `sfx_tap` |

### Trạng thái mèo

| Giai đoạn | Tư thế | Chuyển động | Chạm Sữa |
|---|---|---|---|
| Treo, từ đầu màn | `sua_curtain_banana` (mới: hai chân trước bám đỉnh rèm, thân duỗi, bốn chân dang) | `swing` nhẹ theo rèm, "meo" theo nhịp | `sua_curtain_sulk` 2 giây |
| Treo, lần 2 | `sua_curtain_one_paw` (mới: trượt xuống một nấc, một chân bám, mặt cam chịu) | như trên | như trên |
| Treo, lần 3 | `sua_curtain_upside` (mới: treo ngược, đuôi chĩa lên) | như trên | như trên |
| Treo, lần 4 | `sua_curtain_sleep` (mới: ngủ gật trên rèm) | `zzz` | như trên |
| Giận dỗi | `sua_curtain_sulk` (mới: quay lưng ra ngoài, mặt vào rèm) | — | — |
| Lộn vòng | `sua_curl_spin` (mới: cuộn tròn để code xoay) | Bật lên từ đỉnh rèm, xoay 2–3 vòng 0,6 giây theo cung, rơi xuống cạnh tháp | — |
| Tiếp đất | `sua_land` (mới: bốn chân chạm đất, lưng hơi cong) | `squash` 0,15 giây; sau đó ngồi trên sàn **không rung, không nảy**, chỉ **lắc lư nhẹ** (G4-40) | — |
| Lộ diện | `sua_lick_paw` (mới: ngồi liếm chân trước) | Lặp; `glow_outline` | **Thắng** |

Tư thế treo đổi **mỗi lần chạm rèm hoặc Sữa** (1 → 2 → 3 → 4 → 1, G4-29), không đổi khi chuyển phòng. Mọi tư thế `sua_curtain_*` cùng **điểm bám** trên đỉnh rèm.

### Nhân vật

| Lúc | Tư thế | Chuyển động |
|---|---|---|
| Mở màn và suốt màn (G4-40, thay mở màn bước vào gọi) | `player_reach_sofa` (nếu Art vẽ), chưa có thì `player_reach_up` | **Đứng sẵn trên sofa (13)** cạnh rèm, không che chỗ xếp tháp: chân ở mặt nệm (cách mép trái phần vẽ sofa 95px, ở 50% chiều cao sofa). Mở màn: tiếng gọi + kiễng chân nhảy 2 cái vẫn hụt (lên 42px, kéo dài dọc ×1,05), chới với (lắc ±3°). Bong bóng nhiệm vụ hiện cạnh đầu nhân vật (tâm màn hình 800, 470) rồi thu về góc. Ở lại trên sofa suốt màn; mỗi 6–10 giây (ngẫu nhiên, khi đang ở phòng khách, không lúc chuyển phòng) kiễng chân với hụt một cái |
| Cao trào | `player_reach_up` (mới: đứng trên đỉnh tháp, kiễng chân, hai tay vươn lên) | Nhảy từ sofa sang đỉnh tháp theo đường cong (0,6 giây, cao 140px), đáp "tạch" (`l4_sfx_land_tap`) |
| Sau khi Sữa tiếp đất | `player_silly_laugh` (mới: vẫn đứng trên tháp, một tay gãi đầu, cười ngốc nghếch nhìn xuống) | `swap` |

### Kịch bản lộ diện (xếp xong gối)

| Nhịp | Thời lượng | Diễn biến |
|---|---|---|
| 1 | 0,6 giây | Tháp `sparkle`. Nhân vật nhảy từ sofa sang đỉnh tháp theo đường cong, đáp xuống thành `player_reach_up` (G4-40) |
| 2 | 0,5 giây | Tay vươn sát Sữa. Sữa giật mình (`hop` nhỏ tại chỗ), "meo!" |
| 3 | 0,6 giây | Sữa `sua_curl_spin` bật khỏi rèm, xoay 2–3 vòng theo cung, vệt xoáy |
| 4 | 0,3 giây | `sua_land` chạm đất cạnh tháp, `squash`, "tạch" thật nhẹ |
| 5 | 1 giây | `sua_lick_paw`; nhân vật `swap` sang `player_silly_laugh`; bong bóng nhiệm vụ tô màu mặt Sữa |
| 6 | — | `glow_outline` trên Sữa, chờ chạm → cảnh bế chung |

### Danh sách ảnh (tất cả mới, cần tạo `design-art-level4.md`)

Nền: `l4_bg_living`, `l4_bg_bedroom`, `l4_bg_study`.
Phòng khách: `l4_window`, `l4_curtain`, `l4_sofa`, `l4_stack_mattress`, `l4_stack_suitcase`, `l4_stack_books`, `l4_stack_pillow`.
Phòng ngủ: `l4_bed`, `l4_pillow`, `l4_mattress_standing`, `l4_mattress_fallen`, `l4_teddy`, `l4_bedside_lamp`, `l4_sock_stuck`, `l4_sock_flat` (G4-36, có thể dùng chung một ảnh nếu tất vắt trên đèn vẫn đọc được khi nằm trên giường).
Phòng làm việc: `l4_bookshelf_full`, `l4_bookshelf_after`, `l4_book_single`, `l4_book_stack`, `l4_desk`, `l4_suitcase_full`, `l4_suitcase_folded`, `l4_spill_duck_ring`, `l4_spill_goggles`, `l4_spill_slipper`, `l4_spill_shirt`, `l4_yoga_ball`.
Sữa: `sua_curtain_banana`, `sua_curtain_one_paw`, `sua_curtain_upside`, `sua_curtain_sleep`, `sua_curtain_sulk`, `sua_curl_spin`, `sua_land`, `sua_lick_paw`.
Nhân vật: `player_reach_up`, `player_silly_laugh`, `player_reach_sofa` (tuỳ chọn, G4-40: đứng trên sofa kiễng chân với lên; chưa có thì dùng `player_reach_up`). Không dùng `player_call` ở level 4 nữa.
Chung (chuyển phòng): `ui_room_arrow`, bản đồ mini 3 ô (`ui_map_bedroom`, `ui_map_living`, `ui_map_study`, chung `rooms.js`).

Icon túi đồ dùng thu nhỏ ảnh trong cảnh (`l4_mattress_fallen`, `l4_pillow`, `l4_book_stack`, `l4_suitcase_folded`). Đoạn Sữa vào quán: làm sau.

---

## Level 5 — Đốm sáng

### Lớp hiển thị

**Sân sau:** `l5_bg_backyard` → `l5_cafe_window` (+ Sữa ở cửa sổ) → `l5_vanity_table` + `l5_mirror_small` → `l5_cardboard_box` + `l5_tin_lid` → `l5_trash_bag_*` → giao diện.

**Hẻm:** `l5_bg_alley` (có bức tường đối diện; phủ tối bằng code tới khi cuộn bạt) → chấm nắng li ti (code) → `l5_sunbeam` → đồ sáng đã đặt ở A/B/C (`l5_mirror_placed`, `l5_tin_lid_placed`, `l5_cd_placed`) → tia phản chiếu (code) → `l5_light_spot` → `l5_cart` (+ `l5_cd_hanging`, vùng gầm tối) + `mun_*` dưới gầm → `l5_drain_pipe` → `l5_awning_*` → `l5_crow_*` → giao diện.

### Đồ vật

| # | Phòng | Đồ vật | Ảnh trạng thái | Bắt đầu | Thao tác | Điều kiện | Chuyển sang | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Sân sau | Thùng giấy cũ | `l5_cardboard_box` (mới) | — | Chạm lần đầu | — | — | `wiggle_strong`; `mun_run` vụt ra khỏi thùng chạy sang phải (0,5 giây), mũi tên sang hẻm nhấp nháy | `mun_sfx_scamper` |
| 1 | Sân sau | Thùng giấy | — | — | Chạm lần sau | — | — | `wiggle` | `sfx_tap` |
| 2 | Sân sau | Gương nhỏ | `l5_mirror_small` (mới) trên `l5_vanity_table` (mới) | trên bàn | Chạm | — | vào túi | `fly_to_bag`, lóe một tia sáng khi bay | `l5_sfx_glass_ting` |
| 3 | Sân sau | Túi rác đen 🎭 | `l5_trash_bag_idle` (mới), `l5_trash_bag_after` (mới: xẹp xuống, miệng túi mở) | idle | Chạm | — | idle → after | `squash` → `swap`; `player_cover_nose` (mới) 1 giây | `l5_sfx_plastic` |
| 4 | Sân sau | Cửa sổ quán | `l5_cafe_window` (mới), `sua_press_window` (mới: Sữa áp mặt vào kính) | — | Chạm | — | — | Sữa `hop` nhỏ trong cửa sổ | `sua_sfx_meow_question` |
| 2b | Sân sau | Nắp hộp bánh thiếc | `l5_tin_lid` (mới: nắp tròn bóng dựa cạnh thùng) | dựa cạnh thùng | Chạm | — | vào túi | `fly_to_bag`, lóe sáng | `sfx_clink` |
| 2c | Hẻm | Đĩa CD cũ | `l5_cd_hanging` (mới: treo dây trên móc tường bên trái hẻm, xa xe ba gác; G5-7) | treo | Chạm | — | vào túi | `fly_to_bag`, lóe sáng | `l5_sfx_glass_ting` |
| 5 | Hẻm | Bạt + dây kéo | `l5_awning_down` (mới: bạt thả che, vài lỗ thủng nhỏ), `l5_awning_rolled` (mới), `l5_awning_cord` (mới: dây có vòng tròn) | down | Vuốt xuống trên dây (hoặc vuốt lên trên bạt) | — | down → rolled (giữ) | Dây `sway` liên tục khi down; kéo: dây giật xuống, bạt `swap` rolled; lớp phủ tối tan 0,5 giây; `l5_sunbeam` hiện dần; chấm nắng li ti biến mất | `l5_sfx_canvas_flap` |
| 6 | Hẻm | Điểm nối tia A/B/C | `l5_light_spot` ở điểm kế tiếp | ẩn | Kéo-thả đồ sáng từ túi vào đốm sáng | bạt rolled; đúng điểm đang có đốm sáng | đặt đồ, đốm sáng sang điểm kế | `drop_in` ảnh đồ "đặt" (dựng nghiêng); tia phản chiếu (code) vẽ dần 0,3 giây tới điểm kế; đốm sáng `pop` ở đó, nhảy nhót ±3px | `l5_sfx_glass_ting` |
| 6 | Hẻm | Đất hẻm | — | — | Thả đồ sáng | **bạt chưa cuộn** | — | `return_to_bag`; dây kéo `wiggle` + `sparkle` | `sfx_wrong` |
| 6 | Hẻm | Ngoài đốm sáng | — | — | Thả đồ sáng | bạt đã cuộn | — | `return_to_bag`; đốm sáng nháy 2 lần | `sfx_wrong` |
| 8 | Hẻm | Gầm xe ba gác | `l5_cart` (mới) | — | Chạm | Mun dưới gầm | — | `mun_eyes_dark` lùi sâu (mục 6.1); bong bóng suy nghĩ vẽ `l5_light_spot` | `mun_sfx_hiss_tiny` |
| 9 | Hẻm | Quạ 🎭 | `l5_crow_idle` (mới: đậu dây điện, bóng đen tròn), `l5_crow_far` (mới: đậu xa hơn trên dây) | idle | Chạm | — | idle → far (giữ) | Bay cong sang chỗ mới 0,6 giây | `l5_sfx_crow` |
| 10 | Hẻm | Ống thoát nước 🎁 | `l5_drain_pipe` (mới) | — | Chạm | — | — | `wiggle`; `ui_dried_fish` (một lần) | `sfx_clink` |

**Thứ tự lắp (G5-10, sửa G5-12):** A nhận **nắp thiếc**, B nhận **gương**, C nhận **đĩa CD**. Thả sai đồ vào đốm sáng: `return_to_bag` thẳng rồi `wiggle` trong ô (như G4-43), đốm sáng nháy 2 lần, `sfx_wrong`. Gợi ý 16 giây: icon đồ đúng kế tiếp nảy.

**Đồ thêm (G5-11):** ✨ chậu xương rồng, dây phơi áo, chuông gió (sân sau); xe đạp, vũng nước (hẻm). 🎭 thạch sùng (hẻm). 🎁 dép tổ ong (sân sau), ống bơ trên bậu cửa sổ (hẻm), mỗi chỗ 5 Cá khô một lần. Phản ứng xem bảng đồ vật trong `levels-01-10.md`.

**Nối tia (dev, G5-5):** 3 điểm cố định trong hẻm, đo theo bố cục (Dev chọn trên bản khối, GD duyệt):

| Điểm | Vị trí | Sau khi đặt đồ: đốm sáng tới | Mun phản ứng |
|---|---|---|---|
| A | Đất hẻm, dưới mép bạt, xa xe nhất (chỗ nắng rơi) | B | `mun_eyes_dark` mở to, nhìn theo đốm sáng |
| B | Bậu tường đối diện, giữa hẻm | C | `mun_paw_reach` vồ hụt 1 lần, rồi `mun_peek_out` (mới: ló cả mặt ở mép gầm) |
| C | **Xe đạp cũ dựng tường** (đĩa CD gác nghiêng ở giỏ/yên xe, hắt tia xuống trước gầm xe ba gác; G5-15) | ngay trước gầm xe, tự lượn qua lại | **Mun phóng ra** (bảng mèo) |

### Trạng thái mèo

| Giai đoạn | Tư thế | Chuyển động | Chạm Mun |
|---|---|---|---|
| Dưới gầm (Lẩn tránh) | `mun_eyes_dark` (mới) | Nháy mắt mỗi 2–3 giây | Lùi sâu, hiện lại sau 2 giây |
| Vồ thử (Lẩn tránh) | `mun_paw_reach` (mới) | Sau khi đặt ở B: bàn chân thò ra 0,4 giây rồi rụt | Rụt lại ngay |
| Ló mặt (Lẩn tránh) | `mun_peek_out` (mới) | Ló mặt ở mép gầm, mắt dõi đốm sáng | Rụt vào 1 giây rồi ló lại |
| Phóng ra đuổi (Lộ diện) | `mun_run` → `mun_pounce` (mới) | Đốm sáng tự lượn đúng 2 vòng giữa hẻm, nhanh hơn bản trước (G5-13); Mun đuổi sát, hết vòng 2 thì đè trúng | **Thắng** |
| Đè đốm sáng (Lộ diện) | `mun_pin_light` (mới: hai chân trước đè xuống đất) → `mun_look_paw` (mới: nhấc chân nhìn lòng bàn chân, đốm sáng hiện trên mu chân) | 0,8 giây mỗi tư thế, `glow_outline` | **Thắng** |

**Bong bóng nhiệm vụ ở level này:** lúc vào màn nảy mạnh hơn (scale 0 → 1,3 → 1); lúc tô màu `mun_face_icon` có thêm `ui_star_frame`.

### Danh sách ảnh (tất cả mới)

`l5_bg_backyard`, `l5_bg_alley`, `l5_cafe_window`, `l5_vanity_table`, `l5_mirror_small`, `l5_mirror_placed`, `l5_tin_lid`, `l5_tin_lid_placed`, `l5_cd_hanging`, `l5_cd_placed`, `l5_awning_cord`, `l5_cardboard_box`, `l5_trash_bag_idle`, `l5_trash_bag_after`, `l5_awning_down`, `l5_awning_rolled`, `l5_sunbeam`, `l5_light_spot`, `l5_cart`, `l5_crow_idle`, `l5_crow_far`, `l5_drain_pipe`, `player_cover_nose`, `sua_press_window`, `mun_eyes_dark`, `mun_paw_reach`, `mun_peek_out`, `mun_run`, `mun_pounce`, `mun_pin_light`, `mun_look_paw`.

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
| 6 | Giàn hoa | Lưới | — | on | Chạm | — | — | `shake_no` nhẹ, bàn chân 💡 vuốt mẫu (nếu bấm 💡) | `sfx_tap` |
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
