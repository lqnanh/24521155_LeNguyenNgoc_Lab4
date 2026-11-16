/*
 * Địa chỉ server lấy từ biến môi trường VITE_API_URL (file client/.env).
 * Lưu ý: biến VITE_ sẽ nằm trong code gửi xuống trình duyệt → chỉ để địa chỉ, KHÔNG để bí mật.
 */
const rawApiUrl = import.meta.env.VITE_API_URL;

// Bỏ dấu "/" ở cuối để ghép đường dẫn không bị "//"
export const API_URL =
  typeof rawApiUrl === 'string' ? rawApiUrl.trim().replace(/\/+$/, '') : '';

/** Ghép địa chỉ server với đường dẫn, ví dụ apiUrl('/api/messages/nasa') */
export function apiUrl(path) {
  if (API_URL === '') {
    throw new Error('Chưa cấu hình VITE_API_URL. Hãy tạo file client/.env từ .env.example.');
  }
  return `${API_URL}${path}`;
}
