Vẽ lại ẢNH DEMO `l4_demo_study` cho Level 4 "Quả chuối trên rèm" (lượt 4, chỉ sửa màu, theo QUY TẮC GIỮ MÀU O6), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

Chủ dự án chê lượt trước **màu hơi đậm và lệch style so với ảnh mẫu level 1**. Việc chính của lượt này là **màu và chất chì giống hệt ảnh mẫu level 1**.

- Lưu vào: art/out/demo/l4_demo_study.png, cỡ 1024x1536 (dọc), CÓ NỀN đầy đủ. ĐƯỢC PHÉP GHI ĐÈ art/out/demo/l4_demo_study.png (chỉ file này). Gọi image_gen MỘT lần, chép nguyên ảnh, không tự cắt, không chỉnh màu hậu kỳ.
- Đặc tả: art/design-art-level4.md (mục 2, 2b, 5, 7). Quy tắc màu: art/style.md mục 1 khối COLOR, QUY-TRINH.md "Quy tắc giữ màu".
- Ảnh tham chiếu (image_gen nhận TỐI ĐA 5 ảnh), mở HẾT bằng view_image trước khi vẽ và đính kèm theo thứ tự:
  1. art/ref/owner_l1_style_ref.png = **CHUẨN DUY NHẤT về màu, độ nhạt, vân chì, nét**. Ảnh mới phải trông như cùng một bộ tranh với ảnh này.
  2. art/out/_refs/l4_demo_study_v3.png = **ẢNH GỐC, giữ nguyên bố cục, hình dáng, nét**; chỉ sửa màu (đồ gì, ở đâu, cỡ bao nhiêu, dáng đồ). KHÔNG lấy màu, KHÔNG lấy độ đậm của ảnh này.
  3. art/out/demo/l3_demo_reveal.png = cách vẽ giao diện (tim, vòng tròn, nút dừng, túi đồ 4 ô, nút bóng đèn).

- **Lượt 3 đo được trung bình 0,273, p90 0,525 (vượt ngưỡng 0,25 / 0,46).** Bố cục lượt 3 đã tốt. Lượt này dùng image_gen chế độ chỉnh sửa trên ảnh 2, **giữ nguyên mọi đường nét và vị trí**, chỉ tô lại cho NHẠT hơn rõ rệt các món sau (tô lại bằng vân chì thưa có kẽ giấy kem, không tô phẳng):
  - **Vali:** vàng bơ rất nhạt, nhạt hơn #FCE39A (gần kem ngả vàng); đai bạc hà nhạt; góc caramel nhạt.
  - **Bóng yoga:** oải hương rất nhạt, nhạt hơn #D8CCF0 (gần kem ngả tím), vệt sáng chì nhạt.
  - **Gáy sách:** mọi gáy nhạt đi một bậc (hồng phấn, bạc hà, xanh trời, vàng bơ, oải hương nhạt), không gáy nào đậm.
  - **Đèn bàn, cốc bút, kính lặn, áo thò ra:** nhạt đi một bậc.
  - Tường bạc hà, sàn, kệ, bàn: giữ như ảnh 2 hoặc nhạt hơn chút.
- Trước khi gọi image_gen, viết "Nhắc lại quy tắc" (phong cách, **khối màu O6**, góc nhìn, nét, không chữ, nền, yêu cầu riêng). Tin nhắn cuối có "Tự kiểm" (từng quy tắc đạt / không đạt + một câu lý do; **màu chấm riêng từng món trong danh sách "Món bị đậm"**), SAVED, prompt cuối, một dòng chỗ chưa ổn.
- Sau khi lưu, chạy `python tools/color_check.py art/out/demo/l4_demo_study.png art/ref/owner_l1_style_ref.png` và chép kết quả vào Tự kiểm (ngưỡng: trung bình ≤ 0,25, p90 ≤ 0,46). Không tự vẽ lại.

## Khối phong cách (art/style.md mục 1, bản mới có khối COLOR khóa theo ảnh mẫu L1), dán nguyên

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
CAMERA (one shared camera for the whole game): straight-on FRONT view, eye slightly above, looking down only about 15 degrees.
Horizontal edges stay horizontal, vertical edges stay vertical. NO three-quarter view, NO oblique/diagonal perspective, NO vanishing points, nothing rotated diagonally.
The front face is the main visible face; the top face is only a thin strip (about 1/5 of the front height); round tops are flat ellipses; a side face, if any, is only a narrow strip on the RIGHT.
Light from the upper left: a few pencil shading strokes on the right/bottom of each object. No floor shadow.
```

## Bố cục chung (giữ như ảnh 2, sửa các mốc sau)
- Tường trơn, **màu tường là sắc rất nhạt ấm như giấy kem của ảnh 1** (không trắng tinh, không đậm); không đường trần. **Mép trên len chân tường gỗ caramel nhạt ở y ≈ 950** (chung cho cả 3 phòng). Sàn gỗ ván ngang mật ong nhạt như ảnh 1, thấy vân chì và kẽ giấy.
- Đồ đứng trên sàn: đáy không thấp hơn y = 1160. Không bóng đổ trên sàn.
- Giao diện như ảnh 3: góc trên trái tim hồng phấn + 4 vòng tròn nhỏ (3 vòng đầu tô hồng phấn); nút dừng tròn kem tâm ≈ (951, 66); **túi đồ** dải kem viền gỗ caramel với 4 ô trống, **tâm các ô y ≈ 1290** (x ≈ 205/348/492/635), **đáy dải túi y ≈ 1380**, quai túi trên mép trái; **nút bóng đèn** tròn vàng bơ nhạt tâm (934, 1306). **Dưới y = 1386 chỉ là sàn trơn.** Không bản đồ, không chữ, không số.
- Mũi tên chuyển phòng: mũi tên mập kem giấy viền gỗ caramel nhạt + viền nâu mảnh, rộng ~110, **tâm y = 760**, sát mép (chỉ ◄ tâm (64, 760)).
- Tỉ lệ level này nhỏ hơn level 1–3: nhân vật cao ~400, mèo ngồi ~175.

## Món bị đậm ở lượt trước, phải nhạt lại đúng ô màu
- **Bóng yoga:** lượt trước tím đậm. Vẽ **oải hương nhạt #D8CCF0**, một vệt sáng chì nhạt, không bóng loáng.
- **Vali:** lượt trước vàng đậm. Vẽ **vàng bơ nhạt #FCE39A**, đai bạc hà nhạt #B9DDBE, góc caramel nhạt.
- **Gáy sách:** chỉ hồng phấn, bạc hà, xanh trời nhạt, vàng bơ, oải hương nhạt; không xanh dương đậm, không tím đậm, không xanh ngọc.
- **Đèn bàn** bạc hà nhạt; **kính lặn** thò ra xanh trời nhạt.
- **Tường** bạc hà rất nhạt pha kem (như giấy), không đậm.
- Mọi mảng to (tường, sàn, kệ, bàn, vali, bóng) là màu **nhạt nhất** trong tranh, thấy vân chì và kẽ giấy kem, **không tô phẳng**.

## Nội dung phòng làm việc (lúc đầu màn, giữ bố cục ảnh 2; không người, không mèo)
- Kệ sách cao 4 tầng kín sách (gáy trơn pastel nhạt, không chữ) bên trái, chân kệ chạm sàn ở y ≈ 950. Bàn làm việc gỗ mật ong nhạt sát tường bên phải, chân chạm sàn y ≈ 950; trên bàn đèn bạc hà nhạt, cốc bút hồng đào nhạt, một cây bút nằm sát mép phải.
- **Vali căng phồng** vàng bơ nhạt phía trước giữa, góc áo bạc hà và dây kính lặn thò ra; **bóng yoga oải hương nhạt** phía trước bên phải; cả hai **đáy y ≈ 1150**, không bóng sàn.
