export const createChatCard = (recipe) => {
  const ingredientsList = recipe.ingredients
    .map((i) => `<li>${i.ingredient} — ${i.measure}</li>`)
    .join('');

  const card = document.createElement('div');
  card.className = 'chat-recipe';
  card.innerHTML = `
    <h3>${recipe.title}</h3>
    <p>${recipe.instructions}</p>
    <ul>${ingredientsList}</ul>
  `;

  return card;
};
