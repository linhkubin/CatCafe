Vẽ LẠI ẢNH THAM CHIẾU NHÂN VẬT `mun_ref` (Level 5, G5-30: chủ dự án muốn Mun **dễ thương hơn**), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ). Ảnh mới, chủ dự án sẽ duyệt riêng.

Mun là mèo đen hàng xóm (Level 5–10). Bản cũ `art/out/cats/mun_ref.png` bị chê chưa đủ dễ thương: đầu chưa đủ to, dáng thon dài, lông xám nhạt khô. Bản mới phải là **"chị em" với Sữa** (`sua_ref`): cùng tay vẽ, cùng tỉ lệ chibi mũm mĩm, cùng cỡ con mèo, chỉ khác màu lông, màu mắt, và vẻ hơi nhút nhát.

## Ảnh tham chiếu (mở HẾT bằng view_image trước khi vẽ, đính kèm cho image_gen theo thứ tự này)
1. art/out/cats/sua_ref.png — **MẪU DÁNG, TỈ LỆ, BỐ CỤC**: cùng khung 1536x1024, cùng 3 tư thế, cùng cỡ con mèo, cùng tỉ lệ đầu/thân, cùng độ tròn, cùng chất chì, cùng độ dày nét.
2. art/out/cats/mun_ref.png — Mun cũ: chỉ lấy **nhận diện** (mèo đen, mắt vàng mật ong, trong tai hồng). KHÔNG lấy dáng thon, đầu nhỏ, mặt cũ.
3. art/ref/owner_l1_style_ref.png — mẫu màu và chất chì chung (O6).
4. art/ref/l1_depth_angle_ref.png — góc nhìn chung.

## Thiết kế Mun mới (G5-30)
- **Dáng:** chibi tròn mũm mĩm **như Sữa**: đầu to tròn, **đầu to hơn thân** (đầu rộng ≈ 1,1–1,2 lần thân), thân ngắn tròn như hạt đậu, chân ngắn mập, bàn chân tròn. Bỏ kiểu "thon, chân dài" cũ.
- **Mặt (quan trọng nhất):** mặt tròn bầu, **má phồng** hai bên (mép má có vài túm lông mềm), má hồng phấn nhẹ hình tròn mờ.
  - **Mắt rất to, tròn, long lanh, màu vàng mật ong** (khoảng #F4C95A, viền trong caramel nhạt), to hơn mắt Sữa một chút, đặt hơi thấp và hơi xa nhau trên mặt (kiểu mèo con). Lòng đen nâu sẫm to; **2 chấm sáng trắng** (một to ở trên, một nhỏ ở dưới) cho long lanh. Viền mắt nâu ấm mảnh.
  - Mũi hồng nhỏ xíu hình tam giác bo, miệng chữ ω rất nhỏ, mảnh. Vài sợi ria kem mảnh, ngắn.
- **Tai:** vừa phải, tròn đầu (không nhọn sắc), hơi nghiêng ra hai bên một chút (nhút nhát nhưng không cụp hẳn), trong tai hồng đào nhạt.
- **Lông:** **đen than ấm, mềm, xù nhẹ** như lông mèo con (mép lông có túm nhỏ đều quanh viền, ít hơn Sữa một chút). Trung bình lông khoảng **#454040**: đọc rõ là mèo đen, KHÔNG xám nhạt, KHÔNG đen kịt #000. Cả bộ lông phải thấy **vân bút chì**: nét lông xám ấm sáng hơn (#5E5656–#6E6464) đi theo chiều lông, đỉnh đầu, má và lưng sáng ấm hơn chút như có ánh sáng mềm từ trên trái. Không bóng loáng, không gradient số, không tô phẳng.
- **Đuôi:** dài vừa, tròn mập hơn bản cũ, đầu đuôi bo tròn, lông mềm.
- **Vẻ mặt:** dễ thương, hơi rụt rè, mắt to nhìn lên tò mò. Không đốm trắng, không vòng cổ.
- **Nét viền:** nâu sẫm ấm (khoảng #3E2C28), sẫm hơn lông một chút để tách khối, không đen tuyền; chất chì và độ dày như nét Sữa ở ảnh 1: chỗ khuất/gập dày nhất, phần lớn mảnh hơn, đầu nét nhọn dần, mép lông là nét ngắn đứt.

## Bố cục (1536x1024, nền trong suốt) — đúng như sua_ref
- Trái: **ngồi nhìn thẳng**, hai chân trước khép, đuôi vòng quanh chân, mắt to nhìn lên.
- Giữa: **đi nhìn nghiêng sang phải**, dáng tròn, chân ngắn, đuôi cong lên nhẹ.
- Phải: **ngủ cuộn tròn**, đuôi quấn quanh, mắt nhắm cong, má hồng.
- Ba tư thế cùng cỡ (xấp xỉ cỡ Sữa trong ảnh 1), cùng đường đáy, cách nhau và cách mép ảnh ≥ 40px, không chạm nhau.

## Prompt gợi ý cho image_gen (tiếng Anh, giữ đủ ý, có thể thêm)
- Character reference sheet of "Mun", a cute shy black kitten, the sister character of image 1 (the white cat Sua). EXACTLY the same hand, colored-pencil texture, line weight, chubby chibi proportions, size and layout as image 1. Canvas 1536x1024, three poses at the same size: left sitting front view, middle walking side view facing right, right sleeping curled up.
- Very chubby and round like Sua: big round head clearly larger than the small bean-shaped body, short stubby legs, round paws, plump round tail.
- Face: round puffy cheeks with soft fur tufts, soft round pink blush. HUGE round sparkly honey-yellow eyes (#F4C95A, soft caramel inner rim), slightly larger than Sua's eyes, set a little low and apart like a kitten, big dark brown pupils with two white highlights (one big, one small). Tiny pink nose, tiny thin ω mouth, a few short thin cream whiskers. Medium ears with rounded tips, tilted slightly outward, pale peach-pink inside. Sweet, slightly shy, curious upward look.
- Fur: soft, slightly fluffy warm charcoal black, average about #454040, clearly a BLACK cat but never pure black and never flat: visible colored-pencil strokes everywhere, lighter warm-grey strokes (#5E5656–#6E6464) following the fur, slightly lighter on head top, cheeks and back. Small soft fur tufts along the outline.
- Outline: dark warm brown (#3E2C28), slightly darker than the fur, never pure black, pencil pressure (thicker only in tucked corners, thinner and tapering elsewhere), same thickness as Sua's outline.
- Transparent background with real alpha. No text, no numbers, no frames, no floor shadow, no glow, no white halo or outline around the cats.

## Lưu và báo cáo
- Lưu vào: **art/out/cats/mun_ref_d.png** (file mới; KHÔNG ghi đè mun_ref.png hay các bản b, c). Gọi image_gen MỘT lần, 1536x1024, chép nguyên ảnh, không tự cắt, không xử lý.
- Trước khi gọi image_gen viết "Nhắc lại quy tắc" (phong cách, góc nhìn, màu lông/mắt/nét, dáng mũm mĩm, bố cục 3 tư thế, nền).
- Tin nhắn cuối có "Tự kiểm" (đạt / không đạt + lý do): cùng phong cách và tỉ lệ sua_ref; đầu to hơn thân; mắt vàng to long lanh 2 chấm sáng; má phồng hồng; lông đen ấm mềm có vân chì, không xám nhạt, không đen kịt; nét nâu sẫm; 3 tư thế đúng chỗ, cùng cỡ, không chạm; nền trong suốt; không chữ; không quầng. Kèm SAVED và prompt cuối.

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
