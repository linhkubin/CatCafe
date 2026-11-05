TÁCH TỪ DEMO — lượt `l9_tach_1` (Level 9 "Súp thưởng", G5-23), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ; ngoại lệ "TÁCH TỪ DEMO": mỗi món một lần gọi image_gen, mỗi món một ảnh riêng). Model gpt-6.1-sol, mức medium. Chủ dự án đã duyệt demo; dặn: **mô tả chi tiết, nhớ chi tiết màu sắc và style**.

**Ảnh demo gốc của lượt này: art/out/demo/l9_demo_prep.png** (khung điện thoại 1080x1920). Cùng cảnh không giao diện, đúng vùng chơi 1024x1536: art/out/demo/l9_demo_prep_play2.png. Toạ độ "vùng chơi" dưới đây tính trên ảnh art/out/demo/l9_demo_prep_play2.png.

## Luật chung cho mọi món
- **Vẽ lại đúng món trong demo: cùng hình dáng, tỉ lệ, màu, chi tiết, nét, chất chì.** Không tự thiết kế lại, không thêm bớt chi tiết (trừ chỗ ghi **SỬA** hoặc món **không có trong demo**, khi đó vẽ cùng thiết kế, cùng màu, cùng nét với các món demo). Màu **không đậm hơn, không nhạt hơn** demo. Cùng góc nhìn như demo (bếp nhìn dốc theo khối ngoại lệ L9).
- Mỗi món: gọi image_gen **một lần**, đính kèm: ảnh demo gốc + ảnh cắt của món (ghi ở từng món) + art/ref/owner_l1_style_ref.png + art/ref/l1_depth_angle_ref.png. Tối đa 5 ảnh đính kèm mỗi lần gọi. **Nền TRONG SUỐT thật** (giữ kênh alpha).
- **Lấp gần kín khung (G5-34):** khung ghi cạnh tên món (chọn theo dáng món); món to hết cỡ, lề trong suốt quanh món chỉ ~40px, không bị cắt.
- **Chỉ đúng một món.** Không lấy mặt bàn, tường, sàn, đồ chồng lên, đồ phía sau, hơi nước, bóng, quầng. Chỗ bị che: vẽ bù đúng thiết kế.
- Không chữ, không số, không khung, không bóng đổ dưới món, không viền trắng quanh món.
- Lưu từng món vào **art/out/_sheets/l9src_<key>.png** (đúng tên dưới; file mới, không ghi đè). Chép nguyên ảnh, không cắt, không xử lý.
- Món ghi "CHỈNH SỬA TỪ ẢNH" thì gọi image_gen ở chế độ chỉnh sửa ảnh đó (giữ nguyên cỡ ảnh, vị trí, góc nhìn, màu, nét; chỉ đổi phần ghi).
- Trước mỗi lần gọi image_gen viết **"Nhắc lại quy tắc"** (phong cách, góc nhìn, màu, nét, phần lấy / không lấy của món). Tin nhắn cuối có **"Tự kiểm" từng món** (giống demo về hình, tỉ lệ, màu, chi tiết; đã bỏ phần không lấy; lấp kín khung; nền trong suốt; không chữ: đạt / không đạt + lý do), `SAVED:` từng file, prompt cuối từng món.

## Danh sách món

### 1. `l9_board` → art/out/_sheets/l9src_l9_board.png (1536x1024, nền trong suốt)
- Trong demo: thớt giữa bàn, vùng chơi x 180–730, y 935–1175.
- Ảnh cắt đính kèm: art/ref/l9_cut/l9_board.png
- Thớt gỗ chữ nhật bo góc, **mặt trên to** gỗ mật ong sáng (hơi vàng bơ hơn mặt bàn), vài nét chì thớ ngang thưa, **cạnh dày caramel** ở mặt trước, viền nâu ấm đậm nhạt; **lỗ treo tròn** ở góc trên-phải. Nhìn dốc như demo (thấy rõ mặt trên, cạnh trước là dải ngắn).
- KHÔNG lấy: gà, bí, dao, vỏ bí, mặt bàn. **Thớt TRỐNG**: vẽ bù phần mặt thớt bị gà, bí, dao che (cùng màu, cùng thớ).

### 2. `l9_chicken_piece` → art/out/_sheets/l9src_l9_chicken_piece.png (1536x1024, nền trong suốt)
- Trong demo: dải gà thứ 3 (giữa, to nhất) trong chồng 5 dải bên trái thớt, vùng chơi x 210–405, y 1010–1045.
- Ảnh cắt đính kèm: art/ref/l9_cut/l9_chicken_piece.png
- **Một dải ức gà nằm ngang** (dài gấp khoảng 5 lần dày), hai đầu bo tròn mập: mặt trên hồng phấn pha trắng ấm có vài nét chì thớ thịt dọc theo dải, **mặt cắt phía trước nhạt hơn**, viền nâu ấm mảnh, đúng màu demo. Vẽ to, nằm ngang hết khung.
- KHÔNG lấy: các dải khác, thớt, mặt bàn.

### 3. `l9_pumpkin` → art/out/_sheets/l9src_l9_pumpkin.png (1024x1024, nền trong suốt)
- Trong demo: quả bí giữa thớt, vùng chơi x 425–645, y 935–1135 (thân quả).
- Ảnh cắt đính kèm: art/ref/l9_cut/l9_pumpkin.png
- **Thân quả bí đỏ ĐÃ GỌT** (ruột cam mơ nhạt mịn, đúng màu demo), dáng **gần tròn** hơi dẹt, múi rất nhẹ **đối xứng quanh tâm** (không gân lệch hướng), viền nâu ấm, vài nét chì đổ bóng ở phải-dưới. **SỬA so với demo:** **không có cuống** (cuống là món riêng), **không có vết cắt** (vết cắt do code vẽ).
- KHÔNG lấy: cuống, dao, vết cắt, thớt, gà.

### 4. `l9_pumpkin_stem` → art/out/_sheets/l9src_l9_pumpkin_stem.png (1024x1024, nền trong suốt)
- Trong demo: cuống trên đỉnh quả bí, vùng chơi x 520–560, y 915–960.
- Ảnh cắt đính kèm: art/ref/l9_cut/l9_pumpkin_stem.png
- **Cuống bí ngắn mập**, xanh lá #9DC283 nhạt, hơi cong, đầu cắt bằng có vòng tròn nhạt hơn, gốc loe nhẹ (gốc ở **đáy khung giữa**, cuống chĩa lên), viền nâu ấm, vân chì dọc. Vẽ to hết khung.
- KHÔNG lấy: thân quả, dao.

### 5. `l9_pumpkin_rind` → art/out/_sheets/l9src_l9_pumpkin_rind.png (1024x1536, nền trong suốt)
- Trong demo: các miếng vỏ bí rơi trên bàn, vùng chơi x 650–855, y 1195–1310 (lấy chất màu từ đây).
- Ảnh cắt đính kèm: art/ref/l9_cut/l9_pumpkin_rind.png
- **Một miếng vỏ bí đứng dọc** (cao gấp khoảng 2 lần rộng), là một múi vỏ bí đỏ: mặt ngoài **hồng đào** (đậm hơn ruột bí một chút, trong ô #F7B9A3) có 1–2 nét chì gân dọc, **mép trái và mép phải hơi cong ôm**, đầu trên và đầu dưới bo tròn, một vệt mép trong cam mơ nhạt lộ ở cạnh phải. Đặt đứng thẳng, to hết khung.
- KHÔNG lấy: thớt, mặt bàn, các miếng vỏ khác.

### 6. `l9_pumpkin_dice` → art/out/_sheets/l9src_l9_pumpkin_dice.png (1024x1024, nền trong suốt)
- Trong demo: không có trong demo; màu và nét theo ruột quả bí (vùng chơi x 425–645, y 935–1135).
- Ảnh cắt đính kèm: art/ref/l9_cut/l9_pumpkin.png
- **Một hạt lựu bí** khối vuông bo góc mập, nhìn dốc như demo: **mặt trên** cam mơ nhạt (màu ruột bí), **mặt trước** dải ngắn mơ đậm hơn một chút, viền nâu ấm, vài nét chì. Vẽ to hết khung.
- KHÔNG lấy: mọi thứ khác.

### 7. `l9_knife` → art/out/_sheets/l9src_l9_knife.png (1536x1024, nền trong suốt)
- Trong demo: dao bên phải thớt, vùng chơi x 520–885, y 990–1050.
- Ảnh cắt đính kèm: art/ref/l9_cut/l9_knife.png
- Dao bếp **nằm ngang**: **lưỡi bên trái** trắng ấm bản rộng vừa, **sống dao ở trên, mép lưỡi PHẲNG thẳng ở dưới**, mũi bo nhọn nhẹ ở trái, một vệt sáng dọc mép lưỡi, đổ bóng lavender nhạt; **cán caramel bên phải** bo tròn có 2 đinh tán kem. **SỬA so với demo: lưỡi DÀI hơn** — lưỡi chiếm khoảng **2/3 chiều dài dao** (lưỡi ≈ 250 trên dao 380), cán 1/3. Nằm ngang hết khung.
- KHÔNG lấy: quả bí, thớt, mặt bàn.

## MÀU từng món (chủ dự án dặn: nhớ chi tiết màu và style; khóa theo L1, O6)
Nhạt như `art/ref/owner_l1_style_ref.png` và `art/out/demo/l1_demo_start.png`. Mảng lớn (tường, mặt bàn, bếp, sàn) nhạt nhất, mềm nhất. Mọi mảng thấy vân chì và chút giấy kem, không tô phẳng, không gradient số. Bão hoà mục tiêu trung bình **0,20–0,24**, p90 **≤ 0,44**. Nghi ngờ thì nhạt hơn.
- Tường: gạch men vuông kem #FCF1DD (cạnh ≈ 80 px), ron nâu viền rất nhạt, mảnh.
- **MẶT BÀN (lần trước bị ĐẬM, bão hoà 0,35, phải sửa):** mặt bàn là mảng lớn nhất tranh (≈ 70% ảnh) nên phải **NHẠT HƠN ô mật ong**: gỗ **kem mật ong rất nhạt ≈ #F6E2C6** (gần giấy kem, chỉ ấm hơn tường một chút), vài nét chì thớ dọc thưa màu mật ong nhạt chụm nhẹ về sau; mép sau chỉ hơi đậm hơn chút. **Không** tô mặt bàn bằng #F2C796 đặc, không cam, không nâu vàng đậm.
- **Mép bàn và chân tủ:** caramel **rất nhạt ≈ #E8CBA6** (nhạt hơn ô #D6A472), vệt sáng kem ở cạnh trên mép bàn; cửa tủ chỉ là viền ô vuông caramel nhạt trên nền đó.
- Thớt vẫn phải tách khỏi bàn: thớt gỗ mật ong sáng **có cạnh dày caramel rõ** và viền nâu, mặt thớt hơi vàng bơ hơn mặt bàn.
- Bếp ga: thân TRẮNG ẤM #FFFAF0, đổ bóng lavender #D8CCF0 nhạt; họng đốt và kiềng nâu viền nhạt; núm caramel vạch vàng bơ. KHÔNG xám kim loại, KHÔNG đen.
- Lửa: ngọn nhỏ hình giọt xanh da trời #B8DAF2 nhạt, lõi vàng bơ.
- Nồi: men BẠC HÀ #B9DDBE nhạt, miệng viền trắng ấm, quai tai caramel. KHÔNG inox xám.
- Súp, bí đỏ: CAM MƠ NHẠT ≈ #F9D2A6 (hồng đào #F7B9A3 pha vàng bơ #FCE39A). TUYỆT ĐỐI không cam tươi, không cam đậm. Súp lợn cợn có hạt hồng đào (gà) và vàng bơ (bí). Súp mịn là một mảng mơ đều có vân chì. Vỏ bí hồng đào đậm hơn ruột một chút; cuống xanh lá #9DC283.
- Gà: hồng phấn #F8C6CC pha trắng ấm, thớ thịt vài nét chì; mặt cắt nhạt hơn.
- Thớt: gỗ mật ong SÁNG hơn mặt bàn (gần kem) để tách khỏi bàn; cạnh dày caramel. Dao: lưỡi trắng ấm, bóng lavender, cán caramel. Dao gọt: cán bạc hà.
- Đĩa trắng ấm viền xanh da trời rất nhạt. Chậu: thành sky blue nhạt, nước sky blue rất nhạt.
- Máy xay: cối thủy tinh xanh da trời rất nhạt gần trong (thấy súp bên trong), đế trắng ấm, nút tròn hồng đào.
- Rây: vành và cán caramel, lưới nâu viền mảnh, thưa, vẽ to, ít ô.
- Tô, bát: trắng ấm, viền miệng hồng đào, vạch hình chân mèo hồng phấn nhạt trong lòng.
- Muôi: lòng trắng ấm, cán caramel.
- Hơi nóng, khói hình cá: trắng ấm, mảnh, nhạt.
- Chân Mun: đen than ấm #3E3838 có vân chì, nệm hồng đào. Chân Sữa: trắng ấm lông xù mép, nệm hồng phấn.


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


## Khối ngoại lệ góc nhìn Level 9 (chủ dự án chốt G9-2), dán nguyên, áp cho cảnh bếp

```
LEVEL 9 KITCHEN EXCEPTION (owner decision G9-2, only for the kitchen counter scenes of Level 9):
same straight-on front view as the Level 1 sofa, no diagonal rotation, horizontal edges stay horizontal and vertical edges stay vertical,
but the eye is much higher, looking down steeply (about 50-60 degrees), like standing at the counter and looking down at your work.
Top faces are large and clear: pot interior, bowl and basin interiors, cutting board top, stove top with its burners, blender jar opening, sieve mesh.
Round openings are flat ellipses about half as tall as they are wide.
Only a short band of each front face shows: pot wall, blender base with its button, stove front with its knobs, board thickness, counter edge.
The wooden counter top is a plane receding away from the viewer: its back edge is slightly narrower and slightly darker.
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
