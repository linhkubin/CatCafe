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

COLOR (locked to the Level 1 reference image)
- The reference image art/ref/owner_l1_style_ref.png is ALWAYS attached. Match its palette, lightness, softness and pencil grain exactly. When in doubt, go lighter and softer, never stronger.
- Soft, light, slightly muted pastels on warm cream paper, like gentle colored pencil: airy and cheerful, but never vivid, never deep, never neon, and never grey or washed out.
- Use ONLY this palette (approximate): cream paper #FCF1DD, warm white #FFFAF0, outline brown #6B4A3A, honey wood #F2C796, caramel #D6A472, peach #F7B9A3, powder pink #F8C6CC, butter yellow #FCE39A, mint #B9DDBE, leaf green #9DC283, sky blue #B8DAF2, lavender #D8CCF0. Only for the black cat Mun: warm charcoal #3E3838.
- No color may be more saturated or darker than its palette swatch. No deep purple or violet, no royal or cobalt blue, no coral or salmon red, no orange, no strong lemon yellow, no bright turquoise.
- Large areas (walls, floors, curtains, beds, big furniture, big balls or bags) stay the lightest and softest colors in the picture; only small accents may be a little stronger.
- Walls are warm cream or a very pale tint of a palette color, never pure white and never a strong tint.
- Every color area shows visible light pencil grain with tiny cream paper gaps: no flat solid fills, no smooth digital gradients, no glossy highlights, no 3D render look.
- Medium-low saturation, soft contrast; colors still read clearly at small size. No strong dark shadows; shading is only a few soft pencil strokes on one side.

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
| Màu | **Khóa theo ảnh mẫu level 1** `art/ref/owner_l1_style_ref.png`: pastel nhạt, mềm, hơi trầm trên giấy kem, chỉ dùng bảng màu bên dưới, không màu nào đậm hơn ô màu của nó; không bạc xám, không chói. Mảng lớn (tường, sàn, rèm, giường, đồ to) nhạt nhất. Mọi mảng màu thấy vân chì, không tô phẳng (O3, O6) |
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

## 2b. Góc nhìn chung (cho cả game, chủ dự án chốt: theo sofa level 1)

**Mẫu góc duy nhất: cái sofa trong ảnh level 1** (`art/ref/l1_depth_angle_ref.png`, cắt từ `art/ref/owner_l1_style_ref.png`). Mọi nền và mọi đồ vật nhìn giống cách nhìn cái sofa đó, chỉ **cho đồ có chiều sâu rõ hơn một chút**.

- **Hơi trực diện:** nhìn thẳng mặt trước, mắt cao hơn đồ, nhìn xuống nhẹ. Cạnh ngang nằm ngang, cạnh đứng thẳng đứng. Không xoay chéo, không góc ba phần tư.
- **Chiều sâu nằm ở mặt trên:** như mặt ngồi sofa level 1, thấy rõ mặt trên của đồ. Cạnh chạy vào chiều sâu đi **gần như thẳng lên**, chỉ hơi chụm nhẹ về giữa tranh. Đồ càng sâu thì mặt trên càng cao: **mặt nệm giường** là một mảng lớn, **mặt bàn** rõ, nóc kệ sách mỏng hơn mặt bàn.
- **Mặt hông rất hẹp:** như hai tay vịn sofa level 1, đồ ở nửa trái tranh thấy một dải hông phải rất mỏng, đồ ở nửa phải thấy dải hông trái rất mỏng. Không đồ nào khoe mặt hông rộng.
- **Không đồ nào phẳng như dán giấy:** luôn thấy mặt trên và độ dày (đệm, vali, sách, gối, giường, tủ, bàn). Đồ tròn có vài nét chì đổ bóng để ra khối, miệng tròn là elip.
- **Đồ chồng lên nhau hoặc đứng cạnh nhau** dùng cùng một cách nhìn: mặt trên song song, độ cao mắt như nhau.
- **Nền phòng** như level 1: tường sau nhìn thẳng, chân tường và ván sàn nằm ngang.
- Ánh sáng từ **trên trái**, vài nét chì đổ bóng bên phải và dưới đồ. Không bóng đổ dưới sàn (code vẽ).

**Khối dán vào mọi lời giao việc:**
```
CAMERA (one shared camera for the whole game): look at everything the way the SOFA in the attached Level 1 angle reference is seen, with objects showing a bit more depth.
Almost straight-on front view, eye a little above the objects, looking down gently. Horizontal edges stay horizontal, vertical edges stay vertical. No diagonal rotation, no three-quarter view.
Depth is shown by the TOP faces, like the sofa seat: depth edges run almost straight up, converging only very slightly toward the picture centre. Deeper objects show taller top faces: a bed shows its mattress top as a large clear area, a desk top is clearly visible and deeper than a bookshelf top.
Side faces are very thin, like the sofa arms: objects on the left half show a very thin right side, objects on the right half a very thin left side.
Nothing is a flat paper cut-out: every object shows its top face and its thickness; round objects have a few pencil shading strokes and elliptical openings. Stacked or neighbouring objects share the same view.
Room backgrounds like Level 1: back wall seen straight on, skirting and floor boards horizontal.
Light from the upper left: a few pencil shading strokes on the right and bottom. No floor shadow.
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

**Tách nền và đồ** (chủ dự án chốt, áp cho mọi màn từ Level 4; Level 3 giữ như hiện tại):
- Ảnh nền `l<N>_bg_*` chỉ là **phòng trống**: tường, sàn, chân tường, trần, ánh nắng.
- **Mọi đồ vật vẽ riêng thành sprite** (`l<N>_<đồ>`, nền trong suốt), kể cả đồ không tương tác: thảm, bàn, sofa, kệ, cửa sổ, tranh, đèn.
- Không vẽ đồ dính vào nền rồi cắt ra, không vá viền. Code đặt từng sprite theo bảng vị trí.

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

### Nút tạm dừng (mọi level, `leveldesign.md` "Tạm dừng chung")

Cùng style nút 💡 `ui_bulb_button` và túi đồ `ui_bag_bar`: nút tròn mập **nền kem giấy**, viền gỗ caramel mập + viền nâu mảnh ngoài cùng, vân chì mịn, vài nét chì đổ bóng bên phải dưới. Biểu tượng ở giữa **nâu ấm** (#6B4A3A), mập, bo tròn đầu, chiếm ~45% đường kính. Không chữ, không số. Cả ba nút cùng một kiểu nền, chỉ khác biểu tượng.

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| ui_pause_sheet | 40,300,440,460 | ui_pause_button | common |  | tâm | rộng 88 | 7 |
| ui_pause_sheet | 482,200,520,620 | ui_play_button | common |  | tâm | rộng 180 | 7 |
| ui_pause_sheet | 1004,200,532,824 | ui_restart_button | common |  | tâm | rộng 180 | 7 |

Bố cục: nút tạm dừng nhỏ bên trái (đường kính ~220px trong tờ), hai nút to ở giữa và bên phải (đường kính ~420px), tất cả căn giữa theo chiều dọc ở y≈520.
- `ui_pause_button`: giữa là **hai vạch đứng** mập, bo tròn đầu, song song. Đặt ở góc trên phải dải giao diện (tâm ≈ (951, 66) trên khung 1024x1536).
- `ui_play_button`: giữa là **tam giác ▶** mập, bo tròn góc, hơi lệch phải cho cân.
- `ui_restart_button`: giữa là **mũi tên vòng ↻** mập (vòng tròn hở ~300°, đầu mũi tên tròn trịa ở đầu vòng).

**Nút về menu** (GD yêu cầu 2026-10-30; dùng ở màn kết thúc cạnh `ui_play_button` và trong lớp tạm dừng). Vẽ thêm sau tờ `ui_pause_sheet` nên có tờ riêng, nhưng phải **giống hệt bộ nút đó**: vẽ lại đúng nền nút của `ui_play_button` / `ui_restart_button` (vòng gỗ caramel nhạt có vân chì, viền nâu mảnh ngoài cùng và một viền nâu mảnh giữa vòng gỗ và mặt kem, mặt trong kem giấy, vài nét chì đổ bóng), cùng tỉ lệ vòng gỗ / mặt kem, cùng độ dày viền, nhìn thẳng. Ba nút đặt cạnh nhau phải như cùng một bộ.

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| ui_home_sheet | 0,0,1024,1024 | ui_home_button | common |  | tâm | rộng 180 | 7 |

Bố cục (tờ 1024x1024): một nút duy nhất ở giữa tờ, **đường kính ~420px** (bằng cỡ nút play/restart trong tờ `ui_pause_sheet`, để nét cùng độ dày), xung quanh trong suốt.
- `ui_home_button`: giữa là **ngôi nhà** mập màu nâu ấm đặc (#6B4A3A, cùng màu và cùng chất vân chì như tam giác ▶): mái tam giác bo tròn ba góc, nhô ra hai bên thân một chút; thân vuông bo góc; **cửa vòm** khoét ở giữa đáy thân (lộ mặt kem). Không ống khói, không cửa sổ. Chiếm ~45% đường kính, căn giữa mặt kem, dáng tròn trịa mềm như mũi tên ↻.

### Icon phòng cho bản đồ mini (mọi màn nhiều phòng, GD yêu cầu 2026-10-30)

Bản đồ mini ở góc trên phải: mỗi ô (~64x36 px, ngang) là icon một phòng. Ô đang đứng có khung vàng, các ô khác mờ (code vẽ khung, icon chỉ là hình). Code co icon vừa ô nên **mọi icon có tỉ lệ khung gần 16:9 (ngang)**.

Mỗi icon là **một món đặc trưng nhất của phòng**, vẽ lại đúng món đó trong demo đã duyệt (hình dáng, màu chính), nhưng **giản lược mạnh** để đọc được ở cỡ 64x36:
- Dáng to, mập, bóng rõ; bỏ chi tiết nhỏ (nan hoa, vân gỗ, gáy sách, nếp vải); họa tiết nếu có thì rất to, rất ít.
- **Nét viền nâu đậm và dày hơn đồ trong cảnh** (theo cột Nét), vẫn chất chì, đầu nét nhọn dần.
- Màu theo demo nhưng **giữ đậm hơn nền một nấc** để không chìm khi icon bị mờ; vẫn trong bảng màu khóa, không chói.
- Cùng góc nhìn CAMERA (mục 2b), không bóng sàn, không khung, không nền, không chữ.
- **Riêng tờ này không theo luật "cùng tỉ lệ thật":** mỗi icon tự lấp đầy ô của nó (khoảng 80% bề ngang ô hoặc 80% chiều cao ô, cái nào chạm trước), để 5 icon cùng cỡ thị giác, cùng độ dày nét, cùng độ đậm khi đặt cạnh nhau.

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| ui_map_sheet | 0,60,526,470 | ui_map_bedroom | common |  | tâm | rộng 64 | 22 |
| ui_map_sheet | 526,60,544,470 | ui_map_living | common |  | tâm | rộng 64 | 22 |
| ui_map_sheet | 1070,60,466,470 | ui_map_study | common |  | tâm | rộng 64 | 22 |
| ui_map_sheet | 112,540,683,450 | ui_map_yard | common |  | tâm | rộng 64 | 22 |
| ui_map_sheet | 795,540,615,450 | ui_map_alley | common |  | tâm | rộng 64 | 22 |

Bố cục (tờ 1536x1024): hàng trên 3 icon phòng của Level 4 (ngủ, khách, làm việc), hàng dưới 2 icon của Level 5 (sân, hẻm), căn giữa. Mỗi icon nằm giữa ô của nó (ô ~512x420), bản thân icon ngang ~16:9.
- `ui_map_bedroom` (phòng ngủ L4, demo `art/out/demo/l4_demo_bedroom.png`, cái giường ở giữa phải): **giường đơn** nhìn trực diện hơi từ trên, khung gỗ caramel, đầu giường cao bên trái, chân giường thấp bên phải; mặt nệm/chăn **xanh da trời với 3–4 chấm tròn kem to**; một gối kem viền hồng ở đầu giường. Không đèn ngủ, không gấu bông, không nệm dựng.
- `ui_map_living` (phòng khách L4, demo `art/out/demo/l4_demo_living.png`, sofa bên phải): **sofa 2 chỗ màu xanh bạc hà**, lưng tựa 2 khối tròn, tay vịn tròn mập hai bên, 2 đệm ngồi, chân gỗ ngắn. Không rèm, không tháp đồ, không người.
- `ui_map_study` (phòng làm việc L4, demo `art/out/demo/l4_demo_study.png`, bàn bên phải): **bàn gỗ caramel** có một ngăn kéo núm tròn, 4 chân; trên bàn bên trái là **đèn bàn xanh bạc hà** cổ cong, chụp đèn tròn hơi sáng vàng bơ; bên phải một **ống bút hồng đào** cắm 3 bút chì màu (chỉ là 3 que màu). Không kệ sách, không vali, không bóng.
- `ui_map_yard` (sân sau L5, demo `art/out/demo/l5_demo_yard_916.png`, hàng rào và dây phơi phía sau): **một đoạn hàng rào gỗ kem** 5–6 thanh đầu tròn, trên có **dây phơi** căng giữa 2 cọc gỗ, treo **một chiếc áo phông xanh bạc hà** bằng một kẹp gỗ. Không túi rác, không bàn trang điểm, không hộp.
- `ui_map_alley` (con hẻm L5, demo `art/out/demo/l5_demo_alley_916.png`, xe đạp hồng bên phải): **xe đạp hồng phấn** nhìn ngang, 2 bánh là vòng tròn xám nâu dày **không vẽ nan hoa** (hoặc 3 nan rất mảnh), yên nâu, giỏ mây vàng caramel phía trước; phía sau xe là **một mảng tường kem với 2–3 viên gạch hồng nhạt** nhỏ để gợi hẻm. Không đĩa CD, không xe kéo, không mèo, không quạ.

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
