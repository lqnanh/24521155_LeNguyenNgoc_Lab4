import { Router } from 'express';
import { getMessagesByForum, addMessage, isValidForum } from '../store/messageStore.js';
import { validateMessage } from '../shared/messageRules.js';
import { applySimulatedDelay } from '../config/simulatedDelay.js';

const router = Router();

function forumNotFound(res, forum) {
  return res.status(404).json({ error: `Kênh "${forum}" không tồn tại.` });
}

function serverError(res, err) {
  console.error('[messages] Lỗi không mong muốn:', err);
  return res.status(500).json({ error: 'Lỗi máy chủ, vui lòng thử lại sau.' });
}

// GET /api/messages/:forum → 200, mảng tin nhắn cũ trước mới sau
router.get('/:forum', async (req, res) => {
  try {
    await applySimulatedDelay();
    const { forum } = req.params;
    if (!(await isValidForum(forum))) {
      return forumNotFound(res, forum);
    }

    const messages = await getMessagesByForum(forum);
    if (messages === null) {
      return forumNotFound(res, forum);
    }
    return res.status(200).json(messages);
  } catch (err) {
    return serverError(res, err);
  }
});

// POST /api/messages/:forum, body { author, text } → 201 tin nhắn vừa tạo
router.post('/:forum', async (req, res) => {
  try {
    await applySimulatedDelay();
    const { forum } = req.params;
    if (!(await isValidForum(forum))) {
      return forumNotFound(res, forum);
    }

    // Express 5: không gửi JSON thì req.body là undefined
    const { valid, errors, value } = validateMessage(req.body ?? {});
    if (!valid) {
      return res.status(400).json({ error: Object.values(errors).join(' ') });
    }

    const created = await addMessage(forum, value);
    if (created === null) {
      return forumNotFound(res, forum);
    }
    return res.status(201).json(created);
  } catch (err) {
    return serverError(res, err);
  }
});

export default router;
