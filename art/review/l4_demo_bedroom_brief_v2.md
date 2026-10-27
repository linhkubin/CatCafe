Vẽ ẢNH DEMO `l4_demo_bedroom` cho Level 4 "Quả chuối trên rèm", theo đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

- Lưu vào: art/out/demo/l4_demo_bedroom.png, cỡ 1024x1536 (dọc), CÓ NỀN đầy đủ (không trong suốt). Gọi image_gen MỘT lần, chép nguyên ảnh, không tự cắt hay xử lý. ĐƯỢC PHÉP GHI ĐÈ art/out/demo/l4_demo_bedroom.png (chỉ file này).
- Đặc tả: art/design-art-level4.md (mục 2 bố cục và mốc chiều cao, 2b góc nhìn/tỉ lệ/màu, mục 5 mô tả từng đồ, mục 6 bảng vị trí, mục 7 ảnh demo). Đọc trước khi vẽ.
- Ảnh tham chiếu (image_gen nhận TỐI ĐA 5 ảnh), mở HẾT bằng view_image trước khi vẽ và đính kèm cho image_gen:
  - art/ref/owner_l1_style_ref.png (MẪU CHUẨN màu và nét: nhạt, bão hoà thấp ~0,25, viền nâu mảnh nhạt, vân chì mịn)
  - art/out/demo/l3_demo_reveal.png (cùng camera, cách vẽ giao diện: tim, vòng tròn, nút dừng, túi đồ 4 ô, nút bóng đèn)
  - art/out/cats/sua_ref.png (Sữa, để vẽ gấu bông TRÔNG GIỐNG Sữa ngồi; trong ảnh KHÔNG có mèo)
  - art/out/demo/l4_demo_bedroom.png (ẢNH GỐC để chỉnh sửa)
- Trước khi gọi image_gen, viết phần "Nhắc lại quy tắc" (phong cách, góc nhìn, màu, nét, không chữ, nền, yêu cầu riêng của ảnh này) bằng lời của bạn. Tin nhắn cuối có phần "Tự kiểm" (từng quy tắc: đạt / không đạt + một câu lý do), SAVED, prompt cuối cùng đã gửi image_gen, một dòng chỗ chưa ổn.
- Sau khi lưu, đo độ bão hoà HSV trung bình của ảnh (Pillow) và ghi vào Tự kiểm; mục tiêu 0,22–0,30 như mẫu.


## LƯỢT 2 – CHỈNH SỬA TỪ ẢNH art/out/demo/l4_demo_bedroom.png (ĐƯỢC PHÉP GHI ĐÈ file này, chỉ file này)

Bản lượt 1 đã lưu ở art/out/_refs/l4_demo_bedroom_v1.png. Art 2D duyệt: màu, nét, không khí, hình dáng từng đồ, nhân vật và mèo đều TỐT, giữ nguyên. Dùng image_gen ở chế độ CHỈNH SỬA, ảnh lượt 1 là ẢNH GỐC (tham chiếu số 1), kèm art/ref/owner_l1_style_ref.png và art/out/demo/l3_demo_reveal.png (tối đa 5 ảnh). Chỉ sửa đúng các điểm dưới, mọi thứ khác giữ như ảnh gốc:

1. **Chân tường chung cho cả 3 phòng:** mép trên len chân tường gỗ caramel đúng **y = 1000** (ảnh gốc đang ở y≈960). Tường phía trên, sàn gỗ ván ngang phía dưới. Đồ đứng sát tường (đứng trên sàn sát chân tường) có đáy chạm ngay y≈1000–1020; đồ đứng phía trước có đáy thấp hơn nhưng **không thấp hơn y = 1160**.
2. **Túi đồ và nút bóng đèn nâng lên:** dải túi kem viền gỗ với 4 ô trống: tâm các ô y ≈ 1290 (x ≈ 205 / 348 / 492 / 635), đáy dải túi y ≈ 1380, quai túi trên mép trái. Nút bóng đèn tròn vàng bơ tâm (934, 1306). **Dưới y = 1386 chỉ là sàn gỗ trơn**, không có gì.
3. **Mũi tên chuyển phòng** đúng tâm y = 760, sát mép màn hình (chỉ ► tâm (960, 760), ảnh gốc đang quá cao ở y≈610).
4. **Không bóng đổ trên sàn** dưới đồ vật.
5. Đệm dựng, bàn đầu giường + đèn, giường đứng sát tường (đáy ≈ 1000–1080); gấu bông ngồi trước chân giường, đáy y ≈ 1150. Giữ nguyên hình dáng và cỡ tương đối.

Sau khi lưu: đo bão hoà HSV trung bình (mục tiêu 0,22–0,30), và trong "Tự kiểm" ghi từng điểm 1–5: đạt / không đạt + đo được y bao nhiêu.

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

## Nội dung: PHÒNG NGỦ lúc đầu màn (tường hồng phấn rất nhạt)

Toạ độ là điểm neo ("đáy" = giữa mép dưới). Không người, không mèo.
1. **Đệm dựng tựa tường** bên trái: đệm mỏng đứng thẳng, mặt trước chữ nhật đứng bo góc, dải hông phải hẹp, vải kem **chần ô quả trám to** (3 cột x 4 hàng, đường mảnh), viền mép xanh trời nhạt, hơi cong nhẹ như sắp đổ. Rộng 230, đáy (180, 1020) → x≈65–295, y≈570–1020.
2. **Bàn đầu giường + đèn ngủ** giữa đệm và giường: bàn gỗ caramel nhỏ 1 ngăn kéo núm tròn, 4 chân ngắn; trên mặt bàn đèn ngủ chân tròn kem, **chao vải vàng bơ** hình thang bo tròn, đèn tắt. Rộng 130, đáy (390, 1010), đỉnh chao đèn y≈680. Không có tất.
3. **Giường đơn** gỗ mật ong nhìn ngang dọc thân, **đầu giường bên TRÁI** cao bo tròn đỉnh (sát bàn đầu giường), chân giường bên phải thấp; nệm + chăn xanh trời nhạt chấm bi kem to (5–6 chấm) là dải dày nằm ngang, mặt nệm y≈880; 4 chân ngắn. Rộng 520, đáy (720, 1080) → x≈460–980.
4. **Gối** chữ nhật phồng trắng kem viền hồng phấn nằm trên nệm sát đầu giường, đáy (560, 880), rộng 150.
5. **Gấu bông trắng** ngồi trên sàn trước chân giường, đáy (820, 1150), rộng 150, cao ~170: lông **trắng ấm xù bông như Sữa**, ngồi tròn ủm, hai chân duỗi ra trước, **tai TRÒN** (tai gấu), mắt nút tròn nâu đen, mõm tròn kem, **nơ cổ bạc hà**. Nhìn thoáng qua tưởng mèo trắng ngồi (đồ đánh lừa) nhưng là gấu.
6. **Mũi tên ►** sát mép phải tâm (960, 760) chĩa PHẢI. Không mũi tên trái.
7. Giao diện như "Quy tắc riêng" (túi đồ 4 ô TRỐNG).

## Prompt gợi ý cho image_gen (tiếng Anh, ghép sau khối style + camera; sửa câu chữ được nhưng giữ đủ ý)
```
Cute mobile puzzle game screen, portrait 1024x1536, opaque full background, children's picture-book colored-pencil style exactly like the attached level-1 reference (light clear pastels, fine warm-brown pencil outlines, soft grain). Use the attached level-3 demo for the camera, UI and bag bar.
Scene: a calm BEDROOM, very pale rose-pink plain wall, caramel wood baseboard top at y~1000, honey horizontal floorboards below. Scale is smaller than level 1-3 (a cat would sit ~175px tall). No people, no cat.
- Left, leaning against the wall: a thin mattress standing UPRIGHT (x~65-295, y~570-1020), rounded rectangle front, narrow right side strip, cream fabric with big diamond quilting (3 by 4, thin lines), pale-blue piping, bending slightly as if about to topple.
- A small caramel bedside table with one drawer and short legs (130 wide, bottom (390,1010)); on it a bedside lamp with cream round base and a butter-yellow fabric shade (rounded trapezoid), lamp OFF, top of shade y~680.
- A single bed seen from the side along its length (x~460-980, bottom y=1080): tall rounded honey-wood HEADBOARD on the LEFT next to the bedside table, low footboard on the right, mattress and pale sky-blue blanket with 5-6 big cream polka dots as a thick horizontal band, top at y~880, four short legs.
- On the bed against the headboard: a puffy cream pillow with pink piping (150 wide, bottom (560,880)).
- On the floor in front of the foot of the bed: a fluffy WARM-WHITE teddy bear sitting (bottom (820,1150), 150 wide, ~170 tall), legs stretched forward, ROUND bear ears, round dark-brown button eyes, cream round muzzle, mint bow at the neck. At a glance it resembles a white kitten sitting, but it is clearly a teddy bear.
- Right screen edge centered (960,760): chubby cream arrow pointing RIGHT, caramel wood rim, thin brown outline. No left arrow.
UI as in the level-3 demo: top-left pink heart + four small circles (first three pink); top-right round cream pause button; bottom an EMPTY cream bag bar with four empty rounded square slots (slot centers y~1290); bottom-right round butter-yellow lightbulb button near (934,1306). Below y=1386 plain floor only. No map.
No other furniture or decorations (no rug, no pictures, no window). No text, numbers, letters, logos.
```
