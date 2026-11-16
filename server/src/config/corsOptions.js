/*
 * Địa chỉ client duy nhất được phép gọi API, đọc từ biến CLIENT_ORIGIN trong server/.env.
 * Vite chạy ở cổng khác thì chỉ sửa .env, không sửa code.
 */
function readAllowedOrigin() {
  const raw = process.env.CLIENT_ORIGIN ?? '';
  return raw.trim().replace(/\/+$/, '');
}

export function createCorsOptions() {
  const allowedOrigin = readAllowedOrigin();

  if (allowedOrigin === '') {
    console.warn('[server] CLIENT_ORIGIN đang trống → trình duyệt sẽ bị chặn khi gọi API.');
  }

  return {
    // Địa chỉ khác CLIENT_ORIGIN → không gửi header CORS (trình duyệt tự chặn),
    // KHÔNG ném lỗi nên server không trả 500.
    origin: allowedOrigin === '' ? false : allowedOrigin,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  };
}
