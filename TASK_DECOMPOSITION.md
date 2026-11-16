# TASK_DECOMPOSITION.md - Lab 4

## Block 1 - Setup (0-40 phút)
- [ ] T-00: Tạo project Vite + React 19, cài react-router v7
- [ ] T-01: Tạo project-rules.md, TASK_DECOMPOSITION.md, AI_FAILURE_AUDIT.md, .env.example, thêm .env vào .gitignore
- [ ] T-02: Commit "chore: scaffold lab 4 multi-route SPA"
- [ ] T-03: Commit "docs: define project rules and task decomposition"

## 1.1
- [ ] T-04: Tạo dữ liệu people (lấy từ Lab 3 exc2), mỗi người có id, name, role
- [ ] T-05: Dựng router trong App.jsx: route "/" → Layout, route lồng "people" → PeopleLayout, "people/:id" → PersonDetail
- [ ] T-06: Viết PeopleLayout: nav có NavLink tô màu khi active, main chứa Outlet
- [ ] T-07: CSS Grid minmax(280px, 1fr) 2fr, xuống 1 cột ở 375px
- [ ] T-08: Commit "feat: router layout"
- [ ] T-09: Viết PersonDetail: useParams + find, không thấy thì hiện 404 role="alert", có thì hiện dl/dt/dd
- [ ] T-10: Tải PersonDetail bằng React.lazy + Suspense, skeleton cùng kích thước, có aria-busy/aria-live
- [ ] T-11: Kiểm tra: Console không có warning, id sai thì ra 404, reload trang vẫn đúng
- [ ] T-12: Commit "feat: detail route handling"
