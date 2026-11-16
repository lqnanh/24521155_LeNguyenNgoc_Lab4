import { NavLink } from "react-router";
import styles from "./NavBar.module.css";

const NAV_LINKS = [
  { id: "home", to: "/", label: "Trang chủ", end: true },
  { id: "people", to: "/people", label: "Danh bạ", end: false },
  { id: "form", to: "/form", label: "Biểu mẫu", end: false },
];

function getLinkClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.linkActive}` : styles.link;
}

export default function NavBar() {
  return (
    <nav className={styles.nav} aria-label="Menu chính">
      <ul className={styles.list}>
        {NAV_LINKS.map((link) => (
          <li key={link.id}>
            <NavLink to={link.to} end={link.end} className={getLinkClass}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
