VẼ LẠI 1 MÓN — Level 7 cảnh 2 (G7-29, chủ dự án: chó trong thùng xấu và quá bé), đúng quy tắc AGENTS.md (vai Codex: chỉ vẽ). **Model gpt-6.1-sol, mức medium.** Gọi image_gen **một lần**. **Được phép ghi đè** file đích (bản cũ đã sao lưu).

## `l7_stray_dog_inbox` → art/out/_sheets/l7src_l7_stray_dog_inbox.png (1536x1024 ngang, nền trong suốt)
**CHỈNH SỬA TỪ ẢNH art/out/_sheets/l7src_l7_stray_dog_scared.png** (Lu nằm sấp co ro sợ mưa; dùng image_gen chế độ chỉnh sửa trên đúng ảnh này, giữ khung 1536x1024): chó đã chui vào thùng các-tông khô ráo, **hết sợ, vui vẻ**. Giữ nguyên **dáng nằm cả người** (đầu, hai chân trước, thân, đuôi kem cuộn bên hông), cỡ, vị trí, màu, nét, lông. **Chỉ đổi:**
- **Mặt vui**: mắt cong cười híp (hai vòng cung như art/out/level6/l6_dog_chew.png), lông mày thả lỏng, miệng cười nhỏ hé lưỡi hồng, má hồng. Đầu hơi ngẩng lên khỏi chân trước một chút.
- **Bỏ hết giọt nước**, lông khô mượt, gọn như Lu L6 (art/out/level6/l6_dog_belly.png).
- Đuôi hơi vẫy (cong lên nhẹ).
Không vẽ thùng. Không bóng, không quầng, không chữ. Đáy phẳng như nằm trên đáy thùng.

(Ảnh sẽ được Art đặt nằm trong lòng thùng lật, cỡ do Art định sau.)

## Ảnh tham chiếu (mở hết bằng view_image, tối đa 5)
1. art/out/_sheets/l7src_l7_stray_dog_scared.png — **ảnh chỉnh sửa (dáng, cỡ, Lu)**.
2. art/out/level6/l6_dog_chew.png — **mặt cười của Lu**.
3. art/out/level6/l6_dog_belly.png — lông khô, nét Lu L6.
4. art/ref/owner_l1_style_ref.png — chuẩn màu.

## Quy tắc bắt buộc (AGENTS.md)
- Trước khi gọi image_gen viết **"Nhắc lại quy tắc"** (phong cách, màu, góc nhìn, nét, yêu cầu riêng).
- **Nền TRONG SUỐT thật.** Chép nguyên ảnh, không xử lý. Màu nhạt như mẫu. Không chữ, không số, không bóng sàn, không quầng, không viền trắng.
- Tin nhắn cuối: `SAVED: ...`, prompt cuối, **"Tự kiểm"** (đạt / không đạt + lý do).

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
