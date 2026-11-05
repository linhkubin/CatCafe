VẼ DEMO `l7_demo_s3` — Level 7 "Về nhà thôi, Mun!", Cảnh 3 · Trước nhà nhân vật (lúc Mun tới), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ). Ảnh demo, lưu vào **art/out/demo/l7_demo_s3_play.png** (file mới). Model gpt-6.1-sol, mức medium.

## Khung (ảnh 1024x1536 = đúng vùng chơi của màn, tỉ lệ 1:1)
Mọi món ở **đúng cỡ trong game**. Art nối thêm 142 px trên và dưới sau, nên **dải trên y < 120 chỉ là trời (hoặc mái/tường trơn)** và **dải dưới y > 1420 chỉ là nền đất ướt trống** (vũng nước, cành nhỏ được). Toạ độ là px trên ảnh 1024x1536 ("đáy" = điểm giữa đáy món). Ảnh khối `art/ref/l7_demo/khoi_s3.png` (chụp bản chơi thử) cho đúng chỗ và cỡ từng món: **giữ đúng vị trí và cỡ**, nhưng vẽ đẹp theo phong cách; đừng chép khối phẳng, đừng chép chữ nhãn.
Mun ở mọi cảnh **cùng cỡ như L6**: ngồi cao ≈ 215, rộng ≈ 165. **Mun ướt sũng**: lông đen than ấm #3E3838 bết thành túm nhọn, vài giọt nước rơi, mắt tròn to vàng mật ong, mặt tròn; không đen kịt, thấy vân chì xám nâu sáng.

**MÀU (chủ dự án dặn: "chú ý màu nhạt nhạt chút nhé").** Đêm mưa bão nhưng **sáng, nhạt, dịu như sách tranh**, KHÔNG tối, KHÔNG xám đậm, KHÔNG xanh navy:
- Trời: **lavender #D8CCF0 pha xanh da trời nhạt #B8DAF2**, nhạt dần xuống chân trời, vài cụm mây kem lavender nhạt; có thể một **tia sét xa mảnh vàng bơ nhạt** trên trời.
- Mọi mảng lớn (tường, nền, sân) giữ màu ban ngày nhưng **phủ một lớp lavender/xanh rất mỏng** cho có cảm giác đêm mưa; vẫn sáng gần như ảnh L1. Nền đất ướt xám-lavender rất nhạt, không xám chì.
- **Mưa:** nhiều nét chì mảnh trắng ấm/xanh rất nhạt, dài ngắn và đậm nhạt khác nhau, **nghiêng theo gió**, không thành mảng che hình. Vũng nước elip nhạt xanh da trời có gợn vòng. Vài lá xanh nhạt bay ngang, vài cành gãy nhỏ caramel nằm rải rác trên nền (trang trí).
- Mục tiêu đo: bão hoà **trung bình 0,18–0,22, p90 ≤ 0,42** (thấp hơn ngưỡng). So với `art/ref/owner_l1_style_ref.png`: nhạt bằng hoặc nhạt hơn. Nghi ngờ thì vẽ nhạt hơn.

## Nội dung cảnh 3
**Mặt trước nhà nhân vật**, nhìn thẳng:
- Trên cùng: **mái hiên nhà** (hai thanh xà gỗ caramel nhạt nằm ngang y 0–95), phía trên lộ chút trời lavender.
- **Tường nhà** kem ấm phủ lavender rất nhạt, y 95–1005; **chân tường + nền sân** từ y ≈ 1005 xuống đáy, ướt nhạt, vài vũng nước.
- **Ô văng** gỗ caramel nhạt nằm ngang trên cửa sổ: x 55–540, y 243–280.
- **Cửa sổ to kính đóng** (2 cánh): khung gỗ mật ong, x 85–512, y 280–725, **bậu** gỗ ở y 690–725. Kính xanh da trời rất nhạt, vài vệt nước mưa chảy. **Móc nhỏ** ở giữa khung trên (300, 320). **Qua kính** thấy phòng ấm: **ti vi** bên trái (x 135–255, y 410–580) màn sáng xanh nhạt ấm; **sofa** lavender nhạt và **nhân vật ngồi quay lưng** (tóc xoăn caramel, áo len vàng bơ) ở x 265–475, y 520–690. Ánh đèn vàng bơ ấm trong phòng (nhạt, không chói).
- **Cửa chính** gỗ caramel nhạt 2 ô panô, tay nắm tròn vàng bơ, x 675–1015, y 430–1005; bậc thềm thấp dưới cửa y 995–1050. **Chuông gió L5** treo trên **móc ở góc trên bên trái cửa chính**: móc (635, 445), chuông x 605–655, y 445–635.
- **Thùng gỗ L6** đáy (115, 1300), rộng ≈ 190 (sát trái). **Hộp đồ nghề hồng L6** đáy (760, 1228), rộng ≈ 175.
- **Mun ướt ngồi dưới cửa sổ**, đáy (420, 1265), ngước nhìn lên bậu cửa sổ, sau lưng là vài giọt nước tung (vừa nhảy thử bị tuột).
- Vài vũng nước, 2 cành gãy nhỏ, lá bay, mưa nét mảnh.

## Ảnh tham chiếu (mở hết bằng view_image, đính kèm cho image_gen — đúng 5 ảnh)
1. art/ref/owner_l1_style_ref.png — chuẩn màu và chất chì (số 1).
2. art/ref/l7_demo/khoi_s3.png — vị trí, cỡ từng món.
3. art/ref/l7_demo/s3_reuse_items.png — **đồ dùng lại, đúng cỡ thật**: thùng gỗ L6 (trái), hộp đồ nghề hồng L6 (giữa), chuông gió L5 (phải). Vẽ giống hệt hình, màu, nét, cỡ.
4. art/out/cats/mun_ref.png — Mun.
5. art/out/player/player_ref.png — nhân vật (tóc xoăn nâu caramel, áo len vàng bơ) — trong cảnh này chỉ thấy **sau lưng** qua kính.

## Quy tắc bắt buộc (AGENTS.md)
- Trước khi gọi image_gen: mở MỌI ảnh tham chiếu bằng view_image, rồi viết phần **"Nhắc lại quy tắc"** (phong cách, màu, góc nhìn, nét, yêu cầu riêng của ảnh này) bằng lời của mình.
- Gọi image_gen MỘT lần, cỡ 1024x1536, có nền đầy đủ. **Đính kèm tối đa 5 ảnh tham chiếu** (giới hạn của image_gen): đúng 5 ảnh liệt kê dưới. Chép nguyên ảnh, không cắt, không resize, không chỉnh màu.
- Không chữ, không số, không logo, không chữ ký, không vẽ giao diện (tim, nút, khay). **Ảnh khối có nhãn chữ: tuyệt đối không chép chữ, không chép khối màu phẳng.**
- Chạy `python tools/color_check.py <ảnh đã lưu>` và ghi số. Nếu trung bình > 0,23 hoặc p90 > 0,43 thì coi là quá đậm (cứ báo, Art quyết vẽ lại).
- Tin nhắn cuối: `SAVED: ...`, prompt cuối đã gửi image_gen, phần **"Tự kiểm"** (mỗi quy tắc đạt / không đạt + một câu lý do: góc nhìn, nét, màu theo số đo, không chữ, nền, vị trí và cỡ từng món, Mun đúng thiết kế, đồ dùng lại giống ảnh cũ), một dòng tự nhận xét.

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
