SỬA THEO MUN MẶT TRÒN — lượt `mun_g32_a` (Level 5, G5-32), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ; như lượt "TÁCH TỪ DEMO": **mỗi món một lần gọi image_gen, mỗi món một ảnh**).

Chủ dự án đã duyệt Mun **mặt tròn**: ảnh chuẩn mới **art/out/cats/mun_ref.png** (viền đầu gần tròn, má phình đều hai bên, cằm bo tròn; tai, mắt, lông, đuôi, dáng thon chân dài như Mun cũ). Bản Mun cũ để so: art/out/_refs/mun_ref_old_g16.png. Mọi tư thế Mun trong game phải đổi theo mặt tròn này.

**Ảnh demo gốc của lượt: art/out/demo/l5_demo_alley_g26.png** (hẻm, Mun ló mặt ở mép gầm xe ba gác x 640–760, y 1040–1140; thêm art/out/demo/l5_demo_reveal_ext.png để xem Mun cả con).

## Luật chung cho mọi món
- Mỗi món là **CHỈNH SỬA TỪ ẢNH** nguồn cũ ghi ở món đó (trừ món ghi "vẽ mới"): **giữ nguyên cỡ khung, vị trí, tư thế, thân, chân, đuôi, góc nhìn, màu lông, vân chì, nét, mắt (cỡ, màu, chấm sáng), tai, mũi, miệng, ria, má hồng.**
- **Chỉ đổi đầu và mặt cho tròn như mun_ref mới:** viền đầu gần tròn, má phình đều hai bên, cằm bo tròn, không thon nhọn về cằm; mặt rộng thêm khoảng 5–8% là đủ. Nét mặt giữ đúng cỡ, chỉ dời cho cân giữa mặt tròn.
- Nền TRONG SUỐT thật (cả trong kẽ chân, kẽ đuôi). Chỉ đúng một món. Không bóng sàn, không quầng, không viền trắng, không chữ, không số.
- Lưu từng món vào đúng tên ghi ở món (file mới, không ghi đè). Chép nguyên ảnh image_gen trả về, không cắt, không xử lý.
- Trước mỗi lần gọi image_gen viết "Nhắc lại quy tắc" (phong cách, góc nhìn, màu, nét, phần giữ / phần đổi của món). Tin nhắn cuối có "Tự kiểm" **từng món** (giữ nguyên tư thế và cỡ; đầu mặt tròn như mun_ref; nền trong suốt; không chữ; không quầng: đạt / không đạt + lý do), SAVED từng file, prompt cuối từng món.

## Ảnh tham chiếu chung (mở hết bằng view_image, đính kèm mỗi lần gọi)
1. art/out/demo/l5_demo_alley_g26.png — **ẢNH DEMO GỐC**.
2. art/out/cats/mun_ref.png — **Mun mặt tròn (chuẩn mới)**.
3. art/out/_refs/mun_ref_old_g16.png — Mun cũ (để thấy chỗ khác: chỉ đầu mặt).
4. art/ref/owner_l1_style_ref.png — chuẩn màu và chất chì.
5. art/ref/l1_depth_angle_ref.png — góc nhìn.
Cộng ảnh nguồn của từng món (ẢNH CẦN CHỈNH SỬA, đính kèm đầu tiên khi gọi món đó).

## Danh sách món

### 1. `mun_peek_out` → **art/out/_sheets/l5src_mun_peek_out_g32.png** (1024x1024)
- CHỈNH SỬA TỪ ẢNH art/out/_sheets/l5src_mun_peek_out.png. Mun ló mặt: đầu, hai tai, hai bàn chân trước tì xuống, mắt vàng to nhìn lên phải. Đáy là đường ngang dưới hai bàn chân.
- Đổi: đầu tròn như mun_ref. Hai mắt **giữ đúng cỡ và khoảng cách** như ảnh nguồn (Art sẽ lấy đôi mắt này làm "mắt dưới gầm").
- Trong game hiển thị rộng 106 → ảnh cắt ra ≈ 160 rộng.

### 2. `mun_paw_reach` → **art/out/_sheets/l5src_mun_paw_reach_g32.png** (1024x1024) — VẼ MỚI
- Chân cũ (art/out/_sheets/l5src_mun_paw_reach.png) **quá dài, quá to**, trông như cánh tay thò ra. Vẽ lại: **một chân trước đen NGẮN, TRÒN, MŨM MĨM** của chính Mun ở món 1, thò ngang sang phải ra khỏi gầm xe một đoạn ngắn.
- Tỉ lệ: **dài chỉ khoảng 2 lần bề dày chân** (đo từ gốc tới đầu bàn chân). Bàn chân tròn to so với cẳng, **đệm chân hồng to tròn dễ thương** (1 đệm lớn + 4 đệm ngón tròn), lông than ấm có vân chì như Mun.
- Cỡ so với Mun: bàn chân rộng xấp xỉ **1/3 bề ngang đầu** Mun ở món 1 (bằng cỡ bàn chân trước của Mun trong mun_ref).
- Gốc chân bên trái **cắt thẳng đứng** (phần khuất trong gầm), đầu bàn chân bên phải. Đặt nằm ngang giữa ảnh, chiếm khoảng 60% bề ngang khung.
- Trong game hiển thị rộng ≈ 70 → ảnh cắt ra ≈ 105 rộng.

### 3. `mun_run` → **art/out/_sheets/l5src_mun_run_g32.png** (1024x1024)
- CHỈNH SỬA TỪ ẢNH art/out/_sheets/l5src_mun_run.png. Mun chạy sang phải nhìn nghiêng, thân duỗi, 4 chân dang, đuôi dài ra sau.
- Đổi: đầu (nhìn nghiêng ba phần tư) tròn hơn, má phình, cằm bo, như mun_ref tư thế đi.
- Hiển thị rộng 276 → ảnh cắt ≈ 414.

### 4. `mun_pounce` → **art/out/_sheets/l5src_mun_pounce_g32.png** (1024x1024)
- CHỈNH SỬA TỪ ẢNH art/out/_sheets/l5src_mun_pounce.png. Mun phóng vồ sang phải, hai chân trước duỗi, đuôi cong lên.
- Đổi: đầu mặt tròn như mun_ref.
- Hiển thị rộng 253 → ảnh cắt ≈ 380.

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
