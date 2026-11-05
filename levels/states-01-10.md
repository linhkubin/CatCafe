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
| 1b | Bình bông lau 🎭 (G2-30) | `l2_pampas_vase_pot` + `l2_pampas_plume` (chùm bông neo giữa đáy phần vẽ, cắm vào miệng bình, xoay quanh gốc); có `l2_pampas_vase` liền mà không có `_plume` thì cả bình đung đưa quanh đáy. Hiển thị nhỏ lại ×190/230 (G2-31) cho ngọn bông nằm gọn trong khung kính. Ảnh tạm: khối code | đung đưa chậm (sau lần mở rèm đầu) | Chạm (khi rèm mở) | Rèm mở | — | Bông lau quất qua quất lại 2 nhịp (22° → −18° → 16° → −8° → 0), 7 sợi bông trắng (code) bay lơ lửng rồi mờ; 0,45 giây sau nhân vật trồi lên hắt xì (`player_sneeze`, chưa có thì `player_surprised`) | `sfx_cloth` + `sfx_sneeze` |
| 1a | Dây buộc rèm 🎭 (như đuôi mèo, G2-7) | `l2_curtain_tie` (mới: dây bông trắng thò xuống, neo đỉnh ở chỗ buộc) | — | Chạm | Rèm đóng (G2-31: mở rèm thì dây ẩn, tắt vùng chạm; đóng lại thì hiện) | — | `swing` dây ±22° tắt dần; rèm `wiggle` nhẹ | `sfx_cloth` |
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

**G3-31:** `player_dangle_pompom` sửa ảnh: xoá quả cầu lông và dây ở tay, giữ nguyên dáng, cỡ, neo.

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
| Mở màn và suốt màn (G4-40, thay mở màn bước vào gọi) | `player_reach_sofa` (nếu Art vẽ), chưa có thì `player_reach_up` | **Đứng sẵn trên sofa (13)** cạnh rèm, không che chỗ xếp tháp: neo đáy (giữa hai dép) trên đệm ngồi, lún nhẹ (cách mép trái phần vẽ sofa 135px, ở 58% chiều cao sofa). Mở màn: tiếng gọi + kiễng chân nhảy 2 cái vẫn hụt (lên 42px, kéo dài dọc ×1,05), chới với (lắc ±3°). Bong bóng nhiệm vụ hiện cạnh đầu nhân vật (tâm màn hình 800, 470) rồi thu về góc. Ở lại trên sofa suốt màn; mỗi 6–10 giây (ngẫu nhiên, khi đang ở phòng khách, không lúc chuyển phòng) kiễng chân với hụt một cái |
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

**G4-27:** ô `l4_stack_pillow` dịch sang phải ~40 px.

**G4-28 (chủ dự án, 2026-10-31):** gối bớt lệch: chỉ lệch phải 15 px so với tầng sách (G4-27 là 40 px, nhìn kênh).

## Level 5 — Đốm sáng

### Lớp hiển thị

**Sân sau:** `l5_bg_backyard` → `l5_cafe_window` (+ Sữa ở cửa sổ) → `l5_vanity_table` + `l5_mirror_small` → `l5_cardboard_box` + `l5_tin_lid` → `l5_trash_bag_*` → giao diện.

**Hẻm:** `l5_bg_alley` (có bức tường đối diện; phủ bóng râm của bạt bằng code, cả màn, G5-26) → tia nắng qua lỗ thủng (code, đường thẳng nhỏ) → đồ sáng đã đặt ở A/B/C (`l5_mirror_placed`, `l5_tin_lid_placed`, `l5_cd_placed`) → tia phản chiếu (code) → `l5_light_spot` → `l5_cart` (+ `l5_cd_hanging`, vùng gầm tối) + `mun_*` dưới gầm → `l5_drain_pipe` → `l5_awning_*` → `l5_crow_*` → giao diện.

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
| 5 | Hẻm | Bạt che kín (G5-26) | `l5_awning_down` (vẽ lại: bạt to căng ngang che kín đầu hẻm, hết bề ngang màn, **một lỗ thủng nhỏ**) | — | Chạm | — | — | Bạt phồng gió nhẹ; tia nắng qua lỗ rung rinh. Bỏ `l5_awning_rolled`, `l5_sunbeam`, chấm nắng li ti | `l5_sfx_canvas_flap` |
| 6 | Hẻm | Điểm nối tia A/B/C | `l5_light_spot` ở điểm kế tiếp | A: hiện từ đầu | Kéo-thả đồ sáng từ túi vào đốm sáng | đúng điểm đang có đốm sáng | đặt đồ, đốm sáng sang điểm kế | `drop_in` ảnh đồ "đặt" (dựng nghiêng); tia phản chiếu (code) vẽ dần 0,3 giây tới điểm kế; đốm sáng `pop` ở đó, nhảy nhót ±3px | `l5_sfx_glass_ting` |
| 6 | Hẻm | Ngoài đốm sáng | — | — | Thả đồ sáng | — | — | `return_to_bag`; đốm sáng nháy 2 lần | `sfx_wrong` |
| 8 | Hẻm | Gầm xe ba gác | `l5_cart` (mới) | — | Chạm | Mun dưới gầm | — | `mun_eyes_dark` lùi sâu (mục 6.1); bong bóng suy nghĩ vẽ `l5_light_spot` | `mun_sfx_hiss_tiny` |
| 9 | Hẻm | Quạ 🎭 | `l5_crow_idle` (mới: đậu dây điện, bóng đen tròn), `l5_crow_far` (mới: đậu xa hơn trên dây) | idle | Chạm | — | idle → far (giữ) | Bay cong sang chỗ mới 0,6 giây | `l5_sfx_crow` |
| 10 | Hẻm | Ống thoát nước 🎁 | `l5_drain_pipe` (mới) | — | Chạm | — | — | `wiggle`; `ui_dried_fish` (một lần) | `sfx_clink` |

**Thứ tự lắp (G5-10, sửa G5-12):** A nhận **nắp thiếc**, B nhận **gương**, C nhận **đĩa CD**. Thả sai đồ vào đốm sáng: `return_to_bag` thẳng rồi `wiggle` trong ô (như G4-43), đốm sáng nháy 2 lần, `sfx_wrong`. Gợi ý 16 giây: icon đồ đúng kế tiếp nảy.

**Đồ thêm (G5-11):** ✨ chậu xương rồng, dây phơi áo, chuông gió (sân sau); xe đạp, vũng nước (hẻm). 🎭 thạch sùng (hẻm). 🎁 dép tổ ong (sân sau), ống bơ trên bậu cửa sổ (hẻm), mỗi chỗ 5 Cá khô một lần. Phản ứng xem bảng đồ vật trong `levels-01-10.md`.

**Nối tia (dev, G5-5):** 3 điểm cố định trong hẻm, đo theo bố cục (Dev chọn trên bản khối, GD duyệt):

| Điểm | Vị trí | Sau khi đặt đồ: đốm sáng tới | Mun phản ứng |
|---|---|---|---|
| A | Đất hẻm, xa xe nhất (chỗ tia nắng qua lỗ thủng rơi xuống) | B | `mun_eyes_dark` mở to, nhìn theo đốm sáng |
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

`l5_bg_backyard`, `l5_bg_alley`, `l5_cafe_window`, `l5_vanity_table`, `l5_mirror_small`, `l5_mirror_placed`, `l5_tin_lid`, `l5_tin_lid_placed`, `l5_cd_hanging`, `l5_cd_placed`, `l5_cardboard_box`, `l5_trash_bag_idle`, `l5_trash_bag_after`, `l5_awning_down`, `l5_light_spot`, `l5_cart`, `l5_crow_idle`, `l5_crow_far`, `l5_drain_pipe`, `player_cover_nose`, `sua_press_window`, `mun_eyes_dark`, `mun_paw_reach`, `mun_peek_out`, `mun_run`, `mun_pounce`, `mun_pin_light`, `mun_look_paw`.

---

**G5-36:** chỗ đặt L5 không ép thứ tự; chỉ kiểm đúng món; vùng thả rộng hơn.

## Level 6 — Xuống đây nào, Mun! (G6-1)

### Lớp hiển thị (dưới → trên)

`l5_bg_backyard` (**dùng lại nền sân sau L5**) → `l6_tree` + `l6_bird_nest` → `l6_wind_chime` → `l6_shed` (nhà kho gỗ, mái tôn, ống khói) → Mun trên mái (`mun_*`, sau `l6_shed_chimney` khi lùi) → `l6_shed_chimney` → `l6_dog_house` → `l6_veggie_bed` + `l6_watering_can` → `l6_table` + `l6_picnic_basket_*` → 4 món xếp đường (`l6_barrel`, `l6_toolbox`, `l6_crate`, `l6_stool`) → `l6_glove_black_*` → `l6_dog_*` (Lu) → giao diện.

### Đồ vật

| # | Đồ vật | Ảnh trạng thái | Bắt đầu | Thao tác | Điều kiện | Chuyển sang | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|---|---|
| 1 | Mun trên mái | `mun_roof_crouch` (mới: nằm rạp tai cụp), `mun_roof_edge` (mới: ló ra mép mái nhìn xuống, run) | crouch | Chạm | Chưa lên bàn | — | Mun trượt ra sau ống khói (khuất), 2 giây sau ló lại | `mun_sfx_meow` nhỏ, run |
| 2 | Lu | `l6_dog_bark` (mới: ngồi ngẩng sủa, đuôi vẫy) | bark | Chạm | Lu chưa có xương | — | `hop` nhỏ, sủa to hơn; Mun `squash` nằm rạp. Bong bóng nhân vật: hình khúc xương (`l6_bone`) | `l6_sfx_dog_bark` |
| 3 | Bụi rau | `l6_veggie_bed` (mới) | — | Chạm | Chưa lấy xương | — | `wiggle`, lá rẽ ra, `l6_bone` (mới) `fly_to_bag` | `sfx_leaves` |
| 4 | Lu nhận xương | `l6_dog_run_bone` (mới: ngậm xương chạy), `l6_dog_chew` (mới: Lu chui hẳn vào chuồng, chỉ thò đầu ra cửa chuồng gặm xương, mắt híp vui vẻ) | bark | Thả xương vào Lu | — | bark → chew (giữ) | Lu ngậm xương chạy về chuồng (0,6 giây), chui hẳn vào trong, chỉ thò đầu ra cửa gặm xương vui vẻ, đuôi (nếu thấy) vẫy; Mun ngóc đầu (`mun_roof_edge` 1 giây rồi lại crouch nhưng tai dựng) | `l6_sfx_dog_happy`, `l6_sfx_dog_chew` lặp nhỏ |
| 5 | Giỏ picnic ở **mép trái mặt bàn** (G6-5) | `l6_picnic_basket_closed`, `l6_picnic_basket_open` (mới) | closed | Chạm | — | closed → open (giữ) | `l6_grilled_fish` (mới) `fly_to_bag` | `l6_sfx_basket` |
| 6a | Thùng phuy nước | `l6_barrel` (mới: phuy có nước), đặt ở A | chỗ cũ | **Kéo trong cảnh** tới chỗ A | — | đứng ở A | Lăn tới A, `squash` khi dựng; Mun ra mép nhìn, thấy nước, lùi | `l6_sfx_barrel_roll` |
| 6b | Hộp dụng cụ nhỏ | `l6_toolbox` (mới) | chỗ cũ | Kéo trong cảnh lên miệng phuy ở A | Phuy đã ở A | đậy trên phuy | `drop_in` khớp miệng phuy | `l6_sfx_wood_clack` |
| 6c | Thùng gỗ | `l6_crate` (mới) | chỗ cũ | Kéo trong cảnh tới chỗ B | — | ở B | `drop_in` | `l6_sfx_wood_clack` |
| 6d | Ghế đẩu | `l6_stool` (mới) | chỗ cũ | Kéo trong cảnh tới chỗ C | — | ở C | `drop_in` | `l6_sfx_stool` |
| 6x | Món xếp đường thả sai chỗ | — | — | Thả ngoài viền chỗ đặt, hoặc chỗ không hợp món | — | — | Trượt về chỗ cũ, `wiggle` 1 nhịp | `sfx_wrong` |
| 7 | Bàn (mồi, chỗ trống bên phải giỏ) | `l6_grilled_fish` đặt nằm trên bàn | — | Thả cá nướng lên bàn | **Lu đang gặm** | — | Xem Kịch bản lộ diện (nếu đủ 4 bậc); thiếu bậc: Mun ra mép kêu, cá nướng ở lại | `l6_sfx_sausage_drop` |
| 7x | Bàn khi Lu còn rảnh | `l6_dog_beg` (mới: chồm hít) | — | Thả cá nướng lên bàn | Lu chưa có xương | — | Lu chồm tới hít, sủa đòi; cá nướng `return_to_bag`; bong bóng khúc xương | `l6_sfx_dog_bark` |
| 8 | Găng tay đen 🎭 | `l6_glove_black_idle` (mới: vắt trên hàng rào, dáng như mèo ngồi), `l6_glove_black_fallen` (mới) | idle | Chạm | — | idle → fallen (giữ) | Găng rơi xuống đất dưới hàng rào, nằm yên tại chỗ (không di chuyển). Nếu Lu rảnh: Lu chạy tới chỗ găng (0,5 giây), ngậm lắc lắc, vờn 1,5 giây, bỏ găng tại chỗ rồi chạy về; Lu đang gặm thì chỉ ngẩng đầu nhìn | `l6_sfx_glove_flop` |
| 9 | Chuồng Lu | `l6_dog_house` (mới), `l6_dog_belly` (mới: Lu lăn khoe bụng) | — | Chạm | Lu đang gặm | — | Lu lăn khoe bụng 1 giây rồi gặm tiếp | `l6_sfx_dog_whine` |
| 10 | Ổ chim 🎁 | `l6_bird_nest` (mới) | — | Chạm | Chưa lấy | — | `wiggle`, 5 Cá khô rơi | `l6_sfx_bird` |
| 11 | Bình tưới 🎁 | `l6_watering_can` (mới) | — | Chạm | Chưa lấy | — | Nghiêng, nước chảy, 5 Cá khô | `l6_sfx_water` |
| 12 | Chuông gió | `l6_wind_chime` (mới, hoặc dùng lại `l5_wind_chime`) | — | Chạm | — | — | `swing`; Mun vểnh tai | `l5_sfx_chime` |

**Chỗ đặt xếp đường:** A (sát tường kho, cao nhất: phuy + hộp dụng cụ), B (thùng gỗ), C (ghế đẩu, thấp nhất, **sát cạnh bàn**; bàn đặt gần chân đường xuống). Khi đang kéo một món, chỗ hợp với món đó hiện viền mờ; thả trong khoảng ~110px quanh chỗ đặt là khớp.

### Trạng thái mèo

| Giai đoạn | Tư thế | Chuyển động | Chạm Mun |
|---|---|---|---|
| Mở màn (G6-6) | `mun_run`, `mun_jump_up` | Lu đuổi sau, Mun chạy **một vòng quanh sân** (khoảng 2,5 giây); hết vòng Mun nhảy liên tiếp lên **bàn → thùng gỗ (ở chỗ ban đầu) → cột điện (bám leo) → mái kho**, mỗi nhịp 0,35 giây. Lu chạy tới dưới mái, ngồi sủa | — |
| Lu còn sủa (Lẩn tránh) | `mun_roof_crouch` | Nằm rạp, tai cụp, run nhẹ | Lùi sau ống khói |
| Lu đã gặm (Lẩn tránh) | `mun_roof_crouch` tai dựng | Mỗi lần thêm bậc: `mun_roof_edge` 1,2 giây rồi lùi | Lùi sau ống khói |
| Xuống bậc | `mun_step_down` (mới: rón rén bước xuống), `mun_jump_up` (mới: nhún nhảy lên) | Từ mái → hộp dụng cụ (A) → thùng gỗ (B) → ghế (C) → **nhảy lên bàn**, mỗi bậc 0,5 giây; ở bậc A ngoái nhìn người chơi | — (đang di chuyển, không nhận chạm) |
| Ăn trên bàn (Lộ diện) | `mun_eat` (mới: cúi ăn cá nướng trên bàn) → `mun_sit_look` | Ăn 1,5 giây, liếm mép, ngẩng nhìn | **Thắng** |

### Kịch bản lộ diện (cá nướng trên bàn, đủ 4 bậc, Lu đang gặm)

1. Mũi Mun khịt khịt (0,5 giây), Mun bò ra mép mái.
2. Bước xuống hộp dụng cụ, **ngoái lại nhìn người chơi** 0,5 giây; xuống thùng gỗ; xuống ghế; nhún người nhảy phốc lên bàn.
3. Ngấu nghiến cá nướng, liếm mép, ngẩng nhìn người chơi. `glow_outline`, Mun Lộ diện.
4. Lu thò đầu khỏi chuồng: Mun xù lông 0,5 giây rồi nép sát về phía người chơi (trên bàn, cạnh giỏ). Vẫn Lộ diện.
5. Chạm Mun → cảnh bế chung.

### Danh sách ảnh

- **Dùng lại:** `l5_bg_backyard`, `l5_wind_chime` (nếu hợp), các tư thế Mun đã có (`mun_run`, `mun_sit_look`, `mun_held`, `mun_face_icon`).
- **Mới:** `l6_shed`, `l6_shed_chimney`, `l6_tree`, `l6_bird_nest`, `l6_dog_house`, `l6_veggie_bed`, `l6_watering_can`, `l6_table`, `l6_picnic_basket_closed`, `l6_picnic_basket_open`, `l6_bone`, `l6_grilled_fish`, `l6_barrel`, `l6_toolbox`, `l6_crate`, `l6_stool`, `l6_glove_black_idle`, `l6_glove_black_fallen`, `l6_dog_bark`, `l6_dog_run_bone`, `l6_dog_chew`, `l6_dog_beg`, `l6_dog_belly`, `mun_roof_crouch`, `mun_roof_edge`, `mun_step_down`, `mun_eat`.

---

**G6-28:** `l6_grilled_fish` (mới, thay `l6_sausage`; cá nướng cả con), `l6_plate` (mới: đĩa trắng tròn đặt sẵn giữa mặt bàn, dưới cá). Thả cá: cá nằm giữa đĩa.

**G6-29 (chủ dự án, 2026-10-31):** đĩa hạ xuống 38 px cho nằm hẳn trên mặt bàn; cá trên đĩa nhỏ lại, rộng khoảng 70% đĩa.

**G6-30 (chủ dự án, 2026-10-31):** cá trên đĩa lệch lên 6 px, sang phải 5 px so với tâm đĩa (chỉnh lại từ 8 px).

## Level 7 — Về nhà thôi, Mun!

Mô tả gameplay: `levels-01-10.md` mục Level 7 (G7-5 → G7-12). Màn có 3 cảnh nối nhau, Mun đi từ phải sang trái; mọi cảnh phủ `l7_rain` (lớp mưa) và tông đêm (code), **chớp + tia sét xa + sấm** (code), **lá bay và cành nhỏ rơi** (`l7_leaf`, `l7_twig`). Mun ướt suốt màn: giọt nước nhỏ (code). **Mun luôn quay mặt theo hướng đi (trái)** khi di chuyển; **chạy 2 khung** `mun_run` ↔ `mun_run_b` (0,12 giây/khung). **Chỗ ngồi chờ luôn trên nền khô**, trước chướng ngại ~40px; riêng đoạn ngập cảnh 1 Mun ngồi **ngay mép nước** (G7-15). **Mun giữ cỡ như L6; đồ và nhà theo tỉ lệ thật so với Mun** (G7-12).

### Lớp hiển thị (dưới → trên)

**Cảnh 1, góc hẻm:** `l5_bg_alley` (dùng lại) → tia sét xa (code) → `l7_flood_strip` → `l5_cart` → `l7_tin_fallen` / `l7_tin_propped` → `l7_branch` → `l7_branch_prop`, `l7_plank` → Mun → lá bay, cành nhỏ rơi → `l7_rain` → giao diện.

**Cảnh 2, trước quán nước:** `l7_bg_shop_street` (mới, rộng ≥ 1366) → `l7_tree_shop` → `l7_shop_table` → `l7_umbrella_*` → `l7_box_carton_*` → `l7_stray_dog_*` → `l7_bike_*` → mưa xối ở sân (code, tắt dưới ô khi ô bung) → Mun → `l7_rain` → giao diện.

**Cảnh 3, trước nhà nhân vật:** `l7_bg_house_front` (mới, rộng ≥ 1366; **cửa sổ to, cửa chính cao** theo tỉ lệ G7-12) → `l7_window_inside` + `player_back_tv` → `l7_window_closed` / `l7_window_open` → `l7_window_hook` (giữa khung trên) + `l5_wind_chime` (khi treo) → `l7_front_door` → `l6_crate`, `l6_toolbox` → Mun → nhân vật ở cửa sổ → `l7_rain` → giao diện.

### Đồ vật

| # | Đồ vật | Ảnh trạng thái | Bắt đầu | Thao tác | Điều kiện | Chuyển sang | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|---|---|
| 1 | Tấm tôn mỏng lượn sóng | `l7_tin_fallen` (mới), `l7_tin_propped` (mới: mép dưới mắc trong cành chạc, G7-16) | fallen | Chạm | Chưa chống | — | `wiggle`; mắt Mun chớp trong khe | `l7_sfx_tin_rattle` |
| 2 | Cành cây chạc chữ Y (G7-16, thay thùng xốp) | `l7_branch_prop` (mới) | nằm cạnh tường | Kéo vào ô chạc (sát miệng khe, dưới mép tôn) | — | fallen → propped | `drop_in` dựng đứng; tôn nâng dần 0,4 giây, mắc vào chạc; Mun bò ra | `l7_sfx_tin_creak` |
| 3 | Đoạn ngập | `l7_flood_strip` (mới) | — | Chạm | — | — | toé nước (code); Mun thò chân rụt lại | `l7_sfx_splash` |
| 4 | Tấm ván | `l7_plank` (mới: dài 400, gác hai đầu chỗ khô; bản rộng gần gấp đôi thân Mun) | dựa tường | Kéo vào ô ván | — | nằm ngang qua đoạn ngập | `drop_in`, nhún | `l7_sfx_wood_wet` |
| 5 | Cành cây gãy rất to | `l7_branch` (mới: cao ~2 lần Mun ngồi, nhiều nhánh lá rậm) | rơi lúc mở màn, chắn lối | Kéo **ra** ô cành | — | ở bãi trống | Lết nặng, rơi giọt nước, lá rung | `l7_sfx_leaves_drag` |
| 7 | Bàn nhựa quán | `l7_shop_table` (mới: bàn có lỗ cắm ô) | — | Chạm | — | — | `wiggle`, nước toé | `l7_sfx_table` |
| 8 | Ô to của quán | `l7_umbrella_closed` (mới), `l7_umbrella_open` (mới) | closed, nằm đất | Kéo vào ô sáng ở lỗ cắm giữa bàn; vùng khớp rộng cỡ cả bàn (G7-15) | — | closed → open | Bung 0,3 giây; vùng dưới ô hết mưa xối | `l7_sfx_umbrella_open` |
| 9 | Con chó lạ (cao ~1,6 lần Mun ngồi) | `l7_stray_dog_scared` (mới), `l7_stray_dog_inbox` (mới) | scared | Chạm | — | — | ư ử, rúc đầu; mỗi lần sấm run | `l7_sfx_dog_whimper` |
| 10 | Thùng các-tông rất to (to hơn chó) | `l7_box_carton_open` (mới: hộp mở nắp đặt ngửa, như hộp L3), `l7_box_carton_side` (mới: hộp lật nằm ngang, miệng quay ra) | ngửa | Kéo vào ô thùng (cao hơn, sát tường hơn, G7-15) | — | ngửa → nằm ngang; chó scared → inbox | Lật nghiêng 0,3 giây, `swap`; chó chui vào 0,6 giây, thò mũi | `l7_sfx_box` |
| 11 | Xe đạp (cao ~2 lần Mun ngồi) | `l7_bike_fallen` (mới), `l7_bike_standing` (dùng `l5_bike` nếu đúng tỉ lệ) | fallen | Chạm giữ rồi kéo lên ≥ 60px là dựng tại chỗ; ô sáng ngay trên chỗ xe đổ, khớp ~180px | — | fallen → standing | Xoay đứng 0,3 giây, chân chống "cạch" | `l7_sfx_bike_stand` |
| 12 | Cửa cuốn ✨ | (trong nền) | — | Chạm | — | — | rung nhẹ, chó giật mình | `l7_sfx_shutter` |
| 13 | Chuông gió trên nắp hộp (G7-16) | `l5_wind_chime` (dùng lại) | trên nắp hộp | Kéo thẳng vào móc | — | chuông treo | Thả sai chỗ: `return_to_bag` về nắp hộp (theo chỗ hộp hiện tại) | leng keng nhỏ |
| 13' | Hộp bé | `l6_toolbox` | dưới phải | Kéo ngay từ đầu vào ô hộp (bậc 1) (G7-16) | Chuông còn trên nắp thì chuông đi theo hộp | ở ô hộp | `drop_in` | `l6_sfx_wood_clack` |
| 14 | Thùng gỗ | `l6_crate` (dùng lại) | dưới trái | Kéo vào ô thùng (bậc 2, sát tường) | — | ở ô thùng | `drop_in`; đủ 2 bậc → Mun trèo lên bậu | `l6_sfx_wood_clack` |
| 15 | Cửa sổ to | `l7_window_closed`, `l7_window_open` (mới) | closed | **Chạm** | — | closed → open | mở 0,3 giây | `l7_sfx_window` |
| 16 | Móc giữa cửa sổ | `l7_window_hook` (mới) | trống | Thả chuông gió (kéo từ nắp hộp) | — | chuông treo | `swing` rất khẽ | `l5_sfx_chime` rất nhỏ |
| 17 | Cửa chính ✨ | `l7_front_door` (mới, cao ~4 lần Mun ngồi) | — | Chạm | — | — | `wiggle` | `l7_sfx_knock` |
| 18 | Ti vi / nhân vật ✨ | `l7_window_inside`, `player_back_tv` | — | Chạm (qua kính) | Chưa kết | — | ánh ti vi đổi màu, vai nhân vật rung | `l7_sfx_tv` |
| x | Món thả sai | — | — | Thả ngoài ô hoặc sai ô | — | — | Nảy về chỗ cũ, `wiggle` 1 nhịp | `sfx_wrong` |

**Ô sáng:** viền sáng mờ đúng hình món ở tư thế đặt (code), nhịp 1,5 giây, hiện từ đầu cảnh. Bán kính khớp ~110px (xe đạp ~180px).

### Trạng thái mèo

| Giai đoạn | Tư thế | Chuyển động | Chạm Mun |
|---|---|---|---|
| Mở màn | `mun_run` ↔ `mun_run_b` | Giật mình khi tôn sụp, phóng vào khe xe–tường | — |
| Trong khe | `mun_eyes_dark` | Mắt chớp, run | Meo nhỏ, mắt nhìn sang trái |
| Ngồi chờ (nền khô) | `mun_sit_wet` (mới) | Run nhẹ, thỉnh thoảng giũ nước | Meo, ngoái nhìn người chơi, ngóng trái |
| Chạy | `mun_run` ↔ `mun_run_b` (mới) | Sang trái ~200px/giây, mặt luôn hướng trái; qua ván / bậc dùng `mun_climb` / `mun_hop_down` / `mun_land` | — |
| Dưới gốc cây (cảnh 2) | `mun_sit_wet` → `mun_paw_rain` (mới) | Thò chân bị mưa quất, rụt lại | Meo |
| Chờ con chó | `mun_sit_wet` lông dựng | Run, nhìn chó | Meo rất nhỏ |
| Rón rén qua miệng thùng | `mun_sneak` (mới) | Đi chậm | — |
| Nhảy thử bậu, tuột | `mun_slip` (mới) → `mun_sit_wet` | Bật lên, tuột, giũ nước | — |
| Trên bậu, cửa đóng | `mun_paw_glass` (mới) xen `mun_shy_sill` | Khều kính, meo | Cúi đầu, run |
| Trên bậu, cửa mở | `mun_shy_sill` (mới) | Rụt rè lặp 3 giây | Cúi đầu, run |
| Khều chuông | `mun_paw_chime` (mới) | Rướn khều mạnh | — |
| Nhân vật giang tay (Lộ diện) | `mun_sit_look` (dùng lại) | Ngẩng nhìn nhân vật, `glow_outline` | **Thắng** → cảnh bế chung |

### Kịch bản về nhà (chuông treo + cửa sổ mở + Mun ở bậu)

1. Mun khều mạnh: `l5_wind_chime` `swing` mạnh, leng keng to.
2. `player_back_tv` → `player_surprised` (dùng lại): nhân vật quay lại, bong bóng trái tim.
3. Nhân vật tới cửa sổ, giang tay không cầm khăn: `player_arms_open` (mới) (G7-15). Mun `mun_sit_look`, `glow_outline` → **Lộ diện**.
4. Người chơi **chạm Mun** → **cảnh bế chung**, thay `mun_held` bằng `mun_held_towel` (mới: Mun ướt nằm trong **khăn to lót dưới và vòng lên che sau lưng**, như ổ khăn), thêm giọt nước. Thưởng 50 Cá khô · ♥ 3/6.

### Danh sách ảnh

- **Dùng lại:** `l5_bg_alley`, `l5_cart`, `l5_bike` (nếu đúng tỉ lệ), `l5_wind_chime`, `l6_crate`, `l6_toolbox`, `mun_run`, `mun_eyes_dark`, `mun_climb`, `mun_hop_down`, `mun_land`, `mun_sit_look`, `player_surprised`, cảnh bế chung.
- **Mới:** `l7_rain`, `l7_leaf`, `l7_twig`, `l7_tin_fallen`, `l7_tin_propped`, `l7_branch_prop`, `l7_puddle`, `l7_branch_debris`, `l7_flood_strip`, `l7_plank`, `l7_branch`, `l7_bg_shop_street`, `l7_tree_shop`, `l7_shop_table`, `l7_umbrella_closed`, `l7_umbrella_open`, `l7_stray_dog_scared`, `l7_stray_dog_inbox`, `l7_box_carton_open`, `l7_box_carton_side`, `l7_bike_fallen`, `l7_bg_house_front`, `l7_window_inside`, `l7_window_closed`, `l7_window_open`, `l7_window_hook`, `l7_front_door`, `player_face_icon`, `mun_run_b`, `mun_sit_wet`, `mun_paw_rain`, `mun_sneak`, `mun_slip`, `mun_paw_glass`, `mun_shy_sill`, `mun_paw_chime`, `mun_held_towel`, `player_back_tv`, `player_arms_open`.
- **Bỏ (G7-12):** `player_towel_hold`. (G7-16: bỏ `l7_foam_box`. G7-15: bỏ `l7_broom`, `l7_box_carton`, `l7_towel`, `l7_icon_home`, `l7_icon_paw`, `player_towel_open`.) (G7-14: cảnh 1 trả về tôn, chổi, ván, cành; bỏ ống máng, dòng nước xiết, cổng.)

---

**G7-17:** `l7_step_ladder` (mới: thang gỗ nhỏ 3 bậc chữ A; gập dựa tường / bung đứng dưới mép tôn; thay `l7_branch_prop`), bong bóng nhớ chỉ `player_face_icon`, ~70% cỡ, góc trên phải Mun, `l7_branch_small` ×2 (mới, kéo ra ô cành như `l7_branch`), xe đạp cảnh 2 dùng `l5_bike` (đổ = xoay nằm ngang, bỏ `l7_bike_fallen`), mưa xối sân quán vẽ lại bằng code tự nhiên hơn, `l5_wind_chime` trên nắp hộp xoay nằm ngang. Mun nấp/chờ cảnh 1 cách mép nước ≥ 60 px.

**G7-18:** thang 2 bậc, cao ~2/3; chắn lối = 3 cành to sát nhau (`l7_branch` ×3, bỏ `l7_branch_small`); ván ngắn lại, vùng chạm rộng; xe đạp cảnh 2 ghép `l5_bike` + `l5_bike_wheel`; cửa chính cao ~2/3, rộng hơn; cửa sổ ~4/5.

**G7-19:** thang dùng một dáng bung `l7_step_ladder_open` từ đầu (bỏ dáng gập); bóng mờ ô sáng chỉ hiện cho món đang cầm; 3 cành vào ô bất kỳ; kéo đồ bám sát tay (bỏ trễ của cành).

**G7-20:** mái tôn cảnh 1 dùng `l5_awning_down` (bỏ `l7_tin_fallen` / `l7_tin_propped`); xe đạp cảnh 2 dáng đổ là dựng dọc nghiêng, đúng tỉ lệ (bỏ ép dẹt); chuông cảnh 3 xuất hiện treo ở góc cửa chính (không còn trên nắp hộp), điểm đặt vẫn là móc cửa sổ.

**G7-21:** mái `l5_awning_down` cảnh 1 cùng một cỡ ở mọi trạng thái (dựng / sụp / kê thang), đủ to che chỗ trú; lúc sụp không trông nhỏ đi.

**G7-22:** mái cảnh 1 có 3 dáng cùng cỡ: trên cao gắn tường như L5 (đầu màn) → rơi nằm chéo dưới đất → gác đỉnh thang thành mái chéo.

**G7-23:** cảnh 1: mở màn Mun đứng lâu hơn, chớp một cái rồi mới chui gầm xe; chỗ nấp sâu hơn; mái sụp +25 px phải, −4 px; nhiều vũng ngập; ô sáng chỉ hiện khi nhấc món, cành chỉ sáng 1 ô; Mun chạy 2 khung. Cảnh 2: vẽ lại cây, Mun trên lớp cây, bàn có lỗ cắm ô to, vẽ lại chó (Lu), chó chui thùng đẹp hơn, nhiều vũng ngập.

**G7-25:** cảnh 1 bỏ thang, kéo mái sụp đặt lên xe ba gác; Mun chạy thẳng qua ván (không nhảy), đường đi khớp ván, đi ngang tới điểm sau. Cảnh 2: ô dài hơn, cán xuyên lỗ bàn; xe đạp to hơn; chó vẽ lại theo style L6; mặt chó trong lòng thùng, to hơn; Mun chạy tự nhiên như cảnh 1.

**G7-27:** cán ô dài vẽ lại tự nhiên; chó trong thùng vẽ lại (đầu + chân trước gác mép); cảnh 3 Mun tới chỗ chờ đứng yên; cảnh 3 lên 4 px, thùng gỗ + hộp to hơn và xuống 2 px; đủ 2 bậc là Mun lên bậu (không chờ chuông); khung cửa sổ ×1,05, ô văng lên 3 px.

## Level 8 — Tắm cho Mun

Mô tả gameplay: `levels-01-10.md` mục Level 8. Một cảnh cố định, Mun ngồi giữa màn hình trên ghế nhựa; vòi sen và khăn bông treo sẵn trong cảnh; khay đồ cầm tay thay túi đồ ở đáy màn hình, **đổi theo chặng** (1–3 món mỗi chặng). Kéo tự do, ép thứ tự: chỉ dụng cụ của bước hiện tại có tác dụng.

### Lớp hiển thị (dưới → trên)

`l8_bg_bathroom` (mới) → `l8_towel_rack` (mới: thanh treo tường trái) + `l8_tool_towel` khi đang vắt → `l8_shower_mixer` (mới: van trộn) + ống mềm (code: đường cong võng, nối van → vòi sen, theo tay) → `l8_shower_hook` (mới: móc tường phải) + `l8_tool_shower` khi đang treo → vũng nước sàn (code: elip loang, màu trong / nâu bùn / trắng bọt, rút dần) + `l8_floor_drain` (mới: lỗ thoát nước) → `l8_duck` → `l8_stool_plastic` (mới: ghế nhựa thấp) → Mun (`mun_bath_*`) → lớp phủ trên Mun: `l8_mud_patch_a/b/c`, `l8_burr` ×2, `l8_leaf_a/b/c/d`, `l8_twig_a/b`, `l8_oil_drop` ×5, bọt nhỏ `l8_foam_bubble_a/b/c` (nhiều hạt) → vòng tròn gợi ý (code) → vòng tiến độ chung của bước (code) → bong bóng mặt Mun `ui_emote_mun_happy` / `ui_emote_mun_no` → hạt nước, bong bóng bay (code) → dụng cụ đang kéo → khay dụng cụ (dùng lại `ui_bag_bar` + `ui_bag_slot`) + dụng cụ của chặng hiện tại → giao diện.

### Dụng cụ và bước

| Bước | Dụng cụ | Ảnh | Kiểu | Chỗ cần làm | Điều kiện xong | Mun chuyển sang | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|---|---|
| 1 | (tay) | `l8_leaf_a/b/c/d` (mới, 4 lá khác nhau), `l8_twig_a/b` (mới, 2 cành khô nhỏ) | Kéo | 4 lá + 2 cành trên Mun | Cả 6 thứ đã kéo ra ngoài vùng Mun (cành: theo tay chậm hơn, phải kéo xa hơn mới rời) | (giữ `mun_bath_dirty`) | Lá `fly_arc` xoay rơi khỏi màn hình; cành rơi xuống sàn, `hop` nhỏ, nằm lại; Mun `wiggle` ±4° 0,3 giây + tai giật (code), **không co nhỏ** (G8-6) | `l8_sfx_leaf`, `l8_sfx_twig` |
| 2 | Lược thưa | `l8_tool_comb_wide` (mới) | Vuốt | `l8_burr` ở đuôi và `l8_burr` (cùng ảnh, cỡ 100% theo demo) trên đỉnh đầu giữa hai tai (G8-10) | Mỗi chỗ vuốt đủ ~1,5 giây, thứ tự tự do | — | Ké nhạt dần, bật hạt nhỏ, đuôi `wiggle` | `l8_sfx_burr_pop` |
| 3 | Vòi sen (treo trên móc) | `l8_tool_shower` (mới), tia nước (code) | Vuốt | `l8_mud_patch_a/b/c` | Mỗi mảng giữ ~1,5 giây | `mun_bath_dirty` → `mun_bath_wet` | Mảng bùn nhạt dần; vũng sàn ngả nâu, loang rộng | `l8_sfx_shower` |
| 4 | Dầu tắm | `l8_tool_shampoo` (mới, không chữ) | Vuốt | Lưng, hông | Đủ 5 vết dầu (mỗi đoạn di chai ~120px trên vùng Mun nhỏ 1 vết; vòng chung +1/5 mỗi vết) | — | Chai nghiêng (code), `l8_oil_drop` (mới: vết dầu tròn nhỏ, lấp lánh) `drop_in` (xoay 90° thành dáng giọt, đầu nhọn hướng lên, G8-10) vào **5 chỗ đặt sẵn xếp đều thành hàng hơi cong dọc sống lưng**, cỡ gần bằng nhau, xoay rất nhẹ; di chai qua chỗ còn trống nào thì giọt rơi vào chỗ đó (G8-9); đủ 5 thì Mun rùng mình (`wiggle`) (G8-8) | `l8_sfx_squirt` |
| 5 | Bông tắm | `l8_tool_sponge` (mới) | Vuốt | Cả thân | Vuốt đủ ~3 giây | `mun_bath_wet` → `mun_bath_foam` | Bọt nở trước tại các vết `l8_oil_drop` rồi lan ra; vết dầu bông tắm đi qua thì mờ đi; dưới bông tắm nở dần nhiều bọt nhỏ `l8_foam_bubble_a/b/c` (mỗi bọt `pop` 0,15 giây, chồng nhau, tới khi phủ kín thân; tối đa ~60 bọt); thỉnh thoảng 1 bọt bay lên phòng | `l8_sfx_foam` |
| 6 | Khăn mặt ẩm | `l8_tool_facecloth` (mới) | Vuốt | Mặt | Vuốt đủ ~1,5 giây | — | `mun_bath_sneeze` 0,6 giây, một bong bóng bay ra | `mun_sfx_sneeze` |
| 7 | Vòi sen (treo trên móc) | `l8_tool_shower` | Vuốt | Cả thân | Vuốt đủ ~2 giây | `mun_bath_foam` → `mun_bath_wet` (sạch) | Bọt nhỏ dưới tia nước vỡ (`pop` ngược + 2–3 hạt) hoặc trôi xuống theo tia; vũng sàn trắng bọt rồi trong lại | `l8_sfx_shower` |
| 8 | Khăn bông to (vắt trên thanh) | `l8_tool_towel` (mới: dáng khăn vắt; lúc quấn dùng `mun_bath_towel`) | Thả + chờ | Cả thân | Thả trong vùng Mun, rồi vòng chung tự đầy trong ~2,5 giây | `mun_bath_wet` → `mun_bath_towel` | `drop_in`; Mun dụi mặt, lim dim; vòng đầy thì khăn tự tuột ra, `fly_arc` bay vòng về vắt lại trên `l8_towel_rack` (không mờ, G8-9), Mun về dáng `mun_bath_wet` khô hơn (dùng `mun_bath_towel` → `mun_bath_wet`) | `l7_sfx_cloth` |
| 9 | Máy sấy | `l8_tool_dryer` (mới), vệt gió (code) | Vuốt | Cả thân | Vuốt đủ ~2,5 giây | `mun_bath_wet` → `mun_bath_fluffy` | Lông phồng (đổi ảnh khi xong) | `l8_sfx_dryer` |
| 10 | Lược chải lông | `l8_tool_brush` (mới) | Vuốt | Lưng | Vuốt đủ ~2 giây | `mun_bath_fluffy` → `mun_bath_sleek` | `sparkle` trên lông; rừ rừ | `mun_sfx_purr` |
| x | Dụng cụ sai bước / đã dùng xong | — | — | — | Thả trên vùng Mun | — | dáng Mun hiện tại `wiggle` 0,5 giây (lắc đầu bằng code); dụng cụ `return_to_bag` về ô khay (vòi sen về móc, khăn về thanh); vòng tròn gợi ý ở chỗ cần làm nhấp nháy mạnh 1 nhịp | `sfx_wrong` |
| x' | Bất kỳ dụng cụ | — | — | — | Thả ngoài vùng Mun | — | `return_to_bag` về ô khay; vòi sen bay về móc và đung đưa (`swing` 2 nhịp); khăn về thanh | — |

**Vòng tiến độ (G8-5, thay G8-4):** mỗi bước **một vòng chung** (code) ở chỗ cố định cạnh trên bên phải Mun, tô đầy theo tổng tiến độ của bước: bước nhiều thứ (6 lá/cành, 3 chỗ ké/hạt kê, 3 mảng bùn) thì mỗi thứ góp một phần bằng nhau; bước vuốt thì theo thời gian vuốt; bước 8 thì tự đầy trong ~2,5 giây sau khi thả khăn. Vòi sen vẫn vuốt như cũ, tiến độ cộng vào vòng chung. Đầy thì `sfx_ting`, vòng `pop` to rồi tắt; bước mới vòng mới từ 0. **Chỉ hiện khi dụng cụ/tay chạm vùng Mun** (`pop` vào với phần đã làm); rời vùng Mun quá 1 giây thì mờ đi (G8-6).

**Bong bóng mặt Mun (G8-4):** `ui_emote_mun_happy` (mới: bong bóng nhỏ, mặt mèo đen vui) khi xong một phần (một lá, một cành, một mảng bùn…) hoặc xong bước; `ui_emote_mun_no` (mới: mặt mèo đen nhăn, không vui) khi thả dụng cụ sai hoặc xịt vòi sen vào Mun sai bước. Hiện trên đầu Mun 0,8 giây, `pop` vào, mờ ra.

**Chỗ cần làm (G8-5):** mọi chỗ gợi ý đều là **vòng tròn sáng** (code) đặt trên từng chỗ (lá, ké, bùn, mặt…), nhịp 1,5 giây; chỉ chỗ của bước hiện tại sáng; chỗ xong thì vòng tròn tắt. Gợi ý 16 giây và 💡 cũng dùng vòng tròn này. Dụng cụ vuốt: tiến độ tính theo thời gian dụng cụ nằm trên vùng và đang di chuyển; vùng nhạt dần theo tiến độ, thả tay giữ nguyên tiến độ. Đồ trong khay dùng xong bước cuối: ô khay mờ 50%. Vòi sen trên móc và khăn trên thanh không mờ (G8-9).

**Dụng cụ treo trong cảnh (G8-3):** vòi sen (`l8_shower_hook`, tường phải) và khăn bông (`l8_towel_rack`, tường trái) có suốt màn, không nằm trong khay. Kéo thẳng từ chỗ treo.

**Khay theo chặng:** dùng lại `ui_bag_bar` + `ui_bag_slot` của túi đồ, chỉ chứa đồ cầm tay, hiện 1–3 ô, căn giữa (G8-1, G8-3). Thứ tự ô cố định trong mỗi chặng, cố ý không theo thứ tự tắm:

| Chặng | Bước | Ô khay (trái → phải) |
|---|---|---|
| 1 | 1–3 | `l8_tool_comb_wide` |
| 2 | 4–7 | `l8_tool_facecloth`, `l8_tool_sponge`, `l8_tool_shampoo` |
| 3 | 8–10 | `l8_tool_dryer`, `l8_tool_brush` |

Xong bước cuối của chặng: khay cũ trượt xuống khỏi màn hình 0,25 giây, khay mới trượt lên 0,25 giây (`ease-out`), chỗ cần làm của bước đầu chặng mới sáng ngay sau đó. Khoá kéo trong lúc khay trượt. Nhạc thêm một lớp khi vào chặng 2 và chặng 3.

**Sai bước có phản ứng riêng:** `l8_tool_shower` xịt vào Mun ở bước 4–6 → lắc nhẹ hai bên ±4° 2 nhịp + hạt nước, không đổi ảnh (G8-9); `l8_tool_dryer` thả ở bước 8 → lắc dáng hiện tại + hạt nước bắn ra (code). Dụng cụ vẫn `return_to_bag`.

### Đồ thêm

| # | Đồ vật | Ảnh | Thao tác | Điều kiện | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|
| a | Vịt cao su 🎁 (dưới sàn) | `l8_duck` (mới) | Chạm | Lần đầu | `hop`; `ui_dried_fish` +5 | `l8_sfx_squeak` |
| a' | Vịt ✨ | `l8_duck` | (tự động) | Vũng nước loang tới vịt | Nổi bập bềnh (code: nhún 6px, nghiêng ±6°) | — |
| a'' | Vịt ✨ | `l8_duck` | Tia vòi sen chạm gần vịt | — | `hop` 3 nhịp (không xoay) | `l8_sfx_squeak` ×2 |
| d | Vòi sen xịt lung tung ✨ | `l8_tool_shower` | Kéo vòi sen ra bất kỳ lúc nào | — | Luôn xịt nước; nước rơi xuống làm vũng sàn loang; tia chạm Mun ngoài bước 3 và 7 → lắc nhẹ hai bên (code) + `ui_emote_mun_no` | `l8_sfx_shower` |
| b | Mun ướt ✨ | dáng hiện tại | Chạm Mun | Bước 1–7 | Lắc nhẹ sang hai bên ±4°, 2 nhịp (code, không đổi ảnh, G8-9), giọt nước bắn ra và đọng trên màn hình 1 giây (code) | `mun_sfx_shake` |
| c | Mun khô ✨ | `mun_bath_towel` / `fluffy` / `sleek` | Chạm Mun | Bước 8–10 | `hop` nhẹ, dụi đầu (code nghiêng 8°) | `mun_sfx_purr` |

### Trạng thái mèo

Mọi ảnh `mun_bath_*` **cùng dáng ngồi, cùng cỡ, cùng đường đáy** (vẽ chung một tờ), chỉ đổi phần lông.

| Giai đoạn | Tư thế | Chuyển động | Chạm Mun |
|---|---|---|---|
| Mở màn | `mun_bath_dirty` | Hiện dần cùng cảnh (đã ngồi sẵn trên ghế nhựa), lắc mình rơi vụn bùn | — |
| Bước 1–3 | `mun_bath_dirty` (mới: lông bết bùn khô, xù rối, ngồi co ro) | `breathe`, thỉnh thoảng run | Lắc mình bắn nước |
| Bước 3–4, 7 | `mun_bath_wet` (mới: lông bết sát người, gầy hẳn, mắt to tròn) | `breathe`, nhỏ giọt (code) | Lắc mình bắn nước |
| Bước 5–6 | `mun_bath_foam` (mới: dáng ướt, mắt híp dễ chịu, **không vẽ bọt**; bọt là nhiều bọt nhỏ `l8_foam_bubble_*` phủ lên, G8-2, G8-5) | Lắc lư nhẹ | Lắc mình bắn bọt |
| Lau mặt | `mun_bath_sneeze` (mới: nhắm tịt mắt, nhăn mũi) | 0,6 giây rồi về dáng trước | — |
| Bước 8 | `mun_bath_towel` (mới: quấn khăn, chỉ thò mặt) | Dụi mặt vào khăn | Dụi đầu |
| Bước 9 | `mun_bath_fluffy` (mới: lông phồng tròn xoe như cục bông) | `breathe` | Dụi đầu |
| Bước 10 | `mun_bath_sleek` (mới: lông mượt bóng, ngồi thẳng) | `sparkle` | Dụi đầu |
| Sai dụng cụ | dáng hiện tại | `wiggle` lắc đầu 0,5 giây (code, không ảnh riêng) | — |
| Kết | `mun_bath_lick` (mới: cúi liếm hông), `mun_bath_tongue` (mới: khựng, lè lưỡi) | Liếm 2 giây → lè lưỡi 0,8 giây → liếm tiếp → `mun_bath_sleek` + `glow_outline` | **Thắng** (chỉ sau khoảnh khắc kết) |

### Kịch bản kết (xong bước 10)

1. `mun_bath_sleek` ngồi thẳng, nhìn ra màn hình 1 giây.
2. `mun_bath_lick` 2 giây → `mun_bath_tongue` 0,8 giây (nhạc ngắt một nhịp) → `mun_bath_lick` 1 giây.
3. `mun_bath_sleek` + `glow_outline`: chạm Mun → **cảnh bế chung**, thêm vài bong bóng bay quanh. Thưởng 30 Cá khô · ♥ 4/6.

### Danh sách ảnh (tất cả mới)

`l8_bg_bathroom`, `l8_stool_plastic`, `l8_shower_hook`, `l8_shower_mixer`, `l8_towel_rack`, `l8_floor_drain`, `l8_duck`, `l8_leaf_a`, `l8_leaf_b`, `l8_leaf_c`, `l8_leaf_d`, `l8_twig_a`, `l8_twig_b`, `l8_burr`, `ui_emote_mun_happy`, `ui_emote_mun_no`, `l8_mud_patch_a`, `l8_mud_patch_b`, `l8_mud_patch_c`, `l8_oil_drop`, `l8_foam_bubble_a`, `l8_foam_bubble_b`, `l8_foam_bubble_c` (3 cỡ bọt nhỏ), `l8_icon_mun_clean` (bong bóng nhiệm vụ: mặt Mun sạch lấp lánh), `l8_tool_comb_wide`, `l8_tool_shower`, `l8_tool_shampoo`, `l8_tool_sponge`, `l8_tool_facecloth`, `l8_tool_towel`, `l8_tool_dryer`, `l8_tool_brush`, `mun_bath_dirty`, `mun_bath_wet`, `mun_bath_foam`, `mun_bath_sneeze`, `mun_bath_towel`, `mun_bath_fluffy`, `mun_bath_sleek`, `mun_bath_lick`, `mun_bath_tongue`. **Dùng lại:** `ui_bag_bar`, `ui_bag_slot`, cảnh bế chung. **Không chữ trên chai dầu tắm.** **Bỏ:** `l8_tub_back`, `l8_tub_front` (G8-3), `l8_foam`, `l8_millet_clump` (G8-5), `l8_millet_clump_a` (G8-6), `l8_icon_mun_dirty` (G8-7), `l8_oil_streak` (G8-8: thay bằng 5 vết `l8_oil_drop`), `mun_bath_shake` (G8-9: chỉ còn animation lắc), `l8_millet_clump_b` (G8-10: trên đầu dùng chung `l8_burr`).

**Chốt theo chủ dự án (G8-3):** bỏ chậu tắm, Mun ngồi trên ghế nhựa giữa phòng; vòi sen treo sẵn trên móc tường phải (ống mềm nối van trộn), khăn bông treo sẵn trên thanh tường trái; khay chỉ còn đồ cầm tay; vòi sen kéo ra lúc nào cũng xịt; nước chảy xuống sàn thành vũng loang, có lỗ thoát nước; vịt nằm dưới sàn, nổi khi vũng loang tới, nhảy khi bị xịt.

**Chốt theo chủ dự án (G8-4):** vòng tiến độ cho mỗi chỗ cần làm; dầu tắm đổi sang vuốt; vịt chỉ nhảy, không xoay; đầu vòi sen quay sang trái; bong bóng mặt Mun vui/không vui báo đúng/sai; bước 1 thêm lá và 2 cành, bước 2 thêm cục hạt kê.

**Chốt theo chủ dự án (G8-5):** một vòng tiến độ chung cho mỗi bước (chỉ để biết bao giờ xong); khăn bông thả lên rồi tự đầy vòng ~2,5 giây, đầy thì tự tuột ra; thêm cục hạt kê thứ 2 trên đầu; vòi sen giữ cách làm cũ, tính vào vòng; mọi chỗ gợi ý là vòng tròn; kéo đồ từ khay phải mượt, không giật; bọt là nhiều bọt nhỏ, không phải một cục to phóng dần.

**Chốt theo chủ dự án (G8-6):** bỏ cục hạt kê ở hông, giữ ké đuôi và hạt kê trên đầu; vòng tiến độ chỉ hiện khi chạm vào người Mun; bước 1 Mun lắc chứ không co nhỏ; thêm hiệu ứng sinh động (danh sách trong `levels-01-10.md` mục L8, "Hiệu ứng cho sinh động"), làm bằng code và hạt, chưa thêm ảnh.

**Chốt theo chủ dự án (G8-7):** bong bóng nhiệm vụ chỉ có mặt Mun sạch; lắc mình cuối chặng chỉ là animation lắc dáng hiện tại, không đổi ảnh (`mun_bath_shake` chỉ dùng cho chạm Mun và xịt sai bước); xong mỗi chặng Mun chớp mắt một cái rồi mới đổi khay.

**Chốt theo chủ dự án (G8-9):** 5 vết dầu rơi vào 5 chỗ xếp đều dọc sống lưng, không lộn xộn; vòi sen và khăn bông dùng xong không mờ; bỏ ảnh `mun_bath_shake`, chạm Mun (và xịt vòi sen sai bước) chỉ lắc nhẹ hai bên bằng animation.

**Chốt theo chủ dự án (G8-10):** chùm trên đầu đổi giống hệt chùm ké ở đuôi (dùng chung `l8_burr`, bỏ hạt kê); vết dầu xoay 90° cho ra dáng giọt dầu.

**Chốt bản khối (G8-2):** không hiện đồng hồ, không đếm giờ, không thua (luật chung); 150 giây chỉ là thời lượng thiết kế. Game chưa có nhạc nền: bỏ phần thêm lớp nhạc theo chặng ở bản khối, làm khi có nhạc. "Liếc về dụng cụ đúng" làm bằng Mun nghiêng đầu + dụng cụ đúng nảy nhẹ là được. Dụng cụ đúng thả lệch chỗ: chỉ bay về khay, không lắc đầu.

**Chốt art (G8-1, GD 2 trả lời A8-Q1…Q9):** Mun to khoảng gấp đôi các màn khác vì là cận cảnh, cỡ cuối chốt sau khi chủ dự án duyệt bản khối; 10 dáng `mun_bath_*` chia 2 tờ. Bùn trên lông đen dùng caramel theo bảng màu khoá (mảng sáng, khô nứt, có vân chì), không dùng nâu sẫm. Nền phòng tắm vẽ mới: phòng trống, gạch men pastel, rộng ≥ 1366; được dựng bố cục từ khung `l4_bg_bedroom`.

---

## Level 9 — Gối cỏ mèo

### Lớp hiển thị

**Vườn trước:** `l9_bg_garden_front` (có lối mòn) → `l9_swing` → `l9_clothesline_*` → `l9_cat_statue_*` → `l9_watering_can` → `l9_catnip_pillow` (khi đặt) → Mun → giao diện.

**Giàn hoa:** `l9_bg_garden_arbor` → `l9_stone_bench` → `l9_catnip_pot_*` + `l9_net_*` → `l9_catnip_pillow` (khi đặt) → `l9_butterfly` → Mun → giao diện.

### Đồ vật

| # | Phòng | Đồ vật | Ảnh trạng thái | Bắt đầu | Thao tác | Điều kiện | Chuyển sang | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Vườn trước | Tượng mèo đá đen 🎭 | `l9_cat_statue` (mới), `l9_cat_statue_leaf` (mới: một chiếc lá rơi đậu trên đầu tượng) | idle | Chạm | — | idle → leaf (giữ) | `hop` rất nhỏ (tượng nặng), lá rơi xuống đậu | `l9_sfx_knock_stone` |
| 2 | Vườn trước | Dây phơi + chiếc tất | `l9_clothesline_sock` (mới), `l9_clothesline_empty` (mới) | sock | Chạm | — | sock → empty | `l9_sock_old` (mới) `fly_to_bag` | `sfx_clothespin` |
| 3 | Vườn trước | Bình tưới 🎁 | `l9_watering_can` (mới) | — | Chạm | — | — | `tilt_back`, nước bắn (hạt); `ui_dried_fish` | `l9_sfx_water_splash` |
| 4 | Vườn trước | Bãi cỏ (chỗ đặt) | vùng trong nền | — | Đặt gối cỏ mèo | — | có gối | `drop_in` `l9_catnip_pillow` (mới) + khói xanh nhạt bốc lên lặp (hạt) | `sfx_drop` |
| 5 | Vườn trước | Xích đu | `l9_swing` (mới) | — | Chạm | — | — | `swing` | `l9_sfx_swing_creak` |
| 6 | Giàn hoa | Lưới che chậu | `l9_net_on` (mới), `l9_net_off` (mới: lưới nằm cạnh chậu) | on | Vuốt | — | on → off | `swap` | `sfx_cloth` |
| 6 | Giàn hoa | Lưới | — | on | Chạm | — | — | `shake_no` nhẹ, bàn chân 💡 vuốt mẫu (nếu bấm 💡) | `sfx_tap` |
| 7 | Giàn hoa | Chậu cỏ mèo | `l9_catnip_pot_full` (mới), `l9_catnip_pot_cut` (mới: cỏ thấp hơn một nửa) | full | Chạm | lưới đã off | full → cut | `l9_catnip` (mới) `fly_to_bag` | `sfx_leaves` |
| 7 | Giàn hoa | Chậu cỏ mèo | — | full | Chạm | lưới còn on | — | `wiggle` | `sfx_tap` |
| 8 | Giàn hoa | Ghế đá (chỗ đặt) | `l9_stone_bench` (mới) | — | Đặt gối cỏ mèo | — | có gối | như bãi cỏ | `sfx_drop` |
| 9 | Giàn hoa | Bướm | `l9_butterfly` (mới) | bay vòng | Chạm | — | — | Bay vọt lên cao rồi vòng lại; nếu Mun đang ở giàn hoa thì Mun nhảy vồ theo (`mun_pounce` 0,4 giây) | — |

**Ghép:** `l9_sock_old` + `l9_catnip` → `l9_catnip_pillow` (chiếc tất phồng tròn, buộc nút). Chỉ có một chỗ đặt hợp lệ mỗi lần; đặt rồi không nhặt lại được.

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

`l9_bg_garden_front`, `l9_bg_garden_arbor`, `l9_cat_statue`, `l9_cat_statue_leaf`, `l9_clothesline_sock`, `l9_clothesline_empty`, `l9_sock_old`, `l9_watering_can`, `l9_swing`, `l9_net_on`, `l9_net_off`, `l9_catnip_pot_full`, `l9_catnip_pot_cut`, `l9_catnip`, `l9_catnip_pillow`, `l9_stone_bench`, `l9_butterfly`, `mun_sniff`, `mun_skid`, `mun_catnip_roll`, `mun_belly_up`.

---

## Level 10 — Đại chiến quái thú

> **G10-21 (2026-11-05):** đổi đường giải theo `levels-01-10.md` mục L10. Mở màn quả cầu lửa tách 3 → 3 đám cháy (hai góc thảm, điều khiển). Thêm `l10_vase` 🔑 (vào túi), `l10_toy_firetruck` 🔑 (vào túi, ghép với lọ hoa → xe chạy xịt tắt lửa). Điều khiển cháy thì chặn lấy pin. **Bỏ** `l10_toy_car`, `l10_toy_tank`, `l10_train`, `l10_lamp_post(_on)`, `l10_cake_box(_lit)`. Sofa, gối, cây, sách, khối xếp hình, thảm: chạm không có gì. Hiệu ứng mới (quả cầu lửa, đám lửa nhỏ, tia nước) làm bằng code trong bản khối; các bảng dưới đây phần còn lại vẫn đúng cho máy bay, bóng, cảnh kết.

> Viết lại 2026-11-03 theo bản khối chủ dự án đã duyệt (G10-1 → G10-17, xem `art/review/level10-thread.md`). Vị trí, cỡ, lớp lấy theo `game/src/level10.js`. Key chốt cuối cùng do Art 2D + Dev chốt ở bước 3; bảng dưới là key bản khối đang dùng.

### Lớp hiển thị (sau → trước)

`l10_bg_living_kitchen` (phòng trống: tường, sàn) → `l10_shelf_left` + `l10_scissors`, `l10_shelf_mid` + `l10_book_stack`, `l10_shelf_right` + `l10_soup_box` → `l10_sofa` → `l10_pillow` (trái, phải) → `l10_plant` → Mun / Sữa (mặc đồ, mèo thật chồng cùng neo) → `l10_table_arena` → `l10_cake_box`, `l10_vase`, `l10_remote`, hộp súp rơi → `l10_rug_loop` → `l10_blocks_a/b`, `l10_lamp_post`, `l10_train` (xếp theo chiều sâu với đồ chơi), `l10_toy_car`, `l10_toy_tank`, `l10_toy_firetruck` → `l10_ball`, `l10_plane` (+ kéo trên lưng) → máy bay đang bay + kéo treo, bóng đang bay (trên mọi đồ) → `l10_fire` → giao diện.

### Đồ vật

| # | Đồ vật | Ảnh trạng thái | Bắt đầu | Thao tác | Điều kiện | Chuyển sang | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|---|---|
| 7 | Máy bay đồ chơi | `l10_plane` (mới; cánh quạt quay bằng code hoặc 2 khung) | đậu sàn phải | Chạm | — | vào túi | `fly_to_bag` | `sfx_pickup` |
| 3 | Điều khiển TV | `l10_remote` (mới), `l10_remote_open` (mới: nắp pin mở, rỗng) | remote | Chạm | — | → open | `l10_battery` (mới) `fly_to_bag` | "Tách" |
| — | Pin + máy bay | — | trong túi | Ghép | — | máy bay bay | Đường cong liền ~6 giây (G10-13): qua Sữa (`sua_lizard_fire_up`, trượt), qua Mun (`mun_gorilla_reach`, trượt), chậm ở kệ trái móc `l10_scissors`, hạ cánh về chỗ đậu, kéo trên lưng. Hai mèo `*_look` trong lúc bay | Động cơ, "vụt", "phù", "cạch" |
| — | Cây kéo trên lưng máy bay | `l10_scissors` | trên máy bay | Chạm | máy bay đã về | vào túi | `fly_to_bag` | "Tách" |
| 2 | Cây kéo trên kệ trái | `l10_scissors` | trên kệ | Chạm | còn trên kệ | — | Hụt, kệ rung; bong bóng `l10_plane` | "Hụt" |
| 6 | Quả bóng | `l10_ball` (mới) | sàn trái | Chạm | — | vào túi | `fly_to_bag` | "Lộp cộp" |
| — | Bóng → Mun | — | trong túi | Kéo thả lên Mun | — | chuỗi | Mun `mun_gorilla_punch` → bóng sang Sữa → `sua_lizard_fire` → bóng về Mun → `mun_gorilla_punch` → bóng lên kệ phải trúng hộp súp → hộp rơi giữa bàn. Bóng nảy về sàn trái (G10-14) | "Bốp", "phù", "bốp", "bịch" |
| — | Bóng → Sữa | — | trong túi | Kéo thả lên Sữa | — | bóng về sàn trái | `sua_lizard_dodge` quất đuôi; bong bóng `mun_face_icon` | "Bộp" |
| 1 | Hộp súp thưởng | `l10_soup_box` (mới: buộc ruy băng), `l10_soup_box_open` (mới: nắp mở, ruy băng đứt) | trên kệ phải | Chạm | còn trên kệ | — | Hụt; bong bóng `l10_ball` | "Hụt" |
| 1 | Hộp súp trên bàn | — | trên bàn | Chạm | còn buộc | — | `wiggle`; bong bóng `l10_scissors` | "Sột" |
| 1 | Hộp súp trên bàn | — | trên bàn | Thả kéo | — | → open | Cắt ruy băng, khói hình cá (code), nhạc tắt; hộp bay lên ~60px rồi hạ xuống sàn giữa hai mèo; `l10_table_arena`, `l10_vase`, `l10_cake_box`, `l10_remote` mờ dần 1 giây rồi ẩn (G10-14) | "Xoẹt" |
| 8 | Gối trái | `l10_pillow` (mới) | trên sofa | Chạm | — | — | `flip`, 5 Cá khô (lần đầu) | "Phụp" |
| 8b | Gối phải | `l10_pillow` (lật ngang) | trên sofa | Chạm | — | — | `flip` | "Phụp" |
| — | Sofa | `l10_sofa` (mới) | — | Chạm | — | — | `squash` | "Phụp" |
| — | Chồng sách (kệ giữa) 🎁 | `l10_book_stack` (mới) | — | Chạm | — | — | Lắc, cuốn trên trượt ra rồi về; 5 Cá khô lần đầu; lắc theo cú đấm | "Lạch cạch" |
| — | Hộp bánh (trên bàn) | `l10_cake_box` (mới; cửa sổ sáng bằng code) | — | Chạm | — | — | Cửa sổ sáng lần lượt; nháy khi Sữa khè | "Tách tách" |
| — | Lọ hoa (giữa bàn) 🎁 | `l10_vase` (mới) | — | Chạm | — | — | Rung, rơi cánh, 5 Cá khô lần đầu; rạp khi Sữa quất đuôi | Leng keng |
| — | Chậu cây | `l10_plant` (mới) | — | Chạm | — | — | Lá rung, bướm bay lượn (code) | Xào xạc |
| — | Tàu hỏa + ray | `l10_rug_loop` (thảm có ray), `l10_train` (mới) | chạy vòng | Chạm | — | — | Hú còi, chạy nhanh một vòng; khựng mỗi cú đấm | "Tu tu" |
| — | Khối xếp hình | `l10_blocks_a`, `l10_blocks_b` (mới) | — | Chạm | — | — | Khối trên nảy; rung khi gầm | "Cộp" |
| — | Cột đèn đồ chơi | `l10_lamp_post` (mới; đèn sáng bằng code) | — | Chạm | — | — | Bật/tắt; nháy khi Sữa khè | "Tách" |
| — | Ô tô / xe tăng / xe cứu hỏa | `l10_toy_car`, `l10_toy_tank`, `l10_toy_firetruck` (mới; lật ngửa bằng xoay 180°) | đứng | Kéo thả lên Mun / Sữa | — | → lật | Bị đấm / khè bay về chỗ cũ, lật ngửa; xe cứu hỏa phun nước, Sữa hắt xì. Chạm khi lật → đứng lại | "Bốp"/"phù", "cạch" |

### Trạng thái hai mèo mặc đồ (Lẩn tránh: chạm không thắng)

| Trạng thái | Mun (`mun_gorilla_*`, mới) | Sữa (`sua_lizard_*`, mới) | Khi nào |
|---|---|---|---|
| Vòng đánh nhau 4 nhịp | `block` → `punch` → `idle` → `chest` | `fire` → `idle` → `dodge` → `roar` | Mặc định |
| Nhìn máy bay | `look` / `reach` | `look` / `fire_up` | Máy bay đang bay |
| Đánh bóng / đồ chơi | `punch` | `fire` / `dodge` | Bóng hoặc đồ chơi thả lên |
| Chạm mèo | `roar` (tay người chơi bị thổi bật) | `roar` | Chạm |
| Ngửi hộp súp | `sniff` | `sniff` | Hộp rơi xuống bàn / hộp mở |
| Ăn | `lick` | `lick` | Sau khi mở hộp |

Lửa: `l10_fire` (mới) xanh nhạt pastel.

### Khoảnh khắc lộ diện và kết màn

| Thời gian | Diễn biến |
|---|---|
| 0–1 giây | Hộp mở, bay lên rồi hạ xuống sàn; bàn và đồ trên bàn mờ dần |
| 1–11 giây | Một tween liền 10 giây (G10-15): mèo mặc đồ + mèo thật cùng nhỏ dần trên cùng neo chân, mặc đồ mờ đi, mèo thật hiện ra; neo trượt về phía hộp (Mun +85, Sữa −85); cúi ăn lắc nhẹ ±3° |
| 11–12,5 giây | Hai mèo thật liếm lông cho nhau tại chỗ, **1,5 giây** (G10-16) |
| 12,5 giây → | Tự vào màn thưởng, **không cảnh bế** (G10-17); màn thưởng hiện `mun_face_icon` + `sua_face_icon` |

Dáng mèo thật cần vẽ mới: `mun_l10_eat`, `sua_l10_eat` (cúi ăn từ hộp trên sàn) và `mun_l10_groom` + `sua_l10_groom` (hai con liếm lông cho nhau) — tên chốt ở bước 3 theo bảng Dev. Bản khối đang dùng tạm `mun_sit_look`, `sua_sit_stare`.

### Danh sách ảnh (mới, theo bản khối)

`l10_bg_living_kitchen`, `l10_shelf_left`, `l10_shelf_mid`, `l10_shelf_right`, `l10_scissors`, `l10_soup_box`, `l10_soup_box_open`, `l10_book_stack`, `l10_cake_box`, `l10_vase`, `l10_plant`, `l10_sofa`, `l10_pillow`, `l10_remote`, `l10_remote_open`, `l10_battery`, `l10_table_arena`, `l10_rug_loop`, `l10_train`, `l10_blocks_a`, `l10_blocks_b`, `l10_lamp_post`, `l10_toy_car`, `l10_toy_tank`, `l10_toy_firetruck`, `l10_ball`, `l10_plane`, `l10_fire`, `mun_gorilla_idle/block/punch/chest/reach/look/sniff/lick/roar`, `sua_lizard_idle/fire/fire_up/look/dodge/roar/sniff/lick`, dáng mèo thật ăn + liếm lông chung. Dùng lại: `mun_face_icon`, `sua_face_icon`.

---

## Level 11 — Ô vuông băng dính (dời sang chương 2)

### Lớp hiển thị

`l11_bg_porch` → `l11_mailbox_*` → `l11_plant` → `l11_shoe_cabinet` (+ `mun_eyes_dark` trong gầm) → `l11_chair` + `l11_gloves_black_*` → `l11_tape_square` (khi dán) → `l11_toolbox_*` (trên bậc thềm) → Mun → giao diện.

### Đồ vật

| # | Đồ vật | Ảnh trạng thái | Bắt đầu | Thao tác | Điều kiện | Chuyển sang | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|---|---|
| 1 | Gầm tủ giày | `l11_shoe_cabinet` (mới) | — | Chạm lần 1–2 | Mun trong gầm | — | `mun_eyes_dark` lùi sâu; bong bóng suy nghĩ vẽ ô vuông (`l11_tape_square` thu nhỏ) | `mun_sfx_meow_shy` |
| 1 | Gầm tủ giày | `l11_slipper_drop` (mới) | — | Chạm lần 3 | — | — | Một chiếc dép trượt ra khỏi gầm, `puff` | `l2_sfx_slide` (dùng lại) |
| 2 | Hộp đồ nghề | `l11_toolbox_closed`, `l11_toolbox_open` (mới) | closed | Chạm | — | closed → open | `swap`; `l11_tape_roll` (mới: cuộn băng dính vàng tươi) `fly_to_bag` | `l11_sfx_metal_clack`, `sfx_pickup` |
| 3 | Găng tay len đen 🎭 | `l11_chair` (mới), `l11_gloves_black_idle` (mới: cuộn tròn như mèo), `l11_gloves_black_after` (mới: bung thành 2 chiếc rời) | idle | Chạm | — | idle → after (giữ) | `squash` → `swap` | `sfx_cushion_soft` |
| 4 | Chậu cây | `l11_plant` (mới), dùng lại `prop_butterfly` | — | Chạm | — | — | `wiggle`, bướm bay ra | `sfx_leaves` |
| 5 | Hộp thư 🎁 | `l11_mailbox_closed`, `l11_mailbox_open` (mới), `l11_flyer` (mới: tờ giấy chỉ có hình) | closed | Chạm | — | closed → open (giữ) | `swap`; tờ giấy và `ui_dried_fish` rơi ra | `sfx_lid` |
| 6 | Sàn trống (chỗ đặt) | vùng trong nền; khung gợi ý vẽ bằng code (nét đứt vàng nhạt) | trống | Đặt băng dính | — | có ô vuông | Xem kịch bản dán | `l11_sfx_tape_pull` |
| 6 | Chỗ khác (sát tủ, bậc thềm) | — | — | Đặt băng dính | — | — | `return_to_bag`; khung nét đứt hiện trên sàn trống | `sfx_wrong` |

### Kịch bản dán băng dính

| Thời gian | Diễn biến |
|---|---|
| 0–0,3 giây | `drop_in` cuộn băng dính ở một góc ô |
| 0,3–1,5 giây | Cuộn lăn theo 4 cạnh ô vuông (mỗi cạnh 0,3 giây), **vạch băng dính được vẽ dần bằng code** theo cuộn lăn. Âm "xoẹt" mỗi cạnh |
| 1,5 giây | Cuộn biến mất (`puff` nhỏ), đổi vạch vẽ bằng code sang ảnh `l11_tape_square` (mới) cho đẹp |
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

`l11_bg_porch`, `l11_shoe_cabinet`, `l11_slipper_drop`, `l11_toolbox_closed`, `l11_toolbox_open`, `l11_tape_roll`, `l11_tape_square`, `l11_chair`, `l11_gloves_black_idle`, `l11_gloves_black_after`, `l11_plant`, `l11_mailbox_closed`, `l11_mailbox_open`, `l11_flyer`, `mun_crawl_out`, `mun_walk`, `mun_step_over`, `mun_sit_square`.

---

## Level 12 — Đồ rơi khỏi kệ (dời sang chương 2)

### Lớp hiển thị

**Phòng đọc:** `l12_bg_study` → `l12_grandfather_clock` + `l12_clock_pendulum` → `l12_bookshelf` → `l12_chair` + `l12_beanie_black_*` → đồ rơi trên sàn (`l12_pen`, `l12_eraser`, `l12_paperclip`, `l12_pencil`, `l12_cup_red`) → giao diện.

**Cận cảnh kệ:** `l12_closeup_shelf_bg` → `l12_books_a`, `l12_books_b`, `l12_books_c` (3 cụm sách, mỗi cụm sprite riêng) → bóng Mun (`mun_shadow`, code) → `l12_cactus_small` → `l12_cup_red` (khi đặt) → Mun ló ra → `ui_close_button`.

**Bếp:** `l12_bg_kitchen_neighbor` → `l12_teapot`, `l12_tea_tin` → `l12_cup_red` (trên bàn) → giao diện.

### Đồ vật

| # | Phòng | Đồ vật | Ảnh trạng thái | Bắt đầu | Thao tác | Điều kiện | Chuyển sang | Phản hồi | Âm thanh |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Phòng đọc | Kệ sách | `l12_bookshelf` (mới) | — | Chạm | — | mở cận cảnh | Phóng to vào kệ 0,3 giây | `sfx_closeup_open` |
| 2 | Phòng đọc | Cây bút dưới sàn | `l12_pen` (mới) | đang lăn | Chạm | — | — | Lăn thêm 30px | `l12_sfx_roll` |
| 2' | Phòng đọc | Đồ rơi định kỳ | `l12_eraser`, `l12_paperclip`, `l12_pencil` (mới) | — | (tự động mỗi 10 giây, khi Mun chưa lộ diện) | — | rơi từ đỉnh kệ xuống sàn | `fly_arc` + `hop` khi chạm sàn. Tối đa 3 món trên sàn, món thứ 4 thay món cũ nhất | `l12_sfx_clack` |
| 3 | Phòng đọc | Mũ len đen 🎭 | `l12_chair` (mới), `l12_beanie_black_idle` (mới: cuộn tròn như mèo đen trên ghế), `l12_beanie_black_after` (mới: rơi xuống sàn, bung ra) | idle | Chạm | — | idle → after (giữ) | `fly_arc` xuống sàn | `sfx_cushion_soft` |
| 4 | Phòng đọc | Đồng hồ quả lắc | `l12_grandfather_clock`, `l12_clock_pendulum` (mới) | — | Chạm | — | — | Quả lắc `swing` mạnh | `l12_sfx_bong` |
| 5 | Cận cảnh | Cụm sách (A, B, C) | `l12_books_a/b/c` (mới) | thẳng | Chạm | **Mun không nấp sau cụm này** | — | `tilt_back` (lung lay) | `l12_sfx_books` |
| 5 | Cận cảnh | Cụm sách có Mun nấp sau | — | thẳng | Chạm | Mun nấp sau cụm này | — | Sách nghiêng ra 20°, `mun_peek_books` (mới) hiện 0,8 giây, rồi `mun_shadow` chạy dọc kệ sang cụm kế tiếp (B → C → A → B…) 0,4 giây | `mun_sfx_scamper` |
| 6 | Cận cảnh | Xương rồng nhỏ | `l12_cactus_small` (mới) | — | Chạm | — | — | Màn hình rung nhẹ 0,15 giây | `l12_sfx_ouch` (tiếng kêu không lời) |
| 7 | Cận cảnh | Mép kệ trống (chỗ đặt) | vùng chạm trong `l12_closeup_shelf_bg` | trống | Đặt cốc | — | có cốc | `drop_in` `l12_cup_red` | `sfx_drop` |
| 7 | Cận cảnh | Chỗ khác trong kệ | — | — | Đặt cốc | — | — | `return_to_bag`, mép kệ `sparkle` | `sfx_wrong` |
| 8 | Bếp | Cốc nhựa đỏ | `l12_cup_red` (mới) | trên bàn | Chạm | — | vào túi | `fly_to_bag` | `sfx_pickup` |
| 9 | Bếp | Hộp trà 🎁 | `l12_tea_tin` (mới) | — | Chạm | — | — | `hop` nắp; `ui_dried_fish` | `sfx_lid` |
| 10 | Bếp | Ấm trà | `l12_teapot` (mới) | — | Chạm | — | — | Hơi nước bay lên (hạt) | `l12_sfx_kettle` |
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

`l12_bg_study`, `l12_bg_kitchen_neighbor`, `l12_bookshelf`, `l12_closeup_shelf_bg`, `l12_books_a`, `l12_books_b`, `l12_books_c`, `l12_cactus_small`, `l12_pen`, `l12_eraser`, `l12_paperclip`, `l12_pencil`, `l12_chair`, `l12_beanie_black_idle`, `l12_beanie_black_after`, `l12_grandfather_clock`, `l12_clock_pendulum`, `l12_cup_red`, `l12_tea_tin`, `l12_teapot`, `mun_peek_books`, `mun_paw_push`, `mun_peek_face`. **Gáy sách vẽ sọc màu, không chữ.**
