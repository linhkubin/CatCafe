VẼ TỜ `l5v1_alley_small_sheet` (Level 5, tách ảnh từ demo đã duyệt G5-22), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

## Luật tách ảnh (G4-22, G4-26, G5-22; chủ dự án: "tách cái nào hãy gửi lại demo của cái đó và promt thấy kỹ đừng để tách sai so với demo")
- Đây là **CHỈNH SỬA ẢNH** art/ref/l5_cut/l5v1_alley_small_sheet.png: trong đó Art đã dán **ảnh cắt phóng to của từng món từ demo đã duyệt**. **Vẽ lại đúng món này: cùng hình dáng, tỉ lệ, màu, chi tiết, nét như demo.** Không tự thiết kế lại, không làm đẹp thêm, **không thêm, không bớt chi tiết**, không đổi màu (không nhạt hơn, không đậm hơn), không đổi góc nhìn.
- Kết quả: **nền TRONG SUỐT thật** (alpha). Xoá hết nền demo (tường, sàn, trời) và **mọi đồ khác lọt vào ảnh cắt** (ghi rõ ở từng món). Chỗ bị đồ khác che thì **vẽ bù** cho liền, đúng thiết kế.
- Mỗi món **nằm trong vùng của nó** (toạ độ dưới), giữ đúng chỗ và cỡ như trong ảnh đầu vào, cách món khác và mép ảnh ≥ 40px. Không khung, không số, không chữ.
- Không bóng sàn, không quầng sáng, không viền trắng quanh vật.
- Gọi image_gen MỘT lần, cỡ 1536x1024, chép nguyên ảnh vào **art/out/_sheets/l5v1_alley_small_sheet.png** (file mới, không ghi đè). Không tự cắt, không xử lý.
- Trước khi gọi image_gen viết "Nhắc lại quy tắc" (phong cách, góc nhìn, màu, nét, và **từng điểm dễ sai** ở dưới). Tin nhắn cuối có "Tự kiểm": **từng món** giống demo về hình, tỉ lệ, màu, chi tiết (đạt / không đạt + lý do), đã xoá đồ khác, nền trong suốt, không chữ. Kèm SAVED và prompt cuối.

## Ảnh tham chiếu (mở HẾT bằng view_image trước khi vẽ, đính kèm cho image_gen theo thứ tự)
1. art/ref/l5_cut/l5v1_alley_small_sheet.png — **ẢNH CẦN CHỈNH SỬA** (ảnh cắt từ demo, phóng to)
2. art/out/demo/l5_demo_alley_916.png — **ẢNH DEMO GỐC** phòng hẻm (mở xem món nằm trong cảnh: cỡ so với đồ xung quanh, màu, nét)
3. art/ref/owner_l1_style_ref.png — chuẩn màu và chất chì
4. art/ref/l1_depth_angle_ref.png — góc nhìn chung (sofa L1)

## Từng món trên tờ

### `l5_crow_idle` — vùng x 50–386, y 60–354 (phóng ×3.0 từ demo)
- ảnh demo gốc: art/out/demo/l5_demo_alley_916.png (vùng chơi không UI: art/out/demo/l5_demo_alley_ext.png), món cần vẽ nằm ở x 264–376, y 182–280 trong art/out/demo/l5_demo_alley_ext.png (phòng hẻm); ảnh cắt đúng món: art/ref/l5_cut/crops/crow.png.
- Vẽ lại đúng món này: cùng hình dáng, tỉ lệ, màu, chi tiết, nét.
- Quạ tròn mũm mĩm như chim bông, than ấm có vân chì, mỏ vàng mật ong, mắt trắng chấm đen, má hồng nhẹ. Hai chân bám **trên một đoạn dây điện ngắn** — **xoá dây điện** (dây thuộc nền), chỉ còn quạ với hai chân co. Xoá trời.

### `l5_crow_far` — vùng x 1050–1480, y 330–700
- **Cùng con quạ** (cùng màu, cùng nét, cùng tỉ lệ ×3) nhưng **quay đầu sang trái**, cánh khép, đậu xa hơn trên dây (không vẽ dây). Nền trong suốt.

### `l5_gecko` — vùng x 480–732, y 60–528 (phóng ×3.6 từ demo)
- ảnh demo gốc: art/out/demo/l5_demo_alley_916.png (vùng chơi không UI: art/out/demo/l5_demo_alley_ext.png), món cần vẽ nằm ở x 298–368, y 466–596 trong art/out/demo/l5_demo_alley_ext.png (phòng hẻm); ảnh cắt đúng món: art/ref/l5_cut/crops/gecko.png.
- Vẽ lại đúng món này: cùng hình dáng, tỉ lệ, màu, chi tiết, nét.
- Thạch sùng nâu caramel, đầu hướng lên, 4 chân xoè, chấm lưng nhạt, **đuôi dài cong như đuôi mèo**. Xoá tường.

### `l5_milk_can` — vùng x 800–1110, y 60–391 (phóng ×3.6 từ demo)
- ảnh demo gốc: art/out/demo/l5_demo_alley_916.png (vùng chơi không UI: art/out/demo/l5_demo_alley_ext.png), món cần vẽ nằm ở x 672–758, y 519–611 trong art/out/demo/l5_demo_alley_ext.png (phòng hẻm); ảnh cắt đúng món: art/ref/l5_cut/crops/milk_can.png.
- Vẽ lại đúng món này: cùng hình dáng, tỉ lệ, màu, chi tiết, nét.
- Ống bơ sữa tròn kem, nắp và đáy viền, dải nhãn hồng nhạt trơn (không chữ). Xoá kính cửa sổ và bậu phía sau.

### `l5_puddle` — vùng x 1120–1507, y 120–261 (phóng ×2.2 từ demo)
- ảnh demo gốc: art/out/demo/l5_demo_alley_916.png (vùng chơi không UI: art/out/demo/l5_demo_alley_ext.png), món cần vẽ nằm ở x 80–256, y 1074–1138 trong art/out/demo/l5_demo_alley_ext.png (phòng hẻm); ảnh cắt đúng món: art/ref/l5_cut/crops/puddle.png.
- Vẽ lại đúng món này: cùng hình dáng, tỉ lệ, màu, chi tiết, nét.
- Vũng nước xanh nhạt dẹt, mép lượn, 1–2 vệt sáng kem. Xoá sàn xi măng.

### `l5_mirror_placed` — vùng x 60–407, y 520–962 (phóng ×3.4 từ demo)
- ảnh demo gốc: art/out/demo/l5_demo_alley_916.png (vùng chơi không UI: art/out/demo/l5_demo_alley_ext.png), món cần vẽ nằm ở x 456–558, y 521–651 trong art/out/demo/l5_demo_alley_ext.png (phòng hẻm); ảnh cắt đúng món: art/ref/l5_cut/crops/mirror_b.png.
- Vẽ lại đúng món này: cùng hình dáng, tỉ lệ, màu, chi tiết, nét.
- Gương nhỏ bầu dục khung gỗ, chân đứng, **đứng nghiêng** đúng như trên bậu tường B. Xoá bậu gỗ (bậu thuộc nền) và tường; đáy đế gương là đáy món.
- Cùng thiết kế với gương ở sân sau.

### `l5_tin_lid_placed` — vùng x 520–974, y 520–962 (phóng ×3.2 từ demo)
- ảnh demo gốc: art/out/demo/l5_demo_alley_916.png (vùng chơi không UI: art/out/demo/l5_demo_alley_ext.png), món cần vẽ nằm ở x 148–290, y 908–1046 trong art/out/demo/l5_demo_alley_ext.png (phòng hẻm); ảnh cắt đúng món: art/ref/l5_cut/crops/tin_lid_a.png.
- Vẽ lại đúng món này: cùng hình dáng, tỉ lệ, màu, chi tiết, nét.
- **Nắp hộp bánh quy thiếc xanh lam** dựng nghiêng ở điểm A: viền gờ, bánh quy in nổi (mèo, tròn, hoa) mật ong nhạt. **Không bóng như gương.**
- **Xoá dải nắng vàng** và vệt sáng trên đất (code vẽ), xoá sàn. Chỉ còn cái nắp.

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
