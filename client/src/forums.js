/*
 * Danh sách kênh phía client — PHẢI trùng với 3 kênh trong hợp đồng API.
 * id: tên kênh dùng trên địa chỉ và khi gọi API. label: tên hiển thị.
 */
export const FORUMS = [
  { id: 'nasa', label: 'NASA' },
  { id: 'esports-tribunal', label: 'Esports Tribunal' },
  { id: 'notNasa', label: 'notNasa' },
];

export const DEFAULT_FORUM_ID = FORUMS[0].id;

/** Tìm kênh theo id; không có thì trả undefined */
export function findForum(id) {
  return FORUMS.find((forum) => forum.id === id);
}
