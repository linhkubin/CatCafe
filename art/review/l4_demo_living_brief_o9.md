Vẽ lại ẢNH DEMO `l4_demo_living` cho Level 4 (lượt O9: QUY LUẬT CHIỀU SÂU CHUNG, vẫn góc chính diện như level 1, màu O6), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

Chủ dự án nhận xét lượt trước: **"chiều sâu của bàn và tủ đang lệch nhau, chiều sâu kệ, giường và giường thì lại đang phẳng"**. Việc lượt này: **mọi đồ có chiều sâu theo MỘT quy luật** (O9), giữ góc chính diện, giữ màu.

**Quy luật O9 (bắt buộc, kiểm bằng thước):** mặt trước mỗi đồ vẫn là hình phẳng nhìn thẳng (cạnh ngang nằm ngang, cạnh đứng thẳng đứng). **Mọi cạnh chiều sâu** (cạnh nóc chạy về phía tường, cạnh hông phải) **trong cả bức tranh song song nhau**, cùng chếch **lên trên, sang phải đúng 32°**. Nóc và hông phải mỗi đồ là **hình bình hành**: lấy cạnh trên (và cạnh phải) của mặt trước, dời lên-phải theo độ lệch (dx, dy) ghi ở từng đồ dưới đây (px trên ảnh 1024x1536). Đồ sâu hơn thì dải nóc/hông rộng hơn đúng tỉ lệ.

- Lưu vào: art/out/demo/l4_demo_living.png, cỡ 1024x1536, CÓ NỀN đầy đủ. ĐƯỢC PHÉP GHI ĐÈ art/out/demo/l4_demo_living.png (chỉ file này). Gọi image_gen MỘT lần, chép nguyên ảnh, không cắt, không chỉnh màu hậu kỳ.
- Đặc tả: art/design-art-level4.md mục 2d (bảng chiều sâu O9) và mục 5. Quy tắc: art/style.md mục 1 (COLOR), mục 2b (CAMERA O8 + O9).
- Ảnh tham chiếu (TỐI ĐA 5), mở HẾT bằng view_image trước khi vẽ, đính kèm theo thứ tự:
  1. art/ref/owner_l1_style_ref.png = **CHUẨN về góc nhìn chính diện, màu, độ nhạt, vân chì, nét**.
  2. art/out/_refs/l4_demo_living_o8.png = **ẢNH GỐC để chỉnh sửa**: bố cục, màu (đã đạt), nhân vật, mèo, giao diện giữ nguyên. Chỉ sửa chiều sâu các đồ theo danh sách.
  3. art/out/_check/l4_depth_living_o8.jpg = ảnh gốc phủ **lưới đường đỏ chếch 32°**: chỉ để thấy góc chiều sâu cần theo. **KHÔNG vẽ đường đỏ vào ảnh.**
  4. art/out/cats/sua_ref.png (Sữa)
  5. art/out/player/player_ref.png (nhân vật)
- Dùng image_gen **chế độ chỉnh sửa trên ảnh 2**.
- Trước khi gọi image_gen, viết "Nhắc lại quy tắc" (phong cách, màu O6, góc O8, **chiều sâu O9 với số dx, dy từng đồ**, nét, không chữ, nền). Tin nhắn cuối có "Tự kiểm": từng quy tắc đạt / không đạt; **chiều sâu chấm riêng từng đồ** (có nóc/hông hình bình hành chưa, cạnh có chếch 32° song song với các đồ khác chưa, độ rộng có đúng tỉ lệ chưa), SAVED, prompt cuối, một dòng chỗ chưa ổn.
- Sau khi lưu, chạy `python tools/color_check.py art/out/demo/l4_demo_living.png` và `python tools/depth_check.py art/out/demo/l4_demo_living.png art/out/_check/l4_depth_living.jpg`, mở ảnh kiểm bằng view_image và ghi vào Tự kiểm đồ nào song song lưới, đồ nào lệch. Không tự vẽ lại.

## Khối phong cách (art/style.md mục 1), dán nguyên

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

## Khối góc nhìn O8 + O9 (art/style.md mục 2b), dán nguyên

```
CAMERA (one shared camera for the whole game, exactly like the Level 1 reference image): straight-on FRONT view, eye slightly above, looking down only about 15 degrees.
Horizontal edges stay horizontal, vertical edges stay vertical. NO three-quarter view, NO oblique/diagonal perspective, NO vanishing points, nothing rotated diagonally.
The front face is the main visible face; the top face is only a thin strip (about 1/5 of the front height); round tops are flat ellipses; a side face, if any, is only a narrow strip on the RIGHT.
ONE DEPTH RULE FOR EVERY OBJECT: all depth edges in the whole picture (top edges running back toward the wall, side edges) are PARALLEL, all going up and to the right at the same angle of about 30-35 degrees, all shortened to about 1/3 of the real depth. Deeper objects therefore show proportionally wider top and right-side strips (a 60 cm deep desk shows twice the depth of a 30 cm deep bookshelf); objects standing side by side share the same depth angle. A bed shows its mattress top as a clear parallelogram, the mattress thickness in front and the end face at its right (foot) end; headboard, footboard, bedside table, shelf and desk all show their top and right side with the same angle. No object may be completely flat, and no object may have its own different depth angle.
Objects are NOT flat paper cut-outs: like the sofa, box and plant pot in the Level 1 reference, always show the thin top strip, show the thickness of thick objects (mattress, suitcase, books, pillow, shelf, bed) and a narrow right side strip, and give round objects a few pencil shading strokes on the right.
Light from the upper left: a few pencil shading strokes on the right/bottom of each object. No floor shadow.
```

## Chiều sâu từng đồ (dx, dy = độ dời cạnh sau so với cạnh trước, lên-phải 32°)
- **Sofa** (sâu 85 cm): (dx, dy) = (+63, −39). Mặt đệm ngồi và nóc tay vịn, nóc lưng tựa là hình bình hành rõ; thấy hông tay vịn phải.
- **Tháp**, mỗi món nóc + hông phải theo cùng góc, cạnh song song nhau:
  - đệm gấp (dưới cùng, sâu 90): (+66, −41), thấy mặt trên đệm là hình bình hành rộng có chần quả trám;
  - vali gập (sâu 45): (+33, −21);
  - chồng sách (sâu 22): (+16, −10), thấy mép giấy ở hông phải;
  - gối (sâu 40): (+30, −19), phồng.
  Món trên đặt **lên mặt trên** món dưới (đáy món trên nằm trong hình bình hành nóc món dưới).
- **Bệ cửa sổ** (sâu 15): (+11, −7). **Thanh rèm**: trụ tròn, không cần cạnh sâu.
- Đồ tròn (bóng, chao đèn, gấu, mèo, nhân vật): không có cạnh sâu, giữ như ảnh 2, chỉ thêm vài nét chì đổ bóng bên phải.
- Giữ mọi thứ khác như ảnh 2: màu, bố cục, chân tường và ván sàn nằm ngang, giao diện.
