TÁCH TỪ DEMO — lượt `l7_tach_2` (Level 7 "Về nhà thôi, Mun!", G5-23), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ; ngoại lệ "TÁCH TỪ DEMO": mỗi món một lần gọi image_gen, mỗi món một ảnh). Model gpt-6.1-sol, mức medium. Chủ dự án đã duyệt demo, dặn: "cố gắng tách sao cho giống demo".

**Ảnh demo gốc của lượt này: art/out/demo/l7_demo_s1.png** (khung 1080x1920; toạ độ "trong demo" tính trên ảnh này). Cùng cảnh không giao diện: art/out/demo/l7_demo_s1_play.png (1024x1536, toạ độ "vùng chơi").

## Luật chung cho mọi món
- **Vẽ lại đúng món trong demo: cùng hình dáng, tỉ lệ, màu, chi tiết, nét.** Không tự thiết kế lại. Màu **không đậm hơn, không nhạt hơn** demo (demo là đêm mưa tông nhạt pastel). Cùng góc nhìn.
- Mỗi món: gọi image_gen **một lần**, đính kèm (tối đa 5 ảnh) ảnh demo gốc + ảnh cắt của món + art/ref/owner_l1_style_ref.png + art/ref/l1_depth_angle_ref.png. **Nền TRONG SUỐT thật** (giữ kênh alpha).
- **Lấp gần kín khung (G5-34):** khung ghi cạnh tên món; món to hết cỡ, lề trong suốt quanh món chỉ ~40px, không bị cắt.
- **Chỉ đúng một món.** Không lấy mưa (vệt mưa), giọt nước bay, Mun, đồ chồng lên, đồ phía sau, tường, nền, bóng, quầng. Chỗ bị che: vẽ bù đúng thiết kế.
- Không chữ, không số, không khung, không bóng sàn, không viền trắng quanh món.
- Lưu từng món vào đúng tên dưới (file mới, không ghi đè). Chép nguyên ảnh, không cắt, không xử lý.
- Trước mỗi lần gọi image_gen viết "Nhắc lại quy tắc" (phong cách, góc nhìn, màu, nét, phần lấy / không lấy của món). Tin nhắn cuối có "Tự kiểm" **từng món** (giống demo về hình, tỉ lệ, màu, chi tiết; đã bỏ phần không lấy; lấp kín khung; nền trong suốt; không chữ: đạt / không đạt + lý do), SAVED từng file, prompt cuối từng món.

## Ảnh tham chiếu chung (mở hết bằng view_image)
1. art/out/demo/l7_demo_s1.png — **ẢNH DEMO GỐC**.
2. art/out/demo/l7_demo_s1_play.png — cùng cảnh, đo toạ độ vùng chơi.
3. art/ref/owner_l1_style_ref.png — chuẩn màu và chất chì.
4. art/ref/l1_depth_angle_ref.png — góc nhìn.

## Danh sách 7 món

### 1. `l7_step_ladder_open` → art/out/_sheets/l7src_l7_step_ladder_open.png (1024x1536, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l7_demo_s1.png, món nằm ở x 918–1071, y 856–1094 trong demo** (vùng chơi art/out/demo/l7_demo_s1_play.png: x 870–1015, y 670–895).
- Ảnh cắt đính kèm: art/ref/l7_cut/l7_step_ladder_open.png.
- Thang gỗ chữ A nhỏ **2 bậc**, gỗ mật ong nhạt, dáng **bung đứng** (hai chân chụm ở đỉnh, xoè ở dưới), 2 bậc ngang, đúng như demo. Vẽ **đủ cả thang**, mép phải thang trong demo bị khung cắt thì vẽ bù cho cân.
- KHÔNG lấy xe ba gác, mái bạt, tường, mưa.

### 2. `l7_plank` → art/out/_sheets/l7src_l7_plank.png (1536x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l7_demo_s1.png, món nằm ở x 206–343, y 672–1078 trong demo** (vùng chơi art/out/demo/l7_demo_s1_play.png: x 195–325, y 495–880).
- Ảnh cắt đính kèm: art/ref/l7_cut/l7_plank.png.
- Tấm ván gỗ dài mộc, mật ong nhạt, vài vân gỗ mảnh, hai đầu cắt vuông hơi bo. Trong demo ván **dựa nghiêng vào tường**; vẽ ván **nằm ngang** (xoay cho trục dài nằm ngang), thấy chút độ dày mép dưới, cùng màu, nét, chi tiết như demo.
- KHÔNG lấy tường, gạch, mưa.

### 3. `l7_flood_strip` → art/out/_sheets/l7src_l7_flood_strip.png (1024x1536, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l7_demo_s1.png, món nằm ở x 364–564, y 1052–1770 trong demo** (vùng chơi art/out/demo/l7_demo_s1_play.png: x 345–535, y 855–1536).
- Ảnh cắt đính kèm: art/ref/l7_cut/l7_flood_strip.png.
- Dải nước ngập xanh da trời nhạt **chạy dọc** từ chân tường xuống đáy, mép hai bên hơi lượn, mặt nước có vài gợn vòng tròn và vài hạt toé nhỏ ở mép, đúng màu demo. Vẽ thành một dải dọc dài, mép trên bo nhẹ (chỗ giáp chân tường), mép dưới bo nhẹ.
- KHÔNG lấy nền hẻm xám hai bên, mưa, vũng nước khác, mái bạt.

### 4. `l7_branch` → art/out/_sheets/l7src_l7_branch.png (1024x1536, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l7_demo_s1.png, món nằm ở x 0–237, y 930–1505 trong demo** (vùng chơi art/out/demo/l7_demo_s1_play.png: x 0–225, y 740–1285).
- Ảnh cắt đính kèm: art/ref/l7_cut/l7_branch.png.
- **Một** cành cây gãy to: một nhánh chính caramel nhạt chẻ vài nhánh con, **lá xanh lá nhạt rậm** (cùng dáng lá, màu, nét như đống cành trong demo), đầu gãy lộ thớ gỗ kem. Trong demo là đống 3 cành chồng nhau sát mép trái; ở đây vẽ **một cành** đứng (gốc gãy ở dưới, ngọn lá ở trên), rộng vừa phải, đủ rậm.
- KHÔNG lấy nền, vũng nước, mưa, các cành khác chồng lên.

### 5. `l7_puddle` → art/out/_sheets/l7src_l7_puddle.png (1536x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l7_demo_s1.png, món nằm ở x 464–1080, y 1384–1447 trong demo** (vùng chơi art/out/demo/l7_demo_s1_play.png: x 440–1024, y 1170–1230).
- Ảnh cắt đính kèm: art/ref/l7_cut/l7_puddle.png.
- Vũng nước nông hình elip dẹt nằm trên nền, xanh da trời nhạt trong, có 2–3 gợn vòng tròn mảnh, mép mềm, đúng màu vũng trong demo (vùng chơi quanh (960, 1200) và (690, 1420)). Nhìn hơi từ trên nên rất dẹt (cao ≈ 1/3,5 bề rộng).
- KHÔNG lấy nền hẻm, mưa, lá, cành.

### 6. `l7_branch_debris` → art/out/_sheets/l7src_l7_branch_debris.png (1536x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l7_demo_s1.png, món nằm ở x 206–364, y 1495–1568 trong demo** (vùng chơi art/out/demo/l7_demo_s1_play.png: x 195–345, y 1275–1345).
- Ảnh cắt đính kèm: art/ref/l7_cut/l7_branch_debris.png.
- Cành gãy nhỏ trang trí nằm trên nền: một que caramel chẻ 1–2 nhánh, 2–3 lá xanh nhỏ, đúng như các cành nhỏ trong demo (vùng chơi quanh (270, 1310) và (910, 1430)). Nằm ngang.
- KHÔNG lấy nền, vũng nước, mưa.

### 7. `l7_leaf` → art/out/_sheets/l7src_l7_leaf.png (1536x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l7_demo_s1.png, món nằm ở x 380–422, y 329–355 trong demo** (vùng chơi art/out/demo/l7_demo_s1_play.png: x 360–400, y 170–195).
- Ảnh cắt đính kèm: art/ref/l7_cut/l7_leaf.png.
- Một chiếc lá bay nhỏ xanh lá nhạt hình bầu dục nhọn đầu, gân giữa mảnh, cuống ngắn, đúng như lá bay trong demo (trên trời). Vẽ to hết khung.
- KHÔNG lấy trời, mưa.

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
