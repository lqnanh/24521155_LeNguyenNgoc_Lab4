import { NavLink, Outlet } from "react-router";
import styles from "./PeopleLayout.module.css";

function getLinkClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.linkActive}` : styles.link;
}

export default function PeopleLayout({ people }) {
  return (
    <section className={styles.layout} aria-labelledby="people-title">
      <h1 id="people-title" className={styles.title}>
        Danh bạ
      </h1>

      <nav className={styles.sidebar} aria-label="Danh sách người">
        <ul className={styles.list}>
          {people.map((person) => (
            <li key={person.id}>
              <NavLink to={`/people/${person.id}`} className={getLinkClass}>
                {person.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <section className={styles.content} aria-label="Nội dung chi tiết">
        <Outlet />
      </section>
    </section>
  );
}
