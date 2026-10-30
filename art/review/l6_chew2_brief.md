VẼ LẠI 1 MÓN — lượt `l6_chew2` (Level 6, G6-26: Lu gặm xương trong cửa chuồng, cho cân đối, đẹp hơn), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ; một lần gọi image_gen).

- Ảnh ra: **art/out/_sheets/l6src_l6_dog_chew.png**, **1024x1024**, **nền TRONG SUỐT thật**. **Được phép ghi đè.** Chép nguyên ảnh, không cắt, không xử lý.
- **Ảnh demo gốc (G4-26): art/out/demo/l6_demo_path_916.png**; Lu trong cửa chuồng ở x 750–960, y 985–1170 của vùng chơi art/out/demo/l6_demo_path_play.png.
- Nhân vật Lu: **tham chiếu art/out/dogs/lu_ref.png** (chó con lông xù vàng mật ong nhạt, tai dài rủ mềm, mõm kem, mũi nâu, má hồng, mắt nâu tròn); giữ y hệt thiết kế, màu, nét.
- Bản cũ (chủ dự án chê lệch): art/out/_sheets/l6src_l6_dog_chew.png: đầu nghiêng, tai lệch, chân và xương chưa gọn. Giữ **cỡ đầu, màu, độ dày nét** như bản cũ.
- **Ảnh khung cửa tham chiếu: art/ref/l6_cut/chew_door_guide.png** (chuồng `l6_dog_house` vẽ mờ). Dùng để hình dung Lu nằm trong chuồng thò ra cửa vòm: đầu Lu rộng khoảng 3/4 bề rộng cửa vòm, mũi ở đúng giữa cửa, hai chân trước đặt trên ngưỡng cửa. **Ảnh xuất KHÔNG có chuồng, không cửa, không ngưỡng: chỉ có Lu.**
- Ảnh tham chiếu, mở hết bằng view_image trước khi vẽ: art/ref/owner_l1_style_ref.png, art/ref/l1_depth_angle_ref.png, art/out/demo/l6_demo_path_916.png, art/out/demo/l6_demo_path_play.png, art/out/dogs/lu_ref.png, art/out/_sheets/l6src_l6_dog_chew.png, art/ref/l6_cut/chew_door_guide.png, art/out/level6/l6_bone.png (mẫu khúc xương).

## Mô tả
`l6_dog_chew`: Lu **nằm sấp trong chuồng, chỉ thò đầu và hai chân trước ra ngoài cửa**, nhìn **thẳng trực diện**.
- **Đầu thẳng, đối xứng trái phải** (không nghiêng, không quay): **hai tai dài rủ đều hai bên đầu**, cùng cỡ, cùng độ dài; mũi nâu ở giữa mặt.
- **Mắt híp vui** (hai vòng cung cong lên), má hồng hai bên đều nhau.
- **Khúc xương kem nằm ngang ngay dưới cằm**, miệng gặm vào giữa khúc xương (thấy chút lưỡi hồng hoặc răng nhỏ ở giữa), hai đầu xương thò đều hai bên.
- **Hai chân trước mũm mĩm đặt song song** phía dưới, bàn chân kem tròn có vạch ngón, **ôm hai bên khúc xương**, cùng cỡ.
- Không thấy thân phía sau (thân ở trong chuồng). **Đáy phẳng ngang** (ngưỡng cửa) ngay dưới hai bàn chân.
- **Bố cục cân giữa:** trục đối xứng của Lu nằm đúng giữa ảnh theo chiều ngang. Lu to hết cỡ, lề trong suốt khoảng 40px (G5-34).
- Không bóng sàn, không quầng sáng, không viền trắng, không chữ, không số.

## Luật
- Trước khi gọi image_gen viết "Nhắc lại quy tắc" (phong cách, góc nhìn, màu, nét, nhân vật, phần lấy / không lấy). Tin nhắn cuối có "Tự kiểm" (đầu đối xứng, tai đều, chân song song ôm xương, cân giữa, giống lu_ref, cỡ đầu như bản cũ, chỉ có Lu, nền trong suốt, không chữ: đạt / không đạt + lý do), SAVED, prompt cuối.

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
