VẼ LẠI 2 ẢNH CHÓ — Level 7 (G7-25, chủ dự án: "chó style và cute như chó level 6"), đúng quy tắc AGENTS.md (vai Codex: chỉ vẽ). **Model gpt-6.1-sol, mức medium.** Mỗi ảnh gọi image_gen **một lần** (2 lần cả lượt).

**VẼ ĐÚNG CON CHÓ NÀY: chó Lu ở Level 6** — art/out/level6/l6_dog_bark.png, art/out/level6/l6_dog_belly.png, art/out/level6/l6_dog_chew.png (mở cả ba bằng view_image). Cùng giống chó, cùng kiểu nét viền, cùng khối lông, cùng mặt, mắt, cùng tỉ lệ đầu/thân, cùng màu. **Chỉ đổi dáng.**

Đặc điểm Lu L6 phải giữ:
- **Đầu to tròn, thân nhỏ gọn** (đầu gần bằng thân), chibi dễ thương.
- **Nét viền nâu ấm mảnh, rõ, gọn**; lông chỉ xù nhẹ ở mép (vài nét lông ngắn), **khối lông gọn, mượt**, KHÔNG phải cục bông xù to.
- Lông vàng mật ong nhạt; **mõm, ngực, bàn chân, chóp đuôi màu kem**; tai dài rủ mềm màu đậm hơn thân một chút; má hồng; mũi nâu tròn; mắt nâu tròn to có đốm sáng.
- **Không vòng cổ** (đây là chó lạc ở L7).

Bản cũ bị chê (lông xù và mềm quá, thân to như cục bông, khác nét Lu): art/out/_sheets/l7src_l7_stray_dog_scared.png. KHÔNG vẽ theo kiểu lông của bản này.

## 1. `l7_stray_dog_scared` → art/out/_sheets/l7src_l7_stray_dog_scared.png (1536x1024 ngang, nền trong suốt, **được phép ghi đè**)
- Lu **nằm sấp co ro sợ mưa**, nhìn trực diện hơi nghiêng sang phải: **cằm gác lên hai chân trước** khoanh phía trước, thân nhỏ cuộn lại phía sau, **đuôi kem cuộn ôm hông**, hai tai rủ cụp xuống.
- Mắt nâu tròn to **ngước lên sợ sệt**, lông mày nhỏ nhíu, miệng nhỏ mếu. Má hồng.
- **2–3 giọt nước nhỏ** xanh trời nhạt trên đầu, lưng; vài túm lông đầu hơi ướt rủ. Không vẽ mưa, vũng nước.
- Lấp gần kín khung, lề ~40 px, đáy phẳng như nằm trên đất.

## 2. `l7_stray_dog_inbox` → art/out/_sheets/l7src_l7_stray_dog_inbox.png (1536x1024 ngang, nền trong suốt, **được phép ghi đè**)
- **Mặt Lu nhìn thẳng** như trong l6_dog_chew.png (cùng mặt, cùng tai, cùng nét), **không xương, không chân**: chó đã chui vào thùng, chỉ thò **phần trước của đầu**: trán, hai mắt, mõm kem, mũi nâu, má hồng, hai tai rủ hai bên; mép dưới cắt ngang mềm (chỗ miệng thùng).
- **Mắt cong cười nhẹ, đã hết sợ**, miệng cười nhỏ.
- **Vẽ to và rõ**: mặt lấp gần kín khung (Dev sẽ phóng to trong lòng thùng), lề ~40 px. Chi tiết mặt rõ, nét gọn.
- Cùng màu, nét với ảnh 1.

## Ảnh tham chiếu (mở hết bằng view_image; đính kèm tối đa 5 ảnh mỗi lần)
1. art/out/level6/l6_dog_bark.png — **Lu, CHÍNH**.
2. art/out/level6/l6_dog_belly.png — **Lu, CHÍNH** (dáng nằm, khối thân).
3. art/out/level6/l6_dog_chew.png — **Lu mặt nhìn thẳng, CHÍNH** (bắt buộc cho ảnh 2).
4. art/ref/owner_l1_style_ref.png — chuẩn màu, chất chì.
5. Ảnh 1 thêm: art/ref/l1_depth_angle_ref.png (góc nhìn). Ảnh 2 thay ảnh 5 bằng ảnh 1 vừa vẽ (giữ cùng màu, nét).

## Quy tắc bắt buộc (AGENTS.md)
- Trước mỗi lần gọi image_gen viết **"Nhắc lại quy tắc"** (phong cách, màu, góc nhìn, nét, "vẽ đúng Lu L6", yêu cầu riêng).
- **Nền TRONG SUỐT thật.** Chép nguyên ảnh, không xử lý. Màu nhạt như Lu L6, không đậm hơn. Không chữ, không số, không bóng sàn, không quầng, không viền trắng, không vệt chuyển động.
- Tin nhắn cuối: `SAVED: ...` từng file, prompt cuối từng ảnh, **"Tự kiểm"** từng ảnh (giống Lu L6 về nét, lông, mặt, tỉ lệ; dáng; màu; nền; không chữ: đạt / không đạt + lý do).

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
