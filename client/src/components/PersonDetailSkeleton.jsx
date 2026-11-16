import styles from "./PersonDetailSkeleton.module.css";

export default function PersonDetailSkeleton() {
  return (
    <article
      className={styles.skeleton}
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <span className={styles.srOnly}>Đang tải thông tin chi tiết…</span>

      <span className={`${styles.bar} ${styles.titleBar}`} aria-hidden="true" />

      <span className={styles.rows} aria-hidden="true">
        <span className={`${styles.bar} ${styles.rowBar}`} />
        <span className={`${styles.bar} ${styles.rowBarShort}`} />
      </span>
    </article>
  );
}
