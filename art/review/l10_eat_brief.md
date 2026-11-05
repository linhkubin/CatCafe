VẼ TỜ `l10src_l10_cats_eat` — Level 10, mèo thật cúi ăn từ hộp súp (cảnh kết, 10 giây thu nhỏ). Đúng quy tắc AGENTS.md: vai Codex chỉ vẽ, **một lần gọi image_gen, một ảnh**. **Model gpt-6.1-sol, mức medium.**

## Ảnh
- **1536x1024 ngang, nền TRONG SUỐT thật**, lưu **art/out/_sheets/l10src_l10_cats_eat.png** (file mới). Chép nguyên, không xử lý.
- 2 ô cạnh nhau, mỗi ô 768x1024: ô 1 (x 0–768) `mun_l10_eat`, ô 2 (x 768–1536) `sua_l10_eat`. Mỗi con nằm trọn trong ô, cách mép ô ≥40px, không chạm ô bên. Không kẻ khung, không số.
- **Hai con cùng một tỉ lệ**, to gần kín ô, **đáy chân cùng một đường y ≈ 900**. Cỡ hai con tương quan y như hai mèo liếm lông art/out/cats/mun_l10_groom.png và sua_l10_groom.png.
- **Không vẽ hộp súp**, không bát, không thức ăn rời (hộp là ảnh riêng, đặt giữa hai con). Không bóng sàn, quầng, viền trắng, chữ, số, logo.
- Màu nhạt như art/ref/owner_l1_style_ref.png, vân chì rõ.
- Trước khi gọi image_gen viết "Nhắc lại quy tắc". Tin nhắn cuối: "Tự kiểm" (đúng mèo, đúng hướng, cùng tỉ lệ và đường đáy, không vẽ hộp, màu nhạt, nền trong suốt, không chữ), SAVED, prompt cuối.

## Hai dáng
- Ô 1 `mun_l10_eat`: **Mun** (mèo đen, mặt như art/out/cats/mun_ref.png, mắt vàng hổ phách, má hồng) **ngồi khom quay sang PHẢI, cúi đầu thấp về phía trước bên phải** như đang ăn từ hộp đặt ngay trước mũi, lưỡi hồng nhỏ thè ra, mắt híp sung sướng, đuôi cuộn sau lưng. Không mặc đồ.
- Ô 2 `sua_l10_eat`: **Sữa** (mèo trắng lông xù, mặt như art/out/cats/sua_ref.png, mắt xanh, má hồng) **ngồi khom quay sang TRÁI, cúi đầu thấp về phía trước bên trái**, lưỡi hồng nhỏ thè ra, mắt híp sung sướng, đuôi xù cuộn sau lưng. Không mặc đồ.

## Ảnh tham chiếu (mở bằng view_image)
1. **art/out/demo/l10_demo2_end_916.png** — ảnh demo gốc cảnh kết (hai mèo thật hai bên hộp súp mở). Vẽ hai mèo giống hệt kiểu ở đây.
2. art/out/cats/mun_l10_groom.png, art/out/cats/sua_l10_groom.png — cỡ, nét, màu hai mèo thật L10.
3. art/out/cats/mun_ref.png, art/out/cats/sua_ref.png — mặt mèo.
4. art/ref/owner_l1_style_ref.png — chuẩn màu.

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
