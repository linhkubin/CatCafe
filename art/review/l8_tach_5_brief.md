TÁCH TỪ DEMO — lượt `l8_tach_5` (Level 8 "Tắm cho Mun", G5-23), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ; ngoại lệ "TÁCH TỪ DEMO": mỗi món một lần gọi image_gen, mỗi món một ảnh). Model gpt-6.1-sol, mức medium. Chủ dự án đã duyệt demo; dặn: "prompt thật kỹ và gửi ảnh đúng như quy trình".

**Ảnh demo gốc của lượt này: art/out/demo/l8_demo_stage2.png** (khung điện thoại 1080x1920, chặng 2; toạ độ "trong demo" tính trên ảnh này). Cùng cảnh không giao diện: art/out/demo/l8_demo_stage2_play.png (1024x1536, toạ độ "vùng chơi").

## Luật chung cho mọi món
- **Vẽ lại đúng món trong demo: cùng hình dáng, tỉ lệ, màu, chi tiết, nét.** Không tự thiết kế lại, không thêm bớt chi tiết (trừ chỗ ghi SỬA), màu **không đậm hơn, không nhạt hơn** demo, cùng góc nhìn.
- Mỗi món: gọi image_gen **một lần**, đính kèm ảnh demo gốc + ảnh cắt của món + art/ref/owner_l1_style_ref.png + art/ref/l1_depth_angle_ref.png. **Nền TRONG SUỐT thật** (giữ kênh alpha).
- **Lấp gần kín khung (G5-34):** khung ghi cạnh tên món (chọn theo dáng món); món to hết cỡ, lề trong suốt quanh món chỉ ~40px, không bị cắt.
- **Chỉ đúng một món.** Không lấy Mun, lông, đồ chồng lên, đồ phía sau, tường, sàn, nước, bọt xung quanh, bóng, quầng, ô khay. Chỗ bị che: vẽ bù đúng thiết kế.
- Không chữ, không số, không khung, không bóng sàn, không viền trắng quanh món.
- Lưu từng món vào **art/out/_sheets/l8src_<key>.png** (đúng tên dưới; file mới, không ghi đè). Chép nguyên ảnh, không cắt, không xử lý.
- Trước mỗi lần gọi image_gen viết "Nhắc lại quy tắc" (phong cách, góc nhìn, màu, nét, phần lấy / không lấy của món). Tin nhắn cuối có "Tự kiểm" **từng món** (giống demo về hình, tỉ lệ, màu, chi tiết; đã bỏ phần không lấy; lấp kín khung; nền trong suốt; không chữ: đạt / không đạt + lý do), SAVED từng file, prompt cuối từng món.

## Ảnh tham chiếu chung (mở hết bằng view_image)
1. art/out/demo/l8_demo_stage2.png — **ẢNH DEMO GỐC**.
2. art/out/demo/l8_demo_stage2_play.png — cùng cảnh, đo toạ độ vùng chơi.
3. art/ref/owner_l1_style_ref.png — chuẩn màu và chất chì.
4. art/ref/l1_depth_angle_ref.png — góc nhìn.

## Danh sách 7 món

### 1. `l8_oil_drop` → art/out/_sheets/l8src_l8_oil_drop.png (1024x1536, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l8_demo_stage2.png** (không có nguyên món trong demo, lấy phong cách và màu từ demo).
- Ảnh cắt đính kèm: art/ref/l8_cut/crops/foam_stage2.png.
- Giọt dầu tắm: dáng **giọt nước đầu nhọn hướng LÊN, đáy tròn mập**, vàng bơ rất nhạt trong veo, viền caramel mảnh, một chấm sáng kem ở bên trên trái. Demo không có món này: vẽ cùng phong cách, cùng màu nhạt, cùng nét với các món demo chặng 2. Đứng thẳng, to lấp khung dọc.
- Một giọt duy nhất, không vũng, không vệt.

### 2. `l8_foam_bubble_a` → art/out/_sheets/l8src_l8_foam_bubble_a.png (1024x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l8_demo_stage2.png, món nằm ở x 369–738, y 761–1278 trong demo** (vùng chơi x 350–700, y 580–1070).
- Ảnh cắt đính kèm: art/ref/l8_cut/crops/foam_stage2.png.
- **Một bọt xà phòng nhỏ** tròn trắng ấm, viền lavender rất nhạt, một chấm sáng; đúng chất bọt trên người Mun ở demo chặng 2. Một bọt duy nhất, to lấp khung.
- KHÔNG lấy lông Mun, bọt khác.

### 3. `l8_foam_bubble_b` → art/out/_sheets/l8src_l8_foam_bubble_b.png (1024x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l8_demo_stage2.png, món nằm ở x 369–738, y 761–1278 trong demo** (vùng chơi x 350–700, y 580–1070).
- Ảnh cắt đính kèm: art/ref/l8_cut/crops/foam_stage2.png.
- **Hai bọt xà phòng dính nhau** (một vừa, một nhỏ), trắng ấm, viền lavender rất nhạt, thoáng ánh cầu vồng pastel rất nhạt ở mép, chấm sáng; đúng chất bọt trong demo chặng 2.
- KHÔNG lấy lông Mun.

### 4. `l8_foam_bubble_c` → art/out/_sheets/l8src_l8_foam_bubble_c.png (1024x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l8_demo_stage2.png, món nằm ở x 369–738, y 761–1278 trong demo** (vùng chơi x 350–700, y 580–1070).
- Ảnh cắt đính kèm: art/ref/l8_cut/crops/foam_stage2.png.
- **Cụm 3 bọt xà phòng dính nhau** (1 to, 2 nhỏ) như một búi bọt, trắng ấm, viền lavender rất nhạt, chấm sáng; đúng chất bọt phủ trên thân Mun ở demo chặng 2.
- KHÔNG lấy lông Mun.

### 5. `l8_tool_facecloth` → art/out/_sheets/l8src_l8_tool_facecloth.png (1024x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l8_demo_stage2.png** (món nằm trong khay đồ ở đáy demo).
- Ảnh cắt đính kèm: art/ref/l8_cut/crops/l8_tool_facecloth.png.
- Khăn mặt nhỏ gấp đôi xanh da trời nhạt, mép viền kem, 2 giọt nước nhỏ trên mặt khăn, đúng như khăn trong khay demo chặng 2 và ảnh cắt.
- KHÔNG lấy ô khay.

### 6. `l8_tool_sponge` → art/out/_sheets/l8src_l8_tool_sponge.png (1024x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l8_demo_stage2.png** (món nằm trong khay đồ ở đáy demo).
- Ảnh cắt đính kèm: art/ref/l8_cut/crops/l8_tool_sponge.png.
- Bông tắm lưới tròn xù hồng đào nhạt, quai dây kem nhỏ ở trên phải, đúng như bông tắm trong khay demo chặng 2 và ảnh cắt.
- KHÔNG lấy ô khay.

### 7. `l8_tool_shampoo` → art/out/_sheets/l8src_l8_tool_shampoo.png (1024x1536, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l8_demo_stage2.png** (món nằm trong khay đồ ở đáy demo).
- Ảnh cắt đính kèm: art/ref/l8_cut/crops/l8_tool_shampoo.png.
- Chai dầu tắm tròn mập hồng phấn, nắp bấm trắng ấm, nhãn tròn kem trên thân. SỬA: nhãn có **đúng 3 bọt tròn xanh da trời nhạt + 1 giọt nước** (demo có 2 bọt). Không chữ. Còn lại đúng như chai trong khay demo và ảnh cắt.
- KHÔNG lấy ô khay.

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
