import { Fragment } from 'react';
import { useForumMessages } from '../hooks/useForumMessages.js';
import { formatVietnamTime } from '../utils/formatTime.js';
import MessageForm from './MessageForm.jsx';
import styles from './ForumMessages.module.css';

export default function ForumMessages({ forum }) {
  const { messages, loading, error, reload, isPosting, postMessage } = useForumMessages(forum);

  const isEmpty = !loading && !error && messages.length === 0;

  return (
    <div className={styles.wrapper}>
      {/* aria-busy chỉ bọc phần danh sách, không bọc biểu mẫu */}
      <section className={styles.wrapper} aria-busy={loading} aria-label="Tin nhắn">
        {/* Vùng trạng thái luôn có sẵn để máy đọc màn hình đọc khi chữ thay đổi */}
        <p role="status" className={loading ? styles.status : styles.visuallyHidden}>
          {loading ? 'Đang tải tin nhắn…' : ''}
        </p>

        {error && (
          <div className={styles.errorBox}>
            <p role="alert" className={styles.errorText}>
              {error}
            </p>
            <button type="button" className={styles.retryButton} onClick={reload}>
              Thử lại
            </button>
          </div>
        )}

        {isEmpty && <p className={styles.empty}>Chưa có tin nhắn nào</p>}

        {messages.length > 0 && (
          <dl className={styles.list}>
            {messages.map((message) => (
              <Fragment key={message.id}>
                <dt className={styles.author}>{message.author}</dt>
                <dd className={styles.body}>
                  {message.text}
                  <time className={styles.time} dateTime={message.timestamp}>
                    {formatVietnamTime(message.timestamp)}
                  </time>
                </dd>
              </Fragment>
            ))}
          </dl>
        )}
      </section>

      <MessageForm onSubmit={postMessage} isPosting={isPosting} />
    </div>
  );
}
