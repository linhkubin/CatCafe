VẼ MỚI 3 DÁNG MUN — lượt `mun_g36` (Level 5, G5-36), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ; như lượt "TÁCH TỪ DEMO": **mỗi món một lần gọi image_gen, mỗi món một ảnh**, tối đa 3 lần gọi).

Chủ dự án chê 3 dáng Mun hiện tại "xấu quá": **đầu nhỏ so với thân, thân dài gầy, chân que, dáng cứng, mặt đơ không cảm xúc, trông như chồn**. Ba ảnh bị chê (ĐỪNG theo tỉ lệ của chúng): art/out/cats/mun_run.png, art/out/cats/mun_pounce.png, art/out/cats/mun_pin_light.png.

**Vẽ mới**, lấy **tỉ lệ và độ sinh động của Sữa** làm mẫu: art/out/cats/sua_run.png và art/out/cats/sua_pounce.png. Giữ **thiết kế Mun** theo art/out/cats/mun_ref.png (mèo đen than ấm, đầu mặt tròn, mắt vàng mật ong to, tai hồng hơi nghiêng ra, má hồng, ria kem).

**Ảnh demo gốc:** art/out/demo/l5_demo_reveal_ext.png (hẻm lúc lộ diện, Mun đè đốm sáng ở x 280–452, y 886–1128): để thấy Mun trong cảnh, cỡ, màu, nét.

## Luật chung cho cả 3 món
- **Tỉ lệ mèo con mũm mĩm như Sữa:** đầu to tròn **gần bằng thân**, thân ngắn tròn, lông xù mềm; chân **ngắn, mũm mĩm**, bàn chân tròn có **đệm hồng** (thấy rõ khi bàn chân ngửa ra); **đuôi to xù** (không đuôi que).
- **Dáng có lực, sinh động như Sữa**, không cứng.
- **Mặt có cảm xúc:** mắt vàng to sáng long lanh (2 chấm sáng), **miệng há** hoặc cười tươi, hào hứng.
- Lông đen than ấm (trung bình ≈ #4A4242–#5A4C48) có vân chì rõ, không đen tuyền, không tô phẳng; nét viền nâu sẫm ấm như mun_ref, đậm nhạt như bút chì.
- **Món lấp gần kín khung, lề trong suốt khoảng 40px** (AGENTS.md, G5-34). Nền TRONG SUỐT thật (cả kẽ chân, kẽ đuôi). Không bóng sàn, không quầng, không viền trắng, không đốm sáng, không chữ.
- Lưu đúng tên ghi ở món (file mới, không ghi đè). Chép nguyên ảnh, không cắt, không xử lý.
- Trước mỗi lần gọi image_gen viết "Nhắc lại quy tắc"; tin nhắn cuối có "Tự kiểm" **từng món** (tỉ lệ như Sữa: đầu to, thân ngắn, chân mũm mĩm, đuôi xù; dáng sinh động; mặt cảm xúc; đúng thiết kế Mun; lấp khung; nền; không chữ; không quầng: đạt / không đạt + lý do), SAVED, prompt cuối.

## Ảnh tham chiếu (mở hết bằng view_image, đính kèm mỗi lần gọi)
1. art/out/demo/l5_demo_reveal_ext.png — ẢNH DEMO GỐC.
2. art/out/cats/mun_ref.png — **thiết kế Mun** (màu, mắt, tai, mặt tròn).
3. art/out/cats/sua_run.png và art/out/cats/sua_pounce.png — **mẫu tỉ lệ và độ sinh động**.
4. Ảnh Mun cũ bị chê của món đó (chỉ để biết cái cần tránh).
5. art/ref/owner_l1_style_ref.png — chuẩn màu và chất chì. 6. art/ref/l1_depth_angle_ref.png — góc nhìn.

## 3 món

### 1. `mun_run` → **art/out/_sheets/l5src_mun_run_g36.png** (1536x1024, ngang)
- Mun **chạy sang phải** đuổi đốm sáng, nhìn nghiêng, giống tư thế `sua_run`: người vươn dài về trước nhưng vẫn tròn, hai chân trước duỗi ra trước, hai chân sau đạp ra sau, đuôi to xù bay ra sau, tai hơi ép ra sau vì gió, **vài vệt gió mảnh nâu nhạt** sau đuôi (2–3 nét ngắn như sua_run).
- Mặt nghiêng 3/4 nhìn về phía trước: mắt vàng to mở tròn, miệng há nhỏ hào hứng, má hồng.
- Trong game hiển thị rộng ≈ 276.

### 2. `mun_pounce` → **art/out/_sheets/l5src_mun_pounce_g36.png** (1024x1536, dọc)
- Mun **bật cao vồ** sang phải, giống tư thế `sua_pounce`: người vươn lên chéo, hai chân sau duỗi xuống đạp, **hai chân trước giơ cao ra phía trước**, bàn chân xoè thấy đệm hồng, đuôi to xù cong phía sau.
- Mặt quay sang phải nhìn lên chỗ vồ: mắt vàng to, miệng há cười hào hứng, má hồng.
- Trong game: cỡ đầu bằng các dáng khác (Dev chỉnh).

### 3. `mun_pin_light` → **art/out/_sheets/l5src_mun_pin_light_g36.png** (1024x1024, vuông)
- Mun **ngồi tròn** nhìn thẳng (hơi nghiêng 3/4), **hai chân trước chụm lại đè xuống đất** trước người (như đang giữ chặt đốm sáng dưới hai bàn chân; KHÔNG vẽ đốm sáng), thân tròn như hạt đậu ngồi, đuôi to xù vòng quanh bên hông.
- Mặt **hớn hở cúi nhìn xuống hai bàn chân**: mắt vàng to cong vui, miệng cười há, má hồng đậm hơn chút. Tai dựng vui.
- Hai bàn chân đè sát đáy, đáy ảnh là mặt đất ngang dưới bàn chân và mông.
- Trong game hiển thị rộng ≈ 184.

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
