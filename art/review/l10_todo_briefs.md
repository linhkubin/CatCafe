# L10 — lời giao việc Codex còn lại (Art 2D 1, 2026-11-03, theo G10-20 bổ sung)

Rà: `KEYS[10]` (game/src/assets.js), `level10.js`, bảng yêu cầu art của Dev (level10-thread.md), states-01-10.md mục L10, so với art/out/level10 và art/out/cats.
Mọi key code gọi đều đã có file. Còn thiếu hoặc chưa đạt:

| # | Key | Lý do | Brief | Lượt Codex |
|---|---|---|---|---|
| 1 | `mun_gorilla_look`, `mun_gorilla_sniff`, `mun_gorilla_lick` | Đang là ảnh gấu tạm (chép idle / block); cần dáng thật bộ gấu bông (G10-20) | `art/review/l10_bear_c_brief.md` (tờ c, chỉnh sửa từ tờ a) | 1 (đang chạy) |
| 2 | `mun_l10_eat`, `sua_l10_eat` | Dev cần mèo thật cúi ăn từ hộp trong 10 giây thu nhỏ; chưa vẽ (bản khối tạm dùng `mun_sit_look`, `sua_sit_stare`). Code chưa gọi key này: vẽ xong Dev thêm vào KEYS[10] | `art/review/l10_eat_brief.md` (1 tờ 2 ô) | 1 |
| 3 (tùy chọn) | `l10_bg_living_kitchen` | Hai bên và trên/dưới vùng chơi là soi gương nền 1024x1536, chưa phải vẽ thật. Chỉ vẽ lại nếu chủ dự án thấy lặp | chưa viết (cần chủ dự án quyết) | 1 |

Đã sửa không cần Codex: `l10_lamp_post_on` cắt lại cùng tỉ lệ điểm ảnh với `l10_lamp_post` (trước lệch 7px chiều cao khi đổi ảnh).
Không cần ảnh (Dev ghi code làm): `l10_pillow_back`, `l10_petal`, ánh xanh, tia nước, bụi.

Tổng: 2 lượt Codex bắt buộc (1 đang chạy) + 1 lượt tùy chọn.

Brief đầy đủ (đã dán khối phong cách + camera, kèm ảnh demo gốc) nằm trong các file ở cột Brief.
