TÁCH TỪ DEMO — lượt `l7_tach_5` (Level 7 "Về nhà thôi, Mun!", G5-23), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ; ngoại lệ "TÁCH TỪ DEMO": mỗi món một lần gọi image_gen, mỗi món một ảnh). Model gpt-6.1-sol, mức medium. Chủ dự án đã duyệt demo, dặn: "cố gắng tách sao cho giống demo".

**Ảnh demo gốc của lượt này: art/out/demo/l7_demo_s3.png** (khung 1080x1920; toạ độ "trong demo" tính trên ảnh này). Cùng cảnh không giao diện: art/out/demo/l7_demo_s3_play.png (1024x1536, toạ độ "vùng chơi").

## Luật chung cho mọi món
- **Vẽ lại đúng món trong demo: cùng hình dáng, tỉ lệ, màu, chi tiết, nét.** Không tự thiết kế lại. Màu **không đậm hơn, không nhạt hơn** demo (demo là đêm mưa tông nhạt pastel). Cùng góc nhìn.
- Mỗi món: gọi image_gen **một lần**, đính kèm (tối đa 5 ảnh) ảnh demo gốc + ảnh cắt của món + art/ref/owner_l1_style_ref.png + art/ref/l1_depth_angle_ref.png. **Nền TRONG SUỐT thật** (giữ kênh alpha).
- **Lấp gần kín khung (G5-34):** khung ghi cạnh tên món; món to hết cỡ, lề trong suốt quanh món chỉ ~40px, không bị cắt.
- **Chỉ đúng một món.** Không lấy mưa (vệt mưa), giọt nước bay, Mun, đồ chồng lên, đồ phía sau, tường, nền, bóng, quầng. Chỗ bị che: vẽ bù đúng thiết kế.
- Không chữ, không số, không khung, không bóng sàn, không viền trắng quanh món.
- Lưu từng món vào đúng tên dưới (file mới, không ghi đè). Chép nguyên ảnh, không cắt, không xử lý.
- Trước mỗi lần gọi image_gen viết "Nhắc lại quy tắc" (phong cách, góc nhìn, màu, nét, phần lấy / không lấy của món). Tin nhắn cuối có "Tự kiểm" **từng món** (giống demo về hình, tỉ lệ, màu, chi tiết; đã bỏ phần không lấy; lấp kín khung; nền trong suốt; không chữ: đạt / không đạt + lý do), SAVED từng file, prompt cuối từng món.

## Ảnh tham chiếu chung (mở hết bằng view_image)
1. art/out/demo/l7_demo_s3.png — **ẢNH DEMO GỐC**.
2. art/out/demo/l7_demo_s3_play.png — cùng cảnh, đo toạ độ vùng chơi.
3. art/ref/owner_l1_style_ref.png — chuẩn màu và chất chì.
4. art/ref/l1_depth_angle_ref.png — góc nhìn.

## Danh sách 4 món

### 1. `l7_window_sheet` → art/out/_sheets/l7src_l7_window_sheet.png (1536x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l7_demo_s3.png, món nằm ở x 69–564, y 445–972 trong demo** (vùng chơi art/out/demo/l7_demo_s3_play.png: x 65–535, y 280–780).
- Ảnh cắt đính kèm: art/ref/l7_cut/l7_window_sheet.png.
- **TỜ 3 Ô (một ảnh, nền trong suốt), cùng một cửa sổ, cùng cỡ, cùng đường đáy (mép dưới bậu), mỗi ô một trạng thái:** ô 1 x 0–511, ô 2 x 512–1023, ô 3 x 1024–1535 (cả 3 ô cao hết ảnh; mỗi thứ cách mép ô ≥ 40px, không chạm ô bên; không vẽ đường kẻ ô).
  - **Ô 1 `l7_window_inside` — phòng trong:** một **hình chữ nhật đầy** đúng bằng khung ngoài cửa sổ (cùng cỡ với ô 2), bên trong là phòng ấm như demo: tường kem vàng ấm sáng đèn, **ti vi** bên trái màn xanh nhạt sáng trên kệ gỗ, **sofa lavender** nhạt ở giữa phải (lưng sofa thấy rõ), ánh đèn vàng bơ nhạt. **KHÔNG có người** (nhân vật là ảnh riêng). Không khung gỗ, không kính.
  - **Ô 2 `l7_window_closed` — khung cửa sổ đóng:** khung gỗ mật ong nhạt + bậu gỗ + **thanh giữa dọc** (2 cánh đóng), đúng như demo; **ô kính để TRONG SUỐT** (chỉ vẽ 2–3 vệt phản chiếu trắng mảnh xiên và vài vệt nước mưa chảy mảnh trên kính, còn lại trong suốt để thấy phòng trong ở lớp dưới). Không phòng trong, không người.
  - **Ô 3 `l7_window_open` — cửa sổ mở:** cùng khung + bậu như ô 2, nhưng **2 cánh kính mở vào trong**: mỗi cánh thành một tấm hẹp (khung gỗ mảnh, kính trong suốt) nép sát hai bên mép trong khung, nhìn hơi xiên; giữa khung **trống trong suốt**. Không phòng trong, không người.
- KHÔNG lấy ô văng phía trên, tường nhà, chuông gió, mưa, Mun. Ba ô cùng cỡ khung ngoài.

### 2. `l7_window_hook` → art/out/_sheets/l7src_l7_window_hook.png (1024x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l7_demo_s3.png, món nằm ở x 306–338, y 456–503 trong demo** (vùng chơi art/out/demo/l7_demo_s3_play.png: x 290–320, y 290–335).
- Ảnh cắt đính kèm: art/ref/l7_cut/l7_window_hook.png.
- Móc treo nhỏ bằng kim loại xám bạc nhạt (hoặc đồng nhạt) hình chữ J/dấu hỏi, có đế tròn nhỏ ở trên để gắn vào khung gỗ, đúng như móc giữa khung trên cửa sổ trong demo. Vẽ to hết khung.
- KHÔNG lấy khung gỗ, kính, phòng trong.

### 3. `l7_front_door` → art/out/_sheets/l7src_l7_front_door.png (1024x1536, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l7_demo_s3.png, món nằm ở x 686–1044, y 587–1215 trong demo** (vùng chơi art/out/demo/l7_demo_s3_play.png: x 650–990, y 415–1010).
- Ảnh cắt đính kèm: art/ref/l7_cut/l7_front_door.png.
- Cửa chính gỗ mật ong nhạt (màu nhạt như demo, **không nâu cam**), 2 ô panô chữ nhật bo góc (ô trên, ô dưới) viền caramel nhạt, tay nắm tròn vàng bơ bên phải, khung cửa gỗ mỏng bao quanh, đúng như demo. Vẽ đủ cả cửa tới mép dưới (chân cửa).
- KHÔNG lấy bậc thềm, tường, chuông gió và móc của nó, mưa.

### 4. `player_back_tv` → art/out/_sheets/l7src_player_back_tv.png (1024x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l7_demo_s3.png, món nằm ở x 316–533, y 677–856 trong demo** (vùng chơi art/out/demo/l7_demo_s3_play.png: x 300–505, y 500–670).
- Ảnh cắt đính kèm: art/ref/l7_cut/player_back_tv.png, art/out/player/player_ref.png (món này đính kèm cho image_gen đúng: ảnh demo gốc, ảnh cắt, các ảnh thêm này, owner_l1_style_ref — **bỏ** l1_depth_angle_ref để không quá 5 ảnh).
- Nhân vật (đúng art/out/player/player_ref.png: tóc xoăn bồng nâu caramel, áo len vàng bơ) **ngồi quay lưng** xem ti vi, nhìn từ phía sau: đầu tóc xoăn tròn to, hai vai và lưng áo len vàng bơ, hai tay để phía trước (không thấy), vẽ tới ngang eo (phần dưới bị lưng sofa che nên **cắt ngang gọn ở eo**), đúng như demo. Hơi nghiêng đầu như đang mải xem.
- KHÔNG lấy sofa, ti vi, khung cửa sổ, kính.

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
