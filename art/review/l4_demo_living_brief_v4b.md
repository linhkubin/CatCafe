Vẽ ẢNH DEMO `l4_demo_living` cho Level 4 "Quả chuối trên rèm", đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ). Đây là bản vẽ MỚI TỪ ĐẦU (Vòng 4b).

Chủ dự án nhận xét lượt trước: "ổn hơn nhiều rồi, cần **nét vẽ cute hơn**, **nét mềm hơn**", và **đống đồ xếp tháp nhỏ hơn một chút, dịch gần vào tường hơn**. Giữ góc nhìn như sofa level 1 và mức chiều sâu như lượt trước (đã ưng).

- Lưu vào: art/out/demo/l4_demo_living.png, cỡ 1024x1536 (dọc), CÓ NỀN đầy đủ. Gọi image_gen MỘT lần, chép nguyên ảnh, không cắt, không chỉnh màu hậu kỳ. Được phép ghi đè file này. Không dùng bản cũ của file này làm tham chiếu.
- Đặc tả: art/design-art-level4.md (mục 2 bố cục, 2b từng đồ, 5 mô tả, 7 ảnh demo). Quy tắc: art/style.md mục 1 (COLOR) và mục 2b (CAMERA).
- Ảnh tham chiếu (tối đa 5), mở HẾT bằng view_image trước khi vẽ và đính kèm theo thứ tự:
  1. art/ref/owner_l1_style_ref.png = CHUẨN màu, độ nhạt, vân chì, nét.
  2. art/ref/l1_depth_angle_ref.png = CHUẨN GÓC NHÌN: cái sofa level 1. Nhìn mọi đồ trong tranh như cái sofa này, chỉ cho đồ có chiều sâu rõ hơn chút.
  3. art/out/demo/l3_demo_reveal.png = chỉ để lấy cách vẽ giao diện (tim, vòng tròn, nút dừng, túi đồ 4 ô, nút bóng đèn). Không lấy đồ hay phòng của ảnh này.
  4. art/out/cats/sua_ref.png (Sữa)
  5. art/out/player/player_ref.png (nhân vật)
- Trước khi gọi image_gen, viết "Nhắc lại quy tắc" (phong cách, màu, góc nhìn như sofa L1, nét, không chữ, nền, yêu cầu riêng). Tin nhắn cuối có "Tự kiểm" (từng quy tắc đạt / không đạt + một câu lý do; góc nhìn chấm riêng từng đồ: có mặt trên và độ dày chưa, có đồ nào xoay chéo hay phẳng không), SAVED, prompt cuối, một dòng chỗ chưa ổn.
- Sau khi lưu, chạy `python tools/color_check.py art/out/demo/l4_demo_living.png` và chép kết quả vào Tự kiểm. Không tự vẽ lại.

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

## Cute và mềm hơn (yêu cầu chính của lượt này)
- **Hình khối tròn, mập, bo góc nhiều**: mọi đồ đạc tròn trịa đáng yêu như sofa ảnh 2 (góc bàn, kệ, giường, tủ, vali đều bo tròn mềm, hơi phồng), hơi méo vui mắt, không cạnh sắc, không thẳng tắp kiểu bản vẽ kỹ thuật.
- **Nét viền nâu mảnh và nhạt hơn**, run tay nhẹ, đầu nét nhọn dần, đậm nhạt như bút chì thật; không nét cứng, không đều dày.
- Ít chi tiết, nhìn bóng là nhận ra đồ; vân chì mịn, mềm như ảnh 1.

## Chung cho 3 phòng
- Tường sau nhìn thẳng, trơn; len chân tường gỗ caramel nhạt nằm ngang, **mép trên ở y ≈ 950**; sàn gỗ ván ngang mật ong rất nhạt như ảnh 1 (phòng ngủ và làm việc: nhạt hơn nữa, gần kem). Không đường trần. Không bóng đổ trên sàn.
- Tỉ lệ level này nhỏ hơn level 1: nhân vật cao ~400px, mèo Sữa ngồi ~175px; mọi đồ cùng tỉ lệ đó.
- Chỉ vẽ đúng các đồ liệt kê, không thêm đồ trang trí nào khác.
- Giao diện phẳng như ảnh 3: góc trên trái tim hồng phấn + 4 vòng tròn nhỏ (3 vòng đầu tô hồng phấn); nút dừng tròn kem viền gỗ tâm ≈ (951, 66); túi đồ dải kem viền gỗ caramel với 4 ô vuông trống, tâm ô y ≈ 1290, đáy dải túi y ≈ 1380, quai túi trên mép trái; nút bóng đèn tròn vàng bơ nhạt tâm (934, 1306). Dưới y = 1386 chỉ là sàn trơn. Mũi tên chuyển phòng: mũi tên mập kem giấy viền gỗ caramel nhạt, rộng ~110, tâm y = 760, sát mép (◄ tâm (64, 760) và ► tâm (960, 760)). Không bản đồ, không chữ, không số.

## Nội dung

**KIỂM TRƯỚC KHI LƯU (lượt trước sai 2 điểm này):**
1. **Chân tháp (đáy đệm) phải ở y ≈ 1000–1030, ngay sát chân tường (y≈950)**, đứng sát trước chân tấm rèm, KHÔNG đứng giữa sàn phía trước. Tháp nhỏ: đệm rộng ~280px.
2. **Sữa treo ở GIỮA bề ngang tấm rèm** (cách mép phải tấm rèm ít nhất 80px), KHÔNG bám ở mép rèm sát cửa sổ. Trục giữa tháp thẳng dưới Sữa.

Phòng khách, tường kem giấy, lúc cao trào.
- **Cửa sổ** cao 2 cánh bên trái-giữa (x≈180–600, y≈200–640), kính xanh trời nhạt có 1 mây, bệ cửa có mặt trên.
- **Thanh rèm** gỗ caramel nhạt ở y≈150; **một tấm rèm dài vải dày hồng đào nhạt** treo ở nửa trái thanh, buông chạm sàn, vài nếp dọc mềm.
- **Sữa** (đúng sua_ref) **treo kiểu quả chuối ở GIỮA đỉnh tấm rèm** (không sát mép cửa sổ), ngay dưới thanh rèm: hai chân trước giơ thẳng bám vải, thân duỗi dài hơi cong như quả chuối, hai chân sau dang, đuôi bông thõng, mặt ngơ ngác kêu meo.
- **Tháp nhỏ hơn lượt trước một chút** (đệm rộng ~280px) và **lùi sát vào tường**: đứng ngay trước chân tấm rèm, **chân tháp ở y ≈ 1020** (gần chân tường y≈950), trục giữa tháp thẳng dưới Sữa. Xếp thẳng hàng từ dưới lên: **đệm gấp đôi** kem chần quả trám, viền xanh trời nhạt (rộng nhất, mặt trên là mảng lớn) → **vali** vàng bơ nhạt gập dẹt, 2 đai bạc hà → **chồng sách** vuông vức gáy pastel trơn → **gối** kem viền hồng phấn phồng. Mỗi món thấy mặt trên và độ dày.
- **Nhân vật** (đúng player_ref) đứng trên gối, kiễng chân, **hai tay giơ cao, đầu ngón tay sát ngay dưới chân sau của Sữa** (tháp thấp hơn thì cho Sữa treo thõng thấp hơn chút để tay vẫn với tới), chưa chạm, mặt ngửa nhìn Sữa.
- **Sofa** 2 chỗ bạc hà nhạt sát tường bên phải (đáy y ≈ 1000), thấy rõ mặt đệm ngồi như sofa ảnh 2, không đè mũi tên ►.
