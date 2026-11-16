import { Outlet } from "react-router";
import styles from "./PeopleLayout.module.css";

export default function PeopleLayout() {
  return (
    <section className={styles.layout}>
      <h1>Bạn đang ở khung Danh bạ</h1>
      <Outlet />
    </section>
  );
}
