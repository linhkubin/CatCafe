# Design Art – Level 4: Vòi nước nhỏ giọt

> Đọc kèm `style.md`. Bút chì màu, pastel tươi (O3), nét mảnh đậm nhạt (O5), cute, tối giản, **không chữ**.
>
> **Phòng:** Nhà tắm (bên trái) ⇄ Bếp (bên phải), ban ngày. **Mèo:** Sữa (theo `cats/sua_ref.png`). **Ý chính:** Sữa trốn trên cao trong nhà tắm, chỉ chịu xuống khi vòi rửa mặt chảy **nhỏ giọt**. Nước chưa tới vì ống dưới bồn rửa bát trong bếp bị xoay lệch: mở tủ, xoay 6 ô ống cho thông, vặn van đỏ, rồi về nhà tắm vặn vòi thật nhẹ.

Áp dụng mọi quy tắc đã chốt ở Level 1–3 (`art/review/level1-thread.md` … `level3-thread.md`): vẽ theo tờ, đặt tên V23, cột Nét theo công thức cuối, vùng chạm ≥ 115px, neo theo công cụ, `anchors.json`, **góc nhìn chung** (`style.md` mục 2b), màu và nét theo `art/ref/owner_l1_style_ref.png`, dải banner y 1386–1536 không có đồ chạm được.

**Mới từ Level 4 (chủ dự án chốt):** nền chỉ là **phòng trống** (tường, sàn, chân tường, trần). Mọi đồ, kể cả bồn tắm, bồn rửa, tủ, giá khăn, cửa sổ, thảm, đều là sprite riêng nền trong suốt.

Nguồn gameplay: `levels/levels-01-10.md` và `levels/states-01-10.md` mục Level 4; quyết định G4-1…G4-5 (GD), D4-1…D4-9 (Dev), A4-x (Art) trong `art/review/level4-thread.md`.

---

## 1. Danh sách key

Hiển thị = cỡ trong game trên khung phòng 1024x1536. TS = trong suốt. Chữ in nghiêng = key mới so với states (A4-2).

| Key | Thư mục | Hiển thị | Nền | Neo | Tờ (nhóm) |
|---|---|---|---|---|---|
| `l4_bg_bathroom` | level4 | 1024x1536 | Có nền | góc trên trái | ảnh lẻ (mục 4) |
| `l4_bg_kitchen` | level4 | 1024x1536 | Có nền | góc trên trái | ảnh lẻ (mục 4) |
| `l4_mirror_cabinet` | level4 | rộng 330 | TS | đáy | `l4_mirror_sheet` (mirror) |
| `l4_mirror_fog` | level4 | theo nhóm | TS | đáy | `l4_mirror_sheet` (mirror) |
| `l4_sink` | level4 | rộng 330 | TS | đáy | `l4_sink_sheet` |
| `l4_faucet` | level4 | rộng 110 | TS | đáy | `l4_sink_sheet` |
| `l4_water_gush` | level4 | cao 190 | TS | đỉnh (miệng vòi) | `l4_sink_sheet` |
| `l4_water_drip` | level4 | rộng 24 | TS | đỉnh | `l4_sink_sheet` |
| `l4_towel_rack` | level4 | rộng 340 | TS | đáy | `l4_towel_sheet` |
| `l4_towel_rolled` | level4 | rộng 150 | TS | đáy | `l4_towel_sheet` (towel) |
| `l4_towel_fallen` | level4 | rộng 230 | TS | đáy | `l4_towel_sheet` (towel) |
| `l4_bathtub` | level4 | rộng 500 | TS | đáy | `l4_bath_sheet` |
| `l4_rubber_duck` | level4 | rộng 90 | TS | đáy | `l4_bath_sheet` |
| *`l4_bath_mat`* | level4 | rộng 280 | TS | đáy | `l4_bath_sheet` (trang trí) |
| `l4_kitchen_sink` | level4 | rộng 760 | TS | đáy | `l4_kitchen_sheet` |
| *`l4_kitchen_window`* | level4 | rộng 380 | TS | đáy | `l4_kitchen_sheet` (trang trí) |
| `l4_cookie_jar` | level4 | cao 150 | TS | đáy | `l4_kitchen_sheet` |
| `l4_water_bowl` | level4 | rộng 130 | TS | đáy | `l4_kitchen_sheet` |
| `l4_sink_cabinet_closed` | level4 | rộng 740 | TS | đáy | `l4_cabinet_sheet` (cabinet) |
| `l4_sink_cabinet_open` | level4 | theo nhóm | TS | đáy | `l4_cabinet_sheet` (cabinet) |
| `l4_pipe_straight_dry` | level4 | 150x150 | TS | tâm | `l4_pipe_sheet` (pipe) |
| `l4_pipe_straight_wet` | level4 | 150x150 | TS | tâm | `l4_pipe_sheet` (pipe) |
| `l4_pipe_elbow_dry` | level4 | 150x150 | TS | tâm | `l4_pipe_sheet` (pipe) |
| `l4_pipe_elbow_wet` | level4 | 150x150 | TS | tâm | `l4_pipe_sheet` (pipe) |
| `l4_valve` | level4 | rộng 104 | TS | tâm trục | `l4_pipe_sheet` |
| `l4_valve_icon` | level4 | rộng 120 | TS | tâm | `l4_pipe_sheet` (icon bong bóng) |
| `l4_pipe_icon` | level4 | rộng 120 | TS | tâm | `l4_pipe_sheet` (icon bong bóng) |
| `sua_jump` | cats | rộng 300 | TS | tâm thân | `l4_sua_a_sheet` |
| `sua_cover_face` | cats | cao 130 | TS | x,y giữa mép cắt dưới | `l4_sua_a_sheet` |
| `sua_peek_down` | cats | cao 150 | TS | x,y giữa mép cắt dưới | `l4_sua_a_sheet` |
| `sua_drink` | cats | cao 190 | TS | x,y giữa mép cắt dưới | `l4_sua_b_sheet` (sua_basin) |
| `sua_head_shake` | cats | theo nhóm | TS | x,y giữa mép cắt dưới | `l4_sua_b_sheet` (sua_basin) |
| `sua_lick_lips` | cats | theo nhóm | TS | x,y giữa mép cắt dưới | `l4_sua_b_sheet` (sua_basin) |
| *`ui_room_arrow`* | common | rộng 110 | TS | tâm | `ui_nav_sheet` (D4-2, dùng mọi level nhiều phòng) |
| `ui_minimap_frame` | common | rộng 220 | TS | tâm | `ui_nav_sheet` |
| `ui_minimap_room` | common | rộng 84 | TS | tâm | `ui_nav_sheet` (minimap_room) |
| `ui_minimap_room_current` | common | theo nhóm | TS | tâm | `ui_nav_sheet` (minimap_room) |

**Dùng lại, không vẽ:** `player_point_think` + `ui_thought_bubble` (G4-6: nhân vật trồi lên ở góc dưới nhà tắm, bong bóng chứa `l4_valve_icon`, `l4_pipe_icon` hoặc `l4_water_drip`; bếp không có nhân vật), `sua_run`, `sua_tail_peek`, `sua_face_icon` (chấm Sữa trên bản đồ, D4-2), `sua_held`, `player_hands_lift`, `ui_thought_bubble`, `ui_hand_pointer`, `ui_hint_paw`, `ui_bulb_button`, `ui_pause_button`, `ui_dried_fish`, `ui_sparkle`, `fx_pop`.

**Không vẽ, code tạo:** hạt nước bắn, giọt trên gương, nước phụt ở đầu ống hở (particle); giọt rơi đều (tween `l4_water_drip`); gợn sóng bát nước (vòng elip nở); lóe sáng đường ống (tint trắng F→A); vệt rung dọc ống; bóng sàn.

**Bỏ:** `ui_arrow_left/right/up/down` ở states mục 0 thay bằng một key `ui_room_arrow` (chĩa phải, code lật); `ui_minimap_eyes`, `ui_minimap_paw` chưa cần (Sữa trên bản đồ dùng `sua_face_icon`).

---

## 2. Bố cục hai phòng

Nhà tắm bên **trái**, bếp bên **phải** (G4-4). Code đặt hai phòng cạnh nhau, trượt camera (D4-1). Toạ độ dưới đây là trong khung từng phòng (0–1024).

**Mốc chung hai nền (D4-1):** chân tường (mép trên len chân tường) **y≈1180**, len chân tường cao ~30px; sàn từ y≈1180 tới đáy khung. Giao diện y 0–130; dải banner y 1386–1536 chỉ là sàn trơn. Sáng từ trên trái.

```
NHÀ TẮM (bắt đầu)                       BẾP
┌──────────────────────────────┐ ┌──────────────────────────────┐
│ ♥Sữa ●●●○   [bản đồ]      ⏸ │ │ ♥Sữa ●●●○   [bản đồ]      ⏸ │  y 0–130 giao diện
│     ~đuôi Sữa~               │ │              ┌───────────┐   │
│  ┌──────────┐                │ │              │ CỬA SỔ    │   │  cửa sổ x 520–900, y 200–500
│  │ TỦ GƯƠNG │   ══════════   │ │              │           │   │
│  │  (kính)  │   GIÁ KHĂN +   │ │              └───────────┘   │
│  └──────────┘   khăn cuộn    │ │   [HŨ]    ╭─VÒI─╮           │  hũ bánh trên mặt bếp trái
│      ╓┐ VÒI     ║ khăn treo║ ►│◄│ ┌──────────╨─────╨────────┐ │  mặt bếp y≈690
│  ╭──────────╮                │ │ │ TỦ DƯỚI BỒN (2 cánh)     │ │  tủ x 160–900, y 700–1200
│  │ BỒN RỬA  │                │ │ │  mở: lưới ống 3×2 + van  │ │
│  ╰───┐  ┌───╯                │ │ │                          │ │
│      │  │  ┌───────────────┐ │ │ └──────────────────────────┘ │
│ ─────┴──┴──│ BỒN TẮM  🦆   │─│ │──────────────────────────────│  chân tường y≈1180
│  (thảm)    └───────────────┘ │ │  (bát nước)                  │
│                         💡   │ │                         💡   │  💡 tâm (934, 1306)
├──────────────────────────────┤ ├──────────────────────────────┤  y 1386–1536 banner
└──────────────────────────────┘ └──────────────────────────────┘
```

- **Nhà tắm:** tủ gương treo tường trên trái (nóc y≈280), bồn rửa chân đứng ngay dưới tủ gương, vòi trên mép sau bồn; giá khăn treo tường bên phải (nóc y≈400, lệch nóc tủ gương 120px, D4-6); bồn tắm chân đứng ở dưới phải, vịt cao su trên mép bồn; thảm nhỏ trước bồn rửa. Mũi tên ► sát mép phải, tâm y≈760 (giữa giá khăn và bồn tắm).
- **Bếp:** cửa sổ trên phải; mặt bếp + bồn rửa bát + vòi bếp chạy ngang, bồn ngay dưới cửa sổ; tủ dưới bồn hai cánh, đứng trên sàn; hũ bánh quy trên mặt bếp bên trái; bát nước của Sữa trên sàn trước chân tủ bên trái. Mũi tên ◄ sát mép trái, tâm y≈760 (code chừa vùng chạm x 0–140, nên tủ bắt đầu từ x 160).
- **Một camera chung** (`style.md` 2b) cho cả hai phòng: chính diện, nhìn xuống ~15°, cạnh ngang nằm ngang, cạnh đứng thẳng đứng, mặt trên chỉ là dải mỏng, không 3/4. Nét chì đổ bóng bên phải đồ. Không bóng sàn.
- **Tỉ lệ chuẩn:** Sữa ngồi cao ~230–260 (như level 1); bồn rửa rộng 330 đủ cho Sữa ngồi trong lòng bồn; ô ống 150.

### 2b. Góc nhìn, tỉ lệ, chất liệu từng đồ

| Đồ | Góc nhìn và mặt thấy | Tỉ lệ (hiển thị) | Chất liệu, màu |
|---|---|---|---|
| Tủ gương (`l4_mirror_cabinet`) | Hộp treo tường nhìn thẳng: mặt trước chữ nhật đứng, **nóc là dải mỏng** (chỗ Sữa nằm), dải hông phải rất hẹp | rộng 330, cao ~300 | Khung gỗ mật ong bo góc, cửa là **một tấm kính** xanh da trời rất nhạt với 2 vệt sáng chéo nhỏ, núm tròn nhỏ bên phải |
| Bồn rửa mặt (`l4_sink`) | Chậu sứ chân đứng: miệng chậu là **elip dẹt** (thấy lòng chậu nông), thân chậu tròn mập, chân trụ thẳng xuống sàn | rộng 330, cao ~460 (miệng chậu y≈740 tới sàn 1200) | Sứ trắng ấm, bóng chì xanh trời nhạt bên phải |
| Vòi (`l4_faucet`) | Vòi cổ cong nhìn thẳng, miệng vòi chĩa xuống, **một tay vặn tròn** trên đỉnh | rộng 110, cao ~130 | Đồng thau vàng nhạt ấm, tay vặn có chấm xanh |
| Nước xối / giọt | Dòng nước nhìn thẳng | xối cao 190, giọt rộng 24 | Xanh da trời trong, viền nâu-xanh mảnh |
| Giá khăn (`l4_towel_rack`) | Kệ gỗ treo tường: tấm kệ là dải ngang dày (nóc kệ là dải mỏng), 2 giá đỡ cong, thanh treo tròn bên dưới có **một khăn xanh bạc hà vắt** | rộng 340, cao ~200 | Gỗ caramel, khăn bạc hà có 3 sọc kem to |
| Khăn cuộn (`l4_towel_rolled`) 🎭 | Khăn trắng cuộn tròn nằm trên kệ, nhìn ngang: khối bầu dục mập, đầu cuộn xoắn ở một bên | rộng 150, cao ~95 (to như Sữa cuộn tròn) | **Trắng ấm như lông Sữa**, mép bông, không mặt |
| Khăn rơi (`l4_towel_fallen`) | Cùng khăn bung ra nằm bẹp trên sàn, mép quăn | rộng 230, cao ~60 | như trên |
| Bồn tắm (`l4_bathtub`) | Bồn chân đứng nhìn ngang: thân bầu dục dài, **miệng bồn là dải elip rất dẹt**, 4 chân cong ngắn | rộng 500, cao ~240 | Men hồng phấn nhạt bên ngoài, lòng/mép trắng kem; chân đồng thau |
| Vịt cao su (`l4_rubber_duck`) ✨ | Nhìn nghiêng sang trái, ngồi trên mép bồn | rộng 90 | Vàng bơ, mỏ cam đào, mắt chấm |
| Thảm nhà tắm (`l4_bath_mat`) | Thảm chữ nhật bo góc nằm trên sàn (dải dẹt) | rộng 280, cao ~50 | Xanh da trời nhạt, viền tua ngắn |
| Mặt bếp + bồn rửa bát (`l4_kitchen_sink`) | Mặt bếp là dải ngang dày (mặt trên dải mỏng), bồn inox lõm vào mặt bếp (chỉ thấy miệng elip dẹt), vòi bếp cổ ngỗng cao sau bồn | rộng 760, cao ~170 (mặt bếp ~40 + vòi) | Mặt bếp gỗ mật ong, bồn xám bạc nhạt, vòi đồng thau |
| Cửa sổ bếp (`l4_kitchen_window`) | Cửa sổ 2 cánh kính nhìn thẳng, bệ cửa dải mỏng, rèm ngắn bạc hà hai bên | rộng 380, cao ~300 | Khung kem, kính xanh trời nhạt; 1 chậu cây nhỏ trên bệ |
| Hũ bánh quy (`l4_cookie_jar`) 🎁 | Hũ thủy tinh tròn mập nhìn ngang, nắp gỗ tròn (mặt trên elip dẹt), núm tròn | cao 150 | Kính xanh trời rất nhạt, thấy 3–4 bánh quy tròn caramel bên trong; nắp caramel |
| Bát nước (`l4_water_bowl`) ✨ | Bát thấp nhìn ngang, mặt nước là elip dẹt | rộng 130 | Bát gốm hồng đào, hình bàn chân mèo kem trên thân; nước xanh trời nhạt |
| Tủ dưới bồn (`l4_sink_cabinet_*`) | Tủ thấp 2 cánh nhìn thẳng, mặt trước chữ nhật; nóc bị mặt bếp che | rộng 740, cao ~500 | Gỗ bạc hà nhạt (cùng tông bếp), núm tròn gỗ; lòng tủ gỗ mật ong nhạt hơn, tối nhẹ ở góc |
| Ô ống (`l4_pipe_*`) | Nhìn thẳng, ống nằm phẳng trong mặt phẳng ô | ô 150, ống dày ~46 | **Đồng/đồng thau ấm** (caramel-vàng), mặt bích tròn to ở hai đầu; bản ướt ánh xanh trời + 2–3 giọt đọng |
| Van (`l4_valve`) | Tay van tròn kiểu bánh xe 4 nan nhìn thẳng (mặt trước tròn) | rộng 104 | **Đỏ san hô** (#EE8A7A như quả bông L3), trục giữa đồng thau |
| Mũi tên phòng (`ui_room_arrow`) | Phẳng như giao diện | rộng 110, cao ~130 | Kem giấy, viền gỗ caramel + viền nâu ngoài, chĩa phải |
| Bản đồ mini | Phẳng | khung 220x100, ô 84 | Giấy kem viền nâu; ô thường kem, ô đang ở vàng bơ |

**Nền màu hai phòng:** nhà tắm tường **xanh bạc hà rất nhạt**, nửa dưới tường ốp gạch vuông to kem (vài đường ron mảnh, tối đa 3 hàng gạch thấy rõ); sàn gạch vuông to kem-hồng đào. Bếp tường **kem bơ ấm**, dải gạch ốp sau mặt bếp màu kem với ron mảnh; sàn gỗ ván ngang mật ong như level 1. Hai nền cùng chân tường, cùng ánh sáng.

### 2c. Trạng thái và phần giữ nguyên

| Đồ | Trạng thái | Giữ nguyên giữa các trạng thái |
|---|---|---|
| Tủ gương | `l4_mirror_cabinet` + `l4_mirror_fog` phủ (code hiện mờ dần) | Fog chỉ phủ **đúng ô kính**, cùng khung ảnh, cùng neo với tủ |
| Vòi rửa mặt | khô = `l4_faucet`; xối = + `l4_water_gush`; nhỏ giọt = + `l4_water_drip` rơi đều | Vòi không đổi ảnh; nước là sprite phủ, đỉnh nước trùng miệng vòi |
| Khăn | `l4_towel_rolled` (trên kệ) → `l4_towel_fallen` (sàn) | Cùng màu, cùng chất khăn; hai ảnh khác hình (cuộn / bung), không cần cùng khung |
| Tủ bếp | `_closed` ↔ `_open` | Thân tủ, khung, chân, đường đáy, nét mặt bếp phía trên (nếu thấy) giống hệt; chỉ đổi cánh (đóng / mở sang hai bên thấy lòng tủ) |
| Ô ống | `_dry` ↔ `_wet` (mỗi loại thẳng / cút) | **Từng pixel hình khối giống hệt**, cùng ô vuông, cùng tâm; chỉ khác ánh màu và giọt đọng (D4-3) |
| Van | đóng → mở (code xoay 90°) | Một ảnh |
| Sữa trong bồn | `sua_drink`, `sua_head_shake`, `sua_lick_lips` | Cùng cỡ, cùng đường đáy, cùng chỗ ngồi; chỉ đổi đầu, lưỡi, chân |
| Ô bản đồ | `_room` ↔ `_room_current` | Cùng hình, cùng cỡ, chỉ đổi màu |

---

## 3. Quy tắc tờ

Như `design-art-level3.md` mục 3: tờ 1536x1024 (hoặc 1024x1536), nền trong suốt, mỗi ô một thứ, cách mép ô ≥ 40px, cùng tỉ lệ thật trong tờ, trạng thái cùng nhóm giống hệt phần không đổi và cùng đường đáy. **Cột Nét** = viền ngoài ở chỗ đậm nhất (px trong tờ); Nét = 3k với đồ vật/UI, 2,5k với mèo, không dưới 2k. Giao việc kèm `--stroke-ref art/out/cats/sua_ref.png=<0,6 × Nét ÷ 5>`, ảnh mẫu `art/ref/owner_l1_style_ref.png` và ảnh cắt cận từ demo đã duyệt. Ô và Nét dưới đây là bản đầu; vẽ xong đo khung thật, sửa ô rồi cắt lại.

**Chỉ vẽ tờ sau khi chủ dự án duyệt demo** (QUY-TRINH bước 4).

---

## 4. Ảnh lẻ

| File (trong art/out/) | Key | Kích thước | Nền | Mô tả |
|---|---|---|---|---|
| `level4/l4_bg_bathroom.png` | `l4_bg_bathroom` | 1024x1536 | Có nền | Nhà tắm trống (mô tả dưới) |
| `level4/l4_bg_kitchen.png` | `l4_bg_kitchen` | 1024x1536 | Có nền | Bếp trống (mô tả dưới) |

### `l4_bg_bathroom` — Nhà tắm trống
- Sửa từ demo nhà tắm đã duyệt: **xoá mọi đồ và UI**, chỉ còn phòng trống. Không người, không mèo, không cửa sổ, không đồ.
- Tường sau phẳng chạy ngang cả khung: nửa trên **xanh bạc hà rất nhạt** trơn; nửa dưới (từ y≈820 tới chân tường) ốp **gạch vuông to màu kem**, ron mảnh nâu nhạt, mép trên ốp gạch là một nẹp gỗ mảnh mật ong.
- Chân tường y≈1180, len kem cao ~30. Sàn gạch vuông to kem-hồng đào (ron mảnh, 3–4 hàng gạch nhìn hơi từ trên). 8% trên cùng tường trơn (dưới giao diện), dải y 1386–1536 sàn trơn.

### `l4_bg_kitchen` — Bếp trống
- Sửa từ demo bếp đã duyệt: **xoá mọi đồ và UI**. Không cửa sổ, không tủ, không mặt bếp.
- Tường kem bơ ấm trơn; một **dải gạch ốp kem** ngang (y≈560–700, đúng chỗ sau mặt bếp; ron mảnh) chạy ngang từ x≈150 tới x≈910.
- Chân tường y≈1180 (cùng nhà tắm), len gỗ caramel cao ~30. Sàn gỗ ván ngang mật ong như level 1, vài nét ván. Dải y 1386–1536 sàn trơn.

---

## 5. Các tờ và mô tả từng ảnh

### 5.1 Tờ `l4_mirror_sheet` — Tủ gương và kính mờ (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l4_mirror_sheet | 0,0,768,1024 | l4_mirror_cabinet | level4 | mirror | đáy | rộng 330 | 6 |
| l4_mirror_sheet | 768,0,768,1024 | l4_mirror_fog | level4 | mirror | đáy |  | 6 |

Hai ô cùng một khung tủ ở **cùng chỗ trong ô** (cùng đường đáy y≈900).
- `l4_mirror_cabinet`: tủ treo tường gỗ mật ong bo góc, mặt trước chữ nhật đứng (rộng : cao ≈ 1,1 : 1), **nóc là dải gỗ mỏng phẳng** (đủ rộng cho Sữa nằm), một **cánh kính** chiếm gần hết mặt trước, kính xanh trời rất nhạt với 2 vệt sáng chéo ngắn; núm tròn nhỏ ở mép phải; đáy tủ là gờ gỗ mỏng. Không vẽ gì phản chiếu trong kính.
- `l4_mirror_fog`: **chỉ phần kính mờ hơi nước**, đúng hình và đúng chỗ ô kính của tủ bên cạnh (không vẽ khung gỗ): mảng trắng kem mờ phủ kính, mép mềm, vài giọt nước nhỏ chảy dọc và 2–3 vệt lau dở. Vẽ đặc (code đặt alpha).

### 5.2 Tờ `l4_sink_sheet` — Bồn rửa, vòi, nước (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l4_sink_sheet | 0,0,820,1024 | l4_sink | level4 |  | đáy | rộng 330 | 6 |
| l4_sink_sheet | 820,0,360,440 | l4_faucet | level4 |  | đáy | rộng 110 | 6 |
| l4_sink_sheet | 1180,0,356,700 | l4_water_gush | level4 |  | đỉnh | cao 190 | 5 |
| l4_sink_sheet | 820,500,360,300 | l4_water_drip | level4 |  | đỉnh | rộng 24 | 5 |

Cùng tỉ lệ thật: vòi rộng ~1/3 miệng bồn; nước xối dài bằng từ miệng vòi tới đáy lòng bồn.
- `l4_sink` 🔑: chậu rửa mặt sứ trắng ấm **chân đứng**: miệng chậu elip dẹt thấy lòng chậu nông (có lỗ thoát nước tròn nhỏ ở giữa lòng), mép sau chậu là gờ phẳng để đặt vòi (để trống, vòi là sprite riêng), thân chậu tròn mập, chân trụ thẳng loe nhẹ ở đáy. Lòng chậu **đủ rộng cho một mèo con ngồi**.
- `l4_faucet` 🔑: vòi đồng thau vàng nhạt cổ cong, miệng vòi chĩa thẳng xuống, **một tay vặn tròn mập** trên đỉnh (chấm xanh trời ở giữa), chân đế tròn phẳng ở đáy (neo đáy đặt lên gờ sau chậu).
- `l4_water_gush`: dòng nước **xối mạnh** thẳng xuống từ một miệng tròn nhỏ ở đỉnh (đỉnh dòng nước = neo, không vẽ vòi), thân dòng nước xanh trời trong có vài vệt trắng, đáy dòng bung ra **tia bắn và giọt văng hai bên**. Hình to, ồn ào.
- `l4_water_drip`: **một giọt nước** hình giọt lệ mập, xanh trời trong, một chấm sáng trắng. Neo đỉnh (chóp giọt).

### 5.3 Tờ `l4_towel_sheet` — Giá khăn, khăn cuộn, khăn rơi (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l4_towel_sheet | 0,0,1000,640 | l4_towel_rack | level4 |  | đáy | rộng 340 | 6 |
| l4_towel_sheet | 1000,100,536,440 | l4_towel_rolled | level4 | towel | đáy | rộng 150 | 6 |
| l4_towel_sheet | 0,640,1000,384 | l4_towel_fallen | level4 | towel | đáy | rộng 230 | 6 |

Cùng tỉ lệ thật: khăn cuộn dài ~45% tấm kệ.
- `l4_towel_rack`: kệ gỗ caramel treo tường: một **tấm kệ dày nằm ngang** (nóc kệ là dải mỏng, **trống**, chỗ đặt khăn cuộn và chỗ Sữa nhảy sang), hai giá đỡ cong bên dưới, giữa hai giá đỡ là **thanh treo tròn** vắt một khăn bạc hà có 3 sọc kem to rủ xuống. Đáy = mép dưới khăn treo (neo).
- `l4_towel_rolled` 🎭: khăn **trắng ấm cuộn tròn** nằm ngang, khối bầu dục mập, một đầu thấy vòng xoắn của cuộn khăn, mép vải hơi bông xù như lông, **trông như mèo trắng nằm cuộn** nhưng không tai, không mặt, không đuôi.
- `l4_towel_fallen`: (G4-7: rơi xong nằm nguyên dưới sàn tới hết màn) cùng khăn trắng **bung ra nằm bẹp trên sàn**, một góc gập lên, mép quăn, vài nếp. Dáng hơi buồn cười (như bãi bánh xèo).

### 5.4 Tờ `l4_bath_sheet` — Bồn tắm, vịt cao su, thảm (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l4_bath_sheet | 0,0,1200,700 | l4_bathtub | level4 |  | đáy | rộng 500 | 6 |
| l4_bath_sheet | 1200,0,336,400 | l4_rubber_duck | level4 |  | đáy | rộng 90 | 6 |
| l4_bath_sheet | 0,700,900,324 | l4_bath_mat | level4 |  | đáy | rộng 280 | 6 |

Cùng tỉ lệ thật: vịt cao ~1/3 chiều cao thân bồn.
- `l4_bathtub`: bồn tắm **chân đứng** nhìn ngang dọc thân bồn: thân bầu dục dài, men ngoài **hồng phấn nhạt**, **miệng bồn là dải elip rất dẹt** màu kem (thấy một dải mép trong), 4 chân cong ngắn đồng thau (2 chân sau lấp sau chân trước). Bồn rỗng, không nước, không bọt. Đáy = đáy chân (neo).
- `l4_rubber_duck` ✨: vịt cao su vàng bơ mập ú nhìn nghiêng sang trái, mỏ cam đào, mắt chấm đen nâu, cánh nhỏ, đáy phẳng.
- `l4_bath_mat`: thảm chữ nhật bo góc nằm phẳng trên sàn (nhìn thành dải dẹt), xanh da trời nhạt, tua ngắn hai đầu.

### 5.5 Tờ `l4_kitchen_sheet` — Mặt bếp, cửa sổ, hũ bánh, bát nước (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l4_kitchen_sheet | 0,0,1536,440 | l4_kitchen_sink | level4 |  | đáy | rộng 760 | 5 |
| l4_kitchen_sheet | 0,440,700,584 | l4_kitchen_window | level4 |  | đáy | rộng 380 | 5 |
| l4_kitchen_sheet | 700,440,420,584 | l4_cookie_jar | level4 |  | đáy | cao 150 | 5 |
| l4_kitchen_sheet | 1120,640,416,384 | l4_water_bowl | level4 |  | đáy | rộng 130 | 5 |

Cùng tỉ lệ thật.
- `l4_kitchen_sink` ✨: **mặt bếp gỗ mật ong** dày nằm ngang (mặt trên dải mỏng, cạnh trước dày ~40 hiển thị), lõm vào giữa-phải là **bồn rửa inox** xám bạc nhạt (chỉ thấy miệng elip dẹt và chút lòng), sau bồn là **vòi bếp cổ ngỗng** đồng thau cao, miệng chĩa xuống lòng bồn. Không vẽ tủ bên dưới (tủ là sprite riêng nằm ngay dưới mặt bếp). Mặt bếp trống chỗ đặt hũ bánh bên trái.
- `l4_kitchen_window`: cửa sổ 2 cánh kính nhìn thẳng, khung kem, kính xanh trời nhạt thấy một mảng trời và 1 đám mây nhỏ; **rèm ngắn bạc hà** buộc hai bên; bệ cửa là dải mỏng, có **một chậu cây nhỏ** (lá xanh lá, chậu đất nung). Neo đáy bệ cửa.
- `l4_cookie_jar` 🎁: hũ thủy tinh tròn mập xanh trời rất nhạt, thấy **3–4 bánh quy tròn caramel** có chấm socola nâu bên trong; **nắp gỗ caramel tròn** (mặt trên elip dẹt) với núm tròn. Nắp vẽ liền (code `hop` cả hũ).
- `l4_water_bowl` ✨: bát thấp gốm hồng đào, trên thân một **hình bàn chân mèo** kem to đơn giản (hình, không chữ), mặt nước elip dẹt xanh trời nhạt gần đầy miệng bát.

### 5.6 Tờ `l4_cabinet_sheet` — Tủ dưới bồn đóng/mở (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l4_cabinet_sheet | 0,0,768,1024 | l4_sink_cabinet_closed | level4 | cabinet | đáy | rộng 740 | 4 |
| l4_cabinet_sheet | 768,0,768,1024 | l4_sink_cabinet_open | level4 | cabinet | đáy |  | 4 |

Cùng một thân tủ, cùng chỗ trong ô, cùng đường đáy (y≈960). Tủ rộng : cao ≈ 1,5 : 1.
- `l4_sink_cabinet_closed` 🔑: tủ thấp **xanh bạc hà nhạt**, hai cánh đứng cạnh nhau, mỗi cánh một khung chữ nhật lõm đơn giản và **một núm gỗ tròn** ở mép giữa; nóc tủ là một dải mảnh (mặt bếp sẽ che); chân đế len gỗ ngắn.
- `l4_sink_cabinet_open`: cùng thân tủ, **hai cánh mở ra hai bên** (thấy mặt trong cánh như dải hẹp đứng ngoài khung trái và phải), **lòng tủ** gỗ mật ong nhạt, tối nhẹ ở góc trên. Trong lòng tủ, **ngoài các thứ sau thì để trống hoàn toàn** (các ô ống và tay van là sprite riêng):
  - **lỗ tường** tròn tối ở **vách trái** lòng tủ, ngang tâm hàng ống trên (khoảng 1/4 chiều cao lòng tủ tính từ trên), với **một đoạn ống đồng ngắn** chui ra khỏi lỗ, đầu có mặt bích tròn hướng sang phải;
  - **ống chính đồng** đi thẳng lên từ sàn lòng tủ ở **khoảng 2/3 bề ngang về bên phải**, dừng ở khoảng 3/4 chiều cao lòng tủ tính từ trên, đầu trên có mặt bích tròn; trên ống chính, cách đầu trên một đoạn ngắn, là **thân van** đồng nhỏ (không vẽ tay van);
  - giữa lỗ tường và đầu ống chính là **vùng trống** chiếm ~65% bề ngang và ~70% chiều cao lòng tủ (chỗ lưới 3×2).
  - Art đo và ghi vào mục 6: tâm ô A, lỗ tường, đầu ống chính, trục van (D4-4).

### 5.7 Tờ `l4_pipe_sheet` — Ô ống, van, icon (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l4_pipe_sheet | 0,0,384,384 | l4_pipe_straight_dry | level4 | pipe | tâm | 150x150 | 6 |
| l4_pipe_sheet | 384,0,384,384 | l4_pipe_straight_wet | level4 | pipe | tâm |  | 6 |
| l4_pipe_sheet | 768,0,384,384 | l4_pipe_elbow_dry | level4 | pipe | tâm |  | 6 |
| l4_pipe_sheet | 1152,0,384,384 | l4_pipe_elbow_wet | level4 | pipe | tâm |  | 6 |
| l4_pipe_sheet | 0,440,520,520 | l4_valve | level4 |  | tâm | rộng 104 | 8 |
| l4_pipe_sheet | 560,440,460,460 | l4_valve_icon | level4 |  | tâm | rộng 120 | 8 |
| l4_pipe_sheet | 1060,440,460,460 | l4_pipe_icon | level4 |  | tâm | rộng 120 | 8 |

**Ô ống khác quy tắc tờ thường:** ống **chạm đúng mép ô** (không chừa 40px) ở hai điểm giữa mép, vì cạnh ô chính là cạnh ô lưới. Ô 384x384 = ô lưới 150 × 2,56.
- Ống dày ~0,3 cạnh ô (≈115px trong tờ), tâm ống đi qua **đúng tâm ô**, hai đầu cắt phẳng **đúng tại điểm giữa mép ô**, mỗi đầu có **mặt bích tròn** (vòng to hơn ống ~20%, có 2 chấm đinh tán) nằm sát trong mép.
- `l4_pipe_straight_*`: ống thẳng nằm ngang **trái ↔ phải** (D4-3).
- `l4_pipe_elbow_*`: cút góc 90° bo tròn mập, đầu ra ở **dưới** và **phải** (D4-3); đoạn cong đi qua gần tâm ô.
- `_dry`: đồng/đồng thau ấm caramel-vàng, vài nét chì đổ bóng mép dưới phải, 1 vệt sáng nhạt dọc thân.
- `_wet`: **hình khối giống hệt `_dry` từng chỗ**, chỉ thêm lớp **ánh xanh trời** phủ thân ống và **2–3 giọt nước** đọng dưới thân, giọt không thò quá viền ống 10px hiển thị (~25px tờ).
- `l4_valve` 🔑: tay van **bánh xe tròn 4 nan** đỏ san hô (#EE8A7A), nhìn thẳng mặt trước, trục giữa đồng thau tròn, vành mập. Neo tâm trục. Đối xứng để xoay.
- `l4_valve_icon`: hình nhỏ đơn giản của **cái van đỏ** (bánh xe đỏ trên một đoạn ống đồng ngắn) cho bong bóng suy nghĩ.
- `l4_pipe_icon`: **một đoạn cút góc** đồng (giống `l4_pipe_elbow_dry` thu gọn, hai mặt bích), nghiêng nhẹ cho vui mắt.

### 5.8 Tờ `l4_sua_a_sheet` — Sữa trên cao và nhảy (1536x1024, tham chiếu `cats/sua_ref.png`, `cats/sua_tail_peek.png`)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l4_sua_a_sheet | 0,100,700,800 | sua_jump | cats |  | tâm | rộng 300 | 6 |
| l4_sua_a_sheet | 700,300,418,560 | sua_cover_face | cats |  | đáy | cao 130 | 6 |
| l4_sua_a_sheet | 1118,300,418,560 | sua_peek_down | cats |  | đáy | cao 150 | 6 |

Đúng Sữa trong `sua_ref`, cùng tỉ lệ với nhau.
- `sua_jump`: Sữa **bay vọt** nhìn nghiêng sang phải, thân duỗi dài, hai chân trước vươn ra trước, hai chân sau duỗi ra sau, đuôi bông bay theo, tai cụp nhẹ về sau, mắt tròn tập trung. Neo tâm thân.
- `sua_cover_face`: **chỉ đầu và một chân trước** thò lên khỏi mép nóc (phần dưới cổ **cắt phẳng ngang**), một bàn chân trước **che ngang mặt**, chỉ hé một mắt, tai cụp. Nhìn hơi sang trái. Neo giữa mép cắt dưới.
- `sua_peek_down`: **đầu và hai chân trước** thò qua mép nóc nhìn **xuống dưới trái**, hai tai **dựng thẳng** tò mò, mắt tròn to, hai bàn chân vịn mép; phần dưới cắt phẳng ngang. Neo giữa mép cắt dưới.

### 5.9 Tờ `l4_sua_b_sheet` — Sữa trong bồn rửa (1536x1024, tham chiếu `cats/sua_ref.png`)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l4_sua_b_sheet | 0,0,512,1024 | sua_drink | cats | sua_basin | đáy | cao 190 | 6 |
| l4_sua_b_sheet | 512,0,512,1024 | sua_head_shake | cats | sua_basin | đáy |  | 6 |
| l4_sua_b_sheet | 1024,0,512,1024 | sua_lick_lips | cats | sua_basin | đáy |  | 6 |

Ba tư thế **ngồi trong lòng chậu, cùng cỡ, cùng thân, cùng đường cắt** (y≈880): chỉ thấy **từ ngực trở lên** (đầu, hai chân trước tì lên, ngực), phần dưới **cắt phẳng ngang** đúng đường mép trước miệng chậu (A4-6). Neo ghi tay `x,y` giữa mép cắt, đo sau khi vẽ. Code đặt mép cắt trùng mép trước miệng chậu `l4_sink`, không cần tách bồn làm 2 lớp.
- `sua_drink`: Sữa ngồi, **nghiêng đầu** sang phải, ngửa nhẹ, **thè lưỡi hồng** đớp lên trên (như đớp giọt nước rơi từ vòi phía trên phải), mắt lim dim thích thú.
- `sua_head_shake`: cùng dáng ngồi, **đầu lắc** (vài vạch chuyển động cong hai bên đầu), mắt nhắm tịt, tai bay, **2–3 giọt nước** văng ra khỏi mũi.
- `sua_lick_lips`: ngồi thẳng nhìn người xem, **lưỡi liếm mép**, mắt nheo vui, **mặt lấm tấm vài giọt nước**, lông má hơi bết thành chỏm nhỏ.

### 5.10 Tờ `ui_nav_sheet` — Mũi tên chuyển phòng, bản đồ mini (1536x1024, dùng chung mọi level nhiều phòng)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| ui_nav_sheet | 0,0,512,600 | ui_room_arrow | common |  | tâm | rộng 110 | 8 |
| ui_nav_sheet | 512,0,1024,600 | ui_minimap_frame | common |  | tâm | rộng 220 | 8 |
| ui_nav_sheet | 256,600,512,424 | ui_minimap_room | common | minimap_room | tâm | rộng 84 | 8 |
| ui_nav_sheet | 768,600,512,424 | ui_minimap_room_current | common | minimap_room | tâm |  | 8 |

Cùng kiểu giao diện với `ui_bulb_button`, `ui_pause_button`: nền kem giấy, viền gỗ caramel mập + viền nâu mảnh ngoài, vân chì mịn. Không chữ, không số.
- `ui_room_arrow`: **mũi tên mập chĩa sang phải** (đầu tam giác bo tròn + thân ngắn), kem giấy, viền gỗ caramel + viền nâu, vài nét chì đổ bóng mép dưới phải. Code lật cho bên trái.
- `ui_minimap_frame`: tấm giấy kem chữ nhật nằm ngang bo góc (rộng : cao ≈ 2,2 : 1), viền nâu run tay, góc trên trái hơi quăn. Lòng trống (code xếp 2 ô).
- `ui_minimap_room`: ô vuông bo góc mập kem nhạt, viền nâu mảnh. Trống.
- `ui_minimap_room_current`: cùng ô, **vàng bơ**, cùng viền.

---

## 6. Ghi chú cho lập trình (không cần đưa Codex)

- **Lớp nhà tắm:** nền → thảm → bồn tắm → vịt → giá khăn (+ khăn cuộn trên kệ) → tủ gương (+ `l4_mirror_fog`) → Sữa trên cao (`sua_tail_peek` đặt **sau** mép nóc như L1; `sua_cover_face`/`sua_peek_down` cắt phẳng, neo đúng mép nóc) → bồn rửa → vòi → Sữa trong bồn (cắt phẳng, mép cắt đặt trùng mép trước miệng chậu; Art ghi y mép này, A4-6) → nước → khăn rơi trên sàn → hiệu ứng → giao diện.
- **Lớp bếp:** nền → cửa sổ → tủ (open/closed) → 6 ô ống → van → hạt nước → mặt bếp + bồn rửa bát → hũ bánh → bát nước → giao diện. Mặt bếp đè lên mép trên tủ.
- **Nhân vật (G4-6):** `player_point_think` trồi lên ở góc dưới nhà tắm khi cần bong bóng, không che bồn rửa, vòi, tủ gương, giá khăn, mũi tên ►; bong bóng không ở góc trên trái. Vị trí đo trên demo có nhân vật (lượt sau).
- **Khăn (G4-7):** chạm → `fly_arc` xuống sàn trước bồn tắm, giữ `l4_towel_fallen` tới hết màn.
- **Sữa nhảy:** cung từ nóc tủ gương sang nóc giá khăn (và ngược lại) 0,4 giây; nhảy xuống bồn rửa 0,5 giây; `sua_jump` lật ngang theo hướng bay.
- **Nước:** `l4_water_gush` và `l4_water_drip` neo đỉnh ở **miệng vòi**; giọt rơi từ miệng vòi xuống đáy lòng chậu.

**Bảng vị trí** (bản đầu, Art ước lượng trước khi vẽ demo; **đo lại trên demo đã duyệt**, lệch > 8px thì sửa). Điểm neo trên khung phòng 1024x1536; cột Cảnh: `tắm` hoặc `bếp`.

| Key | X | Y | Cảnh | Rộng demo |
|---|---|---|---|---|
| l4_mirror_cabinet | 250 | 590 | tắm | 330 |
| l4_sink | 250 | 1200 | tắm | 330 |
| l4_faucet | 250 | 745 | tắm | 110 |
| l4_towel_rack | 790 | 610 | tắm | 340 |
| l4_towel_rolled | 735 | 400 | tắm | 150 |
| l4_bathtub | 660 | 1300 | tắm | 500 |
| l4_rubber_duck | 820 | 1080 | tắm | 90 |
| l4_bath_mat | 250 | 1290 | tắm | 280 |
| l4_kitchen_window | 710 | 500 | bếp | 380 |
| l4_kitchen_sink | 530 | 720 | bếp | 760 |
| l4_cookie_jar | 280 | 680 | bếp | 105 |
| l4_sink_cabinet_closed | 530 | 1200 | bếp | 740 |
| l4_water_bowl | 260 | 1300 | bếp | 130 |
| ui_room_arrow | 960 | 760 | tắm | 110 |
| ui_room_arrow | 64 | 760 | bếp (lật) | 110 |

- **Lưới ống (bếp):** ô 150, tâm ô A (345, 830); B (495, 830); C (645, 830); D (345, 980); E (495, 980); F (645, 980). Lỗ tường ở vách trái lòng tủ ≈ (215, 830); đầu ống chính ≈ (645, 1055); trục van ≈ (645, 1120). Đo lại trên `l4_sink_cabinet_open` thật.
- **Hai chỗ cao của Sữa:** nóc tủ gương y≈280, x 90–410; nóc giá khăn y≈400, x 630–950 (khăn cuộn chiếm phía trái nóc kệ, Sữa đậu phía phải x≈880).
- **Bản đồ mini:** tâm (630, 66), 2 ô cách tâm 92 (tắm trái, bếp phải).

---

## 7. Ảnh demo

Tranh dựng cảnh 1024x1536, không dùng trong game, lưu ở `art/out/demo/`, để chủ dự án duyệt không khí, màu, tỉ lệ. Vẽ đúng bố cục mục 2 và bảng vị trí mục 6, đồ đúng mô tả mục 5, **chỉ chứa key có thật**. Mỗi lượt đính kèm `art/ref/owner_l1_style_ref.png`, `demo/l1_demo_start.png`, `demo/l1_demo_reveal.png`, `demo/l3_demo_start.png`, `cats/sua_ref.png`, `cats/sua_tail_peek.png`.
- `l4_demo_bathroom`: nhà tắm lúc đầu màn: **đuôi trắng Sữa thò qua mép nóc tủ gương** (`sua_tail_peek`, thân khuất sau nóc); khăn trắng cuộn trên kệ giá khăn (trông như mèo cuộn); vòi khô; bồn tắm hồng phấn có vịt vàng trên mép; thảm xanh trước bồn rửa. Mũi tên ► mép phải. Giao diện trên cùng: ♥ + 4 vòng (3 vòng đã tô, ♥ 3/4), nút ⏸; nút 💡 dưới phải. Lượt 1 chưa vẽ nhân vật (G4-6 cho phép), lượt sau thêm `player_point_think` + bong bóng hình van ở góc dưới.
- `l4_demo_kitchen`: bếp, **tủ dưới bồn đang mở**: lòng tủ có lỗ tường bên trái, ống chính và **van đỏ** dưới phải, **6 ô ống đồng khô** xếp lưới 3×2 ở **hướng lúc đầu** (A cút dưới↔phải, B thẳng ngang, C cút trên↔phải, D cút trái↔dưới, E thẳng đứng, F cút dưới↔phải); **bàn tay hướng dẫn** chạm mẫu ô F. Cửa sổ, mặt bếp + vòi bếp, hũ bánh quy, bát nước. Mũi tên ◄ mép trái. Bản đồ mini trên cùng (2 ô, ô phải vàng bơ). Không người, không mèo.
