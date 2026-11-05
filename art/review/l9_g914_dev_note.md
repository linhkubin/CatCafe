# L9 G9-14: ảnh mới cho Dev 2 (Art 2D 2, 2026-11-04)

Khung và neo của mọi ảnh dưới đây nằm trong `art/out/anchors.json` (res 1.5). Ảnh cũ sao lưu ở `art/ref/backup/l9_g914/`. Chưa commit.

## Thay ảnh, giữ tên key
- **`l9_stove`** (796x512) và **`l9_knob`** (160x163): vẽ lại tròn mập, viền chì, mặt trước không còn tím phẳng. Neo tâm.
  - Khung bếp thấp hơn bản cũ (564 → 512).
  - Anh đo lại chỗ đế tròn của núm lớn (bên phải mặt trước) và tâm 2 họng trên ảnh mới.
- **`l9_pumpkin`**: nay là **bí nguyên còn vỏ**.
  - Dùng chung nhóm và chung khung 347x329, neo (174,165) với **`l9_pumpkin_peeled`** (mới, bí đã gọt).
  - Không cuống; cuống vẫn là `l9_pumpkin_stem`.

## Vỏ bí: 10 miếng khớp quả (thay `l9_pumpkin_rind` cũ, bỏ không dùng nữa)
- Key **`l9_pumpkin_rind_0` … `l9_pumpkin_rind_9`**: hàng trên từ trái qua phải là 0–4, hàng dưới là 5–9. Cột cắt theo đường múi cong.
- Cách ghép: đặt `l9_pumpkin_peeled` rồi đặt 10 miếng lên trên. Mỗi miếng có neo tâm, đặt tại **neo quả + `on_d`** (px hiển thị, có trong anchors.json; `on` là toạ độ tâm miếng trong khung quả, px file).
  - Đủ 10 miếng thì trùng y quả nguyên (Art đã kiểm, lệch trung bình 0,4/255).
  - Bong miếng nào thì lộ ruột đúng chỗ đó.
- Lúc bí xoay 90°: xoay cả quả lẫn các miếng còn lại quanh tâm quả.
- Miếng rơi: giữ nguyên ảnh (dáng múi cong), chỉ xoay và rơi.
- Ảnh kiểm: `art/review/l9_g914_rind_check.jpg`.

## Mới
- **Lửa `l9_flame_a`, `l9_flame_b`**: 2 khung, cùng khung 361x148, neo tâm vòng lửa. Thay lửa code; luân phiên hai khung hoặc lắc nhẹ. Đặt tâm tại tâm họng lớn, dưới đáy nồi.
- **Nước chậu `l9_basin_full`** (nước phẳng) và **`l9_basin_ripple`** (nước gợn, có bọt): cùng nhóm và khung với `l9_basin` (559x407, neo (280,204)). Đổi key chậu theo trạng thái thay cho nước code.
- **Nắp máy xay `l9_blender_lid`**: cùng nhóm và **cùng khung** với `l9_blender` (378x616, neo (189,308)).
  - Đặt trùng `l9_blender` là nắp đậy khít miệng cối.
  - Đóng: nắp từ trên hạ xuống vị trí đó. Mở: nhấc lên.
- **Mũi tên gợi ý** (thay mũi tên code), vàng bơ viền nâu:
  - `l9_hint_arrow_straight` (256x116): chỉ sang phải.
  - `l9_hint_arrow_curve` (241x178): cong từ trên-trái xuống dưới-phải, cho nghiêng hoặc đổ.
  - `l9_hint_arrow_circle` (226x230): vòng theo chiều kim đồng hồ, cho xoay hoặc khuấy.
  - `l9_hint_tap` (196x197): chấm và 2 vòng, cho chạm.
  - Tất cả neo tâm; xoay hoặc lật cho đúng hướng cử chỉ.

## Cảnh kết: đầu mèo riêng
- Key `mun_soup_eat_head` / `mun_soup_eat_body`, `mun_soup_surprise_head` / `_body`, `sua_soup_eat_head` / `_body`, `sua_soup_surprise_head` / `_body`.
- **Cùng khung, cùng neo** với dáng gốc (`mun_soup_eat` …): đặt thân và đầu tại cùng một điểm là khớp tuyệt đối.
- Thân vẫn có tay, chân, đuôi và **dải cổ khoảng 11 px nằm dưới mép đầu**, nên đầu nhấp nhô vài px vẫn không hở.
- **Lớp:** thân dưới bát, đầu trên bát.
- Mỗi mục có **`neck`** (điểm cổ, px file), dùng làm tâm xoay nếu đầu gật.
- `mun_soup_walk` và `sua_soup_walk` vẫn là ảnh nguyên con.

## Còn lại phần code (GD 2 đã giao anh)
Xoá chữ, thêm bước tắt núm, súp trên rây, nắp khay cao lên, múc mượt.
