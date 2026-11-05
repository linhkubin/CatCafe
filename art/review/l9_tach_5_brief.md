TÁCH TỪ DEMO — lượt `l9_tach_5` (Level 9 "Súp thưởng", G5-23), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ; ngoại lệ "TÁCH TỪ DEMO": mỗi món một lần gọi image_gen, mỗi món một ảnh riêng). Model gpt-6.1-sol, mức medium. Chủ dự án đã duyệt demo; dặn: **mô tả chi tiết, nhớ chi tiết màu sắc và style**.

**Ảnh demo gốc của lượt này: art/out/demo/l9_demo_end.png** (khung điện thoại 1080x1920). Cùng cảnh không giao diện, đúng vùng chơi 1024x1536: art/out/demo/l9_demo_end_play.png. Toạ độ "vùng chơi" dưới đây tính trên ảnh art/out/demo/l9_demo_end_play.png.
**Cảnh kết dùng GÓC CHUNG của game** (khối CAMERA, như sofa L1), không dùng góc dốc của bếp. Mèo đúng thiết kế: Mun theo art/out/cats/mun_ref.png, Sữa theo art/out/cats/sua_ref.png. **Các dáng cùng con mèo phải cùng cỡ, cùng màu, cùng chất lông** (giữ đúng như dáng ăn trong demo). Sửa nhẹ theo Codex tự kiểm demo: Mun **không mập** (thân thon chân dài như mun_ref), **tai hơi cụp** như mun_ref.

## Luật chung cho mọi món
- **Vẽ lại đúng món trong demo: cùng hình dáng, tỉ lệ, màu, chi tiết, nét, chất chì.** Không tự thiết kế lại, không thêm bớt chi tiết (trừ chỗ ghi **SỬA** hoặc món **không có trong demo**, khi đó vẽ cùng thiết kế, cùng màu, cùng nét với các món demo). Màu **không đậm hơn, không nhạt hơn** demo. Cùng góc nhìn như demo (góc chung).
- Mỗi món: gọi image_gen **một lần**, đính kèm: ảnh demo gốc + ảnh cắt của món (ghi ở từng món) + art/ref/owner_l1_style_ref.png + art/out/cats/mun_ref.png (món Mun) hoặc art/out/cats/sua_ref.png (món Sữa). Tối đa 5 ảnh đính kèm mỗi lần gọi. **Nền TRONG SUỐT thật** (giữ kênh alpha).
- **Lấp gần kín khung (G5-34):** khung ghi cạnh tên món (chọn theo dáng món); món to hết cỡ, lề trong suốt quanh món chỉ ~40px, không bị cắt.
- **Chỉ đúng một món.** Không lấy mặt bàn, tường, sàn, đồ chồng lên, đồ phía sau, hơi nước, bóng, quầng. Chỗ bị che: vẽ bù đúng thiết kế.
- Không chữ, không số, không khung, không bóng đổ dưới món, không viền trắng quanh món.
- Lưu từng món vào **art/out/_sheets/l9src_<key>.png** (đúng tên dưới; file mới, không ghi đè). Chép nguyên ảnh, không cắt, không xử lý.
- Món ghi "CHỈNH SỬA TỪ ẢNH" thì gọi image_gen ở chế độ chỉnh sửa ảnh đó (giữ nguyên cỡ ảnh, vị trí, góc nhìn, màu, nét; chỉ đổi phần ghi).
- Trước mỗi lần gọi image_gen viết **"Nhắc lại quy tắc"** (phong cách, góc nhìn, màu, nét, phần lấy / không lấy của món). Tin nhắn cuối có **"Tự kiểm" từng món** (giống demo về hình, tỉ lệ, màu, chi tiết; đã bỏ phần không lấy; lấp kín khung; nền trong suốt; không chữ: đạt / không đạt + lý do), `SAVED:` từng file, prompt cuối từng món.

## Danh sách món

### 1. `mun_soup_eat` → art/out/_sheets/l9src_mun_soup_eat.png (1536x1024, nền trong suốt)
- Trong demo: Mun bên trái đang cúi ăn, vùng chơi x 30–320, y 960–1185.
- Ảnh cắt đính kèm: art/ref/l9_cut/mun_soup_eat.png
- Mun **đứng nhìn nghiêng sang phải**, **cúi đầu xuống ăn** (mõm thấp ngang miệng bát), **mắt híp cong hạnh phúc**, má hồng, lưỡi hồng nhỏ, **đuôi dài cong lên** thả lỏng; đen than ấm #3E3838 có vân chì xám nâu, **đầu và mặt tròn**, tai hơi cụp, thân thon chân dài. Đúng dáng demo, chỉnh thân thon hơn chút. Đứng trên một đường đáy ngang (4 chân chạm đáy). To hết khung.
- KHÔNG lấy: bát súp, trái tim, khói cá, sàn, tủ.

### 2. `mun_soup_walk` → art/out/_sheets/l9src_mun_soup_walk.png (1536x1024, nền trong suốt)
- Trong demo: không có trong demo; dáng đi theo mun_ref.png, cùng cỡ và chất lông với món 1.
- Ảnh cắt đính kèm: art/ref/l9_cut/mun_soup_eat.png + art/out/cats/mun_ref.png
- Mun **đi nhìn nghiêng sang phải**, **đầu ngẩng nhìn thẳng phía trước** (thấy rõ mặt, mắt tròn to vàng mật ong), một chân trước và một chân sau bước tới, **đuôi dài cong lên**; cùng cỡ thân, màu, chất lông với món 1. Đáy 4 chân trên một đường ngang. To hết khung.
- KHÔNG lấy: mọi thứ khác.

### 3. `mun_soup_surprise` → art/out/_sheets/l9src_mun_soup_surprise.png (1536x1024, nền trong suốt)
- Trong demo: không có trong demo; cùng cỡ với món 1–2.
- Ảnh cắt đính kèm: ảnh vừa vẽ art/out/_sheets/l9src_mun_soup_walk.png + art/out/cats/mun_ref.png
- Mun **đứng khựng nhìn sang phải** (về phía Sữa), **ngạc nhiên**: **mắt tròn xoe rất to**, **tai dựng thẳng**, **đuôi phồng nhẹ** dựng lên, miệng chữ o nhỏ; 4 chân đứng yên trên đường đáy. Cùng cỡ, màu, chất lông. To hết khung.
- KHÔNG lấy: mọi thứ khác.

### 4. `sua_soup_eat` → art/out/_sheets/l9src_sua_soup_eat.png (1536x1024, nền trong suốt)
- Trong demo: Sữa bên phải đang cúi ăn, vùng chơi x 690–1000, y 940–1180.
- Ảnh cắt đính kèm: art/ref/l9_cut/sua_soup_eat.png
- Sữa **đứng nhìn nghiêng sang trái**, **cúi đầu ăn**, **mắt híp cong**, má hồng, lưỡi hồng nhỏ; trắng ấm **lông bông xù**, đầu to tròn, tai nhọn trong hồng đào, **đuôi bông to** cong lên. Đúng demo. Đáy 4 chân trên một đường ngang. To hết khung.
- KHÔNG lấy: bát súp, trái tim, khói cá, sàn, tủ.

### 5. `sua_soup_walk` → art/out/_sheets/l9src_sua_soup_walk.png (1536x1024, nền trong suốt)
- Trong demo: không có trong demo; dáng đi theo sua_ref.png, cùng cỡ và chất lông với món 4.
- Ảnh cắt đính kèm: art/ref/l9_cut/sua_soup_eat.png + art/out/cats/sua_ref.png
- Sữa **đi nhìn nghiêng sang trái**, **đầu ngẩng nhìn phía trước** (thấy rõ mặt, mắt tròn to xanh da trời), bước chân, đuôi bông to cong lên. Cùng cỡ, màu, chất lông với món 4. To hết khung.
- KHÔNG lấy: mọi thứ khác.

### 6. `sua_soup_surprise` → art/out/_sheets/l9src_sua_soup_surprise.png (1536x1024, nền trong suốt)
- Trong demo: không có trong demo; cùng cỡ với món 4–5.
- Ảnh cắt đính kèm: ảnh vừa vẽ art/out/_sheets/l9src_sua_soup_walk.png + art/out/cats/sua_ref.png
- Sữa **đứng khựng nhìn sang trái** (về phía Mun), **ngạc nhiên**: **mắt tròn xoe rất to**, **tai dựng**, **đuôi bông phồng to hơn**, miệng chữ o nhỏ. Cùng cỡ, màu, chất lông. To hết khung.
- KHÔNG lấy: mọi thứ khác.

### 7. `l9_end_bowl` → art/out/_sheets/l9src_l9_end_bowl.png (1536x1024, nền trong suốt)
- Trong demo: bát bên trái trên sàn, vùng chơi x 205–395, y 1100–1205.
- Ảnh cắt đính kèm: art/ref/l9_cut/l9_end_bowl.png
- Bát súp trên sàn đúng demo (góc chung, miệng elip dẹt): trắng ấm, **viền miệng hồng đào**, **đầy súp cam mơ nhạt** có vài hạt hồng đào và vàng bơ, dấu chân mèo hồng phấn nhỏ ở mặt trước bát. **Vẽ bù** phần mõm mèo che (mặt súp liền).
- KHÔNG lấy: mõm mèo, lưỡi, khói cá, sàn.

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
