Vẽ NỀN PHÒNG TRỐNG để ghép demo Level 4 (phòng study), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

- Lưu vào: art/out/_demo_parts/l4/bg_study.png, cỡ 1024x1536 (dọc), CÓ NỀN đầy đủ. Tạo thư mục nếu chưa có. Gọi image_gen MỘT lần, chép nguyên ảnh, không xử lý.
- Ảnh tham chiếu, mở bằng view_image trước khi vẽ và đính kèm:
  1. art/ref/owner_l1_style_ref.png = CHUẨN màu, vân chì, nét, góc nhìn chính diện.
  2. art/out/_refs/l4_demo_study_o9c.png = ẢNH GỐC để chỉnh sửa: lấy đúng màu tường, sàn, len chân tường của phòng này.
- Dùng image_gen chế độ chỉnh sửa trên ảnh 2: **XOÁ HẾT** mọi đồ vật, người, mèo, rèm, cửa sổ, mũi tên và mọi giao diện (tim, vòng tròn, nút, túi đồ, bóng đèn). Vẽ liền phần bị che. Chỉ còn **phòng trống**: tường sau trơn màu xanh bạc hà rất nhạt pha kem, **len chân tường gỗ caramel nhạt nằm ngang, mép trên ở đúng y = 950** (thẳng ngang suốt bề ngang), sàn gỗ ván **nằm ngang** mật ong rất nhạt như ảnh 1 từ y≈980 xuống đáy. Không dải tường bên, không đường trần, không bóng đổ, không chữ.
- Màu nhạt như ảnh 1 (khối COLOR dưới). Sau khi lưu chạy `python tools/color_check.py art/out/_demo_parts/l4/bg_study.png`, ghi vào Tự kiểm.
- Trước khi vẽ viết "Nhắc lại quy tắc"; tin nhắn cuối có "Tự kiểm", SAVED, prompt cuối.

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

## Khối góc nhìn (art/style.md mục 2b), dán nguyên
```
CAMERA (one shared camera for the whole game, exactly like the Level 1 reference image): straight-on FRONT view, eye slightly above, looking down only about 15 degrees.
Horizontal edges stay horizontal, vertical edges stay vertical. NO three-quarter view, NO oblique/diagonal perspective, NO vanishing points, nothing rotated diagonally.
The front face is the main visible face; the top face is only a thin strip (about 1/5 of the front height); round tops are flat ellipses; a side face, if any, is only a narrow strip on the RIGHT.
ONE DEPTH RULE FOR EVERY OBJECT (match the cardboard box in the attached Level 1 angle reference): all depth edges in the whole picture (top edges running back toward the wall, side edges) are PARALLEL, all going up and to the right at the same angle of about 30-35 degrees, all shortened to about 1/3 of the real depth. Deeper objects therefore show proportionally wider top and right-side strips (a 60 cm deep desk shows twice the depth of a 30 cm deep bookshelf); objects standing side by side share the same depth angle. A bed shows its mattress top as a clear parallelogram, the mattress thickness in front and the end face at its right (foot) end; headboard, footboard, bedside table, shelf and desk all show their top and right side with the same angle. No object may be completely flat, and no object may have its own different depth angle.
Objects are NOT flat paper cut-outs: like the sofa, box and plant pot in the Level 1 reference, always show the thin top strip, show the thickness of thick objects (mattress, suitcase, books, pillow, shelf, bed) and a narrow right side strip, and give round objects a few pencil shading strokes on the right.
Light from the upper left: a few pencil shading strokes on the right/bottom of each object. No floor shadow.
```
