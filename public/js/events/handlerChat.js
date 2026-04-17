import { fetchChatReply } from '../services/chat.js';
import { renderChatResult } from '../features/renderChatResult.js';
import { createElement } from '../components/createElement.js';
import { getChatErrorMessage } from '../features/helpers.js';

export const initChat = () => {
  const btn = document.getElementById('chat-btn');
  const input = document.getElementById('chat-input');
  const result = document.getElementById('chat-result');
  const bubbleBtn = document.querySelector('.chat-bubble-btn');
  const popup = document.getElementById('chat-popup');
  const closeBtn = document.querySelector('.chat-popup-close');
  const loader = createElement('p', {
    class: 'chat-loader',
    text: 'Thinking... 🤔',
  });

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
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }
    const userMessage = input.value.trim();
    result.replaceChildren();
    result.append(loader);
    btn.disabled = true;

    try {
      const recipe = await fetchChatReply(userMessage);

      renderChatResult(recipe);
    } catch (err) {
      result.replaceChildren();
      const msg = getChatErrorMessage(err);
      result.append(msg);
    } finally {
      btn.disabled = false;
    }
  });
};
