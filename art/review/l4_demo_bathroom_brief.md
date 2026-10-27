Vẽ ẢNH DEMO `l4_demo_bathroom` cho Level 4, theo đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

- Lưu vào: art/out/demo/l4_demo_bathroom.png, cỡ 1024x1536 (dọc), CÓ NỀN đầy đủ (không trong suốt). Gọi image_gen MỘT lần, chép nguyên ảnh, không tự cắt hay xử lý. File chưa có; không ghi đè file khác.
- Đặc tả: art/design-art-level4.md (mục 2 bố cục, 2b góc nhìn/tỉ lệ/màu, mục 5 mô tả từng đồ, mục 6 bảng vị trí, mục 7 ảnh demo). Đọc trước khi vẽ.
- Ảnh tham chiếu, mở HẾT bằng view_image trước khi vẽ và đính kèm cho image_gen:
  - art/ref/owner_l1_style_ref.png (MẪU CHUẨN màu và nét: nhạt, bão hoà thấp ~0,25, viền nâu mảnh nhạt, vân chì mịn)
  - art/out/demo/l1_demo_start.png (style level 1, cách vẽ giao diện tim, vòng tròn, nút dừng, nút bóng đèn)
  - art/out/demo/l3_demo_start.png (demo level 3 đã duyệt, cùng camera)
  - art/out/cats/sua_ref.png, art/out/cats/sua_tail_peek.png (Sữa: chỉ thấy cái ĐUÔI trắng bông)
- Trước khi gọi image_gen, viết phần "Nhắc lại quy tắc" (phong cách, góc nhìn, màu, nét, không chữ, nền, yêu cầu riêng của ảnh này) bằng lời của bạn. Tin nhắn cuối có phần "Tự kiểm" (từng quy tắc: đạt / không đạt + một câu lý do), SAVED, prompt cuối cùng đã gửi image_gen, một dòng chỗ chưa ổn.
- Sau khi lưu, đo độ bão hoà HSV trung bình của ảnh (Pillow) và ghi vào Tự kiểm; mục tiêu 0,22–0,30 như mẫu.

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

COLOR
- Fresh, clear pastel colors with a little more saturation, like richly shaded colored pencil on cream paper: cheerful and bright, never washed out or greyish, never neon.
- Main palette: cream, warm white, peach, rosy pink, butter yellow, fresh mint green, leaf green, clear sky blue, warm honey-caramel wood, lavender.
- Medium-low saturation, soft contrast; colors should read clearly at small size. No strong dark shadows.
- Shading: only a few soft pencil strokes on one side; no gradients, no glossy highlights, no 3D render look.

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
CAMERA (one shared camera for the whole game): straight-on FRONT view, eye slightly above, looking down only about 15 degrees.
Horizontal edges stay horizontal, vertical edges stay vertical. NO three-quarter view, NO oblique/diagonal perspective, NO vanishing points, nothing rotated diagonally.
The front face is the main visible face; the top face is only a thin strip (about 1/5 of the front height); round tops are flat ellipses; a side face, if any, is only a narrow strip on the RIGHT.
Light from the upper left: a few pencil shading strokes on the right/bottom of each object. No floor shadow.
```

## Quy tắc riêng của demo Level 4
- Đây là bản vẽ của chính màn chơi: chỉ vẽ những đồ có trong đặc tả, đặt đúng chỗ theo toạ độ dưới đây (khung 1024x1536, sai số ±20px). Mọi đồ là một vật riêng rõ ràng (sau này tách sprite), viền nâu kín quanh mỗi đồ, không dính lẫn vào tường.
- Tường và sàn trơn, yên tĩnh; chân tường (mép trên len chân tường) ở y≈1180, sàn từ đó xuống đáy khung. Dải y 1386–1536 chỉ là sàn trơn (dải banner), không đặt gì.
- Giao diện trên cùng giống demo level 1/3: góc trên trái tim hồng + 4 vòng tròn nhỏ (3 vòng đầu tô hồng), góc trên phải nút dừng tròn kem viền gỗ; góc dưới phải nút bóng đèn tròn vàng bơ tâm ≈ (934, 1306). Không chữ, không số.

## Nội dung: NHÀ TẮM lúc đầu màn

Phòng (nền): tường sau phẳng, nửa trên xanh bạc hà rất nhạt trơn; từ y≈820 tới chân tường ốp **gạch vuông to màu kem**, ron mảnh nâu nhạt, nẹp gỗ mật ong mảnh ở mép trên ốp gạch; len chân tường kem, mép trên y≈1180; sàn gạch vuông to kem-hồng đào, ron mảnh. Sáng từ trên trái. Không cửa sổ. Không người.

Đồ vật (toạ độ là điểm neo, "đáy" = giữa mép dưới):
1. **Tủ gương treo tường** (trên trái): khung gỗ mật ong bo góc, rộng 330, cao ~300, đáy ở (250, 590) → mặt trước x≈85–415, y≈290–590; **nóc là dải gỗ mỏng phẳng** y≈280; một cánh kính xanh trời rất nhạt với 2 vệt sáng chéo ngắn, núm tròn nhỏ mép phải. Không phản chiếu gì.
2. **Đuôi Sữa**: một **đuôi trắng bông xù** của Sữa thò lên từ **sau mép nóc tủ gương**, phía phải nóc, cong như dấu hỏi, đầu đuôi tròn, đúng như sua_tail_peek.png. Thân mèo khuất hoàn toàn sau nóc, không thấy tai, không thấy mặt.
3. **Chậu rửa mặt sứ chân đứng** ngay dưới tủ gương: rộng 330, đáy chân trụ ở (250, 1200); miệng chậu elip dẹt ở y≈740 thấy lòng chậu nông (lỗ thoát nhỏ), thân chậu tròn mập, chân trụ thẳng loe nhẹ. Sứ trắng ấm, bóng chì xanh trời nhạt bên phải.
4. **Vòi đồng thau** vàng nhạt cổ cong trên gờ sau chậu, đáy ở (250, 745), rộng ~110, miệng vòi chĩa xuống lòng chậu, một tay vặn tròn mập trên đỉnh có chấm xanh. **Vòi khô, không có nước.**
5. **Thảm** xanh da trời nhạt chữ nhật bo góc nằm trên sàn trước chân chậu, đáy (250, 1290), rộng 280, tua ngắn hai đầu.
6. **Giá khăn gỗ caramel treo tường** (bên phải): tấm kệ dày nằm ngang, mặt nóc kệ là dải mỏng ở y≈400, x≈620–960; hai giá đỡ cong bên dưới; giữa hai giá đỡ là thanh treo tròn vắt **một khăn xanh bạc hà có 3 sọc kem to** rủ xuống tới y≈610.
7. **Khăn trắng cuộn tròn** nằm trên nóc kệ phía TRÁI (đáy ≈ (735, 400), rộng 150): khối bầu dục mập trắng ấm, một đầu thấy vòng xoắn cuộn khăn, mép vải bông xù như lông. Trông giống mèo trắng nằm cuộn, nhưng không tai, không mặt, không đuôi. Phía phải nóc kệ để trống.
8. **Bồn tắm chân đứng** (dưới phải): rộng 500, đáy chân ở (660, 1300) → x≈410–910, thân cao ~240; thân bầu dục dài men **hồng phấn nhạt**, miệng bồn là dải elip rất dẹt màu kem, 4 chân cong ngắn đồng thau. Bồn rỗng, không nước.
9. **Vịt cao su** vàng bơ mập nhìn nghiêng sang trái, mỏ cam đào, ngồi trên mép bồn tắm, đáy ≈ (820, 1080), rộng ~90.
10. **Mũi tên chuyển phòng**: mũi tên mập chĩa sang PHẢI, kem giấy viền gỗ caramel + viền nâu, sát mép phải, tâm (960, 760), rộng ~110.

Không bong bóng, không bàn tay, không nhân vật.

## Prompt gợi ý cho image_gen (tiếng Anh, ghép sau khối style + camera; sửa câu chữ được nhưng giữ đủ ý)
```
Cute mobile puzzle game screen, portrait 1024x1536, opaque full background, children's picture-book colored-pencil style exactly like the attached level-1 reference (light clear pastels, fine warm-brown pencil outlines, soft grain).
Scene: a calm small BATHROOM seen straight from the front, slightly from above (same camera as the level-1 living room).
Room: flat back wall across the whole frame, upper part very pale mint green plain; lower part (from y~820 to the baseboard) big square cream wall tiles with thin light-brown grout and a thin honey-wood trim on top; cream baseboard top at y~1180; floor of big square cream-peach tiles below. No window. Light from the upper left.
Objects, each a clear separate object with its own closed brown outline:
- Upper left: a wall-mounted honey-wood mirror cabinet (front x~85-415, y~290-590), thin flat wooden top strip at y~280, one pale sky-blue glass door with two short diagonal shine marks, small round knob on the right. Nothing reflected.
- From BEHIND the right part of the mirror cabinet's top, only a fluffy WHITE cat TAIL sticks up, curled like a question mark with a round tip (the cat from the reference, body completely hidden; no ears, no face).
- Directly below it: a white porcelain pedestal washbasin (330 wide, base at (250,1200)), basin rim a flat ellipse at y~740 showing a shallow bowl, chubby round basin body, straight pedestal flaring slightly at the floor.
- A pale brass curved faucet on the back ledge of the basin (about 110 wide), spout pointing down into the basin, one chubby round handle on top with a small blue dot. DRY, no water.
- A small pale sky-blue rounded bath mat on the floor in front of the pedestal (280 wide, bottom y~1290), short fringe.
- Right side: a caramel wooden wall shelf towel rack, thick horizontal shelf whose top surface is a thin strip at y~400 (x~620-960), two curved brackets, a round rail between them with one mint towel with three wide cream stripes hanging down to y~610.
- On the LEFT half of that shelf top: a rolled-up WHITE towel lying sideways (150 wide), chubby oval, spiral end visible, fluffy fabric edge; it looks a bit like a curled-up white cat but has no ears, no face, no tail. Right half of the shelf top is empty.
- Lower right: a freestanding clawfoot bathtub (x~410-910, feet bottom y~1300, body ~240 tall), long oval body in pale rose-pink enamel, rim a very flat cream ellipse, four short curved brass feet. Empty, no water.
- On the tub rim around (820,1080): a small chubby butter-yellow rubber duck seen from the side facing left, peach-orange beak.
- At the right screen edge, centered at (960,760): a chubby room-navigation arrow pointing RIGHT, cream paper with caramel wood rim and thin brown outline.
UI like the level-1 demo: top-left a pink heart and four small circles (first three filled pink); top-right a round cream pause button with wood rim; bottom-right a round butter-yellow lightbulb button centered near (934,1306). Bottom 150px (y>1386) is plain floor only.
No people, no visible cat body, no text, no numbers, no letters, no logos.
```
