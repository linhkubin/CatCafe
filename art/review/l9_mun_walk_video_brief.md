LÀM VIDEO `l9_mun_walk_loop` — Mun đi bộ tại chỗ, loop được (Level 9, cảnh kết, G9-16, G9-17), đúng quy tắc trong AGENTS.md (vai Codex: chỉ làm hình ảnh, chỉ ghi file vào art/out/).

## Trước hết: kiểm công cụ (bắt buộc)
- Lượt này cần **công cụ tạo VIDEO có sẵn** của bạn (công cụ sinh video từ ảnh / mô tả, giống như `image_gen` là công cụ sinh ảnh).
- **Nếu bạn KHÔNG có công cụ tạo video:** dừng ngay, không làm gì khác, trả lời đúng một dòng `FAILED: l9_mun_walk_loop – không có công cụ tạo video` kèm tên các công cụ hình ảnh bạn đang có.
- **Không được tự đổi cách:** không vẽ từng khung bằng `image_gen` rồi ghép, không dùng ffmpeg / Python / script để dựng video, không tải gì từ mạng. Chủ dự án muốn thử đúng video do công cụ video tạo ra.

## Bối cảnh
Cuối Level 9, hai bát súp đáp xuống sàn bếp; **Mun đi vào từ mép trái** tới bát (Sữa từ mép phải, làm sau). Ảnh 4 khung đi bộ hiện tại (art/out/cats/mun_soup_walk_0..3.png) bị chê cứng. Video này thay cho 4 khung đó. **Dev lo việc di chuyển Mun ngang màn hình trong game**, video chỉ cần Mun bước tại chỗ.

## Nhân vật (giữ đúng thiết kế đã duyệt)
- **Mun** theo art/out/cats/mun_ref.png (Mun mặt tròn, chủ dự án duyệt): mèo đen than ấm (#3E3838, không đen tuyền, thấy vân bút chì), **đầu và mặt tròn**, má phình, mắt tròn to vàng mật ong có chấm sáng, tai hồng hơi nghiêng ra, má hồng nhạt, mũi hồng nhỏ, ria kem, đuôi dài.
- Dáng đi nghiêng sang phải tham khảo art/out/cats/mun_soup_walk.png (cùng hướng, cùng góc, cùng tỉ lệ).
- Mặt vui, hào hứng như đang ngửi thấy mùi súp (mắt mở to sáng, miệng cười nhẹ).

## Chuyển động
- **Nhìn nghiêng, đi sang PHẢI**, mặt hướng sang phải. Góc nhìn như các màn khác: ngang tầm, hơi trực diện, không nhìn từ trên xuống, không góc ba phần tư sâu.
- **Đi bộ tại chỗ, như trên máy chạy bộ:** Mun **không trượt ngang** trong khung, **camera đứng yên** (không lia, không zoom, không rung), đường đáy chân giữ cố định một độ cao.
- **Nhịp đi mèo thật:** chân chéo đi cặp (trước phải + sau trái, rồi trước trái + sau phải), bước nhẹ nhàng, đều. **Thân nhún lên xuống nhẹ** theo bước, **đầu gật nhẹ**, **đuôi dựng cong, đung đưa mềm**.
- **Dài đúng 4 giây**, **số chu kỳ bước chẵn** (đề xuất 4 chu kỳ đầy đủ, mỗi chu kỳ 1 giây, tức 2 cặp bước mỗi giây), **khung cuối nối liền khung đầu** (cùng tư thế chân, thân, đầu, đuôi) để chạy lặp không giật.

## Phong cách và nền
- Giữ đúng phong cách tranh: bút chì màu pastel nhạt, vân chì thấy rõ, **nét viền nâu ấm** đậm nhạt như bút chì, bảng màu như mun_ref. Không 3D, không bóng loáng, không gradient số. Mun giữ nguyên hình dáng suốt video (không biến dạng, không đổi mặt, không mọc thêm chân).
- **Nền một màu phẳng tuyệt đối: xanh lục #00FF00** (không vân, không gradient, không bóng, không sàn, không vật gì) để Dev tách nền. Nếu công cụ làm được nền trong suốt thật thì dùng nền trong suốt.
- **Không bóng sàn, không vệt chuyển động, không chữ, không logo, không watermark.**
- Mun nằm giữa khung, chiếm khoảng 60–70% chiều cao khung, không bị cắt (cả đuôi và tai) ở mọi khung hình.
- Khung hình: vuông 1:1 hoặc ngang 16:9, độ phân giải cao nhất công cụ cho; 24–30 hình/giây.

## Ảnh tham chiếu (mở hết bằng view_image, đính kèm cho công cụ video)
1. art/out/cats/mun_ref.png — thiết kế Mun (chuẩn).
2. art/out/cats/mun_soup_walk.png — dáng đi nghiêng sang phải.
3. art/out/cats/mun_soup_walk_0.png … mun_soup_walk_3.png — 4 khung cũ (chỉ để thấy nhịp chân, đừng theo độ cứng).
4. art/ref/owner_l1_style_ref.png — chuẩn màu và chất chì.

## Lưu và báo cáo
- Lưu vào **art/out/demo/l9_mun_walk_loop.mp4** (nếu công cụ xuất đuôi khác thì giữ đuôi đó, tên giữ nguyên). Chép nguyên file công cụ trả về, không cắt, không xử lý.
- Gọi công cụ video MỘT lần.
- Trước khi gọi viết "Nhắc lại quy tắc" (thiết kế Mun, đi tại chỗ, nhịp chân chéo, 4 giây loop, nền xanh phẳng, phong cách). Tin nhắn cuối có "Tự kiểm" (đạt / không đạt + lý do): đúng Mun; đi sang phải; không trượt, camera đứng yên; nhịp chân chéo; 4 giây; khung cuối nối khung đầu; nền phẳng; phong cách bút chì; không chữ. Kèm `SAVED: ...` hoặc `FAILED: ...`, tên công cụ đã dùng, độ dài, độ phân giải, số hình/giây, prompt cuối.

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
