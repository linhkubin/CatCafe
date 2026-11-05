VẼ LẠI 4 ĐUÔI MUN — tờ `l8_mun_tail_sheet` — Level 8 "Tắm cho Mun" (G8-12 mục 2, chủ dự án: đuôi hiện hơi xấu), đúng quy tắc AGENTS.md (vai Codex: chỉ vẽ). Model gpt-6.1-sol, mức medium.
**Ảnh demo gốc: art/out/demo/l8_demo_stage1.png** (Mun bẩn có đuôi, xem chất lông và độ dài đuôi).
Lưu: **art/out/_sheets/l8_mun_tail_sheet.png** (1536x1024 ngang, nền trong suốt, file mới).

## Bố cục: 4 ô ngang, mỗi ô 384x1024 (x 0–383, 384–767, 768–1151, 1152–1535), mỗi ô một đuôi
- **Mọi đuôi cùng một hướng:** **gốc đuôi ở dưới-trái** của ô, tại khoảng **(x ô + 90, y 900)**, đuôi **mọc lên trên rồi cong sang phải thành chữ S mềm**, chóp đuôi ở trên-phải (y ≈ 200–300). Như dáng các đuôi hiện tại (art/ref/backup/l8_tails_old.png) nhưng **đẹp hơn**.
- **Gốc đuôi liền mạch với thân:** đầu gốc **to, tròn đầy** (bằng bề dày chỗ mông mèo), lông ở gốc **toả ra mềm như mọc từ thân**, không cắt bằng, không thắt nhỏ; phần gốc dài thêm ~25 px để khuất sau thân. Đuôi thon dần đều tới chóp tròn mềm, dáng mập mạp dễ thương, không như cái chày, không như sợi dây.
- Màu lông than ấm #3E3838 với nét chì xám nâu sáng **giống hệt lông thân** ở ảnh dáng tương ứng (đính kèm).
1. **Ô 1 — `mun_bath_tail_dirty` (bẩn):** lông xù rối, vài túm bết, vài vệt bụi kem xám nhạt; dày vừa; dài (gốc tới chóp ≈ 700 px trong ô).
2. **Ô 2 — `mun_bath_tail_wet` (ướt):** lông bết sát, đuôi mảnh hơn (nhưng gốc vẫn đầy, không như sợi dây), mép có vài mũi lông nhọn bết, 2–3 giọt nước xanh nhạt; dài ≈ 700 px.
3. **Ô 3 — `mun_bath_tail_fluffy` (phồng):** **phồng xù to tròn như chổi lông** đều từ gốc tới chóp (không phình một cục), nhiều nét lông cong ngắn; dài ≈ 640 px.
4. **Ô 4 — `mun_bath_tail_sleek` (mượt):** lông mượt bóng, thon đẹp, 1 vệt bóng kem ánh lavender dọc đuôi; dài ≈ 640 px.

## Ảnh tham chiếu (đính kèm đúng 5)
1. art/ref/backup/l8_tails_old.png — 4 đuôi cũ (hướng, độ dài; cần đẹp hơn).
2. art/out/cats/mun_bath_dirty.png — lông bẩn.
3. art/out/cats/mun_bath_wet.png — lông ướt.
4. art/out/cats/mun_bath_sleek.png — lông mượt (phồng: xem art/out/cats/mun_bath_fluffy.png bằng view_image, không đính kèm).
5. art/out/demo/l8_demo_stage1.png — demo gốc.

## Quy tắc bắt buộc (AGENTS.md)
- Trước khi gọi image_gen: mở mọi ảnh tham chiếu bằng view_image, viết **"Nhắc lại quy tắc"**.
- Gọi image_gen **một lần**, đính kèm tối đa 5 ảnh (đúng danh sách). **Nền TRONG SUỐT thật.** Chép nguyên ảnh, không xử lý. Không chữ, không số, không bóng, không viền trắng, không đường kẻ ô.
- Tin nhắn cuối: `SAVED: ...`, prompt cuối, **"Tự kiểm"** (đạt / không đạt + lý do từng yêu cầu), một dòng tự nhận xét.

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
