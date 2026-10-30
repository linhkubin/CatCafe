# Level 6 – Bố trí bản khối và yêu cầu art từ Dev (QUY-TRINH bước 3, G6-8)

Dev viết, gửi Art 2D chốt key, tờ vẽ, cỡ. Số liệu đo trong game ở bản khối đã duyệt (D6-1 … D6-7). Toạ độ là toạ độ game (vùng chơi 1024x1536; khung 9:16 = 1024x1820, dư trên dưới 142; khung 3:4 dư mỗi bên 171). Ảnh demo 1080x1920 thì nhân toạ độ với 1080/1024 = 1,055 và cộng 142 vào y trước khi nhân.

- Ảnh khối sạch (không chữ): `layout/l6_khoi_mo_man_9x16.jpg` (mở màn), `layout/l6_khoi_xep_xong_9x16.jpg` (xếp xong đường), `layout/l6_khoi_mun_tren_ban_9x16.jpg` (Mun ăn trên bàn). Bản có chữ: `g15_mo_man.jpg`, `g16_mun_an_tren_ban.jpg`, `g25_mo_man_cac_nhip_g67.jpg`.
- Số liệu thô: `layout/l6_block_export.json`. Chạy `?level=6&nolabel=1` để xem khối không chữ.
- **Neo:** mọi món neo **giữa đáy** (chỗ chạm đất / chạm mặt đỡ), trừ khi ghi khác. Cột "Vị trí" là toạ độ điểm neo.
- **Cỡ:** cột "Cỡ khối" là phần vẽ của khối hiện tại = cỡ hiển thị Dev đề xuất. Art vẽ món thật ra ảnh ≈ 1,5 lần cỡ hiển thị (G5-34), Dev co theo bề rộng phần vẽ.

## 1. Nền

| Key | Ghi chú |
|---|---|
| `l5_bg_backyard` | Dùng lại (G6-8), bản rộng 3:4 của G-SCREEN. Cột dây phơi trái trong nền (x ≈ 490, đỉnh y ≈ 400) là **cột Mun bám leo** lúc mở màn: giữ đúng chỗ. Đỉnh hàng rào y ≈ 360–375, chân rào y ≈ 872. |

Nền không vẽ thêm gì của L6. Mọi đồ L6 là sprite riêng.

## 2. Đồ vật (sprite riêng)

| Key | Vị trí (neo đáy) | Cỡ khối (rộng × cao) | Lớp | Vùng chạm | Trạng thái / ghi chú |
|---|---|---|---|---|---|
| `l6_tree` | (100, 880) | 240 × 520 | 2 | phần vẽ | Cây sát rào trái, tán che rào. Chạm: lắc nhẹ. |
| `l6_bird_nest` | (175, 600) | 90 × 46 | 2,5 | phần vẽ (tối thiểu 115) | Ổ chim trên cành (vật con của cây, ảnh riêng để lắc riêng). 🎁 |
| `l5_wind_chime` | (330, 380) neo đỉnh | rộng 61 | 3 | phần vẽ | Dùng lại ảnh L5. Đung đưa quanh đỉnh. |
| `l6_glove_black_idle` | (440, 415) | 80 × 100 | 4 | phần vẽ | Găng vắt đỉnh rào (y ≈ 365): nửa trên nhô lên, nửa dưới thòng mặt trước, dáng như mèo đen ngồi. 🎭 |
| `l6_glove_black_fallen` | (440, 900) | 100 × 44 | 4 | phần vẽ | Găng nằm dưới đất chân rào. Lu ngậm lắc, lật tại chỗ (code xoay ảnh). |
| `l6_shed` | (790, 1010) | 460 × 414 | 5 | phần vẽ | Nhà kho gỗ, mái tôn. **Mặt mái y ≈ 601–605** (Mun nằm ở đây), **mép mái trái x ≈ 560–600, y ≈ 607**. Không vẽ ống khói vào ảnh kho. |
| `l6_shed_chimney` | (905, 645) | 80 × 160 | 7 | không | Ống khói **ảnh riêng, lớp trên Mun**: Mun lùi ra sau ống khói khi bị chạm. |
| `l6_dog_house` | (920, 1150) | 190 × 170 | 8 | phần vẽ | Chuồng Lu, **cửa tròn tối ở giữa dưới** (tâm ≈ x 920, y 1100): đầu Lu thò ra ở đây. |
| `l6_table` | (130, 1068) | 230 × 120 | 9 | phần vẽ | Bàn picnic. **Mặt bàn y ≈ 948** (giỏ, xúc xích, Mun ăn đứng trên mặt này). Ngay trái ghế ở C. |
| `l6_picnic_basket_closed` | (72, 948) | 110 × 80 | 9,5 | phần vẽ | Giỏ ở mép trái mặt bàn. |
| `l6_picnic_basket_open` | (72, 948) | 110 × 96 | 9,5 | phần vẽ | Cùng giỏ, nắp bật. Cùng nhóm, cùng đáy. |
| `l6_bone` | trong bụi rau | 80 × 36 | 10,2 | – | Khúc xương: bay từ bụi rau vào túi; icon túi. |
| `l6_sausage` | (190, 948) trên bàn | 80 × 32 | 9,6 | – | Xúc xích: bay từ giỏ vào túi; icon túi; đặt lên bàn bên phải giỏ. |
| `l6_veggie_bed` | (770, 1290) | 200 × 100 | 10 | phần vẽ | Bụi rau. 🔑 xương. |
| `l6_watering_can` | (940, 1290) | 80 × 76 | 10,5 | phần vẽ | Bình tưới. Nghiêng −35° quanh đáy, nước code vẽ. 🎁 |
| `l6_barrel` | chỗ đầu (430, 1290); **A (530, 1010)** | 110 × 240 | 11 | phần vẽ | Phuy nước đứng. Mặt trên (miệng) **y = đáy − 238**. |
| `l6_toolbox` | chỗ đầu (300, 1290); **A trên phuy (530, 770)** | 120 × 50 | 11,6 | phần vẽ | Hộp dụng cụ, đậy khít miệng phuy (rộng ≈ miệng phuy). Mặt trên là bậc A (y 720). |
| `l6_crate` | chỗ đầu (275, 880); **B (405, 1035)** | 130 × 198 | 12 | phần vẽ | Thùng gỗ cao. Mặt trên là bậc B (y 839); lúc mở màn Mun nhảy lên mặt trên ở chỗ đầu (y 684). |
| `l6_stool` | chỗ đầu (150, 1200); **C (300, 1065)** | 110 × 111 | 13 | phần vẽ | Ghế đẩu. Mặt trên là bậc C (y 956). |

**Bậc thang (G6-2, G6-3):** mặt mái 603 → hộp dụng cụ 720 → thùng gỗ 839 → ghế 956 → đất 1072, mỗi nấc hụt 116–119. Ảnh thật phải giữ **đúng chiều cao phần vẽ** của phuy (240), hộp (50), thùng (198), ghế (111), nếu khác Dev phải dời bậc.

**Món kéo trong cảnh (phuy, hộp, thùng, ghế):** một ảnh đứng thẳng cho cả chỗ đầu lẫn chỗ đặt, không cần trạng thái khác. Khi kéo, code vẽ viền mờ đúng khung phần vẽ ở chỗ đặt.

## 3. Lu (nhân vật mới, cần `lu_ref` chủ dự án duyệt trước)

Cỡ khối hiện tại nhỏ so với Mun ảnh thật (Mun chạy rộng 320). **Đề xuất Lu to hơn Mun rõ** (chó vàng to): dáng ngồi sủa rộng ≈ 240–260. Art chốt cỡ theo `lu_ref`, Dev dời chỗ ngồi nếu cần. Mọi dáng neo giữa đáy, cùng tỉ lệ (cùng cỡ đầu).

| Key | Dùng ở đâu | Chỗ (neo đáy) | Cỡ khối hiện tại | Ghi chú animation |
|---|---|---|---|---|
| `l6_dog_bark` | ngồi dưới mái sủa; đuổi Mun lúc mở màn; chạy tới vờn găng | (720, 1060) | 160 × 140 | Ngồi, ngẩng đầu sủa, đuôi vẫy. Code: nảy nhún định kỳ, lật ngang khi quay. |
| `l6_dog_run` (**đề xuất thêm**) | đuổi Mun vòng sân mở màn, chạy tới găng | theo đường chạy | ≈ cỡ bark | Hiện dùng tạm `l6_dog_bark` trượt đi; có dáng chạy thì đẹp hơn. Art/GD chốt có vẽ không. |
| `l6_dog_run_bone` | ngậm xương chạy về chuồng (0,6 giây) | từ chỗ ngồi tới cửa chuồng | 170 × 120 | Ngậm xương ngang miệng. |
| `l6_dog_chew` | **chỉ đầu Lu thò ra cửa chuồng** gặm xương | (920, 1150) | 120 × 84 | Đầu + hai chân trước + khúc xương, vẽ để đặt **trước** cửa chuồng (lớp trên chuồng). Code: nảy đầu khi chạm / khi Mun lên bàn (ngẩng đầu). |
| `l6_dog_beg` | chồm tới bàn đòi xúc xích | (330, 1150) | 150 × 170 | Đứng hai chân sau, chân trước chồm, mũi hít. |
| `l6_dog_belly` | lăn ra trước chuồng khoe bụng 1 giây | (800, 1150) | 180 × 90 | Nằm ngửa, bụng hồng, bốn chân co. |
| `l6_dog_play_glove` (**đề xuất thêm**) | ngậm găng lắc lắc | (540, 990) | ≈ cỡ bark | Hiện dùng `l6_dog_bark` lắc + găng lật tại chỗ. Nếu vẽ: Lu cúi đầu ngậm mép găng, găng vẫn là ảnh riêng nằm đất. Art/GD chốt. |

## 4. Mun (dáng mới, cùng tỉ lệ bộ Mun mặt tròn A5-23/A5-25: tròng vàng ≈ 25px trên màn)

Cỡ khối hiện tại (110–130 rộng) là tạm, **nhỏ hơn bộ Mun thật**. Đề xuất cỡ theo mắt bằng các dáng đã có (ngồi `mun_pin_light` rộng 196, chạy `mun_run` 320). Mọi dáng neo giữa đáy (chỗ chân chạm mặt đỡ).

| Key | Dùng ở đâu | Chỗ (neo đáy) | Đề xuất cỡ | Ghi chú animation |
|---|---|---|---|---|
| `mun_run` (có) | chạy vòng sân mở màn; các cú nhảy bàn → thùng → cột → mái | đường chạy | rộng 320 | Đã có. Lật ngang theo hướng chạy. |
| `mun_roof_crouch` | nằm rạp trên mái, tai cụp, run | (700, 603) | rộng ≈ 220 | Nằm bẹp, đuôi quấn. Code: run nhẹ, nhún khi Lu sủa. Chạm: trượt ra sau ống khói (lớp dưới ống khói). |
| `mun_roof_edge` | ló ra mép mái nhìn xuống, run (mỗi bậc mới; khi xúc xích trên bàn mà thiếu bậc thì kêu) | (612, 607) | rộng ≈ 220 | Thân sau còn trên mái, đầu và hai chân trước thò qua mép trái nhìn xuống. Code: lắc nhẹ. |
| `mun_climb` (**đề xuất thêm**) | bám leo cột dây phơi lúc mở màn | (492, 700) | cao ≈ 200 | Hiện dùng `mun_run` xoay −70°. Dáng dọc bám cột thì rõ hơn. Art/GD chốt. |
| `mun_step_down` | bước xuống từng bậc (mái → hộp → thùng → ghế), mỗi bậc nhảy ngắn 0,36 giây | trên mặt từng bậc | rộng ≈ 220 | Rón rén, chân trước với xuống. Ở bậc A ngoái nhìn người chơi (code lật nhẹ / nảy). |
| `mun_jump_up` (**đề xuất thêm**) | nhún người nhảy phốc từ ghế lên bàn | ghế (300, 956) → bàn (210, 948) | ≈ cỡ pounce 185 cao 232 | Hiện dùng `mun_step_down` + nhún. Có thể dùng lại `mun_pounce` (dáng dọc bật cao) nếu hợp. Art/GD chốt. |
| `mun_eat` | cúi ăn xúc xích trên bàn cạnh giỏ (≈ 1,5 giây) | (210, 948) | rộng ≈ 200 | Cúi đầu, đuôi dựng. Lộ diện từ lúc lên bàn (chạm là bế). |
| `mun_sit_look` | ngồi trên bàn, liếm mép, ngẩng nhìn người chơi | (210, 948) | rộng ≈ 196 | Có thể dùng lại `mun_pin_light`/`mun_look_paw` nếu hợp; Art chốt. Code: xù lông một nhịp khi Lu ngẩng đầu. |
| `mun_held`, `mun_face_icon` | cảnh bế, bong bóng | – | – | Dùng lại. |

## 5. Lớp hiển thị (dưới → trên)

`l5_bg_backyard` (0) → cây 2 → ổ chim 2,5 → chuông gió 3 → găng 4 → nhà kho 5 → Mun trên mái 6 → ống khói 7 → chuồng 8 → bàn 9 → giỏ 9,5 → xúc xích trên bàn 9,6 → bụi rau 10 → bình tưới 10,5 → phuy 11 → hộp dụng cụ 11,6 → thùng gỗ 12 → ghế 13 → Lu 14 → Mun lúc xuống / lúc diễn mở màn 15 → nhân vật 50 → giao diện.

Món đang kéo nổi lên trên cùng cảnh; đặt xong về lại lớp của nó.

## 6. Tách phần cho animation

- **Ống khói tách khỏi nhà kho** (Mun lùi ra sau ống khói).
- **Ổ chim tách khỏi cây** (lắc riêng, bung cá).
- **Đầu Lu thò cửa chuồng** là ảnh riêng đặt trước chuồng (không vẽ Lu vào ảnh chuồng); chuồng vẽ cửa trống tối.
- **Nắp giỏ:** hai trạng thái giỏ đóng / mở (cùng đáy), không cần tách nắp.
- **Hộp dụng cụ, phuy** là hai ảnh riêng (hộp đặt chồng lên phuy ở A).
- **Xương, xúc xích** là ảnh riêng nhỏ (bay vào túi, icon túi, xúc xích nằm trên bàn).
- **Găng tay** hai trạng thái (vắt rào / nằm đất), cùng một chiếc găng.
- Nước bình tưới, tia sủa, cá khô: code vẽ, không cần ảnh.

## 7. Vùng chạm

Theo phần vẽ của từng món, tối thiểu 115 × 115. Món xếp đường vùng chạm theo phần vẽ, vùng chạm đi theo món khi đã đặt. Mun trên mái: vùng chạm theo dáng nằm. Lu: theo dáng hiện tại (đang gặm: theo đầu thò ra cửa chuồng, chạm như chạm chuồng). Mun lộ diện: phần vẽ nới 30px mỗi bên.

## 8. Cần Art / GD chốt

1. Cỡ Lu so với Mun (Dev đề xuất Lu ngồi rộng ≈ 240–260) và cỡ các dáng Mun mới theo bộ mặt tròn (Dev đề xuất rộng ≈ 200–220). Có cỡ thật, Dev chỉnh lại chỗ ngồi Lu, chỗ Mun trên mái, mép mái cho khớp.
2. Có vẽ thêm `l6_dog_run`, `l6_dog_play_glove`, `mun_climb`, `mun_jump_up` không, hay dùng tạm dáng sẵn có như bản khối.
3. `mun_sit_look`: vẽ mới hay dùng lại dáng ngồi có sẵn.

## 9. Cập nhật G6-9 / A6-2 (đã đổi trong bản khối, D6-9)

Số ở mục 2–4 bên trên là trước G6-9; bảng này thay cho các dòng tương ứng.

| Key | Vị trí (neo đáy) | Cỡ khối mới | Ghi chú |
|---|---|---|---|
| `l6_dog_bark` | (735, 990) | 300 × 262 | Lu ngồi trước kho, bên phải chỗ A, đáy lùi về 990 cho khỏi chạm chuồng. |
| `l6_dog_run` (mới) | đường chạy | 375 × 264 | Đuổi Mun vòng sân; chạy tới găng và chạy về. |
| `l6_dog_run_bone` | | 320 × 225 | |
| `l6_dog_chew` | (854, 1290) | 225 × 158 | Đầu Lu thò cửa chuồng, dưới khung cửa. |
| `l6_dog_beg` | (330, 1150) | 281 × 319 | |
| `l6_dog_belly` | (600, 1290) | 338 × 169 | |
| `l6_dog_house` | (854, 1290) | 340 × 300 | Cửa tối tâm ≈ (854, 1188), rộng ≈ 220. Mép phải đúng 1024 (khung giữa). |
| `l6_dog_house_front` (mới) | (854, 1290) | 340 × 300 | Chỉ khung vòm cửa, cùng khung và đáy với chuồng, lớp 14,2 (trên đầu Lu 14). |
| Lu vờn găng | (540, 990) | – | Không vẽ `l6_dog_play_glove`: chạy tới bằng `l6_dog_run`, vờn bằng `l6_dog_bark` lắc đầu, găng lật tại chỗ (tween). |
| `mun_roof_crouch` / `mun_roof_crouch_ears_up` (mới) | (700, 603) | 210 × 130 | Cùng nhóm, cùng khung, cùng đáy; tai dựng khi Lu đã gặm. |
| `mun_roof_edge` | (612, 607) | 210 × 160 | |
| `mun_climb` (mới) | cột (492, 700) | 140 × 210 | Dáng dọc bám cột dây phơi. |
| `mun_step_down` | các bậc | 210 × 190 | |
| `mun_jump_up` | ghế → bàn | 200 × 230 | Nhún rồi nhảy phốc lên bàn. |
| `mun_eat` | (210, 948) | 210 × 170 | |
| `mun_sit_look` (vẽ mới) | (210, 948) | 200 × 236 | |
| Hàng trước sân | đáy 1290 | – | Hộp dụng cụ 295, phuy 425, bụi rau 582; bình tưới dời lên (630, 1120) trước chân kho. |

Ảnh: `g34_mo_man_lu_to.jpg`, `g35_lu_gam_trong_chuong_to.jpg`, `g36_mun_tren_ban_to.jpg`, gộp `g32_g69_tong_hop.jpg`.

## 10. Cập nhật G6-12 (thay cỡ G6-9; đã đổi trong bản khối, D6-12)

Số ở mục 9 về Lu, chuồng và mục 2 về kho, phuy, thùng gỗ, ghế được thay bằng bảng này.

| Key | Vị trí (neo đáy) | Cỡ khối | Ghi chú |
|---|---|---|---|
| `l6_shed` | (820, 1010) | 530 × 475 | Cao ≥ 2 lần Lu ngồi. **Mặt mái y ≈ 541**, mép mái trái x ≈ 555 (y ≈ 620). Mép phải lấn ra phần dư bên phải (khung 9:16 cắt ở 1024). |
| `l6_shed_chimney` | (960, 590) | 92 × 184 | |
| `mun_roof_crouch` (+ `_ears_up`) | (690, 543) | 210 × 130 | Mun lùi ra sau ống khói ở (960, 543). |
| `mun_roof_edge` | (598, 548) | 210 × 160 | |
| `mun_climb` | cột (492, 610) | 140 × 210 | Chuỗi mở màn: mặt bàn 948 → mặt thùng gỗ (chỗ đầu) 652 → cột 610 → mép mái 548. |
| `l6_barrel` | chỗ đầu (606, 1295); **A (530, 1010)** | 110 × 285 | Miệng phuy y 725. |
| `l6_toolbox` | chỗ đầu (289, 1290); **A trên phuy (530, 725)** | 120 × 50 | Mặt trên = bậc A, y 675. |
| `l6_crate` | chỗ đầu (275, 880); **B (405, 1035)** | 130 × 228 | Mặt trên = bậc B, y 807. |
| `l6_stool` | chỗ đầu (150, 1200); **C (300, 1065)** | 110 × 125 | Mặt trên = bậc C, y 940 (≈ mặt bàn 948). |
| `l6_dog_bark` | (710, 990) | 240 × 210 | Lu ≈ 1,15 lần Mun. |
| `l6_dog_run` | | 300 × 211 | |
| `l6_dog_run_bone` | | 256 × 180 | |
| `l6_dog_chew` | (880, 1290) | 180 × 126 | Trong cửa chuồng. |
| `l6_dog_beg` | (330, 1150) | 225 × 255 | |
| `l6_dog_belly` | (640, 1290) | 270 × 135 | |
| `l6_dog_house` (+ `_front`) | (880, 1290) | 280 × 250 | Cửa tối tâm ≈ (880, 1205), rộng ≈ 180. |
| Hàng trước sân | đáy 1290 | – | Hộp dụng cụ 289, bụi rau 450, phuy 606, bình tưới 700, chuồng 880. |

**Bậc thang (G6-2, G6-12):** mặt mái 543 → hộp dụng cụ 675 → thùng gỗ 809 → ghế 942 → đất 1072, hụt 132 · 134 · 133 · 130 (đo trong game), dưới chiều cao Mun ngồi (≈ 207). Giữ đúng chiều cao phần vẽ: phuy 285, hộp 50, thùng 228, ghế 125.

Ảnh khối sạch: `layout/l6_khoi_mo_man_9x16_g612.jpg`, `layout/l6_khoi_xep_xong_9x16_g612.jpg`, `layout/l6_khoi_mun_tren_ban_9x16_g612.jpg`. Bản có chữ: `g38_g612_mo_man.jpg`, `g39_g612_xep_xong_duong.jpg`, `g40_g612_mun_tren_ban.jpg`, khung 3:4 `g41_g612_mo_man_3x4.jpg`, `g42_g612_xep_xong_3x4.jpg`.

## 11. Cập nhật G6-13 (thay số Lu, chuồng, chỗ đầu ở mục 10; D6-13)

| Key | Vị trí (neo đáy) | Cỡ khối | Ghi chú |
|---|---|---|---|
| `l6_dog_bark` | (700, 1060) | 215 × 188 | Chân trên mặt sân trước kho (chân kho 1010), bên phải chỗ A. |
| `l6_dog_run` | đường chạy | 269 × 189 | |
| `l6_dog_run_bone` | | 229 × 161 | |
| `l6_dog_chew` | (880, 1290) | 161 × 113 | Trong cửa chuồng. |
| `l6_dog_beg` | (330, 1150) | 202 × 228 | Chân trên mặt sân cạnh bàn. |
| `l6_dog_belly` | (640, 1290) | 242 × 121 | |
| Lu vờn găng | (520, 960) | – | Chân trên mặt sân, cạnh găng (440, 900). |
| `l6_dog_house` (+ `_front`) | (880, 1290) | 250 × 220 | Cửa tối tâm ≈ (880, 1215), rộng ≈ 160. |
| Hàng trước sân | đáy 1290 | – | Hộp dụng cụ 150, bụi rau 365, phuy 530 (đáy 1295, ngay dưới chỗ A), bình tưới 650, chuồng 880. Ghế đẩu (150, 1200). |

**Lớp trước sau (G6-13):** đồ đứng trên mặt sân và con vật đi trên mặt sân xếp lớp theo y chân (chân thấp hơn vẽ trước). Đồ nằm trên đồ khác theo đồ đỡ: giỏ, xúc xích, Mun ăn trên bàn; hộp dụng cụ trên phuy; Mun nằm mái trên kho, dưới ống khói; đầu Lu gặm trên chuồng, dưới khung cửa. Demo vẽ theo đúng quy tắc này.

Ảnh: `g49_g613_tong_hop.jpg` (mở màn, vờn găng, chồm đòi, gặm trong chuồng, xếp xong, Mun trên bàn), cảnh đuổi `g43_g613_canh_duoi_cac_nhip.jpg`.

## 12. Cập nhật G6-16 (Lu và chuồng to hơn; thay số ở mục 11; D6-16)

Lu ×1,07 so với G6-13 (ngồi rộng 230 ≈ 1,1 lần Mun). Chuồng 265 × 235. Nhà kho giữ 530 × 475. Vị trí giữ như mục 11, trừ dáng khoe bụng.

| Key | Vị trí (neo đáy) | Cỡ khối | Ghi chú |
|---|---|---|---|
| `l6_dog_bark` | (700, 1060) | 230 × 201 | |
| `l6_dog_run` | đường chạy | 288 × 202 | |
| `l6_dog_run_bone` | | 245 × 172 | |
| `l6_dog_chew` | (880, 1290) | 172 × 121 | Trong cửa chuồng. |
| `l6_dog_beg` | (330, 1150) | 216 × 244 | |
| `l6_dog_belly` | **(860, 1395)** | 259 × 129 | Đổi chỗ: nằm ngay trước cửa chuồng (chỗ cũ 640 chồng bình tưới). |
| `l6_dog_house` (+ `_front`) | (880, 1290) | 265 × 235 | Cửa tối tâm ≈ (880, 1205), rộng ≈ 170. Khung vòm theo. |

**Hướng (G6-15):** mọi dáng Lu và Mun vẽ **nhìn sang phải**; game tự lật khi đi sang trái.

**Đo lại khung (khung 9:16):** không đồ trên mặt sân nào chồng nhau. Riêng Lu ngồi sủa (700, 1060) đứng trước chân nhà kho, giống G6-13. Đây là nền sau, không phải chồng đồ: chân Lu 1060 thấp hơn chân kho 1010. Dáng khoe bụng lấn mép dưới chuồng 11px, nằm trước cửa chuồng.

Ảnh: `g6_16_strip.jpg` (mở màn: chạy vòng, Lu phanh chân bàn, quay theo Mun, chạy tới chỗ sủa, ngồi sủa; gặm trong chuồng; khoe bụng trước chuồng).

## 13. Cập nhật G6-17 (đồ trong sân to theo thú; dàn lại bố cục; D6-17). Thay vị trí và cỡ đồ ở mục 10–12.

Mốc Hm = Mun ngồi ≈ 190. Giữ Mun ≈ 210 rộng, Lu 230 × 201, chuồng 265 × 235.

| Key | Vị trí (neo đáy) | Cỡ khối | Tỉ lệ / ghi chú |
|---|---|---|---|
| `l6_shed` | (970, 1010) | 560 × 541 | Cao > 2 lần Lu. Mặt mái y 475, mép mái trái x ≈ 730. Phần bên phải lấn phần dư. |
| `l6_shed_chimney` | (960, 525) | 92 × 184 | Trong khung 1024. |
| `mun_roof_crouch` | (820, 477) | 210 × 130 | Mép mái chỗ Mun bò ra: (735, 480). |
| `l6_table` | (160, 1165) | 320 × 285 | 1,5 Hm. Mặt bàn y 880, góc trái hàng sau. |
| `l6_picnic_basket_closed` | (69, 880) | 140 × 115 | 0,6 Hm, mép trái mặt bàn. Xúc xích, Mun ăn ở (245, 880). |
| `l6_crate` (chỗ đầu) | (233, 870) | 190 × 255 | 1,35 Hm. Sát rào sau bàn, cao hơn bàn (mở màn: bàn → thùng → cột → mái). |
| `l6_stool` (chỗ đầu) | (394, 880) | 132 × 230 | 1,2 Hm. Sát rào cạnh cột. |
| `l6_barrel` (chỗ đầu) | (950, 1015) | 170 × 350 | 1,85 Hm. Đứng sát tường kho, bên phải. |
| `l6_toolbox` (chỗ đầu) | (95, 1290) | 170 × 95 | 0,5 Hm. Hàng trước, góc trái. |
| `l6_veggie_bed` | (355, 1294) | 330 × 170 | Rộng ≈ 1,6 Mun (thiếu chỗ cho 2 lần), cao 0,9 Hm. Hàng trước. |
| `l6_watering_can` | (958, 1060) | 110 × 120 | 0,65 Hm. Đặt trên mái chuồng, bên phải. |
| `l6_dog_bark` (chỗ ngồi sủa) | (638, 1290) | 230 × 201 | Hàng trước, giữa bụi rau và chuồng, ngẩng nhìn mép mái. |
| `l6_dog_house` (+ `_front`), `l6_dog_chew` | (888, 1295) | 265 × 235 | Góc phải hàng trước. Lu khoe bụng (888, 1395). |
| `l6_glove_black_idle` → `_fallen` | (560, 430) → (560, 1080) | 110 × 140 → 140 × 60 | Cỡ mèo nhỏ ngồi. Rơi thẳng xuống khe giữa hai hàng. Lu vờn ở (690, 1090). |
| Lu phanh / chồm đòi | (470, 1200) / (455, 1120) | – | Bên phải bàn. |
| `l6_bone` / `l6_sausage` | – | 110 × 48 / 110 × 44 | |

**Chỗ xếp đường (đặt sát nhau thành bậc thang, mỗi nấc hụt 140 < Hm):**
- Mặt mái 475.
- A: phuy (742, 1060), hộp dụng cụ đậy phuy (742, 710); mặt hộp 615.
- B: thùng gỗ (557, 1010); mặt thùng 755.
- C: ghế đẩu (392, 1125); mặt ghế 895.
- Bàn: mặt bàn 880 (Mun nhảy sang ăn).
- Đường Mun xuống: (735, 480) → (742, 615) → (557, 755) → (392, 895) → bàn.

**Vòng chạy mở màn:**
- Dải đất trước (y ≈ 1390), vòng lên bên phải trước kho, chạy ngược qua khe giữa hai hàng (y ≈ 1070), tới chân bàn (400, 1160).
- Rồi nhảy lên bàn → nóc thùng gỗ → cột (492, 585) → mép mái.

**Chồng nhau còn lại (đo khung, 9:16):**
- Bụi rau che chân bàn 38px. Đồ hàng trước đứng trước, lớp theo y chân.
- Bình tưới trên mái chuồng che chân phuy 75px khi phuy còn ở chỗ đầu. Hết chồng sau khi kéo phuy đi.
- Phuy, hộp dụng cụ, bình tưới đứng trước tường kho. Kho là nền sau, như Lu ở G6-13.
- Ngoài ra không món nào chồng nhau. Với các cỡ G6-17, khung 1024 không đủ chỗ để mọi món tách rời hoàn toàn.

**Hướng (G6-15):** mọi dáng Lu và Mun vẽ nhìn sang phải.

Ảnh: `g6_17_strip.jpg`.
- Hàng trên: chạy vòng, Lu phanh khi Mun lên bàn, Mun lên thùng gỗ, Mun bám cột, nhân vật gọi.
- Hàng dưới: mở màn xong, xếp xong đường, Mun xuống bậc, Mun ăn trên bàn.
- Ảnh lẻ `g6_17_*.jpg` (thêm vờn găng, chồm đòi, khoe bụng).

## 14. Cập nhật G6-18 (bỏ bố cục mục 13; bố cục mục 11–12, cỡ đồ mục 13; D6-18)

Vị trí, thứ tự trái phải, hàng trước hàng sau giữ như G6-16 (mục 11–12). Cỡ đồ theo mục 13, to lên tại chỗ, neo giữa đáy. Kho 560 × 541 (cỡ G6-17), neo (820, 1010), mặt mái 475.

**Các chỗ nhích (so với G6-16):**

| Món | G6-16 | G6-18 | Nhích | Lý do |
|---|---|---|---|---|
| Ống khói | (960, 590) | (960, 524) | y −66 | Theo mặt mái (kho cao lên) |
| Mun nằm mái | (690, 543) | (690, 477) | y −66 | Theo mặt mái |
| Mép mái Mun bò ra | (598, 548) | (598, 480) | y −68 | Theo mặt mái |
| Chỗ A: phuy / hộp dụng cụ | (530, 1010) / (530, 725) | (530, 1040) / (530, 690) | y +30 | Bậc hụt đều 120 |
| Chỗ B: thùng gỗ | (405, 1035) | (405, 970) | y −65 | Bậc hụt đều 120 |
| Chỗ C: ghế đẩu | (300, 1065) | (300, 1065) | 0 | |
| Bàn | (130, 1068) | (160, 1040) | x +30, y −28 | Bàn rộng 320 lọt mép trái; mặt bàn 755 cao hơn mặt ghế 835 một nhịp nhảy; ghế đứng trước bàn |
| Giỏ / xúc xích, Mun ăn | (72, 948) / (190, 948) | (72, 755) / (220, 755) | theo mặt bàn | |
| Lu ngồi sủa | (700, 1060) | (755, 1060) | x +55 | Phuy rộng 170 ở chỗ đầu che Lu |
| Hộp dụng cụ (chỗ đầu) | (150, 1290) | (130, 1290) | x −20 | Hàng trước chật |
| Bụi rau | (365, 1290) | (365, 1262) | y −28 | Lùi sau, phuy che nhẹ mép phải |
| Phuy (chỗ đầu) | (530, 1295) | (555, 1295) | x +25 | Hàng trước chật |
| Bình tưới | (650, 1290) | (692, 1290) | x +42 | Hàng trước chật |
| Lu phanh / chồm đòi | (380, 1080) / (330, 1150) | (400, 1090) / (360, 1150) | x +20 / +30 | Theo bàn |
| Điểm cuối vòng chạy | (300, 1035) | (340, 1050) | x +40 | Chân bàn bên phải |

Bậc: mái 475 → A 595 → B 715 → C 835 → nhảy lên mặt bàn 755. Mở màn: bàn (755) → nóc thùng gỗ (625) → cột (492, 610) → mép mái.

**Đồ trước che đồ sau (lớp theo y chân):**
- Hàng trước chật vì 5 món to cộng lại rộng 1045, hơn 1024: phuy che mép phải bụi rau 58px; bình tưới chạm phuy.
- Bàn che chân thùng gỗ chỗ đầu 122px; nóc thùng vẫn lộ cho Mun nhảy.
- Ghế đẩu chỗ đầu đứng trước chân bàn (ghế dưới bàn, như G6-16).
- Khi xếp xong, bậc thấp đứng trước che chân bậc cao:
  - ghế C che góc phải bàn 84px và chân trái thùng B 54px;
  - phuy A che mép phải thùng B 53px.
  - Mặt mỗi bậc vẫn lộ cho Mun đứng.

Ảnh: `g6_18_strip.jpg`.
- Hàng trên: chạy vòng, Lu phanh khi Mun lên bàn, Mun lên thùng gỗ, Mun bám cột, nhân vật gọi.
- Hàng dưới: mở màn xong, xếp xong đường, Mun xuống bậc, Mun ăn trên bàn.
- So với `g6_16_strip.jpg`.

## 15. Cập nhật G6-19 (bàn thấp; D6-19)

| Key | Vị trí (neo đáy) | Cỡ khối | Ghi chú |
|---|---|---|---|
| `l6_table` | (160, 1063) | 320 × 228 | 1,2 Hm. Mặt bàn y 835, ngang mặt ghế ở C. Chân bàn xuống 23 (1040 → 1063). |
| `l6_picnic_basket_closed` | (72, 835) | 140 × 115 | Theo mặt bàn. |
| Xúc xích / Mun ăn | (220, 835) / (240, 835) | – | Theo mặt bàn. |

- Mun từ ghế bước ngang sang bàn, vồng thấp như xuống bậc. Không còn dùng dáng `mun_jump_up`.
- Mở màn: bàn (835) → nóc thùng gỗ (625, cao hơn bàn 210) → cột → mái.
- Bàn che chân thùng gỗ chỗ đầu còn 45px.

Ảnh: `g6_19_strip.jpg`.
- Hàng trên: chạy vòng, Mun lên bàn và Lu phanh, Mun lên thùng gỗ, Mun bám cột.
- Hàng dưới: nhân vật gọi, mở màn xong, xếp xong đường, Mun ăn trên bàn.
