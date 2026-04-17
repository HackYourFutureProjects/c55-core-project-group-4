import { getErrorMessage } from '../features/helpers.js';
import { openRecipeModal } from '../features/renderRecipeModal.js';
import { getRandomMeal } from '../services/mealdb.js';

export const initRandomRecipe = () => {
  const button = document.querySelector('.discover-random-btn');
  if (!button) return;

  button.addEventListener('click', async () => {
    try {
      const recipe = await getRandomMeal();
      openRecipeModal(recipe);
    } catch (error) {
      getErrorMessage(error);
    }
  });
};
