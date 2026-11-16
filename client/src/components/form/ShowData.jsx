import { useId } from "react";
import styles from "./ShowData.module.css";

const MASK = "••••••••";

function formatValue(value) {
  const text = String(value ?? "").trim();
  return text === "" ? "(trống)" : text;
}

function ShowData({
  data,
  labels = {},
  secretFields = [],
  title = "Dữ liệu đã gửi",
}) {
  const titleId = useId();
  const entries = Object.entries(data);

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      <dl className={styles.list}>
        {entries.map(([key, value]) => (
          <div key={key} className={styles.row}>
            <dt className={styles.term}>{labels[key] ?? key}</dt>
            <dd className={styles.value}>
              {secretFields.includes(key) ? (
                <>
                  <span aria-hidden="true">{MASK}</span>
                  <span className={styles.visuallyHidden}>Đã ẩn</span>
                </>
              ) : (
                formatValue(value)
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default ShowData;
