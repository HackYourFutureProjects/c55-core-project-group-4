import { createListCard } from '../components/createRecipeListCard.js';

export const renderRecipeList = (recipes) => {
  const list = document.querySelector('.discover-list');

  list.replaceChildren();

  recipes.forEach((recipe) => list.append(createListCard(recipe)));
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
