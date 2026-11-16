import { useCallback, useEffect, useState } from 'react';
import { apiUrl } from '../api/config.js';

const NETWORK_ERROR = 'Không kết nối được tới máy chủ. Hãy kiểm tra server đã chạy chưa.';

// Đọc body JSON; body hỏng/không phải JSON thì trả null (riêng lỗi huỷ thì ném tiếp)
async function readJsonSafely(res) {
  try {
    return await res.json();
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    return null;
  }
}

/**
 * Tải tin nhắn của một kênh.
 * @param {string} forum tên kênh, ví dụ "nasa"
 * @returns {{ messages: Array, loading: boolean, error: string | null, reload: () => void }}
 */
export function useForumMessages(forum) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);

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

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function loadMessages() {
      try {
        const res = await fetch(apiUrl(`/api/messages/${encodeURIComponent(forum)}`), {
          signal,
        });
        const data = await readJsonSafely(res);

        if (!res.ok) {
          throw new Error(data?.error ?? `Máy chủ báo lỗi (mã ${res.status}).`);
        }
        if (!Array.isArray(data)) {
          throw new Error('Dữ liệu máy chủ trả về không đúng định dạng.');
        }
        if (signal.aborted) return;
        setMessages(data);
      } catch (err) {
        // Request đã bị huỷ (đổi kênh / rời trang) → bỏ qua, không đụng state
        if (signal.aborted) return;
        setMessages([]);
        // fetch ném TypeError khi không kết nối được (server tắt, sai địa chỉ, CORS...)
        setError(err instanceof TypeError ? NETWORK_ERROR : err.message);
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

  return { messages, loading, error, reload };
}
