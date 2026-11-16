import { randomUUID } from 'node:crypto';

/*
 * Kho tin nhắn lưu trong bộ nhớ (mất khi tắt server).
 * Phần route CHỈ được dùng 3 hàm async bên dưới. Khi đổi sang database,
 * chỉ cần viết lại phần thân các hàm này, giữ nguyên tên, tham số và kiểu trả về.
 */

const SEED = {
  nasa: [
    { author: 'Mission Control', text: '[NASA] Tàu Artemis đã vào quỹ đạo Mặt Trăng an toàn.' },
    { author: 'Dr. Hà', text: '[NASA] Kính James Webb vừa gửi về ảnh tinh vân mới, đẹp quá!' },
    { author: 'Tuấn Astro', text: '[NASA] Tối nay trạm ISS bay qua Việt Nam lúc 19:42, nhớ ngắm nhé.' },
    { author: 'Mission Control', text: '[NASA] Nhắc lịch: họp tổng kết nhiệm vụ sao Hỏa vào thứ Sáu.' },
  ],
  'esports-tribunal': [
    { author: 'Trọng tài Minh', text: '[Esports] Phiên xử: đội Red Dragons bị tố dùng phần mềm gian lận.' },
    { author: 'Luật sư Lan', text: '[Esports] Bên bào chữa yêu cầu xem lại replay ván 3.' },
    { author: 'Khán giả 007', text: '[Esports] Replay rõ ràng là lag mạng chứ không phải hack!' },
  ],
  notNasa: [
    { author: 'Bác Ba', text: '[notNasa] Ai biết chỗ sửa xe đạp gần trường không?' },
    { author: 'Mai Bánh Mì', text: '[notNasa] Hôm nay quán bánh mì đầu hẻm giảm giá 20%.' },
    { author: 'Khoa', text: '[notNasa] Cuối tuần đi đá bóng không mọi người? Thiếu 2 người.' },
    { author: 'Bác Ba', text: '[notNasa] Cảm ơn mọi người, tìm được tiệm sửa xe rồi.' },
  ],
};

// Map tránh lỗi với tên kênh như "__proto__" hay "constructor" khi dùng object thường
const messagesByForum = new Map();

// Tạo dữ liệu mẫu: timestamp cách nhau 5 phút, tăng dần (cũ trước, mới sau)
const seedStart = Date.parse('2026-11-01T08:00:00.000Z');
for (const [forum, list] of Object.entries(SEED)) {
  messagesByForum.set(
    forum,
    list.map((m, index) => ({
      id: randomUUID(),
      author: m.author,
      text: m.text,
      timestamp: new Date(seedStart + index * 5 * 60 * 1000).toISOString(),
    }))
  );
}

// Tin nhắn chỉ gồm chuỗi nên sao chép nông là đủ để bên ngoài không sửa được dữ liệu gốc
function copyMessage(message) {
  return { ...message };
}

/** @returns {Promise<boolean>} true nếu là 1 trong 3 kênh hợp lệ */
export async function isValidForum(forum) {
  return typeof forum === 'string' && messagesByForum.has(forum);
}

/**
 * @returns {Promise<Array<{id, author, text, timestamp}> | null>}
 *   Bản sao danh sách tin nhắn, cũ trước mới sau; null nếu kênh không tồn tại.
 */
export async function getMessagesByForum(forum) {
  if (!(await isValidForum(forum))) return null;
  return messagesByForum.get(forum).map(copyMessage);
}

/**
 * Thêm tin nhắn. Dữ liệu author/text phải được route kiểm tra trước khi gọi.
 * @returns {Promise<{id, author, text, timestamp} | null>}
 *   Bản sao tin nhắn vừa tạo; null nếu kênh không tồn tại.
 */
export async function addMessage(forum, { author, text }) {
  if (!(await isValidForum(forum))) return null;
  const message = {
    id: randomUUID(),
    author,
    text,
    timestamp: new Date().toISOString(),
  };
  messagesByForum.get(forum).push(message);
  return copyMessage(message);
}
