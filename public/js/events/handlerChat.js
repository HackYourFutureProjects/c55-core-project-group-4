import { fetchChatReply } from '../services/chat.js';
import { renderChatResult } from '../features/renderChatResult.js';

export const initChat = () => {
  const btn = document.getElementById('chat-btn');
  const input = document.getElementById('chat-input');
  const result = document.getElementById('chat-result');
   const bubbleBtn = document.querySelector('.chat-bubble-btn');
  const popup = document.getElementById('chat-popup');
  const closeBtn = document.querySelector('.chat-popup-close');

   if (!btn || !input || !result || !bubbleBtn || !popup || !closeBtn) return;

   // Open/close popup when bubble button is clicked
  bubbleBtn.addEventListener('click', () => {
    popup.classList.toggle('is-open');
  });

  // Close popup when X button is clicked
  closeBtn.addEventListener('click', () => {
    popup.classList.remove('is-open');
  });

  btn.addEventListener('click', async () => {
    const userMessage = input.value.trim();
    if (!userMessage) return;

    result.innerHTML = '<p>Thinking... 🤔</p>';
    btn.disabled = true;

    try {
      const recipe = await fetchChatReply(userMessage);
      renderChatResult(recipe);
    } catch (err) {
      result.innerHTML = '<p>I am here to help with recipe ideas only! 🍽️</p>';
      console.error(err);
    } finally {
      btn.disabled = false;
    }
  });
};