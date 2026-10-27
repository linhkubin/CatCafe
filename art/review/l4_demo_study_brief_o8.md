Vẽ lại ẢNH DEMO `l4_demo_study` cho Level 4 "Quả chuối trên rèm" (lượt O8: GÓC CHÍNH DIỆN NHƯ LEVEL 1 + đồ có khối + màu O6), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

Chủ dự án: góc 3D chéo (O7) **bỏ**, "để góc nhìn như level 1 thôi". Nhưng vẫn giữ ý cũ: **nhiều đồ đang phẳng quá**. Việc lượt này: góc **chính diện giống hệt level 1**, mọi đồ **có khối như sofa, hộp, chậu cây ở level 1**, màu nhạt như ảnh mẫu.

- Lưu vào: art/out/demo/l4_demo_study.png, cỡ 1024x1536 (dọc), CÓ NỀN đầy đủ. ĐƯỢC PHÉP GHI ĐÈ art/out/demo/l4_demo_study.png (chỉ file này). Gọi image_gen MỘT lần, chép nguyên ảnh, không cắt, không chỉnh màu hậu kỳ.
- Đặc tả: art/design-art-level4.md (đầu file "Góc nhìn O8", mục 2, 2b, 5). Quy tắc: art/style.md mục 1 (COLOR) và mục 2b (CAMERA O8), QUY-TRINH.md "Quy tắc giữ màu", "Quy tắc góc nhìn".
- Ảnh tham chiếu (TỐI ĐA 5), mở HẾT bằng view_image trước khi vẽ, đính kèm theo thứ tự:
  1. art/ref/owner_l1_style_ref.png = **CHUẨN về góc nhìn, màu, độ nhạt, vân chì, nét**. Xem kỹ cách sofa, hộp các-tông, chậu cây ở ảnh này có khối (dải mặt trên mỏng, độ dày, dải hông hẹp) dù nhìn chính diện.
  2. art/out/_refs/l4_demo_study_v_o6.png = **ẢNH GỐC để chỉnh sửa**: bố cục, đồ, nhân vật, mèo, giao diện, góc chính diện đều giữ. Chỉ sửa theo danh sách dưới.

- Dùng image_gen **chế độ chỉnh sửa trên ảnh 2**, giữ nguyên bố cục và góc chính diện.
- Trước khi gọi image_gen, viết "Nhắc lại quy tắc" (phong cách, **màu O6**, **góc nhìn O8 + khối**, nét, không chữ, nền, yêu cầu riêng). Tin nhắn cuối có "Tự kiểm": từng quy tắc đạt / không đạt + một câu lý do; **góc + khối chấm riêng từng đồ** (chính diện chưa, có dải mặt trên / độ dày / dải hông phải hẹp chưa, có đồ nào phẳng như dán giấy không), SAVED, prompt cuối, một dòng chỗ chưa ổn.
- Sau khi lưu, chạy `python tools/color_check.py art/out/demo/l4_demo_study.png art/ref/owner_l1_style_ref.png` và chép kết quả vào Tự kiểm (ngưỡng trung bình ≤ 0,25, p90 ≤ 0,46). Không tự vẽ lại.

## Khối phong cách (art/style.md mục 1, khối COLOR khóa theo ảnh mẫu L1), dán nguyên

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

## Khối góc nhìn O8 (art/style.md mục 2b), dán nguyên

```
CAMERA (one shared camera for the whole game, exactly like the Level 1 reference image): straight-on FRONT view, eye slightly above, looking down only about 15 degrees.
Horizontal edges stay horizontal, vertical edges stay vertical. NO three-quarter view, NO oblique/diagonal perspective, NO vanishing points, nothing rotated diagonally.
The front face is the main visible face; the top face is only a thin strip (about 1/5 of the front height); round tops are flat ellipses; a side face, if any, is only a narrow strip on the RIGHT.
Objects are NOT flat paper cut-outs: like the sofa, box and plant pot in the Level 1 reference, always show the thin top strip, show the thickness of thick objects (mattress, suitcase, books, pillow, shelf, bed) and a narrow right side strip, and give round objects a few pencil shading strokes on the right.
Light from the upper left: a few pencil shading strokes on the right/bottom of each object. No floor shadow.
```

## Sửa chung (cả 3 demo)
- **Gỗ nhạt hơn** (sàn, đồ gỗ): mật ong rất nhạt như sàn ảnh 1, gần kem ngả vàng, ván chì thưa; đồ gỗ (kệ, bàn, giường) mật ong nhạt, không cam nâu. Tường giữ sắc rất nhạt như ảnh 2. Mảng lớn nhạt nhất, thấy vân chì, không tô phẳng.
- **Không đồ nào phẳng như dán giấy**: mọi đồ có **dải mặt trên mỏng** (~1/5 mặt trước), đồ dày thấy **độ dày** và **dải hông phải hẹp**, đồ tròn có vài nét chì đổ bóng bên phải, như ảnh 1. Vẫn chính diện: cạnh ngang nằm ngang, không xoay chéo, không điểm tụ.
- Giữ chân tường, ván sàn **nằm ngang**; không dải tường phải. Giữ giao diện (tim, vòng, nút dừng, túi đồ 4 ô, nút bóng đèn, mũi tên) như ảnh 2.

## Sửa riêng
- **Kệ sách**: nóc dải mỏng, **dải hông phải hẹp** thấy độ sâu kệ; gỗ mật ong nhạt.
- **Bàn làm việc**: mặt bàn dải mỏng, mép bàn có độ dày, dải hông phải hẹp; gỗ mật ong nhạt.
- **Vali**: nóc dải mỏng, dải hông phải hẹp, vàng bơ rất nhạt; **bóng yoga** oải hương rất nhạt có nét chì đổ bóng bên phải.
