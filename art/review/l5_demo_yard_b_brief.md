CHỈNH SỬA TỪ ẢNH art/out/_refs/l5_demo_yard_v1.png (demo sân sau Level 5, lượt 2), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

Art 2D đã xem lượt 1: **phong cách, nét, chất chì, góc nhìn, Sữa trong cửa sổ, túi rác, bàn trang điểm, gương, áo, chuông gió, cửa sau đều ĐẸP, giữ nguyên hình và màu.** Chỉ sửa bố cục, trời và giao diện như dưới.

## Ảnh tham chiếu (mở hết bằng view_image, đính kèm theo thứ tự)
1. art/out/_refs/l5_demo_yard_v1.png — **ẢNH CẦN CHỈNH SỬA**.
2. art/ref/l5_yard_layout_overlay.png — lượt 1 vẽ chồng **khung đỏ = chỗ đúng của từng đồ** (theo bản khối gameplay đã duyệt), **đường xanh dương = chân hàng rào đúng (y 820)**. Ảnh này chỉ để đo, KHÔNG vẽ khung hay đường vào kết quả.
3. art/review/l5_dev_check/layout/l5_block_backyard_clean.png — bản khối gốc.
4. art/ref/owner_l1_style_ref.png — chuẩn màu.
5. art/out/demo/l4_demo_living.png — giao diện chuẩn.

## Cần sửa
1. **Chân hàng rào lên y ≈ 820** (lượt 1 ở y ≈ 895). Sàn sân bắt đầu từ y 820. Cửa sau quán kết thúc ở y 820.
2. **Dời cả nửa dưới lên ~70px cho khớp khung đỏ** (giữ nguyên hình, chỉ dời; thùng giấy co nhẹ cho vừa khung):
   - Túi rác: đáy y ≈ 960 (lượt 1 ≈ 1030), x 101–299.
   - Thùng giấy: x 319–581, y 976–1166 (đáy lượt 1 ≈ 1230).
   - Nắp thiếc: x 595–695, đáy y ≈ 1166.
   - Dép: x 177–291, đáy y ≈ 1166.
   - Bàn trang điểm: x 584–896, mặt bàn y ≈ 770, chân đáy y ≈ 1006.
   - Bậc cửa: x 895–1015, y 985–1015. Chậu xương rồng **đứng trên bậc**, đáy y ≈ 990.
   - **Không đồ nào dưới y 1170** (từ y 1183 trở xuống là vùng túi đồ trong game). Sàn trống dưới đồ vẽ liền như sàn xung quanh.
3. **Trời nhạt hơn và bỏ hết cây xanh** sau hàng rào: trời xanh da trời rất nhạt pha kem (#DCEBF2 trở xuống), 1–2 đám mây kem. Không cây, không lá. (Màu lượt 1 vượt ngưỡng p90 vì trời xanh và cây.)
4. **Trong quán sau kính:** giản lược, bỏ đèn treo và chậu cây, chỉ còn mảng kem ấm mờ và một kệ nhạt. Sữa giữ nguyên.
5. **Giao diện:** **6 vòng tròn trống** sau tim (lượt 1 có 5). Bong bóng nhiệm vụ: **đầu mèo màu than tối (silhouette) + dấu hỏi trắng**, không phải mèo trắng. Túi đồ, nút ⏸, 💡, mũi tên ► giữ nguyên.

## Lưu và báo cáo
- Lưu vào **art/out/demo/l5_demo_yard_b.png** (file mới). Gọi image_gen MỘT lần, 1024x1536, chép nguyên.
- Chạy `python tools/color_check.py art/out/demo/l5_demo_yard_b.png`, ghi kết quả.
- "Nhắc lại quy tắc" trước khi vẽ; "Tự kiểm" cuối (từng điểm Cần sửa + giữ nguyên phần còn lại: đạt / không đạt, ghi y chân rào và y đáy thùng giấy đo được), SAVED, prompt cuối.

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
