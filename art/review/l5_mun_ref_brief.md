Vẽ ẢNH THAM CHIẾU NHÂN VẬT `mun_ref` (Level 5, G5-3, G5-16), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

Mun là mèo đen hàng xóm, xuất hiện từ Level 5 tới Level 10. Ảnh này chỉ dùng để giữ Mun giống nhau ở mọi ảnh sau, chủ dự án sẽ duyệt riêng. Mun phải nhìn như **cùng một bộ tranh với Sữa** (`sua_ref`): cùng tay vẽ, cùng bút chì màu, cùng tỉ lệ chibi, chỉ khác bộ lông và tính cách.

## Ảnh tham chiếu (mở HẾT bằng view_image trước khi vẽ, đính kèm cho image_gen theo thứ tự này)
1. art/out/cats/sua_ref.png — **MẪU PHONG CÁCH VÀ BỐ CỤC**: cùng khung 1536x1024, cùng 3 tư thế, cùng cỡ con mèo, cùng chất chì, cùng độ dày nét. Mun thay chỗ Sữa ở từng tư thế.
2. art/ref/owner_l1_style_ref.png — mẫu màu và chất chì chung của game (O6).
3. art/ref/l1_depth_angle_ref.png — góc nhìn chung (sofa level 1).

## Thiết kế Mun (art/style.md mục 3 + G5-3)
- Mèo **đen than ấm #3E3838**, KHÔNG đen tuyền, KHÔNG đen đặc: cả bộ lông phải thấy **vân bút chì** rõ, nét lông xám than ấm sáng hơn (khoảng #5A5050–#6A5E5A) đi theo chiều lông, như tô bằng chì màu đen ấm trên giấy kem. Chỗ sáng nhất của lông (đỉnh đầu, lưng, má) ngả xám ấm nhẹ; chỗ khuất tối hơn chút. Không bóng loáng, không gradient số.
- **Mắt tròn rất to, màu vàng mật ong** (khoảng #F4C95A, viền trong cam caramel nhạt), là điểm sáng nổi nhất trên mặt; lòng đen nâu sẫm to, 1–2 chấm sáng trắng; viền mắt nâu ấm. Cỡ mắt to như mắt Sữa.
- **Tai hơi to**, nhọn bo đầu, **hơi cụp ngang ra hai bên** (nhút nhát), trong tai hồng đào xám nhạt.
- Mũi nhỏ hồng xám; miệng chữ ω nhỏ, mảnh; má phớt hồng rất nhạt (nhìn thấy được trên nền lông tối nhưng nhẹ); vài sợi ria mảnh màu kem nhạt.
- Dáng **thon hơn Sữa, chân dài hơn một chút**, lông mượt hơn Sữa (mép lông chỉ vài túm nhỏ, không xù bông). Đầu vẫn to kiểu chibi, gần bằng thân.
- **Đuôi dài, mảnh**, đầu đuôi hơi nhọn.
- Tính cách: nhút nhát, hơi rụt người, mắt nhìn lén nhưng dễ thương. Không có đốm trắng, không vòng cổ.
- Nét viền: nâu ấm sẫm (khoảng #4A3430, sẫm hơn lông một chút để tách khối nhưng không đen tuyền), độ dày và chất chì như nét của Sữa ở ảnh 1: chỗ khuất/gập dày nhất, phần lớn mảnh hơn, đầu nét nhọn dần.

## Bố cục (1536x1024, nền trong suốt) — đúng như sua_ref
- Trái: **ngồi nhìn thẳng**, hai chân trước khép, đuôi dài vòng quanh chân, tai hơi cụp, mắt to nhìn lên hơi rụt rè.
- Giữa: **đi nhìn nghiêng sang phải**, dáng thon, chân dài, đuôi dài cong lên nhẹ, đầu hơi cúi thấp (rón rén).
- Phải: **ngủ cuộn tròn**, đuôi dài quấn quanh mặt, mắt nhắm cong.
- Ba tư thế cùng cỡ con mèo, cùng đường đáy, mỗi tư thế cách nhau và cách mép ảnh ≥ 40px, không chạm nhau. Cỡ mỗi con xấp xỉ cỡ Sữa trong ảnh 1.

## Prompt gợi ý cho image_gen (tiếng Anh, giữ đủ ý, có thể thêm)
- Character reference sheet of "Mun", a shy black neighbour cat, drawn in EXACTLY the same style, hand, colored-pencil texture, line weight, chibi proportions and layout as image 1 (the white cat Sua reference sheet). Same canvas 1536x1024, same three poses at the same size: left sitting front view, middle walking side view facing right, right sleeping curled up.
- Fur is warm charcoal #3E3838, never pure black, never a flat solid fill: visible colored-pencil hatching everywhere, lighter warm-grey pencil strokes (#5A5050–#6A5E5A) following the fur direction, slightly lighter on top of head, back and cheeks. Smooth short fur with only a few soft tufts at cheeks and chest, less fluffy than Sua.
- Huge round honey-yellow eyes (#F4C95A, soft caramel inner rim), large dark brown pupils with 1–2 white highlights, warm brown eye outline. Eyes are the brightest point of the face.
- Slightly large pointed ears with rounded tips, tilted slightly outward/down (shy), inner ear muted peach-pink. Tiny greyish-pink nose, tiny thin ω mouth, very faint pink cheek blush, a few thin cream whiskers.
- Slimmer body and slightly longer legs than Sua, big chibi head. Long thin tail with a slightly pointed tip. Shy, timid, peeking expression, cute.
- Outline: dark warm brown (#4A3430), slightly darker than the fur, never pure black, pencil-like pressure (thicker only in tucked corners, thinner and tapering elsewhere), same thickness as Sua's outline in image 1.
- Transparent background with real alpha. No text, no numbers, no frames, no floor shadow, no glow, no white halo or white outline around the cats.

## Lưu và báo cáo
- Lưu vào: **art/out/cats/mun_ref.png** (file mới, chưa có; không ghi đè gì). Gọi image_gen MỘT lần, chép nguyên ảnh, không tự cắt, không xử lý.
- Trước khi gọi image_gen viết "Nhắc lại quy tắc" (phong cách, góc nhìn, màu lông/mắt/nét, bố cục 3 tư thế, nền).
- Tin nhắn cuối có "Tự kiểm" (đạt / không đạt + lý do): cùng phong cách sua_ref; lông than ấm có vân chì, không đen đặc; mắt vàng mật ong to; tai hơi to hơi cụp; dáng thon chân dài; đuôi dài mảnh; nét nâu sẫm không đen tuyền; 3 tư thế đúng chỗ, cùng cỡ, không chạm; nền trong suốt; không chữ; không quầng. Kèm SAVED và prompt cuối.

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
