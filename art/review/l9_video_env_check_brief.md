KIỂM TRA MÔI TRƯỜNG TẠO VIDEO (không tạo nội dung). Việc chỉ là kiểm tra và báo cáo, không vẽ ảnh, không làm video.

Ràng buộc bắt buộc:
- **Không gọi bất kỳ dịch vụ tính phí nào**, không gọi API tạo ảnh/video, không gọi `image_gen`, không đăng nhập, không cài đặt gì, không tải gì từ mạng, không sửa cấu hình.
- Chỉ được ghi file trong `art/out/_logs/` (file thử). Không sửa file nào khác.

Hãy kiểm và báo cáo từng mục, mỗi mục ghi rõ **DÙNG ĐƯỢC / KHÔNG / CẦN CÀI-CẤU HÌNH** kèm bằng chứng (lệnh đã chạy và kết quả rút gọn):

1. **Chạy lệnh:** chạy được lệnh shell không? Shell gì, hệ điều hành gì, thư mục làm việc. Chế độ sandbox / quyền phê duyệt hiện tại.
2. **Ghi file:** tạo file `art/out/_logs/codex_env_write_test.txt` (nội dung "ok"), đọc lại, rồi báo kết quả. Thử ghi ra ngoài thư mục dự án (ví dụ thư mục tạm của hệ thống) có bị chặn không (chỉ thử, không để lại file rác nếu ghi được).
3. **Mạng:** có truy cập mạng không (thử một lệnh không tốn phí, ví dụ phân giải tên miền hoặc HEAD tới https://example.com với thời gian chờ ngắn). Không gọi API dịch vụ AI.
4. **FFmpeg / công cụ video cục bộ:** kiểm `ffmpeg -version`, `ffprobe -version` (trong PATH và các chỗ thường gặp), Python có không và có các gói `cv2`, `imageio`, `imageio_ffmpeg`, `moviepy`, `PIL` không; Node có không. Ghi phiên bản.
5. **Công cụ tạo ảnh/video AI của bạn:** liệt kê đúng tên mọi công cụ (tool) bạn đang có, gồm công cụ tải động, skill, plugin đã bật, MCP server đang kết nối. Với từng cái liên quan ảnh/video: làm được gì (ảnh tĩnh, sửa ảnh, video), có cần tài khoản/khoá riêng không. **Chỉ đọc mô tả, không gọi.**
6. **MCP server:** liệt kê MCP server đang cấu hình/kết nối và công cụ của chúng (đọc danh sách, không gọi công cụ tạo nội dung).
7. **Biến môi trường khoá API** liên quan video/ảnh (chỉ báo CÓ hay KHÔNG theo tên biến, **không in giá trị**): ví dụ OPENAI_API_KEY, RUNWAY_API_KEY, KLING*, REPLICATE_API_TOKEN, FAL_KEY, LUMA*, STABILITY*, GOOGLE_API_KEY.
8. **Kết luận:** những cách làm video đi bộ của mèo có thể dùng **ngay** trong môi trường này; và những gì **cần cài hoặc cấu hình thêm** để có công cụ tạo video bằng AI (nêu cụ thể: plugin nào, gói nào, khoá nào). Nói rõ cách nào sẽ tính phí.

Tin nhắn cuối: bảng tóm tắt 8 mục (Mục | Trạng thái | Bằng chứng ngắn), rồi phần Kết luận.
