import { Outlet } from "react-router";
import NavBar from "../components/NavBar.jsx";
import styles from "./RootLayout.module.css";

export default function RootLayout() {
  return (
    <>
      <header className={styles.header}>
        <NavBar />
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}
