import { useId, useRef, useState } from 'react';
import { MAX_TEXT_LENGTH, validateMessage } from '../shared/messageRules.js';
import styles from './MessageForm.module.css';

const UNEXPECTED_ERROR = 'Có lỗi không mong muốn, vui lòng thử lại.';

/**
 * Biểu mẫu gửi tin nhắn.
 * @param {{
 *   onSubmit: (value: { author: string, text: string }) =>
 *     Promise<{ ok: true } | { ok: false, error: string }>,
 *   isPosting: boolean
 * }} props
 */
export default function MessageForm({ onSubmit, isPosting }) {
  const id = useId();
  const authorId = `${id}-author`;
  const authorErrorId = `${id}-author-error`;
  const textId = `${id}-text`;
  const textErrorId = `${id}-text-error`;
  const counterId = `${id}-counter`;

  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [touched, setTouched] = useState({ author: false, text: false });
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [justSent, setJustSent] = useState(false);

  const authorRef = useRef(null);
  const textRef = useRef(null);

  // Tính lỗi NGAY trong lúc render, dùng đúng luật của server
  const { valid, errors, value } = validateMessage({ author, text });
  const showAuthorError = Boolean(errors.author) && (touched.author || submitted);
  const showTextError = Boolean(errors.text) && (touched.text || submitted);
  const textLength = value.text.length; // đếm giống hệt cách luật đếm (đã bỏ khoảng trắng 2 đầu)

  function markTouched(field) {
    setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isPosting) return;

    setSubmitted(true);
    setServerError(null);
    setJustSent(false);

    if (!valid) {
      // Đưa con trỏ tới ô sai đầu tiên để người dùng sửa ngay
      (errors.author ? authorRef : textRef).current?.focus();
      return;
    }

    const sentText = text;
    try {
      const result = await onSubmit(value);
      if (result.ok) {
        // Xoá Nội dung (chỉ khi người dùng chưa gõ thêm trong lúc chờ), giữ Tên
        setText((current) => (current === sentText ? '' : current));
        setTouched((prev) => ({ ...prev, text: false }));
        setSubmitted(false);
        setJustSent(true);
      } else {
        setServerError(result.error);
      }
    } catch {
      // postMessage không ném lỗi, đây chỉ là lưới an toàn
      setServerError(UNEXPECTED_ERROR);
    }
  }

  const textDescribedBy = showTextError ? `${counterId} ${textErrorId}` : counterId;

  let statusText = '';
  if (isPosting) statusText = 'Đang gửi tin nhắn…';
  else if (justSent) statusText = 'Đã gửi tin nhắn.';

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-busy={isPosting}>
      <h2 className={styles.heading}>Gửi tin nhắn</h2>

      <div className={styles.field}>
        <label htmlFor={authorId} className={styles.label}>
          Tên
        </label>
        <input
          ref={authorRef}
          id={authorId}
          name="author"
          type="text"
          autoComplete="name"
          className={styles.input}
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
            setJustSent(false);
          }}
          onBlur={() => markTouched('author')}
          aria-required="true"
          aria-invalid={showAuthorError}
          aria-describedby={showAuthorError ? authorErrorId : undefined}
        />
        {showAuthorError && (
          <p id={authorErrorId} role="alert" className={styles.fieldError}>
            {errors.author}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor={textId} className={styles.label}>
          Nội dung
        </label>
        <textarea
          ref={textRef}
          id={textId}
          name="text"
          rows={4}
          className={styles.textarea}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setJustSent(false);
          }}
          onBlur={() => markTouched('text')}
          aria-required="true"
          aria-invalid={showTextError}
          aria-describedby={textDescribedBy}
        />
        <p
          id={counterId}
          className={textLength > MAX_TEXT_LENGTH ? styles.counterOver : styles.counter}
        >
          {textLength}/{MAX_TEXT_LENGTH}
        </p>
        {showTextError && (
          <p id={textErrorId} role="alert" className={styles.fieldError}>
            {errors.text}
          </p>
        )}
      </div>

      {serverError && (
        <p role="alert" className={styles.serverError}>
          {serverError}
        </p>
      )}

      <div className={styles.actions}>
        <button type="submit" className={styles.submit} disabled={isPosting}>
          {isPosting ? 'Đang gửi…' : 'Gửi'}
        </button>
        <p role="status" className={styles.status}>
          {statusText}
        </p>
      </div>
    </form>
  );
}
