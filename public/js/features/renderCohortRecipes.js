import { createListCard } from '../components/createRecipeListCard.js';
import {
  fetchAllCohortRecipes,
  fetchCohortRecipeById,
} from '../services/cohort.js';
import { getErrorMessage } from './helpers.js';
import { openRecipeModal } from './renderRecipeModal.js';

export const renderCohortRecipes = async () => {
  const list = document.querySelector('.cohort-list');
  if (!list) return;

  list.replaceChildren();

  try {
    const recipes = await fetchAllCohortRecipes();

    recipes.forEach((recipe) => {
      const card = createListCard(recipe);

      card.addEventListener('click', async () => {
        try {
          const recipeInfo = await fetchCohortRecipeById(recipe.id);
          openRecipeModal(recipeInfo, 'cohort');
        } catch (error) {
          getErrorMessage(error);
        }
      });
      list.append(card);
    });
  } catch (error) {
    getErrorMessage(error);
  }
};
