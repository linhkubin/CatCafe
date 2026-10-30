CHỈNH SỬA TỪ ẢNH art/out/demo/l5_demo_alley_ext.png — ảnh demo hẻm Level 5 theo G5-26 (bạt to che kín đầu hẻm), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ). Ảnh demo, lưu vào art/out/demo/.

Ảnh 1 (1024x1536) là demo hẻm đã duyệt. Toạ độ dưới đây tính trên ảnh 1.

## Làm đúng 4 việc (phần dưới y 430 GIỮ NGUYÊN)
1. **Xoá** bạt cuộn sọc (x 128–885, y 272–340), hai giá đỡ của nó, sợi dây có vòng thòng xuống bên phải (x ≈ 850, y 340–420) và **dải nắng vàng** từ bạt xuống đĩa ở điểm A (x 140–300, y 340–1040). Chỗ dải nắng xoá đi vẽ lại thành tường gạch kem và sàn xi măng như xung quanh. Đĩa xanh ở A giữ nguyên.
2. **Vẽ một tấm bạt vải to căng ngang trên đầu hẻm, tràn hết bề ngang ảnh**: vải chạy liền ra **quá cả mép trái và mép phải** (bị mép ảnh cắt, không thấy đầu bạt), không có khoảng trống ở hai bên.
   - Vị trí: mép trên bạt ở y ≈ 190–210, mép dưới (mép lượn sóng) ở y ≈ 400–425. **Không xuống dưới y 430** (cửa sổ, thạch sùng, móc treo phải còn nguyên).
   - Hình: một mảng vải phẳng căng, nhìn gần trực diện, hơi võng nhẹ ở giữa. Mép trên là một thanh gỗ hoặc dây căng thẳng ngang, có vài mối buộc dây nhỏ. Mép dưới lượn sóng tròn to như bạt cũ.
   - Màu: **sọc dọc to hồng đào và kem như bạt cũ** (cùng màu, cùng độ rộng sọc), vân chì, nét nâu ấm. Không thêm hoa văn khác.
   - **Đúng MỘT lỗ thủng nhỏ** trên bạt, tâm ở **x ≈ 220, y ≈ 360** (thẳng phía trên đĩa ở A): lỗ tròn hơi méo, rộng khoảng 26–32px, mép vải sờn vài sợi chỉ, trong lỗ thấy trời xanh nhạt. Ngoài lỗ này **không có lỗ nào khác**.
3. **Dây điện và quạ:** phần dây điện bị bạt che thì bỏ. Quạ đen giữ nguyên hình, cỡ, màu, nhưng **đậu trên mép trên của bạt** ở x ≈ 320 (chân chạm mép trên bạt, y ≈ 195–205).
4. **Ống thoát nước bên phải:** phần trên y 430 nằm **sau** bạt (bạt che ống). Phần dưới giữ nguyên.

Trên mép trên bạt (y < 190) là trời xanh nhạt pha kem và mây như cũ.

## Không vẽ
- Không vẽ bóng râm, không tối hoá hẻm, không tia nắng, không vệt sáng, không đốm sáng mới: những thứ này game tự vẽ.
- Không thêm đồ, không thêm nhân vật, không chữ, không số.

## Giữ nguyên
Mọi thứ dưới y 430 (tường, gạch, gương, bậu, thạch sùng, móc, cửa sổ, ống bơ, xe đạp, CD, xe ba gác, Mun, đĩa A, đốm sáng, vũng nước, sàn), trừ chỗ xoá dải nắng. Cùng nét chì, cùng màu, cùng ánh sáng.

## Ảnh tham chiếu (mở hết bằng view_image, đính kèm theo thứ tự)
1. art/out/demo/l5_demo_alley_ext.png: **ẢNH CẦN CHỈNH SỬA** (cũng là ảnh demo gốc).
2. art/out/level5/l5_awning_down.png: bạt thả cũ, để lấy đúng màu sọc, mép lượn sóng, nét (bỏ các lỗ tròn của nó).
3. art/ref/owner_l1_style_ref.png: chuẩn màu.
4. art/ref/l1_depth_angle_ref.png: góc nhìn.

## Lưu và báo cáo
- Lưu vào **art/out/demo/l5_demo_alley_g26.png** (file mới). Gọi image_gen MỘT lần, 1024x1536, chép nguyên.
- Chạy `python tools/color_check.py art/out/demo/l5_demo_alley_g26.png`. Trung bình cần 0,22–0,25, p90 ≤ 0,46.
- "Nhắc lại quy tắc" trước; "Tự kiểm" cuối (đạt / không đạt): bạt tràn hai mép, mép dưới ≤ y 430, đúng một lỗ ở trên A, không còn dây kéo / bạt cuộn / dải nắng, quạ trên mép bạt, phần dưới giữ nguyên, màu theo số đo, không chữ. SAVED, prompt cuối.

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
