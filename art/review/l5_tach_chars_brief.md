TÁCH TỪ DEMO — lượt `chars` (Level 5, G5-22, G5-23), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ; ngoại lệ "TÁCH TỪ DEMO": mỗi món một lần gọi image_gen, mỗi món một ảnh).

**Ảnh demo gốc của lượt này: art/out/demo/l5_demo_yard_916.png** (phòng sân sau, khung điện thoại); vùng chơi không giao diện: **art/out/demo/l5_demo_yard_play.png** (1024x1536, toạ độ bên dưới tính trên ảnh này). Thêm demo: art/out/demo/l5_demo_reveal_916.png / art/out/demo/l5_demo_reveal_ext.png.
Chủ dự án: "tách cái nào hãy gửi lại demo của cái đó và promt thấy kỹ đừng để tách sai so với demo".

## Luật chung cho mọi món
- **Vẽ lại đúng món trong demo: cùng hình dáng, tỉ lệ, màu, chi tiết, nét.** Không tự thiết kế lại, không làm đẹp thêm, **không thêm, không bớt chi tiết**, màu **không nhạt hơn, không đậm hơn** demo, cùng góc nhìn.
- Mỗi món: gọi image_gen **một lần**, đính kèm ảnh demo gốc + ảnh cắt của món đó (nếu có) + các ảnh tham chiếu ở dưới. **Nền TRONG SUỐT thật.** Món nằm giữa ảnh, to vừa khung (chiếm ~70–80% chiều dài khung), cách mép ≥ 40px, không bị cắt.
- **Chỉ đúng một món** trong ảnh. Không lấy đồ chồng lên, đồ phía sau, nền, bóng, quầng, tia, đốm sáng (trừ khi món chính là nó). Chỗ bị che: vẽ bù đúng thiết kế.
- Không chữ, không số, không khung, không bóng sàn, không viền trắng.
- Lưu từng món vào **art/out/_sheets/l5src_<key>.png** (đúng tên dưới; file mới, không ghi đè). Chép nguyên ảnh, không cắt, không xử lý.
- **Trạng thái "chỉnh sửa từ món vừa tách"**: dùng chế độ chỉnh sửa trên ảnh `l5src_` của món đó vừa lưu: **giữ nguyên cỡ khung, vị trí, góc nhìn, màu, nét**, chỉ đổi đúng phần ghi.
- Trước mỗi lần gọi image_gen viết "Nhắc lại quy tắc" (phong cách, góc nhìn, màu, nét, phần lấy / không lấy của món). Tin nhắn cuối có "Tự kiểm" **từng món** (giống demo về hình, tỉ lệ, màu, chi tiết; đã bỏ phần không lấy; nền trong suốt; không chữ: đạt / không đạt + lý do), SAVED từng file, prompt cuối từng món.

## Ảnh tham chiếu chung (mở hết bằng view_image)
1. art/out/demo/l5_demo_yard_916.png — **ẢNH DEMO GỐC**.
2. art/out/demo/l5_demo_yard_play.png — vùng chơi của demo (đo toạ độ).
3. art/out/demo/l5_demo_reveal_916.png và art/out/demo/l5_demo_reveal_ext.png — demo thêm.
4. art/out/cats/mun_ref.png — Mun
5. art/out/cats/sua_held.png — mẫu tư thế bế
6. art/out/cats/sua_ref.png — Sữa
7. art/out/player/player_ref.png — nhân vật chính
8. art/out/player/player_silly_laugh.png — mẫu nét và tỉ lệ nhân vật
9. art/ref/owner_l1_style_ref.png — chuẩn màu và chất chì.
10. art/ref/l1_depth_angle_ref.png — góc nhìn (sofa L1).

## Danh sách 4 món

### 1. `mun_held` → art/out/_sheets/l5src_mun_held.png (1024x1536, nền trong suốt)
- Ảnh cắt từ demo: art/ref/l5_cut/crops/mun_pin.png (đính kèm).
- **Tư thế bế**, giống hệt tư thế art/out/cats/sua_held.png nhưng là **Mun** (đúng Mun trong demo lộ diện và mun_ref): thõng người treo, hai chân trước dang ngang hai bên (chỗ tay người bế nách), mắt nhắm cười híp, miệng ω, thân dài buông, hai chân sau buông, đuôi dài thõng xuống. Nhìn chính diện, nách ở ~42% chiều cao. Ảnh dọc.

### 2. `mun_face_icon` → art/out/_sheets/l5src_mun_face_icon.png (1024x1024, nền trong suốt)
- Ảnh cắt từ demo: art/ref/l5_cut/crops/mun_pin.png (đính kèm).
- **Mặt Mun** chính diện (đầu, tai, chút cổ), đúng Mun trong demo lộ diện: mắt vàng to mở tròn, má hồng, miệng ω, dễ thương. Đầu tròn đủ, chiếm ~80% khung.

### 3. `sua_press_window` → art/out/_sheets/l5src_sua_press_window.png (1024x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l5_demo_yard_916.png, món cần vẽ nằm ở x 132–352, y 600–780 trong art/out/demo/l5_demo_yard_play.png.** Vẽ lại đúng món này: cùng hình dáng, tỉ lệ, màu, chi tiết, nét.
- Ảnh cắt từ demo: art/ref/l5_cut/crops/sua_window.png (đính kèm).
- **(Lấy từ demo sân sau)** Sữa trong cửa sổ quán: mặt tròn trắng xù, mắt xanh, má hồng, hai bàn chân trước tì lên mép dưới, tò mò.
- **KHÔNG lấy khung, kính, bên trong quán.**
- **Vẽ thêm ngực và thân Sữa xuống dưới mép bậu ~25% chiều cao đầu** (phần này nằm sau bậu trong game). Hai bàn chân trước giữ chỗ cũ. Không đổi mặt, không xoay đầu.

### 4. `player_cover_nose` → art/out/_sheets/l5src_player_cover_nose.png (1024x1536, nền trong suốt)
- Nhân vật chính (đúng art/out/player/player_ref.png; **nét, màu, tỉ lệ như art/out/player/player_silly_laugh.png**: nét viền mảnh nâu ấm, không đậm, không gần đen, tóc nhạt): **đứng, một tay bịt mũi**, tay kia phẩy trước mặt, mặt nhăn, mắt nhắm tịt, má hồng: kiểu "eo, hôi quá" vui. Ảnh dọc, cả người, dép bông.

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
