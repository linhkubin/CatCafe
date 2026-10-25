# Design Art – Level 1: Hộp pate thần kỳ

> Đọc kèm `style.md`. Mọi ảnh theo đúng phong cách chung: bút chì màu, pastel nhạt, nét tay run, cute, tối giản, **không chữ**.
>
> **Phòng:** Phòng khách, buổi sáng. **Mèo:** Sữa. **Ý chính:** tìm khắp phòng không thấy Sữa, vuốt đệm sofa lộ hộp pate, mở hộp "tách" một cái là Sữa đã ngồi sẵn bên cạnh.

Tên key và thư mục là tên chính thức, dev dùng thẳng trong code, không đổi (quy tắc ở `style.md` mục 4). Nguồn chốt: `art/review/level1-thread.md` (G1–G7, P1–P8, V1–V23, O1–O6, vòng 5 Dev). Cỡ hiển thị và bảng vị trí lấy tỉ lệ theo tranh `demo/l1_demo_start.png`, `demo/l1_demo_reveal.png` (P6).

**Cách vẽ:** gần như mọi ảnh được **vẽ theo tờ** (P1): mọi trạng thái và bộ phận của một đồ vật vẽ chung một ảnh, chia ô, rồi `tools/sheet_cut.py` cắt ra từng key, dọn alpha, co về cỡ hiển thị × 1,5 và căn chung điểm neo. Codex chỉ vẽ tờ và lưu vào `art/out/_sheets/<tờ>.png`.

---

## 1. Danh sách key

Hiển thị = cỡ trong game, trên khung 1024x1536. Canvas xuất do công cụ tính (≈ khung chung của nhóm × 1,5 + lề). TS = trong suốt.

| Key | Thư mục | Hiển thị | Nền | Neo | Tờ (nhóm) |
|---|---|---|---|---|---|
| `l1_bg_living_room` | level1 | 1024x1536 | Có nền | góc trên trái | ảnh lẻ (mục 2) |
| `l1_sofa_cushion_flat` | level1 | rộng 396 (bằng đệm trái) | TS | đáy | `l1_cushion_flat_sheet` (cushion), cắt bằng script từ đệm trái trong nền (O8) |
| `l1_sofa_cushion_lifted` | level1 | rộng 396 (dựng cao, vẽ lại sau chơi thử) | TS | đáy | `l1_cushion_sheet` (cushion) |
| `l1_pate_can_closed` | level1 | rộng 120 | TS | đáy | `l1_pate_sheet` (pate_can) |
| `l1_pate_can_open` | level1 | rộng 120 (bù thân nhỏ hơn ~4%) | TS | đáy | `l1_pate_sheet` (pate_can) |
| `l1_pate_can_steam` | level1 | cao 90 | TS | đáy (chân làn hơi) | `l1_pate_sheet` |
| `l1_box_closed` | level1 | rộng 260 | TS | đáy | `l1_box_sheet` (box) |
| `l1_box_open_empty` | level1 | rộng 321 (khung gồm nắp bung; bù thân nhỏ hơn ~4,7%) | TS | đáy | `l1_box_sheet` (box) |
| `l1_pillow_white_idle` | level1 | rộng 235 | TS | đáy | `l1_pillow_sheet` (pillow) |
| `l1_pillow_white_flipped` | level1 | theo nhóm | TS | đáy | `l1_pillow_sheet` (pillow) |
| `l1_curtain_closed` | level1 | rộng 440 | TS | đỉnh | `l1_curtain_sheet` (curtain) |
| `l1_curtain_open` | level1 | theo nhóm | TS | đỉnh | `l1_curtain_sheet` (curtain) |
| `l1_wall_clock_closed` | level1 | rộng 200 | TS | đỉnh (móc) | `l1_clock_sheet` (clock) |
| `l1_wall_clock_open` | level1 | theo nhóm | TS | đỉnh (móc) | `l1_clock_sheet` (clock) |
| `l1_wall_clock_bird` | level1 | rộng 45 | TS | đáy (gốc que) | `l1_clock_sheet` |
| `l1_wall_clock_pendulum` | level1 | cao 115 | TS | đỉnh (khoen) | `l1_clock_sheet` |
| `l1_plant` | level1 | rộng 255 | TS | đáy | `l1_plant_sheet` |
| `prop_butterfly` | common | rộng 80 | TS | tâm | `l1_plant_sheet` |
| `l1_rug_flat` | level1 | rộng 960 | TS | đỉnh | `l1_rug_sheet` (rug) |
| `l1_rug_curled` | level1 | theo nhóm | TS | đỉnh | `l1_rug_sheet` (rug) |
| `sua_sit_stare` | cats | cao 250 | TS | đáy (chân) | `sua_poses_a_sheet` (sua_pose) |
| `sua_meow_up` | cats | cao 240 (tờ riêng `sua_meow_sheet`, thân khớp cỡ `sua_sit_stare`) | TS | đáy (chân) | `sua_poses_a_sheet` (sua_pose) |
| `sua_eat` | cats | theo nhóm | TS | đáy (chân) | `sua_poses_a_sheet` (sua_pose) |
| `sua_eat_f2` | cats | theo nhóm | TS | đáy (chân) | `sua_poses_a_sheet` (sua_pose) |
| `sua_tail_peek` | cats | cao 120 | TS | đáy (gốc đuôi) | `sua_extra_sheet` (G10) |
| `sua_run` | cats | rộng 330 | TS | đáy | `sua_extra_sheet` (G10) |
| `sua_held` | cats | cao 620 | TS | x,y giữa hai nách | `sua_held_sheet` (một ô) |
| `player_hands_lift` | player | cao 600 (khe hai lòng bàn tay ≈ 210, vừa ngực `sua_held`) | TS | đáy | `player_hands_sheet` (một ô) |
| `sua_face_icon` | cats | rộng 165 | TS | tâm | `ui_mission_sheet` (cat_head) |
| `ui_cat_head_dark` | common | theo nhóm | TS | tâm | `ui_mission_sheet` (cat_head) |
| `ui_speech_bubble` | common | rộng 330 | TS | đáy (đầu nhọn đuôi) | `ui_mission_sheet` |
| `ui_question_mark` | common | rộng 55 | TS | tâm | `ui_mission_sheet` (question_mark) |
| `ui_question_mark_white` | common | theo nhóm | TS | tâm | `ui_mission_sheet` (question_mark) |
| `ui_heart` | common | rộng 60 | TS | tâm | `ui_mission_sheet` |
| `player_call` | player | cao 580 | TS | đáy | `player_poses_a_sheet` (player_pose) |
| `player_scratch_head` | player | cao 580 | TS | đáy | `player_poses_a_sheet` (player_pose) |
| `player_surprised` | player | cao 651 (gồm nét toả; người cao 580) | TS | đáy | `player_poses_b_sheet` (player_pose) |
| `player_shrug` | player | cao 580 | TS | đáy | `player_poses_b_sheet` (player_pose) |
| `player_box_on_head` | player | chỉnh khi vẽ | TS | đáy | ảnh lẻ (tùy chọn, sau cùng) |
| `ui_hand_pointer` | common | rộng 140 | TS | x,y đầu ngón trỏ | `ui_icons_sheet` |
| `ui_hint_paw` | common | rộng 140 | TS | x,y đầu bàn chân | `ui_icons_sheet` |
| `ui_sparkle` | common | rộng 60 | TS | tâm | `ui_icons_sheet` |
| `ui_bulb_button` | common | rộng 130 | TS | tâm | `ui_icons_sheet` |
| `ui_dried_fish` | common | rộng 80 | TS | tâm | `ui_icons_sheet` |
| `fx_pop` | common | rộng 200 | TS | tâm | `ui_icons_sheet` |

- Ảnh tham chiếu, không vào game: `cats/sua_ref.png` (đã dọn alpha), `player/player_ref.png` (style.md mục 3).
- Không có file riêng: `l1_plant` → frame `leaves`/`pot`, `l1_curtain_closed` → frame `left`/`right`; code cắt bằng frame của texture (V12).
- Neo ghi tay `x,y` (px trong tờ, đo sau khi vẽ ở vòng 7): `sua_held` (giữa hai nách), `ui_hand_pointer` (đầu ngón trỏ), `ui_hint_paw` (đỉnh bàn chân), `l1_box_closed`/`l1_box_open_empty` (giữa mép đáy mặt trước hộp).
- Ô trong các bảng tờ đã sửa theo chỗ AI thực vẽ (vòng 7), để cắt lại từ design-art ra đúng.

---

## 2. Bố cục phòng (G1)

Màn hình dọc 1024x1536. Toạ độ là điểm neo của đồ vật (bảng vị trí ở mục 6).

```
┌──────────────────────────────┐  y 0–130: dải giao diện (bong bóng, ♥, ⏸), không đặt đồ chạm được
│ ♥Sữa ○○○○                ⏸  │
│ ┌─────────┐        ┌─┐       │  rèm trên trái: mép trên ở (285, 185), rộng 440
│ │  RÈM    │        │⌂│ ĐỒNG  │  đồng hồ trên phải: móc ở (866, 182), rộng 200, quả lắc treo dưới
│ │ cửa sổ  │        └┬┘ HỒ    │
│ └─────────┘         ○        │
│ ┌──────────────────────────┐ │  sofa (trong nền) x≈35–990, mặt ghế y≈870–900
│ │ GỐI LÔNG   SOFA    ĐỆM ◠ │ │  gối (308, 875), đệm phồng (710, 900)
│ └──────────────────────────┘ │  chân sofa chạm sàn y≈1030; hộp pate lăn xuống thảm ở (650, 1305)
│     HỘP CÁC-TÔNG    CHẬU CÂY │  hộp các-tông (220, 1285), chậu cây (890, 1345)
│ ░░░░░░░░░ THẢM ░░░░░░░░░     │  thảm: mép trên ở (512, 1055), rộng 960
│                          💡  │  góc dưới phải x>880, y>1400: nút 💡, không đặt đồ
└──────────────────────────────┘
```

- **Một camera chung:** chính diện, hơi nhìn từ trên xuống ~15°, mặt trên của đồ vật là một elip dẹt, không xoay ba phần tư. Ánh sáng từ cửa sổ (trên trái): vài nét chì đổ bóng ở **bên phải** đồ vật.
- **Không vẽ bóng đổ dưới sàn** cho sprite: dev vẽ bóng bằng code.
- Nền có dải kéo dài: 8% trên cùng là tường trơn, 8% dưới cùng là sàn trơn (dev kéo dài cho màn hình dài hơn 2:3).

---

## 3. Quy tắc tờ (áp cho mọi tờ dưới đây)

- Tờ 1536x1024 (hoặc 1024x1536), **nền trong suốt**. Mỗi ô một thứ: một trạng thái hoặc một bộ phận. Mỗi thứ nằm trọn trong ô, cách mép ô ≥ 40px, không lấn sang ô khác. Phần ngoài các ô để trống.
- Mọi thứ trong tờ **cùng tỉ lệ thật** với nhau. Các trạng thái của một đồ vật: phần không đổi **giống hệt nhau** (cùng cỡ, cùng góc nhìn, cùng màu), cùng đường đáy.
- Nét viền nâu ấm #6B4A3A, mảnh, đậm nhạt như bút chì thật (style.md mục 1). Cột **Nét** = độ dày **đường viền ngoài ở chỗ đậm nhất** (chỗ khuất, chỗ gập, chỗ chồng nhau), tính bằng px trong tờ. Phần lớn đường viền chỉ khoảng 60% số đó, đầu nét nhọn dần; nét lông và chi tiết bên trong mảnh hơn nữa. Không vẽ nét đều dày kiểu vector.
- **Công thức cột Nét** (chốt ở vòng 5): Nét = **3k** cho đồ vật và UI, **2,5k** cho mèo và nhân vật (nét mảnh theo O5), **không dưới 2k**. k = cỡ AI **thực vẽ** ÷ cỡ hiển thị. AI hay vẽ vật to khoảng 85% ô với đồ to, còn đồ nhỏ thì to hơn cỡ ô dặn (W7), nên k lấy theo cỡ đo được ở lần vẽ trước nếu đã có. Ở cỡ hiển thị: chỗ đậm nhất khoảng 3px (2,5px với mèo, nhân vật), chỗ nhạt 1,5–2px. Mọi thứ trong cùng một tờ có cùng tỉ lệ thật thì dùng cùng k, cùng Nét.
- **Lời giao việc ghi nét** (Y4): ghi số px **và** câu "đường viền ngoài đậm ~N px ở chỗ đậm nhất, nét lông và chi tiết bên trong mảnh hơn". Khi có ảnh mẫu đã duyệt, thêm câu so sánh "viền ngoài dày khoảng X lần viền trong ảnh đính kèm" (`codex-draw.mjs --stroke-ref <ảnh>=<X>`). Sau khi cắt, `sheet_cut.py` in k thật và khoảng nét nên có; lệch quá 30% thì sửa Nét ở lượt sau.
- Không bóng sàn, không quầng sáng, không glow, không viền trắng bao quanh vật. Không chữ, không số.
- Cột Ô: `x,y,w,h` px trong tờ. Cột Neo, Hiển thị: dùng cho công cụ cắt (V14).

---

## 4. Ảnh lẻ

| File (trong art/out/) | Key | Kích thước | Nền | Mô tả |
|---|---|---|---|---|
| `level1/l1_bg_living_room.png` | `l1_bg_living_room` | 1024x1536 | Có nền | Nền phòng khách (mô tả dưới) |

### `l1_bg_living_room` — Nền phòng khách
- Phòng khách nhỏ buổi sáng, nhìn chính diện hơi từ trên xuống. **Không người, không mèo.** Nét 3–4px (k = 1). Tỉ lệ và chỗ đặt đồ theo tranh `demo/l1_demo_start.png`.
- **Tường** kem giấy trơn, không hoa văn, **không tranh**. **8% trên cùng là tường trơn.**
- **Cửa sổ** trên trái (x≈60–505, y≈180–640): khung gỗ caramel nhạt, 4 ô kính xanh da trời nhạt có một mảng mây, **bệ cửa sổ trống**. **Thanh treo rèm** gỗ tròn nằm ngang ở y≈175, từ x≈40 tới 535. Không vẽ rèm.
- **Tường trên phải** (x≈740–990, y≈170–600) để trống cho đồng hồ.
- **Sofa** 2 chỗ xanh bạc hà, x≈35–990, tay vịn tròn mập, chân gỗ ngắn chạm sàn ở y≈1030; mặt ghế ở y≈870–900. **Nửa trái** có một đệm ngồi bạc hà vẽ liền (màu này là màu chuẩn cho tờ đệm). **Nửa phải** mặt ghế phẳng, trống (đệm phải là ảnh riêng). Chỗ gối lông bên trái để trống.
- **Sàn** gỗ caramel nhạt từ chân tường y≈950, vài nét chì ngang thể hiện ván, không vân gỗ. Giữa sàn và dưới phải để trống (hộp, chậu cây, thảm là ảnh riêng). **8% dưới cùng là sàn trơn.**

---

## 5. Các tờ và mô tả từng ảnh

### 5.1 Tờ `l1_cushion_sheet` — Đệm sofa (1024x1536, dọc)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l1_cushion_flat_sheet | 0,0,1024,512 | l1_sofa_cushion_flat | level1 | cushion | đáy | rộng 396 | 4 |
| l1_cushion_sheet | 0,700,1024,836 | l1_sofa_cushion_lifted | level1 | cushion | đáy | rộng 396 | 7 |

Bố cục (tờ dọc, vẽ lại sau khi chơi thử): đệm phồng ở 1/3 trên, đệm lật ở 2/3 dưới. Hai tấm đệm **cùng bề ngang** (~850px), căn giữa theo chiều ngang. k ≈ 2,4: viền ngoài đậm nhất ~7px. Đệm lật **dựng cao**, không dẹt như cái khay.
- `l1_sofa_cushion_flat` (O8, thay `_bulge`): **chính đệm ngồi bên trái trong nền** `l1_bg_living_room`, cắt bằng script, lật ngang, tách nền trong suốt; tờ `art/out/_sheets/l1_cushion_flat_sheet.png` (1024x512, không phải vẽ bằng Codex). Đệm phải trông giống hệt đệm trái, không phồng.
- (Cũ, bỏ theo O8) `l1_sofa_cushion_bulge`: đệm ngồi sofa chữ nhật bo tròn, mập, xanh bạc hà (đúng màu đệm trái trong nền, đậm hơn sofa một chút), nhìn chính diện hơi từ trên. **Góc phải phồng lên một cục tròn rõ** như có vật nằm dưới, vài nét chì vải căng quanh chỗ phồng. Mép phải gọn, tròn. Không cúc, không đường may.
- `l1_sofa_cushion_lifted`: **cùng tấm đệm**, bị lật **dựng nghiêng ~60–70° tựa vào lưng sofa** (như tấm đệm phải trong tranh `l1_demo_reveal`): mép dưới nằm ở mặt ghế (là điểm thấp nhất, thẳng ngang), mép trên ngả ra sau. Thấy rõ **mặt dưới** màu bạc hà nhạt hơn chiếm gần hết hình, một dải mép đệm màu bạc hà đậm ở trên cùng. Chiều cao hình khoảng 55–65% bề ngang. Chỉ một tấm, không có tấm đệm phẳng bên dưới, không vẽ sofa, không vẽ hộp pate.

### 5.2 Tờ `l1_pate_sheet` — Hộp pate (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l1_pate_sheet | 0,0,640,1024 | l1_pate_can_closed | level1 | pate_can | đáy | rộng 120 | 14 |
| l1_pate_sheet | 640,0,640,1024 | l1_pate_can_open | level1 | pate_can | đáy | rộng 120 | 14 |
| l1_pate_sheet | 1300,262,236,600 | l1_pate_can_steam | level1 |  | đáy | cao 90 | 12 |

Bố cục (theo cỡ AI thực vẽ ở lần trước, W7/P7): hộp đóng ở bên trái (x 0–640), hộp mở ở giữa (x 640–1280), mỗi hộp rộng **khoảng 550px**, cách mép ô ≥ 40px. Một làn hơi nhỏ, mảnh ở dải sát mép phải (x≈1300–1536), giữa chiều cao, **cùng tỉ lệ thật với hộp** (cao khoảng 400px). Hai hộp **cùng cỡ, cùng đường đáy** (đáy ở khoảng 85% chiều cao tờ). k ≈ 4,6: viền ngoài đậm nhất ~14px, nét nhãn và chi tiết bên trong mảnh hơn.
- `l1_pate_can_closed`: hộp thiếc tròn thấp, mập, **đứng thẳng**. Thân cam đào ấm (#F4B48C), nắp bạc xám nhạt có **khoen kéo tròn**. Nhãn rất đơn giản: **một con cá nhỏ xanh da trời và một mặt mèo trắng cười** (không đốm, không chi tiết kiểu sticker). Nét chì run tay, không sạch như vector.
- `l1_pate_can_open`: thân **y hệt** ô 1. Nắp bạc bật lên dựng phía sau miệng hộp, hơi ngả ra sau, khoen còn dính trên nắp. Trong lòng hộp là pate hồng cam nhạt, mịn, nhô thành một khối tròn. **Không vẽ hơi**, không lấp lánh.
- `l1_pate_can_steam`: **một** làn hơi hình chữ S, màu trắng kem, dưới to trên mảnh, đầu trên vuốt nhọn; viền **caramel nhạt** (ngoại lệ duy nhất về màu viền, cho hơi trông nhẹ); chân làn hơi ở giữa mép dưới. Code sinh 3 bản lệch pha.

### 5.3 Tờ `l1_box_sheet` — Hộp các-tông (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l1_box_sheet | 0,200,730,824 | l1_box_closed | level1 | box | 314,788 | rộng 260 | 5 |
| l1_box_sheet | 730,100,806,924 | l1_box_open_empty | level1 | box | 1062,787 | rộng 321 | 5 |

Bố cục: trái hộp đóng, phải hộp mở. Thân hộp chỉ rộng ~55% ô để 4 nắp bung ở ô phải vẫn nằm trong ô. Hai thân cùng cỡ, cùng đường đáy.
- `l1_box_closed`: hộp các-tông vuông, hơi méo, caramel nhạt, nắp gập phẳng, một dải băng dính màu kem dán ngang nắp. Không chữ, không ký hiệu.
- `l1_box_open_empty`: thân y hệt. **4 nắp bung ra**: hai nắp bên ngả ra hai phía, nắp sau dựng đứng, nắp trước gập xuống phía trước. Lòng hộp **trống trơn**, màu nâu đậm hơn. Băng dính đứt, rủ xuống một bên. Góc nhìn không đổi (thấy lòng hộp là nhờ nắp mở).

### 5.4 Tờ `l1_pillow_sheet` — Gối lông trắng 🎭 (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l1_pillow_sheet | 0,300,840,724 | l1_pillow_white_idle | level1 | pillow | đáy | rộng 235 | 8 |
| l1_pillow_sheet | 840,180,696,844 | l1_pillow_white_flipped | level1 | pillow | đáy |  | 8 |

- `l1_pillow_white_idle`: gối vuông nhỏ trắng ấm (cùng màu lông Sữa), mép lông xù, nằm bẹp tròn trịa; **2 góc trên nhọn nhô lên như tai mèo**. Nhìn lướt giống mèo trắng cuộn tròn, nhìn kỹ là gối: không mặt, không đuôi.
- `l1_pillow_white_flipped`: cùng chiếc gối, **dựng đứng trên một cạnh**, cao hơn; 2 góc giờ chĩa ngang, hết giống tai; lộ mặt phẳng với một vết lõm nhẹ ở giữa. Cùng đường đáy.

### 5.5 Tờ `l1_curtain_sheet` — Rèm cửa (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l1_curtain_sheet | 0,0,768,1024 | l1_curtain_closed | level1 | curtain | đỉnh | rộng 440 | 5 |
| l1_curtain_sheet | 768,0,768,1024 | l1_curtain_open | level1 | curtain | đỉnh |  | 5 |

Không vẽ thanh treo (thanh nằm trong nền). Hai ô cùng mép trên, cùng bề ngang.
- `l1_curtain_closed`: hai tấm vải xanh da trời nhạt **kéo kín**, buông thẳng, **gặp nhau đúng đường giữa**, không chồng lên nhau. Mép trên là một đường ngang thẳng với 6–8 khoen tròn nhỏ. Mỗi tấm 2–3 nếp cong dọc đơn giản, gấu rèm hơi lượn.
- `l1_curtain_open`: cùng rèm, cùng mép trên và bề ngang. Mỗi tấm dồn thành một bó sát mép ngoài, buộc ngang bằng một dải vải hồng phấn. **Khoảng giữa trống hẳn.**

### 5.6 Tờ `l1_clock_sheet` — Đồng hồ cúc cu (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l1_clock_sheet | 0,80,582,944 | l1_wall_clock_closed | level1 | clock | đỉnh | rộng 200 | 7 |
| l1_clock_sheet | 582,80,576,944 | l1_wall_clock_open | level1 | clock | đỉnh |  | 7 |
| l1_clock_sheet | 1180,140,276,330 | l1_wall_clock_bird | level1 |  | đáy | rộng 45 | 7 |
| l1_clock_sheet | 1260,450,276,460 | l1_wall_clock_pendulum | level1 |  | đỉnh | cao 115 | 7 |

Bố cục: ô 1 đồng hồ đóng, ô 2 đồng hồ mở, phần bên phải: chim gỗ nhỏ ở trên, quả lắc ở dưới sát mép phải. Chim và quả lắc cùng tỉ lệ thật với đồng hồ.
- `l1_wall_clock_closed`: đồng hồ hình ngôi nhà, gỗ caramel nhạt, mái nhọn hồng đào. Mặt tròn kem, **2 kim, 4 vạch ngắn, không số**. Phía trên mặt là **cửa vòm nhỏ đang đóng**. Một móc nhỏ ở giữa mép trên (neo) và một móc nhỏ ở giữa đáy. **Không vẽ quả lắc, không chim.**
- `l1_wall_clock_open`: y hệt ô 1, chỉ khác: cánh cửa vòm **mở hé sang phải**, lộ một lỗ vòm tối màu nâu than. Không chim.
- `l1_wall_clock_bird`: chim gỗ xanh da trời, chỉ **nửa thân trước** (đầu, ngực, cánh khép), nhìn chính diện hơi nghiêng trái, **mỏ há**, mắt chấm; gắn trên một que gỗ ngắn chĩa xuống (gốc que là neo). Cỡ vừa lọt lỗ vòm.
- `l1_wall_clock_pendulum`: thanh mảnh màu gỗ, đầu trên có **khoen tròn nhỏ** (neo), dưới cùng là quả tròn vàng bơ. Thẳng đứng.

### 5.7 Tờ `l1_plant_sheet` — Chậu cây và bướm (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l1_plant_sheet | 0,0,1040,1024 | l1_plant | level1 |  | đáy | rộng 255 | 8 |
| l1_plant_sheet | 1090,280,446,380 | prop_butterfly | common |  | tâm | rộng 80 | 8 |

Bố cục: chậu cây ở nửa trái; bướm nhỏ ở bên phải, sát mép phải, giữa chiều cao (cùng tỉ lệ thật với chậu cây: bướm rộng khoảng 1/3 chậu cây kể cả lá).
- `l1_plant`: chậu đất tròn mập hồng đào, đáy phẳng, **miệng chậu là một đường ngang rõ**. 3–4 lá to tròn xanh bạc hà mọc chụm từ một gốc ở giữa miệng chậu; **mọi chiếc lá nằm trên miệng chậu**, không lá nào rủ xuống thân chậu; đầu lá hơi ngả như đang vẫy. (Code cắt lá và chậu tại miệng chậu, chỉ lá rung.)
- `prop_butterfly` (dùng lại ở level 9): bướm nhìn **thẳng từ trên xuống**, **đối xứng trái-phải tuyệt đối**, cánh mở phẳng: 2 cánh trên to, 2 cánh dưới nhỏ, vàng bơ mép hồng đào, không hoa văn. Thân nâu mảnh nằm đúng trục giữa, đầu hướng lên trên, 2 râu cong.

### 5.8 Tờ `l1_rug_sheet` — Thảm (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l1_rug_sheet | 0,0,1536,512 | l1_rug_flat | level1 | rug | đỉnh | rộng 960 | 5 |
| l1_rug_sheet | 0,512,1536,512 | l1_rug_curled | level1 | rug | đỉnh |  | 5 |

Thảm chiếm gần hết bề ngang ô (cách mép trái, phải đúng ~40px) để k ≈ 1,5.
- `l1_rug_flat`: thảm tròn nhìn chếch thành **elip dẹt**, hồng phấn, viền ngoài đậm hơn một chút, nằm phẳng. Không hoa văn, không tua rua.
- `l1_rug_curled`: cùng elip, phần chưa cuộn trùng khít ô trên (mép sau giữ nguyên). **Góc trước bên trái cuộn lên một vòng**, lộ mặt dưới hồng nhạt hơn.

### 5.9 Tờ `sua_poses_a_sheet` — Tư thế Sữa (1536x1024, tham chiếu `cats/sua_ref.png`)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| sua_poses_a_sheet | 0,0,768,542 | sua_sit_stare | cats | sua_pose | đáy | cao 250 | 4 |
| sua_poses_a_sheet | 0,542,768,482 | sua_eat | cats | sua_pose | đáy |  | 4 |
| sua_poses_a_sheet | 768,542,768,482 | sua_eat_f2 | cats | sua_pose | đáy |  | 4 |

Đúng nhân vật trong `sua_ref`. Cả bốn tư thế **mặt hướng sang phải**, đầu cùng cỡ, **mông và hai chân sau giữ nguyên chỗ** trong ô, chỉ đổi đầu, thân trên, đuôi: swap trông như một con mèo cử động.
- `sua_sit_stare`: ngồi thẳng, ngực ưỡn hơi đổ về trước; đầu quay ba phần tư sang phải, cúi xuống; **mắt tròn xoe rất to, long lanh**, dán xuống góc dưới phải (hộp pate); tai dựng chĩa tới; miệng khép; đuôi quấn quanh chân. Vẻ "ta đợi lâu lắm rồi".
- `sua_meow_up`: thân trên vươn lên thành đường cong chữ S, đầu ngửa ~30° lên phía trên bên phải, **miệng mở tròn to kêu meo**, mắt nhắm híp, tai hơi ép ra sau, một chân trước nhấc khỏi sàn; 2 nét cong nhỏ cạnh miệng (không chữ). Hơi trách móc dễ thương.
- `sua_eat`: thân trước khom xuống, đầu chúi sang phải và xuống, **mõm ở góc dưới phải** (chỗ code đặt hộp pate); mắt nhắm cong, má phồng; đuôi dựng cong hình dấu hỏi vì vui. **Không vẽ hộp.**
- `sua_eat_f2`: y hệt `sua_eat`, chỉ khác: đầu nhích lên một chút, má phồng hơn như đang nhai, chóp đuôi đổi hướng.

### 5.9b Tờ `sua_extra_sheet` — Đuôi thò ra và Sữa chạy vụt (1536x1024, tham chiếu `cats/sua_ref.png`, G10)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| sua_extra_sheet | 0,128,448,896 | sua_tail_peek | cats |  | đáy | cao 120 | 8 |
| sua_extra_sheet | 448,0,1088,1024 | sua_run | cats |  | đáy | rộng 330 | 7 |

Bố cục: bên trái (khoảng 30% bề ngang) là khúc đuôi đứng dọc; bên phải (70%) là Sữa chạy. Đúng nhân vật `sua_ref` (lông xù bông trắng ấm, đuôi bông to), nét mảnh đậm nhạt.
- `sua_tail_peek`: **chỉ một khúc đuôi bông** của Sữa (khoảng 2/3 cái đuôi), dựng lên cong nhẹ hình dấu hỏi, đầu đuôi tròn xù. **Gốc đuôi cắt phẳng ngang ở đáy, là điểm thấp nhất** (code đặt gốc khuất sau gối hoặc mép rèm). Không có thân mèo, không chân.
- `sua_run`: Sữa **vụt chạy, nhìn nghiêng sang phải**, người duỗi dài, 4 chân duỗi ra trước sau, tai cụp ra sau, mắt tròn hơi hoảng, đuôi bông bay ra sau; 3 vệt gió ngắn màu nâu nhạt phía sau đuôi. Không bóng sàn.

### 5.9c Tờ `sua_meow_sheet` — Sữa kêu meo, vẽ lại (Codex trả 1254x1254, tham chiếu `sua_ref`, `sua_sit_stare`)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| sua_meow_sheet | 0,0,1254,1254 | sua_meow_up | cats | sua_pose | đáy | cao 240 | 6 |

- `sua_meow_up`: Sữa **ngồi** y như `sua_sit_stare` (cùng thân, cùng mông, **hai chân trước đặt đều trên sàn** ngay ngắn, đuôi bông quấn bên cạnh), mặt hướng sang phải; chỉ khác **đầu ngẩng lên** ~30°, **mắt nhắm híp**, **miệng mở tròn kêu meo**, 2–3 nét cong nhỏ cạnh miệng. Không chân nào giơ lên. Đáy phẳng, Sữa căn giữa, cách mép ≥ 40px.

### 5.10 Cảnh bế: `sua_held_sheet`, `player_hands_sheet` (1024x1536, mỗi tờ một ô)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| sua_held_sheet | 0,0,1024,1536 | sua_held | cats |  | 513,645 | cao 620 | 5 |
| player_hands_sheet | 0,0,1024,1536 | player_hands_lift | player |  | đáy | cao 600 | 4 |

- `sua_held` (tham chiếu `sua_ref`; vẽ trước tay): Sữa được nhấc lên, **người duỗi dài thẳng đứng như sợi mì**: hai chân trước giơ chĩa ra hai bên ngang ngực, **chỗ nách để trống**, bụng tròn, hai chân sau lủng lẳng, đuôi thả cong xuống. Mặt nhìn thẳng, **mắt híp cười**, má hồng, miệng chữ ω. Nách ở khoảng 35% chiều cao. Không vẽ tay người. (Neo: Art ghi tay `x,y` điểm giữa hai nách sau khi vẽ.)
- `player_hands_lift` (tham chiếu `sua_held`, `player_ref`; vẽ lại sau khi chơi thử): hai bàn tay trẻ con mũm mĩm màu da nhạt, nhìn từ góc người chơi như **hai tay của chính mình đưa ra từ dưới màn hình**: mỗi cánh tay đi lên **chéo vào trong** từ góc dưới (tay trái từ góc dưới trái, tay phải từ góc dưới phải), **cẳng tay ngắn, tự nhiên**, không phải hai cột thẳng đứng dài. **Lòng bàn tay hướng vào nhau**, ngón hơi khum như sắp đỡ Sữa dưới nách; đầu ngón ở khoảng 40% chiều cao canvas. Ống tay áo len vàng bơ (có bo gấu ở cổ tay) kéo tới **mép dưới canvas**. Khe giữa hai lòng bàn tay ≈ bề ngang ngực Sữa ở nách trong `sua_held` (khoảng 40% bề ngang canvas). Không vẽ mèo.

### 5.11 Tờ `ui_mission_sheet` — Bong bóng nhiệm vụ (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| ui_mission_sheet | 0,100,768,924 | ui_speech_bubble | common |  | đáy | rộng 330 | 6 |
| ui_mission_sheet | 768,512,512,512 | sua_face_icon | cats | cat_head | tâm | rộng 165 | 8 |
| ui_mission_sheet | 768,0,512,512 | ui_cat_head_dark | common | cat_head | tâm |  | 8 |
| ui_mission_sheet | 1280,60,256,320 | ui_question_mark | common | question_mark | tâm | rộng 55 | 8 |
| ui_mission_sheet | 1280,380,256,290 | ui_question_mark_white | common | question_mark | tâm |  | 8 |
| ui_mission_sheet | 1280,680,256,344 | ui_heart | common |  | tâm | rộng 60 | 11 |

Bố cục: bong bóng to ở góc trên trái; cột giữa: bóng đầu mèo tối ở trên, mặt Sữa ở dưới (**cùng cỡ, cùng đường viền đầu**); cột phải hẹp: dấu hỏi hồng, dấu hỏi trắng, trái tim.
- `ui_speech_bubble`: bong bóng lời thoại tròn hơi dẹt, trắng kem, viền nâu run tay. Thân rộng ~80% ô, tâm ở ~42% chiều cao ô; **đuôi nhọn ngắn chĩa xuống, hơi lệch trái**, đầu nhọn là điểm thấp nhất. Bên trong trống hoàn toàn.
- `ui_cat_head_dark`: **bóng đầu Sữa** nhìn thẳng (đầu tròn lông hơi xù, hai tai nhọn bo đầu như `sua_ref`), tô kín tím than nhạt #5B5470, viền nâu. Không mắt, mũi, miệng. Đầu rộng ~70% ô, tâm đầu ở tâm ô.
- `sua_face_icon`: **đúng cái bóng đầu ở ô trên** (cùng cỡ, cùng đường viền), nhưng là mặt Sữa: trắng ấm, nhìn thẳng, mắt híp cười, má hồng, trong tai hồng đào.
- `ui_question_mark`: dấu hỏi to, mập, tròn trịa, hồng đào, nét chì (ký hiệu, không phải chữ). `ui_question_mark_white`: y hệt, ruột trắng kem, viền nâu.
- `ui_heart`: trái tim mập tròn hồng đào (dấu hỏi đổi thành tim khi tìm thấy mèo).

### 5.12 Tờ `player_poses_a_sheet`, `player_poses_b_sheet` — Nhân vật (1536x1024, tham chiếu `player/player_ref.png`)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| player_poses_a_sheet | 0,0,768,1024 | player_call | player | player_pose | đáy | cao 580 | 4 |
| player_poses_a_sheet | 768,0,768,1024 | player_scratch_head | player | player_pose | đáy | cao 580 | 4 |
| player_poses_b_sheet | 0,0,768,1024 | player_surprised | player | player_pose | đáy | cao 651 | 4 |
| player_poses_b_sheet | 768,0,768,1024 | player_shrug | player | player_pose | đáy | cao 580 | 4 |

Đúng nhân vật trong `player_ref`. Đứng nhìn thẳng, cùng cỡ đầu, chân ở ~95% chiều cao ô. Cao 480 tính tới đỉnh đầu, không tính nét toả.
- `player_call`: hai tay khum quanh miệng như gọi to, người hơi đổ tới, nhón một gót; miệng mở tròn, lông mày nhíu lo lắng.
- `player_scratch_head`: một tay gãi sau đầu, tay kia chống hông, đầu nghiêng, cười gượng, mắt híp một bên; một giọt mồ hôi nhỏ xanh da trời cạnh đầu.
- `player_surprised`: hai tay giơ ngang vai xoè ngón, người ngả ra sau; mắt tròn to, miệng chữ O; 3 nét ngắn toả ra trên đầu.
- `player_shrug` (dùng chung mọi chỗ trốn trống): hai tay ngửa ngang vai, vai nhún cao, đầu nghiêng, cười méo, mắt nhắm.
- `player_box_on_head` (tùy chọn, vẽ sau cùng, ảnh lẻ một ô, tham chiếu tờ hộp và `player_ref`): đội hộp `l1_box_open_empty` úp trên đầu, hộp che tới mũi, hai tay giơ ngang lần mò, miệng cười toe.

### 5.13 Tờ `ui_icons_sheet` — Biểu tượng chung (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| ui_icons_sheet | 30,80,340,330 | ui_hand_pointer | common |  | 76,348 | rộng 140 | 5 |
| ui_icons_sheet | 370,80,300,330 | ui_hint_paw | common |  | 521,142 | rộng 140 | 5 |
| ui_icons_sheet | 670,80,300,330 | ui_bulb_button | common |  | tâm | rộng 130 | 5 |
| ui_icons_sheet | 990,120,220,260 | ui_sparkle | common |  | tâm | rộng 60 | 8 |
| ui_icons_sheet | 1215,120,321,260 | ui_dried_fish | common |  | tâm | rộng 80 | 6 |
| ui_icons_sheet | 1100,560,436,464 | fx_pop | common |  | tâm | rộng 200 | 5 |

Bố cục: hàng trên năm biểu tượng nhỏ từ trái sang phải (bàn tay, bàn chân, nút bóng đèn, lấp lánh, cá khô); `fx_pop` ở góc dưới phải. Mô tả theo `style.md` mục 5, thêm:
- `ui_hand_pointer`: bàn tay trẻ con mũm mĩm, ngón trỏ chỉ chéo xuống trái, ống tay áo len vàng bơ ngắn (khớp `player_ref`). Neo: đầu ngón trỏ (Art ghi tay).
- `ui_hint_paw`: bàn chân mèo trắng, 4 đệm thịt hồng, giơ lên như đang chỉ. Neo: đầu bàn chân (Art ghi tay).
- `fx_pop` (dùng lại ở level 10): vụ nổ nhỏ dễ thương, hình sao/tia bung tròn vàng bơ, 6 tia ngắn và vài chấm tròn, **đối xứng tròn, tâm ở tâm ô**. Không khói, không vệt, không chữ "TÁCH".

---

## 6. Ghi chú cho lập trình (không cần đưa Codex)

- **Thứ tự vẽ:** demo (mục 7) → `player_ref` → nền → các tờ cushion (nếu màu sofa lệch), clock, plant, box, pillow, curtain, rug (tham chiếu nền) → `sua_poses_a_sheet` → `ui_mission_sheet` → `sua_held_sheet` → `player_hands_sheet` → hai tờ nhân vật → `ui_icons_sheet` → `player_box_on_head` (nếu còn hạn mức).
- **Lệnh:** `node tools/codex-draw.mjs --sheet <tờ> --ref <ảnh1>,<ảnh2>` vẽ tờ rồi tự cắt. Nền: `node tools/codex-draw.mjs l1_bg_living_room`. Cắt lại: `python tools/sheet_cut.py cut art/design-art-level1.md --sheet <tờ>`.
- **Điểm neo** của mọi key nằm ở `art/out/anchors.json` (công cụ ghi, không sửa tay). Cặp đệm cùng neo `đáy`: đặt `_lifted` cao hơn `_bulge` 25px. Thảm neo `đỉnh` (mép sau).
- **Lớp:** quả lắc nằm sau thân đồng hồ, khoen khuất sau móc đáy. Chim đặt trước lỗ vòm của `l1_wall_clock_open`. Hộp pate đóng nằm dưới lớp đệm. `sua_eat` đặt dưới `l1_pate_can_open` để mõm chúi vào hộp.
- **Frame do code cắt:** `l1_plant` → `leaves`/`pot` tại miệng chậu; `l1_curtain_closed` → `left`/`right` tại giữa. Dev ghi đường cắt trong cấu hình cảnh.
- **Chuyển động bằng code:** quả lắc đung đưa ±6° (chạm: `swing` ±14° tắt dần); chim thò ra scale 0,4 → 1,1 → 1, gật mỏ 2 lần quanh gốc que; bướm vỗ cánh bằng scaleX; hơi thơm: 3 bản một làn, lệch pha, lật ngang ngẫu nhiên, bay lên, lắc, mờ dần; rèm: hai nửa co scaleX về hai mép 0,25 giây rồi swap; Sữa ăn: đổi `sua_eat`/`sua_eat_f2` 0,25 giây kèm gật đầu.
- Trạng thái, điều kiện chuyển, âm thanh: `levels/states-01-10.md` mục Level 1.

**Bảng vị trí** (điểm neo trên khung 1024x1536; dòng trên nằm dưới; `sheet_cut.py compose` đọc bảng này):

| Key | X | Y | Cảnh |
|---|---|---|---|
| l1_wall_clock_pendulum | 866 | 470 | |
| l1_wall_clock_closed | 866 | 182 | |
| l1_wall_clock_bird | 866 | 320 | cúc cu |
| l1_plant | 890 | 1345 | |
| prop_butterfly | 960 | 1080 | |
| l1_rug_flat | 512 | 1055 | |
| l1_box_closed | 220 | 1285 | |
| l1_pate_can_closed | 800 | 893 | đầu |
| l1_pate_can_open | 650 | 1305 | lộ |
| l1_pate_can_steam | 640 | 1228 | lộ |
| l1_sofa_cushion_flat | 705 | 955 | đầu |
| l1_sofa_cushion_lifted | 705 | 940 | lộ |
| l1_pillow_white_idle | 308 | 875 | |
| l1_curtain_closed | 285 | 185 | |
| sua_sit_stare | 480 | 1290 | lộ |
| player_call | 490 | 1445 | đầu |

---

## 7. Ảnh demo (G7, P5)

Tranh dựng cảnh 1024x1536, không dùng trong game, lưu ở `art/out/demo/`, để chủ dự án duyệt không khí, màu, tỉ lệ. Vẽ theo bố cục mục 2, đồ vật đúng mô tả mục 5.
- `l1_demo_start`: mọi đồ vật ở trạng thái đầu (rèm đóng, đồng hồ đóng có quả lắc, gối nằm, đệm phồng, hộp các-tông đóng, chậu cây có bướm đậu, thảm phẳng). Nhân vật khum tay gọi ở giữa dưới. Bong bóng nhiệm vụ (bóng đầu mèo tối, dấu hỏi trắng) ở giữa màn hình. Không có mèo.
- `l1_demo_reveal`: đệm đã lật dựng, hộp pate mở trên sàn trước sofa có hơi thơm, Sữa ngồi bên trái hộp nhìn chằm chằm vào pate. Bong bóng nhỏ ở góc trên trái đã thành mặt Sữa.

Lát cắt sprite thật để kiểm: `l1_cushion_sheet`, `l1_pate_sheet`. Ghép lên tranh demo bằng `compose` để soi cỡ, nét, màu.
