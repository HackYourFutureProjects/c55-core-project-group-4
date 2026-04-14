import { createListCard } from '../components/createRecipeListCard.js';
import { fetchCohortRecipeById } from '../services/cohort.js';
import { getMealById } from '../services/mealdb.js';
import { openRecipeModal } from './renderRecipeModal.js';

export const renderRecipeList = (recipes, listClass, source = 'MealDB') => {
  const list = document.querySelector(listClass);
  if (!list) return;

  list.replaceChildren();

  recipes.forEach((recipe) => {
    const card = createListCard(recipe);

    card.addEventListener('click', async () => {
      const recipeInfo =
        source === 'MealDB'
          ? await getMealById(recipe.id)
          : await fetchCohortRecipeById(recipe.id);
      openRecipeModal(recipeInfo, source);
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
    .filter((id) => id != expectId)
    .forEach((id) => {
      const select = document.querySelector(id);
      if (select) select.value = '';
    });
};
