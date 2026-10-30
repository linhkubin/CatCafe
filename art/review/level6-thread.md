# Level 6 – Xuống đây nào, Mun!: thảo luận GD, Art, Dev

Đặc tả: `levels/levels-01-10.md` (Level 6), `levels/states-01-10.md` (Level 6). Quy trình: `QUY-TRINH.md`.

**G6-1 (GD, chủ dự án duyệt 2026-10-30). Thay màn 6 "Túi giấy sột soạt" bằng màn làm thân ngoài trời.**
- Mun bị chó Lu dọa, kẹt trên mái nhà kho trong sân sau nhà hàng xóm.
- Chuỗi giải: lấy xương trong bụi rau → cho Lu (Lu về chuồng gặm) → lấy xúc xích trong giỏ picnic → xếp đường xuống **4 bước** bằng cách **kéo đồ có sẵn trong cảnh** (thùng phuy tới A, tấm ván đậy phuy, thùng gỗ tới B, ghế đẩu tới C) → **đặt xúc xích lên ghế** → Mun xuống từng bậc tới ghế ăn (Lộ diện) → chạm thắng. Không bẻ xúc xích.
- Mun vẫn sợ dù đủ đường, chỉ xúc xích mới dụ xuống. Lu còn rảnh thì không đặt được xúc xích (Lu chồm đòi).
- Độ khó tạm 🟡 Normal 90 giây (ngoại lệ so với luật chung: level 6 là Easy). Chủ dự án chốt lại sau khi chơi bản khối.
- Nền: dùng lại `l5_bg_backyard` (QUY-TRINH mục 6); nhà kho là sprite riêng.

**Việc tiếp theo (QUY-TRINH bước 2):** Dev code bản chơi thử bằng khối, chơi trọn màn. GD chơi hết rồi gửi chủ dự án. Chưa vẽ gì khi chủ dự án chưa duyệt gameplay.

**D6-1. Dev: bản chơi thử bằng khối (G6-1, QUY-TRINH bước 2).** Chưa commit. Mở `?level=6` (menu đã có ô 6).
- **Màn:** `game/src/level6.js`. Nền thật `l5_bg_backyard` (dùng lại), chuông gió dùng lại `l5_wind_chime`, Mun chạy và cảnh bế dùng ảnh Mun thật; các đồ còn lại, Lu và các dáng Mun mới là khối có nhãn, đặt tên key đúng `states-01-10.md`.
- **Code chung mới (QUY-TRINH mục 6):**
  - `objects.js`: `sceneDraggable(name, { spots, when, place, sfx })` kéo đồ có sẵn trong cảnh tới chỗ đặt: đang kéo thì chỗ hợp lệ hiện viền mờ đúng cỡ món, thả trong 110px là khớp (rơi nhẹ, nhún), thả chỗ khác thì trượt về, lắc một nhịp, "sai". `sceneSpotCenter()` cho bàn chân 💡 kéo mẫu.
  - `blocks.js` (file mới): khối có nhãn cho bản khối (`block`, `rr`, `el`, `label`, bảng màu `PAL`); màn sau dùng chung.
  - `base.js`: `buildBg` tự đặt lệch nền cao 2304 (trước chỉ có ở `rooms.js`, nay màn một phòng dùng được); `face(s, flip)` quay mặt sprite, khối có nhãn không lật chữ.
  - `sfx.js`: tiếng tạm Lu (sủa, vui, gặm, ư ử) và bảng mượn tiếng L6. `assets.js`: danh sách ảnh túi đồ dùng chung `BAG_UI`.
  - Dùng lại: `fidget` (Lu sủa định kỳ), `thinkBubble` (bong bóng khúc xương), `idleHints` / `pressBulb` / `pawAt` / `handDrag`, `glowOn`, `pickUp`, `dropSpots`, `fishBurst`.
- **Đã chơi trọn màn** (khung 9:16, không lỗi): mở màn Lu đuổi Mun lên mái; chạm Mun lùi sau ống khói 2 giây; chạm Lu bong bóng xương; bụi rau → xương; thả xương vào Lu → Lu về chuồng gặm; giỏ picnic → xúc xích; kéo phuy → A, ván → A, thùng gỗ → B, ghế → C (mỗi bậc Mun ra mép nhìn rồi lùi); xúc xích lên ghế → Mun khịt mũi, ra mép, xuống ván (ngoái nhìn), thùng gỗ, ghế, ăn, ngẩng nhìn, Lu ló, Mun nép cạnh ghế (Lộ diện) → chạm bế → thưởng 40 cá (30 + 2 bí mật).
- **Chạm sai đã thử, đúng đặc tả:** phuy thả chỗ khác trượt về; ván khi phuy chưa ở A trượt về; thùng gỗ thả vào chỗ C trượt về; xúc xích lên ghế khi Lu rảnh → Lu chồm đòi, xúc xích về túi, bong bóng xương; xúc xích thả xuống đất → về túi, ghế lấp lánh; xúc xích lên ghế khi thiếu bậc → ở lại, Mun ra mép kêu, đặt nốt bậc thì Mun xuống ngay.
- **Đồ phụ:** găng tay đen rơi, Lu rảnh chạy ra ngậm rồi bỏ; ổ chim, bình tưới mỗi cái 5 cá (bí mật); chuông gió leng keng, Mun vểnh tai; chuồng / Lu khi gặm → lăn khoe bụng 1 giây.
- **Gợi ý:** 8 giây Lu ngoái nhìn bụi rau (chưa có xương) / Mun nhìn xuống chỗ thiếu bậc (đã cho xương); 16 giây đồ kế tiếp lấp lánh (icon trong túi nảy); 💡 bàn chân chạm / kéo mẫu bước kế tiếp (kéo món trong cảnh tới chỗ đặt).
- **Bố cục:** theo sơ đồ đặc tả; hàng đồ dưới cùng đặt đáy ≤ y 1150 để khung 2:3 túi đồ không che. Thùng gỗ lúc đầu để trước góc phải nhà kho (chỗ trống), tránh chồng lên chỗ đặt B, C.
- **Chỗ Dev tự chọn, GD xem:** (1) "Lu thò đầu khỏi chuồng" chưa có key riêng, tạm cho Lu đang gặm nhảy lên một nhịp. (2) `mun_sit_look` chưa có ảnh, tạm khối. (3) Lúc ngoái nhìn ở bậc A Mun nảy nhẹ (khối không lật).
- Ảnh trong game (khung 9:16): `l6_dev_check/g01_mo_man.jpg` (mở màn), `g02_xep_xong_duong.jpg` (xếp xong 4 bậc), `g03_mun_an_tren_ghe.jpg` (Mun ăn trên ghế), thêm `g04_lo_dien.jpg`, `g05_be.jpg`, `v03_dog_beg.jpg` (Lu chồm đòi), `g06_khung_2x3.jpg` (khung 2:3), `g00_tong_hop.jpg` (gộp).
- Kiểm lại L1–L5 sau khi sửa code chung: vào màn, 💡, nền L5 cao vẫn đặt đúng, không lỗi. Đã build lại web.

**G6-2 (GD, chủ dự án 2026-10-30). Đường xuống như bậc thang thật.** Ghi giúp GD.
- Chủ dự án: "mèo nảy từ mái xuống thùng phi bị cao quá".
- Mặt ván trên phuy (A) sát dưới mép mái; độ hụt từ mép mái xuống ván khoảng bằng chiều cao Mun ngồi, không hơn.
- 4 nấc mái → A → B (thùng gỗ) → C (ghế) → đất hụt cao gần đều nhau. Dev tuỳ chọn cách chỉnh (hạ mái kho, nâng / làm cao phuy, kê thùng gỗ cao hơn), miễn trông hợp lý.
- Mỗi lần Mun xuống một bậc: nhảy ngắn, đáp nhẹ, không rơi dài.
- Dev gửi GD ảnh lúc xếp xong đường, có đánh dấu độ hụt từng bậc.

**D6-2. Dev: G6-2 bậc thang đều.** Chưa commit.
- Hạ nhà kho (cao 480 → 360, mái mỏng), phuy cao hơn (200 → 226), thùng gỗ kê cao hơn (120 → 170); ván đặt trên miệng phuy (y 786), ống khói và chỗ Mun lùi hạ theo mái.
- Đo trong game sau khi xếp xong 4 bậc: mặt mái 656 → mặt ván (A) 760 → mặt thùng gỗ (B) 867 → mặt ghế (C) 971 → đất 1072. Độ hụt từng nấc: **104 · 107 · 104 · 101 px**, đều nhau và thấp hơn chiều cao Mun ngồi (khối ≈ 130). Ván nằm sát dưới mép mái.
- Mun xuống mỗi bậc: nhảy ngắn 0,36 giây, vồng thấp 30px, đáp nhún nhẹ kèm tiếng "tạch" nhỏ (`stepDown`), không rơi dài. Bậc cuối từ ghế xuống đất nép cạnh ghế cũng nhảy ngắn như vậy.
- Chơi lại trọn luồng chuẩn tới lúc Mun ăn và nép cạnh ghế, không lỗi.
- Ảnh: `l6_dev_check/g07_bac_thang_danh_dau.jpg` (xếp xong đường, vạch đỏ đánh dấu độ hụt từng bậc), `g07_bac_thang.jpg` (cả màn), `g08_mun_an_va_nep.jpg` (Mun nép cạnh ghế). Ảnh g01–g06 ở D6-1 là bố cục trước G6-2.
- Đã build lại web.

**D-SCREEN. Dev: khung màn hình mọi màn (G-SCREEN, QUY-TRINH bước 4).** Chưa commit. Ghi ở đây vì làm ngay sau G6-2; áp cho L1–L6.
- **Cỡ khung** (`main.js` `gameSize`): chuẩn 9:16 = 1024x1820. Máy dài hơn: giữ ngang 1024, mở dọc tới 2304 (9:19,5 = 1024x2219). Máy rộng hơn: giữ dọc 1820, mở ngang tới 3:4 = 1365x1820 (dư mỗi bên ≈ 171); rộng hơn 3:4 thì viền màu nền hai bên. Toạ độ đồ vật không đổi: vùng chơi 1024x1536 ở giữa, camera lùi (X0, Y0).
- **Giao diện bám mép màn thật** (`base.js`, `rooms.js`): tim, bong bóng góc ở mép trái; nút ⏸, bản đồ mini, cá khô bay về ở mép phải; 💡 góc phải dưới; túi đồ mép trái dưới; mũi tên ◄ ► cách mép 64. Màn tạm dừng, cảnh bế, màn thưởng nằm giữa màn thật (tay bế luôn rộng hơn màn).
- **Nền:** `buildBg` chung thêm dải mép kéo dài 4 phía + 4 góc (tạm, tới khi Art vẽ nền dư hai bên). L5 bạt hẻm tạm kéo giãn ngang theo khung, lỗ thủng và tia nắng đầu dời theo; bóng râm phủ cả phần dư.
- **Màn nhiều phòng:** các phòng cách nhau 1366 (`ROOM_W` = 1024 + 2 × 171), phần dư của phòng này không chồng phòng bên cạnh; camera và chuyển phòng tính thêm X0. L4 mặt nạ sofa mở tới hết phần dư bên phải.
- **Menu:** lưới ô số giữa màn. **Công cụ chơi thử:** `aspect('3:4' | '9:19.5' | '9:16')`, `tap` / `drag` nhận toạ độ thế giới theo camera; `react(x)` dùng toạ độ trong khung 1024 (`bandX`).
- **Đã kiểm L1–L6 ở 3 khung** (9:16, 9:19,5, 3:4), không lỗi: vào màn, mở màn, phần dư hai bên / trên dưới không lộ trống. Ở 3:4 đã chơi thêm: L4 chuyển 3 phòng, L5 sang hẻm có túi đồ, L3 tới lộ diện, L6 trọn màn tới cảnh bế và màn thưởng, màn tạm dừng.
- Ảnh khung 3:4 (720x960): `art/review/screen_check/v1_34_l1.jpg` … `v1_34_l6.jpg`, thêm `v1_34_l5_alley.jpg`, `v1_34_l4_study.jpg`, `v1_34_l4_bedroom.jpg`, `v1_34_pause.jpg`, `v1_34_l6_held.jpg`, `v1_34_l6_reward.jpg`; gộp `00_khung_3x4_tong_hop.jpg`. Khung 9:16 và 9:19,5: `v1_9x16_l*.jpg`, `v1_9x19_5_l*.jpg`.
- Lưu ý cho Art: phần dư hai bên hiện là mép nền kéo giãn (thấy rõ ở thảm L2, L3); khi vẽ nền mới cần dư mỗi bên ≈ 171 (nền rộng ≈ 1366). Bạt L5 cũng cần dư hai bên.
- Đã build lại web.

**G6-3 (GD, chủ dự án góp ý bản khối 2026-10-30).** Giao Dev.
- **Nhà kho to hơn một chút** (khoảng ×1,15), mái và ống khói theo; chỉnh lại các bậc cho khớp G6-2.
- **Bỏ tấm ván, thay bằng hộp dụng cụ nhỏ** (`l6_toolbox`) đặt khít lên miệng phuy ở A: vẫn là bước thứ 2 của chỗ A (đậy nước), đồng thời nâng bậc A lên gần mép mái.
- **Lu nhận xương:** chui hẳn vào chuồng, chỉ thò đầu ra cửa chuồng gặm xương vui vẻ (`l6_dog_chew`). Chạm chuồng lúc này: Lu lăn ra khoe bụng 1 giây rồi chui lại vào.
- Đã sửa đặc tả `levels-01-10.md`, `states-01-10.md`.

**G6-4 (GD, chủ dự án góp ý bản khối 2026-10-30).** Giao Dev.
- **Thùng gỗ chỗ ban đầu chưa hợp lý:** hiện dựa sát góc nhà kho, trông như dính vào kho. Đặt thùng gỗ ở chỗ tự nhiên trong sân: đứng riêng trên sân, cạnh hàng rào hoặc góc sân, không chồng lên nhà kho, chuồng, bụi rau hay chỗ đặt A, B, C. Các món xếp đường (phuy, hộp dụng cụ, thùng gỗ, ghế) lúc đầu nằm rải rác hợp lý, dễ thấy, không che nhau.
- **Găng tay:** chạm thì găng rơi xuống đất dưới hàng rào và nằm yên tại chỗ. **Lu chạy tới chỗ găng** (nếu Lu rảnh), ngậm lắc lắc, vờn một lúc, bỏ găng tại chỗ rồi chạy về. Găng không bay hay trượt về phía Lu. Lu đang gặm trong chuồng thì chỉ ngẩng đầu nhìn.

**D6-3. Dev: G6-3 (làm cùng G6-2).** Chưa commit.
- **Nhà kho ×1,15** (400x360 → 460x414), mái và ống khói (70x140 → 80x160) theo; Mun trên mái, chỗ lùi sau ống khói hạ theo mặt mái mới (y 603).
- **Bỏ tấm ván, thay hộp dụng cụ** `l6_toolbox` (120x50) đậy khít miệng phuy ở A, vẫn là bước thứ 2 của A (phải sau phuy; đặt trước thì trượt về, đã thử). Danh sách ảnh: bỏ `l6_plank`, thêm `l6_toolbox`.
- **Bậc chỉnh lại cho đều** (đo trong game): mặt mái 603 → mặt hộp dụng cụ (A) 720 → mặt thùng gỗ (B) 839 → mặt ghế (C) 956 → đất 1072. Độ hụt: **117 · 119 · 117 · 116 px**, dưới chiều cao Mun ngồi; hộp dụng cụ sát dưới mép mái. Phuy cao 240, thùng gỗ 198, ghế 111.
- **Lu nhận xương:** chạy về chuồng, chui vào, chỉ đầu Lu ngậm xương thò ra cửa chuồng (`l6_dog_chew`). Chạm chuồng / Lu lúc này: Lu lăn ra trước chuồng khoe bụng 1 giây rồi chui lại vào, thò đầu gặm tiếp. Cảnh lộ diện: Lu ngẩng đầu khỏi khúc xương (đầu nảy lên một nhịp).
- Chơi lại trọn luồng chuẩn tới lúc Mun nép cạnh ghế, không lỗi.
- Ảnh: `l6_dev_check/g11_bac_thang_danh_dau.jpg` (xếp xong đường, đánh dấu độ hụt), `g11_xep_xong_duong.jpg` (cả màn), `g09_lu_gam_trong_chuong.jpg` (Lu gặm trong chuồng), `g09_lu_chuong_zoom.jpg` (phóng to: gặm trong chuồng | lăn ra khoe bụng), `g12_mun_nep.jpg`. Ảnh g01–g08 là bố cục trước G6-3.
- Đã build lại web.

**D6-4. Dev: G6-4 (làm chung G6-2, G6-3).** Chưa commit.
- **Chỗ đầu các món** (rải rác, đo bằng khung phần vẽ: không món xếp đường nào chồng kho, chuồng, bụi rau, bàn, giỏ, nhau hay chỗ A / B / C):
  - Phuy (60, 950) và thùng gỗ (182, 950) đứng riêng cạnh hàng rào bên trái (thùng gỗ không còn dựa góc kho).
  - Bàn + giỏ picnic (130, 1150) trước góc trái sân.
  - Hàng trước, đáy y 1150 (khung 2:3 túi đồ không che): hộp dụng cụ (305), ghế đẩu (425), bình tưới (525), bụi rau (670), chuồng (920).
  - Găng tay vắt hàng rào ở x 300 (chuông gió dời sang x 390 cho khỏi chạm).
- **Găng tay:** chạm thì rơi thẳng xuống đất dưới hàng rào (300, 905) và nằm yên. Lu rảnh: chạy tới cạnh găng, ngậm lắc lắc (đầu Lu và găng cùng lắc tại chỗ), chồm vờn (găng nảy lật rồi về đúng chỗ), bỏ lại, chạy về chỗ ngồi sủa. Găng không đi về phía Lu (đã đo: trước và sau đều ở (300, 905)). Lu đang gặm trong chuồng: chỉ ngẩng đầu nhìn, không ra khỏi chuồng (đã thử).
- Chơi lại trọn luồng chuẩn tới lộ diện, không lỗi.
- Ảnh: `l6_dev_check/g13_mo_man_vi_tri.jpg` (mở màn, vị trí các món), `g14_lu_von_gang.jpg` (Lu vờn găng).
- Đã build lại web.

**D-MENU. Dev: mở khoá mọi màn khi chơi thử (chủ dự án nhờ qua GD).** Chưa commit.
- `progress.js`: chạy bằng dev server (chưa build) thì menu mở khoá hết; bản build thêm `?unlock=1` cũng mở hết. Bản build không cờ vẫn khoá như cũ. Chỉ đổi `isOpen`; ô đã qua vẫn xanh, tiến độ đã lưu không đụng.
- Đã thử: dev server 6/6 ô mở; bản build 1 mở, 5 khoá; bản build `?unlock=1` 6/6 mở. Đã build lại web.

**G6-5 (GD, chủ dự án góp ý bản khối 2026-10-30).** Giao Dev. Lời chủ dự án: "để giỏ dịch sang trái, đặt xúc xích lên bàn và mun cũng nhảy lên bàn ở cuối nhé".
- Giỏ picnic dời sang **mép trái mặt bàn**, chừa chỗ trống bên phải.
- Mồi đổi từ ghế sang **bàn**: thả xúc xích lên chỗ trống trên bàn. Luật Lu chặn, thiếu bậc, thả sai chỗ giữ như cũ (đổi ghế thành bàn).
- Ghế đẩu (chỗ C) vẫn là bậc thấp nhất, đặt **sát cạnh bàn**; bàn dời tới gần chân đường xuống nếu cần.
- Cuối cùng Mun: mái → hộp dụng cụ → thùng gỗ → ghế → **nhảy phốc lên bàn**, ăn xúc xích cạnh giỏ (Lộ diện).
- Đã sửa đặc tả `levels-01-10.md`, `states-01-10.md`.

**G6-6 (GD, chủ dự án góp ý bản khối 2026-10-30).** Giao Dev. Lời chủ dự án: "đoạn bắt đầu vào chó đuổi theo mun chạy 1 vòng quanh sân, mun chạy 1 vòng xong mới nhảy lên bàn, lên thùng gỗ, lên cột điện rồi lên mái kho".
- Mở màn: Lu đuổi Mun chạy **một vòng quanh sân**, rồi Mun nhảy liên tiếp **bàn → thùng gỗ → cột điện → mái kho**. Lu chạy tới dưới mái ngồi sủa.
- Thùng gỗ ban đầu và cột điện phải nằm sao cho chuỗi nhảy này hợp lý (bàn thấp → thùng gỗ cao hơn → cột điện sát mái). Cột điện là cột có sẵn trong nền hoặc thêm khối riêng. Người chơi xem cảnh này cũng hiểu Mun leo lên bằng cách nào (gợi ý cho phần xếp đường xuống).
- Không cho chạm trong lúc diễn cảnh mở màn (như các màn trước).

**D6-5. Dev: G6-5 (làm chung G6-2 … G6-4).** Chưa commit.
- **Bàn** dời xuống sát cạnh trái ghế đẩu ở chỗ C (bàn x 17–245, mặt bàn y 948 ≈ mặt ghế 954). **Giỏ picnic** ở mép trái mặt bàn; chỗ trống bên phải (190, 948) là chỗ đặt xúc xích.
- **Mồi đổi sang bàn:** thả xúc xích lên bàn. Lu còn rảnh → Lu chồm tới cạnh bàn đòi, xúc xích về túi; thiếu bậc → xúc xích ở lại trên bàn, Mun ra mép mái kêu; thả chỗ khác → về túi, bàn lấp lánh; đủ 4 bậc → Mun xuống. Đã thử cả bốn trường hợp. Gợi ý 💡 / 16 giây chỉ vào bàn.
- **Cảnh cuối:** Mun mái → hộp dụng cụ → thùng gỗ → ghế (mỗi bậc nhảy ngắn), rồi nhún người, nhảy phốc lên bàn, đáp cạnh giỏ. **Lộ diện từ lúc Mun lên bàn** (chạm là bế); Mun ăn xúc xích, ngồi nhìn; Lu ngẩng đầu khỏi khúc xương, Mun xù lông một nhịp rồi ngồi yên trên bàn.
- **Chỗ đầu các món** dàn lại vì giỏ ở mép trái bàn đè lên chân phuy cũ (chạm giỏ trúng phuy). Từ G-SCREEN khung luôn cao ≥ 1820, túi đồ bắt đầu từ y ≈ 1298, nên hàng trước sân đặt đáy y 1290: hộp dụng cụ (300), phuy (430), thùng gỗ (590), bụi rau (770), bình tưới (940); ghế đẩu dưới bàn (150, 1200). Đo khung phần vẽ: không món nào chồng nhau, chồng bàn, giỏ, kho, chuồng hay chỗ A / B / C.
- Chơi lại trọn luồng chuẩn tới màn thưởng, không lỗi.
- Ảnh: `l6_dev_check/g15_mo_man.jpg` (mở màn), `g16_mun_an_tren_ban.jpg` (Mun vừa lên bàn ăn, Lộ diện), `g17_mun_ngoi_ban.jpg` (Mun ngồi trên bàn cạnh giỏ), `v15_lu_choi_ban.jpg` (Lu chồm tới bàn đòi xúc xích).
- Đã build lại web.

**D6-6. Dev: G6-6 mở màn (làm chung G6-2 … G6-5).** Chưa commit.
- **Mở màn:** Mun (ảnh chạy thật) vào từ mép trái, chạy một vòng quanh sân trước 2,5 giây, Lu đuổi sát sau. Hết vòng Mun nhảy liên tiếp: bàn → thùng gỗ (chỗ ban đầu) → cột dây phơi có sẵn trong nền (x ≈ 490, Mun dựng người bám leo) → mép mái, mỗi nhịp 0,35 giây, rồi nằm rạp trên mái. Lu chạy tới dưới mái ngồi sủa. Trong lúc diễn, Mun và Lu vẽ trên nhân vật đang đứng gọi để thấy rõ cú nhảy.
- **Khoá chạm** tới khi Mun nằm trên mái (≈ 3,9 giây; đã thử: chạm giỏ, bụi rau lúc đang diễn không ăn, sau đó ăn bình thường). Lu bắt đầu sủa định kỳ sau khi diễn xong.
- **Thùng gỗ ban đầu** dời tới cạnh hàng rào sau bàn (275, 880; cao 198, mặt trên y 682), đứng riêng, không chồng bàn, giỏ hay chỗ B. Bậc nhảy: mặt bàn 948 → mặt thùng 682 → cột (y 700) → mép mái 607.
- **Găng tay** dời sang x 440 (rơi xuống (440, 900)), chuông gió về x 330, để thùng gỗ đứng ở chỗ cũ của găng.
- Chơi lại trọn luồng chuẩn tới lộ diện sau mở màn mới, không lỗi.
- Ảnh: `l6_dev_check/g18_mo_man_cac_nhip.jpg` (6 nhịp: chạy vòng ×2, lên bàn, lên thùng gỗ, bám cột, nằm trên mái), ảnh lẻ `g18`…`g23_mo_man_*.jpg`.
- Đã build lại web.

**D6-6b. Dev: găng tay vắt trên rào (GD góp ý sau D6-5).** Chưa commit.
- Găng tay đen hạ xuống: đáy y 372 → 415 (khung găng y 315–415), đỉnh rào ở chỗ đó y ≈ 360–375 (đo trên nền). Nửa trên nhô lên khỏi rào, nửa dưới thòng xuống mặt trước rào, trông như mèo đen ngồi trên rào. Chỗ rơi khi chạm giữ nguyên (440, 900).
- Ảnh: `l6_dev_check/g24_gang_tren_rao.jpg`.
- Đã build lại web.

**G6-7 (GD, 2026-10-30). Mở màn: diễn Mun leo trước, nhân vật gọi sau.** Ghi giúp GD.
- Lỗi ở D6-6: nhân vật mở màn (`player_call`) đứng che góc bàn, thùng gỗ, cột; bong bóng "?" đè lên Mun lúc leo. Người chơi không thấy rõ đường Mun leo, mà đó là gợi ý cho phần xếp đường xuống.
- Sửa: L6 diễn cảnh Lu đuổi Mun, Mun leo lên mái trước, không có nhân vật. Mun nằm rạp trên mái xong thì nhân vật mới trồi lên gọi, bong bóng mới bật ra, bật ở phía không che mái kho.
- Chỉ đổi L6, các màn khác giữ nguyên. Dev gửi lại ảnh các nhịp mở màn.

**D6-7. Dev: G6-7 mở màn L6 (Mun leo trước, nhân vật gọi sau).** Chưa commit.
- `base.js`: tách phần nhân vật gọi + bong bóng nhiệm vụ thành `introCall()`. Màn thường gọi ngay như cũ. Màn khai báo `introCallLater` thì tự gọi `introCall()` khi cảnh diễn xong; `introRise` cho nhân vật trồi lên từ mép dưới thay vì đi vào từ trái; `introLockMax` đặt hạn mở khoá dự phòng (mặc định 8 giây như cũ).
- **L6:** 0–3,9 giây không có nhân vật, không bong bóng: Lu đuổi Mun chạy vòng, Mun nhảy bàn → thùng gỗ → cột → mái, nằm rạp. 0,3 giây sau nhân vật trồi lên gọi; bong bóng bật ra trên đầu nhân vật, lệch trái (380, 700), không che mái kho; thu về góc thì mở khoá chạm (≈ 8,6 giây). Khoá chạm suốt cảnh diễn; dự phòng mở 12 giây.
- **Màn khác giữ nguyên:** đã thử L1, L2, L3, L5 (nhân vật vào, bong bóng bật, mở khoá như cũ), L4 (mở màn riêng trên sofa, như cũ). Chơi lại trọn L6 tới cảnh bế, không lỗi.
- Ảnh: `l6_dev_check/g25_mo_man_cac_nhip_g67.jpg` (6 nhịp: chạy vòng, lên bàn, lên thùng gỗ, bám cột, nằm trên mái, nhân vật trồi lên gọi), ảnh lẻ `g25`…`g31_mo_man_*.jpg`.
- Đã build lại web.

**G6-8 (GD, chủ dự án 2026-10-30). Duyệt gameplay bản khối, sang bàn art và vẽ demo (QUY-TRINH bước 3–4).** Lời chủ dự án: "Báo art vẽ demo nhé".
- Bố cục, vị trí, cỡ đồ: theo bản khối hiện tại (ảnh `l6_dev_check/g15_mo_man.jpg`, `g16_mun_an_tren_ban.jpg`, `g25_mo_man_cac_nhip_g67.jpg`, `g24_gang_tren_rao.jpg`).
- Nền: **dùng lại `l5_bg_backyard`** (bản nối rộng 3:4 của G-SCREEN), không vẽ nền mới. Mọi đồ là sprite riêng.
- **Lu là nhân vật mới:** Art làm `lu_ref` (chó vàng to, tròn trịa, hiền, đáng yêu, cùng phong cách Sữa/Mun) gửi chủ dự án duyệt trước, rồi mới đưa vào demo.
- Demo khung 1080x1920 (và vùng dư 3:4), ít nhất 2 cảnh: lúc mở màn (Mun nằm rạp trên mái, Lu sủa, các món ở chỗ ban đầu) và lúc xếp xong đường (Mun ăn trên bàn, Lu gặm trong chuồng).
- Art và Dev chốt danh sách key, lớp, neo, trạng thái (bước 3) song song.

**D6-8. Dev: yêu cầu art L6 (QUY-TRINH bước 3, G6-8).** Chưa commit.
- Bảng bố trí và yêu cầu animation: `art/review/l6_dev_check/l6_block_layout.md` (vị trí neo, cỡ khối = cỡ hiển thị đề xuất, lớp, vùng chạm, trạng thái từng món; dáng Lu, dáng Mun; tách phần; điểm cần chốt).
- Ảnh khối sạch không chữ: `l6_dev_check/layout/l6_khoi_mo_man_9x16.jpg`, `l6_khoi_xep_xong_9x16.jpg`, `l6_khoi_mun_tren_ban_9x16.jpg`. Số liệu thô `layout/l6_block_export.json`. Thêm cờ chung `&nolabel=1` (khối không chữ, `blocks.js`).
- Trả lời 5 câu của Art (nháp `design-art-level6.md` mục 2):
  1. Danh sách key của Art khớp code. Chuông gió dùng lại `l5_wind_chime`, Art không vẽ. Dev đề xuất thêm (GD / Art chốt có vẽ không, không thì dùng tạm như bản khối): `l6_dog_run` (Lu chạy đuổi lúc mở màn), `l6_dog_play_glove` (Lu ngậm găng lắc), `mun_climb` (Mun bám cột dây phơi; hiện là `mun_run` xoay −70°). `mun_jump_up` đồng ý.
  2. Tai dựng: một ảnh không tween được tai. Dev đề xuất Art vẽ thêm `mun_roof_crouch_ears_up` cùng nhóm, cùng khung, cùng đáy với `mun_roof_crouch` (chỉ khác tai, đầu hơi ngóc); Dev đổi ảnh khi Lu bắt đầu gặm.
  3. `mun_sit_look`: game đang dùng khối tạm, L5 không có key này. Đề xuất vẽ mới (ngồi trên bàn, liếm mép, ngẩng nhìn người chơi) cùng tỉ lệ bộ Mun mặt tròn, vì đây là dáng lộ diện.
  4. Chuồng: không bắt buộc ảnh mặt trước. Vẽ đầu Lu đặt trước cửa (che mép cửa) là đủ. Nếu Art muốn thấy rõ "chui trong chuồng" thì vẽ thêm `l6_dog_house_front` (riêng khung vòm cửa, cùng khung + đáy với `l6_dog_house`), Dev đặt lớp trên đầu Lu như cửa sổ quán L5.
  5. Neo: mọi món neo giữa đáy. Quy ước thêm: với phuy, hộp dụng cụ, thùng gỗ, ghế đẩu, bàn, **đỉnh phần vẽ = mặt Mun đứng / mặt đặt đồ** (miệng phuy, nắp hộp, mặt thùng, mặt ghế, mặt bàn). Nếu có phần nhô lên trên mặt đó (quai hộp dụng cụ, gờ thùng…) thì vẽ thấp, phẳng, và Art ghi độ cao phần nhô (px trên ảnh) để Dev trừ. Hộp dụng cụ rộng ≈ miệng phuy. Giữ chiều cao phần vẽ: phuy 240, hộp 50, thùng 198, ghế 111 (bậc hụt đều G6-2); khác thì báo để Dev dời bậc.
- Cần GD chốt cùng `lu_ref`: cỡ Lu so với Mun (Dev đề xuất Lu ngồi rộng ≈ 240–260, khối hiện nhỏ hơn Mun thật) và cỡ dáng Mun mới theo bộ mặt tròn (≈ 200–220 rộng).

**G6-9 (GD). Trả 3 điểm D6-8.**
1. **Cỡ Lu:** "chó vàng to" phải to hơn Mun rõ rệt. Lu ngồi rộng khoảng **300** (≈1,4–1,5 lần Mun ngồi), các dáng Mun mới rộng khoảng 200–220 như Dev đề xuất. Nếu 300 làm chật sân, Dev đo lại và báo, tối thiểu 280.
2. **Dáng phụ:** vẽ `l6_dog_run` (Lu chạy đuổi, cảnh mở màn) và `mun_climb` (Mun bám cột, là gợi ý đường leo). **Không vẽ** `l6_dog_play_glove`: Lu vờn găng dùng `l6_dog_run_bone` (thay xương bằng găng là sprite riêng gắn ở miệng) hoặc `l6_dog_bark` + găng tween.
3. **Đồng ý** vẽ thêm `mun_roof_crouch_ears_up` và vẽ mới `mun_sit_look` (dùng cho cảnh cuối và các màn sau).

**A6-1 (Art, trả G6-8 bước 3). `lu_ref` chờ duyệt; danh sách key L6.**
- `art/out/dogs/lu_ref.png` (brief `art/review/l6_lu_ref_brief.md`): chó con lớn mũm mĩm vàng mật ong nhạt, tai cụp, mõm kem, mũi tròn nâu, mắt đen nhỏ hiền, má hồng, cười lưỡi hồng, đuôi xù, vòng cổ hồng đào khoen vàng bơ. 3 tư thế như `sua_ref`: ngồi, đi, nằm bò. Ảnh so cạnh Sữa: `art/review/l5_art_check/l6_lu_ref_vs_sua.png`. Trong ảnh ref Lu vẽ cùng cỡ Sữa; trong game Lu ngồi rộng ≈ 240–260 (to hơn Mun rõ).
- `art/design-art-level6.md`: danh sách key đã chốt với Dev (D6-8), quy ước neo mặt đứng, chiều cao bậc. Thêm `mun_roof_crouch_ears_up`, `mun_sit_look` (vẽ mới), `l6_dog_house_front` (Art chọn vẽ, để thấy Lu chui trong chuồng).
- **Chờ GD chốt:** 3 key Dev đề xuất thêm: `l6_dog_run` (Lu chạy đuổi mở màn), `l6_dog_play_glove` (Lu ngậm găng lắc), `mun_climb` (Mun bám cột). Art đề xuất **vẽ cả 3** (đều là nhịp nhìn rõ: mở màn và găng 🎭), file nhỏ (≈ 255–300 rộng).

**A6-2 (Art, theo G6-9).** Đã sửa `design-art-level6.md`:
- Lu ngồi rộng ≈ 300 trên màn = 1,45 lần Mun ngồi (≈ 207); các dáng Lu nâng cùng tỉ lệ (bark 300, run_bone 320, chew 225, beg 280, belly 340, run 375). Tỉ lệ đặt bằng cỡ hiển thị, **không cần vẽ lại `lu_ref`** (ảnh ref là bảng nhận diện như `sua_ref`/`mun_ref`). Ảnh so đúng tỉ lệ trên màn: `art/review/l5_art_check/l6_lu_scale_vs_mun.png` (Lu 300, Mun 207, Sữa 207).
- **Chuồng Lu nâng từ 190x170 lên ≈ 340x300** (cửa rộng ≈ 220) cho vừa Lu; `l6_dog_house_front` cùng khung. Dev dời chuồng / vùng chạm nếu cần.
- Thêm `l6_dog_run` (≈ 375), `mun_climb`; bỏ `l6_dog_play_glove`; giữ `mun_roof_crouch_ears_up`, `mun_sit_look` vẽ mới.

**D6-9. Dev: G6-9 / A6-2 trong bản khối.** Chưa commit.
- **Lu to:** ngồi sủa 300 × 262 (bằng ≈ 1,45 lần Mun ngồi), chạy 375, ngậm xương chạy 320, đầu gặm 225, chồm 281, khoe bụng 338. Lu ngồi (735, 990) trước kho bên phải chỗ A. Sân không chật, giữ cỡ 300.
- **Chuồng** 340 × 300, cửa ≈ 220, đặt (854, 1290), mép phải đúng 1024. Thêm `l6_dog_house_front` (khung vòm cửa, lớp trên đầu Lu): đầu Lu gặm nằm trong cửa.
- **Dáng mới trong code:** `l6_dog_run` (đuổi Mun vòng sân; chạy tới / về chỗ găng), `mun_climb` (bám cột thay cho `mun_run` xoay), `mun_jump_up` (ghế → bàn), `mun_roof_crouch_ears_up` (từ lúc Lu gặm, mọi lần Mun về nằm trên mái). Lu vờn găng: `l6_dog_bark` lắc đầu + găng tween tại chỗ.
- **Dáng Mun mới** rộng 200–220 (crouch 210, edge 210, step_down 210, eat 210, sit_look 200, jump_up 200 dọc, climb 140 dọc).
- Dàn lại hàng trước sân: hộp dụng cụ 295, phuy 425, bụi rau 582, chuồng 854; bình tưới lên (630, 1120). Đo khung phần vẽ: không món nào chồng nhau hay chồng chỗ A / B / C.
- Chơi lại trọn màn (mở màn, găng, cho xương, xếp đường, Mun lên bàn, bế, thưởng), không lỗi.
- Đã cập nhật bảng `l6_dev_check/l6_block_layout.md` (mục 9). Ảnh: `l6_dev_check/g32_g69_tong_hop.jpg` (chạy vòng, bám cột, mở màn, vờn găng, gặm trong chuồng, Mun trên bàn).

**G6-10 (chủ dự án, Art ghi giúp GD).** Duyệt `lu_ref` ("Oke đó"). Góp ý: chân trước ở dáng nằm hơi dài → sửa dáng nằm bò cho chân trước ngắn, mũm mĩm như chân Sữa khi nằm; các dáng Lu nằm trong game (`l6_dog_chew`, `l6_dog_belly`) theo chân ngắn này. Sửa xong vẽ demo luôn, không cần duyệt lại.
- Art: đã thêm Lu vào `style.md` mục 3 (ảnh chuẩn `art/out/dogs/lu_ref.png`, tỉ lệ 1,4–1,5 lần Mun).
- **A6-3 (Art).** Đã sửa dáng nằm `lu_ref`: chân trước ngắn mũm mĩm dưới cằm (brief `l6_lu_ref_b_brief.md`). `art/out/dogs/lu_ref.png` giờ là bản sửa (bản cũ ở `art/out/_refs/lu_ref_v1_longpaw.png`). Ảnh so trước/sau: `art/review/l5_art_check/l6_lu_ref_lie_before_after.png`. Đang vẽ demo L6 theo số D6-9.

**G6-11 (GD, Art ghi giúp).** Đổi ưu tiên: **demo L6 là việc số 1**. Khi Codex có hạn mức lại (7:33 PM 2026-10-30): lượt đầu sửa cảnh mở màn (màu, Lu 1,45 lần, găng tay; brief `art/review/l6_demo_start_b_brief.md`), sau đó cảnh xếp xong đường (`l6_demo_path_brief.md`). Chưa đạt thì sửa tiếp demo, chưa làm việc khác. **Dừng nối nền L5** tới khi chủ dự án duyệt demo L6 (Dev đang kéo giãn tạm mép). Tiết kiệm lượt Codex: chốt lời giao việc thật kỹ trước khi vẽ. **Đính chính của GD:** ảnh sai rõ thì vẽ lại từ đầu với cùng lời giao việc đã sửa (QUY-TRINH bước 4), không vá dần bằng "chỉnh sửa từ ảnh".

**G6-12 (GD, chủ dự án duyệt 2026-10-30). Sửa tỉ lệ Lu, chuồng, nhà kho (thay cỡ G6-9).** Lời chủ dự án: "sao chó to gần bằng nhà kho luôn vậy" → duyệt đề xuất GD: "oke làm lại demo xem".
- **Lu ngồi rộng ~240** (≈1,15 lần Mun 210), cao khoảng một nửa nhà kho.
- **Chuồng ~280×250.**
- **Nhà kho ~530×475** (to thêm), mái và ống khói theo. Chỉnh lại 4 bậc đường xuống cho hụt đều (G6-2), bậc A sát dưới mép mái.
- Quy tắc tỉ lệ cho cả màn: nhà kho cao ≥ 2 lần Lu ngồi; chuồng chỉ lớn hơn Lu vừa đủ chui.
- Dev sửa bản khối trước, gửi ảnh; Art vẽ demo theo bản khối mới.

**D6-12. Dev: G6-12 tỉ lệ mới trong bản khối.** Chưa commit.
- **Lu** ngồi 240 × 210 (≈ 1,15 lần Mun); chạy 300, ngậm xương 256, đầu gặm 180, chồm 225, khoe bụng 270 (×0,8 so với G6-9). **Chuồng** 280 × 250, cửa ≈ 180, khung cửa phủ đầu Lu theo cỡ mới.
- **Nhà kho** 530 × 475 (cao ≥ 2 lần Lu ngồi 210), mái và ống khói theo (ống 92 × 184). Mép phải kho lấn ra phần dư bên phải; khung 9:16 cắt ở mép màn.
- **4 bậc chỉnh lại cho hụt đều:** mặt mái 543 → hộp dụng cụ (A) 675 → thùng gỗ (B) 809 → ghế (C) 942 → đất 1072, hụt 132 · 134 · 133 · 130 (đo trong game). Hộp dụng cụ sát dưới mép mái. Phuy 285, thùng gỗ 228, ghế 125; mặt ghế ≈ mặt bàn (G6-5).
- **Chuỗi leo mở màn** vẫn hợp lý: mặt bàn 948 → mặt thùng gỗ (chỗ đầu) 652 → cột 610 → mép mái 548 (đã chạy thử: Mun đi đúng từng nhịp, bám cột bằng `mun_climb`).
- Dàn lại hàng trước sân: hộp dụng cụ 289, bụi rau 450, phuy 606 (đáy 1295), bình tưới 700, chuồng 880. Đo khung phần vẽ: không món nào chồng nhau hay chồng chỗ A / B / C.
- Chơi lại trọn màn tới lúc Mun ăn trên bàn, không lỗi; khung 9:16 và 3:4.
- Bảng số: `l6_dev_check/l6_block_layout.md` mục 10. Ảnh khối sạch cho Art dựng demo: `l6_dev_check/layout/l6_khoi_mo_man_9x16_g612.jpg`, `l6_khoi_xep_xong_9x16_g612.jpg`, `l6_khoi_mun_tren_ban_9x16_g612.jpg`; bản có chữ `g38`–`g42_g612_*.jpg`.

**G6-13 (GD, chủ dự án góp ý 2026-10-30).** Giao Dev, báo Art. Lời chủ dự án: "lu và chuồng vẫn cần bé thêm 1 chút, lu cần thấp xuống, đoạn 2 pet đuổi nhau cần tránh va vào đồ khác và đúng layer trước sau".
- **Lu ngồi rộng ~215** (gần bằng Mun, vẫn to hơn chút), các dáng Lu co theo. **Chuồng ~250×220.**
- **Lu thấp xuống:** chỗ Lu ngồi sủa dưới mái dời xuống thấp hơn trên sân (chân Lu đứng hẳn trên mặt sân phía trước kho, không lơ lửng trước tường kho).
- **Cảnh đuổi nhau lúc mở màn:** đường chạy của Mun và Lu đi qua chỗ trống trên sân, **không chạy xuyên qua** bàn, phuy, thùng, ghế, bụi rau, chuồng, bình tưới. Lớp trước sau đúng theo chiều sâu: con vật ở dưới (gần người chơi hơn) một món thì vẽ trước món đó, ở trên (xa hơn) thì vẽ sau. Lớp cập nhật liên tục theo vị trí y của chân khi chạy.

**D6-13. Dev: G6-13 trong bản khối.** Chưa commit.
- **Lu nhỏ lại:** ngồi 215 × 188 (to hơn Mun chút); chạy 269, ngậm xương 229, đầu gặm 161, chồm 202, khoe bụng 242. **Chuồng** 250 × 220, cửa ≈ 160, khung cửa theo.
- **Lu thấp xuống:** chỗ ngồi sủa (700, 1060), chân trên mặt sân trước kho (chân kho 1010), không còn lơ lửng trước tường. Chỗ chồm đòi (330, 1150) và vờn găng (520, 960) cũng chân trên mặt sân.
- **Cảnh đuổi mở màn:** đường chạy mới qua chỗ trống: dải đất phía trước (y ≈ 1380, lúc này túi đồ chưa hiện), vòng lên khe giữa bình tưới và chuồng, qua khoảng trống trước kho (chỗ A, B, C còn trống), tới chân bàn rồi mới nhảy lên bàn.
- **Lớp theo y chân (y-sort):** mọi đồ đứng trên mặt sân và Mun, Lu khi đi trên mặt sân đổi lớp liên tục theo y chân: chân thấp hơn vẽ trước, chân cao hơn vẽ sau. Áp cả lúc Lu chạy tới găng, chạy về, ngậm xương về chuồng, chồm đòi. Đồ nằm trên đồ khác theo đồ đỡ (giỏ, xúc xích, Mun ăn trên bàn; hộp dụng cụ trên phuy; Mun trên mái dưới ống khói; đầu Lu trong cửa chuồng dưới khung cửa). Lúc nhảy lên đồ và lúc xuống bậc, Mun vẽ trên mọi đồ.
  - Đo trong game từng nhịp: Mun đi trước bụi rau, phuy, hộp dụng cụ khi chạy dải trước; đi sau chuồng, phuy khi vòng lên; đi sau bàn, trước thùng gỗ khi tới chân bàn. Lu cùng quy tắc.
- Dàn lại hàng trước sân: hộp dụng cụ 150, bụi rau 365, phuy 530 (ngay dưới chỗ A), bình tưới 650, chuồng 880. Đo khung phần vẽ: không món nào chồng nhau hay chồng chỗ A / B / C.
- Chơi lại trọn màn tới màn thưởng, không lỗi.
- Ảnh: `l6_dev_check/g43_g613_canh_duoi_cac_nhip.jpg` (6 nhịp cảnh đuổi), `g49_g613_mo_man.jpg` (mở màn), `g49_g613_tong_hop.jpg` (mở màn, vờn găng, chồm đòi, gặm, xếp xong, Mun trên bàn). Bảng số `l6_block_layout.md` mục 11.

**G6-14 (GD, chủ dự án góp ý 2026-10-30).** Giao Dev. Chủ dự án duyệt G6-13 ("okr rồi đó") và muốn chỉnh nhịp Lu trong cảnh đuổi: "chó sẽ dừng lại ở đoạn mèo bắt đầu nhảy lên bàn, khi mèo nhảy qua đầu thì mới quay ngược lại, mèo đến mái rồi thì chó chạy tới vị trí đứng sủa".
- Mun bắt đầu nhảy lên bàn → Lu **phanh lại** ở chân bàn (trượt nhẹ), đứng nhìn lên.
- Mun nhảy qua phía trên đầu Lu (bàn → thùng gỗ → cột) → Lu **quay ngược hướng** theo Mun, ngẩng nhìn.
- Mun lên tới mái → Lu mới **chạy tới chỗ đứng sủa** dưới mái, ngồi sủa.

**D6-14. Dev: G6-14 nhịp Lu trong cảnh đuổi.** Chưa commit.
- Mun bắt đầu nhảy lên bàn (≈ 2,5 giây): Lu phanh lại ở chân bàn (380, 1080), trượt nhẹ 0,28 giây, chuyển dáng sủa, nhún, quay mặt về phía Mun, đứng ngẩng nhìn.
- Mun vọt từ thùng gỗ qua phía trên đầu Lu sang cột: Lu quay theo hướng Mun, sủa một tiếng, nảy nhẹ.
- Mun nằm rạp trên mái (≈ 3,9 giây): lúc này Lu mới chạy (dáng chạy) tới chỗ ngồi sủa (700, 1060), lớp theo y chân (chạy sau phuy), ngồi xuống sủa, nảy (≈ 4,6 giây). 0,3 giây sau nhân vật trồi lên gọi, bong bóng bật ra; mở khoá chạm ≈ 9,5 giây.
- Ghi chú: bản khối chữ không lật (khối có nhãn), nên ở bản khối việc "quay" chỉ thấy qua cú nảy và tiếng sủa; ảnh Lu thật sẽ lật ngang theo hướng.
- Ảnh: `l6_dev_check/g55_g614_nhip_lu.jpg` (Lu phanh chân bàn, Mun lên thùng Lu nhìn, Mun qua đầu Lu quay, Mun trên mái Lu chạy, Lu ngồi sủa, nhân vật gọi), ảnh lẻ `g55`…`g60_*.jpg`.
- Đã build lại web; bản LAN cổng 8090 đã phục vụ bản mới (đã kiểm `src/level6.js` có code mới).

**G6-15 (GD, chủ dự án góp ý 2026-10-30).** Giao Dev. Lời chủ dự án: "mèo và chó phải quay đầu theo hướng chạy chứ".
- Mọi lúc Mun và Lu di chuyển (chạy vòng, nhảy lên bàn/thùng/cột/mái, Lu chạy tới găng, về chuồng, chồm đòi, Mun xuống bậc, nhảy lên bàn), mặt luôn quay theo hướng đang đi: đi sang trái thì nhìn trái, sang phải thì nhìn phải; đổi hướng giữa chừng thì lật ngay.
- Áp vào hàm chung (`face` / di chuyển theo đường) để mọi màn sau dùng được, không sửa riêng từng chỗ.

**G6-16 (GD, chủ dự án góp ý 2026-10-30).** Giao Dev, báo Art. Lời chủ dự án: "chó và chuồng cho to hơn 1 chút nhé".
- **Lu ngồi rộng ~230** (giữa G6-12 và G6-13, ≈1,1 lần Mun), các dáng Lu co theo. **Chuồng ~265×235.** Nhà kho giữ 530×475.
- Giữ G6-13 (Lu đứng trên mặt sân, không chồng đồ, lớp theo chân).

**D6-15. Dev: G6-15 Mun và Lu quay mặt theo hướng đi.** Chưa commit.
- **Hàm chung (base.js), mọi màn dùng được:**
  - `face(s, left)`: ảnh thật thì lật ngang quanh điểm neo (như cũ). Bản khối dùng texture vẽ ngược (`<key>~m`), chữ nhãn vẫn xuôi. Đổi dáng bằng `applyKey` thì giữ nguyên hướng đang quay.
  - `faceToward(s, x)`: quay về phía điểm x.
  - `moveTo(s, x, y, ms, { ease, arc, onUpdate, onComplete })`: đi hoặc nhảy tới đích, **tự quay mặt theo hướng x của bước đi**.
  - `hopTo(...)`: nhảy vồng, dùng chung `moveTo`.
  - Đi theo đường cong (vòng chạy mở màn): mỗi khung gọi `faceToward` tới điểm kế tiếp, đổi hướng giữa chừng thì lật ngay.
- **Sửa một lỗi cũ:** từ D6-1 base.js có hai hàm `face` trùng tên, hàm sau đè hàm trước và lật ngược nghĩa. Đây là lý do mèo và chó L6 quay sai. Đã gộp làm một; L1, L3 dùng đúng nghĩa cũ (`left = true` là nhìn trái).
- **L6:** mọi bước Mun và Lu di chuyển đều chạy qua `moveTo`/`hopTo`, không còn tween vị trí riêng:
  - vòng chạy mở màn; nhảy lên bàn, thùng gỗ, cột, mái;
  - Lu phanh, Lu chạy về chỗ ngồi;
  - Lu tới găng rồi về, chồm đòi rồi về, ngậm xương về chuồng, lăn khoe bụng;
  - Mun lẩn sau ống khói, bò ra mép mái, xuống bậc, nhảy lên bàn.
- **Ngoại lệ có chủ ý (G6-14):** Lu đứng yên thì quay đầu nhìn theo Mun (`faceToward(lu, mun.x)`): lúc phanh ở chân bàn, khi ngồi ở chỗ sủa, sau khi chạy về. Gợi ý 8 giây: Lu ngoái nhìn bụi rau rồi quay lại. Ở bậc A, Mun ngoái lại phía vừa đi rồi quay tiếp hướng xuống.
- **Khối Mun** thêm đuôi bên trái, mắt lệch phải, để bản khối thấy hướng. Khối Lu sẵn có đầu bên phải.
- **Đã kiểm ở cổng 8080, khung 9:16:**
  - Mun quay trái ở góc vòng (x≈929). Lu quay trái ở x≈910. Lu phanh, quay theo Mun. Lu chạy phải về ghế, ngồi quay nhìn Mun.
  - Găng: chạy trái tới, chạy phải về. Chồm: trái tới, phải về. Xương: chạy phải về chuồng.
  - Mun: bò trái ra mép, ngoái phải ở bậc A, xuống trái, nhảy trái lên bàn.
  - L1–L5 vào màn và chạy 9 giây, không lỗi.
- **Ảnh:** `l6_dev_check/g6_15_intro_strip.jpg` (5 nhịp mở màn), `l6_dev_check/g6_15_play_strip.jpg` (8 nhịp khi chơi), ảnh lẻ `g6_15_*.jpg`.
- Chưa build lại bản web.

**D6-16. Dev: G6-16 Lu và chuồng to hơn.** Chưa commit.
- Lu to ×1,07 so với G6-13: ngồi sủa 230 × 201, chạy 288 × 202, ngậm xương 245 × 172, gặm 172 × 121, chồm 216 × 244, khoe bụng 259 × 129.
- Chuồng và khung cửa 265 × 235, cửa tối rộng ≈ 170. Nhà kho giữ 530 × 475.
- Đo lại khung: không đồ trên mặt sân nào chồng nhau. Lu ngồi sủa vẫn đứng trước chân kho như G6-13.
- Dáng khoe bụng đổi chỗ, từ (640, 1290) sang **(860, 1395)**: chỗ cũ chồng bình tưới; chỗ mới nằm ngay trước cửa chuồng, lớp theo chân.
- Cỡ mới cho Art: `l6_block_layout.md` mục 12.
- G6-14 vẫn đúng sau khi to lên: Lu phanh ở chân bàn, quay theo Mun, Mun lên mái thì Lu mới chạy tới chỗ sủa.
- Ảnh: `l6_dev_check/g6_16_strip.jpg`, ảnh lẻ `g6_16_*.jpg`.
- Chưa build lại bản web.

**G6-17 (GD, chủ dự án góp ý 2026-10-30).** Giao Dev, báo Art (Art chờ bản khối mới rồi mới vẽ demo). Lời chủ dự án: "các đồ khác tương quan cũng cần to hơn như bàn, bụi rau, ghế, thùng gỗ... tất cả đang bị bé quá so với chó hay mèo".
- Giữ cỡ Mun (~210) và Lu (~230). Phóng các đồ trong sân cho đúng tương quan với thú. Mốc theo chiều cao Mun ngồi (Hm):
  - ghế đẩu cao ~1,2 Hm; thùng gỗ ~1,3–1,4 Hm; bàn cao ~1,5 Hm (mặt bàn đủ cho Mun đứng ăn cạnh giỏ); phuy ~1,8–2 Hm; giỏ picnic ~0,6 Hm; bình tưới ~0,7 Hm; bụi rau rộng ~2 lần Mun, cao ~0,9 Hm; hộp dụng cụ ~0,5 Hm; găng tay cỡ một con mèo nhỏ ngồi.
  - Nhà kho to theo nếu cần để vẫn cao ≥ 2 lần Lu và các bậc A → B → C hụt đều (G6-2).
- Giữ logic: chuỗi leo mở màn (bàn → thùng gỗ cao hơn bàn → cột → mái), 4 bậc xuống, ghế sát bàn, không món nào chồng nhau, lớp theo chân. Thiếu chỗ thì dàn lại bố cục, có thể dùng vùng dư hai bên (3:4) chỉ cho cảnh, đồ tương tác vẫn trong khung 1024.
- Dev gửi ảnh bản khối mới cho GD duyệt trước, rồi Art mới lấy toạ độ vẽ demo.

**D6-17. Dev: G6-17 đồ trong sân to theo thú, dàn lại bố cục.** Chưa commit.
- **Mốc Hm** (Mun ngồi) ≈ 190. Cỡ mới:
  - ghế 1,2 Hm;
  - thùng gỗ 1,35;
  - bàn 1,5 (320 rộng: đủ giỏ và Mun đứng ăn);
  - phuy 1,85;
  - giỏ 0,6;
  - bình tưới 0,65;
  - bụi rau 330 × 170 (rộng 1,6 Mun, cao 0,9 Hm);
  - hộp dụng cụ 0,5;
  - găng 110 × 140.
- **Nhà kho** 560 × 541, mặt mái 475. Các bậc vẫn hụt đều 140: mái 475 → A 615 → B 755 → C 895 → bàn 880.
- **Bố cục mới:**
  - Hàng sau: bàn góc trái; thùng gỗ và ghế sát rào sau bàn, cạnh cột; bậc A/B/C xếp sát nhau thành bậc thang tới kho; phuy đứng chờ sát tường kho.
  - Hàng trước (đáy 1290): hộp dụng cụ, bụi rau, chỗ Lu ngồi sủa, chuồng. Bình tưới trên mái chuồng.
- **Giữ logic:**
  - Mở màn bàn → thùng gỗ (mặt 615, cao hơn mặt bàn 880) → cột → mái.
  - 4 bậc xuống; ghế sát bàn; lớp theo chân.
  - Mọi đồ tương tác trong khung 1024.
- **Không giữ được trọn vẹn "không món nào chồng nhau":** khung 1024 không đủ chỗ cho các cỡ mới.
  - Bụi rau che chân bàn 38px.
  - Bình tưới che chân phuy 75px khi phuy còn ở chỗ đầu.
  - Đồ hàng trước đứng trước, lớp theo y chân. Ngoài ra không món nào chồng nhau.
  - Phương án nếu GD muốn tách hẳn: bụi rau hẹp lại khoảng 290, hoặc bình tưới chuyển lên mặt bàn.
- **Đã kiểm ở cổng 8080, khung 9:16:**
  - mở màn;
  - kéo đủ 4 món vào chỗ;
  - Mun xuống từng bậc rồi nhảy lên bàn ăn;
  - vờn găng, chồm đòi, xương về chuồng, khoe bụng.
  - Không lỗi.
- **Toạ độ cho Art:** `l6_block_layout.md` mục 13.
- **Ảnh:** `l6_dev_check/g6_17_strip.jpg`. Chờ GD duyệt rồi Art mới vẽ demo.
- Chưa build lại bản web.

**G6-18 (GD, chủ dự án 2026-10-30). Thay phần bố cục của G6-17.** Lời chủ dự án: "để lại bố cục như cũ đi, tôi chỉ muốn đồ to hơn chứ không sửa bố cục".
- **Trả bố cục về như G6-16** (vị trí, thứ tự trái phải, hàng trước hàng sau của mọi món), giữ **cỡ mới G6-17** của các đồ. Mỗi món to lên tại chỗ, neo giữ ở chân (giữa đáy) như cũ.
- Chỉ nhích nhẹ khi bắt buộc (chồng nhau rõ, bậc A → B → C không còn hụt đều, chuỗi leo mở màn không hợp lý), mỗi lần nhích ghi lại và báo GD.

**D6-18. Dev: G6-18 trả bố cục G6-16, giữ cỡ đồ G6-17.** Chưa commit.
- Mọi món về vị trí G6-16, to lên tại chỗ (neo giữa đáy): thứ tự trái phải, hàng trước hàng sau, cột, chuồng, Lu, chỗ A/B/C.
- Kho giữ 560 × 541 (cỡ G6-17), neo (820, 1010). Mặt mái 475.
- Bậc hụt đều 120: mái 475 → A 595 → B 715 → C 835 → nhảy lên mặt bàn 755. Mở màn vẫn bàn → thùng gỗ (cao hơn) → cột → mái.
- Chỗ nhích (bảng đầy đủ ở `l6_block_layout.md` mục 14):
  - Ống khói, Mun nằm mái, mép mái: y −66 theo mặt mái.
  - Chỗ A: y +30. Chỗ B: y −65. Chỗ C giữ nguyên.
  - Bàn: x +30, y −28.
  - Lu ngồi sủa: x +55.
  - Hàng trước: hộp dụng cụ x −20, bụi rau y −28, phuy chỗ đầu x +25, bình tưới x +42.
  - Lu phanh, chồm đòi, cuối vòng chạy: theo bàn (x +20 / +30 / +40).
- Đồ trước che đồ sau (lớp đúng):
  - Hàng trước: 5 món to rộng 1045 cộng lại, hơn khung 1024, nên phuy che mép bụi rau 58px.
  - Bàn che chân thùng gỗ chỗ đầu 122px.
  - Xếp xong: ghế C che góc bàn 84px và chân thùng B 54px; phuy A che mép phải thùng B 53px.
  - Mặt mỗi bậc vẫn lộ cho Mun đứng.
  - Thùng gỗ B bị kẹp giữa ghế và phuy, chỉ lộ khoảng 135px bề ngang. Nếu GD thấy rối, có thể làm thùng gỗ hẹp lại khoảng 150, giữ chiều cao.
- Đã kiểm ở cổng 8080, khung 9:16: mở màn, kéo đủ 4 món, Mun xuống từng bậc rồi nhảy lên bàn ăn. Không lỗi.
- Ảnh: `l6_dev_check/g6_18_strip.jpg`, để so với `g6_16_strip.jpg`.
- Chưa build lại bản web.

**G6-19 (GD, chủ dự án góp ý 2026-10-30).** Giao Dev. Lời chủ dự án: "cho bàn thấp xuống".
- Bàn **thấp lại** (chân bàn ngắn đi), cao khoảng 1,2 Hm, **mặt bàn ngang mặt ghế** ở chỗ C (như D6-5), giữ bề rộng 320 và vị trí chân bàn. Mun từ ghế bước ngang sang bàn.
- Chuỗi leo mở màn vẫn bàn → thùng gỗ (cao hơn bàn) → cột → mái.

**D6-19. Dev: G6-19 bàn thấp xuống.** Chưa commit.
- Bàn 320 × 228 (1,2 Hm). Mặt bàn y 835, ngang mặt ghế ở C (đo trong game: 837 / 837).
- Để mặt bàn ngang ghế ở 1,2 Hm, chân bàn phải xuống 23px (1040 → 1063). Ghế vẫn đứng trước bàn (chân ghế 1065). Giỏ, xúc xích, chỗ Mun ăn hạ theo mặt bàn (y 835).
- Mun từ ghế bước ngang sang bàn: vồng thấp như xuống bậc, tiếng đáp nhẹ, không nhún nhảy phốc. Dáng `mun_jump_up` không còn dùng.
- Mở màn vẫn bàn (835) → thùng gỗ (nóc 625, cao hơn bàn) → cột → mái.
- Thùng gỗ B hẹp lại: chưa làm, chờ chủ dự án chốt.
- Đã kiểm ở cổng 8080, khung 9:16: mở màn, xếp đủ 4 món, Mun xuống bậc, sang bàn ăn. Không lỗi.
- Ảnh: `l6_dev_check/g6_19_strip.jpg`. Toạ độ cho Art: `l6_block_layout.md` mục 15.
- Chưa build lại bản web.

**G6-20 (GD, chủ dự án 2026-10-31). Chốt bố cục bản khối, Art vẽ demo L6.** Lời chủ dự án: "báo art vẽ demo nhé".
- Bố cục chuẩn cho demo: bản khối D6-18 + D6-19 (bố cục G6-16, cỡ đồ G6-17, bàn thấp G6-19). Toạ độ: `l6_dev_check/l6_block_layout.md` mục 14–15, ảnh `l6_dev_check/g6_19_strip.jpg`.
- Thùng gỗ B giữ bề ngang như hiện tại (không làm hẹp).
- Art vẽ demo các cảnh chính (mở màn, xếp xong đường, Mun trên bàn) khung 1080x1920, kèm ảnh mẫu L1 theo QUY-TRINH bước 4 (màu O6, góc nhìn, nền dư G-SCREEN). Gửi chủ dự án duyệt; chưa duyệt thì chưa tách asset.

**A6-10 (Art, trả G6-20). Demo L6 lượt 1: 3 cảnh.**
- Ảnh trình khung 9:16 (có giao diện): `art/out/demo/l6_demo_start_916.png`, `l6_demo_path_916.png`, `l6_demo_table_916.png`; so với L1: `l6_demo_vs_l1.jpg`. Vùng chơi 1024x1536: `l6_demo_*_play.png`; khung không giao diện 1024x1820: `l6_demo_*_frame.png`.
- Cách làm: Codex vẽ vùng chơi 1024x1536 (brief `art/review/l6_demo_<cảnh>_g620_brief.md`, ảnh vị trí `art/ref/l6_demo_g620/khoi_*.png`). Art ghép dải trên, dưới 142px lấy từ nền rộng `l5_bg_backyard` (mép nối mềm 24px), lớp giao diện lấy của L5 bỏ chữ "Mun", bản đồ mini và mũi tên, phóng ×1080/1024.
- Màu (khung 1024x1820): mở màn TB 0,292 / p90 0,490; xếp xong đường 0,291 / 0,486; Mun trên bàn 0,276 / 0,455. Vượt ngưỡng O6 (≤ 0,25 / ≤ 0,46).
- Lệch bố cục D6-19: Codex vẽ lại nền và dồn hàng đồ trước lên cao (nặng nhất ở mở màn).

**G6-21 (chủ dự án 2026-10-31). Chốt demo `l6_demo_path_916.png` (cảnh xếp xong đường).** Lời chủ dự án: "tôi chốt ảnh này, hãy bàn luận với dev và mô tả thật kỹ để tách từng ảnh theo demo này nhé, còn vị trí thì dev sắp xếp lại, riêng cây thì promt lại cho đẹp hơn như demo 3 nhé, tách xong hãy nhắn dev ghép vào".
- Demo đã duyệt là chuẩn duy nhất (G4-22) cho thiết kế, màu, nét từng món. Màu theo demo đã duyệt (chủ dự án chốt dù số đo vượt O6).
- Vị trí: Dev sắp lại theo bản khối D6-19; cỡ đo trên demo.
- Cây `l6_tree`: vẽ lại đẹp hơn theo cây ở cảnh Mun ăn trên bàn (`l6_demo_table_play.png`, "demo 3").
- Hai cảnh còn lại (mở màn, Mun trên bàn) không vẽ lại; dùng làm mẫu dáng cho các trạng thái không có trong demo duyệt (Lu ngồi sủa, Mun nằm sợ tai cụp, giỏ đóng, Mun ăn).

**A6-11 (Art, trả G6-21; bước 3 với Dev). Danh sách tách và chốt với Dev.** Phiên Dev chưa mở khi làm, nên Art lấy key và lớp theo code bản khối `game/src/level6.js` (mọi key code đang gọi), ghi ở đây để Dev xác nhận khi ráp:
- Đặc tả tách: `art/design-art-level6.md` mục 5 (bảng `l6src_<key>`, mô tả từng món, demo gốc). Brief 5 lượt (≤ 7 món, G5-23): `art/review/l6_tach_props_a_brief.md` (kho, ống khói, bàn, thùng gỗ, ghế, phuy, hộp dụng cụ), `_props_b_` (cây, ổ chim, găng, bụi rau, bình tưới, giỏ mở, chuồng), `_states_` (giỏ đóng, găng rơi, xương, xúc xích, Lu gặm, Mun nằm mái tai dựng / tai cụp), `_lu_` (Lu sủa, chạy, ngậm xương chạy, chồm, khoe bụng), `_mun_` (Mun ló mép, bước xuống, ăn, ngồi nhìn, bám cột).
- **Cỡ:** Hiển thị = bề rộng đo trên vùng chơi demo; khác số khối D6-19 ở vài món (bụi rau 475 thay 330, bình tưới 205 thay 110, phuy 210 thay 170, chuồng 320 thay 265). Dev sắp lại vị trí cho vừa; món nào cần nhỏ lại cho bố cục thì Dev co bằng cỡ hiển thị, báo Art nếu lệch tỉ lệ rõ.
- **Neo:** giữa đáy, trừ ổ chim, xương, xúc xích (tâm) và găng vắt rào (đỉnh). Mặt đứng của 4 bậc (miệng phuy, nắp hộp, mặt thùng, mặt ghế) và mặt bàn là đỉnh phần vẽ chính; Dev đo lại trên ảnh xuất.
- **Lớp chuồng:** `l6_dog_house` (lòng cửa tô tối) → `l6_dog_chew` → `l6_dog_house_front` (Art cắt từ `l6_dog_house`, bỏ lòng cửa tối), như cửa sổ quán L5.
- **Nhóm cùng khung, cùng neo:** giỏ đóng/mở, găng vắt/rơi, Mun nằm mái tai cụp/tai dựng.
- **Dùng lại:** `l5_wind_chime`, `l5_bg_backyard`, `mun_run`, `mun_held`, `mun_face_icon`. **Bỏ:** `mun_jump_up` (D6-19: Mun bước ngang sang bàn; code chỉ còn khối tạm, không gọi).

**A6-12 (Art, trả Dev: nền L6 ở 3:4).** Nền riêng `art/out/level6/l6_bg_backyard.png` 1366x2304 (vùng chơi 1024x1536 ở x 171, y 384), dựng từ điểm ảnh `l5_bg_backyard` (không qua Codex, không đổi màu): bỏ cửa quán và bậc thềm, nới 171px mỗi bên. Trời, rào lật gương quanh khe ván x 822 và x 52 (cột dây phơi thứ hai ở x 1325 ảnh mới, dây võng đối xứng); sàn phải lật theo đường gạch xiên, sàn trái dịch một ô gạch theo phối cảnh, đường gạch liền. Phần vùng chơi giữ nguyên ảnh L5 trừ góc phải (từ đường gạch xiên x ~720 và rào từ x 822 sang phải). Dev đổi key trong `level6.js`, bỏ `bgSideSrc` tạm.
