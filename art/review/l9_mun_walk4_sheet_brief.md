Vẽ TỜ `l9_mun_walk4_sheet` — Mun đi bộ 4 khung, chu kỳ lặp (Level 9, cảnh kết, G9-16, G9-17), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ; mục "Vẽ theo tờ").

Cuối Level 9, Mun đi từ mép trái vào tới bát súp. 4 khung đi cũ (art/out/cats/mun_soup_walk_0..3.png) bị chủ dự án chê **cứng, xấu** (mỗi khung sửa riêng từ một ảnh nên thân, mặt, đuôi lệch nhau). Tờ này vẽ lại **cả 4 khung trong MỘT ảnh**, để Mun giống hệt nhau ở mọi khung, chỉ khác chân, nhún thân và đuôi. Game chạy lặp 4 khung và tự dời Mun sang phải.

## Nhân vật
- **Mun** theo art/out/cats/mun_ref.png (Mun mặt tròn, đã duyệt): mèo đen than ấm có vân bút chì (không đen tuyền), **đầu và mặt tròn**, má phình, mắt tròn to vàng mật ong có 2 chấm sáng, tai hồng hơi nghiêng ra, má hồng nhạt, mũi hồng nhỏ, ria kem, thân thon, chân dài vừa, đuôi dài.
- **Nhìn nghiêng, đi sang PHẢI**, mặt hướng phải, như dáng đi ở giữa mun_ref và art/out/cats/mun_soup_walk.png (cùng hướng, cùng góc, cùng tỉ lệ đầu/thân). Mặt vui, hào hứng như ngửi thấy mùi súp: mắt mở to sáng, miệng cười nhẹ.

## Bảng tờ (1536x1024, nền trong suốt, 2 hàng × 2 cột)
| Ô | x,y,w,h | Key | Khung |
|---|---|---|---|
| 1 | 0,0,768,512 | mun_soup_walk_0 | **Chạm A:** chân trước PHẢI (phía xa) duỗi ra trước chạm sàn, chân sau TRÁI (phía gần) duỗi ra sau chạm sàn; chân trước trái và chân sau phải ở dưới thân. Thân thấp nhất |
| 2 | 768,0,768,512 | mun_soup_walk_1 | **Qua A:** chân trước trái (gần) đang nhấc cong lên đưa ra trước, chân sau phải (xa) nhấc cong lên; hai chân còn lại đỡ dưới thân. **Thân cao hơn khung 1 khoảng 4% chiều cao mèo**, đầu hơi ngẩng |
| 3 | 0,512,768,512 | mun_soup_walk_2 | **Chạm B:** đối xứng khung 1: chân trước TRÁI (gần) duỗi ra trước chạm sàn, chân sau PHẢI (xa) duỗi ra sau chạm sàn. Thân thấp như khung 1 |
| 4 | 768,512,768,512 | mun_soup_walk_3 | **Qua B:** đối xứng khung 2: chân trước phải (xa) nhấc cong đưa ra trước, chân sau trái (gần) nhấc cong. Thân cao như khung 2 |

- **Nhịp đi mèo thật:** chân chéo đi cặp (trước + sau đối bên). Bước nhẹ, êm, có lực; chân nhấc cong mềm, không thẳng đơ như que.
- **Đuôi** dựng cong mềm, đung đưa nhẹ: khung 1 nghiêng ra sau một chút, khung 2 thẳng lên, khung 3 nghiêng ra sau, khung 4 thẳng lên (để khung 4 nối về khung 1 mượt).
- **Đầu** gật rất nhẹ theo thân (lên ở khung 2, 4).
- **Giống hệt nhau ở cả 4 khung:** cỡ con mèo, đầu, mặt, mắt, tai, màu lông, nét, độ dài thân; **cùng vị trí ngang trong ô** (mèo đi tại chỗ, không trượt sang phải từng khung: thân giữa ô ở cả 4 khung) và **cùng đường sàn** (chân chạm sàn ở cùng độ cao trong mỗi ô, khoảng 40px trên mép dưới ô).
- Mỗi con nằm trọn trong ô, cách mép ô ≥ 40px, lấp gần kín ô (cao khoảng 75–80% ô). Không vẽ khung, đường kẻ, số ô.
- Nét: viền ngoài nâu sẫm ấm, đậm nhạt như bút chì, dày tương đương viền mèo trong mun_ref. Không bóng sàn, không vệt chuyển động, không quầng, không chữ.

## Ảnh tham chiếu (mở hết bằng view_image, đính kèm)
1. art/out/cats/mun_ref.png — thiết kế Mun (chuẩn).
2. art/out/cats/mun_soup_walk.png — dáng đi nghiêng sang phải, tỉ lệ trong L9.
3. art/out/cats/mun_soup_walk_0.png … _3.png — 4 khung cũ (chỉ để thấy cỡ và nhịp, **đừng theo độ cứng**).
4. art/out/demo/l9_demo_end.png — demo cảnh kết L9 đã duyệt (Mun trong cảnh).
5. art/ref/owner_l1_style_ref.png — chuẩn màu và chất chì. 6. art/ref/l1_depth_angle_ref.png — góc nhìn.

## Lưu và báo cáo
- Lưu vào **art/out/_sheets/l9src_mun_walk4.png** (file mới). Gọi image_gen MỘT lần, 1536x1024, nền trong suốt, chép nguyên, không cắt, không xử lý.
- "Nhắc lại quy tắc" trước; "Tự kiểm" cuối (đạt / không đạt + lý do): đúng Mun mặt tròn; đi sang phải; 4 khung đúng thứ tự chân chéo; thân nhún ở khung 2, 4; giống hệt nhau trừ chân/đuôi/nhún; cùng vị trí ngang và cùng đường sàn; trọn trong ô; nền trong suốt; không chữ; không quầng. SAVED, prompt cuối.

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
