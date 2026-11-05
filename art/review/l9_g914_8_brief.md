SỬA THEO GÓP Ý CHỦ DỰ ÁN G9-14 — lượt `l9_g914_8` (Level 9 "Súp thưởng"), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ; mỗi món một lần gọi image_gen, mỗi món một ảnh riêng). Model gpt-6.1-sol, mức medium.

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

### 1. `l9_pumpkin_whole` → art/out/_sheets/l9src_l9_pumpkin_whole.png (1024x1024, nền trong suốt)
- Ảnh đính kèm riêng: art/out/_sheets/l9src_l9_pumpkin.png (bản cũ bị chê) + art/ref/l9_cut/l9_pumpkin.png (bí trong demo)
- **Quả bí đỏ NGUYÊN, còn vỏ**, nhìn dốc như demo: dáng **tròn mập hơi dẹt**, **8 múi** rõ, **đối xứng quanh tâm**, các rãnh múi là **đường cong mềm** chạy từ đỉnh xuống đáy (đỉnh có chỗ lõm nhỏ ở giữa, chỗ cuống), đường bao ngoài gợn tròn theo múi.
- **Vỏ màu hồng đào #F7B9A3** (pha chút vàng bơ, nhạt, KHÔNG cam), vân chì rõ, vệt sáng kem trên-trái mỗi múi, vài nét chì đổ bóng phải-dưới, viền nâu ấm đậm nhạt.
- **Không cuống** (cuống là món riêng), không vết cắt. To hết khung, lề ~40px.

### 2. `l9_pumpkin_peeled` → art/out/_sheets/l9src_l9_pumpkin_peeled.png (1024x1024, nền trong suốt)
- Ảnh đính kèm riêng: art/out/_sheets/l9src_l9_pumpkin_whole.png (ảnh vừa vẽ, ẢNH CẦN SỬA)
- **CHỈNH SỬA TỪ ẢNH art/out/_sheets/l9src_l9_pumpkin_whole.png** (**giữ nguyên cỡ ảnh, vị trí, đường bao ngoài từng điểm ảnh**, cùng múi, cùng viền): đổi vỏ thành **ruột bí đã gọt**: **cam mơ nhạt ≈ #F9D2A6** (nhạt hơn vỏ, ánh vàng bơ), mặt hơi ẩm mịn có vân chì, rãnh múi mờ hơn, vài vệt gọt nhạt chạy dọc. Không cuống, không vết cắt.

### 3. `l9_hint_arrow_straight` → art/out/_sheets/l9src_l9_hint_arrow_straight.png (1536x1024, nền trong suốt)
- Ảnh đính kèm riêng: (không cần ảnh riêng)
- **Mũi tên gợi ý vẽ tay** dễ thương, **thẳng nằm ngang chỉ sang PHẢI**: thân mũi tên **mập bo tròn**, hơi lượn nhẹ như vẽ tay, **đầu mũi tên tam giác to bo góc tròn**, đuôi bo tròn. Màu **vàng bơ #FCE39A** có vân chì, viền **nâu ấm** đậm nhạt dày vừa, một vệt sáng kem dọc thân. Không bóng, không chữ. Dài hết khung ngang.

### 4. `l9_hint_arrow_curve` → art/out/_sheets/l9src_l9_hint_arrow_curve.png (1536x1024, nền trong suốt)
- Ảnh đính kèm riêng: art/out/_sheets/l9src_l9_hint_arrow_straight.png (ảnh vừa vẽ, cùng nét, màu, độ dày)
- Mũi tên **cong** (gợi ý nghiêng / đổ): thân cong một cung **khoảng 90°**, đi từ **trên-trái** cong xuống **dưới-phải**, đầu mũi tên ở cuối cung chỉ xuống-phải. Cùng nét, màu, độ dày, kiểu đầu mũi tên với món 3. To hết khung.

### 5. `l9_hint_arrow_circle` → art/out/_sheets/l9src_l9_hint_arrow_circle.png (1024x1024, nền trong suốt)
- Ảnh đính kèm riêng: art/out/_sheets/l9src_l9_hint_arrow_straight.png
- Mũi tên **vòng tròn** (gợi ý xoay, khuấy): thân đi **gần hết một vòng tròn (khoảng 300°) theo chiều kim đồng hồ**, hở một khúc ở trên, đầu mũi tên ở cuối vòng. Vòng tròn đều (không elip). Cùng nét, màu, độ dày, kiểu đầu mũi tên với món 3. To hết khung.

### 6. `l9_hint_tap` → art/out/_sheets/l9src_l9_hint_tap.png (1024x1024, nền trong suốt)
- Ảnh đính kèm riêng: art/out/_sheets/l9src_l9_hint_arrow_straight.png
- Dấu **chạm** (vòng nhấp): **một chấm tròn mập vàng bơ** ở giữa và **2 vòng tròn đồng tâm** mảnh hơn bên ngoài (vòng ngoài nhạt hơn, nét đứt nhẹ như vẽ tay), cùng màu vàng bơ viền nâu ấm, vân chì. Tròn đều. To hết khung.

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
