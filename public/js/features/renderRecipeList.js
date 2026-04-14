import { createListCard } from '../components/createRecipeListCard.js';
import { openRecipeModalById } from './renderRecipeModal.js';

export const renderRecipeList = (recipes, listClass) => {
  const list = document.querySelector(listClass);

  list.replaceChildren();

  recipes.forEach((recipe) => {
    const card = createListCard(recipe);

    card.addEventListener('click', () => {
      openRecipeModalById(recipe.id);
    });
    list.append(card);
  });
};

export const resetOtherSelects = (expectId) => {
  const selects = [
    '#discover-category-select',
    '#discover-country-select',
    '#discover-ingredients-select',
  ];

  selects
    .filter((id) => id != expectId)
    .forEach((id) => {
      const select = document.querySelector(id);
      if (select) select.value = '';
    });
};
