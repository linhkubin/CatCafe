Vẽ ẢNH DEMO `l4_demo_living` cho Level 4 "Quả chuối trên rèm", theo đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

- Lưu vào: art/out/demo/l4_demo_living.png, cỡ 1024x1536 (dọc), CÓ NỀN đầy đủ (không trong suốt). Gọi image_gen MỘT lần, chép nguyên ảnh, không tự cắt hay xử lý. ĐƯỢC PHÉP GHI ĐÈ art/out/demo/l4_demo_living.png (chỉ file này).
- Đặc tả: art/design-art-level4.md (mục 2 bố cục và mốc chiều cao, 2b góc nhìn/tỉ lệ/màu, mục 5 mô tả từng đồ, mục 6 bảng vị trí, mục 7 ảnh demo). Đọc trước khi vẽ.
- Ảnh tham chiếu (image_gen nhận TỐI ĐA 5 ảnh), mở HẾT bằng view_image trước khi vẽ và đính kèm cho image_gen:
  - art/ref/owner_l1_style_ref.png (MẪU CHUẨN màu và nét: nhạt, bão hoà thấp ~0,25, viền nâu mảnh nhạt, vân chì mịn)
  - art/out/demo/l3_demo_reveal.png (cùng camera, cách vẽ giao diện: tim, vòng tròn, nút dừng, túi đồ 4 ô, nút bóng đèn)
  - art/out/cats/sua_ref.png (Sữa)
  - art/out/player/player_ref.png (nhân vật)
  - art/out/demo/l4_demo_living.png (ẢNH GỐC để chỉnh sửa)
- Trước khi gọi image_gen, viết phần "Nhắc lại quy tắc" (phong cách, góc nhìn, màu, nét, không chữ, nền, yêu cầu riêng của ảnh này) bằng lời của bạn. Tin nhắn cuối có phần "Tự kiểm" (từng quy tắc: đạt / không đạt + một câu lý do), SAVED, prompt cuối cùng đã gửi image_gen, một dòng chỗ chưa ổn.
- Sau khi lưu, đo độ bão hoà HSV trung bình của ảnh (Pillow) và ghi vào Tự kiểm; mục tiêu 0,22–0,30 như mẫu.


## LƯỢT 2 – CHỈNH SỬA TỪ ẢNH art/out/demo/l4_demo_living.png (ĐƯỢC PHÉP GHI ĐÈ file này, chỉ file này)

Bản lượt 1 đã lưu ở art/out/_refs/l4_demo_living_v1.png. Art 2D duyệt: màu, nét, không khí, hình dáng từng đồ, nhân vật và mèo đều TỐT, giữ nguyên. Dùng image_gen ở chế độ CHỈNH SỬA, ảnh lượt 1 là ẢNH GỐC (tham chiếu số 1), kèm art/ref/owner_l1_style_ref.png và art/out/demo/l3_demo_reveal.png, art/out/cats/sua_ref.png, art/out/player/player_ref.png (tối đa 5 ảnh). Chỉ sửa đúng các điểm dưới, mọi thứ khác giữ như ảnh gốc:

1. **Chân tường chung cho cả 3 phòng:** mép trên len chân tường gỗ caramel đúng **y = 1000** (ảnh gốc đang ở y≈1100). Tường phía trên, sàn gỗ ván ngang phía dưới. Đồ đứng sát tường (đứng trên sàn sát chân tường) có đáy chạm ngay y≈1000–1020; đồ đứng phía trước có đáy thấp hơn nhưng **không thấp hơn y = 1160**.
2. **Túi đồ và nút bóng đèn nâng lên:** dải túi kem viền gỗ với 4 ô trống: tâm các ô y ≈ 1290 (x ≈ 205 / 348 / 492 / 635), đáy dải túi y ≈ 1380, quai túi trên mép trái. Nút bóng đèn tròn vàng bơ tâm (934, 1306). **Dưới y = 1386 chỉ là sàn gỗ trơn**, không có gì.
3. **Mũi tên chuyển phòng** đúng tâm y = 760, sát mép màn hình (◄ tâm (64, 760) và ► tâm (960, 760)).
4. **Không bóng đổ trên sàn** dưới đồ vật.
5. **Tháp và nhân vật:** vì sàn nâng lên và túi nâng lên, đặt **đáy tháp (đáy đệm) ở y ≈ 1150**, cùng trục x như ảnh gốc. Thu nhỏ đều cả tháp và bạn nhỏ còn khoảng 85–90% để **đầu ngón tay bạn nhỏ vẫn ở ngay dưới chân sau của Sữa, sát nhưng chưa chạm**, như ảnh gốc. Giữ thứ tự tháp đệm → vali → sách → gối, bạn nhỏ đứng trên gối, kiễng chân, hai tay giơ cao.
6. **Sữa** giữ nguyên chỗ bám dưới thanh rèm; cho **thân duỗi dài hơn một chút, hơi cong như quả chuối**, hai chân sau dang ra.
7. Sofa đứng trên sàn sát tường, đáy y ≈ 1080. Kính cửa sổ chỉ có trời và 1 mây, bỏ cây ngoài cửa sổ.

Sau khi lưu: đo bão hoà HSV trung bình (mục tiêu 0,22–0,30), và trong "Tự kiểm" ghi từng điểm 1–7: đạt / không đạt + đo được y bao nhiêu.

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
- Đây là bản vẽ của chính màn chơi: chỉ vẽ những đồ có trong đặc tả, đặt đúng chỗ theo toạ độ dưới đây (khung 1024x1536, sai số ±20px). Mọi đồ là một vật riêng rõ ràng (sau này tách sprite), viền nâu kín quanh mỗi đồ, không dính lẫn vào tường. Không thêm đồ trang trí nào khác (không tranh, không kệ, không thảm, không cây) ngoài danh sách.
- **Tỉ lệ level này nhỏ hơn level 1–3**: nhân vật cao ~400px, mèo Sữa ngồi cao ~175px. Mọi đồ cùng tỉ lệ đó.
- Tường trơn yên tĩnh, không đường trần; **chân tường (mép trên len gỗ caramel) ở y≈1000**, sàn gỗ ván ngang mật ong như level 1 từ đó xuống đáy khung.
- Giao diện giống l3_demo_reveal.png: góc trên trái tim hồng + 4 vòng tròn nhỏ (3 vòng đầu tô hồng); góc trên phải nút dừng tròn kem viền gỗ (tâm ≈ (951, 66)); **túi đồ** dải kem viền gỗ caramel bo tròn với **4 ô vuông trống**, quai túi nhỏ trên mép trái, nằm ở đáy (ô túi tâm y≈1290, x≈205/348/492/635); nút bóng đèn tròn vàng bơ tâm ≈ (934, 1306). Dưới y=1386 chỉ là sàn gỗ trơn (dải banner). Không bản đồ. Không chữ, không số.
- Mũi tên chuyển phòng: mũi tên mập kem giấy, viền gỗ caramel + viền nâu mảnh, rộng ~110, tâm y=760, sát mép màn hình.

## Nội dung: PHÒNG KHÁCH lúc cao trào (tường kem giấy)

Toạ độ là điểm neo ("đáy" = giữa mép dưới).
1. **Cửa sổ** cao 2 cánh, khung kem bo góc, kính xanh trời nhạt có 1 đám mây nhỏ, bệ cửa mỏng trống: x≈165–565, y≈200–640.
2. **Thanh rèm gỗ** caramel tròn nằm ngang ở y≈150, x≈145–585, hai đầu núm tròn. Treo ở **nửa trái** thanh là **một tấm rèm dài vải dày hồng đào ấm** (x≈165–425), 6 khoen gỗ, 4–5 nếp dọc mềm, buông thẳng xuống, gấu hơi xòe chạm sàn ở y≈1000. Đỉnh rèm phẳng, không cục phồng. Nửa phải cửa sổ thấy kính.
3. **Sữa treo kiểu "quả chuối"** ngay dưới thanh rèm, trên đỉnh tấm rèm: **hai chân trước giơ thẳng lên bám vào vải rèm ở (305, 200)**, thân trắng bông **duỗi dài như sợi mì**, hơi cong như quả chuối, hai chân sau dang ra hai bên, đuôi bông thõng xuống; chân sau thấp nhất ở y≈420. Mặt nhìn người xem ngơ ngác, miệng mở kêu meo. Đúng Sữa trong sua_ref.png (lông trắng ấm xù, đầu to tròn, mắt to xanh lòng đen nâu to, tai hồng, má hồng, không đốm, không vòng cổ). Sữa nằm TRƯỚC rèm.
4. **Tháp 4 món** xếp ngay ngắn dưới rèm, cùng trục giữa x=305, từ dưới lên (mỗi món nằm ngang, mặt trên phẳng):
   - **đệm** gấp đôi kem chần ô quả trám to, viền xanh trời nhạt: rộng 340, đáy y=1140, cao ~100;
   - **vali** vàng bơ gập dẹt nằm ngang, 2 đai sọc bạc hà, góc bọc caramel: rộng 260, cao ~115;
   - **chồng 5–6 cuốn sách** vuông vức, gáy pastel (hồng, bạc hà, xanh trời, vàng bơ, oải hương), không chữ: rộng 180, cao ~90;
   - **gối** trắng kem viền hồng phấn, phồng: rộng 150, cao ~65, mặt trên ở y≈770.
5. **Nhân vật** (đúng player_ref.png: tóc xoăn bồng nâu caramel, áo len vàng bơ rộng, quần xanh trời nhạt, dép bông kem, mặt tròn, má hồng) **đứng trên gối**, hai bàn chân ở (305, 770), **kiễng chân**, người vươn thẳng, **hai tay giơ cao quá đầu với lên**, đầu ngón tay ở y≈360, sát ngay dưới chân sau của Sữa nhưng chưa chạm. Mặt ngửa lên nhìn Sữa, miệng chữ o cố gắng. Cao ~400 (không tính tay), ~440 tính tay giơ.
6. **Sofa** 2 chỗ xanh bạc hà nhạt (2 gối lưng, tay vịn cuộn, 2 đệm ngồi, 4 chân gỗ ngắn), sát tường bên phải: rộng 360, đáy (830, 1080) → x≈650–1010, cao ~175.
7. **Mũi tên ◄** sát mép trái tâm (64, 760) chĩa TRÁI, và **mũi tên ►** sát mép phải tâm (960, 760) chĩa PHẢI.
8. Giao diện như "Quy tắc riêng" (túi đồ 4 ô TRỐNG).

## Prompt gợi ý cho image_gen (tiếng Anh, ghép sau khối style + camera; sửa câu chữ được nhưng giữ đủ ý)
```
Cute mobile puzzle game screen, portrait 1024x1536, opaque full background, children's picture-book colored-pencil style exactly like the attached level-1 reference (light clear pastels, fine warm-brown pencil outlines, soft grain). Use the attached level-3 demo for the camera, UI and bag bar.
Scene: a calm LIVING ROOM, warm cream-paper plain wall, caramel wood baseboard top at y~1000, honey horizontal floorboards below. Characters are SMALLER than in level 1-3: the child is about 400px tall, the cat about 175px when sitting.
- Tall two-pane window x~165-565, y~200-640, cream frame, pale sky-blue glass with one small cloud, thin empty sill.
- A round caramel wooden curtain rod at y~150 from x~145 to 585 with round end knobs. Hanging from its LEFT half only: ONE long panel of thick warm peach curtain fabric (x~165-425), six wooden rings, a few soft vertical folds, falling straight down to the floor (hem touches floor at y~1000). Flat top, no bulge. The right half of the window shows glass.
- Sua, the fluffy white kitten from the reference, hangs from the top of the curtain like a BANANA: both front paws stretched straight up gripping the fabric at (305,200), body stretched long like a noodle with a gentle banana curve, hind legs splayed out, fluffy tail dangling; lowest hind foot at y~420. Face toward viewer, round blue eyes with big brown pupils, pink ears and cheeks, open mouth meowing, dazed. In front of the curtain.
- Directly under the curtain, centered on x=305, a neat 4-level TOWER, each item lying flat with a flat top: bottom a folded cream mattress with big diamond quilting and pale-blue piping (340 wide, ~100 tall, bottom y=1140); then a flattened butter-yellow suitcase lying horizontally with two mint straps and caramel corners (260 wide, ~115 tall); then a perfectly square stack of 5-6 books with plain pastel spines, no writing (180 wide, ~90 tall); top a puffy cream pillow with pink piping (150 wide, ~65 tall), its top at y~770.
- The child from player_ref (fluffy curly caramel hair, oversized butter-yellow sweater, light sky-blue pants, cream fluffy slippers, round face, pink cheeks) stands ON the pillow, feet at (305,770), on tiptoe, body stretched, BOTH ARMS RAISED HIGH above the head reaching up, fingertips at y~360 just below the cat's hind feet but not touching, face tilted up, small round "o" mouth.
- Right side against the wall: a small two-seat pale mint sofa (two back cushions, rolled arms, two seat cushions, four short wooden legs), x~650-1010, bottom y=1080.
- Left screen edge centered (64,760): chubby cream arrow pointing LEFT; right screen edge centered (960,760): chubby cream arrow pointing RIGHT; caramel wood rim, thin brown outline.
UI as in the level-3 demo: top-left pink heart + four small circles (first three pink); top-right round cream pause button; bottom an EMPTY cream bag bar with four empty rounded square slots (slot centers y~1290); bottom-right round butter-yellow lightbulb button near (934,1306). Below y=1386 plain floor only. No map.
No other furniture or decorations. No text, numbers, letters, logos.
```
