import { fetchChatReply } from '../services/chat.js';

export function initChat() {
  // Find HTML elements by their id
  const btn = document.getElementById('chat-btn');
  const input = document.getElementById('chat-input');
  const result = document.getElementById('chat-result');

  // Listen for a click on the button
  btn.addEventListener('click', async () => {
    // Read the text from the input field, trim removes extra spaces
    const userMessage = input.value.trim();

    // If the input is empty — stop, do nothing
    if (!userMessage) return;

    // Show loading text while AI is thinking, disable the button
    result.innerHTML = '<p>Thinking... 🤔</p>';
    btn.disabled = true;

    try {
      // Call the function from services/chat.js
      // It sends the request to the server and returns the recipe
      const recipe = await fetchChatReply(userMessage);

      // Build the ingredients list as an HTML string
      const ingredientsList = recipe.ingredients
        .map((i) => `<li>${i.ingredient} — ${i.measure}</li>`)
        .join('');

      // Insert the finished HTML into div#chat-result
      result.innerHTML = `
        <div class="chat-recipe">
          <h3>${recipe.title}</h3>
          <p>${recipe.instructions}</p>
          <ul>${ingredientsList}</ul>
        </div>
      `;
    } catch (err) {
      // If something went wrong — show an error message
      result.innerHTML = '<p>Something went wrong. Try again!</p>';
      console.error(err);
    } finally {
      // finally runs ALWAYS — after success and after error
      // Re-enable the button so the user can try again
      btn.disabled = false;
    }
  });
}

