TÁCH TỪ DEMO — 1 món `l5_awning_down` (Level 5, tấm bạt to che đầu hẻm, G5-26), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ). Chủ dự án đã duyệt demo này.

Ảnh demo gốc: **art/out/demo/l5_demo_alley_g26.png** (1024x1536). Món cần vẽ là **tấm bạt sọc hồng đào–kem** chạy ngang hết ảnh ở **y ≈ 222–418**, gồm:
- **Lấy:** sợi dây căng ngang ở mép trên (y ≈ 228–236) cùng các mối buộc nhỏ trên dây; toàn bộ vải sọc dọc hồng đào và kem; mép dưới lượn sóng tròn; **lỗ thủng duy nhất** tâm ≈ (206, 352), rộng ≈ 34px, mép sờn vài sợi chỉ.
- **KHÔNG lấy:** con quạ đậu trên dây (x ≈ 275–365), trời và mây phía trên, tường gạch phía sau mép lượn sóng, ống thoát nước bên phải, bất kỳ đồ gì khác.
- Ảnh cắt sẵn vùng này để xem chi tiết: art/ref/l5_cut/crops/g26_awning_crop.png (là demo y 140–440, toàn bề ngang).

## Yêu cầu ảnh ra
- 1536x1024, **nền trong suốt thật** (giữ kênh alpha). **Trong lỗ thủng cũng trong suốt** (không vẽ trời xanh trong lỗ: game tự đặt nền và tia nắng sau lỗ).
- Tấm bạt **chạy hết bề ngang ảnh, chạm sát mép trái và mép phải** (bị mép ảnh cắt thẳng, không thấy đầu bạt, không vẽ đầu dây hay cọc ở hai bên). Đây là ngoại lệ của quy tắc "cách mép 40px": bạt phải tràn mép để game ghép liền hai bên.
- Đặt bạt ở giữa ảnh theo chiều dọc. **Tỉ lệ giữ như demo:** tổng cao (từ mối buộc trên dây đến đáy mép lượn sóng) ≈ **19% bề ngang** → ở ảnh 1536 rộng, cao ≈ **290px**.
- Giữ đúng như demo: số sọc và độ rộng sọc theo tỉ lệ (sọc ≈ 1/10 bề ngang), thứ tự màu sọc từ trái sang (hồng đào ở mép trái), mép lượn sóng dưới mỗi sọc, độ võng nhẹ, vị trí lỗ thủng (cách mép trái ≈ **20% bề ngang**, nằm ở khoảng 2/3 chiều cao vải tính từ dây xuống), màu, nét nâu đậm nhạt, vân chì.
- Không bóng, không quầng, không chữ, không số.

## Ảnh tham chiếu (mở hết bằng view_image, đính kèm theo thứ tự)
1. art/out/demo/l5_demo_alley_g26.png: **ẢNH DEMO GỐC**.
2. art/ref/l5_cut/crops/g26_awning_crop.png: ảnh cắt vùng bạt.
3. art/ref/owner_l1_style_ref.png: chuẩn màu.
4. art/ref/l1_depth_angle_ref.png: góc nhìn.

## Lưu và báo cáo
- Lưu vào **art/out/_sheets/l5src_l5_awning_down_g26.png** (file mới). Gọi image_gen MỘT lần, 1536x1024, chép nguyên, không tự xử lý.
- "Nhắc lại quy tắc" trước; "Tự kiểm" cuối (đạt / không đạt): tràn hai mép, tỉ lệ cao/ngang đo được, đúng một lỗ và lỗ trong suốt, không có quạ/trời/tường, nền trong suốt, màu, nét, không chữ. SAVED, prompt cuối.

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
