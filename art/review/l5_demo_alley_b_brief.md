LƯỢT 2 của demo hẻm. **Vẽ lại bằng cách CHỈNH SỬA ẢNH BẢN KHỐI** art/review/l5_dev_check/layout/l5_block_alley_placed_clean.png: biến bản khối thành tranh bút chì, **giữ đúng vị trí, cỡ, đường chân tường của từng khối** (edit target). Cách này đã làm đúng cho demo sân sau.

Lượt 1 (art/out/_refs/l5_demo_alley_v1.png) vẽ ĐẸP, màu đạt, Mun đúng. Nhưng nửa dưới tụt ~40px: chân tường y ≈ 807 thay vì 790, đáy xe ba gác ≈ 1200, Mun ≈ 1215, vũng nước ≈ 1190 (từ y 1183 là túi đồ trong game, đồ không được xuống đó). Bạt cuộn ở y 235–320, dày hơn khối (đúng: y 212–268).

- Ảnh 1 (EDIT TARGET): art/review/l5_dev_check/layout/l5_block_alley_placed_clean.png. Mỗi khối thành đồ thật **trong đúng khung khối đó**. **Bỏ hết các đường tia sáng chéo** trong ảnh khối (code vẽ), chỉ giữ dải nắng từ bạt xuống A và đốm sáng trước gầm. Chân tường **y 790**. Đáy xe ba gác, bánh xe, Mun, ống nước **≤ y 1170**.
- Ảnh 2 (MẪU NHÌN): art/out/_refs/l5_demo_alley_v1.png. Mọi đồ **trông y như ảnh này** (quạ, bạt sọc, tường gạch, thạch sùng, móc, gương trên bậu, cửa sổ và ống bơ, xe đạp đỏ hồng có giỏ mây và đĩa CD, xe ba gác xanh, Mun ló mặt, đốm sáng, ống nước, vũng nước, giao diện), chỉ khác vị trí theo ảnh 1. Bạt cuộn mảnh như khối (cao ~56px), 5–6 sọc to.
- Ảnh 3: art/ref/owner_l1_style_ref.png. Ảnh 4: art/out/cats/mun_ref.png (Mun). Ảnh 5: art/ref/l1_depth_angle_ref.png.
- Mun ló mặt: đầu, hai tai, hai bàn chân trước ở mép phải gầm, x 713–829, đáy y ≈ 1168, nhìn lên phải về giỏ xe đạp.
- Giao diện: tim + **SÁU (6) vòng trống** (lượt 1 đúng 6, giữ). Bong bóng nhiệm vụ đầu mèo than tối, **dấu hỏi màu TRẮNG**. Mũi tên ◄ trái, ⏸, túi 4 ô trống, 💡.

Lưu vào **art/out/demo/l5_demo_alley.png**. Chạy `python tools/color_check.py art/out/demo/l5_demo_alley.png`. Tự kiểm ghi: y chân tường, y đáy xe ba gác, y đáy Mun, số vòng tròn, kết quả màu.

Đặc tả gốc lượt 1 bên dưới (danh sách đồ và vị trí vẫn đúng; phần ảnh tham chiếu ở dưới thay bằng phần trên).

---

Vẽ ẢNH DEMO `l5_demo_alley` (Level 5 "Đốm sáng", con hẻm lúc đã kéo bạt), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ). Đặc tả: art/design-art-level5.md mục 1–3 và 7.

## Ảnh tham chiếu (mở HẾT bằng view_image trước khi vẽ, đính kèm cho image_gen theo thứ tự)
1. art/review/l5_dev_check/layout/l5_block_alley_placed_clean.png — **BỐ CỤC BẮT BUỘC** (bản khối gameplay đã duyệt, cùng khung 1024x1536). Mỗi khối là một đồ; vẽ đồ thật **đúng chỗ, đúng cỡ** khối đó. Khối chỉ là hình đơn giản, KHÔNG chép màu khối. **Các đường tia sáng vàng chéo trong ảnh khối là code vẽ: KHÔNG vẽ tia**.
2. art/ref/owner_l1_style_ref.png — **CHUẨN MÀU VÀ CHẤT CHÌ** (O6).
3. art/out/_refs/l5_demo_yard_v1.png — demo sân sau cùng level (cùng tay vẽ, cùng giao diện, cùng buổi chiều). Hẻm phải trông cùng bộ với ảnh này.
4. art/out/cats/mun_ref.png — **Mun** (mèo đen than ấm có vân chì, mắt vàng mật ong to, tai hơi to dựng hơi nghiêng ra). Dùng đúng nhân vật này.
5. art/ref/l1_depth_angle_ref.png — góc nhìn chung (sofa level 1).

## Cảnh: con hẻm sau quán, buổi chiều, **bạt đã cuộn lên, nắng đã xuống**
Nền (vẽ trong cảnh):
- Trời y 0–200: xanh da trời rất nhạt pha kem, không cây.
- **Dây điện** đen nâu mảnh cong võng y ≈ 175–190 ngang ảnh.
- Tường đối diện y 200–**790**: vữa kem hồng đào rất nhạt ở trên, **gạch to nhạt** (ít viên, nét mảnh) từ y ≈ 400.
- Sàn hẻm từ y 790: xi măng kem xám ấm nhạt, vài đường nứt/ngang mờ.
- **Bậu tường B**: một thanh gờ gạch/gỗ nhạt x 410–630, y 605–627.
- **Cửa sổ hẻm** nhỏ x 645–775, y 420–532, kính xanh nhạt, bậu x 632–788, y 532–546.
- **Móc tường** nhỏ ở (95, 455).

Đồ (đúng khối trong ảnh 1):
- **Bạt mái hiên đã cuộn**: cuộn vải sọc to (3–5 sọc hồng đào nhạt và kem) nằm ngang x 84–940, y 212–268, có 2 giá đỡ nhỏ.
- **Dải nắng** từ mép bạt xuống điểm A: hình thang hẹp bơ vàng **rất nhạt, trong** (x ≈ 158–202 ở trên, x ≈ 126–234 ở dưới), vân chì dọc, mép mờ bằng nét chì; đáy là vệt elip vàng nhạt trên đất quanh (180, 1000). Không glow, không chói.
- **Nắp thiếc** đã đặt ở A: dựng nghiêng ~20° trên đất trong vệt nắng, x 122–208, y 916–1004, xám bạc nhạt viền xanh da trời nhạt, 2 vệt kem trắng chỗ bóng.
- **Gương nhỏ** có chân đã đặt ở B: đứng nghiêng trên bậu, x 464–540, y 503–595.
- **Xe đạp cũ** dựng tường bên phải x 630–868, y 761–903, khung hồng đào/san hô nhạt, bánh xám nâu nhạt, yên nâu, **giỏ mây** caramel ở đầu xe trên bánh trước (x ≈ 818–866, y ≈ 781–809), chuông nhỏ trên ghi đông. **Đĩa CD** gác nghiêng trong giỏ, phần trên đĩa thò lên khỏi miệng giỏ (x ≈ 786–868, y ≈ 718–786): đĩa bạc nhạt có lỗ giữa, vài vệt cầu vồng pastel rất nhạt.
- **Xe ba gác** x 452–828, y 924–1166: thùng gỗ/tôn xanh da trời nhạt (thùng y 924–1080), 2 bánh xám nâu; **gầm xe** x 485–795, y 1080–1165 tô **nâu than ấm đậm có vân chì** (tối nhất cảnh nhưng không đen tuyền).
- **Mun ló mặt** ở mép phải gầm: đầu và hai tai Mun (đúng mun_ref) thò ra, x 713–829, y 1062–1168, mắt vàng to mở tròn nhìn lên phải về phía giỏ xe đạp, hai bàn chân trước bám mép, vẻ tò mò rụt rè. Thân khuất trong gầm.
- **Đốm sáng** trên đất ngay trước gầm bên phải, tâm (872, 1130), tròn ~96px: đĩa bơ vàng nhạt, tâm kem trắng, mép mềm bằng nét chì li ti, không viền nâu đậm, không glow.
- **Ống thoát nước** xám xanh nhạt sát mép phải x 934–1016, y 414–1162, có khuỷu ở chân.
- **Vũng nước** nhỏ xanh da trời nhạt góc trái dưới x 32–178, y 1105–1145.
- **Thạch sùng** nâu nhạt trên tường x 310–350, y 414–530, đầu hướng lên, đuôi cong như đuôi mèo.
- **Ống bơ sữa** nhỏ trên bậu cửa sổ hẻm x 685–731, y 479–545 (nhãn trơn, không chữ).
- **Quạ** đen than (vân chì, không đen tuyền) đậu trên dây điện x 257–353, y 100–188.

Giao diện (như ảnh 3, cùng cỡ và vị trí): tim + **6 vòng trống**; bong bóng nhiệm vụ đầu mèo than tối có dấu hỏi trắng; nút ⏸; **túi đồ 4 ô trống**; 💡; **mũi tên ◄** ở mép trái giữa (tâm ≈ 64, 760).

Không có nhân vật chính. Không vẽ tia phản chiếu, quầng sáng, chấm nắng li ti (code làm).

## Cỡ và màu (kiểm kỹ)
- Đồ đúng cỡ và chỗ khối. **Không đồ nào dưới y 1170.** Không thêm đồ ngoài danh sách.
- Màu nhạt như ảnh 2 và 3: tường và sàn là mảng nhạt nhất. Mảng tối chỉ có gầm xe, Mun, quạ, đều có vân chì. Nghi ngờ thì nhạt hơn.

## Lưu và báo cáo
- Lưu vào: **art/out/demo/l5_demo_alley.png** (file mới). Gọi image_gen MỘT lần, 1024x1536, có nền, chép nguyên ảnh.
- Chạy `python tools/color_check.py art/out/demo/l5_demo_alley.png`, ghi kết quả.
- "Nhắc lại quy tắc" trước khi vẽ; "Tự kiểm" cuối (đạt / không đạt + lý do): bố cục đúng khối (ghi y chân tường đo được), cỡ đồ, góc nhìn sofa, màu O6, nét, Mun đúng mun_ref, không tia/quầng, giao diện, không chữ. Kèm SAVED và prompt cuối.

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
