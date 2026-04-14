import { createElement } from '../components/createElement.js';
import { createRecipeInfoCard } from '../components/createRecipeInfoCard.js';
import { getMealById } from '../services/mealdb.js';

const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-btn');
const container = document.querySelector('.recipe-card-container');

export const openRecipeModal = (recipe) => {
  container.replaceChildren();
  const card = createRecipeInfoCard(recipe);

  const favBtn = createElement('button', {
    className: 'recipe-save-btn',
    text: 'Add to favorites',
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
