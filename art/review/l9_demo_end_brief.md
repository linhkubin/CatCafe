VẼ DEMO `l9_demo_end` — Level 9 "Súp thưởng", cảnh kết (Mun và Sữa lần đầu gặp nhau, cùng ăn súp), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ). Ảnh demo, lưu vào art/out/demo/. Model gpt-6.1-sol, mức medium.

## Cảnh (ảnh 1024x1536 = đúng vùng màn chơi, tỉ lệ 1:1)
Ảnh này là **vùng chơi của màn**, mọi món ở đúng cỡ trong game. Phần dư màn hình (trên, dưới, hai bên) Art nối sau, nên **mép trái và mép phải ảnh chỉ là tường, mặt bàn hoặc sàn trống**, không món nào chạm mép ảnh. Toạ độ là px trên ảnh 1024x1536. Ảnh vị trí khối `art/ref/l9_demo/khoi_end.png` cho đúng chỗ và cỡ từng món (khối màu phẳng, có thể còn chữ nhãn, chỉ để chỉ chỗ: **đừng chép dáng khối, đừng chép chữ, đừng chép màu khối**; màu theo mục MÀU).

**Sàn bếp, GÓC CHUNG của game** (khối CAMERA 2b, như sofa L1: nhìn ngang hơi trực diện, mắt cao hơn đồ một chút). **Không dùng góc dốc của bếp.**
- **Tường gạch men kem** #FCF1DD từ mép trên ảnh xuống **chân tường y ≈ 1000**. Sát tường là **tủ bếp thấp** caramel nhạt (y ≈ 880–1000), cửa ô vuông to, núm tròn nhỏ.
- **Sàn gỗ mật ong** như sàn L1 từ y 1000 xuống đáy ảnh: ván ngang nằm ngang, ván xa hẹp, ván gần rộng dần.
- **2 bát súp** trắng ấm viền miệng hồng đào trên sàn, **cách xa nhau**: bát trái đáy (290, 1150), bát phải đáy (734, 1150), mỗi bát rộng ≈ 200, miệng elip dẹt (góc chung), đầy **súp cam mơ nhạt** có vài hạt hồng đào. Trên mỗi bát 1 làn **khói thơm trắng ấm hình con cá** nhỏ.
- **Mun** (đúng mun_ref.png: đen than ấm #3E3838 có vân chì, **đầu và mặt tròn**, mắt vàng mật ong, tai hơi cụp, thân thon chân dài, đuôi dài mảnh) đứng **nhìn nghiêng sang phải** bên trái bát trái, đáy chân ≈ y 1125, khung ≈ 320x250 quanh x 165, **cúi đầu vào bát trái ăn**, mắt híp cong hạnh phúc, đuôi cong lên thả lỏng. Thấy rõ đầu, tai, mặt.
- **Sữa** (đúng sua_ref.png: trắng ấm lông bông xù, đầu to tròn, mắt xanh da trời, má hồng, tai nhọn trong hồng đào, đuôi bông to) đứng **nhìn nghiêng sang trái** bên phải bát phải, đáy ≈ y 1125, khung ≈ 320x250 quanh x 859, **cúi đầu vào bát phải ăn**, mắt híp, má hồng. Thấy rõ đầu, tai, mặt.
- 2–3 **trái tim nhỏ hồng phấn** bay trên đầu mỗi con.
- Hai mèo cùng cỡ như nhau, không thu nhỏ để vừa khung, không chạm mép ảnh.

## MÀU từng món (chủ dự án dặn: nhớ chi tiết màu và style; khóa theo L1, O6)
Nhạt như `art/ref/owner_l1_style_ref.png` và `art/out/demo/l1_demo_start.png`. Mảng lớn (tường, mặt bàn, bếp, sàn) nhạt nhất, mềm nhất. Mọi mảng thấy vân chì và chút giấy kem, không tô phẳng, không gradient số. Bão hoà mục tiêu trung bình **0,20–0,24**, p90 **≤ 0,44**. Nghi ngờ thì nhạt hơn.
- Tường: gạch men vuông kem #FCF1DD (cạnh ≈ 80 px), ron nâu viền rất nhạt, mảnh.
- Mặt bàn: gỗ mật ong #F2C796 nhạt, vài nét chì thớ dọc thưa chụm nhẹ về sau; mép sau hơi đậm hơn chút. Mép bàn và chân tủ: caramel #D6A472 nhạt, vệt sáng kem ở cạnh trên mép bàn.
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

## Ảnh tham chiếu (mở hết bằng view_image, đính kèm cho image_gen)
1. art/ref/owner_l1_style_ref.png — chuẩn màu và chất chì (số 1).
2. art/ref/l1_depth_angle_ref.png — mẫu góc (sofa L1), cảnh kết dùng đúng góc này.
3. art/ref/l9_demo/khoi_end.png — vị trí, cỡ từng món (khối, không chép dáng, chữ, màu).
4. art/out/cats/mun_ref.png — Mun.
5. art/out/cats/sua_ref.png — Sữa.

## Lưu
- Ảnh 1024x1536, có nền. Lưu vào **art/out/demo/l9_demo_end_play.png** (file mới, không ghi đè).

## Quy tắc bắt buộc (AGENTS.md)
- Trước khi gọi image_gen: mở MỌI ảnh tham chiếu bằng view_image, rồi viết phần **"Nhắc lại quy tắc"** (phong cách, màu từng món, góc nhìn (góc chung, không dùng ngoại lệ L9), nét, yêu cầu riêng) bằng lời của mình.
- Gọi image_gen MỘT lần, cỡ 1024x1536 dọc, có nền (không trong suốt). Nếu sai rõ ràng được vẽ lại tối đa 1 lần. Chép nguyên ảnh, không cắt, không resize, không chỉnh màu.
- Không chữ, không số, không logo, không chữ ký, không vẽ giao diện (tim đếm mạng, nút, vòng, bóng đèn), không vẽ người (chỉ chân mèo nếu có).
- Chạy `python tools/color_check.py <ảnh đã lưu>` và ghi số.
- Tin nhắn cuối: `SAVED: ...`, prompt cuối đã gửi image_gen, phần **"Tự kiểm"** (mỗi quy tắc đạt / không đạt + một câu lý do: góc nhìn, nét, màu theo số đo và từng món, súp không cam tươi, không chữ, nền, vị trí và cỡ từng món theo ảnh khối, Mun và Sữa đúng thiết kế), một dòng tự nhận xét.

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
