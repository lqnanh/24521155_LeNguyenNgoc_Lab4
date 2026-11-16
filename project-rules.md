# project-rules.md - Lab 4

## Quy tắc chung
1. Chỉ viết component dạng hàm, không viết class.
2. Giá trị mặc định đặt trong tham số hàm, không dùng defaultProps.
3. Không dùng thư viện deprecated: React Router v5, Material-UI v4, react-media, typeface-roboto.
4. Không viết style trực tiếp (style={{...}}). Giao diện nằm trong CSS Module, bố cục dùng CSS Grid và @media.
5. Khi lặp danh sách, dùng id làm key, không dùng số thứ tự.
6. Dùng thẻ có ý nghĩa (nav, main, section, dl/dt/dd). Không dùng div nếu không cần.
7. Mọi nút có type="button" (trừ nút submit). Nút chỉ có icon phải có aria-label.
8. Không dùng alert(). Lỗi hiện bằng phần tử có role="alert".
9. Giao diện chạy tốt ở 375px: không cuộn ngang, có viền khi focus bằng bàn phím.

## 1.1
1. Chỉ dùng React Router v7 (gói react-router): Routes, Route element={...}, Outlet, NavLink. Không dùng Switch, Redirect, exact, component=, activeClassName.
2. Link đang chọn được tô màu bằng className={({ isActive }) => ...}.
3. Lấy id bằng useParams(). Không tìm thấy người thì hiện 404 với role="alert", không để trang trắng.
4. Thông tin chi tiết hiển thị bằng dl/dt/dd.
5. Trang chi tiết tải bằng React.lazy và bọc trong Suspense. Skeleton phải cao bằng nội dung thật (không giật layout), có aria-busy="true" và aria-live="polite".
6. Không dùng useState('view') để chuyển màn hình. Mọi màn hình đều đi qua URL.

## 1.2
1. Không dùng useEffect để kiểm tra lỗi hay đồng bộ dữ liệu giữa các ô. Lỗi tính ngay trong lúc render: const errors = validateForm(values).
2. validateForm là hàm thuần (cùng đầu vào luôn ra cùng kết quả), nằm trong file riêng, trả về object lỗi theo tên ô. isValid = Object.keys(errors).length === 0.
3. Dữ liệu biểu mẫu đi qua FormContext (createContext + useFormContext). InputField tự lấy value/error từ context, không truyền props qua nhiều tầng.
4. Kiểm tra chéo giữa các ô (Nhập lại mật khẩu phải giống Mật khẩu) cũng nằm trong validateForm, không dùng useEffect.
5. InputField dùng useId() để nối label với input. Không tự đặt id bằng tay hay Math.random().
6. Ô có lỗi phải có aria-invalid="true" và aria-describedby trỏ tới dòng lỗi. Dòng lỗi có role="alert".
7. Chỉ hiện lỗi sau khi người dùng rời ô hoặc đã bấm Gửi. Trạng thái "đã rời ô / đã gửi" là state bình thường, không dùng useEffect.
8. Gửi biểu mẫu không tải lại trang (preventDefault). Còn lỗi thì không hiện ShowData và đưa focus về ô sai đầu tiên.
9. ShowData hiển thị bằng dl/dt/dd, không in JSON.stringify. Không hiện mật khẩu ra màn hình.

## 1.3
1. Contract API cố định: GET /api/messages/:forum (200, mảng tin nhắn) và POST /api/messages/:forum (body { author, text }, 201 trả tin nhắn mới, 400 { error } nếu sai). Client và server đều theo đúng contract này.
2. Chỉ có 3 kênh: nasa, esports-tribunal, notNasa. Kênh khác trả 404 { error }. Đường dẫn không tồn tại trả 404 dạng JSON.
3. Tin nhắn có dạng { id, author, text, timestamp }. id sinh bằng crypto.randomUUID(), timestamp là chuỗi ISO.
4. Không viết cứng URI, cổng hay bí mật trong code. Server đọc process.env (PORT, CLIENT_ORIGIN, SIMULATED_DELAY_MS), client đọc import.meta.env.VITE_API_URL. Có .env.example, .env nằm trong .gitignore.
5. CORS chỉ cho phép CLIENT_ORIGIN, không mở cors() cho mọi nguồn.
6. Server dùng async/await, mọi route bắt lỗi bằng try/catch, không callback kiểu cũ, không có unhandled promise rejection.
7. useForumMessages dùng AbortController tạo trong useEffect, cleanup gọi controller.abort(). Không dùng cờ didCancel. Dependency array của useEffect phải đúng và đủ, không gây vòng lặp tải lại.
8. Sau khi abort không được setState (kiểm tra signal.aborted trong try/catch/finally). AbortError không coi là lỗi. Kiểm tra res.ok trước khi đọc dữ liệu, lỗi thật phải hiện ra giao diện.
9. Kênh đang xem nằm trên URL (/forum/:forum). Tin nhắn hiển thị bằng dl, mỗi tin dùng <React.Fragment key={msg.id}>, không dùng index làm key.
10. Kiểm tra dữ liệu gửi tin nhắn giống hệt nhau ở client và server (bắt buộc, không toàn khoảng trắng, text tối đa 500 ký tự). Client tính lỗi trong render, không dùng useEffect.
