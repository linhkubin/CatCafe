VẼ LẠI 2 MÓN — lượt `l6_glove` (Level 6, G6-21: chủ dự án chơi thử, găng tay vẽ lại đẹp hơn), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ; mỗi món một lần gọi image_gen, mỗi món một ảnh, 2 món).

**Ảnh demo gốc đã duyệt: art/out/demo/l6_demo_path_916.png** (khung điện thoại); vùng chơi không giao diện: **art/out/demo/l6_demo_path_play.png** (1024x1536). Găng trong demo nằm ở **x 385–455, y 340–440** của vùng chơi: găng đen vắt trên đỉnh hàng rào, cạnh chuông gió. Ảnh cắt: art/ref/l6_cut/crops/glove.png.
Bản tách cũ (chủ dự án chê đơn giản, xám, giống găng hở ngón cứng): art/out/_sheets/l6src_l6_glove_black_idle.png, art/out/_sheets/l6src_l6_glove_black_fallen.png. **Được phép ghi đè hai file này.**

## Luật chung
- Giữ đúng ý demo (găng đen vắt đỉnh rào, cổ găng hồng đào), nhưng **vẽ đẹp và kỹ hơn** theo mô tả từng món. Cùng phong cách, màu, nét như các món L6 khác trong demo.
- Mỗi món: gọi image_gen **một lần**, đính kèm ảnh demo gốc + ảnh cắt glove.png + ảnh tham chiếu chung. **Nền TRONG SUỐT thật.** Món to hết cỡ trong khung, lề trong suốt khoảng 40px (G5-34), không bị cắt.
- **Chỉ đúng một món** trong ảnh: KHÔNG vẽ hàng rào, trời, sân, bóng, quầng, viền trắng. Không chữ, không số.
- **Màu găng:** đen than ấm **#3E3838** (đúng ô màu Mun), **không đen kịt, không xám lạnh**; thấy rõ vân chì và lấm tấm giấy kem trong mảng đen, vài nét chì sáng hơn ở chỗ phồng (sáng từ trên trái). Cổ găng hồng đào #F7B9A3 nhạt, có gân đan dọc đơn giản.
- Lưu nguyên ảnh vào đúng đường dẫn, không cắt, không xử lý.
- Trước mỗi lần gọi image_gen viết "Nhắc lại quy tắc" (phong cách, góc nhìn, màu, nét, phần lấy / không lấy). Tin nhắn cuối có "Tự kiểm" **từng món** (dáng, màu, chi tiết, nền trong suốt, không chữ: đạt / không đạt + lý do), SAVED từng file, prompt cuối từng món.

## Ảnh tham chiếu chung (mở hết bằng view_image)
1. art/out/demo/l6_demo_path_916.png — **ẢNH DEMO GỐC**.
2. art/out/demo/l6_demo_path_play.png — vùng chơi của demo.
3. art/ref/l6_cut/crops/glove.png — găng cắt từ demo.
4. art/ref/owner_l1_style_ref.png — chuẩn màu và chất chì.
5. art/ref/l1_depth_angle_ref.png — góc nhìn (sofa L1).
6. art/out/cats/mun_ref.png — mèo đen Mun: **chỉ để găng gợi dáng một con mèo đen ngồi** (cùng màu đen than ấm, cùng cỡ dáng ngồi), **KHÔNG vẽ mặt, mắt, mũi, râu, đuôi mèo thật**.

## Danh sách 2 món

### 1. `l6_glove_black_idle` → art/out/_sheets/l6src_l6_glove_black_idle.png (1024x1536, nền trong suốt)
Găng tay làm vườn bằng vải đen than ấm **vắt trên đỉnh hàng rào** (không vẽ rào): đầu ngón và lòng găng ở trên, cổ găng thòng xuống phía dưới, nhìn thẳng từ trước.
- **Liếc qua giống một con mèo đen nhỏ ngồi** (đồ đánh lừa): **hai ngón (ngón trỏ và ngón út) dựng lên hơi tách ra như hai tai mèo**, hai ngón giữa gập xuống ra sau nên đỉnh găng tròn như đầu mèo giữa hai "tai"; lòng găng phồng tròn như thân mèo ngồi; **ngón cái cong ra một bên ở dưới như cái đuôi cuộn**; cổ găng loe ra ở đáy như chỗ mèo ngồi.
- **Nhìn kỹ là găng tay rõ ràng:** ngón mềm đầu tròn, có nếp nhăn vải ở khớp ngón, **đường may chỉ chạy dọc mép ngón** (nét đứt chì nhỏ màu nâu nhạt), vải hơi xù (mép viền có vài sợi lông vải ngắn), **cổ găng đan hồng đào bo viền** có gân dọc, thấy một chút lòng trong cổ găng.
- Không có mặt, mắt, mũi, râu. Dáng mềm, mũm mĩm, dễ thương, ít chi tiết.
- Đáy cổ găng phẳng ngang. Đỉnh hai "tai" là điểm cao nhất (neo đỉnh vắt mép rào).

### 2. `l6_glove_black_fallen` → art/out/_sheets/l6src_l6_glove_black_fallen.png (1536x1024, nền trong suốt)
**Cùng chiếc găng ở món 1** (vẽ món 1 trước rồi đính kèm art/out/_sheets/l6src_l6_glove_black_idle.png làm tham chiếu): cùng màu đen than ấm, cùng cổ găng hồng đào, cùng đường may, vải xù, cùng độ dày nét, cùng cỡ găng.
- Găng **nằm bẹp trên mặt sân**, xoè ngang: cổ găng bên trái (thấy lòng trong cổ găng hồng nhạt), năm ngón duỗi mềm sang phải, hơi rủ, ngón cái chìa lên một chút. Thấy mặt trên mu găng theo góc nhìn hơi từ trên xuống, dày vải mềm, không phẳng như giấy.
- Hết dáng "mèo": không còn hai ngón dựng. Đáy phẳng như nằm trên đất.
- KHÔNG vẽ sân, bóng.

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
