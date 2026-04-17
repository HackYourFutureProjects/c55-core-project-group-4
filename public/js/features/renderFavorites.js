// @ts-check

import { createListCard } from '../components/createRecipeListCard.js';
import { openRecipeModal } from './renderRecipeModal.js';
import { getSavedRecipes } from '../services/favourites.js';
import { getMealById } from '../services/mealdb.js';
import { fetchCohortRecipeById } from '../services/cohort.js';
import { getErrorMessage } from './helpers.js';

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

let isFavoritesInitialized = false;

/**
 * Get favorites-related DOM elements.
 *
 * @returns {{
 *   favoritesList: HTMLElement | null,
 *   emptyMessage: HTMLElement | null
 * }}
 */
function getFavoritesElements() {
  return {
    favoritesList: document.querySelector('.favorites-list'),
    emptyMessage: document.querySelector('.favorites-empty'),
  };
}

/**
 * Show or hide the empty message depending on favorites length.
 *
 * @param {HTMLElement | null} emptyMessage
 * @param {Array<FavoriteRecipe>} recipes
 * @returns {void}
 */
function updateEmptyState(emptyMessage, recipes) {
  if (!emptyMessage) return;
  emptyMessage.style.display = recipes.length === 0 ? 'block' : 'none';
}

/**
 * Render favorite recipes in the "Your favorites" section.
 *
 * @param {Array<FavoriteRecipe>} [recipes=getSavedRecipes()]
 * @returns {void}
 */
export function renderFavorites(recipes = getSavedRecipes()) {
  const { favoritesList, emptyMessage } = getFavoritesElements();
  if (!favoritesList) return;

  favoritesList.replaceChildren();
  updateEmptyState(emptyMessage, recipes);

  recipes.forEach((recipe) => {
    const card = createListCard(recipe);
    card.dataset.id = recipe.id;
    card.dataset.source = recipe.source;
    favoritesList.append(card);
  });
}

/**
 * Initialize favorites feature.
 *
 * @returns {void}
 */
export function initFavorites() {
  if (isFavoritesInitialized) return;
  isFavoritesInitialized = true;

  renderFavorites();

  document.addEventListener('favoritesUpdated', () => {
    renderFavorites();
  });

  const { favoritesList } = getFavoritesElements();

  favoritesList?.addEventListener('click', async (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const card = target.closest('.recipe-list-card');
    if (!(card instanceof HTMLElement)) return;

    const { id, source } = card.dataset;
    if (!id) return;
    if (source !== 'mealdb' && source !== 'cohort') return;

    try {
      let fullRecipe = null;

      if (source === 'mealdb') {
        fullRecipe = await getMealById(id);
      } else {
        fullRecipe = await fetchCohortRecipeById(id);
      }

      if (fullRecipe) {
        openRecipeModal(fullRecipe, source);
      }
    } catch (error) {
      getErrorMessage(error);
      console.error('Failed to load favorite recipe:', error);
    }
  });
}
