# Thảo luận art Level 1 – Hộp pate thần kỳ

Người tham gia: **Dev** (lo code và animation) và **Art 2D** (lo đặc tả ảnh, đặt tên, chỉ đạo Codex vẽ). **Codex** chỉ vẽ theo lời giao của Art 2D. Claude là Game Design + PM: điều phối và chốt các điểm về gameplay.

Mục tiêu: chốt art level 1 sao cho animation **sinh động nhất và hợp lý nhất** trước khi vẽ hàng loạt:
- tinh chỉnh và mô tả lại từng ảnh trong `art/design-art-level1.md`,
- thống nhất quy tắc đặt tên (file, key, trạng thái, khung hình, lớp tách rời),
- Art 2D vẽ demo level 1 để duyệt trước khi triển khai.

Tài liệu nguồn: `art/style.md`, `art/design-art-level1.md`, `levels/levels-01-10.md` (Level 1), `levels/states-01-10.md` (Level 1), `leveldesign.md` (mục 6: bộ animation dùng chung). Ảnh tham chiếu đã có: `art/out/cats/sua_ref.png`.

Quy trình: Vòng 1 Dev → Vòng 2 Art 2D → Vòng 3 Dev chốt → Vòng 4 Art 2D cập nhật đặc tả và vẽ demo → Vòng 5 Dev đồng bộ và duyệt demo.
Mỗi bên chỉ **thêm mục mới ở cuối file**, không sửa mục của bên kia. Đánh số từng điểm (D1, D2… / A1, A2…) để trả lời theo số.

---

## Vòng 1 – Dev

Toạ độ và kích thước dưới đây tính trên khung màn hình 1024x1536. "Hiển thị" là cỡ đồ vật trong game, không phải cỡ canvas ảnh. Điểm nào đụng tới `levels/` thì Dev tự sửa `levels/states-01-10.md` và `levels/levels-01-10.md` sau khi chốt (vòng 3).

### A. Yêu cầu kỹ thuật chung

**D1. Alpha sạch.** `sua_ref.png` có quầng sáng mờ quanh mèo (khoảng 4% điểm ảnh có alpha lửng), còn thân mèo chỉ đạt alpha 251–253, không điểm nào đạt 255. Trong game, quầng này thành lớp sương trắng phủ lên nền, và `glow_outline` sẽ ôm theo quầng chứ không ôm con mèo. Với mọi sprite: thân đặc alpha 255, viền chuyển tối đa 3px, không glow, không halo, không bóng ngoài (thêm "hard clean alpha edge, no glow, no halo" vào prompt).

**D2. Không vẽ bóng đổ dưới sàn.** Dev vẽ bóng tiếp đất bằng code (elip tím oải hương mờ) dưới hộp, hộp pate, chậu cây, Sữa, nhân vật, để bóng co giãn riêng khi `squash`/`hop`.

**D3. Một camera chung.** Mọi đồ vật dùng đúng góc nhìn của nền: chính diện, hơi nhìn từ trên xuống (khoảng 15°), mặt trên chỉ là một elip dẹt, không xoay ba phần tư. Ánh sáng đến từ cửa sổ (trên trái) nên vệt chì đổ bóng luôn nằm **bên phải** đồ vật.

**D4. Lề an toàn.** Đồ vật căn giữa theo chiều ngang, cách mỗi mép canvas ít nhất 8% (khoảng 80px trên 1024), để AI không cắt mất mép, còn chỗ cho viền sáng và cho trạng thái lớn hơn (nắp bật, đệm dựng). Dev tự cắt phần trong suốt thừa bằng một khung chung cho mọi trạng thái của cùng đồ vật, nên Art không cần tiết kiệm canvas.

**D5. Trạng thái sau sửa từ ảnh trước.** Trạng thái 2 luôn vẽ bằng cách chỉnh sửa ảnh trạng thái 1, giữ nguyên đường đáy hoặc điểm neo, chỉ đổi phần thay đổi. Lệch vài px thì Dev tự căn theo mặt nạ alpha. Lệch tỉ lệ hoặc góc nhìn thì phải vẽ lại.

**D6. Điểm neo** (Art vẽ đúng như mô tả, Dev đặt origin theo đó):

| Nhóm | Điểm neo | Art cần đảm bảo |
|---|---|---|
| Đồ đặt trên sàn hoặc trên ghế (hộp, hộp pate, chậu cây, gối, đệm, Sữa, nhân vật) | Giữa mép đáy | Đáy phẳng, nằm ngang. Mọi trạng thái/tư thế dùng chung một đường đáy và một tâm ngang |
| Đồng hồ treo tường | Móc treo | Móc nhỏ ở giữa mép trên thân đồng hồ |
| Quả lắc | Đầu trên của dây | Đầu dây nằm giữa theo chiều ngang, cách mép trên canvas khoảng 5% |
| Rèm | Mép trên (khoen) | Mép trên tấm rèm là một đường ngang thẳng |
| Thảm | Tâm elip | Hai trạng thái dùng cùng một elip |
| Bướm, `l1_fx_pop`, mặt mèo | Tâm canvas | Đối xứng trái-phải quanh trục giữa canvas |
| `sua_held` | Điểm giữa hai nách | Xem D36 |
| Bong bóng thoại | Đầu nhọn của đuôi | Xem D38 |

**D7. Nền có dải kéo dài.** Điện thoại thường có tỉ lệ khoảng 19.5:9, dài hơn 2:3. Dev giữ đủ 1024 theo chiều ngang và kéo dài nền lên trên và xuống dưới. Vì vậy 8% trên cùng của nền phải là tường trơn, 8% dưới cùng là sàn trơn (không đồ vật, không mép tranh hay mép sofa).

**D8. Vùng giao diện.** Không đặt đồ vật chạm được trong dải trên cùng y 0–130 (bong bóng nhiệm vụ, thanh ♥, nút tạm dừng) và ở góc dưới phải x > 880, y > 1400 (nút 💡).

**D9. Kích thước tương đối và vị trí.** Bố cục lấy theo `levels-01-10.md` (xem D19). Đây là số đề xuất, Dev chỉnh lại khi ghép demo:

| Đồ | Hiển thị (ngang x cao) | Điểm neo đặt tại |
|---|---|---|
| Cửa sổ (trong nền) + rèm | Rèm khoảng 420x460 | Mép trên rèm ở (270, 180) |
| Thân đồng hồ | Khoảng 190x270 | Móc ở (770, 200). Quả lắc khoảng 40x150, treo dưới đáy thân |
| Sofa (trong nền) | Ngang khoảng 920 | Mặt ghế ở y≈870, sàn ở y≈1060 |
| Gối lông trắng | Khoảng 210x170 | (290, 875) |
| Đệm sofa (bulge) | Khoảng 400x120 | (690, 880) |
| Hộp pate (đóng) | Khoảng 95x80 | Ẩn dưới đệm. Sau khi lăn ra: trên sàn ở (760, 1075) |
| Sữa ngồi | Cao khoảng 190 | (620, 1080), bên trái hộp pate |
| Hộp các-tông | Khoảng 230x200 | (330, 1210) |
| Chậu cây | Khoảng 170x290 | (900, 1240) |
| Bướm | Ngang khoảng 70 | Bay quanh chậu cây |
| Thảm | Khoảng 780x230 | Tâm ở (480, 1320) |
| Nhân vật | Cao khoảng 480 | Giữa dưới, chân ở y≈1520 |

**D10. Nét viền sau khi thu nhỏ.** Dev thu mỗi ảnh về đúng cỡ hiển thị (×2 cho màn hình nét), nên nét viền mỏng đi theo cùng tỉ lệ. Chuẩn chung: nét viền khi hiển thị dày khoảng 3px, tức nét trong ảnh gốc ≈ 3px × (bề ngang đồ vật trong ảnh ÷ bề ngang hiển thị ở D9). Theo đó, đồ nhỏ (hộp pate, bướm, chim, quả lắc, hơi thơm) cần nét gốc khoảng 2,5–3% bề ngang đồ vật, còn đồ to (rèm, thảm, đệm) chỉ cần khoảng 0,5–1%.

### B. Tách lớp

**D11. Nguyên tắc.** Chỉ tách một bộ phận khi nó cần **hiện/ẩn riêng** hoặc **chuyển động riêng quanh một điểm neo rõ ràng**, và chỗ nối bị lớp phía trước che (lệch vài px cũng không lộ). Không tách mi mắt, chân hay tai mèo: AI vẽ rời từng ảnh thì chỗ nối sẽ lệch màu và lệch nét.

**D12. Quả lắc đồng hồ: ảnh rời `l1_wall_clock_pendulum`** (dây và quả tròn vàng bơ, thẳng đứng). Thân đồng hồ không vẽ quả lắc, chỉ có một móc nhỏ ở giữa đáy. Code: lúc bình thường quả lắc tự đung đưa nhẹ ±6°, 1 giây mỗi nhịp; khi chạm thì `swing` mạnh ±14° rồi tắt dần.

**D13. Chim cúc cu: ảnh rời `l1_wall_clock_bird`** (chim gỗ xanh da trời, mỏ há). Đồng hồ còn 2 trạng thái: `_closed` (cửa vòm đóng) và `_open` (cửa mở, bên trong là lỗ tối, không có chim). Code khi chạm: swap sang `_open`, chim thò ra từ lỗ (scale 0,4 → 1,1 → 1, nhô ra 20px), gật mỏ 2 lần theo tiếng "cúc cu", thụt vào, rồi đóng cửa.

**D14. Chậu cây: Art vẽ liền một ảnh, Dev cắt ra `l1_plant_leaves` và `l1_plant_pot` tại miệng chậu.** Art cần: miệng chậu là một đường ngang rõ, mọi chiếc lá nằm **trên** miệng chậu (không lá nào rủ xuống che thân chậu). Code: chỉ phần lá `wiggle` quanh gốc thân, chậu đứng yên, bướm bay ra từ giữa đám lá.

**D15. Hơi thơm pate: ảnh rời `l1_pate_can_steam`** (3 làn hơi màu kem uốn lượn, chân làn hơi nằm ở giữa mép dưới). Ảnh `l1_pate_can_open` không vẽ hơi. Nếu hơi vẽ dính vào ảnh hộp thì không tween từng làn được như states file đang ghi; tách ra thì code cho hơi bay lên, lắc nhẹ, mờ dần và lặp suốt lúc Sữa ăn.

**D16. Rèm: chuyển thanh treo vào nền #1, ảnh rèm chỉ còn vải và khoen.** Ở ảnh `_closed`, hai tấm rèm gặp nhau đúng đường giữa canvas, không chồng lên nhau, để Dev cắt đôi. Code: khi vuốt, hai nửa co scaleX về hai mép ngoài trong 0,25 giây (như kéo rèm) rồi swap sang `_open`. Nắng chiếu vào do Dev vẽ bằng code (dải sáng vàng bơ trong mờ).

**D17. Không cần tách vì code làm được.** Bướm vỗ cánh: co giãn scaleX cả con bướm (vì vẽ nhìn từ trên xuống). Nắp hộp pate bật: `l1_fx_pop` che đúng khoảnh khắc swap. Đệm phập phồng: `breathe` cả tấm, neo ở góc phải. Sữa gật đầu khi ăn: xoay cả ảnh quanh điểm mông.

**D18. Khung hình thêm: chỉ `sua_eat_f2`** (ảnh nguyên khung, sửa từ `sua_eat`: đầu nhích lên một chút, má phồng như đang nhai, chóp đuôi đổi hướng). Code đổi qua lại hai khung 0,25 giây mỗi nhịp, kèm gật đầu. Đáng làm vì `sua_eat` dùng lại ở nhiều level. Không cần `sua_sit_stare_blink` ở level 1: Sữa chỉ ngồi khoảng 0,8 giây, và nhìn chằm chằm không chớp mắt mới đúng ý cảnh.

### C. Rà từng ảnh

**D19. Bố cục ở #1 và mục 2 không khớp `levels-01-10.md`.** design-art đặt cửa sổ bên phải, đồng hồ ở giữa, chậu cây trên kệ, không nói gối nằm đâu. levels thì đặt rèm trên trái, đồng hồ trên phải, gối bên trái và đệm bên phải trên sofa, hộp các-tông giữa sàn, chậu cây dưới phải, thảm ở đáy. Đề xuất theo levels (luồng chơi và gợi ý đã tính theo bố cục này), toạ độ như D9; bỏ kệ thấp, chậu cây đặt thẳng xuống sàn.

**D20. #1 nền.** Thêm thanh treo rèm (D16) và **bệ cửa sổ trống** (levels: kéo rèm ra thấy bệ trống). Đệm ngồi bên trái sofa vẽ liền vào nền, nửa phải để phẳng cho #2; màu đệm trái trong nền phải trùng màu #2, nên Art vẽ #2 sau nền và mở nền ra làm tham chiếu màu. Áp dụng thêm D7.

**D21. #2/#3 đệm sofa: chưa rõ lật kiểu gì.** Đề xuất: mép sau (sát lưng sofa) nằm yên, mép trước nhấc lên dựng khoảng 60°, tựa vào lưng sofa, thấy mặt dưới đệm màu nhạt hơn. Đệm ở #2 nằm ở nửa dưới canvas để còn chỗ phía trên cho trạng thái dựng ở #3. Mép phải của đệm phải gọn, không lẫn vào tay vịn, để góc hộp pate ló ra còn nhìn ra được.

**D22. #4/#5 hộp pate.** #4 "nằm hơi nghiêng" còn #5 "đứng thẳng", nên swap sẽ giật. Vẽ #4 **đứng thẳng**, cùng chỗ với #5; động tác lăn và rơi do code làm (xoay 360°, dịch ngang, nảy). Thân hộp nên ấm hơn hồng đào một chút, ngả cam đào (levels ghi "góc hộp pate màu cam ló ra"), để nổi trên đệm bạc hà. Ở #5, chừa khoảng 45% phía trên canvas cho nắp dựng, không vẽ hơi (D15).

**D23. Hộp pate nằm đâu khi Sữa xuất hiện.** levels ghi "lăn ra mép sofa", nhưng `sua_sit_stare` lại nhìn "hộp pate dưới đất" và mục Sự thật về mèo nói Sữa "ngồi sẵn dưới chân". Đề xuất: hộp lăn khỏi mép ghế, rơi xuống sàn trước sofa và nảy một cái (khớp với âm "lăn lóc"); Sữa ngồi trên sàn, **bên trái** hộp, nhìn sang phải và xuống dưới.

**D24. #6/#7 hộp các-tông.** #7 ghi "nhìn từ trên xuống một chút", nhưng phải giữ cùng góc nhìn với #6 (D3): thấy được lòng hộp là nhờ nắp mở, không phải nhờ đổi góc. Ở #6, hộp chỉ chiếm khoảng 55% bề ngang canvas, để 4 nắp bung ra ở #7 vẫn nằm trong canvas.

**D25. #8/#24 gối.** Mô tả ổn. Gối nên to cỡ Sữa cuộn tròn (khoảng 210 hiển thị) thì mới đánh lừa được. Ở #24 gối dựng đứng nên cao hơn: #8 phải chừa chỗ phía trên.

**D26. #9/#10 rèm.** Làm theo D16. Ở #10, mỗi bó rèm nằm sát mép ngoài canvas, khoảng giữa để trống.

**D27. #11 `l1_fx_pop`.** Vụ nổ đối xứng tròn, tâm nằm đúng tâm canvas; không khói, không vệt chuyển động (code lo phần xoay, phóng to, mờ dần).

**D28. #12–#14 Sữa.** Ba tư thế dùng cùng canvas, cùng tỉ lệ (đầu cùng cỡ), cùng đường đáy, cùng hướng: mặt quay **sang phải**, hộp pate ở bên phải. Bỏ hộp pate khỏi #14: Sữa chúi đầu sang phải và xuống dưới, mõm ở góc dưới phải; Dev đặt `l1_pate_can_open` đè lên trước mõm, khỏi phải căn hai cái hộp cho trùng nhau.

**D29. Ảnh tham chiếu so với chữ trong style.md.** `sua_ref` vẽ tai nhọn bo đầu và đuôi dài hơn mô tả ("tai tròn", "đuôi ngắn"). Đề xuất chốt theo ảnh (ảnh đã đẹp), và Art sửa lời mô tả ở style.md mục 3 cho khớp, để các ảnh sau không lúc theo chữ, lúc theo ảnh.

**D30. #15–#17 nhân vật: chưa nói nhân vật đứng đâu trong màn.** Đề xuất: nhân vật chỉ hiện lúc mở màn (bước vào giữa dưới bằng tween lắc lư, không cần khung đi) và lúc phản ứng (trồi lên từ mép dưới 1 giây rồi lặn xuống). Mọi tư thế dùng cùng canvas, cùng cỡ đầu, chân trên cùng một đường đáy (khoảng 95% chiều cao). Khi mở hộp trống, levels ghi "nhún vai" còn states dùng `player_surprised`: theo states, Dev sửa levels.

**D31. #25 nhân vật đội hộp.** Cái hộp trên đầu phải giống #7 (vẽ có mở #7 làm tham chiếu). Trong 1,5 giây đội hộp, Dev ẩn hộp các-tông trong cảnh.

**D32. #18/#19 đồng hồ.** Theo D12–D13, đồng hồ gồm 4 ảnh: `l1_wall_clock_closed`, `l1_wall_clock_open`, `l1_wall_clock_bird`, `l1_wall_clock_pendulum`. Bỏ `l1_wall_clock_cuckoo`.

**D33. #20 chậu cây.** Theo D14. Đổi "chậu cây trên kệ" thành chậu đặt trên sàn (D19).

**D34. #21 bướm.** Đối xứng trái-phải tuyệt đối, thân nằm đúng trục giữa canvas, cánh mở phẳng, nét đậm (D10, D17). Bướm dùng lại ở level 9, nên đổi thành đồ dùng chung (D43).

**D35. #22/#23 thảm.** Elip thảm nằm ở nửa dưới canvas, chừa chỗ phía trên cho góc cuộn. Cuộn góc **trước bên trái** thay vì trước bên phải, để thao tác vuốt không sát nút 💡.

**D36. #26 `sua_held` + #28 `player_hands_lift`.** #28 khổ 1024x1024, tay đưa lên từ mép dưới khung, nên khi tay nâng mèo lên giữa màn hình thì mép dưới ống tay sẽ lơ lửng giữa màn. Đổi #28 sang **1024x1536**, cẳng tay và ống tay áo kéo tới tận mép dưới canvas, đầu ngón tay ở khoảng 30% chiều cao. Vẽ hai ảnh cùng tỉ lệ: nách Sữa ở khoảng 35% chiều cao #26, ngực ở nách rộng khoảng 40% canvas, và khoảng hở giữa hai lòng bàn tay ở #28 bằng đúng bề ngang đó; điểm neo khi đung đưa và kéo dài là điểm giữa hai nách.

**D37. #27/#30 mặt mèo và bóng đầu mèo.** Hai ảnh dùng cùng canvas: đầu rộng 70%, tâm đầu nằm ở tâm canvas, đỉnh tai cách mép trên khoảng 10%. Vẽ #30 bằng cách sửa #27 (tô kín thành bóng) để viền khớp nhau. Dự phòng: Dev tạo bóng từ #27 bằng `setTintFill`.

**D38. #29 bong bóng thoại.** Thân tròn rộng khoảng 80% canvas, tâm thân ở khoảng 42% chiều cao, đuôi nhọn nằm trong 20% dưới cùng; đầu nhọn của đuôi là điểm neo (bong bóng bật ra từ đó). `ui_question_mark` màu hồng, tint không ra được màu trắng: đề xuất vẽ thêm `ui_question_mark_white` (ruột trắng kem, viền nâu). Nếu không có, Dev tô trắng phẳng bằng `setTintFill` (mất vân chì).

### D. Quy tắc đặt tên bổ sung (giữ tương thích style.md mục 4)

**D39. Thứ tự các phần trong tên:** `<tiền tố>_<đồ vật>[_<bộ phận>][_<trạng thái>][_f<số>]`. Ví dụ: `l1_wall_clock_open`, `l1_wall_clock_bird`, `l1_pate_can_steam`, `sua_eat_f2`.

**D40. Đồ có từ 2 trạng thái trở lên thì trạng thái nào cũng có hậu tố**, kể cả trạng thái đầu: `l1_rug_flat`/`l1_rug_curled`, `l1_wall_clock_closed`/`_open`, `l1_pillow_white_idle`/`_flipped`. Đồ chỉ có một ảnh thì giữ tên trơn (`l1_plant`). Nhìn tên là biết ảnh nào là trạng thái nào, không phải đoán ảnh gốc.

**D41. Khung hình animation:** khung 1 giữ key gốc, các khung thêm là `_f2`, `_f3`… Không dùng `_2`, `_3` cho khung hình, vì style.md đã dùng `_2`, `_3` làm trạng thái (`_full`/`_2`/`_3`).

**D42. Lớp tách rời:** tên bộ phận đứng sau tên đồ vật (`_pendulum`, `_bird`, `_steam`, `_leaves`, `_pot`). Ảnh do Dev tự cắt từ ảnh của Art (`l1_plant_leaves`, `l1_plant_pot`, hai nửa rèm) không nằm trong bảng vẽ, chỉ ghi chú "Dev cắt" ở design-art mục 4.

**D43. Đồ dùng lại ở nhiều level nhưng không phải UI:** tiền tố `prop_`, lưu trong `common/` (ví dụ `l1_butterfly` → `prop_butterfly`). Hiệu ứng dùng chung: `fx_`, cũng lưu trong `common/`.

**D44. Ảnh demo:** lưu trong `art/out/demo/`, ảnh dựng cảnh đặt tên `l1_demo_<nội dung>`. Sprite thật vẽ trong lúc làm demo thì dùng ngay key chính thức; duyệt xong mới chuyển sang `level1/` hoặc `cats/`.

### E. Ảnh demo Level 1

**D45. Phần (a): bộ sprite thật tối thiểu,** đúng mọi yêu cầu ở trên: `l1_bg_living_room`, `l1_sofa_cushion_bulge`/`_lifted`, `l1_pate_can_closed`/`_open`/`_steam`, `l1_wall_clock_closed`/`_open`/`_bird`/`_pendulum`, `sua_sit_stare`, `sua_eat` + `sua_eat_f2`. Dev ghép bằng code theo toạ độ D9, chạy thử swap và tween, rồi đưa lại ảnh ghép kèm clip ngắn để duyệt.

**D46. Phần (b): hai ảnh dựng cảnh 1024x1536** (tranh vẽ, không dùng trong game) để chủ dự án duyệt không khí, màu và tỉ lệ. `l1_demo_start`: mọi đồ vật ở trạng thái đầu, nhân vật khum tay gọi ở giữa dưới, bong bóng nhiệm vụ giữa màn hình. `l1_demo_reveal`: đệm đã dựng, hộp pate mở trên sàn có hơi thơm, Sữa ngồi cạnh nhìn chằm chằm, bong bóng ở góc trên trái đã thành mặt Sữa.

**D47. Tiêu chí duyệt demo:** alpha sạch (D1); chồng hai ảnh của một cặp trạng thái ở độ mờ 50% không thấy lệch; đồ ghép lên nền khớp góc nhìn và màu (nhất là đệm với sofa); ở cỡ hiển thị, nét viền của hộp pate và của đệm dày như nhau (D10); không có chữ. Mỗi ảnh kèm một dòng ghi chú trong `art/out/_logs/`.

---

## Chốt gameplay – Game Design / PM (sau vòng 1)

Những điểm dưới đây thuộc gameplay hoặc phạm vi, GD chốt luôn để hai bên khỏi phải bàn. Các điểm kỹ thuật và hình ảnh còn lại (D1–D18, D20–D22, D24–D28, D31–D44, D47) để Art 2D và Dev thống nhất với nhau.

**G1 (D19). Bố cục theo `levels-01-10.md`.** File levels là nguồn gốc của luồng chơi và gợi ý. Rèm trên trái, đồng hồ trên phải, gối bên trái và đệm bên phải trên sofa, hộp các-tông giữa sàn, chậu cây dưới phải đặt thẳng xuống sàn, thảm ở đáy. Bỏ kệ thấp. Toạ độ lấy D9 làm điểm xuất phát.

**G2 (D23). Hộp pate lăn khỏi mép ghế, rơi xuống sàn trước sofa, nảy một cái.** Sữa hiện ra ngồi trên sàn, bên trái hộp, nhìn sang phải và xuống. Khớp với ý "đã ngồi sẵn dưới chân". Dev sửa câu "lăn ra mép sofa" trong levels/states cho khớp.

**G3 (D30). Nhân vật.** Đồng ý cách xuất hiện Dev đề xuất: bước vào giữa dưới lúc mở màn, các lần phản ứng thì trồi lên từ mép dưới khoảng 1 giây rồi lặn xuống. Khi mở hộp trống, GD giữ ý **nhún vai** (dễ hiểu "trống trơn" hơn là ngạc nhiên): thêm tư thế dùng chung `player_shrug` (hai tay ngửa ngang vai, nhún vai, cười méo, mắt nhắm). Tư thế này sẽ dùng lại ở mọi chỗ trốn trống của các level sau. `player_surprised` giữ lại, dùng cho lúc Sữa lộ diện. Dev sửa states theo.

**G4 (D29). Nhân vật Sữa chốt theo ảnh `sua_ref`**: tai nhọn bo đầu, đuôi bông dài vừa. Art 2D sửa lời mô tả ở `style.md` mục 3 cho khớp ảnh. Nếu Art 2D vẽ lại `sua_ref` để có alpha sạch (D1), giữ nguyên dáng nhân vật như ảnh hiện tại.

**G5 (D35). Thảm cuộn góc trước bên trái:** đồng ý, không ảnh hưởng luồng chơi.

**G6. Chạm hộp các-tông lần 2:** giữ như states (hộp tự lật úp, lắc 3 nhịp bằng code), không thêm tư thế nhân vật. Lần 3 `player_box_on_head` vẫn là tùy chọn, làm sau cùng.

**G7 (D45–D46). Phạm vi demo, để tiết kiệm hạn mức Codex:**
- Vẽ trước 2 ảnh dựng cảnh `l1_demo_start` và `l1_demo_reveal` (D46) để chủ dự án duyệt không khí, màu, tỉ lệ.
- Kèm **một lát cắt sprite thật nhỏ** để kiểm cặp trạng thái và alpha: `l1_sofa_cushion_bulge`/`_lifted`, `l1_pate_can_closed`/`_open`, và `sua_ref` vẽ lại nếu cần cho D1. Chưa vẽ đồng hồ, khung `sua_eat_f2` hay phần còn lại cho tới khi demo được duyệt.
- Chưa có code game, nên Dev kiểm demo bằng cách ghép ảnh và chồng cặp trạng thái (D47), chưa cần chạy tween thật.

---

## Vòng 2 – Art 2D

Đã đọc vòng 1 và G1–G7 (không bàn lại các điểm G). Đã dùng 2 lượt Codex để thử (A2, A3). Số đo lấy bằng Pillow.

### A. Thử nghiệm

**A1. `sua_ref` (không tốn lượt).** Đúng như D1: alpha cao nhất 254, không điểm nào đạt 255; thân 250–253; quầng nâu mờ (alpha 1–20, khoảng 2% điểm ảnh) loang ra tới ~12px ngoài thân. Trên nền màu thì gần như không thấy, nhưng sẽ làm lệch `glow_outline` và khung cắt.

**A2. Test 1: `art/out/demo/test_pate_can_sheet.png`** (1 lượt, 1536x1024, ô trái là hộp đóng, ô phải là hộp mở; Codex chép nguyên ảnh, không xử lý thêm).
- Alpha: vẫn tối đa 254 dù prompt ghi rõ "alpha 255, hard clean edge, no halo". Quầng hẹp hơn `sua_ref` (phần lớn trong 4px, vài điểm tới 7px). **Prompt không đủ cho D1.**
- Hai trạng thái trong một ảnh: thân hộp rộng 658 / 658–659px, đáy cùng y=926, tâm ngang chỉ lệch 11px (dịch thuần, căn được). Nhãn, màu, góc nhìn giống hệt.
- Toạ độ và cỡ theo px: **không theo.** Xin rộng 340px, đáy y=820, nhận về rộng 658px, đáy y=926: AI lấp ~85% ô được giao. Nhưng nó **giữ đúng ô** (mép vật cách mép ô 44–60px).
- Nét viền: xin 10–12px, nhận 9–10px. Độ dày nét ghi bằng px **làm theo được** (sai ~20%); ghi bằng % bề ngang thì AI không hiểu.
- Góc nhìn: mặt trên là elip dẹt (cao/rộng ≈ 0,24, tức nhìn xuống ~14°), bóng chì bên phải: đúng D3.
- Lỗi style: nét sạch như vector, nhãn chi tiết kiểu sticker, mặt mèo trên nhãn có đốm cam. Lần vẽ thật phải nhấn "wobbly pencil line", nhãn đơn giản.

**A3. Test 2: `art/out/demo/test_pate_can_open_edit.png`** (1 lượt: sửa từ `test_pate_can_closed_src.png`, là hộp đóng ở test 1 đặt vào khung 1024x1024, đúng cách D5 và AGENTS.md mô tả).
- Ảnh trả về **1254x1254**, không phải 1024: chế độ sửa ảnh không giữ cỡ canvas.
- Đưa về 1024 rồi chồng 50% lên ảnh gốc: thân hộp to hơn ~7% (654 → ~705px), đáy tụt ~27px. Nhãn, màu, nét vẫn giữ. Codex không xác nhận được backend sửa thật hay vẽ lại theo tham chiếu.
- Kết luận: "sửa từ ảnh trước" giữ được **thiết kế** nhưng không giữ **khung**. Lệch cả tỉ lệ chứ không chỉ vài px, phải co giãn và dịch theo phần không đổi mới căn được.

**A4. Dọn alpha bằng script (thử trên 3 ảnh, không tốn lượt):** alpha ≤48 → 0, ≥235 → 255, khoảng giữa giữ nguyên. Kết quả: hết quầng, viền chuyển ≤3px ở hai ảnh hộp; `sua_ref` chỉ còn ~700 điểm ở chỗ lông xù (chấp nhận được). Vậy **không cần vẽ lại `sua_ref` cho D1** (nó chỉ là ảnh tham chiếu, không vào game): bỏ khỏi lát cắt G7, đỡ 1 lượt.

### B. Trả lời Dev

**A5. Đồng ý** D2, D3, D7, D8, D11, D12, D14, D16, D17, D20–D22, D24–D28, D31–D35, D39–D42, D44, D47. (D19, D23, D29, D30, D35, D45, D46 đã có G.) Các điểm còn lại chỉnh như dưới.

**A6. D1: đồng ý mục tiêu, không đồng ý cách làm.** Vẫn giữ câu "hard clean alpha edge, no glow, no halo" trong prompt nhưng không trông vào nó (A2). Đề xuất bước bắt buộc sau mỗi lượt vẽ: dọn alpha như A4, chạy trước khi ảnh vào game. Gộp vào công cụ cắt tờ (A8).

**A7. D5: không đồng ý làm cách mặc định.** Theo A2–A3, vẽ chung một ảnh ổn định hơn hẳn sửa ảnh. Đề xuất:
- Mặc định **vẽ theo tờ**: mọi trạng thái của một đồ vật, kèm các bộ phận tách rời của nó, vẽ chung một ảnh 1536x1024 (hoặc 1024x1536), mỗi thứ một ô cố định, cùng một tỉ lệ. Công cụ cắt ra từng PNG theo đúng key.
- Dự phòng: sửa từ ảnh trước chỉ dùng khi cần thêm hoặc vẽ lại một ảnh lẻ sau này; khi đó Dev căn bằng co giãn + dịch theo phần không đổi.
- Phải sửa `AGENTS.md` ("Mỗi asset một lần gọi image_gen") để cho phép vẽ tờ khi lời giao việc ghi rõ. Cần PM duyệt.

**A8. Công cụ cắt tờ.** Vào: ảnh tờ + bảng ô (ô → key, kiểu neo). Làm: dọn alpha (A4) → cắt theo ô → trim → căn các trạng thái của cùng đồ vật theo neo (D6, A11) → đặt vào một khung chung có lề → lưu đúng đường dẫn key. Xuất kèm ảnh chồng 50% từng cặp để duyệt theo D47. Cắt theo ô, không cắt theo mảng alpha liền (hơi thơm, tia nổ gồm nhiều mảng rời).

**A9. D4: đồng ý, đổi cách giao.** AI lấp ~85% ô và bỏ qua toạ độ px, nên giao **ô** chứ không giao toạ độ. Lề 8% thành "vật nằm trọn trong ô, cách mép ô ≥40px" (test 1 đạt 44–60px). Không cần chừa chỗ cho trạng thái lớn hơn (nắp, đệm dựng, nắp hộp bung, gối dựng) vì mỗi trạng thái có ô riêng; thay bằng câu "phần thân giống hệt nhau, cùng cỡ giữa các ô" (test 1 giữ được).

**A10. D10: đồng ý công thức, đổi cách thực hiện.** Mỗi tờ có một tỉ lệ k = cỡ vẽ ÷ cỡ hiển thị, dùng chung cho mọi thứ trong tờ. Nét gốc = 3k px, ghi thẳng số px trong lời giao việc. Đồ nhỏ vẽ chung tờ với đồ lớn đi cùng nó (chim, quả lắc với đồng hồ; bướm với chậu cây; hơi thơm với hộp pate), nên cỡ tương đối và nét tự khớp. Art đo nét sau mỗi lượt, lệch quá 30% thì vẽ lại. k của từng tờ ghi ở mục C, đều từ 1,5 trở lên. Khung 1024 của game xấp xỉ số px thật trên điện thoại (khoảng 390pt × 3), nên ×1,5 đã đủ nét. Dev xác nhận có thật cần ×2 không.

**A11. D6: bổ sung.**
- Sữa: "tâm ngang" là điểm giữa hai chân sau, trên đường đáy, không phải tâm khung (tư thế ăn chúi sang phải, đuôi dựng làm lệch khung). Mọi tư thế giữ nguyên mông và chân sau, chỉ đổi đầu, thân trên, đuôi.
- Quả lắc: đầu dây có một khoen nhỏ. Dev đặt khoen khuất sau mép đáy thân đồng hồ (lớp quả lắc nằm sau thân) để chỗ nối không lộ khi lắc (đúng D11).
- Đệm: hai trạng thái căn theo **mép sau** (bản lề), vì mép trước thay đổi.

**A12. D9: đồng ý làm điểm xuất phát.** Gợi ý thu hộp pate còn ~85x70: hiện hộp cao bằng ~42% Sữa ngồi, hơi to khi Sữa ăn cạnh. Dev chốt khi ghép.

**A13. D13: bổ sung hình chim.** Chim là nửa thân trước (đầu, ngực, cánh khép) gắn trên một que gỗ ngắn, nhìn chính diện hơi nghiêng trái, mỏ há. Đầu que khuất trong lỗ tối khi Dev đặt chim trước lỗ. Gật mỏ thì xoay quanh gốc que. Ở `_open`, cánh cửa vòm mở hé sang phải, để lộ lỗ vòm tối.

**A14. D15: đổi thành một làn hơi đơn.** `l1_pate_can_steam` chỉ là **một** làn hơi hình chữ S, chân ở giữa mép dưới. Code sinh 3 bản lệch pha, lật ngang ngẫu nhiên, mỗi làn tự bay lên, lắc, mờ dần: sinh động hơn 3 làn dính nhau mà vẽ ít hơn. Viền làn hơi dùng caramel nhạt thay cho nâu đậm để trông nhẹ (ngoại lệ màu viền duy nhất).

**A15. D18, D36–D38: vẽ chung tờ thay vì sửa ảnh.**
- `sua_eat_f2` vẽ cùng tờ với `sua_eat`, sau khi demo được duyệt (đúng G7).
- `sua_face_icon` và `ui_cat_head_dark` vẽ chung tờ, hai ô cùng cỡ, ghi rõ "same head size and outline". Dự phòng `setTintFill` như D37.
- `ui_question_mark` (hồng) và `ui_question_mark_white` vẽ chung tờ.
- D36: đồng ý canvas 1024x1536 và cẳng tay kéo tới mép dưới, nhưng không bắt AI khớp bề ngang theo % (A2). Vẽ `sua_held` trước, vẽ tay với `sua_held` làm tham chiếu, rồi Dev co giãn ảnh tay cho khe giữa hai lòng bàn tay bằng ngực Sữa. Cẳng tay vẽ dài (≥55% chiều cao) để co lại vẫn chạm mép dưới màn.

**A16. D20: bổ sung nền.** Bỏ tranh cá: tường trên đã có rèm và đồng hồ, bớt một thứ cho đỡ rối. Thanh treo rèm nằm ngang ở y≈180, từ x≈60 tới 480. Đệm trái vẽ trong nền là nguồn màu: tờ đệm vẽ sau, mở nền làm tham chiếu.

**A17. D43: thêm.** Đổi `l1_fx_pop` → `fx_pop` (`common/`): level 10 dùng lại tiếng TÁCH, hình nổ cũng dùng lại được.

### C. Danh sách ảnh Level 1 (sau khi áp D, G và A)

**A18. Quy ước chung cho mọi tờ:** nền trong suốt; mỗi thứ nằm trọn trong ô của nó, cách mép ô ≥40px; không bóng sàn, không quầng; góc nhìn D3 (chính diện, nhìn xuống ~15°, mặt trên là elip dẹt); sáng từ trên trái, vài nét chì bên phải; nét nâu #6B4A3A run tay, dày đúng số px của tờ; mọi thứ trong tờ cùng tỉ lệ k; không chữ. Dáng dễ đọc ở cỡ nhỏ: khối to, ít chi tiết, đáy phẳng cho đồ đặt sàn.

**A19. Nền** (1 lượt, 1024x1536, có nền, k=1, nét 3–4px)
- `l1_bg_living_room`: phòng khách buổi sáng, tường kem trơn. Cửa sổ trên trái (x≈60–480, y≈180–640): khung gỗ caramel, 4 ô kính xanh nhạt có mây, **bệ cửa sổ trống**; thanh treo rèm gỗ tròn ở y≈180. Tường trên phải trống cho đồng hồ. Sofa 2 chỗ bạc hà rộng ~920, mặt ghế y≈870: nửa trái có đệm ngồi vẽ liền, nửa phải phẳng trống. Sàn gỗ caramel từ y≈1060, vài nét ván ngang, giữa và dưới phải để trống. 8% trên cùng là tường trơn, 8% dưới cùng là sàn trơn. Không thảm, chậu cây, tranh hay đồ chạm được.

**A20. Tờ `l1_cushion_sheet`** (1536x1024, hai hàng 1536x512: trên `bulge`, dưới `lifted`; k≈2, nét 6px; neo giữa mép sau)
- `l1_sofa_cushion_bulge`: đệm ngồi chữ nhật bo tròn, bạc hà như đệm trái trong nền; góc phải phồng một cục tròn rõ như có vật bên dưới, vài nét chì vải căng quanh chỗ phồng; mép phải gọn, không lẫn vào tay vịn.
- `l1_sofa_cushion_lifted`: cùng tấm đệm, mép sau giữ nguyên (cùng bề ngang, cùng đường); mép trước nhấc lên dựng ~60°, tựa vào lưng sofa. Lộ mặt dưới màu bạc hà nhạt hơn, tấm đệm hơi oằn như vừa bị lật mạnh. Không vẽ hộp pate.

**A21. Tờ `l1_pate_sheet`** (1536x1024, ba ô 512x1024; k≈3, nét 9px; neo giữa mép đáy, làn hơi neo ở chân)
- `l1_pate_can_closed`: như test 1 nhưng nét chì run tay hơn. Hộp thiếc tròn thấp mập, đứng thẳng, thân cam đào ấm #F4B48C, nắp bạc có khoen tròn; nhãn chỉ có một cá xanh nhỏ và một mặt mèo trắng cười (không đốm).
- `l1_pate_can_open`: thân y hệt ô 1. Nắp bạc bật dựng sau miệng hộp, ngả ra sau, khoen còn dính; pate hồng cam nhô thành khối tròn mịn. Không vẽ hơi.
- `l1_pate_can_steam`: một làn hơi chữ S màu kem trắng, dưới to trên mảnh, viền caramel nhạt (A14).

**A22. Tờ `l1_box_sheet`** (hai ô 768x1024; k≈1,8, nét 5–6px; neo giữa mép đáy)
- `l1_box_closed`: hộp các-tông vuông hơi méo, caramel nhạt, nắp gập phẳng, một dải băng dính kem dán ngang.
- `l1_box_open_empty`: thân y hệt. 4 nắp bung (hai nắp bên ngả ra hai phía, nắp sau dựng, nắp trước gập xuống), lòng hộp trống màu nâu đậm hơn, băng dính đứt rủ một bên. Góc nhìn không đổi.

**A23. Tờ `l1_pillow_sheet`** (hai ô 768x1024; k≈2,5, nét 7–8px; neo giữa mép đáy)
- `l1_pillow_white_idle`: gối vuông nhỏ trắng ấm (cùng màu Sữa), mép lông xù, nằm bẹp tròn trịa; 2 góc trên nhọn nhô lên như tai. Nhìn lướt giống Sữa cuộn tròn, không có mặt.
- `l1_pillow_white_flipped`: cùng gối, dựng đứng trên một cạnh, cao hơn; 2 góc giờ chĩa ngang, lộ mặt phẳng với một vết lõm ở giữa: nhìn là biết gối. Cùng đường đáy.

**A24. Tờ `l1_curtain_sheet`** (hai ô 768x1024; k≈1,6, nét 5px; neo mép trên)
- `l1_curtain_closed`: hai tấm vải xanh da trời nhạt kéo kín, buông thẳng, gặp nhau đúng đường giữa, không chồng lên nhau; mép trên là đường ngang thẳng với 6–8 khoen nhỏ; mỗi tấm 2–3 nếp dọc; gấu rèm hơi lượn.
- `l1_curtain_open`: cùng mép trên, cùng bề ngang. Mỗi tấm dồn thành bó sát mép ngoài, buộc ngang bằng dải vải hồng phấn; khoảng giữa trống hẳn.

**A25. Tờ `l1_clock_sheet`** (1536x1024: ô 1 và ô 2 cỡ 512x1024 cho `closed`/`open`; cột phải chia ô trên 512x512 cho chim, ô dưới cho quả lắc; k≈2,2, nét 6–7px)
- `l1_wall_clock_closed`: nhà gỗ caramel nhạt, mái nhọn hồng đào; mặt tròn kem với 2 kim và 4 vạch ngắn (không số); cửa vòm nhỏ đóng phía trên mặt; móc nhỏ ở giữa mép trên (neo) và ở giữa đáy; không vẽ quả lắc.
- `l1_wall_clock_open`: y hệt, chỉ khác cửa vòm mở hé sang phải, lỗ vòm tối màu nâu than. Không chim.
- `l1_wall_clock_bird`: chim gỗ xanh da trời theo A13, cỡ vừa lọt lỗ vòm; neo ở gốc que.
- `l1_wall_clock_pendulum`: thanh mảnh, khoen nhỏ ở đầu trên (neo), dưới cùng là quả tròn vàng bơ, thẳng đứng.

**A26. Tờ `l1_plant_sheet`** (hai ô 768x1024; k≈2,8, nét 8px)
- `l1_plant`: chậu đất tròn mập hồng đào, đáy phẳng (neo giữa đáy), miệng chậu là một đường ngang rõ; 3–4 lá to tròn bạc hà mọc chụm từ một gốc ở giữa miệng chậu, không lá nào rủ xuống thân chậu, đầu lá hơi ngả như đang vẫy. Dev cắt `l1_plant_leaves`/`l1_plant_pot` tại miệng chậu.
- `prop_butterfly` (`common/`): nhìn thẳng từ trên xuống, đối xứng trái-phải tuyệt đối, cánh mở phẳng (2 cánh trên to, 2 cánh dưới nhỏ), vàng bơ mép hồng đào; thân nâu mảnh nằm đúng trục giữa, đầu hướng lên, 2 râu cong; neo ở tâm.

**A27. Tờ `l1_rug_sheet`** (hai hàng 1536x512; k≈1,6, nét 5px; neo tâm elip)
- `l1_rug_flat`: thảm tròn nhìn chếch thành elip dẹt, hồng phấn, viền ngoài đậm hơn một chút, nằm phẳng.
- `l1_rug_curled`: cùng elip, phần chưa cuộn trùng khít; góc trước bên trái cuộn lên một vòng, lộ mặt dưới hồng nhạt hơn.

**A28. Tờ `sua_poses_a_sheet`** (lưới 2x2, ô 768x512: hàng trên `sit_stare`, `meow_up`; hàng dưới `eat`, `eat_f2`; tham chiếu `sua_ref`; k≈2, nét 6px; neo theo A11). Cả bốn tư thế mặt hướng phải, đầu cùng cỡ, mông và chân sau giữ nguyên chỗ trong ô, nên swap trông như một con mèo cử động chứ không phải bốn hình khác nhau.
- `sua_sit_stare`: ngồi thẳng, ngực ưỡn hơi đổ về trước; đầu quay ba phần tư sang phải, cúi xuống; mắt tròn xoe rất to, long lanh, dán xuống góc dưới phải; tai dựng chĩa tới; miệng khép; đuôi quấn chân. Vẻ "ta đợi lâu lắm rồi".
- `sua_meow_up`: thân trên vươn lên thành đường cong chữ S, đầu ngửa ~30° lên phía trên bên phải, miệng mở tròn to, mắt nhắm híp, tai hơi ép ra sau, một chân trước nhấc khỏi sàn; 2 nét cong nhỏ cạnh miệng.
- `sua_eat`: thân trước khom xuống, đầu chúi sang phải và xuống, mõm ở góc dưới phải (chỗ Dev đặt hộp, D28); mắt nhắm cong, má phồng; đuôi dựng cong hình dấu hỏi. Không vẽ hộp.
- `sua_eat_f2`: y hệt `sua_eat`, chỉ khác đầu nhích lên một chút, má phồng hơn như đang nhai, chóp đuôi đổi hướng.

**A29. Cảnh bế** (mỗi ảnh 1 lượt, 1024x1536; k≈2, nét 6px)
- `sua_held` (tham chiếu `sua_ref`): người duỗi dài thẳng đứng như sợi mì, 2 chân trước giơ chĩa ra hai bên ngang ngực, chỗ nách để trống, bụng tròn, 2 chân sau lủng lẳng, đuôi thả cong; mặt nhìn thẳng, mắt híp cười, má hồng, miệng ω. Neo ở điểm giữa hai nách, khoảng 35% chiều cao. Không vẽ tay người.
- `player_hands_lift` (tham chiếu `sua_held`, `player_ref`): hai bàn tay trẻ con mũm mĩm, lòng bàn tay hướng vào nhau, ngón khum, đầu ngón ở ~30% chiều cao; cẳng tay và ống tay áo len vàng bơ kéo thẳng tới mép dưới canvas (A15).

**A30. Tờ `ui_mission_sheet`** (1536x1024, sáu ô 512x512; k≈1,5, nét 5px; neo tâm ô, riêng bong bóng neo ở đầu nhọn đuôi)
- `ui_speech_bubble`: thân tròn hơi dẹt trắng kem, rộng ~80% ô, tâm ở ~42% chiều cao; đuôi nhọn ngắn chĩa xuống, hơi lệch trái; bên trong trống.
- `ui_cat_head_dark`: bóng đầu Sữa (đầu tròn lông hơi xù, tai nhọn bo đầu theo G4) tô kín tím than #5B5470, viền nâu, không mặt; đầu rộng 70% ô, tâm đầu ở tâm ô.
- `sua_face_icon` (`cats/`): đúng cái bóng đầu ở ô bên cạnh (cùng cỡ, cùng đường viền), có mặt Sữa nhìn thẳng, mắt híp cười, má hồng, trong tai hồng đào.
- `ui_question_mark`: dấu hỏi mập tròn, hồng đào. `ui_question_mark_white`: y hệt, ruột trắng kem, viền nâu.
- `ui_heart`: tim mập tròn hồng đào (dấu hỏi biến thành tim).

**A31. Nhân vật** (vẽ `player_ref` trước theo style.md; hai tờ `player_poses_a_sheet` gồm `call`, `scratch_head` và `player_poses_b_sheet` gồm `surprised`, `shrug`, mỗi tờ hai ô 768x1024; k≈1,8, nét 5–6px; neo giữa mép đáy, chân ở ~95% chiều cao; cùng cỡ đầu, nhìn thẳng)
- `player_call`: hai tay khum quanh miệng, người hơi đổ tới, nhón một gót, miệng tròn, lông mày nhíu lo lắng.
- `player_scratch_head`: một tay gãi sau đầu, tay kia chống hông, đầu nghiêng, cười gượng, mắt híp một bên, giọt mồ hôi xanh da trời.
- `player_surprised`: hai tay giơ ngang vai xoè ngón, người ngả ra sau, mắt tròn to, miệng chữ O, 3 nét ngắn toả trên đầu.
- `player_shrug`: hai tay ngửa ngang vai, vai nhún cao, đầu nghiêng, cười méo, mắt nhắm.
- `player_box_on_head` (tùy chọn, vẽ sau cùng, tham chiếu tờ hộp): đội hộp `l1_box_open_empty` úp tới mũi, hai tay giơ ngang lần mò, cười toe.

**A32. Tờ `ui_icons_sheet`** (sáu ô 512x512; k≈3, nét 8–9px): đồ chung trong style.md mục 5 mà level 1 cần, gồm `ui_hand_pointer`, `ui_hint_paw`, `ui_sparkle`, `ui_bulb_button`, `ui_dried_fish`, cộng `fx_pop` (tia nổ vàng bơ đối xứng tròn, 6 tia ngắn và vài chấm, tâm ở tâm ô, không khói, không vệt; D27).

### D. Đặt tên

**A33. Đồng ý D39–D44** (thứ tự `<tiền tố>_<đồ vật>[_<bộ phận>][_<trạng thái>][_f<số>]`; mọi trạng thái đều có hậu tố; `_f2` cho khung; tên bộ phận sau tên đồ vật; `prop_`/`fx_` ở `common/`; demo ở `art/out/demo/`). Thêm:
- **Tờ vẽ:** `art/out/_sheets/<tiền tố>_<nhóm>_sheet.png`, không nạp vào game. Mỗi tờ có một bảng ô (ô → key → neo) trong design-art; key chính thức vẫn là ảnh sau khi cắt.
- **Ảnh thử:** `art/out/demo/test_<tên>.png`.
- `l1_fx_pop` → `fx_pop` (A17).

**A34. Tên chốt cho Level 1:**
- `level1/`: `l1_bg_living_room`, `l1_sofa_cushion_bulge`/`_lifted`, `l1_pate_can_closed`/`_open`/`_steam`, `l1_box_closed`/`l1_box_open_empty`, `l1_pillow_white_idle`/`_flipped`, `l1_curtain_closed`/`_open`, `l1_wall_clock_closed`/`_open`/`_bird`/`_pendulum`, `l1_plant` (Dev cắt `l1_plant_leaves`, `l1_plant_pot`), `l1_rug_flat`/`_curled`.
- `common/`: `prop_butterfly`, `fx_pop`, `ui_speech_bubble`, `ui_cat_head_dark`, `ui_question_mark`, `ui_question_mark_white`, `ui_heart`, `ui_hand_pointer`, `ui_hint_paw`, `ui_sparkle`, `ui_bulb_button`, `ui_dried_fish`.
- `cats/`: `sua_sit_stare`, `sua_meow_up`, `sua_eat`, `sua_eat_f2`, `sua_held`, `sua_face_icon`.
- `player/`: `player_ref`, `player_call`, `player_surprised`, `player_scratch_head`, `player_shrug`, `player_hands_lift`, `player_box_on_head` (tùy chọn).
- `_sheets/`: `l1_cushion_sheet`, `l1_pate_sheet`, `l1_box_sheet`, `l1_pillow_sheet`, `l1_curtain_sheet`, `l1_clock_sheet`, `l1_plant_sheet`, `l1_rug_sheet`, `sua_poses_a_sheet`, `ui_mission_sheet`, `player_poses_a_sheet`, `player_poses_b_sheet`, `ui_icons_sheet`.

### E. Demo (G7) và cách giao việc cho Codex

**A35. Demo: 4 lượt, theo thứ tự:**
1. `l1_demo_start` (1024x1536, tranh dựng cảnh theo D46, bố cục G1/D9). Không có tham chiếu ngoài style.md.
2. `l1_cushion_sheet`, tham chiếu `l1_demo_start` (màu sofa, góc nhìn).
3. `l1_pate_sheet`, tham chiếu `test_pate_can_sheet` (giữ thiết kế, sửa nét và nhãn theo A2) và `l1_cushion_sheet` (độ dày nét, màu).
4. `l1_demo_reveal`, tham chiếu `l1_demo_start` (căn phòng), `sua_ref` (Sữa), `l1_pate_sheet` (hộp).

Không vẽ lại `sua_ref` (A4). Sau mỗi lượt Art dọn alpha, đo nét, chồng cặp trạng thái, rồi giao Dev ghép lát cắt lên `l1_demo_start` để duyệt theo D47.

**A36. Sau khi demo được duyệt (~18 lượt, so với ~38 nếu mỗi ảnh một lượt):** `player_ref` → `l1_bg_living_room` (tham chiếu `l1_demo_start`, bỏ mọi đồ chạm được) → nếu màu sofa trong nền lệch đệm thì Dev tint hoặc vẽ lại tờ đệm (1 lượt) → các tờ clock, plant, box, pillow, curtain, rug (tham chiếu nền) → `sua_poses_a_sheet` (tham chiếu `sua_ref`, `l1_pate_sheet`) → `ui_mission_sheet` (tham chiếu `sua_ref`) → `sua_held` → `player_hands_lift` → `player_poses_a_sheet`, `player_poses_b_sheet` (tham chiếu `player_ref`) → `ui_icons_sheet` (tham chiếu `player_ref` cho tay áo) → `player_box_on_head` nếu còn hạn mức.

**A37. Lời giao việc cho Codex** (qua `codex exec`, vì `tools/codex-draw.mjs` chỉ đọc bảng từng key), mỗi lượt gồm: đường dẫn lưu, cỡ, nền; ảnh tham chiếu phải mở bằng `view_image`; bảng ô (ô → nội dung, neo); k và độ dày nét bằng px; câu "phần thân giống hệt nhau giữa các ô"; prompt tiếng Anh gợi ý; "gọi image_gen một lần, chép nguyên ảnh, không tự xử lý"; báo cáo theo AGENTS.md. Art duyệt mỗi lượt: alpha trước và sau khi dọn, vật nằm trong ô, nét đo được, chồng cặp, xem trên nền kem. Sai rõ thì vẽ lại tối đa 1 lần với một góp ý cụ thể.

### F. Cần Dev chốt ở vòng 3

**A38.**
1. Vẽ theo tờ làm mặc định thay D5 (A7), kèm sửa `AGENTS.md` (cần PM duyệt).
2. Ai viết công cụ cắt tờ + dọn alpha (A6, A8), ngưỡng 48/235, và có mở rộng `codex-draw.mjs` để đọc bảng tờ không.
3. k ≥ 1,5 có đủ không, hay bắt buộc ×2 (A10).
4. Neo bổ sung ở A11 (tâm Sữa ở chân sau, khoen quả lắc khuất sau thân, đệm căn theo mép sau).
5. Hơi thơm một làn, code sinh 3 bản (A14); `fx_pop` dùng chung (A17); bỏ tranh cá (A16); cỡ hộp pate (A12).
6. Thứ tự demo 4 lượt ở A35 (thay cho việc vẽ lại `sua_ref` trong G7), và cách Dev ghép lát cắt để duyệt khi chưa có nền thật.

---

## PM duyệt (sau vòng 2)

**P1. Duyệt vẽ theo tờ làm cách mặc định** (A về D5): mọi trạng thái và bộ phận của một đồ vẽ chung một ảnh chia ô, rồi cắt ra từng key. Lý do: thử nghiệm cho thấy giữ khung tốt hơn hẳn cách "sửa từ ảnh trước", và tốn khoảng một nửa số lượt vẽ. Điều kiện: Dev xác nhận ở vòng 3 là cắt và căn được đúng điểm neo. Art 2D sửa `AGENTS.md` (bỏ quy tắc "mỗi asset một lần gọi", thêm quy tắc tờ) ở vòng 4.

**P2. Công cụ giao cho Dev**, làm ngay trong vòng 3 vì demo cần: script cắt tờ thành từng key theo bảng tờ, dọn alpha (ngưỡng Art 2D đề xuất), căn mọi trạng thái của một đồ theo cùng khung và điểm neo. Mở rộng `tools/codex-draw.mjs` để giao việc theo tờ nếu Dev thấy cần. Đặt trong `tools/`, chạy bằng Node hoặc Python có Pillow.

**P3. Không vẽ lại `sua_ref`**: dùng script dọn alpha.

**P4. GD đồng ý** bỏ tranh cá trên tường nền, và đổi `l1_fx_pop` thành `fx_pop` dùng chung (level 10 dùng lại tiếng và hiệu ứng "TÁCH!").

**P5. Demo vẫn theo G7, 4 lượt** theo thứ tự Art 2D đề xuất. Các điểm kỹ thuật còn lại (tỉ lệ nét, điểm neo bổ sung, hơi thơm một làn, cỡ hộp pate, cách ghép lát cắt để duyệt) để Dev chốt.

---

## Vòng 3 – Dev chốt

Đã đọc G1–G7, A1–A38, P1–P5. Công cụ ở P2 đã xong và đã chạy thử (mục C). Phần dưới chốt dứt khoát; Art 2D chép mục E vào design-art ở vòng 4. `levels/` để vòng 5.

### A. Trả lời Art 2D

**V1. Đồng ý, không bàn thêm:** A1–A5, A6 (dọn alpha bắt buộc, công cụ tự làm), A7/P1 (vẽ theo tờ là mặc định; Dev xác nhận cắt và căn đúng neo, xem V20), A8, A9 (giao ô thay cho toạ độ, vật cách mép ô ≥ 40px), A13, A14, A15, A16/P4, A17/P4, A18, A19, A22–A27, A29, A31–A33, A35, A36, A37.

**V2. A10, độ phân giải xuất: chốt ×1,5.** Ảnh cắt ra có cỡ = cỡ hiển thị × 1,5. Khung 1024 của game khi lên điện thoại thành khoảng 1170–1290 px thật, nên ×1,5 vẫn dư; iPad hơi mềm nhưng nét chì chịu được. Không cần vẽ lại nếu sau này đổi sang ×2: chỉ cần chạy lại công cụ với `--res 2`, miễn k của tờ ≥ 2.

**V3. A10, nét viền: k do cỡ ô quyết định.** Test 1 cho thấy AI lấp khoảng 85% ô và vẽ nét 9–10px dù vật to hay nhỏ. Hộp pate trong ô 768 có k ≈ 7,9, nên ở cỡ hiển thị nét chỉ còn khoảng 1,3px (mảnh hơn hẳn đồ to). Chốt:
- Bề ngang ô ≈ k × bề ngang hiển thị ÷ 0,85 (vật cao thì tính theo chiều cao), với k từ 1,5 đến 4.
- Nét trong tờ = 3k px, tức 5–12px: khoảng AI vẽ theo được.
- Đồ nhỏ phải ở ô nhỏ. Không cần chừa ô to "cho chắc", vì công cụ tự co mọi ảnh về đúng cỡ hiển thị.
- Công cụ in ra k thật và độ dày nét nên có sau mỗi lần cắt. Lệch quá 30% thì sửa cỡ ô ở lượt sau.

**V4. Các ô trong mục C (A20–A32) phải sửa theo V3** (những ô còn lại đã khớp):

| Tờ | Ô | Sửa thành |
|---|---|---|
| `l1_pate_sheet` | Hộp 512 rộng (k ≈ 5) | Ô hộp rộng ~380 (k ≈ 3,8, nét 11px); ô hơi khoảng 160x400 |
| `l1_clock_sheet` | Chim 512x512 (k ≈ 9) | Chim ~200x200 (k ≈ 3,4, nét 10px) |
| `l1_plant_sheet` | Bướm 768x1024 (k ≈ 9) | Bướm ~256x256 (k ≈ 3,1, nét 9px) |
| `ui_mission_sheet` | Bong bóng 512 (k ≈ 1) | Bong bóng ≥ 768 rộng |
| `ui_mission_sheet` | Dấu hỏi, tim 512 (k ≈ 5) | Dấu hỏi, tim ~256 |
| `ui_mission_sheet` | Hai đầu mèo 512 | Giữ 512 (k ≈ 1,9, nét 6px) |
| `ui_icons_sheet` | Ô 512 (`ui_sparkle` k ≈ 7) | Ô theo cỡ từng icon: bàn tay, bàn chân, nút ~256; lấp lánh, cá ~200; `fx_pop` ~320 |
| `l1_cushion_sheet` | Hàng 1536x512 | Giữ, nhưng k thật ≈ 3,3 nên nét 10px (không phải 6) |

**V5. A11, điểm neo: chốt theo cách công cụ tính** (định nghĩa ở mục B).
- **Sữa:** neo `đáy` = điểm giữa phần chân chạm đất (dải 5% thấp nhất). Nếu ô chồng `_check` cho thấy chân sau lệch, Art ghi tay toạ độ chân sau `x,y` vào cột Neo.
- **Quả lắc:** neo `đỉnh` (khoen). Dev đặt khoen khuất sau đáy thân, lớp quả lắc nằm sau thân: đồng ý.
- **Đệm: khác A11.** Mép sau không đo tự động được (đệm nằm thì mép sau ở trên, đệm dựng thì mép sau ở dưới). Chốt: cả hai trạng thái neo `đáy`. Dev đặt `_lifted` cao hơn `_bulge` 25px (độ sâu mặt ghế) trong bảng vị trí (V13) và chỉnh khi ghép.
- **Thảm: neo `đỉnh` thay vì tâm elip.** Góc cuộn làm lệch khung bao, nhưng mép sau của thảm không đổi.

**V6. A12: hộp pate hiển thị rộng 85** (đóng khoảng 85x70). Test ghép cho thấy cỡ này vẫn đọc rõ nhãn mặt mèo.

**V7. A14: một làn hơi, viền caramel nhạt: đồng ý.** Code sinh 3 bản lệch pha, lật ngang ngẫu nhiên. Hiển thị rộng 30.

**V8. A21, `l1_pate_sheet`:** đổi cỡ ô theo V4. Nhãn chỉ có một cá xanh và một mặt mèo trắng không đốm; thêm "wobbly pencil line" như A2.

**V9. A28: giữ lưới 2x2 ô 768x512 (k ≈ 2,3), nét 7px.** Cả bốn tư thế ghi `cao 190` ở dòng `sua_sit_stare`, ba dòng còn lại để trống: chúng dùng chung tỉ lệ, nên đầu cùng cỡ như AI vẽ trong tờ.

**V10. A30: `sua_face_icon` và `ui_cat_head_dark` chung một nhóm** (neo `tâm`), để công cụ cho ra cùng khung và hai ảnh thay nhau khớp. `ui_question_mark` và `_white` chung nhóm `question_mark`.

**V11. A31: tư thế nhân vật nằm ở hai tờ khác nhau** nên mỗi dòng đều ghi `cao 480` (tính tới đỉnh đầu, không tính nét toả). `player_box_on_head` chỉnh riêng khi vẽ.

**V12. A34: bỏ `l1_plant_leaves`/`l1_plant_pot` khỏi danh sách file.** Tách lá với chậu và chia đôi rèm do code làm bằng frame của texture (Phaser `texture.add`), không sinh thêm file. Dev ghi đường cắt (y miệng chậu, x giữa rèm) trong cấu hình cảnh.

**V13. A38.6, cách ghép lát cắt để duyệt.** Mỗi lượt cắt, công cụ xuất `_check/<nhóm>.png`: từng trạng thái trên nền kem, thêm một ô chồng 50%, dấu + đỏ ở điểm neo. Sau đó Dev chạy `compose` để ghép lát cắt lên `l1_demo_start` (cảnh đầu) và `l1_demo_reveal` (cảnh lộ diện) theo bảng vị trí dưới đây. Lát cắt đè lên chính đồ vật đã vẽ trong tranh, nên lệch cỡ, nét, màu thấy ngay. Chưa có nền thật thì ghép lên nền kem trơn.

| Key | X | Y | Cảnh |
|---|---|---|---|
| l1_wall_clock_pendulum | 770 | 455 | |
| l1_wall_clock_closed | 770 | 200 | |
| l1_wall_clock_bird | 770 | 250 | cúc cu |
| l1_plant | 900 | 1240 | |
| prop_butterfly | 870 | 990 | |
| l1_rug_flat | 480 | 1205 | |
| l1_box_closed | 330 | 1210 | |
| l1_pate_can_closed | 760 | 878 | đầu |
| l1_pate_can_open | 760 | 1075 | lộ |
| l1_pate_can_steam | 760 | 1010 | lộ |
| l1_sofa_cushion_bulge | 690 | 880 | đầu |
| l1_sofa_cushion_lifted | 690 | 855 | lộ |
| l1_pillow_white_idle | 290 | 875 | |
| l1_curtain_closed | 270 | 185 | |
| sua_sit_stare | 620 | 1080 | lộ |
| player_call | 512 | 1520 | đầu |

X, Y là vị trí điểm neo trên khung 1024x1536. Dòng trên nằm dưới (thứ tự lớp như states).

### B. Công cụ (P2): `tools/sheet_cut.py` và `tools/codex-draw.mjs --sheet`

**V14. Bảng tờ** nằm trong `design-art-levelN.md` (Art điền ở vòng 4), mỗi ô một dòng. Tên cột phải đúng, thứ tự cột tùy ý:

| Cột | Điền gì |
|---|---|
| Tờ* | Tên tờ, ví dụ `l1_pate_sheet`. File tờ: `art/out/_sheets/<tờ>.png` |
| Ô* | `x,y,w,h` theo px trong tờ |
| Key* | Key chính thức của ảnh cắt ra |
| Thư mục* | `level1`, `cats`, `player`, `common` |
| Nhóm | Các trạng thái của một đồ vật ghi cùng một tên nhóm, để được căn chung khung, chung neo và chung tỉ lệ. Để trống = nhóm riêng |
| Neo | `đáy` (mặc định) / `đỉnh` / `tâm` / `x,y` (px trong tờ, ghi tay khi cần) |
| Hiển thị | `rộng 85` hoặc `cao 480`. Mỗi nhóm điền ít nhất một dòng; các dòng khác trong nhóm để trống để dùng chung tỉ lệ |
| Nét | Số px nét viền trong tờ (= 3k). Chỉ đưa vào lời giao việc |

Cách công cụ tính neo: `đáy` = điểm giữa phần vật ở dải 5% thấp nhất, nằm trên mép đáy. `đỉnh` = tương tự ở dải 5% cao nhất. `tâm` = tâm khung bao.

**V15. `python tools/sheet_cut.py cut <file.md> [--sheet TÊN] [--src ẢNH] [--out THƯ_MỤC] [--res 1.5]`** làm lần lượt: cắt theo ô → dọn alpha (≤ 48 → 0, ≥ 235 → 255, xoá mảng rời < 120px) → trim → co về cỡ hiển thị × 1,5 → căn mọi thành viên của nhóm vào một khung chung (lề 8px) sao cho neo trùng nhau → tô màu viền vào vùng trong suốt (để lọc ảnh trong game không ra viền tối). Kết quả:
- Ảnh lưu ở `art/out/<thư mục>/<key>.png`.
- Toạ độ neo ghi vào `art/out/anchors.json`, gồm `w`, `h`, `ax`, `ay`, `ox`, `oy`. Code đặt origin theo file này; không sửa tay.
- Ảnh kiểm tra ở `art/out/_check/<nhóm>.png`.
- Mỗi key in một dòng: cỡ vật, khoảng cách tới mép ô (báo nếu < 40px), k, nét nên có, alpha trước và sau.

**V16. Lệnh khác.**
- `python tools/sheet_cut.py clean <vào> <ra>`: chỉ dọn alpha một ảnh. Không ghi đè ảnh vào nếu thiếu `--ghi-de`.
- `python tools/sheet_cut.py compose <file.md> --bg <nền> --out <ra> [--canh đầu|lộ] [--marks]`: ghép theo bảng vị trí (V13).
- Ảnh lẻ (nền, `sua_held`, `player_hands_lift`) cũng dùng `cut` với bảng một ô. Nền không cần cắt.

**V17. Giao việc theo tờ:** `node tools/codex-draw.mjs --sheet l1_pate_sheet --ref <ảnh1>,<ảnh2>` đọc bảng tờ trong design-art, gửi Codex lời giao việc gồm cỡ tờ, danh sách ô, neo, nét, tham chiếu và câu "gọi image_gen một lần, chép nguyên ảnh". Vẽ xong, lệnh tự chạy `sheet_cut.py cut` cho tờ đó. Dùng được `--redo`, `--note`, `--dry`, `--no-cut`. Codex không phải tự xử lý ảnh, nên câu A37 "không tự xử lý" giữ nguyên.

### C. Kết quả thử

**V18. Bảng thử** (lệnh: `python tools/sheet_cut.py cut art/review/level1-thread.md --sheet test_pate_can_sheet --out art/out/demo/test_cut`):

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| test_pate_can_sheet | 0,0,768,1024 | test_pate_can_closed | demo | test_pate_can | đáy | rộng 85 | 10 |
| test_pate_can_sheet | 768,0,768,1024 | test_pate_can_open | demo | test_pate_can | đáy | | 10 |

**V19. Kết quả trên `test_pate_can_sheet`.**
- Alpha cao nhất 254 → 255. Điểm alpha lửng giảm từ 293 nghìn còn 2,5 nghìn (hộp đóng) và từ 429 nghìn còn 3,6 nghìn (hộp mở), chỉ còn viền khử răng cưa. Hết quầng.
- Hai ảnh ra cùng khung 146x178, neo (73, 170). Ô chồng 50% cho thấy hai thân hộp trùng khít: 11px lệch ngang trong tờ đã được căn hết.
- Vật cách mép ô 42px, đạt ≥ 40. k = 7,9, nên nét 10px chỉ còn khoảng 1,3px khi hiển thị: chính là lý do của V3.
- Ảnh ở `art/out/demo/test_cut/`, ảnh kiểm tra ở `art/out/demo/test_cut/_check/`.

**V20. Kết quả trên `sua_ref`** (bản sao `art/out/demo/test_cut/sua_ref_clean.png`, bản gốc không đổi): alpha cao nhất 254 → 255, 521 nghìn điểm thành đặc, điểm lửng giảm từ 571 nghìn còn 15 nghìn (viền lông xù và khử răng cưa). Ghép lên nền xanh đậm không thấy quầng. Kết luận cho P1: **cắt và căn theo neo làm được**, vẽ theo tờ dùng được làm mặc định.

### D. Việc tiếp theo

**V21.** Vòng 4, Art 2D:
- Sửa `AGENTS.md` theo P1, ghi rõ: chép nguyên ảnh tờ vào `art/out/_sheets/`, việc cắt do công cụ làm.
- Chép mục E vào design-art và style.md, viết các bảng tờ theo V14 với cỡ ô theo V3/V4.
- Vẽ 4 lượt demo theo A35 (tờ đệm và tờ pate vẽ bằng `codex-draw.mjs --sheet`).

Vòng 5, Dev: ghép theo V13, duyệt theo D47, rồi sửa `levels/` (G2, G3, key mới).

### E. Bảng chốt cuối

**V22. Danh sách key Level 1.**
- "Canvas xuất" là ước tính: công cụ tự tính bằng khung chung của nhóm × 1,5 + lề.
- Nền: TS = trong suốt.
- Neo: theo V14.
- Ảnh lẻ = một lượt vẽ, bảng một ô.

| Key | Thư mục | Hiển thị | Canvas xuất ≈ | Nền | Neo | Tờ (nhóm) |
|---|---|---|---|---|---|---|
| `l1_bg_living_room` | level1 | 1024x1536 | 1024x1536 (không cắt) | Có nền | góc trên trái | ảnh lẻ |
| `l1_sofa_cushion_bulge` | level1 | rộng 400 | 616x330 | TS | đáy | `l1_cushion_sheet` (cushion) |
| `l1_sofa_cushion_lifted` | level1 | (theo nhóm) | 616x330 | TS | đáy | `l1_cushion_sheet` (cushion) |
| `l1_pate_can_closed` | level1 | rộng 85 | 144x190 | TS | đáy | `l1_pate_sheet` (pate_can) |
| `l1_pate_can_open` | level1 | (theo nhóm) | 144x190 | TS | đáy | `l1_pate_sheet` (pate_can) |
| `l1_pate_can_steam` | level1 | rộng 30 | 61x120 | TS | đáy (chân làn hơi) | `l1_pate_sheet` |
| `l1_box_closed` | level1 | rộng 230 | 500x420 | TS | đáy | `l1_box_sheet` (box) |
| `l1_box_open_empty` | level1 | (theo nhóm) | 500x420 | TS | đáy | `l1_box_sheet` (box) |
| `l1_pillow_white_idle` | level1 | rộng 210 | 330x350 | TS | đáy | `l1_pillow_sheet` (pillow) |
| `l1_pillow_white_flipped` | level1 | (theo nhóm) | 330x350 | TS | đáy | `l1_pillow_sheet` (pillow) |
| `l1_curtain_closed` | level1 | rộng 420 | 646x710 | TS | đỉnh | `l1_curtain_sheet` (curtain) |
| `l1_curtain_open` | level1 | (theo nhóm) | 646x710 | TS | đỉnh | `l1_curtain_sheet` (curtain) |
| `l1_wall_clock_closed` | level1 | rộng 190 | 300x420 | TS | đỉnh (móc) | `l1_clock_sheet` (clock) |
| `l1_wall_clock_open` | level1 | (theo nhóm) | 300x420 | TS | đỉnh (móc) | `l1_clock_sheet` (clock) |
| `l1_wall_clock_bird` | level1 | rộng 50 | 90x100 | TS | đáy (gốc que) | `l1_clock_sheet` |
| `l1_wall_clock_pendulum` | level1 | cao 150 | 76x240 | TS | đỉnh (khoen) | `l1_clock_sheet` |
| `l1_plant` | level1 | rộng 170 | 270x450 | TS | đáy | `l1_plant_sheet` |
| `prop_butterfly` | common | rộng 70 | 120x100 | TS | tâm | `l1_plant_sheet` |
| `l1_rug_flat` | level1 | rộng 780 | 1190x470 | TS | đỉnh | `l1_rug_sheet` (rug) |
| `l1_rug_curled` | level1 | (theo nhóm) | 1190x470 | TS | đỉnh | `l1_rug_sheet` (rug) |
| `sua_sit_stare` | cats | cao 190 | 400x380 | TS | đáy (chân) | `sua_poses_a_sheet` (sua_pose) |
| `sua_meow_up` | cats | (theo nhóm) | 400x380 | TS | đáy (chân) | `sua_poses_a_sheet` (sua_pose) |
| `sua_eat` | cats | (theo nhóm) | 400x380 | TS | đáy (chân) | `sua_poses_a_sheet` (sua_pose) |
| `sua_eat_f2` | cats | (theo nhóm) | 400x380 | TS | đáy (chân) | `sua_poses_a_sheet` (sua_pose) |
| `sua_held` | cats | cao 620 | 560x950 | TS | x,y giữa hai nách (Art ghi tay) | ảnh lẻ |
| `player_hands_lift` | player | cao 900 | 920x1370 | TS | đáy | ảnh lẻ (k ≈ 1,4, chấp nhận) |
| `sua_face_icon` | cats | rộng 230 | 360x360 | TS | tâm | `ui_mission_sheet` (cat_head) |
| `ui_cat_head_dark` | common | (theo nhóm) | 360x360 | TS | tâm | `ui_mission_sheet` (cat_head) |
| `ui_speech_bubble` | common | rộng 420 | 650x560 | TS | đáy (đầu nhọn đuôi) | `ui_mission_sheet` |
| `ui_question_mark` | common | rộng 70 | 120x170 | TS | tâm | `ui_mission_sheet` (question_mark) |
| `ui_question_mark_white` | common | (theo nhóm) | 120x170 | TS | tâm | `ui_mission_sheet` (question_mark) |
| `ui_heart` | common | rộng 80 | 136x130 | TS | tâm | `ui_mission_sheet` |
| `player_call` | player | cao 480 | 560x740 | TS | đáy | `player_poses_a_sheet` (player_pose) |
| `player_scratch_head` | player | cao 480 | 560x740 | TS | đáy | `player_poses_a_sheet` (player_pose) |
| `player_surprised` | player | cao 480 | 560x740 | TS | đáy | `player_poses_b_sheet` (player_pose) |
| `player_shrug` | player | cao 480 | 560x740 | TS | đáy | `player_poses_b_sheet` (player_pose) |
| `player_box_on_head` | player | chỉnh khi vẽ | — | TS | đáy | ảnh lẻ (tùy chọn, sau cùng) |
| `ui_hand_pointer` | common | rộng 140 | 226x240 | TS | x,y đầu ngón trỏ (Art ghi tay) | `ui_icons_sheet` |
| `ui_hint_paw` | common | rộng 140 | 226x240 | TS | x,y đầu bàn chân (Art ghi tay) | `ui_icons_sheet` |
| `ui_sparkle` | common | rộng 60 | 106x106 | TS | tâm | `ui_icons_sheet` |
| `ui_bulb_button` | common | rộng 110 | 181x181 | TS | tâm | `ui_icons_sheet` |
| `ui_dried_fish` | common | rộng 80 | 136x90 | TS | tâm | `ui_icons_sheet` |
| `fx_pop` | common | rộng 160 | 256x256 | TS | tâm | `ui_icons_sheet` |

Không vào game: `sua_ref`, `player_ref` (ảnh tham chiếu; dùng bản đã dọn bằng `clean` khi cần đưa cho Codex), các tờ `_sheets/*`, ảnh `demo/*`. Frame do code tạo, không có file: `l1_plant` → `leaves`/`pot`, `l1_curtain_closed` → `left`/`right` (V12).

**V23. Quy tắc đặt tên cuối cùng** (thay mục 4 của style.md):
1. Key = tên file bỏ `.png`, chỉ gồm chữ thường không dấu, số và `_`.
2. Thứ tự các phần trong tên: `<tiền tố>_<đồ vật>[_<bộ phận>][_<trạng thái>][_f<số>]`.
3. Tiền tố và thư mục:

   | Tiền tố | Thư mục | Dùng cho |
   |---|---|---|
   | `l<N>_` | `level<N>/` | Đồ riêng của level |
   | `l<N>_bg_` | `level<N>/` | Nền phòng |
   | `l<N>_fx_` | `level<N>/` | Hiệu ứng riêng của level |
   | `sua_`, `mun_` | `cats/` | Tư thế mèo |
   | `player_` | `player/` | Nhân vật |
   | `ui_` | `common/` | Giao diện |
   | `prop_` | `common/` | Đồ dùng lại ở nhiều level |
   | `fx_` | `common/` | Hiệu ứng dùng chung |

4. Đồ có từ 2 trạng thái trở lên thì trạng thái nào cũng có hậu tố (`_closed`/`_open`, `_bulge`/`_lifted`, `_flat`/`_curled`, `_idle`/`_flipped`, `_open_empty`…). Đồ chỉ có một ảnh thì giữ tên trơn.
5. Khung hình: khung 1 giữ key gốc, các khung thêm là `_f2`, `_f3`. `_2`, `_3` là trạng thái, không phải khung.
6. Bộ phận tách rời là file riêng, tên bộ phận đứng sau tên đồ vật (`_pendulum`, `_bird`, `_steam`). Phần do code cắt từ một texture chỉ là tên frame, không phải file.
7. Tờ vẽ: `art/out/_sheets/<tiền tố>_<nhóm>_sheet.png`, không nạp vào game. Bảng tờ (V14) nằm trong design-art.
8. Ảnh thử: `art/out/demo/test_<tên>.png`. Tranh dựng cảnh: `art/out/demo/l<N>_demo_<nội dung>.png`.
9. Toạ độ neo của mọi key nằm trong `art/out/anchors.json`, do công cụ ghi, code đọc. Không sửa tay.

---

## Vòng 4 – Art 2D

Đã làm theo P1–P5 và V1–V23. Đã dùng 5 lượt Codex: 4 lượt demo và 1 lượt vẽ lại (W6).

### A. Đã sửa

**W1. `art/design-art-level1.md` viết lại toàn bộ.** Gồm: danh sách 43 key (V22), bố cục G1, quy tắc tờ, ảnh lẻ (nền), 15 bảng tờ theo V14 kèm đoạn bố cục và mô tả từng key (theo A19–A32 đã chỉnh theo V), ghi chú cho Dev, bảng vị trí V13 (`compose` đọc được), mục ảnh demo. Đã kiểm: `sheet_cut.py` đọc được 41 dòng tờ và 16 dòng vị trí; `codex-draw.mjs --sheet --dry` ra đúng cỡ 1536x1024 / 1024x1536 cho cả 15 tờ.
- Đổi vị trí vài ô (không đổi cỡ ô) vì `codex-draw.mjs` lấy cỡ tờ bằng mép ngoài cùng của các ô: nếu không có ô nào chạm mép phải, tờ thành 1040x1024 hoặc 1336x1024, không phải cỡ hợp lệ của `image_gen`. Các ô đã dời: hơi thơm (1376,312), chim (1180,100), quả lắc (1312,400), bướm (1280,384), `fx_pop` (1216,704).
- Ảnh có neo `x,y` (`sua_held`, `ui_hand_pointer`, `ui_hint_paw`): bảng tạm ghi `tâm`, vẽ xong Art đo rồi ghi tay.

**W2. `art/style.md`:** mục 3 mô tả lại Sữa theo `sua_ref` (tai nhọn bo đầu, đuôi bông dài vừa…; G4); mục 4 thay bằng 9 quy tắc V23, kèm một dòng nhắc là level 2 trở đi chưa cập nhật; mục 6 thay bằng quy trình Codex + tờ. Các phần khác giữ nguyên.

**W3. `AGENTS.md`:** bỏ quy tắc "mỗi asset một lần gọi"; thêm mục "Vẽ theo tờ" (chia ô, mỗi ô một trạng thái/bộ phận, cách mép ô ≥ 40px, cùng tỉ lệ thật và đường đáy, nét theo cột Nét, chép nguyên vào `art/out/_sheets/`, không tự cắt); "sửa từ ảnh trước" chỉ làm khi lời giao việc ghi rõ. Các phần khác giữ nguyên.

**W4. `sua_ref` đã dọn alpha** (`clean --ghi-de`): alpha tối đa 254 → 255, điểm lửng 571 nghìn → 15 nghìn.

### B. Demo

**W5. Ảnh (đường dẫn trong `art/out/`):**
- Tranh dựng cảnh: `demo/l1_demo_start.png`, `demo/l1_demo_reveal.png`.
- Ghép lát cắt lên tranh (`compose --marks`): `demo/l1_demo_start_compose.png` (đệm phồng), `demo/l1_demo_reveal_compose.png` (đệm lật, hộp mở, hơi thơm).
- Tờ: `_sheets/l1_cushion_sheet.png`, `_sheets/l1_pate_sheet.png`. Ảnh cắt: `level1/l1_sofa_cushion_bulge.png`, `_lifted`, `l1_pate_can_closed`, `_open`, `_steam`; `anchors.json`. Ảnh kiểm tra: `_check/cushion.png`, `_check/pate_can.png`.

**W6. Lượt vẽ lại (1/1): `l1_cushion_sheet`.** Lần đầu, ô `lifted` vẽ thừa một tấm đệm phẳng nằm dưới tấm dựng (trông như hai tấm đệm), còn cục phồng ở `bulge` quá nhẹ, khó đọc khi thu nhỏ (Codex tự nhận). Lần hai, có `l1_demo_reveal` làm tham chiếu: chỉ còn một tấm đệm lật lộ mặt dưới, cục phồng nhô cao rõ. Đạt.

**W7. `l1_pate_sheet`: AI không giữ cỡ ô V4.** Ô hộp rộng 384, nhưng AI vẽ hộp rộng ~550px (giống test 1, dù lời giao việc ghi rõ "~300px"), tràn sang ô bên cạnh. Cắt theo bảng V4 thì hộp bị cụt. Ảnh vẽ đẹp (nhãn đã đơn giản, nét run tay) nên không vẽ lại. Tôi cắt bằng bảng ô khớp với ảnh đã vẽ, để ở đây; `design-art` giữ nguyên ô V4 để PM quyết (W10). **Đừng cắt lại `l1_pate_sheet` từ design-art** trước khi chốt, vì sẽ ra hộp cụt. Lệnh: `python tools/sheet_cut.py cut art/review/level1-thread.md --sheet l1_pate_sheet`.

| Tờ | Ô | Key | Thư mục | Nhóm | Neo | Hiển thị | Nét |
|---|---|---|---|---|---|---|---|
| l1_pate_sheet | 0,0,627,1024 | l1_pate_can_closed | level1 | pate_can | đáy | rộng 85 | 11 |
| l1_pate_sheet | 627,0,627,1024 | l1_pate_can_open | level1 | pate_can | đáy | | 11 |
| l1_pate_sheet | 1300,262,236,600 | l1_pate_can_steam | level1 | | đáy | rộng 30 | 8 |

**W8. Tự duyệt theo D47.**
- Alpha: đạt. Cả 5 ảnh cắt có alpha 255, hết quầng; điểm lửng chỉ còn viền khử răng cưa.
- Chồng cặp 50%: hộp pate trùng khít (đóng/mở). Hai trạng thái đệm cùng bề ngang và cùng neo đáy; tấm dựng thấp hơn mong muốn một chút, Dev nâng 25px theo V5.
- Ghép lên tranh: góc nhìn khớp. Màu đệm hơi đậm và xanh hơn đệm vẽ trong tranh (RGB trung bình 167,199,171 so với 187,200,178). Chỉnh bằng tint, hoặc đối chiếu lại khi có nền thật.
- Nét: **không đạt.** Hộp pate có k thật 6,5 nên nét chỉ còn ~1,6px khi hiển thị, trong khi đệm (k 3,6) giữ được ~2,9px. Nguyên nhân ở W7.
- Không chữ: đạt (nhãn chỉ có hình cá và mặt mèo; các nút trong tranh demo chỉ là hình).
- Tỉ lệ: trong cả hai tranh, AI vẽ đồ to hơn D9 (Sữa ~270 so với 190, hộp ~140 so với 85, nhân vật ~640 so với 480, thảm tràn hai mép). Tranh vẫn đọc rõ và dễ thương. Ghép sprite đúng cỡ D9 lên thì hộp và Sữa trông nhỏ.
- Không khí, màu: hai tranh cùng một căn phòng, đúng phong cách bút chì pastel, Sữa đúng `sua_ref`. Lỗi nhỏ: tóc nhân vật xoăn bồng (style.md ghi tóc ngắn tròn); bàn tay hướng dẫn trong `l1_demo_reveal` chỉ vào sofa, không chỉ vào Sữa.

### C. Việc còn lại / cần PM xử lý

**W9.** Chủ dự án duyệt hai tranh và hai ảnh ghép (W5).

**W10. (PM/Dev) V3–V4 không vận hành như dự kiến với đồ nhỏ:** AI vẽ theo bố cục nó tự thấy (mỗi hộp ~35% bề ngang tờ), bỏ qua cỡ px và cỡ ô. Hai cách sửa:
- (a) Giữ cỡ AI hay vẽ, đặt Nét theo k thật: hộp pate cần nét ~19px trong tờ.
- (b) Xếp nhiều thứ vào một tờ để mỗi thứ tự nhỏ đi.

Đề xuất (a): nét viết bằng px là thứ AI làm theo được. Sau đó sửa ô `l1_pate_sheet` trong design-art theo bảng W7. Nếu chọn (a), nên vẽ lại `l1_pate_sheet` với nét 19px (1 lượt).

**W11. (PM/GD) Cỡ hiển thị D9:** tranh demo cho thấy Sữa ~240 và hộp ~110 có thể dễ đọc hơn 190/85. Xem khi duyệt demo.

**W12.** Sau khi duyệt: `player_ref` (chọn kiểu tóc: theo style.md hay theo tranh demo), rồi nền thật, rồi các tờ theo thứ tự ở design-art mục 6. Ghi tay neo `x,y` cho `sua_held`, `ui_hand_pointer`, `ui_hint_paw` sau khi vẽ.

---

## GD / PM chốt (sau vòng 4)

**P6 (W11). Nâng cỡ hiển thị, lý do gameplay:** đồ chạm được phải đủ to cho ngón tay. Trên khung 1024 ngang, màn điện thoại khoảng 390pt, nên vùng chạm tối thiểu 44pt ≈ **115px**. Chốt: hộp pate rộng khoảng **120**, Sữa ngồi cao khoảng **250**. Các đồ chạm được khác trong D9 cũng phải có cạnh ngắn ≥ 115px (nếu hình nhỏ hơn thì Dev nới vùng chạm, không cần vẽ to hơn). Dev cập nhật bảng vị trí và cỡ (D9/V13) theo tranh `l1_demo_start`/`l1_demo_reveal`, vì tranh đã cho tỉ lệ dễ nhìn.

**P7 (W10). Duyệt cách Art 2D đề xuất:** đặt nét theo cỡ AI thực vẽ, rồi vẽ lại tờ hộp pate 1 lượt. Chỉ vẽ lại sau khi chủ dự án duyệt hướng demo.

**P8 (W12). Kiểu tóc nhân vật:** chờ chủ dự án chọn trước khi vẽ `player_ref`.

---

## Chủ dự án duyệt demo (PM ghi lại)

**O1. Nhân vật chính: tóc xoăn bồng như trong demo** (đóng W12/P8). Art 2D sửa mô tả nhân vật ở `style.md` mục 3.

**O2. Sữa thiết kế lại cho giống ảnh `art/ref/owner_sua_ref.png`:** đầu to tròn, lông xù bông như cục bông, mắt to tròn xanh da trời có lòng đen to và chấm sáng, mũi hồng nhỏ, miệng hình chữ ω nhỏ, má hồng, tai nhọn bo đầu với trong tai hồng đào, chân trước mũm mĩm, đuôi bông to. Vẽ lại `sua_ref` theo ảnh này, rồi sửa `style.md` mục 3 cho khớp.

**O3. Màu tươi hơn một chút, giống `art/ref/owner_color_ref.png`.** Chỉ lấy độ tươi và bảng màu từ ảnh này (vẫn pastel bút chì, nhưng bão hoà cao hơn bản demo: xanh bạc hà, hồng, xanh trời, gỗ ấm rõ hơn). Không lấy bố cục hay đồ vật trong ảnh (quyết định bỏ tranh cá, bố cục G1 vẫn giữ). Art 2D sửa phần COLOR trong `style.md` mục 1 và bảng màu mục 2.

**O4. Hướng demo còn lại giữ nguyên.** Sau khi có `sua_ref` mới và màu mới, Art 2D vẽ lại `l1_demo_reveal` để chủ dự án duyệt lần cuối. Tờ hộp pate (P7) vẽ lại sau lần duyệt đó.

---

## Vòng 4b – Art 2D

Đã làm theo O1–O4 và P6–P8. Dùng 2 lượt Codex, không phải vẽ lại lượt nào.

**X1. `art/style.md`:**
- Mục 1, phần COLOR: đổi sang "pastel trong và tươi, bão hoà vừa phải, không bạc màu, không neon" (O3).
- Mục 2: dòng Màu ghi theo `owner_color_ref`. Bảng màu đổi mã cho tươi hơn: kem giấy #FCF1DD, gỗ mật ong #F2C796, nâu caramel #D6A472, hồng đào #F7B9A3, hồng phấn #F8C6CC, vàng bơ #FCE39A, bạc hà #B9DDBE, thêm xanh lá #9DC283 cho lá cây, xanh da trời #B8DAF2, oải hương #D8CCF0.
- Mục 3: Sữa mô tả theo O2 (đầu rất to, lông xù bông, mắt xanh có lòng đen to và chấm sáng, miệng ω, má hồng, tai nhọn bo đầu, chân trước mũm mĩm, đuôi bông to). Nhân vật chính đổi sang tóc xoăn bồng nâu caramel (O1). Các phần khác giữ nguyên.

**X2. `art/out/cats/sua_ref.png` đã vẽ lại** theo `art/ref/owner_sua_ref.png` (1 lượt, đính kèm bằng `-i`, chỉ lấy con mèo). Giữ 3 tư thế: ngồi nhìn thẳng, đi nhìn nghiêng, ngủ cuộn tròn. Đã dọn alpha bằng `clean`: alpha tối đa 254 → 255, điểm lửng 568 nghìn → 15 nghìn; ghép lên nền xanh không thấy quầng.
- So với ảnh của chủ dự án: khớp mắt to xanh với lòng đen to và chấm sáng, miệng ω, má hồng, tai nhọn bo đầu trong hồng, đầu to tròn, chân trước mũm mĩm, đuôi bông to.
- Hơi khác: lông bớt xù hơn ảnh mẫu (mép lông ít túm dài), lòng đen nhỏ hơn một chút. Chấp nhận được cho ảnh tham chiếu.

**X3. `art/out/demo/l1_demo_reveal.png` đã vẽ lại** (1 lượt, ghi đè). Đính kèm 3 ảnh, mỗi ảnh một việc: bản cũ của tranh (chỉ lấy bố cục), `sua_ref` mới (chỉ lấy Sữa), `owner_color_ref` (chỉ lấy độ tươi màu). Bản cũ chép tạm vào `art/out/demo/` để đính kèm, vẽ xong đã xoá.
- Bố cục G1 giữ nguyên, không có tranh cá. Đệm lật, hộp pate mở có hơi thơm, Sữa ngồi bên trái hộp; bong bóng góc trên trái có mặt Sữa.
- Màu: độ bão hoà trung bình 0,22 (bản cũ) → 0,249 (bản mới); `owner_color_ref` là 0,235. Rèm xanh, sofa bạc hà, thảm hồng, gỗ đều rõ và tươi hơn. **Đạt O3.**
- Sữa đúng thiết kế mới (mắt to, miệng ω, đuôi bông). Cỡ gần P6: Sữa cao ~280, hộp rộng ~140.
- Chưa đạt hẳn: Sữa nhìn hơi ra phía người xem thay vì cúi hẳn vào pate; hơi thơm chỉ rõ 2 làn; bàn tay hướng dẫn chỉ vào khoảng trên đầu Sữa chứ chưa chạm. Đều là lỗi nhỏ của tranh duyệt, không vẽ lại.

**X4. Lưu ý.** `art/out/demo/l1_demo_reveal_compose.png` vẫn ghép trên bản tranh cũ. Ảnh cắt `l1_sofa_cushion_*` và `l1_pate_can_*` vẫn là màu cũ, chưa theo O3. Sau khi chủ dự án duyệt, các tờ đệm và hộp pate vẽ lại với bảng màu mới. Tờ hộp pate vẽ lại theo P7 (nét theo k thật, ~19px).

**X5. Việc còn lại:**
- Chủ dự án duyệt lần cuối `l1_demo_reveal` và `sua_ref` mới.
- Sau đó: vẽ lại tờ pate (P7) và tờ đệm với màu mới; `player_ref` tóc xoăn bồng; nền thật; các tờ còn lại.
- Dev cập nhật D9/V13 theo P6.

---

## Chủ dự án góp ý `sua_ref` v2 (PM ghi lại)

**O5. Outline của mèo cần mỏng hơn một chút, nét đậm nhạt tự nhiên hơn** (như bút chì thật: chỗ đậm chỗ nhạt, có chỗ đứt nhẹ, mảnh dần ở đầu nét, không phải một đường đều dày). Art 2D sửa quy tắc nét trong `style.md` mục 1 và vẽ lại `sua_ref`. Nếu quy tắc nét mới ảnh hưởng tới công thức nét theo cỡ ô của Dev (V3–V4), Art 2D ghi rõ để Dev điều chỉnh: mục tiêu là nét ở cỡ hiển thị vẫn đọc rõ nhưng không thô.

---

## Vòng 4c – Art 2D

Làm theo O5. Dùng 2 lượt Codex: lượt 2 là lượt vẽ lại được phép, vì lượt 1 không làm nét mỏng đi.

**Y1. `art/style.md`:**
- Mục 1, dòng Outlines: nét mảnh, đậm nhạt như bút chì thật (đậm hơn ở chỗ khuất, chỗ gập, chỗ chồng nhau; nhạt và nhọn dần ở đầu nét; nét ngắn đứt quãng ở mép lông xù), không phải một đường đều dày kiểu vector. Thêm một dòng về cách vẽ mép lông.
- Mục 2: dòng Nét viền sửa theo đúng ý trên.
- Màu viền giữ nâu ấm #6B4A3A.

**Y2. Vẽ lại `art/out/cats/sua_ref.png`** (đính kèm bằng `-i`: bản v2 để giữ thiết kế; `owner_sua_ref.png` chỉ để tham khảo chất nét). Đã dọn alpha.
- Lượt 1 (v3): nét có đậm nhạt và lông xù hơn nhưng **không mỏng đi**: độ dày nét ở mép ngoài trung vị 8px (v2 là 7px). Không đạt mục tiêu chính, nên vẽ lại.
- Lượt 2 (bản hiện tại): lời giao việc ghi rõ "nét bằng khoảng một nửa ảnh đính kèm, ~3px, chỗ đậm nhất ≤ 5px". Đo theo cùng cách:

| Bản | Nét mép ngoài, trung vị | 25% | 90% |
|---|---|---|---|
| v2 | 7px | 6px | 17px |
| v3 (bỏ) | 8px | 6px | 16px |
| **mới** | **5px** | **4px** | **10px** |

(Số 90% gồm cả chỗ đậm ở chỗ gập và chùm lông.)

**Y3. So cận cảnh:** `art/out/demo/sua_ref_v2_vs_v4_closeup.png` (đầu mèo ngồi, phóng ×2, v2 bên trái, bản mới bên phải).
- Viền đầu và tai mảnh hơn rõ, có chỗ đậm chỗ nhạt, mép lông ở má và đỉnh đầu là nét ngắn mảnh, đứt quãng. Gần chất nét trong ảnh của chủ dự án hơn.
- Thiết kế giữ nguyên: mắt to, lòng đen to, miệng ω, má hồng, tai nhọn bo đầu, 3 tư thế.
- Còn lại: viền mắt vẫn hơi đậm (Codex tự nhận); mèo ngủ bên phải sát mép phải ảnh (cách mép ~2px). Chấp nhận cho ảnh tham chiếu.

**Y4. Ảnh hưởng tới công thức nét của Dev (V3–V4), đề nghị Dev chỉnh:**
- Nét không còn đều, nên cột **Nét** phải hiểu là **độ dày đường viền ngoài chỗ đậm nhất** (= 3k như cũ), không phải độ dày trung bình. Với nét đậm nhạt mới, độ dày trung bình chỉ khoảng 60% chỗ đậm nhất. Ở cỡ hiển thị: đường chính ~3px, chỗ nhạt ~1,5–2px. Vẫn đọc rõ mà không thô.
- Nếu muốn nét ở cỡ hiển thị mảnh hơn nữa, giảm hệ số từ 3k xuống **2,5k**. Không xuống dưới 2k: khi công cụ co ảnh về ×1,5, các đầu nét nhọn và nét lông dưới ~1,5px sẽ mất hẳn.
- Với tờ có k lớn (hộp pate vẽ lại theo P7, k≈6,5 nên nét ~19px), ghi rõ trong lời giao việc: "đường viền ngoài đậm ~19px, nét lông và chi tiết bên trong mảnh hơn". Như vậy nét ngoài đủ dày để đọc mà chi tiết không bị thô.
- Lời giao việc cho Codex nên ghi độ dày bằng px **và** "khoảng một nửa nét trong ảnh đính kèm X" khi có ảnh mẫu. Lượt 1 chỉ ghi px thì AI không làm mỏng đi; lượt 2 ghi kiểu so sánh thì có tác dụng.

---

## Chủ dự án duyệt `sua_ref` (PM ghi lại)

**O6. Duyệt nét mới của Sữa** (bản sau O5). `art/out/cats/sua_ref.png` là ảnh tham chiếu chính thức. Viền mắt hơi đậm và mèo ngủ sát mép phải: chấp nhận.

**Thứ tự tiếp theo** (làm lần lượt để khỏi giẫm file của nhau):
1. **Vòng 5 – Dev:** chốt công thức nét theo kiểu nét mới (Y4), cập nhật cỡ hiển thị theo P6, cập nhật cột Nét/Hiển thị và bảng vị trí trong `design-art-level1.md`, đồng bộ `levels/states-01-10.md` và `levels/levels-01-10.md` (Level 1) với mọi điểm đã chốt.
2. **Vòng 6 – Art 2D:** vẽ lại tờ đệm sofa và tờ hộp pate theo màu mới (O3), nét mới (O5) và số liệu Dev vừa chốt, cắt bằng công cụ, ghép lại lên `l1_demo_reveal`.

---

## Vòng 5 – Dev

Đã đọc W1–W12, P6–P8, O1–O6, X1–X5, Y1–Y4. Đã sửa: `art/design-art-level1.md` (mục 1, 2, 3, ảnh lẻ nền, mọi bảng tờ, mô tả tờ pate, thảm, bướm, bảng vị trí), `tools/codex-draw.mjs`, `tools/sheet_cut.py`, `levels/states-01-10.md`, `levels/levels-01-10.md`. Không sửa `style.md`, `AGENTS.md`, `leveldesign.md` (xem Z7).

### A. Công thức nét cuối

**Z1. Cột Nét** = độ dày **đường viền ngoài ở chỗ đậm nhất** (chỗ khuất, chỗ gập, chỗ chồng nhau), px trong tờ. Phần lớn đường viền chỉ khoảng 60% số này, đầu nét nhọn dần, nét lông và chi tiết bên trong còn mảnh hơn (theo Y4).

**Z2. Hệ số:** Nét = **3k** cho đồ vật và UI (đồ nhỏ cần đọc rõ), **2,5k** cho mèo và nhân vật (nét mảnh theo O5), **không bao giờ dưới 2k**. k = cỡ AI **thực vẽ** ÷ cỡ hiển thị: lấy theo số đo lần vẽ trước nếu có, nếu chưa có thì lấy khoảng 85% ô. Mọi thứ cùng tỉ lệ thật trong một tờ dùng chung k và Nét. Ở cỡ hiển thị: chỗ đậm khoảng 3px (2,5px với mèo, nhân vật), chỗ nhạt 1,5–2px.

**Z3. Lời giao việc** (Y4). `codex-draw.mjs --sheet` giờ tự ghi "viền ngoài chỗ đậm nhất ~N px" cho từng ô, kèm câu giải thích kiểu nét đậm nhạt ở Z1. Thêm tuỳ chọn `--stroke-ref <ảnh>=<tỉ lệ>` để sinh câu "viền ngoài dày khoảng <tỉ lệ> lần viền trong ảnh đính kèm".
- Mẫu nét chuẩn là `sua_ref` đã duyệt (O6): nét mép ngoài trung vị 5px.
- Tỉ lệ ≈ 0,6 × Nét ÷ 5.
- `sheet_cut.py cut` in ra khoảng nét nên có (2,5k–3k, tối thiểu 2k) theo k thật. Nét đo được lệch quá 30% thì sửa ở lượt sau.

### B. Cỡ hiển thị theo P6 (lấy tỉ lệ từ `l1_demo_start` / `l1_demo_reveal`)

**Z4. Cỡ đã đổi** (cũ → mới):

| Nhóm | Thay đổi |
|---|---|
| Đồ vật trong cảnh | đệm 400 → **360** (bằng nửa phải mặt ghế trong tranh); hộp pate 85 → **120**; hơi thơm rộng 30 → **cao 90** (cùng tỉ lệ thật với hộp); hộp các-tông 230 → 260; gối 210 → 235; rèm 420 → 440 |
| Đồng hồ | thân 190 → 200; chim 50 → 45; quả lắc cao 150 → 115 |
| Chậu cây, thảm | chậu cây 170 → 255 (rộng kể cả lá); bướm 70 → 80; thảm 780 → 960 |
| Nhân vật | Sữa ngồi cao 190 → **250**; nhân vật cao 480 → 580 |
| UI | bong bóng 420 → 330; đầu mèo, mặt Sữa 230 → 165; dấu hỏi 70 → 55; tim 80 → 60; nút 💡 110 → **130**; `fx_pop` 160 → 200 |

Giữ nguyên: `sua_held`, `player_hands_lift`, bàn tay, bàn chân, lấp lánh, cá khô.

Vùng chạm: đệm (cạnh ngắn ~95) và hộp pate (~85) nhỏ hơn 115 theo cạnh ngắn, nên code nới vùng chạm (P6). Không cần vẽ to hơn.

**Z5. Bảng vị trí** (design-art mục 6) đã đo lại theo hai tranh. Trừ gối (308, 875), mọi điểm neo đều dịch rõ so với V13:
- Đồng hồ: móc ở (866, 182).
- Hộp các-tông: (220, 1285), đặt trên thảm.
- Hộp pate mở: (650, 1305), trên thảm.
- Sữa: (480, 1290), bên trái hộp.
- Chậu cây: (890, 1345).
- Thảm: mép trên ở (512, 1055).
- Đệm: bulge (710, 900), lifted (710, 885), tức là cao hơn 15px chứ không phải 25px.
- Nhân vật: (490, 1445).

Sơ đồ mục 2 và phần mô tả nền (ảnh lẻ) cũng sửa theo: cửa sổ x≈60–505; thanh rèm y≈175; tường cho đồng hồ x≈740–990; sofa x≈35–990, chân chạm sàn ở y≈1030; chân tường y≈950.

Đã cắt lại tờ đệm và tờ pate hiện có theo cỡ mới (`art/out/level1/`, `anchors.json`, `_check/`). Đã ghép thử lên `l1_demo_reveal`: hộp pate cắt ra trùng cỡ và chỗ với hộp vẽ trong tranh; đệm khớp nửa phải mặt ghế. Các ảnh `demo/*_compose.png` chưa ghép lại.

**Z6. Cỡ ô:** mọi tờ đã chạy `codex-draw.mjs --sheet <tờ> --dry`, cả 15 tờ ra cỡ hợp lệ (1536x1024 hoặc 1024x1536). Ô đã đổi:
- `l1_pate_sheet`: hai ô hộp rộng 640 (Z8).
- `prop_butterfly`: ô `1236,364,300,300` (bướm cùng tỉ lệ thật với chậu cây thì rộng ~204px, cần ô ≥ 284).
- `fx_pop`: ô `1152,640,384,384` (để k ≥ 1,5).

Nét mới của các tờ:

| Tờ | Nét mới |
|---|---|
| hộp các-tông | 5 |
| gối | 8 |
| rèm | 5 |
| đồng hồ, chim, quả lắc | 7 (cùng k ≈ 2,2) |
| chậu cây, bướm | 8 |
| thảm | 5 (thảm vẽ gần hết bề ngang ô để k ≈ 1,5) |
| Sữa | 4 |
| `sua_held` | 5 |
| tay | 4 |
| nhân vật | 4 |
| bong bóng | 6 |
| đầu mèo | 8 |
| dấu hỏi | 8 |
| tim | 11 |
| bàn tay, bàn chân, nút 💡, `fx_pop` | 5 |
| lấp lánh | 8 |
| cá khô | 6 |

### C. Số liệu cho vòng 6 (Art 2D vẽ lại)

**Z7. `l1_cushion_sheet`** (màu mới O3, nét mới O5):
- Ô giữ nguyên: `0,0,1536,512` cho bulge, `0,512,1536,512` cho lifted. Hiển thị rộng 360.
- Lần trước AI vẽ đệm rộng ~1400–1440px, nên k ≈ 4. **Nét 12**: viền ngoài đậm nhất ~12px, phần lớn viền ~7px.
- Lệnh: `node tools/codex-draw.mjs --sheet l1_cushion_sheet --ref art/out/demo/l1_demo_reveal.png,art/out/cats/sua_ref.png --stroke-ref art/out/cats/sua_ref.png=1.4 --redo`. Màu đệm lấy theo đệm trái trong `l1_demo_reveal` (bản màu mới).

**Z8. `l1_pate_sheet`** (P7):
- Ô: hộp đóng `0,0,640,1024`; hộp mở `640,0,640,1024`; hơi thơm `1300,262,236,600`. Lấy theo cỡ AI thực vẽ ở W7 và nới để còn lề 40px.
- Hiển thị: hộp rộng 120, hơi thơm cao 90.
- Lần trước AI vẽ hộp rộng ~550px, nên k ≈ 4,6. **Nét 14** cho hai hộp: viền ngoài đậm nhất ~14px, phần lớn viền ~8px, nét nhãn và chi tiết bên trong mảnh hơn. **Hơi thơm nét 12**, viền caramel nhạt.
- Không dùng 19px như W10 tính: con số đó ứng với hộp hiển thị rộng 85 (k 6,5). Ở cỡ 120 mà nét 19 thì thành 4,1k, quá thô.
- Lệnh: `node tools/codex-draw.mjs --sheet l1_pate_sheet --ref art/out/_sheets/l1_pate_sheet.png,art/out/demo/l1_demo_reveal.png,art/out/cats/sua_ref.png --stroke-ref art/out/cats/sua_ref.png=1.7 --redo`.
- Nếu AI lại vẽ hộp to hơn ô thì công cụ báo "SÁT MÉP Ô". Khi đó sửa ô cho khớp ảnh rồi cắt lại, không cần vẽ lại.

### D. Đồng bộ `levels/` và chỗ khác bị ảnh hưởng

**Z9. `levels/states-01-10.md` Level 1 viết lại:**
- Lớp hiển thị: quả lắc nằm sau thân. Hộp pate chuyển lên trên Sữa sau khi lăn.
- Key mới:
  - đồng hồ 4 ảnh;
  - `l1_rug_flat`, `l1_pillow_white_idle`, `prop_butterfly`;
  - `fx_pop`; âm `l1_sfx_pop_can` → `sfx_pop_can`;
  - `l1_pate_can_steam` (một làn, code sinh 3 bản);
  - `sua_eat_f2`.
- Hộp pate lăn, rơi xuống thảm, nảy (G2). `player_shrug` khi mở hộp trống (G3). `player_surprised` lúc Sữa lộ diện.
- Mục Nhân vật mới (trồi lên từ mép dưới). Thảm cuộn góc trước trái. Rèm chia frame và có dải nắng. Chậu cây chỉ rung lá.
- Danh sách ảnh và bảng đổi tên.

**Z10. `levels/levels-01-10.md` Level 1:**
- Sơ đồ bố cục: hộp các-tông và hộp pate nằm trên thảm.
- Bảng đồ vật: đồng hồ, đệm, hộp pate rơi xuống thảm, bướm đang đậu, góc thảm trước trái.
- Luồng giải. Lần chạm hộp thứ 2: hộp tự lật úp (G6), không phải nhân vật lật hộp.
- Khoảnh khắc lộ diện: Sữa bên trái hộp, nhân vật ngạc nhiên.
- Ghi chú: TÁCH = `sfx_pop_can` + `fx_pop` dùng chung.

**Z11. Level khác:**
- **Level 3:** đã đổi `l1_pillow_white` → `l1_pillow_white_idle` (3 chỗ dùng lại gối).
- **Level 9:** đã đổi `l1_butterfly` → `prop_butterfly`.
- **Level 8:** vẫn có `l8_butterfly` (mới) riêng. GD xem có dùng `prop_butterfly` được không; chưa sửa.
- **Level 10:** chưa có key nào cho tiếng TÁCH. Khi viết, dùng `sfx_pop_can`, `fx_pop`.
- **Mục 0 của states:** `player_hands_lift` sửa thành 1024x1536. Các dòng khác trong mục 0 còn ghi canvas cũ (vd. `ui_speech_bubble` 1024x1024), giờ vẽ theo tờ nên cột cỡ chỉ còn tham khảo; chưa sửa.

**Z12. Chưa sửa, giao lại:**
- **Art 2D** (vòng 6), sửa câu về nét cho khớp Z1–Z2: `style.md` mục 6 bước 3 ("= 3 × cỡ vẽ ÷ cỡ hiển thị") và `AGENTS.md` dòng "Nét viền dày đúng số px ở cột Nét".
- **GD/PM**, trong `leveldesign.md`:
  - mục 6.3 vẫn ghi "dev tô dấu hỏi trắng bằng code" → nay có `ui_question_mark_white`;
  - mục 6.1 tư thế Ăn → nay có khung `_f2`;
  - mục 5.4 ví dụ `sfx_pop_can` nay đã là key thật.

---

## GD / PM (sau vòng 5)

- Đã sửa `leveldesign.md` theo Z12: mục 6.1 tư thế Ăn thêm khung `_f2` và bỏ vẽ kèm bát/hộp; mục 6.3 thay việc tô trắng bằng code bằng `ui_question_mark_white`; mục 5.4 thêm `sfx_pop_can` vào danh sách âm dùng chung.
- `l8_butterfly`: để lại, xét khi làm level 8 (phiên này chỉ làm level 1).

---

## Vòng 6 – Art 2D

Đã đọc O6 và Z1–Z12. Dùng **2 lượt Codex** (mỗi tờ 1 lượt), không phải vẽ lại.

### A. Sửa tài liệu theo Z1–Z3, Z12

**Q1.**
- `AGENTS.md`: dòng "Nét viền dày đúng số px ở cột Nét" thay bằng định nghĩa Z1: số px là viền ngoài ở chỗ đậm nhất, phần lớn viền ~60%, đầu nét nhọn, chi tiết trong mảnh hơn, đậm nhạt như bút chì. Thêm một dòng về câu so sánh với ảnh mẫu nét (`--stroke-ref`).
- `art/style.md` mục 6, bước 3: bỏ "= 3 × cỡ vẽ ÷ cỡ hiển thị". Thay bằng Z1–Z3: cột Nét; Nét = 3k cho đồ vật/UI, 2,5k cho mèo/nhân vật, không dưới 2k; k theo cỡ AI thực vẽ; mẫu nét chuẩn `sua_ref` (5px), tỉ lệ ≈ 0,6 × Nét ÷ 5. Lệnh mẫu có thêm `--stroke-ref`.
- Mục 1 và 2 giữ câu nét mảnh, đậm nhạt (O5).

### B. Vẽ lại hai tờ (màu O3, nét O5, số liệu Z7–Z8)

**Q2. `l1_cushion_sheet`** (lệnh Z7, thêm `l1_cushion_sheet.png` cũ vào `--ref` chỉ để giữ hình dáng; `--note` ghi vai trò từng ảnh: tranh lấy màu, `sua_ref` lấy chất nét, tờ cũ lấy hình dáng).
- Codex giữ gần y hình dáng tờ cũ (cục phồng nhô rõ, đệm lật một tấm), chỉ đổi màu và nét.
- Màu thân đệm trung bình RGB 192,221,191 (cũ 191,214,185). Đệm trái trong `l1_demo_reveal` là 187,218,190: **khớp**.
- Cắt: k = 4,0, cách mép ô 40/66px, alpha 255, hết quầng.
- Chồng 50% (`_check/cushion.png`): cùng bề ngang, cùng neo đáy.

**Q3. `l1_pate_sheet`** (lệnh Z8, `--note` ghi vai trò ảnh: tờ cũ lấy thiết kế và bố cục, tranh lấy màu, `sua_ref` lấy chất nét).
- Lần này AI vẽ hộp nằm trong ô 640 (hộp đóng x 56–630, hộp mở x 666–1217, hơi x 1346–1475). Công cụ báo "sát mép ô" (8–30px) nhưng **không cụt**, nên giữ ô Z8, không phải cắt lại.
- k = 4,8 cho hộp, 5,7 cho hơi thơm. Alpha 255, hết quầng.
- Chồng 50% (`_check/pate_can.png`): hai thân hộp trùng neo và đường đáy, nhưng **hộp đóng to hơn hộp mở ~4%** (rộng 577 so với 554px). Ở cỡ hiển thị 120 thì lệch khoảng 5px. Lúc đổi ảnh có `fx_pop` che (D17) nên chấp nhận. Nếu Dev muốn khít hẳn: cho `l1_pate_can_open` Hiển thị riêng `rộng 125` (cùng nhóm, để công cụ co bù).

### C. Ghép và tự duyệt

**Q4. Ảnh ghép mới:**
- `art/out/demo/l1_demo_reveal_compose.png` (đệm lật, hộp mở, hơi thơm)
- `art/out/demo/l1_demo_start_compose.png` (đệm phồng, hộp đóng)

**Q5. Tự duyệt.**
- **Màu: đạt.** Đệm sprite cùng màu với sofa và đệm trái trong tranh, không còn lệch đậm/xanh như vòng 4. Hộp pate cùng màu và cùng cỡ với hộp vẽ trong tranh: đè lên gần khít.
- **Nét: đạt.** Đo ở mép đáy, viền ngoài phần lớn ~9px trong tờ hộp và ~6px trong tờ đệm, tức **~1,9px và ~1,5px ở cỡ hiển thị**. Chỗ đậm nhất ~3px.
  - Hai đồ cho cảm giác dày như nhau. Không còn chênh 1,6 với 2,9px như W8.
  - Cùng tinh thần mảnh, đậm nhạt của `sua_ref`. Mảnh hơn nét trong tranh demo một chút, nhưng đúng với O5.
  - Còn: nét nhãn mặt mèo trên hộp hơi đậm so với viền ngoài (Codex tự nhận). Ở cỡ 120 vẫn đọc rõ, chưa thô.
- **Vị trí (cho Dev):**
  - Đệm lật ở (710, 885) thấp và dẹt hơn đệm lật vẽ trong tranh: tấm dựng trong tranh cao hơn ~60px. Có thể do bảng vị trí, hoặc do Hiển thị 360 tính theo bề ngang đệm phẳng.
  - Ở cảnh đầu, nắp hộp pate đóng (800, 893) ló lên trên mép đệm phồng. Nếu chưa phải lúc gợi ý thì hộp phải khuất hẳn, cần hạ y hoặc chỉ hiện khi có gợi ý.

### D. Việc còn lại trước khi vẽ hàng loạt level 1

**Q6.**
1. Dev: xem hai điểm vị trí ở Q5 và chênh 4% ở Q3. Chủ dự án/PM: xem hai ảnh ghép Q4 nếu cần.
2. `player_ref` tóc xoăn bồng (O1) theo style.md mục 3: 1 lượt, dọn alpha. Cần có trước hai tờ nhân vật, `player_hands_sheet` và `ui_icons_sheet`.
3. Nền thật `l1_bg_living_room` (tham chiếu `l1_demo_reveal` cho màu, mô tả nền đã sửa ở Z5). Sau đó ghép lại tờ đệm để chắc màu khớp nền thật, không chỉ khớp tranh.
4. Các tờ theo thứ tự design-art mục 6, mỗi tờ dùng `--stroke-ref art/out/cats/sua_ref.png=<0,6 × Nét ÷ 5>` và `--note` ghi vai trò từng ảnh tham chiếu. Ghi tay neo `x,y` cho `sua_held`, `ui_hand_pointer`, `ui_hint_paw` sau khi vẽ.
5. (Đã xong theo mục GD/PM sau vòng 5: `leveldesign.md` và bướm level 8.)

---

## GD / PM (sau vòng 6)

**G8 (Q5). Hộp pate phải khuất hẳn lúc đầu màn.** Theo thang gợi ý, góc hộp chỉ ló ra ở gợi ý 1 (giây thứ 8) hoặc khi chạm nhầm vào đệm. Dev xử lý bằng thứ tự lớp/vị trí, và đệm phồng phải đủ to để che hết hộp.

**P9. Ảnh ghép lên tranh chưa đủ để duyệt đệm sofa**, vì trong tranh đã vẽ sẵn một tấm đệm nên hai tấm chồng lên nhau. Bước tiếp theo trước khi vẽ hàng loạt: vẽ nền thật `l1_bg_living_room` và `player_ref` (tóc xoăn), Dev chỉnh vị trí đệm (Q5) rồi ghép lại lên nền thật. Chờ chủ dự án đồng ý mới làm.

---

## Chủ dự án chốt (PM ghi lại) – thay cho P9

**O7. Art đã ổn, chỉ cần sửa mèo (đã xong). Bỏ bước vẽ nền thử và ghép thử ở P9.** Hai tranh `art/out/demo/l1_demo_start.png` và `art/out/demo/l1_demo_reveal.png` (màu theo `l1_demo_reveal`, Sữa theo `sua_ref` đã duyệt, nhân vật tóc xoăn như demo) là **chuẩn art cuối cùng** của level 1.

**Việc tiếp theo, chạy song song:**
- **Art 2D:** tách toàn bộ asset level 1 theo `design-art-level1.md`, mọi asset phải trông giống hệt trong hai tranh demo.
- **Dev:** làm bản chơi thử level 1 trong `game/`, dùng asset có sẵn và ảnh tạm cho asset chưa có, tự đổi sang ảnh thật khi Art 2D xuất xong.

Ranh giới file: Art 2D ghi `art/out/`, `art/design-art-level1.md`, `art/out/anchors.json` (qua công cụ cắt). Dev ghi `game/`, `.claude/launch.json`, và chỉ đọc `art/`.

---

## Vòng 7 – Art 2D

Đã đọc O7. Đã tách xong toàn bộ asset level 1 (trừ `player_box_on_head` là tùy chọn), theo thứ tự nền → `player_ref` → tờ đồ vật → Sữa, nhân vật → UI. Mỗi tờ cắt ngay bằng `sheet_cut.py` sau khi vẽ, nên `anchors.json` hiện có đủ **41 key**. Chuẩn art: tranh `l1_demo_reveal` (màu) và `l1_demo_start`.

**R1. Cách giao việc.**
- Mỗi lượt đính kèm bằng `-i`: ảnh cắt cận của đúng đồ vật trong tranh (`art/out/_refs/l1_crop_<đồ>.png`), tranh chuẩn, và `sua_ref` làm mẫu nét.
- Lời giao việc gọn: trích đúng mục tờ của design-art, kèm tóm tắt phong cách, câu "**không cần đọc file nào khác** ngoài AGENTS.md", vai trò từng ảnh, và câu "vẽ lại đúng <đồ vật> trong ảnh đính kèm, tách riêng, nền trong suốt".
- Lượt Sữa đính kèm `sua_ref`. Lượt nhân vật đính kèm `player_ref` (vẽ trước, tóc xoăn theo tranh, 3 góc nhìn, đã dọn alpha).

**R2. Ô tờ sửa theo chỗ AI thực vẽ.**
- AI lại vẽ to hơn ô ở hầu hết các tờ: đồng hồ, gối, hộp, chậu cây, tư thế Sữa, hai tờ UI. Cắt theo ô cũ thì vật bị cụt.
- Đã đo khung từng vật và sửa cột Ô trong `design-art-level1.md` cho khớp ảnh đã vẽ, rồi cắt lại (như Z8). Không phải vẽ lại tờ nào.
- Cắt lại từ design-art giờ ra đúng. Nhiều ô còn báo "sát mép ô" (10–35px) nhưng không vật nào bị cụt.

**R3. Chỉnh khi cắt** (không tốn lượt vẽ):
- Neo ghi tay: `sua_held` (513,645, giữa hai nách); `ui_hand_pointer` (76,348, đầu ngón trỏ); `ui_hint_paw` (521,142, đỉnh bàn chân).
- `l1_box_closed`/`l1_box_open_empty` neo ở giữa mép đáy mặt trước hộp (314,788 / 1062,787). Hộp mở để Hiển thị riêng `rộng 321`, bù thân hộp vẽ nhỏ hơn ~4,7%. Ô chồng giờ khít.
- `l1_pate_can_open` để Hiển thị riêng `rộng 120`, bù chênh 4% ở Q3.
- `player_surprised` để `cao 651`, vì khung gồm 3 nét toả trên đầu; người vẫn cao 580 như các tư thế khác.

**R4. Bảng key.** Xong = có file trong `art/out/` và có dòng trong `anchors.json` (nền không có neo, không cần).

| Key | Trạng thái |
|---|---|
| `l1_bg_living_room` | xong (sửa từ `l1_demo_start`, đã xoá mọi sprite và UI) |
| `l1_sofa_cushion_bulge`, `_lifted` | xong (vòng 6) |
| `l1_pate_can_closed`, `_open`, `_steam` | xong (vòng 6, cắt lại ở R3) |
| `l1_wall_clock_closed`, `_open`, `_bird`, `_pendulum` | xong |
| `l1_curtain_closed`, `_open` | xong |
| `l1_pillow_white_idle`, `_flipped` | xong |
| `l1_box_closed`, `l1_box_open_empty` | xong |
| `l1_plant`, `prop_butterfly` | xong |
| `l1_rug_flat`, `_curled` | xong |
| `sua_sit_stare`, `sua_meow_up`, `sua_eat`, `sua_eat_f2` | xong |
| `sua_held`, `player_hands_lift` | xong |
| `player_call`, `player_scratch_head`, `player_surprised`, `player_shrug` | xong |
| `ui_speech_bubble`, `ui_cat_head_dark`, `sua_face_icon`, `ui_question_mark`, `ui_question_mark_white`, `ui_heart` | xong |
| `ui_hand_pointer`, `ui_hint_paw`, `ui_sparkle`, `ui_bulb_button`, `ui_dried_fish`, `fx_pop` | xong |
| `player_ref` (tham chiếu, không vào game) | xong |
| `player_box_on_head` (tùy chọn) | **chưa vẽ**, để tiết kiệm hạn mức; vẽ khi chủ dự án muốn |

**R5. Lượt Codex vòng 7: 14 lượt thành công, 0 lượt vẽ lại.**
- Gồm: nền, `player_ref`, đồng hồ, rèm, gối, hộp, chậu cây, thảm, tư thế Sữa, `sua_held`, đôi tay, nhân vật a, nhân vật b, biểu tượng nhiệm vụ, biểu tượng chung.
- Không tính 1 lượt bị từ chối vì hết hạn mức trước khi PM mở lại.

**R6. Điểm nhỏ đã chấp nhận (không vẽ lại):**
- Nền: vân chì trên sàn hơi đậm.
- Chậu cây: hai lá bên trái rủ hơi thấp xuống mép miệng chậu. Khi code cắt frame `leaves`/`pot` tại miệng chậu, chóp lá có thể dính vào phần chậu; cắt thấp hơn vài px thì một chút mép chậu rung theo lá.
- Rèm mở: hai bó rèm chĩa ra ngoài rộng hơn rèm đóng ~6%.
- Gối lật: dựng đứng, bốn góc vẫn nhọn chứ không "chĩa ngang". Vẫn đọc rõ là gối.
- Thảm cuộn: góc trước trái lật lên kiểu mép giấy hơn là cuộn tròn. Viền thảm màu hồng đậm, không phải nâu (giống tranh).
- Tư thế Sữa: hai tư thế ăn rộng hơn tư thế ngồi, nên chân sau không trùng hẳn chỗ khi đổi ảnh. Tư thế kêu meo có 2 vạch vàng thay cho 2 nét cong.
- Bóng đầu mèo tối xù hơn mặt Sữa một chút. Ô chồng vẫn khớp đường viền chính.
- Đôi tay: ống tay áo chạm mép trái, phải canvas (cố ý). k = 1,22, thấp hơn 1,5 (V22 đã chấp nhận ~1,4).
- Dev xem thêm: ảnh kiểm tra từng nhóm ở `art/out/_check/`, tờ gốc ở `art/out/_sheets/`, ảnh cắt cận ở `art/out/_refs/`.

---

## Vòng 7 – Dev (bản chơi thử Level 1)

### A. Cách chạy

**S1. Mở bản chơi thử.**
- Trong Claude Code: mở trình xem trước với cấu hình **`meo-level1`** (`.claude/launch.json`, chạy `python -m http.server 8080 --bind 127.0.0.1` ở gốc dự án), rồi vào **http://127.0.0.1:8080/game/**.
- Tự chạy: đứng ở `D:\WebGames\Cat3D`, gõ `python -m http.server 8080`, mở cùng địa chỉ trên.
- Phải chạy qua server ở gốc dự án (không mở file trực tiếp): game đọc `art/` và cần server liệt kê được thư mục.
- Cần mạng để tải Phaser 3.80.1 từ cdnjs (dự phòng jsDelivr).
- Trên máy tính, thu cửa sổ trình duyệt hẹp và dài cho giống điện thoại. Khung là 1024x1536 co vừa màn hình; máy dài hơn 2:3 thì nền tự kéo dài trên và dưới (D7).

### B. Đã làm (`game/`)

**S2. Tệp.**

| Tệp | Nội dung |
|---|---|
| `index.html` | Trang chạy game |
| `src/main.js` | Khởi động, co giãn khung, nạp ảnh |
| `src/assets.js` | Dò ảnh thật, rơi về ảnh tạm |
| `src/level1.js` | Toàn bộ màn chơi |
| `src/sfx.js` | Âm thanh |
| `tools/make_placeholders.py` | Sinh ảnh tạm |
| `placeholders/` | Ảnh tạm và `placeholders.json` |
| `audio/` | Chỗ thả file âm thanh thật |

**S3. Luồng chơi theo states/levels Level 1 và leveldesign, không có chữ trên màn hình.**

*Mở màn:* mờ vào; nhân vật bước vào giữa dưới, khum tay gọi rồi lặn xuống. Bong bóng nhiệm vụ (đầu mèo tối, dấu hỏi trắng) bật ra giữa màn rồi thu về cạnh thanh ♥. Chạm bong bóng ở góc thì nó bay ra nhắc lại.

*Đồ vật:*

| Đồ | Thao tác | Phản hồi |
|---|---|---|
| Rèm | Chạm hoặc vuốt | Hai nửa co về hai mép, đổi ảnh mở, dải nắng hiện. Chạm lại thì đóng |
| Đồng hồ | Quả lắc tự đung đưa. Chạm | Quả lắc lắc mạnh rồi tắt dần, cửa mở, chim thò ra gật mỏ 2 lần rồi thụt vào |
| Gối | Chạm | Nhún, lật dựng, nhân vật gãi đầu trồi lên |
| Hộp các-tông | Chạm 3 lần | Lần 1: mở, trống, nhân vật nhún vai. Lần 2: hộp tự lật úp lắc 3 nhịp. Lần 3: đội hộp nếu đã có ảnh, không thì lặp lần 2 |
| Chậu cây | Chạm | Rung, bướm bay một vòng (vỗ cánh bằng scaleX) rồi đậu lại |
| Thảm | Vuốt | Cuộn góc trước trái 0,5 giây |

*Đệm và hộp pate:*
- Chạm đệm: đệm nhún và nhích, góc hộp pate ló ra, bàn tay hướng dẫn vẽ đường vuốt.
- Vuốt đệm lên: đệm lật, hộp pate lăn khỏi mép ghế, rơi xuống thảm, nảy một cái. Bàn tay chỉ vào hộp.
- Hộp pate **khuất hẳn** lúc đầu (G8), chỉ ló ở gợi ý 8 giây hoặc khi chạm nhầm đệm.

*Lộ diện* (chạm hộp pate):
- `fx_pop` + TÁCH, hộp đổi sang mở, **khựng 0,5 giây** (mọi chuyển động dừng).
- Sữa hiện tức thì bên trái hộp; 3 làn hơi thơm lệch pha; nhân vật ngạc nhiên trồi lên; bong bóng tô thành mặt Sữa rồi vỡ thành tim.
- Sữa ngẩng lên kêu meo, rồi ăn (đổi `sua_eat`/`sua_eat_f2` 0,25 giây, gật đầu), có viền sáng nhấp nháy. Bàn tay chỉ vào Sữa.

*Kết màn* (chạm Sữa):
- Cảnh bế chung theo leveldesign 6.2: tối nền, đôi tay trồi lên, Sữa duỗi dài, đung đưa, tim bay, meo. Chạm để bỏ qua.
- Màn thưởng: mặt Sữa, ô ♥ đầu tiên được tô tim, 10 cá khô bay vào góc. Chạm bất kỳ đâu để chơi lại.

*Gợi ý:*
- 8 giây không làm gì: đệm nhích, góc hộp ló ra (sau khi hộp đã lăn xuống thì hộp nảy).
- 16 giây: lấp lánh mỗi 2 giây, kèm một lần bàn tay vẽ đường vuốt.
- Nút 💡: bàn chân mèo làm mẫu thao tác của bước hiện tại.

*Vùng chạm, âm thanh:*
- Mọi vùng chạm có cạnh ít nhất 115px. Sữa có vùng chạm to hơn mèo khoảng 20%. Chạm chỗ trống thì có vòng tròn nhỏ.
- Âm thanh: nếu có `game/audio/<key>.mp3|ogg|wav` thì phát file đó, chưa có thì phát tiếng bíp tổng hợp. Key đúng như states (`sfx_pop_can`, `l1_sfx_cuckoo`, `sua_sfx_meow_long`…).

**S4. Asset tự đổi sang ảnh thật.** Mỗi lần mở trang, game làm như sau:
- Đọc danh sách file trong `art/out/<thư mục>/`, `art/out/anchors.json` và bảng vị trí, cột Hiển thị/Neo trong `art/design-art-level1.md`.
- Key nào có file thật thì dùng ảnh thật với điểm neo trong `anchors.json`. Không có điểm neo thì suy từ cột Neo và Hiển thị.
- Thiếu file thì dùng ảnh tạm. Không cần sửa code khi Art 2D xuất thêm ảnh, chỉ cần tải lại trang.
- Bảng điều khiển trình duyệt in danh sách ảnh thật đang dùng.

**S5. Đã chạy thử** (khung dọc 430x900 và khung ngang). Chơi hết một lượt từ mở màn tới màn thưởng và chơi lại; thử mọi đồ vật, gợi ý 8/16 giây, nút 💡, chạm bong bóng. Không có lỗi trong bảng điều khiển.
- Lỗi đã sửa trong lúc thử: khi chơi lại, nền lấy nhầm khung kéo dài; chậu cây bị thảm che.

### C. Ảnh đang dùng

**S6. Ảnh thật** (tính tới lúc thử): `l1_bg_living_room`, `l1_wall_clock_closed`/`_open`/`_bird`/`_pendulum`, `l1_sofa_cushion_bulge`/`_lifted`, `l1_pate_can_closed`/`_open`/`_steam`.

**S7. Ảnh tạm** (`game/placeholders/`, sinh bằng `python game/tools/make_placeholders.py`):
- **Cắt từ tranh demo:** rèm đóng, gối, hộp đóng, chậu cây, bướm, Sữa ngồi, nhân vật khum tay gọi, bàn tay hướng dẫn, nút 💡, đồng hồ (dự phòng). Cắt bằng cách loang từ mép ô, nét viền nâu chặn lại.
- **Biến thể từ ảnh cắt:**
  - Rèm mở: hai nửa ép lại, có dải buộc.
  - Gối lật: xoay dựng.
  - Hộp mở: vẽ thêm nắp.
  - `sua_meow_up`, `sua_eat`, `sua_eat_f2`: cùng một ảnh, ảnh ăn nghiêng về phải.
  - Ba tư thế nhân vật còn lại: dùng chung ảnh khum tay gọi.
  - `sua_held`, `sua_face_icon`: lấy từ `sua_ref`; `ui_cat_head_dark` là bóng của mặt Sữa.
- **Vẽ hình đơn giản:** thảm phẳng/cuộn, chim, quả lắc (dự phòng), bong bóng, dấu hỏi hồng/trắng, tim, lấp lánh, tia nổ, cá khô, bàn chân, đôi tay bế (hai thanh vàng).
- **Chưa có ảnh nào:** `player_box_on_head`. Lần chạm hộp thứ 3 lặp phản hồi lần 2.
- Nền tạm (từ `l1_demo_reveal`) nay không dùng nữa vì đã có nền thật.

### D. Việc còn lại

**S8.**
1. **Art 2D:** xuất các tờ còn lại theo R4; game tự nhận. Ghi tay neo `x,y` cho `sua_held` (giữa hai nách), `ui_hand_pointer` (đầu ngón trỏ), `ui_hint_paw` (đầu bàn chân). Thiếu thì game đoán: neo nách ở 42% chiều cao, đầu ngón ở giữa đáy.
2. **Dev, khi có ảnh thật:**
   - Thêm toạ độ cắt `leaves`/`pot` của `l1_plant`. Hiện cả chậu rung, chưa tách lá.
   - Xem lại vị trí quả lắc thật (khoen hơi hở dưới đáy thân, nên hạ y khoảng 5–10).
   - Xem đệm lật (Q5: thấp, dẹt so với tranh).
   - Chỉnh điểm nắm của đôi tay bế khi có `player_hands_lift` thật.
3. **Âm thanh thật:** thả file đúng key vào `game/audio/`. Trình duyệt chỉ cho phát tiếng sau lần chạm đầu tiên, nên tiếng gọi lúc mở màn im ở lượt đầu.
4. **Chưa làm** (ngoài phạm vi bản thử): nút tạm dừng, lưu tiến độ, nhạc nền, sang level 2.

---

## Vòng 7b – Art 2D (vẽ lại 2 asset sau chơi thử)

Dùng 2 lượt Codex, không phải vẽ lại.

- **`l1_cushion_sheet` vẽ lại cả tờ.**
  - Chuyển sang tờ dọc 1024x1536 để đệm lật có chỗ dựng cao. Ô mới: `0,0,1024,700` / `0,700,1024,836`, nét 7.
  - `l1_sofa_cushion_lifted` giờ là một tấm đệm dựng nghiêng tựa lưng sofa như trong `l1_demo_reveal`: lộ mặt dưới nhạt, cao ~0,6 bề ngang, mép dưới thẳng làm neo đáy. Có Hiển thị riêng `rộng 360` nên cùng bề ngang với `_bulge`.
  - Màu AI vẽ hơi ngả xanh lơ (RGB 163,214,190, tranh là 187,218,190). Tôi chỉnh màu vùng bạc hà trên tờ bằng script (R +22) cho khớp tranh, ra 181,215,188. Bản AI gốc giữ ở `art/out/_refs/l1_cushion_sheet_raw_v8.png`.
  - `_bulge` giữ cục phồng như cũ.
- **`player_hands_lift` vẽ lại.**
  - Hai cánh tay đi chéo vào trong từ hai góc dưới, cẳng tay ngắn, ống tay áo len vàng tới mép dưới canvas.
  - Hiển thị đổi `cao 900` → **`cao 600`**: khe giữa hai lòng bàn tay ≈ 210px hiển thị, vừa ngực `sua_held` (~195px).
  - Bản cũ giữ ở `art/out/_refs/player_hands_sheet_v7.png`.
- Đã cắt lại cả hai, `anchors.json` đã cập nhật. Dev gỡ phần kéo giãn bằng code; nếu màn dài thì đặt neo đáy của tay ở mép dưới màn.

---

## Chủ dự án góp ý sau khi chơi online (PM ghi lại)

**O8. Đệm sofa bên phải phải trông giống đệm bên trái** (đệm ngồi bình thường trong nền), **không phồng, không có gợi ý nhích lên**. Đệm lật cũng phải cùng màu, cùng chất với đệm trái. Key mới `l1_sofa_cushion_flat` thay cho `l1_sofa_cushion_bulge`.
**G9 (theo O8).** Bỏ mọi gợi ý gắn với đệm: đệm thở, nhích, góc hộp pate ló ra, lấp lánh, tay hướng dẫn tự hiện vẽ đường vuốt. Chỉ giữ nút 💡 khi người chơi tự bấm. Chạm nhầm vào đệm thì đệm nảy nhẹ, không ló hộp. Dev sửa states/levels Level 1 cho khớp.
**O9. Âm thanh dễ thương hơn:** mềm, cao, tròn, ngắn, kiểu đồ chơi; không gắt, không tiếng ồn trắng chói.
**O10. Cảnh bế: lớp đôi tay nằm dưới con mèo** (tay đỡ từ phía sau/dưới, mèo nằm trên).

---

## Vòng 7c – Art 2D (O8: đệm phải giống đệm trái)

Không dùng lượt Codex nào; làm hết bằng script.

- **`l1_sofa_cushion_flat`** (thay `l1_sofa_cushion_bulge`):
  - Cắt từ chính đệm ngồi bên trái trong `l1_bg_living_room` (bg x≈135–525, y≈845–960). Tách nền theo đường viền (flood fill trong viền), lật ngang để góc bo nằm bên phải.
  - Lưu tờ `art/out/_sheets/l1_cushion_flat_sheet.png`, cắt bằng `sheet_cut.py`: neo đáy, Hiển thị `rộng 360` (vừa nửa phải mặt ghế; đệm trái trong nền rộng ~396).
  - Mép viền hơi lởm chởm như nét trong nền.
- **`l1_sofa_cushion_lifted`:** chỉnh bằng script cho khớp đệm trái:
  - Dải mép bạc hà RGB 175,214,186 → ~194,221,193 (đệm trái là 194,221,193).
  - Mặt dưới thành bạc hà nhạt.
  - Phủ thêm vân chì lấy từ đệm trái.
  - Đổi viền nâu sang màu viền xám-xanh của sofa trong nền.
  - Bản trước khi chỉnh: `art/out/_refs/l1_cushion_sheet_v8_before_O8.png`.
- Cả hai cùng nhóm `cushion` (cùng khung 564x335, neo đáy), `anchors.json` đã cập nhật. design-art đã đổi key, bảng tờ, mô tả và bảng vị trí (`l1_sofa_cushion_flat` ở 710, 900).
- File cũ `level1/l1_sofa_cushion_bulge.png` và dòng của nó trong `anchors.json` vẫn còn, chờ Dev đổi sang key mới rồi xoá.

---

**Dev (sau O8/G9):** theo PM duyệt, `l1_sofa_cushion_flat` và `_lifted` đổi Hiển thị thành `rộng 396` (bằng đệm trái), bảng vị trí: flat (705, 955), lifted (705, 940); đã cắt lại hai tờ đệm bằng `tools/sheet_cut.py` và build lại `game/dist/`.

## GD chốt luồng Level 1 mới (theo chủ dự án) – G10

**Bỏ ý hộp pate dưới đệm.** Đệm phải chỉ là đệm phẳng tĩnh (`l1_sofa_cushion_flat`), không tương tác; bỏ `l1_sofa_cushion_lifted` khỏi luồng.

**Mở màn:** trên sofa có **hai gối**: gối trái (vị trí cũ) và gối phải (cùng gối trắng, lật ngang, đặt trên đệm phải). Sau gối trái **thò ra một khúc đuôi Sữa** (đuôi ve vẩy nhẹ).

**Đuổi bắt (Sữa là mèo né tránh có chủ ý ở level này):**
1. Chạm **đuôi hoặc gối trái**: Sữa bật ra hiện rõ **0,2 giây** (dáng ngồi giật mình), rồi **vụt chạy** sang trốn sau **gối phải**, đuôi thò ra sau gối phải. Gối trái lật ra (`_flipped`).
2. Chạm **đuôi hoặc gối phải**: gối phải lật ra, Sữa hiện 0,2 giây rồi vụt chạy trốn **sau rèm**: rèm phồng một chút, đuôi thò ra dưới mép rèm.
3. **Vuốt mở rèm:** Sữa **biến mất hẳn** (vệt chạy vụt ra khỏi màn hình), lộ **hộp pate trên bệ cửa sổ**.
4. Chạm **hộp pate**: hộp trượt khỏi bệ, rơi xuống sàn dưới cửa sổ, nảy, **"TÁCH"** bật nắp, khựng 0,5 giây, **Sữa đã ngồi sẵn cạnh hộp** (như cũ: meo dài, cúi ăn). Chạm Sữa → cảnh bế → thưởng.

**Làm khác thứ tự:** chỗ trốn kế tiếp đã bị mở sẵn (gối phải đã lật trước, hoặc rèm đã mở trước) thì Sữa vụt chạy ra khỏi màn hình và **biến mất luôn**, không trốn nữa. Rèm mở bất cứ lúc nào cũng lộ hộp pate; chạm hộp lúc nào cũng thắng (kể cả khi Sữa còn đang trốn: Sữa biến mất rồi xuất hiện cạnh hộp như cũ).

**Gợi ý:** không có gợi ý tự động trước khi lộ hộp pate. Nút 💡: chỉ vào chỗ Sữa đang trốn (đuôi), hoặc vẽ đường vuốt trên rèm nếu Sữa đã ở sau rèm / đã biến mất. Sau khi lộ hộp: tay hướng dẫn chỉ hộp như cũ.

**Đồ đánh lừa còn lại:** hộp các-tông, đồng hồ, chậu cây + bướm, thảm (giữ nguyên).

**Asset mới cần vẽ (Art 2D):** `sua_tail_peek` (khúc đuôi bông thò ra, gốc đuôi ở mép ảnh để đặt sau gối/rèm), `sua_run` (Sữa vụt chạy nhìn nghiêng, 4 chân duỗi, tai cụp sau, kèm 2–3 vệt gió). Gối phải dùng lại `l1_pillow_white_idle`/`_flipped` lật ngang. Bệ cửa sổ đã có trong nền.

---

## Vòng 7d – Art 2D (G10: đuôi thò ra, Sữa chạy vụt)

- Tờ mới `sua_extra_sheet` (1536x1024), vẽ 1 lượt Codex, không phải vẽ lại. Đính kèm `sua_ref` và tờ tư thế Sữa để giữ đúng nhân vật, màu, nét.
- `sua_tail_peek`: khúc đuôi bông cong dấu hỏi, gốc cắt phẳng ở đáy. Neo đáy = gốc đuôi, Hiển thị `cao 120`.
- `sua_run`: chạy nhìn nghiêng sang phải, 4 chân duỗi, tai cụp sau, mắt hoảng, đuôi bay sau, 3 vệt gió nâu nhạt. Neo đáy, Hiển thị `rộng 330`.
- Đã cắt bằng công cụ, `anchors.json` đã cập nhật. design-art có thêm 2 dòng trong bảng key và mục 5.9b (bảng tờ + mô tả). Không thêm bảng vị trí vì code đặt theo gối/rèm.

---

## GD chốt thêm (sau bản online 5) – G11

- Sữa chạy hướng nào thì quay mặt về hướng đó (cả lúc giật mình 0,2 giây trước khi chạy).
- Chạm hộp pate trên bệ: hộp bay ra giữa màn hình, phóng to, lơ lửng. Chạm lần nữa: TÁCH, Sữa xuất hiện ngồi trên sàn, hộp mở bay dần xuống chỗ cạnh Sữa. Bỏ đoạn trượt/rơi/lăn.
- Rèm đóng mở thoải mái khi hộp còn trên bệ (đã làm ở bản 5).

---

## Vòng 7e – Art 2D (vẽ lại `sua_meow_up`)

- Vẽ lại 1 lượt Codex vào tờ riêng `sua_meow_sheet` (đính kèm `sua_ref`, `sua_sit_stare`). Codex trả ảnh 1254x1254, nên ô ghi theo cỡ thật.
- Tư thế mới: Sữa ngồi y như `sua_sit_stare`, hai chân trước đặt đều trên sàn, đuôi bông quấn bên trái, mặt hướng phải; đầu ngẩng lên, mắt nhắm híp, miệng mở meo, 3 nét cong cạnh miệng.
- Hiển thị `cao 240`, để bề ngang thân dưới khớp `sua_sit_stare`. Cắt chung nhóm `sua_pose` với tờ tư thế cũ, nên cùng khung và neo đáy.
- `anchors.json` đã cập nhật. Dòng `sua_meow_up` cũ đã bỏ khỏi bảng `sua_poses_a_sheet`.

---
