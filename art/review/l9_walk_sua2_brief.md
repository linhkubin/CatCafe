VẼ KHUNG BƯỚC ĐI — Level 9 "Súp thưởng", cảnh kết (Mun và Sữa đi vào bát). Đúng quy tắc AGENTS.md (vai Codex: chỉ vẽ; vẽ lại 1 khung, một lần gọi image_gen). Model gpt-6.1-sol, mức medium.

Chủ dự án muốn Mun và Sữa **bước đi thật, chân cử động** khi đi vào bát. Mỗi mèo 4 khung một vòng bước: khung 0 là ảnh đi hiện có (không vẽ lại); lượt này vẽ **khung 1, 2, 3** cho mỗi mèo bằng **CHỈNH SỬA TỪ ẢNH** đi hiện có, để đầu và thân giống hệt, chỉ chân đổi. Vòng bước: 0 (sải bước) → 1 (giữa bước) → 2 (sải bước ngược pha) → 3 (giữa bước lần hai) → 0.

**Ảnh demo gốc đã duyệt:** art/out/demo/l9_demo_end.png (cảnh kết, góc chung).

## Luật chung
- Mỗi khung: gọi image_gen **một lần, chế độ chỉnh sửa** ảnh đi gốc của con mèo đó (KHÔNG chỉnh sửa nối tiếp từ khung vừa vẽ). Đính kèm: ảnh đi gốc (ảnh cần sửa) + art/out/cats/mun_ref.png hoặc art/out/cats/sua_ref.png (dáng đi chuẩn) + art/ref/owner_l1_style_ref.png + art/out/demo/l9_demo_end.png.
- **Nền TRONG SUỐT thật**, giữ nguyên cỡ ảnh 1536x1024 và vị trí mèo. Không chữ, không bóng sàn, không quầng.
- Lưu đúng tên (file mới, không ghi đè). Chép nguyên ảnh, không xử lý.
- Trước mỗi lần gọi viết **"Nhắc lại quy tắc"** (phong cách, màu, góc chung, giữ nguyên đầu thân, chỉ đổi chân, đường đáy). Tin nhắn cuối có **"Tự kiểm" từng khung** (đầu thân đuôi giống hệt ảnh gốc; đúng tư thế chân; đủ 4 chân, không thừa; bàn chân chạm sàn đúng đường đáy; cùng hướng nhìn; nền trong suốt; không chữ: đạt / không đạt + lý do), `SAVED:` từng file, prompt cuối từng khung.

## 1 khung (vẽ lại)
### `sua_soup_walk_2` → art/out/_sheets/l9src_sua_soup_walk_2b.png (1536x1024, nền trong suốt)
- **CHỈNH SỬA TỪ ẢNH art/out/_sheets/l9src_sua_soup_walk.png** (ảnh Sữa đi nhìn sang TRÁI, khung bước 0).
- **GIỮ NGUYÊN từng điểm ảnh:** cỡ ảnh, vị trí, **đầu, mặt, mắt, tai, thân, đuôi, màu, chất lông, nét**. **Đường đáy (sàn) giữ nguyên**: các bàn chân chạm sàn nằm đúng hàng y của bàn chân trong ảnh gốc; thân không cao lên hay thấp xuống. Sữa vẫn nhìn sang TRÁI, không lật ảnh.
- **CHỈ ĐỔI 4 CHÂN** sang tư thế: BƯỚC NGƯỢC PHA so với ảnh gốc: chân nào trong ảnh gốc đang **vươn tới trước** thì nay **lùi về sau**, chân nào đang ở sau thì nay **vươn tới trước**: chân trước phía XA vươn dài tới trước chạm sàn, chân trước phía gần lùi chéo về sau; chân sau phía gần đưa tới dưới bụng, chân sau phía xa duỗi ra sau. Sải bước dài bằng ảnh gốc.
- Chân mới cùng độ dài, độ dày, màu lông, nệm chân, viền chì như chân trong ảnh gốc. Đầu gối và khuỷu gập mềm tự nhiên kiểu mèo con chibi, không gãy, không thêm chân.

- **LẦN TRƯỚC SAI, PHẢI SỬA:** bản trước 4 chân **ngắn hơn ảnh gốc**, bàn chân **không chạm sàn** (đáy chân ở y ≈ 951 trong khi sàn ở y ≈ 998), và cả con bị dịch sang trái 12px. Lần này: **4 chân DÀI ĐÚNG như chân ảnh gốc**; các bàn chân chạm sàn phải có **đáy ở đúng y ≈ 995–998** như ảnh gốc; đầu và thân **không dịch** chút nào (trùng từng điểm ảnh với ảnh gốc).

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
