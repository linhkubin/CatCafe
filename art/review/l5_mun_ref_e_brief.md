CHỈNH SỬA TỪ ẢNH art/out/cats/mun_ref_d.png (lượt 2 của `mun_ref` mới, Level 5, G5-30: Mun dễ thương hơn), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

Lượt 1 ĐẠT về dáng mũm mĩm, tỉ lệ đầu/thân, má phồng hồng, tai, đuôi, nét, 3 tư thế: **giữ nguyên tất cả, giữ đúng vị trí và cỡ từng con**. Chỉ sửa 3 điểm:
1. **Mắt to hơn rõ rệt:** mắt vàng mật ong ở tư thế ngồi và đi **to thêm khoảng 25–30%** (đường kính), vẫn tròn, vẫn cùng tâm, đặt hơi thấp và xa nhau kiểu mèo con. Lòng đen nâu sẫm to, chiếm phần lớn mắt.
2. **Mắt long lanh:** mỗi mắt có **2 chấm sáng trắng**: một chấm to tròn ở góc trên, một chấm nhỏ ở góc dưới đối diện. Viền trong vàng caramel nhạt giữ như cũ.
3. **Lông đen hơn:** hiện lông trung bình ≈ #63504B (đọc thành xám nâu). Tối xuống cho trung bình khoảng **#4A4242**, đọc rõ là mèo đen. Vẫn PHẢI thấy vân chì: nét lông xám ấm sáng hơn (#5E5656–#6E6464) theo chiều lông, đỉnh đầu, má, lưng sáng hơn chút. Không đen tuyền, không tô phẳng, không bóng. Trong tai hồng, má hồng, mũi, ria kem và mắt vàng **giữ độ sáng** (càng nổi trên lông tối).

Nét viền nâu sẫm ấm #3E2C28 giữ như cũ. Mèo ngủ bên phải lùi vào cho cách mép phải ≥ 40px (không đổi cỡ).
Nền trong suốt thật, không quầng, không viền trắng, không bóng sàn, không chữ.

Ảnh tham chiếu (mở hết bằng view_image, đính kèm theo thứ tự): (1) art/out/cats/mun_ref_d.png = ẢNH CẦN CHỈNH SỬA; (2) art/out/cats/sua_ref.png (mẫu cùng bộ); (3) art/ref/owner_l1_style_ref.png; (4) art/ref/l1_depth_angle_ref.png.

Prompt gợi ý: "EDIT of image 1. Keep every shape, pose, position, size, body, cheeks, ears, tail, outline and layout exactly. Only: (a) make the honey-yellow eyes of the sitting and walking cat about 25–30% larger in diameter, same centres, round, big dark brown pupils; (b) give each open eye two white highlights, one big round at upper corner and one small at the opposite lower corner, sparkly; (c) darken the fur to an average of about #4A4242 so it clearly reads as a BLACK cat, still with visible lighter warm-grey colored-pencil strokes (#5E5656–#6E6464) following the fur, slightly lighter on head top, cheeks and back; never pure black, never flat, no gloss. Keep pink inner ears, pink blush, nose, cream whiskers and yellow eyes at the same brightness. Move the sleeping cat slightly left so it is at least 40px from the right edge. Transparent background, real alpha, no halo, no white outline, no floor shadow, no text."

Lưu vào: **art/out/cats/mun_ref_e.png** (file mới; không ghi đè). Gọi image_gen MỘT lần, 1536x1024, chép nguyên. "Nhắc lại quy tắc" trước; "Tự kiểm" cuối (đạt / không đạt: giữ nguyên dáng, mắt to thêm, 2 chấm sáng, lông đen có vân chì, mèo phải cách mép, nền, không chữ, không quầng). SAVED, prompt cuối.

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
