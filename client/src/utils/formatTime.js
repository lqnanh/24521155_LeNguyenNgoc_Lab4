// Tạo 1 lần dùng lại nhiều lần (tạo Intl.DateTimeFormat khá tốn)
const vietnamTimeFormatter = new Intl.DateTimeFormat('vi-VN', {
  timeZone: 'Asia/Ho_Chi_Minh',
  hour: '2-digit',
  minute: '2-digit',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

/** Chuỗi ISO → giờ Việt Nam dễ đọc, ví dụ "15:00 01/11/2026". Chuỗi hỏng thì trả lại nguyên văn. */
export function formatVietnamTime(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return String(isoString);
  return vietnamTimeFormatter.format(date);
}
