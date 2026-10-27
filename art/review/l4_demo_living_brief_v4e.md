Vẽ lại ẢNH DEMO `l4_demo_living` (phòng khách Level 4 "Quả chuối trên rèm") MỚI TỪ ĐẦU, đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ). Vòng 4e.

Chủ dự án nhận xét bản trước: **"nhân vật quá nhỏ so với các level cũ, màu sắc cũng đang bị sai hơi nhiều"**. Lượt này: nhân vật to như các level trước, màu đúng y bảng màu ảnh mẫu level 1.

- Lưu vào: art/out/demo/l4_demo_living.png, cỡ 1024x1536 (dọc), CÓ NỀN đầy đủ. ĐƯỢC PHÉP GHI ĐÈ file này. Gọi image_gen MỘT lần, chép nguyên ảnh, không xử lý hậu kỳ.
- Ảnh tham chiếu (5 ảnh), mở HẾT bằng view_image trước khi vẽ và đính kèm theo thứ tự:
  1. art/ref/owner_l1_style_ref.png = **CHUẨN MÀU và nét** (tường kem, sofa bạc hà, sàn gỗ mật ong, vân chì). Màu mọi thứ phải trông như cùng một bộ tranh với ảnh này. **Cỡ chú mèo trong ảnh này là cỡ Sữa** của ảnh mới.
  2. art/ref/l1_depth_angle_ref.png = sofa level 1: **chuẩn góc nhìn** cho mọi đồ.
  3. art/ref/l1_floor_ref.png = **mẫu sàn gỗ**: sàn ảnh mới đúng màu, độ đậm, vân ván này.
  4. art/out/player/player_ref.png = **nhân vật**: vẽ đúng y nhân vật này.
  5. art/out/cats/sua_ref.png = **Sữa**: vẽ đúng y chú mèo này.
- Trước khi gọi image_gen, viết "Nhắc lại quy tắc" (phong cách, màu, góc, nét, nhân vật, cỡ, bố cục, không chữ, nền). Tin nhắn cuối có "Tự kiểm" (từng quy tắc đạt / không đạt + một câu lý do; đo và ghi chiều cao nhân vật px, y chân tháp, y đầu ngón tay, y chân Sữa), SAVED, prompt cuối, một dòng chỗ chưa ổn.
- Sau khi lưu, chạy `python tools/color_check.py art/out/demo/l4_demo_living.png art/ref/owner_l1_style_ref.png` và ghi vào Tự kiểm. Không tự vẽ lại.

## KIỂM TRƯỚC KHI LƯU (lượt trước sai 2 điểm, nhân vật thì đã đúng cỡ)
1. **Rèm phải hồng đào RẤT NHẠT** (gần kem ngả hồng, nhạt hơn #F7B9A3), **không cam, không san hô**. Toàn tranh nhạt như ảnh 1 (lượt trước bão hoà 0,296, cần ≤ 0,25).
2. **Đáy tháp ở y ≈ 1160, không chạm túi đồ** (túi đồ bắt đầu từ y ≈ 1230). Tháp mỏng, nhân vật và Sữa đi theo cho ngón tay vẫn sát chân Sữa.

## Nhân vật (quan trọng nhất)
- **Đúng y player_ref:** bạn nhỏ chibi, đầu to bằng khoảng nửa thân; **tóc xoăn bồng màu nâu caramel** nhiều lọn xoăn nhỏ tròn; mặt tròn, mắt chấm nâu đen nhỏ, má hồng đào, miệng nhỏ; **áo len rộng vàng bơ nhạt** cổ và gấu áo bo; **quần xanh da trời nhạt** ống bo; **dép bông kem** lông xù. Không đổi màu, không thêm phụ kiện.
- **Cỡ: cao ~500px từ đế dép tới đỉnh tóc** (to như nhân vật ở level 1–3), tính cả hai tay giơ thì ~520–560px.
- Tư thế `player_reach_up`: đứng trên mặt gối đỉnh tháp, **kiễng chân**, người vươn thẳng, **hai tay giơ cao quá đầu**, mặt ngửa nhìn Sữa, miệng chữ o cố gắng; người hơi quay 3/4 sang trái nhưng mặt vẫn thấy rõ.
- **Sữa** đúng sua_ref (mèo con trắng ấm lông xù, đầu to tròn, mắt to xanh trời lòng đen nâu to, tai hồng, má hồng, không đốm, không vòng cổ), **cỡ như chú mèo trong ảnh 1** (dài treo ~250px).

## Bố cục (khung 1024x1536)
- **Tường sau** kem giấy #FCF1DD trơn như ảnh 1; len chân tường gỗ caramel nhạt nằm ngang, **mép trên y ≈ 950**; **sàn gỗ ván ngang đúng màu ảnh 3** từ y≈980 xuống đáy.
- **Cửa sổ** cao 2 cánh bên trái-giữa (x≈150–560, y≈190–640), khung kem, kính xanh trời nhạt có 1 mây, bệ cửa có mặt trên.
- **Thanh rèm** gỗ caramel nhạt ở **y ≈ 140**, x≈120–600; **một tấm rèm dài** vải dày **hồng đào nhạt (#F7B9A3 hoặc nhạt hơn)** treo nửa trái thanh (x≈140–430), buông chạm sàn, vài nếp dọc mềm.
- **Sữa treo kiểu quả chuối ở GIỮA tấm rèm** (x≈285): hai chân trước giơ thẳng bám đỉnh rèm ở **y ≈ 180**, thân duỗi dài hơi cong như quả chuối, hai chân sau dang, đuôi bông thõng; **chân sau thấp nhất ở y ≈ 430**; mặt ngơ ngác kêu meo.
- **Tháp** ngay dưới Sữa, trục giữa x≈285, **đáy tháp y ≈ 1160** (trước chân rèm), các món **mỏng**, xếp thẳng hàng từ dưới lên, mỗi món thấy mặt trên và độ dày như sofa ảnh 2:
  - **đệm gấp** kem chần quả trám, viền xanh trời nhạt: rộng ~300, cao ~60;
  - **vali gập dẹt xanh da trời nhạt** (#B8DAF2), 2 đai kem, góc caramel: rộng ~240, cao ~60;
  - **chồng 4 cuốn sách** gáy pastel trơn: rộng ~170, cao ~45;
  - **gối** kem viền hồng phấn phồng: rộng ~150, cao ~40; **mặt trên gối ở y ≈ 960**.
- **Nhân vật** đứng trên gối, chân ở y ≈ 960, **đầu ngón tay ở y ≈ 440, sát ngay dưới chân sau Sữa (cách ≤ 20px), chưa chạm**.
- **Sofa** 2 chỗ **bạc hà nhạt đúng màu sofa ảnh 1**, sát tường bên phải (x≈600–960, đáy y ≈ 1010), thấy mặt đệm ngồi như sofa ảnh 2; không đè mũi tên ►.
- Mũi tên chuyển phòng: mũi tên mập kem giấy viền gỗ caramel nhạt, rộng ~110, ◄ tâm (64, 760) và ► tâm (960, 760).
- **Giao diện phẳng** như level 1: góc trên trái tim hồng phấn + 4 vòng tròn nhỏ (3 vòng đầu tô hồng phấn); nút dừng tròn kem viền gỗ tâm ≈ (951, 66); **túi đồ** dải kem viền gỗ caramel với 4 ô vuông trống, tâm ô y ≈ 1290, đáy dải y ≈ 1380, quai túi trên mép trái; nút bóng đèn tròn vàng bơ nhạt tâm (934, 1306). Dưới y = 1386 chỉ là sàn trơn. Không bản đồ, không chữ, không số.
- Chỉ vẽ đúng các thứ trên, không thêm đồ trang trí. Nét bút chì nâu ấm mảnh, mềm, cute, khối tròn mập như ảnh 1. Không bóng đổ trên sàn.

## Màu (đúng bảng màu ảnh 1, không lệch)
- Tường kem giấy, sàn gỗ mật ong đúng ảnh 3, rèm hồng đào nhạt, sofa bạc hà nhạt như sofa ảnh 1, đệm kem, vali xanh da trời nhạt, gối kem viền hồng phấn, áo vàng bơ nhạt, quần xanh trời nhạt. Không màu nào đậm hơn ô màu của nó; không cam, không san hô, không hồng đậm.

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
