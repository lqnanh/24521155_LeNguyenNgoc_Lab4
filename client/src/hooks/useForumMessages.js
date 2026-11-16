import { useCallback, useEffect, useRef, useState } from 'react';
import { apiUrl } from '../api/config.js';

const NETWORK_ERROR = 'Không kết nối được tới máy chủ. Hãy kiểm tra server đã chạy chưa.';
const ALREADY_POSTING_ERROR = 'Đang gửi tin nhắn trước, vui lòng chờ.';
const BAD_RESPONSE_ERROR = 'Dữ liệu máy chủ trả về không đúng định dạng.';

// Đọc body JSON; body hỏng/không phải JSON thì trả null (riêng lỗi huỷ thì ném tiếp)
async function readJsonSafely(res) {
  try {
    return await res.json();
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    return null;
  }
}

function messagesUrl(forum) {
  return apiUrl(`/api/messages/${encodeURIComponent(forum)}`);
}

// Lỗi mạng (server tắt, sai địa chỉ, CORS...) → câu dễ hiểu; còn lại giữ câu gốc
function toErrorMessage(err) {
  return err instanceof TypeError ? NETWORK_ERROR : err.message;
}

/**
 * Tải và gửi tin nhắn của một kênh.
 * @param {string} forum tên kênh, ví dụ "nasa"
 * @returns {{
 *   messages: Array,
 *   loading: boolean,
 *   error: string | null,
 *   reload: () => void,
 *   isPosting: boolean,
 *   postMessage: (input: { author: string, text: string }) =>
 *     Promise<{ ok: true, message: object } | { ok: false, error: string }>
 * }}
 */
export function useForumMessages(forum) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);
  const [isPosting, setIsPosting] = useState(false);

  // Kênh đang hiển thị lúc này (null khi đã rời trang) — để postMessage biết sau khi await
  const currentForumRef = useRef(null);
  // Chặn bấm gửi 2 lần liên tiếp (state isPosting chưa kịp cập nhật trong cùng lượt)
  const postingRef = useRef(false);

  // Khi đổi kênh hoặc bấm "Thử lại": đặt lại trạng thái NGAY trong lúc render
  // (cách React khuyên dùng), để effect bên dưới không phải gọi setState đồng bộ.
  const [requestFor, setRequestFor] = useState({ forum, reloadCount });
  if (requestFor.forum !== forum || requestFor.reloadCount !== reloadCount) {
    if (requestFor.forum !== forum) {
      setMessages([]); // không để tin của kênh cũ hiện ở kênh mới
    }
    setRequestFor({ forum, reloadCount });
    setLoading(true);
    setError(null);
  }

  // Ghi nhớ kênh hiện tại; rời trang thì đặt về null
  useEffect(() => {
    currentForumRef.current = forum;
    return () => {
      currentForumRef.current = null;
    };
  }, [forum]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function loadMessages() {
      try {
        const res = await fetch(messagesUrl(forum), { signal });
        const data = await readJsonSafely(res);

        if (!res.ok) {
          throw new Error(data?.error ?? `Máy chủ báo lỗi (mã ${res.status}).`);
        }
        if (!Array.isArray(data)) {
          throw new Error(BAD_RESPONSE_ERROR);
        }
        if (signal.aborted) return;
        setMessages(data);
      } catch (err) {
        // Request đã bị huỷ (đổi kênh / rời trang) → bỏ qua, không đụng state
        if (signal.aborted) return;
        setMessages([]);
        setError(toErrorMessage(err));
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadMessages();

    // Đổi kênh, bấm "Thử lại" hoặc rời trang → huỷ ngay request cũ
    return () => controller.abort();
  }, [forum, reloadCount]);

  // useCallback: reload giữ nguyên giữa các lần render, dùng làm onClick an toàn
  const reload = useCallback(() => {
    setReloadCount((count) => count + 1);
  }, []);

  /**
   * Gửi tin nhắn lên kênh hiện tại. KHÔNG BAO GIỜ ném lỗi:
   * luôn trả về { ok: true, message } hoặc { ok: false, error }.
   */
  const postMessage = useCallback(
    async ({ author, text }) => {
      if (postingRef.current) {
        return { ok: false, error: ALREADY_POSTING_ERROR };
      }

      const targetForum = forum; // kênh lúc bấm gửi
      postingRef.current = true;
      setIsPosting(true);

      try {
        const res = await fetch(messagesUrl(targetForum), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ author, text }),
        });
        const data = await readJsonSafely(res);

        if (!res.ok) {
          // 400: câu lỗi tiếng Việt của server, nơi gọi tự hiện ra
          return { ok: false, error: data?.error ?? `Máy chủ báo lỗi (mã ${res.status}).` };
        }
        if (data === null || typeof data !== 'object' || typeof data.id !== 'string') {
          return { ok: false, error: BAD_RESPONSE_ERROR };
        }

        // Chỉ chèn nếu người dùng VẪN đang xem đúng kênh đã gửi
        if (currentForumRef.current === targetForum) {
          setMessages((prev) =>
            // Tránh trùng nếu lần tải lại vừa xong đã có sẵn tin này
            prev.some((m) => m.id === data.id) ? prev : [...prev, data]
          );
        }
        return { ok: true, message: data };
      } catch (err) {
        return { ok: false, error: toErrorMessage(err) };
      } finally {
        postingRef.current = false;
        setIsPosting(false);
      }
    },
    [forum]
  );

  return { messages, loading, error, reload, isPosting, postMessage };
}
