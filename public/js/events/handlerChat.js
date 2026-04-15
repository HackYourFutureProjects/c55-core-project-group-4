import { fetchChatReply } from '../services/chat.js';
import { renderChatResult } from '../features/renderChatResult.js';

export const initChat = () => {
  const btn = document.getElementById('chat-btn');
  const input = document.getElementById('chat-input');
  const result = document.getElementById('chat-result');

  if (!btn || !input || !result) return;

  btn.addEventListener('click', async () => {
    const userMessage = input.value.trim();
    if (!userMessage) return;

    result.innerHTML = '<p>Thinking... 🤔</p>';
    btn.disabled = true;

    try {
      const recipe = await fetchChatReply(userMessage);
      renderChatResult(recipe);
    } catch (err) {
      result.innerHTML = '<p>Something went wrong. Try again!</p>';
      console.error(err);
    } finally {
      btn.disabled = false;
    }
  });
};