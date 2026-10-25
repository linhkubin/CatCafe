# Design Art – Level 2: Giỏ tất

> Đọc kèm `style.md`. Bút chì màu, pastel tươi (O3), nét mảnh đậm nhạt (O5), cute, tối giản, **không chữ**.
>
> **Phòng:** Phòng ngủ, buổi trưa. **Mèo:** Sữa (theo `cats/sua_ref.png`). **Ý chính:** Sữa trắng ngủ lẫn trong giỏ tất trắng; cả phòng rải rác đồ trắng tròn trông như mèo cuộn tròn. Chạm giỏ 3 lần, mỗi lần một chiếc tất bay ra, lần 3 lộ Sữa cuộn ngủ.

Áp dụng mọi quy tắc đã chốt ở Level 1 (`art/review/level1-thread.md`, `art/design-art-level1.md`): vẽ theo tờ (bảng tờ V14), đặt tên V23, cột Nét theo công thức cuối, vùng chạm ≥ 115px (code nới vùng chạm nếu hình nhỏ hơn), neo theo công cụ, `anchors.json`. Chuẩn art: tranh demo `demo/l2_demo_start.png`, `demo/l2_demo_reveal.png` (sau khi chủ dự án duyệt) và tranh level 1.

---

## 1. Danh sách key

Hiển thị = cỡ trong game trên khung 1024x1536. TS = trong suốt.

| Key | Thư mục | Hiển thị | Nền | Neo | Tờ (nhóm) |
|---|---|---|---|---|---|
| `l2_bg_bedroom` | level2 | 1024x1536 | Có nền | góc trên trái | ảnh lẻ (mục 4) |
| `l2_sock_basket_full` | level2 | rộng 260 | TS | đáy | `l2_basket_sheet` (basket) |
| `l2_sock_basket_2` | level2 | theo nhóm | TS | đáy | `l2_basket_sheet` (basket) |
| `l2_sock_basket_3` | level2 | theo nhóm | TS | đáy | `l2_basket_sheet` (basket) |
| `l2_sock_basket_reveal` | level2 | theo nhóm | TS | đáy | `l2_basket_sheet` (basket) |
| `l2_sock_basket_one_eye` | level2 | theo nhóm | TS | đáy | `l2_basket_sheet` (basket), thay `sua_one_eye_open` |
| `l2_sock_basket_yawn` | level2 | theo nhóm | TS | đáy | `l2_basket_sheet` (basket), thay `sua_yawn` |
| `l2_sock_striped` | level2 | rộng 120 | TS | tâm | `l2_socks_sheet` |
| `l2_sock_dotted` | level2 | rộng 120 | TS | tâm | `l2_socks_sheet` |
| `l2_sock_white_big` | level2 | rộng 170 | TS | tâm | `l2_socks_sheet` |
| `l2_sock_star` | level2 | rộng 120 | TS | tâm | `l2_socks_sheet` (G2-8) |
| `l2_sock_baby` | level2 | rộng 80 | TS | tâm | `l2_socks_sheet` (G2-8) |
| `l2_sock_long` | level2 | cao 200 | TS | tâm | `l2_socks_sheet` (G2-8) |
| `l2_sock_ball` | level2 | rộng 180 | TS | đáy | `l2_socks_sheet` |
| `l2_sock_unrolled` | level2 | rộng 320 | TS | đáy | `l2_socks_sheet` |
| `l2_plush_cat` | level2 | cao 170 | TS | đáy | `l2_decoy_sheet` |
| `l2_plush_cat_fallen` | level2 | rộng 200 | TS | đáy | `l2_decoy_sheet` |
| `l2_coat_hook` | level2 | rộng 170 | TS | đỉnh | `l2_decoy_sheet` |
| `l2_beanie_white_idle` | level2 | rộng 170 | TS | đỉnh | `l2_decoy_sheet` |
| `l2_beanie_white_floor` | level2 | rộng 180 | TS | đáy | `l2_decoy_sheet` |
| `l2_chair` | level2 | rộng 200 | TS | đáy | `l2_chair_sheet` |
| `l2_sweater_rolled` | level2 | rộng 190 | TS | đáy | `l2_chair_sheet` |
| `l2_sweater_unrolled` | level2 | rộng 210 | TS | đỉnh (mép đặt lên mặt ghế) | `l2_chair_sheet` |
| `l2_slippers_cat_idle` | level2 | rộng 220 | TS | đáy | `l2_chair_sheet` (slippers) |
| `l2_slippers_cat_after` | level2 | theo nhóm | TS | đáy | `l2_chair_sheet` (slippers) |
| `l2_bed_blanket_flat` | level2 | rộng 580 | TS | đáy | `l2_bed_sheet` (bed) |
| `l2_bed_blanket_flipped` | level2 | theo nhóm | TS | đáy | `l2_bed_sheet` (bed) |
| `l2_duster_peek` | level2 | cao 120 | TS | đỉnh (gốc lông) | `l2_wardrobe_sheet` (G2-9) |
| `l2_duster` | level2 | rộng 260 | TS | đáy | `l2_wardrobe_sheet` (G2-9) |
| `l2_wardrobe_closed` | level2 | rộng 330 | TS | đáy | `l2_wardrobe_sheet` (wardrobe) |
| `l2_wardrobe_open` | level2 | theo nhóm | TS | đáy | `l2_wardrobe_sheet` (wardrobe) |
| `l2_shoebox_ears` | level2 | rộng 170 | TS | đáy | `l2_props_sheet` (shoebox, G2-7) |
| `l2_shoebox_open` | level2 | theo nhóm | TS | đáy | `l2_props_sheet` (shoebox, G2-7) |
| `l2_beanie_pink_cat` | level2 | rộng 120 | TS | đáy | `l2_props_sheet` (G2-7) |
| `l2_curtain_tie` | level2 | cao 150 | TS | đỉnh | `l2_props_sheet` (G2-7) |
| `l2_ceiling_lamp` | level2 | cao 330 | TS | đỉnh (đầu dây) | `l2_lamp_sheet` (tờ cũ của tủ, giữ nguyên) |
| `l2_curtain_closed` | level2 | rộng 470 | TS | đỉnh | `l2_curtain_sheet` (curtain) |
| `l2_curtain_open` | level2 | theo nhóm | TS | đỉnh | `l2_curtain_sheet` (curtain) |
| `player_wear_beanie` | player | cao 700 (gồm mũ và quai; người cao ~580) | TS | đáy | `player_beanie_sheet` (một ô) |

**Dùng lại, không vẽ:** `sua_run`, `sua_face_icon`, `sua_held`, `player_hands_lift`, `player_call`, `player_scratch_head`, `player_surprised`, `player_shrug`, mọi `ui_*`, `fx_pop`, `prop_butterfly` (nếu cần). Không cần `sua_tail_peek`.

**G2-7 (thêm đánh lừa):** gầm giường thò `l2_duster_peek` (túm lông như đuôi mèo, G2-9) → kéo ra `l2_duster` (cây chổi lông; thay thảm lông `l2_fur_rug*` đã bỏ); hộp giày `l2_shoebox_ears` (hai tai mèo thò lên) → `l2_shoebox_open` + `l2_beanie_pink_cat` nảy lên rồi rơi lại vào hộp; dây buộc rèm `l2_curtain_tie` thò xuống như đuôi mèo; chăn lật không có gì (chỉ gối trắng); tủ mở chỉ thấy quần áo gấp.

**Đổi tên so với states cũ:** `sua_one_eye_open` → `l2_sock_basket_one_eye`, `sua_yawn` → `l2_sock_basket_yawn`: Sữa cuộn trong giỏ vẽ liền với giỏ (cùng khung với `_reveal`), đổi ảnh không giật.

**Đồ ngụy trang trắng** (`l2_plush_cat`, `l2_beanie_white_idle`, `l2_sock_ball`, `l2_slippers_cat_idle`, `l2_sweater_rolled`, cục phồng trong `l2_bed_blanket_flat`): **trắng ấm cùng tông lông Sữa** (#FFFAF0, vân chì như `sua_ref`), tròn mập, **cùng cỡ với Sữa cuộn tròn** (khoảng 180–200 hiển thị), cùng chất nét lông xù. Nhìn kỹ mới thấy là đồ vật (cúc áo, đường khâu, quả bông, cổ tất, cổ tay áo). Sữa trong giỏ (`_full`, `_2`, `_3`) vẽ **cùng màu, cùng nét với tất**, chỉ lộ rất mờ đường cong lưng và một tai.

---

## 2. Bố cục phòng (theo `levels-01-10.md` Level 2)

```
┌──────────────────────────────┐  y 0–130: giao diện
│ ♥Sữa ●○○○                ⏸  │
│ [MÓC+MŨ LEN]  [CHAO ĐÈN]     │  móc (150,175), chao đèn treo từ trần (512,0)
│ ┌────────┐      ┌hộp giày┐   │
│ │ RÈM    │      ┌────────┐   │  rèm trên trái: mép trên (240,330); tủ phải: đáy (815,960)
│ │cửa sổ  │      │  TỦ    │   │  hộp giày trên nóc tủ (815,315)
│ └────────┘      │ QUẦN ÁO│   │
│ [KỆ: mèo bông]  │        │   │  kệ trong nền, mèo bông đáy ở (200,820)
│ ┌───────────┐   └────────┘   │  chân tường y≈960
│ │ GIƯỜNG    │   [GHẾ+áo len] │  giường dưới trái: đáy (310,1250); ghế (820,1220)
│ └───────────┘                │
│ [DÉP tai mèo]  [GIỎ][CUỘN]   │  dép (170,1390); giỏ (640,1395); cuộn tất (880,1330)
│                          💡  │  x>880, y>1400: nút 💡
└──────────────────────────────┘
```

- Camera chung: chính diện, nhìn xuống ~15°, sáng từ cửa sổ trên trái, nét chì đổ bóng bên phải đồ vật. Không bóng sàn (code vẽ).
- Đầu giường ở **bên trái** (sát tường trái); gầm giường tối nhẹ tím oải hương.
- 8% trên cùng tường trơn, 8% dưới cùng sàn trơn.

### 2b. Bối cảnh và góc nhìn từng đồ (O2-10)

**Một camera chung** (`style.md` mục 2b): chính diện, nhìn xuống ~15°, cạnh ngang nằm ngang, cạnh đứng thẳng đứng, mặt trên chỉ là dải mỏng, không 3/4, không xoay chéo; sáng từ cửa sổ trên trái, nét chì đổ bóng bên phải. Mọi đồ đặt sát tường sau, mặt trước song song tường.

**Bối cảnh:** phòng ngủ nhỏ buổi trưa, một bức tường sau phẳng chạy ngang cả khung (không thấy tường bên, không góc phòng). Tường hồng phấn rất nhạt gần kem (#FBE6E2), mịn như tường kem level 1. Chân tường gỗ mật ong y≈960; sàn gỗ mật ong, ván ngang dài như level 1; thảm chữ nhật bạc hà nhạt nằm ngang (cạnh trên, dưới song song mép khung). Cửa sổ trên trái có thanh rèm. Nét viền nâu ấm mảnh, đậm nhạt; vân chì mịn; pastel tươi nhẹ như level 1.

Tỉ lệ lấy **giường** làm chuẩn (rộng 580, cao kể cả đầu giường ~300 hiển thị):

| Đồ | Góc nhìn và mặt thấy | Tỉ lệ (hiển thị) | Chất liệu, màu |
|---|---|---|---|
| Giường | Nhìn ngang dọc thân giường, khung chữ nhật thẳng; đầu giường cao bên **trái**, chân giường thấp bên phải; nệm + chăn là dải dày nằm ngang, mặt trên chăn chỉ là dải mỏng; gò tròn (gối dưới chăn) nhô lên khỏi đường chăn | rộng 580, cao ~300 | Gỗ mật ong, núm tròn trên trụ; chăn xanh trời nhạt mịn; gối trắng ấm |
| Tủ quần áo | Mặt trước chữ nhật đứng, 2 cánh song song, 2 núm tròn; nóc là dải mỏng; dải hông hẹp bên phải; 4 chân ngắn chạm sàn ở y≈960 | rộng 330, cao ~1,1 lần bề ngang giường chia 2 (~640) | Gỗ mật ong viền, cánh kem |
| Hộp giày (nóc tủ) | Cùng góc với tủ: mặt trước chữ nhật, nắp dải mỏng, hông dải hẹp bên phải | rộng ~1/2 tủ (170) | Bạc hà, nắp kem, hình giày đơn giản |
| Ghế | Nhìn thẳng mặt trước: lưng tựa chữ nhật đứng với 3 thanh dọc, mặt ghế là dải ngang mỏng, chân thẳng đứng | rộng 200, mặt ghế cao ngang nệm giường | Gỗ mật ong |
| Áo len cuộn (trên ghế) | Khối tròn dẹt nằm giữa mặt ghế, nhìn ngang | rộng ~190 (bằng Sữa cuộn) | Trắng ấm, vân len chì |
| Giỏ tất | Thân giỏ nhìn ngang, miệng là elip dẹt (cao ~1/5 bề ngang), tất ụ lên trên miệng | rộng 260 | Mây đan gỗ mật ong; tất trắng ấm + vài chiếc màu |
| Cuộn tất, dép tai mèo, mèo bông, mũ len | Nhìn ngang chính diện, đáy phẳng nằm trên sàn/kệ | ~180–220 (bằng Sữa cuộn tròn) | Trắng ấm như lông Sữa, vân chì mịn |
| Móc + mũ len | Thanh gỗ nằm ngang trên tường, móc nhô thẳng ra; mũ treo thẳng | thanh rộng 170 | Gỗ mật ong; mũ trắng ấm 2 quả bông |
| Kệ + sách + chậu cây | Tấm kệ là dải ngang mỏng, sách đứng thẳng | rộng ~400 | Trong nền |
| Đèn chao | Treo thẳng đứng từ giữa trần, chao chuông nhìn ngang, miệng chao elip dẹt | cao 330 | Vàng bơ nhạt (không đậm hơn rèm) |
| Rèm | Hai tấm vải buông thẳng, mép trên ngang | rộng 470 | Vàng bơ nhạt, như chất rèm level 1 |

---

## 3. Quy tắc tờ

Như `design-art-level1.md` mục 3: tờ 1536x1024 (hoặc 1024x1536), nền trong suốt, mỗi ô một thứ, cách mép ô ≥ 40px, cùng tỉ lệ thật trong tờ, trạng thái cùng nhóm giống hệt phần không đổi và cùng đường đáy. **Cột Nét** = viền ngoài ở chỗ đậm nhất (px trong tờ), phần lớn viền ~60%, đầu nét nhọn; Nét = 3k với đồ vật/UI, 2,5k với mèo/nhân vật, không dưới 2k. Giao việc kèm `--stroke-ref art/out/cats/sua_ref.png=<0,6 × Nét ÷ 5>` và ảnh cắt cận từ tranh demo đã duyệt (đính kèm bằng `-i`). AI hay vẽ to hơn ô: vẽ xong đo khung, sửa ô cho khớp rồi cắt lại.

---

## 4. Ảnh lẻ

| File (trong art/out/) | Key | Kích thước | Nền | Mô tả |
|---|---|---|---|---|
| `level2/l2_bg_bedroom.png` | `l2_bg_bedroom` | 1024x1536 | Có nền | Nền phòng ngủ (mô tả dưới) |

### `l2_bg_bedroom` — Nền phòng ngủ
- Sửa từ tranh `demo/l2_demo_start.png` (như nền level 1): giữ phòng, xoá mọi đồ là sprite riêng và mọi UI, vẽ liền phần bị che. **Không người, không mèo.**
- **Tường** hồng phấn nhạt trơn. **Cửa sổ dời xuống** (so với tranh demo) để có chỗ cho móc mũ len ở y≈270: cửa sổ trên trái x≈60–500, y≈450–780, khung gỗ trắng kem, kính xanh trời có mây, bệ trống; thanh treo rèm gỗ ở y≈430. Không rèm, không móc mũ.
- **Trần:** một móc nhỏ ở (512, 0) để treo đèn; không vẽ đèn.
- **Kệ treo tường** gỗ caramel dưới cửa sổ (x≈200–600, y≈850), trên có 2 cuốn sách gáy trơn, một chậu cây leo nhỏ và chỗ trống cho mèo bông.
- **Sàn** gỗ mật ong từ chân tường y≈960, vài nét ván ngang; một **thảm chữ nhật xanh bạc hà** trước giường.
- Để trống chỗ của: móc + mũ, tủ + hộp giày, giường, ghế, giỏ, cuộn tất, dép (đều là sprite).

---

## 5. Các tờ và mô tả từng ảnh

### 5.1 Tờ `l2_basket_sheet` — Giỏ tất (1536x1024, tham chiếu `sua_ref`)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l2_basket_sheet | 0,0,522,512 | l2_sock_basket_full | level2 | basket | đáy | rộng 260 | 5 |
| l2_basket_sheet | 522,0,502,512 | l2_sock_basket_2 | level2 | basket | đáy |  | 5 |
| l2_basket_sheet | 1024,0,512,512 | l2_sock_basket_3 | level2 | basket | đáy |  | 5 |
| l2_basket_sheet | 0,512,522,512 | l2_sock_basket_reveal | level2 | basket | đáy |  | 5 |
| l2_basket_sheet | 522,512,502,512 | l2_sock_basket_one_eye | level2 | basket | đáy |  | 5 |
| l2_basket_sheet | 1024,512,512,512 | l2_sock_basket_yawn | level2 | basket | đáy |  | 5 |

**Chuẩn theo demo đã duyệt:** Giỏ mây gỗ mật ong nhạt, thân nhìn ngang, miệng elip dẹt, đan ô vuông đơn giản. Tất trắng ấm cuộn tròn ụ lên trên miệng; ở `_full` lộ 4 chiếc màu: sọc hồng (vắt ngoài mép trước), chấm bi xanh (vắt mép phải), vàng có ngôi sao (nằm trên), sọc tím (góc phải trên).

Lưới 3x2, cùng một giỏ ở cùng chỗ trong ô. Giỏ mây tròn thấp caramel, đan vài đường chéo đơn giản, 2 quai nhỏ.
- `_full`: **đầy ụ** tất, chủ yếu tất trắng ấm cuộn tròn, trên cùng lộ vài chiếc màu: sọc hồng, chấm bi xanh, vàng ngôi sao, sọc tím dài. Giữa đống tất trắng là **Sữa cuộn tròn ngủ, lẫn hẳn vào tất**: KHÔNG thấy mặt, mắt, tai rõ; nhìn kỹ chỉ thấy một khối tròn trắng hơi to hơn các cuộn tất, cùng màu cùng nét.
- `_2` (sau lần chạm 2): đống tất thấp xuống một chút, **mất chiếc sọc hồng và chiếc chấm bi**; Sữa vẫn lẫn hẳn.
- `_3` (sau lần chạm 4): thấp hơn nữa, **mất thêm chiếc vàng ngôi sao và chiếc sọc tím**; chỉ còn tất trắng, khối tròn Sữa rõ hơn một chút (thấy mờ 2 tai và đuôi, vẫn không thấy mặt).
- `_reveal` (sau lần chạm 6): chiếc tất trắng to phía trên đã bay đi; **Sữa lộ rõ** (đúng `sua_ref`), cuộn tròn ngủ say giữa vài chiếc tất trắng: mắt nhắm cong, mũi hồng, má hồng, đuôi bông quấn quanh mũi, một chân trước duỗi ra mép giỏ.
- `_one_eye`: y hệt `_reveal`, chỉ **hé một mắt** (xanh, lòng đen to) nhìn ra, mắt kia nhắm, vẻ lười.
- `_yawn`: y hệt `_reveal`, **miệng há to ngáp** thấy lưỡi hồng, mắt nhắm chặt, chân trước duỗi.

### 5.2 Tờ `l2_socks_sheet` — Tất (1536x1024, G2-8)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l2_socks_sheet | 0,190,268,476 | l2_sock_striped | level2 |  | tâm | rộng 120 | 8 |
| l2_socks_sheet | 268,190,248,476 | l2_sock_dotted | level2 |  | tâm | rộng 120 | 8 |
| l2_socks_sheet | 516,60,348,620 | l2_sock_white_big | level2 |  | tâm | rộng 170 | 7 |
| l2_socks_sheet | 864,190,244,476 | l2_sock_star | level2 |  | tâm | rộng 120 | 8 |
| l2_socks_sheet | 1108,390,176,276 | l2_sock_baby | level2 |  | tâm | rộng 80 | 9 |
| l2_socks_sheet | 1284,20,252,660 | l2_sock_long | level2 |  | tâm | cao 200 | 8 |
| l2_socks_sheet | 0,680,470,344 | l2_sock_ball | level2 |  | đáy | rộng 180 | 7 |
| l2_socks_sheet | 470,700,1066,324 | l2_sock_unrolled | level2 |  | đáy | rộng 320 | 8 |

**Chuẩn theo demo đã duyệt:** Màu nhạt như tranh: sọc hồng phấn, xanh trời nhạt chấm trắng, vàng bơ nhạt ngôi sao kem, sọc tím oải hương nhạt; cuộn tất trắng ấm nằm cạnh giỏ.

Bố cục: hàng trên 6 chiếc tất bay đứng cạnh nhau, cùng tỉ lệ thật (tất em bé nhỏ xíu, tất trắng to gấp đôi, tất dài dài gấp rưỡi); hàng dưới cuộn tất trắng và chiếc tất bung dài.
- `l2_sock_striped`: tất cổ ngắn, 4 sọc ngang to hồng đào xen kem, mũi và gót hồng đào, hơi cong như đang bay.
- `l2_sock_dotted`: tất cổ cao xanh da trời, 6 chấm tròn trắng to, hơi cong.
- `l2_sock_white_big`: tất len trắng ấm to gấp đôi, cổ xù, mềm, vắt cong (để vắt lên núm tủ).
- `l2_sock_star`: tất vàng bơ, giữa thân có một **ngôi sao** trắng kem to, mũi gót vàng đậm hơn.
- `l2_sock_baby`: tất em bé **nhỏ xíu** màu xanh bạc hà, cổ bo, mũi tròn.
- `l2_sock_long`: tất **dài** đến gối, sọc ngang **tím oải hương** xen kem, cong mềm.
- `l2_sock_ball` 🎭: cuộn tất trắng ấm tròn như mèo con cuộn ngủ, cỡ bằng Sữa cuộn tròn; một đầu cổ tất thò ra như đuôi ngắn; nhìn kỹ thấy nếp gấp cổ tất, gót tất. Không mặt.
- `l2_sock_unrolled`: cùng chiếc tất bung ra thành một chiếc tất dài thượt nằm ngang, hơi uốn cong.

### 5.3 Tờ `l2_decoy_sheet` — Mèo bông, móc, mũ len (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l2_decoy_sheet | 0,0,610,590 | l2_plush_cat | level2 |  | đáy | cao 170 | 8 |
| l2_decoy_sheet | 0,590,610,434 | l2_plush_cat_fallen | level2 |  | đáy | rộng 200 | 8 |
| l2_decoy_sheet | 610,120,700,300 | l2_coat_hook | level2 |  | đỉnh | rộng 170 | 7 |
| l2_decoy_sheet | 610,420,420,604 | l2_beanie_white_idle | level2 |  | đỉnh | rộng 170 | 7 |
| l2_decoy_sheet | 1030,560,506,464 | l2_beanie_white_floor | level2 |  | đáy | rộng 180 | 7 |

**Chuẩn theo demo đã duyệt:** Mèo bông: trắng ấm ngồi, mắt 2 cúc áo nâu, vá tim hồng trên chân. Thanh móc: gỗ mật ong nằm ngang, **3 núm gỗ tròn**; mũ len trắng kem treo ở núm trái, 2 quả bông ở hai bên đỉnh như tai.

- `l2_plush_cat` 🎭: mèo nhồi bông trắng ấm ngồi, tròn như Sữa, nhưng rõ là đồ chơi: mắt là 2 cúc áo nâu, đường khâu chỉ dọc bụng và quanh cổ, miếng vá trái tim hồng trên chân.
- `l2_plush_cat_fallen`: cùng con mèo bông nằm ngửa dưới sàn, bốn chân giơ lên, mắt cúc nhìn lên.
- `l2_coat_hook`: thanh gỗ caramel nhỏ gắn tường, 2 móc tròn nhô ra; mép trên thẳng (neo).
- `l2_beanie_white_idle` 🎭: mũ len trắng ấm treo (đỉnh mũ ở trên, móc treo khuất), tròn trịa, **2 quả bông len nhỏ trên đỉnh như hai tai mèo**, vành gấp một vòng, vài nét len; không mặt.
- `l2_beanie_white_floor`: cùng chiếc mũ nằm nghiêng dưới sàn, hơi xẹp, hai quả bông rủ sang một bên.

### 5.4 Tờ `l2_chair_sheet` — Ghế, áo len, dép tai mèo (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l2_chair_sheet | 0,0,452,1024 | l2_chair | level2 |  | đáy | rộng 200 | 6 |
| l2_chair_sheet | 452,60,478,440 | l2_sweater_rolled | level2 |  | đáy | rộng 190 | 7 |
| l2_chair_sheet | 452,494,489,530 | l2_sweater_unrolled | level2 |  | đỉnh | rộng 210 | 7 |
| l2_chair_sheet | 930,100,606,400 | l2_slippers_cat_idle | level2 | slippers | đáy | rộng 220 | 6 |
| l2_chair_sheet | 941,500,595,524 | l2_slippers_cat_after | level2 | slippers | đáy |  | 6 |

**Chuẩn theo demo đã duyệt:** Ghế gỗ mật ong nhìn thẳng mặt trước: lưng tựa có thanh ngang cong trên đỉnh và **3 thanh dọc**, mặt ghế dải ngang mỏng, 4 chân thẳng. Áo len trắng kem cuộn nằm giữa mặt ghế, thấy cổ tay áo bo. Dép bông trắng tai mèo (trong tai hồng), không có mắt, nhìn chính diện hơi từ trên.

- `l2_chair`: ghế gỗ nhỏ caramel, lưng tựa tròn, mặt ghế trống.
- `l2_sweater_rolled` 🎭: áo len trắng ấm cuộn tròn như mèo cuộn ngủ (đặt trên mặt ghế), thấy cổ tay áo bo và vân len; không mặt.
- `l2_sweater_unrolled`: cùng áo bung ra vắt trên mặt ghế, hai tay áo thõng xuống như hai chân trước; mép trên phẳng (neo, đặt lên mặt ghế).
- `l2_slippers_cat_idle` 🎭: đôi dép bông trắng ấm sát nhau, mũi tròn mập, mỗi chiếc có 2 tai mèo nhọn bo đầu (trong hồng) và 2 chấm mắt thêu nâu.
- `l2_slippers_cat_after`: cùng đôi dép, một chiếc lật nghiêng, tai cụp.

### 5.5 Tờ `l2_bed_sheet` — Giường và dép hồng (1024x1536)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l2_bed_sheet | 0,40,1024,524 | l2_bed_blanket_flat | level2 | bed | đáy | rộng 580 | 5 |
| l2_bed_sheet | 0,564,1024,520 | l2_bed_blanket_flipped | level2 | bed | đáy |  | 5 |

**Chuẩn theo demo đã duyệt:** Giường nhìn ngang thân: đầu giường gỗ mật ong cao bên trái (trụ tròn núm), chân giường thấp bên phải; gối trắng ấm bên trái; chăn xanh trời nhạt, **một gò tròn**. Gầm giường trong suốt (chổi lông thò ra là sprite riêng ở tờ tủ).

- `l2_bed_blanket_flat` 🎭: giường đơn gỗ caramel nằm ngang, **đầu giường tròn bên trái**, chân ngắn; chăn xanh da trời phủ kín, **giữa chăn MỘT gò tròn duy nhất, nổi rõ, cỡ Sữa cuộn tròn** (gối trắng nằm dưới); **gầm giường trong suốt** (không bóng, không mảng tối; thấy sàn nền; góc thảm lông là sprite riêng). 4 chân thẳng đứng cùng phối cảnh khung (O2-12, O2-13).
- `l2_bed_blanket_flipped`: cùng giường, chăn lật gập về phía chân giường, lộ **một chiếc gối trắng tròn** (chính là cục phồng). Không mèo.

### 5.6 Tờ `l2_wardrobe_sheet` — Cặp tủ quần áo và chổi lông (1536x1024, O2-22, G2-9)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l2_wardrobe_sheet | 0,0,550,800 | l2_wardrobe_closed | level2 | wardrobe | đáy | rộng 330 | 4 |
| l2_wardrobe_sheet | 550,0,670,800 | l2_wardrobe_open | level2 | wardrobe | đáy |  | 4 |
| l2_wardrobe_sheet | 1220,0,316,800 | l2_duster_peek | level2 |  | đỉnh | cao 120 | 8 |
| l2_wardrobe_sheet | 0,800,1536,224 | l2_duster | level2 |  | đáy | rộng 260 | 7 |

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l2_lamp_sheet | 1166,150,370,874 | l2_ceiling_lamp | level2 |  | đỉnh | cao 330 | 5 |

Bố cục: hai tủ đứng cạnh nhau ở 3/4 trái (cùng cỡ, cùng đường đáy y≈760), túm lông thò ra ở cột phải, chổi lông nằm ngang ở dải dưới cùng. `l2_lamp_sheet` là ảnh tờ tủ cũ (chỉ lấy đèn), không vẽ lại.

**Cặp tủ (O2-22) — hai ảnh là CÙNG MỘT tủ:** cùng khung, cùng cỡ, cùng góc hơi nghiêng ngang (mặt trước chữ nhật đứng + **một dải hông hẹp bên phải** + nóc là dải mỏng), cùng nóc, cùng 4 chân ngắn, cùng đường đáy.
- `l2_wardrobe_closed`: khung gỗ mật ong nhạt, 2 cánh kem đóng sát nhau ở giữa, 2 núm gỗ tròn cạnh khe giữa; nóc dải mỏng gỗ; dải hông phải gỗ mật ong hơi sẫm hơn; 4 chân ngắn thẳng.
- `l2_wardrobe_open`: **y hệt thân tủ đóng** (khung, nóc, dải hông, chân trùng khít vị trí), chỉ khác: **hai cánh mở ra hai bên** (mỗi cánh thấy mặt trong kem, núm ở mép ngoài, cánh mở nhìn hẹp lại vì xoay ra), lộ lòng tủ gỗ nhạt với **4 ngăn kệ ngang, quần áo gấp vuông vức** từng chồng màu pastel nhạt (vàng, hồng, bạc hà, xanh trời, kem). Không mèo.
- Hộp giày trên nóc (`l2_props_sheet`) đã khớp góc nóc này: giữ nguyên góc nhìn tủ.

**Chổi lông (G2-9):** lông chổi **giống đuôi Sữa**: trắng kem ấm, lông bông xù mềm, nét chì như đuôi trong `sua_ref`.
- `l2_duster_peek` 🎭: chỉ **túm lông trắng dài, cong như đuôi mèo** thò ra, đầu túm tròn bông; **gốc cắt phẳng ở mép trên** (neo đỉnh, khuất dưới mép giường); không thấy cán.
- `l2_duster`: cả cây chổi lông quét bụi **nằm ngang trên sàn**: cán gỗ mật ong dài thẳng (bên trái, có lỗ treo nhỏ ở đuôi cán), đầu lông trắng bông dài (bên phải), đúng túm lông ở ô trên; đáy phẳng (neo đáy).

### 5.6b Tờ `l2_props_sheet` — Hộp giày, mũ tai mèo hồng, dây buộc rèm (1536x1024, G2-7)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l2_props_sheet | 0,0,542,496 | l2_shoebox_ears | level2 | shoebox | đáy | rộng 170 | 7 |
| l2_props_sheet | 542,0,500,512 | l2_shoebox_open | level2 | shoebox | đáy |  | 7 |
| l2_props_sheet | 1042,0,494,512 | l2_beanie_pink_cat | level2 |  | đáy | rộng 120 | 8 |
| l2_props_sheet | 0,496,542,528 | l2_curtain_tie | level2 |  | đỉnh | cao 150 | 8 |

**Chuẩn theo demo đã duyệt:** **Hộp giày phải khớp đúng góc nhìn và độ nghiêng của tủ** (tủ nhìn hơi nghiêng ngang: thấy mặt trước + một dải hông bên phải + nóc dải mỏng): hộp thấy mặt trước chữ nhật bạc hà nhạt có hình giày kem, **một dải hông bên phải cùng độ rộng tương đối với hông tủ**, nắp kem là dải mỏng song song với nóc tủ; hai tai và nắp hé theo cùng phối cảnh. Không vẽ phẳng 2D. `_ears`: nắp hé, hai tai mèo hồng nhạt (trong tai hồng đậm hơn) thò lên. Dây buộc rèm: túm bông trắng như chóp đuôi mèo.

- `l2_shoebox_ears` 🎭: hộp giày chữ nhật thấp bạc hà, nắp kem **hé lệch**, từ khe hở **hai tai mèo nhọn màu hồng nhạt** thò lên (là tai của chiếc mũ bên trong). Trên nắp hình chiếc giày đơn giản, không chữ.
- `l2_shoebox_open`: cùng hộp, **nắp mở dựng phía sau**, lòng hộp trống (mũ là sprite riêng).
- `l2_beanie_pink_cat`: chiếc mũ len **hồng nhạt có hai tai mèo** nhọn, vành gấp, vài nét len (khác hẳn mũ len trắng 2 quả bông).
- `l2_curtain_tie` 🎭: một dây buộc rèm bông **trắng ấm, dài, xù, cong mềm** thò xuống như **đuôi mèo** (đầu dưới tròn bông); đầu trên là vòng dây phẳng (neo, buộc vào rèm đóng).

### 5.7 Tờ `l2_curtain_sheet` — Rèm (1536x1024)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l2_curtain_sheet | 0,0,768,1024 | l2_curtain_closed | level2 | curtain | đỉnh | rộng 470 | 5 |
| l2_curtain_sheet | 768,0,768,1024 | l2_curtain_open | level2 | curtain | đỉnh |  | 5 |

**Chuẩn theo demo đã duyệt:** Rèm vàng bơ rất nhạt, hai tấm buông thẳng, nếp dọc mềm, gấu hơi lượn, khoen gỗ tròn ở mép trên.

Không vẽ thanh treo (trong nền). Vệt nắng chiếu vào giỏ do code vẽ.
- `l2_curtain_closed`: hai tấm rèm **vàng bơ** kéo kín, gặp nhau đúng giữa, 6–8 khoen tròn ở mép trên, vài nếp dọc.
- `l2_curtain_open`: cùng rèm dồn hai bên, buộc dải vải trắng kem; giữa trống.

### 5.8 Tờ `player_beanie_sheet` — Nhân vật đội mũ (1024x1536, tham chiếu `player_ref`)

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| player_beanie_sheet | 0,0,1024,1536 | player_wear_beanie | player |  | đáy | cao 700 | 4 |

**Chuẩn theo demo đã duyệt:** Nhân vật như tranh: tóc xoăn bồng nâu, áo len vàng nhạt, quần xanh trời nhạt, dép bông vàng trơn.

- `player_wear_beanie`: đúng nhân vật `player_ref` (tóc xoăn bồng), **đội chiếc mũ len trắng** của `l2_beanie_white_idle` (2 quả bông như tai mèo, tóc xoăn lòi ra quanh vành), hai tay chống hông, cười tinh nghịch, nháy một mắt như đang làm mèo.

---

## 6. Ghi chú cho lập trình

- **Thứ tự vẽ:** nền (sửa từ `l2_demo_start`) → giỏ → tất → mèo bông/mũ → ghế/áo/dép → giường + thảm lông → tủ/đèn → hộp giày/mũ hồng/dây rèm → rèm → nhân vật đội mũ. 10 lượt Codex.
- **G2-7:** túm lông `l2_duster_peek` đặt dưới lớp giường ở mép gầm (ve vẩy nhẹ quanh neo đỉnh); chạm → nhân vật kéo ra `l2_duster` nằm trên sàn cạnh giường, `player_scratch_head`. Hộp giày `_ears` → `_open` + `l2_beanie_pink_cat` `hop` lên rồi rơi lại vào hộp. Dây buộc rèm `l2_curtain_tie` treo trên rèm đóng, chạm → `swing`; khi rèm mở thì ẩn. Chăn lật: nhân vật `player_shrug`.
- **Giỏ tất (G2-8):** chạm 6 lần, giỏ tĩnh (không thở). Ảnh đổi ở lần 2 (`_2`), lần 4 (`_3`), lần 6 (`_reveal`); lần lẻ chỉ tất bay ra + giỏ nảy nhẹ. Lộ diện: `_reveal` → `_one_eye` (0,8 giây) → `_yawn` (0,8 giây) → `_reveal` + `zzz` + `glow_outline`. Vùng chạm Sữa ở `_reveal`: vẽ tay đa giác quanh Sữa.
- **6 chiếc tất bay ra** (`fly_arc`) và nằm yên: sọc hồng → đầu giường, chấm bi → vành chao đèn, trắng to → núm tủ, ngôi sao → lưng ghế, em bé → kệ cạnh mèo bông, sọc tím dài → thanh rèm (thứ tự theo states).
- **Áo len:** `l2_sweater_rolled` (neo đáy) đặt trên mặt ghế; `_unrolled` neo đỉnh đặt đúng mép mặt ghế.
- **Mũ len:** `l2_beanie_white_idle` neo đỉnh treo ngay dưới móc; rơi → `l2_beanie_white_floor`, nhân vật trồi lên với `player_wear_beanie` 1,2 giây.
- **Đèn:** quả lắc như level 1: `swing` quanh đầu dây (neo đỉnh).
- Không có `sua_one_eye_open` / `sua_yawn` riêng (đã gộp vào giỏ). Dev sửa states Level 2 theo key mục 1.

**Bảng vị trí** (điểm neo trên khung 1024x1536, dòng trên nằm dưới; Dev đo lại theo tranh demo đã duyệt `demo/l2_demo_start.png` (vòng 5). `sock_target_N` là tâm chiếc tất thứ N khi đáp. Không có dòng thì code tính theo ảnh: hộp giày trên nóc tủ, áo len giữa mặt ghế, chỗ tất đáp (mặt giường, sàn, thảm, kệ, mặt ghế), dây buộc rèm thò dưới gấu rèm trái. `l2_duster_peek` neo gốc lông, khuất sau khung giường. Cỡ hiển thị trong game nhân thêm hệ số `SIZE_K` trong `game/src/level2.js` để khớp bề rộng từng đồ trong tranh demo):

| Key | X | Y | Cảnh |
|---|---|---|---|
| l2_ceiling_lamp | 512 | 0 | |
| l2_coat_hook | 619 | 232 | |
| l2_beanie_white_idle | 586 | 250 | |
| l2_beanie_white_floor | 180 | 1425 | |
| l2_wardrobe_closed | 862 | 990 | |
| l2_plush_cat | 401 | 650 | |
| l2_plush_cat_fallen | 185 | 872 | |
| l2_bed_blanket_flat | 321 | 990 | |
| l2_duster_peek | 225 | 945 | |
| l2_duster | 330 | 1085 | |
| l2_chair | 881 | 1060 | |
| l2_slippers_cat_idle | 175 | 1330 | |
| l2_sock_basket_full | 775 | 1320 | |
| l2_curtain_closed | 260 | 226 | |
| player_call | 500 | 1520 | đầu |

---

## 7. Ảnh demo

- `demo/l2_demo_start.png`: mọi đồ ở trạng thái đầu, nhân vật khum tay gọi ở dưới giữa, bong bóng nhiệm vụ (bóng đầu mèo tối, dấu hỏi trắng) cạnh nhân vật. Sữa lẫn trong giỏ tất (gần như không thấy).
- `demo/l2_demo_reveal.png`: 3 chiếc tất đã bay ra nằm ở đầu giường / vành chao đèn / núm tủ; giỏ lộ Sữa cuộn ngủ hé một mắt; bong bóng nhỏ góc trên trái thành mặt Sữa.
