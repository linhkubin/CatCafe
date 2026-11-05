TÁCH TỪ DEMO — lượt `l10_p1` (Level 10 "Đại chiến quái thú", A10-2: chủ dự án cho tách asset trước rồi ghép demo đúng bố cục), đúng quy tắc AGENTS.md (vai Codex: chỉ vẽ; ngoại lệ "TÁCH TỪ DEMO": mỗi món một lần gọi image_gen, mỗi món một ảnh, 7 món). **Model gpt-6.1-sol, mức medium.**

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

### 1. `l10_shelf_left` → art/out/_sheets/l10src_l10_shelf_left.png (1536x1024, nền trong suốt)
- Trong demo: art/out/demo/l10_demo_fight_play.png, vùng x 40–300, y 262–335. Ảnh cắt: art/ref/l10_cut/l10_shelf_left.png (đính kèm).
- Cỡ trong game (rộng x cao): **240 x 30 (tấm ván; pát đỡ thò dưới)**.
- Kệ gỗ treo tường dài: tấm ván gỗ mật ong nhạt bo tròn, hai pát đỡ gỗ tròn bên dưới. Không có đồ trên kệ.
- **KHÔNG lấy:** kéo, tường.

### 2. `l10_shelf_mid` → art/out/_sheets/l10src_l10_shelf_mid.png (1536x1024, nền trong suốt)
- Trong demo: art/out/demo/l10_demo_fight_play.png, vùng x 335–585, y 335–402. Ảnh cắt: art/ref/l10_cut/l10_shelf_mid.png (đính kèm).
- Cỡ trong game (rộng x cao): **200 x 30 (tấm ván; pát đỡ thò dưới)**.
- Kệ gỗ treo tường ngắn hơn kệ trên, cùng kiểu, cùng màu. Không có đồ trên kệ.
- **KHÔNG lấy:** chồng sách, tường.

### 3. `l10_scissors` → art/out/_sheets/l10src_l10_scissors.png (1536x1024, nền trong suốt)
- Trong demo: art/out/demo/l10_demo_fight_play.png, vùng x 88–262, y 160–280. Ảnh cắt: art/ref/l10_cut/l10_scissors.png (đính kèm).
- Cỡ trong game (rộng x cao): **110 x 60**.
- Cây kéo học sinh nằm nghiêng: tay cầm nhựa hồng phấn hai vòng, lưỡi bạc xám nhạt khép lại.
- **KHÔNG lấy:** kệ, tường.

### 4. `l10_book_stack` → art/out/_sheets/l10src_l10_book_stack.png (1024x1536, nền trong suốt)
- Trong demo: art/out/demo/l10_demo_fight_play.png, vùng x 360–555, y 160–350. Ảnh cắt: art/ref/l10_cut/l10_book_stack.png (đính kèm).
- Cỡ trong game (rộng x cao): **100 x 150**.
- Chồng 6–7 cuốn sách gáy pastel (xanh trời, vàng bơ, hồng, bạc hà, oải hương, đào) xếp hơi lệch, không chữ. **Hẹp và cao hơn demo: rộng:cao ≈ 2:3.**
- **KHÔNG lấy:** kệ, tường.

### 5. `l10_soup_box` → art/out/_sheets/l10src_l10_soup_box.png (1024x1024, nền trong suốt)
- Trong demo: art/out/demo/l10_demo_fight_play.png, vùng x 670–862, y 50–205. Ảnh cắt: art/ref/l10_cut/l10_soup_box.png (đính kèm).
- Cỡ trong game (rộng x cao): **130 x 90**.
- Hộp súp thưởng: hộp giấy kem có hình cá xanh trời đơn giản ở mặt trước (không chữ), ruy băng hồng phấn buộc chữ thập, nơ to trên nắp. Đáy phẳng.
- **KHÔNG lấy:** kệ, tường.

### 6. `l10_soup_box_open` → art/out/_sheets/l10src_l10_soup_box_open.png (1024x1024, nền trong suốt)
- Trong demo: art/out/demo/l10_demo_end_play.png, vùng x 350–660, y 990–1110. Ảnh cắt: art/ref/l10_cut/l10_soup_box_open.png (đính kèm).
- Cỡ trong game (rộng x cao): **130 x 100**.
- **Chỉnh sửa từ ảnh art/out/_sheets/l10src_l10_soup_box.png** (vẽ ở lượt này trước).
- Cùng hộp súp ở trên (cùng thân, cùng cỡ thân, cùng màu, cùng hình cá), **nắp bật ngửa ra sau**, ruy băng hồng **đứt** vắt hai bên thân hộp, thấy súp kem lấm tấm bên trong. Đáy phẳng, thân hộp trùng vị trí với hộp buộc.
- **KHÔNG lấy:** mèo, sàn, khói.

### 7. `l10_vase` → art/out/_sheets/l10src_l10_vase.png (1024x1536, nền trong suốt)
- Trong demo: art/out/demo/l10_demo_fight_play.png, vùng x 410–555, y 835–1035. Ảnh cắt: art/ref/l10_cut/l10_vase.png (đính kèm).
- Cỡ trong game (rộng x cao): **70 x 130**.
- Lọ hoa sứ xanh trời nhạt dáng bầu cổ nhỏ, cắm 3–4 bông hoa tròn hồng, vàng nhạt có lá xanh nhạt. **Thon cao: rộng:cao ≈ 1:2 (cả hoa).**
- **KHÔNG lấy:** bàn, hộp bánh, điều khiển.

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
