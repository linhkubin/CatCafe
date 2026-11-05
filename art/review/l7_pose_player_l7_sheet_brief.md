VẼ TỜ `player_l7_sheet` — 2 dáng nhân vật Level 7, đúng quy tắc AGENTS.md (vai Codex: chỉ vẽ). Model gpt-6.1-sol, mức medium.
Lưu: **art/out/_sheets/player_l7_sheet.png** (1536x1024 ngang, nền trong suốt, file mới).

**Nhân vật** đúng art/out/player/player_ref.png: tóc xoăn bồng nâu caramel, áo len vàng bơ, quần xanh trời nhạt, dép bông kem, má hồng, mắt nâu tròn. **Cùng cỡ người như art/out/player/player_surprised.png** (cao ≈ 860 px trong tờ, đầu cùng cỡ).

## Bố cục tờ: 2 ô ngang, mỗi ô 768x1024 (x 0–767, 768–1535)
- **Cả 2 dáng: cùng cỡ người, cùng đường đáy** (đế dép chạm cùng một đường y ≈ 960), đứng nhìn thẳng ra trước (về phía người xem). Mỗi dáng cách mép ô ≥ 40 px.
1. **Ô 1 `player_turn_surprised`** — vừa **quay người lại** (vai còn hơi xoay, một chân bước lệch), **giật mình**: mắt tròn xoe, miệng chữ O, lông mày nhướn, 3 vạch giật mình nhỏ trên đầu như player_surprised, hai tay hơi giơ lên ngang ngực.
2. **Ô 2 `player_arms_open`** — **giang rộng hai tay ra phía trước** như sắp đón ôm (lòng bàn tay ngửa, các ngón xoè), **cười tươi ấm áp**, mắt cong vui, người hơi nghiêng tới trước. **Tay không, không cầm khăn.**

## Ảnh tham chiếu (đính kèm đúng 5)
1. art/out/player/player_ref.png — thiết kế nhân vật.
2. art/out/player/player_surprised.png — cỡ người, nét, kiểu giật mình.
3. art/out/player/player_call.png — cỡ, màu.
4. art/out/demo/l7_demo_s3_play.png — nhân vật trong demo L7 (tông màu).
5. art/ref/owner_l1_style_ref.png — chuẩn màu.

## Quy tắc bắt buộc (AGENTS.md)
- Trước khi gọi image_gen: mở mọi ảnh tham chiếu bằng view_image, viết **"Nhắc lại quy tắc"** (phong cách, màu, góc nhìn, nét, nhân vật, yêu cầu riêng).
- Gọi image_gen **MỘT lần**, đính kèm **tối đa 5 ảnh** (đúng danh sách dưới). **Nền TRONG SUỐT thật.** Chép nguyên ảnh, không xử lý.
- Không chữ, không số, không bóng sàn, không quầng sáng, không viền trắng. Không khung, không đường kẻ ô.
- Tin nhắn cuối: `SAVED: ...`, prompt cuối, **"Tự kiểm"** (đạt / không đạt + lý do: giống nhân vật tham chiếu, đúng dáng, cùng tỉ lệ và cùng đường đáy giữa các ô, nét, màu nhạt, nền trong suốt, không chữ), một dòng tự nhận xét.

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
