import { createListCard } from '../components/createRecipeListCard.js';
import { openRecipeModal } from './renderRecipeModal.js';

export const fetchAllCohortRecipes = async () => {
  const res = await fetch('/api/cohort');
  return res.json();
};

export const fetchCohortRecipeById = async (id) => {
  const res = await fetch(`/api/cohort/${id}`);
  const raw = await res.json();

  const ingredients = (() => {
    try {
      return JSON.parse(raw.ingredients);
    } catch {
      return [];
    }
  })();

  return {
    ...raw,
    ingredients,
  };
};

export const fetchCohortByArea = async (area) => {
  const res = await fetch(`/api/cohort/area/${area}`);
  return res.json();
};

export const fetchCohortByTitle = async (title) => {
  const res = await fetch(`/api/cohort/title/${title}`);
  return res.json();
};

export const fetchCohortByAddedBy = async (name) => {
  const res = await fetch(`/api/cohort/added_by/${name}`);
  return res.json();
};

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
