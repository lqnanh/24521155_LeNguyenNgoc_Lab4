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
