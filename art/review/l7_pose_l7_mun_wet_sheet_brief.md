VẼ TỜ `l7_mun_wet_sheet` — 4 dáng Mun ướt Level 7, đúng quy tắc AGENTS.md (vai Codex: chỉ vẽ). Model gpt-6.1-sol, mức medium.
Lưu: **art/out/_sheets/l7_mun_wet_sheet.png** (1536x1024 ngang, nền trong suốt, file mới).

**Mun ướt (giống Mun trong demo L7, ảnh art/ref/l7_cut/mun_wet_s2.png, mun_wet_s3.png):** đúng thiết kế art/out/cats/mun_ref.png (mèo đen than ấm #3E3838, đầu và mặt tròn, má phình, mắt tròn to vàng mật ong rất nổi, mũi hồng xám nhỏ, má hồng nhạt, tai trong hồng), nhưng **lông ướt bết thành nhiều túm nhọn** quanh viền người, vài **giọt nước xanh da trời nhạt** đọng trên lông và rơi xuống, thân hơi gầy lại vì lông bết. Lông vẽ bằng nét chì xám nâu sáng trên nền than ấm (không đen kịt, không tô phẳng). Màu nhạt như demo.

## Bố cục tờ: 4 ô ngang, mỗi ô 384x1024 (x 0–383, 384–767, 768–1151, 1152–1535), mỗi ô một dáng
- **Cả 4 dáng: cùng một con Mun, cùng cỡ thân, cùng đường đáy** (chân/mông chạm cùng một đường y ≈ 900 trong mọi ô), **quay người và mặt chếch sang PHẢI** như art/out/cats/mun_sit_look.png (dáng ngồi gốc). Thân ngồi cao ≈ 420 px trong ô (đầu tới chân), rộng ≈ 300; dáng giơ chân thì chân giơ cao hơn đầu nhưng **thân giữ nguyên cỡ**. Mỗi dáng cách mép ô ≥ 40 px, không chạm ô bên.
1. **Ô 1 `mun_sit_wet`** — ngồi ướt như mun_sit_look (ngồi thẳng, hai chân trước khép, đuôi quặp quanh chân), **mặt hơi buồn, tai hơi cụp**, mắt to ngước nhìn, vài nét run nhẹ ở viền lông (2–3 vạch ngắn), giọt nước rơi.
2. **Ô 2 `mun_paw_rain`** — cùng dáng ngồi nhưng **thò một chân trước bên phải ra phía trước-phải, hơi nhấc lên** như vừa chạm mưa rồi rụt, **mặt nhăn, mắt nhắm một bên, tai cụp sát**, vài giọt nước bắn quanh bàn chân.
3. **Ô 3 `mun_paw_glass`** — ngồi, **rướn người, một chân trước giơ cao về phía trước-phải như khều mặt kính** (bàn chân xoè đệm hồng), **miệng mở kêu meo nhỏ**, mắt tròn nhìn theo chân.
4. **Ô 4 `mun_paw_chime`** — ngồi, **ngửa mặt nhìn thẳng lên trên**, **một chân trước giơ thẳng lên cao quá đầu** như khều cái chuông ngay trên đầu, mắt sáng háo hức, đuôi dựng nhẹ.

## Ảnh tham chiếu (đính kèm đúng 5)
1. art/out/cats/mun_ref.png — thiết kế Mun.
2. art/out/cats/mun_sit_look.png — dáng ngồi gốc, hướng quay sang phải, tỉ lệ.
3. art/ref/l7_cut/mun_wet_s2.png — Mun ướt trong demo (lông bết, giọt nước).
4. art/ref/l7_cut/mun_wet_s3.png — Mun ướt trong demo.
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
