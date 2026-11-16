# TASK_DECOMPOSITION.md - Lab 4

## Block 1 - Setup (0-40 phút)
- [ ] T-00: Tạo project Vite + React 19, cài react-router v7
- [ ] T-01: Tạo project-rules.md, TASK_DECOMPOSITION.md, AI_FAILURE_AUDIT.md, .env.example, thêm .env vào .gitignore

## 1.1
- [ ] T-02: Tạo dữ liệu people (lấy từ Lab 3 exc2), mỗi người có id, name, role
- [ ] T-03: Dựng router trong App.jsx: route "/" → Layout, route lồng "people" → PeopleLayout, "people/:id" → PersonDetail
- [ ] T-04: Viết PeopleLayout: nav có NavLink tô màu khi active, main chứa Outlet
- [ ] T-05: CSS Grid minmax(280px, 1fr) 2fr, xuống 1 cột ở 375px
- [ ] T-06: Viết PersonDetail: useParams + find, không thấy thì hiện 404 role="alert", có thì hiện dl/dt/dd
- [ ] T-07: Tải PersonDetail bằng React.lazy + Suspense, skeleton cùng kích thước, có aria-busy/aria-live
- [ ] T-08: Kiểm tra: Console không có warning, id sai thì ra 404, reload trang vẫn đúng

## 1.2
- [ ] T-09: Thêm route "/form" trong RootLayout, thêm link "Biểu mẫu" vào NavBar (tô màu khi active)
- [ ] T-10: Viết FormContext.js: createContext + useFormContext, báo lỗi rõ nếu dùng ngoài Provider
- [ ] T-11: Viết validateForm.js: hàm thuần kiểm tra Họ tên, Email, Tuổi, Mật khẩu, Nhập lại mật khẩu (kiểm tra chéo)
- [ ] T-12: Viết SimpleForm.jsx: giữ values, tính errors và isValid ngay trong render, đưa xuống qua FormContext.Provider
- [ ] T-13: Viết InputField.jsx: useId nối label-input, lấy value/error từ context, aria-invalid, aria-describedby, lỗi có role="alert"
- [ ] T-14: Chỉ hiện lỗi sau khi rời ô hoặc đã bấm Gửi (state touched/submitted, không dùng useEffect)
- [ ] T-15: Dùng InputField cho đủ 5 ô trong SimpleForm, thêm nút Gửi
- [ ] T-16: Viết ShowData.jsx: hiện dữ liệu bằng dl/dt/dd, nhãn tiếng Việt, che mật khẩu
- [ ] T-17: Xử lý Gửi: preventDefault; còn lỗi thì focus ô sai đầu tiên; hợp lệ thì hiện ShowData + thông báo thành công
- [ ] T-18: Nút "Làm lại": xoá biểu mẫu, ẩn ShowData và lỗi
- [ ] T-19: Kiểm tra: Console không có warning, Tab đi hết biểu mẫu, bảng Accessibility thấy aria-invalid/aria-describedby, Profiler thấy mỗi lần gõ chỉ render 1 lần
