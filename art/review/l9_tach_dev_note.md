# L9 tách asset xong: ghi chú ghép cho Dev 2 (Art 2D 2, 2026-11-04)

Đã có đủ 37 món + 3 nền. Khung và neo của từng món nằm trong `art/out/anchors.json` (res 1.5, file ≈ hiển thị × 1,5). Bảng tờ ở `art/design-art-level9.md` mục 8.1 và 8.2. Chưa commit.

## Nền (`art/out/level9/`)
- **`l9_bg_kitchen`** 1366x2304: vùng chơi nằm ở (171, 384). Gồm tường gạch, phần bàn bên dưới (bị lớp bàn che) và chân tủ kéo xuống tới đáy.
- **`l9_counter`** 1366x1260: mặt bàn và mép bàn, tương ứng y thế giới 260 → 1520. Đặt đỉnh giữa ở (512, 260). Ẩn ở cảnh kết.
- **`l9_bg_end`** 1366x2304: tường, tủ thấp và sàn gỗ. Chân tường ở y thế giới ≈ 1000.

## Đồ (`art/out/level9/`)
- **Đồ rỗng, súp và nước do code vẽ:**
  - `l9_pot` 466x377
  - `l9_basin`
  - `l9_blender` 378x616: cối thủy tinh trong, đế trơn
  - `l9_blender_btn`: nút riêng
  - `l9_sieve`
  - `l9_tureen`
  - `l9_bowl`: bát nông có vạch chân mèo
  - `l9_tray`: hộp hồng mở
- **Bộ nắp:** `l9_tray_lid` và **`l9_tray_ribbon`** cùng nhóm, cùng khung 454x257, cùng neo. Đặt ruy băng chồng đúng lên nắp là trùng: dải dọc giữa và dải ngang giữa. Nơ là **`l9_tray_bow`** 196x125, neo tâm.
- **Muôi `l9_ladle`**: lòng muôi bên trái. Tâm lòng muôi anh đo lại trên ảnh mới.
- **Chân mèo `l9_paw_white` và `l9_paw_black`**: cùng nhóm, 264x857, neo đáy (133, 849).
  - **Cẳng THẲNG DỌC** theo lời chủ dự án.
  - Đệm chân ở đầu trên, đáy cẳng cắt ngang.
  - Ảnh dài khoảng 571 hiển thị; nếu cần đúng 560 thì co nhẹ.
- **Bát cảnh kết `l9_end_bowl`**: đầy súp, neo đáy.
- **Icon `l9_icon_soup`**: bát súp có khói hình cá.

## Mèo cảnh kết (`art/out/cats/`)
- **`mun_soup_walk`, `mun_soup_surprise`, `mun_soup_eat`**: cùng nhóm, khung 461x353, neo đáy (193, 345). Nhìn sang phải.
- **`sua_soup_walk`, `sua_soup_surprise`, `sua_soup_eat`**: cùng nhóm, khung 519x381, neo đáy (265, 374). Nhìn sang trái.

## Đã tách từ trước (lượt 1–2)
Thớt, dao, núm, dao gọt, đĩa, bếp, gà (4 key), bí (4 key). Xem `art/review/l9_tach12_dev_note.md`.

## Cần anh làm
- Ghép vào game và đo vị trí theo demo (play_harness `compare`).
- Chụp trong game 4 cảnh (sơ chế, nấu zoom nồi, xay-rây, cảnh kết) cạnh demo, mỗi cảnh 1 ảnh.
- Chụp thêm 1 ảnh crop tay mèo thò lên trong game.
- Gửi các ảnh cho GD 2 (hoặc cho Art 2D 2 để Art xem trước).

Ảnh ghép tĩnh Art đã kiểm màu (không phải ảnh trong game): `art/review/l9_tach_scene_check.jpg`. Bão hoà các cảnh ghép: sơ chế 0,228 / 0,349; nấu 0,175 / 0,251; xay-rây 0,215 / 0,333; kết 0,235 / 0,435.
