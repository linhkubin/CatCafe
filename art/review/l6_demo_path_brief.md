VẼ DEMO `l6_demo_path` — Level 6 "Xuống đây nào, Mun!", lúc xếp xong đường và Mun xuống ăn (G6-8), đúng quy tắc trong AGENTS.md (vai Codex: chỉ vẽ). Ảnh demo, lưu vào art/out/demo/.

CHỈNH SỬA TỪ ẢNH **art/ref/l6_demo/bg_play.png** (1024x1536, nền sân sau L5 dùng lại). **Giữ nguyên nền**, chỉ vẽ đồ và nhân vật theo toạ độ. Ảnh khối (vị trí): art/review/l6_dev_check/layout/l6_khoi_mun_tren_ban_9x16_g612.jpg. **Món chung giống hệt demo mở màn art/out/demo/l6_demo_start_b.png** (đính kèm): cùng hình, màu, nét.

## Toạ độ (px trên ảnh 1024x1536 = toạ độ game; "đáy" = điểm giữa đáy món; rộng × cao là cỡ phần vẽ). Số theo bản khối đã duyệt, `art/review/l6_dev_check/l6_block_layout.md` mục 10–12 (G6-12, G6-13, G6-16)
Cảnh nền: hàng rào gỗ kem (đỉnh y ≈ 360–375, chân rào y ≈ 872), sàn gạch kem, **cột dây phơi trái x ≈ 490**, cửa sau quán bên phải. **Giữ nguyên nền**, chỉ vẽ đồ lên trên.

| Món | Đáy (x, y) | Rộng × cao | Mô tả |
|---|---|---|---|
| Cây + ổ chim | cây (100, 880); ổ (175, 600) | cây 240 × 520 | Cây tán tròn **xanh lá nhạt pha kem** sát rào trái, thân gỗ mật ong; ổ chim rơm nhỏ trên cành |
| Chuông gió (có sẵn L5) | treo đỉnh (330, 380) | rộng 61 | Như chuông gió demo sân sau L5 |
| Găng tay đen trên rào | (440, 415) | 80 × 100 | Xem mục "chốt" bên dưới |
| Nhà kho gỗ | (820, 1010) | **530 × 475** | Gỗ mật ong nhạt, **mái tôn xanh xám rất nhạt**, **mặt mái phẳng y ≈ 541**, mép mái trái x ≈ 555 (y ≈ 620); cửa gỗ đóng ở nửa phải. Mép phải lấn ra ngoài 1024 một chút (bị cắt, không sao) |
| Ống khói | (960, 590) | 92 × 184 | Gạch hồng đào nhạt trên mái phải |
| Bàn picnic | (130, 1068) | 230 × 120 | Bàn gỗ ngoài trời, **mặt bàn y ≈ 948** |
| Chuồng Lu | (880, 1290) | **265 × 235** | Chuồng gỗ mái tam giác hồng đào nhạt, **cửa vòm tối** tâm ≈ (880, 1205), rộng ≈ 170 |
| Bụi rau | (365, 1290) | 200 × 100 | Luống rau xanh lá nhạt trong khung gỗ thấp |
| Bình tưới | (650, 1290) | 80 × 76 | Bình tưới xanh trời nhạt |

**Lớp trước sau:** đồ và con vật trên mặt sân xếp theo y chân (chân thấp hơn = gần người xem = vẽ đè lên). Đồ đặt trên đồ khác vẽ trên đồ đỡ. **Mọi con vật nhìn sang phải** (G6-15).

Riêng cảnh xếp xong (4 bậc đường xuống, cao dần từ trái sang phải tới mép mái):
| Món | Đáy (x, y) | Rộng × cao | Mô tả |
|---|---|---|---|
| Thùng phuy ở A | (530, 1010), sát tường kho trái | 110 × 285 | như mở màn, miệng y ≈ 725 |
| Hộp dụng cụ đậy miệng phuy | (530, 725) | 120 × 50 | nằm khít trên miệng phuy, mặt trên y ≈ 675 (bậc cao nhất) |
| Thùng gỗ ở B | (405, 1035) | 130 × 228 | mặt trên y ≈ 807 |
| Ghế đẩu ở C | (300, 1065), sát phải bàn | 110 × 125 | mặt ghế y ≈ 940 |
| Giỏ picnic **mở nắp** | (72, 948) | 110 × 96 | nắp bật lên |
| **Mun ăn trên bàn** | (200, 948) | **rộng ≈ 210** | Mun đứng trên mặt bàn (chân chạm y 948) cạnh giỏ, nhìn sang phải, **cúi ăn khúc xúc xích** hồng nhạt, vui |
| **Lu trong chuồng** | (880, 1290), trong cửa chuồng | **≈ 172 × 121** | Lu đã chui vào chuồng, **chỉ thò đầu và hai chân trước ngắn mũm mĩm** ra cửa vòm, gặm khúc xương kem, mắt híp vui |

**Chốt kỹ trước khi vẽ:**
- **Màu theo mẫu L1** (art/ref/owner_l1_style_ref.png, art/out/demo/l1_demo_start.png): bão hoà trung bình **0,22–0,25**, p90 **≤ 0,46** (lượt trước đo 0,30 / 0,51 là quá đậm). Tán cây xanh lá nhạt pha kem (không xanh tươi), mái tôn xanh xám rất nhạt, ống khói, chuồng, giỏ, phuy đều nhạt. Mảng lớn nhạt nhất. Nghi thì vẽ nhạt hơn.
- **Tỉ lệ (G6-16, chủ dự án chốt):** Mun ≈ 210 rộng; **Lu chỉ to hơn Mun một chút ≈ 1,1 lần**; nhà kho to hẳn (cao > 2 lần Lu ngồi); chuồng 265 × 235 vừa Lu. Lu và Mun theo art/out/dogs/lu_ref.png và art/out/cats/mun_ref.png (mặt tròn).
- **Găng tay đen = mèo đen giả:** nhìn thoáng qua phải tưởng **một con mèo đen nhỏ ngồi trên đỉnh rào**: găng vải đen than ấm vắt qua đỉnh rào, **hai ngón dựng như hai tai mèo**, lòng găng tròn như đầu, cổ găng thòng xuống mặt trước như thân, viền cổ găng hồng đào. Không mắt, không mặt. (găng vẫn vắt trên rào, giống hệt demo mở màn)

Không vẽ Lu ngồi dưới mái, không Mun trên mái, không hộp dụng cụ/phuy/thùng/ghế ở chỗ cũ. Không giao diện, không chữ.

## Ảnh tham chiếu (mở hết bằng view_image, đính kèm)
1. art/ref/l6_demo/bg_play.png — ẢNH CẦN CHỈNH SỬA (nền).
2. Ảnh khối của cảnh (vị trí từng món).
3. art/out/cats/mun_ref.png — Mun. 4. art/out/dogs/lu_ref.png — Lu (chân trước khi nằm ngắn).
5. art/out/demo/l6_demo_start_b.png — demo mở màn L6 (món chung giống hệt). 5b. art/out/demo/l5_demo_yard_916.png — demo sân sau L5 đã duyệt (chuông gió, chất vẽ cảnh này).
6. art/ref/owner_l1_style_ref.png — chuẩn màu. 7. art/out/demo/l1_demo_start.png — mẫu L1. 8. art/ref/l1_depth_angle_ref.png — góc nhìn.

## Lưu và báo cáo
- Lưu vào **art/out/demo/l6_demo_path.png** (file mới). Gọi image_gen MỘT lần, 1024x1536, chép nguyên.
- Chạy `python tools/color_check.py art/out/demo/l6_demo_path.png` (trung bình 0,22–0,25, p90 ≤ 0,46).
- "Nhắc lại quy tắc" trước; "Tự kiểm" cuối (giữ nguyên nền; đúng vị trí, cỡ từng món; tỉ lệ Lu ≈ 1,1 lần Mun, kho to hẳn; con vật nhìn sang phải; đúng thiết kế Mun, Lu; găng như mèo ngồi; màu theo số đo; không chữ; không giao diện). SAVED, prompt cuối.

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
