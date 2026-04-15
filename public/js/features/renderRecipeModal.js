// @ts-check

import { createElement } from '../components/createElement.js';
import { createRecipeInfoCard } from '../components/createRecipeInfoCard.js';
import { getMealById } from '../services/mealdb.js';
import { isRecipeSaved, toggleFavourite } from '../services/favourites.js';

let isRecipeModalInitialized = false;

/**
 * @typedef {'mealdb' | 'cohort'} RecipeSource
 */

/**
 * Minimum recipe shape required by the modal and favorites logic.
 *
 * @typedef {Object} RecipeInput
 * @property {string} id
 * @property {string} title
 * @property {string} image
 */

/**
 * Get modal-related DOM elements.
 *
 * @returns {{
 *   modalOverlay: HTMLElement | null,
 *   modal: HTMLElement | null,
 *   closeModalBtn: HTMLElement | null,
 *   container: HTMLElement | null
 * }}
 */
function getModalElements() {
  return {
    modalOverlay: document.querySelector('.modal-overlay'),
    modal: document.querySelector('.modal'),
    closeModalBtn: document.querySelector('.close-btn'),
    container: document.querySelector('.recipe-card-container'),
  };
}

/**
 * Determine correct button text based on favorite state.
 *
 * @param {RecipeInput} recipe
 * @param {RecipeSource} source
 * @returns {string}
 */
function getFavoriteButtonText(recipe, source) {
  return isRecipeSaved(recipe.id, source)
    ? 'Remove from favorites'
    : 'Add to favorites';
}

/**
 * Open recipe modal.
 *
 * @param {RecipeInput} recipe
 * @param {RecipeSource} [source='mealdb']
 * @returns {void}
 */
export function openRecipeModal(recipe, source = 'mealdb') {
  const { modalOverlay, modal, container } = getModalElements();

  if (!modalOverlay || !modal || !container) return;

  container.replaceChildren();

  const card = createRecipeInfoCard(recipe);

  const favBtn = createElement('button', {
    className: 'recipe-save-btn',
    text: getFavoriteButtonText(recipe, source),
  });

  favBtn.addEventListener('click', () => {
    toggleFavourite(recipe, source);
    favBtn.textContent = getFavoriteButtonText(recipe, source);
    document.dispatchEvent(new Event('favoritesUpdated'));
  });

  container.append(card, favBtn);

  modal.scrollTop = 0;
  modalOverlay.classList.add('is-open');
  document.body.classList.add('no-scroll');
}

/**
 * Close recipe modal.
 *
 * @returns {void}
 */
export function closeRecipeModal() {
  const { modalOverlay } = getModalElements();
  if (!modalOverlay) return;

  modalOverlay.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
}

/**
 * Open modal using MealDB id.
 *
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function openRecipeModalById(id) {
  try {
    const recipe = /** @type {RecipeInput | null} */ (await getMealById(id));

    if (recipe) {
      openRecipeModal(recipe, 'mealdb');
    }
  } catch (error) {
    console.error('Failed to open recipe modal by id:', error);
  }
}

/**
 * Initialize recipe modal behavior.
 *
 * @returns {void}
 */
export function initRecipeModal() {
  if (isRecipeModalInitialized) return;
  isRecipeModalInitialized = true;

  const { modalOverlay, closeModalBtn } = getModalElements();

  closeModalBtn?.addEventListener('click', closeRecipeModal);

  modalOverlay?.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
      closeRecipeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeRecipeModal();
    }
  });
}
