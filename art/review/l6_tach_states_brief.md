TÁCH TỪ DEMO — lượt `l6_states` (Level 6, G6-21: Trạng thái và món phụ), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ; ngoại lệ "TÁCH TỪ DEMO": mỗi món một lần gọi image_gen, mỗi món một ảnh, 7 món).

**Ảnh demo gốc đã duyệt: art/out/demo/l6_demo_path_916.png** (khung điện thoại); vùng chơi không giao diện: **art/out/demo/l6_demo_path_play.png** (1024x1536, toạ độ bên dưới tính trên ảnh này).
Chủ dự án chốt demo này; tách từng món đúng như trong demo. Vị trí trong game do Dev sắp, không cần giữ chỗ đứng.

## Luật chung cho mọi món
- **Vẽ lại đúng món trong demo: cùng hình dáng, tỉ lệ, màu, chi tiết, nét.** Không tự thiết kế lại, **không thêm, không bớt chi tiết**, màu **không nhạt hơn, không đậm hơn** demo, cùng góc nhìn. (Riêng `l6_tree` vẽ đẹp hơn theo mẫu ghi ở món đó.)
- Món chưa có trong demo (dáng Lu, dáng Mun, trạng thái khác): **cùng thiết kế, màu, nét, cỡ đầu** như Lu, Mun trong demo; Lu theo art/out/dogs/lu_ref.png, Mun theo art/out/cats/mun_ref.png.
- Mỗi món: gọi image_gen **một lần**, đính kèm ảnh demo gốc + ảnh cắt của món + ảnh tham chiếu chung. **Nền TRONG SUỐT thật.** Món to hết cỡ trong khung, lề trong suốt khoảng 40px (G5-34), không bị cắt.
- **Chỉ đúng một món** trong ảnh. Không lấy đồ chồng lên, đồ phía sau, nền, bóng, quầng. Chỗ bị che: vẽ bù đúng thiết kế.
- Không chữ, không số, không khung, không bóng sàn, không viền trắng. **Mọi con vật nhìn sang phải.**
- Lưu từng món vào **art/out/_sheets/l6src_<key>.png** (đúng tên dưới; file mới; nếu đã có thì được phép ghi đè). Chép nguyên ảnh, không cắt, không xử lý.
- **Món ghi "Chỉnh sửa từ ảnh …"**: dùng chế độ chỉnh sửa trên ảnh `l6src_` đó (vẽ nó trước trong lượt nếu cùng lượt): giữ nguyên cỡ khung, vị trí, góc nhìn, màu, nét, chỉ đổi đúng phần ghi.
- Trước mỗi lần gọi image_gen viết "Nhắc lại quy tắc" (phong cách, góc nhìn, màu, nét, phần lấy / không lấy). Tin nhắn cuối có "Tự kiểm" **từng món** (giống demo về hình, tỉ lệ, màu, chi tiết; đã bỏ phần không lấy; nền trong suốt; không chữ: đạt / không đạt + lý do), SAVED từng file, prompt cuối từng món.

## Ảnh tham chiếu chung (mở hết bằng view_image)
1. art/out/demo/l6_demo_path_916.png — **ẢNH DEMO GỐC**.
2. art/out/demo/l6_demo_path_play.png — vùng chơi của demo (đo toạ độ).
3. art/ref/owner_l1_style_ref.png — chuẩn màu và chất chì.
4. art/ref/l1_depth_angle_ref.png — góc nhìn (sofa L1).

## Danh sách 7 món

### 1. `l6_picnic_basket_closed` → art/out/_sheets/l6src_l6_picnic_basket_closed.png (1024x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l6_demo_path_916.png, món nằm ở giỏ đóng ở cảnh mở màn art/out/demo/l6_demo_start_play.png x 0–175, y 650–800 trong art/out/demo/l6_demo_path_play.png.**
- Ảnh cắt từ demo: art/ref/l6_cut/crops/basket_closed_start_demo.png (đính kèm).
- **Chỉnh sửa từ ảnh art/out/_sheets/l6src_l6_picnic_basket_open.png** (giữ nguyên khung, cỡ, vị trí, màu, nét): **nắp đóng** khít, khăn kẻ ô hồng kem thò ra mép nắp, quai cầm trên nắp như giỏ ở cảnh mở màn.
- **KHÔNG lấy bàn.**

### 2. `l6_glove_black_fallen` → art/out/_sheets/l6src_l6_glove_black_fallen.png (1024x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l6_demo_path_916.png, món nằm ở (không có trong demo) trong art/out/demo/l6_demo_path_play.png.**
- Ảnh cắt từ demo: art/ref/l6_cut/crops/glove.png (đính kèm).
- **Chỉnh sửa từ ảnh art/out/_sheets/l6src_l6_glove_black_idle.png** (giữ màu, nét, cỡ găng): găng **nằm bẹp dưới đất**, xoè ngang, hai ngón không còn dựng, cổ găng hồng đào lộ ra. Đáy phẳng.


### 3. `l6_bone` → art/out/_sheets/l6src_l6_bone.png (1536x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l6_demo_path_916.png, món nằm ở khúc xương Lu ngậm trong chuồng, x 830–960, y 1120–1160 trong art/out/demo/l6_demo_path_play.png.**
- Ảnh cắt từ demo: art/ref/l6_cut/crops/lu_head.png (đính kèm).
- Khúc xương kem trắng ấm hai đầu tròn kép, đúng như khúc xương Lu ngậm trong demo. Nằm ngang.
- **KHÔNG lấy Lu, chuồng.**

### 4. `l6_sausage` → art/out/_sheets/l6src_l6_sausage.png (1536x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l6_demo_path_916.png, món nằm ở xúc xích Mun ăn trong art/out/demo/l6_demo_table_play.png, x 300–385, y 845–895 trong art/out/demo/l6_demo_path_play.png.**
- Ảnh cắt từ demo: art/ref/l6_cut/crops/sausage_table_demo.png (đính kèm).
- Khúc xúc xích hồng đào nhạt bóng nhẹ, hai đầu tròn, cong nhẹ, nguyên vẹn (chưa cắn). Nằm ngang.
- **KHÔNG lấy Mun, bàn.**

### 5. `l6_dog_chew` → art/out/_sheets/l6src_l6_dog_chew.png (1024x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l6_demo_path_916.png, món nằm ở đầu Lu trong cửa chuồng, x 750–960, y 985–1170 trong art/out/demo/l6_demo_path_play.png.**
- Ảnh cắt từ demo: art/ref/l6_cut/crops/lu_head.png (đính kèm).
- Đầu Lu (lu_ref) + hai bàn chân trước, như đang thò ra khỏi cửa chuồng: tai cụp vàng mật ong, mắt híp vui, má hồng, **ngậm khúc xương kem ngang miệng**, hai chân trước tì đất. Đáy phẳng (cắt ngang ở ngưỡng cửa).
- **KHÔNG lấy chuồng, cửa vòm tối, ngưỡng cửa.**

### 6. `mun_roof_crouch_ears_up` → art/out/_sheets/l6src_mun_roof_crouch_ears_up.png (1536x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l6_demo_path_916.png, món nằm ở Mun trên mái, x 600–845, y 310–475 trong art/out/demo/l6_demo_path_play.png.**
- Ảnh cắt từ demo: art/ref/l6_cut/crops/mun.png (đính kèm).
- Mun (mun_ref, mặt tròn, đen than ấm, mắt vàng mật ong) **nằm rạp** trên mặt phẳng, nhìn sang phải và hơi xuống, **tai dựng**, mắt tò mò, đuôi dựng cong sau lưng, hai chân trước duỗi ra trước. Đáy phẳng (bụng và chân chạm mặt mái).
- **KHÔNG lấy mái tôn, ống khói, dây phơi.**

### 7. `mun_roof_crouch` → art/out/_sheets/l6src_mun_roof_crouch.png (1536x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l6_demo_path_916.png, món nằm ở dáng sợ ở cảnh mở màn art/out/demo/l6_demo_start_play.png x 630–900, y 320–470 trong art/out/demo/l6_demo_path_play.png.**
- Ảnh cắt từ demo: art/ref/l6_cut/crops/mun_crouch_start_demo.png (đính kèm).
- **Chỉnh sửa từ ảnh art/out/_sheets/l6src_mun_roof_crouch_ears_up.png** (giữ khung, cỡ, vị trí thân, màu, nét): chỉ đổi **hai tai CỤP rạp ra sau**, mắt to sợ hãi, **đuôi quấn sát người** (không dựng), thân nép sát xuống hơn một chút.


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
