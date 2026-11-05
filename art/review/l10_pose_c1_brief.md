VẼ DÁNG MÈO MẶC ĐỒ — lượt `l10_c1` (Level 10, A10-2: chủ dự án cho vẽ tiếp, coi demo riêng Mun khỉ đột là duyệt), đúng quy tắc AGENTS.md (vai Codex: chỉ vẽ; mỗi dáng một lần gọi image_gen, mỗi dáng một ảnh, 7 dáng). **Model gpt-6.1-sol, mức medium.**

## Luật chung
- Mỗi dáng một ảnh **1024x1536 dọc, nền TRONG SUỐT thật**, lưu **art/out/_sheets/l10src_<key>.png** (file mới). Chép nguyên, không xử lý.
- **Dáng chuẩn** (ghi ở món): vẽ trước, to gần kín khung, **chân giữa đáy ảnh, đáy chân ở y ≈ 1460**, lề trong suốt ~40px. **Mọi dáng khác: CHỈNH SỬA từ ảnh chuẩn** (art/out/_sheets/l10src_mun_gorilla_idle.png cho Mun, art/out/_sheets/l10src_sua_lizard_fire.png cho Sữa) bằng image_gen chế độ chỉnh sửa: **giữ nguyên khung, cỡ đầu, cỡ người, bộ đồ, màu, nét, vị trí chân (đáy chân y ≈ 1460, giữa ảnh)**, chỉ đổi dáng.
- **Mun quay sang PHẢI, Sữa quay sang TRÁI** (hai con đối mặt nhau).
- Không vẽ lửa, bóng, nền, bóng sàn, quầng, viền trắng, chữ, số, logo. Không giống nhân vật phim nào.
- Màu nhạt như art/ref/owner_l1_style_ref.png, vân chì rõ.
- Trước mỗi lần gọi image_gen viết "Nhắc lại quy tắc". Tin nhắn cuối: "Tự kiểm" từng dáng (đúng dáng, cùng cỡ đầu và chân với chuẩn, đúng bộ đồ, màu nhạt, nền trong suốt, không chữ), SAVED từng file, prompt cuối từng dáng.

## Bộ đồ
- Mun: Mun (mèo đen, art/out/cats/mun_ref.png) **mặc bộ đồ khỉ đột bằng vải theo thiết kế demo đã duyệt art/out/demo/l10_demo_mun_gorilla.png**: mũ trùm lông vải có **gờ mày khỉ đột**, không tai gấu; mặt Mun lộ trọn, tai mèo đen thò qua mũ; vai to, ngực rộng, lưng hơi khom; **tay áo dài và to, găng tay to**; ngực nỉ xám nâu nhạt, khóa kéo, đường may; ủng vải tròn; đuôi mèo đen thò sau lưng. **Màu: nâu sẫm ấm NHẠT, BỚT CAM** (nâu cacao xám ấm, không nâu cam, không nâu đỏ), nhạt hơn bản demo; vân chì rõ.
- Sữa: Sữa (mèo trắng, art/out/cats/sua_ref.png) mặc **bộ đồ thằn lằn gai lưng bằng vải** y như ảnh chuẩn: đồ vải xanh bạc hà nhạt, bụng kem, hàng gai nỉ tam giác xanh lá nhạt dọc lưng và đuôi, đuôi vải nhồi bông, mũ trùm có mõm thằn lằn tròn trên trán, mặt Sữa lộ trọn, găng/ủng 3 móng nỉ.

## Ảnh tham chiếu (mở hết bằng view_image)
1. art/out/demo/l10_demo_mun_gorilla.png — thiết kế bộ khỉ đột đã duyệt (Mun).
2. art/out/demo/l10_demo_fight_play.png — demo cảnh đánh nhau (Sữa bộ thằn lằn bên phải).
3. art/out/_sheets/l10src_mun_gorilla_idle.png / art/out/_sheets/l10src_sua_lizard_fire.png — ảnh chuẩn (khi đã có).
4. art/out/cats/mun_ref.png, art/out/cats/sua_ref.png — mặt mèo.
5. art/ref/owner_l1_style_ref.png — chuẩn màu.

## Danh sách 7 dáng

### 1. `mun_gorilla_idle` → art/out/_sheets/l10src_mun_gorilla_idle.png
- **DÁNG CHUẨN** (vẽ mới theo thiết kế, vẽ trước).
- **Dáng đứng thủ thế** quay ba phần tư sang PHẢI: chân dạng vững, lưng khom, **hai tay áo dài buông xuống hai bên, găng tay gần chạm đất** (kiểu khỉ đột chống tay), mặt nhìn sang phải vẻ cố tỏ ra dữ mà dễ thương.

### 2. `mun_gorilla_block` → art/out/_sheets/l10src_mun_gorilla_block.png
- **Chỉnh sửa từ ảnh art/out/_sheets/l10src_mun_gorilla_idle.png**, chỉ đổi dáng.
- Giơ **hai cánh tay to chéo trước mặt đỡ đòn** (khuỷu chụm, găng tay ngang trán), mắt nhíu.

### 3. `mun_gorilla_punch` → art/out/_sheets/l10src_mun_gorilla_punch.png
- **Chỉnh sửa từ ảnh art/out/_sheets/l10src_mun_gorilla_idle.png**, chỉ đổi dáng.
- **Vung tay phải đấm thẳng sang phải** (cánh tay duỗi dài, găng tay nắm), tay trái co trước ngực, người hơi nghiêng tới, miệng hét nhỏ.

### 4. `mun_gorilla_chest` → art/out/_sheets/l10src_mun_gorilla_chest.png
- **Chỉnh sửa từ ảnh art/out/_sheets/l10src_mun_gorilla_idle.png**, chỉ đổi dáng.
- **Đấm ngực gầm**: hai găng tay nắm đập lên mảng ngực, đầu ngửa nhẹ, miệng há gầm (răng mèo nhỏ, không nanh).

### 5. `mun_gorilla_reach` → art/out/_sheets/l10src_mun_gorilla_reach.png
- **Chỉnh sửa từ ảnh art/out/_sheets/l10src_mun_gorilla_idle.png**, chỉ đổi dáng.
- **Với tay vồ lên cao**: một tay áo dài vươn thẳng lên trên đầu (găng xoè), tay kia buông, mắt ngước lên, nhón chân.

### 6. `mun_gorilla_look` → art/out/_sheets/l10src_mun_gorilla_look.png
- **Chỉnh sửa từ ảnh art/out/_sheets/l10src_mun_gorilla_idle.png**, chỉ đổi dáng.
- **Ngửa cổ nhìn theo vật bay trên cao**: hai tay buông, đầu ngửa ra sau, mắt tròn tò mò nhìn lên.

### 7. `mun_gorilla_sniff` → art/out/_sheets/l10src_mun_gorilla_sniff.png
- **Chỉnh sửa từ ảnh art/out/_sheets/l10src_mun_gorilla_idle.png**, chỉ đổi dáng.
- **Cúi đầu ngửi**: lưng khom hơn, đầu cúi về trước bên phải, mũi hồng phập phồng (2 vạch nhỏ cạnh mũi), mắt hé tò mò.

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
