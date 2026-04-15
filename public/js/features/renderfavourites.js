// @ts-check

import { createListCard } from '../components/createRecipeListCard.js';
import { openRecipeModal } from './renderRecipeModal.js';
import { getSavedRecipes } from '../services/favourites.js';
import { getMealById } from '../services/mealdb.js';
import { fetchCohortRecipeById } from '../services/cohort.js';

/**
 * @typedef {'mealdb' | 'cohort'} RecipeSource
 */

/**
 * Favorite recipe shape stored in localStorage
 * and used for rendering the favorites list.
 *
 * @typedef {Object} FavoriteRecipe
 * @property {string} id - Recipe ID
 * @property {RecipeSource} source - Recipe source
 * @property {string} key - Unique favorite key
 * @property {string} title - Recipe title
 * @property {string} image - Recipe image URL
 */

/**
 * Favorites list container in the UI
 * This is where favorite recipe cards will be rendered
 * @type {HTMLElement | null}
 */
const favoritesList = document.querySelector('.favorites-list');

/**
 * Empty state message shown when there are no favorite recipes
 * @type {HTMLElement | null}
 */
const emptyMessage = document.querySelector('.favorites-empty');

/**
 * Show or hide the empty message depending on favorites length
 *
 * If the favorites array is empty:
 * - show the message
 *
 * If the favorites array has items:
 * - hide the message
 *
 * @param {Array<FavoriteRecipe>} recipes - Favorite recipes to check
 * @returns {void}
 */
function updateEmptyState(recipes) {
  if (!emptyMessage) return;

  emptyMessage.style.display = recipes.length === 0 ? 'block' : 'none';
}

/**
 * Render favorite recipes in the "Your favorites" section
 *
 * This function:
 * 1. gets favorite recipes from localStorage (unless recipes are passed manually)
 * 2. clears the current favorites list
 * 3. updates the empty state message
 * 4. creates a card for each favorite recipe
 * 5. adds click behavior to open the full recipe in the modal
 *
 * Notes:
 * - MealDB favorites only store lightweight data in localStorage,
 *   so we fetch the full recipe by id before opening the modal
 * - Cohort favorites also fetch full recipe data before opening the modal
 *
 * @param {Array<FavoriteRecipe>} [recipes=getSavedRecipes()] - Optional recipes array to render
 * @returns {void}
 */
export const renderFavorites = (recipes = getSavedRecipes()) => {
  // Safety check: if the container is missing, stop here
  if (!favoritesList) return;

  // Remove old cards before rendering the new state
  favoritesList.replaceChildren();

  // Show or hide the "empty favorites" message
  updateEmptyState(recipes);

  // Create and render one card per favorite recipe
  recipes.forEach((recipe) => {
    // Reuse the existing list card component
    const card = createListCard(recipe);

    /**
     * When the user clicks a favorite card:
     * - fetch the full recipe data
     * - open the modal with full recipe information
     */
    card.addEventListener('click', async () => {
      /**
       * Fetch full recipe depending on the source
       *
       * source === 'mealdb'
       *   → get recipe from TheMealDB API
       *
       * source === 'cohort'
       *   → get recipe from our backend
       */
      const fullRecipe =
        recipe.source === 'mealdb'
          ? await getMealById(recipe.id)
          : await fetchCohortRecipeById(recipe.id);

      // Only open the modal if recipe data was fetched successfully
      if (fullRecipe) {
        openRecipeModal(fullRecipe, recipe.source);
      }
    });

    // Add the card to the favorites list in the DOM
    favoritesList.append(card);
  });
};
