import { createListCard } from '../components/createRecipeListCard.js';
import { getErrorMessage } from './helpers.js';

export const renderRecipeList = (recipes, listClass, clickHandler) => {
  const list = document.querySelector(listClass);
  if (!list) return;

  list.replaceChildren();

  recipes.forEach((recipe) => {
    const card = createListCard(recipe);

    card.addEventListener('click', async () => {
      try {
        await clickHandler(recipe);
      } catch (error) {
        getErrorMessage(error);
      }
    });

    list.append(card);
  });
};

export const selectsCohortArray = [
  '#cohort-title-select',
  '#cohort-added-select',
  '#cohort-country-select',
];

export const selectsMealDBArray = [
  '#discover-category-select',
  '#discover-country-select',
  '#discover-ingredients-select',
];

export const resetOtherSelects = (expectId, selects) => {
  selects
    .filter((id) => id !== expectId)
    .forEach((id) => {
      const select = document.querySelector(id);
      if (select) select.value = '';
    });
};
