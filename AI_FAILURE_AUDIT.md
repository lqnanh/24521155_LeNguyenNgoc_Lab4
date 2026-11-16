# AI_FAILURE_AUDIT.md - Lab 4

## 1.1 

1. NavLink dùng className="nav-link" cố định, dựa vào class active thư viện tự gắn.
   Sửa: đổi thành className={({ isActive }) => ...} theo project-rules 1.1 mục 2.

2. Các route khai báo ngang hàng, không có Layout và <Outlet />, /people/:personId không nằm trong /people`.
   Sửa: lồng route theo T-05: / → Layout, bên trong people → PeopleLayout, people/:id → PersonDetail.

3. Không có route *, gõ địa chỉ không tồn tại thì phần nội dung trắng.
   Sửa: thêm Route path="*"> hiện trang "Không tìm thấy trang".

4. PeopleLayout tự import dữ liệu people, không nhận qua prop, lệch contract slide 23 PeopleLayout({ people }).
   Sửa: App.jsx import people và truyền <PeopleLayout people={people} />.

5. Khung chờ (skeleton) chỉ có role="status", thiếu aria-busy="true" và aria-live="polite" theo project-rules 1.1 mục 5.
   Sửa: thêm aria-busy="true" aria-live="polite" vào thẻ ngoài của PersonDetailSkeleton.

6. PersonDetailPage tự import people, không nhận qua prop, lệch contract slide 23 PersonDetail({ people }).
   Sửa: PersonDetailPage nhận { people } qua prop, App.jsx truyền <PersonDetailPage people={people} />.

7. Bỏ dòng favicon khỏi index.html mà không thay bằng gì, Chrome tự tìm /favicon.ico nên Console báo lỗi 404.
   Sửa: thêm <link rel="icon" href="data:," /> vào <head> của index.html để khai báo icon rỗng.

## 1.2

8. Viết lại toàn bộ App.jsx theo đoán: bọc thêm BrowserRouter (main.jsx đã có, lồng 2 router sẽ lỗi), import PeoplePage đã xoá, làm mất route lồng people/:id, lazy + Suspense và prop people.
   Sửa: giữ nguyên App.jsx cũ, chỉ thêm import FormPage và <Route path="form" element={<FormPage />} />.

9. Thay toàn bộ NavBar.module.css: chữ #1f2937 trên nền header #1e3a8a gần như không đọc được (sai tương phản WCAG), đổi tên class linkActive thành active.
   Sửa: giữ nguyên NavBar.module.css cũ, NavBar.jsx chỉ đổi sang lặp mảng NAV_LINKS và thêm link "Biểu mẫu", vẫn dùng styles.linkActive.
