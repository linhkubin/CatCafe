# Art Style – Meo Đâu Rồi?

> File này là **phong cách chung cho toàn bộ game**. Bỏ nó vào Files của Project trên ChatGPT (hoặc dán phần "Prompt phong cách" vào Instructions). Mọi ảnh vẽ ra phải theo file này, rồi mới tới đặc tả riêng trong từng file `design-art-levelX.md`.

---

> **Quy trình làm mỗi level:** xem `QUY-TRINH.md` ở gốc dự án (đặc tả → bàn art với Dev → demo kèm ảnh mẫu level 1 → chủ dự án duyệt → tách asset).

## 1. Prompt phong cách (dán vào Instructions của Project)

```
You are the artist for a cute 2D mobile puzzle game about finding cats ("Meo Đâu Rồi?").
Every image you draw for this project MUST follow this style:

STYLE
- Hand-drawn look, like a children's picture book drawn with soft colored pencils.
- Visible light colored-pencil texture and gentle grainy strokes inside the color areas.
- Outlines: thin, slightly wobbly hand-drawn colored-pencil lines in warm dark brown (never pure black), with natural pressure variation like a real pencil: a bit darker and thicker in tucked-in places, overlaps and folds, lighter and tapering at the stroke ends, with small breaks along fluffy fur edges. Never one uniform, evenly thick, clean vector line.
- Fur and soft edges: the outline can be drawn as short broken pencil strokes following the fur, sometimes in a slightly lighter brown.
- Shapes: simple, round, chubby, soft corners. Slightly crooked and playful, never perfectly geometric.
- Cute and funny ("kawaii" but not anime): big heads, small bodies, round eyes, tiny mouths.

COLOR
- Fresh, clear pastel colors with a little more saturation, like richly shaded colored pencil on cream paper: cheerful and bright, never washed out or greyish, never neon.
- Main palette: cream, warm white, peach, rosy pink, butter yellow, fresh mint green, leaf green, clear sky blue, warm honey-caramel wood, lavender.
- Medium-low saturation, soft contrast; colors should read clearly at small size. No strong dark shadows.
- Shading: only a few soft pencil strokes on one side; no gradients, no glossy highlights, no 3D render look.

SIMPLICITY
- Very few details. Each object is recognisable from its silhouette alone.
- NO complex patterns, NO tiny ornaments, NO busy textures, NO realistic wood grain or fabric weave.
- Allowed patterns only when the design asks for it, and then big and simple (3-5 stripes, 5-7 big dots).
- Backgrounds are calm and simple, with lots of empty space.

ABSOLUTE RULES
- NO text, NO letters, NO numbers, NO logos, NO watermark, NO signature anywhere. Labels and signs use simple pictures only.
- One object per image unless the spec says otherwise, centered, fully visible, not cropped.
- Sprites (characters, objects, UI): transparent background, no floor shadow unless asked.
- Backgrounds: portrait 2:3 (1024x1536), seen straight from the front, slightly top-down, no characters.
- Keep the same character exactly the same across all images (use the reference images I upload).
```

---

## 2. Giải thích phong cách (tiếng Việt)

| Yếu tố | Yêu cầu |
|---|---|
| Cảm giác | Ngộ nghĩnh, dễ thương, ấm áp, như tranh truyện thiếu nhi |
| Chất liệu | Bút chì màu trên giấy kem, thấy rõ vân chì nhẹ |
| Nét viền | Nâu ấm (không đen), **mảnh**, run tay, **đậm nhạt như bút chì thật**: đậm và dày hơn ở chỗ khuất, chỗ gập, chỗ chồng nhau; nhạt và mảnh dần ở đầu nét; chỗ lông xù có nét đứt ngắn. Không phải một đường đều dày như vector (O5) |
| Hình khối | Tròn, mập, bo góc, hơi méo cho vui mắt |
| Màu | Pastel trong và tươi, bão hòa vừa phải (tươi hơn bản demo đầu, không bạc màu, không màu chói), theo `art/ref/owner_color_ref.png` (O3) |
| Đổ bóng | Vài nét chì một bên, không gradient, không bóng loáng |
| Chi tiết | Tối giản, nhìn bóng là nhận ra đồ vật |
| Họa tiết | Không có. Chỉ khi đặc tả yêu cầu (tất sọc, tất chấm bi) thì vẽ to, ít |
| Chữ | **Tuyệt đối không có chữ, số, logo** |

**Ảnh mẫu màu và nét chuẩn: `art/ref/owner_l1_style_ref.png`** (tranh level 1 chủ dự án chọn). Mọi tranh và asset phải nhạt, ít bão hoà, viền nâu mảnh nhạt, vân chì mịn như ảnh này; đo độ bão hoà trung bình gần ~0,25 (thang 0–1, HSV), không tăng tương phản.

### Bảng màu tham khảo

| Màu | Mã gần đúng | Dùng cho |
|---|---|---|
| Kem giấy | `#FCF1DD` | Nền, tường |
| Trắng ấm | `#FFFAF0` | Sữa, tất, gối |
| Nâu viền | `#6B4A3A` | Nét viền mọi thứ |
| Gỗ mật ong | `#F2C796` | Sàn gỗ, đồ gỗ sáng |
| Nâu caramel | `#D6A472` | Đồ gỗ đậm, khung, hộp các-tông |
| Hồng đào | `#F7B9A3` | Má, mũi, tai trong, điểm nhấn |
| Hồng phấn | `#F8C6CC` | Đồ vải, thảm |
| Vàng bơ | `#FCE39A` | Đèn, nắng, lấp lánh |
| Xanh bạc hà | `#B9DDBE` | Sofa, đồ vải, đồ trang trí |
| Xanh lá | `#9DC283` | Lá cây |
| Xanh da trời | `#B8DAF2` | Rèm, cửa sổ, chăn, mắt Sữa |
| Tím oải hương | `#D8CCF0` | Bóng đổ nhẹ, đêm |
| Đen than ấm | `#3E3838` | Riêng Mun (không dùng đen tuyền) |

---

## 2b. Góc nhìn chung (cho cả game, O2-10)

Mọi nền và mọi đồ vật dùng **một camera duy nhất**, như nền và đồ vật level 1 (D3):
- Nhìn **chính diện**, mắt hơi cao hơn đồ, nhìn xuống khoảng **15°**.
- **Cạnh ngang luôn nằm ngang**, **cạnh đứng luôn thẳng đứng**. Không phối cảnh xiên, không điểm tụ, không góc ba phần tư, không đồ nào xoay chéo.
- **Mặt trước** của đồ là mặt chính, thấy gần như trọn vẹn. **Mặt trên** chỉ là một dải mỏng (khoảng 1/5 chiều cao mặt trước), mặt tròn thành elip dẹt. Mặt hông chỉ thấy khi đồ có chiều sâu lớn, và chỉ là một dải hẹp bên phải.
- Ánh sáng từ **trên trái**: vài nét chì đổ bóng ở **bên phải** và dưới đồ. Không bóng đổ dưới sàn (code vẽ).
- Đồ đặt sát tường thì mặt trước song song với tường.
- Đồ cao lớn đặt bên phải khung (như tủ quần áo) được thấy **một dải hông hẹp bên phải** và nóc là dải mỏng. **Đồ đặt trên hoặc sát nó** (hộp trên nóc tủ…) phải theo **đúng góc đó**: thấy mặt trước, dải hông phải cùng độ rộng tương đối, mặt trên song song với nóc.

| Đồ | Đúng | Sai |
|---|---|---|
| Ghế | Nhìn thẳng mặt trước: lưng tựa là hình chữ nhật đứng, mặt ghế là dải ngang mỏng, 4 chân thẳng đứng (2 chân sau ngắn hơn, lấp sau chân trước) | Ghế xoay chéo 3/4, thấy mặt ghế hình thoi, chân xiên |
| Giường | Nhìn ngang dọc thân giường: đầu giường một bên, chân giường bên kia, mặt nệm và chăn là dải dày nằm ngang, khung giường hình chữ nhật thẳng | Giường nhìn từ trên xuống thấy cả mặt nệm, hoặc giường xoay chéo vào trong phòng |
| Tủ | Mặt trước chữ nhật thẳng đứng, 2 cánh song song; nóc là một dải mỏng; một dải hông hẹp bên phải | Tủ nghiêng, nóc thấy rộng, cạnh hông chụm về một điểm |
| Hộp | Mặt trước chữ nhật, nắp là dải mỏng phía trên, hông là dải hẹp bên phải; cùng góc với đồ bên cạnh | Hộp vẽ phẳng 2D không có chiều sâu, hoặc xoay 3/4 |
| Giỏ tròn | Thân giỏ nhìn ngang, miệng giỏ là elip dẹt (cao bằng ~1/5 bề ngang) | Miệng giỏ tròn vành vạnh như nhìn từ trên xuống |

**Khối dán vào mọi lời giao việc** (O2-11):
```
CAMERA (one shared camera for the whole game): straight-on FRONT view, eye slightly above, looking down only about 15 degrees.
Horizontal edges stay horizontal, vertical edges stay vertical. NO three-quarter view, NO oblique/diagonal perspective, NO vanishing points, nothing rotated diagonally.
The front face is the main visible face; the top face is only a thin strip (about 1/5 of the front height); round tops are flat ellipses; a side face, if any, is only a narrow strip on the RIGHT.
Light from the upper left: a few pencil shading strokes on the right/bottom of each object. No floor shadow.
```

---

## 3. Nhân vật cố định

Vẽ **ảnh tham chiếu** cho từng nhân vật trước tiên, tải về rồi upload lại vào Project. Từ đó mọi ảnh có nhân vật đều kèm câu: *"dùng đúng nhân vật trong ảnh tham chiếu"*.

### Sữa — mèo trắng nhà bạn (level 1–4)
**Chốt theo ảnh `cats/sua_ref.png`**, vẽ theo thiết kế của chủ dự án `art/ref/owner_sua_ref.png` (O2). Khi chữ và ảnh khác nhau thì theo ảnh.
- Mèo con trắng ấm, **lông xù bông như cục bông** (mép lông nhiều túm nhỏ mềm, nhất là ở má và ngực), thân tròn gọn, ngồi thu lu.
- **Đầu rất to tròn**, rộng hơn thân. **Mắt to tròn xanh da trời** viền nâu, **lòng đen to** màu nâu sẫm với 1–2 chấm sáng trắng; mũi hồng nhỏ; **miệng chữ ω nhỏ**; má hồng tròn; vài sợi ria mảnh.
- **Tai nhọn bo đầu**, to, dựng, trong tai hồng đào.
- **Chân trước mũm mĩm**, bàn chân tròn.
- **Đuôi bông to**, xù, đầu đuôi tròn, thường quấn quanh người.
- Tính cách: tham ăn, ngủ nhiều, mặt hơi "ngơ ngác", rất đáng yêu.
- **Không có đốm, không có vòng cổ.**

### Mun — mèo đen hàng xóm (level 5–10)
- Mèo đen than ấm (`#3E3838`, không đen tuyền), dáng thon hơn Sữa, chân dài hơn.
- Mắt tròn to **màu vàng mật ong**, rất nổi bật. Tai hơi cụp xuống (nhút nhát).
- Đuôi dài, mảnh. Mũi hồng xám nhỏ.
- Tính cách: nhút nhát, hay rụt người, mắt nhìn lén.

### Nhân vật chính (người chơi)
- Một bạn nhỏ, **tóc xoăn bồng màu nâu caramel** (mái tóc xù tròn nhiều lọn xoăn nhỏ, như trong tranh `art/out/demo/l1_demo_start.png`; O1), không rõ nam hay nữ.
- Mặt tròn, mắt chấm đen nhỏ, má hồng. Áo len rộng màu vàng bơ, quần xanh da trời nhạt, dép bông.
- Tỉ lệ chibi: đầu to bằng nửa thân.

### Ảnh tham chiếu nhân vật

| File (trong art/out/) | Key trong code | Kích thước | Mô tả |
|---|---|---|---|---|
| `cats/sua_ref.png` | `sua_ref` | 1536x1024 | Sữa 3 tư thế: ngồi nhìn thẳng, đi nhìn nghiêng, ngủ cuộn tròn |
| `cats/mun_ref.png` | `mun_ref` | 1536x1024 | Mun 3 tư thế: ngồi nhìn thẳng, đi nhìn nghiêng, ngủ cuộn tròn |
| `player/player_ref.png` | `player_ref` | 1536x1024 | Nhân vật chính: đứng nhìn thẳng, nhìn nghiêng, nhìn sau lưng |

Ảnh tham chiếu chỉ để giữ nhân vật giống nhau, không dùng trong game.

---

## 4. Quy tắc đặt tên (dev dùng trực tiếp)

Chốt ở `art/review/level1-thread.md` V23. Tên trong các file đặc tả **là tên chính thức**, dev dùng thẳng vào code. Không tự đổi tên.

1. **Key** = tên file bỏ `.png`, chỉ gồm chữ thường không dấu, số và `_`. Ví dụ `level1/l1_pate_can_open.png` → key `l1_pate_can_open`.
2. **Thứ tự các phần:** `<tiền tố>_<đồ vật>[_<bộ phận>][_<trạng thái>][_f<số>]`. Ví dụ `l1_wall_clock_open`, `l1_wall_clock_bird`, `l1_pate_can_steam`, `sua_eat_f2`.
3. **Tiền tố và thư mục** (trong `art/out/`):

   | Tiền tố | Thư mục | Dùng cho |
   |---|---|---|
   | `l<N>_` | `level<N>/` | Đồ riêng của level |
   | `l<N>_bg_` | `level<N>/` | Nền phòng |
   | `l<N>_fx_` | `level<N>/` | Hiệu ứng riêng của level |
   | `sua_`, `mun_` | `cats/` | Tư thế mèo |
   | `player_` | `player/` | Nhân vật |
   | `ui_` | `common/` | Giao diện |
   | `prop_` | `common/` | Đồ dùng lại ở nhiều level |
   | `fx_` | `common/` | Hiệu ứng dùng chung |

4. **Trạng thái:** đồ có từ 2 trạng thái trở lên thì trạng thái nào cũng có hậu tố (`_closed`/`_open`, `_bulge`/`_lifted`, `_flat`/`_curled`, `_idle`/`_flipped`, `_open_empty`…). Đồ chỉ có một ảnh thì giữ tên trơn.
5. **Khung hình:** khung 1 giữ key gốc, các khung thêm là `_f2`, `_f3`. `_2`, `_3` là trạng thái, không phải khung.
6. **Bộ phận tách rời** là file riêng, tên bộ phận đứng sau tên đồ vật (`_pendulum`, `_bird`, `_steam`). Phần do code cắt từ một texture chỉ là tên frame, không phải file.
7. **Tờ vẽ:** `art/out/_sheets/<tiền tố>_<nhóm>_sheet.png`, không nạp vào game. Bảng tờ nằm trong design-art.
8. **Ảnh thử:** `art/out/demo/test_<tên>.png`. **Tranh dựng cảnh:** `art/out/demo/l<N>_demo_<nội dung>.png`.
9. **Điểm neo** của mọi key nằm trong `art/out/anchors.json`, do công cụ ghi, code đọc. Không sửa tay.

Các trạng thái của cùng một đồ vật vẽ chung một tờ; công cụ cắt ra cùng khung và cùng điểm neo, nên code đổi ảnh không bị giật.

> **Lưu ý:** `design-art-level2.md` trở đi **chưa cập nhật** theo quy tắc này (vẫn tên trạng thái kiểu cũ, mỗi ảnh một canvas, chưa có bảng tờ). Sửa khi tới lượt level đó.

---

## 5. Đồ dùng chung cho cả game (vẽ một lần)

| File (trong art/out/) | Key trong code | Kích thước | Nền | Mô tả |
|---|---|---|---|---|
| `common/ui_hand_pointer.png` | `ui_hand_pointer` | 1024x1024 | Trong suốt | Bàn tay hướng dẫn: bàn tay trẻ con mũm mĩm màu da nhạt, ngón trỏ chỉ chéo xuống trái, viền nâu, ống tay áo len vàng bơ ngắn |
| `common/ui_thought_bubble.png` | `ui_thought_bubble` | 1536x1024 | Trong suốt | Bong bóng suy nghĩ hình đám mây trắng kem, viền nâu run tay, 2 bong bóng tròn nhỏ dẫn xuống góc dưới trái. **Bên trong để trống** |
| `common/ui_question_mark.png` | `ui_question_mark` | 1024x1024 | Trong suốt | Dấu hỏi to, mập, tròn trịa, màu hồng đào, nét chì (đây là ký hiệu, không phải chữ) |
| `common/ui_sparkle.png` | `ui_sparkle` | 1024x1024 | Trong suốt | Ngôi sao lấp lánh 4 cánh màu vàng bơ, kèm 2 chấm sáng nhỏ |
| `common/ui_heart.png` | `ui_heart` | 1024x1024 | Trong suốt | Trái tim mập tròn màu hồng đào |
| `common/ui_dried_fish.png` | `ui_dried_fish` | 1024x1024 | Trong suốt | Con cá khô nhỏ (tiền thưởng), màu caramel nhạt, mắt chấm tròn, có 3 vạch xương đơn giản |
| `common/ui_hint_paw.png` | `ui_hint_paw` | 1024x1024 | Trong suốt | Bàn chân mèo trắng với 4 đệm thịt hồng, giơ lên như đang chỉ |
| `common/ui_bulb_button.png` | `ui_bulb_button` | 1024x1024 | Trong suốt | Nút gợi ý tròn màu vàng bơ, giữa là bóng đèn đơn giản |

---

## 6. Quy trình vẽ: Codex + tờ

Art 2D viết đặc tả và giao việc, **Codex** vẽ (công cụ `image_gen`, trừ vào hạn mức gói ChatGPT), công cụ trong `tools/` cắt và kiểm. Quy tắc riêng của Codex nằm ở `AGENTS.md`.

1. **Ảnh tham chiếu trước:** `sua_ref`, `mun_ref`, `player_ref` (bảng mục 3). Vẽ xong dọn alpha: `python tools/sheet_cut.py clean <ảnh> <ảnh> --ghi-de`.
2. **Đặc tả:** mỗi level có `design-art-level<N>.md` gồm danh sách key, bố cục, và **bảng tờ** (cột `Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét`) kèm mô tả từng key.
3. **Vẽ theo tờ:** mọi trạng thái và bộ phận của một đồ vật vẽ chung một ảnh 1536x1024 (hoặc 1024x1536), mỗi thứ một ô, cùng tỉ lệ, cùng đường đáy, nét theo cột Nét. Đồ nhỏ để ô nhỏ.
   - **Cột Nét** = độ dày đường viền ngoài ở **chỗ đậm nhất**, px trong tờ; phần lớn viền chỉ ~60% số đó, đầu nét nhọn dần, chi tiết bên trong mảnh hơn (O5).
   - **Nét = 3k** cho đồ vật và UI, **2,5k** cho mèo và nhân vật, không bao giờ dưới 2k; k = cỡ AI thực vẽ ÷ cỡ hiển thị (theo số đo lần vẽ trước, chưa có thì lấy ~85% ô). Ở cỡ hiển thị: chỗ đậm ~3px (2,5px với mèo, nhân vật), chỗ nhạt 1,5–2px.
   - **Mẫu nét chuẩn:** `cats/sua_ref.png` (viền ngoài trung vị 5px). Thêm `--stroke-ref art/out/cats/sua_ref.png=<tỉ lệ>` với tỉ lệ ≈ 0,6 × Nét ÷ 5 để lời giao việc có câu so sánh độ dày.
   ```
   node tools/codex-draw.mjs --sheet l1_pate_sheet --ref <ảnh tham chiếu 1>,<ảnh 2> --stroke-ref art/out/cats/sua_ref.png=1.7
   ```
   Codex lưu nguyên ảnh vào `art/out/_sheets/<tờ>.png`, rồi lệnh tự chạy `tools/sheet_cut.py cut`: dọn alpha, cắt theo ô, co về cỡ hiển thị × 1,5, căn các trạng thái chung khung và điểm neo, lưu `art/out/<thư mục>/<key>.png`, ghi `art/out/anchors.json`, xuất ảnh kiểm tra `art/out/_check/<nhóm>.png`.
4. **Ảnh lẻ** (nền): `node tools/codex-draw.mjs l1_bg_living_room`. Thêm `--redo --note "<góp ý>"` để vẽ lại, `--dry` để xem lời giao việc.
5. **Duyệt:** xem `_check/` (chồng 50% các trạng thái, dấu + ở điểm neo), đọc dòng in của công cụ (k thật, nét nên có, cách mép ô), ghép thử lên nền bằng `python tools/sheet_cut.py compose art/design-art-level<N>.md --bg <nền> --out <ảnh ra>`. Lệch rõ thì vẽ lại tối đa 1 lần với một góp ý cụ thể.
6. Nhật ký mỗi lần vẽ ở `art/out/_logs/<tờ hoặc key>.txt`.
