VẼ TỜ `l5v1_bag_sheet` (Level 5, tách ảnh từ demo đã duyệt G5-22), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

## Luật tách ảnh (G4-22, G4-26, G5-22; chủ dự án: "tách cái nào hãy gửi lại demo của cái đó và promt thấy kỹ đừng để tách sai so với demo")
- Đây là **CHỈNH SỬA ẢNH** art/ref/l5_cut/l5v1_bag_sheet.png: trong đó Art đã dán **ảnh cắt phóng to của từng món từ demo đã duyệt**. **Vẽ lại đúng món này: cùng hình dáng, tỉ lệ, màu, chi tiết, nét như demo.** Không tự thiết kế lại, không làm đẹp thêm, **không thêm, không bớt chi tiết**, không đổi màu (không nhạt hơn, không đậm hơn), không đổi góc nhìn.
- Kết quả: **nền TRONG SUỐT thật** (alpha). Xoá hết nền demo (tường, sàn, trời) và **mọi đồ khác lọt vào ảnh cắt** (ghi rõ ở từng món). Chỗ bị đồ khác che thì **vẽ bù** cho liền, đúng thiết kế.
- Mỗi món **nằm trong vùng của nó** (toạ độ dưới), giữ đúng chỗ và cỡ như trong ảnh đầu vào, cách món khác và mép ảnh ≥ 40px. Không khung, không số, không chữ.
- Không bóng sàn, không quầng sáng, không viền trắng quanh vật.
- Gọi image_gen MỘT lần, cỡ 1536x1024, chép nguyên ảnh vào **art/out/_sheets/l5v1_bag_sheet.png** (file mới, không ghi đè). Không tự cắt, không xử lý.
- Trước khi gọi image_gen viết "Nhắc lại quy tắc" (phong cách, góc nhìn, màu, nét, và **từng điểm dễ sai** ở dưới). Tin nhắn cuối có "Tự kiểm": **từng món** giống demo về hình, tỉ lệ, màu, chi tiết (đạt / không đạt + lý do), đã xoá đồ khác, nền trong suốt, không chữ. Kèm SAVED và prompt cuối.

## Ảnh tham chiếu (mở HẾT bằng view_image trước khi vẽ, đính kèm cho image_gen theo thứ tự)
1. art/ref/l5_cut/l5v1_bag_sheet.png — **ẢNH CẦN CHỈNH SỬA** (ảnh cắt từ demo, phóng to)
2. art/out/demo/l5_demo_yard_916.png — **ẢNH DEMO GỐC** phòng sân sau (mở xem món nằm trong cảnh: cỡ so với đồ xung quanh, màu, nét)
3. art/ref/owner_l1_style_ref.png — chuẩn màu và chất chì
4. art/ref/l1_depth_angle_ref.png — góc nhìn chung (sofa L1)

## Từng món trên tờ

### `l5_trash_bag_idle` — vùng x 50–697, y 60–617 (phóng ×2.2 từ demo)
- ảnh demo gốc: art/out/demo/l5_demo_yard_916.png (vùng chơi không UI: art/out/demo/l5_demo_yard_play.png), món cần vẽ nằm ở x 52–346, y 815–1068 trong art/out/demo/l5_demo_yard_play.png (phòng sân sau); ảnh cắt đúng món: art/ref/l5_cut/crops/trash_bag.png.
- Vẽ lại đúng món này: cùng hình dáng, tỉ lệ, màu, chi tiết, nét.
- Túi rác đen căng tròn, nút buộc trên đỉnh như hai tai mèo, màu than ấm có vân chì (không đen tuyền). Xoá sàn và hàng rào, cửa sổ phía sau.

### `l5_trash_bag_after` — vùng x 760–1480, y 60–620
- Trạng thái sau khi chạm: **cùng một túi rác**, cùng màu, cùng nét, **cùng đường đáy và cùng bề rộng đáy** với túi bên trái, nhưng **xẹp xuống** (thấp còn ~60%), nút buộc đã tuột mở, miệng túi hé ra mềm. Không có rác lòi ra. Nền trong suốt.

### `l5_slippers` — vùng x 60–607, y 690–968 (phóng ×2.4 từ demo)
- ảnh demo gốc: art/out/demo/l5_demo_yard_916.png (vùng chơi không UI: art/out/demo/l5_demo_yard_play.png), món cần vẽ nằm ở x 72–300, y 1160–1276 trong art/out/demo/l5_demo_yard_play.png (phòng sân sau); ảnh cắt đúng món: art/ref/l5_cut/crops/slippers.png.
- Vẽ lại đúng món này: cùng hình dáng, tỉ lệ, màu, chi tiết, nét.
- Đôi dép tổ ong xanh lam, nhiều lỗ tròn trên mũi dép, đặt cạnh nhau. Xoá sàn gạch.

### `l5_slippers_flipped` — vùng x 700–1480, y 690–980
- Trạng thái sau khi chạm: **cùng đôi dép**, cùng màu xanh lam, cùng cỡ, cùng đường đáy, nhưng **một chiếc lật ngửa** (thấy đế dép caramel nhạt có vân), chiếc kia vẫn úp; giữa hai chiếc lộ ra **một túi giấy nhỏ đựng cá khô** (túi kem, 2–3 con cá khô màu mật ong thò ra). Nền trong suốt.

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
