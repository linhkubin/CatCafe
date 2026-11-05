VẼ MỚI `mun_bath_tail_sleek` (lần 3) — Level 8 "Tắm cho Mun" (G8-14). Chủ dự án xem bản G8-13 và nói: **vẫn chưa đẹp, chưa khớp style**. VẼ MỚI TỪ ĐẦU, không chỉnh sửa ảnh cũ. Đúng quy tắc AGENTS.md (vai Codex: chỉ vẽ). Model gpt-6.1-sol, mức medium.
**Ảnh demo gốc: art/out/demo/l8_demo_stage3.png.**
Lưu: **art/out/_sheets/l8src_mun_bath_tail_sleek_v3.png** (1024x1536 dọc, nền trong suốt, file mới, không ghi đè file khác).

## 4 lỗi của bản trước — TUYỆT ĐỐI KHÔNG LẶP LẠI
1. Dáng như **khúc xúc xích**: to đều từ gốc tới ngọn, gốc phình tròn, ngọn tròn như quả bóng.
2. **Viền nâu mờ**, gần như không có viền (thân Mun có viền nâu ấm rõ).
3. Màu **xám nâu nhạt**, lệch so với nâu sô-cô-la ấm của thân.
4. Lông **mờ mịn như phun sơn**, không thấy nét chì.

## Yêu cầu đuôi mượt (sau khi tắm, chải xong)
- **Dáng thon dần** từ gốc tới ngọn: gốc rộng vừa (chỉ khoảng **1/2 bề rộng gốc đuôi fluffy** trong ảnh tham chiếu 2), giữa đuôi hẹp hơn gốc, ngọn **thuôn tròn nhỏ** (không nhọn như kim, không phình tròn như quả bóng). Mảnh hơn đuôi fluffy rõ rệt. Đuôi dài, chiều dài ≈ 7 lần bề rộng gốc.
- **Hướng và đường cong:** gốc ở **dưới-trái** (quanh (330, 1330)), đuôi chạy chéo lên phải rồi dựng lên, ngọn ở trên (y ≈ 180). **Cong chữ S nhẹ**, cùng hướng cong với đuôi fluffy (ảnh 2): cong lên ở gần gốc, ngọn hơi ngả sang trái. Không cong móc ngược xuống.
- **Màu giống hệt thân `mun_bath_sleek` (ảnh 1):** nâu sô-cô-la ấm (lấy màu từ lưng và hông thân trong ảnh 1, trung bình khoảng #79 5D 51), không xám, không nhạt hơn thân.
- **Viền giống hệt thân ảnh 1:** nét nâu ấm sẫm (#6B4A3A tới nâu sô-cô-la đậm) **thấy rõ quanh toàn bộ đuôi**, cùng độ dày với viền thân; **đậm và dày hơn ở mặt dưới / mặt phải của đuôi và ở gốc**, mảnh dần và đứt nhẹ ở ngọn và mặt trên. Không phải đường vector đều.
- **Lông nằm xuôi theo chiều đuôi**, vẽ bằng **nét chì ngắn thấy rõ** (như lông lưng thân ảnh 1), có vài nét chì sẫm hơn ở mặt dưới đuôi để tạo khối. **Mép đuôi gọn, mượt**, chỉ vài chỏm lông nhỏ nhọn ở mép, **không xù** như đuôi fluffy.
- **Một vệt sáng chì nhạt dọc sống đuôi** (mặt trên/trái, vài nét chì nâu sáng ấm), cho cảm giác mượt bóng; nhẹ thôi, không glow, không bóng loáng.
- Gốc đuôi gọn, cắt bằng tròn mềm (sẽ khuất sau thân), **không phình to**.
- Đuôi to hết cỡ trong khung theo chiều dọc, lề ~40 px. Nền trong suốt. Không vẽ gì khác (không giọt nước, không bọt, không thân mèo).

## Ảnh tham chiếu (đính kèm đúng 4) — mở hết bằng view_image
1. art/out/cats/mun_bath_sleek.png — **CHUẨN màu, viền, chất lông** (thân Mun sau khi chải). Đuôi phải trông như cùng một bức vẽ với thân này.
2. art/out/cats/mun_bath_tail_fluffy.png — chỉ để lấy **hướng, đường cong, cách vẽ viền nâu rõ**; đuôi sleek **mảnh hơn nhiều, mép gọn hơn**.
3. art/out/demo/l8_demo_stage3.png — demo gốc.
4. art/ref/owner_l1_style_ref.png — chuẩn màu chung.

## Quy tắc bắt buộc (AGENTS.md)
- Trước khi gọi image_gen: mở mọi ảnh tham chiếu bằng view_image, viết **"Nhắc lại quy tắc"** (phong cách, góc nhìn, màu, nét, 4 lỗi không được lặp, yêu cầu riêng).
- Gọi image_gen **một lần** (nếu sai rõ ràng được vẽ lại tối đa 1 lần). Nền TRONG SUỐT thật. Chép nguyên ảnh, không xử lý. Không chữ, không bóng sàn.
- Tin nhắn cuối: `SAVED: ...`, prompt cuối, **"Tự kiểm"** (thon dần không phải xúc xích; viền nâu rõ như thân; màu nâu sô-cô-la như thân; nét chì lông xuôi thấy rõ; mép gọn; vệt sáng nhẹ; hướng chữ S đúng; nền trong suốt; không chữ: đạt / không đạt + lý do), một dòng tự nhận xét.

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
