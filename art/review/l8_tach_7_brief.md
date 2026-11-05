TÁCH TỪ DEMO — lượt `l8_tach_7` (Level 8 "Tắm cho Mun"), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ; tờ Mun theo mục "Vẽ theo tờ"; mỗi ảnh một lần gọi image_gen). Model gpt-6.1-sol, mức medium. Chủ dự án đã duyệt demo; dặn: "prompt thật kỹ và gửi ảnh đúng như quy trình".

**Ảnh demo gốc của lượt này: art/out/demo/l8_demo_stage1.png** (khung điện thoại 1080x1920, chặng 1; toạ độ "trong demo" tính trên ảnh này). Cùng cảnh không giao diện: art/out/demo/l8_demo_stage1_play.png (1024x1536, toạ độ "vùng chơi").

## Luật chung
- **Mun và đuôi vẽ lại đúng như trong demo**: cùng hình dáng, tỉ lệ, màu lông, chất chì, nét; chỉ đổi đúng phần ghi. Màu không đậm hơn, không nhạt hơn demo.
- Mun: mèo đen than ấm #3E3838, lông mềm có vân chì (không đen kịt), mặt tròn (G5-32), mắt to tròn vàng mật ong, mũi hồng đào nhỏ, má hồng nhẹ, tai trong hồng phấn. Giống `art/out/cats/mun_ref.png` và Mun trong demo.
- **MÀU LÔNG MUN PHẢI GIỐNG HỆT CÁC ẢNH MUN CŨ** (`art/out/cats/mun_ref.png`, `art/out/cats/mun_sit_look.png`): đen than **ấm ngả nâu** (lông trung bình khoảng RGB 110, 86, 73), có vân chì nâu ấm và các sợi lông sáng hơn; **không đen tuyền, không xám lạnh, không xanh, không đậm hơn** các ảnh cũ. Mắt vàng mật ong, mũi hồng đào, tai trong hồng phấn đúng như ảnh cũ. Nghi ngờ thì so cạnh mun_sit_look.png.
- Nền **TRONG SUỐT thật** (giữ kênh alpha). Không ghế, không sàn, không bóng, không quầng, không sparkle, không dấu động, không chữ, không số, không khung.
- **Đính kèm mỗi lần gọi image_gen tối đa 5 ảnh** (giới hạn công cụ): (1) ảnh demo gốc, (2) ảnh cắt, (3) art/out/cats/mun_sit_look.png (màu lông), (4) art/ref/owner_l1_style_ref.png, (5) art/out/cats/mun_ref.png. Khi ghi "chỉnh sửa từ ảnh": ảnh cần sửa thay chỗ (5) mun_ref. Ảnh góc nhìn art/ref/l1_depth_angle_ref.png và mun_ref chỉ mở bằng view_image để xem, không đính kèm nếu đã đủ 5.
- Lưu đúng đường dẫn ghi ở từng mục (file mới, không ghi đè). Chép nguyên ảnh, không cắt, không xử lý.
- Trước mỗi lần gọi image_gen viết "Nhắc lại quy tắc" (phong cách, góc nhìn, màu, nét, nhân vật, ô và đường đáy, phần xoá). Tin nhắn cuối có "Tự kiểm" **từng ảnh** (giống demo; đã xoá phần không lấy; không đuôi trên thân; 2 ô cùng cỡ, cùng đường đáy; nền trong suốt; không chữ: đạt / không đạt + lý do), SAVED từng file, prompt cuối từng ảnh.

## Ảnh tham chiếu chung (mở hết bằng view_image)
1. art/out/demo/l8_demo_stage1.png — **ẢNH DEMO GỐC**.
2. art/out/demo/l8_demo_stage1_play.png — cùng cảnh, đo toạ độ vùng chơi.
3. art/out/cats/mun_ref.png — Mun (dáng, mặt).
3b. art/out/cats/mun_sit_look.png — **mẫu màu lông Mun** (ảnh Mun cũ đã duyệt).
4. art/ref/owner_l1_style_ref.png — chuẩn màu và chất chì.
5. art/ref/l1_depth_angle_ref.png — góc nhìn.

## Danh sách 2 ảnh (vẽ theo thứ tự)

### 1. Tờ 2 ô: `mun_bath_dirty` (trái) + `mun_bath_towel` (phải) → art/out/_sheets/l8_mun_sheet_a.png
- Ảnh cắt đính kèm: art/ref/l8_cut/crops/mun_stage1.png.
- Tờ **1536x1024, nền trong suốt**, chia 2 ô dọc: **ô trái x 0–768, ô phải x 768–1536** (cao cả 1024). Mỗi ô một dáng; không vẽ khung, đường kẻ, số ô.
- **Hai dáng cùng một con Mun, cùng cỡ, cùng góc nhìn, cùng màu lông, CÙNG ĐƯỜNG ĐÁY**: mông và bàn chân trước nằm trên đường ngang **y = 984** (lề đáy 40px), thân căn giữa ô (tâm ngang x = 384 ô trái, x = 1152 ô phải). Mun cao khoảng **860px** (từ đỉnh tai tới đáy), không chạm mép ô (lề ≥ 40px). (Ảnh dùng trong game sẽ được cắt và co về khoảng **780x870 px** mỗi dáng, tức 1,5 lần cỡ hiển thị 520x580; không cần vẽ chi tiết li ti.)
- Mun **ngồi nhìn thẳng ra người xem, cân đối trái phải, đáy phẳng** (code xoay quanh giữa đáy). **KHÔNG vẽ ghế**, không sàn, không bóng.
- **KHÔNG VẼ ĐUÔI** (đuôi là ảnh riêng): chỗ gốc đuôi bên phải mông chỉ là đường lông tròn liền của mông.
- **Ô trái `mun_bath_dirty`:** vẽ lại đúng Mun trong demo chặng 1 (vùng chơi x 300–710, y 560–1060; trong demo x 316–749, y 740–1268): ngồi co ro, **hai tai cụp sang hai bên**, mắt tròn dè chừng, lông **xù rối, bết từng túm**, cùng dáng, tỉ lệ đầu/thân, chân trước, má, ria như demo. **XOÁ mọi thứ trên người**: 4 lá, 2 cành, chùm ké trên đầu và ở đuôi, 3 mảng bùn, vụn bùn; chỗ bị che vẽ bù bằng **lông đen xù rối** liền mạch (không để lại vệt màu, không đốm caramel). Không đuôi.
- **Ô phải `mun_bath_towel`:** cùng Mun, cùng cỡ đầu, cùng đường đáy y 984, cùng tâm ngang; **quấn kín trong khăn bông hồng phấn** (đúng khăn `art/out/level8/l8_tool_towel.png`: hồng phấn, 2 sọc kem gần mép, vải bông dày), khăn quấn tròn ôm cả thân thành một khối tròn mập ngồi trên đáy phẳng; **chỉ thò mặt và hai tai** ra ở trên; mắt **lim dim** (hai đường cong nửa nhắm), má hồng dụi vào mép khăn, miệng nhỏ dễ chịu. Không thấy chân, không đuôi. Bề ngang khối khăn khoảng bằng thân ô trái.

### 2. Đuôi bẩn (1024x1536, nền trong suốt) → art/out/_sheets/l8src_mun_bath_tail_dirty.png
- Ảnh cắt đính kèm: art/ref/l8_cut/crops/mun_stage1.png.
- **Đuôi của Mun bẩn** như trong demo chặng 1 (vùng chơi x 700–820, y 840–990; trong demo x 738–865, y 1036–1194): đuôi đen than **xù rối bết túm**, cong vồng lên phía phải rồi chóp quặp lại, cùng độ dày và màu lông như demo.
- **XOÁ** cành, chùm ké, vụn bùn trên đuôi; vẽ bù lông đen xù.
- **Gốc đuôi ở dưới cùng bên trái ảnh**, vẽ **dư thêm một đoạn gốc khoảng 1/6 chiều dài** (đoạn này sẽ chui dưới mông Mun), đầu gốc cắt tròn mềm, không viền cứng. Chóp đuôi hướng lên trên. Đuôi to lấp khung dọc, lề ~40px.
- Chỉ cái đuôi: không mông, không thân, không ghế.

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
