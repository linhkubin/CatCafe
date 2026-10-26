# Level 3 – Cột cào 4 mảnh: lời giao vẽ lại (GD, theo yêu cầu chủ dự án)

Chủ dự án chê bản cột cào ghép bằng script: "không hề giống và quá xấu". Yêu cầu Codex **vẽ lại thật** 4 mảnh, giống **hoàn toàn** hình mẫu.

- **Ảnh mẫu bắt buộc:** `art/ref/l3_cat_tree_ref.png` (cắt từ `art/out/demo/l3_demo_reveal.png`, demo đã duyệt). Codex mở bằng `view_image` trước khi vẽ.
- Kèm như mọi lượt: `art/ref/owner_l1_style_ref.png`, demo đã duyệt `art/out/demo/l3_demo_start.png`, `l3_demo_reveal.png`. Dán khối style (style.md mục 1) và góc nhìn (mục 2b).
- **Không** dựng lại bằng script, không cắt từ cây cũ, không ghép từ ảnh cũ. Art chỉ được cắt tờ bằng `sheet_cut.py`.

## Hình mẫu đo được (đơn vị: phần của chiều cao cả cây H, ảnh mẫu H ≈ 532px)

Từ trên xuống, góc nhìn 3/4 hơi từ trên (thấy mặt trên của ổ, của bục hồng, của đế):

| Phần | Rộng | Cao | Ghi chú hình dạng |
|---|---|---|---|
| Ổ lông kem (bục trắng) | 0,54 H | 0,24 H | Vòng donut bầu dục, viền lông dày phồng, thấy rõ lòng ổ trũng ở giữa. Kem rất nhạt, bóng ấm nhẹ |
| Cột trên | 0,15 H | 0,21 H (đoạn lộ) | Trụ thừng sisal be, vòng thừng ngang đều (~10 vòng), thẳng, thon |
| Bục hồng | 0,56 H | 0,21 H | Đĩa tròn **rộng, dẹt** nhìn nghiêng thành bầu dục; mặt trên phẳng, thành bên dày ~0,08 H. Lông hồng phấn xoăn |
| Cột dưới | 0,16 H | 0,23 H (đoạn lộ) | Như cột trên, hơi to hơn một chút |
| Đế xanh | 0,52 H | 0,27 H | Khối vuông **thấp, dẹt**, bo góc mềm; thấy mặt trên hẹp và mặt trước. Xanh bạc hà, lông ngắn |
| Quả cầu lông | Ø 0,12 H | | Đỏ san hô, lông xù tròn. Treo bằng **sợi dây mảnh ngắn ~0,07 H** từ mặt dưới ổ, ở bên trái cột trên |

**Trục và lệch (quan trọng để chồng khớp):**
- Cột dưới nằm **giữa** đế và **giữa** bục hồng.
- Cột trên **lệch phải** so với tâm bục hồng khoảng **0,11 H**. Ổ kem nằm **giữa** cột trên (nên cả ổ lệch phải so với đế).
- Quả cầu: tâm cách tâm cột trên về bên trái ~0,21 H, ngang khoảng giữa cột trên; dây buộc vào **một móc nhỏ** dưới mép trái ổ.
- Tổng: cao H, rộng nhất là bục hồng 0,56 H.

**Chất vẽ:** đúng như mẫu: bút chì màu pastel, lông xù có vân rõ, viền nâu ấm **gợn răng cưa nhỏ theo lông**, đậm nhạt như bút chì; thừng sisal có vạch ngang nâu nhạt. Không bóng đổ sàn, không glow, không chữ.

## 4 mảnh (lắp từ dưới lên)

Mỗi mảnh là một vật **hoàn chỉnh khi đứng riêng** (nằm trong túi đồ và lúc kéo), nhưng xếp chồng thì ra đúng hình mẫu:

1. **`l3_tree_p1` – bục xanh + cột:** đế xanh + cột dưới. **Đầu trên cột** vẽ hoàn chỉnh: mặt cắt tròn của cuộn thừng có viền nâu (không xén phẳng, không răng cưa). Chiều cao cột ≈ đoạn lộ 0,23 H + 0,03 H chui vào dưới bục hồng.
2. **`l3_tree_p2` – bục hồng + cột:** bục hồng + cột trên (lệch phải như mẫu). Đầu trên cột vẽ hoàn chỉnh như p1, cao ≈ 0,21 H + 0,03 H chui vào dưới ổ. Mặt dưới bục hồng không có lỗ hở.
3. **`l3_tree_p3` – bục trắng:** ổ lông kem, có **móc kim loại nhỏ màu nâu** dưới mép trái.
4. **`l3_pompom` – quả cầu lông:** quả cầu + sợi dây ngắn 0,07 H, đầu dây có **vòng nhỏ** để móc.

Kèm thêm một ô **`l3_cat_tree` – cây lắp xong** (cùng tỉ lệ, cùng góc nhìn) để kiểm tra và dùng cho cảnh lộ diện.

Mọi mảnh: **cùng tỉ lệ thật với nhau**, cùng góc nhìn, cùng màu, cùng chất nét. Bề rộng của cùng một phần (ví dụ cột dưới) giữa ô "cây lắp xong" và ô mảnh phải bằng nhau.

## Gợi ý tờ (Art chốt ô bằng `codex-draw --dry`)

- Tờ `l3_cat_tree_v2_sheet`, 1536x1024, nền trong suốt, 5 ô: cây lắp xong (ô cao bên trái), p1, p2, p3, pompom. Mỗi vật cách mép ô ≥ 40px.
- Tỉ lệ vẽ: cây lắp xong cao ~800–850px.

## Prompt phần asset (tiếng Anh, Art ghép sau khối style + góc nhìn)

```
Draw a cat tree that matches the attached reference image art/ref/l3_cat_tree_ref.png EXACTLY in shape, proportions, colors and texture. Do not invent a different design.

Reference cat tree, top to bottom, slight top-down 3/4 front view (top surfaces of bed, pink platform and base are visible):
- Top: a cream-white plush donut cat bed, wide oval (width 0.54 of total tree height H, height 0.24 H), thick puffy fuzzy rim, visible hollow inside.
- Upper post: slim beige sisal rope post (width 0.15 H), even horizontal rope rings. It sits 0.11 H to the RIGHT of the pink platform's center; the bed is centered on this post.
- Pink platform: a wide, flat round disc seen as an oval (width 0.56 H, total height 0.21 H, side thickness 0.08 H), soft curly pastel-pink plush.
- Lower post: slim beige sisal rope post (width 0.16 H, visible height 0.23 H), centered under the pink platform and centered on the base.
- Base: low, flat mint-green plush block with soft rounded corners (width 0.52 H, height 0.27 H), narrow top face and front face visible.
- Coral-red fuzzy pom-pom ball (diameter 0.12 H) hanging on a thin short string (0.07 H) from a tiny brown metal hook under the LEFT edge of the bed, at the height of the middle of the upper post.
Colored-pencil pastel style, fuzzy plush texture, warm brown pencil outline with small fuzzy scallops following the fur, varied pressure like real pencil, not a uniform vector line. No floor shadow, no glow, no text.

Sheet of 5 cells on a transparent background, all at the same real scale, same view, same colors:
1) the fully assembled cat tree (as in the reference);
2) piece 1: mint base + lower post. The top end of the post is a finished round rope end with a brown outline (not a flat cut);
3) piece 2: pink platform + upper post (post offset to the right as in the reference), top end of the post finished the same way, no hole under the platform;
4) piece 3: the cream donut bed alone, with the tiny brown hook under its left edge;
5) piece 4: the pom-pom with its short string ending in a small loop.
Stacking pieces 1, 2, 3 and hanging piece 4 must recreate the assembled tree exactly: same widths, same offsets.
Each object sits fully inside its cell, at least 40px from the cell edges, not touching other cells. No cell borders, no numbers.
```
