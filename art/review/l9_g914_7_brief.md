SỬA THEO GÓP Ý CHỦ DỰ ÁN G9-14 — lượt `l9_g914_7` (Level 9 "Súp thưởng"), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ; mỗi món một lần gọi image_gen, mỗi món một ảnh riêng). Model gpt-6.1-sol, mức medium.

Chủ dự án chơi bản ghép ảnh thật và nói **"nét vẽ đang hơi xấu"**. Các món dưới đây phải **dễ thương hơn, đúng style bút chì màu L1**: dáng tròn mập, góc bo mềm, viền **nâu ấm đậm nhạt như bút chì thật** (đậm ở chỗ khuất, mảnh và nhọn dần ở đầu nét), mọi mảng có **vân chì và chút giấy kem**, **không mảng tô phẳng**, không gradient số, không bóng loáng.

**Ảnh demo gốc đã duyệt:** art/out/demo/l9_demo_prep.png (vùng chơi: art/out/demo/l9_demo_prep_play2.png). Ảnh trong game hiện tại (bản bị chê, để biết lỗi): art/review/l9_tach_ingame_vs_demo.jpg.

## Luật chung
- Mỗi món: gọi image_gen **một lần**, đính kèm tối đa 5 ảnh: ảnh demo gốc + ảnh ghi ở từng món + art/ref/owner_l1_style_ref.png + art/ref/l1_depth_angle_ref.png.
- **Nền TRONG SUỐT thật** (giữ alpha). Lấp gần kín khung, lề ~40px (trừ món "CHỈNH SỬA TỪ ẢNH": giữ nguyên cỡ ảnh và vị trí).
- Không chữ, không số, không bóng đổ dưới món, không quầng, không viền trắng.
- Lưu **art/out/_sheets/l9src_<key>.png** (file mới, không ghi đè). Chép nguyên ảnh, không xử lý.
- Món ghi **"CHỈNH SỬA TỪ ẢNH"**: gọi image_gen chế độ chỉnh sửa ảnh đó, **giữ nguyên cỡ ảnh, vị trí, dáng, góc nhìn, màu, nét từng điểm ảnh ở phần không đổi**, chỉ thêm / đổi phần ghi.
- Trước mỗi lần gọi viết **"Nhắc lại quy tắc"**. Tin nhắn cuối có **"Tự kiểm" từng món** (dễ thương đúng style L1, nét chì đậm nhạt, không mảng phẳng, màu trong bảng, góc nhìn, nền trong suốt, không chữ: đạt / không đạt + lý do), `SAVED:` từng file, prompt cuối từng món.

## Danh sách món

### 1. `l9_stove_v2` → art/out/_sheets/l9src_l9_stove_v2.png (1536x1024, nền trong suốt)
- Ảnh đính kèm riêng: art/out/_sheets/l9src_l9_stove.png (bản cũ bị chê: viền cứng, mặt trước tím phẳng)
- **VẼ MỚI** bếp ga 2 họng, **cùng góc nhìn dốc 3/4, cùng tỉ lệ khối** như bản cũ (rộng ≈ 1,4 lần cao; mặt trên chiếm ≈ 60% chiều cao, mặt trước ≈ 40%).
- **Dễ thương hơn:** khối bếp **tròn mập**, mọi góc **bo tròn to**, mép mặt trên phồng nhẹ như gối, viền nâu ấm **đậm nhạt như bút chì** (không đường đều cứng).
- **Màu:** thân **trắng ấm #FFFAF0** có vân chì kem. **Mặt trước KHÔNG tô mảng tím**: vẫn trắng ấm, chỉ đổ bóng **lavender #D8CCF0 bằng vài nét chì** ở nửa dưới và cạnh phải.
- **Mặt trên:** 2 họng đốt (họng nhỏ trái, họng lớn phải) là **elip dẹt mềm**, vòng nâu viền nhạt, **kiềng 4–6 chấu bo tròn đầu** mập, tâm họng nâu nhạt.
- **Mặt trước:** **núm nhỏ bên trái** tròn mập caramel, vạch vàng bơ hướng lên (vẽ liền). Chỗ **núm lớn bên phải** là **một đế tròn trống trắng ấm viền nâu nhạt** (núm lớn là món riêng, sẽ đặt lên đế này).
- Không lửa, không nồi, không chữ.

### 2. `l9_knob_v2` → art/out/_sheets/l9src_l9_knob_v2.png (1024x1024, nền trong suốt)
- Ảnh đính kèm riêng: art/out/_sheets/l9src_l9_knob.png (bản cũ)
- **Núm bếp lớn** tròn mập dễ thương: hình tròn đều (để code xoay), **caramel #D6A472 nhạt** có vân chì, viền nâu ấm đậm nhạt, một vệt sáng kem nhỏ ở trên-trái, vài nét chì đổ bóng ở phải-dưới, **vạch chỉ vàng bơ bo tròn hai đầu** từ tâm chĩa **thẳng LÊN**. Cỡ hợp với đế tròn trên bếp món 1. To hết khung.

### 3. `l9_flame_a` → art/out/_sheets/l9src_l9_flame_a.png (1536x1024, nền trong suốt)
- Ảnh đính kèm riêng: art/out/demo/l9_demo_cook_play2.png (lửa trong demo, vùng chơi x 320–700, y 620–740)
- **Vòng lửa ga dễ thương** nhìn dốc như demo: khoảng **10 lưỡi lửa nhỏ tròn mập hình giọt** xếp theo **một vòng elip dẹt** (rộng ≈ 3,8 lần cao), lưỡi phía trước to hơn, phía sau nhỏ hơn. Mỗi lưỡi: **xanh da trời #B8DAF2 nhạt** có vân chì, **lõi vàng bơ #FCE39A** nhỏ ở chân, đầu lưỡi bo tròn mềm (không nhọn sắc), viền nâu ấm rất mảnh, hơi lượn. Giữa vòng TRỐNG. To hết khung.

### 4. `l9_flame_b` → art/out/_sheets/l9src_l9_flame_b.png (1536x1024, nền trong suốt)
- Ảnh đính kèm riêng: art/out/_sheets/l9src_l9_flame_a.png (ảnh vừa vẽ)
- **CHỈNH SỬA TỪ ẢNH art/out/_sheets/l9src_l9_flame_a.png** (giữ nguyên cỡ ảnh, vòng elip, vị trí từng lưỡi): khung thứ hai để lắc: mỗi lưỡi lửa **nghiêng lệch nhẹ** sang trái hoặc phải luân phiên và cao thấp khác đi một chút (±15%), cùng màu, cùng nét.

### 5. `l9_basin_full` → art/out/_sheets/l9src_l9_basin_full.png (1536x1024, nền trong suốt)
- Ảnh đính kèm riêng: art/out/_sheets/l9src_l9_basin.png (ẢNH CẦN SỬA)
- **CHỈNH SỬA TỪ ẢNH art/out/_sheets/l9src_l9_basin.png** (giữ nguyên cỡ ảnh, dáng chậu, vị trí, màu thành chậu): đổ **nước phẳng** vào lòng chậu tới khoảng 2/3: mặt nước là elip dẹt nằm trong miệng chậu, **xanh da trời RÕ hơn** (≈ #B8DAF2, đúng ô màu, không đậm hơn), có **vân chì ngang** mềm, 2–3 **vệt sáng trắng ấm** cong nằm ngang, mép nước giáp thành chậu có một đường xanh đậm hơn chút. Nước trong hơi thấy đáy chậu.

### 6. `l9_basin_ripple` → art/out/_sheets/l9src_l9_basin_ripple.png (1536x1024, nền trong suốt)
- Ảnh đính kèm riêng: art/out/_sheets/l9src_l9_basin_full.png (ảnh vừa vẽ, ẢNH CẦN SỬA)
- **CHỈNH SỬA TỪ ẢNH art/out/_sheets/l9src_l9_basin_full.png** (giữ nguyên mọi thứ khác): mặt nước **gợn**: 3–4 **vòng gợn elip** đồng tâm nét chì trắng ấm và xanh nhạt hơn, vài **bọt trắng ấm** tròn nhỏ (5–8 cụm) nổi ở mép, cùng màu xanh nước.

### 7. `l9_blender_closed` → art/out/_sheets/l9src_l9_blender_closed.png (1024x1536, nền trong suốt)
- Ảnh đính kèm riêng: art/out/_sheets/l9src_l9_blender.png (ẢNH CẦN SỬA)
- **CHỈNH SỬA TỪ ẢNH art/out/_sheets/l9src_l9_blender.png** (giữ nguyên cỡ ảnh, cối, đế, vị trí từng điểm ảnh): thêm **nắp cối** đậy khít **miệng elip** của cối: nắp tròn dẹt **trắng ấm** viền nâu ấm, thấy mặt trên elip của nắp và một dải mép nắp ngắn ôm ngoài miệng cối, **núm cầm tròn nhỏ hồng đào** ở giữa mặt nắp, vân chì, vài nét lavender đổ bóng. Không đổi gì khác.

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
