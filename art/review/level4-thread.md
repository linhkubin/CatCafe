# Thảo luận Level 4 – Vòi nước nhỏ giọt

Đội: **Claude** (Game Design + PM), **Art 2D** (đặc tả ảnh, chỉ đạo Codex vẽ), **Dev** (code, animation), **Codex** (chỉ vẽ).
Nguồn: `levels/levels-01-10.md` và `levels/states-01-10.md` mục Level 4, `art/style.md`, `leveldesign.md`.
Quy trình: `QUY-TRINH.md`. Áp dụng mọi quy tắc đã chốt ở level 1–3 (`level1-thread.md` … `level3-thread.md`). Từ level 4: nền chỉ là phòng trống, mọi đồ vật (kể cả bồn, tủ) là sprite riêng.

---

## Vòng 1 – GD: thêm mini game xoay ống (đã duyệt)

**G4-1. Mini game xoay ống trong tủ dưới bồn rửa bát (7b).** Chủ dự án yêu cầu thêm, GD đã viết vào `levels/levels-01-10.md` (mục "Mini game xoay ống") và `levels/states-01-10.md` (dòng 5b, dòng van 6, dòng vòi 2). Tóm tắt:
- Mở tủ thấy van đỏ và **lưới 3 cột × 2 hàng** đoạn ống bị xoay lệch. Nước vào ở đáy ô dưới phải (ống chính lên từ sàn, qua van), ra ở cạnh trái ô trên trái (lỗ tường sang nhà tắm).
- Chạm một ô: xoay 90° theo chiều kim đồng hồ. Không giới hạn chạm, không đếm giờ, không có "sai". Ô thông với nguồn đổi ảnh **ống ướt**. Nối xong: lóe sáng, khóa lại.
- Đường nước F → E → D → A (4 ô), B và C là ống mồi. Tối thiểu 5 chạm, khoảng 12–18 giây. Bước bắt buộc của màn thành 4–5, vẫn trong 90 giây.
- Chơi ngay trong cảnh bếp, **không cận cảnh** (cận cảnh để level 7 dạy).

**G4-2. Yêu cầu ảnh cho Art 2D** (cần thêm vào `art/design-art-level4.md` khi viết):
- `l4_pipe_straight_dry`, `l4_pipe_straight_wet`: ống thẳng, đi từ mép này sang mép đối diện của ô.
- `l4_pipe_elbow_dry`, `l4_pipe_elbow_wet`: cút góc 90°, hai đầu ra ở hai mép kề nhau của ô.
- Các ảnh trên vẽ chung một tờ: **cùng khung vuông**, ống nằm **chính giữa ô**, đầu ống chạm đúng giữa mép ô để xoay 90° vẫn khớp với ô bên cạnh. Ô hiển thị ≥ 140px trên khung 1024x1536.
- Ống đồng/đồng thau ấm, khớp nối tròn to, nhìn rõ hai đầu ống. Bản ướt giống hệt bản khô, chỉ thêm ánh xanh và giọt đọng.
- `l4_pipe_icon`: một đoạn cút góc nhỏ, dùng trong bong bóng suy nghĩ (giống `l4_valve_icon`).
- `l4_sink_cabinet_open`: lòng tủ cần đủ chỗ trống cho lưới 3×2 cộng van đỏ ở góc dưới phải, lỗ tường ở bên trái ngang hàng trên. Ống **không** vẽ vào lòng tủ (là sprite riêng).

**G4-3. Ghi chú cho Dev** (khi làm level 4): mỗi ô là sprite xoay quanh tâm; tính lại đường nước từ F sau mỗi chạm; hạt nước phụt ở đầu hở khi van mở mà ống chưa nối; âm "cạch" cao dần theo số ô thông. Chi tiết ở `states-01-10.md` dòng 5b.

## Vòng 2 – Art 2D trả lời

Xem Vòng 2c (Art viết sau khi đọc D4-1…D4-9 và G4-4, G4-5).

## Vòng 2a – Dev nêu yêu cầu animation (viết trước để Art 2D đọc khi viết đặc tả)

**D4-1. Hai phòng trong một scene.** Mỗi phòng một nền 1024x1536 (`l4_bg_bathroom`, `l4_bg_kitchen`), đặt cạnh nhau theo trục ngang trong thế giới (nhà tắm x 0–1024, bếp x 1024–2048). Chuyển phòng = camera trượt ngang 0,4 giây, giao diện (♥, ⏸, 💡, bản đồ) đứng yên. Mọi toạ độ Art ghi trong bảng vị trí là toạ độ **trong khung phòng đó** (0–1024), code tự cộng 1024 cho bếp. Hai nền cần **cùng đường sàn, cùng chiều cao chân tường**, ánh sáng hợp nhau (dù không nối liền mép, khỏi lệch khi trượt).

**D4-2. Mũi tên chuyển phòng và bản đồ mini: cần ảnh chung (thư mục `common`).**
- `ui_room_arrow`: một mũi tên (chĩa sang phải, code lật cho bên trái), hiển thị rộng ~110, vùng chạm ≥ 140x200. Đặt sát mép phòng, giữa chiều cao (y ≈ 760), **ngoài** dải banner đáy và không đè lên đồ chạm được.
- `ui_minimap_frame` + `ui_minimap_room` (ô phòng, 2 bản: thường / đang ở) + dùng lại `sua_face_icon` thu nhỏ để chỉ chỗ Sữa. Code xếp 2 ô cạnh nhau, đặt giữa thanh ♥ và nút ⏸ (vùng x 400–860, y 20–110). Không vẽ chữ hay hình đồ vật lên ô.
- Lần đầu: mũi tên nhấp nháy + `ui_hand_pointer` chạm mẫu (dùng `handTap` sẵn có).

**D4-3. Lưới ống (5b): mỗi ô là một sprite xoay quanh TÂM.**
- Bốn key ống (`l4_pipe_straight_dry/_wet`, `l4_pipe_elbow_dry/_wet`) **chung một tờ, mỗi ô vuông bằng nhau**, ống nằm chính giữa ô, hai đầu ống chạm **đúng điểm giữa mép ô**. Neo = `tâm`. Phần trong suốt quanh ống phải **đối xứng** (tâm ảnh = tâm ô) để xoay 90° không lệch.
- Hướng gốc khi vẽ: ống thẳng **trái ↔ phải**, cút góc **dưới ↔ phải** (khớp ô F lúc đầu). Code xoay theo bảng hướng.
- Hiển thị: ô **150x150** trên khung 1024x1536 (≥ 140 theo spec), lưới 3x2 = 450x300, khe giữa ô 0. Đầu ống ở mép ô có **mặt bích tròn** để hai ô kề nhau trông như nối khớp dù code chỉ đặt sát.
- `_wet` giống hệt `_dry` từng pixel ở hình khối, chỉ khác màu/ánh xanh và giọt đọng (code `swap` không dịch vị trí). Giọt đọng không thò ra ngoài viền ống quá 10px.
- Nối xong: code tự làm lóe sáng (tint trắng chạy F→A), không cần ảnh riêng.

**D4-4. Tủ dưới bồn bếp (`l4_sink_cabinet_closed/_open`) và van.**
- Hai trạng thái chung một tờ, cùng thân, cùng đường đáy (như hộp L3).
- `l4_sink_cabinet_open`: lòng tủ để trống một vùng **≥ 520x360 hiển thị** cho lưới 450x300 + lề; **lỗ tường** vẽ ở vách trái lòng tủ, **ngang tâm hàng trên**; **ống chính lên từ sàn** vẽ sẵn trong lòng tủ, đi lên tới ngay dưới tâm ô F (đáy cột phải). Art ghi toạ độ (trong ảnh) của: tâm ô A (góc trên trái lưới), lỗ tường, đầu ống chính, chỗ đặt van.
- `l4_valve`: tay van đỏ, sprite riêng, neo **tâm trục**, xoay 90°. Đặt trên ống chính, phía dưới phải lưới, không đè lên ô F.
- Lớp: nền → bồn bếp → tủ (open) → ống chính/lỗ tường (vẽ trong tủ) → 6 ô ống → van → hạt nước → cánh tủ đóng (nếu tách). Khi tủ đóng các ô ống ẩn.

**D4-5. Vòi rửa mặt và nước.**
- `l4_faucet`: một ảnh, tay vặn vẽ liền. Code không xoay tay vặn, chỉ `wiggle` theo chiều vuốt.
- `l4_water_gush`, `l4_water_drip`: **sprite phủ lên vòi**, neo **đỉnh** = miệng vòi. Art ghi toạ độ miệng vòi trong `l4_faucet`. `l4_water_gush` dài từ miệng vòi tới đáy bồn (có tia bắn hai bên), `l4_water_drip` chỉ là **một giọt** (code tự rơi đều 0,8 giây/giọt từ miệng vòi xuống đáy bồn). Art ghi y đáy lòng bồn `l4_sink`.
- Hạt nước bắn, giọt trên gương: code vẽ particle, không cần ảnh. `l4_mirror_fog`: phủ đúng khung kính của `l4_mirror_cabinet`, cùng tờ để khớp.
- **Cách đo vuốt xoay** (Dev tự làm, Art không cần vẽ): vuốt **dài** = ≥ 120px, "vuốt ngược" = vuốt theo chiều ngược với lần vặn mở (vặn mở là từ trái sang phải phía trên tay vặn / chiều kim đồng hồ). Tôi sẽ đề xuất GD chốt: **mở = vuốt sang phải, ngược = vuốt sang trái** để người chơi không phải vẽ cung tròn.

**D4-6. Sữa nhảy giữa hai chỗ cao.**
- Hai điểm đậu: **nóc tủ gương** và **nóc giá khăn**. Art ghi toạ độ mặt nóc (đường đáy chỗ Sữa đứng) của `l4_mirror_cabinet` và `l4_towel_rack`; hai nóc nên **gần cùng độ cao** (lệch ≤ 150px) để cú nhảy cong 0,4 giây nhìn hợp lý.
- `sua_tail_peek` đặt **sau** đồ (đuôi thò qua mép nóc) như L1; `sua_cover_face`, `sua_peek_down` cắt phẳng theo mép nóc, neo **đáy phần cắt** (đường mép nóc), Sữa nhìn sang trái (code lật cho chỗ kia).
- `sua_jump`: tư thế bay duỗi, neo **tâm thân** (code bay theo cung, quay nhẹ theo hướng).
- `sua_drink`, `sua_head_shake`, `sua_lick_lips`: ngồi trong bồn rửa, **cùng đường đáy, cùng cỡ**, chung một tờ; `sua_drink` miệng ngay dưới miệng vòi (Art ghi toạ độ miệng). Đáy cắt phẳng theo mép bồn (phần dưới khuất trong bồn) **hoặc** đặt Sữa dưới lớp mép trước của bồn: Art chọn, ghi rõ.
- Lớp nhà tắm: Sữa trên cao nằm **trên** tủ gương/giá khăn nhưng tail_peek đặt sau mép nóc; Sữa trong bồn nằm giữa lòng bồn và mép trước bồn (nếu bồn tách 2 lớp).

**D4-7. Vùng chạm** (tối thiểu 115, như P6): ô ống 150x150 (chính là ô, khít nhau, không nới để khỏi chạm nhầm ô kề); van ≥ 140; vòi ≥ 160 quanh tay vặn và vòi; đuôi Sữa ≥ 140; mũi tên ≥ 140x200. Đồ nhỏ (vịt, hũ bánh) vẽ đủ to để vùng chạm không đè đồ khác.

**D4-8. Hỏi GD:**
- (a) **Hướng phòng:** sơ đồ bố cục đặt nhà tắm **bên trái**, bếp **bên phải** (lỗ tường bếp ở bên trái "đúng phía mũi tên ◄"), nhưng luồng giải giây 16–24 ghi "chạm mũi tên ◄ … sang bếp". Tôi đề xuất theo sơ đồ: nhà tắm trái, bếp phải; từ nhà tắm chạm **►** sang bếp, từ bếp chạm **◄** về nhà tắm. Âm "rì rầm" chạy từ phải sang trái.
- (b) Chốt cách vuốt vòi như D4-5 (phải = mở, trái = ngược).

**D4-9. Ảnh tạm:** dựng khung `level4.js` với `makeFallback` cho mọi key mới, `?level=4` để vào thẳng. Chưa ráp ảnh thật tới khi demo được duyệt.

## Vòng 2b – GD chốt câu hỏi của Dev (D4-8)

**G4-4. Hướng phòng:** đồng ý đề xuất của Dev. Nhà tắm **bên trái**, bếp **bên phải**. Từ nhà tắm chạm **►** (mép phải) sang bếp; từ bếp chạm **◄** (mép trái) về nhà tắm. Lỗ tường trong tủ bếp ở vách trái (phía nhà tắm), âm "rì rầm" chạy phải → trái. Đã sửa luồng giải giây 16–24 trong `levels-01-10.md`.
**G4-5. Vuốt vòi:** đồng ý. Vuốt **sang phải** = mở (dài ≥ 120px → xối, ngắn < 120px → nhỏ giọt); vuốt **sang trái** = vặn nhỏ lại (xối → nhỏ giọt, nhỏ giọt → tắt). Không cần vẽ cung tròn. Đã ghi vào bảng ba trạng thái vòi trong `levels-01-10.md`. Gợi ý 16 giây "vòi kèm mũi tên xoay ngược chiều" hiểu là mũi tên chỉ **sang trái**.

## Vòng 2c – Art 2D: đặc tả `design-art-level4.md`, trả lời D4-1…D4-7

**A4-1. Đã viết `art/design-art-level4.md`:** danh sách key (mục 1), bố cục hai phòng (mục 2), góc nhìn/tỉ lệ/chất liệu từng đồ (2b), trạng thái và phần giữ nguyên (2c), 2 nền trống (mục 4), 10 tờ (mục 5), lớp + bảng vị trí bản đầu (mục 6), 2 demo (mục 7). Nhận G4-4 (tắm trái, bếp phải), G4-5.

**A4-2. Key mới so với states:**
- `l4_bath_mat`, `l4_kitchen_window`: đồ trang trí, vẽ riêng theo luật "nền trống".
- `ui_room_arrow` (D4-2, một mũi tên chĩa phải, code lật), `ui_minimap_frame`, `ui_minimap_room`, `ui_minimap_room_current`: tờ chung `ui_nav_sheet`. Bỏ 4 key `ui_arrow_*` và `ui_minimap_eyes/_paw` ở states mục 0; Sữa trên bản đồ dùng `sua_face_icon`.
- Không thêm key cho hạt nước, gợn sóng, lóe sáng (code).

**A4-3. D4-1:** hai nền cùng chân tường **y≈1180**, len cao ~30, ánh sáng trên trái. Nhà tắm: tường bạc hà rất nhạt + ốp gạch kem nửa dưới, sàn gạch kem-hồng đào. Bếp: tường kem bơ + dải gạch ốp sau mặt bếp, sàn gỗ ván như L1.

**A4-4. D4-2:** mũi tên tâm (960, 760) ở nhà tắm, (64, 760) ở bếp; trong bếp tủ bắt đầu từ x 160 để vùng chạm x 0–140 không đè đồ. Bản đồ mini tâm (630, 66), 2 ô cách tâm 92.

**A4-5. D4-3, D4-4 (ống, tủ, van):**
- 4 ô ống chung `l4_pipe_sheet`, ô tờ 384x384 (= 150 × 2,56), neo tâm, hướng gốc thẳng trái↔phải, cút dưới↔phải. Ống chạm **đúng giữa mép ô**, mặt bích tròn ở hai đầu; `_wet` = `_dry` + ánh xanh + 2–3 giọt (≤ 10px hiển thị). Sau khi Codex vẽ, Art sẽ kiểm bằng máy: tâm ảnh = tâm ô, đầu ống đúng giữa mép, `_dry`/`_wet` cùng mặt nạ alpha; lệch thì Art chỉnh (dời, đối xứng hoá) trước khi giao.
- Lưới tạm: tâm ô A (345, 830) … F (645, 980) trong khung bếp; lỗ tường ≈ (215, 830); đầu ống chính ≈ (645, 1055); trục van ≈ (645, 1120). Lòng tủ ~660x430 hiển thị (≥ 520x360). Đo lại trên `l4_sink_cabinet_open` thật.
- `l4_valve` bánh xe 4 nan đỏ san hô, rộng 104, neo tâm trục, nằm dưới F (khe ~15px với mép dưới F). **Dev xem:** vùng chạm van 140 sẽ lấn đáy ô F ~20px; đề nghị ưu tiên ô F khi chạm trong ô, van nhận phần còn lại.

**A4-6. D4-5, D4-6 (vòi, nước, Sữa):**
- `l4_water_gush` / `l4_water_drip` neo đỉnh = miệng vòi; toạ độ miệng vòi trong `l4_faucet` và y đáy lòng chậu sẽ ghi sau khi cắt tờ.
- Hai chỗ cao: nóc tủ gương y≈280 (x 90–410), nóc giá khăn y≈400 (x 630–950), lệch 120px. Khăn cuộn ở phía trái nóc kệ, Sữa đậu phía phải (x≈880).
- `sua_cover_face`, `sua_peek_down`: cắt phẳng ngang, neo giữa mép cắt (đặt trên mép nóc), nhìn sang trái.
- **Sữa trong bồn:** chọn **cắt phẳng** (`sua_drink`, `sua_head_shake`, `sua_lick_lips` chỉ từ ngực trở lên, cùng mép cắt), mép cắt đặt trùng mép trước miệng chậu. Không tách `l4_sink` làm 2 lớp.
- `l4_mirror_fog` chung tờ với tủ gương, chỉ phần kính, cùng khung và neo.

**A4-7. Lớp:** ghi ở `design-art-level4.md` mục 6 (khớp D4-4 cho bếp; nhà tắm thêm thảm, khăn rơi trên sàn).

**A4-8. Hỏi GD:**
- (a) Demo nhà tắm có **vẽ nhân vật** không? States L4 không có key `player_*`, nhưng luồng giải có "bong bóng nhân vật" (hình van, hình ống) và "nhân vật nhặt khăn treo lại". Art đề xuất: **không có nhân vật** trong cảnh, bong bóng suy nghĩ hiện ở góc như bong bóng nhiệm vụ (dùng `ui_thought_bubble` + icon); khăn tự bay về kệ (`fly_arc`). Nếu GD muốn có nhân vật thì dùng lại `player_point_think`, và Art thêm vị trí.
- (b) Hũ bánh quy đặt **trên mặt bếp bên trái** (không treo kệ tường riêng) để bớt một sprite. GD đồng ý?

Demo vẽ theo mục 7 với đề xuất (a), (b) ở trên; nếu GD đổi thì sửa ở lượt sau.

## Vòng 2d – GD chốt câu hỏi của Art (A4-8)

**G4-6. Nhân vật: giữ, nhưng không vẽ thêm ảnh mới.** Level 1 và 3 đều có nhân vật trồi lên kèm bong bóng suy nghĩ; bỏ ở level 4 sẽ lệch nhịp với các màn trước. Dùng lại y nguyên `player_point_think` + `ui_thought_bubble` như L3 (G3-11): nhân vật trồi lên ở **nhà tắm**, góc dưới, không che bồn rửa, vòi, tủ gương, giá khăn, mũi tên ►. Hình trong bong bóng: `l4_valve_icon` (vòi khô, van chưa mở), `l4_pipe_icon` (van đã mở, ống chưa nối), giọt nước nhỏ (vòi đang xối). Ở bếp không có nhân vật. Bong bóng **không** đặt ở góc trên trái (chỗ của bong bóng nhiệm vụ). Lúc lộ diện có thể dùng `player_surprised` nếu Dev thấy hợp, không bắt buộc.
**G4-7. Khăn tắm đánh lừa:** rơi xuống sàn rồi **giữ nguyên** `l4_towel_fallen` tới hết màn (đúng luật đồ đánh lừa, leveldesign mục 5.3). Bỏ chi tiết "nhân vật nhặt lên treo lại", không bay về kệ.
**G4-8. Hũ bánh quy:** đồng ý, đặt trên mặt bếp bên trái, không thêm kệ.

Demo: nhà tắm có thể đặt `player_point_think` + bong bóng ở góc dưới để chủ dự án thấy bố cục đủ; không bắt buộc.

## Vòng 2e – Art 2D áp G4-6…G4-8, giao Codex vẽ demo

- `design-art-level4.md` đã sửa: dùng lại `player_point_think` + `ui_thought_bubble` ở góc dưới nhà tắm (G4-6, ghi ở mục 1 và mục 6); khăn rơi nằm nguyên tới hết màn (G4-7); hũ bánh quy trên mặt bếp trái (G4-8).
- Demo lượt 1 **chưa vẽ nhân vật** (G4-6 cho phép), để chủ dự án duyệt phòng và đồ trước; lượt sau thêm nhân vật + bong bóng hình van ở góc dưới.
- Lời giao việc (dán khối style + góc nhìn, bắt buộc "Nhắc lại quy tắc" và "Tự kiểm"): `art/review/l4_demo_bathroom_brief.md`, `art/review/l4_demo_kitchen_brief.md`. Codex (gpt-6.1-sol, medium), mỗi demo 1 lượt, log `art/out/_logs/l4_demo_*.txt`.

## Vòng 2f – Tạm dừng vẽ demo (GD)

- GD báo chủ dự án đang bàn lại gameplay Level 4: **không giao Codex lượt mới**. Hai lượt đang chạy (demo nhà tắm lượt 1, demo bếp lượt 2 chỉnh từ lượt 1) để chạy xong, lưu làm tư liệu; chưa gửi duyệt.
- Demo bếp lượt 1 lưu ở `art/out/_refs/l4_demo_kitchen_v1.png` (lỗi: thừa kệ + dụng cụ treo, ô ống nhỏ không chạm mép ô, nút 💡 lấn banner, tủ đè mũi tên, bão hoà 0,31). Lời giao lượt 2: `art/review/l4_demo_kitchen_brief_v2.md`.
- Đặc tả `design-art-level4.md` giữ nguyên, chờ GD chốt hướng mới.

## Vòng 2e – Dev: khung `level4.js` với ảnh tạm (D4-9)

**D4-10. Đã dựng khung** `game/src/level4.js` (vào thẳng bằng `?level=4`). Mọi key mới tự vẽ ảnh tạm. Vị trí và bề rộng đọc từ bảng mục 6 của `design-art-level4.md` (đã thêm vào `assets.js`); lưới ống, chỗ nấp, van, mũi tên, bản đồ theo A4-4…A4-6. Chưa ráp ảnh thật, chưa commit.
- Đã chạy thử cả luồng: vòi khô (nhân vật trồi lên, bong bóng van) → ► sang bếp (bản đồ mini hiện) → mở tủ (tay chạm mẫu ô F) → van mở trước, nước phụt ở đầu hở → xoay F, E, D, D, A → lóe sáng, rì rầm → ◄ về → vuốt dài xối (Sữa che mặt, bong bóng giọt nước) → vuốt trái nhỏ giọt → Sữa thò đầu, chờ 2 giọt, nhảy xuống bồn → chạm Sữa → cảnh bế, ♥ 4/4, 30 cá (+5 hũ bánh).
- Đã áp G4-6 (nhân vật `player_point_think` trồi lên góc dưới trái nhà tắm, bếp không có), G4-7 (khăn rơi nằm nguyên), G4-8 (hũ bánh trên mặt bếp trái), A4-5 (vùng van nằm dưới ô ống: chạm trong ô F là xoay ô).
- Màn thưởng L4 chạm để chơi lại từ L1. Màn thưởng L3 **vẫn** về L1 (chưa nối sang L4 tới khi chủ dự án duyệt).

**D4-11. Hỏi GD:** khi van **chưa mở**, ô đã thông với nguồn hiện thế nào? Spec có hai câu ngược nhau: "phản hồi liền tay: ô thông đổi sang ống ướt" và "nối ống trước, vặn van sau: ống lóe sáng nhưng vẫn khô". Khung hiện làm: van chưa mở thì ô thông **giữ ảnh khô nhưng ánh vàng nhẹ** (tint), van mở mới đổi `_wet`. Nếu GD muốn ướt luôn (dễ hiểu hơn cho người chơi) thì đổi một dòng.
- Demo nhà tắm lượt 1 xong: `art/out/demo/l4_demo_bathroom.png` (log `_logs/l4_demo_bathroom.txt`). Không khí và đồ đúng ý; lệch đặc tả: chân tường y≈1100 (cần 1180), đồ to hơn bảng vị trí, nút 💡 lấn dải banner, ron sàn hơi xiên, khăn treo 2 sọc, bão hoà 0,20. Không sửa vì đang tạm dừng.
- Demo bếp lượt 2 xong (chỉnh từ lượt 1): `art/out/demo/l4_demo_kitchen.png` (log `_logs/l4_demo_kitchen_v2.txt`). Đạt: bỏ kệ và dụng cụ thừa, ô bản đồ trơn, mũi tên ◄ tách khỏi tủ, bão hoà 0,27. Còn lệch: đầu ống chưa chạm đúng mép ô 150, nút 💡 còn lấn nhẹ dải banner, mặt bếp bắt đầu x≈125.
- Ảnh đặt cạnh mẫu level 1 (owner_l1_style_ref | l1_demo_start | l4 nhà tắm | l4 bếp): `art/out/demo/l4_demo_vs_l1.jpg`. **Chưa gửi chủ dự án** (đang tạm dừng); khi GD mở lại thì dùng làm tư liệu hoặc vẽ lại theo hướng mới.
- Art nhận D4-10 (Dev): ô F ưu tiên hơn vùng van; bảng mục 6 không vướng code. Dòng `ui_room_arrow` lặp hai lần (tắm/bếp) giữ nguyên vì code đặt mũi tên theo A4-4. Art vẫn tạm dừng, chờ GD chốt hướng mới.

---

## Vòng 3 – GD: ĐỔI Ý TƯỞNG LEVEL 4 (chủ dự án chốt)

> Ý tưởng "Vòi nước nhỏ giọt" (vòi, van, xoay ống, nhà tắm/bếp) **bỏ**. Mọi mục G4-1…G4-8, D4-1…D4-11, A4-x ở trên chỉ còn là tư liệu; riêng các quyết định chung (camera trượt ngang giữa các phòng, `ui_room_arrow`, nền chỉ là phòng trống, vùng chạm tối thiểu) vẫn áp dụng. Demo `l4_demo_bathroom.png`, `l4_demo_kitchen.png` là tư liệu, không dùng.

**G4-9. Level 4 mới: "Quả chuối trên rèm".** Đặc tả đầy đủ: `levels/levels-01-10.md` và `levels/states-01-10.md` mục Level 4 (đã viết lại). Tóm tắt:
- Sữa leo rèm phòng khách, mắc trên đỉnh rèm, thấy được nhưng không với tới (Lẩn tránh: chạm thì giận dỗi quay mặt vào rèm, không chạy).
- 3 phòng: phòng ngủ ◄ **phòng khách** (bắt đầu) ► phòng làm việc.
- Lấy 4 món: **đệm** (chạm đệm dựng thì đổ xuống, chạm lần nữa thì nhặt), **gối**, **chồng sách** (chạm kệ, sách đổ domino tự xếp thành chồng, chạm chồng thì nhặt), **vali** (chạm lần 1: bung cả đống đồ ra, vali tự gấp lại; chạm lần 2: nhặt).
- Xếp tháp dưới rèm theo hình dáng: **đệm → vali → sách → gối**. Không hình mờ. Sai thứ tự thì món chao một nhịp rồi **bay về túi**.
- Đồ dụ sai: **gấu bông trắng** (🎭 giống mèo, chạm thì ngã úp mặt) và **bóng yoga** (chạm thì nảy, lăn một vòng về chỗ). **Chạm được, không nhặt được.**
- Gag: mỗi lần quay lại phòng khách, Sữa đổi tư thế treo (quả chuối → một chân bám → treo ngược → ngủ gật).
- Cao trào: xếp xong, **nhân vật hiện ra luôn ở đỉnh tháp** với tay; Sữa giật mình, **lộn vài vòng, tiếp đất bằng bốn chân**, ngồi liếm chân; nhân vật **cười ngốc nghếch**. Không có cảnh ngã. Chạm Sữa → cảnh bế chung.
- Bí mật: tất dính trên đèn ngủ (xuất hiện khi đệm đổ), phao vịt (rơi ra từ vali).
- **Chưa làm** đoạn Sữa vào quán sau màn.

**G4-10. Việc tiếp theo theo `QUY-TRINH.md`:** Art 2D viết lại `art/design-art-level4.md` theo spec mới → bàn với Dev (vòng mới D4-12…) → vẽ demo 3 phòng (phòng khách có Sữa treo rèm và tháp đã xếp; phòng ngủ; phòng làm việc) kèm mẫu level 1 → gửi chủ dự án duyệt. Dev bỏ khung `level4.js` cũ, dựng khung mới với ảnh tạm khi Art và Dev chốt xong key.

## Vòng 3a – Dev nêu yêu cầu animation cho Level 4 mới (viết trước để Art đọc khi viết lại đặc tả)

**D4-12. Ba phòng, camera trượt ngang** (giữ cách của khung cũ): phòng ngủ x 0–1024, phòng khách 1024–2048 (bắt đầu), phòng làm việc 2048–3072. Toạ độ Art ghi **trong khung từng phòng** (0–1024), cột Cảnh ghi `ngủ` / `khách` / `làm việc`, code tự cộng. Ba nền cùng chân tường, cùng hướng sáng.
- `ui_room_arrow` như A4-4: tâm (960, 760) mũi tên ►, (64, 760) mũi tên ◄. **Phòng khách có cả hai**, phòng ngủ chỉ ►, phòng làm việc chỉ ◄. Hai dải x 0–140 và 884–1024, y 660–860 của mỗi phòng để trống, không đặt đồ chạm được (rèm, tháp, sofa phòng khách cần tránh cả hai mép).
- **Hỏi GD:** danh sách ảnh mới chỉ còn `ui_room_arrow`. Có giữ **bản đồ mini** (3 ô) không? Nếu giữ thì Art giữ `ui_minimap_*` ở tờ `ui_nav_sheet`.

**D4-13. Túi đồ dùng lại của L3** (4 ô, icon = ảnh trong cảnh thu nhỏ, cắt sát phần vẽ). Dải đáy y ≈ 1290–1475 của **cả ba phòng** để trống từ đầu, không đặt đồ chạm được ở đó (như D3-14). Phần đổi code (túi bám camera khi trượt phòng) Dev tự làm.

**D4-14. Rèm và Sữa treo** (phòng khách):
- `l4_curtain` neo **giữa thanh treo** (đỉnh), code đung đưa rèm quanh điểm này (`swing` vài độ). Sữa là **vật con** của rèm, đung đưa theo.
- ~~Cục phồng, 2 trạng thái rèm~~ → G4-14: rèm một ảnh `l4_curtain` (phẳng, không cục phồng). `sua_curtain_banana` hiện sẵn từ đầu màn; chạm Sữa hoặc rèm luôn ra `sua_curtain_sulk` 2 giây.
- 5 tư thế `sua_curtain_banana/_one_paw/_upside/_sleep/_sulk` **chung một tờ, cùng tỉ lệ, cùng điểm neo = điểm bám trên đỉnh rèm** (Art ghi "x,y" của điểm bám trong ảnh). Đổi ảnh tại chỗ, không dịch.
- `sua_curtain_sleep`: bong bóng ngủ code vẽ (vòng tròn nở), không cần vẽ.
- Art ghi toạ độ điểm bám trên khung phòng khách, và cao hơn đỉnh gối của tháp đủ để nhân vật phải vươn tay.

**D4-15. Tháp 4 tầng** (`l4_stack_mattress/_suitcase/_books/_pillow`):
- **Chung một tờ, cùng tỉ lệ.** Mỗi tầng neo **giữa mép đáy**; Art ghi thêm **y mặt trên** (chỗ tầng sau đặt lên) trong ảnh của mỗi tầng. Code đặt tầng sau tại mặt trên tầng trước, cùng x.
- Art ghi **điểm đặt đáy tháp** trên sàn phòng khách (ngay dưới điểm bám rèm). Vùng thả = khung bao cả tháp đã xếp, nới ≥ 100px mỗi phía.
- Sai thứ tự: code đặt món sai lên đỉnh, nghiêng 15° rồi bay về túi. Không cần ảnh riêng.
- Icon túi dùng ảnh trong cảnh (`l4_mattress_fallen`, `l4_pillow`, `l4_book_stack`, `l4_suitcase_folded`). Khi kéo lên tháp, code đổi sang ảnh `l4_stack_*` lúc thả.

**D4-16. Cao trào:**
- `player_reach_up`, `player_silly_laugh`: chung một tờ, cùng tỉ lệ, neo **giữa hai bàn chân** (đứng trên mặt gối). Art ghi toạ độ **đầu ngón tay** của `player_reach_up` để khớp chỗ Sữa (tay chạm gần điểm bám).
- `sua_curl_spin`: cuộn tròn, neo **tâm**, code xoay 2–3 vòng theo cung 0,6 giây, vệt xoáy code vẽ.
- `sua_land`, `sua_lick_paw`: chung một tờ, cùng tỉ lệ, **cùng đường đáy**, neo giữa đáy. Art ghi chỗ tiếp đất cạnh tháp (phía không có sofa, không đè mũi tên).
- Lớp: tháp và nhân vật nằm **trên** rèm; Sữa dưới sàn nằm trên tháp nếu chồng lên.

**D4-17. Phòng ngủ:**
- `l4_mattress_standing`/`_fallen`: chung tờ, cùng tỉ lệ; đệm đổ nằm **trước** chỗ đệm dựng (cùng đường đáy hoặc Art ghi đáy riêng). Đệm đổ không đè gấu bông, giường.
- `l4_sock_stuck` neo giữa: Art ghi chỗ dính trên `l4_bedside_lamp`; code bay cung từ đệm lên đèn.
- ~~`l4_teddy_idle`/`_after`~~ → một ảnh `l4_teddy` (G4-13), neo giữa đáy; code `squash` + `hop` nhỏ tại chỗ.
- `l4_pillow` trên giường: neo giữa đáy, Art ghi toạ độ trên mặt nệm giường.

**D4-18. Phòng làm việc:**
- `l4_bookshelf_full`/`_empty`: chung tờ, **cùng khung** (chỉ khác sách). Vùng chạm cả kệ.
- `l4_book_single`: một cuốn nằm, code bay 6–8 bản sao từ các ngăn xuống chỗ chồng sách (Art ghi y các ngăn để code lấy điểm xuất phát).
- `l4_book_stack`: chồng vuông vức dưới sàn trước kệ, không đè bàn.
- `l4_suitcase_full`/`_folded`: chung tờ, cùng đường đáy, cùng x giữa.
- `l4_spill_*` (4 món): neo giữa đáy; Art ghi **4 chỗ rơi** trên sàn, mỗi món cách nhau ≥ 120 để vùng chạm không đè, tránh dải túi và mũi tên.
- `l4_yoga_ball`: tròn, neo **tâm** (code lăn = xoay theo quãng đường). Art ghi chỗ đứng; đường lăn code tự tính một vòng trên sàn, Art chỉ cần để sàn trống một vòng khoảng 500x150 trước bàn.
- `l4_desk`: bút vẽ liền trên mặt bàn; Art ghi toạ độ cây bút để code thả một chấm rơi.

**D4-19. Vùng chạm** ≥ 115 (P6). Món nhỏ (tất, phao vịt, đồ rơi) vẽ đủ to để vùng chạm không chồng nhau.

**D4-20. Khung code:** dùng lại phần chuyển phòng/camera và túi đồ; khung `level4.js` cũ sẽ thay bằng khung mới với ảnh tạm khi key chốt xong. Chưa ráp ảnh thật trước khi demo được duyệt, chưa commit.

## Vòng 3b – GD chốt câu hỏi của Dev (Vòng 3a)

**G4-11. Không có bản đồ mini ở level 4.** Ba phòng nối thẳng một hàng, mũi tên ◄ ► là đủ. Bản đồ mini dạy lần đầu ở level 5 (đúng cột "Dạy" của level 5). Chỉ cần `ui_room_arrow`.
**G4-12. Rèm hai trạng thái:** đồng ý đề xuất của Dev. `l4_curtain_bulge` (mở màn, cục phồng trên đỉnh) và `l4_curtain` (phẳng), cùng khung, cùng đường đáy; chạm rèm lúc mở màn thì `swap` sang phẳng và Sữa thò ra. Đã sửa `states-01-10.md`.

**G4-13. Gấu bông (chủ dự án chốt):** chạm thì gấu **bật nhún nhẹ lên** rồi ngồi lại như cũ, không úp mặt. Chỉ cần **một ảnh** `l4_teddy` (bỏ `l4_teddy_idle`, `l4_teddy_after`). Ngoại lệ có chủ ý với luật "đồ đánh lừa giữ trạng thái after".

**G4-14. Rèm (chủ dự án chốt, thay G4-12):** rèm **không đóng mở, không có cục phồng**. Sữa **treo sẵn trên đỉnh rèm từ đầu màn**, người chơi nhìn là biết ngay Sữa ở đâu và cần giải cứu. Chỉ một ảnh `l4_curtain` (bỏ `l4_curtain_bulge`). Chạm Sữa/rèm lúc nào cũng là phản ứng giận dỗi (Lẩn tránh). Đã sửa levels và states.

## Vòng 3c – Art 2D: viết lại `design-art-level4.md`, trả lời D4-12…D4-19

**A4-9. Đặc tả mới** `art/design-art-level4.md` (bản vòi nước cũ chuyển sang `art/review/l4_old_faucet_design-art.md`): 3 nền trống, 12 tờ, mọi trạng thái và phần giữ nguyên (mục 2c), bảng vị trí + ghi chú Dev (mục 6), 3 demo (mục 7). Đã áp G4-11 (không bản đồ mini), G4-13 (`l4_teddy` một ảnh), G4-14 (rèm một ảnh, không cục phồng, Sữa treo sẵn).

**A4-10. Tỉ lệ nhỏ hơn L1–L3:** phòng khách phải chứa rèm từ thanh y≈150 tới sàn, tháp 4 tầng và nhân vật đứng trên tháp với tới đỉnh rèm, nên **nhân vật cao ~400 (L3: 580), Sữa ngồi ~175 (L1: 260)**. Mốc dọc ở mục 2a: điểm bám Sữa y 200, chân Sữa ~420, đầu ngón tay ~360, đỉnh gối 770, đáy tháp 1140.

**A4-11. Mốc chung (D4-12):** chân tường y≈1000 cả ba phòng, sàn gỗ ván như L1; tường khách kem, ngủ hồng phấn rất nhạt, làm việc bạc hà rất nhạt. Dải mũi tên và dải túi (D4-13) để trống. Sofa: vẽ mới thu nhỏ hoặc dùng lại `l3_sofa_front` (hỏi chủ dự án khi duyệt demo).

**A4-12. Trả lời từng điểm Dev:**
- D4-14: rèm neo giữa thanh (365, 150); điểm bám Sữa (305, 200); 5 tư thế chung 2 tờ (`l4_sua_curtain_sheet` 3 ô, `_b_sheet` 2 ô) vì 5 ô dọc không vừa một tờ 1536 với cỡ đủ lớn; cùng tỉ lệ, điểm bám ghi tay ở giữa ô, y=140 trong mỗi ô.
- D4-15: 4 tầng chung `l4_stack_sheet`, neo giữa đáy; y mặt trên từng tầng ghi sau khi cắt (dự kiến 1040 / 925 / 835 / 770). Đáy tháp (305, 1140).
- D4-16: nhân vật neo giữa bàn chân (305, 770); đầu ngón tay ≈ (305, 360), đo lại sau khi cắt. Tiếp đất (565, 1160).
- D4-17: đệm đổ (240, 1140) trước chỗ dựng; tất (400, 700) trên mép chao đèn; gối (560, 880).
- D4-18: kệ 4 ngăn, đáy sách y 440/600/760/920; chồng sách (300, 1140); bút ≈ (930, 715); bóng yoga **neo tâm** (860, 1040), vòng lăn x 500–1000, y 1050–1200; 4 chỗ rơi đồ bung (120,1180) / (450,1240) / (640,1250) / (840,1250).
- D4-19: món nhỏ (tất 70, phao 130, kính 90, dép 80) đủ xa nhau để vùng chạm 115 không chồng.

**A4-13. Demo:** giao Codex 3 ảnh `l4_demo_living` (cao trào: Sữa quả chuối + tháp + nhân vật với tay), `l4_demo_bedroom`, `l4_demo_study` (lúc đầu), kèm mẫu L1 và `l3_demo_reveal` (túi đồ).
- Art nhận ghi chú Dev (sau A4-13): (1) đường lăn bóng cắt vali: giữ, code vẽ bóng lớp trên; (2) dời `l4_spill_shirt` sang (780, 1250) để vùng chạm không sát nút 💡; (3) vùng thả tháp lấn dải ◄: giữ, code ưu tiên thả. Neo 5 tư thế rèm sẽ ghi `x,y` điểm bám đo trên ảnh cắt.

## Vòng 3d – Demo lượt 1 (Art 2D)

- Codex vẽ 3 demo (`demo/l4_demo_living.png`, `l4_demo_bedroom.png`, `l4_demo_study.png`), log có "Nhắc lại quy tắc" và "Tự kiểm". Màu đạt (bão hoà 0,23 / 0,24 / 0,30), không khí và hình đồ tốt. Bản lượt 1 lưu `_refs/l4_demo_*_v1.png`.
- Lỗi phải sửa trước khi gửi duyệt: **chân tường lệch giữa 3 phòng** (khách ≈1100, ngủ ≈960, làm việc ≈855; cần chung 1000 cho camera trượt, D4-12); **túi đồ và 💡 thấp, lấn dải banner**; mũi tên phòng ngủ/làm việc quá cao (≈610); bóng sàn dưới vali, bóng; phòng khách tháp đáy ≈1270 (lấn dải túi).
- Bố cục đồ **giữ theo demo** (tháp + nhân vật ở trái-giữa, sofa phải; đệm, đèn, giường, gấu; kệ, bàn, vali, bóng). Sau khi duyệt Art đo lại bảng vị trí mục 6 trên demo, như L3.
- Lượt 2: chỉnh sửa từ chính ảnh lượt 1, lời giao `art/review/l4_demo_*_brief_v2.md`.

## Vòng 3e – Demo lượt 2, gửi chủ dự án duyệt (Art 2D)

- Codex chỉnh từng ảnh từ lượt 1 (log `_logs/l4_demo_*_v2.txt`, có "Nhắc lại quy tắc", "Tự kiểm"). Bão hoà 0,24 / 0,24 / 0,29.
- Đạt: Sữa thân dài cong kiểu quả chuối; bỏ cây ngoài cửa sổ; khách và ngủ cùng chân tường ≈950; mũi tên phòng làm việc đúng; bóng sàn gần hết.
- Còn lệch (image_gen chỉnh sửa không dời bố cục chính xác; đã hết lượt sửa cho demo): chân tường phòng làm việc ≈880; túi đồ và 💡 ở khách, làm việc thấp, lấn dải banner; mũi tên ► phòng ngủ cao (≈605); đáy tháp ≈1220, vali/bóng ≈1230; đầu ngón tay cách chân Sữa ~60px.
- **A4-14:** mốc chân tường chung đổi thành **y≈950** (khớp 2/3 demo); nền phòng làm việc hạ về 950 khi vẽ nền. Túi, 💡, mũi tên do code đặt theo vị trí chung, nên lệch trong demo không ảnh hưởng game. Sau khi duyệt, Art đo lại bảng vị trí trên demo và giữ đồ sàn đáy ≤ 1160 khi vẽ tờ.
- Ảnh đặt cạnh mẫu L1 (owner_l1_style_ref | l1_demo_start | khách | ngủ | làm việc): `art/out/demo/l4_demo_vs_l1.jpg`. **Chờ chủ dự án duyệt.**

## Vòng 3d – Dev: khung `level4.js` mới với ảnh tạm (D4-20)

**D4-21. Đã dựng khung "Quả chuối trên rèm"** (`?level=4`), thay khung vòi nước (bản cũ không còn trong `game/src`). Mọi key mới tự vẽ ảnh tạm; vị trí, bề rộng theo `design-art-level4.md` mục 6 và A4-12; đã áp G4-11…G4-14. Chưa ráp ảnh thật, chưa commit.
- Đã chạy thử cả luồng: Sữa treo sẵn, chạm thì giận dỗi 2 giây → ◄ phòng ngủ (tay hướng dẫn lần đầu) → đệm đổ, tất bay lên đèn, nhặt đệm, gối; tất 🎁 → ► về khách (Sữa đổi tư thế) → ► làm việc → kệ đổ domino, nhặt chồng sách; vali bung 4 món, nhặt vali; phao vịt 🎁; bóng yoga lăn một vòng → ◄ về khách → thả gối trước (chao 15° rồi về túi) → đệm, vali, sách, gối (mặt trên 1039 / 924 / 833 khớp A4-12) → cao trào → chạm Sữa → cảnh bế, ♥ 4/4, 40 cá (30 + 2 bí mật).
- Túi đồ bám camera khi trượt phòng. Cảnh bế chung trong `base.js` giờ đặt theo camera (các level 1 phòng không đổi).
- Gợi ý: theo món xếp kế tiếp. Còn ở phòng khác thì chỉ mũi tên; ở đúng phòng thì chỉ đồ; có trong túi thì icon nảy, 💡 làm mẫu kéo lên tháp.
- Bong bóng ngủ `zzz` code vẽ vòng tròn; vệt xoáy, lấp lánh, bút rơi cũng code vẽ.

## Vòng 3f – Quy tắc giữ màu O6: sửa công cụ, vẽ lại 3 demo (Art 2D)

- Chủ dự án chê 3 demo lượt 2 màu hơi đậm, lệch style ảnh mẫu L1; GD thêm quy tắc O6 (`style.md` khối COLOR, `QUY-TRINH.md` "Quy tắc giữ màu", `AGENTS.md`).
- **Công cụ:** `tools/codex-draw.mjs` nay luôn kèm `art/ref/owner_l1_style_ref.png` làm tham chiếu số 1 và dán nguyên khối COLOR vào mọi lời giao (ảnh lẻ và tờ); vẽ xong tự đo màu bằng công cụ mới `tools/color_check.py` (trung bình ≤ 0,25, p90 ≤ 0,46, tờ trong suốt chỉ tính pixel có alpha); tờ vượt ngưỡng thì **không cắt**. Ảnh mẫu L1 đo được 0,247 / 0,463.
- Số đo lượt 2: khách 0,242 / 0,424; ngủ 0,240 / 0,475 (vượt p90); làm việc 0,288 / 0,557 (vượt).
- **Lượt 3:** vẽ lại mới cả 3 (không chỉnh từ ảnh cũ): ảnh mẫu L1 là chuẩn màu duy nhất, demo lượt 2 (`_refs/l4_demo_*_v2.png`) chỉ để lấy bố cục; liệt kê từng món bị đậm (rèm san hô → hồng đào nhạt, chăn xanh đậm → xanh trời rất nhạt, vali vàng → vàng bơ nhạt, bóng tím → oải hương nhạt, tường gần trắng → kem nhạt, không tô phẳng); sửa luôn mốc chân tường 950, túi/💡, mũi tên y 760. Lời giao: `art/review/l4_demo_*_brief_v3.md`.
- **Kết quả lượt 3** (vẽ mới theo O6, log `_logs/l4_demo_*_v3.txt`): khách **0,240 / 0,416 đạt**; ngủ **0,229 / 0,463 đạt** (bằng ảnh mẫu); làm việc 0,273 / 0,525 vượt (vali, bóng, gáy sách).
- **Phòng làm việc lượt 4** (chỉnh màu trên lượt 3, giữ bố cục; `_logs/l4_demo_study_v4.txt`, bản lượt 3 ở `_refs/l4_demo_study_v3.png`): **0,235 / 0,467**. p90 vượt 0,007; phần cao nhất là gỗ (sàn 0,29, bàn 0,33), cùng mức gỗ ảnh mẫu (sàn 0,33). Vali 0,26, bóng 0,12, tường 0,07. Nhìn mắt nhạt như mẫu. Hết lượt sửa: gửi duyệt kèm số đo, chủ dự án quyết.
- Nhìn cạnh mẫu L1: tường kem/hồng/bạc hà rất nhạt, không trắng tinh; rèm hồng đào nhạt; chăn xanh trời nhạt; thấy vân chì. Chân tường khách/ngủ/làm việc ≈ 950 / 950 / 940; túi đồ và 💡 trên dải banner; mũi tên y≈760 (phòng ngủ ≈ 620, vẫn cao, code đặt).
- Ảnh đặt cạnh mẫu L1: `art/out/demo/l4_demo_vs_l1.jpg`. **Chờ chủ dự án duyệt.**

## Vòng 3g – Góc nhìn O7: sửa công cụ, đặc tả, vẽ lại 3 demo (Art 2D)

- Chủ dự án: màu lượt O6 ổn; **góc nhìn nhiều đồ loạn, phẳng quá**. GD chốt O7 (`style.md` 2b mới, `QUY-TRINH.md` "Quy tắc góc nhìn", `AGENTS.md`): camera lệch trái, cao, nhìn xuống 25–30°, mọi đồ cùng hướng xoay, thấy mặt trước + hông phải + mặt trên, nền có dải tường phải.
- **Công cụ:** `tools/codex-draw.mjs` dán nguyên khối CAMERA O7 vào lời giao việc cho đặc tả level ≥ 4 (level 1–3 không dán, giữ góc cũ đã ráp); "Tự kiểm" chấm góc từng đồ.
- **Đặc tả** `design-art-level4.md`: thêm đoạn "Góc nhìn O7" đầu file; viết lại bullet camera mục 2; cột góc nhìn mục 2b và mô tả mục 5 theo 3 mặt (giường mặt nệm hình bình hành, kệ/vali/bàn khối hộp có hông phải, tháp 4 món cùng hướng xoay cạnh song song, bóng có khối, gấu xoay 3/4); nền 3 phòng có dải tường phải, ván sàn chéo.
- **Demo lượt O7:** vẽ mới cả 3; ảnh mẫu L1 làm chuẩn màu (không lấy góc), demo lượt O6 (`_refs/l4_demo_*_v_o6.png`) giữ màu + bố cục + kiểu đồ (không lấy góc). Giao diện vẫn phẳng. Lời giao: `art/review/l4_demo_*_brief_o7.md`.
- **Lượt O7a** (vẽ mới, `_refs/l4_demo_*_o7a.png`): góc đạt (mọi đồ có khối, thấy mặt trước + hông phải + mặt trên, cùng hướng; tháp cạnh song song; nền có dải tường phải, ván chéo). Màu vượt: khách 0,266 / 0,451; ngủ 0,249 / 0,486; làm việc 0,290 / 0,525. Nguyên nhân: góc chéo thấy nhiều sàn gỗ hơn và gỗ (sàn 0,32, kệ 0,38, bàn 0,42) đậm hơn gỗ mẫu.
- **Lượt O7b** (chỉnh màu trên O7a, giữ góc, nét, bố cục; lời giao `l4_demo_*_brief_o7b.md`): **khách 0,211 / 0,380; ngủ 0,195 / 0,416; làm việc 0,240 / 0,463 — cả 3 đạt** (mẫu L1 0,247 / 0,463). Thêm: đầu ngón tay nhân vật sát chân Sữa; sofa thu lại, gần chạm mép mũi tên ► (code đặt mũi tên, Art đo lại khi tách).
- Kiểm góc (QUY-TRINH "Quy tắc góc nhìn"): rèm có khối, gấu xòe theo sàn; tháp 4 món cùng hướng; sofa, giường, bàn đầu giường, kệ, bàn, vali là khối hộp có hông phải; bóng có khối; gấu, Sữa, nhân vật xoay 3/4. Không đồ nào phẳng.
- Ảnh đặt cạnh mẫu L1: `art/out/demo/l4_demo_vs_l1.jpg`. **Chờ chủ dự án duyệt.**

## Vòng 3h – Bỏ O7, chốt O8 (góc như level 1): sửa công cụ, đặc tả, vẽ lại demo (Art 2D)

- Chủ dự án: "để góc nhìn như level 1 thôi, nhìn lệch nhiều không ổn". GD chốt **O8**: góc chính diện giống hệt L1 cho mọi level, giữ ý đồ có khối (dải mặt trên mỏng, độ dày, dải hông phải hẹp, đồ tròn có nét đổ bóng). Demo O7 lưu `_refs/l4_demo_*_o7a.png`, `_o7b.png` (tư liệu).
- **Công cụ:** `tools/codex-draw.mjs` dán khối CAMERA O8 cho **mọi level** (bỏ nhánh level ≥ 4).
- **Đặc tả:** `design-art-level4.md` về góc chính diện: đoạn "Góc nhìn O8" đầu file, bullet camera mục 2, cột góc mục 2b và mô tả mục 5 (dải mặt trên, độ dày, dải hông phải hẹp); nền 3 phòng tường sau nhìn thẳng, chân tường và ván sàn nằm ngang, không dải tường phải.
- **Demo lượt O8:** chỉnh sửa từ bản chính diện lượt O6 (`_refs/l4_demo_*_v_o6.png`, bố cục và giao diện giữ), thêm khối cho đồ phẳng, gỗ nhạt như lượt O7b (đã đạt màu); khách: ngón tay sát chân Sữa, sofa không đè ►; ngủ: mũi tên y 760. Lời giao `art/review/l4_demo_*_brief_o8.md`.
- **Kết quả lượt O8** (log `_logs/l4_demo_*_o8.txt`): khách **0,230 / 0,392**; ngủ **0,186 / 0,376**; làm việc **0,222 / 0,427**, cả 3 đạt màu (mẫu L1 0,247 / 0,463). Góc chính diện như L1, chân tường và ván sàn nằm ngang; đồ có khối: tháp 4 món thấy độ dày và dải mặt trên, đệm, giường, kệ, bàn, vali có dải mặt trên + dải hông phải hẹp, bóng và gấu có nét đổ bóng. Ngón tay nhân vật sát chân Sữa.
- Còn lệch nhỏ: mũi tên ► phòng ngủ vẫn hơi cao (≈650); code đặt mũi tên nên không ảnh hưởng game.
- Ảnh đặt cạnh mẫu L1: `art/out/demo/l4_demo_vs_l1.jpg`. **Chờ chủ dự án duyệt.**

## Vòng 3i – Quy luật chiều sâu O9 (Art 2D)

- Chủ dự án (demo O8): chiều sâu bàn và tủ lệch nhau; kệ, giường phẳng. GD chốt **O9** (`style.md` 2b, khối CAMERA có câu "ONE DEPTH RULE"; `QUY-TRINH.md` bước kiểm kẻ đường; `AGENTS.md`). Công cụ `codex-draw.mjs` đọc khối CAMERA từ style.md nên tự có câu O9.
- **A4-15. Đặc tả** `design-art-level4.md` thêm **mục 2d**: mọi cạnh chiều sâu chếch **lên phải 32°**, dài = độ sâu thật ÷ 3 × 2,6 px/cm; bảng độ sâu thật và độ lệch (dx, dy) px cho từng đồ: sofa 85 cm (+63, −39), giường 90 (+66, −41), bàn đầu giường 40 (+30, −19), đệm dựng 20 (+14, −9), kệ 30 (+22, −14), bàn làm việc 60 (+44, −28), vali đứng 25 (+19, −12), vali gập 45 (+33, −21), sách 22 (+16, −10), gối 40 (+30, −19), bệ cửa sổ 15 (+11, −7).
- **Công cụ mới** `tools/depth_check.py`: phủ lưới đường đỏ song song chếch 32° lên ảnh để kiểm cạnh nóc/hông. Ảnh kiểm demo O8: `art/out/_check/l4_depth_*_o8.jpg` (giường, mặt bàn, nóc kệ, bàn đầu giường gần như không có mặt sâu, đúng như nhận xét).
- **Demo lượt O9:** chỉnh sửa từ demo O8 (`_refs/l4_demo_*_o8.png`, màu đã đạt), kèm ảnh lưới làm tham chiếu góc, ghi độ lệch px từng đồ. Lời giao `art/review/l4_demo_*_brief_o9.md`.
- **Kết quả lượt O9** (log `_logs/l4_demo_*_o9.txt`, phòng làm việc chỉnh màu thêm 1 lượt `_o9b.txt`; bản trước `_refs/l4_demo_*_o8.png`, `l4_demo_study_o9a.png`): màu khách **0,251 / 0,435**, ngủ **0,203 / 0,408**, làm việc **0,220 / 0,424**, cả 3 đạt.
- **Chiều sâu:** giường có mặt nệm hình bình hành, đầu/chân giường có độ dày; mặt bàn làm việc, nóc + hông kệ, nóc bàn đầu giường, sofa, đệm tháp đều có mặt sâu; các cạnh sâu **cùng một góc** và bàn sâu hơn kệ (đúng ý nhận xét). **Chưa đạt:** góc chung đo được ~50–55°, dốc hơn 30–35° của O9; độ rộng dải không đúng số px. image_gen vẽ cả phòng một lượt không bám số px.
- Ảnh kiểm lưới 32°: `art/out/_check/l4_depth_all.jpg` (từng phòng `l4_depth_*.jpg`). Ảnh cạnh mẫu L1: `art/out/demo/l4_demo_vs_l1.jpg`. **Chờ chủ dự án duyệt.**
- **A4-16. Đề xuất nếu cần đúng 30–35°:** (a) vẽ từng đồ riêng (theo tờ, cùng khối CAMERA) rồi ghép demo bằng script, Art kiểm góc từng đồ trước khi ghép; tốn ~8–10 lượt Codex; hoặc (b) chấp nhận góc chung ~50° hiện có và sửa O9 cho khớp. Chủ dự án/GD chọn.

## Vòng 3j – Giữ độ sâu, góc như L1: mẫu góc hộp các-tông (Art 2D)

- Chủ dự án (A4-16): "muốn có độ sâu như này nhưng giữ góc nhìn như demo level 1". GD đo hộp các-tông L1: cạnh nóc ~35°, dải hông ~0,3 mặt trước; cắt mẫu `art/ref/l1_depth_angle_ref.png`, sửa `style.md` 2b + khối CAMERA.
- **Công cụ:** `tools/codex-draw.mjs` luôn kèm `art/ref/l1_depth_angle_ref.png` làm tham chiếu số 2 (sau ảnh mẫu L1), câu giao việc "mọi cạnh chiều sâu cùng góc với hộp trong ảnh mẫu góc".
- **Demo lượt O9c:** chỉnh từ lượt O9 (`_refs/l4_demo_*_o9.png`, giữ mức sâu, màu, bố cục), hạ góc cạnh sâu về như hộp mẫu. Lời giao `art/review/l4_demo_*_brief_o9c.md`. Nếu đo vẫn dốc > 40° thì chuyển phương án (a): vẽ từng đồ theo mẫu góc rồi ghép.
- **Kết quả lượt O9c** (log `_logs/l4_demo_*_o9c.txt`, bản trước `_refs/l4_demo_*_o9.png`): góc thoải hơn, nhiều cạnh gần 32° (đầu/chân giường ~35°, hông phải kệ ~38°) nhưng còn lẫn cạnh dốc (mép trái mặt nệm ~60°, mép trái nóc kệ ~65°). Màu: khách 0,261 / 0,455 (vượt nhẹ), ngủ 0,223 / 0,439, làm việc 0,247 / 0,459.
- Đã bắt đầu phương án (a) (vẽ từng tờ đồ theo mẫu góc, ghép bằng script `compose`), nhưng phiên bị đóng giữa chừng: chưa tờ nào xong, chỉ có nền trống `art/out/_demo_parts/l4/bg_bedroom.png`. Chủ dự án hỏi demo: gửi bản O9c kèm ảnh cạnh mẫu L1 và ảnh kiểm góc `art/out/_check/l4_depth_all.jpg`.

## Vòng 3k – O9 chốt lại: góc như sofa L1, chiều sâu bằng mặt trên (Art 2D)

- Chủ dự án: "góc nhìn hơi trực diện như sofa level 1 nhưng có chiều sâu hơn". Bỏ hướng chếch 30–35° (hộp các-tông). GD sửa `style.md` 2b + khối CAMERA, mẫu góc `art/ref/l1_depth_angle_ref.png` nay là **sofa L1**.
- Lượt vẽ từng đồ (phương án a) bỏ dở khi phiên trước đóng, nay **không làm tiếp** vì hướng góc đã đổi (chỉ còn `art/out/_demo_parts/l4/bg_bedroom.png`, tư liệu).
- **Công cụ:** `codex-draw.mjs` câu chiều sâu theo sofa L1 (mặt trên ~1/3–1/2 mặt trước, cạnh sâu gần thẳng lên, hông rất mỏng); `depth_check.py` mặc định lưới đứng + ngang (kiểm cạnh sâu gần thẳng đứng, đọc chiều cao mặt trên), `--goc` giữ cho kiểu cũ.
- **Đặc tả** mục 2d viết lại: chiều cao mặt trên ≈ độ sâu thật × 0,9 px (giường ~81, sofa ~76, bàn làm việc ~54, bàn đầu giường ~36, kệ ~27…), hông rất mỏng.
- **Demo lượt O9d:** chỉnh từ bản chính diện O8 (`_refs/l4_demo_*_o8.png`, màu đã đạt), thêm mặt trên theo bảng, kèm mẫu sofa. Bản O9c lưu `_refs/l4_demo_*_o9c.png`. Lời giao `art/review/l4_demo_*_brief_o9d.md`.
- **Kết quả lượt O9d** (log `_logs/l4_demo_*_o9d.txt`; phòng khách chỉnh màu thêm `_o9e.txt`, bản trước `_refs/l4_demo_living_o9d.png`): góc hơi trực diện như sofa L1; mặt nệm giường là mảng lớn, mặt bàn làm việc sâu hơn nóc kệ, sofa, bàn đầu giường, đệm tháp có mặt trên; cạnh sâu gần thẳng đứng, hông rất mỏng. Màu: khách **0,220 / 0,384**, ngủ **0,204 / 0,404**, làm việc **0,242 / 0,451**, cả 3 đạt.
- Ảnh cạnh mẫu L1: `art/out/demo/l4_demo_vs_l1.jpg`; ảnh kiểm lưới đứng + ngang: `art/out/_check/l4_depth_all.jpg`. **Chờ chủ dự án duyệt.**

## Vòng 4 – Làm lại từ đầu (Art 2D)

- Chủ dự án: "clear lại toàn bộ ảnh, vẽ lại 3 demo như mô tả từ đầu, dựa theo góc nhìn ghế sofa level 1, đồ có chiều sâu hơn". GD đã xoá mọi ảnh L4 và viết gọn `style.md` 2b thành một quy tắc góc (như sofa L1).
- `design-art-level4.md`: bỏ mọi đoạn góc cũ (O7/O8/O9, chếch 32°, bảng px); chỉ trỏ về `style.md` 2b, mục 2d còn một đoạn ngắn về đồ nào sâu hơn. Bố cục và đồ vật giữ.
- `tools/codex-draw.mjs`: chỉ dán khối COLOR + khối CAMERA mới, luôn kèm `owner_l1_style_ref.png` và `l1_depth_angle_ref.png` (sofa L1); không còn câu O8/O9.
- 3 demo vẽ mới, mỗi phòng một lời giao việc sạch: `art/review/l4_demo_{living,bedroom,study}_brief.md`. Tham chiếu chỉ gồm ảnh mẫu L1, sofa L1, `l3_demo_reveal` (giao diện), `sua_ref`, `player_ref`. Không dùng ảnh L4 cũ.
- **Kết quả** (log `art/out/_logs/l4_demo_{living,bedroom,study}.txt`, mỗi phòng 1 lượt): màu khách **0,232 / 0,424**, ngủ **0,229 / 0,451**, làm việc **0,250 / 0,463**, cả 3 đạt. Đặt cạnh sofa L1: hơi trực diện, đồ có mặt trên và độ dày (mặt nệm giường, mặt bàn, đệm tháp, sofa), không xoay chéo, chân tường và ván sàn nằm ngang.
- Còn có thể góp ý: Sữa treo thẳng người hơn "quả chuối dang chân"; gấu bông khá nhỏ. Ảnh cạnh mẫu L1: `art/out/demo/l4_demo_vs_l1.jpg`. **Chờ chủ dự án duyệt.**

## Vòng 4b – Cute hơn, mềm hơn, nhạt hơn (Art 2D)

- Chủ dự án: "ổn hơn nhiều rồi; nét vẽ cute hơn, mềm hơn; hình 2, 3 màu hơi đậm cần nhạt hơn; hình 1 đống đồ xếp nhỏ hơn chút, dịch gần vào tường hơn". GD thêm: Sữa treo giữa đỉnh rèm.
- Vẽ lại từ đầu, mỗi phòng một lời giao việc sạch (`art/review/l4_demo_*_brief_v4b.md`, cùng nội dung Vòng 4 + mục "Cute và mềm hơn"): khối tròn mập bo góc như sofa L1, nét nâu mảnh nhạt, đầu nét nhọn. Phòng ngủ, làm việc: gỗ, sàn, chăn nhạt hơn, mục tiêu bão hoà ~0,20. Phòng khách: tháp nhỏ hơn (đệm ~280px), chân tháp y≈1020 sát chân tường, Sữa giữa đỉnh rèm. Bản Vòng 4 lưu `_refs/l4_demo_*_v4a.png` (không dùng làm tham chiếu).
- **Kết quả Vòng 4b** (log `_logs/l4_demo_*_v4b.txt`, `_v4b2.txt`; lượt đầu lưu `_refs/l4_demo_{living,study}_v4b1.png`): nét tròn mềm hơn ở cả 3 phòng. Màu: khách **0,237 / 0,435**, ngủ **0,208 / 0,388**, làm việc **0,234 / 0,439** (đã vẽ lại 1 lượt, vẫn chưa xuống ~0,20).
- Phòng khách: Sữa nay treo giữa tấm rèm. **Chưa đạt:** tháp vẫn to (~360px) và chân tháp y≈1215, chưa lùi sát chân tường; image_gen vẽ cả phòng không bám được vị trí. Đã hết lượt vẽ lại.
- **A4-17. Đề xuất nếu chủ dự án cần đúng chỗ tháp:** vẽ riêng cụm tháp + nhân vật + Sữa (một tờ nền trong suốt) và nền phòng khách có rèm, rồi ghép bằng script đúng vị trí và cỡ (2 lượt Codex).
- Ảnh cạnh mẫu L1: `art/out/demo/l4_demo_vs_l1.jpg`. **Chờ chủ dự án duyệt.**

## Vòng 4c – Chủ dự án cho quay về 3 demo Vòng 4 (Art 2D)

- Chủ dự án: "back lại 3 hình demo cũ trước đi". Art đã dừng lượt vẽ lại phòng ngủ (Vòng 4b, giường nhìn thẳng) trước khi có kết quả; không ghi gì vào `art/out/demo/`.
- GD chép `_refs/l4_demo_*_v4a.png` về `art/out/demo/l4_demo_{living,bedroom,study}.png` và dựng lại `l4_demo_vs_l1.jpg`. Bản Vòng 4b lưu ở `_refs/l4_demo_*_v4b.png` (tư liệu).
- Demo hiện hành = Vòng 4: màu khách 0,232 / 0,424, ngủ 0,229 / 0,451, làm việc 0,250 / 0,463. Art không vẽ thêm, chờ chỉ đạo.

## Vòng 4d – Sửa từ ảnh Vòng 4 (Art 2D)

- Chủ dự án: "dựa vào 3 hình này chỉ sửa thôi, không cần xoá ảnh cũ và vẽ lại": nét cute, mềm hơn (cả 3); hình 2, 3 nhạt hơn chút; hình 1 tháp nhỏ hơn chút, gần tường hơn.
- Codex **chỉnh sửa từ ảnh** `_refs/l4_demo_*_v4a.png` (giữ kích thước, bố cục, vị trí, góc, đồ; chỉ đổi phần được yêu cầu), ghi đè `art/out/demo/l4_demo_*.png`. Bản gốc giữ ở `_refs`. Lời giao `art/review/l4_demo_*_brief_v4d.md`.
- **Kết quả** (mỗi phòng 1 lượt chỉnh sửa, log `_logs/l4_demo_*_v4d.txt`): bố cục, góc, đồ giữ nguyên; nét mảnh, mềm hơn. Phòng khách: tháp nhỏ lại và lùi sát chân tường, nhân vật vẫn với tới chân Sữa. Màu (trung bình / p90, trước → sau): khách 0,232 → **0,233 / 0,412**; ngủ 0,229 → **0,197 / 0,357**; làm việc 0,250 → **0,229 / 0,420**. Cả 3 đạt.
- Ảnh cạnh mẫu L1: `art/out/demo/l4_demo_vs_l1.jpg`. **Chờ chủ dự án duyệt.**

## Vòng 4e – Nhân vật to như level cũ, màu sàn chung, vali đổi màu (Art 2D, chủ dự án góp ý trực tiếp)

- Chủ dự án: "ảnh 1 nhân vật quá nhỏ so với các level cũ, màu sắc sai hơi nhiều; prompt kỹ lại nhân vật và bố cục, demo lại ảnh 1; ảnh 3 vali lẫn vào sàn; màu nền gỗ 3 demo lệch nhau".
- **Đo màu sàn** (RGB trung bình): mẫu L1 (249,197,140); khách (252,204,154) ngả hồng cam; ngủ (245,206,165), làm việc (248,208,165) ngả vàng nhạt. Cắt mẫu sàn **`art/ref/l1_floor_ref.png`** từ ảnh mẫu L1 làm chuẩn chung.
- **A4-18:** nhân vật cao ~500 (thân), Sữa ~ cỡ mèo ảnh mẫu L1; tháp làm **mỏng** (đệm 60, vali 60, sách 45, gối 40) để vừa khung; mốc dọc mục 2a: thanh rèm 140, bám 180, chân Sữa ~430, đầu ngón tay ~440, đỉnh gối ~960, đáy tháp ~1160. Bảng key: `player_reach_up` cao 520, `sua_curtain_banana` 250, `sua_lick_paw` 230.
- **A4-19:** vali (đứng, gập, trên tháp) đổi sang **xanh da trời nhạt #B8DAF2**, đai kem, để khỏi lẫn với sàn gỗ.
- **A4-20:** sàn gỗ 3 phòng giống hệt nhau theo `l1_floor_ref.png` (ghi ở mục 2b).
- Ảnh 1 vẽ lại từ đầu với lời giao kỹ (`l4_demo_living_brief_v4e.md`: tả nhân vật theo player_ref, cỡ px, bố cục từng mốc, màu); ảnh 2, 3 chỉnh sửa từ bản Vòng 4d (`_refs/l4_demo_*_v4d.png`): sàn theo mẫu sàn L1, ảnh 3 đổi màu vali.
- **Kết quả Vòng 4e** (log `_logs/l4_demo_living_v4e.txt`, `_v4e2.txt`; lượt 1 phòng khách lưu `_refs/l4_demo_living_v4e1.png`: đúng cỡ nhân vật nhưng rèm cam, bão hoà 0,296, tháp đè túi): phòng khách lượt 2 **0,229 / 0,459**, nhân vật cao ~500 đúng player_ref, rèm hồng rất nhạt, đáy tháp ≈1180 không đè túi. Ngủ **0,228 / 0,435**, làm việc **0,237 / 0,439** (vali xanh trời nhạt).
- Sàn gỗ (RGB): khách (244,201,153), ngủ (243,193,140), làm việc (246,198,150), mẫu L1 (249,197,139): cùng tông.
- Lệch nhỏ: giao diện phòng khách vẽ nút 💡 nằm trong dải túi (code tự đặt giao diện, không ảnh hưởng game). Ảnh cạnh mẫu L1: `art/out/demo/l4_demo_vs_l1.jpg`. **Chờ chủ dự án duyệt.**

## Vòng 4f – Ảnh 1: Sữa nhỏ hơn, tháp + nhân vật sát tường (Art 2D)

- Chủ dự án (qua GD): "ảnh 1 giữ nguyên mọi thứ, cho Sữa bé lại 1 chút, để tháp và nhân vật sát tường hơn". Bản trước lưu `_refs/l4_demo_living_v4e.png`. Chỉnh sửa từ ảnh, lời giao `art/review/l4_demo_living_brief_v4f.md`.
- Lượt 1 (`_refs/l4_demo_living_v4f1.png`): Sữa nhỏ, tháp lùi đúng, nhưng nhân vật bị co còn ~380px; p90 0,475. Loại.
- Lượt 2 (log `_logs/l4_demo_living_v4f2.txt`): Sữa ~80%, tháp + nhân vật lùi sát chân tường (đáy tháp ≈1030), tay sát chân Sữa; màu **0,233 / 0,463** đạt. Nhân vật vẫn hơi nhỏ hơn bản v4e (~85–90%). Hết lượt sửa. Ảnh 2, 3 không đổi. Ảnh cạnh mẫu L1: `art/out/demo/l4_demo_vs_l1.jpg`. **Chờ chủ dự án duyệt.**

## Vòng 5 – Chủ dự án DUYỆT demo Level 4 (GD ghi)

**G4-15.** Chủ dự án duyệt 3 demo: `art/out/demo/l4_demo_living.png` (Vòng 4f), `l4_demo_bedroom.png`, `l4_demo_study.png` (Vòng 4e). Chuyển sang bước 4 `QUY-TRINH.md`: Art viết lời giao việc thật kỹ cho từng tờ / ảnh lẻ, Codex vẽ, kiểm màu + góc, cắt bằng `tools/sheet_cut.py`, giao Dev ráp.
Ghi chú khi vẽ asset thật (mỗi đồ vẽ riêng nên chỉnh được): nhân vật cỡ như L1–3 (~500, theo v4e, không nhỏ như v4f); tường hồng phòng ngủ nhạt như lượt Vòng 4d; vali xanh da trời nhạt (A4-19); sàn theo `art/ref/l1_floor_ref.png` (A4-20).

**G4-16. Chân tường chung (trả lời Dev):** 3 nền thật dùng **cùng một chân tường y ≈ 1000** (như phòng khách đã duyệt), để camera trượt không thấy sàn nhảy bậc. Đồ phòng ngủ, phòng làm việc giữ bố cục như demo, chỉ dời xuống theo y tương ứng (đồ sát tường vẫn đứng trên chân tường).
**G4-17. Giao diện chung:** đồng ý Dev: mũi tên, túi đồ, 💡 một bố cục chung cho cả 3 phòng (mũi tên y 760, túi + 💡 như L3, ngoài dải banner). Vị trí giao diện trên demo chỉ để tham khảo; Art không cần vẽ chừa theo demo.

## Vòng 5 – Art tách asset theo demo đã duyệt (Art 2D)

- **A4-21. Đặc tả** `design-art-level4.md`: cỡ hiển thị (cột Hiển thị, 2 bảng) đo lại trên 3 demo duyệt (vd giường 600, bàn 487, kệ 400, vali 380, bóng 320, sofa 560, rèm 610); bảng vị trí mục 6 đo lại, chân tường chung 1000 (G4-16): phòng ngủ dời +95, phòng làm việc đồ sát tường +130, đồ phía trước đáy ≤ 1180. `player_reach_up` cao 500 (GD), Sữa nhỏ như demo 4f (`sua_curtain_banana` cao 200).
- **A4-22.** Mục 4 (nền): sửa từ demo từng phòng, xoá đồ, chân tường 1000, sàn theo `l1_floor_ref.png`, tường ngủ hồng nhạt như Vòng 4d. Thêm mục **5.0** (chung mọi lượt tách: vẽ đúng đồ trong demo phòng, màu chốt, cỡ nhân vật / Sữa, trạng thái cùng khung).
- **Công cụ** `codex-draw.mjs`: nay dán nguyên khối phong cách mục 1 (trước chỉ dán COLOR) + khối CAMERA; luôn kèm ảnh mẫu L1 và mẫu góc sofa.
- **Đang vẽ:** 3 nền + 13 tờ (`l4_curtain/living/stack/bedroom/mattress/shelf/study/suitcase_sheet`, `l4_sua_curtain(_b)/sua_land_sheet`, `player_l4_sheet`, `ui_nav_sheet`), mỗi tờ kèm demo phòng + `sua_ref`/`player_ref`, `--stroke-ref sua_ref`. Công cụ tự đo màu, đạt mới cắt (`sheet_cut.py`, ghi `anchors.json`, `_check/`).

**G4-18. Chủ dự án chơi thử khung Level 4, góp ý:**
- **Bóng yoga** lăn không xoay quanh đúng tâm quả bóng → Dev sửa neo xoay = tâm hình tròn của bóng (Art cắt ảnh bóng sao cho tâm ảnh = tâm bóng).
- **Kệ sách:** kệ có rất nhiều sách mà đổ ra chỉ một chồng ít sách là vô lý → **chỉ hàng sách tầng dưới cùng rơi**, các tầng trên **vẫn đầy sách**. Đổi `l4_bookshelf_empty` thành `l4_bookshelf_after` (giống `_full`, chỉ tầng dưới trống một khoảng vừa số sách đã rơi). Chồng sách dưới sàn khớp với khoảng trống đó. Đã sửa `levels-01-10.md`, `states-01-10.md`.
- **A4-23 (theo G4-18):** đổi `l4_bookshelf_empty` → **`l4_bookshelf_after`** trong đặc tả (giống hệt `_full`, cùng khung và đường đáy, chỉ tầng dưới cùng trống một khoảng 6–8 cuốn); `l4_book_stack` = chồng 6–8 cuốn cùng màu các cuốn đó. `l4_yoga_ball` neo tâm = tâm hình tròn quả bóng (Art kiểm sau khi cắt). Sửa xong trước khi tờ `l4_shelf_sheet` tới lượt vẽ.

**D4-22. Dev sửa theo G4-18** (chưa commit):
- **Bóng yoga:** gốc xoay = tâm phần vẽ thật của ảnh (tính theo khung bao phần không trong suốt, nên ảnh có lề lệch vẫn đúng). Góc = quãng lăn **ngang có dấu** ÷ bán kính: lăn sang trái quay ngược chiều kim đồng hồ, sang phải quay xuôi. Trước đây góc cộng dồn cả quãng đường nên lăn ngược vẫn quay xuôi, nhìn như lệch tâm. Đo khi lăn: tâm khung bao trùng điểm xoay (lệch 0px); lăn xong về đúng chỗ cũ, góc 0.
- **Kệ sách:** chỉ hàng tầng dưới cùng rơi domino (7 cuốn, từ phải sang trái); kệ đổi ngay sang `l4_bookshelf_after` (3 tầng trên đầy, tầng dưới còn vài cuốn và một khoảng trống); chồng sách dưới sàn. Đổi key `l4_bookshelf_empty` → `l4_bookshelf_after` trong `assets.js`. Khi có ảnh thật, Art ghi y đáy sách tầng dưới và khoảng x của chỗ trống để code lấy điểm xuất phát sách rơi.
- Đã nối màn thưởng L3 sang L4 (G4-15).
- **A4-24 (lưu ý Dev qua GD):** sofa dời x 750 → **734** (mép phải 1014 ≤ 1016, không lố sang phòng làm việc); đệm đổ dời x 230 → 245 (mép trái 15). Đã kiểm mọi dòng bảng vị trí có Rộng demo: mép trái ≥ 8, mép phải ≤ 1016 ở cả 3 phòng.

**D4-23. Dev sửa vùng chạm phòng làm việc (GD chơi thử) + cập nhật vị trí A4-24** (chưa commit):
- Mọi vùng chạm đồ vật L4 giờ ôm **khung phần vẽ thật** (bỏ lề trong suốt), không còn theo khung ảnh.
- Thêm vùng `shelfLow` = dải hàng sách dưới cùng của kệ (70–95% chiều cao kệ), **ưu tiên hơn vali**; chỉ bật khi kệ còn đầy. Kiểm: điểm (297, 930) và (450, 950) cục bộ → kệ đổ; giữa vali (470, 1100) → vali. Đánh đổi: khi kệ còn đầy, chạm dải trên cùng của vali (quai, chỗ chồng lên hàng sách dưới) cũng là đổ kệ.
- Sách rơi, cây bút trên bàn, vùng thả tháp giờ tính theo khung thật của kệ / bàn / đáy tháp, không còn số cứng.
- Vị trí và bề rộng dự phòng trong code khớp bảng mục 6 mới (sofa 734, đệm đổ 245, 4 chỗ rơi đồ bung).

**G4-19. Từ level 4 ẩn bàn tay hướng dẫn** (chủ dự án chốt): không hiện `ui_hand_pointer` ở mọi level ≥ 4 (kể cả lần đầu chuyển phòng). Thao tác mới chỉ nhắc bằng nhấp nháy, lấp lánh, thang gợi ý; nút 💡 vẫn dùng bàn chân. Đã sửa `leveldesign.md` mục 6.4, `levels-01-10.md` (L4, L7), `states-01-10.md`.

**D4-24. Dev áp G4-19** (chưa commit): `base.js` có cờ chung `showHand` = `levelNo < 4`. Từ level 4 trở đi `handTap` / `handDrag` với bàn tay `ui_hand_pointer` không làm gì: không tay hướng dẫn lần đầu, không tay ở màn thưởng, không tay khi chạm icon túi. Bàn chân 💡 (`ui_hint_paw`) giữ nguyên. L4: mũi tên ◄ vẫn nhấp nháy lần đầu, bỏ bàn tay. Kiểm `?level=4`: sau mở màn bàn tay ẩn, mũi tên nhấp nháy, bấm 💡 thì bàn chân hiện. L1–L3 không đổi.
- **A4-25. Sửa ô theo khung thật:** Codex vẽ lệch lưới ô nên cắt theo ô gốc bị xén (vd bóng yoga ra 493x417). Art đo khung bao từng đồ trên tờ (script tách mảng alpha), ghi lại cột Ô cho 8 tờ đã vẽ, neo 3 tư thế Sữa trên rèm = điểm bám đo trên tờ (308,130 / 800,130 / 1280,245); cắt lại: mọi đồ nguyên vẹn. Gối, sách, vali trên tháp có cỡ riêng theo demo (235 / 190 / 235).
- **A4-26. Ngưỡng màu cho tờ trong suốt quá chặt:** O6 (≤0,25 / ≤0,46) đặt theo cả tranh có tường kem; tờ trong suốt chỉ tính pixel của đồ nên luôn cao hơn. Đo lại: phần lớn tờ L1–L3 đã duyệt cũng "vượt" (vd `l1_plant_sheet` 0,421, `l1_curtain_sheet` 0,334, `player_l3_sheet` 0,406). 4 tờ L4 bị công cụ chặn (giường 0,326, bàn+bóng 0,309, vali 0,270, Sữa p90 0,475) nhìn đúng màu demo: Art cắt tay và kiểm bằng **ảnh ghép lên nền so với demo** (`art/out/_check/l4_compose_vs_demo.jpg`). **Đề xuất GD:** với tờ, kiểm màu bằng ảnh ghép (đo cả cảnh ghép ≤0,25/≤0,46) thay vì đo riêng pixel đồ.
- **Vẽ lại:** `l4_curtain_sheet` (cửa sổ thấp bè, rèm ngắn so với demo; ghi rõ tỉ lệ 1:2,3 và 610:912), `l4_shelf_sheet` (kệ after mất sách cả tầng 3). Bản cũ lưu `_refs/l4_*_sheet_v1.png`.
- **A4-27. Đã cắt** (anchors.json, `_check/`): 3 nền (phòng ngủ, làm việc dời bằng script về chân tường 1000: phòng ngủ hạ dải tường 50px, phòng làm việc nâng sàn 40px; bản Codex ở `_refs/l4_bg_*_codex.png`); `l4_window`, `l4_curtain` (vẽ lại 1 lượt: cửa sổ cao hẹp, rèm dài), `l4_sofa`; `l4_mattress_standing/_fallen`, `l4_teddy`, `l4_bed`, `l4_pillow`, `l4_bedside_lamp`, `l4_sock_stuck`; `l4_bookshelf_full/_after` (vẽ lại 1 lượt theo G4-18), `l4_book_single`, `l4_book_stack` (7 cuốn), `l4_desk`, `l4_yoga_ball` (tâm ảnh = tâm bóng, lệch 0px), `l4_suitcase_full/_folded`, 4 `l4_spill_*`; 5 `sua_curtain_*` (cùng khung 204x417, neo điểm bám (105,90)), `sua_curl_spin`, `sua_land`, `sua_lick_paw`; `player_reach_up` (cao 499), `player_silly_laugh`; `ui_room_arrow`. Bề rộng mọi key đúng cột Hiển thị (đo lại sau khi cắt).
- **Còn lại:** `l4_stack_*` vẽ lại (lượt trước các món dày gấp ~1,5 demo: đệm 116, vali 109, sách 133, gối 87 so với demo 92 / 82 / 77 / 55; tháp sẽ cao ~445). Đã giao Dev phòng ngủ, phòng làm việc, Sữa, nhân vật, mũi tên; phòng khách chờ tờ tháp.
- Ghi nhận: giường (cao 296 so với demo ~400) và rèm (763 so với ~910) hơi thấp hơn demo ở cùng bề rộng; chấp nhận.

**D4-25. Dev ráp asset thật phòng ngủ, phòng làm việc, phòng khách (bản tháp cũ)** (chưa commit):
- Phòng ngủ, phòng làm việc lên khớp demo; đệm đổ, tất vắt chao đèn, kệ đổ, vali bung, bóng lăn đều đúng neo. Chụp kiểm từng phòng.
- Sửa theo ảnh thật: `l4_bookshelf_after` trống **phía trái** tầng dưới, nên sách giờ rơi từ khoảng trái (x 6–52% bề rộng kệ). `l4_book_single` thật không tô màu, giữ cỡ ảnh. Mặt trên tháp lấy theo đỉnh phần vẽ thật, vì 4 tầng chung một khung 458x217.
- **Vướng kích thước cao trào (cần GD/Art quyết):** với bản tháp hiện có, mặt trên các tầng = 945 / 835 / 701 / **614**. `player_reach_up` (cao ~510) đứng trên gối thì đỉnh tay ở y ≈ **113**, trong khi Sữa treo ở y 165–362 (điểm bám 165, chân ~362) và thanh rèm ở y 148. Nhân vật cao vượt cả Sữa lẫn thanh rèm, nên không còn cảnh "vươn tay chạm chân Sữa". Art báo tháp mới vẫn cao ~445 nên không đổi được bao nhiêu. Để đỉnh tay ở khoảng y 340–380 (sát chân Sữa) thì **tháp + nhân vật ≈ 700** (đáy tháp 1062). Ví dụ tháp ~260 + nhân vật ~440, hoặc giữ nhân vật ~500 thì tháp ~200 (4 món mỏng). Code không tự hạ được vì đáy tháp nằm trên sàn và Sữa đã sát thanh rèm.
- Lỗi ghép nhỏ: phao vịt (150, 1240) đè góc chồng sách (160, 1170). Vùng chạm phao ưu tiên hơn nên không chạm nhầm, chỉ là chồng lên nhau trên hình.
- **A4-28. Tháp vẽ lại** (`_refs/l4_stack_sheet_v1.png` là bản dày): cao đệm 81, vali 88, sách 99, gối 59 (tổng ~327, demo ~306). Vì nhân vật nay cao ~500, hạ đáy tháp 1062 → **1140**; xếp chồng mép 14 / 14 / 10 / 8 → chân nhân vật 857, đầu ngón tay ≈357, ngay dưới chân Sữa. Cửa sổ Y 708 → 640 cho đỉnh khớp demo. Ghép thử `art/out/_check/l4_climax_vs_demo.jpg`. **Đã giao Dev đủ 3 phòng.**

**G4-20 (trả lời A4-26):** đồng ý. Tờ trong suốt không đo màu riêng; ghép key lên nền thành cảnh như demo, đo cảnh ghép theo ngưỡng O6 và nhìn cạnh demo đã duyệt. Đã sửa `QUY-TRINH.md` (Quy tắc giữ màu). Demo và nền vẫn đo trực tiếp.
- **A4-29 (theo G4-20):** `tools/codex-draw.mjs` bỏ chặn cắt theo màu cho tờ trong suốt (in nhắc kiểm bằng ảnh ghép lên nền); ảnh lẻ (nền) vẫn đo O6.

**D4-26. Dev ráp tháp mới theo A4-28** (chưa commit; vướng chiều cao ở D4-25 đã hết):
- Đáy món sau = đỉnh phần vẽ món trước + chồng mép (14, 14, 10); nhân vật lún vào gối 8px, chân x 340. Đo khi chơi: đáy các tầng 1140 / 1072 / 997 / **906** (Art 908), chân nhân vật **863** (Art 857), đầu ngón tay y **363**, chân Sữa y 362. Lệch ≤ 6px, trong mức 8px.
- Đã chơi cả luồng 3 phòng bằng asset thật tới cao trào và lộ diện, không lỗi. Hằng số dự phòng khớp bảng mục 6 (cửa sổ y 640, đáy tháp 1140, nhân vật 340, 857).

## Vòng 6 – Chủ dự án chơi thử bản ráp asset thật: KHÔNG ĐẠT (GD nhận lỗi duyệt)

Chủ dự án: "level 4 đang xấu ơi là xấu, ghế sofa bị bé, cửa sổ bị lộ ra 1 nửa, xấu hơn demo, mèo cũng xấu hơn demo, giường khác demo, gối bay lơ lửng, bỏ rung và vfx đệm đi, bàn đầu giường cũng không đúng demo, tất vắt lên đèn chưa đúng, click vào bàn có chấm gì đó bay ra, vali lúc nhặt bị khác hình lúc đặt, tủ sách và bàn cũng sai vị trí, sách rớt xuống khác màu chồng sách, khác cả chồng sách lúc đặt tháp".
GD nhận lỗi: đã báo "gần demo" chỉ dựa vào ảnh ghép tĩnh, không chơi trong game và soi từng đồ.

**G4-21.** Đệm đổ: bỏ rung và bụi. Chạm bàn làm việc: bỏ chấm/hạt bay ra, chỉ rung nhẹ. Tất phải vắt trên chao đèn như demo. Đã sửa levels/states.
**G4-22.** Demo đã duyệt là chuẩn duy nhất; quy trình mới ở `QUY-TRINH.md` bước 4 (ảnh cắt từng món từ demo làm tham chiếu, cùng món cùng thiết kế, chồng ảnh game lên demo, báo xong bằng ảnh chụp trong game, GD tự chơi hết màn trước khi báo chủ dự án).

**Phân việc sửa:**
| # | Lỗi | Ai |
|---|---|---|
| 1 | Sofa bé hơn demo | Art (cỡ hiển thị/ảnh) + Dev (đặt cỡ theo demo) |
| 2 | Cửa sổ lộ ra một nửa (bị rèm/khung cắt, khác demo) | Art (ảnh cửa sổ đúng demo) + Dev (vị trí, lớp) |
| 3 | Sữa trên rèm xấu hơn demo | Art (vẽ lại theo ảnh cắt Sữa trong demo) |
| 4 | Giường khác demo | Art |
| 5 | Tủ đầu giường khác demo | Art |
| 6 | Gối lơ lửng trên giường | Dev (neo/vị trí theo mặt nệm) |
| 7 | Tất vắt lên đèn chưa đúng | Art (tất vắt có hình gập) + Dev (điểm neo trên chao đèn) |
| 8 | Vali lúc nhặt khác lúc đặt trên tháp | Art (vẽ `l4_suitcase_folded` và `l4_stack_suitcase` cùng thiết kế, cùng màu) |
| 9 | Kệ sách và bàn sai vị trí | Dev (đo theo demo phòng làm việc) |
| 10 | Sách rơi khác màu chồng sách, khác sách trên tháp | Art (`l4_book_single`, `l4_book_stack`, `l4_stack_books`, sách trên kệ: cùng bộ màu) + Dev (màu sách rơi lấy đúng ảnh) |
| 11 | Đệm đổ có rung và bụi; bàn có chấm bay ra | Dev (G4-21) |

## Vòng 6 – Art sửa theo phân việc (Art 2D)

- **Cách làm mới để giống demo:** không cho Codex vẽ lại theo mô tả nữa. Art cắt **đúng món từ demo đã duyệt**, phóng to đặt vào ô (`art/ref/l4_v6_input/*.png`, ảnh cắt gốc ở `art/ref/l4_demo_crops/`), Codex **chỉnh sửa từ ảnh đó**: nền trong suốt, xoá đồ khác đè lên, vẽ bù phần bị che, giữ nguyên hình, tỉ lệ, màu, nét. Lời giao `art/review/l4_v6_*_brief.md`.
- 8 tờ: `l4v6_window_sheet` (cửa sổ trọn khung), `l4v6_sofa_sheet` (sofa trọn, vẽ bù tay vịn phải bị khung demo cắt), `l4v6_bed_sheet` (giường, xoá gối và gấu), `l4v6_lamp_sheet` (tủ đầu giường + đèn; tất gập vắt qua mép chao, cùng tỉ lệ đèn), `l4v6_sua_sheet` (5 tư thế trên rèm theo đúng Sữa trong demo), `l4v6_suitcase_sheet` (vali căng + vali gập **cùng một chiếc**; vali gập dùng cho cả lúc nhặt và trên tháp), `l4v6_books_sheet` (chồng sách = đúng chồng trên tháp demo, dùng cho cả dưới sàn và trên tháp; 3 sách lẻ cùng 3 màu), `l4v6_shelf_sheet` (kệ full/after giữ nguyên, chỉ tầng dưới: 3 cuốn trái đổi đúng 3 màu bộ sách; after thiếu đúng 3 cuốn đó).
- **A4-30. Số sách rơi = 3** (theo chồng sách trên tháp trong demo: hồng, oải hương, xanh lá), thay "6–8" của G4-18, để sách rơi = chồng sách = sách trên tháp. GD xem.
- **Sofa đúng cỡ demo** (~620 rộng, demo bị khung cắt tay vịn phải): đặt như demo (mép trái ≈470), Dev cắt phần lố mép phải theo khung phòng (mask), thay vì thu nhỏ sofa.

**G4-23 (trả lời A4-30):** đồng ý số sách rơi = 3, đúng chồng 3 cuốn trên tháp ở demo: sách rơi = chồng sách dưới sàn = sách trên tháp, cùng bộ màu. Kệ vẫn đầy sách ở các tầng trên (giữ G4-18). Đã sửa states.
**G4-24 (sofa):** đồng ý: vẽ sofa trọn, đặt đúng như demo (mép trái ≈ 470, rộng ~620), phần lố mép phải **cắt theo khung phòng khách** (Dev dùng mask/crop theo biên phòng x 0–1024), để khi camera trượt sang phòng làm việc không thấy mẩu sofa. Không thu nhỏ sofa.
- **Bị chặn:** cả 8 lượt Vòng 6 dừng vì **Codex hết hạn mức** ("You've hit your usage limit… try again at Oct 27th, 2026 12:49 AM"). Chưa có ảnh nào. Ảnh đầu vào `art/ref/l4_v6_input/` và lời giao `art/review/l4_v6_*_brief.md` đã sẵn; chạy lại bằng script khi có hạn mức.

**D4-27. Dev sửa theo Vòng 6, G4-21…G4-24** (chưa commit). Đo bằng `play_harness` (đã mở rộng: `compare` / `zoomCmp` / `sideBySide` / `match` nhận tên demo `l4_demo_living|bedroom|study`, so với phòng camera đang đứng):
- G4-21: đệm đổ không còn rung (squash) và bụi; chạm bàn chỉ rung nhẹ, bỏ chấm bay ra.
- Gối: code dò mép trên của ảnh giường ở cột giữa gối, đặt đáy gối xuống dưới mép đó 45% chiều cao gối (như demo: mép sau nệm 768, đáy gối 835). Với giường hiện tại: đáy gối 929 → 980, gối nằm trên nệm. Art vẽ lại giường thì gối tự theo.
- Tất: móc tất (neo đỉnh) đặt ở đỉnh phần vẽ của đèn, lệch phải tâm chao 15% bề rộng. Giờ tất vắt qua mép phải chao, không còn treo lơ lửng trên chao.
- Sofa (G4-24): mép trái 470, rộng 620 (đo trên game: 470–1089); phần lố cắt theo biên phòng khách (mask); vùng chạm không lố sang phòng làm việc. Ghi đè bảng mục 6 (734/560). **Art cập nhật bảng** cho khớp.
- Cửa sổ: co và đặt theo khung đo trên demo (mép phải 640, bậu dưới 710, cao 530). Đo trên game: x 378–638, y 180–708; mép trái khuất sau rèm như demo.
- Sách rơi (G4-23): 3 cuốn, ảnh `l4_book_single` không tô màu.
- **Còn treo, cần quyết:** phòng làm việc "kệ, bàn sai vị trí" là do **chân tường demo y 770**, còn nền thật y 1000 (G4-16). Art giữ vali và bóng đúng y demo (đáy 1180–1190) nhưng đặt kệ và bàn sát chân tường mới (đáy 1020–1025), nên kệ và bàn trông thấp, sát nhau, khác demo. Không thể dời cả phòng +230 theo demo, vì vali sẽ xuống y ~1415, lấn dải túi đồ. Hai cách: (a) nền phòng làm việc (và phòng ngủ, 905) đặt chân tường đúng như demo, mọi đồ đúng toạ độ demo; chấp nhận khi trượt phòng thấy đường sàn lệch bậc. (b) Giữ 1000, Art dựng lại bố cục phòng làm việc cho vừa. Dev đề xuất (a) vì "demo là chuẩn duy nhất" (G4-22).

**G4-25 (chủ dự án chốt):** giữ nhân vật đứng giữa phòng khách lúc mở màn Level 4 (`player_call`, mở màn chung như L1–3: bước vào gọi, bong bóng nhiệm vụ, rồi lui xuống). Cỡ nhân vật như L1–3 (~500). Cao trào vẫn là `player_reach_up` trên đỉnh tháp. Đã sửa levels/states.
- **Tạm dừng (chủ dự án qua GD):** không vẽ L4 nữa, kể cả khi hạn mức Codex mở lại 0:49 ngày 27/10; không tự chạy lại, không lên lịch. Giữ nguyên `art/ref/l4_v6_input/` và `art/review/l4_v6_*_brief.md`, chờ chủ dự án hoặc GD cho chạy tiếp.

**D4-28. Dev áp G4-25** (chưa commit): bỏ `fitWidth(player, 260)`; `player_call` mở màn L4 giờ cỡ tự nhiên như L1–L3 (đo trong game: cao 577, x 405–711, đáy 1242 trong phòng khách).

**G4-26 (chủ dự án chốt):** mọi lượt tách ảnh (tờ, ảnh lẻ, nền) gửi kèm **ảnh demo gốc** đã duyệt của phòng đó cho Codex, không chỉ ảnh cắt. Thiếu thì Codex dừng, báo "thiếu ảnh demo gốc". Đã ghi `QUY-TRINH.md` bước 4 và `AGENTS.md`.

## Vòng 7 – Chạy lại Vòng 6 theo G4-26 (Art 2D)

- Chủ dự án (qua GD): cho chạy tiếp, áp G4-26 (mọi lượt tách kèm NGUYÊN ảnh demo gốc của phòng).
- `tools/codex-draw.mjs`: đọc bảng "Tờ hoặc key | Demo gốc | Vị trí trong demo" (mới, `design-art-level4.md` mục 5.0), tự đính kèm ảnh demo gốc ngay sau ảnh mẫu L1 và mẫu góc, thêm câu "món cần vẽ nằm ở …"; level có demo mà thiếu dòng thì dừng.
- 8 lời giao `art/review/l4_v6_*_brief.md`: thêm ảnh demo gốc + vị trí món + `l1_depth_angle_ref` (≤ 5 ảnh). Chạy lại 8 tờ.

**D4-29. Ảnh chụp trong game cạnh demo** (trái game, phải demo), lưu ở `art/review/l4_dev_check/`: `1_living_start`, `2_bedroom_start`, `3_bedroom_after` (đệm đổ, tất trên đèn), `4_study_start`, `5_study_after` (kệ đổ, vali bung), `6_climax_reach`, `7_found`. Lệch còn thấy (ảnh hiện tại, trước khi có 8 tờ Vòng 7):
- Phòng khách: **rèm ngắn**. Mép dưới rèm trong game y ≈ 900, demo ≈ 1060 (chạm sàn). Phần vải trong ảnh `l4_curtain` ngắn hơn demo; rèm không nằm trong 8 tờ Vòng 7, Art xem có cần vẽ lại.
- Phòng ngủ, phòng làm việc: cả phòng thấp hơn demo do chân tường 1000 (G4-16). Phòng làm việc kệ và bàn sát tường, chật hơn demo (chờ quyết ở D4-27).
- Chồng sách dưới sàn 7 cuốn và khoảng trống trên kệ ~7 cuốn, trong khi chỉ 3 cuốn rơi (G4-23): chờ bộ sách mới của Art.

**G4-27 (trả lời Dev, thay G4-16):** chọn **(a)**: demo là chuẩn duy nhất (G4-22). Nền phòng ngủ và phòng làm việc đặt chân tường **đúng như demo** (ngủ ≈ 905, làm việc ≈ 770), mọi đồ đúng toạ độ demo. Chấp nhận đường sàn lệch giữa các phòng; nếu lúc camera trượt thấy bậc sàn khó chịu thì Dev đổi chuyển phòng thành trượt + mờ chéo nhanh (crossfade ~0,3 giây) để che chỗ nối. Art dựng lại nền 2 phòng theo chân tường demo (sửa từ ảnh nền hiện có, không vẽ mới).
**G4-28 (rèm ngắn):** rèm trong game mép dưới ≈ 900, demo ≈ 1060. Art thêm tờ rèm vào Vòng 7, tách lại theo demo gốc (rèm dài tới gần sàn như demo).
- **Theo G4-27:** nền phòng ngủ, làm việc dời bằng script (từ bản Codex `_refs/l4_bg_*_codex.png`) về đúng chân tường demo: ngủ 905, làm việc 770 (phòng làm việc nối thêm sàn ở đáy). Bảng vị trí 2 phòng lấy đúng toạ độ demo; vali rộng 435, bóng 357 như demo; tất neo (320, 682) mép trên chao đèn.
- **Theo G4-28:** thêm lượt tách lại rèm `l4v6_curtain_sheet` từ ảnh cắt demo (thanh rèm tới gấu ≈1060), kèm ảnh demo gốc. Lời giao `art/review/l4_v6_curtain_brief.md`.
- **Kết quả Vòng 7** (9 tờ `l4v6_*`, log `_logs/l4_v6_*.txt`, mỗi tờ 1 lượt, không món nào phải vẽ lại): cắt bằng `sheet_cut.py` theo bảng mục 5.13 (ô = khung thật; tờ Sữa tách theo mặt nạ sang `l4v6_sua_split_sheet`). Key thay: `l4_window`, `l4_curtain`, `l4_sofa` (620), `l4_bed`, `l4_bedside_lamp`, `l4_sock_stuck`, 5 `sua_curtain_*`, `l4_suitcase_full`, `l4_suitcase_folded` = `l4_stack_suitcase`, `l4_book_stack` = `l4_stack_books`, `l4_book_single` + **mới** `l4_book_single_lavender`, `l4_book_single_mint` (A4-31), `l4_bookshelf_full/_after`. Sofa ở bảng vị trí (780, 1080), rộng 620, lố mép phải 1090 → Dev cắt theo biên phòng.
- **Ghép lại demo từ asset thật** (`art/out/_check/l4_recompose_vs_demo.jpg`, từng phòng `l4_recompose_*.png`): phòng ngủ, làm việc gần trùng demo; phòng khách: rèm dài tới ≈1060, cửa sổ trọn, sofa đúng cỡ, Sữa đúng demo; cảnh cao trào tháp + nhân vật (~500) như A4-28. Đã giao Dev.

**D4-30. Dev áp G4-27 + ráp key mới (bảng mục 6 theo toạ độ demo)** (chưa commit):
- Nền thật của Art đã có chân tường như demo (dò pixel: ngủ ≈ 910, khách 1000, làm việc ≈ 775), nên code không dời nền; đồ lấy thẳng từ bảng mục 6 mới (toạ độ demo). Bỏ các phần bù tạm của Dev.
- Gối: đặt theo mép trên giường mới, hệ số 0,67 như demo → đáy gối 835 (demo 835). Tất: vắt mép phải chao đèn mới, đỉnh y 675 (bảng 682).
- Đồ rơi từ vali nằm trước bóng (lớp 17 > bóng 16).
- Ảnh `art/review/l4_dev_check/1…7` đã chụp lại với asset mới: phòng ngủ, phòng làm việc, phòng khách, cao trào khớp bố cục demo (ảnh game bên trái hơi dẹt dọc vì khung game cao hơn 1536).
- **Lệch còn lại (Art):** 4 chỗ rơi đồ bung (y 1240–1260) nằm **dưới thanh túi** (thanh túi thật y 1183–1379, x 113–732): kính bơi và dép bị che hẳn, phao vịt và áo bị che một phần. Đề xuất dời lên trên y ≈ 1170 và rải quanh vali đã gập, ví dụ phao (90, 1160), kính (330, 1060), dép (560, 1070), áo (600, 1170). Khoảng trống trên kệ sau khi đổ còn rộng hơn 3 cuốn đã rơi.

**D4-31. Dev ráp Vòng 7** (chưa commit): nạp lại ảnh mới (cửa sổ, rèm dài tới sàn, sofa, giường, đèn, tất, 5 tư thế Sữa, vali, bộ sách, kệ).
- 3 sách rơi dùng đúng `l4_book_single` / `_lavender` / `_mint` (key mới, đã thêm vào `assets.js`), không tô màu, bay ra từ chỗ trống tầng dưới. Chỗ trống đo trên ảnh `_after`: x 10–31%, y 77–93% khung kệ.
- Tất đặt đúng toạ độ bảng (320, 682), bỏ cách tự tính theo đèn.
- Ảnh trong game cạnh demo chụp lại: `art/review/l4_dev_check/1…7` (phòng khách, phòng ngủ trước/sau, phòng làm việc trước/sau, cao trào, lộ diện).
- **Còn lệch (Art):**
  (1) `l4_bookshelf_after`: 8 cuốn còn lại ở tầng dưới **khác** 8 cuốn bên phải của `_full` (full: …vàng, hồng, xanh, vàng, xanh, hồng, vàng, bạc hà; after: vàng, xanh, hồng, bạc hà, oải hương, vàng, hồng, bạc hà). Khi kệ đổi ảnh, các cuốn còn lại nhảy màu. Cần `_after` = `_full` bỏ đúng 3 cuốn trái, phần còn lại giữ nguyên từng pixel.
  (2) 4 chỗ rơi đồ bung vẫn ở y 1240–1260, nằm dưới thanh túi (y 1183–1379, x 113–732), xem D4-30.
- **A4-32 (theo D4-30):** `l4_bookshelf_after` dựng lại từ chính ảnh `l4_bookshelf_full`: chỉ thay vùng 3 cuốn trái tầng dưới (hồng, oải hương, bạc hà) bằng lưng kệ trống lấy từ bản Codex; khoảng trống vừa đúng 3 cuốn, mọi cuốn khác giống hệt `_full`. Tờ `l4v6_shelf_fix_sheet`, đã cắt lại.
- **A4-33 (theo D4-30):** 4 chỗ rơi đồ bung dời lên trên thanh túi đồ thật (y 1183–1379), quanh vali gập, không đè kệ, bàn, bóng, chồng sách: phao (90, 1170), áo (345, 1020), dép (510, 1040), kính (590, 1150). Ảnh kiểm `art/out/_check/l4_study_after_spill.png`. Đã giao Dev.
- **Art xem ảnh chụp trong game của Dev (D4-31)** `art/review/l4_dev_check/*.jpg`: 3 phòng và cảnh cao trào rất sát demo. 2 lỗi Dev nêu (kệ after khác màu sách, đồ bung dưới thanh túi) đã sửa ở A4-32, A4-33; nhờ Dev nạp lại và chụp lại 5_study_after.

**D4-32. Dev ráp A4-33** (chưa commit): `l4_bookshelf_after` mới chỉ khác `_full` ở đúng 3 cuốn trái tầng dưới (so pixel: x 7–35%, y 77–93% khung kệ), code lấy vùng này làm chỗ sách bay ra. 4 chỗ rơi mới nằm trên thanh túi: phao 15–163 × 1042–1169, áo 270–418 × 928–1019, dép 465–553 × 941–1039, kính 540–639 × 1105–1149 (thanh túi bắt đầu y 1183). Ảnh `art/review/l4_dev_check/5_study_after.jpg` chụp lại.
Lưu ý cho Art: 4 chỗ rơi chỉ ghi ở đoạn văn mục 6, không ở dạng dòng bảng (`| key | x | y |`), nên code không tự đọc. Code đang dùng số dự phòng. Nếu đổi thì thêm dòng bảng hoặc báo Dev.
- Theo lưu ý Dev (D4-32): 4 chỗ rơi đồ bung thêm thành dòng bảng vị trí mục 6 (`| key | x | y |`) để code tự đọc.

## Vòng 8 – Chủ dự án chơi thử, góp ý tiếp

Nguyên văn: "bắt đầu màn bubble cho bé lại 1 chút và cao hơn, bỏ rung đệm, cho đệm dịch sang trái 1 chút và layer sau tủ đầu giường, đệm đổ xuống đang hơi giật, nhặt vào túi cũng đang scale bị giật, mỗi lần tap vào rèm đều thay 1 pose mèo mới, item trong túi không action gì nữa, bóng hơi cần layer cao hơn vali và đồ đạc, sách sửa lại là rớt từ 3 cuốn ở hàng trên cùng, rớt xuống cũng khớp việc xếp chồng luôn".

**G4-29.** Mỗi lần chạm rèm/Sữa: Sữa đổi sang tư thế treo kế tiếp (thay cho đổi khi quay về phòng khách).
**G4-30.** Sách rơi từ **3 cuốn ở hàng trên cùng**; rơi xuống đáp đúng vị trí trong chồng sách (cùng 3 cuốn, cùng màu, cùng thứ tự với chồng dưới sàn và sách trên tháp).
**G4-31 (Dev):** bong bóng nhiệm vụ lúc mở màn nhỏ hơn một chút và cao hơn; đệm bỏ rung (cả lúc chạm và lúc đổ), dịch sang trái một chút, lớp **sau** tủ đầu giường; đệm đổ mượt (không giật); bay vào túi mượt (scale không giật); chạm món trong túi **không có phản ứng** (không nhún, không âm); bóng yoga lớp **trên** vali và đồ bung.
**G4-32 (Art):** sửa `l4_bookshelf_after` (thiếu 3 cuốn hàng trên cùng, còn lại y hệt `_full`), `l4_book_single` ×3 và `l4_book_stack` cùng 3 cuốn đó; vị trí đệm dựng dịch trái trong bảng mục 6.

**G4-33 (chủ dự án chốt):** túi đồ (UI đựng đồ) **dùng chung và giống hệt level 3** ở mọi level có túi: cùng ảnh `ui_bag_bar`/`ui_bag_slot`, cùng vị trí, bề rộng, vị trí ô, cỡ icon, cách trượt lên và kéo-thả; nút 💡 cùng chỗ. Không level nào đặt riêng.

**D4-33. Dev sửa Vòng 8 (G4-29…G4-33)** (chưa commit):
1. Bong bóng nhiệm vụ mở màn L4: cỡ 0,8 bản chung, tâm y 560 (cũ 760). Ảnh `l4_dev_check/0_intro_bubble.jpg`.
2. Đệm: bỏ rung (cả gợi ý 8 giây không rung đệm); đệm dựng nằm **sau tủ đầu giường** (lớp 11,5 < 12); đệm đổ là sprite riêng nằm trước. Cảnh đổ: đệm dựng dẹt dần quanh đáy, trượt tới chỗ đệm nằm và mờ dần, đệm nằm hiện dần, 0,36 giây, không đổi ảnh giữa chừng. Đo từng khung: y 976 → 1061, scaleY 0,66 → 0,24, alpha chéo nhau đều.
3. Bay vào túi (`base.js`, mọi level): icon bắt đầu đúng tâm phần vẽ và đúng scaleX/scaleY của sprite trong cảnh, co liên tục (đo: 0,56 → 0,47 → 0,37 → 0,27 → 0,20 → 0,168), không nảy khi vào ô (L4).
4. G4-29: mỗi lần chạm rèm hoặc Sữa → tư thế kế tiếp (đo: one_paw → upside → sleep → banana → one_paw); về phòng khách không đổi tư thế nữa; bỏ `sua_curtain_sulk`.
5. Chạm món trong túi: không nhún, không âm, không bàn tay; kéo-thả vẫn chạy.
6. Bóng yoga lớp 18, trên vali (13) và đồ bung (17).
7. G4-30: sách rơi tìm chỗ trống bằng cách **so pixel `_full` / `_after`** (hàng nào cũng được, đổi ảnh kệ hàng trên là tự theo); 3 cuốn bay lần lượt, xoay nằm ngang, đáp đúng tầng của mình trong `l4_book_stack` (cuốn 1 dưới cùng), cả 3 đáp xong thì ảnh chồng sách hiện đúng chỗ, sách bay biến cùng lúc. **Cần Art:** (a) ảnh kệ có chỗ trống ở **hàng trên cùng**; (b) thứ tự màu trong chồng sách từ dưới lên = `l4_book_single`, `_lavender`, `_mint` (hoặc báo thứ tự); (c) **chồng sách (160, 1060) đang nằm sau vali đầy** (vali x 130–565, y 885–1190): chỉ lộ dải x 70–130 (ảnh `5b_study_stack_hidden.jpg`), khó thấy, khó chạm. Cần chỗ đặt khác, thấy rõ.
8. G4-33: túi đồ dùng chung hằng số `BAG` trong `base.js` (thanh x 409, phần vẽ rộng 688; 4 ô x 205/348/492/635, rộng 136), không đọc bảng từng level. Đo L3 và L4: thanh 66–753 × 1162–1379, 4 ô và nút 💡 (934, 1306) **trùng khít**. Ảnh `8_bag_L3.jpg`, `8_bag_L4.jpg`.
Ảnh khác: `2_bedroom_start` (đệm sau tủ), `3_bedroom_after`, `5a_study_books_falling`.

## Vòng 8 – Art (G4-32, D4-33)

- **A4-34.** Sách rơi = 3 cuốn trái nhất **hàng trên cùng** (hồng, bạc hà, vàng bơ). `l4_bookshelf_after` = chính ảnh `_full`, chỉ thay vùng 3 cuốn đó bằng lưng kệ trống do Codex vẽ liền (Codex chỉnh sửa từ ảnh kệ full + demo gốc, Art ghép đúng vùng, lệch 0 px); hàng dưới đầy lại như `_full` (tờ `l4v8_shelf_sheet`). Bộ sách Codex đổi màu từ tờ cũ (tờ `l4v8_books_sheet`): `l4_book_single` (hồng), `l4_book_single_mint`, **`l4_book_single_yellow` (thay `_lavender`, đã xoá ảnh và neo cũ)**; chồng sách từ trên xuống hồng, bạc hà, vàng bơ.
- **A4-35 (D4-33).** Thứ tự chồng sách **từ dưới lên: vàng bơ, bạc hà, hồng**. Chồng sách dời (160, 1060) → **(160, 1170), vẽ lớp trên vali** (thấy trọn, không bị vali che). Đồ bung sắp lại: kính (230, 1000), áo (390, 1010), dép (530, 1030), phao (605, 1172).
- **G4-31/32.** Đệm dựng (128, 975), **lớp sau tủ đầu giường**.

**D4-34. Dev ráp Vòng 8 của Art** (chưa commit):
- Kệ: code so pixel `_full` / `_after` tự tìm chỗ trống ở **hàng trên cùng** (x 124–221, y 303–423 trong phòng). 3 cuốn bay từ đúng ô của mình (hồng trái, bạc hà giữa, vàng phải) và đáp theo thứ tự chồng sách từ dưới lên: vàng, bạc hà, hồng. Key `l4_book_single_lavender` → `l4_book_single_yellow` (`assets.js`).
- Chồng sách (160, 1170) lớp trên vali (13,5 > 13), vùng chạm ưu tiên hơn vali; thấy trọn ở góc trước-trái vali.
- 4 đồ bung theo bảng mới, đều thấy rõ, trên thanh túi. Đệm dựng (128, 975) sau tủ đầu giường.
- Ảnh: `l4_dev_check/5a_study_shelf_fallen.jpg` (kệ đổ, chồng sách), `5_study_after.jpg` (vali bung). Đã xoá 2 ảnh cũ `5a_study_books_falling`, `5b_study_stack_hidden`.
- Art xem ảnh trong game Vòng 8 (D4-34) `5a_study_shelf_fallen.jpg`, `5_study_after.jpg`: kệ trống đúng 3 cuốn hàng trên, chồng sách thấy trọn, đồ bung không đè nhau; đạt. Chờ GD chơi kiểm.

## Vòng 9 – Chủ dự án chơi thử, góp ý tiếp

Nguyên văn: "để lấy được vali rồi mới lấy được sách, sách cho rơi xuống và xoay sách ngang để xếp chồng nó khớp hơn, đệm lúc tap vào cho nó nằm xuống thì layer cao hơn tủ đầu giường, tất trên đèn tap thì bay jump lên giường".

**G4-34.** Phải có **vali trong túi** rồi mới làm rơi sách được. Chạm kệ trước đó: kệ lung lay khẽ (`wiggle` nhỏ), bong bóng nhỏ hình vali, sách không rơi. Luồng giải đổi: vali trước, sách sau. Gợi ý theo giờ ở phòng làm việc chỉ vào vali khi chưa có vali.
**G4-35.** Đệm dựng ở **sau** tủ đầu giường (giữ G4-31); khi đổ xuống nằm, đệm ở **trước** (layer cao hơn) tủ đầu giường. Đổi lớp ngay lúc đệm chạm sàn, không chớp.
**G4-36.** Chạm tất trên đèn: tất nhún nhẹ rồi **nhảy theo đường cong lên mặt giường**, đáp nảy nhẹ, nằm lại trên giường tới hết màn (vật con của giường), 5 Cá khô như cũ.
**G4-37.** 3 cuốn sách rơi **vừa rơi vừa xoay từ dựng đứng sang nằm ngang**, đáp **khít** lên nhau thành đúng chồng sách (cuốn sau đáp đúng lên mặt cuốn trước, không lệch, không nhảy hình khi đổi sang ảnh chồng sách). Nếu ảnh một cuốn xoay 90° không khớp tầng của chồng sách (gáy, độ dày, góc nhìn), **Art cho Codex vẽ thêm 3 ảnh sách nằm ngang** đúng từng tầng của `l4_book_stack` (chỉnh sửa từ ảnh chồng sách + kèm demo gốc, G4-26) để code đổi ảnh giữa chừng lúc xoay. Art và Dev bàn, Dev quyết cách ráp.

Đặc tả đã sửa: `levels/levels-01-10.md` (bảng đồ vật 2, 5, 9; luồng giải; chạm sai), `levels/states-01-10.md` (dòng 2, 5, 9; thêm `l4_sock_flat` nếu cần).

### Art – Vòng 9 (G4-36, G4-37)
- **A4-36.** G4-37: Art thử xoay 90° 3 sách đứng: không khớp tầng chồng sách (bìa nghiêng, khác dáng cuốn dẹt). Dev chốt cắt thẳng 3 tầng từ chính `l4_book_stack.png` trong code (hồng y 8–57, bạc hà 55–95, vàng y 93–131 trên ảnh 301x139), nên **không vẽ** `l4_book_flat_*`. Nếu sửa `l4_book_stack` sau này phải giữ 3 dải y đó hoặc báo Dev.
- G4-36: thêm `l4_sock_flat` (tất duỗi nằm, cùng sọc hồng phấn–kem với `l4_sock_stuck`), Codex chỉnh sửa từ ảnh `l4_sock_stuck` + demo phòng ngủ (lời giao `art/review/l4_v9_sock_brief.md`, tờ `l4v9_sock_sheet`). Cắt: rộng 170, neo đáy, đặt (760, 850) trên mặt chăn bên phải gối (bảng mục 6). Ảnh kiểm: `art/out/_check/l4_v9_sock_on_bed.jpg`. Chưa commit.

### Dev – Vòng 9 (G4-34…G4-37)
- **D4-35.** Ráp 4 góp ý chủ dự án, chơi thử `?level=4`, ảnh trong game ở `art/review/l4_dev_check/9a…9g`:
  - G4-34: chưa có vali trong túi thì chạm kệ chỉ lung lay khẽ + bong bóng suy nghĩ nhỏ (`ui_thought_bubble`, rộng 170, trên góc phải kệ) có icon `l4_suitcase_folded`, tắt sau 1,5 giây; sách không rơi (`9e_shelf_locked`). Gợi ý theo giờ đi theo thứ tự tháp (đệm → vali → sách → gối) nên ở phòng làm việc luôn chỉ vali trước kệ.
  - G4-35: đệm dựng giữ lớp sau tủ đầu giường suốt lúc đổ; khung phần vẽ co giãn dần từ khung đệm dựng sang đúng khung đệm nằm, lúc chạm sàn đổi ngay sang ảnh đệm nằm ở lớp trước tủ (cùng khung nên không chớp, không mờ chồng), nhún nhẹ (`9a_mattress_falling`, `9b_mattress_fallen_sock_lamp`).
  - G4-36: chạm tất: 5 Cá khô, tất nhún rồi đổi sang `l4_sock_flat` và nhảy theo đường cong (0,62 giây) lên (760, 850) trên chăn, đáp nảy nhẹ, nằm lại trên lớp giường tới hết màn (`9c_sock_jumping`, `9d_sock_on_bed`). Chưa có ảnh thì tạm xoay ảnh tất vắt.
  - G4-37: không dùng ảnh sách nằm riêng (A4-36). Mỗi cuốn đứng rơi từ chỗ của nó trên kệ, xoay 0→90° và dài ra bằng bề rộng tầng; từ 40% đến 80% đường bay mờ dần sang **lát cắt đúng tầng đó của `l4_book_stack`** (cùng trục xoay), đáp đúng chỗ tầng đó (vàng dưới, bạc hà giữa, hồng trên). Đủ 3 cuốn thì hiện ảnh chồng sách: so pixel ngay trước/sau lúc đổi trùng khít, không nhảy hình (`9f_books_turning`, `9g_books_landed` cạnh demo).
  - Dev tool: `dev_server.py` nhận POST `/save?art/review/...` (chỉ ghi trong `art/review/`), harness có `shot(path, demo?)` để chụp khi khung trình duyệt bị ẩn.
  - Chưa commit.
- Art xem ảnh trong game Vòng 9 (D4-35: 9b, 9c, 9d, 9f, 9g): tất trên đèn đúng demo; tất nhảy và nằm ở (760, 850) trên mặt chăn, dưới gối, cùng màu sọc với tất trên đèn; 3 sách rơi xoay rồi đáp thành chồng hồng, bạc hà, vàng từ trên xuống, đủ cả chồng, không bị túi đồ che; kệ thiếu đúng 3 cuốn hàng trên. **Đạt.** Chờ GD chơi kiểm.
- **D4-36.** Sửa lỗi G4-37 do GD báo (sách rơi nửa trong suốt, thấy gáy sách trên kệ xuyên qua): bỏ mờ dần. Sách đứng đặc 100% tới lúc xoay 45° (nửa đường bay), cùng khung đó đổi thẳng sang lát tầng của `l4_book_stack` cũng đặc 100%. Đã đếm mọi khung của cảnh sách rơi (83 khung): không có sprite nào có độ mờ giữa 0 và 1. Ảnh phóng to: `l4_dev_check/10a_book_turn_450ms.jpg` (sách đứng đang xoay), `10b_book_turn_520ms.jpg` (đã đổi sang lát nằm). Chưa commit.

## Vòng 10 – Chủ dự án chơi thử, góp ý tiếp

Nguyên văn: "mèo lộn xuống ngồi trên sàn đang bị rung hơi quá, chỉ giữ lại lắc thôi. đệm lúc scale xuống cho layer cao hơn tủ đầu giường luôn. tất nhảy lên giường cho giữ nguyên hình ảnh, chỉ xoay vòng liên tục lúc đang nhảy sang. chồng sách rớt từ tủ xuống cho cao hơn 1 chút". Kèm ảnh chụp đệm đang đổ còn nằm sau tủ đầu giường.

**G4-38.** Đệm: ngay khi chạm và bắt đầu đổ (đang co xuống), đệm đã ở lớp **trước** tủ đầu giường. Chỉ lúc đứng yên chưa chạm mới ở sau tủ.
**G4-39.** Tất nhảy lên giường **giữ nguyên ảnh tất trên đèn** (`l4_sock_stuck`, bỏ `l4_sock_flat`), **xoay vòng liên tục** suốt lúc bay, đáp nằm trên chăn.
**G4-40.** Cao trào: Sữa lộn xuống ngồi trên sàn **bỏ rung** (rung quá mạnh), chỉ giữ **lắc lư nhẹ**.
**G4-41.** Chồng sách rơi từ kệ xuống đặt **cao hơn một chút** (gợi ý y 1170 → khoảng 1110), vẫn thấy trọn, không đè kính lặn và đồ bung khác; sách rơi đáp đúng chỗ mới.

### Dev – Vòng 10 (G4-38…G4-41)
- **D4-37.** Ráp 4 góp ý, chơi thử `?level=4` hết màn, ảnh ở `art/review/l4_dev_check/11a…11e`:
  - G4-38: đệm dựng đứng yên ở sau tủ đầu giường; vừa chạm là lên lớp trước tủ (độ sâu 14 > tủ 12) rồi mới co xuống (`11a_mattress_falling_front`).
  - G4-39: tất giữ nguyên ảnh `l4_sock_stuck` (không dùng `l4_sock_flat`), xoay quanh tâm hình 2 vòng liên tục suốt đường cong 0,7 giây; đáp về góc ban đầu (0°), nảy nhẹ, nằm trên chăn ở x 760 bên phải gối, lún nhẹ vào mép chăn (`11b_sock_spinning`, `11c_sock_on_bed`).
  - G4-40: Sữa ngồi liếm chân bỏ nhịp rung nhanh (±3°, 0,5 giây); chỉ lắc lư nhẹ ±2° theo sóng sin, một chu kỳ 2,6 giây, bắt đầu từ 0° nên không giật (`11e_sua_sitting_sway`, cạnh demo).
  - G4-41: chồng sách ở (160, 1110) theo bảng mục 6 (Art đã sửa). Đo trong game: chồng sách x 2123–2312 (phòng 75–264), y 1028–1109; kính lặn đáy 999, nên hai món cách nhau 29px, không chạm. 3 cuốn rơi đáp đúng chỗ mới, khít như cũ (`11d_books_landed`, cạnh demo).
  - Chưa commit.
- Art xem ảnh trong game Vòng 10 (D4-37: 11b, 11c, 11d): chồng sách đáp ở (160, 1110), thấy trọn, cách kính lặn ~29px, không đè đồ bung; tất `l4_sock_stuck` xoay lúc bay và nằm trên chăn cạnh gối, cùng cỡ và màu với tất trên đèn. Bảng mục 6 đã sửa `l4_book_stack` 1110, bỏ dòng `l4_sock_flat`. **Đạt.** Chờ GD chơi kiểm.

## Vòng 11 – Chủ dự án chơi thử, góp ý tiếp

Nguyên văn: "tất bay thấp xuống 1 chút nữa. đồ đặt lên sai vị trí thì back về lắc lắc, không cần phải lắc ở vị trí sai nữa".

**G4-42.** Tất nhảy từ đèn lên giường: đường cong bay **thấp hơn một chút** (đỉnh cung thấp xuống), vẫn xoay vòng liên tục, chỗ đáp trên chăn giữ nguyên.
**G4-43.** Thả món sai thứ tự lên tháp: **không chao nghiêng ở tháp nữa**. Món bay thẳng về ô của nó trong túi, về tới ô thì **lắc lắc** một nhịp ngắn. Sữa trên rèm vẫn nghiêng đầu theo.

### Dev – Vòng 11 (G4-42, G4-43)
- **D4-38.** G4-42: đỉnh đường cong tất từ đèn lên giường hạ từ 170 xuống 100px; vẫn xoay 2 vòng liên tục, chỗ đáp trên chăn giữ nguyên (`l4_dev_check/12a_sock_lower_arc.jpg`, giữa lúc bay). G4-43: thả món sai thứ tự lên tháp không còn chao nghiêng ở tháp. Món bay thẳng về ô của nó trong túi (0,3 giây), về tới ô thì lắc ngang một nhịp ngắn (`shakeNo` chung với L3) kèm `sfx_wrong`; Sữa trên rèm vẫn nghiêng đầu (`12b_wrong_item_shake_in_bag.jpg`: gối thả sai, đang lắc trong ô 1). Chưa commit.

**G4-42 (sửa lại, chủ dự án nói rõ):** "ý tôi là điểm đáp của tất thấp hơn chút". GD hiểu nhầm thành hạ đường bay. Đúng là: **chỗ tất đáp trên chăn thấp xuống một chút** (khoảng 30–40px, vẫn nằm trên mặt chăn, không rơi khỏi giường, không đè gối). Đường bay trả lại độ cao cũ (đỉnh cung 170px như D4-37).
- **D4-39.** G4-42 sửa lại theo ý chủ dự án ("điểm đáp của tất thấp hơn chút"): đỉnh đường cong tất trả về 170px như trước D4-38. Chỗ tất đáp trên chăn hạ thêm 35px (`SOCK_BED_DROP`). Đáy tất cách mép trên chăn khoảng 55px, nằm trọn trên mặt chăn (phần vẽ tất x 720–800, y 740–822; chăn y 767–1036), không đè gối, không rơi khỏi giường (`l4_dev_check/13a_sock_lower_landing.jpg`). Chưa commit.

## Vòng 12 – Chủ dự án chơi thử, góp ý tiếp

Nguyên văn: "đoạn mở vali cần thêm chút effect khói gì đó để đỡ bị thô. nhân vật lúc đưa tay lên với mèo chưa đúng với hình nhân vật ở demo". Kèm ảnh cảnh cao trào trong game.

**G4-44.** Vali bung (chạm lần 1): thêm **cụm khói bụi pastel mềm** phụt ra quanh vali lúc nắp bung, nở ra rồi tan trong khoảng 0,5–0,7 giây, che bớt chỗ đổi ảnh vali đầy → vali gấp cho đỡ thô. Khói vẽ cùng phong cách (bút chì màu, kem/trắng ngà, viền nâu nhạt mảnh), không glow. Chỉ riêng vali; đệm vẫn không bụi (G4-21).
**G4-45.** `player_reach_up` chưa giống demo phòng khách (`art/out/demo/l4_demo_living.png`). Demo: nhân vật **nghiêng 3/4 quay lưng-hông về phía người xem, mặt nghiêng nhìn ngửa lên phía trên-trái về Sữa**, hai tay vươn lên chéo trái tới gần chân Sữa, mái tóc xoăn bồng phía phải đầu, người hơi ngả về trái. Ảnh hiện tại: nhân vật quay thẳng ra trước, hai tay giơ thẳng, mặt hướng về người xem. Art cho Codex vẽ lại `player_reach_up` **chỉnh sửa theo đúng dáng nhân vật trong demo** (kèm demo gốc, G4-26; tham chiếu `player_ref`), cùng cỡ, cùng đường đáy với `player_silly_laugh`; Dev ráp đúng vị trí như demo (tay chạm gần chân Sữa).

### Art – Vòng 12 (G4-44, G4-45)
- **A4-37.** G4-45: `player_reach_up` vẽ lại theo đúng dáng demo (Codex chỉnh sửa từ ảnh cắt nhân vật trong `l4_demo_living.png` ×2, kèm demo gốc, `player_ref`, `player_silly_laugh`; lời giao `art/review/l4_v12_player_brief.md`, tờ `l4v12_player_sheet`): nghiêng 3/4, lưng-hông về phía người xem, mặt ngửa nhìn lên trái, hai tay vươn chéo lên trái, tóc bồng phía phải. Cắt cao 500, neo đáy; cùng tỉ lệ với `player_silly_laugh` (đo theo bề ngang đôi dép: 249 / 433 → khớp cao 500). Đặt như cũ x 340, chân trên mặt gối của tháp (y từ tháp ≈ 870): đầu ngón tay y ≈ 370, ngay dưới chân Sữa (≈ 365), tay x 199–379 dưới Sữa x 211–319, như demo. Ảnh kiểm: `art/out/_check/l4_v12_player_vs_demo.jpg`. `player_silly_laugh` giữ nguyên (dáng đứng thẳng cười gãi đầu, không cần sửa hướng).
- G4-44: khói theo đề xuất Dev: `fx_dust_puff`, `fx_dust_puff_b` (thư mục common, nền trong suốt, kem/trắng ngà, viền nâu nhạt mảnh, vân chì, không glow), tờ `fx_dust_sheet`, rộng 300 / 305, neo tâm. Code phụt 6–7 cụm quanh vali, nở 0,4 → 1,2, trôi lên 30px, mờ trong 0,6 giây. Chưa commit.
- **D4-40.** Vòng 12.
  - G4-44: vali bung (chạm lần 1) phụt 7 cụm khói, xen kẽ `fx_dust_puff` / `fx_dust_puff_b` (A4: common, neo tâm).
    - Các cụm toả nửa trên vali, cỡ 0,45–0,65 bề rộng vali.
    - Mỗi cụm xoay ngẫu nhiên ±30°, nở 0,4 → 1,2 lần, trôi lên 30px trong 0,6 giây, mờ dần từ 0,22 giây.
    - Lớp khói 15: trên vali (13), dưới đồ bay ra (17).
    - Khói phụt cùng lúc nắp bung (0,3 giây sau chạm), che đúng lúc đổi ảnh vali đầy → gấp (0,55–0,7 giây).
    - Ảnh: `14a_suitcase_dust_mid.jpg`, `14b_suitcase_dust_swap.jpg`, `14c_suitcase_after.jpg`.
    - Đệm vẫn không có bụi. Nếu thiếu ảnh khói, code vẽ tạm cụm tròn kem viền nâu.
  - G4-45: đã nạp `player_reach_up` mới (nghiêng 3/4, tay vươn chéo trái). Vị trí không đổi (x 340, chân trên mặt gối của tháp).
    - Trong game: phần vẽ nhân vật x 193–491, y 370–870.
    - Đầu ngón tay y 370, ngay dưới chân Sữa (Sữa x 211–320, đáy 365), khớp demo (`14d_climax_reach_vs_demo.jpg`).
    - `player_silly_laugh` cùng đường đáy 870, cùng điểm neo x, nên lúc đổi không nhảy vị trí (`14e_found_laugh.jpg`).
  - Chưa commit.
- Art xem ảnh trong game Vòng 12 (14a, 14b, 14d, 14e): cao trào khớp demo (dáng nghiêng 3/4, tay vươn chéo, ngón tay ngay dưới chân Sữa, cùng cỡ với tháp); dáng cười `player_silly_laugh` cùng đường đáy 870, đổi dáng không lệch cỡ. Khói kem viền nâu mảnh, không glow, phủ đỉnh vali lúc bung rồi tan, đồ bay ra vẫn thấy rõ. **Đạt.** Chờ GD chơi kiểm.

**Chủ dự án duyệt Vòng 12:** "dáng nhân vật ổn rồi, nhưng outline lại đang bị dày và đậm hơn với ảnh khác, hãy promt sửa thật kỹ với codex nhé, codex ngốc lắm".

**G4-46.** Giữ nguyên **dáng** `player_reach_up` (đã duyệt). Chỉ sửa **nét viền**: hiện dày gần gấp đôi và đậm (nâu gần đen, đều tay kiểu vector) hơn `player_silly_laugh`/`player_ref`; tóc cũng tối hơn. GD so cùng cỡ: `art/review/l4_gd_check/v12_outline_cmp.jpg` (trái reach_up, phải silly_laugh). Đích: nét **mảnh, nhạt, nâu ấm #6B4A3A**, đậm nhạt như bút chì, giống hệt `player_silly_laugh` (viền áo ngả nâu vàng nhạt, viền quần ngả nâu xanh nhạt); màu tóc và mảng màu như `player_silly_laugh`. Art viết lời giao việc thật kỹ (chỉnh sửa từ ảnh, kèm ảnh mẫu nét, ràng buộc không đổi dáng), tự đo độ dày nét trước/sau, chồng ảnh kiểm dáng không lệch; Codex làm sai thì làm lại có góp ý cụ thể.
- **A4-38 (G4-46).** Sửa nét `player_reach_up`: Codex chỉnh sửa từ ảnh gốc cỡ lớn (`l4v12_player_sheet`, nguồn của `player_reach_up.png`), mẫu nét chính là `player_silly_laugh` phóng về cùng tỉ lệ (`art/ref/l4_v6_input/silly_laugh_same_scale.png`), kèm `player_ref`, `owner_l1_style_ref`, demo phòng khách (G4-26); lời giao `art/review/l4_v12b_player_brief.md` (tiếng Anh, có số px). Đạt ngay lượt 1, tờ `l4v12b_player_sheet`. Art đo trên ảnh xuất (cùng res 1.5):
  - viền ngoài: cũ 5.7px → mới **4.0px**, bằng `silly_laugh` 4.0px;
  - màu viền trung bình: cũ RGB(126,80,54), 5% tối nhất lum 68 (gần đen) → mới RGB(156,102,71), lum 97 (không còn gần đen; silly 74);
  - tóc (độ sáng TB / tương phản): cũ 115 / 30 → mới 136 / 25 (silly 126 / 26);
  - dáng: chồng 50% không lệch, IoU alpha 0.97, khung vật 774x1302 so với 778x1304; neo đáy (231, 758) (trước 229, 758). Đầu ngón tay vẫn y ≈ 370 dưới chân Sữa.
  - Ảnh kiểm: `art/out/_check/l4_v12b_outline_old_new_silly.jpg` (cũ | mới | silly), `l4_v12b_overlay_50.jpg`, `l4_v12b_player_vs_demo.jpg`. Bản cũ giữ ở `art/out/_refs/player_reach_up_v12a.png`. Chưa commit.
- **D4-41.** G4-46: đã nạp `player_reach_up` nét mới (neo đáy (231, 758), ảnh 462x766). Không phải sửa code.
  - Trong game: nhân vật x 193–490, y 370–870, điểm neo x 340. Đầu ngón tay y 370, ngay dưới chân Sữa (Sữa x 211–320, đáy 365).
  - `player_silly_laugh` cùng đường đáy 870, cùng điểm neo x 340.
  - Ảnh `l4_dev_check/15a_reach_laugh_demo.jpg`: với tay | cười | demo.
  - Chưa commit.
- Art xem ảnh trong game G4-46 (D4-41, `15a_reach_laugh_demo.jpg`): `player_reach_up` nét mảnh, nâu ấm, cùng tay nét với `silly_laugh` và đồ trong phòng; dáng và vị trí như demo, ngón tay ngay dưới chân Sữa; đổi sang dáng cười không nhảy. **Đạt.** Chờ GD chơi kiểm.

**A4-39 (Art, theo câu hỏi Dev qua GD 2026-10-30). Tháp sách dùng chung ảnh `l4_book_stack`.**
- `l4_book_stack.png` và `l4_stack_books.png` trùng từng byte (cùng cắt từ `l4v8_books_sheet`, đúng ý đặc tả "cùng món cùng ảnh" từ Vòng 7–8). Không cần ảnh riêng.
- Chốt giữ **`l4_book_stack`** (ảnh dưới sàn, icon túi, lát cắt từng tầng khi sách rơi đều dựa vào nó). Bỏ key `l4_stack_books` khỏi design-art-level4 (bảng key, mô tả, bảng tờ).
- Dev: tầng sách trên tháp nạp texture `l4_book_stack` (giữ cỡ trên tháp như hiện tại), bỏ `l4_stack_books` khỏi danh sách nạp. Xoá file `art/out/level4/l4_stack_books.png` và mục của nó trong `anchors.json` sau khi Dev đổi xong.
