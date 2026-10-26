# Thảo luận Level 3 – Quà xịn, hộp còn xịn hơn

Đội: **Claude** (Game Design + PM), **Art 2D** (đặc tả ảnh, chỉ đạo Codex vẽ), **Dev** (code, animation), **Codex** (chỉ vẽ).
Nguồn: `levels/levels-01-10.md` và `levels/states-01-10.md` mục Level 3, `art/design-art-level3.md`, `art/style.md`, `leveldesign.md`.
Quy trình: `QUY-TRINH.md`. Áp dụng mọi quy tắc đã chốt ở level 1 và 2 (`level1-thread.md`, `level2-thread.md`).

---

## Vòng 1 – GD đọc level, chốt các điểm còn mở

Level 3 là level **đầu tiên có túi đồ**: nhặt, ghép, đặt (kéo-thả). Mọi thứ khác (Sữa lẩn tránh, hộp lật, cảnh bế) dùng lại khung level 1–2.

**G3-1. Bỏ cánh tay shipper** (`l3_courier_arm`). Hộp quà rơi từ mép trên khung xuống "bộp", kèm tiếng chuông cửa "ting-tong"; Sữa chạy vụt ra sau rèm. Lý do: tiết kiệm một sprite và một cái cửa trong nền, câu chuyện vẫn đủ.
**G3-2. Túi đồ có 4 ô hiển thị** (không phải 6): kéo, thân, đế, cột cào đã ghép. Mỗi lúc chỉ có tối đa 3 món trong túi. Kéo bị dùng hết sau khi cắt (biến mất khỏi túi).
**G3-3. Kéo-thả:** kéo món từ ô túi, thả trúng vùng đích là được; vùng đích nới ≥ 200px quanh vật (ngón tay che mất vật). Món đang kéo hiện **to hơn icon 1,3 lần** và nằm **trên ngón tay một đoạn** để thấy. Thả trượt: `return_to_bag` + `shake_no`. Thả thân lên đế (hoặc ngược lại): ghép. Chạm ô túi (không kéo): món nhún nhẹ, bàn tay hướng dẫn nhắc lại thao tác kéo.
**G3-4. Rèm voan:** bóng Sữa **không thể ở sau rèm đục**, nên rèm vẽ voan xanh rất nhạt và Dev vẽ bóng Sữa **trên** rèm với độ mờ ~35%, cắt theo hình rèm. Người chơi thấy bóng mờ chạy qua.
**G3-5. Sữa biến mất** (giai đoạn 2→3) là khoảnh khắc người chơi dễ bỏ lỡ: bàn tay hướng dẫn tắt hết, nhân vật `player_scratch_head` 1 giây, rồi mới bắt đầu đếm gợi ý 8 giây. Cột cào, rèm lúc này chạm vào chỉ đung đưa vô ích (đã có trong spec).
**G3-6. Hộp úp trước khi nhận chạm** (`disabled`) vẽ y như hộp bình thường. Không viền sáng, không rung. Sau khi nhận chạm: thỉnh thoảng `nudge`.
**G3-7. Cuối màn:** nhân vật buồn đứng cạnh cột cào xịn (`player_sad`), Sữa nằm trong hộp. Chạm Sữa → cảnh bế chung (dùng lại). Hộp và cột cào ở lại cảnh nền.
**G3-8. Thưởng:** 20 cá khô, Sữa ♥ 3/4. Lọ hoa 🎁 thưởng 10 cá khô một lần. Màn thưởng level 3 chạm để chơi lại từ level 1 (chưa có level 4).
**G3-9. Chuyển từ level 2:** màn thưởng level 2 giờ chạm để sang **level 3** (sửa G2-6).
**G3-10. Gợi ý theo đúng spec** (8 giây rung bước hiện tại, 16 giây lấp lánh đồ cần chạm, 💡 bàn chân làm mẫu). Với kéo-thả, 💡 hiện `ui_hand_pointer` đi từ ô túi tới chỗ đích.

---

## Vòng 2 – Dev nêu yêu cầu animation

**D3-1. Hệ thống mới trong `base.js` (dùng lại cho level 4+):**
- `bag`: dải `ui_bag_bar` + 4 `ui_bag_slot`, trượt lên từ đáy lần đầu (0,5 giây, âm "tưng"). `fly_to_bag`, `return_to_bag`, `merge`, `drop_in` như `leveldesign.md` mục 5.2.
- Kéo-thả: pointer down trên ô → món tách thành sprite kéo theo ngón tay; pointer up → hỏi `dropTargets` (hình chữ nhật nới), gọi hàm của level. Không đi qua `handle(name)` của chạm/vuốt hiện có.
- Thuộc tính sprite `touchable`: hộp úp dùng `disabled` tới khi bật.
**D3-2. Lớp hiển thị:** nền → lọ hoa, gối → cột cào + quả bông → hộp quà/hộp úp → kéo trên bàn → rèm → bóng Sữa (trên rèm, alpha 0,35) → Sữa (`sua_run`, `sua_pounce`, `sua_scratch_post`, `sua_peek_tongue` đặt **sau** rèm) → nhân vật → UI + túi.
**D3-3. Bóng Sữa:** tạo từ `sua_sit_stare` bằng `setTintFill(0x3a3050)`, alpha 0,35. Chạy nhanh giữa 3 điểm (góc trái rèm, góc phải rèm, gầm sofa) 0,3 giây; chạm lần 3, 6, 9… thì `sua_peek_tongue` 0,8 giây thay vì chạy.
**D3-4. Hộp:** `l3_gift_box_taped` → `_open` (0,4 giây) → `hop` + xoay 180° 0,35 giây → `swap` `l3_box_upside_down`. Lúc lộ diện: `hop` + xoay 180° → `swap` `l3_sua_in_box`. Dev cần **ba ảnh hộp cùng đường đáy, cùng thân** để xoay 180° không nhảy vị trí; hộp xoay quanh tâm thân, không quanh neo đáy.
**D3-5. Điểm neo cần từ Art:** `l3_post_body` đáy (để ghép) và `l3_post_base` mặt trên; `l3_pompom` đỉnh dây; `sua_scratch_post` chân sau; `sua_peek_tongue` đáy vai.
**D3-6. Phản hồi sai chỗ và hướng dẫn:** kéo thả ở sofa, sàn: lắc lắc rồi về túi. Thảm sáng khi thả cột cào sai chỗ.
**D3-7. Ảnh tạm:** màn tự vẽ `makeFallback` cho mọi key mới, có `?level=3` để vào thẳng.

## Vòng 2 – Art 2D trả lời

**A3-1.** Đã viết `art/design-art-level3.md`: 18 key, 7 tờ + 1 nền. Hộp 4 trạng thái chung **một tờ**, cùng thân 340px (đáp D3-4). Cột cào tách thân/đế/lắp xong cùng một tờ, cùng tỉ lệ (D3-5).
**A3-2.** Bỏ `l3_courier_arm` (G3-1), không cần `sua_tail_peek` mới. Rèm là voan nhạt (G3-4). Quả bông là điểm nhấn màu duy nhất đỏ san hô.
**A3-3.** Số lượt Codex: demo 2 + nền 1 + tờ 7 = **10 lượt**, dự phòng 2:

| Lượt | Tờ / ảnh | Key |
|---|---|---|
| D1 | Demo `l3_demo_start` | — |
| D2 | Demo `l3_demo_reveal` | — |
| 1 | Nền `l3_bg_living_room_afternoon` (sửa từ demo) | 1 |
| 2 | `l3_box_sheet` | 4 trạng thái hộp |
| 3 | `l3_post_sheet` | cột cào, thân, đế, quả bông |
| 4 | `l3_sua_sheet` | 3 tư thế Sữa |
| 5 | `l3_curtain_sheet` | rèm voan |
| 6 | `l3_small_sheet` | kéo, lọ hoa |
| 7 | `player_sad_sheet` | nhân vật buồn |
| 8 | `ui_bag_sheet` | thanh túi, ô túi |

**A3-4. Việc cần chủ dự án duyệt:** hai tranh demo (`demo/l3_demo_start.png`, `demo/l3_demo_reveal.png`) vẽ kèm `art/ref/owner_l1_style_ref.png` và `demo/l1_demo_*`, `demo/l2_demo_*`. **Chưa duyệt thì không vẽ tờ, không tách, không ghép vào game.**

---

## Vòng 2b – Art 2D (PC): viết lại đặc tả

- **Sự cố:** khi nhận việc từ GD - PC, phiên Art 2D (PC) viết `art/design-art-level3.md` mà không biết đã có bản A3-1 (chưa commit), nên **đã ghi đè mất bản A3-1**. Đã viết lại toàn bộ theo đúng G3-1…G3-10, D3-1…D3-7, A3-1…A3-4.
- **Bản mới:** 18 key, 7 tờ + 1 nền, đúng tên tờ của A3-3 (`l3_box_sheet`, `l3_post_sheet`, `l3_sua_sheet`, `l3_curtain_sheet`, `l3_small_sheet`, `player_sad_sheet`, `ui_bag_sheet`). Tất cả tờ chạy `codex-draw --dry` ra cỡ hợp lệ.
  - Hộp 4 trạng thái chung một tờ, cùng thân, cùng đường đáy, rộng 340 hiển thị; key Sữa trong hộp là `l3_sua_in_box` (D3-4).
  - Cột cào: `l3_cat_tree`, `l3_post_body` (neo đáy trụ), `l3_post_base` (lỗ cắm giữa mặt trên), `l3_pompom` (neo đỉnh dây, đỏ san hô) cùng một tờ, cùng tỉ lệ (D3-5).
  - `sua_peek_tongue` cắt phẳng ở vai, neo đáy vai; `sua_scratch_post` neo chân sau (D3-5).
  - Rèm voan xanh rất nhạt, bóng Sữa do code vẽ trên rèm (G3-4). Không có `l3_courier_arm`, nền không có cửa (G3-1).
  - Túi đồ: `ui_bag_bar` (dải trống, rộng 620) + `ui_bag_slot` (ô 120), code xếp 4 ô (G3-2, D3-1).
  - Thêm bảng "Trạng thái và phần giữ nguyên" cho từng đồ (QUY-TRINH bước 1).
- **Hỏi Dev:** dải túi rộng 620 với 4 ô 120 có vừa không? Cần ảnh ô ở trạng thái "được chọn" không?

---

## Vòng 2c – Dev trả lời Art 2D (PC)

**D3-8. Túi đồ: 620 với 4 ô 120 là vừa.** Ghi rõ thêm để vẽ:
- Code xếp 4 ô cách tâm nhau 135 (cả cụm rộng 525), nên **lòng dải trống phải rộng ≥ 560, cao ≥ 140** (hiển thị). Dải cao khoảng 160–180.
- **Quai túi** nhô lên **phía trên mép trái**, không ăn vào lòng dải.
- Túi là giao diện bám mép dưới màn hình, như nút 💡. Code đặt đáy dải cách mép dưới **16px** và tâm x = 420. Cột Y trong bảng vị trí không dùng cho `ui_bag_bar`. Dải nằm ở x 110–730, không đụng nút 💡 (x ≥ 869).
- **Không cần ảnh ô "được chọn" hay ô sáng khi kéo qua.** Code tự làm: ô nguồn mờ đi lúc kéo; vật đích (hộp quà, thảm, món trong túi) viền sáng `glow_outline`; thả sai thì `shake_no`.

**D3-9. `l3_sua_in_box`: đồng ý.** Thêm hai điều để xoay 180° không nhảy:
- **Neo ghi tay `x,y`** cho cả 4 ô, là giữa mép đáy mặt trước thân hộp, như `l1_box_*`. Không để neo "đáy" tự dò, vì đuôi Sữa thõng hoặc nắp bung có thể làm lệch dải 5% thấp nhất.
- **Đuôi Sữa** vắt qua mép hông phải nhưng **không thấp hơn đáy hộp**.
- Sau khi cắt, Art ghi vào thread **chiều cao thân hộp** (px ảnh xuất) để Dev lấy tâm thân = neo − ½ thân.

**D3-10. Neo cột cào và quả bông: đồng ý,** thêm một chỗ đổi về **phía của móc**. Rèm ở bên trái, nên Sữa chạy từ trái sang và vồ, cào hướng sang phải. **Móc treo quả bông phải ở dưới mép trái ổ trên cùng** (phía rèm), không phải mép phải; nếu không thì Sữa phải vòng qua cột mới với tới.
- Quả bông treo cách sàn khoảng 330–400 (hiển thị) để `sua_pounce` (cao 330) với tới.
- Dev tự đo điểm móc trên ảnh `l3_cat_tree` xuất.
- Thân và đế chỉ dùng làm icon và cho hiệu ứng ghép trong túi, neo như A3 là đủ.

**D3-11. Đổi chỗ cắt của `sua_peek_tongue`** (tôi, Dev, ghi "đáy vai" ở D3-5 là sai). Sữa ló **từ mép đứng của rèm**, nên phần khuất nằm **bên cạnh**, không ở dưới. Nếu cắt ngang ở vai, đường cắt thẳng sẽ lộ ra trên bệ cửa sổ.
- Vẽ đầu nghiêng thò **sang phải**, một bàn chân trước vịn mép, **cắt phẳng dọc ở bên trái** (chỗ khuất sau mép phải rèm).
- **Neo ghi tay `x,y`** ở giữa mép cắt trái.
- Ló ở góc trái rèm thì code lật ngang.

**D3-12.** `sua_pounce`, `sua_scratch_post` nhìn sang phải là đúng (chạy từ rèm sang cột cào). Code lật ngang khi cần.

---

## Vòng 2d – Art 2D (PC): áp D3-8…D3-12

- `design-art-level3.md` đã sửa: móc quả bông dưới **mép trái** ổ trên cùng, quả bông cách sàn 330–400; `sua_peek_tongue` cắt **dọc bên trái**, đầu thò sang phải; túi có lòng trống ≥560x140, dải cao 160–180, quai phía trên mép trái; đuôi Sữa không thấp hơn đáy hộp.
- Neo `x,y` ghi tay cho 4 ô hộp và `sua_peek_tongue`: Art đo sau khi vẽ tờ, ghi kèm chiều cao thân hộp vào thread.
- Demo `l3_demo_reveal` đang vẽ với lời giao việc cũ (móc bên phải). Demo chỉ để duyệt không khí, nên không vẽ lại vì chi tiết này; tờ sẽ vẽ theo đặc tả mới.

---

## Vòng 3 – Demo lượt 1 và góp ý chủ dự án

- Codex (gpt-6.1-sol, medium) vẽ `demo/l3_demo_start.png` và `demo/l3_demo_reveal.png`. Log có đủ "Nhắc lại quy tắc" và "Tự kiểm" (`art/out/_logs/l3_demo_*.txt`).
- Start đạt về style. Reveal **lệch phòng**: chân tường lên y≈780, bàn và sofa đổi chỗ, hộp khác cỡ.
- Chủ dự án (qua GD) góp ý 4 điểm:
  1. Hai ảnh phải cùng một phòng.
  2. Reveal phải khớp đường sàn và vị trí với start.
  3. Bóng mèo trên rèm.
  4. Thanh túi đồ.
- **Điểm 1–2:** vẽ lại reveal, chỉnh từ ảnh `l3_demo_start.png`, được phép ghi đè. Bản cũ lưu ở `art/out/_refs/l3_demo_reveal_v1.png`.
- **GD chốt điểm 3:** GIỮ bóng Sữa trên rèm, mờ ~35% (G3-4, giai đoạn 1 "Lẩn tránh").
- **GD chốt điểm 4:** GIỮ như đặc tả: start (giây 0) không có túi, reveal có túi (túi trượt lên lần đầu khi nhặt kéo).
- Sau khi reveal mới xong: Art đo vị trí từng đồ trên demo, chốt với Dev (toạ độ, neo, đường sàn, lớp), ghi bảng vị trí vào đây.

---

## Vòng 3b – Dev đề xuất vị trí, chờ Art chốt (trước khi vẽ lại demo)

Mục tiêu (chủ dự án qua GD): ghép vào game phải **giống hệt demo**. Muốn vậy demo phải là bản vẽ của chính màn chơi: chỉ chứa key có thật, đặt ở chỗ code đặt được. Số đo dưới đây lấy bằng mắt trên `l3_demo_start.png` (1024x1536, sai số ±10px). Sau khi demo được duyệt, Art đo lại chính xác.

**D3-13. Một phòng chung = phòng của `l3_demo_start`.** Reveal vẽ lại phải **giữ nguyên nền từng pixel**, chỉ đổi sprite. Các mốc của nền:
- **Chân tường y≈950**, cũng là đường sàn chung.
- Rèm: thanh treo y≈175, x 40–540; cửa sổ và bệ cửa ở đáy rèm y≈668.
- Kệ: mặt kệ y≈435, x 592–982.
- Bàn tròn: mặt bàn y≈830, đế chạm sàn y≈1035.
- Sofa: x 325–1024, mặt ghế y≈905, chân y≈1015.
- Thảm tròn: x 530–1024, y 1050–1280, tâm (800, 1165).

**D3-14. Vùng túi đồ để trống từ đầu.** Thanh túi trong reveal chiếm y 1300–1475, và hiện lên ngay khi nhặt kéo (lúc đó hộp quà vẫn nằm trên sàn). Nên:
- **Mọi đồ đặt trên sàn có đáy ≤ 1280.** Ở demo start, hộp đáy 1330 và chân nhân vật 1325 đều đè lên chỗ của túi, phải nâng lên.
- Dải y 1290–1536 chỉ là sàn trơn, cùng nút 💡 ở (934, 1446).

**D3-15. Demo chỉ vẽ key có trong danh sách.** Start hiện có hai thứ chưa có key:
- (a) Nhân vật **chỉ tay + tay chống cằm**. Tư thế mở màn trong code là `player_call`.
- (b) **Bong bóng suy nghĩ có hình cây kéo.** `ui_thought_bubble` (style.md mục 5) chưa vẽ; code hiện dùng `ui_speech_bubble` + mặt mèo.
- **GD chọn một trong hai:** (1) demo vẽ lại theo `player_call` + bong bóng nhiệm vụ đang có, hoặc (2) thêm key `player_point_think` và `ui_thought_bubble` (bên trong code đặt icon `l3_scissors`). Dev nghiêng về (2), vì states ghi "Bong bóng nhân vật: hình cái kéo" và tư thế này kể chuyện rõ hơn.

**D3-16. Bảng vị trí đề xuất** (điểm neo trên khung 1024x1536). `Rộng demo` = bề rộng phần vẽ thật (bỏ phần trong suốt) đo trên demo.

| Key | X | Y | Cảnh | Rộng demo | Nguồn / ghi chú |
|---|---|---|---|---|---|
| l3_curtain_closed | 288 | 185 | | 445 | start: neo đỉnh mép trên vải, hem y≈668 |
| l3_vase | 826 | 440 | | 168 | start: đáy lọ trên mặt kệ, cả cụm cao ~215 |
| l3_scissors | 183 | 848 | | 130 | start: nằm trên mặt bàn |
| l1_pillow_white_idle | 550 | 878 | | 220 | start: trên mặt ghế sofa trái |
| l3_gift_box_taped | 320 | 1278 | | 390 | start dời lên 52px (D3-14); neo = giữa mép đáy mặt trước; hộp x≈125–515 |
| l3_box_upside_down, l3_sua_in_box | 320 | 1278 | | theo nhóm | cùng chỗ hộp quà (D3-9) |
| l3_cat_tree | 820 | 1235 | lộ | ~330 | trên thảm, cao 560 → đỉnh y≈675 |
| l3_pompom | (đo) | (đo) | lộ | — | móc dưới mép trái ổ trên cùng, quả bông cách sàn ~320 (y≈915) |
| player_call / player_point_think | 720 | 1275 | đầu | ~300 | start dời lên 50px (D3-14) |
| player_sad | 595 | 1120 | lộ | ~240 | đứng **sau** hộp và cột cào (đáy cao hơn, nên vẽ ở lớp dưới), giữa hai món |
| sua_pounce | 620 | 1240 | | — | bên trái thân cột, vồ sang phải |
| sua_scratch_post | 690 | 1240 | | — | chân trước chạm trụ dây thừng |
| ui_bag_bar | 392 | 1478 | lộ | 715 (cả quai) | reveal: x 35–750, đáy cách mép dưới 58px |
| ui_bag_slot ×4 | 205 / 348 / 492 / 635 | 1388 | lộ | 125 | reveal: tâm ô cách nhau 143 (thay 135 ở D3-8) |
| bóng Sữa (code) | 165 / 430 | 668 | | ~165 | góc trái / góc phải rèm, chân trên đường hem |

**D3-17. Cách đo và cách code đặt** (để ghép ra giống hệt demo):
- Art ghi bảng trên vào `design-art-level3.md` mục 6. Các cột `Key | X | Y | Cảnh` giữ đúng thứ tự cũ, để `sheet_cut.py compose` và trình đọc của game vẫn chạy được. Thêm cột `Rộng demo` ở sau.
- Code đặt neo đúng (X, Y), rồi co ảnh sao cho **bề rộng phần vẽ thật = Rộng demo**. Các trạng thái cùng nhóm co cùng tỉ lệ với key đầu nhóm. Như vậy cắt tờ ra cỡ nào thì trong game vẫn khớp demo; không còn hệ số `SIZE_K` chỉnh tay như level 2.
- Duyệt: `sheet_cut.py compose --canh đầu/lộ` ghép key lên nền, đặt cạnh demo, lệch quá 8px thì sửa bảng.

**D3-18. Lớp hiển thị** (dưới → trên):
1. Nền.
2. Lọ hoa, gối.
3. Rèm.
4. Bóng Sữa (trên rèm, alpha 0,35, cắt theo rèm). `sua_peek_tongue` nằm **dưới** rèm.
5. Kéo trên bàn.
6. **Đồ trên sàn xếp theo đường đáy**: đáy cao hơn (xa hơn) vẽ dưới, đáy thấp hơn vẽ trên. Theo thứ tự: `player_sad` (1120) → Sữa chạy, vồ, cào (1240) ↔ cột cào + quả bông (1235) → hộp (1278) → `player_call` (1275, chỉ ở mở màn).
7. Hiệu ứng.
8. Túi đồ + món đang kéo.
9. Giao diện.

**D3-19. Vật con:**
- `l3_pompom` là con của `l3_cat_tree`: nhún theo khi cột cào `drop_in`, `swing` quanh neo đỉnh.
- Kéo nằm trên bàn trong nền, không có vật đỡ.
- Sữa trong hộp vẽ liền với hộp.

**D3-20. Gầm sofa:** trên start chỉ hở ~25px, bóng Sữa không chui qua được.
- **GD chọn:** (1) bỏ đường chạy qua gầm sofa, Sữa chỉ chạy qua lại giữa hai góc rèm, hoặc (2) nền vẽ gầm sofa hở cao ~70px.
- Dev nghiêng về (1): đỡ đổi nền, mà luật chơi không đổi.

**D3-21. Ghi cho lượt vẽ lại demo reveal:**
- Quả bông treo **bên trái** cột cào (D3-10).
- Hộp, cột cào, nhân vật đúng vị trí và cỡ trong bảng D3-16.
- Thanh túi giữ đúng chỗ như reveal lượt 1.

---

## Vòng 3c – GD chốt D3-14, D3-15, D3-20 (Dev ghi)

**G3-11 (D3-15): chọn phương án (2).**
- Thêm key `player_point_think`: nhân vật chỉ tay, tay kia chống cằm, như trong `l3_demo_start`.
- Thêm key `ui_thought_bubble`: bong bóng suy nghĩ để trống, dùng chung cho cả game (style.md mục 5 đã có mô tả), không gắn riêng level 3. Level 4–10 cũng dùng lại (van, đốm sáng, túi giấy, ô vuông…).
- Icon bên trong do code đặt, lấy lại từ key đã có. Ở level 3 là `l3_scissors`.
- Dev sẽ làm:
  - Mở màn level 3 dùng `player_point_think` thay cho `player_call`. Base cho mỗi màn tự chọn tư thế mở màn.
  - Bong bóng suy nghĩ đặt cạnh đầu nhân vật, như demo start: bbox x≈745–1010, y≈495–760 sau khi nâng 50px theo D3-14. Đuôi bong bóng chỉ về phía đầu.
  - Bong bóng nhiệm vụ vẫn thu về góc trên như mọi level, đúng như reveal.

**G3-12 (D3-20): chọn phương án (1).**
- Bỏ đường chạy qua gầm sofa. Bóng Sữa chỉ chạy qua lại giữa **góc trái** và **góc phải** rèm.
- Giữ nền demo hiện tại.
- GD đã sửa `levels/levels-01-10.md`: bảng giai đoạn mèo và mục chạm rèm nhiều lần.

**G3-13 (D3-14): đồng ý.**
- Mọi đồ trên sàn có đáy ≤ 1280.
- Ở start, hộp quà và nhân vật nâng lên ~50px.
- Bảng D3-16 giữ nguyên số.

Art 2D (PC) bổ sung hai key mới vào `design-art-level3.md`; GD đã báo Art.

---

## Vòng 3d – Art 2D (PC) chốt vị trí D3-13…D3-21, G3-11…G3-13

- **Chốt toàn bộ bảng D3-16, không sửa số nào.** Đã chép vào `design-art-level3.md` mục 6, cột `Key | X | Y | Cảnh | Rộng demo`. Mốc nền D3-13 ghi ở mục 2.
  - Ô túi cách tâm 143 (thay 135).
  - Đồ trên sàn có đáy ≤ 1280; lớp hiển thị theo D3-18; quả bông là vật con của cột cào (D3-19).
  - `ui_thought_bubble` tạm đặt neo (880, 760), đo lại trên demo start mới.
- **G3-11, thêm 2 key:**
  - `player_point_think` (cao 580, Rộng demo 300) và `player_sad` chung tờ `player_l3_sheet` (1536x1024, nhóm player_pose, cùng đường đáy). Tờ này thay `player_sad_sheet`.
  - `ui_thought_bubble` (rộng 265, neo đáy ở bong bóng nhỏ nhất, lòng trống) ở tờ riêng `ui_thought_sheet` (để nét không lệch với dải túi).
- **G3-12:** bóng Sữa chỉ chạy giữa hai góc rèm, không vẽ lại gầm sofa.
- **Dừng lượt vẽ lại reveal đang chạy**, vì nó còn theo vị trí cũ (hộp đáy 1330).
- **Vẽ lại demo theo thứ tự:**
  1. Start: chỉnh từ chính ảnh start, chỉ nâng hộp, nhân vật và bong bóng lên ~50px. Bản cũ lưu ở `_refs/l3_demo_start_v1.png`.
  2. Reveal: chỉnh từ ảnh start mới, đặt đồ theo bảng D3-16, quả bông bên trái cột cào, quai túi phía trên mép trái.

---

## Vòng 3e – Demo lượt 2, gửi chủ dự án duyệt

- Codex (gpt-6.1-sol, medium) vẽ lại, mỗi ảnh 1 lượt. Log có đủ "Nhắc lại quy tắc" và "Tự kiểm" (`art/out/_logs/l3_demo_start_v2.txt`, `l3_demo_reveal_v3.txt`). Bản trước ở `art/out/_refs/l3_demo_*_v1.png`.
- **`demo/l3_demo_start.png`:** giữ nguyên phòng và bóng Sữa trên rèm. Hộp quà và nhân vật đã nâng lên: hộp đáy ≈1290, chân nhân vật ≈1275; dải dưới chỉ còn sàn trơn.
- **`demo/l3_demo_reveal.png`:** **cùng phòng với start**: cửa sổ, rèm, kệ hoa, bàn, sofa, thảm, chân tường y≈950 đều trùng. Hộp ngửa có Sữa thò đầu, đuôi bên phải. Cột cào 3 tầng, quả bông đỏ san hô ở bên trái. Nhân vật buồn đứng sau, giữa hộp và cột cào. Túi đồ có 4 ô.
- **Lệch còn lại** (sửa khi vẽ tờ, không ảnh hưởng không khí và màu):
  - Hộp ở reveal hẹp hơn start (~340 so với ~390).
  - Nhân vật buồn đứng ở x≈520 (bảng ghi 595), che gối.
  - Quai túi vẫn ở đầu trái (D3-8 muốn quai ở phía trên mép trái).
  - Hộp start đáy ≈1290 (bảng ghi 1278).
  - Trong game, mọi thứ đặt theo bảng D3-16 và sprite cắt từ tờ, nên các chỗ lệch này không theo vào game.
- **Ảnh đặt cạnh mẫu level 1:** `art/out/demo/l3_demo_vs_l1.jpg` (owner_l1_style_ref | l1_demo_start | l3_demo_start | l3_demo_reveal).
- **Chờ chủ dự án duyệt.** Chưa duyệt thì chưa vẽ tờ, chưa tách, chưa ghép.

---

## Vòng 3f – Chủ dự án chưa duyệt lượt 2 (qua GD)

- Chủ dự án chọn **bố cục của `_refs/l3_demo_reveal_v1.png`** làm chuẩn: hộp mở + Sữa bên trái, cậu bé đứng giữa, cột cào trên thảm bên phải, túi đồ ở đáy.
- Màu đang đậm hơn level 1: phải nhạt, trong như `owner_l1_style_ref`. Đo độ bão hoà trung bình (HSV):
  - mẫu level 1: 0,247 và 0,219;
  - `reveal_v1`: 0,258;
  - start lượt 2: 0,271;
  - mục tiêu: 0,22–0,24.
- **Vẽ lại theo thứ tự:**
  1. Reveal: chỉnh từ `reveal_v1`. Dịch hộp + Sữa, cậu bé, cột cào lên ~40px (đáy ≤ 1260, cách túi ≥ 30px); quả bông sang mép trái (D3-10); quai túi lên phía trên mép trái (D3-8); làm nhạt màu.
  2. Start: chỉnh từ reveal mới để cùng phòng. Giữ trạng thái đầu đã chốt: bóng Sữa trên rèm, hộp dán băng chữ thập, cậu bé chỉ tay + bong bóng kéo, chưa có túi.
- Bản lượt 2 lưu ở `_refs/l3_demo_start_v2.png`, `_refs/l3_demo_reveal_v3.png`.
- **Bảng vị trí D3-16 bỏ, đo lại trên demo mới**, rồi chốt với Dev.

## Vòng 3g – Demo lượt 3 và bảng vị trí D3-22

- Codex vẽ mỗi ảnh 1 lượt. Log có đủ "Nhắc lại quy tắc" và "Tự kiểm" (`_logs/l3_demo_reveal_v4.txt`, `l3_demo_start_v3.txt`).
- **Reveal:** chỉnh từ `reveal_v1`, giữ bố cục. Hộp + Sữa và cậu bé đã nâng lên; đáy hộp ≈1222, chân cậu bé ≈1212, đế cột cào ≈1230, cách túi ≥ 30px. Quả bông ở mép trái cột cào; quai túi ở phía trên mép trái.
- **Start:** chỉnh từ reveal mới, **cùng phòng**. Giữ bóng Sữa trên rèm, kéo trên bàn, hộp dán băng chữ thập, cậu bé chỉ tay + bong bóng kéo, chưa có túi.
- **Màu:** độ bão hoà trung bình start 0,233, reveal 0,213 (mẫu level 1: 0,219–0,247). Sofa, thảm, cột cào, sàn đều nhạt hơn lượt 2.
- **Lệch nhỏ:**
  - Gấu rèm start thấp hơn reveal ~15px.
  - Hộp start rộng 368, hộp reveal ~315.
  - Trong game, rèm là một sprite và nhóm hộp co theo `l3_gift_box_taped`, nên hai chỗ lệch này không theo vào game.
- **D3-22 (thay D3-16), Art đo bằng mắt, ±10px:** ghi ở `design-art-level3.md` mục 6 (bảng `Key | X | Y | Cảnh | Rộng demo`) và mốc nền mục 2.
  - Chân tường y≈780.
  - Hộp (238, 1225), rộng 368.
  - Cột cào (822, 1230), rộng 335.
  - `player_point_think` (645, 1232), rộng 390.
  - Bong bóng (805, 708), rộng 250.
  - `player_sad` (505, 1212), rộng 245.
  - Túi (422, 1478), rộng 655; ô ở x 205/348/492/635, y 1388.
  - Lớp sàn theo đáy: `player_sad` → hộp ↔ Sữa → cột cào → `player_point_think`.
- Ảnh đặt cạnh mẫu level 1: `art/out/demo/l3_demo_vs_l1.jpg`. **Chờ chủ dự án duyệt.**

---

## Vòng 3h – Dev xem D3-22

Code dùng được bảng D3-22, không cần sửa số nào. Các điều kiện đều đạt:
- Đáy mọi đồ trên sàn ≤ 1232. Quai túi ở y≈1268, cách đáy đồ hơn 30px.
- Túi (x 95–750) không đụng nút 💡 (x ≥ 869).
- Quả bông treo bên trái cột cào, cách sàn ~350, `sua_pounce` với tới.
- Lớp sàn xếp theo đáy, khớp D3-18.

Hai lưu ý (không chặn duyệt):
- **D3-23. Hộp ở cảnh lộ diện sẽ to hơn demo reveal.** Code co cả nhóm hộp theo `l3_gift_box_taped` (rộng 368), nên `l3_sua_in_box` trong game rộng khoảng 368, trong khi demo reveal vẽ khoảng 315.
  - Mép phải hộp ra tới x≈422, che ~40px tay trái của `player_sad` (x≈383–627, nằm ở lớp dưới hộp).
  - Khi đo lại chính xác, nếu thấy chật thì dời `player_sad` sang phải ~15px (X 520). Không chật thì giữ nguyên.
- **D3-24. `player_point_think` đứng trên thảm** (chỗ thả cột cào), nhưng chỉ có ở mở màn. Code cho nhân vật rời cảnh trước khi túi đồ hiện lên, nên không che vùng thả. Bong bóng suy nghĩ đi theo nhân vật và tắt cùng lúc.

Dev chờ chủ dự án duyệt demo rồi mới ráp `level3.js`.

---

## Vòng 4 – Chủ dự án đã duyệt demo lượt 3: tách asset (Art 2D PC)

- **Ảnh cắt cận từ demo duyệt** dùng làm nguồn hình dáng: `art/out/_refs/l3d_*.png` (box_taped, box_sua, cat_tree, player_point, player_sad, curtain, vase, scissors, bubble, bag).
- **Giao Codex** (gpt-6.1-sol, medium) 9 lượt, chạy 3 luồng song song: 8 tờ + nền `l3_bg_living_room_afternoon` (chỉnh từ demo start, xoá sprite và UI).
  - Mỗi lượt đính kèm `owner_l1_style_ref`, `l1_demo_start`, 2 demo duyệt và ảnh cắt cận; lời giao việc dán khối style + góc nhìn; Codex phải "Nhắc lại quy tắc" và "Tự kiểm".
  - Màu: bão hoà ~0,21–0,24 như demo.
- **Một cỡ** (GD mục 3):
  - Cậu bé: `player_point_think` và `player_sad` cùng tờ, cùng nhóm, cùng đường đáy; dặn Codex vẽ bằng nhau.
  - Hộp: 4 ô cùng thân, lấy hộp đóng làm chuẩn rộng.

---

## Vòng 4 – Dev ráp level 3 (ảnh tạm, chờ asset thật)

**Đã làm (chưa commit):**
- `game/src/level3.js`: đủ luồng giải.
  - Chuông cửa, hộp quà rơi xuống; nhân vật chỉ tay kèm bong bóng suy nghĩ hình cây kéo.
  - Bóng Sữa trên rèm voan, chạy qua lại giữa hai góc rèm; chạm lần 3, 6, 9… thì Sữa thò đầu lè lưỡi.
  - Nhặt kéo thì túi đồ trượt lên. Kéo kéo thả vào hộp: cắt băng dính, hai mảnh cột cào vào túi, hộp lật úp.
  - Ghép thân + đế trong túi, đặt cột cào lên thảm.
  - Sữa vồ quả bông 2 lần, cào trụ, rồi biến mất sau cột cào; mép hộp nhấc lên.
  - Chạm hộp úp: hộp lật ngửa, Sữa nằm trong hộp, nhân vật buồn hiện ra. Chạm Sữa: cảnh bế chung, rồi màn thưởng.
  - Gợi ý: 8 giây rung bước hiện tại, 16 giây lấp lánh, 💡 bàn chân làm mẫu.
  - Lọ hoa 🎁 thưởng 10 cá khô một lần.
- `base.js`: thêm phần dùng lại cho level sau.
  - Túi đồ 4 ô, kéo-thả, ghép, món thả sai bay về túi.
  - Tay làm mẫu kéo-thả (`handDrag`).
  - Mỗi màn tự chọn tư thế mở màn (`introPose`).
  - Co ảnh theo cột **Rộng demo** (D3-17), trạng thái cùng nhóm co theo key đầu nhóm.
- `assets.js`, `build_web.py`: đọc `design-art-level3.md`, gồm cả cột Rộng demo. `main.js`: thêm Level3, `?level=3`. Level 2 thưởng xong sang Level 3 (G3-9).
- Âm tổng hợp tạm cho các key `l3_sfx_*`, `sfx_bag_up`, `sfx_drop`, `sfx_merge`, `sfx_wrong`, `sfx_clink`, `sua_sfx_*`.

**Chơi thử** (ảnh tạm, trình duyệt tự đẩy khung hình):
- Cả luồng tới màn thưởng: không lỗi JS, sang được Level 1.
- Các nhánh sai đều đúng: thả kéo sai chỗ thì về túi; hộp úp không phản ứng khi chưa tới lượt; thả cột cào sai chỗ thì thảm nhấp nháy; chạm Sữa lúc đang vồ thì Sữa biến mất ngay.
- Level 1, 2 vẫn chạy.
- Ảnh đặt cạnh demo (trái demo, phải game), ở scratchpad của phiên Dev: `l3_play_start_vs_demo.jpg`, `l3_play_pounce_vs_demo.jpg`, `l3_play_reveal_vs_demo.jpg`.
- Vị trí khớp demo: rèm, bóng Sữa, kệ + lọ, bàn + kéo, gối, hộp, nhân vật, bong bóng, thảm, túi và 4 ô, quả bông bên trái cột cào.

**Cần khi có asset thật:**
- Art ghi neo `x,y` của 4 ô hộp và `sua_peek_tongue` (D3-9, D3-11).
- Dev đo lại móc quả bông trên `l3_cat_tree` xuất. Hiện dùng (737, 815) theo demo.

**Hỏi GD:**
- **D3-25.** Demo reveal vẫn giữ bong bóng mặt Sữa ở góc trên. Code chung (`bubbleFound`, mọi level) cho bong bóng bay ra giữa, nổ tim rồi tắt. Giữ như mọi level hay để lại ở góc cho giống demo?
- **G3-14 (GD chốt D3-25):** giữ như mọi level. Bong bóng bay ra giữa, nổ tim rồi tắt. Demo chỉ là khung hình tĩnh; ưu tiên nhất quán giữa các level. Code không đổi.

---

## Vòng 4b – Vẽ xong tờ, cắt xong, bàn giao Dev (Art 2D PC)

**Vẽ:** 8 tờ + nền, mỗi thứ 1 lượt Codex, không phải vẽ lại. Log có đủ "Nhắc lại quy tắc" và "Tự kiểm" (`art/out/_logs/<tờ>.txt`).
- Hộp: 4 ô cùng thân; mặt trước rộng ~475px trong tờ ở cả 4 ô.
- Cậu bé: 2 tư thế cùng cỡ, cùng đường đáy.
- Cột cào: móc quả bông ở mép trái.
- Bong bóng: lòng trống.
- Nền: đúng phòng demo, đã xoá rèm, sprite và UI. Bàn và sofa trên nền thấp hơn demo ~30–50px.

**Sửa ô trước khi cắt** (Codex vẽ lệch ô; đo khung thật rồi sửa bảng tờ):
- `l3_post_sheet`: dời đế sang phải 32px, để thân và đế không chung cột. Ảnh gốc của Codex lưu ở `_refs/l3_post_sheet_codex_raw.png`.
- `l3_sua_sheet`: dời `sua_scratch_post` sang phải 16px. Ảnh gốc lưu ở `_refs/l3_sua_sheet_codex_raw.png`.
- Ô của `l3_small_sheet` và `l3_box_sheet` sửa theo khung thật.
- **Neo ghi tay (D3-9, D3-11):**
  - Hộp, giữa mép đáy mặt trước, toạ độ trong tờ: taped (409,461), open (1133,459), upside (403,940), sua (1132,950). Sau khi cắt, cả 4 cùng khung 692x458, neo (341,448).
  - **Chiều cao thân hộp:** ~320px ảnh xuất (từ mép trên mặt trước y≈128 tới đáy 448); tâm thân ≈ neo − 160.
  - `sua_peek_tongue`: giữa mép cắt trái, (72,524) trong tờ → (19,121) trong ảnh xuất.

**Bảng vị trí D3-22, sửa theo nền thật:**
- `l3_scissors` Y 703 → 733 (mặt bàn trên nền thấp hơn).
- `l1_pillow_white_idle` Y 692 → 740 (mặt ghế sofa).
- `player_sad` X 505 → 540 (D3-23, đỡ đè hộp).
- Ghép thử theo đúng cách code co ảnh theo "Rộng demo": `art/out/_check/l3_compose_vs_demo.jpg` (demo start | ghép start | demo reveal | ghép reveal). Bố cục, cỡ, lớp khớp demo.

**Bàn giao Dev – 20 file** (neo và nhóm trong `art/out/anchors.json`, ảnh xuất = hiển thị × 1,5):

| Key | File | Cỡ xuất | Neo | Nhóm |
|---|---|---|---|---|
| l3_bg_living_room_afternoon | art/out/level3/l3_bg_living_room_afternoon.png | 1024x1536 | góc trên trái | |
| l3_gift_box_taped | art/out/level3/l3_gift_box_taped.png | 692x458 | 341,448 | box |
| l3_gift_box_open | art/out/level3/l3_gift_box_open.png | 692x458 | 341,448 | box |
| l3_box_upside_down | art/out/level3/l3_box_upside_down.png | 692x458 | 341,448 | box |
| l3_sua_in_box | art/out/level3/l3_sua_in_box.png | 692x458 | 341,448 | box |
| l3_cat_tree | art/out/level3/l3_cat_tree.png | 518x856 | 259,848 | |
| l3_post_body | art/out/level3/l3_post_body.png | 459x721 | 230,713 | |
| l3_post_base | art/out/level3/l3_post_base.png | 451x215 | 225,208 | |
| l3_pompom | art/out/level3/l3_pompom.png | 103x241 | 51,8 | |
| sua_peek_tongue | art/out/cats/sua_peek_tongue.png | 183x241 | 19,121 | |
| sua_pounce | art/out/cats/sua_pounce.png | 425x511 | 136,503 | |
| sua_scratch_post | art/out/cats/sua_scratch_post.png | 369x526 | 182,519 | |
| l3_curtain_closed | art/out/level3/l3_curtain_closed.png | 691x741 | 346,8 | |
| l3_vase | art/out/level3/l3_vase.png | 274x331 | 125,323 | |
| l3_scissors | art/out/level3/l3_scissors.png | 211x108 | 45,100 | |
| player_point_think | art/out/player/player_point_think.png | 645x889 | 355,881 | player_pose |
| player_sad | art/out/player/player_sad.png | 645x889 | 355,881 | player_pose |
| ui_bag_bar | art/out/common/ui_bag_bar.png | 946x311 | 473,303 | |
| ui_bag_slot | art/out/common/ui_bag_slot.png | 196x191 | 98,96 | |
| ui_thought_bubble | art/out/common/ui_thought_bubble.png | 414x361 | 48,354 | |

- Ảnh tờ gốc: `art/out/_sheets/`. Ảnh kiểm: `art/out/_check/` (box.png chồng 4 trạng thái).
- `l3_scissors` neo đáy tự dò rơi vào vòng tay cầm bên trái (45,100). Ghép thử vẫn đúng chỗ, vì bảng vị trí đã đo theo neo này.

## Vòng 4c – Sửa theo GD xem ảnh ghép

1. **Màu hộp:** cả 4 ảnh hộp đậm hơn demo (bão hoà 0,40 so với demo 0,30).
   - Art giảm bão hoà ×0,74 và tăng sáng ×1,035 trên tờ `l3_box_sheet`, rồi cắt lại; giờ còn 0,294.
   - Hình, khung, neo giữ nguyên. Tờ gốc của Codex lưu ở `_refs/l3_box_sheet_codex_raw.png`.
2. **Nền:** sofa và bàn trên nền thấp hơn demo ~45–60px, sofa to hơn ~5%; thảm, cửa sổ, kệ đúng chỗ.
   - Đã sửa vị trí các đồ đặt trên nền: kéo Y 733, gối Y 740.
   - Đồ trên sàn (hộp, cậu bé, cột cào) không tựa vào sofa nên giữ nguyên.
   - Nếu chủ dự án muốn nền trùng demo từng pixel thì vẽ lại nền 1 lượt.
3. **Quả bông** là key riêng (đung đưa), trước đó chưa ghép vào ảnh kiểm.
   - Đã ghép: móc ở (90,225) trong ảnh xuất cột cào; trên màn móc ≈ (709,813), quả bông ở bên trái cột cào.
   - Đã ghi vào design-art mục 6.
4. **Cỡ cậu bé:** hai tư thế cùng nhóm `player_pose`, cùng khung 645x889, cùng tỉ lệ co.
   - Trên màn đều cao ~540px (`player_point_think` 539, `player_sad` 541).
   - Demo reveal vẽ cậu bé cao ~552, nên trông lớn hơn ~2%.
- Sửa số: thân hộp cao **~320px** ảnh xuất (không phải 300), tâm xoay ≈ neo − 160.
- Ảnh kiểm mới: `art/out/_check/l3_compose_vs_demo.jpg`.

---

## Vòng 4d – Dev đo lại vị trí bằng máy, so với demo (D3-26)

GD thấy ảnh so sánh chưa khớp demo. Nguyên nhân có hai:
- (a) Ảnh tạm của Dev sai tỉ lệ, nên co theo bề rộng thì chiều cao lệch. Đã sửa ảnh tạm cho đúng khung demo.
- (b) Bảng D3-22 đo bằng mắt, lệch thật 15–35px ở nhiều key.

**Cách đo** (`game/tools/play_harness.js`, hàm `match`): với từng sprite thật trong game, dò dịch (dx, dy) ±60px và hệ số co k 0,8–1,3 sao cho màu sprite khớp tranh demo nhất. Sửa bảng theo số đó rồi đo lại: các key dưới đây còn lệch ≤ 4px.

**Bảng sửa, đề nghị Art ghi vào `design-art-level3.md` mục 6** (X, Y, Rộng demo):

| Key | D3-22 hiện tại | Đo bằng máy | Ghi chú |
|---|---|---|---|
| player_point_think | 645, 1232, 390 | **649, 1209**, 390 | thấp 23px |
| l3_gift_box_taped (cả nhóm hộp) | 238, 1225, 368 | **224, 1212**, 368 | neo là giữa mép đáy mặt trước, không phải tâm cả hộp |
| ui_thought_bubble | 805, 708, 250 | **771, 691, 260** | |
| l3_scissors | 180, 733, 120 | **140**, Y theo nền mới, 120 | neo tự dò nằm ở vòng tay cầm trái |
| l3_cat_tree | 822, 1230, 335 | **846**, 1230, **322** | |
| player_sad | 540, 1212, 245 | **511, 1192**, 245 | demo đứng chồng mép hộp ~30px |
| ui_bag_bar | 422, 1478, 655 | **409**, 1478, **688** | ô túi rộng **136** (code đã sửa) |
| l3_vase | 815, 388, 170 | khớp | |

**Lệch do ảnh asset khác demo** (sửa bảng không hết, Art xem):
- **Hộp quà:** asset thấp hơn demo. Tỉ lệ cao/rộng của asset ≈ 0,63, của demo ≈ 0,77, nên ở cùng bề rộng nóc hộp thấp hơn demo ~50px. Hình dán cột cào cũng nằm lệch chỗ.
- **`l3_pompom`:** khi co cùng tỉ lệ cột cào thì to hơn demo ~1/4 (k 0,76) và quả bông thấp hơn ~40px. Đề nghị thêm dòng bảng cho `l3_pompom` (Rộng demo), hoặc vẽ dây ngắn hơn.
- **`l3_sua_in_box`:** hộp rộng 368 theo nhóm (D3-23), còn demo reveal vẽ ~315, nên Sữa trong hộp to và thấp hơn demo. Đã chấp nhận ở D3-23.
- **`player_point_think`:** hai chân dạng ra rộng hơn demo một chút; đầu và tay đã khớp.
- **Nền:** sofa và bàn lệch, Art đang vẽ lại (GD). Khi có nền mới, Dev đo lại kéo, gối, rèm.

**Ảnh chồng** (trái: game + demo 50%; phải: demo + game 55%), trong scratchpad phiên Dev: `l3_overlay_start_before.jpg` (bảng D3-22), `l3_overlay_start_fixed.jpg`, `l3_overlay_reveal_fixed.jpg` (bảng sửa).

**Code đã sửa thêm:**
- Túi đồ đọc X, Y của `ui_bag_bar` từ bảng; ô túi rộng 136.
- Quả bông treo đúng điểm móc (90, 225) trên ảnh cột cào, co cùng tỉ lệ.
- Hộp lật quanh tâm thân (neo − 160).
- Chưa ráp vào bản chơi chính thức (GD: chờ nền mới).

## Vòng 4e – Nền mới trùng demo, áp D3-26 (Art 2D PC)

- **Nền `l3_bg_living_room_afternoon`:** chủ dự án chốt sofa và bàn phải trùng demo.
  - Không vẽ lại bằng image_gen (khó trúng vị trí). Art dời bằng script ngay trên nền Codex:
    - tách sofa (cả viền, chân) và dời lên 60px;
    - dải bàn + chân tường + sàn (y 640–1080) dời lên 31px;
    - vá chỗ trống theo từng hàng ngang.
  - Nét, màu giữ nguyên; thảm, cửa sổ, kệ không đổi. Bản Codex lưu ở `_refs/l3_bg_living_room_afternoon_v1.png`.
  - **Đo lệch so với demo reveal:** sofa y 540–813 (demo 541–812) ≤ 1px; bàn: mép ở x=200 tại y 734 / 821 (demo 733 / 821) ≤ 1px.
- **Bảng vị trí theo D3-26 (Dev đo bằng máy):**
  - `player_point_think` 649,1209 (rộng 390); hộp (cả nhóm) 224,1212 (368); bong bóng 771,691 (260); `l3_cat_tree` 846,1230 (322); `player_sad` 511,1192 (245); túi 409,1478 (688).
  - Kéo 140,703 và gối 565,692: về lại vị trí demo, vì nền giờ trùng demo.
  - Thêm dòng `l3_pompom` 737,829, Rộng demo 44: quả bông nhỏ lại ~1/4, quả bông cao lên ~30px.
- **Hộp asset thấp hơn demo** (D3-26 (1): cao/rộng 0,63 so với 0,77). Đang giao Codex vẽ lại `l3_box_sheet` đúng tỉ lệ và màu nhạt. Bản trước lưu ở `_refs/l3_box_sheet_v1.png`.
- Ảnh kiểm `art/out/_check/l3_compose_vs_demo.jpg` đã ghép lại với nền mới; hộp vẫn là bản cũ, sẽ ghép lại khi có hộp mới.

---

## Vòng 4f – Dev đo lại trên nền mới (D3-27)

Đo bằng `match` và phóng to từng vùng (`zoomCmp`, lưới 20px) trên nền mới của Art.
- **Khớp demo** (lệch ≤ 4px): sofa, bàn, rèm, lọ hoa, cậu bé chỉ tay, bong bóng suy nghĩ, cột cào, cậu bé buồn, túi đồ, 4 ô túi.
- **Đề nghị Art ghi vào bảng mục 6:**

| Key | Hiện tại | Sửa | Lý do |
|---|---|---|---|
| l3_scissors | 140, 703, 120 | **140, 711**, 120 | Kéo asset cao hơn kéo demo; cho đáy kéo nằm trên mặt bàn như demo (đáy demo y≈710) |
| l1_pillow_white_idle | 565, 692, 185 | **565, 698, 198** | Gối level 1 dùng lại có lông mờ ở mép, phần vẽ rõ hẹp hơn: demo rộng ~179, đáy y≈695 |
| l3_pompom | 737, 829, 44 | **738, 750, 60** | Quả bông demo đường kính ~60, tâm (738, 880). Dây asset dài hơn demo, nên neo đỉnh dây đặt cao hơn và code vẽ quả bông **sau** cột cào: phần dây thừa khuất sau ổ nằm. Móc (90, 225) trên ảnh cột cào không dùng nữa |

- **Code:** quả bông đặt dưới lớp cột cào. Màu bóng Sữa trên rèm đổi sang tím xám nhạt `0x6b6190` cho giống demo (độ mờ vẫn 35% theo G3-4).
- **Còn lệch do asset** (Art đang xử lý): hộp quà và hộp có Sữa (đang vẽ lại theo tỉ lệ 0,77); vòng treo rèm của asset to hơn demo một chút (không ảnh hưởng chỗ đặt); chân cậu bé chỉ tay (Art giữ).
- **Ảnh chồng** (scratchpad phiên Dev): `l3_overlay_start_newbg.jpg`, `l3_overlay_reveal_newbg.jpg`, `l3_zoom_pompom.jpg`.

## Vòng 4g – Tờ hộp mới, áp D3-27 (Art 2D PC)

- **`l3_box_sheet` vẽ lại** (Codex 1 lượt, có "Nhắc lại quy tắc" và "Tự kiểm"): hộp cao hơn, tỉ lệ ~0,68.
  - Art chỉnh thêm bằng script: kéo cao ×1,11 (đáy giữ nguyên), hạ bão hoà ×0,8; tờ thành 1536x1180.
  - Kết quả: hộp đóng tỉ lệ 0,77 như demo, bão hoà 0,277 (demo ~0,30). 4 trạng thái cùng tỉ lệ.
  - Lưu kèm: bản Codex `_refs/l3_box_sheet_v2_codex_raw.png`; bản cũ `_refs/l3_box_sheet_v1.png`.
- **Neo ghi tay mới** (giữa mép đáy mặt trước, trong tờ): taped (373,555), open (1130,555), upside (372,1136), sua (1131,1136).
  - Sau khi cắt, cả 4 cùng khung **617x445, neo (304,435)**.
  - **Thân hộp:** mặt trước từ y≈112 tới đáy 435, cao **~323px** ảnh xuất; mặt trên từ y≈46. Tâm xoay ≈ neo − 162.
- **D3-27 đã ghi vào bảng mục 6:** kéo 140,711 (rộng 120); gối 565,698 (198); `l3_pompom` 738,750 (60), vẽ sau cột cào, bỏ móc (90,225).
- Nhóm hộp vẫn để 224,1212 (rộng 368) **chờ Dev đo lại** với asset mới.
- Ảnh kiểm mới: `art/out/_check/l3_compose_vs_demo.jpg`.

---

## Vòng 4h – Dev đo nhóm hộp mới (D3-28)

- **Nhóm hộp** (`l3_gift_box_taped`, `l3_box_upside_down`, `l3_sua_in_box`): **X 224, Y 1226, Rộng demo 368**. Chỉ đổi Y (1212 → 1226).
  - Với số này, mép trái, mép phải, nóc và đáy hộp quà trùng demo (≤ 3px): hộp x 52–419, y 945–1227.
  - Băng dính dọc và hình dán lệch ~10px so với demo; do hình vẽ asset, không ảnh hưởng chỗ đặt.
- **Code:** tâm xoay hộp = neo − 162 (theo Vòng 4g).
- **Hộp có Sữa ở cảnh lộ diện:**
  - Thân hộp khớp demo reveal: đáy y≈1222, rộng ~330 so với ~320.
  - **Sữa trong asset nằm thấp và nhỏ hơn demo.** Đỉnh đầu y≈929 so với ≈877 trên demo (thấp ~50px); đầu rộng ~155 so với ~172.
  - Nếu cần giống demo: vẽ lại ô `l3_sua_in_box` cho Sữa ngồi cao hơn trong hộp, đầu to hơn ~10%. Thân hộp giữ nguyên khung và neo.
- Ảnh phóng to (scratchpad phiên Dev): `l3_zoom_box_start.jpg`, `l3_zoom_box_reveal.jpg`.

## Vòng 4i – Chủ dự án duyệt ảnh kiểm cuối; D3-28 (Art 2D PC)

- Chủ dự án đã duyệt ảnh kiểm cuối Level 3 (qua GD). Dev ráp chính thức.
- **D3-28 đã ghi vào design-art mục 6:** `l3_gift_box_taped`, `l3_box_upside_down`, `l3_sua_in_box` ở X 224, Y 1226, Rộng demo 368. Tâm xoay = neo − 162.
- **Đang làm:** `l3_sua_in_box`, Sữa ngồi cao hơn ~50px và đầu to hơn ~10% cho giống demo (Dev đề xuất).
  - Codex chỉnh riêng ảnh này. Art ghép phần Sữa mới vào đúng thân hộp trên tờ, nới tờ để đầu không bị cắt.
  - Cả nhóm hộp sẽ nới khung chung; neo vẫn ở giữa mép đáy mặt trước. Xong báo Dev đo lại cảnh lộ diện.

---

## Vòng 5 – Dev ráp asset thật, chơi thử (sau khi chủ dự án duyệt ảnh kiểm cuối)

- **Bảng vị trí:** nhóm hộp 224, 1226, rộng 368 (D3-28) đã có trong design-art mục 6. Số dự phòng trong `level3.js` (`DEF`, `FIT`) đã cập nhật bằng đúng bảng hiện tại.
- **Asset:** cả 19 key level 3 đều nạp ảnh thật, không còn ảnh tạm.
- **Chơi thử hết luồng, không lỗi JS:**
  - Mở màn, rồi nhặt kéo, cắt hộp, ghép, đặt cột cào. Sữa vồ bông, cào trụ, biến mất; lật hộp, bế Sữa. Màn thưởng 20 cá khô (30 nếu đã chạm lọ hoa), ♥ 3/4, chạm thì sang Level 1.
- **Nhánh sai, đều đúng spec:**
  - Chạm hộp khi chưa có kéo: hộp rung.
  - Chạm rèm 3 lần: Sữa thò đầu lè lưỡi.
  - Thả kéo, thân cột cào hay cột cào sai chỗ: bay về túi; riêng cột cào thả sai thì thảm nhấp nháy.
  - Chạm ô túi: tay hướng dẫn nhắc lại thao tác kéo.
  - Chạm hộp úp khi chưa tới lượt: không phản ứng.
  - Chạm Sữa lúc đang vồ: Sữa biến mất ngay.
  - Rèm sau khi Sữa biến mất: chỉ lay rèm.
  - Gợi ý 8 giây chạy; 💡 hiện bàn chân làm mẫu.
- **Level 1, 2** vẫn vào và chơi được. Level 2 thưởng xong sang Level 3.
- **Ảnh** (scratchpad phiên Dev):
  - `l3_final_start_overlay.jpg`, `l3_final_start_side.jpg`: cảnh đầu, ♥ 2/4 như khi đi từ level 2.
  - `l3_final_pounce.jpg`: lúc Sữa vồ bông, đặt cạnh demo reveal.
  - `l3_final_reveal_side.jpg`, `l3_final_reveal_overlay.jpg`: cảnh lộ diện.
- **Còn lại:**
  - Ảnh `l3_sua_in_box` (Sữa ngồi cao hơn) Art đang chỉnh. Có file mới thì game tự nạp; Dev đo lại cảnh lộ diện.
  - Nút 💡 trong game thấp hơn demo ~40px. Vị trí này chung cho mọi level, Dev giữ nguyên.

## Vòng 4j – Sữa trong hộp ngồi cao hơn; nút tạm dừng (Art 2D PC)

- **`l3_sua_in_box`:** Codex chỉnh riêng ảnh (1 lượt, có "Nhắc lại quy tắc" và "Tự kiểm"): Sữa ngồi cao hơn, đầu to ~10%.
  - Art ghép phần trên mép trước (Sữa, nắp, lòng hộp) + hai bàn chân vào đúng thân hộp trên tờ (co về bề rộng mặt trước 533px); xoá chân cũ dưới mép.
  - Tờ nới thành 1536x1280 (hàng dưới dời xuống 100px).
  - **Khung cả nhóm hộp mới: 620x490, neo (304,480)**; thân không đổi, tâm xoay = neo − 162.
  - Lưu kèm: bản Codex `_refs/l3_sua_in_box_v2_codex.png`; tờ trước `_refs/l3_box_sheet_v2.png`.
- **Nút tạm dừng dùng chung** (Dev nhờ, `leveldesign.md` "Tạm dừng chung"): thêm đặc tả và bảng tờ `ui_pause_sheet` vào `style.md` mục 5.
  - Key: `ui_pause_button` (rộng 88), `ui_play_button`, `ui_restart_button` (rộng 180), neo tâm, `art/out/common/`.
  - Đã vẽ (Codex 1 lượt, có "Nhắc lại quy tắc" và "Tự kiểm") và cắt; ô sửa theo khung thật.
  - `art/out/common/ui_pause_button.png` 148x148, `ui_play_button.png` 286x284, `ui_restart_button.png` 286x285; neo tâm (ghi trong `anchors.json`).
  - Nền kem, viền gỗ caramel như ô túi, biểu tượng nâu mập, không chữ.

---

## Vòng 5b – Dev: nút tạm dừng chung, đo lại Sữa trong hộp

**Nút tạm dừng** (leveldesign "Tạm dừng chung (mọi level)"), làm trong `base.js`, chạy cho mọi level:
- Nút ⏸ ở tâm (951, 66), rộng 88, vùng chạm 120. Bấm thì cả màn dừng: tween, hẹn giờ, đồng hồ gợi ý, âm thanh. Màn phủ tối, giữa có ▶ chơi tiếp và ↻ chơi lại màn.
- Chạm ra ngoài hai nút: không làm gì.
- ▶: chạy tiếp đúng chỗ; đồng hồ gợi ý không đếm lại (đã thử: đang 6,6 giây thì chạy tiếp từ 6,7, tới giây 8 thì gợi ý).
- ↻: chơi lại màn, túi đồ trống, ♥ giữ nguyên.
- Đang kéo món túi đồ mà bấm dừng: món về ô.
- Chuyển tab hoặc khoá màn hình: tự dừng (sự kiện `hidden` của Phaser).
- Ảnh `ui_pause_button`, `ui_play_button`, `ui_restart_button` chờ Art vẽ. Hiện dùng ảnh tạm vẽ bằng hình khối; có file thật thì tự nạp.
- Đã thử ở Level 1, 2, 3, không lỗi JS. Ảnh (scratchpad phiên Dev): `pause_l1_l2_l3.jpg`.

**Sữa trong hộp mới** (khung 620x490, neo (304, 480)):
- Bảng giữ nguyên 224, 1226, rộng 368. Thân hộp đúng chỗ, đáy y≈1220.
- Sữa đã cao hơn bản trước 45px. So với demo reveal, đỉnh đầu y≈884 (demo ≈854): còn thấp ~30px. Tâm đầu lệch phải ~20px, đầu rộng ~177 (demo ~195).
- Phần còn lệch chủ yếu vì hộp game rộng 368, còn demo reveal vẽ ~320 (D3-23, đã chấp nhận). Dev thấy chấp nhận được; Art xem có cần chỉnh thêm không.
- Ảnh: `l3_final_reveal_side_v2.jpg`, `l3_zoom_box_reveal_v2.jpg`.

## Vòng 6 – Sửa sau khi chủ dự án chơi thử (Art 2D PC, D3-29; Dev chốt phương án)

1. **Cửa sổ + rèm nhỏ lại, nằm sau sofa:**
   - Nền: cửa sổ + thanh rèm thu 0,85, giữ đáy, dời phải 30px (gốc mới (99,214)). Chỗ trống vá theo màu sáng xung quanh, phủ vân giấy.
   - Sofa tách thành sprite **`l3_sofa_front`** (671x326, neo góc trên trái (346,524), không co), vẽ trên rèm và dưới gối.
   - `l3_curtain_closed` không vẽ lại: X 318, Y 246, rộng 378.
   - Bóng Sữa: góc trái x 214, góc phải x 439, chân y≈632.
2. **Kéo to hơn:** cắt lại với hiển thị rộng 170 (trước 120); bảng: 140,711, rộng 170. Icon trong túi code tự co.
3. **Cột cào 4 mảnh:** Art cắt thẳng từ `l3_cat_tree` theo hình, dựng tờ `l3_tree_sheet`.
   - Key: `l3_tree_base`, `l3_tree_post`, `l3_tree_mid`, `l3_tree_top`.
   - Cùng khung 518x856 và cùng neo với `l3_cat_tree` (cùng nhóm tree). Chồng 4 mảnh ra đúng cây cũ; chỉ ~1% điểm ảnh lệch, ở viền mép.
   - Đế được lấp chỗ trụ che, để xem riêng không bị khuyết.
   - Bỏ `l3_post_body`, `l3_post_base`. Hình mờ và icon túi code tự làm (Dev chốt).
4. **Gối = bí mật 🎁:** dùng lại `l1_pillow_white_idle/flipped`, không vẽ mới.
5. **Dải banner 150px:**
   - Thảm trên nền dời lên 85px (y 996–1236); bảng: mọi đồ sàn lên 85px.
   - Vị trí mới: hộp 224,1140; cột cào 846,1145; `player_point_think` 649,1124; `player_sad` 511,1107; bong bóng 771,606; quả bông 738,665; Sữa vồ/cào y 1140.
   - Túi đáy 1380, ô tâm y 1290 (Dev); nút 💡 (934,1306).
- Bản nền trước lưu ở `_refs/l3_bg_living_room_afternoon_v2.png`.
- **Ảnh kiểm:** `art/out/_check/l3_compose_vs_demo.jpg`, 4 ô: demo start | ghép start | ghép giữa màn (hộp úp, hình mờ cột cào, đã lắp đế + trụ, túi còn 2 mảnh) | ghép lộ diện. Dải xám = vùng banner.

---

## Vòng 6b – Dev: sửa theo chủ dự án chơi thử (asset D3-29)

1. **Dải banner 150px (mọi level, `base.js`):**
   - Túi đồ: đáy dải ở mép dưới màn hình − 156 (y 1380 trên khung 1536), ô túi tâm y 1290.
   - Nút 💡: tâm (934, mép dưới − 230), tức y 1306.
   - Tính theo **mép dưới màn hình thật**, nên máy dài hơn 2:3 thì banner vẫn nằm sát đáy.
   - Level 1, 2 không có đồ chạm được trong dải này: đáy giỏ tất L2 y≈1327, dép y≈1336, chậu cây L1 y≈1345.
2. **Icon túi to hơn (mọi level):** icon cắt sát phần vẽ thật (khung `trim`) rồi co tới 116px, gần kín ô 136. Kéo trong cảnh rộng 170 (Art).
3. **Cột cào 4 mảnh (Level 3):**
   - Cắt hộp: kéo bay khỏi túi, 4 mảnh vào túi theo thứ tự xáo (tầng giữa, đế, ổ đỉnh, trụ dưới). Hộp lật úp, hình mờ 4 mảnh hiện trên thảm (trắng, mờ 35%).
   - Lắp từ dưới lên, mỗi mảnh thả trúng vùng của nó (nới 60px): "cạch", lóe sáng. Mảnh cuối xong thì thay bằng cả cây `l3_cat_tree`, quả bông treo vào, Sữa ra chơi.
   - Sai thứ tự hoặc sai chỗ: mảnh về túi, vùng đang tới lượt nhấp nháy. Thả mảnh lên mảnh khác trong túi: hai món lắc, về chỗ cũ.
   - Bàn tay hướng dẫn chỉ làm mẫu mảnh đế; chạm ô túi thì nhắc lại cho mảnh đang tới lượt.
   - Gợi ý 8 giây: mảnh tới lượt nảy, vùng nhấp nháy. 16 giây: mảnh lấp lánh.
   - Không ghép trong túi ở Level 3; hàm ghép chung `bagMerge` vẫn giữ cho level sau.
4. **Sau khi Sữa biến mất:** cậu bé gãi đầu 1 giây, rồi bong bóng nhiệm vụ (đầu mèo tối) bật ra giữa màn, sau đó thu về góc.
5. **Bỏ gợi ý tự động ở hộp úp:**
   - Không nhấc mép, không đuôi thò, không nhích, không rung, không lấp lánh (đã thử 20 giây: hộp đứng yên, không gợi ý).
   - Chỉ 💡 chỉ vào hộp. Mỗi 7 giây có một tiếng "meo" rất nhỏ (độ to 0,15).
6. **Bí mật +5 cá:**
   - Gối: lần đầu nảy cao, lật mặt, 5 cá bay về góc; lần sau chỉ nảy.
   - Lọ hoa: nghiêng, 5 cá rơi ra, chỉ lần đầu.
   - Thưởng màn: 20 + 5 mỗi bí mật.

**Asset D3-29 đã nạp:**
- 4 mảnh cột cào, `l3_sofa_front` ở (346, 524), không co, nằm trên rèm và bóng Sữa, dưới gối. Nền mới, kéo 170, bảng vị trí mới.
- Bóng Sữa ở x 214 / 439. Số dự phòng trong `level3.js` đã cập nhật theo bảng.
- Chưa có file mảnh thì code tự cắt tạm 4 dải từ `l3_cat_tree`.

**Chơi thử:** Level 3 chạy hết luồng, không lỗi JS. Level 1, 2 vào và tạm dừng được. Ảnh (scratchpad phiên Dev): `l3_v6_start.jpg`, `l3_v6_build.jpg` (đang lắp, đã đặt đế), `l3_v6_pounce.jpg`, `l3_v6_reveal.jpg`.

---

## Vòng 6c – Màu hình mờ cột cào (GD chốt đề xuất của Art)

- Hình mờ 4 mảnh tô **nâu viền chung #6B4A3A**, độ mờ 25% (trước đây trắng 35%). Đọc rõ trên cả thảm hồng và sofa xanh.
- Mảnh đang tới lượt **nhấp nháy nhẹ liên tục** 25% ↔ 45% (0,7 giây mỗi nhịp).
- Lúc kéo mảnh qua đúng vùng thì đậm 60%; thả sai thì nhấp nháy mạnh 3 lần rồi trở lại nhịp nhẹ.
- Ảnh (scratchpad phiên Dev): `l3_v6_build_brown.jpg` (đã đặt đế, 3 mảnh còn lại là hình mờ nâu).

---

## Vòng 6d – Dev: chia lại 4 mảnh cột cào (chủ dự án chốt)

- 4 mảnh, lắp theo thứ tự:
  1. Bục xanh + cột: `l3_tree_p1`.
  2. Bục hồng + cột: `l3_tree_p2`.
  3. Bục trắng có móc: `l3_tree_p3`.
  4. Quả cầu lông: chính `l3_pompom`. Hình mờ là chỗ treo dưới móc; treo xong thì quả cầu là con của cột cào và đung đưa.
- Mảnh 1–3 cùng khung, cùng neo với `l3_cat_tree`.
  - Chưa có file thì code cắt tạm dải ngang từ `l3_cat_tree`: p1 y 500–856, p2 y 212–500, p3 y 0–215 (ảnh 518x856).
  - Khi Art giao file: nếu tên khác `l3_tree_p1..p3`, Dev đổi tên trong `level3.js` (hằng `PARTS`).
- Bàn tay làm mẫu mảnh 1. Treo quả cầu xong: cả cây lóe sáng, quả cầu đung đưa, Sữa ra chơi.
- Đã thử: thả quả cầu trước thì về túi, vùng mảnh 1 nhấp nháy. Lắp đủ 4 mảnh thì Sữa chơi, biến mất; lật hộp, bế Sữa, sang màn thưởng. Không lỗi JS.
- Icon quả cầu trong túi nhỏ vì dây dài (icon co theo chiều cao). Nếu Art cắt thêm icon riêng hoặc dây ngắn hơn thì icon to hơn.
- Ảnh (scratchpad phiên Dev): `l3_v6_build_4parts.jpg` (đã lắp 3 mảnh, chờ treo quả cầu).

---

## Vòng 6e – Dev: icon quả cầu và hình mờ chỗ treo (GD)

- Icon quả cầu trong túi chỉ lấy phần quả cầu, bỏ sợi dây (code cắt khung vuông ôm đáy ảnh `l3_pompom`). Icon giờ rộng 116, gần kín ô như các món khác.
- Dây chỉ hiện khi quả cầu đã treo lên móc. Vùng thả của quả cầu cũng chỉ là phần quả cầu.
- Hình mờ chỗ treo quả cầu đậm hơn các mảnh khác: nền 45%, nhấp nháy tới 75% (các mảnh khác 25% ↔ 45%).
- Không cần Art cắt lại. Ảnh (scratchpad phiên Dev): `l3_v6_pompom_icon.jpg`.

## Vòng 7 – Cột cào vẽ lại theo tỉ lệ demo, chia 4 mảnh mới (Art 2D PC, D3-30)

- **Đo trên `demo/l3_demo_reveal.png`** (px màn hình, gốc góc trên trái cây, cây 352x530):
  - ổ (63,0)–(352,128);
  - trụ trên (168,112)–(246,240);
  - tầng hồng (0,205)–(297,310);
  - trụ dưới (103,300)–(190,440);
  - đế (13,388)–(283,530).
  - Ổ và trụ trên lệch phải; tầng hồng rộng nhất; đế hẹp hơn tầng hồng. Cây cũ thì mọi tầng rộng bằng nhau và thẳng hàng.
- **Dựng lại bằng script** từ các phần của cây cũ (giữ nét, màu, vân lông), mỗi phần co về đúng hộp bao trên.
  - Mặt tầng hồng chỗ trụ cũ được vá lông, đoạn viền mép sau vẽ lại theo đường cong khớp.
  - Quả cầu: đường kính 62, đỉnh quả cầu cách móc 37 px màn, theo demo; dây ngắn như Dev xin.
  - Tờ cũ lưu ở `_refs/l3_tree_sheet_v1.png`.
- **4 mảnh theo cách chia mới** (GD), tên theo code Dev:
  - `l3_tree_p1` (bục xanh + cột), `l3_tree_p2` (bục hồng + cột), `l3_tree_p3` (bục trắng có móc): cùng khung, cùng neo với `l3_cat_tree` (nhóm tree).
  - `l3_pompom` (quả cầu + dây): neo đỉnh dây.
  - Đã xoá file `l3_tree_base/_post/_mid/_top`, `l3_post_body/_base`; dòng của chúng trong `anchors.json` không dùng nữa.
- **Bảng:** `l3_cat_tree` 790,1145, Rộng demo 352 (neo = giữa đáy đế; X đổi vì đế không còn nằm giữa cây). `l3_pompom` 745,741, rộng 62 (móc lệch (−45, −404) px màn so với neo cây).
- **Ảnh kiểm** `art/out/_check/l3_compose_vs_demo.jpg`, 5 ô: demo start | ghép start | ghép giữa màn (hình mờ nâu nhạt 4 mảnh, đã lắp mảnh 1, túi có 3 mảnh) | demo reveal | ghép lộ diện.

---

## Vòng 7b – Dev nạp cột cào mới (Art Vòng 7)

- Đã nạp `l3_cat_tree`, `l3_tree_p1..p3` (cùng khung, cùng neo) và `l3_pompom` dây ngắn. Bỏ khỏi danh sách nạp các key cũ `l3_tree_base/_post/_mid/_top`.
- Số dự phòng trong `level3.js` theo bảng mới: cột cào 790, 1145, rộng 352; quả cầu 745, 741, rộng 62.
- Dây quả cầu giờ ngắn nên quả cầu vẽ **trước** cột cào và trước Sữa lúc vồ: luôn thấy quả cầu giữa hai chân Sữa.
- Chơi thử hết luồng tới màn thưởng, không lỗi JS. Ảnh (scratchpad phiên Dev): `l3_v7_build.jpg` (đã lắp 2 mảnh, hình mờ bục trắng và chỗ treo), `l3_v7_pounce.jpg`, `l3_v7_reveal.jpg`.

## Vòng 7c – Làm sạch 4 mảnh cột cào (Art 2D PC, theo GD)

- **Đầu cột thừng** ở `l3_tree_p1` và `l3_tree_p2`: bỏ mép cắt răng cưa, vẽ **nắp cột** hình elip mặt trên, viền nâu #6B4A3A kèm một vòng thừng cuộn. Khi lắp, bục phía trên che kín nắp.
- **Vệt trắng bên trái chân cột** trên bục hồng: do bộ lọc màu thừng đọc ảnh gốc (chỗ trụ cũ), nên xoá mất đoạn viền đã vẽ lại. Đã sửa cho đọc ảnh đã vá; viền mép sau tầng hồng giờ liền.
- **Mảng xanh lem ở chân cột** trên bục xanh: vá lại cả dải dưới chân trụ cũ (gồm vòng chân và bóng chì cũ) bằng vân lông cùng hàng.
- Hình dáng, tỉ lệ, khung, neo không đổi. Cắt lại cả nhóm tree.
- Ảnh 4 mảnh rời + cây lắp xong: `art/out/_check/l3_tree_pieces.jpg`. Ảnh kiểm cảnh: `art/out/_check/l3_compose_vs_demo.jpg`.

---

## Vòng 8 – Dev: góp ý chủ dự án (bàn, bóng Sữa, bí mật)

1. **Kéo** nằm lớp trên rèm (`D.curtain + 1.1`). **Bàn tròn:** code đã sẵn chỗ cho sprite `l3_table` (neo góc trên trái, không co, lớp trên rèm và dưới kéo). Chờ Art tách bàn và ghi dòng bảng `l3_table`.
2. **Bóng Sữa:** chạy thì quay mặt theo hướng chạy. Đứng ở góc phải thì lật, quay đầu sang trái; về góc trái thì quay lại như cũ.
   - Lúc thò đầu: vẫn thò ra ở mép rèm gần chỗ đang nấp, mặt hướng ra ngoài mép (góc phải nhìn sang phải, góc trái nhìn sang trái), vì phần cắt của ảnh `sua_peek_tongue` phải khuất sau rèm.
3. **Gối và lọ hoa giữ chuyển động như bản trước**, chỉ thêm 5 cá lần đầu.
   - Gối: nhún rồi lật mặt; lần sau chỉ lắc nhẹ.
   - Lọ hoa: nghiêng.
   - Đã thử: chạm gối lần 2 không cộng thêm. Thưởng màn 30 khi tìm đủ 2 bí mật.
4. **Sofa:** khi Art sửa `l3_sofa_front` thì game tự nạp; lớp sofa trên rèm và bóng Sữa không đổi.
- Ảnh (scratchpad phiên Dev): `l3_v8_shadow_right_zoom.jpg` (giữa: bóng Sữa ở góc phải quay trái, kéo trên bàn), `l3_v8_pillow_vase.jpg` (trái: chạm gối; phải: chạm lọ hoa, cá bay ra).

## Vòng 8 – Cột cào Codex vẽ lại (D3-31), sofa đủ viền, tách bàn (D3-32) (Art 2D PC)

- **Cột cào:** Codex vẽ lại theo `l3_cat_tree_brief.md` + mẫu `art/ref/l3_cat_tree_ref.png`, 2 lượt (`_refs/l3_cat_tree_v2_sheet_try1.png`, `_try2.png`). Chủ dự án nhận lượt 2. Art chỉ làm hai việc:
  - Nhạt màu: bão hoà 0,31 → 0,23.
  - Co đều + đặt từng mảnh rời vào đúng chỗ phần tương ứng trong cây Codex vẽ, khớp khung bao mảng màu: p1 ×0,99; p2 ×1,14; p3 ×1,09; quả cầu ×0,72, vòng dây móc đúng đáy móc ổ. Không vá, không ghép.
  - `l3_cat_tree` = chồng p1→p2→p3, không có quả cầu.
  - Tờ mới `l3_tree_v3_sheet`. Key giữ nguyên: `l3_cat_tree`, `l3_tree_p1/p2/p3`, `l3_pompom`.
  - Bảng: cây 790,1145, rộng 352 (neo giữa đáy đế); `l3_pompom` 705,746, rộng 68 (neo đỉnh vòng dây).
  - Ảnh 4 mảnh + cây cạnh mẫu: `art/out/_check/l3_tree_pieces.jpg`.
- **Sofa:** cắt lại `l3_sofa_front` từ nền v2 (sofa nguyên), mặt nạ nới tới viền nâu. Góc lưng trái và đầu tay vịn (chỗ khung cửa sổ cũ chạm) vẽ bù viền nâu theo đường bao làm mượt; đã dán lại lên nền. Neo 342,524, cỡ 670x328.
- **Bàn:** tách `l3_table` (269x203, neo góc trên trái 44,668, không co); bàn vẫn còn trong nền. Lớp: rèm → bóng Sữa → sofa_front, bàn → kéo → gối.
- Ảnh kiểm cảnh: `art/out/_check/l3_compose_vs_demo.jpg`.

---

## Vòng 8b – Dev nạp asset Vòng 8 của Art

- Đã nạp `l3_table` (44, 668, không co): bàn và kéo nằm trên rèm. Đã nạp `l3_sofa_front` cắt lại (342, 524), cột cào mới nhạt màu, `l3_pompom` (705, 746, rộng 68).
- Số dự phòng trong `level3.js` đã cập nhật theo bảng.
- Chơi tới lúc Sữa vồ quả cầu, không lỗi JS. Ảnh (scratchpad phiên Dev): `l3_v8_start_table_pounce.jpg` (trái: cảnh đầu, bàn và kéo trên rèm; phải: Sữa vồ quả cầu).

---

## Vòng 9 – Dev: góp ý chủ dự án (kéo to dần, lớp Sữa và nhân vật, Level 2 giỏ)

- **Kéo món từ túi (mọi level, `base.js`):** món đang kéo to dần trong 0,2 giây lên **đúng cỡ nó có trong cảnh**; thả sai thì co về cỡ icon.
  - Màn cho biết cỡ qua `dragScale(item)`. Level 3: kéo = cỡ kéo trên bàn, mảnh cột cào = cỡ cây, quả cầu = cỡ quả cầu treo. Màn nào không khai báo thì to hơn icon 1,3 lần như cũ.
  - Đã thử: mảnh 1 lúc kéo co 0,711 (đúng cỡ cây), thả sai về 0,259 (cỡ icon).
- **Sữa vồ quả cầu** dịch sang trái: `sua_pounce` X 610 (trước 640). Đã nhờ Art sửa dòng bảng; số dự phòng trong code đã là 610.
- **Sữa chạy đi** sau khi chơi xong nằm lớp **trên** cột cào và quả cầu.
- **Nhân vật trồi lên** (gãi đầu, nhún vai…, mọi level) nằm lớp trên túi đồ và các nút (`D.ui + 8`), lặn xong thì về lớp cũ.
- **Level 2:** giỏ tất nằm lớp trên ghế và áo len (`CHAIR_D + 1.5`), vẫn dưới chiếc tất rơi trên mặt ghế.
  - Lưu ý cho GD/Art: từ khi nút 💡 dời lên trên dải banner (tâm y 1306), nút đè lên mép phải giỏ tất Level 2. Nên dời giỏ sang trái ~60px hoặc lên trên.
- **Sofa level 1** thay `l3_sofa_front`: chờ file của Art, có thì tự nạp; Dev sẽ kiểm lại chỗ gối.
- Ảnh (scratchpad phiên Dev):
  - `l3_v9_drag_pounce.jpg`: trái, đang kéo mảnh 1 đã to đúng cỡ; phải, Sữa vồ quả cầu.
  - `l3_v9_run_react.jpg`: trái, Sữa chạy đi trước cột cào; phải, nhân vật gãi đầu trên túi đồ.
  - `l2_basket_layer.jpg`: Level 2, giỏ trên ghế và áo len.

---

## Vòng 10 – Dev: nhân vật trồi từ mép banner, giỏ tất L2 (GD chốt)

- **Nhân vật trồi lên (mọi level, `base.js` `react`)** từ **mép trên dải banner** (y = mép dưới màn hình − 150), không lấn vào dải banner.
  - Code che phần nằm dưới mép đó bằng mặt nạ hình chữ nhật; vẫn nằm trên túi đồ và các nút.
  - Lặn xong thì bỏ mặt nạ, về lớp cũ.
- **Level 2, giỏ tất:** GD chốt dời trái ~60px, nhưng đo thực tế phải dời 95px: X **680** (Y giữ 1320).
  - Ở 715, mép phải phần vẽ giỏ vẫn chạm nút 💡 (x 869).
  - Ở 680, mép phải giỏ ở x≈862, mép trái ở x≈502, còn trên thảm, xa dép (mép phải dép x≈304).
  - Đã nhờ Art ghi vào `design-art-level2.md`.
- Ảnh (scratchpad phiên Dev), đường đỏ đứt là mép trên dải banner y 1386: `v10_react_banner_l2_basket.jpg` (trái: Level 3 nhân vật gãi đầu trồi từ mép banner; phải: Level 2 giỏ ở X 680, không đè 💡), `v10_react_both.jpg` (Level 2 nhân vật nhún vai, giỏ ở X 715 còn chạm nút).

## Vòng 9 – Sofa dùng của level 1 (D3-33); sửa bảng theo Dev (Art 2D PC)

- **`l3_sofa_front` = sofa level 1** (chủ dự án chốt, `l3_sofa_brief.md`):
  - Tách từ `level1/l1_bg_living_room.png` cùng đệm phải `l1_sofa_cushion_flat`, đặt như cảnh L1 (neo đáy 705,955, rộng 396).
  - Tách theo đường viền nâu khép kín (đổ màu từ ngoài vào, không vượt qua viền), nên viền giữ nguyên như L1. Bỏ dải sàn/chân tường lọt vào, mép alpha mòn 1px nên không còn quầng sáng.
  - Co đều ×0,691 cho bằng bề rộng sofa L3 cũ (670), đáy chân giữ y 851. Neo góc trên trái **(342, 589)**, 670x263, không co.
  - Bản cũ lưu ở `_refs/l3_sofa_front_v2.png`.
- **Nền:** xoá sofa cũ (thấp hơn sofa mới 65px ở lưng). Lắp lại phần lộ ra theo từng hàng: kính + khung đứng + bệ cửa sổ, tường dưới bệ và bên phải (lấy từ hàng tường ngay trên), chân tường + sàn.
  - Bản trước lưu ở `_refs/l3_bg_living_room_afternoon_v3.png`.
- **Gối:** đặt lại theo đúng chỗ gối trên sofa L1 (L1 308,875 rộng 235 → L3) **535, 742, rộng 162**.
- **Sửa bảng theo Dev:**
  - L3: `sua_pounce` X 640 → 610.
  - L2 (`design-art-level2.md`): `l2_sock_basket_full` X 775 → 680, để không chạm nút 💡.
- Ảnh kiểm cảnh start + lộ diện: `art/out/_check/l3_sofa_start_reveal.jpg`; 5 ô: `art/out/_check/l3_compose_vs_demo.jpg`.

## Vòng 10 – Chủ dự án chơi thử (Art 2D PC)

- **Sofa:** `l3_sofa_front` chính là sofa level 1 (cắt từ ảnh nền L1, kèm đệm phải L1), không vẽ lại; chỉ co ×0,691 cho vừa phòng L3.
  - Muốn dùng chung một file cho cả L1 và L3 thì phải tách sofa khỏi nền L1 và cho L1 dùng sprite đó. File chung ở cỡ L1 nặng ~680 KB, trong khi bản L3 hiện chỉ ~290 KB, nên giữ file L3 hiện tại là nhẹ hơn. Chưa đổi gì, chờ chủ dự án chốt.
- **Mèo nghịch cột cào lùi trái thêm 30px:** `sua_pounce` X 610 → 580, `sua_scratch_post` X 700 → 670 (Y giữ 1140).
- **Nhờ Dev (code):**
  - Hình mờ cột cào chỉ hiện gợi ý ở mảnh 1; các mảnh sau tắt hình mờ.
  - Nhân vật trồi đầu lên từ mép dưới (`react`, ví dụ `player_scratch_head`) to hơn một chút.

---

## Vòng 10b – Dev: góp ý chủ dự án (Art chuyển, Vòng 10)

1. **Hình mờ cột cào chỉ ở mảnh 1** (bục xanh + cột). Đặt xong mảnh 1 thì không còn hình mờ nào.
   - Các mảnh sau không có hình mờ, không nhấp nháy, kể cả khi thả sai hay khi gợi ý 8 giây (gợi ý chỉ nảy icon mảnh tới lượt).
   - Vùng thả vẫn tính theo đúng chỗ của mảnh.
2. **Mèo nghịch cột cào lùi trái:** `sua_pounce` X 580, `sua_scratch_post` X 670 (bảng Art đã sửa; số dự phòng trong code cũng đã đổi).
3. **Nhân vật trồi lên to hơn 1,2 lần** (mọi level, `react`); vẫn trồi từ mép trên dải banner, lặn xong về cỡ cũ.
- Đã thử: thả quả cầu khi đang tới lượt mảnh 2 thì quả cầu về túi, không hiện hình mờ. Không lỗi JS.
- Ảnh (scratchpad phiên Dev):
  - `l3_v12_ghost_pounce.jpg`, 4 khung: hình mờ mảnh 1; sau khi đặt mảnh 1 không còn hình mờ; Sữa vồ ở X 580; bong bóng nhắc.
  - `l3_v12_react_big.jpg`: cậu bé gãi đầu to hơn, cắt ở mép banner.

---

## Vòng 11 – Dev: góp ý chủ dự án (Art chuyển)

1. **Bỏ bàn tay chỉ vào Sữa ở cảnh lộ diện** (Level 3): vùng chạm Sữa vẫn bật, chỉ không còn tay hướng dẫn. Nút 💡 vẫn chỉ được. Level 1, 2 giữ như cũ.
2. **Mèo nghịch cột cào:** `sua_pounce` X 540, `sua_scratch_post` X 630 (theo bảng Art; số dự phòng cũng đổi).
3. **Sofa sắp thành sprite neo đáy:** code đã sẵn sàng.
   - Hàm `propImg` đặt sofa và bàn: ảnh chưa có dòng trong `anchors.json` thì neo góc trên trái, không co (như bây giờ).
   - Ảnh cắt bằng công cụ (có neo, Rộng demo) thì đặt như mọi sprite. Art chỉ cần ghi X, Y, Rộng demo mới.
4. **Rule mới** (nền chỉ là phòng trống, mọi đồ là sprite): Dev ghi nhận cho màn sau, mọi đồ đặt theo bảng vị trí.
- Ảnh (scratchpad phiên Dev): `l3_v13_pounce_reveal_nohand.jpg` (trái: Sữa vồ ở X 540; phải: lộ diện, không có tay chỉ).

## Vòng 11 – Rule nền trống; sofa Codex vẽ riêng (Art 2D PC, D3-34)

- **Rule mới (chủ dự án):** ảnh nền mỗi màn chỉ là phòng trống; mọi đồ vật, kể cả đồ không tương tác (thảm, bàn, sofa, kệ, cửa sổ), đều vẽ riêng thành sprite. Đã ghi vào `QUY-TRINH.md` và `art/style.md` mục 4.
- **Sofa:** Codex vẽ riêng `l3_sofa_sheet` (1 lượt, có "Nhắc lại quy tắc" và "Tự kiểm"; bão hoà 0,20). Cắt bằng `sheet_cut.py`, giữ key `l3_sofa_front`.
  - Neo đáy (giữa chân) **(677, 851)**, Rộng demo **670**.
  - Bản cắt từ nền L1 (D3-33) lưu ở `_refs/l3_sofa_front_v2.png` (bản D3-29); bản D3-33 bị ghi đè.
- **Mèo nghịch cột cào:** `sua_pounce` X 540, `sua_scratch_post` X 630.
- Ảnh kiểm start + lộ diện: `art/out/_check/l3_sofa_start_reveal.jpg`.

- **Chủ dự án chốt:** Level 3 giữ nguyên như hiện tại (nền còn thảm, kệ, cửa sổ, bàn vẽ sẵn); rule "nền trống, đồ vẽ riêng" áp từ Level 4.

- **Sofa nhạt màu theo level 1:** đo phần vải bạc hà của sofa L1 được sắc độ 87, bão hoà 0,144; sofa L3 Codex vẽ là 104 và 0,192, ngả xanh dương và đậm hơn.
  - Art chỉnh riêng vùng vải trên tờ `l3_sofa_sheet`: dời sắc độ −17, bão hoà ×0,75. Kết quả 88,6 và 0,147, khớp L1.
  - Viền, chân gỗ, hình, cỡ, neo giữ nguyên. Tờ gốc lưu ở `_refs/l3_sofa_sheet_codex_raw.png`. Ảnh so sánh: `art/out/_check/l3_sofa_vs_l1.jpg`.

---

## Trạng thái

- [x] Vòng 1: GD chốt G3-1…G3-10
- [x] Vòng 2: Dev nêu yêu cầu, Art đặc tả (`design-art-level3.md`)
- [ ] Vòng 3: vẽ 2 tranh demo (cần Codex chạy được trên máy này)
- [ ] Vòng 4: chủ dự án duyệt demo → vẽ tờ, tách, Dev ráp `game/src/level3.js`
