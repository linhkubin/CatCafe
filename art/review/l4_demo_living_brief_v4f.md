CHỈNH SỬA TỪ ẢNH art/out/_refs/l4_demo_living_v4e.png (demo phòng khách Level 4, Vòng 4f), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

Chủ dự án: "ảnh 1 **giữ nguyên mọi thứ**, cho Sữa bé lại 1 chút nữa, để tháp và nhân vật sát tường hơn".

- Chỉnh sửa ảnh, KHÔNG vẽ mới: giữ nguyên kích thước 1024x1536, màu, nét, tường, sàn, cửa sổ, rèm, sofa, mũi tên, giao diện, **cỡ nhân vật và cỡ tháp**. Chỉ đổi đúng 2 điểm trong "Cần sửa".
- Lưu vào: art/out/demo/l4_demo_living.png (ĐƯỢC PHÉP GHI ĐÈ). Gọi image_gen MỘT lần, chép nguyên ảnh, không xử lý hậu kỳ.
- Ảnh tham chiếu, mở bằng view_image và đính kèm: 1. art/out/_refs/l4_demo_living_v4e.png (ẢNH GỐC); 2. art/out/cats/sua_ref.png (Sữa); 3. art/out/player/player_ref.png (nhân vật); 4. art/ref/owner_l1_style_ref.png (chuẩn màu).
- Trước khi gọi image_gen viết "Nhắc lại quy tắc"; tin nhắn cuối có "Tự kiểm" (từng điểm Cần sửa và "giữ nguyên mọi thứ khác": đạt / không đạt; ghi y đáy tháp trước/sau, cỡ Sữa trước/sau), SAVED, prompt cuối. Sau khi lưu chạy `python tools/color_check.py art/out/demo/l4_demo_living.png art/out/_refs/l4_demo_living_v4e.png`.

## KIỂM TRƯỚC KHI LƯU (lượt trước sai)
- Lượt trước Sữa nhỏ lại và tháp lùi đúng, **nhưng nhân vật và tháp bị thu nhỏ theo (nhân vật còn ~380px) — SAI**. Chủ dự án đã chê nhân vật nhỏ. **Nhân vật phải giữ đúng cỡ ảnh gốc: cao ~500px từ đế dép tới đỉnh tóc**; tháp giữ đúng bề rộng ảnh gốc. Chỉ DỜI cả cụm lên ~100px, không co.
- Tính sẵn: dời lên 100px thì đầu ngón tay ở y ≈ 370; Sữa 80% treo ở chỗ cũ thì chân sau ở y ≈ 380: tay sát ngay dưới chân Sữa, đúng ý.
- Màu giữ như ảnh gốc, không đậm hơn.

## Cần sửa
1. **Sữa nhỏ lại một chút** (~80% cỡ hiện tại), vẫn treo kiểu quả chuối **ở đúng chỗ cũ** trên đỉnh rèm (hai chân trước bám dưới thanh rèm), đúng sua_ref.
2. **Tháp và nhân vật dời sát tường hơn**: cả cụm (tháp 4 món + nhân vật đứng trên gối) **giữ nguyên cỡ và hình**, chỉ dời lùi về phía chân tường/chân rèm: **đáy tháp lên khoảng y ≈ 1080** (gần chân tường hơn, hiện ≈ 1180), cùng trục ngang dưới Sữa. Vì cụm cao lên, **đầu ngón tay nhân vật vẫn phải ở ngay dưới chân sau Sữa, sát nhưng chưa chạm** (Sữa nhỏ lại nên chân Sữa cao hơn; nếu cần cho Sữa treo thõng thấp hơn chút). Chỗ sàn trống ra vẽ liền như sàn xung quanh.

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
