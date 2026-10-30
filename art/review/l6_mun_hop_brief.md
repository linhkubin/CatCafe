Vẽ TỜ `l6_mun_hop_sheet` (Level 6, G6-23: Mun nhảy xuống bậc), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ; **một lần gọi image_gen cho cả tờ**, mục "Vẽ theo tờ").

- Ảnh ra: **art/out/_sheets/l6_mun_hop_sheet.png**, **1536x1024**, **nền TRONG SUỐT thật**. File mới. Chép nguyên ảnh, không cắt, không xử lý.
- **Ảnh demo gốc (G4-26): art/out/demo/l6_demo_path_916.png**. Hai dáng này không có trong demo; Mun trên mái ở x 300–420, y 140–235 của vùng chơi art/out/demo/l6_demo_path_play.png là mẫu thiết kế, màu, nét của Mun.
- Nhân vật Mun (tiền tố `mun_`): **tham chiếu art/out/cats/mun_ref.png**, giữ y hệt thiết kế: mèo con đen than ấm #3E3838 lông xù vẽ chì, mắt vàng tròn to, tai trong hồng, má hồng, mũi hồng nhỏ, đầu to thân nhỏ.
- **Cùng cỡ đầu, cùng nét, cùng màu với dáng chuẩn bị art/out/_sheets/l6src_mun_step_down.png** (ba dáng nối nhau thành một cú nhảy: step_down → hop_down → land). Viền ngoài dày khoảng 1 lần viền trong ảnh đó.
- Ảnh tham chiếu, mở hết bằng view_image trước khi vẽ: art/ref/owner_l1_style_ref.png, art/ref/l1_depth_angle_ref.png, art/out/demo/l6_demo_path_916.png, art/out/demo/l6_demo_path_play.png, art/out/cats/mun_ref.png, art/out/_sheets/l6src_mun_step_down.png.

## Bảng ô (x,y,w,h trong tờ 1536x1024)
| Ô | Key | Neo | Mô tả |
|---|---|---|---|
| 0,0,900,1024 | mun_hop_down | tâm | Mun đang bay |
| 900,0,636,1024 | mun_land | đáy | Mun vừa đáp |

**Bố cục:** ô trái Mun đang bay, ô phải Mun vừa đáp. Mỗi ô một Mun, **to gần kín ô, lề trong suốt khoảng 40px** (G5-34), không chạm, không lấn ô kia. Không vẽ khung, đường kẻ, số ô. **Hai Mun cùng cỡ đầu** (đầu rộng như nhau). Cả hai **quay mặt sang phải**.

## Mô tả từng ô
- `mun_hop_down`: Mun **đang bay giữa cú nhảy xuống**, nhìn nghiêng sang phải. Thân duỗi dài chéo xuống phía trước (đầu thấp bên phải, mông cao bên trái). **Hai chân trước duỗi thẳng ra trước, xuống dưới để đón đất**, bàn chân hơi xoè; **hai chân sau duỗi về sau, lên trên như vừa đạp rời bậc**. **Thấy rõ cả bốn chân**, tách nhau, không chân nào bị thân che. Đuôi dựng cong lên phía sau giữ thăng bằng. Tai hơi cụp ra sau, mắt vàng tròn nhìn xuống chỗ đáp (dưới bên phải), miệng nhỏ. Nhẹ nhàng, uyển chuyển, mềm như mèo thật nhảy; không cứng, không chổng mông. Không vẽ bậc, đất.
- `mun_land`: Mun **vừa đáp**, nhìn nghiêng sang phải. **Cả bốn chân chạm đất trên một đường đáy phẳng ngang**, hai chân trước phía trước, hai chân sau phía sau; thân **hơi co, nhún xuống** (lưng cong mềm, khuỷu chân hơi gập), đuôi cong lên. Đầu ngẩng bình thường, **mặt tỉnh bơ** (mắt tròn nửa khép, miệng nhỏ thẳng). Tai dựng. Không vẽ bậc, đất, bóng.

## Luật
- Không bóng sàn, không quầng sáng, không glow, không viền trắng. Không chữ, không số.
- Trước khi gọi image_gen viết "Nhắc lại quy tắc" (phong cách, góc nhìn, màu, nét, nhân vật, ô). Tin nhắn cuối có "Tự kiểm" (góc nhìn, nét, màu, nhân vật giống mun_ref, cỡ đầu bằng step_down, đủ 4 chân rõ, ô và lề, nền trong suốt, không chữ: đạt / không đạt + lý do), SAVED, prompt cuối.

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
