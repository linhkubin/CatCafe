VẼ TỜ `l10src_mun_bear_c` — Level 10, góp ý G10-18 (chủ dự án chọn kiểu Mun gấu bông ở demo 1). Đúng quy tắc AGENTS.md: vai Codex chỉ vẽ, **một lần gọi image_gen, một ảnh**. **Model gpt-6.1-sol, mức medium.**

## Ảnh
- **1536x1024 ngang, nền TRONG SUỐT thật**, lưu **art/out/_sheets/l10src_mun_bear_c.png** (file mới). Chép nguyên, không xử lý.
- 3 ô cạnh nhau, mỗi ô 512x1024: ô 1 x 0–512, ô 2 x 512–1024, ô 3 x 1024–1536. Mỗi ô **một dáng Mun** (thứ tự dưới đây), nằm trọn trong ô, cách mép ô ≥40px, không chạm ô bên. Không kẻ khung, không số.
- **Cả 3 dáng cùng một cỡ**: cùng cỡ đầu, cùng cỡ người, **đáy chân cùng một đường y ≈ 980**. Mun to gần kín ô (đứng thẳng cao khoảng 850px).
- **CHỈNH SỬA TỪ ẢNH art/out/_sheets/l10src_mun_bear_a.png** bằng image_gen chế độ chỉnh sửa: **giữ nguyên khung, bộ đồ, màu, nét, cỡ đầu, cỡ người, vị trí 3 ô, đáy chân y ≈ 980**; chỉ đổi dáng mỗi ô thành dáng mới dưới đây.
- Mun quay sang PHẢI (đối thủ ở bên phải).
- Không vẽ lửa, nền, bóng sàn, quầng, viền trắng, chữ, số, logo. Không giống nhân vật phim nào.
- Màu nhạt như art/ref/owner_l1_style_ref.png, vân chì rõ trong mọi mảng màu.
- Trước khi gọi image_gen viết "Nhắc lại quy tắc". Tin nhắn cuối: "Tự kiểm" (đúng bộ đồ như demo, đúng dáng từng ô, cùng cỡ và cùng đường đáy, màu nhạt, nền trong suốt, không chữ), SAVED, prompt cuối.

## Bộ đồ
Mun (mèo đen, art/out/cats/mun_ref.png) **mặc bộ đồ gấu bông y như ảnh demo art/ref/l10_demo/cut/mun_bear_g10-18.png**: lông thú vải **nâu ấm mềm như gấu bông**, lông xù ngắn thấy vân chì; **mũ trùm có hai tai gấu tròn** hai bên, tai mèo đen nhọn có lòng hồng thò ra trên đỉnh mũ; **mặt Mun đen lộ trọn** trong khung mũ (mắt vàng hổ phách to, má hồng, ria trắng mảnh); **bụng mảng tròn màu kem nhạt có đường may chỉ quanh viền**; tay và chân ống tròn mập, bàn chân gấu tròn; đuôi mèo đen thò sau lưng. Màu nâu ấm nhạt, không đỏ, không cam đậm; đúng tỉ lệ như demo (đầu to, người tròn).

## Ảnh tham chiếu (mở bằng view_image)
1. **art/ref/l10_demo/cut/mun_bear_g10-18.png** — ảnh demo gốc (Mun gấu bông đang che mặt đỡ lửa). Vẽ bộ đồ giống hệt.
2. art/out/cats/mun_ref.png — mặt Mun.
3. art/ref/owner_l1_style_ref.png — chuẩn màu.
4. **art/out/_sheets/l10src_mun_bear_a.png** — tờ chuẩn để chỉnh sửa.

## 3 dáng
- Ô 1 → `mun_gorilla_look`: **Ngửa cổ nhìn theo vật bay trên cao**: hai tay buông, đầu ngửa ra sau, mắt tròn tò mò nhìn lên.
- Ô 2 → `mun_gorilla_sniff`: **Cúi đầu ngửi** về trước bên phải, lưng khom, mũi hồng phập phồng (2 vạch nhỏ cạnh mũi), mắt hé tò mò.
- Ô 3 → `mun_gorilla_lick`: **Cúi xuống ăn**: khom sâu về trước bên phải, đầu cúi thấp ngang hông, lưỡi hồng nhỏ thè ra liếm, mắt híp sung sướng, hai tay chống gối.

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
