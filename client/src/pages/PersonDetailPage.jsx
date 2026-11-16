import { useParams } from "react-router";
import styles from "./PersonDetailPage.module.css";

export default function PersonDetailPage({ people }) {
  const { id } = useParams();
  const person = people.find((item) => item.id === id);

  if (!person) {
    return (
      <p className={styles.notFound} role="alert">
        404: Không tìm thấy người này
      </p>
    );
  }

  return (
    <article className={styles.detail}>
      <h2 className={styles.title}>Thông tin chi tiết</h2>

      <dl className={styles.list}>
        <div className={styles.row}>
          <dt className={styles.term}>Tên</dt>
          <dd className={styles.value}>{person.name}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.term}>Vai trò</dt>
          <dd className={styles.value}>{person.role}</dd>
        </div>
      </dl>
    </article>
  );
}
