import express from 'express';

export function createApp() {
  const app = express();

  // Đọc body JSON (giới hạn nhỏ để tránh request quá lớn)
  app.use(express.json({ limit: '10kb' }));

  // Route kiểm tra server còn sống
  app.get('/api/health', (req, res) => {
    res.status(200).json({ ok: true });
  });

  // Mọi đường dẫn /api không tồn tại → 404 dạng JSON
  app.use('/api', (req, res) => {
    res.status(404).json({ error: 'Không tìm thấy đường dẫn này.' });
  });

  // Bộ xử lý lỗi chung: Express 5 tự chuyển lỗi của hàm async vào đây,
  // nên một request lỗi không làm sập server.
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
      res.status(400).json({ error: 'Body không phải JSON hợp lệ.' });
      return;
    }
    if (err.type === 'entity.too.large') {
      res.status(413).json({ error: 'Dữ liệu gửi lên quá lớn.' });
      return;
    }
    console.error('[server] Lỗi không mong muốn:', err);
    res.status(500).json({ error: 'Lỗi máy chủ, vui lòng thử lại sau.' });
  });

  return app;
}
