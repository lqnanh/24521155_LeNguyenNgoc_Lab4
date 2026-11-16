/*
 * Luật kiểm tra tin nhắn — DÙNG CHUNG cho server và client.
 * File này cố ý không import gì (không dùng Node, không dùng React),
 * nên có thể chép y nguyên sang client/src/ để hai bên kiểm tra giống hệt nhau.
 */

export const MAX_TEXT_LENGTH = 500;

export const MESSAGE_ERRORS = {
  authorRequired: 'Vui lòng nhập tên người gửi.',
  textRequired: 'Vui lòng nhập nội dung tin nhắn.',
  textTooLong: `Nội dung tin nhắn không được dài quá ${MAX_TEXT_LENGTH} ký tự.`,
};

/**
 * Kiểm tra dữ liệu tin nhắn.
 * @param {{ author?: unknown, text?: unknown }} input
 * @returns {{
 *   valid: boolean,
 *   errors: { author?: string, text?: string },
 *   value: { author: string, text: string }
 * }}
 *   errors: lỗi theo từng ô (client hiện dưới từng ô nhập).
 *   value: author/text đã cắt khoảng trắng hai đầu, dùng để lưu hoặc gửi đi.
 */
export function validateMessage(input) {
  const source = input !== null && typeof input === 'object' ? input : {};
  const author = typeof source.author === 'string' ? source.author.trim() : '';
  const text = typeof source.text === 'string' ? source.text.trim() : '';

  const errors = {};
  if (author === '') {
    errors.author = MESSAGE_ERRORS.authorRequired;
  }
  if (text === '') {
    errors.text = MESSAGE_ERRORS.textRequired;
  } else if (text.length > MAX_TEXT_LENGTH) {
    errors.text = MESSAGE_ERRORS.textTooLong;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    value: { author, text },
  };
}
