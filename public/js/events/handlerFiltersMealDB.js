import {
  renderRecipeList,
  resetOtherSelects,
} from '../features/renderRecipeList.js';
import {
  filterMealsByArea,
  filterMealsByCategory,
  filterMealsByIngredient,
} from '../services/mealdb.js';

export const initFilters = (id, filterFunction, listClass) => {
  const select = document.querySelector(id);
  if (!select) return;

  select.addEventListener('change', async () => {
    const value = select.value;

    resetOtherSelects(id);

    if (!value) {
      renderRecipeList([], listClass);
      return;
    }

    const recipes = await filterFunction(value);
    renderRecipeList(recipes, listClass);
  });
};

export const initCategoryFilters = () => {
  initFilters(
    '#discover-category-select',
    filterMealsByCategory,
    '.discover-list'
  );
};

export const initCountryFilters = () => {
  initFilters('#discover-country-select', filterMealsByArea, '.discover-list');
};

export const initIngredientFilters = () => {
  initFilters(
    '#discover-ingredients-select',
    filterMealsByIngredient,
    '.discover-list'
  );
};
