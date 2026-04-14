import { renderNoResults } from '../features/helpers.js';
import {
  renderRecipeList,
  resetOtherSelects,
} from '../features/renderRecipeList.js';
import { openRecipeModal } from '../features/renderRecipeModal.js';
import { searchMealsByName } from '../services/mealdb.js';

export const initSearchByDishName = () => {
  const form = document.querySelector('.discover-search-form');
  const input = document.querySelector('.discover-dish-input');

  if (!form || !input) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }

    const name = input.value.trim();

    resetOtherSelects(null);

    const recipes = await searchMealsByName(name);

    console.log(recipes);

    if (recipes.length === 0) {
      renderNoResults('.discover-list');
      return;
    }

    renderRecipeList(recipes, '.discover-list');

    if (recipes.length === 1) {
      openRecipeModal(recipes[0]);
    }
  });
};
