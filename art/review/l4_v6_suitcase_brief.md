CHỈNH SỬA TỪ ẢNH art/ref/l4_v6_input/suitcase.png (Level 4, Vòng 6), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

Chủ dự án chơi thử bản ráp và chê: asset **xấu hơn demo, khác demo**. Quy tắc mới (G4-22): **demo đã duyệt là chuẩn duy nhất**. Ảnh đầu vào là **ảnh cắt đúng món đó từ demo đã duyệt**, phóng to. **Vẽ lại đúng món này: cùng hình dáng, tỉ lệ, màu, chi tiết, nét như ảnh đầu vào. Không tự thiết kế lại, không đổi màu, không đổi tỉ lệ.**

- Dùng image_gen **chế độ chỉnh sửa** trên ảnh đầu vào. Kết quả: **nền TRONG SUỐT thật** (alpha), chỉ còn đúng các món ghi dưới, mỗi món nằm trọn trong vùng của nó, cách nhau và cách mép ảnh ≥ 40px. Cỡ ảnh 1536x1024.
- Lưu vào: art/out/_sheets/l4v6_suitcase_sheet.png (được phép ghi đè). Gọi image_gen MỘT lần, chép nguyên ảnh, không tự cắt hay xử lý.
- **Ảnh demo gốc (G4-26): art/out/demo/l4_demo_study.png**, món cần vẽ nằm ở vali x 130–565, y 885–1190; vali gập trên tháp ở ảnh demo phòng khách art/out/demo/l4_demo_living.png x 200–445, y 915–1000. Mở bằng view_image, vẽ món đồ giống hệt trong demo (hình dáng, tỉ lệ, màu, nét). Đính kèm cả ảnh demo gốc này cho image_gen.
- Ảnh tham chiếu, mở bằng view_image và đính kèm: 1. art/ref/l4_v6_input/suitcase.png (ẢNH GỐC chỉnh sửa); 2. art/ref/owner_l1_style_ref.png (chất chì, màu chung); art/out/demo/l4_demo_study.png (ẢNH DEMO GỐC); art/ref/l1_depth_angle_ref.png (góc nhìn, sofa L1).
- Trước khi gọi image_gen viết "Nhắc lại quy tắc"; tin nhắn cuối có "Tự kiểm" (từng món: giống ảnh gốc về hình, tỉ lệ, màu, chi tiết: đạt / không đạt; nền trong suốt; không chữ), SAVED, prompt cuối.

## Cần làm
**Một chiếc vali duy nhất, cùng thiết kế, cùng màu** (xanh da trời nhạt, 2 đai vàng bơ nhạt, góc bọc caramel, tay cầm caramel) ở hai trạng thái:
- Ô trái (x 0–900): `l4_suitcase_full` **đúng như vali lớn trong ảnh gốc** (căng phồng, khóa kéo, góc áo bạc hà và dây kính lặn thò ra). Xoá sàn thành trong suốt.
- Ô phải (x 900–1536): `l4_suitcase_folded` = **đúng như vali dẹt trong ảnh gốc** (vali gập nằm ngang trên tháp), nhưng vẽ lại **cùng màu, cùng đai, cùng góc bọc, cùng tay cầm với vali lớn** (cùng một chiếc vali, chỉ gập dẹt lại). Xoá đồ khác (đệm, sách, rèm) thành trong suốt.
Vali gập này dùng cho cả lúc nhặt (trong túi) và lúc đặt trên tháp.

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
