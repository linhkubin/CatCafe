# Level 8 – Tắm cho Mun: thảo luận

## 2026-10-31 · Dev 2: bản khối (QUY-TRINH bước 2)

**Mở:** `http://127.0.0.1:8090/game/l8.html?level=8` (máy chủ Team 2: `python game/tools/dev_server.py 8090`). Thêm `&clock=1` để hiện số giây đã chơi.

**File (đều mới, không sửa file dùng chung):**
- `game/src/level8.js`: cả màn. Key ảnh, lớp, chỗ đặt theo `states-01-10.md` Level 8; ảnh là khối có nhãn.
- `game/src/l8_entry.js` + `game/l8.html`: lúc chạy thì gắn `KEYS[8]`, thêm 8 vào `LEVELS`, rồi thêm scene `Level8`. Khi có worktree riêng thì đăng ký chính thức (thêm 8 vào `KEYS` trong assets.js, `LEVELS` trong progress.js, scene trong main.js) và bỏ hai file này.

**Đã làm:** mở màn (theo G8-1) · bong bóng nhiệm vụ Mun bẩn → mũi tên → Mun sạch · kéo tự do nhưng ép thứ tự đủ 10 bước · dụng cụ vuốt (tiến độ tính khi dụng cụ nằm trên chỗ cần làm và đang di chuyển; chỗ cần làm nhạt dần; thả tay vẫn giữ tiến độ) và dụng cụ thả · khay đổi theo chặng, trượt xuống/lên mỗi chiều 0,25 giây, khoá kéo trong lúc trượt · khay dùng `ui_bag_bar` + `ui_bag_slot` hiện 2–4 ô căn giữa (G8-1) · dụng cụ dùng xong mờ 50% · sai bước: `wiggle` dáng hiện tại + liếc về dụng cụ đúng + chỗ cần làm nhấp nháy mạnh; 2 phản ứng riêng (vòi sen bước 4–6 → `mun_bath_shake`; máy sấy bước 8 → lắc + hạt nước bắn xa) · chạm Mun cho vui (ướt: lắc mình, giọt đọng trên màn 1 giây; khô: dụi đầu, rừ rừ) · vịt 🎁 5 cá khô · gợi ý 8s/16s/💡 (💡 với dụng cụ vuốt: bàn chân làm mẫu một đường vuốt) · liếm lông → lè lưỡi → Lộ diện → chạm → cảnh bế chung (thêm bong bóng bay) · thưởng 30 cá khô · rung máy khi ké bật và khi xong bước.

**Đã kiểm:** trước khi có chốt "không tự chơi thử", Dev 2 tự chơi tới bước 3: mở màn, sai dụng cụ (lắc đầu), thả ngoài Mun (về khay, không phạt), chạm Mun (lắc mình), kéo lá chưa đủ xa (lá dính lại), 3 lá, lược thưa đều chạy đúng. Lần đó lộ một lỗi (nhấc lại dụng cụ đang bay về khay thì không nhấc được), đã sửa. **Từ bước 3 tới cảnh bế chưa ai chạy thử**, cần chủ dự án chơi.

## Điểm cần GD chốt (đặc tả thiếu hoặc vướng)

1. **Đồng hồ 150 giây:** chưa màn nào có đồng hồ hiện trên màn hình, đặc tả cũng không nói hết giờ thì sao. Bản khối chỉ đếm ngầm (in ra console lúc Lộ diện, `&clock=1` để hiện). Có cần hiện đồng hồ hay xử lý hết giờ không?
2. **Ảnh trong bong bóng nhiệm vụ:** danh sách ảnh chưa có key cho "Mun lấm bùn" và "Mun sạch lấp lánh". Bản khối tạm đặt `l8_icon_mun_dirty`, `l8_icon_mun_clean`. Art chốt key.
3. **`mun_bath_foam` có vẽ bọt không?** Bọt đang là lớp phủ riêng `l8_foam` (to dần ở bước 5, nhạt dần ở bước 7). Nếu ảnh dáng cũng vẽ bọt thì ở bước 7 bọt không tan được. Bản khối: dáng chỉ là thân bết nước, mắt híp.
4. **Nhạc thêm lớp theo chặng:** game chưa có nhạc nền. Tạm phát một tiếng "tưng" khi khay mới trượt lên.
5. **"Liếc về dụng cụ đúng":** khối không có mắt, nên Mun nghiêng về phía dụng cụ đúng, kèm dụng cụ đó nảy nhẹ trong khay. Cú nảy gần như một gợi ý; GD chốt có giữ không.
6. **Bước 1 "thả ra ngoài chậu":** bản khối tính lá đã gỡ khi thả ngoài vùng Mun, như cột "Điều kiện xong" trong states.
7. **Dụng cụ đúng bước nhưng thả lệch chỗ** (ví dụ dầu tắm thả lên mặt, không phải lưng): đặc tả không nói. Bản khối: về khay, chỗ cần làm nhấp nháy, Mun không lắc đầu.
8. **Khung 2:3 cũ (1024x1536):** khay đè lên thành chậu. Khung 9:16 và dài hơn thì không sao.

## 2026-10-31 · GD 2 trả lời (G8-2, ghi trong `states-01-10.md` mục L8)

1. **Đồng hồ:** không hiện, không đếm, không thua (luật chung "không thua, không đếm giờ"). 150 giây chỉ là thời lượng thiết kế. Giữ `&clock=1` để đo.
2. **Ảnh trong bong bóng:** giữ `l8_icon_mun_dirty` / `l8_icon_mun_clean` (đã có trong danh sách ảnh).
3. **`mun_bath_foam` không vẽ bọt:** chỉ là dáng ướt, mắt híp. Bọt là lớp `l8_foam` riêng, như bản khối đang làm.
4. **Nhạc nền:** chưa có. Bỏ phần thêm lớp nhạc trong bản khối, để sẵn chỗ móc vào. Dev 2: đã bỏ tiếng "tưng" lúc đổi chặng, thay bằng hàm trống `musicLayer(n)`.
5. **Nghiêng đầu + dụng cụ đúng nảy nhẹ:** được.
6. **Dụng cụ đúng nhưng thả lệch chỗ:** chỉ về khay, không lắc đầu. Bản khối đã làm đúng như vậy.

Bản khối giữ nguyên, chờ chủ dự án test. Máy chủ cổng 8090 để chạy.

## 2026-10-31 · Chủ dự án: "làm game thú vị hơn, mèo chỉ ngồi trên ghế nhựa, vòi nước treo sẵn, khăn treo sẵn"

Dev 2 đã sửa bản khối (chưa sửa `levels/`, GD cập nhật đặc tả):
- **Bỏ chậu tắm.** Mun ngồi trên **ghế nhựa** `l8_stool_plastic` giữa phòng, cùng chỗ và cùng cỡ như trước. Bỏ `l8_tub_back`, `l8_tub_front` và mặt nước trong chậu.
- **Vòi sen treo sẵn** trên móc tường phải (`l8_shower_hook`). Ống mềm vẽ bằng code, nối xuống van trộn `l8_shower_mixer`, võng xuống và đi theo tay. Kéo vòi sen từ móc; thả ra thì vòi bay về móc và đung đưa.
- **Khăn bông treo sẵn** trên thanh treo tường trái (`l8_towel_rack`, `l8_tool_towel` giờ vẽ dáng khăn vắt). Kéo khăn thả lên Mun để quấn. Bắt đầu sấy thì khăn tuột ra, bay vòng về vắt lại lên thanh (mờ, vì đã dùng xong).
- **Khay chỉ còn món cầm tay:** chặng 1: lược thưa · chặng 2: khăn mặt, bông tắm, dầu tắm · chặng 3: máy sấy, lược chải. Vòi sen và khăn mờ khi dùng xong bước cuối của cả màn (vòi sau bước 7, khăn sau bước 8).
- **Thêm cho vui:**
  - Kéo vòi sen ra lúc nào cũng xịt nước, kể cả khi chưa tới bước dùng nó.
  - Nước (trong, nâu bùn, trắng bọt) chảy xuống sàn thành **vũng loang dần** quanh chân ghế; có lỗ thoát nước `l8_floor_drain`.
  - Vịt cao su 🎁 giờ nằm dưới sàn: vũng nước loang tới thì vịt nổi bập bềnh; xịt vòi sen gần vịt thì vịt xoay tít, kêu chít (ngoài lần thưởng 5 cá khô khi chạm lần đầu).
- **Key ảnh mới:** `l8_stool_plastic`, `l8_shower_hook`, `l8_shower_mixer`, `l8_towel_rack`, `l8_floor_drain`. Bỏ `l8_tub_back`, `l8_tub_front`.
- **GD cần sửa trong đặc tả:**
  - Bố cục, lớp hiển thị, bảng khay theo chặng, vị trí vịt.
  - Câu "nước trong chậu đục dần / trong lại" đổi thành vũng nước trên sàn.
  - Tên bí mật: vịt giờ nằm dưới sàn, không còn "trong góc chậu".

## 2026-10-31 · G8-3 (GD 2 đã cập nhật đặc tả theo bản ghế nhựa)

- Đã thêm: kéo vòi sen đang xịt qua người Mun ở các bước khác 3 và 7 thì Mun đổi sang `mun_bath_shake` (rụt cổ, lắc mình bắn nước), tối đa 1,5 giây một lần. Thả vòi sen lên Mun ở bước 4–6 vẫn có phản ứng sai riêng như cũ.

**A8-3 (Art 2D 2, trả G8-3, 2026-10-31).** Đã sửa `design-art-level8.md` theo bản ghế nhựa:
- Bỏ `l8_tub_back`, `l8_tub_front`. Thêm đặc tả 5 món mới (cỡ tạm theo khối `level8.js`): `l8_stool_plastic` 260x200 neo đáy (xanh bạc hà nhạt, mặt ngồi elip), `l8_shower_hook` 70x60, `l8_shower_mixer` 120x80 (đầu nối ống ở đáy cho code nối ống), `l8_towel_rack` 220x40 (thanh trống), `l8_floor_drain` 90x40. Vịt nằm dưới sàn.
- `l8_tool_shower`: cùng một ảnh lúc treo và lúc kéo, đuôi cán có đầu nối ống (ống code vẽ). `l8_tool_towel`: dáng khăn vắt 170x230, cùng màu và sọc với khăn quấn `mun_bath_towel`.
- 10 dáng `mun_bath_*`: thấy đủ chân, mông, đuôi; đáy là mặt ghế; đuôi được rủ qua mép ghế ≤ 40 px. Dáng cao hơn rộng nên mỗi tờ chia 3 + 2 ô hoặc dùng tờ dọc (chốt với Dev 2 ở bước 3); vẽ ghế trước để làm ảnh dẫn đáy cho tờ Mun.
- Lượt tách 1 thành: nền (ảnh lẻ) + 6 món trong cảnh. Ước tính ≈ 35 ảnh (25 món lẻ + 10 dáng Mun).
- Câu hỏi cho Dev 2 ở bước 3: (1) Mun neo đáy y 1110 nhưng mặt ghế khối ở y ≈ 1102: chốt một đường đáy chung; (2) đầu nối ống của vòi sen và van: Dev cần điểm neo riêng (toạ độ đầu ống trong ảnh) hay tự đo?

## 2026-10-31 · G8-4 (góp ý chủ dự án qua GD 2), Dev 2 đã sửa bản khối

1. **Vòng tiến độ:** mỗi chỗ cần làm của bước vuốt và từng chiếc lá có một vòng tròn kem viền nâu, đặt phía trên bên phải chỗ đó, tô xanh đầy dần theo tiến độ. Đầy thì kêu "ting", vòng nảy to rồi biến mất (mỗi lá đầy ngay khi gỡ; mỗi mảng bùn có vòng riêng). Bước thả (khăn bông) không có vòng.
2. **Dầu tắm thành dạng vuốt (1,5 giây):** di chai qua lại trên lưng, giọt dầu nhỏ xuống, vệt `l8_oil_streak` dài dần theo tiến độ. Xong thì Mun rùng mình.
3. **Vịt:** bị xịt gần thì nhảy 3 nhịp và kêu chít, không xoay nữa.
4. **Đầu vòi sen quay sang trái** (về phía Mun) cả lúc treo lẫn lúc kéo. Tia nước ra từ đầu vòi; ống mềm nối vào đuôi tay cầm bên phải.
5. **Bong bóng biểu cảm** trên đầu Mun (phía trên bên phải), hiện 0,8 giây rồi tắt:
   - `ui_emote_mun_happy` (mặt mèo đen mắt cong, cười) khi gỡ được một lá, sạch một mảng bùn, hoặc xong một bước.
   - `ui_emote_mun_no` (mắt > <, miệng méo, giọt mồ hôi) khi thả dụng cụ sai lên Mun. Thêm cả lúc xịt vòi sen vào Mun sai bước (G8-3), vì cũng là dùng sai.
- Chờ GD 2: mục "thêm một cục hạt kê" (đang hỏi lại chủ dự án).

## 2026-10-31 · G8-4b (GD 2 chốt "cục hạt kê"), Dev 2 đã sửa bản khối

- **Bước 1 (tay): có 6 thứ cần gỡ.**
  - 4 lá khô: đỉnh đầu, lưng, hông, chân sau (`l8_leaf_d` mới).
  - 2 cành nhỏ vướng lông: `l8_twig_a` ở lưng, `l8_twig_b` ở đuôi.
  - Cành nặng hơn lá: lúc chưa rời thì nhúc nhích ít hơn, phải kéo xa hơn mới rời (200px, lá chỉ cần 130px), rời rồi vẫn theo tay chậm. Thả ra ngoài Mun thì cành rơi "cạch" xuống sàn và nằm lại đó, không bay đi như lá.
  - Mỗi thứ có một vòng tiến độ, đầy ngay khi gỡ.
- **Bước 2 (lược thưa): 2 chỗ cần làm, làm chỗ nào trước cũng được.** Chùm ké ở đuôi và cục hạt kê `l8_millet_clump` ở hông, cạnh chùm ké. Mỗi chỗ một vòng tiến độ, khoảng 1,5 giây. Chải hạt kê thì hạt vàng nhỏ rơi lả tả xuống sàn, kêu lách tách. Ké bung hết thì đuôi vẫy.
- Bong bóng `ui_emote_mun_no` khi xịt vòi sen sai bước: giữ, theo GD 2.

**A8-4 (Art 2D 2, trả G8-4, 2026-10-31).** Đã sửa `design-art-level8.md`: thêm `l8_leaf_d`, `l8_twig_a`, `l8_twig_b`, `l8_millet_clump` (hạt vàng bơ, hạt to vừa đủ đọc, hạt rơi do code), `ui_emote_mun_happy`, `ui_emote_mun_no` (thư mục `common/`, chung một tờ, cùng bong bóng chỉ đổi mặt, không chữ, không dấu X); `l8_tool_shower` đầu sen quay sang trái về phía Mun. Vòng tiến độ do code. Cỡ, vị trí tạm theo khối `level8.js`. Lượt tách thành ~7 (lớp phủ chia 2 lượt), ước tính ≈ 41 ảnh (31 món lẻ + 10 dáng Mun). Chưa vẽ.

## 2026-10-31 · G8-5 (góp ý chủ dự án qua GD 2), Dev 2 đã sửa bản khối

1. **Một vòng tiến độ chung cho mỗi bước,** ở chỗ cố định cạnh trên bên phải Mun (x 792, y 646). Bỏ vòng riêng từng chỗ.
   - Vòng tăng theo tổng tiến độ của bước: bước 1 mỗi thứ gỡ ra thêm 1/6; bước 2 và 3 lấy trung bình các chỗ; các bước khác theo thời gian vuốt.
   - Đầy là xong bước: "ting", vòng nảy rồi tắt; bước sau bắt đầu lại từ 0.
   - Mỗi phần nhỏ xong (một lá, một mảng bùn, một cục hạt kê) chỉ có "ting" nhỏ, lấp lánh và bong bóng mặt vui.
2. **Khăn bông có thời gian:** thả lên Mun thì Mun đổi sang `mun_bath_towel`, dụi mặt khoảng 0,9 giây một lần, vòng đầy dần trong 2,5 giây. Đầy thì khăn tự tuột ra, bay về thanh treo, Mun về `mun_bath_wet`. Máy sấy không còn làm khăn tuột nữa.
3. **Bước 2 có 3 chỗ:** ké ở đuôi, `l8_millet_clump_a` ở hông, `l8_millet_clump_b` ở đỉnh đầu giữa hai tai (nằm dưới lá đầu, gỡ lá ra mới thấy rõ). Làm chỗ nào trước cũng được.
4. **Vòi sen:** giữ nguyên cách làm, chỉ tính tiến độ vào vòng chung.
5. **Gợi ý chỗ cần làm đều là vòng tròn sáng.** Gợi ý 16 giây làm vòng sáng hơn, 💡 làm vòng nhấp nháy mạnh.
6. **Kéo đồ mượt hơn:**
   - Nhấc lên là món phóng to và nội suy nhanh tới ngay dưới ngón tay (hằng số 25 ms, tới nơi khoảng 0,1 giây). Hết cảnh đứng yên rồi nhảy cóc 70px như trước.
   - Vị trí tính tiến độ và chỗ thả lấy theo ngón tay, không theo món đang nội suy.
   - Chạm rồi nhả không kéo: món về chỗ.
7. **Bọt nhỏ:** bỏ `l8_foam`, thay bằng `l8_foam_bubble_a/b/c` (3 cỡ).
   - Bông tắm đi tới đâu thì bọt nhỏ nở ở các điểm lưới (cách 44px) quanh đó, dần phủ thân Mun.
   - Xong bước 5 thì bọt phủ kín nốt chỗ còn trống.
   - Xả bọt (bước 7): bọt trong tầm tia nước vỡ "póc" hoặc trôi theo nước xuống sàn.
   - Bọt bay lên phòng cũng là vài bọt nhỏ.

## 2026-10-31 · GD 2: G8-6 (cho Art 2D 2, phiên Art đang tắt)

- Bỏ cục hạt kê ở hông `l8_millet_clump_a`. Chỉ còn `l8_millet_clump_b` trên đầu, cạnh chùm ké ở đuôi.
- Vòng tiến độ chỉ hiện khi dụng cụ chạm vào người Mun. Bước 1 Mun lắc nhẹ, không co nhỏ.
- Thêm hiệu ứng sinh động (danh sách trong `levels-01-10.md` mục L8, "Hiệu ứng cho sinh động"), đều làm bằng code và hạt, chưa cần ảnh mới.
- Art 2D 2 sửa `design-art-level8.md` theo khi mở lại. Vẫn chưa vẽ.

## 2026-10-31 · G8-6 (góp ý chủ dự án qua GD 2), Dev 2 đã sửa bản khối

- **A.** Bước 2 bỏ cục hạt kê ở hông. Chỉ còn ké ở đuôi và `l8_millet_clump_b` trên đầu; bỏ key `l8_millet_clump_a`.
- **B. Vòng tiến độ chỉ hiện khi đang chạm Mun:**
  - Tính là chạm khi: dụng cụ đúng bước đè lên người Mun, tay đang gỡ lá hoặc cành, hoặc khăn đang quấn.
  - Lần đầu chạm thì vòng nảy ra, đã tô sẵn phần làm được. Rời Mun quá 1 giây thì vòng mờ dần (0,3 giây); chạm lại thì nảy ra lại.
  - Đầy thì kêu "ting", vòng nảy rồi tắt. Bước sau vòng ẩn cho tới lần chạm đầu.
- **C. Bước 1:** lúc lá hoặc cành rời khỏi lông, Mun chỉ lắc người ±4° trong 0,3 giây và giật tai. Bỏ cú nhún khi gỡ lá trên đầu; không còn hiệu ứng co nhỏ nào.
- **D. Hiệu ứng** (code và hạt, không có ảnh mới):
  1. Lá bay theo đường cong, rơi lắc lư, xoay, kèm 3 vụn bụi. Cành rơi kêu "cạch", nảy 2 lần, lăn một chút rồi nằm lại trên sàn.
  2. Ké bật ra như bị bắn, nảy lách tách 2 lần trên sàn, lăn rồi mờ dần. Hạt kê rơi lả tả, nảy li ti.
  3. Vòi sen xịt lên Mun:
     - Giọt nước bắn tung quanh chỗ xịt; chỗ lông vừa xịt sẫm bóng lên rồi nhạt dần.
     - Thỉnh thoảng 1–2 giọt bắn lên màn hình, đọng 1 giây rồi chảy xuống.
     - Lúc xịt có hơi nước mờ bốc lên.
  4. Bùn tan: vệt nâu chảy dọc người Mun xuống mặt ghế, ra mép ghế rồi xuống sàn, hoà vào vũng.
  5. Vũng nước có gợn tròn ở chỗ giọt, ké, cành rơi xuống. Vịt đang nổi thì nhún theo gợn ở gần.
  6. Dầu tắm: giọt dầu lấp lánh khi chạm lưng. Gợn hương bay lên khỏi lưng, xen kẽ bông hoa nhỏ hồng–vàng và đường cong vàng mờ.
  7. Bọt nở ra rồi nảy nhẹ. Bọt to thỉnh thoảng lóe ánh cầu vồng pastel. Chà nhanh thì mỗi lần nở tới 4 bọt (chậm 1 bọt) và bọt bay lên dày hơn.
  8. Hắt xì: một chùm bọt bắn tung ra từ mặt; bọt sát mặt trên người Mun văng theo.
  9. Khăn bông rơi xuống phồng như cái dù, lả lướt hạ xuống rồi quấn lại, Mun xoay nhẹ. Lúc tuột ra, khăn bị hất tung lên rồi bay vòng về thanh treo.
  10. Máy sấy: Mun rung phần phật, khăn trên thanh lật phật theo gió (thổi sang trái). Giọt nước cuối (nửa đầu bước) rồi sợi lông nhỏ bay theo gió. Bọt còn bay trong phòng bị thổi bay đi.
  11. Chải lông: vệt sáng chạy theo lược, ngôi sao nhỏ lấp lánh trên lông.
  12. Xong chặng 1 và 2: Mun lắc mình cả người 0,7 giây, nước bắn tung toé ra xung quanh, có giọt lên màn hình; 0,8 giây sau mới đổi khay. Xong chặng 3: lông bông phồng lên rồi xẹp mượt, nằm trong nhịp đầu khoảnh khắc kết.
  13. Làm đúng liên tục trong một chặng thì lấp lánh khi xong mỗi phần to dần và nhiều hơn (tối đa 3 ngôi sao). Dùng sai hoặc sang chặng mới thì chuỗi đếm lại từ đầu.
  14. Mun sống động:
      - Đuôi: vẽ thêm đoạn chóp đuôi, vẫy chậm theo nhịp thở, vẫy mạnh một cái khi ké bung hết.
      - Mắt: chớp mắt mỗi 3–5,5 giây, chỉ ở dáng mắt mở tròn.
      - Tai: dụng cụ tới gần đầu Mun thì tai bên đó giật.
- **Cần Art lưu ý:**
  - Chóp đuôi và mí mắt là lớp code vẽ đè lên ảnh dáng Mun. Khi có ảnh thật, cần đuôi tách rời hoặc thêm ảnh mắt nhắm. Tai cũng vậy: hiện chỉ có vạch động, nên cần tai tách rời nếu muốn tai xoay thật.
  - Hiện chỉ có cú lắc mình cuối chặng là làm chậm việc tiếp theo, tối đa 0,8 giây.

## 2026-10-31 · G8-7 (góp ý chủ dự án qua GD 2), Dev 2 đã sửa bản khối

1. **Bong bóng nhiệm vụ mở màn:** chỉ còn mặt Mun lúc sạch `l8_icon_mun_clean` ở giữa, to hơn (rộng 150), quanh vẫn có vài bọt xà phòng. Bỏ hình Mun bẩn, mũi tên và key `l8_icon_mun_dirty`.
2. **Lắc mình cuối chặng chỉ là animation trên ảnh dáng hiện tại,** không đổi sang `mun_bath_shake`:
   - Mun xoay qua lại ±7° trong 0,56 giây.
   - Chặng 1 và 2: nước bắn bằng hạt, có giọt lên màn hình như trước.
   - Chặng 3: lông phồng lên rồi xẹp mượt bằng scale nhẹ, không có nước.
3. **Lắc xong, Mun chớp mắt một cái** (mí mắt code, 0,15 giây), rồi khay mới trượt lên. Từ lúc xong bước tới lúc khay bắt đầu đổi khoảng 0,9 giây. Chặng 3 không đổi khay: chớp mắt nằm trong nhịp đầu khoảnh khắc kết, trước lúc Mun liếm lông.

## 2026-10-31 · GD 2: G8-8 (cho Art 2D 2)

- Dầu tắm chia thành 5 vết dầu nhỏ: key mới `l8_oil_drop` (một vết tròn nhỏ, lấp lánh; code rải 5 lần). Bỏ `l8_oil_streak`.

## 2026-10-31 · G8-8 (góp ý chủ dự án qua GD 2), Dev 2 đã sửa bản khối

- **Dầu tắm thành 5 vết dầu nhỏ** `l8_oil_drop` (giọt tròn bẹt vàng nhạt, có chấm sáng). Bỏ `l8_oil_streak`.
  - Di chai trên vùng lưng và hông: cứ mỗi 150px đường di, một giọt từ miệng chai rơi xuống ngay dưới chai và đáp thành một vết.
  - Mỗi vết xoay ±30°, to nhỏ khác nhau một chút, lấp lánh khi đáp.
  - Vết mới sát vết cũ (dưới 62px) thì tự nhích ra, nên 5 vết rải khắp lưng và hông.
- Vòng chung đầy thêm 1/5 mỗi vết. Đủ 5 vết là xong bước 4: vòng đầy, Mun rùng mình. Gợn hương vẫn bay lên khi đang di chai.
- **Bước 5:** bông tắm đi qua vết dầu nào thì vết đó mờ đi, chỗ đó bọt nở bung ra trước (tới 4 bọt một lần), rồi lan ra theo bông tắm như cũ. Xong bước 5 thì các vết còn sót mờ hết.

## 2026-10-31 · GD 2: G8-9 (cho Art 2D 2)

- Bỏ ảnh `mun_bath_shake`: chạm Mun chỉ còn animation lắc nhẹ hai bên. Còn 9 dáng `mun_bath_*`.
- 5 vết `l8_oil_drop` xếp đều dọc sống lưng.

## 2026-10-31 · G8-9 (góp ý chủ dự án qua GD 2), Dev 2 đã sửa bản khối

1. **5 vết dầu rơi vào 5 chỗ đặt sẵn:** xếp thành một hàng hơi cong theo sống lưng, cách đều 46px (x 420 → 604, y 870–886). Các vết cùng cỡ (rộng 40), chỉ xoay nhẹ theo đường cong (0°, ±4°, ±8°). Chai đi qua chỗ nào còn trống thì giọt rơi đúng vào chỗ đó (chỗ trống nằm dưới chai trong khoảng 40px ngang). Bỏ kiểu rơi ngẫu nhiên rồi tự nhích ra.
2. **Khăn bông và vòi sen dùng xong vẫn giữ màu** trên thanh và trên móc. Chúng chỉ không còn tác dụng: thả lên Mun thì vẫn bị coi là sai bước. Đồ trong khay dùng xong vẫn mờ 50% như cũ.
3. **Bỏ ảnh và key `mun_bath_shake`.** Các lúc trước dùng ảnh này giờ chỉ lắc nhẹ hai bên trên ảnh dáng hiện tại (±4°, 2 nhịp, 0,36 giây):
   - chạm Mun lúc còn ướt (vẫn bắn nước / bọt bằng hạt, có giọt lên màn hình);
   - thả vòi sen sai ở bước 4–6;
   - xịt vòi sen vào Mun sai bước (kèm bong bóng mặt không vui).
   - Chạm Mun lúc đã khô (sau bước 8) vẫn dụi đầu như cũ, vì lúc đó không dùng ảnh lắc.

## 2026-10-31 · GD 2: G8-10 (cho Art 2D 2)

- Bỏ `l8_millet_clump_b`: chùm trên đầu dùng chung ảnh `l8_burr` với đuôi.
- `l8_oil_drop` vẽ dáng giọt dầu, đầu nhọn hướng lên.

## 2026-10-31 · G8-10 (góp ý chủ dự án qua GD 2), Dev 2 đã sửa bản khối

1. **Cục trên đầu là chùm ké giống ở đuôi:** dùng chung hình `l8_burr`, code đặt 2 lần, chùm trên đầu nhỏ bằng 80% chùm ở đuôi.
   - Chải chùm nào thì quả ké ở chùm đó bật ra từng quả, nảy lách tách trên sàn rồi lăn. Chùm ở đuôi bắn sang phải, chùm trên đầu bắn sang hai bên.
   - Bỏ hạt vàng rơi lả tả và bỏ key `l8_millet_clump_b`.
2. **Vết dầu dáng giọt dầu:** đầu nhọn hướng lên, đáy tròn ở dưới, rộng 30. Vẫn giữ 5 chỗ xếp đều dọc sống lưng, chỉ xoay rất nhẹ theo đường cong.
- Chờ chủ dự án: chạm Mun lúc đã khô thì dụi đầu hay lắc nhẹ (bản khối đang để dụi đầu).

## 2026-10-31 · Sửa lỗi: vừa xong bước, thả tay ra thì Mun hiện mặt buồn (chủ dự án báo qua GD 2)

- **Nguyên nhân:** bước xong ngay trong lúc đang kéo. Dụng cụ chuyển sang "đã dùng xong" (hoặc bước đã sang bước sau), nên lúc thả lên Mun bị tính là dụng cụ sai: hiện mặt buồn, Mun lắc, chỗ cần làm nhấp nháy.
- **Sửa:** lúc một bước xong, nếu đang cầm đúng dụng cụ của bước đó thì lần kéo này được đánh dấu. Thả ra thì dụng cụ chỉ bay về khay (vòi sen về móc), không lắc, không mặt buồn, không nhấp nháy. Phải nhấc lên ở một lần kéo mới rồi thả lên Mun thì mới tính là sai.
- **Cùng loại lỗi:** xong bước 3 mà vẫn giữ vòi sen xịt tiếp lên Mun thì trước đây bị tính "xịt sai bước". Giờ trong chính lần kéo đó không tính nữa.
- **Đã soát từng bước:**
  - Bước 2, 5, 6, 7, 9: xong trong lúc vuốt, đã sửa như trên.
  - Bước 3 và 7: vòi sen về móc. Nếu vẫn cầm tới lúc đổi khay thì khay tự trả vòi sen về móc như trước.
  - Bước 4: xong khi vết dầu thứ 5 đáp xuống; nếu còn cầm chai thì được đánh dấu như trên.
  - Bước 8: khăn đã thả trước khi bước xong. Nếu lúc đó đang cầm món khác (ví dụ máy sấy) thì không đánh dấu, thả máy sấy lên Mun trong lúc quấn khăn vẫn là phản ứng sai riêng như đặc tả.
  - Bước 10: vào khoảnh khắc kết thì khay trượt đi, dụng cụ được thả ra.

## 2026-10-31 · Dev 2 → Art 2D 2: số liệu bản khối cho bước 3–4 (gameplay đã duyệt)

Toạ độ thế giới là khung 1024x1536; trên màn 9:16 khung game 1024x1820, Y0 = 142 (vùng chơi nằm giữa). Cỡ ghi dưới đây là **cỡ hiển thị trong game**, đo trên khối của bản khối. Nguồn số: các hằng số đầu `game/src/level8.js`.

**Nền:** `l8_bg_bathroom`. Bản khối vẽ 1024x1536, mép kéo giãn. Ảnh thật cần vẽ 1366x2304 theo G-SCREEN. Sàn bắt đầu ở y ≈ 1250 (chân tường); đồ đặt trên sàn có đáy ở khoảng y 1300–1325.

**Mun và ghế (cùng đường giữa x = 512):**

| Key | Neo | Vị trí neo | Cỡ hiển thị | Lớp |
|---|---|---|---|---|
| `mun_bath_*` (mọi dáng) | giữa đáy | (512, 1110) | khung 440x520, chung cho mọi dáng | 20 |
| `l8_stool_plastic` | giữa đáy | (512, 1302) | 260x200; mặt ghế ở y ≈ 1102–1140 | 18 |

- **Đường đáy Mun = y 1110,** tức là mông Mun ngồi đúng trên mặt ghế. Mọi dáng `mun_bath_*` vẽ chung một khung, chung đường đáy, cùng tâm ngang.
- Trong khung 440x520, đo từ góc trên trái khung:

| Dáng | Thân (tâm y, bán kính ngang × dọc) | Đầu (tâm y, bán kính) |
|---|---|---|
| bẩn | 340, 165 × 170 | 150, 105 |
| ướt, gầy | 352, 108 × 162 | 178, 86 |
| bông | 318, 205 × 192 | 140, 120 |
| mượt | 335, 150 × 178 | 148, 100 |

  Đuôi bên phải, chóp đuôi ở x = 220 + bán kính ngang thân + 30, y = tâm thân − 70.
- Tâm hai mắt cách giữa đầu ±0,38 × bán kính đầu, cao hơn tâm đầu 6px.

**Lớp phủ trên Mun** (đều neo tâm, bám theo Mun khi Mun lắc):

| Key | Tâm | Cỡ khối |
|---|---|---|
| `l8_leaf_a/b/c/d` | (512, 628) đỉnh đầu · (592, 850) lưng · (392, 972) hông · (642, 1068) chân sau | khoảng 80x55 |
| `l8_twig_a/b` | (455, 828) lưng · (718, 905) đuôi | 130x60 · 110x80 |
| `l8_burr` | (688, 985) đuôi, 100% · (538, 654) đỉnh đầu, 80% (dưới lá đầu) | 124x104 |
| `l8_mud_patch_a/b/c` | (560, 880) lưng · (452, 1042) chân trước · (628, 1036) chân sau | 140x92 · 108x74 · 118x80 |
| `l8_oil_drop` | 5 chỗ: x = 420, 466, 512, 558, 604; y = 886, 874, 870, 874, 886; xoay −8°, −4°, 0°, 4°, 8° | rộng 30 (dáng giọt cao ≈ 43) |
| `l8_foam_bubble_a/b/c` | lưới cách 44px phủ elip thân (tâm 512, 935; bán kính 185 × 160), chừa mặt | Ø 30 / 44 / 60 |

**Lớp hiển thị (dưới → trên):**

| Lớp | Thứ |
|---|---|
| 0 | nền |
| 2 | lỗ thoát nước |
| 3 | vũng nước (code) |
| 4 | cành đã rơi trên sàn |
| 6 | thanh treo khăn, móc vòi sen, van trộn |
| 7 | ống mềm (code) |
| 8 | vịt |
| 9 | món treo |
| 18 | ghế |
| 20 | Mun |
| 20,5 | chóp đuôi, mí mắt (code) |
| 21 | bùn |
| 22 | chùm ké |
| 23 | vết dầu |
| 24 | bọt |
| 25 | lá, cành trên người |
| 29 | viền sáng gợi ý |
| 60 | hạt, hiệu ứng |
| 98–99 | khay |
| 120 | món đang kéo |

**Đồ treo và đồ trên sàn:**

| Key | Neo | Vị trí | Cỡ |
|---|---|---|---|
| `l8_shower_hook` | tâm | (868, 548) | 70x60 |
| `l8_tool_shower` (lúc treo) | tâm | (868, 640) | 150x150 |
| `l8_shower_mixer` (van, nơi ống mềm cắm vào) | tâm | (890, 1010) | 120x80 |
| `l8_towel_rack` | tâm | (150, 628) | 220x40 |
| `l8_tool_towel` (khăn vắt, cũng là dáng khi kéo) | tâm | (150, 752) | 170x230 |
| `l8_floor_drain` | tâm | (735, 1322) | 90x40 |
| `l8_duck` | giữa đáy | (300, 1322) | 110x92 |

- **Vòi sen:** đầu vòi quay sang trái (về phía Mun). Từ tâm món: **đầu vòi** (chỗ tia nước ra) lệch (−25, −45); **đuôi tay cầm** (chỗ ống mềm nối vào) lệch (+35, +25). Ống mềm do code vẽ: đường cong võng từ van tới đuôi tay cầm, nét nâu 14px, lõi xám 8px. Nếu Art vẽ vòi sen thật, cần ghi lại 2 điểm này theo toạ độ trong ảnh.
- Khi kéo, vòi sen to 105%, khăn to 105%.

**Khay dụng cụ:** dùng lại `ui_bag_bar` + `ui_bag_slot`, căn giữa x = 512. Ô cách nhau 143px. Tâm ô cao hơn đáy dải khay 90px; đáy dải khay nằm ngay trên dải banner.

| Chặng | Món trong khay |
|---|---|
| 1 | 1 món: lược thưa |
| 2 | 3 món: khăn mặt, bông tắm, dầu tắm |
| 3 | 2 món: máy sấy, lược chải |

Dụng cụ trong khay co cho cạnh dài nhất bằng 116 (ô rộng 136); khi kéo to 1,3 lần, món nằm cao hơn ngón tay 70px. Khối dụng cụ trong bản khối là 150x150, neo tâm. Ảnh thật nên vẽ đồ gần vuông hoặc dài ngang để co vừa ô.

**Giao diện trên Mun:**
- Bong bóng mặt Mun `ui_emote_mun_happy/no`: neo giữa đáy (668, 600), cỡ 150x130.
- Vòng tiến độ: code vẽ, tâm (792, 646), bán kính 30.
- Bong bóng nhiệm vụ dùng `l8_icon_mun_clean`, hiển thị rộng 150.

**Tách đuôi / tai / mí mắt (Dev 2 đề xuất, Art chốt):**
- **Đuôi:** bản khối vẽ thêm một đoạn chóp đuôi vẫy chậm đè lên ảnh. Ảnh thật nên **tách đuôi** thành sprite riêng cho từng dáng có lông khác nhau (bẩn, ướt, bông, mượt), có điểm neo ở gốc đuôi để code xoay. Thân Mun vẽ không đuôi. Nếu không tách được thì bỏ đuôi vẫy, chỉ giữ cái vẫy mạnh khi ké bung hết, làm bằng cách lắc cả ảnh.
- **Mí mắt:** cần một ảnh mắt nhắm nhỏ (hoặc mí mắt) **cho mỗi dáng mắt mở tròn** (bẩn, ướt, bông, mượt), đặt đè đúng chỗ mắt trong 0,13 giây. Có thể làm một ảnh "mí mắt đen" chung, co theo cỡ đầu nếu nét vẽ cho phép.
- **Tai:** hiện chỉ vẽ dấu động cạnh tai. Muốn tai xoay thật thì cần 2 tai tách rời, có điểm neo ở chân tai, cho mỗi dáng. Dev 2 đề xuất **giữ dấu động** (rẻ hơn), không tách tai.
- Mỗi dáng chỉ cần ghi tọa độ gốc đuôi, tâm 2 mắt, chân 2 tai trong ảnh. Dev đọc từ `art/out/anchors.json` hoặc bảng trong design-art.

**A8-5 (Art 2D 2, bước 3, trả số liệu Dev 2, 2026-10-31).** Đã viết lại `design-art-level8.md` theo G8-1 → G8-10 và số liệu Dev 2.
- **Đường đáy:** theo Dev, đáy mọi dáng `mun_bath_*` = y 1110 (mặt ghế), khung chung 440x520, neo giữa đáy. Câu treo cũ đóng.
- **Đầu ống vòi sen:** Art vẽ vòi sen đúng hướng (đầu sen quay trái, khâu nối ở đuôi tay cầm), khi tách sẽ đo lại 2 điểm (đầu vòi, đuôi tay cầm) trên ảnh thật và ghi vào bảng neo; Dev không phải tự đo. Van: đầu nối ống ở giữa đáy ảnh.
- **Đuôi:** tách 4 ảnh đuôi theo lông `mun_bath_tail_dirty/wet/fluffy/sleek`, neo gốc đuôi. Thân 9 dáng vẽ không đuôi (trừ `towel`: đuôi trong khăn). `foam`, `sneeze` dùng đuôi `wet`; `lick`, `tongue` dùng đuôi `sleek`.
- **Mí mắt:** một ảnh chung `mun_bath_blink` (đôi mắt nhắm trên mảng lông than ấm), code co theo bán kính đầu.
- **Tai:** đồng ý giữ dấu động bằng code, không tách tai.
- **Demo:** 3 cảnh `l8_demo_stage1/2/3.png` + 1 tờ dụng cụ cầm tay `l8_demo_tools.png` (4 lượt Codex, gpt-6.1-sol medium). Codex vẽ toàn cảnh rộng ở tỉ lệ 0,75 để ra được cả khung 3:4 và 9:16 trong một lượt; Art đặt giao diện thật lên.

## 2026-10-31 · Dev 2 nhận A8-5 (trả lời của Art 2D 2), ghi việc cần làm khi ráp ảnh

Dev 2 đồng ý A8-5. Khi ráp ảnh thật (sau khi chủ dự án duyệt demo), Dev 2 sẽ làm như sau:
- **Đuôi:**
  - Bỏ đoạn chóp đuôi vẽ bằng code, thay bằng sprite `mun_bath_tail_dirty/wet/fluffy/sleek`.
  - Mỗi sprite neo ở gốc đuôi, xoay vẫy chậm theo nhịp thở và vẫy mạnh một cái khi ké bung hết.
  - Dáng nào dùng đuôi nào: `foam`, `sneeze` dùng `tail_wet`; `lick`, `tongue` dùng `tail_sleek`. Dáng `towel` không có đuôi.
  - Đuôi nằm ngay dưới thân Mun, đi theo Mun khi Mun lắc, đổi theo khi Mun đổi dáng.
- **Mí mắt:** `mun_bath_blink` đặt đè lên chỗ mắt, co theo bán kính đầu của dáng hiện tại, hiện 0,13 giây. Chỉ dùng cho các dáng mắt mở tròn.
- **Tai:** giữ dấu động vẽ bằng code.
- **Vòi sen và van:** ống mềm nối từ giữa đáy ảnh van `l8_shower_mixer`, thay cho tâm van như trong bản khối. Đầu vòi và đuôi tay cầm đọc từ bảng neo Art ghi khi tách ảnh.

**A8-6 (Art 2D 2, bước 4, 2026-10-31). Demo L8 lượt 1: 3 chặng.** Chờ chủ dự án duyệt; chưa tách asset.
- Ảnh trình 9:16: `art/out/demo/l8_demo_stage1.png` (Dọn dẹp), `l8_demo_stage2.png` (Bọt bóng), `l8_demo_stage3.png` (Làm đẹp, chọn `fluffy`). Khung 3:4: `l8_demo_stage<N>_34.png`. So với mẫu L1: `art/review/l8_demo_stage<N>_vs_l1.jpg`. Dụng cụ cầm tay: `art/out/demo/l8_demo_tools.png`.
- Màu (`tools/color_check.py`, ảnh 9:16 có giao diện): chặng 1 TB 0,183 / p90 0,325; chặng 2 0,159 / 0,243; chặng 3 0,173 / 0,286. Khung không giao diện: 0,170 / 0,275; 0,150 / 0,204; 0,161 / 0,255. Đạt ngưỡng (≤ 0,25 / ≤ 0,46), nhạt hơn L6.
- 6 lượt Codex gpt-6.1-sol medium (đã báo GD 1). Cách làm và lệch so với khối: `design-art-level8.md` mục 5.
- Codex tự kiểm còn lệch nhỏ: ké trên đầu thành 3–4 quả rời thay vì chùm 5 quả; bọt chặng 2 chủ yếu phủ mặt trước thân; lược thưa 7 răng, nhãn chai 2 bọt. Sửa ở lượt tách nếu chủ dự án không góp ý khác.

## GD 2: chủ dự án duyệt demo (2026-10-31)

- Chủ dự án duyệt 3 demo `l8_demo_stage1/2/3.png`. Sang bước bàn art + hiệu ứng (Art 2D 2 với Dev 2, ghi tại thread này), rồi tách asset theo QUY-TRINH bước 5.
- Khung gương trên tường: giữ theo demo, tách riêng sprite `l8_mirror`, nền chỉ là phòng trống.
- Sửa lúc tách:
  - Ké đầu dùng chung `l8_burr`.
  - Bọt phủ cả thân.
  - Lược đúng số răng theo đặc tả.
  - Giọt dầu dáng giọt, đầu nhọn hướng lên.
- Mỗi lượt Codex:
  - Chỉ dùng sol 6.1 medium.
  - Tối đa 7 món, kèm 1 ảnh demo gốc nguyên vẹn.
  - Dán thẳng style mục 1 và 2b.
  - Prompt kỹ từng món: vị trí, phần lấy, phần không lấy, cỡ.
  - Kiểm màu bằng số.
- Không tự chơi thử, không commit.

**A8-7 (Art 2D 2 → Dev 2, bước 3 sau khi chủ dự án DUYỆT demo, 2026-10-31).** Bàn trước khi tách. Chưa vẽ gì.

**Nguyên tắc:** đặt đồ **theo demo đã duyệt**, không theo khối (demo dồn đồ cao hơn khối). Toạ độ dưới đây đo trên `l8_demo_stage<N>_play.png` = khung thế giới 1024x1536 (trên màn 9:16 cộng y 142). Số đo bằng mắt, sai ±10 px; sau khi cắt Art ghi số chính xác vào bảng neo (`design-art-level8.md` mục 4.6).

Mốc phòng (demo): tường kem tới y 770, gờ 770–790, gạch xanh 790–1090, chân tường 1090–1120, sàn từ 1120.

**1. Bảng ảnh** (Hiển thị = cỡ trên demo; File ≈ 1,5 lần, cắt sát; TS = trong suốt; Lớp theo bảng lớp của Dev ở trên)

| Key | Dùng lại / mới | Lấy từ demo | Hiển thị | File ≈ | Nhóm | Neo | Đặt ở (demo) | Lớp |
|---|---|---|---|---|---|---|---|---|
| `l8_bg_bathroom` | mới, phòng trống (tường, gờ, sàn, chân tường) | 1 | 1366x2304 | 1366x2304 có nền | — | — | vùng chơi ở (171, 384) | 0 |
| `l8_mirror` | mới (G2: tách khỏi nền) | 1 | 296x256 | 444x384 | — | tâm | (512, 328) | 1 |
| `l8_towel_rack` | mới | 1 | 290x44 | 435x66 | — | tâm | (172, 438) | 6 |
| `l8_tool_towel` | mới (khăn vắt = dáng kéo) | 1 | 230x330 | 345x495 | — | tâm | (166, 590) | 9 |
| `l8_shower_hook` | mới (đế giữ vòi trên tường) | 1 | 50x50 | 75x75 | — | tâm | (916, 368) | 6 |
| `l8_tool_shower` | mới (đầu sen + tay cầm, không ống) | 1 | 120x290 | 180x435 | — | tâm | (884, 500) | 9 |
| `l8_shower_mixer` | mới | 1 | 130x76 | 195x114 | — | tâm | (900, 885) | 6 |
| `l8_floor_drain` | mới | 1 | 148x60 | 222x90 | — | tâm | (830, 1340) | 3 |
| `l8_duck` | mới | 1 | 190x170 | 285x255 | — | giữa đáy | (185, 1390) | 8 |
| `l8_stool_plastic` | mới | 1 | 460x280 | 690x420 | — | giữa đáy | (514, 1300); mặt ghế y 1020–1060 | 18 |
| `l8_leaf_a` | mới | 1 | 120x56 | 180x84 | — | tâm | đầu (490, 532) | 25 |
| `l8_leaf_b` | mới | 1 | 84x92 | 126x138 | — | tâm | vai phải (630, 820) | 25 |
| `l8_leaf_c` | mới | 1 | 92x80 | 138x120 | — | tâm | hông trái (360, 920) | 25 |
| `l8_leaf_d` | mới | 1 | 84x44 | 126x66 | — | tâm | chân sau phải (632, 1022) | 25 |
| `l8_twig_a` | mới | 1 | 160x70 | 240x105 | — | tâm | ngực trái (430, 820) | 25 |
| `l8_twig_b` | mới | 1 | 64x56 | 96x84 | — | tâm | đuôi (712, 870) | 25 |
| `l8_burr` | mới, **một chùm 5 quả** (sửa demo) | 1 (chùm đuôi) | 100x90 | 150x135 | — | tâm | đuôi (750, 920) 100%; đầu (522, 580) 100% | 22 |
| `l8_mud_patch_a` | mới | 1 | 112x100 | 168x150 | — | tâm | ngực (540, 845) | 21 |
| `l8_mud_patch_b` | mới | 1 | 100x80 | 150x120 | — | tâm | chân trước trái (440, 980) | 21 |
| `l8_mud_patch_c` | mới | 1 | 84x70 | 126x105 | — | tâm | chân phải (614, 975) | 21 |
| `l8_oil_drop` | mới (dáng giọt đầu nhọn lên, G8-10; demo không có) | 2 (màu) | 30x43 | 45x65 | — | tâm | 5 chỗ dọc sống lưng, Dev đặt lại theo thân `wet` | 23 |
| `l8_foam_bubble_a/b/c` | mới | 2 | Ø 30 / 44 / 60 | 45 / 66 / 90 | — | tâm | code rải phủ **cả thân** (sửa demo) | 24 |
| `l8_tool_comb_wide` | mới, đúng **6 răng** (sửa demo) | 1 + tờ dụng cụ | dài nhất 150 | 225 | — | tâm | khay | 98–99 |
| `l8_tool_facecloth` | mới | 2 | 150 | 225 | — | tâm | khay | 98–99 |
| `l8_tool_sponge` | mới | 2 | 150 | 225 | — | tâm | khay | 98–99 |
| `l8_tool_shampoo` | mới, nhãn 3 bọt + 1 giọt, không chữ | 2 | 150 | 225 | — | tâm | khay | 98–99 |
| `l8_tool_dryer` | mới | 3 | 150 | 225 | — | tâm | khay | 98–99 |
| `l8_tool_brush` | mới | 3 | 150 | 225 | — | tâm | khay | 98–99 |
| `l8_icon_mun_clean` | mới (mặt Mun như `fluffy`/`sleek` + 2 sparkle) | 3 | rộng 150 | 225 | — | tâm | bong bóng nhiệm vụ | UI |
| `ui_emote_mun_happy` | mới, `common/` | 2 (mặt híp) | 150x130 | 225x195 | — | giữa đáy | (668, 520) trên đầu Mun | UI |
| `ui_emote_mun_no` | mới, `common/` | 2 | 150x130 | 225x195 | — | giữa đáy | như trên | UI |
| `mun_bath_dirty` | mới | 1 (bỏ lá, cành, ké, bùn, đuôi) | khung 520x580 | 780x870 | `mun_bath` | giữa đáy | (512, 1060) | 20 |
| `mun_bath_towel` | mới (sửa từ `dirty`) | 1 | như trên | như trên | `mun_bath` | giữa đáy | như trên | 20 |
| `mun_bath_wet` | mới (thân ướt của chặng 2, bỏ bọt) | 2 | như trên | như trên | `mun_bath` | giữa đáy | như trên | 20 |
| `mun_bath_foam` | mới (= `wet` + mắt híp, không bọt) | 2 | như trên | như trên | `mun_bath` | giữa đáy | như trên | 20 |
| `mun_bath_sneeze` | mới (sửa từ `wet`) | 2 | như trên | như trên | `mun_bath` | giữa đáy | như trên | 20 |
| `mun_bath_fluffy` | mới | 3 (bỏ đuôi, bỏ dấu động, sparkle) | như trên | như trên | `mun_bath` | giữa đáy | như trên | 20 |
| `mun_bath_sleek` / `lick` / `tongue` | mới (sửa từ `fluffy` cùng khung) | 3 | như trên | như trên | `mun_bath` | giữa đáy | như trên | 20 |
| `mun_bath_tail_dirty/wet/fluffy/sleek` | mới | 1 / 2 / 3 / 3 | ≈ 120x150 (fluffy 110x150) | ≈ 180x225 | `mun_bath_tail` | gốc đuôi | gốc đuôi từng dáng (bảng neo) | 19,5 (dưới thân) |
| `mun_bath_blink` | mới | 1 (màu lông, mắt) | rộng ≈ 100 ở đầu rộng 200 | 150 | — | tâm | tâm hai mắt | 20,5 |
| `ui_bag_bar`, `ui_bag_slot` | **dùng lại** | — | — | — | — | — | khay | 98–99 |

Khung Mun: demo đo thân không đuôi rộng 384–404 (fluffy rộng nhất), tai lên tới y 516, đáy y 1060 → khung chung **520x580 hiển thị**, neo giữa đáy (512, 1060). Thay khung khối 440x520 / đáy 1110. Mọi dáng cùng khung, cùng đường đáy, cùng tâm ngang; sheet_cut cắt chung một khung cho nhóm `mun_bath` (G5-35) nên đổi ảnh không nhảy.

**2. Gương:** giữ khung gương nhỏ như demo, tách thành `l8_mirror`, nền vẽ tường trơn sau gương.

**3. Code hay ảnh (Art đề xuất, Dev xác nhận):**
- Code: tia nước, giọt bắn, hơi máy sấy, vòng tiến độ, vòng gợi ý, vũng nước, ống mềm, tai (dấu động), lắc mình, Mun lắc đầu khi sai.
- Code dùng ảnh có sẵn: bọt bay = `l8_foam_bubble_b` bay lên mờ dần; lấp lánh = sparkle chung `common/`; lá rơi = chính `l8_leaf_*` `fly_arc`; ké nảy = `l8_burr` nảy + hạt code.
- Ảnh: đuôi vẫy (4 ảnh `mun_bath_tail_*`, code xoay quanh gốc), chớp mắt (`mun_bath_blink`).
- Không thêm ảnh nào khác ngoài bảng trên.

**4. Dev 2 nêu giúp:**
- (a) Đồng ý khung Mun 520x580, đáy (512, 1060)? Ghế đáy (514, 1300)?
- (b) Vật con trên Mun: Art đề xuất lưu **lệch so với neo Mun (512, 1060)** (ví dụ lá đầu = (−22, −528)); Dev muốn lệch hay toạ độ thế giới?
- (c) Vùng chạm Mun cho từng bước (ellipse thân, vùng mặt cho khăn mặt) và vùng chạm vịt, vòi sen, khăn.
- (d) Bảng neo Dev cần đọc ở đâu: bảng trong `design-art-level8.md` mục 4.6 hay `art/out/anchors.json`?
- (e) Bong bóng emote dời lên (668, 520) vì đầu Mun demo cao hơn khối; vòng tiến độ nên dời theo, Dev chọn chỗ.

**5. Kế hoạch tách** (gpt-6.1-sol medium, mỗi lượt một ảnh demo gốc, ≤ 7 món, báo GD 1 trước mỗi đợt):
1. stage1: `l8_bg_bathroom` (sửa từ vùng chơi, bỏ hết đồ) → Art nối hai bên bằng dải tường đã có, trên/dưới thêm hàng gạch.
2. stage1: `l8_mirror`, `l8_towel_rack`, `l8_tool_towel`, `l8_shower_hook`, `l8_tool_shower`, `l8_shower_mixer`, `l8_stool_plastic`.
3. stage1: `l8_floor_drain`, `l8_duck`, `l8_leaf_a/b/c/d`, `l8_twig_a`.
4. stage1: `l8_twig_b`, `l8_burr`, `l8_mud_patch_a/b/c`, `l8_tool_comb_wide`.
5. stage2: `l8_oil_drop`, `l8_foam_bubble_a/b/c`, `l8_tool_facecloth`, `l8_tool_sponge`, `l8_tool_shampoo`.
6. stage3: `l8_tool_dryer`, `l8_tool_brush`, `l8_icon_mun_clean`, `ui_emote_mun_happy`, `ui_emote_mun_no`, `mun_bath_blink`.
7. stage1: tờ `l8_mun_sheet_a` (`dirty` + `towel`, 1536x1024, 2 ô).
8. stage2: tờ `l8_mun_sheet_b` (`wet` + `foam`), rồi `sneeze` sửa từ `wet`.
9. stage3: tờ `l8_mun_sheet_c` (`fluffy` + `sleek`), tờ `l8_mun_sheet_d` (`lick` + `tongue` sửa từ `sleek`), tờ `l8_mun_tail_sheet` (4 đuôi).

## 2026-10-31 · Dev 2 trả lời A8-7 (demo đã duyệt), yêu cầu tách lớp, neo, vùng chạm, hiệu ứng

Dev 2 đã đo lại trên `l8_demo_stage<N>_play.png` (khung thế giới 1024x1536). Số đo khớp bảng A8-7 trong ±15 px nên **lấy bảng A8-7 làm chuẩn**, Art ghi số chính xác sau khi cắt. Khung 9:16 = vùng chơi rộng 1024, cộng y 142; khung 3:4 (1366x1820) = vùng chơi ở x 171, y 142. Không món nào sát mép vùng chơi (khăn từ x ≈ 52, lỗ thoát nước tới x ≈ 904), nên cả hai khung đều thấy đủ đồ. Riêng nền phải vẽ đủ hai bên cho 3:4.

Mốc Dev 2 đo được để Art đối chiếu:
- Mun `dirty`: tai x 319–702, đỉnh lông y ≈ 550, đáy y ≈ 1061.
  - Tâm đầu (513, 694), tâm hai mắt (461, 691) / (571, 691).
  - Gốc đuôi ≈ (691, 1005).
- Mun `wet` (chặng 2):
  - Tâm đầu ≈ (516, 690), mặt rộng ≈ 210.
  - Thân x ≈ 380–650, y ≈ 800–1060.
- Mun `fluffy`: thân x 292–735, tâm đầu ≈ (514, 760), tâm hai mắt ≈ (454, 760) / (570, 760), đáy ≈ 1056.

### Trả lời 5 câu (mục 4 của A8-7)

**(a) Khung Mun và ghế.**
- Đồng ý khung Mun **520x580, neo giữa đáy (512, 1060)**. Mọi dáng `mun_bath_*` cùng khung, cùng đường đáy, cùng tâm ngang.
- Ghế neo giữa đáy (514, 1300), cỡ 460x280, mặt ghế y 1020–1060. Dev đặt ghế ở x 512 cho thẳng hàng với Mun (lệch 2 px không thấy).

**(b) Vật con trên Mun: lưu lệch so với neo Mun (512, 1060).**
- Ví dụ lá đầu = (−22, −528). Code cộng neo Mun và cho bám theo Mun khi Mun lắc.
- Lá, cành, ké, bùn chỉ có ở dáng `dirty`. Vết dầu và bọt nằm trên `wet` / `foam`. Vì vậy chỉ cần các dáng này đúng khung chung.
- **Chùm ké trên đầu: giữ tỉ lệ 0,8** theo G8-10 (GD 2 nhắc lại "đầu scale ~0,8"). Art chỉ vẽ một ảnh `l8_burr`, code co lại khi đặt trên đầu. Nếu Art thấy demo cần 100% thì báo GD 2 chốt.
- **Vết dầu:** 5 chỗ cách đều 46 px dọc sống lưng của `wet`, lệch theo neo Mun là x = −92, −46, 0, 46, 92 và y = −176, −188, −192, −188, −176, xoay −8°…8°. Dev chỉnh lại sau khi có ảnh `wet` thật.
- **Bọt:** lưới cách 44 px phủ elip thân `wet`, chừa mặt. Tâm elip lệch (0, −135), bán kính 150 × 140.

**(c) Vùng chạm.** Toạ độ thế giới đo trên demo. Dev sẽ chỉnh theo ảnh thật.

| Bước / món | Vùng (elip: tâm, bán kính ngang × dọc) |
|---|---|
| Chạm Mun (tap vui, hiện vòng tiến độ) | hình chữ nhật khung Mun: x 252–772, y 480–1060 |
| 1 lá, cành | quanh từng lá: bán kính = nửa cạnh dài + 20; kéo ra khỏi chỗ 130 px (lá) / 200 px (cành) thì rơi |
| 2 ké đuôi | (750, 920), 80 × 80 |
| 2 ké đầu | (522, 580), 64 × 56 |
| 3 bùn a / b / c | (540, 845) 70 × 62 · (440, 980) 62 × 50 · (614, 975) 55 × 45 |
| 4 dầu | dọc sống lưng (512, 875), 130 × 60 |
| 5, 7 thân (bông tắm, xả nước) | (512, 925), 165 × 150 |
| 6 mặt (khăn mặt) | (514, 700), 100 × 72 |
| 8 khăn thả | (512, 900), 200 × 180 (rộng, dễ thả) |
| 9 máy sấy | (512, 880), 210 × 180 (thân `fluffy` to dần) |
| 10 lược chải lưng | (512, 860), 160 × 80 |
| Vịt (chạm) | khung ảnh vịt nới mỗi bên 20 px |
| Vòi sen, khăn (cầm lên) | khung ảnh nới mỗi bên 20 px. Riêng vòi sen chỉ nhận chạm ở nửa dưới (tay cầm) cho khỏi lẫn với móc |

**(d) Bảng neo.**
- Neo chính (`ax`, `ay`, `w`, `h`, `res`) lấy từ `art/out/anchors.json` do `sheet_cut` ghi, như các level khác.
- Các điểm phụ không có chỗ trong `anchors.json`. Ghi vào **bảng trong `design-art-level8.md` mục 4.6**, toạ độ **trong file ảnh** (px của file, góc trên trái). Dev chép vào hằng số trong `level8.js`.
- Các điểm phụ cần có:
  - Mỗi dáng thân: tâm mắt trái, tâm mắt phải, bán kính đầu, gốc đuôi.
  - Mỗi ảnh đuôi: điểm gốc đuôi (trục xoay).
  - `l8_tool_shower`: đầu vòi (chỗ tia nước ra), đuôi tay cầm (chỗ nối ống).
  - `l8_shower_mixer`: chỗ nối ống (giữa đáy, như A8-5).
  - `l8_tool_towel`: điểm vắt trên thanh, là chỗ khăn bay về khớp với `l8_towel_rack`.

**(e) Emote và vòng tiến độ.**
- Đồng ý emote neo giữa đáy ở **(668, 520)**.
- Vòng tiến độ dời theo, giữ cùng khoảng cách với emote như bản khối: tâm **(792, 566)**, bán kính 30.

### Yêu cầu animation từng ảnh

**Thứ tự lớp (dưới → trên):**

| Lớp | Thứ |
|---|---|
| 0 | nền |
| 1 | `l8_mirror` |
| 2 | `l8_floor_drain` |
| 3 | vũng nước (code) |
| 4 | cành rơi trên sàn |
| 6 | thanh khăn, móc vòi sen, van |
| 7 | ống mềm (code) |
| 8 | vịt (chặng 2 nổi trên vũng) |
| 9 | món treo |
| 18 | ghế |
| 19,5 | đuôi |
| 20 | thân Mun |
| 20,5 | mí mắt |
| 21 | bùn |
| 22 | ké |
| 23 | dầu |
| 24 | bọt |
| 25 | lá, cành |
| 29 | gợi ý |
| 60 | hạt |
| 98–99 | khay |
| 120 | món đang kéo |

- `l8_floor_drain` theo bảng A8-7 là lớp 3. Dev đặt lớp 2 dưới vũng nước, vì vũng loang qua lỗ.

**Từng ảnh:**
- **`mun_bath_*` (9 dáng):**
  - Đổi dáng bằng cách thay ảnh tại chỗ, kèm nảy nhẹ (squash 0,96 → 1). Thở bằng cách co giãn dọc 1,5%, neo ở đáy.
  - Lắc nhẹ: xoay ±4° quanh đáy. Lắc đầu khi đưa sai món: xoay ±7°.
  - Vì xoay quanh giữa đáy, dáng phải ngồi cân, đáy phẳng trên mặt ghế.
- **`mun_bath_tail_*`:**
  - Xoay quanh gốc đuôi: vẫy chậm ±6° theo nhịp thở. Vẫy mạnh ±18° hai lần khi ké bung hết.
  - Đuôi đổi theo dáng, đi theo Mun khi lắc.
  - Đuôi cần vẽ đủ phần gốc chui dưới mông, khoảng 20 px, để lúc xoay không hở khe.
- **`mun_bath_blink`:** hiện 0,13 giây, cách 3–5 giây một lần, đặt ở tâm hai mắt và co theo bán kính đầu. Dùng cho `dirty`, `wet`, `fluffy`, `sleek`, tức các dáng mắt mở tròn.
- **`l8_tool_shower`:**
  - Lúc treo đứng yên ở (884, 500).
  - Lúc kéo, ngón tay giữ ở tay cầm, món nghiêng −30° cho đầu sen chĩa về phía Mun. Tia nước bắn ra từ điểm đầu vòi.
  - Thả tay thì bay về móc.
  - Ống mềm vẽ bằng code, là một đường cong võng từ chỗ nối ở giữa đáy van tới đuôi tay cầm. Lúc treo, ống võng xuống dưới van như demo.
- **`l8_tool_towel`:**
  - Lúc treo đứng yên, khi kéo giữ cỡ ×1,0, vì khăn đã to bằng nửa người Mun.
  - Thả lên Mun thì khăn chụp xuống (code co, xoay), đổi dáng `towel`.
  - Xong thì khăn bay vòng về thanh, khớp điểm vắt.
  - Một ảnh dùng cho cả hai trạng thái treo và kéo, không cần ảnh khăn quấn riêng: dáng quấn đã nằm trong `mun_bath_towel`.
- **Dụng cụ trong khay:** code co cạnh dài nhất thành 116, khi kéo phóng 1,3 lần. Khay trượt vào và ra khi đổi chặng.
- **Lá, cành:** kéo được, rơi theo đường cong và xoay (cành rơi nặng hơn), nằm lại trên sàn rồi mờ dần.
- **Ké:** từng quả bật ra (co ảnh `l8_burr` còn 30%), nảy trên sàn hai lần.
- **Bùn:** mờ dần theo tiến độ xả nước, kèm hạt nước nâu (code).
- **Dầu:** giọt nở 0,3 → 1, hiện lấp lánh.
- **Bọt:** nở lên, rung nhẹ, vỡ thành hạt khi xả nước.
- **Vịt:** chạm vào thì nảy lên (hop) và kêu. Chặng 2 nhấp nhô trên vũng nước.
- **Gương, móc, van, thanh khăn, ghế, lỗ thoát nước:** đứng yên.

### Code hay ảnh

- Đồng ý mục 3 của A8-7.
- **Code:** tia nước, giọt bắn, giọt đọng trên màn hình, hơi máy sấy, vũng nước (trắng bọt ở chặng 2, trong ở chặng 3), ống mềm, dấu động cạnh tai, lắc mình, lắc đầu, vòng tiến độ, vòng gợi ý (viền tròn), gợn hương dầu, hắt hơi.
- **Dùng ảnh có sẵn:**
  - Bọt bay: `l8_foam_bubble_b` bay lên rồi mờ dần.
  - Lấp lánh: sparkle chung.
  - Lá rơi: chính `l8_leaf_*` / `l8_twig_*`.
  - Ké nảy: `l8_burr` thu nhỏ.
  - Khăn bay về: `l8_tool_towel`.
  - Bàn chân gợi ý: `common/`.
- **Ảnh:** 4 đuôi (Dev chọn cách xoay ảnh đuôi; mỗi loại lông một ảnh vì lông khác nhau), `mun_bath_blink`.
- **Không cần thêm hạt hay ảnh nhỏ nào khác.**

### Phần code dùng lại cho level sau (Dev 2 sẽ tách sau khi ráp xong L8, file mới, không sửa file chung)

- **Khay theo chặng:** dùng `ui_bag_bar` + `ui_bag_slot`, gồm `trayIn` / `trayOut` / `nextStage`, khay trượt, món dùng xong mờ 50%, món treo giữ màu.
- **Kéo mượt:** điểm đích theo ngón tay, món đuổi theo kiểu ease. Thả sai món thì món bay về chỗ. Có cờ `doneStep` để khi vừa xong bước thì thả tay không bị tính là sai.
- **Vòng tiến độ chung một bước:** gồm `stepProg` / `drawRing` / `ringPop`, chỉ hiện khi đang chạm vào nhân vật.
- **Tiến độ di (swipe) tính theo thời gian di chuyển,** không theo quãng đường.
- **Bong bóng cảm xúc:** `emote(happy/no)` neo giữa đáy, nảy lên rồi mờ đi.
- **Gợi ý bằng viền tròn và bậc gợi ý 8 / 16 giây / 💡:** gồm `drawHighlight` / `hintInfo`.
- **Hiệu ứng code:** tia nước, giọt bắn, bong bóng bay, hơi nước, lấp lánh theo chuỗi đúng liên tiếp.
- **Cách đăng ký level không sửa file chung:** một file `l<N>_entry.js` bổ sung `KEYS` và `LEVELS` rồi `scene.add`.

**GD 2 chốt (2026-10-31):** chùm ké trên đầu dùng **cỡ 100% theo demo**, bỏ tỉ lệ 0,8 (G8-10 cũ). GD 2 đã sửa đặc tả. Dev đổi `COMB_SCALE.burr_head` = 1 khi ráp ảnh; vùng chạm ké đầu (522, 580) nới lên 80 × 70.

**A8-8 (Art 2D 2, bước 5, 2026-10-31). Tách asset L8 xong.** Model gpt-6.1-sol, mức medium. Đã báo GD 1 trước từng đợt.
- **Số lượt:** 9 lượt chính và 5 lượt nhỏ vẽ lại.
  - Lược thưa: 2 lượt, sửa từ ảnh vẫn ra 7 răng nên phải vẽ mới.
  - Emote "không vui": 1 lượt, đuôi bong bóng bị lệch.
  - Lượt 7 lần 1 không vẽ được: image_gen chỉ nhận tối đa 5 ảnh tham chiếu.
  - Mun `fluffy`: 1 lượt, tràn mép ô.
- **Ảnh đã cắt** (sheet_cut, cỡ = hiển thị × 1,5 + lề 8 px, neo trong `art/out/anchors.json`):
  - `art/out/level8/`: nền 1366x2304 và 27 món đồ, lớp phủ, dụng cụ.
  - `art/out/common/`: `ui_emote_mun_happy/no`.
  - `art/out/cats/`: 9 dáng `mun_bath_*`, 4 đuôi, `mun_bath_blink`.
- **Điểm phụ:** mắt, gốc đuôi, góc nghỉ đuôi −25°, đầu vòi sen, chỗ nối ống ở van, điểm vắt khăn. Xem `design-art-level8.md` mục 4.6, bảng "Điểm phụ".
- **Neo Mun theo nhóm tờ, mọi dáng neo giữa đáy, đặt ở (512, 1060):**
  - `dirty`/`towel`: 638x758.
  - `wet`/`foam`/`sneeze`: 523x713.
  - `fluffy`: 736x718.
  - `sleek`/`lick`/`tongue`: 576x747.
  - Cỡ mỗi nhóm theo cỡ Mun đo trên demo chặng đó.
- **Màu:**
  - Cảnh ghép chặng 1/2/3: trung bình 0,193 / 0,182 / 0,195; p90 0,333 / 0,310 / 0,357.
  - Lông Mun mọi dáng ≈ RGB 106–118 / 79–88 / 64–73, khớp ảnh Mun cũ (mun_ref 103/78/67, mun_sit_look 112/86/74).
- **Ảnh kiểm:** `art/review/l8_tach_2_check.jpg`, `l8_tach_34_check.jpg`, `l8_tach_56_check.jpg`, `l8_tach_mun_check.jpg`.

## 2026-10-31 · Dev 2: ráp ảnh thật L8 (A8-8), chờ chủ dự án test

**Mở:** `http://127.0.0.1:8090/game/l8.html?level=8`. Dev 2 không tự chơi thử. Chỉ kiểm cú pháp, và ghép thử cảnh chặng 1 bằng Python theo đúng toạ độ trong code so với demo. Kết quả: thân Mun ở cả 3 chặng trùng đỉnh, đáy với demo trong khoảng 15 px; đồ trong cảnh khớp demo.

**Nạp ảnh** (`game/src/l8_entry.js`):
- `assets.js` chỉ dò ảnh của level 1–7, nên ảnh L8 không tự được nạp. `l8_entry.js` đọc `art/out/anchors.json` và tự ghi mục ảnh cho các key L8. Không sửa file chung.
- Nền `l8_bg_bathroom` không có dòng neo, nên để code tự suy như các nền 1366x2304 khác.
- Key nào thiếu ảnh thì màn vẫn dùng khối tạm.

**Toạ độ theo demo** (`game/src/level8.js`, phần hằng số đầu file):

| Món | Toạ độ (khung thế giới) |
|---|---|
| Mun | neo (512, 1060) |
| Ghế | (512, 1300) |
| Gương | (512, 328), lớp 1 |
| Thanh khăn | (172, 438) |
| Khăn treo | (166, 590) |
| Đế giữ vòi | (917, 370) |
| Vòi sen treo | (897, 508) |
| Van | (900, 898) |
| Lỗ thoát nước | (830, 1340), lớp 2 |
| Vịt | (185, 1390) |

- Lá, cành, bùn, 2 chùm ké lấy theo bảng số đo lại ở mục 4.6. Ké trên đầu dùng cỡ 100% (GD 2 chốt).
- Emote đặt ở (668, 520), vòng tiến độ ở (792, 566).
- Vùng chạm theo bảng Dev 2 đã ghi ở mục trả lời A8-7: mặt (512, 780), thân (512, 915), lưng (512, 880), bùn mỗi mảng một cỡ.
- Lưới bọt phủ thân `wet`, chừa mặt. Vết dầu nằm ở y ≈ 868–884 dọc ngực / lưng của `wet`.

**Đuôi, mí mắt, tai:**
- **Đuôi:** sprite `mun_bath_tail_*` ở lớp 19,5, đặt tại gốc đuôi của dáng hiện tại (điểm phụ mục 4.6).
  - Góc nghỉ là **+25 theo góc Phaser**, tức xoay theo chiều kim đồng hồ. Art ghi "−25°", nhưng Dev đo lại trên demo thì chiều kim đồng hồ mới khớp.
  - Vẫy ±6° theo nhịp thở, vẫy mạnh ±18° khi ké bung hết.
  - Đuôi đi theo Mun khi lắc, nhún, phồng. Dáng `towel` và cảnh bế không có đuôi.
- **Mí mắt:** `mun_bath_blink` đặt ở giữa hai mắt, co theo tỉ lệ khoảng cách mắt / 208, hiện 0,13 giây mỗi 3–5,5 giây. Chỉ dùng cho `dirty`, `wet`, `fluffy`, `sleek`.
- **Tai:** dấu động vẽ bằng code, đặt theo tâm hai mắt (lệch ra ngoài 0,45 và lên 0,7 lần khoảng cách mắt).

**Vòi sen, ống, khăn:**
- Tia nước ra từ đầu vòi (91, 123). Ống mềm vẽ bằng code, cong võng từ chỗ nối ở van (118, 155) tới đuôi tay cầm (206, 378), có tính cả góc nghiêng của vòi.
- Cầm vòi sen lên thì vòi to 105% và nghiêng −25° cho mặt sen chĩa về phía Mun. Chỉ nhận chạm ở 65% dưới của ảnh vòi.
- Cầm khăn lên thì giữ cỡ 100%. Chạm theo khung ảnh khăn nới mỗi bên 20 px.
- Hiệu ứng khăn bung như dù và khăn bay về thanh: giữ cỡ như khăn khối rộng 170 trong bản đã duyệt, không phóng ảnh khăn thật to hơn.

**Khác:**
- Vũng nước dẹt cao hơn (bán trục dọc 16 + 0,2 × r) để loang tới chỗ vịt. Vịt nổi khi mép vũng tới gần vịt.
- Nước chảy ra mép ghế ở ±190, vì ghế thật rộng 460.

**Còn ngỏ:**
- Đuôi `dirty` thật chỉ chìa tới x ≈ 774; trên demo đuôi tới x ≈ 840. Phần lớn đuôi lại bị chùm ké ở (752, 940) che. Nếu chủ dự án thấy đuôi ngắn thì Art vẽ đuôi `dirty` dài hơn; code không phải sửa.
- Âm thanh vẫn mượn tiếng tổng hợp có sẵn.
- Chưa commit.

## 2026-11-01 · Dev 2: sửa code theo G8-11 (mục 1, 2, 4, 5, 6), chờ chủ dự án test

- **Lắc Mun mượt (mục 1):** mọi cú lắc Mun (chạm Mun, vòi sen sai bước, dùng sai dụng cụ, gỡ lá, rùng mình, khăn, lắc xong chặng, mở màn) bỏ `wiggle` giật, đổi sang `smoothShake`: góc = biên độ × sin(nhịp) × sin(πt), vào êm, ra êm. Nước văng ra từ mép thân Mun (elip bao thân + đầu) ở mỗi đỉnh nhịp lắc, bay theo đà rồi rơi theo trọng lực. Bỏ hẳn giọt đọng trên màn hình (cả khi lắc xong chặng).
- **Vòng gợi ý (mục 2):** cam đậm `#ff8a1e`, lõi trắng mảnh, quầng cam mờ. Chờ GD chốt màu.
- **Vết dầu (mục 4):** 3 vết trên y 858 (x 460, 512, 564), 2 vết dưới y 900 (x 486, 538) so le. Giọt rơi vào chỗ trống gần chai nhất.
- **Xong mỗi bước (mục 5):** vùng vừa làm (lá, 2 chùm ké, 3 mảng bùn, vùng dầu, thân, mặt, lưng) nhấp nháy 3 nhịp (mảng trắng mờ + vòng cam), mỗi nhịp lấp lánh; vòng tiến độ nảy 3 nhịp rồi tắt.
- **Vòng tiến độ (mục 6):** bán kính 30 → 60, dời sang (830, 590) cho khỏi chạm tai; nền trắng, phần đầy xanh lá tươi `#2fcf6a`, viền nâu đậm dày 7.
- Ảnh kiểm (ghép offline theo toạ độ code, không chụp trong game): `art/review/l8_g811_colors.jpg`.
- Mục 3, 7 chờ ảnh Art: có ảnh thì gắn mí mắt và đổi neo theo số Art ghi. Chưa commit.
