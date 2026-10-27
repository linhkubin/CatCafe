CHỈNH SỬA TỪ ẢNH art/ref/l4_v6_input/player_reach_v12.png (nhân vật Level 4, Vòng 12), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

Chủ dự án (G4-45): "nhân vật lúc đưa tay lên với mèo chưa đúng với hình nhân vật ở demo". Ảnh gốc là **ảnh cắt nhân vật từ demo đã duyệt**, phóng to. Vẽ lại `player_reach_up` **đúng dáng trong ảnh gốc**:
- Nhân vật **nghiêng 3/4, lưng và hông hơi quay về phía người xem**, người hơi ngả sang trái.
- **Mặt nghiêng, ngửa lên nhìn lên phía trên-trái** (về phía con mèo ở trên), miệng tròn ngạc nhiên, má hồng; thấy tai phải.
- **Hai tay vươn chéo lên phía trên-trái**, bàn tay mở xoè, tay trái cao hơn một chút; tay áo len vàng bơ bo gấu.
- **Tóc xoăn bồng nâu caramel, phần bồng nhiều về phía phải đầu** (sau gáy).
- Áo len vàng bơ, quần xanh trời nhạt bo ống, dép bông kem, đứng hai chân trên mặt phẳng (không vẽ gối).
- **Xoá hết nền** (rèm, cửa sổ, tường, gối dưới chân, con mèo, đoạn sofa) thành **trong suốt thật**; chỉ còn nhân vật, vẽ bù chỗ bị che cho liền.
- Giữ đúng mặt, tóc, quần áo, màu, nét của nhân vật theo ảnh tham chiếu `player_ref` (cùng một bé), nhưng **dáng theo ảnh gốc**, không quay thẳng ra trước, không giơ tay thẳng đứng, mặt không nhìn người xem.
- Cỡ 1024x1536 dọc, nhân vật ở giữa, cao khoảng 1250px (từ đế dép tới đầu ngón tay), cách mép ảnh ≥ 40px.
- Lưu vào: art/out/_sheets/l4v12_player_sheet.png. Gọi image_gen MỘT lần, chép nguyên ảnh, không tự cắt hay xử lý.
- Ảnh tham chiếu, mở bằng view_image và đính kèm: 1. art/ref/l4_v6_input/player_reach_v12.png (ẢNH GỐC chỉnh sửa, dáng chuẩn); 2. art/out/demo/l4_demo_living.png (ẢNH DEMO GỐC); 3. art/out/player/player_ref.png (nhân vật); 4. art/ref/owner_l1_style_ref.png (màu, chất chì); 5. art/out/player/player_silly_laugh.png (cùng bé, cùng nét và màu ở Level 4).
- Ảnh demo gốc (G4-26): art/out/demo/l4_demo_living.png, nhân vật đứng trên tháp ở x 220–495, y 365–825. Mở bằng view_image, đính kèm cho image_gen.

- Trước khi gọi image_gen viết "Nhắc lại quy tắc"; tin nhắn cuối có "Tự kiểm" (từng điểm: đạt / không đạt kèm lý do: giống ảnh gốc / demo về dáng, màu, nét; góc nhìn; nền trong suốt; không chữ; bố cục), SAVED, prompt cuối.

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
