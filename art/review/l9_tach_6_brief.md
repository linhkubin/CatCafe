TÁCH TỪ DEMO — lượt `l9_tach_6` (Level 9 "Súp thưởng", G5-23), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ; ngoại lệ "TÁCH TỪ DEMO": mỗi món một lần gọi image_gen, mỗi món một ảnh riêng). Model gpt-6.1-sol, mức medium. Chủ dự án đã duyệt demo; dặn: **mô tả chi tiết, nhớ chi tiết màu sắc và style**.

**Ảnh demo gốc của lượt này: art/out/demo/l9_demo_prep.png** (khung điện thoại 1080x1920). Cùng cảnh không giao diện, đúng vùng chơi 1024x1536: art/out/demo/l9_demo_prep_play2.png. Toạ độ "vùng chơi" dưới đây tính trên ảnh art/out/demo/l9_demo_prep_play2.png.
**Lượt này có 2 NỀN (có nền, không trong suốt) và 3 món nhỏ.** Món 1 dùng demo sơ chế; món 2 dùng demo cảnh kết art/out/demo/l9_demo_end_play.png; món 3–5 theo ghi chú.

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

### 1. `l9_bg_kitchen_clean` → art/out/_sheets/l9src_l9_bg_kitchen_clean.png (1024x1536 dọc, **CÓ NỀN**)
- **CHỈNH SỬA TỪ ẢNH art/out/demo/l9_demo_prep_play2.png** (giữ nguyên cỡ ảnh, vị trí, màu, nét của tường, mặt bàn, mép bàn, chân tủ): **xoá hết đồ**: bếp ga, thớt, gà, bí, dao, vỏ bí. Vẽ bù chỗ trống bằng **mặt bàn gỗ kem mật ong rất nhạt** liền mạch (cùng thớ chì dọc chụm nhẹ về sau, cùng màu, không vệt mờ) và tường gạch phía sau bếp (đường len tường y ≈ 260 liền một đường).
- Còn lại: tường gạch men kem, len tường, mặt bàn, mép bàn dày, dải chân tủ ô vuông. Không đồ gì khác, không chữ.
- Ảnh đính kèm: art/out/demo/l9_demo_prep_play2.png (ảnh cần sửa) + art/out/demo/l9_demo_prep.png + art/ref/owner_l1_style_ref.png.

### 2. `l9_bg_end_clean` → art/out/_sheets/l9src_l9_bg_end_clean.png (1024x1536 dọc, **CÓ NỀN**)
- **CHỈNH SỬA TỪ ẢNH art/out/demo/l9_demo_end_play.png** (giữ nguyên cỡ ảnh, vị trí, màu, nét của tường, tủ thấp, sàn): **xoá Mun, Sữa, 2 bát súp, trái tim, khói cá**. Vẽ bù tủ thấp (cửa ô vuông, núm tròn) và sàn gỗ ván ngang liền mạch đúng chỗ.
- Còn lại: tường gạch kem, tủ thấp caramel nhạt, sàn gỗ mật ong. Không đồ, không chữ.
- Ảnh đính kèm: art/out/demo/l9_demo_end_play.png (ảnh cần sửa) + art/out/demo/l9_demo_end.png + art/ref/owner_l1_style_ref.png.

### 3. `l9_tray_bow` → art/out/_sheets/l9src_l9_tray_bow.png (1536x1024, nền trong suốt)
- Trong demo: không có trong demo; màu theo khay hộp art/out/_sheets/l9src_l9_tray.png.
- Ảnh cắt đính kèm: art/out/_sheets/l9src_l9_tray_lid.png
- **Nơ ruy băng vàng bơ #FCE39A** to mập: 2 quai nơ tròn phồng hai bên, nút nơ tròn ở giữa, 2 đuôi ruy băng ngắn rủ xuống chéo, nếp gấp nét chì, viền nâu ấm, nhìn thẳng hơi từ trên. Rộng gấp khoảng 1,7 lần cao. To hết khung.
- KHÔNG lấy: nắp, hộp.

### 4. `l9_tray_ribbon_on_lid` → art/out/_sheets/l9src_l9_tray_ribbon_on_lid.png (1536x1024, nền trong suốt)
- Trong demo: không có trong demo.
- Ảnh cắt đính kèm: art/out/_sheets/l9src_l9_tray_lid.png
- **CHỈNH SỬA TỪ ẢNH art/out/_sheets/l9src_l9_tray_lid.png** (giữ nguyên cỡ ảnh, dáng nắp, vị trí, màu, nét): vẽ thêm **ruy băng vàng bơ #FCE39A** bản rộng vừa: **một dải dọc ở giữa** và **một dải ngang ở giữa** chạy qua mặt nắp và vòng qua mép trước nắp (theo phối cảnh nhìn dốc), cắt nhau ở tâm nắp, vân chì, viền nâu mảnh. **Không vẽ nơ.** Mọi chỗ khác của nắp giữ nguyên từng điểm ảnh.
- KHÔNG lấy: nơ, hộp.

### 5. `l9_icon_soup` → art/out/_sheets/l9src_l9_icon_soup.png (1536x1024, nền trong suốt)
- Trong demo: bát súp và khói cá ở cảnh kết art/out/demo/l9_demo_end_play.png, vùng chơi x 205–395, y 1000–1205.
- Ảnh cắt đính kèm: art/ref/l9_cut/l9_end_bowl.png
- Icon bong bóng nhiệm vụ: **1 bát súp đã hoàn thiện** (góc chung) trắng ấm viền miệng hồng đào, đầy súp cam mơ nhạt có hạt hồng đào và vàng bơ, **bốc khói thơm**: 2 làn hơi trắng ấm mảnh cong, một làn uốn thành **hình con cá** nhỏ trắng ấm viền nâu mảnh. Bát ở nửa dưới khung, khói ở nửa trên. To hết khung, rõ ở cỡ nhỏ.
- KHÔNG lấy: mèo, sàn, trái tim.

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
