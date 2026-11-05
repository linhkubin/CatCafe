TÁCH TỪ DEMO — lượt `l10_p6` (Level 10 "Đại chiến quái thú", A10-2: chủ dự án cho tách asset trước rồi ghép demo đúng bố cục), đúng quy tắc AGENTS.md (vai Codex: chỉ vẽ; ngoại lệ "TÁCH TỪ DEMO": mỗi món một lần gọi image_gen, mỗi món một ảnh, 6 món). **Model gpt-6.1-sol, mức medium.**

**Ảnh demo gốc: art/out/demo/l10_demo_fight_916.png** (khung điện thoại); vùng chơi: **art/out/demo/l10_demo_fight_play.png** (cảnh đánh nhau) và **art/out/demo/l10_demo_end_play.png** (cảnh kết), toạ độ dưới đây tính trên vùng chơi 1024x1536.

## Luật chung cho mọi món
- **Vẽ đúng món trong demo: cùng thiết kế, màu, chi tiết, nét**, không thêm, không bớt chi tiết; màu **không đậm hơn** demo (nghi ngờ thì nhạt hơn), cùng góc nhìn.
- **Tỉ lệ rộng x cao theo cỡ game ghi ở từng món** (cỡ chủ dự án đã duyệt trong bản khối). Nếu demo khác tỉ lệ đó thì vẽ món **cao hơn / thấp hơn / hẹp hơn** cho đúng tỉ lệ game, giữ thiết kế.
- Mỗi món: gọi image_gen **một lần**, đính kèm ảnh demo gốc + ảnh cắt món + art/ref/owner_l1_style_ref.png. **Nền TRONG SUỐT thật.** Món to hết cỡ trong khung, lề trong suốt khoảng 40px (G5-34), không bị cắt.
- **Chỉ đúng một món** trong ảnh. Không lấy đồ chồng lên, đồ phía sau, nền, bóng, quầng. Chỗ bị che: vẽ bù đúng thiết kế.
- Không chữ, không số, không khung, không bóng sàn, không viền trắng.
- Lưu từng món vào **art/out/_sheets/l10src_<key>.png** (file mới; riêng `l10_book_stack`, `l10_train` **được phép ghi đè** bản cũ). Chép nguyên ảnh, không cắt, không xử lý.
- **Món ghi "Chỉnh sửa từ ảnh …"**: vẽ món gốc trước trong lượt, rồi dùng chế độ chỉnh sửa trên ảnh `l10src_` đó: giữ nguyên khung, cỡ, vị trí, màu, nét, chỉ đổi đúng phần ghi.
- Trước mỗi lần gọi image_gen viết "Nhắc lại quy tắc" (phong cách, góc nhìn, màu, nét, tỉ lệ, phần lấy / không lấy). Tin nhắn cuối có "Tự kiểm" **từng món**, SAVED từng file, prompt cuối từng món.

## Danh sách 6 món

### 1. `l10_book_stack` → art/out/_sheets/l10src_l10_book_stack.png (1024x1536, nền trong suốt)
- Trong demo: art/out/demo/l10_demo_fight_play.png, vùng x 360–555, y 160–350. Ảnh cắt: art/ref/l10_cut/l10_book_stack.png (đính kèm).
- Cỡ trong game (rộng x cao): **100 x 150**.
- Chồng 6–7 cuốn sách gáy pastel (xanh trời, vàng bơ, hồng, bạc hà, oải hương, đào) xếp hơi lệch, không chữ. **BẮT BUỘC đúng tỉ lệ rộng:cao = 2:3 (100 x 150): sách hẹp, chồng cao**, sách nhìn gáy, mỗi cuốn mỏng. Vẽ to gần kín khung dọc. (Bản trước bị bè ngang.)
- **KHÔNG lấy:** kệ, tường.

### 2. `l10_train` → art/out/_sheets/l10src_l10_train.png (1536x1024, nền trong suốt)
- Trong demo: art/out/demo/l10_demo_end_play.png, vùng x 580–708, y 1185–1298. Ảnh cắt: art/ref/l10_cut/l10_train.png (đính kèm).
- Cỡ trong game (rộng x cao): **98 x 50**.
- Đầu tàu hỏa gỗ đồ chơi xanh trời nhạt, ống khói đào nhạt, cabin, 3 bánh tròn kem; **quay mũi sang phải**. **BẮT BUỘC dáng thấp dài: rộng:cao = 2:1 (98 x 50)**, ống khói thấp, cabin thấp. (Bản trước quá cao.)
- **KHÔNG lấy:** ray, thảm.

### 3. `sua_lizard_fire` → art/out/_sheets/l10src_sua_lizard_fire.png (1024x1536, nền trong suốt)
- Trong demo: art/out/demo/l10_demo_fight_play.png, vùng x 560–960, y 555–1060. Ảnh cắt: art/ref/l10_cut/sua_lizard_fire.png (đính kèm).
- Cỡ trong game (rộng x cao): **290 x 450 (thân, đuôi thò thêm)**.
- Sữa (mèo trắng, art/out/cats/sua_ref.png) **mặc bộ đồ thằn lằn gai lưng bằng vải** y như demo: đồ vải xanh bạc hà nhạt, bụng kem, hàng gai nỉ tam giác xanh lá nhạt dọc lưng và đuôi, đuôi vải nhồi bông dài, mũ trùm có mõm thằn lằn tròn trên trán, **mặt Sữa lộ trọn trong lỗ mũ**, tai mèo thò qua mũ, găng/ủng vải 3 móng nỉ. Dáng **khè lửa**: đứng, **quay sang TRÁI**, há miệng nhỏ khè (không vẽ lửa), hai tay găng giơ trước ngực, đuôi thò ra sau bên phải. Chân giữa đáy, đáy phẳng.
- **KHÔNG lấy:** lửa, sofa, gối, bàn, chậu cây.

### 4. `mun_l10_groom` → art/out/_sheets/l10src_mun_l10_groom.png (1024x1024, nền trong suốt)
- Trong demo: art/out/demo/l10_demo_end_play.png, vùng x 250–505, y 790–1062. Ảnh cắt: art/ref/l10_cut/mun_l10_groom.png (đính kèm).
- Cỡ trong game (rộng x cao): **rộng 190**.
- Mun thật (mèo đen, art/out/cats/mun_ref.png) **ngồi, quay sang PHẢI, nghiêng đầu sang phải, mắt híp hạnh phúc, lưỡi hồng nhỏ thè ra như đang liếm tai bạn**, đuôi cong. Không đồ hóa trang. Đáy phẳng.
- **KHÔNG lấy:** Sữa, hộp súp, sofa, sàn.

### 5. `sua_l10_groom` → art/out/_sheets/l10src_sua_l10_groom.png (1024x1024, nền trong suốt)
- Trong demo: art/out/demo/l10_demo_end_play.png, vùng x 500–728, y 780–1062. Ảnh cắt: art/ref/l10_cut/sua_l10_groom.png (đính kèm).
- Cỡ trong game (rộng x cao): **rộng 190**.
- Sữa thật (mèo trắng, art/out/cats/sua_ref.png) **ngồi, quay sang TRÁI, nghiêng đầu sang trái, mắt híp hạnh phúc, má hồng**, như đang được liếm tai, đuôi cong. Cùng cỡ đầu với Mun ở món trên. Không đồ hóa trang. Đáy phẳng.
- **KHÔNG lấy:** Mun, hộp súp, sofa, sàn.

### 6. `l10_fish_smoke` → art/out/_sheets/l10src_l10_fish_smoke.png (1536x1024, nền trong suốt)
- Trong demo: art/out/demo/l10_demo_end_play.png, vùng x 460–590, y 915–1005. Ảnh cắt: art/ref/l10_cut/l10_fish_smoke.png (đính kèm).
- Cỡ trong game (rộng x cao): **100 x 50**.
- Một làn khói thơm trắng kem mờ uốn thành **hình con cá nhỏ** (thân, đuôi, mắt chấm), viền mềm, trong mờ nhẹ.
- **KHÔNG lấy:** hộp súp, mèo.

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
