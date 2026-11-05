# Design Art – Level 8: Tắm cho Mun

> Đọc kèm `style.md`. Bút chì màu, pastel nhạt theo `art/ref/owner_l1_style_ref.png` (O6), nét mảnh đậm nhạt (O5), cute, tối giản, **không chữ** (kể cả trên chai dầu tắm).
>
> **Trạng thái (2026-10-31):** chủ dự án đã **duyệt 3 demo**. Đang ở bước 5: tách asset theo demo. **Vị trí và cỡ theo demo, chốt ở A8-7 + trả lời Dev 2 (mục 4.6); số trong 4.1–4.4 là số bản khối cũ, chỉ giữ cho mô tả.**

Nguồn: `levels/levels-01-10.md`, `levels/states-01-10.md` mục Level 8 (chốt G8-1 → G8-10); thread `art/review/level8-thread.md` (mục "Dev 2 → Art 2D 2" là nguồn số liệu); bản khối `game/src/level8.js`.

Áp dụng mọi quy tắc đã chốt: góc nhìn chung (`style.md` 2b), màu O6, tách theo demo (G4-22, G4-26, G5-23), cỡ file ≈ 1,5 lần cỡ hiển thị, cắt sát (QUY-TRINH mục 6, G5-34, G5-35), khung 9:16 và nền rộng đủ 3:4 (G-SCREEN). Mọi lượt Codex: model **gpt-6.1-sol, mức medium** (chủ dự án chốt).

Toạ độ trong file này là **khung thế giới 1024x1536** (vùng chơi). Trên màn 9:16 khung game 1024x1820, vùng chơi bắt đầu ở y 142. Nền 1366x2304 thì vùng chơi nằm ở x 171, y 384.

---

## 1. Bối cảnh

- **Phòng tắm nhà nhân vật, buổi sáng sau đêm bão L7.** Một cảnh cố định. Sạch, sáng, ấm, yên: nắng sớm vàng bơ nhạt chiếu xiên từ trên trái.
- **Bố cục:**
  - Giữa phòng: **ghế nhựa thấp** (đáy (512, 1302)), Mun ngồi trên mặt ghế (đáy Mun y 1110), Mun chiếm phần lớn giữa màn.
  - Tường phải: **móc vòi sen** (868, 548), **vòi sen treo** (868, 640) đầu sen quay sang trái về phía Mun; **van trộn** (890, 1010); ống mềm nối van → đuôi tay cầm vòi sen (code vẽ).
  - Tường trái: **thanh treo khăn** (150, 628), **khăn bông hồng vắt** (150, 752).
  - Sàn (chân tường y ≈ 1250): **lỗ thoát nước** (735, 1322), **vịt cao su** (đáy (300, 1322)); vũng nước loang quanh chân ghế (code).
  - Đáy màn: khay đồ cầm tay (túi đồ chung) căn giữa, ngay trên dải banner.
- **Nền yên:** chỉ là phòng trống. Mọi món kể trên là sprite riêng (luật tách nền và đồ). Không đồ trang trí sau lưng Mun.
- **Tương phản:** Mun đen than ấm (#3E3838) nên tường sau Mun sáng, nhạt (kem / xanh da trời rất nhạt). Lông Mun vẫn mềm, có vân chì, không đen kịt.

## 2. Dùng lại / vẽ mới (QUY-TRINH mục 6)

| Món | Quyết định | Lý do |
|---|---|---|
| Nền `l8_bg_bathroom` | **Vẽ mới** (G8-1) | Chưa có nền phòng tắm; tường gạch men + sàn gạch khác hẳn phòng L4. Phòng trống 1366x2304; đường trần, chân tường, sàn theo khung `l4_bg_bedroom` để đồng bộ nhà nhân vật |
| Khay dụng cụ | Dùng lại `ui_bag_bar` + `ui_bag_slot` (G8-1) | Như túi đồ |
| Giao diện, cá khô, sparkle, bàn chân gợi ý, cảnh bế chung | Dùng lại `common/` | — |
| Ống mềm, tia nước, vũng nước, vòng tiến độ, vòng gợi ý, hạt, bong bóng bay, hơi nước | **Code vẽ** | G8-5, G8-6 |
| Tai Mun giật | **Code** (dấu động cạnh tai), không tách tai | Dev 2 đề xuất, Art đồng ý (A8-5) |
| Còn lại (mục 4) | Vẽ mới | Đồ riêng của màn |

**Bỏ:** `l8_tub_back`, `l8_tub_front`, `l8_foam`, `l8_millet_clump*`, `l8_icon_mun_dirty`, `l8_oil_streak`, `mun_bath_shake`, `mun_bath_headshake`, `ui_tool_tray`.

## 3. Góc nhìn và chất liệu chung

Theo khối CAMERA (`style.md` 2b), mẫu sofa L1: hơi trực diện, mắt cao hơn đồ một chút, nhìn xuống nhẹ, ánh sáng trên trái.
- **Phòng:** tường sau nhìn thẳng, ron gạch ngang dọc thẳng; sàn gạch, ron ngang nằm ngang, ron dọc chụm rất nhẹ về giữa.
- **Ghế nhựa:** mặt ngồi là elip rõ (mặt trên), 4 chân thẳng hơi xoè, không xoay chéo.
- **Đồ gắn tường** (móc, van, thanh khăn): nhìn thẳng, thấy chút mặt trên và độ dày; đồ tường phải thấy dải hông trái rất hẹp, đồ tường trái thấy dải hông phải rất hẹp.
- **Đồ trên sàn** (lỗ thoát nước, vịt): lỗ là elip dẹt; vịt thấy lưng.
- **Dụng cụ trong khay:** nằm ngang hoặc gần vuông (code co cạnh dài nhất = 116), dáng đặc trưng rõ, thấy chút mặt trên.
- **Mun:** ngồi nhìn thẳng ra người chơi, đối xứng, như dáng ngồi trong `mun_ref` (mặt tròn G5-32, mắt vàng mật ong, tai hơi cụp).

## 4. Danh sách key

Hiển thị = cỡ trong game (bản khối). File ≈ 1,5 lần. TS = trong suốt.

### 4.1 Nền và đồ trong cảnh

| Key | Hiển thị | File ≈ | Neo | Vị trí | Mô tả |
|---|---|---|---|---|---|
| `l8_bg_bathroom` | 1366x2304 | 1366x2304, có nền | — | vùng chơi ở (171, 384) | Phòng trống. Tường: gạch men vuông to (~110 px) **kem ấm**, nửa dưới tường (từ y ≈ 900) gạch **xanh da trời rất nhạt**, viền nẹp gạch ngang mảnh ở chỗ giao; ron kem trắng ấm. Chân tường y ≈ 1250. Sàn gạch vuông **kem caramel rất nhạt**, ron mảnh. Cửa sổ nhỏ kính mờ trên cao tường trái-giữa (x ≈ 300, y ≈ 250, không lẫn với thanh khăn), nắng sớm vàng bơ chiếu xiên một vệt mờ xuống tường. Trên và dưới vùng chơi: tường và sàn kéo dài tự nhiên; hai bên: tường kéo dài, không đồ |
| `l8_stool_plastic` | 260x200 | 390x300 | giữa đáy | (512, 1302); mặt ghế y ≈ 1102–1140 | Ghế nhựa tắm thấp: mặt ngồi tròn mập (elip rõ), 4 chân ngắn hơi xoè bo tròn đầu, **xanh bạc hà nhạt**, mặt ngồi trơn có 3 lỗ tròn nhỏ ở giữa (bị Mun che phần lớn). Mun ngồi tràn mặt ghế, chân ghế lộ bên dưới |
| `l8_shower_hook` | 70x60 | 105x90 | tâm | (868, 548) | Giá móc gắn tường: đế tròn nhỏ trắng ấm, móc chữ U ngửa đỡ cổ vòi sen |
| `l8_shower_mixer` | 120x80 | 180x120 | tâm | (890, 1010) | Van trộn gắn tường: đế bầu dục trắng ấm, tay gạt tròn mập, **đầu nối ống ở giữa đáy** (ống mềm code vẽ từ đây). Không vạch, chữ, chấm đỏ/xanh |
| `l8_towel_rack` | 220x40 | 330x60 | tâm | (150, 628) | Thanh gỗ mật ong tròn, hai đế gắn tường tròn caramel nhạt ở hai đầu. Trống |
| `l8_floor_drain` | 90x40 | 135x60 | tâm | (735, 1322) | Elip dẹt xám nâu rất nhạt, nắp 3 khe ngang |
| `l8_duck` | 110x92 | 165x140 | giữa đáy | (300, 1322) | Vịt cao su vàng bơ, mỏ hồng đào (không cam), mắt chấm nâu, cánh nhỏ nhô; nhìn sang phải về phía Mun |

### 4.2 Lớp phủ trên Mun (code đặt, nhạt dần, bám theo Mun)

Vẽ riêng từng món, nền trong suốt, nhìn hơi từ trên như nằm trên lông. Toạ độ là tâm trong khung thế giới.

| Key | Hiển thị | File ≈ | Neo | Đặt ở | Mô tả |
|---|---|---|---|---|---|
| `l8_leaf_a` | 86x56 | 130x84 | tâm | đỉnh đầu (512, 628) | Lá khô bầu tròn, vàng mật ong / caramel nhạt, gân giữa, cuống cong |
| `l8_leaf_b` | 80x60 | 120x90 | tâm | lưng (592, 850) | Lá 3 thùy tròn (kiểu lá phong mềm), caramel nhạt |
| `l8_leaf_c` | 90x54 | 135x81 | tâm | hông (392, 972) | Lá dài thuôn, mép hơi quăn, vàng bơ ngả caramel |
| `l8_leaf_d` | 76x52 | 114x78 | tâm | chân sau (642, 1068) | Lá nhỏ bầu dục, hồng đào nhạt ngả caramel |
| `l8_twig_a` | 130x60 | 195x90 | tâm | lưng (455, 828) | Cành khô nhỏ chẻ 2 nhánh, gỗ caramel, đầu bo tròn, 1–2 mắt cành |
| `l8_twig_b` | 110x80 | 165x120 | tâm | đuôi (718, 905) | Cành khô cong, một nhánh phụ ngắn, gỗ caramel nhạt |
| `l8_burr` | 124x104 | 186x156 | tâm | đuôi và đỉnh đầu, **cả hai 100%** (GD 2 chốt sau demo) | Chùm 5 quả ké tròn dính nhau, gai mềm ngắn bo tròn đầu, xanh lá nhạt ngả caramel |
| `l8_mud_patch_a` | 140x92 | 210x138 | tâm | lưng (560, 880) | Mảng bùn khô **caramel #D6A472** (mảng sáng trên lông đen, G8-1), mép loang tròn, 3–4 vết nứt mảnh nâu, vân chì |
| `l8_mud_patch_b` | 108x74 | 162x111 | tâm | chân trước (452, 1042) | Như trên, ôm theo chân |
| `l8_mud_patch_c` | 118x80 | 177x120 | tâm | chân sau (628, 1036) | Như trên |
| `l8_oil_drop` | rộng 30 (cao ≈ 43) | 45x65 | tâm | 5 chỗ dọc sống lưng: x 420/466/512/558/604, y 886/874/870/874/886, xoay −8/−4/0/4/8° | **Giọt dầu đầu nhọn hướng lên, đáy tròn** (G8-10), vàng bơ rất nhạt trong veo, viền caramel mảnh, một chấm sáng kem |
| `l8_foam_bubble_a` | Ø 30 | 45x45 | tâm | code rải lưới 44 px trên elip thân (512, 935; 185 × 160), chừa mặt | Bọt xà phòng tròn trắng ấm, viền lavender rất nhạt, một chấm sáng; có thể vẽ 2 bọt nhỏ dính nhau |
| `l8_foam_bubble_b` | Ø 44 | 66x66 | tâm | như trên | Như trên, cỡ vừa, thoáng ánh cầu vồng pastel rất nhạt ở mép |
| `l8_foam_bubble_c` | Ø 60 | 90x90 | tâm | như trên | Cụm 3 bọt dính nhau (1 to, 2 nhỏ) |

### 4.3 Dụng cụ

Khay chỉ chứa đồ cầm tay (G8-3). Code co cạnh dài nhất của dụng cụ trong khay = 116 (ô 136), kéo lên to 1,3 lần, nên vẽ **gần vuông hoặc dài ngang**. Hai cặp dễ nhầm phải khác hẳn dáng: lược thưa (răng thưa, gỗ) ≠ lược chải (lông mềm dày); khăn mặt (nhỏ, vuông, xanh) ≠ khăn bông (to, vắt, hồng).

| Key | Hiển thị | File ≈ | Neo | Mô tả |
|---|---|---|---|---|
| `l8_tool_comb_wide` | 150x150 khối (khay 116) | 225x225 | tâm | Lược thưa gỗ caramel nằm ngang, sống lược dày bo tròn, 6 răng to thưa bo đầu |
| `l8_tool_facecloth` | 150x150 (116) | 225x225 | tâm | Khăn mặt nhỏ gấp vuông 2 lớp, **xanh da trời nhạt**, mép viền kem, 2 giọt nước nhỏ |
| `l8_tool_sponge` | 150x150 (116) | 225x225 | tâm | Bông tắm lưới tròn xù, **hồng đào nhạt**, quai dây nhỏ |
| `l8_tool_shampoo` | 150x150 (116) | 225x225 | tâm | Chai dầu tắm tròn mập **hồng phấn**, nắp bấm trắng ấm, nhãn chỉ có hình 3 bọt + 1 giọt nước, **không chữ** |
| `l8_tool_dryer` | 150x150 (116) | 225x225 | tâm | Máy sấy tóc tròn mập **xanh bạc hà**, miệng thổi ngắn quay **sang trái**, cán thẳng xuống, dây cụt |
| `l8_tool_brush` | 150x150 (116) | 225x225 | tâm | Lược chải lông: mặt bầu dục gỗ mật ong, lông mềm kem dày, cán ngắn nằm ngang |
| `l8_tool_shower` | 150x150 (treo và kéo, kéo 105%) | 225x225 | tâm | Vòi sen cầm tay trắng ấm: **đầu sen tròn to quay sang trái** (mặt lỗ hướng trái-xuống, 7 lỗ chấm xanh da trời), tay cầm chéo xuống phải, **đuôi tay cầm có khâu nối ống**. Không vẽ ống. Hai điểm Dev cần (so với tâm ảnh, ở cỡ hiển thị): đầu vòi (−25, −45), đuôi tay cầm (+35, +25); Art đo lại trên ảnh thật và ghi vào bảng neo |
| `l8_tool_towel` | 170x230 (kéo 105%) | 255x345 | tâm | Khăn bông to **hồng phấn** dày vắt đôi, hai vạt rủ so le, 2 sọc kem to ở mép dưới, mép trên ôm tròn chỗ vắt (khớp thanh, không vẽ thanh). Cùng màu, cùng sọc với khăn quấn `mun_bath_towel` |

### 4.4 Mun (9 dáng + phần tách)

**Khung chung 440x520 hiển thị** (file 660x780), neo giữa đáy, đặt (512, 1110) = mặt ghế. Mọi dáng cùng tâm ngang, cùng đường đáy (mông và bàn chân trước trên mặt ghế), cùng cỡ đầu theo bảng Dev. Không có chậu che: bốn chân, bàn chân, mông thấy rõ.

Số đo theo bản khối (trong khung 440x520, từ góc trên trái; "thân" = tâm y, bán kính ngang × dọc; "đầu" = tâm y, bán kính). Art vẽ theo dáng, không cần khít tròn, nhưng **mắt, cằm, đường đáy** phải gần các số này để lớp phủ và mí mắt đặt đúng:

| Dáng | Thân | Đầu | Mắt | Đuôi |
|---|---|---|---|---|
| `mun_bath_dirty` | 340, 165 × 170 | 150, 105 | mở tròn | `tail_dirty` |
| `mun_bath_wet` | 352, 108 × 162 | 178, 86 | mở tròn, to | `tail_wet` |
| `mun_bath_foam` | như `wet` | như `wet` | híp cong | `tail_wet` |
| `mun_bath_sneeze` | như `wet` | như `wet` | nhắm tịt, nhăn mũi | `tail_wet` |
| `mun_bath_towel` | như `dirty` (khăn quấn tròn) | 150, 105 | lim dim | không (trong khăn) |
| `mun_bath_fluffy` | 318, 205 × 192 | 140, 120 | mở tròn | `tail_fluffy` |
| `mun_bath_sleek` | 335, 150 × 178 | 148, 100 | mở tròn | `tail_sleek` |
| `mun_bath_lick` | như `sleek`, chân sau giơ thẳng, đầu cúi liếm đùi (G8-11) | — | nhắm | `tail_sleek` |
| `mun_bath_tongue` | thân và chân giơ y hệt `lick`, đầu ngẩng nhìn thẳng, lưỡi thè (G8-11) | — | tròn ngơ | `tail_sleek` |

Tâm hai mắt: giữa đầu ±0,38 × bán kính đầu, cao hơn tâm đầu 6 px.

| Key | Mô tả |
|---|---|
| `mun_bath_dirty` | Ngồi co ro, tai cụp, mắt tròn dè chừng. Lông **xù rối, bết từng túm**, vài vệt bụi xám kem nhạt. Không vẽ lá, cành, ké, bùn (lớp phủ riêng) |
| `mun_bath_wet` | **Gầy nhẳng**: lông bết sát người, thân thon, cổ nhỏ, đầu nhỏ hơn hẳn nhưng mắt vẫn to tròn → mắt to gấp đôi, ngơ ngác. Lông bết thành vệt dọc, vài giọt nước xanh da trời nhạt ở mép lông. Điểm cười số 1 |
| `mun_bath_foam` | Như `wet`, tai dựng lại, mắt híp cong dễ chịu, miệng ω. **Không vẽ bọt** |
| `mun_bath_sneeze` | Như `wet`, mắt nhắm tịt >< , mũi nhăn, miệng há hắt xì, đầu hơi giật lên |
| `mun_bath_towel` | Quấn kín trong khăn bông hồng phấn (cùng khăn `l8_tool_towel`, thấy 2 sọc kem), chỉ thò mặt và hai tai; mắt lim dim, má dụi vào mép khăn |
| `mun_bath_fluffy` | **Cục bông đen tròn xoe**: lông phồng hết cỡ thành quả cầu xù mềm, chỉ thấy hai mắt vàng to, tai nhỏ, bàn chân trước tí hon. Điểm cười số 2 |
| `mun_bath_sleek` | Lông mượt bóng, ngồi thẳng ưỡn ngực, tai dựng, mắt vàng tự hào; 2–3 vệt bóng kem ánh lavender trên lưng và đầu |
| `mun_bath_lick` | (G8-11) Lông như `sleek`, ngồi bệt, **một chân sau giơ thẳng lên trời**, đầu cúi liếm đùi trong, mắt nhắm, lưỡi thè |
| `mun_bath_tongue` | Như `lick` nhưng khựng giữa chừng, đầu ngẩng nửa, lè lưỡi hồng đào, mắt tròn ngơ |

**Phần tách (trả đề xuất Dev 2, A8-5):**

| Key | Hiển thị | Neo | Mô tả |
|---|---|---|---|
| `mun_bath_tail_dirty` | ≈ 130x200 | gốc đuôi | Đuôi xù rối bết túm, cong lên phía phải |
| `mun_bath_tail_wet` | ≈ 90x200 | gốc đuôi | Đuôi bết mảnh như sợi dây, cong nhẹ |
| `mun_bath_tail_fluffy` | ≈ 150x200 | gốc đuôi | Đuôi phồng như cây chổi lông |
| `mun_bath_tail_sleek` | ≈ 110x200 | gốc đuôi | Đuôi mượt, cong chữ S, chóp hơi vểnh |
| `mun_bath_blink` | rộng ≈ 90 (ở đầu bán kính 100) | tâm | Đôi mắt nhắm (hai đường cong ⌒ nâu ấm) trên **mảng lông than ấm** hình hạt đậu, mép mềm có vân chì để đè khít mắt mở. Một ảnh dùng chung, code co theo bán kính đầu |

- Thân 9 dáng vẽ **không đuôi** trừ `towel` (đuôi trong khăn). Gốc đuôi ở bên phải mông, gần (220 + bán kính ngang thân, tâm thân + 60) trong khung; Art ghi toạ độ gốc đuôi từng dáng vào bảng neo khi tách.
- Đuôi vẽ chung tờ với dáng tương ứng, cùng tỉ lệ, cùng màu lông.
- **Bảng neo dáng (Dev 2 xin, ghi khi tách):** mỗi dáng thân một dòng: tâm mắt trái, tâm mắt phải, chỗ đặt gốc đuôi (toạ độ trong khung 440x520). Mỗi ảnh đuôi: điểm gốc đuôi trong ảnh. Vòi sen: đầu vòi, đuôi tay cầm.
- Tai: không tách (code vẽ dấu động).

### 4.5 Icon và bong bóng

| Key | Thư mục | Hiển thị | File ≈ | Neo | Mô tả |
|---|---|---|---|---|---|
| `l8_icon_mun_clean` | level8 | rộng 150 | 225x225 | tâm | Mặt Mun sạch bóng (như `sleek`), tai dựng, mắt vàng, 2 sparkle vàng bơ; trong bong bóng nhiệm vụ, quanh có vài bọt (bọt code hoặc vẽ liền, chốt khi tách) |
| `ui_emote_mun_happy` | common | 150x130 | 225x195 | giữa đáy, đặt (668, 600) | Bong bóng thoại nhỏ trắng ấm, đuôi nhọn ngắn ở giữa đáy; trong là mặt Mun vui: mắt cong híp, miệng ω, má hồng, tai dựng |
| `ui_emote_mun_no` | common | 150x130 | 225x195 | giữa đáy | Cùng bong bóng; mặt Mun nhăn: mắt nhắm >< , miệng méo, tai cụp. Không dấu X, không chữ |

### 4.6 Tách theo demo (chốt A8-7, Dev 2 đồng ý 2026-10-31)

- **Đặt theo demo**, toạ độ trong khung thế giới 1024x1536 = `art/out/demo/l8_demo_stage<N>_play.png`. Trên ảnh trình 9:16 `l8_demo_stage<N>.png` (1080x1920): x × 1,0547, (y + 142) × 1,0547.
- Mốc phòng: tường kem tới y 770, gờ 770–790, gạch xanh 790–1090, chân tường 1090–1120, sàn từ 1120.
- **Mun:** khung chung 520x580, neo giữa đáy (512, 1060). **Ghế** neo giữa đáy (514, 1300), 460x280. Vật con trên Mun lưu **lệch so với neo Mun**.
- Emote (668, 520); vòng tiến độ (792, 566). Lỗ thoát nước lớp 2 (dưới vũng).
- Đuôi vẽ dư ~20 px phần gốc chui dưới mông. Không thêm ảnh hạt.
- Neo chính: `art/out/anchors.json` (sheet_cut ghi). **Điểm phụ** (toạ độ px trong file ảnh đã cắt) ghi ở bảng "Điểm phụ" dưới đây sau khi cắt.

Số đo lại trên ảnh cắt sát (2026-10-31): đế giữ vòi `l8_shower_hook` 40x40 tâm (917, 370); `l8_tool_shower` 145x247 tâm (897, 508), mặt sen ≈ (875, 450) quay trái-xuống, khâu nối ống ≈ (952, 628); van 130x93 tâm (900, 898); lá a (492, 537), lá b (622, 820), lá c (363, 925), lá d (630, 1022); cành a (415, 822), cành b (725, 885); ké đầu (531, 580), ké đuôi (752, 940); bùn a (542, 862), b (447, 975), c (612, 975); thân Mun dirty đỉnh đầu y 565, đáy 1060.

**Bảng tờ** (mỗi món một ảnh Codex `art/out/_sheets/l8src_<key>.png`, Ô = cả ảnh; tờ Mun 2 ô; Hiển thị = cỡ trên demo):

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l8src_l8_mirror | 0,0,1338,1175 | l8_mirror | level8 |  | tâm | rộng 296 | 5 |
| l8src_l8_towel_rack | 0,0,1495,1052 | l8_towel_rack | level8 |  | tâm | rộng 290 | 5 |
| l8src_l8_tool_towel | 0,0,1024,1536 | l8_tool_towel | level8 |  | tâm | rộng 230 | 5 |
| l8src_l8_shower_hook | 0,0,1254,1254 | l8_shower_hook | level8 |  | tâm | rộng 40 | 5 |
| l8src_l8_tool_shower | 0,0,1024,1536 | l8_tool_shower | level8 |  | tâm | cao 247 | 5 |
| l8src_l8_shower_mixer | 0,0,1536,1024 | l8_shower_mixer | level8 |  | tâm | rộng 130 | 5 |
| l8src_l8_stool_plastic | 0,0,1536,1024 | l8_stool_plastic | level8 |  | đáy | rộng 460 | 5 |
| l8src_l8_floor_drain | 0,0,1983,793 | l8_floor_drain | level8 |  | tâm | rộng 148 | 5 |
| l8src_l8_duck | 0,0,1254,1254 | l8_duck | level8 |  | đáy | rộng 190 | 5 |
| l8src_l8_leaf_a | 0,0,1536,1024 | l8_leaf_a | level8 |  | tâm | rộng 115 | 5 |
| l8src_l8_leaf_b | 0,0,1254,1254 | l8_leaf_b | level8 |  | tâm | rộng 95 | 5 |
| l8src_l8_leaf_c | 0,0,1254,1254 | l8_leaf_c | level8 |  | tâm | rộng 97 | 5 |
| l8src_l8_leaf_d | 0,0,1536,1024 | l8_leaf_d | level8 |  | tâm | rộng 100 | 5 |
| l8src_l8_twig_a | 0,0,1536,1024 | l8_twig_a | level8 |  | tâm | rộng 150 | 5 |
| l8src_l8_twig_b | 0,0,1254,1254 | l8_twig_b | level8 |  | tâm | rộng 60 | 5 |
| l8src_l8_burr | 0,0,1254,1254 | l8_burr | level8 |  | tâm | rộng 100 | 5 |
| l8src_l8_mud_patch_a | 0,0,1254,1254 | l8_mud_patch_a | level8 |  | tâm | rộng 125 | 5 |
| l8src_l8_mud_patch_b | 0,0,1254,1254 | l8_mud_patch_b | level8 |  | tâm | rộng 85 | 5 |
| l8src_l8_mud_patch_c | 0,0,1254,1254 | l8_mud_patch_c | level8 |  | tâm | rộng 75 | 5 |
| l8src_l8_tool_comb_wide | 0,0,1536,1024 | l8_tool_comb_wide | level8 |  | tâm | rộng 150 | 5 |
| l8src_l8_oil_drop | 0,0,1024,1536 | l8_oil_drop | level8 |  | tâm | rộng 30 | 5 |
| l8src_l8_foam_bubble_a | 0,0,1254,1254 | l8_foam_bubble_a | level8 |  | tâm | rộng 30 | 5 |
| l8src_l8_foam_bubble_b | 0,0,1254,1254 | l8_foam_bubble_b | level8 |  | tâm | rộng 44 | 5 |
| l8src_l8_foam_bubble_c | 0,0,1254,1254 | l8_foam_bubble_c | level8 |  | tâm | rộng 60 | 5 |
| l8src_l8_tool_facecloth | 0,0,1254,1254 | l8_tool_facecloth | level8 |  | tâm | rộng 150 | 5 |
| l8src_l8_tool_sponge | 0,0,1254,1254 | l8_tool_sponge | level8 |  | tâm | rộng 150 | 5 |
| l8src_l8_tool_shampoo | 0,0,1024,1536 | l8_tool_shampoo | level8 |  | tâm | cao 150 | 5 |
| l8src_l8_tool_dryer | 0,0,1254,1254 | l8_tool_dryer | level8 |  | tâm | rộng 150 | 5 |
| l8src_l8_tool_brush | 0,0,1536,1024 | l8_tool_brush | level8 | l8_tool_brush | 773,519 | rộng 150 | 5 |
| l8src_l8_tool_brush_down | 0,0,1536,1024 | l8_tool_brush_down | level8 | l8_tool_brush | 773,519 |  | 5 |
| l8src_l8_icon_mun_clean | 0,0,1254,1254 | l8_icon_mun_clean | level8 |  | tâm | rộng 150 | 5 |
| l8src_ui_emote_mun_happy | 0,0,1254,1254 | ui_emote_mun_happy | common | emote | đáy | rộng 150 | 5 |
| l8src_ui_emote_mun_no | 0,0,1254,1254 | ui_emote_mun_no | common | emote | đáy |  | 5 |
| l8src_mun_bath_blink | 0,0,1536,1024 | mun_bath_blink | cats |  | tâm | rộng 100 | 4 |
| l8_mun_sheet_a | 0,0,768,1024 | mun_bath_dirty | cats | mun_bath_a | đáy | cao 495 | 6 |
| l8_mun_sheet_a | 768,0,768,1024 | mun_bath_towel | cats | mun_bath_a | đáy |  | 6 |
| l8_mun_sheet_b | 0,0,768,1024 | mun_bath_wet | cats | mun_bath_b | đáy | cao 464 | 6 |
| l8_mun_sheet_b | 768,0,768,1024 | mun_bath_foam | cats | mun_bath_b | đáy |  | 6 |
| l8src_mun_bath_sneeze | 0,0,768,1024 | mun_bath_sneeze | cats | mun_bath_b | đáy |  | 6 |
| l8src_mun_bath_fluffy | 0,0,1536,1024 | mun_bath_fluffy | cats |  | đáy | cao 468 | 6 |
| l8_mun_sheet_c | 830,0,706,1024 | mun_bath_sleek | cats | mun_bath_c | đáy | cao 471 | 6 |
| l8_mun_sheet_d | 0,0,896,1024 | mun_bath_lick | cats | mun_bath_c | đáy |  | 6 |
| l8_mun_sheet_d | 896,0,896,1024 | mun_bath_tongue | cats | mun_bath_c | đáy |  | 6 |
| l8src_mun_bath_tail_dirty | 0,0,1536,1024 | mun_bath_tail_dirty | cats |  | 92,858 | cao 150 | 5 |
| l8src_mun_bath_tail_wet | 0,0,1536,1024 | mun_bath_tail_wet | cats |  | 469,872 | cao 160 | 5 |
| l8src_mun_bath_tail_fluffy | 0,0,1536,1024 | mun_bath_tail_fluffy | cats | mun_bath_tail_c | 820,854 | cao 145 | 5 |
| l8src_mun_bath_tail_sleek_v4 | 0,0,1536,1024 | mun_bath_tail_sleek | cats | mun_bath_tail_c | 820,854 |  | 5 |

**Cỡ file ra (chủ dự án dặn không để to quá):** = cỡ hiển thị × 1,5 + lề trong suốt 8 px mỗi bên (sheet_cut). Ví dụ đã cắt: ghế 706x436, khăn 361x485, vòi sen 251x386, dụng cụ ≈ 241 cạnh dài (khay hiện 116, kéo 151), lá 158–188, bọt 61–106, giọt dầu 61x83. Mun mỗi dáng ≈ 780x870 (khung 520x580), đuôi ≈ 180x240, mí mắt ≈ 166 rộng. Nền 1366x2304. Codex vẽ trên khung 1024–1536 rồi sheet_cut co về các cỡ này.

**Màu Mun:** giống các ảnh Mun cũ (`mun_ref`, `mun_sit_look`): lông trung bình ≈ RGB (110, 86, 73) (đo: mun_ref 103/78/67, mun_sit_look 112/86/74; demo L8 108–112/84–91/70–82). Kiểm bằng số sau mỗi tờ Mun, lệch quá ±12 thì vẽ lại.

Tờ Mun: mỗi lượt một demo (G5-23) nên chia nhóm theo tờ: `mun_bath_a` (demo 1), `mun_bath_b` (demo 2), `mun_bath_c` (demo 3; tờ d sửa từ tờ c nên cùng tỉ lệ). Cỡ mỗi nhóm lấy chiều cao Mun đo trên demo chặng đó, nên mọi dáng giữ đúng cỡ như demo; mọi dáng neo giữa đáy, đặt (512, 1060). Đuôi vẽ từng ảnh theo demo chặng tương ứng, cỡ đo trên demo; neo đuôi (gốc) thay "đáy" bằng toạ độ gốc sau khi cắt.

Nền `l8_bg_bathroom` (`art/out/level8/l8_bg_bathroom.png`, 1366x2304, có nền): Codex sửa từ `l8_demo_stage1_play.png` thành phòng trống (lượt 1), Art nối hai bên bằng dải tường đã duyệt của demo (`art/ref/l8_demo/wide/`) và thêm 384 px trên (tường kem) / dưới (sàn) cho đủ 2304.

**Điểm phụ** (px trong file đã cắt, ghi sau khi cắt):

| Key | Điểm | Toạ độ |
|---|---|---|
| `mun_bath_dirty` (638x758, neo 319,751) | mắt trái; mắt phải; gốc đuôi | (216, 220); (422, 224); (542, 653) |
| `mun_bath_towel` (638x758, neo 319,751) | — (mắt lim dim, không chớp, không đuôi) | — |
| `mun_bath_wet` / `foam` / `sneeze` (523x713, neo 265,704) | mắt trái; mắt phải; gốc đuôi | (152, 265); (374, 265); (422, 612) (sneeze 429, 612) |
| `mun_bath_fluffy` (736x718, neo 370,710) | mắt trái; mắt phải; gốc đuôi | (254, 255); (480, 247); (617, 617) |
| `mun_bath_sleek` / `lick` / `tongue` (G8-11: khung nhóm 581x723, neo 297,715) | mắt trái; mắt phải; gốc đuôi | sleek mắt (183, 236), (391, 240), gốc đuôi (475, 618); **lick** nhắm mắt (không chớp), gốc đuôi (470, 640); **tongue** mắt (212, 288), (379, 341) (đầu nghiêng ≈ 18°, dùng chung `mun_bath_blink`, code co và xoay theo hai mắt), gốc đuôi (470, 640); cả ba đi với `mun_bath_tail_sleek` |
| `mun_bath_tail_*` (đuôi dirty chìa tới x ≈ 774, demo ≈ 840: vẽ lại dài hơn nếu chủ dự án thấy ngắn) | gốc đuôi = neo trong anchors.json (đã vẽ dư ~1/6 đoạn gốc chui dưới mông) | dirty (52, 212), wet (65, 239), fluffy/sleek (50, 198) |
| Đuôi (góc nghỉ) | Ảnh đuôi dựng đứng; **xoay 25° theo chiều kim đồng hồ quanh gốc** (Phaser `angle = +25`; Dev 2 đã đặt) thì khớp dáng đuôi trên demo. Vẫy ±6° / ±18° quanh góc này | — |
| `mun_bath_blink` (166x76) | đặt tâm ảnh ở giữa hai mắt; ảnh vẽ cho khoảng cách mắt ≈ 208 px file (sleek/fluffy); dáng khác co theo khoảng cách mắt | — |
| `l8_tool_shower` (251x386) | đầu vòi (tâm mặt sen, tia ra hướng trái-xuống); đuôi tay cầm (khâu nối ống) | (91, 123); (206, 378) |
| `l8_shower_mixer` (211x163) | chỗ nối ống (đáy tay gạt) | (118, 155) |
| `l8_tool_towel` (361x485) | điểm vắt (thanh đi qua nếp gập trên) | (185, 22) |

## 5. Demo (bước 4)

3 ảnh, **cùng một phòng, cùng góc nhìn, cùng vị trí đồ, cùng cỡ Mun**, chỉ đổi phần theo chặng. Lưu `art/out/demo/`.

| File | Chặng | Mun | Trên Mun | Cảnh | Khay |
|---|---|---|---|---|---|
| `l8_demo_stage1.png` | 1 Dọn dẹp | `dirty` | 4 lá, 2 cành, 2 chùm ké (đuôi, đầu), 3 mảng bùn | Vòi sen trên móc, khăn trên thanh, sàn khô, vịt khô | lược thưa |
| `l8_demo_stage2.png` | 2 Bọt bóng | `foam` | phủ kín nhiều bọt nhỏ chồng nhau (chừa mặt), vài bọt bay trong phòng | Vũng nước trắng bọt quanh chân ghế, vịt nổi trên vũng, vòi sen trên móc | khăn mặt, bông tắm, dầu tắm |
| `l8_demo_stage3.png` | 3 Làm đẹp | `fluffy` (cục bông, điểm cười rõ nhất) | không | Khăn đã về thanh, sàn còn ướt nhẹ (vũng nhỏ trong), vịt trên sàn | máy sấy, lược chải |

**Cách làm (đã chạy 2026-10-31, gpt-6.1-sol medium):**
- Codex vẽ **vùng chơi 1:1** 1024x1536 theo toạ độ thế giới, kèm ảnh vị trí `art/ref/l8_demo/khoi_stage<N>.png` (khối màu không chữ): chặng 1 vẽ mới (`l8_demo_stage1_play.png`), chặng 2 và 3 **chỉnh sửa từ chặng 1** để giữ nguyên phòng.
  - Lượt đầu chặng 1 thử "toàn cảnh thu 0,75" không ăn (Codex vẫn vẽ cỡ 1:1) và bùn trông như đốm lông tam thể: bỏ, lưu ở `art/ref/l8_demo/v1/`.
- Hai bên cho 3:4: `tools/bg_widen.py` prep/merge, 1 lượt Codex vẽ dải tường + sàn trên chặng 1 (`art/review/l8_demo_widen_brief.md`); chặng 2, 3 dùng lại đúng dải đó (phòng giống hệt). Trên, dưới 142 px cho 9:16: lật gương dải tường trơn và sàn (chỉ cho demo; nền thật vẽ đủ 1366x2304 khi tách).
- Giao diện thật đặt theo toạ độ code (tim + mặt Mun, ⏸, 💡, khay `ui_bag_bar` + `ui_bag_slot` co theo số ô, căn giữa); dụng cụ trong khay cắt từ `l8_demo_tools.png`.
- Ra: `l8_demo_stage<N>.png` (9:16, 1080x1920), `l8_demo_stage<N>_34.png` (3:4, 1440x1920), `l8_demo_stage<N>_frame.png` (1366x1820 không giao diện), `l8_demo_stage<N>_play.png` (vùng chơi gốc Codex); so với L1: `art/review/l8_demo_stage<N>_vs_l1.jpg`.
- Đã dùng **6 lượt Codex** (chặng 1 ×2, chặng 2, chặng 3, nối hai bên, tờ dụng cụ).
- **Lệch so với bản khối:** demo dồn đồ lên cao hơn khối (chân tường y ≈ 1110 thay vì 1250; ghế, Mun cao hơn ~70 px; khăn, vòi sen, van cao hơn). Khi tách, Dev đặt theo demo hoặc Art ghi lại toạ độ đo trên demo (như L6).

## 6. Tờ tách (sau khi demo được duyệt)

> **Thay bằng kế hoạch 9 lượt trong thread A8-7 mục 5** (lượt 1 nền; 2–4 đồ stage1; 5 stage2; 6 stage3 + icon/emote/mí; 7–9 tờ Mun `l8_mun_sheet_a/b/c/d` 2 ô + `l8_mun_tail_sheet`). Danh sách dưới là bản cũ.

Mỗi lượt ≤ 7 món, kèm ảnh demo gốc (G4-26, G5-23):
1. `l8_bg_bathroom` (ảnh lẻ, phòng trống theo demo).
2. `l8_stool_plastic`, `l8_shower_hook`, `l8_shower_mixer`, `l8_towel_rack`, `l8_floor_drain`, `l8_duck`, `l8_tool_shower`.
3. `l8_leaf_a/b/c/d`, `l8_twig_a/b`, `l8_burr`.
4. `l8_mud_patch_a/b/c`, `l8_oil_drop`, `l8_foam_bubble_a/b/c`.
5. `l8_tool_comb_wide`, `l8_tool_facecloth`, `l8_tool_sponge`, `l8_tool_shampoo`, `l8_tool_dryer`, `l8_tool_brush`, `l8_tool_towel`.
6. `l8_icon_mun_clean`, `ui_emote_mun_happy`, `ui_emote_mun_no`, `mun_bath_blink`.
7–8. **Tờ Mun** nhóm `mun_bath` (cùng khung, neo đáy), tờ dọc 1024x1536 hoặc 1536x1024 chia 3+2 ô: tờ A `dirty`, `wet`, `foam`, `sneeze`, `towel`; tờ B `fluffy`, `sleek`, `lick`, `tongue`. Kèm ảnh ghế đã tách để vẽ đáy khớp mặt ghế; tờ B kèm tờ A.
9. 4 đuôi `mun_bath_tail_*` (một tờ, kèm tờ A và B).

Ước tính sau demo: ≈ 9 lượt, ≈ 47 ảnh (≈ 33 món lẻ + 9 dáng + 4 đuôi + 1 mí mắt). Báo GD 1 trước mỗi đợt.

## 7. Kiểm

- Màu: demo và nền đo trực tiếp `tools/color_check.py` (TB ≤ 0,25, p90 ≤ 0,46); tờ trong suốt đo trên cảnh ghép. Đặt cạnh `owner_l1_style_ref.png` cùng cỡ. Vượt thì vẽ lại, không chỉnh màu hậu kỳ.
- Góc: đặt cạnh sofa L1; mặt ghế elip, đồ gắn tường nhìn thẳng, không xoay chéo.
- Mun: chồng 50% các dáng xem đường đáy, tâm đầu, mắt khớp số bảng 4.4.
