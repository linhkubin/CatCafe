# Design Art – Level 4: Quả chuối trên rèm

> Đọc kèm `style.md`. Bút chì màu, pastel tươi (O3), nét mảnh đậm nhạt (O5), cute, tối giản, **không chữ**.
>
> **Phòng:** Phòng ngủ ◄ **Phòng khách** (bắt đầu) ► Phòng làm việc, ban ngày. **Mèo:** Sữa (theo `cats/sua_ref.png`). **Ý chính:** Sữa leo rèm phòng khách rồi mắc kẹt trên đỉnh rèm, treo lủng lẳng như quả chuối. Người chơi đi hai phòng bên lấy đệm, gối, chồng sách, vali, xếp thành tháp dưới rèm (rộng dưới, hẹp trên, mềm trên cùng). Nhân vật đứng trên đỉnh tháp với tay; Sữa giật mình lộn mấy vòng, tiếp đất bằng bốn chân, ngồi liếm chân tỉnh bơ.

Áp dụng mọi quy tắc đã chốt ở Level 1–3 (`art/review/level1-thread.md` … `level3-thread.md`): vẽ theo tờ, đặt tên V23, cột Nét theo công thức cuối, vùng chạm ≥ 115px, neo theo công cụ, `anchors.json`, **góc nhìn chung** (`style.md` mục 2b), màu và nét theo `art/ref/owner_l1_style_ref.png`, dải banner y 1386–1536 không có đồ chạm được, túi đồ như level 3.

**Góc nhìn:** theo **một quy tắc duy nhất ở `style.md` mục 2b**: nhìn mọi thứ như cái sofa level 1 (`art/ref/l1_depth_angle_ref.png`), đồ có chiều sâu rõ hơn chút (chiều sâu ở mặt trên, mặt hông rất hẹp, không xoay chéo, không phẳng). File này không lặp lại quy tắc góc; mọi chỗ nói "mặt trên", "độ dày", "dải hông" bên dưới hiểu theo mục 2b.

**Từ Level 4 (chủ dự án chốt):** nền chỉ là **phòng trống** (tường, sàn, chân tường, trần). Mọi đồ, kể cả rèm, cửa sổ, giường, sofa, bàn, kệ, đèn, đều là sprite riêng nền trong suốt.

Nguồn gameplay: `levels/levels-01-10.md` và `levels/states-01-10.md` mục Level 4 (bản "Quả chuối trên rèm"); quyết định G4-9, G4-10 (GD), D4-12… (Dev), A4-9… (Art) trong `art/review/level4-thread.md` từ "Vòng 3". Bản đặc tả "Vòi nước nhỏ giọt" cũ lưu ở `art/review/l4_old_faucet_design-art.md` (tư liệu).

---

## 1. Danh sách key

Hiển thị = cỡ trong game trên khung phòng 1024x1536. TS = trong suốt.

| Key | Thư mục | Hiển thị | Nền | Neo | Tờ (nhóm) |
|---|---|---|---|---|---|
| `l4_bg_living` | level4 | 1024x1536 | Có nền | góc trên trái | ảnh lẻ (mục 4) |
| `l4_bg_bedroom` | level4 | 1024x1536 | Có nền | góc trên trái | ảnh lẻ (mục 4) |
| `l4_bg_study` | level4 | 1024x1536 | Có nền | góc trên trái | ảnh lẻ (mục 4) |
| `l4_window` | level4 | rộng 230 | TS | đáy | `l4_curtain_sheet` |
| `l4_curtain` | level4 | rộng 610 | TS | đỉnh (giữa thanh rèm) | `l4_curtain_sheet` |
| `l4_sofa` | level4 | rộng 560 | TS | đáy | `l4_living_sheet` |
| `l4_stack_mattress` | level4 | rộng 295 | TS | đáy | `l4_stack_sheet` (stack) |
| `l4_stack_suitcase` | level4 | theo nhóm | TS | đáy | `l4_stack_sheet` (stack) |
| ~~`l4_stack_books`~~ | – | – | – | – | **bỏ key (A4-39):** tháp dùng chính ảnh `l4_book_stack` |
| `l4_stack_pillow` | level4 | theo nhóm | TS | đáy | `l4_stack_sheet` (stack) |
| `l4_bed` | level4 | rộng 600 | TS | đáy | `l4_bedroom_sheet` |
| `l4_pillow` | level4 | rộng 175 | TS | đáy | `l4_bedroom_sheet` |
| `l4_bedside_lamp` | level4 | rộng 160 | TS | đáy | `l4_bedroom_sheet` |
| `l4_sock_stuck` | level4 | rộng 80 | TS | đỉnh (chỗ móc vào chao đèn) | `l4_bedroom_sheet` |
| `l4_mattress_standing` | level4 | rộng 258 | TS | đáy | `l4_mattress_sheet` (mattress) |
| `l4_mattress_fallen` | level4 | rộng 460 | TS | đáy | `l4_mattress_sheet` (mattress) |
| `l4_teddy` | level4 | rộng 220 | TS | đáy | `l4_mattress_sheet` (G4-13: một ảnh) |
| `l4_bookshelf_full` | level4 | rộng 400 | TS | đáy | `l4_shelf_sheet` (shelf) |
| `l4_bookshelf_after` | level4 | theo nhóm | TS | đáy | `l4_shelf_sheet` (shelf) |
| `l4_book_single` (hồng; thêm `l4_book_single_mint`, `l4_book_single_yellow`, A4-34) | level4 | rộng 80 | TS | tâm | `l4_shelf_sheet` |
| `l4_book_stack` | level4 | rộng 200 | TS | đáy | `l4_shelf_sheet` |
| `l4_desk` | level4 | rộng 487 | TS | đáy | `l4_study_sheet` |
| `l4_yoga_ball` | level4 | rộng 357 | TS | tâm (= tâm hình tròn quả bóng, G4-18) | `l4_study_sheet` (D4-18) |
| `l4_suitcase_full` | level4 | rộng 435 | TS | đáy | `l4_suitcase_sheet` (suitcase) |
| `l4_suitcase_folded` | level4 | theo nhóm | TS | đáy | `l4_suitcase_sheet` (suitcase) |
| `l4_spill_duck_ring` | level4 | rộng 150 | TS | đáy | `l4_suitcase_sheet` |
| `l4_spill_goggles` | level4 | rộng 100 | TS | đáy | `l4_suitcase_sheet` |
| `l4_spill_slipper` | level4 | rộng 90 | TS | đáy | `l4_suitcase_sheet` |
| `l4_spill_shirt` | level4 | rộng 150 | TS | đáy | `l4_suitcase_sheet` |
| `sua_curtain_banana` | cats | cao 200 | TS | x,y điểm bám (giữa hai bàn chân trước) | `l4_sua_curtain_sheet` (sua_curtain) |
| `sua_curtain_one_paw` | cats | theo nhóm | TS | x,y điểm bám | `l4_sua_curtain_sheet` (sua_curtain) |
| `sua_curtain_upside` | cats | theo nhóm | TS | x,y điểm bám | `l4_sua_curtain_sheet` (sua_curtain) |
| `sua_curtain_sleep` | cats | theo nhóm | TS | x,y điểm bám | `l4_sua_curtain_b_sheet` (sua_curtain) |
| `sua_curtain_sulk` | cats | theo nhóm | TS | x,y điểm bám | `l4_sua_curtain_b_sheet` (sua_curtain) |
| `sua_curl_spin` | cats | rộng 150 | TS | tâm | `l4_sua_land_sheet` |
| `sua_land` | cats | rộng 220 | TS | đáy | `l4_sua_land_sheet` |
| `sua_lick_paw` | cats | cao 230 | TS | đáy | `l4_sua_land_sheet` |
| `player_reach_up` | player | cao 500 | TS | đáy | `player_l4_sheet` (player_pose) |
| `player_silly_laugh` | player | theo nhóm | TS | đáy | `player_l4_sheet` (player_pose) |
| `ui_room_arrow` | common | rộng 110 | TS | tâm | `ui_nav_sheet` (chung mọi level nhiều phòng) |

**Dùng lại, không vẽ:** `ui_bag_bar`, `ui_bag_slot`, `ui_thought_bubble`, `ui_hand_pointer`, `ui_hint_paw`, `ui_bulb_button`, `ui_pause_button`, `ui_dried_fish`, `ui_sparkle`, `sua_face_icon`, `sua_held`, `player_hands_lift`, `fx_pop`.

**Không có:** bản đồ mini (`ui_minimap_*`, GD Vòng 3b); `l4_curtain_bulge` và cục phồng trên rèm (G4-14: Sữa treo sẵn trên đỉnh rèm từ đầu màn); `l4_teddy_idle/_after` (G4-13).

**Không vẽ, code tạo:** bụi "phù" khi đệm đổ (`puff`), vệt xoáy khi Sữa lộn vòng, bong bóng ngủ `zzz` (dùng `ui_thought_bubble` thu nhỏ hoặc vòng tròn code vẽ, Dev chọn), lấp lánh tháp, cây bút rơi trên bàn (một chấm), bóng sàn. Icon trong túi = thu nhỏ `l4_mattress_fallen`, `l4_pillow`, `l4_book_stack`, `l4_suitcase_folded`.

**Tỉ lệ nhân vật (A4-18, chủ dự án: "nhân vật quá nhỏ so với các level cũ"):** nhân vật **cao ~500 (thân, không tính tay giơ; L3: 580)**, Sữa ngồi cao ~230 (L1: 260), gần bằng các level trước. Để rèm, tháp, nhân vật và Sữa vừa khung, các món tháp **mỏng** (đệm gấp ~60, vali gập ~60, chồng sách ~45, gối ~40; tháp cao ~205), xem mục 2a. Mọi đồ theo cùng tỉ lệ.

---

## 2. Bố cục ba phòng

Ba phòng đặt cạnh nhau theo chiều ngang: phòng ngủ (trái), phòng khách (giữa, bắt đầu), phòng làm việc (phải). Code trượt camera. Toạ độ dưới đây trong khung từng phòng (0–1024).

**Mốc chung ba nền:** chân tường (mép trên len chân tường) **y≈950** (A4-14: đo trên demo lượt 2; khách và ngủ ≈950, làm việc ≈880 sẽ hạ về 950 khi vẽ nền; các số "y≈1000" bên dưới là bản ước lượng đầu, đọc là 950), len cao ~30; sàn gỗ ván ngang từ y≈1000 xuống đáy khung. Trần: không vẽ đường trần (tường chạy tới mép trên). Giao diện y 0–130. Túi đồ ở đáy (như level 3, `ui_bag_bar` đáy y≈1380, ô túi y≈1290). Đồ đứng trên sàn có đáy ≤ 1160. Dải y 1386–1536 chỉ là sàn trơn. Sáng từ trên trái.

```
PHÒNG NGỦ                        PHÒNG KHÁCH (bắt đầu)            PHÒNG LÀM VIỆC
┌────────────────────────────┐ ┌────────────────────────────┐ ┌────────────────────────────┐
│ ♥Sữa ●●●○               ⏸ │ │ ♥Sữa ●●●○               ⏸ │ │ ♥Sữa ●●●○               ⏸ │  y 0–130
│                            │ │  ══════thanh rèm═══        │ │    ┌─────────┐             │  thanh rèm y≈150
│                            │ │  ║RÈM ║ cửa sổ │           │ │    │ KỆ SÁCH │             │
│              ┌───┐         │ │  ║ Sữa║        │           │ │    │ cao,    │             │
│ ┌────┐       │ĐÈN│         │ │  ║treo║        │           │ │    │ kín sách│  ┌────────┐ │
│ │ĐỆM │       └┬──┘ ╔═GIƯỜNG│ │  ║    ║────────┘           │ │    │         │  │BÀN LÀM │ │
│ │dựng│  BÀN ĐẦU │  ║ +GỐI  │►│◄ ║    ║        ┌─────────┐►│◄│    │         │  │ VIỆC   │ │
│ │    │  GIƯỜNG  │  ╚═══════│ │  ║    ║        │  SOFA   │ │ │    └─────────┘  └────────┘ │
│ ─┴────┴──────────┴─────────│ │ ─║────║────────┴─────────┴─│ │──────────────────────────  │  chân tường y≈1000
│                 GẤU BÔNG🎭 │ │   (THÁP dưới rèm)          │ │ (sách rơi) VALI  BÓNG YOGA │
│                            │ │                            │ │                            │  đồ sàn đáy ≤ 1160
│  [ túi đồ 4 ô ]       💡   │ │  [ túi đồ 4 ô ]       💡   │ │  [ túi đồ 4 ô ]       💡   │  túi y≈1220–1380
├────────────────────────────┤ ├────────────────────────────┤ ├────────────────────────────┤  banner 1386–1536
```

- **Phòng khách:** cửa sổ cao bên trái-giữa (x≈165–565); **rèm một tấm dài** treo trên thanh gỗ (y≈150) phủ nửa trái cửa sổ, buông chạm sàn; Sữa bám đỉnh tấm rèm. Tháp xếp ngay dưới rèm (đáy giữa (305, 1140)). Sofa bên phải sát tường. Mũi tên ◄ (64, 760), ► (960, 760).
- **Phòng ngủ:** đệm dựng tựa tường bên trái; bàn đầu giường nhỏ có đèn ngủ ở giữa; giường đơn bên phải (đầu giường bên trái, sát bàn), gối trên giường; gấu bông trắng ngồi trên sàn trước chân giường. Mũi tên ► (960, 760).
- **Phòng làm việc:** kệ sách cao bên trái; bàn làm việc bên phải sát tường; vali căng phồng giữa phía trước; bóng yoga trước bên phải. Mũi tên ◄ (64, 760); kệ bắt đầu từ x≈160 để vùng chạm mũi tên (x 0–140) không đè đồ.
- **Góc nhìn:** theo `style.md` mục 2b (nhìn như sofa level 1, chiều sâu ở mặt trên). Không bóng sàn.

### 2a. Tính chiều cao tháp (phòng khách, A4-18)

| Mốc | y (khung phòng) |
|---|---|
| Thanh rèm | 140 |
| Điểm bám của Sữa (hai bàn chân trước, ngay dưới thanh rèm, **giữa tấm rèm**) | 180 |
| Chân sau Sữa treo kiểu quả chuối (thấp nhất) | ~430 |
| Đầu ngón tay nhân vật (hai tay giơ, sát ngay dưới chân Sữa) | ~440 |
| Đỉnh tháp = mặt trên gối = chân nhân vật | ~960 |
| Đáy tháp (đáy đệm), ngay trước chân rèm | ~1160 |

Tháp cao ~200: đệm gấp ~60, vali gập ~60, chồng sách ~45, gối ~40 (hiển thị). Rộng: đệm 300 > vali 240 > sách 170 > gối 150. Nhân vật cao ~500 (thân), ~520 từ chân tới đầu ngón tay giơ.

### 2b. Góc nhìn, tỉ lệ, chất liệu từng đồ

| Đồ | Góc nhìn và mặt thấy | Tỉ lệ (hiển thị) | Chất liệu, màu |
|---|---|---|---|
| Cửa sổ (`l4_window`) | Cửa sổ cao 2 cánh nhìn thẳng, bệ cửa dải mỏng | rộng 400, cao ~440 | Khung kem, kính xanh trời nhạt thấy trời + 1 mây |
| Rèm (`l4_curtain`) | Thanh rèm gỗ ngang + **một tấm rèm dài** buông thẳng ở nửa trái, vài nếp dọc mềm, gấu chạm sàn | rộng 440 (thanh), tấm rèm rộng ~260, cao ~850 | **Vải dày hồng phấn rất nhạt gần kem** (như demo), khoen gỗ tròn; đỉnh rèm phẳng, không cục phồng (G4-14) |
| Sofa (`l4_sofa`) | Như sofa level 1–3 thu nhỏ: 2 chỗ, mặt trước, mặt đệm ngồi là dải mỏng, có khối tròn mập | rộng 360 | Xanh bạc hà nhạt, chân gỗ |
| Tháp (`l4_stack_*`) | Mỗi món nằm ngang ngay ngắn trên món dưới: mặt trước là dải dày, mặt trên dải mỏng, dải hông phải hẹp; chồng thẳng hàng, cùng góc | xem 2a | Cùng màu với món nhặt được tương ứng |
| Giường (`l4_bed`) | Giường đơn nhìn ngang dọc thân: đầu giường gỗ bên trái cao, chân giường bên phải thấp, nệm + chăn là dải dày (thấy độ dày), mặt nệm là dải mỏng | rộng 520, cao ~300 (đầu giường) | Gỗ mật ong; chăn xanh da trời nhạt có 5–6 chấm bi kem to; **trống chỗ gối** |
| Gối (`l4_pillow`) | Gối chữ nhật phồng nằm ngang, thấy độ dày | rộng 150, cao ~65 | Trắng kem viền hồng phấn |
| Đèn ngủ (`l4_bedside_lamp`) | Bàn đầu giường nhỏ 1 ngăn kéo (mặt bàn dải mỏng, dải hông phải hẹp) + đèn chao vải trên mặt bàn, chao có nét đổ bóng bên phải | rộng 130, cao ~330 | Bàn gỗ caramel, chao đèn vàng bơ hình thang bo tròn, chân đèn kem |
| Tất (`l4_sock_stuck`) | Một chiếc tất vắt trên mép chao đèn, rủ xuống | rộng 70 | Tất sọc hồng phấn–kem (4 sọc to) |
| Đệm (`l4_mattress_*`) | Dựng: đệm đứng tựa tường, mặt trước chữ nhật đứng bo góc, dải hông phải hẹp thấy độ dày đệm. Đổ: cùng đệm nằm bẹp trên sàn, mặt trước là dải dày, mặt trên dải mỏng | dựng rộng 230 cao ~450; đổ rộng 400 cao ~100 | Vải kem có **đường chần ô quả trám to** (3x4 ô, đường mảnh), viền mép xanh da trời nhạt |
| Gấu bông (`l4_teddy`) 🎭 | Ngồi nhìn thẳng (chạm chỉ nhún nhẹ, code `hop`; G4-13) | rộng 150, cao ~170 khi ngồi | **Trắng ấm lông xù như Sữa**, tai tròn (gấu, không phải tai nhọn mèo), mắt nút đen nâu, nơ cổ xanh bạc hà |
| Kệ sách (`l4_bookshelf_*`) | Kệ gỗ cao 4 tầng nhìn thẳng, nóc dải mỏng, dải hông phải hẹp (thấy độ sâu kệ) | rộng 340, cao ~700 | Gỗ caramel; sách gáy màu pastel (hồng, bạc hà, xanh trời, vàng bơ, oải hương), gáy trơn **không chữ** |
| Sách lẻ / chồng sách | Sách lẻ nhìn nghiêng (bìa + gáy); chồng sách 6–7 cuốn **vuông vức thẳng tắp** | lẻ rộng 70; chồng rộng 180, cao ~150 | Cùng màu sách trên kệ |
| Bàn làm việc (`l4_desk`) | Bàn gỗ nhìn thẳng, mặt bàn dải mỏng, 4 chân thẳng (2 chân sau lấp sau chân trước); trên bàn: đèn bàn nhỏ, cốc bút, **một cây bút nằm sát mép bàn** | rộng 380, cao ~280 (tới đỉnh đèn ~420) | Gỗ mật ong, đèn xanh bạc hà, cốc hồng đào |
| Bóng yoga (`l4_yoga_ball`) 🎭 | Quả cầu tròn to nhìn thẳng, có khối: vài nét chì đổ bóng bên phải, đường may cong theo khối | rộng 220 | Tím oải hương, 1 vệt sáng nhạt, 2 đường may cong mảnh |
| Vali (`l4_suitcase_*`) | Đầy: vali cứng đứng nhìn thẳng (nóc dải mỏng, dải hông phải hẹp), mặt trước **căng phồng** méo, khóa kéo căng, vài góc vải thò ra khe; tay kéo trên nóc. Gấp: **cùng vali rỗng gập dẹt lại** thành tấm mỏng nằm ngang, tay kéo bên trên | đầy rộng 260 cao ~250; gấp rộng 260 cao ~70 | **Xanh da trời nhạt** (#B8DAF2, A4-19: khỏi lẫn với sàn gỗ), 2 đai vàng bơ nhạt, góc bọc caramel |
| Đồ bung | Phao vịt (vòng phao đầu vịt), kính lặn, một chiếc dép lẻ, một áo phông | xem bảng mục 1 | Phao vàng bơ mỏ cam; kính lặn xanh trời; dép hồng phấn; áo bạc hà |
| Mũi tên (`ui_room_arrow`) | Phẳng | rộng 110 | Kem giấy, viền gỗ caramel + nâu, chĩa phải |

**Màu nền ba phòng (chung tông ấm, khác nhau nhẹ để biết đang ở đâu):** phòng khách tường **kem giấy** như level 1; phòng ngủ tường **hồng phấn rất nhạt**; phòng làm việc tường **xanh bạc hà rất nhạt**. **Sàn gỗ ván ngang ở cả ba phòng giống hệt nhau và giống sàn level 1** (mẫu `art/ref/l1_floor_ref.png`, cắt từ ảnh mẫu L1, mật ong ấm ~#F9C58C), cùng chân tường y≈950, len gỗ caramel (A4-20: 3 demo trước lệch màu sàn).

### 2c. Trạng thái và phần giữ nguyên

| Đồ | Trạng thái | Giữ nguyên giữa các trạng thái |
|---|---|---|
| Rèm | một ảnh, không đóng mở, không cục phồng (G4-14) | — (code `swing`, `wiggle`) |
| Đệm | `_standing` → `_fallen` | Cùng vải, cùng đường chần, cùng viền màu; hai hình khác dáng (đứng / nằm), không cần cùng khung |
| Kệ sách | `_full` → `_after` | **Thân kệ giống hệt** (cỡ, gỗ, tầng, góc nhìn, đường đáy); chỉ khác tầng dưới cùng: `_after` trống một khoảng 6–8 cuốn đã rơi, 3 tầng trên giữ nguyên sách (G4-18) |
| Vali | `_full` → `_folded` | Cùng màu, cùng đai, cùng tay kéo, **cùng đường đáy, cùng bề rộng**; folded là thân vali dẹt lại |
| Tháp | 4 món `l4_stack_*` | Mỗi món giống món nhặt được (màu, chi tiết) nhưng ở tư thế nằm ngay ngắn để chồng. Mặt trên mỗi món phẳng, đủ rộng cho món trên đặt lên |
| Sữa trên rèm | 5 tư thế `sua_curtain_*` | **Cùng điểm bám** (vị trí hai bàn chân trước trên mép đỉnh rèm, cùng toạ độ trong ô), cùng cỡ Sữa |
| Nhân vật | `player_reach_up` → `player_silly_laugh` | Cùng cỡ, cùng đường đáy (đứng trên gối) |


### 2d. Chiều sâu từng đồ

Theo `style.md` mục 2b. Đồ càng sâu thì mặt trên càng cao: **mặt nệm giường** là mảng lớn rõ (cả với đệm đổ, đệm gấp trên tháp); **sofa** thấy rõ mặt đệm ngồi; **mặt bàn làm việc** rõ và sâu hơn **nóc kệ sách**; bàn đầu giường, vali, chồng sách, gối thấy mặt trên và độ dày; đồ tròn (bóng, chao đèn, gấu) có khối bằng nét chì đổ bóng.

---

## 3. Quy tắc tờ

Như `design-art-level3.md` mục 3: tờ 1536x1024 (hoặc 1024x1536), nền trong suốt, mỗi ô một thứ, cách mép ô ≥ 40px, cùng tỉ lệ thật trong tờ, trạng thái cùng nhóm giống hệt phần không đổi và cùng đường đáy. **Cột Nét** = viền ngoài ở chỗ đậm nhất (px trong tờ); Nét = 3k với đồ vật/UI, 2,5k với mèo/nhân vật, không dưới 2k. Giao việc kèm `--stroke-ref art/out/cats/sua_ref.png=<0,6 × Nét ÷ 5>`, ảnh mẫu `art/ref/owner_l1_style_ref.png` và ảnh cắt cận từ demo đã duyệt. Ô và Nét dưới đây là bản đầu; vẽ xong đo khung thật, sửa ô rồi cắt lại.

**Chỉ vẽ tờ sau khi chủ dự án duyệt demo** (QUY-TRINH bước 4).

---

## 4. Ảnh lẻ

| File (trong art/out/) | Key | Kích thước | Nền | Mô tả |
|---|---|---|---|---|
| `level4/l4_bg_living.png` | `l4_bg_living` | 1024x1536 | Có nền | Phòng khách trống |
| `level4/l4_bg_bedroom.png` | `l4_bg_bedroom` | 1024x1536 | Có nền | Phòng ngủ trống |
| `level4/l4_bg_study.png` | `l4_bg_study` | 1024x1536 | Có nền | Phòng làm việc trống |

Cả ba (A4-22, G4-16): sửa từ demo đã duyệt của phòng đó (`demo/l4_demo_living.png`, `l4_demo_bedroom.png`, `l4_demo_study.png`), **xoá mọi đồ, người, mèo và giao diện**, vẽ liền phần bị che; chỉ còn **tường sau nhìn thẳng** + len chân tường gỗ caramel nhạt nằm ngang với **mép trên theo đúng demo**: khách ≈1000, ngủ ≈905, làm việc ≈770 (G4-27) + sàn gỗ ván ngang **đúng màu `art/ref/l1_floor_ref.png`**. Không cửa sổ, không rèm, không đèn, không tranh. Tường: khách **kem giấy** như demo; ngủ **hồng phấn rất nhạt** (nhạt hơn demo, như Vòng 4d); làm việc **xanh bạc hà rất nhạt** như demo; cùng ánh sáng trên trái.

---

## 5. Các tờ và mô tả từng ảnh

### 5.0 Chung cho mọi lượt tách (Vòng 5, sau khi chủ dự án duyệt demo)

- **Vẽ đúng đồ trong demo đã duyệt** của phòng đó: cùng hình dáng, tỉ lệ, chi tiết, màu, nét, cùng góc nhìn (sofa level 1). Demo là chuẩn số 1 cho từng đồ; mô tả dưới chỉ để nói rõ thêm.
  - Phòng khách: `art/out/demo/l4_demo_living.png` (rèm, cửa sổ, sofa, tháp 4 món, Sữa, nhân vật).
  - Phòng ngủ: `art/out/demo/l4_demo_bedroom.png` (đệm, tủ đầu giường + đèn, giường, gối, gấu bông).
  - Phòng làm việc: `art/out/demo/l4_demo_study.png` (kệ sách, bàn, vali, bóng yoga).
- Ảnh tham chiếu mỗi lượt (≤ 5): ảnh mẫu L1 + mẫu góc sofa (công cụ tự kèm) + demo của phòng + `sua_ref` / `player_ref` khi tờ có mèo / nhân vật. Nền: thêm `art/ref/l1_floor_ref.png`.
- **Màu chốt theo demo:** rèm hồng phấn rất nhạt gần kem; cửa sổ khung kem, kính xanh trời nhạt; sofa bạc hà nhạt như sofa L1; đệm kem chần quả trám, viền xanh trời nhạt; **vali xanh da trời nhạt #B8DAF2, 2 đai vàng bơ nhạt, góc bọc caramel** (cả vali đứng, vali gập, vali trên tháp); sách gáy pastel trơn; gối kem viền hồng phấn; giường gỗ mật ong nhạt, chăn xanh trời nhạt chấm bi kem to; tủ đầu giường gỗ mật ong nhạt, chao đèn vàng bơ nhạt; gấu bông trắng ấm, nơ bạc hà; kệ, bàn gỗ mật ong nhạt; đèn bàn bạc hà; cốc bút hồng đào nhạt; bóng yoga oải hương nhạt.
- **Cỡ:** nhân vật cao ~500 (như level 1–3, theo bản Vòng 4e, không nhỏ như demo cuối); Sữa nhỏ như demo cuối (treo dài ~200, ngồi ~200).
- Các trạng thái cùng nhóm (đệm dựng/đổ, kệ đầy/trống, vali căng/gập, 5 tư thế rèm, 2 tư thế nhân vật): **phần không đổi giống hệt, cùng cỡ, cùng đường đáy** (hoặc cùng điểm bám).
- Không bóng sàn, không chữ, không số. Kiểm màu bằng `tools/color_check.py` (tự chạy), kiểm góc bằng mắt cạnh sofa L1, rồi mới cắt.

**Ảnh demo gốc kèm mọi lượt tách (G4-26).** `tools/codex-draw.mjs` đọc bảng này, tự đính kèm NGUYÊN ảnh demo gốc của phòng và ghi "món cần vẽ nằm ở …" vào lời giao việc; tờ hoặc ảnh lẻ của level có demo mà thiếu dòng ở đây thì công cụ dừng. Vị trí là toạ độ trên ảnh demo 1024x1536.

| Tờ hoặc key | Demo gốc | Vị trí trong demo |
|---|---|---|
| l4_bg_living | art/out/demo/l4_demo_living.png | cả ảnh (giữ tường, chân tường, sàn; xoá mọi đồ) |
| l4_bg_bedroom | art/out/demo/l4_demo_bedroom.png | cả ảnh (giữ tường, chân tường, sàn; xoá mọi đồ) |
| l4_bg_study | art/out/demo/l4_demo_study.png | cả ảnh (giữ tường, chân tường, sàn; xoá mọi đồ) |
| l4_curtain_sheet | art/out/demo/l4_demo_living.png | rèm hồng bên trái x 50–660, y 140–1060 (gồm thanh rèm); cửa sổ bên phải rèm x 405–635, y 170–710 |
| l4_living_sheet | art/out/demo/l4_demo_living.png | sofa bạc hà dưới phải x 470–1024, y 780–1080 (tay vịn phải bị khung cắt) |
| l4_stack_sheet | art/out/demo/l4_demo_living.png | tháp dưới rèm x 170–465, y 805–1062 (đệm dưới, vali, sách, gối trên) |
| l4_sua_curtain_sheet | art/out/demo/l4_demo_living.png | Sữa treo đỉnh rèm x 195–325, y 160–370 |
| l4_sua_curtain_b_sheet | art/out/demo/l4_demo_living.png | Sữa treo đỉnh rèm x 195–325, y 160–370 |
| l4_sua_land_sheet | art/out/demo/l4_demo_living.png | Sữa treo đỉnh rèm x 195–325, y 160–370 (chỉ để giữ đúng Sữa) |
| player_l4_sheet | art/out/demo/l4_demo_living.png | nhân vật đứng trên tháp x 220–495, y 365–825 |
| ui_nav_sheet | art/out/demo/l4_demo_living.png | mũi tên mép trái x 15–130 và mép phải x 890–1005, y 670–775 |
| l4_bedroom_sheet | art/out/demo/l4_demo_bedroom.png | giường x 398–1000, y 638–1035; gối trên giường x 435–610, y 735–835; tủ đầu giường + đèn x 238–398, y 678–985 |
| l4_mattress_sheet | art/out/demo/l4_demo_bedroom.png | đệm dựng x 22–280, y 500–975; gấu bông x 650–870, y 900–1165 |
| l4_shelf_sheet | art/out/demo/l4_demo_study.png | kệ sách x 98–497, y 196–890 |
| l4_study_sheet | art/out/demo/l4_demo_study.png | bàn x 515–1002, y 520–895; bóng yoga x 628–985, y 845–1190 |
| l4_suitcase_sheet | art/out/demo/l4_demo_study.png | vali x 130–565, y 885–1190 |
| l4v9_sock_sheet | art/out/demo/l4_demo_bedroom.png | tủ đầu giường + đèn x 238–398, y 678–985 (tất vắt trên chao); giường x 398–1000, y 638–1035 (tất nằm) |
| l4v12_player_sheet | art/out/demo/l4_demo_living.png | nhân vật đứng trên tháp x 220–495, y 365–825 (dáng nghiêng 3/4, tay vươn chéo lên trái) |
| l4v12b_player_sheet | art/out/demo/l4_demo_living.png | nhân vật đứng trên tháp x 220–495, y 365–825 (dáng nghiêng 3/4, tay vươn chéo lên trái) |
| fx_dust_sheet | art/out/demo/l4_demo_study.png | vali x 130–565, y 885–1190 (khói phụt quanh vali khi bung) |

### 5.1 Tờ `l4_curtain_sheet` — Cửa sổ, rèm (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|

Cùng tỉ lệ thật: thanh rèm dài hơn cửa sổ một chút; tấm rèm cao gấp ~2 cửa sổ.
- `l4_window`: cửa sổ cao 2 cánh, khung kem bo góc, kính xanh trời nhạt thấy một mảng trời và 1 đám mây nhỏ, bệ cửa dải mỏng trống. Không rèm, không thanh rèm.
- `l4_curtain` 🔑: **thanh rèm gỗ** caramel tròn nằm ngang, hai đầu núm tròn; treo ở **nửa trái** một **tấm rèm dài** vải dày **hồng phấn rất nhạt gần kem** (như demo), 6 khoen gỗ, 4–5 nếp dọc mềm, gấu hơi xòe chạm sàn. Đỉnh tấm rèm phẳng, **không cục phồng** (Sữa là sprite riêng treo ở đó từ đầu màn). Nửa phải dưới thanh rèm trống (thấy cửa sổ phía sau trong cảnh).

### 5.2 Tờ `l4_living_sheet` — Sofa (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|

- `l4_sofa` ✨: sofa 2 chỗ xanh bạc hà nhạt như `l3_sofa_front` (2 gối lưng, tay vịn cuộn, 2 đệm ngồi, 4 chân gỗ ngắn), không gối trang trí. Có thể dùng lại `l3_sofa_front` nếu chủ dự án đồng ý (A4-11).

### 5.3 Tờ `l4_stack_sheet` — Tháp 4 tầng (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l4_stack_sheet | 39,322,886,264 | l4_stack_mattress | level4 | stack | đáy | rộng 295 | 6 |
| l4_stack_sheet | 814,765,727,202 | l4_stack_pillow | level4 | stack | đáy | rộng 235 | 6 |

**Cùng tỉ lệ thật** (rộng hiển thị đệm 340 : vali 260 : sách 180 : gối 150; cao 100 : 115 : 90 : 65). Mỗi món nằm ngang ngay ngắn: mặt trước dải dày, **mặt trên phẳng** (dải mỏng), dải hông phải hẹp; chồng thẳng hàng, đáy phẳng, giữa ô theo chiều ngang. Code chồng món sau lên mặt trên món trước.
- `l4_stack_mattress`: đệm gấp đôi nằm ngang (khối dày bo góc), vải kem chần quả trám, viền xanh trời; cùng đệm với `l4_mattress_*`.
- `l4_stack_suitcase`: vali xanh da trời nhạt **nằm ngang đã gập dẹt** (như `l4_suitcase_folded` nhưng dày hơn chút), 2 đai kem, tay kéo nằm sát.
- `l4_stack_books`: **bỏ (A4-39)**, tầng sách trên tháp dùng chính ảnh `l4_book_stack`.
- `l4_stack_pillow`: gối trắng kem viền hồng phấn nằm phồng, như `l4_pillow`; mặt trên hơi lõm (chỗ nhân vật đứng).

### 5.4 Tờ `l4_bedroom_sheet` — Giường, gối, đèn ngủ, tất (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l4_bedroom_sheet | 1137,164,374,228 | l4_pillow | level4 |  | đáy | rộng 175 | 5 |

- `l4_bed`: giường đơn gỗ mật ong nhìn ngang dọc thân: đầu giường bên **trái** cao bo tròn đỉnh, chân giường bên phải thấp, nệm + chăn xanh da trời nhạt chấm bi kem to (5–6 chấm) là dải dày nằm ngang, **chỗ gối ở đầu giường để trống**. 4 chân ngắn.
- `l4_pillow` 🎒: gối chữ nhật phồng trắng kem, viền hồng phấn, góc bo tròn.
- `l4_bedside_lamp`: bàn đầu giường gỗ caramel nhỏ (1 ngăn kéo núm tròn, 4 chân ngắn) với **đèn ngủ** trên mặt bàn: chân đèn tròn kem, **chao vải vàng bơ** hình thang bo tròn. Đèn tắt (không quầng sáng).
- `l4_sock_stuck` 🎁: một chiếc tất sọc hồng phấn–kem (4 sọc to) **vắt qua mép trên**, nửa rủ xuống. Neo đỉnh = chỗ vắt (đặt lên mép chao đèn).

### 5.5 Tờ `l4_mattress_sheet` — Đệm, gấu bông (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l4_mattress_sheet | 47,226,410,739 | l4_mattress_standing | level4 | mattress | đáy | rộng 258 | 5 |
| l4_mattress_sheet | 470,707,798,258 | l4_mattress_fallen | level4 | mattress | đáy | rộng 460 | 5 |
| l4_mattress_sheet | 1180,356,319,365 | l4_teddy | level4 |  | đáy | rộng 220 | 5 |

Cùng tỉ lệ thật: gấu ngồi cao ~0,38 đệm dựng.
- `l4_mattress_standing` 🔑: đệm mỏng **dựng đứng tựa tường**, mặt trước chữ nhật đứng bo góc, dải hông phải hẹp thấy độ dày, vải kem **chần ô quả trám to** (3 cột x 4 hàng, đường mảnh), viền mép xanh trời nhạt. Hơi cong nhẹ như sắp đổ.
- `l4_mattress_fallen` 🎒: cùng đệm **nằm bẹp trên sàn**: mặt trên là dải dày thấy chần quả trám, cạnh trước viền xanh trời; một góc hơi vểnh.
- `l4_teddy` 🎭: gấu bông **trắng ấm lông xù** ngồi, hai chân duỗi ra trước, tai **tròn** (gấu), mắt nút tròn, mõm tròn kem, **nơ cổ bạc hà**. Ngồi tròn ủm, cỡ và màu gần giống Sữa ngồi để đánh lừa.

### 5.6 Tờ `l4_shelf_sheet` — Kệ sách, sách (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|

- `l4_bookshelf_full` 🔑: kệ gỗ caramel cao **4 tầng**, nóc dải mỏng, dải hông phải hẹp, chân đế thấp. Mỗi tầng **kín sách đứng sát nhau**, gáy màu pastel trơn (không chữ, không số), cao thấp lệch nhẹ; **cuốn sách cuối cùng bên trái ở tầng thấp nhất hơi nghiêng ra** (chỗ chạm).
- `l4_bookshelf_after` (G4-18): **giống hệt `l4_bookshelf_full`** (cùng khung, cùng sách, cùng đường đáy), 3 tầng trên vẫn kín sách y nguyên; **chỉ tầng dưới cùng có một khoảng trống vừa 6–8 cuốn** (các cuốn đó đã rơi), vài cuốn còn lại ở tầng dưới đứng nghiêng tựa nhau.
- `l4_book_single`: một cuốn sách đóng nhìn nghiêng (bìa + gáy), màu hồng phấn. Code tô đổi màu nhẹ cho từng cuốn rơi.
- `l4_book_stack` 🎒 (G4-18): chồng **6–8 cuốn** sách nằm ngang **vuông vức thẳng tắp** đến buồn cười, gáy pastel cùng màu các cuốn ở tầng dưới cùng của kệ, cuốn trên cùng có dải ruy băng đánh dấu bạc hà.

### 5.7 Tờ `l4_study_sheet` — Bàn làm việc, bóng yoga (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l4_study_sheet | 62,74,895,878 | l4_desk | level4 |  | đáy | rộng 487 | 5 |
| l4_study_sheet | 992,421,517,498 | l4_yoga_ball | level4 |  | tâm | rộng 357 | 5 |

- `l4_desk` ✨: bàn gỗ mật ong, mặt bàn dải mỏng, 4 chân thẳng (2 chân sau lấp sau chân trước), một ngăn kéo núm tròn. Trên mặt bàn: **đèn bàn** xanh bạc hà cổ cong, **cốc bút** hồng đào cắm 3 bút, và **một cây bút nằm sát mép phải bàn**.
- `l4_yoga_ball` 🎭: quả bóng tập yoga tròn to **tím oải hương**, 1 vệt sáng nhạt cong, 2 đường may mảnh, đáy chạm sàn hơi bẹt.

### 5.8 Tờ `l4_suitcase_sheet` — Vali, đồ bung (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l4_suitcase_sheet | 1164,256,371,320 | l4_spill_duck_ring | level4 |  | đáy | rộng 150 | 5 |
| l4_suitcase_sheet | 46,702,448,216 | l4_spill_goggles | level4 |  | đáy | rộng 100 | 5 |
| l4_suitcase_sheet | 593,676,271,299 | l4_spill_slipper | level4 |  | đáy | rộng 90 | 5 |
| l4_suitcase_sheet | 959,628,520,331 | l4_spill_shirt | level4 |  | đáy | rộng 150 | 5 |

Cùng tỉ lệ thật. Hai vali **cùng bề rộng, cùng đường đáy**.
- `l4_suitcase_full` 🔑: vali cứng xanh da trời nhạt (khác hẳn màu sàn gỗ) đứng, mặt trước chữ nhật **căng phồng méo** như sắp nổ, khóa kéo căng, 2 đai sọc bạc hà, góc bọc caramel, tay kéo gập trên nóc; **góc vải áo và một dây kính lặn thò ra khe khóa**.
- `l4_suitcase_folded` 🎒: cùng vali **rỗng gập dẹt** thành tấm mỏng nằm ngang trên sàn, gọn gàng đến vô lý, tay kéo phía trên, đai bạc hà.
- `l4_spill_duck_ring` 🎁: phao bơi tròn vàng bơ có **đầu vịt** mỏ cam đào, nằm phẳng trên sàn.
- `l4_spill_goggles`: kính lặn xanh trời, dây đeo vòng.
- `l4_spill_slipper`: một chiếc dép lê bông hồng phấn.
- `l4_spill_shirt`: áo phông bạc hà nằm bẹp, tay áo xòe.

### 5.9 Tờ `l4_sua_curtain_sheet` + `l4_sua_curtain_b_sheet` — Sữa trên rèm (1536x1024, tham chiếu `cats/sua_ref.png`)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|

**Điểm bám chung:** hai bàn chân trước (hoặc chỗ Sữa bám) ở đỉnh hình; cột Neo ghi toạ độ điểm bám đo trên tờ đã vẽ (A4-25) (một đoạn vải rèm ngắn **không vẽ**; Sữa bám vào khoảng không, rèm thật nằm phía sau trong cảnh). Cùng cỡ Sữa ở mọi ô. Đúng Sữa trong `sua_ref` (lông trắng ấm xù bông, đầu to tròn, mắt xanh lòng đen to, tai hồng, không đốm, không vòng cổ).
- `sua_curtain_banana`: Sữa treo bằng **hai chân trước** giơ thẳng lên bám, **thân duỗi dài như sợi mì**, hai chân sau dang ra hai bên, đuôi bông thõng xuống; mặt nhìn người xem ngơ ngác, miệng mở "meo". Dáng cong nhẹ như quả chuối.
- `sua_curtain_one_paw`: **chỉ một chân trước bám**, thân trượt thấp hơn một nấc (đầu thấp hơn banana ~40), thân đung đưa lệch, mặt **cam chịu** mắt lim dim nửa vời, tai cụp.
- `sua_curtain_upside`: **treo ngược**: hai chân sau bám ở điểm bám, đầu chúc xuống, hai chân trước buông, **đuôi chĩa thẳng lên trời**, mặt lộn ngược nhìn người xem tỉnh bơ.
- `sua_curtain_sleep`: hai chân trước khoanh vắt qua điểm bám, thân thõng xuống, **ngủ gật**: mắt nhắm cong, miệng hé, má phồng; đuôi quấn hờ.
- `sua_curtain_sulk`: hai chân trước bám, **quay lưng ra ngoài** (thấy lưng, mông tròn, đuôi bông, sau gáy và hai tai), mặt úp vào rèm giận dỗi.

### 5.10 Tờ `l4_sua_land_sheet` — Lộn vòng, tiếp đất, liếm chân (1536x1024, tham chiếu `cats/sua_ref.png`)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l4_sua_land_sheet | 28,358,537,469 | sua_curl_spin | cats |  | tâm | rộng 150 | 6 |
| l4_sua_land_sheet | 564,258,583,567 | sua_land | cats |  | đáy | rộng 220 | 6 |
| l4_sua_land_sheet | 1186,196,442,649 | sua_lick_paw | cats |  | đáy | cao 230 | 6 |

Cùng tỉ lệ thật (cùng cỡ với tờ rèm).
- `sua_curl_spin`: Sữa **cuộn tròn thành một quả bóng lông** (đầu rúc vào, bốn chân thu, đuôi quấn quanh), gần tròn để code xoay đều quanh tâm. Không vạch chuyển động.
- `sua_land`: Sữa vừa **tiếp đất bằng bốn chân**, nhìn nghiêng sang phải, lưng hơi cong, bốn chân chụm, đuôi dựng cong, mặt bình thản. Bốn bàn chân là điểm thấp nhất.
- `sua_lick_paw`: Sữa **ngồi** nhìn hơi nghiêng, giơ một chân trước lên **liếm**, lưỡi hồng, mắt nhắm thản nhiên như chưa có chuyện gì; đuôi quấn quanh chân.

### 5.11 Tờ `player_l4_sheet` — Nhân vật với tay, cười ngốc (1536x1024, tham chiếu `player/player_ref.png`)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| player_l4_sheet | 860,128,463,869 | player_silly_laugh | player |  | đáy | cao 452 | 5 |

`player_reach_up` vẽ lại ở Vòng 12 (G4-45, tờ `l4v12_player_sheet`, mục 5.13), cùng tỉ lệ với `player_silly_laugh` (đo theo bề ngang đôi dép).

Hai tư thế cùng cỡ, cùng đường đáy (chân đứng trên mặt gối).
- `player_reach_up`: đúng `player_ref` (tóc xoăn bồng nâu caramel, áo len vàng bơ, quần xanh trời nhạt, dép bông), **kiễng chân**, người vươn thẳng, **hai tay giơ cao quá đầu** với lên, mặt ngửa lên nhìn trên, miệng chữ o cố gắng.
- `player_silly_laugh`: cùng nhân vật đứng thẳng, **một tay gãi đầu**, tay kia buông, mặt cúi nhìn xuống bên phải, **cười ngốc nghếch** (mắt cong híp, miệng cười toe, má hồng), một giọt mồ hôi nhỏ cạnh đầu.

### 5.12 Tờ `ui_nav_sheet` — Mũi tên chuyển phòng (1536x1024, dùng chung)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| ui_nav_sheet | 541,241,897,716 | ui_room_arrow | common |  | tâm | rộng 110 | 14 |

- `ui_room_arrow`: mũi tên mập chĩa **sang phải** (đầu tam giác bo tròn + thân ngắn), kem giấy, viền gỗ caramel mập + viền nâu mảnh ngoài, vài nét chì đổ bóng mép dưới phải; cùng kiểu với `ui_bulb_button`, `ui_pause_button`. Code lật cho bên trái. Không chữ.

### 5.13 Vòng 6–7: tách lại theo ảnh cắt demo (G4-22, G4-26)

Các tờ `l4v6_*` thay các dòng tờ cũ của cùng key (đã bỏ khỏi mục 5.1–5.12). Ảnh đầu vào: ảnh cắt đúng món từ demo (`art/ref/l4_v6_input/`), Codex chỉnh sửa từ ảnh (nền trong suốt, bỏ đồ đè, vẽ bù phần che), lời giao `art/review/l4_v6_*_brief.md`, mỗi lượt kèm ảnh demo gốc. Ô = khung thật đo trên tờ. Tờ Sữa: 5 tư thế lấn khung nhau nên Art tách theo mặt nạ từng mảng sang `l4v6_sua_split_sheet` (giãn cách 400px) rồi cắt.
- **Cùng món cùng ảnh:** `l4_suitcase_folded` và `l4_stack_suitcase` cùng một ảnh (vali gập), `l4_book_stack` và `l4_stack_books` cùng một ảnh (chồng 3 cuốn trên tháp demo). **Vòng 8 (G4-30, G4-32, A4-34):** sách rơi là **3 cuốn trái nhất ở HÀNG TRÊN CÙNG** của kệ: hồng, bạc hà, vàng bơ. `l4_book_single` (hồng), `l4_book_single_mint`, `l4_book_single_yellow` (thay `_lavender`); chồng sách (`l4_book_stack`, cũng là tầng sách trên tháp; key `l4_stack_books` bỏ theo A4-39 vì trùng từng byte) từ trên xuống: hồng, bạc hà, vàng bơ (Codex đổi màu từ tờ cũ, tờ `l4v8_books_sheet`). `l4_bookshelf_after` = chính ảnh `_full`, chỉ thay vùng 3 cuốn đó bằng lưng kệ trống do Codex vẽ liền (Art ghép đúng vùng, lệch 0px); hàng dưới đầy như `_full` (tờ `l4v8_shelf_sheet`).
- Tất và sách lẻ có cỡ hiển thị tính theo cùng tỉ lệ với đèn / chồng sách trên tờ.

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l4v6_window_sheet | 187,83,650,1354 | l4_window | level4 |  | đáy | rộng 230 | 5 |
| l4v6_curtain_sheet | 55,78,912,1398 | l4_curtain | level4 |  | đỉnh | rộng 610 | 5 |
| l4v6_sofa_sheet | 35,140,1468,735 | l4_sofa | level4 |  | đáy | rộng 620 | 5 |
| l4v6_bed_sheet | 105,66,1332,889 | l4_bed | level4 |  | đáy | rộng 605 | 5 |
| l4v6_lamp_sheet | 167,58,509,935 | l4_bedside_lamp | level4 |  | đáy | rộng 162 | 5 |
| l4v6_lamp_sheet | 984,300,344,354 | l4_sock_stuck | level4 |  | đỉnh | rộng 109 | 5 |
| l4v6_sua_split_sheet | 34,196,332,590 | sua_curtain_banana | cats | sua_curtain | đỉnh | cao 200 | 5 |
| l4v6_sua_split_sheet | 430,197,339,603 | sua_curtain_one_paw | cats | sua_curtain | đỉnh |  | 5 |
| l4v6_sua_split_sheet | 855,201,289,571 | sua_curtain_upside | cats | sua_curtain | đỉnh |  | 5 |
| l4v6_sua_split_sheet | 1248,209,304,591 | sua_curtain_sleep | cats | sua_curtain | đỉnh |  | 5 |
| l4v6_sua_split_sheet | 1651,195,297,620 | sua_curtain_sulk | cats | sua_curtain | đỉnh |  | 5 |
| l4v6_suitcase_sheet | 32,208,834,580 | l4_suitcase_full | level4 | suitcase | đáy | rộng 435 | 5 |
| l4v6_suitcase_sheet | 875,501,641,268 | l4_suitcase_folded | level4 | suitcase | đáy |  | 5 |
| l4v6_suitcase_sheet | 875,501,641,268 | l4_stack_suitcase | level4 |  | đáy | rộng 235 | 5 |
| l4v8_books_sheet | 54,93,809,362 | l4_book_stack | level4 |  | đáy | rộng 190 | 5 |
| l4v8_books_sheet | 92,465,366,486 | l4_book_single | level4 |  | tâm | rộng 85 | 5 |
| l4v8_books_sheet | 626,466,315,485 | l4_book_single_mint | level4 |  | tâm | rộng 73 | 5 |
| l4v8_books_sheet | 1150,458,314,491 | l4_book_single_yellow | level4 |  | tâm | rộng 73 | 5 |
| l4v8_shelf_sheet | 89,33,592,958 | l4_bookshelf_full | level4 | shelf | đáy | rộng 400 | 5 |
| l4v8_shelf_sheet | 855,33,592,958 | l4_bookshelf_after | level4 | shelf | đáy |  | 5 |
| l4v9_sock_sheet | 332,222,925,602 | l4_sock_flat | level4 |  | đáy | rộng 170 | 5 |
| l4v12b_player_sheet | 108,81,857,1383 | player_reach_up | player |  | đáy | cao 500 | 5 |
| fx_dust_sheet | 38,185,750,704 | fx_dust_puff | common |  | tâm | rộng 300 | 3 |
| fx_dust_sheet | 772,325,761,464 | fx_dust_puff_b | common |  | tâm | rộng 305 | 3 |

---

## 6. Ghi chú cho lập trình (không cần đưa Codex)

- **Lớp** theo `states-01-10.md` Level 4. Phòng khách: nền → cửa sổ → rèm → Sữa trên rèm → sofa → tháp (dưới lên) → nhân vật → Sữa dưới sàn → túi đồ → giao diện.
- **Sữa trên rèm:** neo = điểm bám, đặt vào **điểm bám trên rèm** (bảng dưới). Đổi tư thế không dịch chỗ. `sua_curtain_sulk` 2 giây rồi về tư thế cũ.
- **Tháp:** code đặt `l4_stack_mattress` neo đáy tại chỗ xếp, mỗi món sau neo đáy tại **mặt trên** món trước (Art ghi chiều cao từng món sau khi cắt). Nhân vật neo đáy tại mặt trên gối.
- **Lộn vòng:** `sua_curl_spin` xoay quanh tâm theo cung từ điểm bám xuống điểm tiếp đất, rồi `sua_land` → `sua_lick_paw` cùng neo đáy.
- **Sách domino:** 6–8 bản `l4_book_single` (code tô màu) rơi `fly_arc` từ các tầng kệ xuống chỗ chồng sách.

**Bảng vị trí** (A4-21: đo trên 3 demo chủ dự án duyệt Vòng 5; ±10px). **Chân tường theo đúng demo** (G4-27, bỏ G4-16): phòng khách ≈1000, phòng ngủ ≈905, phòng làm việc ≈770; toạ độ đồ 3 phòng lấy đúng trên demo. Điểm neo trên khung phòng 1024x1536; `Rộng demo` = bề rộng phần vẽ. Giao diện (mũi tên, túi, 💡) do code đặt chung, không theo demo (G4-17).

| Key | X | Y | Cảnh | Rộng demo |
|---|---|---|---|---|
| l4_window | 518 | 640 | khách | 230 |
| l4_curtain | 355 | 148 | khách | 610 |
| sua_curtain_banana | 265 | 165 | khách |  |
| l4_sofa | 780 | 1080 | khách | 620 |
| l4_stack_mattress | 318 | 1140 | khách lộ | 295 |
| player_reach_up | 340 | 857 | khách lộ |  |
| sua_lick_paw | 470 | 1170 | khách lộ |  |
| l4_mattress_standing | 128 | 975 | ngủ | 258 |
| l4_mattress_fallen | 245 | 1075 | ngủ | 460 |
| l4_bedside_lamp | 318 | 985 | ngủ | 160 |
| l4_sock_stuck | 320 | 682 | ngủ | 80 |
| l4_bed | 700 | 1035 | ngủ | 600 |
| l4_pillow | 522 | 835 | ngủ | 175 |
| l4_teddy | 760 | 1165 | ngủ | 220 |
| l4_bookshelf_full | 297 | 890 | việc | 400 |
| l4_book_stack | 160 | 1110 | việc | 190 |
| l4_desk | 758 | 895 | việc | 487 |
| l4_suitcase_full | 348 | 1190 | việc | 435 |
| l4_yoga_ball | 806 | 1018 | việc | 357 |
| l4_spill_duck_ring | 605 | 1172 | việc lộ | 150 |
| l4_spill_shirt | 390 | 1010 | việc lộ | 150 |
| l4_spill_slipper | 530 | 1030 | việc lộ | 90 |
| l4_spill_goggles | 230 | 1000 | việc lộ | 100 |

- `sua_curtain_banana` neo = điểm bám (hai bàn chân trước) giữa tấm rèm, ngay dưới thanh rèm. Sữa nhỏ như demo (treo dài ~200).
- **Cỡ nhân vật** (GD Vòng 5): `player_reach_up` cao **~500** như level 1–3 (to hơn demo 4f ~420). Đặt chân trên mặt gối; nếu tay vượt quá chân Sữa thì code hạ cụm tháp + nhân vật hoặc nâng Sữa theo số đo thật.
- **Tháp (A4-28, đo sau khi cắt):** cao từng món (hiển thị): đệm 81, vali 88, sách 99, gối 59. Xếp: đệm đáy (318, 1140) → món sau đặt đáy tại **đỉnh món trước + chồng mép** (đệm→vali +14, vali→sách +14, sách→gối +10, gối→nhân vật +8, để món trên ngồi lên mặt trên món dưới): đáy vali 1072, đáy sách 997, đáy gối 908, chân nhân vật 857, đầu ngón tay ≈ 357 (ngay dưới chân Sữa ≈ 364). Ảnh kiểm: `art/out/_check/l4_climax_vs_demo.jpg`. Vùng thả = khung tháp nới 100px.
- **Phòng ngủ (G4-31, G4-32):** `l4_mattress_standing` dịch trái (128, 975), mép trái ≈0 (phòng ngủ ở ngoài cùng bên trái, không có phòng bên). **Lớp: đệm dựng nằm SAU tủ đầu giường** (thứ tự vẽ: đệm dựng → tủ đầu giường + đèn → giường → gối → gấu); mép phải đệm (≈257) khuất sau tủ (x 238–398).
- **Tất trên giường (G4-39):** dùng lại `l4_sock_stuck` (xoay vòng lúc bay, đáp trên chăn); `l4_sock_flat` (tờ `l4v9_sock_sheet`) giữ ảnh nhưng không dùng.
- **Phòng làm việc:** toạ độ đúng demo (G4-27). Bóng yoga neo **tâm**. Tất (`l4_sock_stuck`) neo đỉnh = nếp gập, đặt ở mép trên chao đèn (320, 682).
- **Chồng sách và 4 chỗ rơi đồ bung** (A4-35, theo D4-33; neo đáy, trên thanh túi y 1183): `l4_book_stack` (160, 1110; G4-41, trước là 1170) **vẽ lớp TRÊN vali** (đè góc trước-trái vali đầy, thấy trọn); 3 cuốn trong chồng **từ dưới lên: vàng bơ (`l4_book_single_yellow`), bạc hà (`l4_book_single_mint`), hồng (`l4_book_single`)**. Đồ bung: kính (230, 1000), áo (390, 1010), dép (530, 1030), phao (605, 1172); không đè kệ, bàn, bóng, chồng sách.

---

## 7. Ảnh demo

Tranh dựng cảnh 1024x1536, không dùng trong game, lưu ở `art/out/demo/`, để chủ dự án duyệt không khí, màu, tỉ lệ. Vẽ đúng bố cục mục 2 và bảng vị trí mục 6, đồ đúng mô tả mục 5, **chỉ chứa key có thật**. Mỗi lượt đính kèm (tối đa 5 ảnh): `art/ref/owner_l1_style_ref.png`, `demo/l3_demo_reveal.png` (túi đồ, cùng camera), và ảnh tham chiếu nhân vật cần dùng.
- `l4_demo_living`: phòng khách **lúc cao trào**: cửa sổ + rèm hồng đào, **Sữa treo kiểu quả chuối** dưới thanh rèm; **tháp đã xếp** đệm → vali → chồng sách → gối ngay dưới rèm; **nhân vật đứng trên gối kiễng chân với tay**, đầu ngón tay sát chân Sữa; sofa bạc hà bên phải. Mũi tên ◄ và ►. Giao diện: ♥ + 4 vòng (3 vòng tô), ⏸, túi đồ 4 ô trống, 💡.
- `l4_demo_bedroom`: phòng ngủ lúc đầu: đệm dựng tựa tường, bàn đầu giường + đèn ngủ (chưa có tất), giường + gối, **gấu bông trắng ngồi** trước chân giường. Mũi tên ►. Giao diện như trên (túi trống).
- `l4_demo_study`: phòng làm việc lúc đầu: kệ sách đầy, bàn làm việc, **vali căng phồng**, **bóng yoga tím**. Mũi tên ◄. Giao diện như trên.
