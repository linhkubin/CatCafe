# Design Art – Level 3: Quà xịn, hộp còn xịn hơn

> Đọc kèm `style.md`. Bút chì màu, pastel tươi (O3), nét mảnh đậm nhạt (O5), cute, tối giản, **không chữ**.
>
> **Phòng:** Phòng khách, buổi chiều. **Mèo:** Sữa (theo `cats/sua_ref.png`). **Ý chính:** hộp quà to dán băng dính chữ thập rơi "bộp" xuống phòng. Lấy kéo trên bàn cắt băng dính, trong hộp là hai mảnh cột cào; hộp rỗng lộn nhào úp xuống sàn. Ghép cột cào, dựng lên thảm. Sữa ra vồ quả bông vài giây rồi biến mất: nó đã chui vào gầm hộp úp. Lật hộp lên thì thấy Sữa nằm gọn bên trong.

Áp dụng mọi quy tắc đã chốt ở Level 1 và 2 (`art/review/level1-thread.md`, `level2-thread.md`): vẽ theo tờ (bảng tờ V14), đặt tên V23, cột Nét theo công thức cuối, vùng chạm ≥ 115px (code nới nếu hình nhỏ hơn), neo theo công cụ, `anchors.json`, **góc nhìn chung** (`style.md` mục 2b, O2-10), màu và nét theo `art/ref/owner_l1_style_ref.png`. Chuẩn art: tranh demo `demo/l3_demo_start.png`, `demo/l3_demo_reveal.png` (sau khi chủ dự án duyệt) và tranh level 1.

Nguồn gameplay: `levels/levels-01-10.md` và `levels/states-01-10.md` mục Level 3, các quyết định G3-1…G3-10 (GD) và D3-1…D3-7 (Dev) trong `art/review/level3-thread.md`.

---

## 1. Danh sách key

Hiển thị = cỡ trong game trên khung 1024x1536. TS = trong suốt.

| Key | Thư mục | Hiển thị | Nền | Neo | Tờ (nhóm) |
|---|---|---|---|---|---|
| `l3_bg_living_room_afternoon` | level3 | 1024x1536 | Có nền | góc trên trái | ảnh lẻ (mục 4) |
| `l3_gift_box_taped` | level3 | rộng 340 | TS | đáy | `l3_box_sheet` (box) |
| `l3_gift_box_open` | level3 | theo nhóm | TS | đáy | `l3_box_sheet` (box) |
| `l3_box_upside_down` | level3 | theo nhóm | TS | đáy | `l3_box_sheet` (box) |
| `l3_sua_in_box` | level3 | theo nhóm | TS | đáy | `l3_box_sheet` (box), thay `sua_in_box` (D3-4) |
| `l3_cat_tree` | level3 | cao 560 | TS | đáy | `l3_tree_v3_sheet` (tree) |
| `l3_tree_p1` | level3 | theo nhóm | TS | đáy cây | `l3_tree_v3_sheet` (tree), mảnh 1 |
| `l3_tree_p2` | level3 | theo nhóm | TS | đáy cây | `l3_tree_v3_sheet` (tree), mảnh 2 |
| `l3_tree_p3` | level3 | theo nhóm | TS | đáy cây | `l3_tree_v3_sheet` (tree), mảnh 3 |
| `l3_pompom` | level3 | rộng 68 | TS | x,y đỉnh vòng dây | `l3_tree_v3_sheet`, mảnh 4 |
| `sua_peek_tongue` | cats | cao 150 | TS | x,y giữa mép cắt trái (D3-11) | `l3_sua_sheet` |
| `sua_pounce` | cats | cao 330 | TS | đáy | `l3_sua_sheet` |
| `sua_scratch_post` | cats | cao 340 | TS | đáy (chân sau) | `l3_sua_sheet` |
| `l3_sofa_front` | level3 | rộng 670 | TS | đáy | `l3_sofa_sheet` (D3-34, Codex vẽ riêng) |
| `l3_table` | level3 | 269x203 (không co) | TS | góc trên trái | Art cắt từ nền (D3-32) |
| `l3_curtain_closed` | level3 | rộng 450 | TS | đỉnh | `l3_curtain_sheet` |
| `l3_vase` | level3 | cao 210 | TS | đáy | `l3_small_sheet` |
| `l3_scissors` | level3 | rộng 170 | TS | đáy | `l3_small_sheet` |
| `player_point_think` | player | cao 580 | TS | đáy | `player_l3_sheet` (player_pose, D3-15) |
| `player_sad` | player | theo nhóm | TS | đáy | `player_l3_sheet` (player_pose) |
| `ui_bag_bar` | common | rộng 620 | TS | đáy | `ui_bag_sheet` (D3-1) |
| `ui_bag_slot` | common | rộng 120 | TS | tâm | `ui_bag_sheet` (D3-1) |
| `ui_thought_bubble` | common | rộng 265 | TS | đáy (đầu chuỗi bong bóng nhỏ) | `ui_thought_sheet` (D3-15, dùng chung level 4–10) |

**Dùng lại, không vẽ:** `l1_pillow_white_idle`, `l1_pillow_white_flipped`, `sua_run`, `sua_sit_stare` (để code tạo bóng), `sua_tail_peek` (đuôi thò dưới mép hộp úp khi gợi ý), `sua_face_icon`, `sua_held`, `player_hands_lift`, `player_call`, `player_scratch_head`, mọi `ui_*` có sẵn, `fx_pop`.

**Bỏ:** `l3_courier_arm` (G3-1: hộp quà rơi từ mép trên khung xuống "bộp", kèm chuông cửa "ting-tong"; nền không có cửa ra vào).

**Không vẽ, code tạo:** bóng Sữa (từ `sua_sit_stare` tô `0x3a3050`, alpha 0,35, vẽ **trên** rèm voan và cắt theo hình rèm; G3-4, D3-3), icon cột cào trong túi (`l3_cat_tree` thu nhỏ), hiệu ứng ghép (xoay vào nhau, lóe sáng), tween kéo cắt băng dính, hộp nhấc mép 6°.

**Đổi tên so với states:** `sua_in_box` → `l3_sua_in_box` (D3-4): Sữa nằm trong hộp **vẽ liền với hộp**, cùng thân, cùng khung, cùng đường đáy với ba ảnh hộp còn lại để xoay 180° quanh tâm thân không nhảy vị trí (cùng cách làm giỏ tất level 2).

---

## 2. Bố cục phòng (theo `levels-01-10.md` Level 3)

```
┌──────────────────────────────┐  y 0–130: giao diện
│ ♥Sữa ●●○○                ⏸  │
│ ┌─────────┐                  │  rèm voan trên trái: mép trên (275, 180), rộng 450
│ │RÈM VOAN │      [LỌ HOA]    │  kệ treo tường trên phải (trong nền) y≈470; lọ hoa đáy (830, 470)
│ │bóng Sữa │      ═══════     │  bóng Sữa do code vẽ trên rèm (G3-4)
│ └─────────┘                  │  bệ cửa sổ y≈650
│ [BÀN+KÉO]  ┌──── SOFA ─────┐ │  bàn tròn nhỏ (trong nền) mặt bàn y≈860; kéo đáy (220, 858)
│  ┌─┐       │ GỐI TRẮNG     │ │  sofa 2 chỗ (trong nền) x≈450–990, mặt ghế y≈880, gối (640, 880)
│            └───────────────┘ │  gầm sofa hở (bóng Sữa chạy qua), chân chạm sàn y≈1030
│      ┌────────┐   ( THẢM )   │  hộp quà đáy (400, 1300), rộng 340 (rơi từ mép trên xuống, G3-1)
│      │HỘP QUÀ │   ( trống  ) │  thảm tròn nhỏ (trong nền) tâm (790, 1310), rộng 360
│      └────────┘              │  cột cào đặt trên thảm: đáy (790, 1330)
├──────────────────────────────┤  y≈1400–1536: túi đồ (sau lần nhặt đầu)
│   [ ][ ][ ][ ]           💡  │  túi đồ 4 ô (G3-2), đáy (420, 1520); nút 💡 x>880
└──────────────────────────────┘
```

- **Toạ độ chuẩn** là bảng vị trí mục 6 (D3-22), đo trên demo; sơ đồ trên chỉ để hình dung. Mốc nền theo demo lượt 3 (D3-22, thay D3-13): chân tường y≈780, thanh rèm y≈162, gấu rèm y≈632, mặt kệ y≈388, mặt bàn y≈700 (đế chạm sàn y≈862), sofa x 350–1024 chân y≈835, thảm tâm (790, 1175). Đồ trên sàn có đáy ≤ 1260, cách túi đồ ≥ 30px (D3-14).
- **Một camera chung** (`style.md` 2b): chính diện, nhìn xuống ~15°, cạnh ngang nằm ngang, cạnh đứng thẳng đứng, mặt trên chỉ là dải mỏng, không 3/4. Sáng từ cửa sổ trên trái, nét chì đổ bóng bên phải đồ. Không bóng sàn (code vẽ).
- Cùng phòng khách level 1 nhưng **buổi chiều**: nắng vàng mật ong ấm hơn, một vệt nắng xiên nhẹ qua cửa sổ xuống sàn (vài nét chì vàng bơ, không gradient).
- 8% trên cùng tường trơn, 8% dưới cùng sàn trơn (dưới túi đồ).
- Đồ chạm được không đặt trong y 0–130 và góc dưới phải x>880, y>1400. Vùng đích kéo-thả nới ≥ 200px (G3-3), nên hộp quà và thảm cách nhau đủ xa.

### 2b. Bối cảnh và góc nhìn từng đồ

**Bối cảnh:** phòng khách level 1 (cùng tường kem, cùng cửa sổ trên trái, cùng sàn gỗ ván ngang), đổi bố trí: bỏ đồng hồ cúc cu và chậu cây, **không có cửa ra vào** (G3-1), thêm kệ treo tường trên phải, bàn tròn nhỏ bên trái, sofa ngắn lại dời sang phải, thảm tròn nhỏ dưới phải. Một bức tường sau phẳng chạy ngang cả khung, không thấy tường bên. Chân tường y≈950.

Tỉ lệ lấy **sofa** làm chuẩn (rộng 540, mặt ghế cao ~150 trên sàn, như sofa level 1 thu ngắn). Sữa ngồi cao ~260, chạy rộng 330 (như level 1). Nhân vật cao 580.

| Đồ | Góc nhìn và mặt thấy | Tỉ lệ (hiển thị) | Chất liệu, màu |
|---|---|---|---|
| Rèm voan (`l3_curtain_closed`) | Hai tấm voan buông thẳng trước cửa sổ, mép trên ngang, gấu hơi lượn ngang bệ cửa | rộng 450, cao ~470 | **Voan xanh da trời rất nhạt** (#E3F0F8), mỏng; khoen gỗ tròn (G3-4) |
| Lọ hoa (`l3_vase`) | Lọ gốm đứng thẳng nhìn ngang, miệng elip dẹt; 3 bông hoa tròn + vài lá | cao 210 (lọ ~110, hoa ~100) | Lọ xanh da trời nhạt bụng tròn; hoa hồng phấn, vàng bơ; lá xanh lá |
| Kệ treo tường (nền) | Tấm gỗ là dải ngang mỏng, 2 giá đỡ tam giác | rộng 300 | Gỗ caramel |
| Bàn tròn nhỏ (nền) | Mặt bàn tròn thành elip dẹt, 1 chân giữa + đế tròn | rộng 300, mặt cao ~170 trên sàn | Gỗ mật ong |
| Kéo (`l3_scissors`) | Nằm phẳng trên mặt bàn, nhìn chính diện hơi từ trên, mũi hướng sang phải | rộng 130 | Lưỡi xám bạc nhạt, tay cầm tròn mập **hồng đào** |
| Sofa (nền) | Như sofa level 1, 2 chỗ ngắn hơn; **gầm sofa hở, sáng như sàn** | rộng 540 | Xanh bạc hà |
| Gối lông trắng | Dùng lại `l1_pillow_white_*` | như level 1 | |
| Hộp quà (`l3_gift_box_*`) | Mặt trước chữ nhật, nắp là dải mỏng phía trên, dải hông hẹp bên phải | rộng 340, cao thân ~220 (đủ chứa Sữa nằm) | Các-tông caramel, băng dính xanh bạc hà |
| Cột cào (`l3_cat_tree`) | Đứng thẳng, các tầng là đĩa/khối nhìn ngang, mặt trên mỗi tầng là elip dẹt | cao 560, rộng ~290 | Đế bạc hà lông mịn, trụ dây thừng mật ong, tầng hồng phấn, ổ trên cùng kem lông xù; quả bông **đỏ san hô** là điểm nhấn màu duy nhất (A3-2) |
| Thảm tròn (nền) | Elip dẹt nằm trên sàn | rộng 360 | Hồng phấn như thảm level 1, nhỏ hơn |
| Túi đồ (`ui_bag_*`) | Phẳng như giao diện, nhìn thẳng | dải rộng 620, ô 120 | Kem giấy, viền gỗ caramel |

**Trạng thái và phần giữ nguyên:**

| Đồ | Trạng thái | Giữ nguyên giữa các trạng thái |
|---|---|---|
| Hộp | `_taped` → `_open` → `_upside_down` → `l3_sua_in_box` | Thân hộp (cỡ, màu, hình dán, góc nhìn, dải hông phải), đường đáy, vị trí trong ô. Chỉ đổi nắp, băng dính, hướng úp/ngửa và thứ bên trong |
| Cột cào | `l3_post_body` + `l3_post_base` → `l3_cat_tree` | Thân và đế giống hệt phần tương ứng trong cột cào ghép (cùng cỡ, màu, góc nhìn) |
| Quả bông | một ảnh, `swing` | — |
| Gối | `l1_pillow_white_idle` → `_flipped` (dùng lại) | như level 1 |
| Rèm, lọ hoa, kéo | một ảnh | — (code `wiggle`, `tilt_back`, `fly_to_bag`) |

---

## 3. Quy tắc tờ

Như `design-art-level1.md` mục 3: tờ 1536x1024 (hoặc 1024x1536), nền trong suốt, mỗi ô một thứ, cách mép ô ≥ 40px, cùng tỉ lệ thật trong tờ, trạng thái cùng nhóm giống hệt phần không đổi và cùng đường đáy. **Cột Nét** = viền ngoài ở chỗ đậm nhất (px trong tờ), phần lớn viền ~60%, đầu nét nhọn; Nét = 3k với đồ vật/UI, 2,5k với mèo/nhân vật, không dưới 2k. Giao việc kèm `--stroke-ref art/out/cats/sua_ref.png=<0,6 × Nét ÷ 5>`, ảnh mẫu `art/ref/owner_l1_style_ref.png` và ảnh cắt cận từ tranh demo đã duyệt. AI hay vẽ to hơn ô: vẽ xong đo khung, sửa ô cho khớp rồi cắt lại.

**Chỉ vẽ tờ sau khi chủ dự án duyệt demo** (QUY-TRINH bước 4).

---

## 4. Ảnh lẻ

| File (trong art/out/) | Key | Kích thước | Nền | Mô tả |
|---|---|---|---|---|
| `level3/l3_bg_living_room_afternoon.png` | `l3_bg_living_room_afternoon` | 1024x1536 | Có nền | Nền phòng khách buổi chiều (mô tả dưới) |

### `l3_bg_living_room_afternoon` — Nền phòng khách buổi chiều
- Sửa từ tranh `demo/l3_demo_start.png` đã duyệt (như nền level 1, 2): giữ phòng, xoá mọi đồ là sprite riêng và mọi UI, vẽ liền phần bị che. **Không người, không mèo.**
- **Tường** kem giấy trơn, ấm hơn level 1 một chút (nắng chiều). **Cửa sổ** trên trái như level 1 (x≈60–505, y≈180–640), kính xanh trời nhạt ngả vàng chiều, bệ cửa sổ trống; thanh treo rèm gỗ ở y≈175. Không vẽ rèm. Không có cửa ra vào.
- **Kệ treo tường** gỗ caramel trên phải (x≈680–980, y≈470), trống (lọ hoa là sprite).
- **Bàn tròn nhỏ** gỗ mật ong bên trái (tâm x≈220, mặt bàn y≈860, đế chạm sàn y≈1030), mặt bàn trống.
- **Sofa** 2 chỗ xanh bạc hà x≈450–990, mặt ghế y≈880, chân gỗ ngắn chạm sàn y≈1030, **gầm sofa hở và sáng**. Chỗ gối trái để trống.
- **Sàn** gỗ caramel nhạt từ chân tường y≈950, vài nét ván ngang; **thảm tròn nhỏ hồng phấn** tâm (790, 1310), rộng 360. Một vệt nắng chiều xiên nhẹ từ cửa sổ xuống sàn. Chỗ hộp quà để trống.

---

## 5. Các tờ và mô tả từng ảnh

### 5.1 Tờ `l3_box_sheet` — Hộp quà và hộp úp (1536x1280 sau khi Art chỉnh, tham chiếu `sua_ref`)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l3_box_sheet | 0,0,768,575 | l3_gift_box_taped | level3 | box | 373,555 | rộng 340 | 5 |
| l3_box_sheet | 768,0,768,575 | l3_gift_box_open | level3 | box | 1130,555 |  | 5 |
| l3_box_sheet | 0,575,768,705 | l3_box_upside_down | level3 | box | 372,1236 |  | 5 |
| l3_box_sheet | 768,575,768,705 | l3_sua_in_box | level3 | box | 1131,1236 |  | 5 |

**Neo (D3-9):** đã đo trên tờ và **ghi tay `x,y`** ở giữa mép đáy mặt trước thân hộp cho cả 4 ô (như `l1_box_*`), rồi ghi chiều cao thân hộp (px ảnh xuất) vào thread. Tương tự `sua_peek_tongue` (tờ 5.3): thay bằng `x,y` giữa mép cắt trái.

Lưới 2x2, **cùng một thân hộp** ở cùng chỗ trong ô, cùng cỡ, cùng đường đáy (thân hộp ở nửa dưới ô, rộng ~430px trong tờ). Hộp các-tông caramel (#D6A472) to vuông vức, bo góc nhẹ, vài nét chì; **góc nhìn chung**: mặt trước chữ nhật, mặt trên dải mỏng, dải hông hẹp bên phải. Mặt trước có **một hình dán đơn giản vẽ cột cào mèo** (hình, không chữ) gợi ý món quà bên trong.
- `l3_gift_box_taped` 🎯: nắp đóng phẳng; **băng dính xanh bạc hà bản to dán chữ thập**: một dải ngang quấn quanh mặt trước, một dải dọc chạy qua nắp và xuống mặt trước, giao nhau thành chữ thập ở mặt trước. Trông chắc chắn.
- `l3_gift_box_open`: cùng hộp, băng dính bị cắt (hai đầu dải bung lơ thơ), **4 nắp bung dựng lên** trước sau và hai bên; từ miệng hộp thò lên **đỉnh trụ dây thừng** (mật ong) và **mép đế lông bạc hà** của cột cào (cùng màu `l3_post_body`, `l3_post_base`).
- `l3_box_upside_down` 🔑: cùng thân hộp **úp ngược**: mặt trên giờ là đáy hộp (dải mỏng trơn, một đường dán băng dính cũ ở giữa), không thấy nắp; hình dán lộn ngược trên mặt trước. Cạnh dưới phẳng chạm sàn. Không thấy gì bên trong. Vẽ bình thường, không viền sáng (G3-6).
- `l3_sua_in_box`: cùng thân hộp **ngửa lên, 4 nắp mở bung ra ngoài**; **Sữa nằm gọn trong hộp** (đúng `sua_ref`): chỉ thò **đầu và hai tai** lên khỏi miệng hộp, hai bàn chân trước tì lên mép trước, **đuôi bông vắt qua mép hông phải** thõng ra ngoài nhưng **không thấp hơn đáy hộp** (D3-9); mắt to tròn xanh nhìn lên người xem, mặt ngây thơ như thể nó vẫn luôn ở đó, miệng ω.

### 5.2 Tờ `l3_post_sheet` — Cột cào (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|

Bố cục: cột cào ghép xong ở cột trái; thân cột cào (không đế) ở cột giữa, **cùng cỡ và cùng hình** với phần trên của cột cào ghép; quả bông treo dây ở góc trên phải; đế ở góc dưới phải, cùng cỡ với đế của cột cào ghép. Tất cả cùng tỉ lệ thật, cùng đường đáy y≈980 (trừ quả bông).

Cột cào phải trông **thật xịn** (càng xịn trò đùa càng buồn cười) nhưng vẫn tối giản, nhìn bóng là nhận ra:
- `l3_cat_tree` ✨: từ dưới lên: **đế** là khối vuông dày phủ lông mịn xanh bạc hà (mặt trên dải mỏng); **trụ** tròn quấn dây thừng màu mật ong (vài vòng chì ngang); **tầng giữa** là đĩa tròn dày phủ lông hồng phấn (mặt trên elip dẹt), lệch trái một chút; trụ thứ hai ngắn hơn; **trên cùng** là **ổ nằm tròn** lông xù kem, vành lông bông; dưới **mép trái** ổ trên cùng (phía rèm, D3-10) có **một móc nhỏ** (chỗ treo quả bông, quả bông là sprite riêng); quả bông treo vào đó phải cách sàn ~330–400 hiển thị để `sua_pounce` với tới. Đứng thẳng, các tầng nằm ngang.
- `l3_post_body` 🎒: đúng phần trên của cột cào: trụ dây thừng + tầng giữa hồng + trụ ngắn + ổ trên cùng + móc; **đáy trụ cắt phẳng** (neo đáy, chỗ cắm vào đế; D3-5).
- `l3_post_base` 🎒: đúng khối đế vuông lông bạc hà, mặt trên có một lỗ tròn nhỏ ở giữa (chỗ cắm trụ).
- `l3_pompom`: một **sợi dây mảnh** màu kem thả thẳng xuống, đầu dưới là **quả bông len tròn xù màu đỏ san hô** (#EE8A7A, điểm nhấn màu duy nhất của màn, tươi hơn hồng đào nhưng không chói). Đầu dây trên có vòng nhỏ (neo đỉnh, móc vào móc của cột cào).

### 5.2b Tờ `l3_tree_v3_sheet` — Cột cào 4 mảnh, Codex vẽ lại theo mẫu (D3-31)

Codex vẽ lại thật theo `art/review/l3_cat_tree_brief.md` và mẫu `art/ref/l3_cat_tree_ref.png`, 2 lượt; tờ gốc `art/out/_sheets/l3_cat_tree_v2_sheet.png` (lượt 2). Chủ dự án nhận lượt 2 ("tách lại khá ổn, nhạt màu đi chút"). Art chỉ:
1. Nhạt màu cả tờ: bão hoà ×0,74, sáng ×1,02 (0,31 → 0,23).
2. Co đều từng mảnh rời cho bằng phần tương ứng trong cây Codex vẽ (khớp khung bao mảng màu đặc trưng: đế xanh, bục hồng, ổ kem, quả cầu đỏ), rồi đặt đúng chỗ đó trong khung cây; không vá, không ghép. Quả cầu dời cho đầu vòng dây móc đúng đáy móc của ổ.
3. `l3_cat_tree` = chồng p1→p2→p3 (không có quả cầu; quả cầu là `l3_pompom` treo riêng), nên lắp xong giống hệt cây.

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l3_tree_v3_sheet | 0,0,609,913 | l3_cat_tree | level3 | tree | 295,871 | cao 530 | 5 |
| l3_tree_v3_sheet | 609,0,609,913 | l3_tree_p1 | level3 | tree | 904,871 |  | 5 |
| l3_tree_v3_sheet | 1218,0,609,913 | l3_tree_p2 | level3 | tree | 1513,871 |  | 5 |
| l3_tree_v3_sheet | 1827,0,609,913 | l3_tree_p3 | level3 | tree | 2122,871 |  | 5 |
| l3_tree_v3_sheet | 2436,0,609,913 | l3_pompom | level3 |  | 2602,267 | rộng 68 | 5 |

### 5.2c Tờ `l3_sofa_sheet` — Sofa vẽ riêng (1536x1024, D3-34)

Chủ dự án: sofa phải là sprite vẽ riêng (rule "nền trống, đồ vẽ riêng"). Codex vẽ theo lời giao `art/review/l3_sofa_brief.md` (mô tả + prompt), ảnh mẫu: sofa level 1 (`_refs/l1d_sofa.png`) và sofa demo L3 (`_refs/l3d_sofa.png`).

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l3_sofa_sheet | 0,0,1536,1024 | l3_sofa_front | level3 |  | đáy | rộng 670 | 6 |

- `l3_sofa_front`: sofa 2 chỗ xanh bạc hà nhạt, 2 gối lưng, 2 tay vịn cuộn, 2 đệm ngồi, 4 chân gỗ ngắn; viền nâu liền khép kín; không gối mèo trên sofa. Rộng : cao ≈ 2,05 : 1. Neo đáy (giữa chân sofa).

### 5.3 Tờ `l3_sua_sheet` — Tư thế Sữa level 3 (1536x1024, tham chiếu `cats/sua_ref.png`, `cats/sua_run.png`)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l3_sua_sheet | 20,250,400,550 | sua_peek_tongue | cats |  | 72,524 | cao 150 | 6 |
| l3_sua_sheet | 410,140,616,790 | sua_pounce | cats |  | đáy | cao 330 | 6 |
| l3_sua_sheet | 1026,140,510,800 | sua_scratch_post | cats |  | đáy | cao 340 | 6 |

Đúng Sữa trong `sua_ref` (lông trắng ấm xù bông, đầu to tròn, mắt xanh lòng đen to, tai hồng, không đốm, không vòng cổ), cùng tỉ lệ với nhau.
- `sua_peek_tongue`: **chỉ đầu và một bàn chân trước** của Sữa ló **sang phải** từ sau một mép đứng (mép phải rèm), đầu nghiêng, mặt nhìn về người xem, **lè lưỡi hồng tinh nghịch**, một mắt nháy, bàn chân vịn mép; **bên trái cắt phẳng dọc** (chỗ khuất sau rèm). Neo ghi tay `x,y` ở giữa mép cắt trái, đo sau khi vẽ (D3-11). Ló ở góc trái rèm thì code lật ngang.
- `sua_pounce`: Sữa **bật nhảy lên vồ**, nhìn nghiêng sang phải hơi ngửa đầu lên, hai chân trước giơ cao xòe đệm thịt hồng, hai chân sau duỗi đẩy khỏi sàn (đầu ngón chân sau là điểm thấp nhất), đuôi bông dựng, mắt tròn sáng háo hức.
- `sua_scratch_post`: Sữa **đứng hai chân sau**, nhìn nghiêng sang phải, hai chân trước duỗi thẳng ra trước như đang cào vào một thân cột (không vẽ cột), móng nhỏ thò ra, mắt nhắm híp sung sướng, đuôi bông cong. Hai bàn chân sau là điểm thấp nhất (neo).

### 5.4 Tờ `l3_curtain_sheet` — Rèm voan (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l3_curtain_sheet | 0,0,1536,1024 | l3_curtain_closed | level3 |  | đỉnh | rộng 450 | 4 |

- `l3_curtain_closed`: hai tấm **rèm voan xanh da trời rất nhạt** (gần trắng, #E3F0F8) kéo kín, gặp nhau giữa, 6–8 khoen gỗ tròn ở mép trên, vài nếp dọc mềm, gấu hơi lượn. Voan mỏng: vân chì thưa, màu rất nhạt (bóng Sữa code vẽ lên trên phải đọc được). Không vẽ thanh treo, không vẽ cửa sổ phía sau, không vẽ bóng mèo.

### 5.5 Tờ `l3_small_sheet` — Kéo, lọ hoa (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l3_small_sheet | 20,20,870,1000 | l3_vase | level3 |  | đáy | cao 210 | 6 |
| l3_small_sheet | 890,560,646,400 | l3_scissors | level3 |  | đáy | rộng 170 | 6 |

Cùng tỉ lệ thật: kéo dài bằng ~2/3 chiều cao lọ hoa (không kể hoa).
- `l3_vase` 🎁: lọ gốm bụng tròn xanh da trời nhạt, cổ hẹp, miệng elip dẹt; cắm 3 bông hoa tròn đơn giản (2 hồng phấn, 1 vàng bơ) và 3–4 lá xanh. Đáy phẳng.
- `l3_scissors` 🎒: cây kéo nằm phẳng, mũi hướng phải, hai lưỡi khép, xám bạc nhạt (vài nét chì xám, không bóng loáng); hai tay cầm vòng tròn mập **hồng đào**. Dùng cả trên bàn lẫn làm icon trong túi.

### 5.6 Tờ `player_l3_sheet` — Nhân vật chỉ tay nghĩ, buồn hiu (1536x1024, tham chiếu `player/player_ref.png`)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| player_l3_sheet | 0,0,768,1024 | player_point_think | player | player_pose | đáy | cao 580 | 4 |
| player_l3_sheet | 768,0,768,1024 | player_sad | player | player_pose | đáy |  | 4 |

Hai tư thế cùng cỡ, cùng đường đáy (như `player_poses_a_sheet` level 1).
- `player_point_think` (D3-15, như nhân vật trong `demo/l3_demo_start.png`): đúng `player_ref`, đứng gần chính diện, đầu nghiêng tò mò, **tay phải chỉ sang trái** (về phía hộp quà), **tay trái chống cằm** suy nghĩ, miệng chữ o nhỏ, mắt nhìn sang trái.
- `player_sad`: đúng nhân vật `player_ref` (tóc xoăn bồng nâu caramel, áo len vàng bơ, quần xanh trời nhạt, dép bông), đứng thẳng nhìn chính diện, **vai xuôi, hai tay buông thõng**, đầu hơi cúi, mắt chấm nhìn xuống buồn hiu, miệng méo nhỏ, một **giọt mồ hôi** xanh da trời cạnh đầu. Cùng cỡ với các tư thế nhân vật level 1.

### 5.7 Tờ `ui_bag_sheet` — Túi đồ (1536x1024, D3-1, G3-2)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| ui_bag_sheet | 0,0,1536,560 | ui_bag_bar | common |  | đáy | rộng 620 | 5 |
| ui_bag_sheet | 0,560,512,464 | ui_bag_slot | common |  | tâm | rộng 120 | 5 |

Cùng tỉ lệ thật: 4 ô xếp vừa khít trên dải (code xếp ô lên dải).

**Tờ `ui_thought_sheet`** (1536x1024, tách riêng vì tỉ lệ hiển thị/tờ khác dải túi, để nét không lệch):

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| ui_thought_sheet | 0,0,1536,1024 | ui_thought_bubble | common |  | đáy | rộng 265 | 9 |

- `ui_thought_bubble` (D3-15): bong bóng suy nghĩ hình đám mây trắng kem, viền nâu mảnh run tay như `ui_speech_bubble`; **2 bong bóng tròn nhỏ** dẫn xuống góc dưới trái (bong bóng nhỏ nhất là điểm thấp nhất, neo đáy, đặt cạnh đầu nhân vật). **Bên trong để trống** (code đặt icon, ví dụ `l3_scissors`). Không chữ.
- `ui_bag_bar`: dải túi đồ nằm ngang bo tròn hai đầu như một chiếc túi vải dẹt (hiển thị rộng 620, cao ~160–180): nền kem giấy, viền gỗ caramel mập; **quai túi vải nhỏ** cong lên **phía trên mép trái**, không ăn vào lòng dải. **Lòng dải trống** (không vẽ ô), rộng ≥ 560, cao ≥ 140 hiển thị (code xếp 4 ô cách tâm 135; D3-8). Không chữ, không số. Dùng chung cho mọi level có túi đồ.
- `ui_bag_slot`: một ô vuông bo góc mập, lòng kem nhạt hơn dải, viền nâu mảnh, vài nét chì đổ bóng ở mép trong trên trái (như lõm vào). Trống.

---

## 6. Ghi chú cho lập trình (không cần đưa Codex)

- **Lớp hiển thị** (D3-18, thay D3-2): nền → lọ hoa, gối → rèm (`sua_peek_tongue` nằm dưới rèm) → bóng Sữa (trên rèm, alpha 0,35) → kéo trên bàn → **đồ trên sàn xếp theo đường đáy** (`player_sad` 1212 → hộp 1225 ↔ Sữa chạy/vồ/cào 1225 → cột cào + quả bông 1230 → `player_point_think` 1232) → hiệu ứng → túi đồ + món đang kéo → giao diện.
- **Hộp:** `l3_gift_box_taped` → (đặt kéo) `l3_gift_box_open` → 0,4 giây sau `hop` + xoay 180° → `l3_box_upside_down` → (chạm khi Sữa đã biến mất) `hop` + xoay 180° → `l3_sua_in_box`. Bốn ảnh cùng thân, cùng khung, cùng neo đáy; xoay quanh tâm thân (D3-4). Hộp úp nhấc mép 6° quanh góc dưới trái.
- **Hộp quà rơi** (G3-1): từ mép trên khung rơi xuống chỗ đặt, "bộp" + `squash`.
- **Quả bông:** `l3_pompom` neo đỉnh treo vào móc dưới mép trái ổ trên cùng (D3-10) của `l3_cat_tree`, `swing` quanh neo.
- **Ghép:** `l3_post_body` neo đáy trụ đặt vào lỗ giữa mặt trên `l3_post_base`.
- **Kéo:** icon trong túi dùng chính `l3_scissors`.
- **Gợi ý sau khi Sữa biến mất:** `sua_tail_peek` thò dưới mép phải hộp úp 0,6 giây (gốc đuôi khuất sau hộp).
- **Bóng Sữa:** vẽ trên rèm (G3-4), alpha 0,35, chỉ chạy giữa **hai góc rèm** (bỏ gầm sofa, D3-20); `sua_peek_tongue` thò ra ở mép phải rèm.
- **Lớp và vật con:** theo D3-18, D3-19 (đồ trên sàn xếp theo đường đáy; `l3_pompom` là con của `l3_cat_tree`).
- **Vùng túi đồ** y 1290–1536 để trống: mọi đồ trên sàn có đáy ≤ 1280 (D3-14).

**Bảng vị trí** (D3-22, sửa theo D3-26…D3-28 và đợt sửa sau chơi thử D3-29: rèm/cửa sổ nhỏ lại, đồ sàn lên 85px tránh dải banner; thay D3-16; đo trên demo lượt 3 `demo/l3_demo_start.png` + `demo/l3_demo_reveal.png`, bố cục theo `_refs/l3_demo_reveal_v1.png` chủ dự án chọn; điểm neo trên khung 1024x1536, sai số ±10px). **Đây là toạ độ chuẩn; sơ đồ mục 2 chỉ để hình dung.** `Rộng demo` = bề rộng phần vẽ thật đo trên demo; code đặt neo ở (X, Y) rồi co ảnh cho phần vẽ thật rộng đúng `Rộng demo`, trạng thái cùng nhóm co cùng tỉ lệ với key đầu nhóm (D3-17). Sau khi demo được duyệt, Art đo lại chính xác (lệch > 8px thì sửa bảng).

| Key | X | Y | Cảnh | Rộng demo |
|---|---|---|---|---|
| l3_curtain_closed | 318 | 246 |  | 378 |
| l3_sofa_front | 677 | 851 | | 670 |
| l3_table | 44 | 668 | | 269 |
| l3_vase | 815 | 388 | | 170 |
| l3_scissors | 140 | 711 |  | 170 |
| l1_pillow_white_idle | 535 | 742 | | 162 |
| l3_gift_box_taped | 224 | 1140 |  | 368 |
| l3_box_upside_down | 224 | 1140 | lộ | theo nhóm |
| l3_sua_in_box | 224 | 1140 | lộ | theo nhóm |
| l3_cat_tree | 790 | 1145 | lộ | 352 |
| player_point_think | 649 | 1124 | đầu | 390 |
| ui_thought_bubble | 771 | 606 | đầu | 260 |
| player_sad | 511 | 1107 | lộ | 245 |
| sua_pounce | 540 | 1140 | lộ |  |
| sua_scratch_post | 630 | 1140 | lộ |  |
| ui_bag_bar | 409 | 1380 | lộ | 688 |
| l3_pompom | 705 | 746 | lộ | 68 |

- `l3_pompom` (mảnh 4, D3-31): neo đỉnh vòng dây, móc vào đáy móc của `l3_tree_p3`. Móc lệch (−129, −604) px tờ so với neo cây; trên màn (co 352/533) ≈ (−85, −399) → (705, 746). Rộng demo 68 (quả cầu, cùng tỉ lệ với cây).
- `ui_bag_slot` ×4: tâm x 205 / 348 / 492 / 635, y 1290, rộng 125 (cách tâm 143). Quai túi nhô lên phía trên mép trái (đỉnh quai y≈1154). Thanh túi bám mép dưới màn hình; Y ở bảng là trên khung 1024x1536.
- Bóng Sữa (code): góc trái x 214 / góc phải x 439, chân trên đường gấu rèm y≈632 (rèm mới thu 0,85).
- Hộp ở reveal vẽ hẹp hơn ở start (~315 so với 368); trong game cả nhóm hộp co theo `l3_gift_box_taped` nên dùng 368.
- `l3_sofa_front` (D3-34): sofa Codex vẽ riêng (tờ `l3_sofa_sheet`), neo đáy (giữa chân) ở (677, 851), Rộng demo 670. Thay bản cắt từ nền L1 (D3-33, lưu `_refs/`).
- `l3_table` (D3-32): bàn tròn cắt từ nền, neo góc trên trái (44, 668), 269x203, không co; bàn vẫn còn trong nền (sprite đè đúng chỗ). Lớp: rèm → bóng Sữa → `l3_sofa_front`, `l3_table` → kéo → gối. Lớp: rèm → bóng Sữa → `l3_sofa_front` → gối. Sofa che chân rèm và góc dưới phải cửa sổ.
- Dải banner (leveldesign): y 1386–1536 không có đồ chạm được. Túi đồ đáy y 1380 (Dev), nút 💡 tâm (934, 1306). Đồ sàn bên trái (x < 760) đáy ≤ 1140, bên phải ≤ 1170.
---

## 7. Ảnh demo

Tranh dựng cảnh 1024x1536, không dùng trong game, lưu ở `art/out/demo/`, để chủ dự án duyệt không khí, màu, tỉ lệ. Vẽ theo bố cục mục 2, đồ vật đúng mô tả mục 5. Mỗi lượt đính kèm `art/ref/owner_l1_style_ref.png`, `demo/l1_demo_start.png`, `demo/l1_demo_reveal.png`, `demo/l2_demo_start.png`, `cats/sua_ref.png`, `player/player_ref.png` (A3-4).
- `l3_demo_start`: mọi đồ ở trạng thái đầu: rèm voan xanh rất nhạt đóng, trên rèm thấy **bóng mờ Sữa ngồi** ở góc trái rèm (bóng tím xám nhạt ~35%); kéo hồng trên bàn tròn; gối trắng trên sofa; lọ hoa trên kệ; **hộp quà dán băng dính chữ thập** ở giữa dưới; thảm tròn trống dưới phải. Nhân vật đứng cạnh hộp quà nhìn hộp, **bong bóng suy nghĩ có hình cây kéo** cạnh đầu. Chưa có túi đồ. Giao diện trên cùng như level 1 (♥, 4 vòng tròn trong đó 2 vòng đã tô, nút ⏸), nút 💡 góc dưới phải.
- `l3_demo_reveal`: **cột cào xịn đã dựng trên thảm**, quả bông đỏ san hô treo đung đưa; kéo đã biến mất khỏi bàn; **hộp đã lật ngửa, Sữa nằm gọn bên trong** thò đầu và hai tai, đuôi vắt qua mép; nhân vật đứng cạnh cột cào **buồn hiu** (`player_sad`); **túi đồ** ở dải dưới cùng (4 ô trống) cạnh nút 💡; bong bóng nhỏ góc trên trái thành mặt Sữa.
