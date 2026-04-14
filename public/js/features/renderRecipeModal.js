import { createElement } from '../components/createElement.js';
import { createRecipeInfoCard } from '../components/createRecipeInfoCard.js';
import { getMealById } from '../services/mealdb.js';
import { isRecipeSaved, toggleFavorite } from '../services/favorites.js';

const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-btn');
const container = document.querySelector('.recipe-card-container');

function getFavoriteButtontext(recipe, source) {
  return isRecipeSaved(recipe.id)
    ? 'Remove from favorites'
    : 'Add to favorites';
}

export const openRecipeModal = (recipe, source = 'MealDB') => {
  container.replaceChildren();
  const card = createRecipeInfoCard(recipe);

  const favBtn = createElement('button', {
    className: 'recipe-save-btn',
    text: getFavoriteButtontext(recipe, source),
  });

  favBtn.addEventListener('click', () => {
    toggleFavorite(recipe, source);
    favBtn.textContent = getFavoriteButtontext(recipe, source);
  });

  // Here will be the logic for adding/removing from favorites
  // favBtn.addEventListener('click', () => {

  //   console.log('Add to favorites:', recipe.id);
  // });

  container.append(card, favBtn);
  modal.scrollTop = 0;
  modalOverlay.classList.add('is-open');
  document.body.classList.add('no-scroll');
};

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

export const openRecipeModalById = async (id) => {
  const recipe = await getMealById(id);
  if (recipe) openRecipeModal(recipe);
};
