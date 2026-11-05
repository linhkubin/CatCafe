TÁCH TỪ DEMO — lượt `l10_p5` (Level 10 "Đại chiến quái thú", A10-2: chủ dự án cho tách asset trước rồi ghép demo đúng bố cục), đúng quy tắc AGENTS.md (vai Codex: chỉ vẽ; ngoại lệ "TÁCH TỪ DEMO": mỗi món một lần gọi image_gen, mỗi món một ảnh, 7 món). **Model gpt-6.1-sol, mức medium.**

**Ảnh demo gốc: art/out/demo/l10_demo_fight_916.png** (khung điện thoại); vùng chơi: **art/out/demo/l10_demo_fight_play.png** (cảnh đánh nhau) và **art/out/demo/l10_demo_end_play.png** (cảnh kết), toạ độ dưới đây tính trên vùng chơi 1024x1536.

## Luật chung cho mọi món
- **Vẽ đúng món trong demo: cùng thiết kế, màu, chi tiết, nét**, không thêm, không bớt chi tiết; màu **không đậm hơn** demo (nghi ngờ thì nhạt hơn), cùng góc nhìn.
- **Tỉ lệ rộng x cao theo cỡ game ghi ở từng món** (cỡ chủ dự án đã duyệt trong bản khối). Nếu demo khác tỉ lệ đó thì vẽ món **cao hơn / thấp hơn / hẹp hơn** cho đúng tỉ lệ game, giữ thiết kế.
- Mỗi món: gọi image_gen **một lần**, đính kèm ảnh demo gốc + ảnh cắt món + art/ref/owner_l1_style_ref.png. **Nền TRONG SUỐT thật.** Món to hết cỡ trong khung, lề trong suốt khoảng 40px (G5-34), không bị cắt.
- **Chỉ đúng một món** trong ảnh. Không lấy đồ chồng lên, đồ phía sau, nền, bóng, quầng. Chỗ bị che: vẽ bù đúng thiết kế.
- Không chữ, không số, không khung, không bóng sàn, không viền trắng.
- Lưu từng món vào **art/out/_sheets/l10src_<key>.png** (file mới). Chép nguyên ảnh, không cắt, không xử lý.
- **Món ghi "Chỉnh sửa từ ảnh …"**: vẽ món gốc trước trong lượt, rồi dùng chế độ chỉnh sửa trên ảnh `l10src_` đó: giữ nguyên khung, cỡ, vị trí, màu, nét, chỉ đổi đúng phần ghi.
- Trước mỗi lần gọi image_gen viết "Nhắc lại quy tắc" (phong cách, góc nhìn, màu, nét, tỉ lệ, phần lấy / không lấy). Tin nhắn cuối có "Tự kiểm" **từng món**, SAVED từng file, prompt cuối từng món.

## Danh sách 7 món

### 1. `l10_lamp_post` → art/out/_sheets/l10src_l10_lamp_post.png (1024x1536, nền trong suốt)
- Trong demo: art/out/demo/l10_demo_end_play.png, vùng x 164–242, y 1206–1392. Ảnh cắt: art/ref/l10_cut/l10_lamp_post.png (đính kèm).
- Cỡ trong game (rộng x cao): **30 x 110**.
- Cột đèn đường đồ chơi: cột nhựa xám nhạt mảnh, đế tròn, một **bóng đèn tròn kem ở đỉnh** (đèn tắt). **Rất mảnh và cao: rộng:cao ≈ 1:3,7.**
- **KHÔNG lấy:** thảm, khối xếp hình.

### 2. `l10_lamp_post_on` → art/out/_sheets/l10src_l10_lamp_post_on.png (1024x1536, nền trong suốt)
- Trong demo: art/out/demo/l10_demo_end_play.png, vùng x 164–242, y 1206–1392. Ảnh cắt: art/ref/l10_cut/l10_lamp_post_on.png (đính kèm).
- Cỡ trong game (rộng x cao): **30 x 110**.
- **Chỉnh sửa từ ảnh art/out/_sheets/l10src_l10_lamp_post.png** (vẽ ở lượt này trước).
- Y hệt cột đèn trên, chỉ khác: **bóng đèn sáng vàng bơ nhạt**, một quầng vàng rất nhạt nhỏ sát bóng đèn.
- **KHÔNG lấy:** thảm.

### 3. `l10_ball` → art/out/_sheets/l10src_l10_ball.png (1024x1024, nền trong suốt)
- Trong demo: art/out/demo/l10_demo_end_play.png, vùng x 34–172, y 1279–1416. Ảnh cắt: art/ref/l10_cut/l10_ball.png (đính kèm).
- Cỡ trong game (rộng x cao): **78 x 78**.
- Quả bóng nhựa tròn sọc múi 3 màu pastel (hồng, vàng bơ, xanh trời), một vệt sáng nhỏ.
- **KHÔNG lấy:** thảm, sàn.

### 4. `l10_plane` → art/out/_sheets/l10src_l10_plane.png (1536x1024, nền trong suốt)
- Trong demo: art/out/demo/l10_demo_end_play.png, vùng x 756–961, y 1266–1406. Ảnh cắt: art/ref/l10_cut/l10_plane.png (đính kèm).
- Cỡ trong game (rộng x cao): **210 x 98**.
- Máy bay cánh quạt đồ chơi nhựa trắng kem sọc xanh trời, **mũi sang phải**, cánh quạt xanh trời đứng yên ở mũi, bánh nhỏ, **một càng móc nhỏ dưới bụng**. Dáng dài thấp: rộng:cao ≈ 2,1:1.
- **KHÔNG lấy:** thảm, sàn.

### 5. `l10_plane_fly` → art/out/_sheets/l10src_l10_plane_fly.png (1536x1024, nền trong suốt)
- Trong demo: art/out/demo/l10_demo_end_play.png, vùng x 756–961, y 1266–1406. Ảnh cắt: art/ref/l10_cut/l10_plane_fly.png (đính kèm).
- Cỡ trong game (rộng x cao): **210 x 98**.
- **Chỉnh sửa từ ảnh art/out/_sheets/l10src_l10_plane.png** (vẽ ở lượt này trước).
- Y hệt máy bay trên, chỉ khác: **cánh quạt đang quay** thành một đĩa mờ trong mờ xanh trời nhạt có vài vệt cong.
- **KHÔNG lấy:** sàn.

### 6. `l10_battery` → art/out/_sheets/l10src_l10_battery.png (1536x1024, nền trong suốt)
- Trong demo: art/out/demo/l10_demo_end_play.png, vùng x 756–961, y 1266–1406. Ảnh cắt: art/ref/l10_cut/l10_battery.png (đính kèm).
- Cỡ trong game (rộng x cao): **90 x 60**.
- **Hai viên pin tiểu** nằm chéo cạnh nhau: thân vàng bơ nhạt, đầu bạc xám nhạt có núm, **không chữ, không dấu +/-**. (Không có trong demo; cùng phong cách, nét, màu như các đồ chơi trong demo.)
- **KHÔNG lấy:** máy bay, mọi thứ khác.

### 7. `l10_fire` → art/out/_sheets/l10src_l10_fire.png (1536x1024, nền trong suốt)
- Trong demo: art/out/demo/l10_demo_fight_play.png, vùng x 330–660, y 600–720. Ảnh cắt: art/ref/l10_cut/l10_fire.png (đính kèm).
- Cỡ trong game (rộng x cao): **300 x 60 (code kéo dài)**.
- Luồng lửa của Sữa: **dải lửa nằm ngang** đi từ trái sang phải, **gốc ở giữa mép TRÁI** (chỗ miệng), gốc đậm hơn chút, thân lượn sóng mềm, **đuôi loe nhạt dần ở bên phải**, đầu tròn mềm. **Xanh pastel** (xanh trời nhạt tới bạc hà), không đỏ, không khói đen, không chói. Dài dẹt: rộng:cao ≈ 5:1.
- **KHÔNG lấy:** mèo, sofa, nền.

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
