# AI_FAILURE_AUDIT.md - Lab 4

## 1.1 - Prompt 1 (dữ liệu và các trang)

1. NavLink dùng `className="nav-link"` cố định, dựa vào class `active` thư viện tự gắn.
   Sửa: đổi thành `className={({ isActive }) => ...}` theo project-rules 1.1 mục 2.

2. Toàn bộ CSS dồn vào `index.css` dùng chung, không dùng CSS Module.
   Sửa: tách CSS mỗi component ra file `*.module.css` riêng, `index.css` chỉ giữ phần chung.

3. Các route khai báo ngang hàng, không có Layout và `<Outlet />`, `/people/:personId` không nằm trong `/people`.
   Sửa: lồng route theo T-05: `/` → Layout, bên trong `people` → PeopleLayout, `people/:id` → PersonDetail.

4. Không có route `*`, gõ địa chỉ không tồn tại thì phần nội dung trắng.
   Sửa: thêm `<Route path="*">` hiện trang "Không tìm thấy trang".

5. Không có kiểu viền focus bàn phím, viền mặc định khó thấy trên nền xanh đậm.
   Sửa: thêm style `:focus-visible` cho link menu với viền tương phản rõ.

6. Không biết project thật: bảo xoá `src/assets/react.svg` đã không còn, bỏ sót `index.html` trỏ tới `/favicon.svg` đã xoá (Console báo 404).
   Sửa: chỉ xoá `App.css`, bỏ dòng favicon trong `index.html`, đổi `lang="vi"` và `title`.

7. Đặt tên tham số URL là `personId`, lệch với contract trên slide (`id`).
   Sửa: đổi path thành `people/:id` và dùng `const { id } = useParams()`.
