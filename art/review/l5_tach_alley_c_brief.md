TÁCH TỪ DEMO — lượt `alley_c` (Level 5, G5-22, G5-23), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ; ngoại lệ "TÁCH TỪ DEMO": mỗi món một lần gọi image_gen, mỗi món một ảnh).

**Ảnh demo gốc của lượt này: art/out/demo/l5_demo_alley_916.png** (phòng hẻm, khung điện thoại); vùng chơi không giao diện: **art/out/demo/l5_demo_alley_ext.png** (1024x1536, toạ độ bên dưới tính trên ảnh này).
Chủ dự án: "tách cái nào hãy gửi lại demo của cái đó và promt thấy kỹ đừng để tách sai so với demo".

## Luật chung cho mọi món
- **Vẽ lại đúng món trong demo: cùng hình dáng, tỉ lệ, màu, chi tiết, nét.** Không tự thiết kế lại, không làm đẹp thêm, **không thêm, không bớt chi tiết**, màu **không nhạt hơn, không đậm hơn** demo, cùng góc nhìn.
- Mỗi món: gọi image_gen **một lần**, đính kèm ảnh demo gốc + ảnh cắt của món đó (nếu có) + các ảnh tham chiếu ở dưới. **Nền TRONG SUỐT thật.** Món nằm giữa ảnh, to vừa khung (chiếm ~70–80% chiều dài khung), cách mép ≥ 40px, không bị cắt.
- **Chỉ đúng một món** trong ảnh. Không lấy đồ chồng lên, đồ phía sau, nền, bóng, quầng, tia, đốm sáng (trừ khi món chính là nó). Chỗ bị che: vẽ bù đúng thiết kế.
- Không chữ, không số, không khung, không bóng sàn, không viền trắng.
- Lưu từng món vào **art/out/_sheets/l5src_<key>.png** (đúng tên dưới; file mới, không ghi đè). Chép nguyên ảnh, không cắt, không xử lý.
- **Trạng thái "chỉnh sửa từ món vừa tách"**: dùng chế độ chỉnh sửa trên ảnh `l5src_` của món đó vừa lưu: **giữ nguyên cỡ khung, vị trí, góc nhìn, màu, nét**, chỉ đổi đúng phần ghi.
- Trước mỗi lần gọi image_gen viết "Nhắc lại quy tắc" (phong cách, góc nhìn, màu, nét, phần lấy / không lấy của món). Tin nhắn cuối có "Tự kiểm" **từng món** (giống demo về hình, tỉ lệ, màu, chi tiết; đã bỏ phần không lấy; nền trong suốt; không chữ: đạt / không đạt + lý do), SAVED từng file, prompt cuối từng món.

## Ảnh tham chiếu chung (mở hết bằng view_image)
1. art/out/demo/l5_demo_alley_916.png — **ẢNH DEMO GỐC**.
2. art/out/demo/l5_demo_alley_ext.png — vùng chơi của demo (đo toạ độ).
3. art/ref/owner_l1_style_ref.png — chuẩn màu và chất chì.
4. art/ref/l1_depth_angle_ref.png — góc nhìn (sofa L1).

## Danh sách 5 món

### 1. `l5_mirror_placed` → art/out/_sheets/l5src_l5_mirror_placed.png (1024x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l5_demo_alley_916.png, món cần vẽ nằm ở x 456–558, y 521–651 trong art/out/demo/l5_demo_alley_ext.png.** Vẽ lại đúng món này: cùng hình dáng, tỉ lệ, màu, chi tiết, nét.
- Ảnh cắt từ demo: art/ref/l5_cut/crops/mirror_b.png (đính kèm).
- Gương nhỏ bầu dục khung gỗ, chân đứng, **đứng nghiêng** đúng như trên bậu tường B.
- **KHÔNG lấy bậu gỗ** (bậu là nền) và tường. Đáy đế gương là đáy món. Cùng thiết kế với gương ở sân sau.

### 2. `l5_tin_lid_placed` → art/out/_sheets/l5src_l5_tin_lid_placed.png (1024x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l5_demo_alley_916.png, món cần vẽ nằm ở x 148–290, y 908–1046 trong art/out/demo/l5_demo_alley_ext.png.** Vẽ lại đúng món này: cùng hình dáng, tỉ lệ, màu, chi tiết, nét.
- Ảnh cắt từ demo: art/ref/l5_cut/crops/tin_lid_a.png (đính kèm).
- **Nắp hộp bánh quy thiếc xanh lam** dựng nghiêng ở điểm A: viền gờ, bánh quy in nổi (mèo, tròn, hoa) mật ong nhạt. **Không bóng như gương.**
- **KHÔNG lấy dải nắng vàng** và vệt sáng trên đất (code vẽ), không lấy sàn.

### 3. `l5_sunbeam` → art/out/_sheets/l5src_l5_sunbeam.png (1024x1536, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l5_demo_alley_916.png, món cần vẽ nằm ở x 134–306, y 334–1046 trong art/out/demo/l5_demo_alley_ext.png.** Vẽ lại đúng món này: cùng hình dáng, tỉ lệ, màu, chi tiết, nét.
- Ảnh cắt từ demo: art/ref/l5_cut/crops/sunbeam.png (đính kèm).
- **Dải nắng** hẹp bơ vàng **nhạt, trong** (alpha bán trong suốt ~55–65%), vân chì dọc, mép mờ bằng nét chì, đầu trên hẹp, đáy rộng có **vệt elip vàng nhạt** trên đất. Ảnh dọc 1024x1536, dải nắng ở giữa, cao gần đủ ảnh.
- **KHÔNG lấy nắp thiếc** ở đáy (vẽ bù vệt sáng), không lấy tường, sàn. Không glow.

### 4. `l5_light_spot` → art/out/_sheets/l5src_l5_light_spot.png (1024x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l5_demo_alley_916.png, món cần vẽ nằm ở x 740–858, y 1088–1154 trong art/out/demo/l5_demo_alley_ext.png.** Vẽ lại đúng món này: cùng hình dáng, tỉ lệ, màu, chi tiết, nét.
- Ảnh cắt từ demo: art/ref/l5_cut/crops/light_spot.png (đính kèm).
- **Đốm sáng** trên đất: elip bơ vàng nhạt, tâm kem sáng, mép mềm bằng nét chì li ti, không viền nâu, không glow.
- Không lấy sàn, bánh xe, Mun.

### 5. `l5_icon_sun_covered` → art/out/_sheets/l5src_l5_icon_sun_covered.png (1024x1024, nền trong suốt)
- Món mới (không có trong demo), cùng nét và màu demo: **biểu tượng mặt trời bơ vàng tròn có tia ngắn, bị một đám mây kem bo tròn che nửa dưới**. Nét nâu, vân chì, đơn giản, dễ đọc ở cỡ nhỏ (dùng trong bong bóng suy nghĩ). Không chữ.

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
