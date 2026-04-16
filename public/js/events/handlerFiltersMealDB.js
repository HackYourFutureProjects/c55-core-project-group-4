import {
  renderRecipeList,
  resetOtherSelects,
  selectsMealDBArray,
} from '../features/renderRecipeList.js';
import { fetchAllCohortRecipes } from '../services/cohort.js';
import {
  filterMealsByArea,
  filterMealsByCategory,
  filterMealsByIngredient,
} from '../services/mealdb.js';

export const initFilters = (
  id,
  filterFunction,
  listClass,
  selectsArray,
  source
) => {
  const select = document.querySelector(id);
  if (!select) return;

  select.addEventListener('change', async () => {
    const value = select.value;

    resetOtherSelects(id, selectsArray);

    if (!value) {
      const allRecipes =
        source === 'cohort' ? await fetchAllCohortRecipes() : [];

      renderRecipeList(allRecipes, listClass, source);
      return;
    }

    const recipes = await filterFunction(value);
    renderRecipeList(recipes, listClass, source);
  });
};

export const initCategoryFilters = () => {
  initFilters(
    '#discover-category-select',
    filterMealsByCategory,
    '.discover-list',
    selectsMealDBArray
  );
};

export const initCountryFilters = () => {
  initFilters(
    '#discover-country-select',
    filterMealsByArea,
    '.discover-list',
    selectsMealDBArray
  );
};

export const initIngredientFilters = () => {
  initFilters(
    '#discover-ingredients-select',
    filterMealsByIngredient,
    '.discover-list',
    selectsMealDBArray
  );
};
