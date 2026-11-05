TÁCH NỀN — `l7_bg_alley` — Level 7, Cảnh 1 · Góc hẻm (con hẻm L5 lúc đêm mưa), đúng quy tắc AGENTS.md (vai Codex: chỉ vẽ). Model gpt-6.1-sol, mức medium.

**Ảnh demo gốc (chủ dự án đã duyệt): art/out/demo/l7_demo_s1_play.png.**
**ẢNH CẦN CHỈNH SỬA: art/ref/l7_demo/bg_s1_in.png** (1024x1536): giữa ảnh là cả demo thu nhỏ 0,75 (x 128–895, y 192–1343), xung quanh là **viền xám phẳng** (trái/phải 128 px, trên/dưới 192 px).
Lưu: **art/out/_sheets/l7src_l7_bg_alley.png** (1024x1536, có nền).

## Việc
1. **Vẽ kín viền xám** bằng cảnh nối tiếp tự nhiên từ demo: Trên: trời kéo cao thêm, mây nhạt, dây điện chạy tiếp. Dưới: nền hẻm kéo dài, phẳng, trống. Trái/phải: tường hẻm và nền kéo dài, cùng chân tường, có thể thêm 1–2 viên gạch hồng lộ ra; không thêm cửa, đồ vật. Đường chân tường, mép mái, đường chân trời phải **nối thẳng liền** qua chỗ giáp.
2. **Xoá hết đồ rời** (sau này là sprite riêng): tấm ván dựa tường, thang gỗ chữ A, xe ba gác, mái bạt sọc hồng kem, đôi mắt Mun và khe tối dưới mái, **dải nước ngập chạy dọc** (thay bằng nền hẻm liền mạch như chỗ khác), đống cành cây lá xanh ở mép trái, mọi vũng nước, cành gãy nhỏ, lá bay, tia sét, **mọi vệt mưa**. Chỗ đồ cũ che: vẽ tiếp tường và nền đúng như xung quanh (chân tường thẳng ngang, nền phẳng).
3. **Giữ lại làm nền** (đúng hình, màu, nét, vị trí như demo): trời lavender–xanh nhạt có mây, **dây điện** võng ngang trời, **tường** kem hồng nhạt có vài viên gạch hồng phấn, **cửa sổ nhỏ** khung gỗ có bậu, **kệ gỗ** gắn tường, **móc sắt** trên tường, **nền hẻm** ướt xám-lavender rất nhạt.
4. Ảnh ra là **phông nền trống**, sạch, cùng tông đêm mưa nhạt như demo (trời lavender–xanh nhạt, mảng lớn nhạt). **Không vẽ mưa** (game vẽ mưa bằng code). Không bóng tối mép, không viền.
5. Màu: nhạt như demo (đo demo: trung bình ≈ 0,18–0,19, p90 ≈ 0,32–0,35); không đậm hơn.

## Ảnh tham chiếu (đính kèm, tối đa 5)
1. art/ref/l7_demo/bg_s1_in.png — ẢNH CẦN CHỈNH SỬA.
2. art/out/demo/l7_demo_s1_play.png — demo gốc cỡ thật (chi tiết, nét).
3. art/ref/owner_l1_style_ref.png — chuẩn màu.

## Quy tắc bắt buộc (AGENTS.md)
- Trước khi gọi image_gen: mở mọi ảnh tham chiếu bằng view_image, viết **"Nhắc lại quy tắc"** (phong cách, màu, góc nhìn, nét, yêu cầu riêng) bằng lời của mình.
- Gọi image_gen MỘT lần, chế độ **chỉnh sửa ảnh**, cỡ 1024x1536, có nền đầy đủ. Chép nguyên ảnh, không xử lý.
- Không chữ, không số, không giao diện, không người, không mèo.
- Chạy `python tools/color_check.py <ảnh>` (lỗi thiếu thư viện thì đo cách khác) và ghi số.
- Tin nhắn cuối: `SAVED: ...`, prompt cuối, **"Tự kiểm"** (đạt / không đạt + lý do: giữ nguyên phần cảnh, đã xoá hết đồ trong danh sách, vùng xám đã vẽ kín và nối liền, không mưa, màu, góc nhìn, không chữ), một dòng tự nhận xét.

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
