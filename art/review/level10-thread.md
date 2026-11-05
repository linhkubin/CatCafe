# Level 10 — Đại chiến quái thú · Thread

Đặc tả: `levels/levels-01-10.md` mục "Level 10 — Đại chiến quái thú" (bản 4, chủ dự án chốt 2026-11-02). Mục Level 10 trong `levels/states-01-10.md` là bản cũ "Hai mèo một hộp", bỏ qua.

## Bước 2: bản khối (Dev)

- 2026-11-02: GD 1 giao Dev 1 code bản khối. Mở bằng `?level=10` (Team 1, cổng 8080).
- 2026-11-02: Dev 1 code xong bản khối (chưa tự chơi thử, chưa commit). File mới `game/src/level10.js`.

### Code chung đã sửa (để Team 2 biết)

- `game/src/progress.js`: `LEVELS` thêm 10 (L9 chưa có nên menu đi 8 → 10).
- `game/src/main.js`: import và đăng ký scene `Level10`.
- `game/src/assets.js`: `SPECS` thêm mục 10 (`art/design-art-level10.md`, chưa có file; cần có để game dò thư mục `art/out/level10/`); `KEYS[10]` liệt kê key L10.
- Không sửa `base.js`, `objects.js`, `rooms.js`.

### Tên key (để Art thay ảnh sau)

- Nền: `l10_bg_living_kitchen` (thư mục `level10`).
- Đồ: `l10_lamp`, `l10_side_table`, `l10_sofa`, `l10_pillow`, `l10_remote` / `l10_remote_open`, `l10_freezer` / `l10_freezer_open`, `l10_freezer_latch`, `l10_fridge_lower` / `l10_fridge_lower_open`, `l10_table_arena`, `l10_rug_loop`, `l10_toy_basket`, `l10_ball`, `l10_tissue_box`, `l10_mouse_toy`, `l10_battery`, `l10_ice_block` / `l10_ice_melt_1` / `l10_ice_puddle`, `l10_soup_sealed` / `l10_soup_open`, `l10_fire`.
- Dáng mèo mặc đồ (thư mục `cats`, cùng cỡ, cùng neo chân):
  - Mun: `mun_gorilla_idle`, `_block`, `_punch`, `_chest`, `_scratch`, `_sniff`, `_lick`, `_roar`.
  - Sữa: `sua_lizard_idle`, `_fire`, `_fire_down`, `_dodge`, `_roar`, `_sniff`, `_lick`.
- Mèo thật lúc thu nhỏ và cảnh kết: tạm dùng ảnh có sẵn `mun_sit_look`, `sua_sit_stare`.

## G10-1 (2026-11-02) — góp ý chủ dự án sau khi chơi bản khối

1. Búng bóng về Mun quá khó → đổi sang **kéo thả bóng lên Mun**, vùng nhận rộng cả thân, luôn trúng (Mun đang đấm thì chờ xong nhịp). Bỏ búng, bỏ trượt theo nhịp. Thả lên Sữa vẫn bị gạt về giỏ.
2. Sofa và đèn bàn trông như gắn trên tường → đặt **đứng trên sàn**, đáy chạm sàn, xếp lớp theo chiều sâu; đèn bàn đứng trên một bàn con dưới sàn.
3. Ngăn mát: **chạm mở, chạm lại đóng, không lắc**. Lần mở đầu vẫn ra 5 cá khô.

## G10-2 (2026-11-02) — góp ý chủ dự án: bố cục, kem đánh răng

1. Sofa bị hai mèo che → **luật bố cục: không đặt đồ cần thấy/cần chạm sau lưng mèo** (góc máy sát sàn). Sofa nhỏ 2 chỗ sát mép trái, gối + điều khiển trên mặt ngồi; bàn con + đèn sau tay sofa trái; hai mèo dải giữa (x ≈ 250–830); bàn trà trước chân hai con; tủ lạnh sát mép phải, không bị Sữa che. Sơ đồ mới trong mục L10 của `levels/levels-01-10.md`.
2. **Bỏ tuýp kem đánh răng** (gói giả không liên quan gì tới xé gói súp, gây rối). Hộp khăn giấy chỉ còn 5 cá khô.

## G10-3 (2026-11-02) — chủ dự án cho quay về bố cục cũ

- **Quay về bố cục G10-1** (sofa giữa, sau bàn trà; bàn con + đèn cạnh phải sofa; Mun [220,1010], Sữa [690,1020]; tủ lạnh rộng 220 sau lưng Sữa). Bỏ bố cục sofa mép trái của G10-2.
- **Giữ bỏ tuýp kem đánh răng** (G10-2 mục 2 vẫn áp dụng).

## G10-4 (2026-11-02) — bố cục mới theo phác thảo chủ dự án

- Phác thảo: `art/review/l10_layout_g10-4.png`. Kệ trái (chuột), kệ phải cao (hộp súp thưởng); sofa to phía sau hai mèo; Mun trái, Sữa phải; bàn trà trước chân hai mèo, điều khiển TV trên mép bàn phía Sữa; hàng dưới: hộp đồ chơi, thảm (vòng chạy chuột), hộp khăn giấy.
- Bỏ tủ lạnh, bỏ đèn bàn + bàn con, bỏ khối băng. Súp **không đóng băng** (chủ dự án chọn).
- Luồng mới: lấy chuột + pin, ghép → Sữa đuổi chuột → Mun rảnh tay → thả bóng lên Mun → Mun đấm bóng trúng hộp súp, hộp rơi, gói súp lăn ra → xé → đặt bàn trà → bóp. Thả bóng khi Sữa còn đánh: Mun gạt bóng về.
- Đặc tả đã sửa trong `levels/levels-01-10.md`, mục Level 10.
- 2026-11-02: Dev 1 sửa xong `game/src/level10.js` theo G10-4 (bản khối, chưa tự chơi, chưa commit). `game/src/assets.js` `KEYS[10]`: bỏ `l10_lamp`, `l10_side_table`, `l10_freezer*`, `l10_fridge_lower*`, `l10_ice_*`; thêm `l10_shelf_left`, `l10_shelf_right`, `l10_soup_box` / `l10_soup_box_open`. Không sửa code chung khác.

## G10-5 (2026-11-02) — chủ dự án chốt luồng máy bay + bóng, thêm đồ phụ thành phố

- Hộp khăn giấy → **hộp đồ chơi phải** (có máy bay, là sân bay). Kệ trái: **cây kéo**. Kệ phải: hộp súp buộc ruy băng.
- Luồng: máy bay (hộp ĐC phải) + pin (điều khiển) → bay vòng qua đầu hai mèo (Mun vồ trượt, Sữa khè trượt) → móc kéo kệ trái → hạ cánh hộp ĐC phải → lấy kéo. Bóng (hộp ĐC trái) thả lên **Sữa** → Sữa khè bóng sang Mun → Mun đấm → trúng hộp súp, rơi xuống giữa bàn trà. Thả kéo lên hộp → cắt ruy băng → hộp mở → hai con cùng ăn, thu nhỏ 5 nấc tự chạy (bỏ xé gói, bỏ giữ bóp) → liếm lông.
- Bỏ chuột, vòng chạy chuột.
- Đồ phụ thành phố: chồng sách (tòa nhà, 🎁), hộp bánh có lỗ cửa sổ (chung cư), chậu cây (rừng, bướm như trực thăng), dây sạc trên bàn (dây điện), bát nước + vịt cao su (cảng, 🎁), ô tô đồ chơi trên thảm. Phản ứng theo nhịp đánh nhau.
- Đặc tả: `levels/levels-01-10.md` mục Level 10 (bản 5).
- 2026-11-02: Dev 1 sửa xong `game/src/level10.js` theo G10-5 (bản khối, chưa tự chơi, chưa commit). `game/src/assets.js` `KEYS[10]` thay toàn bộ key đồ L10: thêm `l10_scissors`, `l10_plane`, `l10_toy_box_left` / `l10_toy_box_right` (thay `l10_toy_basket`, `l10_tissue_box`), đồ phụ `l10_book_stack`, `l10_cake_box`, `l10_plant`, `l10_cable`, `l10_water_bowl`, `l10_duck`, `l10_toy_car`; bỏ `l10_mouse_toy`, `l10_soup_sealed`, `l10_soup_open`. Dáng mèo: thêm `mun_gorilla_reach`, `mun_gorilla_look`, `sua_lizard_fire_up`, `sua_lizard_look`; bỏ `mun_gorilla_scratch`, `sua_lizard_fire_down`; `_lick` giờ là dáng cúi ăn. Thêm `sua_face_icon` (bong bóng mặt Sữa).

## G10-6 (2026-11-02) — đồ phụ thành phố

- Bỏ dây sạc, bỏ bát nước + vịt. Sofa chỉ có gối.
- Thêm **kệ giữa** (cùng độ cao kệ trái/phải) có chồng sách. Bàn trà: hộp bánh (mép trái), lọ hoa 🎁 + điều khiển (mép phải), giữa bàn trống cho hộp súp rơi.
- Thảm = quảng trường: đường ray + tàu hỏa chạy vòng, khối xếp hình (2–3 tòa nhỏ), cột đèn đồ chơi.
- Đồ chơi kéo thả thẳng trong cảnh lên mèo: ô tô, xe tăng, xe cứu hỏa. Lên Mun: bị đấm bay; lên Sữa: bị khè thổi; rơi xuống thảm lật ngửa, chạm thì lật lại.
- 2026-11-02: Dev 1 sửa xong `game/src/level10.js` theo G10-6 (bản khối, chưa tự chơi, chưa commit). `KEYS[10]` trong `game/src/assets.js`: bỏ `l10_cable`, `l10_water_bowl`, `l10_duck`; thêm `l10_shelf_mid`, `l10_vase`, `l10_blocks_a`, `l10_blocks_b`, `l10_lamp_post`, `l10_train`, `l10_toy_tank`, `l10_toy_firetruck` (`l10_toy_car` giữ). Đường ray vẽ trên thảm `l10_rug_loop`.

## G10-7 (2026-11-02)

- Lọ hoa vào giữa bàn (phía sau), hộp súp rơi ngay trước lọ hoa. Đồ chơi to hơn ~1,4 lần. Kệ trái thấp hơn kệ phải 1 bậc, kệ giữa thấp hơn 2 bậc (1 bậc ~80px).

## G10-8 (2026-11-02)

- Hộp bánh và lọ hoa thấp xuống một chút (~30px). Mọi thứ dưới bàn trà (thảm, đường ray + tàu, khối xếp hình, cột đèn, 3 đồ chơi, 2 hộp đồ chơi) dịch lên một chút (~50px).

## G10-9 (2026-11-02)

- Hộp bánh, lọ hoa thấp thêm ~30px. Điều khiển nằm phẳng trên mặt bàn (lỗi: toạ độ l10_remote bị dính vào chú thích nên bay lên trên).
- Gối to như gối L1 (~245x200 trong vùng chơi).
- Bỏ hộp đồ chơi trái/phải: máy bay đặt thẳng trên sàn bên phải (chạm lấy; bay xong đậu lại chỗ đó), quả bóng nằm trên sàn bên trái (chạm lấy; bóng bay xong lăn về chỗ đó).
- Thảm to hơn. Đồ chơi không nằm trên đường ray: tàu không chạy xuyên qua ô tô, xe tăng, xe cứu hỏa.
- 2026-11-03: Dev 1 sửa xong `game/src/level10.js` theo G10-9 (bản khối, chưa tự chơi, chưa commit). `KEYS[10]` trong `game/src/assets.js`: bỏ `l10_toy_box_left`, `l10_toy_box_right`.

## G10-10 (2026-11-03)

- Hai gối trên sofa (cỡ gối L1): một ở góc trên trái (phía trên-trái Mun), một ở góc trên phải (phía trên-phải Sữa). Gối trái 🎁 5 cá khô, gối phải chỉ nảy (✨).
- Đồ chơi dưới thảm to thêm (~1,25 lần nữa), điều khiển to hơn (~1,4 lần). Tàu vẫn không chạm đồ chơi.
- Cột đèn (cái nháy nháy cạnh xe tăng) đang bị bàn trà che: đưa ra chỗ thấy rõ, lớp trên bàn.

## G10-11 (2026-11-03)

- Bóng, tàu hỏa, máy bay to hơn (~1,4 lần). Tàu vẫn không chạm đồ chơi.

## G10-12 (2026-11-03)

- Chủ dự án: quay về bố cục G10-10 (bỏ bố cục thảm/máy bay của G10-11), giữ nguyên bố cục đó, chỉ cho bóng, tàu, máy bay to hơn. Không vừa 1,4 lần thì to hết mức vừa trong bố cục cũ.
- 2026-11-03: Dev 1 làm G10-12 (chủ dự án chọn (b)): `level10.js` lấy lại nguyên bố cục + đường bay G10-10 (bỏ toàn bộ G10-11). Bóng 78x78, tàu 98x50, máy bay 210x98 (x1,4), không dời gì; chỉ điểm móc kéo hạ theo máy bay to (tâm máy bay y 175 → 161, kéo treo dưới 119px) để kéo trên kệ vẫn ở đúng chỗ. Máy bay và kéo treo bay ở lớp trên mọi đồ (lướt trước kệ, sách, hộp súp, hai mèo). Tàu đè góc đồ chơi; tàu, đồ chơi, khối xếp hình xếp lớp theo chiều sâu (y) trên thảm. Bóng đè cột đèn 4px. Máy bay đậu [830,1285] to ra nên chồng kéo đặt cạnh [960,1320] khoảng 30px (không dời theo yêu cầu). Chưa tự chơi, chưa commit.

## G10-13 (2026-11-03)

- Sắp lại cho gọn: bóng ra sàn trái ngoài thảm, xa cột đèn; xe tăng và xe cứu hỏa đối xứng hai bên phía trước ray; máy bay đậu sàn phải ngoài thảm, kéo xách về nằm trên lưng máy bay (hết chồng).
- Máy bay bay mượt: đường cong spline liền, tốc độ đều, cất/hạ cánh êm, thân nghiêng theo hướng bay, chậm lại lúc móc kéo.
- 2026-11-03: Dev 1 làm G10-13: bóng sàn trái [95,1300]; xe tăng [370,1301], xe cứu hỏa [630,1303] (đáy 1345, đối xứng trước ray); máy bay đậu sàn phải [900,1300], kéo xách về nằm trên lưng máy bay (vùng chạm kéo trên vùng máy bay). Đường bay: hai đường cong Catmull-Rom liền (Phaser.Curves.Spline), đi theo độ dài cung, ease vào/ra (lăn bánh, cất/hạ cánh êm, chậm hẳn khi tới kệ trái, dừng 0,35 giây móc kéo rồi tăng tốc), thân nghiêng theo hướng bay + nghiêng khi rẽ (làm mượt), kéo treo đung đưa (con lắc giảm chấn), gần hạ cánh kéo gập lên lưng. Tổng ~6,3 giây. Chưa tự chơi, chưa commit.

## G10-14 (2026-11-03)

- Chuỗi bóng mới: thả bóng lên **Mun** → Mun đấm sang Sữa → Sữa khè về Mun → Mun đấm lên kệ phải → hộp súp rơi xuống bàn. Thả lên Sữa: Sữa gạt về.
- Mở hộp: hộp bay nhẹ lên rồi hạ xuống sàn giữa hai mèo; bàn trà, lọ hoa, hộp bánh, điều khiển mờ dần rồi biến mất.
- (GD: khôi phục bảng "Đồ vật chính" trong đặc tả, bị mất khi sửa G10-6.)
- 2026-11-03: Dev 1 làm G10-14: chuỗi bóng thả lên Mun (vùng nhận Mun nới 60, Sữa 40): Mun đấm sang Sữa → Sữa khè bóng về → Mun đấm trúng hộp súp (hộp đã rơi: bóng về sàn trái); thả lên Sữa: Sữa gạt về, bong bóng mặt Mun. Mở hộp: hộp bay lên 60 rồi hạ xuống sàn giữa hai mèo [482,1020]; bàn trà, lọ hoa, hộp bánh, điều khiển mờ 1 giây rồi ẩn, tắt chạm. Chưa tự chơi, chưa commit.

## G10-15 (2026-11-03)

- Thu nhỏ hai mèo: một tween liền, đều, không chia nấc, không giật; vừa nhỏ vừa xích lại gần hộp súp giữa hai con.
- 2026-11-03: Dev 1 làm G10-15: bỏ 5 nấc; một tween liên tục 10 giây (Sine.inOut) thu nhỏ + chồng mờ (cùng tỉ lệ, cùng neo chân), neo chân trượt về hai bên hộp súp (Mun +85, Sữa −85 → x 305 / 655, hộp 417–547), đầu cúi liếm lắc nhẹ bằng góc. Liếm lông nối tiếp tại chỗ cuối tween (bỏ di chuyển GROOM_AT). Chưa tự chơi, chưa commit.

## G10-16 (2026-11-03)

- Kết màn không cần chạm mèo: liếm lông 1,5 giây rồi tự thắng. Bỏ mũi tên chỉ Mun. Màn kết quả hiện cả hai đầu mèo (Mun + Sữa).
- 2026-11-03: Dev 1 làm G10-16: liếm lông 1,5 giây rồi tự gọi kết màn chung (`startEnding`: cảnh bế, màn thưởng; tiến độ/tim tính cho Mun), bỏ mũi tên và bước chạm Mun. Bong bóng tìm thấy hiện đầu Mun + Sữa (override `bubbleFound` trong level10.js). **Code chung:** `base.js` `reward()` đọc `this.endFaces` (mảng key đầu mèo, màn nào không khai báo thì như cũ một đầu `catFace`); L10 khai báo `endFaces = ['mun_face_icon', 'sua_face_icon']`. Chưa tự chơi, chưa commit.
- 2026-11-03: Dev 1 làm G10-17: `level10.js` override `startEnding()` (chỉ L10): sau 1,5 giây liếm lông đi thẳng vào `reward()` (lớp tối + màn thưởng hai đầu mèo), bỏ cảnh bế; không ẩn Mun/Sữa (bỏ `endingHide` của L10). Không sửa code chung. Chưa tự chơi, chưa commit.

## Duyệt gameplay (2026-11-03)

- Chủ dự án cho vẽ demo L10 = duyệt gameplay bản khối (tới G10-17). Sang bước 3 (Art + Dev bàn art) và bước 4 (demo). Chủ dự án dặn: **màu và kích thước đúng mô tả thật kỹ**.
- GD: viết lại mục Level 10 trong `levels/states-01-10.md` theo bản khối đã duyệt.

## Yêu cầu art từ Dev (L10) — 2026-11-03, theo bản khối đã duyệt tới G10-17

Quy ước chung:
- Toạ độ tính trong vùng chơi 1024x1536.
- **Cỡ hiển thị** là cỡ phần vẽ trên màn; ảnh file = cỡ hiển thị x1,5, như các màn trước.
- **Neo đáy** là điểm giữa mép dưới phần vẽ (chân hoặc đáy đồ chạm mặt đặt). **Neo tâm** là tâm phần vẽ.
- Góc nhìn sát sàn, đồ to như thành phố.
- Tên key = tên file. Dev ghép theo `anchors.json` như mọi màn.

### 1. Đồ trong cảnh (key, vị trí, cỡ, neo, lớp, nằm trên đồ nào)

Lớp từ sau ra trước:
- nền
- kệ, rồi đồ trên kệ
- thảm, rồi đồ trên thảm (tàu, đồ chơi, khối xếp hình, xếp theo y)
- sofa, gối, chậu cây
- Mun mặc đồ, Sữa mặc đồ
- bàn trà, đồ trên bàn, cột đèn
- bóng và máy bay trên sàn
- hiệu ứng

Máy bay đang bay (và kéo treo bên dưới) ở lớp trên mọi đồ.

| Key | Món | Neo tại (x,y) | Cỡ hiển thị (rộng x cao) | Neo | Nằm trên / ghi chú |
|---|---|---|---|---|---|
| `l10_bg_living_kitchen` | Nền phòng khách nhìn sát sàn: tường tới y ≈ 880, sàn gỗ bên dưới, hai mép đủ cho khung 3:4 | — | phủ khung (như nền L6: file 1366x2304) | — | Nền trống, không vẽ đồ rời lên nền |
| `l10_shelf_left` | Kệ treo tường trái | 170, 310 | 240 x 30 | đáy | Mặt trên y 280 |
| `l10_scissors` | Cây kéo | 170, 280 | 110 x 60 | đáy | Ban đầu trên kệ trái, sau đó treo dưới máy bay, rồi nằm trên lưng máy bay khi đậu lại |
| `l10_shelf_mid` | Kệ treo tường giữa | 470, 390 | 200 x 30 | đáy | Mặt trên y 360 |
| `l10_book_stack` | Chồng sách cao (tòa nhà chọc trời) | 470, 360 | 100 x 150 | đáy | Trên kệ giữa; đỉnh y 210; không chạm lưng sofa (y 460) |
| `l10_shelf_right` | Kệ treo tường phải (cao nhất) | 770, 230 | 240 x 30 | đáy | Mặt trên y 200 |
| `l10_soup_box` | Hộp súp thưởng buộc ruy băng | 770, 200 | 130 x 90 | đáy | Ban đầu trên kệ phải; rơi xuống bàn trà [490,945]; khi mở thì hạ xuống sàn [482,1020] |
| `l10_sofa` | Sofa to nằm ngang sau hai mèo | 490, 860 | 880 x 400 | đáy | Lưng sofa đỉnh y 460, lộ trên đầu mèo; phần giữa bị mèo và bàn che |
| `l10_pillow` | Gối tựa (dùng cho cả hai gối) | trái 165, 610; phải 815, 610 | 220 x 150 | đáy | Trên sofa, hai góc trên; nửa dưới bị đầu mèo che |
| `l10_plant` | Chậu cây lá to (rừng rậm) | 975, 880 | 170 x 400 | đáy | Mép phải sau vai Sữa, lòi ra ngoài mép màn một phần |
| `l10_table_arena` | Bàn trà (đấu trường) | 490, 1060 | 510 x 230 | đáy | Trước chân hai mèo, che phần dưới thân; mặt bàn y ≈ 830 |
| `l10_cake_box` | Hộp bánh xếp tầng, có lỗ tròn như cửa sổ | 300, 920 | 120 x 120 | đáy | Trên bàn, mép trái |
| `l10_vase` | Lọ hoa | 490, 900 | 70 x 130 | đáy | Trên bàn, giữa phía sau; hộp súp rơi ngay trước lọ |
| `l10_remote` | Điều khiển TV nằm phẳng | 660, 920 | 154 x 48 | đáy | Trên bàn, mép phải |
| `l10_rug_loop` | Thảm (quảng trường), có vẽ đường ray elip | tâm 500, 1212 | 598 x 275 | tâm | Ray: tâm (500,1167), bán trục 230 x 74. Vẽ ray đúng elip này |
| `l10_train` | Tàu hỏa nhỏ | chạy trên ray | 98 x 50 | tâm | Vẽ quay mặt sang phải; code lật khi chạy sang trái |
| `l10_toy_car` | Ô tô đồ chơi | tâm 500, 1167 | 158 x 78 | tâm | Trong lòng vòng ray |
| `l10_toy_tank` | Xe tăng đồ chơi | tâm 370, 1301 | 168 x 88 | tâm | Trước ray, bên trái |
| `l10_toy_firetruck` | Xe cứu hỏa đồ chơi | tâm 630, 1303 | 183 x 84 | tâm | Trước ray, bên phải |
| `l10_blocks_a` | Tòa khối xếp hình nhỏ (thấp) | 160, 1170 | 60 x 90 | đáy | Mép trái thảm |
| `l10_blocks_b` | Tòa khối xếp hình nhỏ (cao) | 800, 1175 | 60 x 110 | đáy | Mép phải thảm |
| `l10_lamp_post` | Cột đèn đồ chơi | 215, 1235 | 30 x 110 | đáy | Mép trái thảm, lớp trên bàn; bóng đèn ở đỉnh (cách đỉnh ~14) |
| `l10_ball` | Quả bóng nhựa | tâm 95, 1300 | 78 x 78 | tâm | Sàn trái, ngoài thảm; cũng là icon trong túi |
| `l10_plane` | Máy bay đồ chơi chạy pin, có càng móc | tâm 900, 1300 | 210 x 98 | tâm | Sàn phải, ngoài thảm; vẽ mũi sang phải; khi đậu lại thì kéo nằm trên lưng; cũng là icon túi |
| `l10_battery` | Pin (2 viên) | — | 90 x 60 | tâm | Bật ra từ điều khiển; icon túi |

### 2. Trạng thái cần ảnh riêng

| Món | Ảnh | Ghi chú |
|---|---|---|
| Hộp súp | `l10_soup_box` (buộc ruy băng), `l10_soup_box_open` (nắp mở, ruy băng đứt vắt hai bên, thấy súp) | Cùng nhóm, cùng neo đáy, thân hộp trùng nhau. Ảnh mở có thể cao hơn vì nắp bật, nhưng giữ đáy và thân trùng nhau |
| Điều khiển | `l10_remote` (đủ pin), `l10_remote_open` (nắp pin bật, khay trống) | Cùng nhóm, cùng neo |
| Máy bay | `l10_plane` (đậu, cánh quạt đứng); đề xuất thêm `l10_plane_fly` (cánh quạt quay mờ) | Có `_fly` thì Dev đổi ảnh khi cất cánh / hạ cánh; không có thì dùng một ảnh |
| Đồ chơi (ô tô, xe tăng, xe cứu hỏa) | Một ảnh mỗi xe (đứng) | Lật ngửa do code xoay 180°, không cần ảnh |
| Gối | `l10_pillow`; tùy chọn `l10_pillow_back` (mặt sau) | Gối trái lật mặt (🎁), gối phải nảy + lật mặt (✨). Không có `_back` thì code lật cùng ảnh |
| Hộp bánh | `l10_cake_box` (cửa sổ tối), `l10_cake_box_lit` (cửa sổ sáng vàng) | Code đổi qua lại để nháy, thay cho chấm sáng vẽ bằng code |
| Cột đèn | `l10_lamp_post` (tắt), `l10_lamp_post_on` (bật) | Cùng neo đáy |
| Tàu | `l10_train` | Một ảnh |
| Chồng sách, khối xếp hình, lọ hoa, chậu cây, sofa, bàn, kệ, bóng, kéo, pin | Một ảnh mỗi món | Lắc, nảy, rạp đều do code |

### 3. Dáng mèo

Mèo mặc đồ (thư mục `cats`):
- Mỗi con **cùng cỡ, cùng neo chân giữa đáy** ở mọi dáng, chỉ đổi dáng.
- **Mun vẽ quay sang phải (về phía Sữa), Sữa vẽ quay sang trái (về phía Mun).** Khi có ảnh thật, Dev bỏ phần lật ảnh Sữa bằng code.

| Con | Neo chân | Cỡ hiển thị | Key |
|---|---|---|---|
| Mun bộ khỉ đột | 220, 1010 | 300 x 470 | `mun_gorilla_idle` (thủ thế), `_block` (giơ hai tay chéo đỡ lửa), `_punch` (vung tay đấm, cũng dùng khi đấm bóng), `_chest` (đấm ngực gầm), `_reach` (với tay vồ máy bay trên cao), `_look` (ngửa cổ nhìn theo máy bay), `_sniff` (ngửi, mũi phập phồng), `_lick` (cúi xuống hộp súp ăn), `_roar` (quay sang gầm khi bị chạm) |
| Sữa bộ thằn lằn gai lưng | 740, 1020 | 290 x 450 | `sua_lizard_idle`, `_fire` (khè lửa ngang về phía Mun / vào bóng), `_fire_up` (ngửa cổ khè lên máy bay), `_look`, `_dodge` (lắc mình né, quất đuôi gạt), `_roar`, `_sniff`, `_lick` (cúi ăn) |

Điểm hiệu ứng trên dáng: miệng Sữa khè ngang ≈ (635, 650), khè ngửa ≈ (690, 610); tay Mun đỡ / đấm ≈ (345, 655). Art giữ các điểm này khi vẽ, hoặc báo lại toạ độ thật để Dev sửa.

Mèo thật (cuối màn):
- Lúc thu nhỏ, mèo thật hiện chồng lên mèo mặc đồ ở **cùng neo chân**.
- Cuối cùng mèo thật **rộng 190**, đứng hai bên hộp súp: Mun neo chân (305, 1010), Sữa (655, 1020), hộp ở giữa (482, 1020).

Ảnh cần:
- `mun_l10_eat`, `sua_l10_eat`: cúi ăn từ hộp, dùng trong 10 giây thu nhỏ. Mun quay phải, Sữa quay trái. Bản khối đang tạm dùng `mun_sit_look`, `sua_sit_stare`.
- `mun_l10_groom`, `sua_l10_groom`: hai con nằm / ngồi sát nhau, liếm tai và cổ cho nhau (1,5 giây cuối). Vẽ **hai ảnh riêng** cùng cỡ để code cho thay nhau nghiêng đầu liếm. Nếu Art muốn một ảnh chung hai con thì báo, Dev ghép thành một sprite.
- Đầu mèo cho bong bóng và màn thưởng: dùng sẵn `mun_face_icon`, `sua_face_icon`.

### 4. Hiệu ứng: cần ảnh hay code vẽ

| Hiệu ứng | Làm bằng | Ghi chú |
|---|---|---|
| Lửa xanh nhạt của Sữa | **Cần ảnh** `l10_fire` | Dải lửa nằm ngang, neo giữa mép trái (chỗ miệng); code kéo dài theo khoảng cách (bản khối 300 x 60). Xanh pastel, không đỏ, không khói đen |
| Khói thơm hình cá khi mở hộp | **Đề xuất ảnh** `l10_fish_smoke` (một làn khói hình cá nhỏ, ~100 x 50) | Code cho bay lên rồi tan; hiện đang là elip vẽ bằng code |
| Ánh xanh rọi cảnh khi khè | Code | Lớp phủ màu |
| Cửa sổ hộp bánh nháy, cột đèn bật | Đổi ảnh | Xem mục 2 |
| Cánh hoa rơi | Code (elip hồng nhỏ), hoặc ảnh `l10_petal` nếu Art muốn | |
| Bướm từ chậu cây | Dùng lại ảnh có sẵn `prop_butterfly` (L1) | Hiện là hình vẽ bằng code |
| Tia nước xe cứu hỏa | Code (vệt xanh nhạt) | |
| Bụi khi rơi, tim, cá khô, lắc / nảy / squash | Code dùng chung | |
| Bàn trà và đồ trên bàn mờ dần khi mở hộp | Code | |
| Đường bay máy bay, kéo đung đưa, tàu chạy vòng | Code | |

### 5. Số đo thêm cho Art (trả lời Art 2D 1)

- **Đường chân tường:** y 880 (tường trên, sàn dưới). Thảm mép trên 1075, mép dưới 1350. Dải túi đồ từ y ≈ 1360 trong khung 9:16.
- **Sofa:** đáy 860, đỉnh lưng 460, x 50–930.
- **Bàn trà:** mặt trên y ≈ 830, mép trước (đáy) y 1060, x 235–745.
- **Ba kệ (đáy kệ / mặt trên):** trái 310 / 280 (x 50–290); giữa 390 / 360 (x 370–570); phải 230 / 200 (x 650–890).
- **Lớp (depth) trong code:** kệ 5.5; hộp súp, sách 5.6; kéo 5.7; thảm 6; tàu, đồ chơi, khối xếp hình 6.2 + y/10000 (xếp theo y, khoảng 6.31–6.33); sofa 13.6; gối 13.61; chậu cây 13.8; Mun mặc đồ 15.1; Sữa mặc đồ 15.2; bàn 15.6; lọ hoa 15.605; hộp bánh 15.61; điều khiển 15.62; cột đèn 15.65; bóng, máy bay trên sàn ≈ 18 (theo y); hiệu ứng và máy bay đang bay ở lớp hiệu ứng (trên tất cả).
- **Mèo mặc đồ dáng idle:** Mun neo chân (220, 1010), cao 470 (đỉnh ≈ 540), rộng 300, quay phải. Sữa neo chân (740, 1020), cao 450 (đỉnh ≈ 570), rộng 290, quay trái.
- **Luồng lửa `l10_fire`:** gốc là giữa mép trái ảnh, đặt tại miệng Sữa. Khè ngang: gốc (635, 650) tới tay Mun (345, 655), dài ≈ 290. Khè ngửa (máy bay): gốc (690, 610), hướng lên theo máy bay. Cao hiển thị 60. Code xoay theo hướng và kéo giãn chiều dài, nên vẽ một dải ngang đầu tròn, phần gốc đậm, đuôi loe nhạt.
- **Ảnh chụp bản khối:** Dev không tự chạy game (luật không tự chơi), nên không chụp được. Nhờ GD 1 chụp khung 9:16 cảnh đánh nhau và cảnh kết.

## A10-1 (Art 2D 1, 2026-11-03) — demo lượt 1–2

- Đặc tả art: `art/design-art-level10.md`. Ảnh khối vị trí dựng từ bảng Dev: `art/ref/l10_demo/khoi_main.png`, `khoi_end.png` (`tools/l10_block_guide.py`).
- Demo (Codex sol 6.1 medium, 2 lượt mỗi ảnh): `art/out/demo/l10_demo_fight_916.png`, `l10_demo_end_916.png` (vùng chơi `_play.png`, khung không giao diện `_frame.png`). Lượt 1 sao lưu `art/ref/backup/l10_demo_v1/`. Ảnh kiểm (mẫu L1 | đánh nhau | kết): `art/review/l10_demo_check.jpg`.
- Màu O6 (vùng chơi): đánh nhau 0,237 / 0,439; kết 0,236 / 0,400 (mẫu L1 0,219 / 0,420). Đạt.
- Cỡ, vị trí: Codex không bám ảnh khối (lượt 2 chỉnh sửa trên ảnh khối vẫn ra bố cục như lượt 1). Lệch > 10%: chân tường y ≈ 960 (đúng 880); sofa cao ≈ 550 (đúng 400), đáy ≈ 1010 (đúng 860); gối ≈ 290 x 210 (220 x 150); Mun rộng ≈ 370 (300), Sữa ≈ 350 (290) (cao, chân đúng); thảm rộng ≈ 910 (598), tâm y ≈ 1265 (1212); thảm, đồ chơi, bóng, máy bay thấp hơn 50–80; bóng ≈ 104 (78); kéo ≈ 150 (110); hộp súp ≈ 175 (130); chồng sách rộng ≈ 170 (100); xe cứu hỏa ≈ 215 (183). Đạt (≤ 10%): ba kệ, bàn trà (rộng 536, đáy thấp hơn ~70), điều khiển, lọ hoa, xe tăng, máy bay, khối xếp hình, cột đèn, lửa (gốc ở miệng Sữa, tới tay Mun).

## Chủ dự án chọn (2026-11-03)

- Nguyên văn: "Tách asset, sofa lấy từ ảnh 1, vẽ demo riêng 1 hình của kong mun tôi chưa ưng lắm".
- L10 phá lệ: tách asset trước khi duyệt demo, rồi ghép demo đúng bảng Dev.
- Sofa: dùng lại sofa Level 1 (GD hiểu "ảnh 1" = ô mẫu L1 trong ảnh kiểm), co theo cỡ bảng Dev.
- Mun khỉ đột: vẽ một ảnh demo riêng cho chủ dự án duyệt trước khi tách các dáng Mun.

## A10-2 (2026-11-03) — chủ dự án chọn tách asset sớm

- Lời chủ dự án (qua GD 1): "Tách asset, sofa lấy từ ảnh 1, vẽ demo riêng 1 hình của kong mun tôi chưa ưng lắm".
- L10 phá lệ: tách asset trước khi duyệt demo, rồi ghép demo đúng toạ độ, cỡ, lớp bảng Dev (`tools/l10_regroup.py` bỏ, vì món chồng nhau không tách sạch: `art/review/l10_regroup_try.jpg`).
- Bộ đồ khỉ đột của Mun: vẽ một ảnh demo riêng, duyệt trước khi tách các dáng `mun_gorilla_*`.
- Sofa: GD 1 hiểu "ảnh 1" = sofa Level 1. Level 1 không có asset sofa riêng (sofa nằm trong nền L1, chỉ có `l1_sofa_cushion_*`), Art hỏi lại GD 1 trước khi làm sofa.

## A10-3 (2026-11-03) — sofa, chia đợt Codex

- Sofa: chủ dự án chọn sofa tím trong demo L10 lượt đầu (`art/ref/backup/l10_demo_v1/l10_demo_fight_play.png`). Tách theo demo, vẽ bù phần bị mèo che, cỡ 880x400, neo đáy; gối tách riêng.
- Codex chia 2 đợt. Đợt 1 (đang chạy): demo riêng Mun bộ khỉ đột (`art/out/demo/l10_demo_mun_gorilla.png`, gửi GD 1 duyệt trước) + 3 lượt tách `l10_tach_p1..p3` (21 món). Đợt 2 khi hạn mức hồi: cột đèn, bóng, máy bay, pin, lửa, sofa, nền, Sữa dáng khè, mèo thật liếm lông, khói cá. Hạn mức chung vượt ~60% thì dừng, báo GD 1.

## A10-4 (Art 2D 1, 2026-11-03) — tách đợt 1 xong

- Demo riêng Mun bộ khỉ đột: `art/out/demo/l10_demo_mun_gorilla.png`, ảnh kiểm `art/review/l10_mun_gorilla_check.jpg` (chờ chủ dự án duyệt). Màu nâu hơi cam (0,46 / 0,58).
- Tách 3 lượt (`l10_tach_p1..p3`), 21 món + kệ phải dùng chung ảnh kệ trái, cắt vào `art/out/level10/` (anchors.json): kệ ×3, kéo, chồng sách, hộp súp buộc/mở, lọ hoa, hộp bánh tối/sáng, điều khiển đủ pin/mở, bàn trà, gối, chậu cây, thảm + ray, tàu, ô tô, xe tăng, xe cứu hỏa, khối xếp hình a/b.
- Cỡ: rộng đúng bảng Dev; cao co về đúng bảng bằng `tools/l10_fit.py` (co dọc: kéo 0,80, sách 1,44, hộp súp 0,85, bàn 1,26, tàu 0,73, xe tăng 0,83, xe cứu hỏa 0,82, khối a 0,87). Sách và tàu méo nhiều → vẽ lại đúng tỉ lệ ở đợt 2. Thảm nắn ray đúng elip (tâm ray cao hơn tâm thảm 45, bán trục 230 x 74) bằng `tools/l10_rug_fix.py`.
- Đợt 2 (chờ hạn mức): cột đèn tắt/bật, bóng, máy bay đậu/bay, pin, lửa; sofa (theo demo lượt đầu), nền trống, chồng sách + tàu (vẽ lại đúng tỉ lệ), Sữa dáng khè, hai mèo thật liếm lông, khói cá. Dáng Mun khỉ đột sau khi duyệt.

## A10-5 (Art 2D 1, 2026-11-03): vẽ tiếp đợt 2 + dáng mèo, ghép demo 2 đúng toạ độ
- Codex chạy hết 5 lượt (p5, p6, c1, c2, c3), hạn mức cuối: 5 giờ 86%, tuần 87% (chưa chạm 90%).
- Đã cắt: lamp (+on), ball, plane (+fly), battery, fire, sách và tàu vẽ lại, sua_lizard_fire, 2 mèo liếm lông, khói cá; 9 dáng mun_gorilla_*, 7 dáng sua_lizard_* (cùng tỉ lệ px với dáng chuẩn).
- Co dọc lượt 2 (`tools/l10_fit.py 2`): sách ×1,26, tàu ×0,81, máy bay ×0,84.
- Nền `art/out/level10/l10_bg_living_kitchen.png` 1366x2304 (soi gương mép, vùng chơi ở 171,384).
- Demo: `art/out/demo/l10_demo2_{fight,end}_{play,frame,916}.png`, ảnh kiểm `art/review/l10_demo2_check.jpg`. O6: fight 0,253/0,384, end 0,243/0,380.
- Lệch cỡ >10%: Mun khỉ đột rộng 349 (bảng 300), Sữa thằn lằn rộng 353 (bảng 290) do tay áo và đuôi; lửa cao 49 (bảng 60).

### G10-18 (2026-11-03) – Chủ dự án chọn dáng Mun mặc đồ

Chủ dự án xem demo 2 và khoanh Mun ở bản demo 1 (`art/out/demo/l10_demo_fight_916.png`, xem `art/review/l10_owner_mun_pick_g10-18.jpg`): "Tôi đang thích kiểu mun kong như vùng khoanh hơn".
→ Đồ Mun theo bản khoanh: bộ lông thú nâu ấm mềm như gấu bông, tai tròn trên mũ, mặt Mun lộ rõ, bụng mảng nhạt có đường may. Bỏ bộ khỉ đột xám nâu tay dài của demo 2. Chỉ đổi Mun; Sữa, đồ vật, nền giữ nguyên.

## A10-6 (Art 2D 1, 2026-11-03): G10-18 Mun gấu bông
- Ảnh demo gốc: Mun cắt từ bản demo 1 có tai tròn (`art/ref/backup/l10_demo_v1/l10_demo_fight_play.png`) → `art/ref/l10_demo/cut/mun_bear_g10-18.png`. Bản `l10_demo_fight_916.png` hiện tại là bản mũ gờ mày, không phải bản chủ dự án khoanh.
- Codex vẽ 2/3 tờ trước khi chạm 90% (5 giờ 90%, tuần 88%): `l10src_mun_bear_a` (idle, block, punch), `l10src_mun_bear_b` (chest, roar, reach, chỉnh từ tờ a). Tờ c (look, sniff, lick) chưa vẽ; ba file đó vẫn là bộ khỉ đột cũ.
- Đã cắt 6 dáng (cao 466–476, cùng tỉ lệ với idle), ghép lại cảnh đánh nhau; ảnh kiểm `art/review/l10_g10-18_mun_bear_check.jpg`.
- O6 cảnh đánh nhau: trung bình 0,261 (vượt 0,25), p90 0,420 → do bộ lông nâu (độ đậm màu 0,40), màu y như demo 1.

### G10-19 (2026-11-03) – Chủ dự án chốt màu Mun gấu bông

"Màu này oke rồi": giữ nguyên màu nâu bộ gấu bông (cảnh đánh nhau trung bình 0,261, chấp nhận vượt ngưỡng O6 cho L10). Ba dáng còn lại (look, sniff, lick) vẽ cùng màu này khi hạn mức 5 giờ hồi.

### G10-20 (2026-11-03) – Mun gấu bông cho mọi dáng

Chủ dự án: "dùng mun gấu bông cho mọi dáng nhé, bỏ mun kong đi, đang lệch style". Bỏ hẳn bộ khỉ đột. Ba dáng `mun_gorilla_look/sniff/lick` thay ngay bằng dáng gấu bông tạm (look, lick ← idle; sniff ← block), rồi vẽ lại đúng dáng khi hạn mức 5 giờ hồi. Cắt sạch mẩu thừa mép phải ở `mun_gorilla_block`. Key giữ tên `mun_gorilla_*` để code không đổi.

## Dev 1 ghép ảnh thật L10 (2026-11-03)

- Ảnh trong `art/out/level10/` và `art/out/cats/` tự thay khối tạm (cỡ = file / 1,5, neo theo `anchors.json`); nền 1366x2304 như L6/L7.
- Kệ: ảnh có giá đỡ dưới tấm ván (mặt ván cao hơn neo đáy ~44 ở kệ trái/phải, ~35 ở kệ giữa) nên neo kệ hạ: trái y 324, giữa 395, phải 244; kéo, sách, hộp súp giữ chỗ cũ (đáy 280 / 360 / 200).
- Sữa mặc đồ vẽ quay trái sẵn: bỏ lật bằng code. Mun gấu bông rộng hơn: vùng chạm, vùng thả theo khung ảnh từng dáng.
- Lửa: gốc ở mép trái ảnh, đặt tại miệng Sữa; cao giãn 49 → 60.
- Trạng thái đổi ảnh: hộp bánh sáng (`l10_cake_box_lit`), cột đèn bật (`l10_lamp_post_on`), máy bay đang bay (`l10_plane_fly`), khói cá `l10_fish_smoke`, bướm `prop_butterfly` (thêm vào `KEYS[10]`).
- Mèo thật: ăn `mun_eat` (rộng 200), `sua_eat` / `sua_eat_f2` (rộng 250, đổi khung mỗi 0,45 giây, lật quay trái) = 0,8 cỡ ảnh; trượt về hộp Mun +80, Sữa −45 để không đè hộp; liếm lông `mun_l10_groom`, `sua_l10_groom` (rộng 190, Sữa quay trái sẵn).
- `assets.js` `KEYS[10]`: thêm các key trên, bỏ `mun_sit_look`, `sua_sit_stare`. Chưa tự chơi, chưa commit.

## A10-7 (Art 2D 1, 2026-11-03): G10-20 xong
- Tờ c `l10src_mun_bear_c` (look, sniff, lick) đã cắt, ghi đè 3 ảnh tạm. 9 dáng Mun gấu bông cùng tỉ lệ (idle cao 470). Bản kong cũ: `art/ref/backup/l10_mun_kong/`.
- Block cắt lại sạch mép (ranh ô a: block 512–1000, punch 1000–1536). `l10_lamp_post_on` cắt lại cùng tỉ lệ với đèn tắt (rộng 33).
- Điểm hiệu ứng đo trên ảnh thật (Dev 1 đã áp): miệng Sữa khè ngang (675,765), khè lên (660,735); tay Mun đỡ (335,755); nắm tay đấm (410,770).
- `mun_l10_eat`, `sua_l10_eat` (tờ `l10src_l10_cats_eat`): đã cắt; ảnh kiểm `art/review/l10_eat_check.jpg`. Danh sách việc còn lại: `art/review/l10_todo_briefs.md`.
- Hạn mức Codex: tuần 89%.

### G10-21 (2026-11-05) – Chủ dự án đổi đường giải: mọi đồ đều có tác dụng

Chủ dự án, nguyên văn: "tôi muốn đổi thành sữa khè ra 1 quả cầu, quả cầu bay về mun thì mun giơ tay đỡ, quả cầu bị phản lại tách ra làm 3 và cháy 2 góc ở thảm, thay điều khiển, người chơi phải thu thập bình hoa, xe cứu hỏa, ghép vào nhau thì xe cứu hỏa chạy ra xịt hết đám cháy, hết cháy thì mới thu được điều khiển..." và với gối phải, chồng sách, chậu cây, khối xếp hình: "tap vào không có gì".
→ GD hiểu "thay điều khiển" là quả thứ ba rơi trúng điều khiển (3 đám cháy: hai góc thảm + điều khiển). Bỏ ô tô, xe tăng, tàu, cột đèn, hộp bánh. Chi tiết trong `levels-01-10.md` mục L10 (G10-21). Bản khối làm lại phần mở màn và nhánh dập lửa, giữ máy bay, bóng, cảnh kết.

- 2026-11-05: Dev 1 làm G10-21 trên bản ảnh thật: mở màn quả cầu lửa (code vẽ) sau bong bóng nhiệm vụ 2 giây, dội ở tay Mun, tách 3 rơi thành 3 đám lửa (ảnh `l10_fire` đặt đứng, lập lòe) ở góc trái thảm (255,1305), góc phải thảm (745,1305), trên điều khiển (660,885). Lọ hoa, xe cứu hỏa (sàn trái [100,1216]) nhặt vào túi, ghép → xe chở lọ hoa chạy xịt lần lượt 3 đám (tia nước code), đỗ góc phải thảm (chạm: hú còi). Điều khiển còn cháy: tay giật lại, bong bóng xe cứu hỏa; tắt lửa thì hơi ám khói, lấy pin như cũ. Chạm sai lọ hoa / xe chưa ghép thả lên lửa theo đặc tả. Bỏ ô tô, xe tăng, tàu, cột đèn, hộp bánh (bỏ khỏi `KEYS[10]` cùng `l10_lamp_post_on`, `l10_cake_box_lit`, `prop_butterfly`); sofa, gối, cây, sách, khối xếp hình, thảm tắt chạm, không rung theo nhịp. Lưu ý Art: ảnh thảm `l10_rug_loop` vẫn còn vẽ đường ray (tàu đã bỏ). Chưa tự chơi, chưa commit.
