import { NavLink } from "react-router";
import styles from "./NavBar.module.css";

function getLinkClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.linkActive}` : styles.link;
}

export default function NavBar() {
  return (
    <nav className={styles.nav} aria-label="Menu chính">
      <ul className={styles.list}>
        <li>
          <NavLink to="/" end className={getLinkClass}>
            Trang chủ
          </NavLink>
        </li>
        <li>
          <NavLink to="/people" className={getLinkClass}>
            Danh bạ
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
