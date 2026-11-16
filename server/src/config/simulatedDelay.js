import { setTimeout as sleep } from 'node:timers/promises';

/*
 * Làm chậm API tin nhắn để thử trường hợp đổi kênh khi request cũ chưa xong.
 * Đọc SIMULATED_DELAY_MS từ server/.env:
 *   - không có, rỗng hoặc 0 → không chậm
 *   - số nguyên 1..MAX_DELAY_MS → chậm đúng số mili giây đó
 *   - giá trị sai (chữ, số âm, số lẻ, quá lớn) → bỏ qua, in cảnh báo, KHÔNG làm sập server
 */
const MAX_DELAY_MS = 60_000;

function readSimulatedDelayMs() {
  const raw = (process.env.SIMULATED_DELAY_MS ?? '').trim();
  if (raw === '') return 0;

  const ms = Number(raw);
  if (!Number.isInteger(ms) || ms < 0 || ms > MAX_DELAY_MS) {
    console.warn(
      `[server] SIMULATED_DELAY_MS="${raw}" không hợp lệ (cần số nguyên từ 0 đến ${MAX_DELAY_MS}) → bỏ qua, không làm chậm.`
    );
    return 0;
  }
  return ms;
}

// Đọc 1 lần lúc khởi động server
const SIMULATED_DELAY_MS = readSimulatedDelayMs();

if (SIMULATED_DELAY_MS > 0) {
  console.log(`[server] Đang làm chậm API tin nhắn ${SIMULATED_DELAY_MS} ms mỗi request.`);
}

/** Chờ đúng SIMULATED_DELAY_MS (0 thì trả về ngay) */
export async function applySimulatedDelay() {
  if (SIMULATED_DELAY_MS > 0) {
    await sleep(SIMULATED_DELAY_MS);
  }
}
