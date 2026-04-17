import { getErrorMessage, renderNoResults } from '../features/helpers.js';
import { renderRecipeList } from '../features/renderRecipeList.js';
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
    try {
      const recipes = await searchMealsByName(name);

      if (recipes.length === 0) {
        renderNoResults('.discover-list');
        input.value = '';
        return;
      }

      renderRecipeList(recipes, '.discover-list');

      if (recipes.length === 1) {
        openRecipeModal(recipes[0]);
      }
      input.value = '';
    } catch (error) {
      getErrorMessage(error);
    }
  });
};
