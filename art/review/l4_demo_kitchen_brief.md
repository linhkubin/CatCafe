Vẽ ẢNH DEMO `l4_demo_kitchen` cho Level 4, theo đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ).

- Lưu vào: art/out/demo/l4_demo_kitchen.png, cỡ 1024x1536 (dọc), CÓ NỀN đầy đủ (không trong suốt). Gọi image_gen MỘT lần, chép nguyên ảnh, không tự cắt hay xử lý. File chưa có; không ghi đè file khác.
- Đặc tả: art/design-art-level4.md (mục 2 bố cục, 2b góc nhìn/tỉ lệ/màu, mục 5 mô tả từng đồ, mục 6 bảng vị trí, mục 7 ảnh demo). Đọc trước khi vẽ.
- Ảnh tham chiếu, mở HẾT bằng view_image trước khi vẽ và đính kèm cho image_gen:
  - art/ref/owner_l1_style_ref.png (MẪU CHUẨN màu và nét: nhạt, bão hoà thấp ~0,25, viền nâu mảnh nhạt, vân chì mịn)
  - art/out/demo/l1_demo_start.png, art/out/demo/l1_demo_reveal.png (style level 1, cách vẽ giao diện tim, vòng tròn, nút dừng, nút bóng đèn)
  - art/out/demo/l3_demo_start.png (demo level 3 đã duyệt, cùng camera)
  - art/out/common/ui_hand_pointer.png (bàn tay hướng dẫn)
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

## Nội dung: BẾP, tủ dưới bồn ĐANG MỞ, thấy 6 ô ống (mini game xoay ống)

Phòng (nền): tường **kem bơ ấm** trơn; một dải **gạch ốp kem** ron mảnh ngang y≈560–700, x≈150–910 (ngay sau mặt bếp); len chân tường gỗ caramel, mép trên y≈1180; sàn gỗ ván ngang mật ong như level 1. Sáng từ trên trái. Không người (chỉ có bàn tay hướng dẫn), không mèo.

Đồ vật (toạ độ là điểm neo, "đáy" = giữa mép dưới):
1. **Cửa sổ** trên phải: 2 cánh kính nhìn thẳng, khung kem, kính xanh trời nhạt thấy trời và 1 đám mây nhỏ, **rèm ngắn bạc hà** buộc hai bên, bệ cửa dải mỏng với **một chậu cây nhỏ**; rộng 380, đáy bệ (710, 500) → x≈520–900, y≈200–500.
2. **Mặt bếp gỗ mật ong** chạy ngang x≈150–910: mặt trên dải mỏng y≈680, cạnh trước dày ~40, đáy y≈720. Lõm vào phía phải-giữa (dưới cửa sổ, tâm x≈700) là **bồn rửa inox** xám bạc nhạt (chỉ thấy miệng elip dẹt), sau bồn là **vòi bếp cổ ngỗng** đồng thau cao tới y≈560, miệng chĩa xuống bồn.
3. **Hũ bánh quy** trên mặt bếp bên trái, đáy (280, 680), cao ~150, rộng ~105: hũ thủy tinh tròn mập xanh trời rất nhạt, thấy 3–4 bánh quy tròn caramel chấm socola bên trong, nắp gỗ caramel tròn có núm.
4. **Tủ dưới bồn** (đứng trên sàn, ngay dưới mặt bếp): thân tủ gỗ **xanh bạc hà nhạt**, x≈160–900, y≈720–1200 (đáy (530, 1200)); **hai cánh đang mở ra hai bên** (mặt trong cánh là dải hẹp đứng ngoài khung trái và phải, có núm gỗ tròn); lòng tủ gỗ mật ong nhạt, hơi tối ở góc trên, lòng tủ x≈200–860, y≈735–1175.
5. Trong lòng tủ:
   - **Lỗ tường** tròn tối ở **vách trái** lòng tủ tại ≈ (215, 830), một đoạn ống đồng ngắn chui ra, đầu có mặt bích tròn, hướng sang phải tới x≈270.
   - **Lưới 3 cột × 2 hàng ô ống đồng**, mỗi ô 150x150, KHÔNG kẻ ô, không khung: hàng trên tâm y=830, hàng dưới tâm y=980; cột tâm x=345, 495, 645. Mỗi ô một đoạn ống đồng/đồng thau ấm dày ~46, đi qua tâm ô, hai đầu chạm đúng điểm giữa mép ô, mỗi đầu một mặt bích tròn to. Hướng LÚC ĐẦU (đang bị xoay lệch, chưa nối):
     - A (345,830): cút góc 90°, đầu ra DƯỚI và PHẢI
     - B (495,830): ống thẳng NGANG (trái–phải)
     - C (645,830): cút góc, đầu ra TRÊN và PHẢI
     - D (345,980): cút góc, đầu ra TRÁI và DƯỚI
     - E (495,980): ống thẳng ĐỨNG (trên–dưới)
     - F (645,980): cút góc, đầu ra DƯỚI và PHẢI
     Tất cả ống KHÔ (màu đồng, không ánh xanh, không giọt).
   - **Ống chính** đồng đi thẳng lên từ sàn lòng tủ tại x=645 tới đầu trên y≈1055 (ngay dưới đáy ô F), đầu có mặt bích; trên ống chính là **van đỏ**: tay van **bánh xe tròn 4 nan màu đỏ san hô** (#EE8A7A), nhìn thẳng mặt trước, tâm (645, 1120), rộng ~104, trục giữa đồng thau.
6. **Bàn tay hướng dẫn** (đúng ui_hand_pointer.png: bàn tay trẻ con mũm mĩm, ống tay áo len vàng bơ) đang **chạm vào ô F**, đầu ngón trỏ ở ≈ (660, 990), tay đi lên từ phía dưới phải; vài vạch chạm nhỏ quanh đầu ngón.
7. **Bát nước của Sữa** trên sàn trước chân tủ bên trái, đáy (260, 1300), rộng 130: bát thấp gốm hồng đào, hình bàn chân mèo kem trên thân, mặt nước elip dẹt xanh trời nhạt.
8. **Mũi tên chuyển phòng**: mũi tên mập chĩa sang TRÁI, kem giấy viền gỗ caramel + viền nâu, sát mép trái, tâm (64, 760), rộng ~110.

Giao diện: như "Quy tắc riêng", thêm **bản đồ mini** ở giữa trên cùng, tâm (630, 66): tấm giấy kem nhỏ bo góc viền nâu (~220x100) chứa 2 ô vuông bo góc cạnh nhau, ô trái kem, **ô phải vàng bơ** (đang ở bếp), ô trái có một mặt mèo trắng nhỏ xíu (Sữa ở nhà tắm). Không chữ.

## Prompt gợi ý cho image_gen (tiếng Anh, ghép sau khối style + camera; sửa câu chữ được nhưng giữ đủ ý)
```
Cute mobile puzzle game screen, portrait 1024x1536, opaque full background, children's picture-book colored-pencil style exactly like the attached level-1 reference (light clear pastels, fine warm-brown pencil outlines, soft grain).
Scene: a calm small KITCHEN seen straight from the front, slightly from above (same camera as the level-1 living room).
Room: flat warm butter-cream back wall; a horizontal band of cream wall tiles with thin grout at y~560-700, x~150-910 behind the counter; caramel wood baseboard with its top at y~1180; honey wooden floorboards below like level 1. Light from the upper left.
Objects, each a clear separate object with its own closed brown outline:
- Upper right: a two-pane window (x~520-900, y~200-500), cream frame, pale sky-blue glass with a little cloud, short mint curtains tied at both sides, thin sill with one small potted plant.
- A honey-wood kitchen countertop running across x~150-910, top surface a thin strip at y~680, front edge ~40 thick, bottom y~720. Set into it under the window (center x~700) a pale silver sink seen only as a flat ellipse opening, with a tall brass gooseneck faucet behind it reaching y~560, spout pointing down.
- On the left of the countertop (bottom (280,680)): a chubby round glass cookie jar, very pale blue glass with 3-4 round caramel cookies with chocolate dots inside, round caramel wooden lid with a knob, ~150 tall.
- Under the counter, standing on the floor: a low pale-mint wooden sink cabinet (x~160-900, y~720-1200) with its TWO DOORS SWUNG OPEN to both sides (door insides visible as narrow vertical strips outside the frame, round wooden knobs). Inside: pale honey-wood interior, slightly darker in the top corners.
- Inside the cabinet, on the LEFT inner wall at (215,830): a dark round hole in the wall with a short copper pipe stub coming out to the right, ending in a round flange.
- Inside the cabinet: a 3-column x 2-row grid of brass/copper PIPE TILES, each tile 150x150 px with NO drawn border or grid lines, tile centers at x=345,495,645 and y=830,980. In each tile one chunky warm copper pipe (~46 thick) passing through the tile center, both ends exactly at the middle of tile edges, each end with a round flange. The pieces are scrambled (not connected yet):
  top-left: 90-degree elbow opening DOWN and RIGHT; top-middle: straight HORIZONTAL; top-right: elbow opening UP and RIGHT;
  bottom-left: elbow opening LEFT and DOWN; bottom-middle: straight VERTICAL; bottom-right: elbow opening DOWN and RIGHT.
  All pipes DRY copper, no blue tint, no droplets.
- A main copper pipe rising straight from the cabinet floor at x=645 up to y~1055 (just under the bottom-right tile), with a round flange on top; on it a red valve: a round 4-spoke handwheel in coral red (#EE8A7A), seen face-on, centered (645,1120), ~104 wide, brass hub.
- A chubby child's tutorial hand (like ui_hand_pointer: chubby light-skin hand, butter-yellow sweater cuff) tapping the bottom-right pipe tile with its index fingertip at about (660,990), coming from the lower right, with a few tiny tap marks.
- On the floor in front of the cabinet's left part (bottom (260,1300)): a low peach-pink ceramic cat water bowl with a big simple cream paw-print picture, flat ellipse of pale blue water.
- At the left screen edge centered at (64,760): a chubby room-navigation arrow pointing LEFT, cream paper with caramel wood rim and thin brown outline.
UI like the level-1 demo: top-left pink heart and four small circles (first three filled pink); top-right round cream pause button with wood rim; top center at (630,66) a small cream paper mini-map (~220x100) with two rounded squares side by side, left cream with a tiny white cat face, right butter-yellow; bottom-right round butter-yellow lightbulb button near (934,1306). Bottom 150px (y>1386) is plain floor only.
No people except the tutorial hand, no cat, no text, no numbers, no letters, no logos.
```
