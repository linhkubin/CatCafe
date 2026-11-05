VẼ DEMO — Level 10 "Đại chiến quái thú", cảnh kết, đúng quy tắc AGENTS.md (vai Codex: chỉ vẽ, ảnh demo). **Model gpt-6.1-sol, mức medium.** Gọi image_gen **một lần**.
Lưu: **art/out/demo/l10_demo_end_play.png** (1024x1536, có nền; **được phép ghi đè**).
**Cùng phòng, cùng góc máy, cùng màu với ảnh cảnh chính art/out/demo/l10_demo_fight_play.png** (mở xem).

**VẼ LẠI LẦN 2 — CHỈNH SỬA TRÊN ẢNH KHỐI.** Lần 1 (art/ref/backup/l10_demo_v1/l10_demo_end_play.png) đẹp và đúng màu, nhưng **sai vị trí và cỡ** (art/ref/l10_demo/v1_lech_khoi.jpg: khung đỏ = chỗ đúng): chân tường bị hạ xuống y ≈ 960 (đúng là **880**), sofa cao quá (đáy đúng y **860**, đỉnh lưng **460**), thảm và đồ chơi thấp quá 50–80px, bóng và hộp súp to quá ~40%, kéo to quá.
Lần này **dùng image_gen CHẾ ĐỘ CHỈNH SỬA trên ảnh art/ref/l10_demo/khoi_end.png** (1024x1536): **biến mỗi khối màu thành đúng món đồ của nó, nằm trọn trong khối đó, cùng vị trí, cùng cỡ** (món có thể tròn mềm hơn khối nhưng không to ra, không nhỏ đi quá 10%, không dời chỗ). Mảng kem trên = tường, mảng be dưới từ y 880 = sàn. Vẽ cùng phong cách, màu, nhân vật như lần 1 (mở art/ref/backup/l10_demo_v1/l10_demo_end_play.png làm mẫu hình và màu). Lưu đè: art/out/demo/l10_demo_end_play.png (được phép ghi đè).

## Cảnh
Trận đánh đã xong. **Bàn trà và mọi đồ trên bàn (hộp bánh, lọ hoa, điều khiển) đã biến mất. Hai bộ hóa trang cũng không còn**: hai **mèo thật nhỏ** (rộng ~190 mỗi con) ngồi hai bên **hộp súp đã mở** đặt trên sàn giữa hai con, **liếm lông cho nhau**: Mun (mèo đen, art/out/cats/mun_ref.png) bên trái quay phải, Sữa (mèo trắng kem, art/out/cats/sua_ref.png) bên phải quay trái; hai con nghiêng đầu sát nhau, Sữa liếm tai Mun, mắt híp hạnh phúc, vài trái tim nhỏ hồng nhạt bay. Hộp súp mở: hộp giấy kem hình cá, nắp bật ngửa, ruy băng hồng đứt vắt hai bên, thấy súp kem; làn khói trắng mờ nhỏ hình cá bay lên.

## Vị trí (khớp ảnh khối art/ref/l10_demo/khoi_end.png)
- Hộp súp mở: đáy 482,1020, ~130 x 100.
- Mun thật: chân giữa đáy 305,1010, rộng 190. Sữa thật: chân giữa đáy 655,1020, rộng 190.
- Giữ nguyên các đồ còn lại y như cảnh chính: nền (chân tường y 880); kệ trái đáy 170,310 (**không còn kéo**); kệ giữa đáy 470,390 có chồng sách; kệ phải đáy 770,230 (**không còn hộp súp**); sofa đáy 490,860 (880 x 400) với 2 gối vàng bơ (đáy 165,610 và 815,610); chậu cây đáy 975,880; thảm + ray elip + tàu + ô tô; xe tăng tâm 370,1301; xe cứu hỏa tâm 630,1303; khối xếp hình đáy 160,1170 và 800,1175; cột đèn đáy 215,1235; quả bóng tâm 95,1300; máy bay tâm 900,1300 (**không còn cây kéo**: kéo đã dùng cắt ruy băng; không vẽ kéo ở đâu cả).
- Không có lửa. Không đồ hóa trang.

## Ảnh tham chiếu (mở hết bằng view_image trước khi vẽ)
1. art/out/demo/l10_demo_fight_play.png — cảnh chính (cùng phòng, màu, đồ).
2. art/ref/l10_demo/khoi_end.png — ảnh khối vị trí cảnh kết.
3. art/ref/owner_l1_style_ref.png — chuẩn màu.
4. art/out/cats/mun_ref.png — Mun thật.
5. art/out/cats/sua_ref.png — Sữa thật.

## Màu (chủ dự án nhấn mạnh, O6)
- Đo được phải đạt: độ bão hoà trung bình ≤ 0,25, phân vị 90 ≤ 0,46 (như mẫu L1 art/ref/owner_l1_style_ref.png). **Nghi ngờ thì nhạt hơn.**
- Mảng lớn (tường, sàn, sofa, bàn, thảm) nhạt nhất, gần giấy kem. **Đồ chơi nhiều màu nhưng nhạt như mẫu L1** (hồng phấn, vàng bơ, xanh trời nhạt, bạc hà, oải hương, đào nhạt), không màu gắt, không đỏ tươi, không xanh lá tươi.
- Mọi mảng màu thấy vân chì và lấm tấm giấy kem.

## Khung và bố cục
- Ảnh **1024x1536 dọc, có nền đầy đủ** (không trong suốt). **Đặt đúng vị trí, đúng cỡ từng món như ảnh khối** (mỗi khối màu là một món, xem bảng). Không thêm đồ ngoài danh sách.
- **Dải trên cùng ~70px chỉ là tường trơn, dải dưới cùng ~90px chỉ là sàn gỗ trơn** (Art nối thêm giao diện).
- Góc máy sát sàn, mắt ngang tầm bàn trà nhìn hơi lên: đồ đạc to như thành phố. Vẫn theo khối CAMERA: cạnh ngang nằm ngang, mặt trên thấy ít, không xoay chéo.
- Không chữ, không số, không logo, không chữ ký.

## Quy tắc bắt buộc (AGENTS.md)
- Trước khi gọi image_gen viết **"Nhắc lại quy tắc"**: phong cách, màu (ngưỡng O6, đồ chơi nhạt, lửa pastel), góc nhìn, nét, nhân vật, bố cục khớp ảnh khối.
- Chép nguyên ảnh, không xử lý. Không chữ, không số, không logo.
- Tin nhắn cuối: `SAVED: ...`, prompt cuối, **"Tự kiểm"** từng mục (vị trí và cỡ khớp ảnh khối; màu nhạt như mẫu L1; lửa pastel; hai bộ đồ rõ là đồ vải, mặt mèo lộ; không chữ: đạt / không đạt + lý do).

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
