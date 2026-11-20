# Hướng dẫn đăng "Kho bản vẽ" lên Cloudflare Pages (miễn phí)

Bộ file:
- `index.html` – ứng dụng + thông tin người tạo + bộ đếm truy cập
- `functions/api/visit.js` – máy đếm lượt truy cập (Cloudflare Pages Function)

## Cách 1 – Đăng nhanh (chưa có bộ đếm trên trang)
1. Vào https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
2. Đặt tên dự án (ví dụ `kho-ban-ve`), kéo thả thư mục chứa `index.html`, bấm **Deploy**.
3. Link dạng `https://kho-ban-ve.pages.dev`. Ứng dụng chạy đủ; dòng thống kê trong chân trang sẽ tự ẩn.

## Cách 2 – Có bộ đếm lượt truy cập hiển thị trên trang
Cần đăng bằng GitHub hoặc Wrangler để chạy được thư mục `functions`:
1. Tạo repo GitHub, đưa `index.html` và thư mục `functions/` vào (đúng cấu trúc như trong zip).
2. Cloudflare → Workers & Pages → Create → Pages → **Connect to Git** → chọn repo. Build command để trống, output directory: `/`.
3. Tạo KV: **Storage & Databases → KV → Create** (tên `visits`).
4. Vào dự án Pages → **Settings → Bindings → Add → KV namespace**: Variable name **`VISITS`**, chọn KV vừa tạo (áp cho Production). Deploy lại.
Bộ đếm hiển thị: lượt truy cập hôm nay, tổng lượt, số người dùng (tính theo trình duyệt). KV không đếm tuyệt đối chính xác khi nhiều người vào cùng lúc, nhưng đủ dùng cho trang nhỏ.

## Cách 3 – Thống kê chi tiết bằng Cloudflare Web Analytics (miễn phí, không cookie)
1. Cloudflare → **Analytics & Logs → Web Analytics → Add a site**, chọn hostname `…pages.dev`.
2. Lấy `token` trong đoạn mã Cloudflare đưa.
3. Mở `index.html`, tìm `CF_BEACON_TOKEN=''` rồi dán token vào giữa hai dấu nháy, đăng lại.
Xem số người truy cập, quốc gia, trang, thiết bị… ngay trong dashboard Cloudflare. Có thể dùng cùng Cách 2.

## Lưu ý
- Ứng dụng xử lý bản vẽ trên máy người dùng; dữ liệu lưu trong trình duyệt (IndexedDB), không gửi lên server.
- Tính năng "đọc chữ bằng AI" chỉ có trong Claude, không chạy trên web này (người dùng gõ mô tả tay).
- Thư viện đọc PDF tải từ cdnjs.cloudflare.com nên cần có mạng khi dùng.
