import { Link } from "react-router";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <section className={styles.page}>
      <h1>Không tìm thấy trang</h1>
      <p>Địa chỉ bạn nhập không tồn tại.</p>
      <Link to="/" className={styles.homeLink}>
        Về Trang chủ
      </Link>
    </section>
  );
}
