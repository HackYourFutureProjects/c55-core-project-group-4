import { createElement } from '../components/createElement.js';
import { createRecipeInfoCard } from '../components/createRecipeInfoCard.js';
import { getMealById } from '../services/mealdb.js';
import { isRecipeSaved, toggleFavourite } from '../services/favourites.js';

const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-btn');
const container = document.querySelector('.recipe-card-container');

/**
 * Determine correct button text based on favorite state
 */
function getFavoriteButtonText(recipe, source) {
  return isRecipeSaved(recipe.id, source)
    ? 'Remove from favorites'
    : 'Add to favorites';
}

/**
 * Open recipe modal
 */
export const openRecipeModal = (recipe, source = 'mealdb') => {
  container.replaceChildren();
  const card = createRecipeInfoCard(recipe);

  const favBtn = createElement('button', {
    className: 'recipe-save-btn',
    text: getFavoriteButtonText(recipe, source),
  });

  favBtn.addEventListener('click', () => {
    toggleFavourite(recipe, source);
    // update button text after toggle
    favBtn.textContent = getFavoriteButtonText(recipe, source);
    // Notify the app that favorites have changed
    document.dispatchEvent(new Event('favoritesUpdated'));
  });

  container.append(card, favBtn);

  modal.scrollTop = 0;
  modalOverlay.classList.add('is-open');
  document.body.classList.add('no-scroll');
};

/**
 * Close modal
 */
export const closeRecipeModal = () => {
  modalOverlay.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
};

closeModalBtn.addEventListener('click', closeRecipeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeRecipeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeRecipeModal();
  }
});

/**
 * Open modal using mealdb id
 */
export const openRecipeModalById = async (id) => {
  const recipe = await getMealById(id);

  if (recipe) {
    openRecipeModal(recipe, 'mealdb');
  }
};
