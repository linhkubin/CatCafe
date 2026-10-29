LƯỢT 3 của demo sân sau. **Vẽ lại từ đầu bằng cách CHỈNH SỬA ẢNH BẢN KHỐI** art/review/l5_dev_check/layout/l5_block_backyard_clean.png: biến bản khối thành tranh bút chì, **giữ đúng vị trí, cỡ, đường chân tường của từng khối** (đây là edit target). Lý do: 2 lượt trước vẽ đẹp nhưng cả nửa dưới tụt xuống ~75px so với bản khối (chân rào y ≈ 899 thay vì 820, đáy thùng giấy y ≈ 1226 thay vì 1166), sửa từ ảnh cũ không dời được.

- Ảnh 1 (EDIT TARGET): art/review/l5_dev_check/layout/l5_block_backyard_clean.png. Mỗi khối thành đồ thật **trong đúng khung khối đó**. Chân hàng rào và chân cửa sau đúng **y 820** như ranh tường/sàn của khối. Đáy thùng giấy, nắp, dép **y ≈ 1166**; không đồ nào thấp hơn y 1170.
- Ảnh 2 (MẪU NHÌN): art/out/_refs/l5_demo_yard_v1.png — đồ vẽ **trông y như ảnh này** (Sữa, túi rác, bàn, gương, áo, chuông, cửa sau, thùng, nắp, dép, giao diện), chỉ khác vị trí theo ảnh 1. Bỏ cây sau rào của ảnh 2.
- Ảnh 3: art/ref/owner_l1_style_ref.png (chuẩn màu). Ảnh 4: art/out/cats/sua_ref.png. Ảnh 5: art/ref/l1_depth_angle_ref.png.

**Màu (2 lượt trước vượt p90 0.467 > 0.46):** Art đo thấy mảng gây vượt là **hàng rào và khung cửa sổ** (bão hoà ~0.5). Hàng rào là mảng lớn nhất: vẽ **kem mật ong rất nhạt, gần màu giấy kem** (khoảng #F6E6CC), nhạt hơn hẳn khung cửa sổ. Khung cửa sổ và cửa sau caramel nhạt (#E8C9A0). Trời rất nhạt (#E4EFF2). Dép và bàn giữ nhạt như ảnh 2.

**Giao diện (2 lượt trước sai):** đếm kỹ: tim + **SÁU (6) vòng tròn trống** (không phải 5). Bong bóng nhiệm vụ: **đầu mèo tô màu than tối #3E3838** (như silhouette mèo đen), dấu hỏi trắng trên đó. Túi đồ, ⏸, 💡, mũi tên ► như ảnh 2. Không vẽ lưới, khung đỏ, chữ.

**Trong quán sau kính:** chỉ mảng kem ấm mờ, không đồ vật.

Lưu vào **art/out/demo/l5_demo_yard_c.png**. Chạy `python tools/color_check.py art/out/demo/l5_demo_yard_c.png`. Tự kiểm ghi: y chân rào, y đáy thùng giấy, số vòng tròn, kết quả màu.

Đặc tả gốc lượt 1 bên dưới (danh sách đồ và vị trí vẫn đúng; phần ảnh tham chiếu và lưu file ở dưới thay bằng phần trên).

---

Vẽ ẢNH DEMO `l5_demo_yard` (Level 5 "Đốm sáng", sân sau lúc mở màn), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ). Đặc tả: art/design-art-level5.md mục 1–3 và 7.

## Ảnh tham chiếu (mở HẾT bằng view_image trước khi vẽ, đính kèm cho image_gen theo thứ tự)
1. art/review/l5_dev_check/layout/l5_block_backyard_clean.png — **BỐ CỤC BẮT BUỘC** (bản khối gameplay đã duyệt, cùng khung 1024x1536). Mỗi khối là một đồ; vẽ đồ thật **đúng chỗ, đúng cỡ** khối đó. Khối chỉ là hình đơn giản, KHÔNG chép màu hay nét khối.
2. art/ref/owner_l1_style_ref.png — **CHUẨN MÀU VÀ CHẤT CHÌ** (O6).
3. art/out/demo/l4_demo_living.png — demo level trước đã duyệt: cùng camera, cùng giao diện (tim, vòng, nút dừng, túi đồ, bóng đèn, mũi tên), cùng độ nhạt màu.
4. art/ref/l1_depth_angle_ref.png — góc nhìn chung (sofa level 1).
5. art/out/cats/sua_ref.png — Sữa.

## Cảnh: sân sau quán cafe, buổi chiều, lúc mở màn
Tường/nền (vẽ trong cảnh):
- Trời chiều y 0–300: xanh da trời rất nhạt pha kem, 1–2 đám mây kem. KHÔNG cam, không hoàng hôn.
- Hàng rào gỗ mật ong nhạt từ y ≈ 300 tới chân tường **y 820**, ván dọc to, ít chi tiết.
- Cửa sau quán bên phải x 905–1021, y 300–820 (cửa gỗ caramel nhạt).
- Sàn sân từ y 820: gạch vuông lớn kem xám ấm rất nhạt, vài đường ngang mờ.
- Hai cột gỗ mảnh x ≈ 473 và x ≈ 1005, từ y 200 tới 820; **dây phơi** mảnh nối hai cột ở y ≈ 230.
- Bậc cửa đá kem x 895–1015, y 985–1015.

Đồ (đúng khối trong ảnh 1):
- **Cửa sổ quán** x 74–426, y 364–756: khung gỗ caramel nhạt, kính xanh nhạt, phía trong quán hơi tối ấm. **Không có thanh dọc giữa kính**; chỉ một thanh ngang mảnh ở y ≈ 480.
  - **Sữa** (đúng sua_ref: mèo trắng xù, mắt xanh) ở trong quán, áp má và hai bàn chân trước vào kính, tò mò nhìn ra. Mặt khoảng x 189–313, y 577–713, chân và đáy khuất sau bậu cửa sổ.
- **Chuông gió** treo ở mép phải cửa sổ (x 430–500, y 360–508): đĩa gỗ nhỏ, 4–5 ống kim loại xanh xám nhạt, dây mảnh.
- **Áo phơi** bạc hà (x 627–775, y 238–374) treo trên dây, một **kẹp gỗ** nhỏ ở vai phải (x ≈ 745).
- **Bàn trang điểm** gỗ hồng phấn nhạt x 584–896, y 764–1006, mặt bàn thấy rõ (y ≈ 764), một ngăn kéo; **gương nhỏ** bầu dục có chân x 693–789, y 627–775 trên mặt bàn.
- **Chậu xương rồng** đất nung nhạt x 910–1000, y 868–990 trên bậc cửa; cây xương rồng xanh lá nhạt, chưa có hoa.
- **Túi rác đen** x 101–299, y 774–956: màu than ấm #3E3838 có vân chì, căng tròn như con mèo cuộn tròn, nút buộc phía trên trông như hai tai. Không đen tuyền.
- **Thùng giấy cũ** caramel nhạt x 319–581, y 976–1166, nắp mở hé, thấy mặt trên.
- **Nắp hộp bánh quy thiếc** tròn x 595–695, y 1062–1166 dựa nghiêng bên phải thùng: xám bạc nhạt, viền xanh da trời nhạt, 2 vệt kem trắng chỗ bóng.
- **Đôi dép tổ ong** xanh da trời nhạt x 177–291, y 1124–1166 bên trái thùng.

Giao diện (vẽ như ảnh 3, cùng cỡ và vị trí):
- Trên trái: tim hồng + **6 vòng tròn trống**.
- Bong bóng nhiệm vụ: mèo đen có dấu hỏi.
- Trên phải: nút ⏸ tròn.
- Dưới: **túi đồ 4 ô trống** (y ≈ 1183–1370) và nút bóng đèn 💡 bên phải.
- **Mũi tên ►** ở mép phải giữa (tâm ≈ 960, 760).

Không có nhân vật chính, không có Mun.

## Cỡ và màu (kiểm kỹ)
- Đồ đúng cỡ khối: thùng giấy rộng ~260px, bàn trang điểm rộng ~310px, cửa sổ rộng ~350px. Không thu nhỏ cảnh, không thêm đồ.
- Màu nhạt như ảnh 2 và ảnh 3: tường/rào/sàn là mảng nhạt nhất. Túi rác là mảng tối duy nhất nhưng vẫn có vân chì. Nghi ngờ thì nhạt hơn.

## Lưu và báo cáo
- Lưu vào: **art/out/demo/l5_demo_yard.png** (file mới). Gọi image_gen MỘT lần, 1024x1536, có nền, chép nguyên ảnh.
- Sau khi lưu chạy `python tools/color_check.py art/out/demo/l5_demo_yard.png` (nếu có), ghi kết quả.
- Trước khi gọi image_gen viết "Nhắc lại quy tắc"; tin cuối có "Tự kiểm" (đạt / không đạt + lý do): bố cục đúng khối, cỡ đồ, góc nhìn sofa, màu O6, nét, Sữa đúng ref, túi rác không đen tuyền, giao diện, không chữ. Kèm SAVED và prompt cuối.

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
