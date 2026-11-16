import { once } from 'node:events';
import { createApp } from './app.js';

// Lưới an toàn cuối cùng: ghi log thay vì để tiến trình chết vì promise bị bỏ quên
process.on('unhandledRejection', (reason) => {
  console.error('[server] Promise bị từ chối mà không được xử lý:', reason);
});

function readPort() {
  const raw = process.env.PORT;
  const port = Number(raw);
  if (!raw || !Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error(
      `Biến môi trường PORT không hợp lệ ("${raw ?? ''}"). Hãy tạo file server/.env từ .env.example.`
    );
  }
  return port;
}

async function main() {
  const port = readPort();
  const app = createApp();
  const server = app.listen(port);

  // once() trả về promise: resolve khi 'listening', reject nếu có 'error' (vd. cổng đã bị chiếm)
  await once(server, 'listening');
  console.log(`[server] Đang chạy tại cổng ${port}`);
}

try {
  await main();
} catch (err) {
  if (err.code === 'EADDRINUSE') {
    console.error('[server] Cổng trong PORT đang được chương trình khác dùng. Hãy đổi PORT trong .env.');
  } else {
    console.error('[server] Không khởi động được:', err.message);
  }
  process.exitCode = 1;
}
