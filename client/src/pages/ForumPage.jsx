import { NavLink, useParams } from 'react-router';
import { FORUMS, findForum } from '../forums.js';
import styles from './ForumPage.module.css';

function channelClassName({ isActive }) {
  return isActive ? `${styles.channelLink} ${styles.channelLinkActive}` : styles.channelLink;
}

export default function ForumPage() {
  const { forum: forumId } = useParams();
  const forum = findForum(forumId);

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Diễn đàn</h1>

      <nav aria-label="Chọn kênh">
        <ul className={styles.channelList}>
          {FORUMS.map((item) => (
            <li key={item.id}>
              <NavLink to={`/forum/${item.id}`} className={channelClassName}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {forum ? (
        <p className={styles.current}>
          Đang xem kênh: <strong>{forum.label}</strong>
        </p>
      ) : (
        <p role="alert" className={styles.error}>
          Không có kênh "{forumId}". Hãy chọn một kênh ở trên.
        </p>
      )}
    </section>
  );
}
