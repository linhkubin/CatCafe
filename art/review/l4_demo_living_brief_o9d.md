Vẽ lại ẢNH DEMO `l4_demo_living` cho Level 4 (lượt O9d: GÓC NHƯ SOFA LEVEL 1, CHIỀU SÂU BẰNG MẶT TRÊN, màu O6), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

Chủ dự án: **"tôi muốn góc nhìn sẽ hơi trực diện như sofa level 1 nhưng có chiều sâu hơn"**. Bỏ kiểu chếch xiên 30–35° của lượt trước.
**Quy tắc lượt này:** mọi đồ nhìn **hơi trực diện như sofa level 1**, nhìn xuống nhiều hơn chút (~25°). **Chiều sâu thể hiện bằng MẶT TRÊN**: cạnh sâu đi **gần như thẳng lên** (chỉ hơi chụm nhẹ về giữa tranh như sofa L1), **không chếch xiên sang bên**. Mặt trên cao ~1/3–1/2 chiều cao mặt trước, **đồ sâu hơn mặt trên cao hơn**. **Mặt hông rất mỏng hoặc không thấy**: đồ ở nửa trái tranh thấy dải hông phải rất mỏng, đồ ở nửa phải thấy dải hông trái rất mỏng (như hai tay vịn sofa L1).

- Lưu vào: art/out/demo/l4_demo_living.png, cỡ 1024x1536, CÓ NỀN đầy đủ. ĐƯỢC PHÉP GHI ĐÈ art/out/demo/l4_demo_living.png (chỉ file này). Gọi image_gen MỘT lần, chép nguyên ảnh, không cắt, không chỉnh màu hậu kỳ.
- Đặc tả: art/design-art-level4.md mục 2d (bảng chiều cao mặt trên từng đồ) và mục 5. Quy tắc: art/style.md mục 1 (COLOR), mục 2b (CAMERA O8 + O9).
- Ảnh tham chiếu (TỐI ĐA 5), mở HẾT bằng view_image trước khi vẽ, đính kèm theo thứ tự:
  1. art/ref/owner_l1_style_ref.png = CHUẨN màu, độ nhạt, vân chì, nét, góc nhìn chung.
  2. art/ref/l1_depth_angle_ref.png = **MẪU GÓC: sofa level 1**. Xem cách sofa này hơi trực diện, mặt đệm ngồi và nóc tay vịn có mặt trên, cạnh sâu gần thẳng đứng, hông tay vịn rất mỏng. Mọi đồ trong tranh theo đúng kiểu này, nhưng mặt trên **cao hơn một chút** (nhìn xuống ~25°).
  3. art/out/_refs/l4_demo_living_o8.png = **ẢNH GỐC để chỉnh sửa**: bố cục, màu (đã đạt), nhân vật, mèo, giao diện, góc chính diện giữ nguyên. Chỉ làm mặt trên các đồ sâu hơn theo danh sách.
  4. art/out/cats/sua_ref.png (Sữa)
  5. art/out/player/player_ref.png (nhân vật)
- Dùng image_gen **chế độ chỉnh sửa trên ảnh 3**. Mặt trước mỗi đồ giữ như ảnh 3; chỉ thêm/nới **mặt trên** về phía sau (gần thẳng lên), giữ cạnh ngang nằm ngang.
- Trước khi gọi image_gen, viết "Nhắc lại quy tắc" (phong cách, màu O6, góc O8, **chiều sâu O9 kiểu sofa L1 với chiều cao mặt trên từng đồ**, nét, không chữ, nền). Tin nhắn cuối có "Tự kiểm": từng quy tắc đạt / không đạt; **chiều sâu chấm riêng từng đồ** (có mặt trên chưa, cạnh sâu có gần thẳng đứng không, đồ sâu hơn có mặt trên cao hơn không), SAVED, prompt cuối, một dòng chỗ chưa ổn.
- Sau khi lưu, chạy `python tools/color_check.py art/out/demo/l4_demo_living.png` và `python tools/depth_check.py art/out/demo/l4_demo_living.png art/out/_check/l4_depth_living.jpg` (lưới đứng + ngang), mở ảnh kiểm bằng view_image, ghi vào Tự kiểm. Không tự vẽ lại.

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

## Khối góc nhìn O8 + O9 (art/style.md mục 2b), dán nguyên

```
CAMERA (one shared camera for the whole game, exactly like the Level 1 reference image): straight-on FRONT view, eye slightly above, looking down only about 15 degrees.
Horizontal edges stay horizontal, vertical edges stay vertical. NO three-quarter view, NO oblique/diagonal perspective, NO vanishing points, nothing rotated diagonally.
The front face is the main visible face; the top face is only a thin strip (about 1/5 of the front height); round tops are flat ellipses; a side face, if any, is only a narrow strip on the RIGHT.
ONE DEPTH RULE FOR EVERY OBJECT (match the sofa in the attached Level 1 angle reference): an almost straight-on front view like the Level 1 sofa, but looking down a little more (about 25 degrees) so objects show more depth. Depth is shown mainly by the TOP faces: depth edges run almost straight UP (only converging very slightly toward the picture centre, like the Level 1 sofa), never slanting sideways. Top faces are about 1/3 to 1/2 of the front height, more for deeper objects: a desk top is clearly deeper than a bookshelf top, a bed shows its mattress top as a large clear area. Side faces are very thin or hidden (objects on the left half may show a very thin right side, objects on the right half a very thin left side, like the sofa arms). Nothing is completely flat, nothing is rotated diagonally.
Objects are NOT flat paper cut-outs: like the sofa, box and plant pot in the Level 1 reference, always show the thin top strip, show the thickness of thick objects (mattress, suitcase, books, pillow, shelf, bed) and a narrow right side strip, and give round objects a few pencil shading strokes on the right.
Light from the upper left: a few pencil shading strokes on the right/bottom of each object. No floor shadow.
```

## Chiều sâu từng đồ (chiều cao MẶT TRÊN, px trên ảnh 1024x1536; cạnh sâu gần thẳng lên)
- **Sofa** (nửa phải tranh): mặt đệm ngồi cao **~75px** nhìn từ trên xuống rõ như sofa ảnh 2 nhưng sâu hơn; nóc tay vịn, nóc lưng tựa có mặt trên; hông tay vịn trái rất mỏng.
- **Tháp** (nửa trái), các món chồng thẳng hàng, mỗi món có mặt trên gần thẳng lên: **đệm gấp ~80px** (mảng trên lớn thấy chần quả trám), **vali gập ~40px**, **chồng sách ~20px** (thấy bìa cuốn trên cùng), **gối ~35px** phồng. Món trên đặt lên mặt trên món dưới. Dải hông phải rất mỏng.
- **Bệ cửa sổ ~14px**.
- Đồ tròn (bóng, chao đèn, gấu, mèo, nhân vật): giữ như ảnh 3, thêm vài nét chì đổ bóng bên phải.
- Giữ mọi thứ khác như ảnh 3: màu, bố cục, chân tường và ván sàn nằm ngang, giao diện.
