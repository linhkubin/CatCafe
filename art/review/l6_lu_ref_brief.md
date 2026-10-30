Vẽ ẢNH THAM CHIẾU NHÂN VẬT `lu_ref` (Level 6, G6-8), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

**Lu** là chó vàng to của nhà hàng xóm, nhân vật phụ mới từ Level 6. Không dữ, chỉ muốn chơi: hiền, vụng về, đáng yêu, **không đáng sợ**. Ảnh này dùng để giữ Lu giống nhau ở mọi ảnh sau; chủ dự án duyệt riêng. Lu phải nhìn như **cùng một bộ tranh với Sữa và Mun**: cùng tay vẽ, cùng bút chì màu, cùng kiểu chibi tròn trịa.

## Ảnh tham chiếu (mở HẾT bằng view_image trước khi vẽ, đính kèm cho image_gen theo thứ tự này)
1. art/out/cats/sua_ref.png — **MẪU PHONG CÁCH VÀ BỐ CỤC**: cùng khung 1536x1024, cùng 3 tư thế, cùng chất chì, cùng độ dày nét.
2. art/out/cats/mun_ref.png — Mun (mặt tròn), để Lu cùng bộ.
3. art/ref/owner_l1_style_ref.png — mẫu màu và chất chì chung (O6).
4. art/ref/l1_depth_angle_ref.png — góc nhìn chung.

## Thiết kế Lu
- **Chó con lớn mũm mĩm** (kiểu chó cỏ / golden con), **to hơn Sữa khoảng 1,5 lần** nhưng vẫn tỉ lệ chibi: **đầu to tròn** (gần bằng thân), thân tròn như cái bánh bao, **chân ngắn mập**, bàn chân tròn to.
- **Lông vàng mật ong nhạt** (khoảng #F2C796, chỗ sáng kem #FCE7C0, chỗ khuất caramel nhạt #D6A472), mềm, hơi xù nhẹ ở má, ngực, đuôi. Vân chì rõ, không tô phẳng. Không cam, không nâu đậm.
- **Mặt hiền, vui:** mõm tròn màu kem, **mũi tròn to nâu sẫm ấm** (#6B4A3A) có chấm sáng, **mắt tròn đen nâu nhỏ hiền** (2 chấm sáng), lông mày nhô nhẹ, **má hồng**, **miệng cười há có lưỡi hồng** thè ra một chút. Không răng nanh nhọn, không nhíu mày.
- **Tai cụp mềm** rủ xuống hai bên má, màu caramel nhạt hơi đậm hơn thân.
- **Đuôi** to xù, cong lên, đầu đuôi kem.
- **Vòng cổ** vải màu hồng đào (#F7B9A3) nhỏ, có một khoen tròn vàng bơ nhỏ (không chữ, không hình).
- Nét viền nâu ấm (#6B4A3A), đậm nhạt như bút chì, độ dày như nét Sữa ở ảnh 1.

## Bố cục (1536x1024, nền trong suốt) — như sua_ref
- Trái: **ngồi nhìn thẳng**, hai chân trước chống thẳng, đuôi cong bên hông, miệng cười há lưỡi hồng, tai cụp.
- Giữa: **đi nhìn nghiêng sang phải**, vẫy đuôi, lưỡi thè, dáng lắc lư vui.
- Phải: **nằm bò** trên bụng, cằm gác lên hai chân trước, mắt nhắm cong mãn nguyện.
- Ba tư thế cùng cỡ con chó, cùng đường đáy, cách nhau và cách mép ảnh ≥ 40px, không chạm nhau, lấp gần kín khung (lề khoảng 40px).

## Prompt gợi ý cho image_gen (tiếng Anh, giữ đủ ý)
Character reference sheet of "Lu", a big friendly golden-yellow puppy, drawn in EXACTLY the same hand, colored-pencil texture, line weight and chubby chibi proportions as image 1 (white cat Sua) and image 2 (black cat Mun). Canvas 1536x1024, three poses at the same size: left sitting front view, middle walking side view facing right, right lying down on belly with chin on front paws and eyes happily closed. About 1.5 times bigger than Sua but still chibi: big round head almost as big as the round bun-like body, short chubby legs, big round paws. Soft light honey-yellow fur (#F2C796, cream highlights, pale caramel shading), slightly fluffy cheeks, chest and tail, visible pencil grain. Gentle happy face: round cream muzzle, big round dark warm-brown nose with a highlight, small round kind dark eyes with two highlights, pink cheeks, open smiling mouth with a little pink tongue, no fangs, no frown. Soft floppy ears hanging beside the cheeks, pale caramel. Fluffy curled tail with a cream tip. Small peach fabric collar with a tiny butter-yellow ring (no text). Warm brown pencil outline with pressure variation. Cute, harmless, not scary. Transparent background with real alpha. No text, no frames, no floor shadow, no glow, no white halo.

## Lưu và báo cáo
- Lưu vào **art/out/dogs/lu_ref.png** (file mới). Gọi image_gen MỘT lần, 1536x1024, chép nguyên, không xử lý.
- "Nhắc lại quy tắc" trước; "Tự kiểm" cuối (cùng phong cách Sữa/Mun; to hơn Sữa nhưng chibi; lông vàng nhạt có vân chì; mặt hiền vui; tai cụp; 3 tư thế đúng chỗ cùng cỡ; nền trong suốt; không chữ; không quầng), SAVED, prompt cuối.

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
