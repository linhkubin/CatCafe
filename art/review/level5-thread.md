# Level 5 – Đốm sáng: thread thảo luận

## Vòng 1 – Bản chơi thử bằng khối cơ bản

**G5-1 (chủ dự án chốt, luật mới từ Level 5):** "oke giờ đổi luật, cho dev code demo bằng các khối cơ bản trước nhé". Dev code cả màn bằng khối cơ bản (QUY-TRINH bước 2) trước khi vẽ. Chủ dự án duyệt gameplay trên bản khối rồi mới bàn art và vẽ demo.

**G5-2.** Đặc tả gameplay: `levels/levels-01-10.md` mục Level 5 và `levels/states-01-10.md` mục Level 5. Từ Level 4: không có bàn tay hướng dẫn (bàn chân mèo ở nút 💡 vẫn giữ), túi đồ dùng chung giống level 3.

**Art – ghi chú chuẩn bị (chưa vẽ, chờ bản khối được duyệt):**
- **A5-1.** Chưa có `art/out/cats/mun_ref.png`. Theo AGENTS.md, mọi asset `mun_` phải tham chiếu ảnh này, nên **phải vẽ `mun_ref` trước** (mèo đen tuyền, mắt vàng to, tai hơi to, đuôi dài, nhút nhát), cùng nét và cỡ đầu với `sua_ref`, và chủ dự án duyệt trước khi vẽ demo L5. Lông đen phải theo O6: đen ở đây là nâu than ấm có vân chì, không đen đặc; cần GD/chủ dự án chốt mức tối.
- **A5-2.** Đốm sáng: đặc tả ghi "có quầng sáng mờ", nhưng quy tắc vẽ cấm glow. Đề xuất: đốm sáng vẽ là hình tròn kem/vàng bơ có vân chì, còn quầng sáng để Dev làm bằng code (thêm mờ, nhảy nhót). Tương tự cho vệt nắng (9) và tia lóe của gương: vẽ mảng vàng bơ nhạt, còn độ sáng do code chồng lên.
- **A5-3.** Cảnh ngoài trời buổi chiều: nền dùng bảng màu khóa, chiều = vàng bơ, mật ong nhạt, không cam đậm. Hẻm "trong bóng râm" trước khi kéo bạt: Dev phủ lớp tối nhẹ bằng code thay vì vẽ 2 nền. Bóng tối gầm xe (8a) để thấy đôi mắt vàng: vẽ gầm xe là mảng nâu than nhạt, mắt là sprite riêng.
- **A5-4.** Sữa cameo ở cửa sổ quán (4): cần dáng mới `sua_window_peek` (áp mặt vào kính), tham chiếu `sua_ref`.
- Từ L4 giữ: nền chỉ có phòng trống (sân, hẻm), mọi đồ là sprite riêng; tách asset theo demo đã duyệt (G4-26).

**G5-3 (GD trả lời A5-1…A5-4):**
- `mun_ref` vẽ đầu tiên khi tới bước art (trước demo), chủ dự án duyệt riêng. Màu lông theo ngoại lệ đã có trong `art/style.md` mục 1: than ấm **#3E3838** có vân chì, không đen đặc; mắt vàng to.
- Đồng ý: đốm sáng, vệt nắng, tia lóe gương vẽ (nếu cần) là hình phẳng có vân chì, **quầng sáng và độ chói do code làm**. Ảnh không có glow.
- Hẻm "trong bóng râm" trước khi kéo bạt: code phủ tối, chỉ một nền hẻm.
- Sữa ở cửa sổ quán: thêm dáng mới khi tới bước art.
Các điểm này chờ chủ dự án duyệt gameplay bản khối rồi mới làm.

**D5-1. Dev: bản khối Level 5 chơi được trọn màn** (`?level=5`, thêm `&debug=1` để thấy vùng luật và tốc độ kéo). Chưa commit.
- **Code:** `game/src/level5.js` (mới); đăng ký màn ở `main.js` và `assets.js`.
  - Mọi key tự vẽ khối màu phẳng có nhãn. Tên key, lớp và vị trí theo states Level 5. Khi có ảnh thật, game tự dùng ảnh.
  - `base.js` thêm vài hook cho mèo không phải Sữa: thanh ♥ (Mun 6 ô, lưu riêng `munHearts`), mặt mèo trong bong bóng và màn thưởng, mèo trong cảnh bế, tiếng kêu. L1–L4 không đổi (đã chạy lại L4).
- **Phòng:** sân sau ⇄ hẻm, mũi tên chuyển phòng, bản đồ mini (ô Sân | Hẻm, ô Hẻm nhấp nháy lần đầu sang hẻm sau khi bóng đen chạy ra). Túi đồ dùng chung, đi theo camera như L4.
- **Luồng đã tự chơi hết:**
  - Thùng giấy: bóng đen vụt ra chạy sang phải, bong bóng nảy mạnh, mũi tên ► nhấp nháy.
  - Gầm xe: mắt vàng lùi sâu 2 giây, bong bóng suy nghĩ có đốm sáng.
  - Gương vào túi. Bạt vuốt lên thì cuộn, vệt nắng hiện dần. Thả gương vào vệt nắng thì có tia lên tường, đốm sáng hiện.
  - Kéo đốm sáng: nhanh > 600px/s thì mắt đảo, đốm sáng nháy 2 lần; sát gầm ≤ 200px và chậm thì chân đen thò ra vồ mỗi 1 giây; lượn chậm ở giữa hẻm cộng dồn 2 giây thì Mun phóng ra.
  - Mun đuổi 2 vòng (trễ 0,5 giây), vồ, đè, nhìn chân có đốm sáng. Chạm Mun thì thắng, chạm lúc đang đuổi cũng thắng. Sau đó cảnh bế và màn thưởng (♥ 1/6, 50 + 5 cá khô).
  - Đồ khác: túi rác (nhân vật bịt mũi, túi xẹp), quạ (bay qua lại giữa 2 chỗ trên dây), cửa sổ (Sữa nảy, "Meo?"), ống nước (5 cá khô một lần).
  - Chạm sai: thả gương khi chưa cuộn bạt thì gương về túi và lắc, bạt lấp lánh. Chạm chân Mun thì chân rụt ngay.
  - Gợi ý: 8 giây (mắt chớp, đốm sáng tự nháy, đồ cần chạm rung), 16 giây (lấp lánh đồ hoặc mũi tên, có đốm sáng thì đường chấm mờ), 💡 (bàn chân chạm mẫu, vuốt bạt mẫu, kéo gương mẫu; đốm sáng thì chân kéo đốm sáng mờ theo đường chấm). Không có bàn tay hướng dẫn.
- **Ảnh** `art/review/l5_dev_check/1…18`: sân, bóng đen chạy, gầm xe, túi rác, gương sai chỗ, đốm sáng hiện, chân vồ, lượn giữa hẻm, Mun đuổi, đè, nhìn chân, gợi ý 16 giây, 💡, cảnh bế, màn thưởng.
- **Dev tạm chọn, cần GD chốt:**
  1. Đốm sáng vẽ **trên** xe ba gác (ánh sáng rọi lên xe). Đặc tả để đốm sáng dưới lớp xe, như vậy kéo qua thân xe là mất hút.
  2. "Lượn chậm" chỉ cộng giờ khi đang giữ, đang di chuyển (40–600px/s) và ở trong "giữa hẻm". Giữ yên một chỗ không tính. Giờ cộng dồn cả lượt, không đặt lại.
  3. "Giữa hẻm" = mặt đất hẻm (x 150–880, y 790–1165) nhưng cách gầm xe > 200px. Trong bản khối chủ yếu là dải đất trước tường, phía trên nóc xe.
  4. Đường chấm 16 giây hiện khi đã có đốm sáng mà người chơi đứng yên 16 giây. Lúc đang kéo, đồng hồ gợi ý luôn bị đặt lại, nên không hiện được khi đang kéo.
  5. Chưa chạm thùng giấy thì gầm xe trống (chạm chỉ rung xe), Mun chưa phản ứng với đốm sáng.
- **Chưa làm:** đổi nhạc (bí ẩn → vui), khung sao `ui_star_frame` quanh mặt Mun. Âm thanh mới mượn tiếng có sẵn. L4 thắng vẫn quay về L1, chưa nối sang L5.

**G5-4 (GD chốt 5 điểm D5-1):** đồng ý cả 5 lựa chọn tạm của Dev: (1) đốm sáng vẽ trên xe ba gác, không mất hút sau xe; (2) "lượn chậm" chỉ tính khi đang giữ và di chuyển 40–600px/s, cộng dồn cả lượt; (3) "giữa hẻm" = mặt đất hẻm cách gầm xe > 200px; (4) đường chấm 16 giây hiện khi đã có đốm sáng mà đứng yên 16 giây; (5) chưa chạm thùng giấy thì gầm xe trống. Thêm: thắng L4 thì sang L5 (nối màn). Nhạc, khung sao quanh mặt Mun, âm mới làm ở bước art.
**GD chơi kiểm bản khối:** chơi trọn màn bằng play_harness (ảnh `art/review/l5_gd_check/`). Gương thả khi chưa cuộn bạt quay về túi; kéo nhanh đốm sáng nháy, Mun không ra; kéo chậm sát gầm thì chân vồ ra; lượn chậm giữa hẻm khoảng 1 giây thêm (cộng dồn đủ 2 giây) thì Mun phóng ra đuổi, đè đốm sáng, tới cảnh tìm thấy. Gửi chủ dự án chơi thử.

**D5-2. Dev (theo G5-4):** thắng L4 xong, chạm màn thưởng thì sang L5 (`Level4.nextLevel = 'Level5'`), không về L1 nữa. Đã kiểm trong game: sau L4 vào đúng Level5, ♥ Sữa giữ nguyên 4/4, ♥ Mun bắt đầu 0/6. Chưa commit.

## Vòng 2 – Chủ dự án đổi cơ chế đốm sáng

Chủ dự án: "đoạn giữ và kéo đốm sáng chưa ổn lắm, bạn tìm idea khác làm phần này hay hơn nhé". GD đề xuất 3 hướng (xoay gương theo nấc; chạm đâu đốm sáng nhảy tới đó; nhiều đồ sáng). Chủ dự án chọn: "Ý 3 nhưng 3 đồ xếp thành các điểm nối tia ánh sáng đến gần mun, cần có dấu hiệu gì đó để biết phải kéo bạt".

**G5-5. Nối tia nắng:** bỏ giữ-kéo đốm sáng. 3 đồ sáng bóng: gương nhỏ (sân sau), nắp hộp bánh thiếc (sân sau, dựa cạnh thùng giấy), đĩa CD cũ (hẻm, treo ở tay lái xe ba gác). Kéo bạt xong, nắng rơi xuống điểm A. **Đốm sáng luôn là chỗ đặt kế tiếp**: thả đồ sáng bất kỳ vào đốm sáng thì tia bật sang điểm kế, gần Mun hơn: A → B (bậu tường; Mun mở to mắt) → C (đất, cách gầm ~1 thân mèo; chân vồ hụt rồi ló mặt) → trước gầm xe, đốm sáng tự lượn → Mun phóng ra đuổi. Thả trượt: đồ về túi, đốm sáng nháy 2 lần.
**G5-6. Dấu hiệu kéo bạt:** hẻm tối lúc đầu; chấm nắng li ti lọt qua lỗ bạt lấp lánh trên đất; **sợi dây kéo có vòng tròn** thả từ bạt, đung đưa liên tục; có đồ sáng trong túi mà hẻm còn tối thì bong bóng nhân vật hình mặt trời bị che; thả đồ khi chưa kéo bạt thì đồ về túi, dây giật và lấp lánh. Thao tác: vuốt xuống trên dây (hoặc vuốt lên trên bạt).
Đặc tả đã viết lại: `levels/levels-01-10.md` (Level 5: đồ vật, dấu hiệu kéo bạt, cơ chế nối tia, luồng giải, chạm sai, gợi ý) và `levels/states-01-10.md` (Level 5).

**D5-3. Dev: bản khối Vòng 2, nối tia nắng (theo G5-5, G5-6)** (`?level=5`, `&debug=1` hiện vòng trúng của A, B, C, F). Chưa commit.
- **Đã bỏ:** giữ-kéo đốm sáng, luật tốc độ, vùng giữa hẻm, đường chấm.
- **3 đồ sáng vào túi**, lấy theo thứ tự nào cũng được:
  - Gương trên bàn trang điểm.
  - Nắp thiếc `l5_tin_lid` dựa bên phải thùng giấy.
  - Đĩa CD `l5_cd_hanging` treo ở tay lái bên trái xe. Chạm đĩa thì mắt Mun giật mình lùi 0,4 giây.
- **Hẻm tối lúc đầu** (lớp phủ code, alpha 0,42). Dấu hiệu kéo bạt:
  - 6 chấm nắng li ti lấp lánh trên đất; bạt có lỗ thủng.
  - Dây kéo `l5_awning_cord` có vòng tròn, treo từ mép bạt bên phải (x 820, vòng ở y ≈ 700), đung đưa liên tục ±4°.
  - Có đồ sáng trong túi mà hẻm còn tối: lần đầu sang hẻm, bong bóng suy nghĩ hình mặt trời bị mây che hiện một lần.
  - Thả đồ khi chưa kéo bạt: đồ về túi, dây giật mạnh và lấp lánh.
  - Thao tác: vuốt xuống trên dây (hoặc vuốt lên trên bạt). Bạt cuộn, lớp tối tan 0,5 giây, chấm nắng tắt, vệt nắng hiện dần, đốm sáng bật ở A.
- **Điểm nối tia** (toạ độ phòng hẻm):
  - A (180, 980): đất dưới mép bạt, xa xe nhất.
  - B (520, 575): bậu tường giữa hẻm (vẽ trong nền, x 410–630, y 605).
  - C (320, 1100): đất, cách gầm xe ~165px.
  - F (420, 1135): ngay trước gầm.
  - Tia A→B, B→C, C→F không cắt qua xe hay ống nước. Thả đồ cách đốm sáng ≤ 110px là trúng.
  - Mỗi lần đặt: đồ dựng nghiêng rơi vào chỗ, lóe; tia phản chiếu (3 nét chồng, có quầng) vẽ dần 0,3 giây; đốm sáng (có quầng code, phập phồng) bật ở điểm kế. Tia giữ lại cả chuỗi.
  - Thả trượt: đồ về túi, đốm sáng nháy 2 lần. Đồ đã đặt không nhặt lại.
- **Mun:**
  - Sau A: mắt mở to (×1,35), dõi theo đốm sáng.
  - Sau B: chân đen vồ hụt về phía C, rồi ló mặt `mun_peek_out` (mới) ở mép gầm. Chạm thì rụt vào 1 giây rồi ló lại.
  - Sau C: đốm sáng lượn qua lại trước gầm, 1,2 giây sau Mun phóng ra. Đuổi 2 vòng, đè, nhìn chân. Chạm lúc nào cũng thắng.
  - Nếu nối đủ trước khi chạm thùng giấy: Mun xuất hiện dưới gầm rồi phóng ra ngay.
- **Gợi ý:**
  - 8 giây: mắt chớp; hẻm tối thì dây đung đưa mạnh (±12°) rồi dịu dần; có nắng thì đốm sáng nhảy mạnh (±10px) rồi dịu.
  - 16 giây: lấp lánh thùng giấy, đồ sáng chưa lấy, dây kéo hoặc mũi tên; có nắng và có đồ trong túi thì icon đồ sáng nảy.
  - 💡: bàn chân chạm mẫu đồ cần lấy, kéo dây xuống, hoặc kéo đồ từ túi vào đốm sáng.
  - Ở hẻm mà có đồ sáng trong túi thì gợi ý ưu tiên kéo dây hoặc thả đồ, sau đó mới tới đĩa CD còn treo.
- **Key mới** (đã thêm vào `assets.js`): `l5_tin_lid`, `l5_tin_lid_placed`, `l5_cd_hanging`, `l5_cd_placed`, `l5_awning_cord`, `mun_peek_out`. Bong bóng mặt trời bị che là ảnh code `l5_icon_sun_covered`, chưa có trong danh sách ảnh của đặc tả.
- **Ảnh** `art/review/l5_dev_check/v2_01…17`; ảnh Vòng 1 đã dời vào `l5_dev_check/v1/`.

## Vòng 3 – Chủ dự án góp ý bản khối nối tia

Nguyên văn: "cần đặt đĩa cd ra chỗ khác, đĩa ở gần mèo quá, đoạn cuối cùng tia sáng cần mote theo điểm sáng cho hợp lý, ánh sáng từ bạt cần bé hơn".

**G5-7.** Đĩa CD dời khỏi xe ba gác: treo trên móc tường **bên trái hẻm**, xa xe (cách gầm xe ≥ 400px), không chắn đường tia A → B → C. Bỏ phản ứng mắt Mun giật mình khi lấy đĩa.
**G5-8.** Đoạn cuối: tia từ đồ ở C **luôn bám theo đốm sáng** khi đốm sáng lượn trước gầm, khi Mun đuổi 2 vòng và khi Mun đè chân; đầu tia di chuyển cùng đốm sáng mỗi khung.
**G5-9.** Dải nắng từ bạt xuống A **hẹp lại**: chỉ rộng hơn đốm sáng một chút (gợi ý khoảng 1/3 bề rộng hiện tại), vẫn đọc rõ là nắng rơi từ bạt xuống A.

**D5-4. Dev: Vòng 3 (G5-7…G5-9).** Chưa commit.
- **G5-7:** đĩa CD treo trên móc tường bên trái hẻm, `l5_cd_hanging` (95, 455) neo đỉnh. Phần vẽ x 59–131, y 465–561, cách gầm xe 628px, không chắn tia A → B (tia bắt đầu từ x 180) và không đè mũi tên ◄. Đã bỏ phản ứng mắt Mun khi lấy đĩa.
- **G5-8:** đặt xong ở C, tia từ C bám vào đốm sáng mỗi khung: lúc lượn trước gầm, lúc Mun đuổi 2 vòng, lúc đè chân (tia chui dưới Mun tới đốm sáng dưới chân) và lúc nhìn chân (tia tới đốm sáng trên lưng chân). Cuối cảnh đo được đầu tia trùng tâm đốm sáng.
- **G5-9:** dải nắng `l5_sunbeam` hẹp lại: rộng 120 (trước 300), đỉnh 44, đáy 108; đốm sáng rộng 96.
- **Ảnh** `l5_dev_check/v3_01…09`: hẻm tối có CD trên móc, dải nắng hẹp xuống A, đốm sáng lượn trước gầm (2 khung), Mun đuổi (3 khung), đè chân, nhìn chân. Đã chơi tiếp tới màn thưởng.

## Vòng 4 – Chủ dự án góp ý tiếp

Nguyên văn: "để lắp gương, đĩa... theo đúng thứ tự gương -> đĩa thiếc -> đĩa cd nhé. thêm nhiều đồ có thể tương tác và 2 điểm cho thêm cá".

**G5-10.** Lắp đúng thứ tự: **gương ở A → nắp thiếc ở B → đĩa CD ở C**. Thả sai đồ vào đốm sáng: đồ bay thẳng về ô trong túi rồi lắc lắc (như G4-43), đốm sáng nháy 2 lần. Gợi ý 16 giây: icon đồ đúng kế tiếp trong túi nảy.
**G5-11.** Thêm đồ tương tác: sân sau ✨ chậu xương rồng (lắc, hoa bật nở), dây phơi áo (áo bay phấp phới, kẹp bật ra), chuông gió cửa quán (leng keng, Sữa ngóc nhìn); hẻm ✨ xe đạp cũ (chuông, bánh quay), vũng nước (gợn, bắn giọt), 🎭 thạch sùng (trông như đuôi mèo, chạy vụt). Thêm 2 bí mật cá: 🎁 dép tổ ong cạnh thùng giấy (sân sau), 🎁 ống bơ trên bậu cửa sổ hẻm; mỗi chỗ 5 Cá khô. Tổng 3 bí mật (cùng ống thoát nước).

**D5-5. Dev: Vòng 4 (G5-10, G5-11).** Chưa commit.
- **G5-10:** A chỉ nhận gương, B chỉ nhận nắp thiếc, C chỉ nhận đĩa CD.
  - Thả sai đồ hoặc thả trượt: đồ bay thẳng về ô trong túi rồi lắc, có `sfx_wrong` (`bagReturn` chung với L4, G4-43); đốm sáng nháy 2 lần.
  - Gợi ý khi đã có nắng chỉ đúng đồ kế tiếp:
    - 16 giây: icon đồ đó nảy.
    - 💡: chân kéo đúng đồ đó vào đốm sáng.
    - Đồ đó chưa lấy: lấp lánh đồ hoặc mũi tên sang phòng có nó.
- **G5-11, đồ thêm** (key mới, toạ độ phòng). Đều ngoài đường tia A → B → C → F và không đè đồ chính.
  - Sân sau:
    - ✨ Chậu xương rồng `l5_cactus_pot` (955, 990) trên bậc cửa `l5_doorstep`, cạnh cửa sau quán (vẽ trong nền). Chạm: lắc, hoa `l5_cactus_flower` bật nở rồi khép.
    - ✨ Dây phơi `l5_clothesline`, áo `l5_shirt` (700, 236), kẹp `l5_clothespin`, trên cao giữa hai cột. Chạm: áo phồng gió phấp phới, kẹp bật ra; nhân vật trồi lên (tạm dùng `player_surprised`) rồi kẹp về chỗ.
    - ✨ Chuông gió `l5_wind_chime` (465, 360), mép phải cửa sổ quán. Chạm: đung đưa leng keng, Sữa trong cửa sổ ngóc đầu nghiêng nhìn theo.
    - 🎁 Dép tổ ong `l5_slippers` (235, 1168), bên trái thùng giấy. Chạm: lật thành `l5_slippers_flipped` có túi cá, 5 cá khô một lần.
  - Hẻm:
    - ✨ Xe đạp `l5_bike` (745, 905) + bánh trước `l5_bike_wheel` dựng tường, phía trên nóc xe ba gác. Chạm: chuông, bánh quay 3 vòng.
    - ✨ Vũng nước `l5_puddle` (105, 1125), góc trái dưới. Chạm: 2 vòng gợn, 4 giọt bắn.
    - 🎭 Thạch sùng `l5_gecko` (330, 470) trên tường, đuôi cong như đuôi mèo. Chạm: chạy vụt lên (330, 300) sát dưới bạt; chạm lần nữa thì bò về.
    - 🎁 Ống bơ `l5_milk_can` (708, 545) trên bậu cửa sổ hẻm (cửa sổ vẽ trong nền, x 645–775). Chạm: nghiêng, 5 cá khô một lần.
  - Tổng 3 bí mật (ống nước, dép, ống bơ); thưởng 50 + 5 mỗi bí mật.
- Âm thanh mới mượn tiếng có sẵn (bảng `SFX_ALIAS`).
- **Ảnh** `l5_dev_check/v4_01…12`: sân sau đủ đồ mới, từng phản ứng, hẻm đủ đồ mới (còn tối), thả nắp thiếc sai vào A (đang bay về ô), chuỗi tia đủ và Mun đuổi. Đã chơi lại trọn màn tới màn thưởng, kể cả thả sai ở A và B.

## Vòng 5 – Chủ dự án góp ý tiếp

Nguyên văn: "cho mèo chạy 2 vòng là bắt được ánh sáng, chạy nhanh hơn 1 chút, đổi thứ tự nắm thiếc > gương > cd".

**G5-12.** Đổi thứ tự lắp: **nắp thiếc ở A → gương ở B → đĩa CD ở C** (thay G5-10). Gợi ý và 💡 theo thứ tự mới.
**G5-13.** Cảnh lộ diện: Mun đuổi đốm sáng **đúng 2 vòng** rồi bắt được (đè chân) ngay, không lượn thêm; tốc độ chạy **nhanh hơn một chút** so với bản hiện tại (gợi ý mỗi vòng ngắn đi khoảng 25–30%).

**D5-6. Dev: Vòng 5 (G5-12, G5-13).** Chưa commit.
- **G5-12:** thứ tự lắp mới, A nắp thiếc → B gương → C đĩa CD. Thả sai vẫn bay về ô và lắc, đốm sáng nháy 2 lần. Gợi ý 16 giây và 💡 chỉ theo thứ tự mới (đã kiểm: lúc ở A gợi ý chỉ nắp thiếc, ở B chỉ gương).
- **G5-13:** đốm sáng chạy đúng 2 vòng elip giữa hẻm, bắt đầu và kết thúc ở điểm thấp nhất (430, 865). Hết vòng 2, Mun vồ đè ngay tại đó, bỏ đoạn lượn tới chỗ đè riêng.
  - Mỗi vòng 1,15 giây (trước 1,6 giây, ngắn đi 28%). Vồ 0,28 giây (trước 0,35).
  - Từ lúc Mun phóng ra tới lúc đè: đo được 2,9 giây (trước ≈ 4,3 giây).
  - Tia từ C vẫn bám đốm sáng; lúc đè, đầu tia trùng tâm đốm sáng.
- **Ảnh** `l5_dev_check/v5_01…04`: thả gương sai vào A, Mun đuổi vòng 1, vòng 2, đè.
- **Build:** đã build lại web, `game/dist` vẫn 163 file, 56,2 MB. Đã chơi L5 trên bản build tới màn thưởng: không lỗi, không request 404.

## Vòng 6 – Chỗ đặt đĩa CD (điểm C)

Chủ dự án chưa thích điểm C (đất cách gầm ~165px, đĩa nằm sát Mun). GD đề xuất 3 chỗ (móc tường phía trên xe, nóc xe, xe đạp); chủ dự án chọn: "sửa lại theo số 2 nhé".

**G5-14.** Điểm C là **nóc thùng xe ba gác**: tia từ gương ở B chiếu tới nóc xe, đĩa CD đặt nằm nghiêng trên nóc, hắt tia xuống ngay trước gầm xe; đốm sáng lượn ở đó, Mun phóng ra đuổi 2 vòng (G5-13). Thứ tự lắp giữ G5-12 (nắp thiếc A → gương B → CD C).

**D5-7. Dev: Vòng 6 (G5-14), điểm C lên nóc xe ba gác.** Chưa commit.
- **Điểm C:** C = (478, 896) ở đầu trái nóc thùng xe (tránh xe đạp x ≥ 625). Đốm sáng hiện ngay trên nóc.
  - Tia B → C chạy gần thẳng đứng từ gương trên bậu xuống nóc xe, không cắt qua gì.
  - Đĩa CD đặt nằm nghiêng trên nóc: phần vẽ x 430–504, y 834–918, đáy chạm nóc. Không đè chữ "Xe ba gác", không đè xe đạp hay vùng chạm khác.
  - Tia từ đĩa hắt xuống điểm trước gầm F = (405, 1130), bên trái bánh trước.
- **Lớp vẽ:** tia, đốm sáng và đồ đã đặt nay vẽ trên lớp xe (21–21,4), vì đốm sáng và đĩa ở trên nóc. Ánh sáng rọi lên xe, không bị thân xe che.
- **Thứ tự và phản ứng giữ nguyên:** nắp thiếc ở A, gương ở B, CD ở C. Sau B, chân Mun vồ hụt rồi ló mặt. Tia từ đĩa trên nóc luôn bám đốm sáng.
- **Hệ quả phải chỉnh theo** (Dev tự quyết, GD xem):
  - Vòng đuổi dời sang trái để Mun không che đĩa trên nóc: tâm (295, 842), rộng ±135 (trước tâm 430, ±210), Mun đè ở (295, 882).
    - Vẫn đúng 2 vòng; mỗi vòng 0,8 giây, tốc độ đốm sáng gần như Vòng 5.
    - Mun ra tới lúc đè khoảng 2,2 giây (Vòng 5: 2,9 giây).
  - Vòng đuổi chạm sát mép trái hẻm, nên lúc lộ diện mũi tên ◄ ẩn đi, để chạm vào Mun ở đó là thắng chứ không đổi phòng.
- **Ảnh** `l5_dev_check/v6_01…05`: đốm sáng trên nóc xe, đĩa đã đặt và tia hắt xuống, Mun đuổi, đè, nhìn chân.
- **Build:** đã build lại web (163 file, 56,2 MB). Đã chơi L5 trên bản build tới màn thưởng: không lỗi, không 404.

**G5-15 (chủ dự án: "đặt đĩa cd lên xe đạp đi").** Điểm C chuyển từ nóc xe ba gác sang **xe đạp cũ dựng tường**: tia từ gương ở B chiếu tới xe đạp, đốm sáng hiện ở giỏ/yên xe; thả đĩa CD vào đó, đĩa gác nghiêng trên xe đạp, hắt tia xuống ngay trước gầm xe ba gác. Chạm xe đạp (không kéo đồ) vẫn là đồ vui (chuông, bánh quay). Thứ tự giữ G5-12.

**D5-8. Dev: G5-15, điểm C sang xe đạp.** Chưa commit.
- **Điểm C:** C = (842, 780), chỗ đặt là giỏ xe đạp. Đã vẽ thêm giỏ ở đầu xe, trên bánh trước, và yên xe; chuông dời sang ghi đông. Xe đạp giữ chỗ cũ (phải, dựng tường, phía trên nóc xe ba gác).
  - Đốm sáng hiện ở giỏ.
  - Đĩa CD gác nghiêng trong giỏ: phần vẽ x 794–868, y 718–802, không đè chữ hay vùng chạm khác.
- **Đường tia:**
  - B → C chéo xuống phải, đi dưới cửa sổ hẻm (dây kéo đã ẩn sau khi cuộn bạt), không cắt gì.
  - C → F hắt gần thẳng đứng xuống F = (872, 1130), ngay trước gầm ở phía bánh sau bên phải. Tia nằm ngoài mép phải thùng xe (x 830).
  - Ống thoát nước dời phải 40px (x 935 → 975) để chừa chỗ cho đốm sáng ở F; đốm sáng ở F lượn hẹp hơn (±16px).
- **Mun:**
  - Sau khi đặt gương ở B, chân vồ hụt từ phía gầm gần đốm sáng hơn (bên phải), rồi ló mặt như cũ.
  - Lộ diện: Mun phóng ra ở phía phải gầm.
  - Vòng đuổi trở lại giữa hẻm: tâm (420, 842), ±190, đúng 2 vòng, mỗi vòng 1 giây. Mun ra tới lúc đè đo được 2,6 giây; đè ở (420, 882).
  - Cả cảnh đuổi Mun không chạm khung đĩa (đo 0 khung). Tia từ đĩa bám đốm sáng suốt lúc đuổi, đè, nhìn chân. Mũi tên ◄ vẫn ẩn lúc lộ diện.
- **Xe đạp:** chạm xe đạp (không kéo đồ) vẫn kêu chuông và quay bánh. Thả đĩa vào giỏ không kích hoạt chuông (đo: bánh không quay khi thả).
- **Ảnh** `l5_dev_check/v7_01…05`: đốm sáng ở giỏ xe, đĩa trong giỏ và tia hắt xuống, Mun đuổi, đè, nhìn chân.
- **Build:** đã build lại web (163 file, 56,2 MB). Đã chơi L5 trên bản build tới màn thưởng: không lỗi, không 404.

## Vòng 7 – Chủ dự án duyệt gameplay bản khối

Nguyên văn: "oke rồi đó, art và dev bàn luận thêm với nhau và vẽ demo nhé".

**G5-16.** Gameplay Level 5 đã duyệt trên bản khối (G5-1…G5-15; Dev vẫn sửa nốt D5-9: Mun đuổi trên mặt đất, ló cùng phía đốm sáng). Sang QUY-TRINH bước 3 (Art và Dev bàn yêu cầu art) và bước 4 (vẽ demo).
- Vị trí, cỡ, lớp của mọi đồ lấy từ bản khối đã duyệt (Dev xuất bảng toạ độ cho Art).
- Thứ tự: **`mun_ref` trước** (G5-3: than ấm #3E3838, vân chì, mắt vàng to, tai hơi to, đuôi dài), gửi chủ dự án duyệt riêng; rồi demo **sân sau** và **hẻm** (hẻm vẽ lúc đã kéo bạt, có tia và 3 đồ sáng), có thể thêm một demo cảnh lộ diện Mun đè đốm sáng.
- Mọi lượt vẽ theo quy tắc màu O6, góc nhìn sofa L1, kèm ảnh mẫu level 1; nền chỉ phòng trống, đồ vẽ riêng (áp từ L4). Quầng sáng, tia, phủ tối do code (G5-3).

**D5-9. Dev: sửa 2 lỗi GD báo sau D5-8.** Chưa commit.
- **Mun bay trên tường → Mun chạy trên mặt đất hẻm.**
  - Đốm sáng rời chỗ trước gầm (F, bên phải), chạy ngang mặt đất trước xe sang trái (0,45 giây).
  - Rồi chạy đúng 2 vòng elip trên mặt đất bên trái xe ba gác: x 175–425, y 1085–1135, ngang đáy gầm xe, trên thanh túi đồ (y 1183).
  - Hết vòng 2, Mun đè ngay ở (300, 1135). Đè và nhìn chân đều trên mặt đất: phần vẽ Mun x 225–377, đáy 1167. Lúc đuổi, đáy Mun thấp nhất 1173, không lấn vào thanh túi.
  - Mỗi vòng 0,9 giây; Mun ra tới lúc đè đo được 2,5 giây.
  - Tia từ đĩa trong giỏ xe đạp vẫn bám đốm sáng. Vì đốm sáng giờ ở dưới đất bên trái xe, tia đi chéo ngang qua thùng xe ba gác (vẽ trên lớp xe, như ánh sáng rọi qua).
- **Mun ló sai bên → cùng phía đốm sáng.** `mun_peek_out` dời sang phía phải gầm (770, 1168), phần vẽ x 713–829, cùng phía với giỏ xe đạp và F. Chân vồ hụt cũng thò ra phía phải (từ D5-8).
- **Ảnh** `l5_dev_check/v8_01…05`:
  - 01: đốm sáng ở giỏ, Mun ló bên phải.
  - 02: CD trong giỏ, tia xuống trước gầm.
  - 03: Mun đuổi trên mặt đất.
  - 04: Mun đè trên mặt đất.
  - 05: nhìn chân.
- **Build:** đã build lại web (163 file, 56,2 MB). Đã chơi L5 trên bản build tới màn thưởng: không lỗi, không 404.

**G5-17 (GD, theo D5-9).** Mun đuổi và đè trên mặt đất bên trái xe ba gác (D5-9). Tia từ đĩa CD trong giỏ xe đạp vẽ ở lớp **sau thùng xe ba gác** (xe đạp dựng sát tường, xa hơn xe ba gác), nên tia đi phía sau thùng xe rồi ló ra ở mép trái, chạm đốm sáng dưới đất; không vẽ tia đè lên thùng xe.

## Vòng 8 – Art bắt đầu bước 3 và 4 (G5-16)

**A5-5. Art: bắt đầu.** Chưa commit.
- Đã nhắn Dev xin bảng vị trí, cỡ, lớp mọi đồ của bản khối sau D5-9, kèm đường chân tường từng phòng và 2 ảnh khối sạch (sân sau; hẻm đã kéo bạt có 3 đồ đặt). Art viết `art/design-art-level5.md` từ bảng đó.
- Đang vẽ `mun_ref` (brief `art/review/l5_mun_ref_brief.md`, theo `sua_ref`, 3 tư thế). Phần thiết kế:
  - Lông than ấm #3E3838 có vân chì sáng hơn (#5A5050–#6A5E5A), không đen đặc.
  - Mắt vàng mật ong #F4C95A, to.
  - Tai hơi to, hơi cụp ra hai bên: style.md ghi "tai hơi cụp", GD ghi "tai hơi to", Art gộp cả hai.
  - Dáng thon, chân dài hơn Sữa; đuôi dài mảnh.
  - Nét viền nâu sẫm ấm #4A3430. Với Mun, nét #6B4A3A nhạt hơn lông, nên dùng nâu sẫm hơn lông một chút để tách khối. Đây là ngoại lệ cùng chỗ với ngoại lệ màu lông.

**D5-10. Dev: bàn giao bố trí cho Art (QUY-TRINH bước 3, G5-16).** Chưa commit.
- D5-9 đã xong và đã build lại, bản online cập nhật được.
- Bảng bố trí: `art/review/l5_dev_check/l5_block_layout.md`.
  - Toạ độ phòng, neo, cỡ, phần vẽ và lớp của mọi đồ hai phòng, kể cả các trạng thái.
  - Đường chân tường: sân sau y 820, hẻm y 790. Chi tiết vẽ trong nền.
  - Điểm A/B/C/F, cỡ đốm sáng, dải nắng; đồ đã đặt (cỡ, neo, độ nghiêng phải vẽ sẵn); cỡ và vị trí Mun ở từng tư thế; vùng chạm.
  - Yêu cầu tách phần cho animation: dây kéo riêng bạt, áo riêng kẹp, bánh trước xe đạp riêng (quay quanh tâm), hoa xương rồng riêng, Sữa trong cửa sổ…
  - Danh sách tư thế Mun và nhân vật cần vẽ.
- Ảnh khối sạch (không chữ, không giao diện, 1024×1536) và bản có lưới: `l5_dev_check/layout/`. Số liệu thô: `l5_block_export.json`, `l5_block_placed.json`.
- Thêm cờ `&nolabel=1` (khối không chữ).
- Khối đồ đã đặt rộng 96 → 124 cho hình nghiêng không bị cắt mép (chỉ ảnh tạm, không đổi vị trí).
- Đã build lại web.

**D5-11. Dev: G5-17, tia từ đĩa trong giỏ vẽ sau thùng xe ba gác.** Chưa commit. (GD nhờ ghi D5-10, nhưng D5-10 đã dùng cho bàn giao bố trí nên ghi D5-11.)
- Tia từ đĩa CD (điểm C) nay nằm trên lớp riêng (depth 19): trên xe đạp, dưới thùng xe ba gác (20).
- Tia A → B và B → C vẫn ở lớp 21 như cũ (không đi qua xe).
- Lúc Mun đuổi, đè, nhìn chân ở đất bên trái xe: tia đi sau thùng xe rồi ló ra ở mép trái, chạm đốm sáng (`v9_02`, `v9_03`, `v9_04`).
- Lúc đốm sáng ở ngay trước gầm bên phải (F): tia nằm ngoài mép phải thùng xe nên vẫn thấy trọn như cũ (`v9_01`).
- Đã build lại web (163 file, 56,2 MB). Đã chơi L5 trên bản build tới màn thưởng: không lỗi, không 404.

**D5-12. Dev: ráp theo đặc tả art L5 (design-art-level5.md mục 1–2).** Chưa commit.
- **Cửa sổ quán tách 2 lớp:**
  - `l5_cafe_window_back` (kính + trong quán, lớp 5) → `sua_press_window` (6) → `l5_cafe_window_frame` (khung + bậu + thanh ngang y ≈ 480, lớp 6,5). Key `l5_cafe_window` cũ đã bỏ.
  - Bản khối: đã bỏ thanh dọc. Bậu che đáy Sữa lúc nảy; lúc ngóc đầu, đầu Sữa vẫn dưới thanh ngang (`v10_01…03`).
  - Vùng chạm cửa sổ theo khung.
- **Đồ vẽ vào nền:** dây phơi và bậc cửa chỉ dựng khối khi nền sân sau còn là ảnh tạm. Có `l5_bg_backyard` thật thì không vẽ hai sprite này nữa.
  - Móc CD, dây điện, bậu B, cửa sổ hẻm, cột dây phơi, cửa sau quán vốn đã nằm trong nền khối.
- **Đĩa CD ở C:** đáy ảnh đặt ở miệng giỏ (y 786, trước 810), khớp ảnh chỉ vẽ phần đĩa thò lên (`v10_04`). Tia từ đĩa vẫn bám đốm sáng.
- Đã cập nhật `l5_block_layout.md` (cửa sổ 2 lớp, neo đĩa ở C). Đã build lại web, chơi L5 tới màn thưởng.

**A5-6. Art: `mun_ref` 3 lượt, chờ chủ dự án duyệt.** Chưa commit.
- Lượt 1 `cats/mun_ref.png`: tai cụp gập (giống mèo tai cụp), sát mép ảnh. Không dùng.
- Lượt 2 `cats/mun_ref_b.png`: sửa từ lượt 1. Tai dựng nghiêng ra 15–20°, đuôi mảnh hơn, dàn đều. Lông trung vị ≈ #826E64, nên dễ đọc thành mèo xám.
- Lượt 3 `cats/mun_ref_c.png`: sửa từ lượt 2, chỉ tối lông. Lông trung vị ≈ #5C4C46, đọc rõ là mèo đen, vẫn thấy vân chì. Mắt, tai, má giữ nguyên độ sáng. **Art đề xuất lượt 3.**
- Ảnh so sánh: `art/out/_check/l5_mun_ref_sua_b_c.jpg` (trên nền kem): Sữa, lượt 2, lượt 3.
- Duyệt xong Art chép bản được chọn thành `cats/mun_ref.png` (lượt 1 lưu vào `_refs/`).
- Đặc tả art `art/design-art-level5.md` đã viết; đã trả lời Dev các điểm animation (cửa sổ quán tách 3 lớp, bỏ thanh dọc giữa kính; đồ vẽ vào nền; CD đặt chỉ vẽ phần trên miệng giỏ; bánh trước xe đạp riêng; 2 tờ Mun).
- Câu hỏi cho GD: thêm tư thế `player_clip_shirt` (kẹp lại kẹp áo) hay giữ `player_surprised`?
- Demo sân sau `l5_demo_yard` đang vẽ (không có Mun nên không chờ duyệt).

**G5-18 (GD).** Chạm áo phơi: nhân vật kẹp lại áo dùng tư thế có sẵn `player_hands_lift`, không vẽ tư thế mới (thay `player_surprised` của bản khối).

**G5-17 (GD).** `mun_ref` chọn lượt 3 (`cats/mun_ref_c.png`), đã gửi chủ dự án duyệt. Chờ kết quả rồi mới chép thành `cats/mun_ref.png`.
**G5-18 (GD).** Kẹp lại kẹp áo: không vẽ tư thế mới; dùng `player_hands_lift` có sẵn, bỏ `player_surprised` ở chỗ này.

**A5-7. Art.** Đã ghi G5-18 vào `art/design-art-level5.md` (mục 1, mục 2, tờ `player_l5_sheet` chỉ còn bịt mũi) và báo Dev đổi theo.

**G5-19 (chủ dự án duyệt).** `mun_ref` chọn lượt 3 (`mun_ref_c`, lông than tối hơn): "mun dưới cùng nhé". Mọi ảnh `mun_*` tham chiếu `art/out/cats/mun_ref.png`.

**D5-13. Dev: G5-18.** Chạm áo phơi: lúc kẹp lại kẹp áo, nhân vật trồi lên bằng `player_hands_lift` (hai tay, ảnh chung đã có), không dùng `player_surprised` nữa. Không vẽ `player_clip_shirt`. Tay trồi ở giữa màn (x 512) cho thấy đủ hai tay (x 77–946); kẹp bay về chỗ khi tay lặn xuống (`l5_dev_check/v11_01`). Đã build lại web. Chưa commit.

**G5-19 (chủ dự án, qua GD).** Duyệt `mun_ref` lượt 3: "mun dưới cùng nhé".
- Art đã chép lượt 3 thành `art/out/cats/mun_ref.png`.
- Bản các lượt lưu ở `art/out/_refs/`: `mun_ref_v1.png`, `mun_ref_b.png`, `mun_ref_c.png`.
- Mọi lượt vẽ có `mun_` tham chiếu `cats/mun_ref.png`.

**A5-8. Art: 3 demo Level 5, chờ chủ dự án duyệt.** Chưa commit.
- Ảnh so với mẫu level 1: `art/out/demo/l5_demo_vs_l1.jpg`. Thứ tự: mẫu L1, sân sau, hẻm, lộ diện.
- **Cách vẽ:** lượt đầu vẽ tự do thì đẹp nhưng nửa dưới tụt 40–75px so với bản khối. Đổi cách: **chỉnh sửa thẳng ảnh bản khối sạch** (`layout/*_clean.png`) thành tranh, và không đính kèm demo cũ (đính kèm thì image_gen bám bố cục cũ). Cách này giữ đúng vị trí trong khoảng 10–20px. Các lượt hỏng lưu `art/out/_refs/l5_demo_*_v*.png`.
- `l5_demo_yard.png` (lượt 3, sửa từ bản khối):
  - Chân rào y 820, đồ đúng khung khối.
  - Màu đạt: trung bình 0,188, p90 0,416.
  - Túi rác thấp hơn khối ~45px (đáy ≈ 1000, khối 956). Codex báo 5 vòng; Art đếm trên ảnh thu nhỏ thấy 6, cần xem lại.
- `l5_demo_alley.png` (lượt 3, sửa từ bản khối):
  - Bạt đã cuộn, dải nắng xuống A.
  - Đồ đã đặt: nắp ở A, gương ở B, CD trong giỏ xe đạp.
  - Mun ló mặt ở mép phải gầm, đốm sáng trước gầm.
  - Không tia, không quầng (code vẽ).
  - Màu đạt: trung bình 0,149, p90 0,251.
  - Lệch ≤ 15px (chân tường ≈ 808, khối 790). Thiếu móc tường nhỏ ở (95, 455), sẽ vẽ vào nền khi tách.
- `l5_demo_reveal.png` (sửa từ demo hẻm):
  - Mun cả con đè hai chân trước lên đốm sáng trên đất, bên trái xe.
  - Màu đạt: trung bình 0,143, p90 0,251.
  - Mun lệch phải ~70px so với khối (x 300–442, khối 232–368), sát bánh trái xe ba gác. Nếu duyệt, Dev đặt Mun theo khối (300, 1175) hoặc theo demo, GD chọn.
- Mun theo đúng `mun_ref` đã duyệt (G5-19).

## Vòng 8 – Chủ dự án góp ý demo (A5-8)

Nguyên văn: "sửa 2 điểm và màu sắc lại đang hơi nhạt quá so với ảnh demo gửi, đồ vật nói chung đang bị hơi bé và chưa có độ cong mềm như bàn, quá, hộp, cửa sổ bé và xe đạp... vẽ to hơn, mềm hơn và đẹp hơn nhé".

**G5-20.** Sửa cả 3 demo:
1. **Xe ba gác** vẽ thành xe ba gác thật (thùng gỗ/tôn có thành, tay lái, bánh), thấy mặt trên và độ dày như sofa L1; không còn là khối hộp.
2. **Nắp hộp bánh thiếc** vẽ rõ là nắp hộp bánh quy: xanh lam, viền gờ, hoa văn bánh quy in nổi; không bóng như gương. Phân biệt được ngay với gương.
3. **Màu**: đang nhạt hơn mẫu L1. Đưa về **đúng độ đậm của mẫu L1** (`owner_l1_style_ref.png`, demo L1), không nhạt hơn: đo bão hoà gần mức mẫu (TB ~0,22–0,25; demo hiện 0,14–0,19 là quá nhạt), vẫn không vượt ngưỡng O6.
4. **Đồ to hơn, cong mềm, đẹp hơn**: bàn trang điểm, quạ, thùng giấy, cửa sổ (quán và hẻm), xe đạp, túi rác, xương rồng, ống bơ… vẽ to hơn (khoảng 1,2–1,4 lần), góc bo tròn, đường cong mềm, đầy đặn, dễ thương như đồ L1 (sofa, gối, thùng giấy L1); không vuông cứng như khối.
- Vì đồ to hơn, bố cục được phép lệch bản khối: Art giữ thứ tự và tương quan vị trí (A/B/C, đường tia đọc được), Dev ráp lại toạ độ theo demo mới sau khi duyệt.

**G5-21 (chủ dự án chốt).** Từ giờ demo và ảnh kiểm trình theo khung **1080x1920 (9:16)**, nền vẽ dư trên dưới (khung game 1024x1820 trên màn 9:16, dư 142px mỗi bên; UI theo mép màn, túi đồ ngay trên dải banner 150px). Ghi vào QUY-TRINH bước 4.

**G5-20 (chủ dự án, qua GD).** Sửa cả 3 demo:
- Màu đậm lên bằng mẫu L1 (trung bình 0,22–0,25).
- Đồ to hơn 1,2–1,4 lần, cong mềm.
- Xe ba gác thật.
- Nắp thiếc xanh lam có gờ và hoa văn bánh quy, khác hẳn gương.
- Bố cục được lệch bản khối.

**G5-21 (chủ dự án, qua GD).** Demo và ảnh kiểm trình khung 1080x1920 (9:16), nền vẽ dư trên dưới (xem QUY-TRINH bước 4).

**A5-9. Art: cách làm demo 9:16.**
- Codex chỉ ra 1024x1536. Art làm 2 bước:
  1. Codex vẽ cảnh 1024x1536 (lượt G5-20).
  2. Art đặt cảnh thu ×0,844 vào giữa canvas 1024x1536 (khung 864x1536, cảnh ở y 120–1416, dư 120px trên dưới). Codex chỉnh sửa ảnh đó: vẽ nối trời, tường, sàn vào phần dư và bỏ giao diện vẽ tay.
- Art cắt khung 864x1536 và phóng ×1,25 thành 1080x1920.
- Ghép **lớp UI thật của game** do Dev xuất (1024x1820, trong suốt), để tim, ⏸, túi đồ, 💡, banner đúng vị trí như trên điện thoại.
- Nền tách cho game sau này: vẽ đủ cao tới 1024x2304 (ghi vào design-art-level5 mục 4).

**D5-14. Dev: khung 9:16 (G5-21).** Chưa commit.
- `game/tools/play_harness.js`:
  - Thêm `aspect('9:16')`: khung game 1024×1820 như máy 9:16, vùng chơi 1536 ở giữa, Y0 = 142. `aspect('2:3')` để về khung cũ.
  - `shot()` ở khung 9:16 ra 540×960.
  - `compare` và `sideBySide` vẽ theo tỉ lệ khung đang dùng. Tranh demo khác tỉ lệ (demo 2:3 cũ) đặt giữa theo chiều dọc, không kéo giãn, nên vẫn khớp toạ độ (kiểm bằng `l5_dev_check/916_l4_living_vs_demo.jpg`).
- Theo yêu cầu của Art: xuất 3 lớp giao diện thật, trong suốt, khung 1024×1820, ở `l5_dev_check/layout/`.
  - `l5_hud_yard.png`, `l5_hud_alley.png`, `l5_hud_alley_reveal.png` (mũi tên ◄ ẩn).
  - Gồm: tim + "Mun" + 6 vòng, bong bóng nhiệm vụ ở góc, bản đồ mini (ô đang đứng tô vàng), ⏸, mũi tên (tâm y 902), túi đồ 4 ô trống (đáy y 1664), 💡.
  - Dải banner y 1670–1820 để trống (game không vẽ gì ở đó).

**A5-10. Art: 3 demo sửa theo G5-20, trình khung 9:16 (G5-21). Chờ chủ dự án duyệt.** Chưa commit.
- **Ảnh trình** (1080x1920, có lớp UI thật của game do Dev xuất): `art/out/demo/l5_demo_yard_916.png`, `l5_demo_alley_916.png`, `l5_demo_reveal_916.png`.
- **So với L1:** `art/out/demo/l5_demo_vs_l1.jpg`.
- **Khung game không UI** (1024x1820, vùng chơi y 142–1678), để Dev đo vị trí: `l5_demo_*_frame.png`. Vùng chơi 1024x1536 riêng: `l5_demo_yard_play.png`, `l5_demo_alley_ext.png`, `l5_demo_reveal_ext.png`.
- **Đã sửa theo G5-20:**
  - Đồ to hơn, bo tròn mềm.
  - Xe ba gác thật: thùng gỗ có thành, khung xanh, bánh nan, gầm tối.
  - Nắp hộp bánh quy thiếc xanh lam có gờ và bánh quy in nổi, ở sân sau và ở A, khác hẳn gương.
  - Mun, xe, nắp giống nhau giữa hẻm và cảnh lộ diện.
- **Màu (color_check trên khung 1024x1820):**
  - Sân sau: TB 0,237, p90 0,396. Thùng giấy và cửa đúng mã màu đo trên demo L1 (thùng L1 #E6B785).
  - Hẻm: TB 0,199, p90 0,318. Lộ diện: TB 0,200, p90 0,314.
  - **Hẻm vẫn dưới mức 0,22** vì sàn xi măng xám nhạt (#DDD0C4) chiếm nhiều chỗ. Nếu chủ dự án thấy hẻm nhạt, Art làm ấm sàn hẻm, phải vẽ lại cảnh và dải trên dưới của cả 2 ảnh hẻm.
- **Cách làm 9:16 (thay A5-9):**
  - Thu cảnh vào giữa rồi vẽ nối thì Codex luôn vẽ lại tràn canvas, hỏng 3 lần.
  - Cách đang dùng:
    1. Cảnh 1024x1536 không UI làm vùng chơi.
    2. Hai lượt chỉnh sửa vẽ dải trên và dải dưới 142px. Canvas là cảnh đúng cỡ dời xuống hoặc lên 142px, nên Codex không vẽ lại cảnh: lệch trung bình ~4/255.
    3. Art ghép 3 phần (mép nối mềm 24px), đặt lớp UI thật, phóng ×1080/1024.
  - Ảnh trung gian ở `art/ref/l5_916/`. Các lượt hỏng ở `art/out/_refs/` và `_refs/l5_old/`.
- **Bố cục lệch bản khối** (G5-20 cho phép), Dev ráp theo `*_frame.png` sau khi duyệt.

## Vòng 9 – Chủ dự án duyệt demo (A5-10)

Nguyên văn: "Nếu là demo này tôi muốn ánh sáng chạy quanh phía dưới khu vực map còn trống hơn, bên dưới xe ba gác và scale xe đạp bé lại chút, note cho dev, không cần vẽ lại demo. Giờ tách art và ghép đi, nhớ là tách cái nào hãy gửi lại demo của cái đó và promt thấy kỹ đừng để tách sai so với demo".

**G5-22. Duyệt 3 demo** `l5_demo_yard_916.png`, `l5_demo_alley_916.png`, `l5_demo_reveal_916.png` (A5-10). Không vẽ lại demo. Sang QUY-TRINH bước 5: tách và ghép.
- **Art tách:** mỗi lượt tách (tờ, ảnh lẻ, nền) **kèm nguyên ảnh demo gốc của phòng đó** (G4-26) và ảnh cắt đúng món từ demo; lời giao việc ghi rõ vị trí món trong demo và câu "vẽ lại đúng món này: cùng hình dáng, tỉ lệ, màu, chi tiết". Viết prompt thật kỹ, Codex hay vẽ sai. Kiểm từng món đặt cạnh ảnh cắt từ demo trước khi đưa Dev. Nền vẽ đủ cao cho khung 9:16 (tới 1024x2304).
- **Ghi chú cho Dev (khác demo, chủ dự án muốn):**
  1. Đốm sáng và Mun đuổi **chạy quanh khoảng sàn trống phía dưới, bên dưới xe ba gác** (giữa đáy xe và túi đồ), không chạy bên trái xe. Tia từ đĩa trong giỏ vẫn bám đốm sáng (đi sau thùng xe theo G5-17 nếu cần).
  2. **Xe đạp nhỏ lại một chút** so với demo (gợi ý ×0,85), vẫn đứng sau xe ba gác, giỏ vẫn là điểm C.
- Dev ráp theo `l5_demo_*_frame.png`, chụp ảnh trong game khung 9:16 đặt cạnh demo; GD chơi kiểm trước khi báo chủ dự án.

**G5-23 (chủ dự án chốt cách tách):** "Tôi thường gửi 1 lần demo và promt tách 7 item, tách ra thành 7 ảnh, quan trọng là promt kỹ tách phần nào, nếu nhiều hơn 7 thì chia ra làm 2 lần promt". Mỗi lượt Codex: một ảnh demo + tối đa 7 món → 7 ảnh riêng; >7 món chia lượt. Prompt kỹ từng món (vị trí, phần lấy, phần không lấy, trạng thái, cỡ). Đã ghi vào QUY-TRINH bước 5 và AGENTS.md.

**D5-15. Dev: ráp bố trí theo demo duyệt (G5-22), chưa có ảnh thật nên vẫn là khối.** Chưa commit.
- **Vị trí:** đo lại trên `l5_demo_yard_frame.png` và `l5_demo_alley_frame.png`, toạ độ vùng chơi = toạ độ demo trừ 142. Ghi trong `DEF` của `level5.js`; bảng mục 6 của Art (khi có) sẽ thắng.
  - Sân sau: chân hàng rào y 872. Cửa sổ quán (253, 806) rộng 386, thanh ngang y ≈ 578, Sữa đáy 768. Bàn (711, 1042), gương (720, 822), túi rác (199, 1062), thùng giấy (471, 1258), nắp thiếc (715, 1278), dép (186, 1270). Dây phơi và cột (cột x 490, 975), áo (688, 298), kẹp (714, 296), chuông gió (488, 390). Xương rồng (945, 1046) trên bậc đá, cửa sau quán x 890–1024.
  - Hẻm: chân tường y 860. Bạt mép trên y 280, rộng 757. Dây kéo x 856. Quạ (318, 275). Móc CD (145, 512). Thạch sùng (333, 531). Bậu tường B x 388–620, y 640. Cửa sổ hẻm x 605–797, ống bơ (715, 605). Xe ba gác (636, 1138) rộng 537: thùng gỗ, bánh lớn, khung xanh, bánh nhỏ; gầm x 520–790, y 1050–1105. Ống nước (972, 1098). Vũng nước (167, 1106).
  - Cỡ khối: co theo bề rộng đo trên demo (`FIT`, dự phòng cột "Rộng demo"). Các khối quyết định gameplay vẽ lại đúng hình demo: xe ba gác, xe đạp, cửa sổ, bạt, dây kéo, ống nước, nền.
- **Nối tia theo demo:** A (218, 978) nắp thiếc trong vệt nắng; B (507, 586) gương trên bậu; C (794, 722) đĩa trong giỏ (đáy ở miệng giỏ y 760); F (800, 1122) trước gầm, dưới khung xanh. Tia từ đĩa vẫn vẽ sau thùng xe (G5-17).
- **Hai điểm chủ dự án muốn khác demo:**
  1. Đốm sáng và Mun đuổi chạy ở khoảng sàn trống **dưới xe ba gác**: 2 vòng elip x 370–830, y 1175–1255. Mun đè và nhìn chân ở (600, 1255), đáy Mun 1287–1295, ngay trên thanh túi đồ ở khung 9:16. Mun ra tới lúc đè ≈ 2,7 giây.
  2. Xe đạp ×0,85 so với demo (rộng 353, neo đáy (667, 940) giữ chỗ cũ), vẫn sau xe ba gác; giỏ là điểm C.
- **Khác:**
  - Dây kéo: sau khi cuộn bạt, dây treo lại ở mép bạt cuộn như demo (trước đây biến mất).
  - Sữa trong cửa sổ cỡ 205×160 như demo; lúc ngóc đầu, đỉnh đầu y 598, vẫn dưới thanh ngang.
- **Lưu ý:** ở khung 2:3 (1024×1536, máy vuông hơn 9:16), thanh túi đồ bắt đầu y 1183, nên che một phần đồ dưới đất (dép, nắp thiếc, cảnh Mun đuổi). Bố trí này làm cho khung 9:16 theo G5-21.
- **Ảnh** khung 9:16 cạnh demo trong `l5_dev_check/`:
  - `v12_01`: sân sau cạnh demo; `v12_01b`: Sữa ngóc đầu.
  - `v12_02`: hẻm tối.
  - `v12_03`: đốm sáng ở giỏ, Mun ló mặt.
  - `v12_04`: đủ 3 đồ đặt, cạnh demo hẻm.
  - `v12_05`: Mun đuổi dưới xe.
  - `v12_06`: Mun đè, cạnh demo lộ diện.
  - `v12_07`: nhìn chân.
  - Đã chơi trọn tới màn thưởng.
- Đã build lại web. Có ảnh thật nào Art giao, Dev ráp theo lượt (kiểm từng món với demo).

**A5-11. Art: tách ảnh L5 theo G5-22, G5-23.** Chưa commit.
- Lượt vẽ theo tờ (13 tờ, brief `art/review/l5_cut_*`) đã dừng khi G5-23 tới; chưa có ảnh nào lưu.
- **Chia 7 lượt**, mỗi lượt 1 demo, tối đa 7 món, mỗi món 1 ảnh `art/out/_sheets/l5src_<key>.png`. Brief ở `art/review/l5_tach_<lượt>_brief.md`, ảnh cắt từng món từ demo ở `art/ref/l5_cut/crops/`.
  - `yard_a`: cửa sổ quán (bỏ Sữa), chuông gió, áo, kẹp, chậu xương rồng, hoa, bàn trang điểm.
  - `yard_b`: gương nhỏ, túi rác, túi rác xẹp, thùng giấy, nắp thiếc, dép, dép lật.
  - `alley_a`: quạ, quạ quay đầu, bạt cuộn (giữ dây ngắn theo D5-15), bạt thả có lỗ, dây kéo dài, thạch sùng, ống bơ.
  - `alley_b`: xe đạp (giỏ trống, không bánh trước), bánh trước, CD trong giỏ, CD treo, xe ba gác, ống nước, vũng nước.
  - `alley_c`: gương ở B, nắp ở A, dải nắng, đốm sáng, icon mặt trời bị mây che.
  - `mun_a`: ló mặt, đè, đôi mắt, chân vồ, chạy, vồ, nhìn chân.
  - `chars`: Mun bế, mặt Mun, Sữa áp kính, nhân vật bịt mũi.
- Cửa sổ quán: Art tách `l5_cafe_window_back` và `_frame` theo mặt nạ (khung, thanh ngang và bậu là frame; trong kính là back).
- Nền: 2 lượt chỉnh sửa demo thành phòng trống, rồi vẽ nối trên dưới tới 1024x2304.
- Đang chạy lượt 1–4.

**D5-16. Dev: theo A5-11 của Art.** Chưa commit.
- **Bạt cuộn có sẵn dây ngắn:** `l5_awning_rolled` có đoạn dây ngắn có vòng ở đầu phải (như demo; khối đã vẽ thêm). Lúc kéo, dây dài `l5_awning_cord` giật xuống rồi ẩn, không còn treo lại dây riêng (`v12_08`).
- **Co theo bề rộng demo (`FIT`)** cho các món lớn, để ảnh thật Art cắt ra vào đúng cỡ ngay:
  - Xe đạp 353 (= 415 trên demo × 0,85, G5-22). Bánh trước co cùng tỉ lệ với xe đạp (`FIT_HEAD`); vị trí bánh (780, 880) đã tính cho ×0,85.
  - Xe ba gác 537, bạt 757 (bạt cuộn và dây co theo bạt thả), cửa sổ quán 386 (khung co theo lớp kính), Sữa 205, dải nắng 160, ống nước 56.
- Đã build lại web, chơi L5 tới màn thưởng.

**A5-12. Art: xong lượt tách 1–4 (28 món).** Chưa commit.
- Ảnh ở `art/out/level5/`; neo trong `art/out/anchors.json`. Bảng cắt: `design-art-level5.md` mục 5.1, mỗi món một ảnh `_sheets/l5src_<key>.png`.
- **Soi từng món cạnh ảnh cắt demo:**
  - `art/review/l5_art_check/items_yard_vs_demo.jpg` và `items_alley_vs_demo.jpg`.
  - Đều giống demo về hình, màu, chi tiết.
  - Nắp thiếc có gờ và bánh quy, không bóng.
  - Xe ba gác: thùng gỗ, khung xanh, bánh nan, gầm tối; đã bỏ Mun và đốm sáng.
  - Xe đạp: giỏ trống, không bánh trước. CD chỉ phần trên miệng giỏ.
- **Ghép tại chỗ demo** trên nền kem, cạnh demo: `compose_yard_vs_demo.jpg`, `compose_alley_vs_demo.jpg`. Cỡ lệch ≤ 5px, trừ:
  - Cửa sổ quán thấp hơn demo ~6% (373 so với 398 ở cùng bề rộng).
  - Ống nước Codex vẽ mập hơn, nên đặt theo chiều cao 936; bề rộng thành ~68 (demo 53).
- **Trạng thái mới:**
  - Túi rác xẹp hẹp đáy hơn túi căng ~15%, cùng tỉ lệ.
  - Dép lật cùng tỉ lệ (chiếc phải giữ nguyên); hiển thị rộng 255.
  - Bạt thả có 5 lỗ tròn; quạ quay đầu; dây kéo dài; CD treo dây.
- Đang chạy: lượt `alley_c`, `mun_a`, `chars` và 2 nền phòng trống.

**D5-17. Dev: ráp lượt ảnh thật 1–4 (A5-12, 28 món).** Chưa commit.
- **Code:**
  - Cửa sổ quán tạm là một ảnh `l5_cafe_window` dưới Sữa; có `_back`/`_frame` thì tự dùng 2 lớp.
  - Ống nước co theo chiều cao phần vẽ 936 (`FIT_H`).
  - Xe ba gác rộng 536.
  - Dây kéo dài treo ở mép dưới thật của ảnh bạt thả, đầu phải.
  - `play_harness` `match()` so được với tranh demo khung 9:16 (thế giới 1536 lệch xuống 142).
- **Vị trí chỉnh theo so-demo (`match`, khung 9:16):**
  - Sân sau: cửa sổ (257, 774), bàn (711, 1029), gương (720, 821), túi rác (207, 1059), thùng giấy (471, 1244), nắp thiếc (729, 1277), xương rồng (942, 1035), áo (687, 311), kẹp (714, 297, rộng 12), chuông gió (489, 382, rộng 60).
  - Hẻm: bạt (508, 269), quạ (322, 270), thạch sùng (334, 528), ống bơ (716, 607). Sai lệch sau chỉnh ≤ 2px.
  - Xe ba gác neo bánh sau (467, 1132), mép trái thùng x 368 như demo.
  - Xe đạp ×0,85 quanh điểm giữa đáy cũ, neo bánh sau (564, 940). Bánh trước (780, 880) khớp trục.
  - Đĩa CD đặt trong giỏ xe đạp đã thu nhỏ, nên lệch so với demo khoảng 20px sang trái, đúng theo G5-22.
- **Ảnh** khung 9:16 `l5_dev_check/v13_02…07`:
  - `v13_02`: sân sau cạnh demo.
  - `v13_03`: hẻm tối (bạt thả, dây dài).
  - `v13_04`: đủ 3 đồ cạnh demo.
  - `v13_05`: bánh xe quay.
  - `v13_06`, `v13_07`: Mun đuổi, đè.
  - Đã chơi trọn tới màn thưởng.
- **Cần Art xem — `l5_awning_down` cao quá:** đáy bạt thả ở y 552 nên lúc tối che thạch sùng (đỉnh 470), móc và dây CD (y 512–535) và nửa trên cửa sổ hẻm (từ y 440). Đồ vẫn chạm được nhưng gần như không thấy. Muốn thấy đủ thì đáy bạt thả nên ≤ y ≈ 435 (cao ≤ 166 từ mép trên 269). Dây dài hiện tới y 901, chạm giỏ xe đạp.
- Còn chờ: dải nắng, đốm sáng, gương B, nắp A, icon, Mun, Sữa, nhân vật, 2 nền.

**D5-18. Dev: ráp bạt thả và dây kéo mới (Art sửa theo D5-17).** Chưa commit.
- Bạt thả: phần vẽ y 269–440, rộng 757. Đáy bạt chạm mép trên cửa sổ hẻm (y 440), không cần nâng thêm.
- Lúc hẻm tối, đã thấy đủ thạch sùng (đỉnh y 473), móc và đĩa CD, cửa sổ hẻm và ống bơ (`l5_dev_check/v14_01`).
- Dây dài treo từ đáy bạt ở x 843, vòng ở y ≈ 680. Sau khi cuộn, dây ngắn của bạt cuộn khớp demo (`v14_02`).
- Đã build lại web.

**A5-13. Art: xong lượt tách 5–7, cửa sổ 2 lớp, bạt thả ngắn (D5-17).** Chưa commit.
- **Bạt thả** vẽ lại ngắn (cao/rộng 0,225; đáy y ≈ 440), dây dài cắt lại cao 250. Dev đã ráp (D5-18), lúc hẻm tối thấy đủ thạch sùng, CD, cửa sổ hẻm.
- **Lượt 5–7 (16 món):** dải nắng, đốm sáng, gương B, nắp A, icon mặt trời; 7 tư thế Mun; Mun bế, mặt Mun, Sữa áp kính, nhân vật bịt mũi.
  - Soi cạnh demo: `art/review/l5_art_check/items_mun_chars_vs_demo.jpg`.
  - `mun_eyes_dark`: Codex vẽ hai mắt xa nhau gấp ~4 lần, sai. Art lấy đúng đôi mắt từ `mun_peek_out` bằng mặt nạ (tròng vàng, con ngươi, viền), giữ khoảng cách thật.
  - Cỡ tư thế Mun chọn để tròng mắt bằng nhau (đo trên ảnh), khớp cỡ khối cũ của Dev (vồ 220, nhìn chân 194).
- **Cửa sổ quán 2 lớp:** `_back` = cả cửa sổ (dưới Sữa); `_frame` = bỏ 2 ô kính (x 65–529, y 63–254 và 276–497 trên ảnh 595x569), giữ khung, thanh ngang, bậu (trên Sữa). Ghép thử: `l5_art_check/window_layers_with_sua.png`.
- **Nền phòng trống** (`art/ref/l5_cut/bg_*_empty.png`, 1024x1536): đã xoá mọi đồ, giữ rào, cột, dây phơi, cửa sau, bậc / dây điện, móc, bậu B, cửa sổ hẻm. Đang vẽ nối 384px trên dưới thành 1024x2304.

**D5-19. Dev: ráp lượt 5–7, cửa sổ 2 lớp, nền hẻm (A5-13).** Chưa commit.
- **Ảnh mới đã vào game:** đồ đặt ở A và B, dải nắng, đốm sáng, icon mặt trời, đủ tư thế Mun, Sữa trong cửa sổ, nhân vật bịt mũi, cửa sổ quán 2 lớp, nền hẻm 1024×2304.
- **Cỡ theo số Art (`FIT`):**
  - Đồ đặt: nắp 130, gương 90. Đốm sáng 106.
  - Mun: ló mặt 106, mắt 57, chân 150, chạy 240, vồ 220, đè 160, nhìn chân 194.
  - Bế cao 320, dải nắng cao 700 (`FIT_H`).
- **Code:**
  - Dải nắng hiện tới alpha 0,6.
  - Icon trong bong bóng suy nghĩ co theo bong bóng (ảnh thật và khối cùng cỡ).
  - Đốm sáng lúc nhìn chân đặt đúng mu bàn chân trái giơ lên (px 170, 182 trên ảnh), cỡ 0,55.
  - `mun_held` neo đỉnh → game tự đặt neo ở nách (43% chiều cao), cảnh bế đúng tay nắm (`v15_10`). Nếu Art muốn, ghi neo nách vào anchors.json như `sua_held` thì code dùng luôn.
  - Nền cao (1024×2304, vùng chơi ở y 384–1920 của ảnh): game đặt lệch cho vùng chơi khớp y 0–1536, không kéo giãn dải mép. Áp cho cả 2 phòng; nền sân sau mới Art giao cùng quy ước là vào ngay.
- **Vị trí:**
  - Cửa sổ 2 lớp đặt như ảnh một lớp cũ (257, 774).
  - Sữa (248, 747): chân trước tì lên mặt bậu (y 731) như demo. Lúc ngóc đầu, tai khuất sau thanh ngang.
  - A (220, 978), B (511, 586) chỉnh theo so-demo nắp và gương thật. Ló mặt (698, 1135).
- **Ảnh** khung 9:16 `l5_dev_check/v15_01…12`:
  - `v15_01`: sân cạnh demo; `v15_02`: hẻm đủ 3 đồ cạnh demo.
  - Bịt mũi, bong bóng có icon, chân vồ, ló mặt.
  - Đuổi, đè, nhìn chân, bế, màn thưởng.
  - Đã chơi trọn tới màn thưởng.
- Đã build lại web.

**D5-20. Dev: neo nách `mun_held` của Art.** anchors.json nay có neo ở nách (ax 153, ay 190). Game dùng neo của Art; neo tự đặt ở D5-19 chỉ chạy khi ảnh còn neo đỉnh. Cảnh bế đúng tay nắm (`v15_10`). Đốm sáng ở mu chân và tai Sữa sau thanh ngang: Art giữ như D5-19. Đã build lại. Chưa commit.

**A5-14. Art: xong 2 nền 1024x2304, xong tách Level 5.** Chưa commit.
- **Nền** `art/out/level5/l5_bg_backyard.png`, `l5_bg_alley.png`: 1024x2304, vùng chơi ở y 384–1920.
  - Cách làm: Codex sửa vùng chơi demo thành phòng trống, rồi 2 lượt vẽ nối 384px trên và dưới (cảnh giữ nguyên, lệch ~2,5/255), Art ghép mép mềm.
  - Nền sân sau vẽ lại 1 lần cho màu bằng demo (lượt đầu trời, rào, sàn, cửa đậm hơn 0,03–0,05).
- **Ghép đủ đồ lên nền thật, cạnh demo:** `art/review/l5_art_check/final_yard_vs_demo.jpg`, `final_alley_vs_demo.jpg`.
  - Hẻm: TB 0,212, p90 0,380 (demo 0,203 / 0,341), đạt.
  - Sân sau: TB 0,256, p90 0,420 (demo 0,247 / 0,404). **Vượt ngưỡng TB 0,25 đúng 0,006.** Từng mảng lệch demo ≤ 0,03: rào +0,019, cửa sau +0,018, khung cửa sổ +0,020, dép +0,031, còn lại ±0,01. Nếu cần đạt hẳn, Art làm nhạt rào thêm một lượt (3 lượt Codex).
- **Neo `mun_held`** ghi ở nách (oy 0,383, như sua_held 0,386). Nếu cắt lại `l5src_mun_held` thì phải ghi lại neo này.
- **Dải nắng** đặt theo cao 700 (rộng ~190); code để alpha 0,6.
- Dev đã ráp hết lượt 1–7 và nền hẻm (D5-17…D5-19). Nền sân sau mới đã ghi đè, Dev nạp lại.

**D5-21. Dev: nền sân sau mới (A5-14), L5 đủ ảnh thật.** Chưa commit.
- Nền sân sau 1024×2304 vào đúng quy ước: vùng chơi khớp, không kéo giãn mép.
  - `v16_01`: khung 9:16 cạnh demo.
  - `v16_02`: khung 2:3, máy vuông hơn cũng đủ nền.
- Mọi key L5 đã là ảnh thật. Còn `l5_doorstep` và `l5_clothesline` chỉ là khối dự phòng, không hiện vì đã vẽ trong nền.
- Đã build lại web.

**G5-24 (GD).** Giữ tai Sữa khuất sau thanh ngang. Không làm nhạt hàng rào: cảnh ghép 0,256 sát demo 0,247, chủ dự án đã chê nhạt.

**A5-15. Art: cảnh bế Mun, hai tay không ôm Mun (GD báo, v15_10).** Chưa commit.
- **Lý do:** `sua_held` hiển thị cao 631, còn `mun_held` Art cắt cao 320 theo khối cũ. Mun chỉ bằng nửa Sữa; thân dưới nách ~85 so với ~165–180 của Sữa, nên tay bế (canh cho Sữa) hở hai bên.
- **Sửa:** cắt lại `mun_held` cao 631 (hiển thị 393x641). Thân dưới nách ~157. Neo nách ghi lại (oy 0,376).
- Đã nhờ Dev nạp lại và chụp lại cảnh bế.

**D5-22. Dev: cảnh bế Mun (GD báo sau D5-20; Art cắt lại `mun_held` ở A5-15).** Chưa commit.
- `mun_held` nay cùng cỡ `sua_held` (hiển thị 393×641, neo nách ax 295, ay 362). Dev đã bỏ hệ số co riêng cao 320 trong code.
- Neo tự đặt ở nách chỉ còn chạy khi ảnh neo đỉnh, nay không dùng tới.
- Cảnh bế Mun giống hệt Sữa: cùng tư thế tay, cùng khoảng cách. Hai tay ôm sát hai bên nách, không còn hở, Mun treo dưới tay (`l5_dev_check/v17_held_mun_vs_sua_l1.jpg`: Mun L5 | Sữa L1, cùng thời điểm 1 giây sau khi chạm).
- Đã build lại web.
- **Đã kiểm trong game** (`l5_dev_check/v17_held_mun_vs_sua_l1.jpg`, D5-20): hai tay ôm sát nách Mun như Sữa L1, không còn hở. Xong A5-15.
