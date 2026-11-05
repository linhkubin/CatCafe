GD 2 gửi Art 2D 2: chủ dự án duyệt gameplay bản khối Level 9 "Súp thưởng" và yêu cầu sang art. Theo QUY-TRINH bước 3–4: viết `art/design-art-level9.md` mô tả thật chi tiết, bàn tách lớp với Dev 2, rồi vẽ demo. Chủ dự án dặn riêng: **mô tả chi tiết, nhớ chi tiết màu sắc và style** khi vẽ demo màn này.

Không tự chơi thử (chỉ Dev 2 được phép ở L9); dùng các ảnh bản khối dưới đây, cần ảnh cảnh nào thêm thì nhờ Dev 2 chụp.

**Đọc trước:**
- `levels/levels-01-10.md` mục Level 9. Bảng 13 bước ở đầu là bản cũ. Các khối G9-1 tới G9-12 là chuẩn: 15 bước, góc 3/4, dao bập bênh, bí cắt 2 lượt, khay hộp thắt nơ, zoom nồi, cảnh kết.
- Ảnh bản khối đã duyệt, làm đầu vào bố cục: `art/review/l9_g92_34view.jpg`, `l9_g93_gestures.jpg`, `l9_g96_g98.jpg`, `l9_g910.jpg`, `l9_g910c_zoom_low.jpg`, `l9_g911.jpg`, `l9_g94_end_eat.jpg`, `l9_g912b.jpg` (màn thưởng 2 đầu mèo).
- Mẫu style và màu: `art/ref/owner_l1_style_ref.png`, `art/ref/l1_depth_angle_ref.png`, `art/style.md` mục 1, 2, 2b, 3.

## 1. Góc nhìn (điểm khác mọi màn, chủ dự án chốt G9-2)

- **Phần bếp: top-down 3/4.** Vẫn nhìn **thẳng mặt trước, không xoay chéo** (cạnh ngang nằm ngang, cạnh đứng thẳng đứng) như sofa L1. Nhưng mắt đặt **cao hơn nhiều**, nhìn xuống dốc (khoảng 50–60°).
  - Thấy rõ **mặt trên** của đồ: lòng nồi, lòng bát, lòng tô, mặt thớt, mặt bếp ga, lòng cối máy xay, lưới rây. Miệng tròn là elip dẹt khoảng 0,5.
  - Thấy cả **một dải mặt trước**: thành nồi, thân máy xay có nút, mặt trước bếp có núm, cạnh dày của thớt và mép bàn.
  - Mặt bàn gỗ là mặt phẳng lùi xa, phía sau hơi tối và chụm nhẹ.
- **Lời giao việc cho Codex phải dán khối CAMERA trong style.md 2b, rồi thêm khối riêng cho L9.** Ghi rõ L9 là ngoại lệ góc của chủ dự án, chỉ đổi độ cao mắt. Ví dụ:
  "LEVEL 9 KITCHEN EXCEPTION: same straight-on front view, no diagonal rotation, but the eye is much higher, looking down steeply (about 50–60°), so top faces are large and clear (pot interior, bowl interior, board top, stove top with burners), and only a short band of each front face shows."
- **Cảnh kết (sàn bếp, Mun và Sữa ăn) giữ góc chung của game**, như sofa L1, nhìn ngang hơi trực diện.

## 2. Màu (khóa theo L1, O6, nhớ kỹ)

Chỉ dùng bảng màu khóa. Mảng lớn nhạt nhất, mọi mảng thấy vân chì. Style cấm "orange", mà súp và bí lại màu cam, nên phải ghi rõ màu cho từng món:
- **Tường bếp:** gạch men kem `#FCF1DD`, ron gạch nâu viền rất nhạt. Mảng lớn nhạt nhất cảnh.
- **Mặt bàn:** gỗ mật ong `#F2C796`. Mép trước và chân tủ dưới là caramel `#D6A472` nhạt, không vân gỗ thật, chỉ vài nét chì.
- **Bếp ga:** trắng ấm `#FFFAF0`, đổ bóng lavender `#D8CCF0` nhạt. Kiềng và họng đốt dùng nâu viền nhạt, núm caramel. Không xám kim loại, không đen.
- **Lửa:** xanh da trời `#B8DAF2` pha vàng bơ ở lõi, nhạt.
- **Nồi:** men bạc hà `#B9DDBE` nhạt hoặc trắng ấm viền mint, quai caramel. Không inox xám.
- **Súp, bí đỏ:** **cam mơ nhạt**, pha hồng đào `#F7B9A3` với vàng bơ `#FCE39A` (khoảng `#F9D2A6`), không bao giờ cam đậm hay cam tươi. Súp lợn cợn có hạt hồng đào và bơ. Súp mịn là một mảng mơ đều, vân chì.
  - Vỏ bí đậm hơn ruột một chút, vẫn trong ô hồng đào.
  - Cuống bí xanh lá `#9DC283`.
- **Gà:** sống là hồng phấn `#F8C6CC` pha trắng ấm. Da gà hồng đào nhạt hơn, hơi gợn. Gà miếng là hồng phấn có mặt cắt nhạt hơn.
- **Thớt:** gỗ mật ong sáng hơn mặt bàn để tách khỏi bàn, cạnh caramel. **Dao:** lưỡi trắng ấm, đổ bóng lavender, cán caramel. **Dao gọt:** cán bạc hà.
- **Chậu nước:** sky blue nhạt, nước sky blue rất nhạt.
- **Máy xay:** cối thủy tinh sky blue rất nhạt, gần trong. Đế trắng ấm, nút hồng đào.
- **Rây:** khung caramel, lưới nâu viền mảnh, thưa, vẽ to, ít ô.
- **Tô súp, 2 bát:** trắng ấm, viền miệng hồng đào. Vạch hình chân mèo trong lòng bát là hồng phấn nhạt.
- **Muôi:** trắng ấm, cán caramel.
- **Khay hộp:** hộp hồng phấn nắp trắng ấm, ruy băng và nơ vàng bơ (hoặc hồng đào, chọn một, ghi vào đặc tả).
- **Hơi nóng, khói hình cá:** trắng ấm, mảnh, nhạt.
- **Chân mèo thò lên:** chân Mun đen than `#3E3838` có nệm hồng đào. Chân Sữa trắng ấm nệm hồng phấn.
- **Sàn cảnh kết:** gỗ mật ong như L1, tường kem.
- **Mun và Sữa:** đúng `mun_ref.png`, `sua_ref.png`.
- Đo bão hoà demo theo QUY-TRINH: trung bình ≤ 0,25, phân vị 90 ≤ 0,46. Vượt thì vẽ lại, không chỉnh hậu kỳ.

## 3. Danh sách cần mô tả chi tiết trong design-art-level9.md

Mỗi món một dòng: góc 3/4, mặt thấy được, tỉ lệ so với nồi, màu theo mục 2, mọi trạng thái, phần giữ nguyên giữa các trạng thái. Đối chiếu key Dev đang dùng trong `game/src/assets.js` mục 9.
- **Nền:**
  - Góc bếp sau quầy, gồm tường gạch, mặt bàn và mép bàn có dải chân tủ phía dưới.
  - Vẽ dư cho 3:4.
  - Bàn là lớp riêng, vì bàn ẩn đi ở cảnh kết.
  - Nền cảnh kết riêng: sàn bếp, nhìn ngang.
- **Đồ và trạng thái:**
  - Đĩa, chậu nước (nước phẳng, nước gợn bọt).
  - Gà: nguyên, ướt bóng, đã gỡ da (tảng nguyên), có 1–4 vết cắt, 5 dải. Da gà.
  - Bí: nguyên có cuống, vỏ chia 10 miếng bong được, bí gọt, vết cắt lượt 1 và lượt 2, hạt lựu. Vỏ bí rơi.
  - Thớt, dao (nằm ngang, cán phải), dao gọt.
  - Bếp ga, núm (tắt, bật), lửa.
  - Nồi: nước, có gà và bí, sôi có bọt và bong bóng, súp.
  - Muôi.
  - Máy xay: rỗng, súp lợn cợn, sánh, mịn. Nút.
  - Rây trên tô. Tô súp: nóng có hơi, nguội, các mức vơi.
  - Khay hộp: rỗng, đầy, nắp, ruy băng, nơ.
  - 2 bát: rỗng, đầy.
  - Chân đen, chân trắng.
  - Icon bong bóng nhiệm vụ: 1 bát súp bốc khói hình cá.
- **Mèo cảnh kết:** Mun, Sữa mỗi con đi, ngạc nhiên, cúi ăn.
- **Màn thưởng hiện 2 icon đầu Mun và Sữa** (G9-12): dùng `mun_face_icon` và `sua_face_icon` có sẵn, không vẽ mới.
- Dòng súp, nước bắn, hơi, tim, nhãn: code vẽ, không vẽ ảnh.

## 4. Demo

Khung 1080x1920 có HUD, thêm bản 3:4 như L8. Đề xuất 4 tranh:
1. Sơ chế: gà trên thớt, dao bên phải, bí, đĩa, chậu, bếp phía sau.
2. Nấu: khung zoom nồi đang sôi, muôi trên mặt bàn, chân Sữa thò lên.
3. Xay và rây: nồi nghiêng đổ vào cối, rây trên tô.
4. Cảnh kết: 2 bát trên sàn, Mun và Sữa ăn.

Nếu cần bớt lượt, gộp 2 và 3.

Mỗi lượt Codex:
- Kèm `owner_l1_style_ref.png`, `l1_depth_angle_ref.png`, ảnh bản khối đúng cảnh, và `mun_ref` / `sua_ref` nếu có mèo.
- Dán khối style mục 1, khối CAMERA 2b và khối ngoại lệ L9.
- Có Nhắc lại quy tắc và Tự kiểm. Chỉ dùng Codex sol 6.1 medium.
- Báo GD 1 trước khi giao lượt lớn.

Gửi mình demo kèm ảnh đặt cạnh ảnh mẫu L1, mỗi demo 1 ảnh, kèm số đo bão hoà. Chưa tách asset, chưa ghép game, chưa commit, chờ chủ dự án duyệt demo.
