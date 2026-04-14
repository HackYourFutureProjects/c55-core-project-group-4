import { createListCard } from '../components/createRecipeListCard.js';
import {
  fetchAllCohortRecipes,
  fetchCohortRecipeById,
} from '../services/cohort.js';
import { openRecipeModal } from './renderRecipeModal.js';

export const renderCohortRecipes = async () => {
  const list = document.querySelector('.cohort-list');
  if (!list) return;

  list.replaceChildren();

  const recipes = await fetchAllCohortRecipes();

  recipes.forEach((recipe) => {
    const card = createListCard(recipe);

    card.addEventListener('click', async () => {
      const recipeInfo = await fetchCohortRecipeById(recipe.id);
      openRecipeModal(recipeInfo);
    });
    list.append(card);
  });
};
