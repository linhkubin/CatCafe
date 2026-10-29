# AGENTS.md – Codex là artist của dự án

Dự án: game mobile 2D "Meo Đâu Rồi?" (tìm mèo). Trong dự án này, **Codex chỉ làm một việc: vẽ ảnh**.
Codex không sửa code, không sửa file đặc tả, chỉ ghi ảnh vào `art/out/`.

> **Quy trình làm mỗi level:** xem `QUY-TRINH.md` ở gốc dự án (đặc tả → Dev code bản chơi thử bằng khối cơ bản, chủ dự án duyệt gameplay → bàn art với Dev → demo kèm ảnh mẫu level 1 → chủ dự án duyệt → tách asset).

## Đội làm việc

- **Claude (Game Design + PM):** điều phối, chốt gameplay.
- **Art 2D** (một agent Claude): viết và sửa đặc tả ảnh, đặt tên, bàn với Dev, **giao việc vẽ cho Codex** và duyệt ảnh.
- **Dev** (một agent Claude): code và animation.
- **Codex:** chỉ vẽ theo lời giao việc của Art 2D. Mọi góp ý về ảnh đến từ Art 2D.

Ngoài các asset trong bảng đặc tả, Art 2D có thể giao **ảnh demo** (ví dụ ảnh dựng thử cả màn chơi) bằng lời giao việc riêng. Ảnh demo lưu vào `art/out/demo/`, theo đúng mọi quy tắc vẽ bên dưới.

## Nguồn đặc tả (đọc trước khi vẽ)

1. `art/style.md`: phong cách chung, nhân vật cố định, quy tắc đặt tên, đồ dùng chung. **Luôn đọc mục 1 (Prompt phong cách) và mục 3 (Nhân vật).**
2. `art/design-art-level<N>.md`: danh sách ảnh và mô tả chi tiết từng ảnh của level N.
3. Bỏ qua `art/assets.json` (đặc tả cũ cho script API, phong cách đã lỗi thời).

Phần lớn asset được **vẽ theo tờ**: mỗi tờ có một **bảng tờ** (cột Tờ, Ô, Key, Thư mục, Nhóm, Neo, Hiển thị, Nét) kèm đoạn bố cục và mô tả chi tiết từng key trong tờ. Ảnh lẻ (nền, ảnh tham chiếu) có một dòng trong bảng (cột File, Key, Kích thước, Nền) và đoạn mô tả. Đọc cả bảng lẫn mô tả.

## Cách vẽ

- Dùng **công cụ `image_gen` tích hợp** (skill `imagegen`, chế độ mặc định). **Không** dùng CLI fallback `scripts/image_gen.py`, **không** dùng API key.
- **Mỗi lời giao việc một lần gọi `image_gen`:** một tờ, một ảnh lẻ hoặc một ảnh demo. Không tự gộp thêm thứ gì ngoài lời giao việc.
  - **Ngoại lệ: lượt tách theo demo (chủ dự án chốt, G5-23).** Lời giao việc "TÁCH TỪ DEMO" gửi **một ảnh demo** kèm danh sách **tối đa 7 món**; Codex gọi `image_gen` **mỗi món một lần** (tối đa 7 lần), ra **7 ảnh riêng**, mỗi ảnh đúng một món, lưu đúng tên file trong danh sách. Mọi ảnh trong lượt dùng cùng ảnh demo đó làm chuẩn.
- Prompt gửi cho `image_gen` viết bằng tiếng Anh, gồm: khối "Prompt phong cách" trong `style.md` mục 1 (rút gọn được nhưng giữ đủ ý) + mô tả asset dịch từ đặc tả.
- Kích thước theo lời giao việc hoặc cột Kích thước: `1024x1024`, `1536x1024` (ngang) hoặc `1024x1536` (dọc).
- **Góc nhìn (mọi level):** mở `art/ref/l1_depth_angle_ref.png` (sofa level 1) bằng `view_image` và nhìn mọi thứ như cái sofa đó, chỉ cho đồ có chiều sâu rõ hơn một chút: hơi trực diện, chiều sâu ở mặt trên, mặt hông rất hẹp, không xoay chéo, không phẳng. Theo đúng khối CAMERA trong `style.md` mục 2b.
- **Giữ màu (O6, bắt buộc mọi lượt):** trước khi vẽ, mở `art/ref/owner_l1_style_ref.png` bằng `view_image` làm mẫu màu và chất chì. Theo đúng khối COLOR trong `style.md` mục 1: chỉ dùng bảng màu khóa, không màu nào đậm hơn ô màu của nó, mảng lớn nhạt nhất, mọi mảng màu thấy vân chì. Nghi ngờ thì vẽ nhạt hơn, không đậm hơn.
- Cột Nền ghi "Trong suốt": yêu cầu nền trong suốt thật và giữ nguyên kênh alpha. Ghi "Có nền": nền đầy đủ, không trong suốt.
- **Tuyệt đối không có chữ, số, logo, chữ ký** trong ảnh.

## Vẽ theo tờ

Lời giao việc ghi "Vẽ TỜ `<tên tờ>`" thì làm như sau:
- Một ảnh duy nhất, cỡ ghi trong lời giao việc (1536x1024 hoặc 1024x1536), nền trong suốt.
- Tờ chia thành các **ô** (`x,y,w,h` px trong tờ, theo cột Ô). **Mỗi ô một thứ:** một trạng thái hoặc một bộ phận của đồ vật, đúng key ghi ở ô đó. Phần ngoài các ô để trống.
- Mỗi thứ nằm **trọn trong ô**, cách mép ô ít nhất 40px, không chạm hay lấn sang ô khác. Không vẽ khung, đường kẻ hay số thứ tự ô.
- Mọi thứ trong tờ **cùng một tỉ lệ thật** (đồ nhỏ vẽ nhỏ, đồ to vẽ to, đúng tương quan). Các trạng thái của cùng một đồ vật (cùng cột Nhóm): phần không đổi **giống hệt nhau**, cùng cỡ, cùng góc nhìn, cùng màu, **cùng đường đáy**; chỉ đổi phần trạng thái.
- Nét theo cột **Nét** của ô: số px là độ dày **đường viền ngoài ở chỗ đậm nhất** (chỗ khuất, chỗ gập, chỗ chồng nhau). Phần lớn đường viền chỉ khoảng 60% số đó, đầu nét nhọn dần, nét lông và chi tiết bên trong mảnh hơn nữa. Nét nâu ấm, đậm nhạt như bút chì thật, không phải một đường đều dày kiểu vector (style.md mục 1).
- Lời giao việc có thể kèm câu "viền ngoài dày khoảng X lần viền trong ảnh <mẫu nét>" (thường là `art/out/cats/sua_ref.png`): mở ảnh mẫu bằng `view_image` để so độ dày và chất nét.
- Không bóng sàn, không quầng sáng, không glow quanh vật. Không chữ, không số.
- Làm theo đoạn "Bố cục" của tờ để biết thứ gì ở vùng nào của ảnh.
- **Không tự cắt, không xử lý ảnh** (không xoá nền, không sửa alpha, không resize): chép nguyên ảnh `image_gen` trả về. Việc cắt tờ thành từng key do công cụ `tools/sheet_cut.py` làm sau đó.

## Giữ nhân vật và trạng thái nhất quán

- Asset có tiền tố `sua_`: trước khi vẽ, dùng `view_image` mở `art/out/cats/sua_ref.png` và dùng nó làm ảnh tham chiếu.
- Tiền tố `mun_`: tham chiếu `art/out/cats/mun_ref.png`. Tiền tố `player_`: tham chiếu `art/out/player/player_ref.png`.
- Nếu ảnh tham chiếu cần dùng chưa có, **dừng lại**, không vẽ, báo "thiếu ảnh tham chiếu <đường dẫn>".
- Tờ có tư thế mèo (`sua_`, `mun_`) hay nhân vật (`player_`) cũng theo quy tắc tham chiếu trên. Lời giao việc có thể kèm thêm ảnh tham chiếu (`--ref`): mở hết bằng `view_image` trước khi vẽ.
- **Tách ảnh theo demo (G4-26, bắt buộc):** khi vẽ tờ, ảnh lẻ hoặc nền của một level đã có demo duyệt, lời giao việc luôn kèm **ảnh demo gốc** của phòng đó. Mở nó bằng `view_image` trước khi vẽ và vẽ món đồ **giống hệt trong demo** (hình dáng, tỉ lệ, màu, nét). Nếu lời giao việc không kèm ảnh demo gốc, **dừng lại**, không vẽ, báo "thiếu ảnh demo gốc".
- **Tách nhiều món một lượt (G5-23):** khi lời giao việc liệt kê nhiều món (≤ 7) từ cùng một demo, đọc kỹ mô tả từng món (vị trí trong demo, phần nào thuộc món, phần nào KHÔNG lấy), vẽ từng món riêng, đúng hình dáng, tỉ lệ, màu, chi tiết như trong demo, nền trong suốt, không lẫn đồ xung quanh.
- Các trạng thái của một đồ vật vẽ **chung một tờ**, không vẽ riêng từng ảnh. Chỉ khi lời giao việc ghi rõ "chỉnh sửa từ ảnh <đường dẫn>" mới vẽ dạng chỉnh sửa ảnh đó (giữ nguyên kích thước, vị trí, góc nhìn, màu, chỉ đổi phần trạng thái).

## Quy tắc giao việc và tự kiểm (O2-11, bắt buộc)

- **Lời giao việc** (do Art 2D viết) phải **dán thẳng** khối quy tắc phong cách (`art/style.md` mục 1) và khối góc nhìn (`art/style.md` mục 2b), không chỉ trỏ tới file.
- **Trước khi gọi `image_gen`**, Codex viết ra (trong log) phần **"Nhắc lại quy tắc"**: tóm tắt bằng lời của mình các quy tắc phong cách, góc nhìn, màu, nét và yêu cầu riêng của asset. Thiếu phần này thì lượt vẽ bị coi là hỏng.
- **Tin nhắn cuối** có phần **"Tự kiểm"**: liệt kê từng quy tắc (góc nhìn chung, nét, màu, không chữ, nền, bố cục/ô, nhân vật…) kèm **đạt / không đạt** và một câu lý do.

## Lưu file

- Ảnh tạo ra nằm ở `$CODEX_HOME/generated_images/...`. Sau khi vẽ, **chép nguyên ảnh đã chọn vào** đường dẫn trong lời giao việc. Tạo thư mục con nếu chưa có.
  - Tờ: `art/out/_sheets/<tên tờ>.png`, ví dụ `art/out/_sheets/l1_pate_sheet.png`.
  - Ảnh lẻ: `art/out/<đường dẫn trong cột File>`, ví dụ `art/out/level1/l1_bg_living_room.png`.
  - Ảnh demo: `art/out/demo/...`.
- Tên file đúng y như lời giao việc / cột File: chữ thường không dấu, số, dấu gạch dưới, đuôi `.png`. Không tự đổi tên.
- Không ghi đè ảnh đã có, trừ khi lời giao việc ghi rõ "được phép ghi đè". Nếu không được ghi đè mà file đã có, dừng và báo lại.
- Chỉ ghi file trong `art/out/`. Không sửa bất kỳ file nào khác trong dự án.

## Tự kiểm tra trước khi xong

Xem lại ảnh vừa vẽ: đúng đồ vật, đúng phong cách bút chì màu pastel, nét viền nâu, không có chữ, đồ vật không bị cắt, nền đúng loại. Với tờ: mỗi thứ nằm đúng vùng ô của nó, không chạm nhau, các trạng thái cùng cỡ và cùng đường đáy. Nếu sai rõ ràng, vẽ lại tối đa 1 lần với một chỉnh sửa cụ thể.

## Báo cáo

Tin nhắn cuối cùng, ngắn gọn, gồm (thêm phần "Tự kiểm" như mục Quy tắc giao việc và tự kiểm):
- `SAVED: art/out/...` cho mỗi file đã lưu (hoặc `FAILED: <key> – <lý do>`).
- Prompt cuối cùng đã gửi cho `image_gen`.
- Một dòng tự nhận xét chỗ chưa ổn (nếu có).
