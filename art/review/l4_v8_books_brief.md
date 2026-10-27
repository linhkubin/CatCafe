CHỈNH SỬA TỪ ẢNH art/out/_sheets/l4v6_books_sheet.png (bộ sách Level 4, Vòng 8), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

Chủ dự án (G4-30, G4-32): 3 sách rơi là **3 cuốn trái nhất hàng trên cùng của kệ: hồng, bạc hà, vàng bơ** (xem ảnh tham chiếu 2, đúng màu và độ nhạt 3 cuốn đó). Sách lẻ và chồng sách phải là đúng 3 cuốn này.
- Dùng image_gen chế độ chỉnh sửa trên ảnh gốc, cỡ 1536x1024, **nền trong suốt**. **Giữ nguyên hình dáng, vị trí, nét, cỡ** từng cuốn; **chỉ đổi màu bìa/gáy**:
  - Chồng sách (ô trên trái): cuốn trên cùng giữ **hồng**; cuốn giữa (đang oải hương) → **bạc hà**; cuốn dưới cùng (đang xanh lá) → **vàng bơ**. Xoá mảng xanh lá lạ trên cuốn giữa.
  - 3 sách lẻ (hàng dưới): ô 1 giữ **hồng**; ô 2 (đang oải hương) → **bạc hà**; ô 3 (đang xanh lá) → **vàng bơ**.
  - Màu hồng, bạc hà, vàng bơ **giống hệt 3 cuốn trên kệ ở ảnh tham chiếu 2** (cùng sắc, cùng độ nhạt), ruột giấy kem, viền nâu như cũ.
- Lưu vào: art/out/_sheets/l4v8_books_sheet.png (được phép ghi đè). Gọi image_gen MỘT lần, chép nguyên ảnh.
- Ảnh tham chiếu, mở bằng view_image và đính kèm: 1. art/out/_sheets/l4v6_books_sheet.png (ẢNH GỐC); 2. art/ref/l4_v6_input/shelf_toprow_colors.png (màu 3 cuốn trên kệ); 3. art/out/demo/l4_demo_study.png (ẢNH DEMO GỐC); 4. art/ref/owner_l1_style_ref.png.

- Ảnh demo gốc (G4-26): art/out/demo/l4_demo_study.png, kệ sách nằm ở x 98–497, y 196–890. Mở bằng view_image, đính kèm cho image_gen.
- Trước khi gọi image_gen viết "Nhắc lại quy tắc"; tin nhắn cuối có "Tự kiểm" (từng điểm: đạt / không đạt; phần không được sửa có giữ y nguyên không), SAVED, prompt cuối.

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
CAMERA (one shared camera for the whole game): look at everything the way the SOFA in the attached Level 1 angle reference is seen, with objects showing a bit more depth.
Almost straight-on front view, eye a little above the objects, looking down gently. Horizontal edges stay horizontal, vertical edges stay vertical. No diagonal rotation, no three-quarter view.
Depth is shown by the TOP faces, like the sofa seat: depth edges run almost straight up, converging only very slightly toward the picture centre. Deeper objects show taller top faces: a bed shows its mattress top as a large clear area, a desk top is clearly visible and deeper than a bookshelf top.
Side faces are very thin, like the sofa arms: objects on the left half show a very thin right side, objects on the right half a very thin left side.
Nothing is a flat paper cut-out: every object shows its top face and its thickness; round objects have a few pencil shading strokes and elliptical openings. Stacked or neighbouring objects share the same view.
Room backgrounds like Level 1: back wall seen straight on, skirting and floor boards horizontal.
Light from the upper left: a few pencil shading strokes on the right and bottom. No floor shadow.
```
