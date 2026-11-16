import { NavLink } from "react-router";

export default function NavBar() {
  return (
    <nav className="nav" aria-label="Menu chính">
      <ul className="nav-list">
        <li>
          <NavLink to="/" end className="nav-link">
            Trang chủ
          </NavLink>
        </li>
        <li>
          <NavLink to="/people" className="nav-link">
            Danh bạ
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
