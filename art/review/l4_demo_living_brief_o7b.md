Vẽ lại ẢNH DEMO `l4_demo_living` cho Level 4 "Quả chuối trên rèm" (lượt O7b: CHỈNH MÀU, giữ nguyên góc nhìn O7), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

Chủ dự án: màu lượt trước đã ổn, nhưng **"góc nhìn của nhiều đồ đang loạn, nhiều đồ bị phẳng quá"**. Từ Level 4 mọi nền và đồ dùng **một góc 3D chéo nhẹ duy nhất** (khối CAMERA dưới). Việc chính lượt này: **mọi đồ có khối, thấy đủ mặt trước + hông PHẢI + mặt trên, cùng một hướng xoay**, màu giữ như lượt trước.

- Lưu vào: art/out/demo/l4_demo_living.png, cỡ 1024x1536 (dọc), CÓ NỀN đầy đủ. ĐƯỢC PHÉP GHI ĐÈ art/out/demo/l4_demo_living.png (chỉ file này). Gọi image_gen MỘT lần, chép nguyên ảnh, không cắt, không chỉnh màu hậu kỳ.
- Đặc tả: art/design-art-level4.md (đầu file "Góc nhìn O7", mục 2, 2b, 5). Quy tắc: art/style.md mục 1 (COLOR) và mục 2b (CAMERA O7), QUY-TRINH.md "Quy tắc giữ màu", "Quy tắc góc nhìn".
- Ảnh tham chiếu (TỐI ĐA 5), mở HẾT bằng view_image trước khi vẽ, đính kèm theo thứ tự:
  1. art/ref/owner_l1_style_ref.png = **CHUẨN về màu, độ nhạt, vân chì, nét** (KHÔNG lấy góc nhìn của ảnh này: ảnh này nhìn chính diện, level 4 dùng góc chéo).
  2. art/out/_refs/l4_demo_living_o7a.png = **ẢNH GỐC để chỉnh sửa**: góc nhìn O7, bố cục, đường nét, hình khối đã ĐẠT, giữ nguyên.
  3. art/out/cats/sua_ref.png (Sữa)
  4. art/out/player/player_ref.png (nhân vật)
- Lượt O7 vừa rồi **góc nhìn đạt**, nhưng màu đo được **0,266 / 0,451** (trung bình / p90), vượt ngưỡng 0,25 / 0,46: góc chéo cho thấy nhiều sàn gỗ hơn và gỗ đang đậm hơn ảnh 1. Lượt này dùng image_gen **chế độ chỉnh sửa trên ảnh 2**, **giữ nguyên góc nhìn, bố cục, nét, hình khối**, chỉ tô lại các mảng sau cho nhạt như ảnh 1 (vân chì thưa có kẽ giấy kem, không tô phẳng):
  - **Sàn gỗ** (mảng lớn nhất): mật ong rất nhạt, nhạt hơn #F2C796, gần kem ngả vàng, như sàn ảnh 1; ván chì thưa.
  - **Tường** kem giấy nhạt như ảnh 1; dải tường phải chỉ tối hơn một chút.
  - **Rèm** hồng đào nhạt, **sofa** bạc hà nhạt: giữ hoặc nhạt hơn một bậc.
  - Bố cục: **đầu ngón tay nhân vật sát ngay dưới chân sau Sữa (≤ 20px)** (kéo dài cánh tay vươn lên hoặc hạ chân Sữa một chút); **sofa không đè lên mũi tên ►** (mép phải sofa trong vùng y 660–860 phải ở x < 880, thu sofa sang trái/nhỏ lại một chút).
- Trước khi gọi image_gen, viết "Nhắc lại quy tắc" (phong cách, **màu O6**, **góc nhìn O7**, nét, không chữ, nền, yêu cầu riêng). Tin nhắn cuối có "Tự kiểm": từng quy tắc đạt / không đạt + một câu lý do; **góc nhìn chấm riêng từng đồ** (thấy đủ 3 mặt chưa, cùng hướng xoay chưa), SAVED, prompt cuối, một dòng chỗ chưa ổn.
- Sau khi lưu, chạy `python tools/color_check.py art/out/demo/l4_demo_living.png art/ref/owner_l1_style_ref.png` và chép kết quả vào Tự kiểm (ngưỡng trung bình ≤ 0,25, p90 ≤ 0,46). Không tự vẽ lại.

## Khối phong cách (art/style.md mục 1, có khối COLOR khóa theo ảnh mẫu L1), dán nguyên

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

## Khối góc nhìn O7 (art/style.md mục 2b), dán nguyên

```
CAMERA (one shared camera for every background and object, from Level 4 on): gentle three-quarter 3D view.
The camera is in front, slightly to the LEFT and above, looking down about 25-30 degrees.
Every object is turned the SAME way by about 25-30 degrees, so we always see three faces: the FRONT face (largest), the RIGHT side face (clearly visible, about 1/3 to 1/2 of the front width) and the TOP face (about 1/3 of the front height). Every object has real volume and depth; nothing looks flat like a paper cut-out.
Very mild two-point perspective with far-away vanishing points: vertical edges stay vertical; front edges slope slightly down to the left, side edges slope slightly up to the right; no strong convergence, no distortion, no fisheye.
All objects share the same rotation and the same eye height; stacked or touching objects keep parallel edges. Round tops and openings are ellipses about 1/3 as tall as they are wide.
Rooms: the back wall faces us, a narrow strip of the right wall angles in, floor boards and skirting follow the same angle.
Light from the upper left: top faces lightest, right side faces a little darker with a few pencil strokes. No floor shadow.
```

## Phòng và giao diện (chung 3 demo)
- **Phòng theo góc O7:** tường sau là mặt chính; **một dải tường bên PHẢI chếch vào** (rộng ~90–130px ở mép phải, cùng màu tường, tối nhẹ hơn một chút); sàn gỗ ván mật ong nhạt thấy rõ hơn, **ván sàn chạy chéo cùng hướng xoay** của đồ; len chân tường gỗ caramel nhạt chạy theo góc tường. **Mép trên len chân tường tường sau ở y ≈ 950** (hơi chếch theo phối cảnh nhẹ). Không đường trần.
- Màu tường, sàn, đồ: **giữ như ảnh 2** (đã duyệt). Mảng lớn nhạt nhất, thấy vân chì, không tô phẳng, tường không trắng tinh.
- Đồ đứng trên sàn: đáy không thấp hơn y = 1160. Không bóng đổ trên sàn.
- Tỉ lệ level này: nhân vật cao ~400, mèo ngồi ~175.
- **Giao diện phẳng** (không theo góc chéo, giống ảnh 2): góc trên trái tim hồng phấn + 4 vòng tròn nhỏ (3 vòng đầu tô hồng phấn); nút dừng tròn kem viền gỗ tâm ≈ (951, 66); **túi đồ** dải kem viền gỗ caramel với 4 ô vuông trống, tâm các ô y ≈ 1290 (x ≈ 205/348/492/635), đáy dải túi y ≈ 1380, quai túi trên mép trái; **nút bóng đèn** tròn vàng bơ nhạt tâm (934, 1306). **Dưới y = 1386 chỉ là sàn trơn.** Mũi tên chuyển phòng: mũi tên mập kem giấy viền gỗ caramel nhạt + viền nâu mảnh, rộng ~110, **tâm y = 760**, sát mép (◄ tâm (64, 760) và ► tâm (960, 760)). Không bản đồ, không chữ, không số.

## Nội dung phòng khách (lúc cao trào) và góc nhìn từng đồ
- **Cửa sổ** cao 2 cánh trên tường sau, bên trái-giữa: mặt cửa song song tường sau, **khung có độ dày thấy ở cạnh phải và bệ cửa thấy mặt trên** hình bình hành. Kính xanh trời nhạt, 1 mây.
- **Thanh rèm** gỗ caramel nhạt tròn ở y≈150 (khối trụ, hai đầu núm tròn), **tấm rèm dài hồng đào nhạt** treo ở nửa trái thanh, có khối: các nếp dọc tròn lồi lõm, **gấu rèm xòe trên sàn theo hình elip/bình hành** (không phải đường thẳng).
- **Sữa** (đúng sua_ref) treo kiểu **quả chuối** ngay dưới thanh rèm: hai chân trước giơ thẳng bám đỉnh rèm, thân duỗi dài hơi cong, **thân xoay 3/4** cùng hướng, mặt nhìn người xem ngơ ngác kêu meo, hai chân sau dang, đuôi bông thõng.
- **Tháp 4 món, CÙNG MỘT HƯỚNG XOAY, cạnh song song**, mỗi món thấy **mặt trước, hông phải và mặt trên hình bình hành** (rõ độ dày): đệm gấp đôi kem chần quả trám viền xanh trời nhạt (dưới cùng, rộng nhất, đáy y ≈ 1150) → vali vàng bơ nhạt gập dẹt, 2 đai bạc hà (thấy nóc và hông) → chồng sách vuông vức (thấy gáy ở mặt trước, mép giấy ở hông phải, bìa trên cùng ở mặt trên) → gối kem viền hồng phấn phồng (trên cùng).
- **Nhân vật** (đúng player_ref) đứng trên mặt gối, **thân xoay 3/4** cùng hướng, kiễng chân, **hai tay giơ cao, đầu ngón tay sát ngay dưới chân sau Sữa (≤ 20px), chưa chạm**, mặt ngửa nhìn Sữa.
- **Sofa** 2 chỗ bạc hà nhạt sát tường sau bên phải: **khối 3D** thấy mặt trước, **tay vịn phải và hông phải**, mặt đệm ngồi hình bình hành, lưng tựa thấy mặt trên; 4 chân thẳng đứng (chân sau lùi về phải, cao hơn). Đáy y ≈ 1000.
