> **CẬP NHẬT (chủ dự án): KHÔNG vẽ lại sofa.** Dùng luôn **sofa của level 1**: tách sofa từ ảnh nền level 1 (ghép cả đệm phải `l1_sofa_cushion_flat` vào đúng chỗ), mép alpha sạch, viền nâu giữ nguyên như ở level 1, co về cỡ/vị trí sofa level 3 hiện tại, xuất thành `l3_sofa_front`. Phần mô tả bên dưới chỉ để đối chiếu style, không giao Codex vẽ.

# Level 3 – Sofa: mô tả lại và lời giao vẽ lại (GD, theo yêu cầu chủ dự án)

Chủ dự án chê `l3_sofa_front` hiện tại: viền bị vá "chuối quá" (góc lưng trái có mảng viền lồi lõm, viền mờ, quầng sáng quanh mép). Yêu cầu **Codex vẽ lại sofa** thành một sprite trọn vẹn, đúng style. **Không vá, không cắt từ nền.**

- **Ảnh mẫu:** sofa trong `art/out/demo/l3_demo_start.png` (demo đã duyệt) và sofa phòng khách level 1 (`art/out/demo/l1_demo_start.png`) để giữ cùng style.
- Kèm như mọi lượt: `art/ref/owner_l1_style_ref.png`; dán khối style (style.md mục 1) và góc nhìn (mục 2b). Codex nhắc lại quy tắc và tự kiểm.

## Mô tả sofa

- **Loại:** sofa **2 chỗ**, kiểu bầu bĩnh dễ thương, nhìn chính diện hơi từ trên xuống (theo "Góc nhìn chung"): thấy mặt trên đệm ngồi và đỉnh tay vịn.
- **Màu:** xanh bạc hà pastel nhạt như demo (không đậm hơn demo), bóng chì đậm hơn một tông ở chỗ khuất (dưới đệm ngồi, khe giữa hai đệm, mặt trong tay vịn).
- **Chất liệu:** vải nhung mềm, vân chì xoăn nhỏ đều khắp bề mặt như lông ngắn.
- **Lưng tựa:** **hai gối lưng rời**, phồng, đỉnh bo tròn, có một khe lõm nhẹ ở giữa hai gối. Lưng cao hơn tay vịn rõ.
- **Tay vịn:** hai tay vịn **cuộn tròn**, phồng, mặt trước tay vịn bo tròn như cái gối ôm, thấp hơn lưng khoảng 1/3 chiều cao lưng.
- **Đệm ngồi:** **hai đệm** dày, mép trước bo tròn, đường nối giữa hai đệm rõ.
- **Chân đế:** dải đế bọc vải ngay dưới đệm ngồi, rồi **4 chân gỗ ngắn thuôn** màu gỗ sáng (thấy rõ 2 chân trước ở hai đầu).
- **Tỉ lệ:** rộng : cao ≈ 2,05 : 1 (như sprite hiện tại 670 x 328). Lưng chiếm ~45% chiều cao, đệm ngồi ~25%, đế + chân ~15%.
- **Không có gối** trên sofa (gối mèo trắng là sprite riêng `l1_pillow_white_*`). Không bóng sàn, không glow, không chữ.

## Viền (lỗi chính cần tránh)

- Một **đường viền nâu ấm liền, khép kín** quanh toàn bộ hình sofa, không đứt, không mảng lồi lõm, không vệt sáng/quầng quanh mép.
- Dày nhất ở chỗ khuất và chỗ chồng (dưới đệm, khe gối, chỗ tay vịn gặp lưng); phần lớn viền ~60% độ dày đó, đầu nét nhọn dần; nét bên trong (đường nối đệm, khe gối) mảnh hơn. Đậm nhạt như bút chì thật, giống viền sofa trong demo.
- Mép ngoài sắc gọn trên nền trong suốt (alpha sạch).

## Cách dùng trong game

- Sprite `l3_sofa_front` (nền trong suốt) nằm **trên rèm**, che kín sofa trong ảnh nền: Art kiểm sprite mới phủ kín hình sofa cũ trên nền (cùng vị trí, cỡ bằng hoặc hơi lớn hơn). Nếu còn lộ viền sofa cũ, sửa nền bằng một lượt Codex "chỉnh sửa từ ảnh nền" chứ không vá tay.
- Tờ gợi ý: một ảnh lẻ 1536x1024, nền trong suốt, sofa nằm giữa, cách mép ≥ 40px.

## Prompt phần asset (tiếng Anh, Art ghép sau khối style + góc nhìn)

```
Draw a single cute two-seat sofa on a transparent background, matching the sofa in the attached demo image (art/out/demo/l3_demo_start.png) and the living-room style of level 1.
Front view, slightly from above (top of the seat cushions and the tops of the arms are visible).
Soft pastel mint green velvet, as light as in the demo, fine curly colored-pencil texture like short plush; slightly darker mint pencil shading in hidden areas (under the seat cushions, the gap between cushions, inner sides of the arms).
Backrest: two separate puffy back cushions with rounded tops and a gentle dip between them, clearly taller than the arms.
Arms: two rounded rolled arms, puffy like bolster pillows, about one third lower than the backrest.
Seat: two thick seat cushions with rounded front edges and a clear seam between them.
Base: a fabric-covered base strip under the seat, then four short tapered light-wood legs (two front legs clearly visible at both ends).
Width to height about 2.05 : 1.
One continuous, closed, warm brown colored-pencil outline around the whole silhouette: no gaps, no bumps, no light halo around the edges. Thickest in hidden and overlapping spots, about 60% of that elsewhere, tapered stroke ends, thinner inner lines for cushion seams; varied pressure like real pencil, not a uniform vector line.
No pillow on the sofa, no floor shadow, no glow, no text.
```
