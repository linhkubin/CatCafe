VẼ DEMO — Level 10 "Đại chiến quái thú", cảnh chính (chủ dự án duyệt gameplay, dặn **màu và kích thước đúng mô tả thật kỹ**), đúng quy tắc AGENTS.md (vai Codex: chỉ vẽ, ảnh demo). **Model gpt-6.1-sol, mức medium.** Gọi image_gen **một lần**.
Lưu: **art/out/demo/l10_demo_fight_play.png** (1024x1536, có nền; **được phép ghi đè**).

**VẼ LẠI LẦN 2 — CHỈNH SỬA TRÊN ẢNH KHỐI.** Lần 1 (art/ref/backup/l10_demo_v1/l10_demo_fight_play.png) đẹp và đúng màu, nhưng **sai vị trí và cỡ** (art/ref/l10_demo/v1_lech_khoi.jpg: khung đỏ = chỗ đúng): chân tường bị hạ xuống y ≈ 960 (đúng là **880**), sofa cao quá (đáy đúng y **860**, đỉnh lưng **460**), thảm và đồ chơi thấp quá 50–80px, bóng và hộp súp to quá ~40%, kéo to quá.
Lần này **dùng image_gen CHẾ ĐỘ CHỈNH SỬA trên ảnh art/ref/l10_demo/khoi_main.png** (1024x1536): **biến mỗi khối màu thành đúng món đồ của nó, nằm trọn trong khối đó, cùng vị trí, cùng cỡ** (món có thể tròn mềm hơn khối nhưng không to ra, không nhỏ đi quá 10%, không dời chỗ). Mảng kem trên = tường, mảng be dưới từ y 880 = sàn. Vẽ cùng phong cách, màu, nhân vật như lần 1 (mở art/ref/backup/l10_demo_v1/l10_demo_fight_play.png làm mẫu hình và màu). Lưu đè: art/out/demo/l10_demo_fight_play.png (được phép ghi đè).

## Cảnh
Phòng khách nhìn từ sát sàn. Hai mèo khổng lồ mặc đồ hóa trang đứng yên đánh nhau giữa phòng: **Sữa (bộ thằn lằn) há miệng khè một luồng lửa xanh pastel ngang** từ miệng (≈ 635,650) sang trái tới hai tay Mun (≈ 345,655); **Mun (bộ khỉ đột) giơ hai tay chéo trước mặt đỡ lửa**. Lửa: dải ngang xanh trời nhạt tới bạc hà, gốc ở miệng đậm hơn chút, đuôi loe nhạt dần, đầu tròn mềm, cao ~60px; không đỏ, không khói đen, không chói.

## Đồ đạc (toạ độ vùng chơi; "đáy" = giữa mép dưới, "tâm" = tâm; khớp ảnh khối art/ref/l10_demo/khoi_main.png)
| Món (màu khối) | Vị trí | Cỡ (rộng x cao) | Vẽ |
|---|---|---|---|
| Nền | tường trên, **chân tường y 880**, sàn dưới | cả ảnh | Tường kem ấm, chân tường gỗ nhạt; sàn gỗ mật ong nhạt ván ngang |
| Kệ trái (nâu) | đáy 170,310 | 240 x 30 | Tấm kệ gỗ mật ong nhạt treo tường, 2 pát đỡ |
| Cây kéo (đỏ) trên kệ trái | đáy 170,280 | 110 x 60 | Kéo học sinh tay cầm hồng phấn, lưỡi bạc xám nhạt |
| Kệ giữa (nâu) | đáy 470,390 | 200 x 30 | như kệ trái |
| Chồng sách (xanh dương) trên kệ giữa | đáy 470,360 | 100 x 150 | 6–7 cuốn gáy pastel xếp hơi lệch, không chữ |
| Kệ phải (nâu, cao nhất) | đáy 770,230 | 240 x 30 | như kệ trái |
| Hộp súp (hồng) trên kệ phải | đáy 770,200 | 130 x 90 | Hộp giấy kem có hình cá đơn giản, ruy băng hồng phấn buộc chữ thập, nơ trên nắp |
| Sofa (tím) | đáy 490,860 | 880 x 400 | Sofa vải oải hương nhạt, lưng cao (đỉnh y 460), tay vịn tròn, chân gỗ ngắn; giữa bị mèo, bàn che |
| 2 gối (cam) trên sofa | đáy 165,610 và 815,610 | 220 x 150 mỗi gối | Gối vuông vàng bơ nhạt chần chỉ; nửa dưới bị mèo che |
| Chậu cây (xanh lá) | đáy 975,880 | 170 x 400 | Chậu sứ kem, cây lá to bản xanh lá nhạt, lòi ra mép phải |
| **Mun bộ khỉ đột** (nâu sẫm) | chân giữa đáy 220,1010 | 300 x 470 | dáng giơ hai tay chéo đỡ lửa, quay phải |
| **Sữa bộ thằn lằn** (xanh ngọc) | chân giữa đáy 740,1020 | 290 x 450 | dáng khè lửa, quay trái, đuôi gai thò sau lưng |
| Bàn trà (be) | đáy 490,1060 | 510 x 230 | Bàn gỗ mật ong nhạt thấp, mặt bàn y ≈ 830, che phần dưới thân hai mèo |
| Hộp bánh (vàng) trên bàn | đáy 300,920 | 120 x 120 | Hộp bánh 2–3 tầng giấy hồng phấn, 3–4 lỗ tròn như cửa sổ (trong lỗ tối nhạt) |
| Lọ hoa (hồng đậm) trên bàn | đáy 490,900 | 70 x 130 | Lọ sứ xanh trời nhạt, 3–4 bông hoa tròn hồng, vàng nhạt |
| Điều khiển TV (xám) trên bàn | đáy 660,920 | 154 x 48 | Điều khiển xám nhạt nằm phẳng, nút tròn pastel, không chữ số |
| Thảm + ray (elip) | tâm 500,1212 | 598 x 275 | Thảm tròn dẹt kem nhạt viền đào; **đường ray gỗ elip tâm 500,1167, bán trục 230 x 74** |
| Tàu hỏa (xanh) trên ray | tâm 640,1232 | 98 x 50 | Đầu tàu gỗ xanh trời nhạt, ống khói đào, quay phải |
| Ô tô (đỏ nhạt) trong vòng ray | tâm 500,1167 | 158 x 78 | Ô tô nhựa đào nhạt bánh tròn |
| Xe tăng (xanh rêu) | tâm 370,1301 | 168 x 88 | Xe tăng đồ chơi xanh lá nhạt, nòng ngắn tròn |
| Xe cứu hỏa (đỏ) | tâm 630,1303 | 183 x 84 | Đỏ đào nhạt (không đỏ gắt), thang vàng bơ |
| Khối xếp hình thấp (xanh nhạt) | đáy 160,1170 | 60 x 90 | 3 khối gỗ pastel chồng |
| Khối xếp hình cao (vàng) | đáy 800,1175 | 60 x 110 | 4 khối pastel, trên cùng tam giác |
| Cột đèn (xám đậm) | đáy 215,1235 | 30 x 110 | Cột đèn nhựa xám nhạt, bóng tròn kem ở đỉnh, đang nháy vàng bơ nhẹ |
| Quả bóng (hồng cam) | tâm 95,1300 | 78 x 78 | Bóng nhựa sọc hồng, vàng, xanh trời nhạt |
| Máy bay (xanh nhạt) | tâm 900,1300 | 210 x 98 | Máy bay cánh quạt nhựa trắng kem sọc xanh trời, mũi sang phải, càng móc nhỏ dưới bụng |
| Lửa (xanh nhạt) | từ 635,650 sang 345,655 | dài ~290, cao ~60 | như mục Cảnh |

Ánh lửa xanh rọi rất nhẹ lên mặt hai mèo; cột đèn và cửa sổ hộp bánh hơi sáng.

## Ảnh tham chiếu (mở hết bằng view_image trước khi vẽ)
1. art/ref/l10_demo/khoi_main.png — **ảnh khối vị trí, cỡ (bắt buộc khớp)**.
2. art/ref/owner_l1_style_ref.png — **chuẩn màu và chất chì**.
3. art/ref/l1_depth_angle_ref.png — góc nhìn.
4. art/out/cats/mun_ref.png — Mun (mặt trong mũ khỉ đột).
5. art/out/cats/sua_ref.png — Sữa (mặt trong mũ thằn lằn).

## Hai bộ hóa trang (bắt buộc)
- **Mun — bộ khỉ đột**, đứng TRÁI, quay PHẢI về phía Sữa: bộ đồ vải lông xù **nâu cacao ấm, nhạt** (nhạt hơn lông đen của Mun để tách khỏi Mun), mũ trùm có hai tai tròn nhỏ của khỉ đột, **mặt Mun lộ trọn trong lỗ mũ**: mèo đen than ấm, mắt vàng tròn to, mũi hồng, má hồng, **hai tai mèo đen nhọn thò qua hai lỗ trên mũ** (theo art/out/cats/mun_ref.png). Ngực bộ đồ một mảng nỉ xám nâu nhạt; găng tay, ủng vải tròn. Thấy đường may: **rõ là đồ vải mặc vào**, không phải khỉ thật.
- **Sữa — bộ thằn lằn gai lưng**, đứng PHẢI, quay TRÁI về phía Mun: bộ đồ vải **xanh bạc hà nhạt**, bụng kem nhạt, **hàng gai nỉ tam giác mềm** dọc sống lưng và đuôi (xanh lá nhạt), **đuôi dài vải nhồi bông**, mũ trùm có mõm thằn lằn tròn trên trán, **mặt Sữa lộ trọn trong lỗ mũ**: mèo trắng kem theo art/out/cats/sua_ref.png, tai mèo thò qua lỗ mũ. Găng, ủng vải có 3 móng nỉ tròn. Rõ là đồ vải.
- Không giống nhân vật phim nào, không logo, không chữ, không vảy thật, không răng nhọn đáng sợ. Dễ thương, buồn cười.

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
