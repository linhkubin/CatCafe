TÁCH TỪ DEMO — lượt `l7_tach_3` (Level 7 "Về nhà thôi, Mun!", G5-23), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ; ngoại lệ "TÁCH TỪ DEMO": mỗi món một lần gọi image_gen, mỗi món một ảnh). Model gpt-6.1-sol, mức medium. Chủ dự án đã duyệt demo, dặn: "cố gắng tách sao cho giống demo".

**Ảnh demo gốc của lượt này: art/out/demo/l7_demo_s2.png** (khung 1080x1920; toạ độ "trong demo" tính trên ảnh này). Cùng cảnh không giao diện: art/out/demo/l7_demo_s2_play.png (1024x1536, toạ độ "vùng chơi").

## Luật chung cho mọi món
- **Vẽ lại đúng món trong demo: cùng hình dáng, tỉ lệ, màu, chi tiết, nét.** Không tự thiết kế lại. Màu **không đậm hơn, không nhạt hơn** demo (demo là đêm mưa tông nhạt pastel). Cùng góc nhìn.
- Mỗi món: gọi image_gen **một lần**, đính kèm (tối đa 5 ảnh) ảnh demo gốc + ảnh cắt của món + art/ref/owner_l1_style_ref.png + art/ref/l1_depth_angle_ref.png. **Nền TRONG SUỐT thật** (giữ kênh alpha).
- **Lấp gần kín khung (G5-34):** khung ghi cạnh tên món; món to hết cỡ, lề trong suốt quanh món chỉ ~40px, không bị cắt.
- **Chỉ đúng một món.** Không lấy mưa (vệt mưa), giọt nước bay, Mun, đồ chồng lên, đồ phía sau, tường, nền, bóng, quầng. Chỗ bị che: vẽ bù đúng thiết kế.
- Không chữ, không số, không khung, không bóng sàn, không viền trắng quanh món.
- Lưu từng món vào đúng tên dưới (file mới, không ghi đè). Chép nguyên ảnh, không cắt, không xử lý.
- Trước mỗi lần gọi image_gen viết "Nhắc lại quy tắc" (phong cách, góc nhìn, màu, nét, phần lấy / không lấy của món). Tin nhắn cuối có "Tự kiểm" **từng món** (giống demo về hình, tỉ lệ, màu, chi tiết; đã bỏ phần không lấy; lấp kín khung; nền trong suốt; không chữ: đạt / không đạt + lý do), SAVED từng file, prompt cuối từng món.

## Ảnh tham chiếu chung (mở hết bằng view_image)
1. art/out/demo/l7_demo_s2.png — **ẢNH DEMO GỐC**.
2. art/out/demo/l7_demo_s2_play.png — cùng cảnh, đo toạ độ vùng chơi.
3. art/ref/owner_l1_style_ref.png — chuẩn màu và chất chì.
4. art/ref/l1_depth_angle_ref.png — góc nhìn.

## Danh sách 7 món

### 1. `l7_tree_shop` → art/out/_sheets/l7src_l7_tree_shop.png (1024x1536, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l7_demo_s2.png, món nằm ở x 791–1080, y 503–1310 trong demo** (vùng chơi art/out/demo/l7_demo_s2_play.png: x 750–1024, y 335–1100).
- Ảnh cắt đính kèm: art/ref/l7_cut/l7_tree_shop.png.
- Cây to đầu sân: **tán tròn xanh lá nhạt** rậm (vài lá rời ở mép), thân caramel thẳng hơi cong, gốc có một túm cỏ nhỏ, đúng như demo. Vẽ **đủ cả cây** (phần bị mép phải khung cắt thì vẽ bù cho cân, tán tròn đều).
- KHÔNG lấy Mun ngồi dưới gốc, tường rào, hàng cây xa, mưa, giọt nước rơi.

### 2. `l7_shop_table` → art/out/_sheets/l7src_l7_shop_table.png (1536x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l7_demo_s2.png, món nằm ở x 548–796, y 1104–1284 trong demo** (vùng chơi art/out/demo/l7_demo_s2_play.png: x 520–755, y 905–1075).
- Ảnh cắt đính kèm: art/ref/l7_cut/l7_shop_table.png.
- Bàn nhựa tròn thấp **trắng ấm**, mặt bàn là elip thấy rõ mặt trên, **lỗ cắm ô tròn nhỏ trống ở chính giữa mặt bàn**, một lớp nước đọng xanh da trời rất nhạt trên mặt, 4 chân tròn ngắn, đúng như demo.
- KHÔNG lấy Mun, chó, sân, mưa.

### 3. `l7_umbrella_closed` → art/out/_sheets/l7src_l7_umbrella_closed.png (1536x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l7_demo_s2.png, món nằm ở x 543–986, y 1352–1447 trong demo** (vùng chơi art/out/demo/l7_demo_s2_play.png: x 515–935, y 1140–1230).
- Ảnh cắt đính kèm: art/ref/l7_cut/l7_umbrella_closed.png.
- Cây ô to của quán **đang gập**, nằm ngang trên nền: vải **hồng phấn** xếp nếp quấn quanh cán, chóp nhọn bên trái, cán gỗ mật ong dài bên phải có tay cầm tròn, đúng như demo.
- KHÔNG lấy nền, vũng nước, mưa.

### 4. `l7_umbrella_open` → art/out/_sheets/l7src_l7_umbrella_open.png (1024x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l7_demo_s2.png, món nằm ở x 543–986, y 1352–1447 trong demo** (vùng chơi art/out/demo/l7_demo_s2_play.png: x 515–935, y 1140–1230).
- Ảnh cắt đính kèm: art/ref/l7_cut/l7_umbrella_open.png, art/out/_sheets/l7src_l7_umbrella_closed.png (món này đính kèm cho image_gen đúng: ảnh demo gốc, ảnh cắt, các ảnh thêm này, owner_l1_style_ref — **bỏ** l1_depth_angle_ref để không quá 5 ảnh).
- **Không có trong demo: chỉnh sửa từ món vừa tách (art/out/_sheets/l7src_l7_umbrella_closed.png), chỉ đổi dáng**: cây ô **bung tròn**, cắm **thẳng đứng**: tán vòm tròn rộng nhìn hơi từ dưới/ngang, 8 múi vải hồng phấn (cùng màu, nét, chất vải như ô gập), mép tán lượn nhẹ, chóp nhỏ trên đỉnh, **cán gỗ mật ong thẳng đứng dài xuống tới đáy ảnh** (đầu cán dưới để cắm lỗ bàn). Tán rộng hơn chiều cao cả cây ô một chút.
- KHÔNG vẽ bàn, nền, mưa. Đính kèm thêm ô gập vừa tách làm mẫu màu.

### 5. `l7_box_carton_open` → art/out/_sheets/l7src_l7_box_carton_open.png (1024x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l7_demo_s2.png, món nằm ở x 211–612, y 751–1083 trong demo** (vùng chơi art/out/demo/l7_demo_s2_play.png: x 200–580, y 570–885).
- Ảnh cắt đính kèm: art/ref/l7_cut/l7_box_carton_open.png.
- Thùng các-tông **rất to**, **đặt ngửa mở nắp**: miệng hướng lên, 4 vạt nắp vểnh ra (2 vạt dài trái phải, vạt trước sau ngắn), màu caramel nhạt, vài nét chì nếp gấp, thấy chút lòng thùng tối nhạt bên trong, đúng như demo.
- KHÔNG lấy cửa cuốn, tường quán, chó, xe đạp, mưa.

### 6. `l7_box_carton_side` → art/out/_sheets/l7src_l7_box_carton_side.png (1024x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l7_demo_s2.png, món nằm ở x 211–612, y 751–1083 trong demo** (vùng chơi art/out/demo/l7_demo_s2_play.png: x 200–580, y 570–885).
- Ảnh cắt đính kèm: art/ref/l7_cut/l7_box_carton_side.png, art/out/_sheets/l7src_l7_box_carton_open.png (món này đính kèm cho image_gen đúng: ảnh demo gốc, ảnh cắt, các ảnh thêm này, owner_l1_style_ref — **bỏ** l1_depth_angle_ref để không quá 5 ảnh).
- **Không có trong demo: chỉnh sửa từ món vừa tách (art/out/_sheets/l7src_l7_box_carton_open.png), chỉ đổi dáng**: cùng thùng đó **lật nghiêng nằm ngang**, **miệng thùng quay ra phía trước** (về phía người xem) thành một cái hang: thấy rõ lòng thùng hình chữ nhật tối nhạt (caramel đậm hơn chút, không đen), vạt nắp trên **chìa ra như mái hiên** che miệng, hai vạt bên mở sang hai bên, vạt dưới nằm bẹp trên nền. Cùng màu, nét, cỡ thùng.
- KHÔNG vẽ chó, nền, mưa. Đính kèm thêm thùng ngửa vừa tách làm mẫu.

### 7. `l7_twig` → art/out/_sheets/l7src_l7_twig.png (1536x1024, nền trong suốt)
- **Ảnh demo gốc: art/out/demo/l7_demo_s2.png, món nằm ở x 786–886, y 1595–1669 trong demo** (vùng chơi art/out/demo/l7_demo_s2_play.png: x 745–840, y 1370–1440).
- Ảnh cắt đính kèm: art/ref/l7_cut/l7_twig.png.
- Một que cành nhỏ khô caramel mảnh, thẳng hơi cong, một nhánh con ngắn và **một** lá xanh nhỏ, nằm ngang, đơn giản hơn cành gãy trang trí (đây là cành nhỏ bay rơi trong gió).
- KHÔNG lấy nền, vũng nước, mưa.

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
