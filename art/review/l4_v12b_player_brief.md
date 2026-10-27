CHỈNH SỬA TỪ ẢNH art/out/_sheets/l4v12_player_sheet.png — đây chính là ảnh gốc cỡ lớn của `art/out/player/player_reach_up.png` (Level 4, Vòng 12b, G4-46), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

Chủ dự án: "dáng nhân vật ổn rồi, nhưng outline lại đang bị dày và đậm hơn với ảnh khác". **Dáng đã duyệt, KHÔNG được đổi.** Chỉ sửa nét viền và độ tối của tóc.

## Ảnh tham chiếu (mở HẾT bằng view_image trước khi làm, và đính kèm cho image_gen theo đúng thứ tự)
1. art/out/_sheets/l4v12_player_sheet.png — **ẢNH CẦN CHỈNH SỬA** (edit target).
2. art/ref/l4_v6_input/silly_laugh_same_scale.png — **MẪU NÉT CHÍNH**: `player_silly_laugh` đã phóng về **đúng cùng tỉ lệ** với ảnh 1 (cùng khung 1024x1536, cùng đường đáy). Nét ảnh kết quả phải dày và đậm đúng như nét ảnh này.
3. art/out/player/player_ref.png — nhân vật gốc.
4. art/ref/owner_l1_style_ref.png — màu và chất chì chung.
5. art/out/demo/l4_demo_living.png — **ẢNH DEMO GỐC** (G4-26): nhân vật đứng trên tháp ở x 220–495, y 365–825; dáng ở ảnh 1 đã theo đúng demo này.

## Số đo của Art (để Codex hiểu "dày" là bao nhiêu)
Đo trên khung 1024x1536:
- Ảnh 1 hiện tại: viền ngoài dày ~9px (chỗ dày 10px), màu viền trung bình RGB(121,75,49), gần đen ở nhiều đoạn, đều tay như vector.
- Ảnh 2 (mẫu): viền ngoài dày ~6px (chỗ dày nhất 7px), màu trung bình RGB(132,87,59), nhạt hơn, đậm nhạt như bút chì.
- **Mục tiêu:** viền ngoài phần lớn 4–6px, chỉ chỗ gập/khuất 7px, **không đoạn nào quá 7px**; nét trong (nếp áo, ngón tay, tai, mặt) 2–4px. Màu viền nâu ấm #6B4A3A hoặc nhạt hơn, **không bao giờ gần đen**.

## Prompt gợi ý cho image_gen (tiếng Anh, giữ đủ ý, có thể thêm)
- This is an EDIT of image 1, not a new drawing. Do NOT change the pose, silhouette, proportions, position of any body part, face, eyes, mouth, hands, fingers, hair shape, clothing shapes, clothing colors, slipper shape, canvas size or the character's position on the canvas.
- The ONLY problems: (a) the outlines are too thick and too dark; (b) the hair is too dark and too contrasty.
- Redraw ALL outlines thinner, about 60% of the current width, matching image 2 (player_silly_laugh at the same scale) exactly: outer contour mostly 4–6px, max 7px only in tucked corners/overlaps, inner detail lines 2–4px.
- Outline color is warm medium brown #6B4A3A, never near-black, never grey. Lines along the yellow sweater may be tinted light golden brown, lines along the blue pants light blue-brown, lines on the cream slippers light caramel-brown, exactly like image 2.
- Pencil-like pressure: slightly darker only in tucked corners, lighter and tapering at stroke ends, a few tiny breaks. No uniform vector line, no clean digital stroke.
- Hair: same lighter caramel-brown value, the same soft pencil texture and the same low contrast as the hair in image 2; strand lines thin and light brown, no near-black strands. Keep the hair shape (curly, puffed to the right) exactly.
- Imagine image 1 and image 2 side by side: the result must look like it was drawn by the same hand, with the same pencil, as image 2.
- Transparent background with real alpha, keep the transparent area exactly. No text. No glow, no white halo or white outline around the figure, no floor shadow.

## Lưu và báo cáo
- Lưu vào: **art/out/_sheets/l4v12b_player_sheet.png** (file mới, không ghi đè ảnh nào khác). Gọi image_gen MỘT lần, chép nguyên ảnh, không tự cắt, không xử lý.
- Trước khi gọi image_gen viết "Nhắc lại quy tắc" (giữ dáng, nét bao nhiêu px, màu nét, tóc, nền).
- Tin nhắn cuối có "Tự kiểm" (đạt / không đạt + lý do): dáng không đổi so với ảnh 1; nét viền mỏng như ảnh 2; màu nét không gần đen; tóc nhạt như ảnh 2; nền trong suốt; không chữ; không quầng trắng. Kèm SAVED và prompt cuối.

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
