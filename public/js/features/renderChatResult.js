import { createChatCard } from '../components/createChatCard.js';

export const renderChatResult = (recipe) => {
  const result = document.getElementById('chat-result');
  if (!result) return;

  result.replaceChildren();
  const card = createChatCard(recipe);
  result.append(card);
};