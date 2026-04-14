import {
  renderRecipeList,
  resetOtherSelects,
} from '../features/renderRecipeList.js';
import {
  filterMealsByArea,
  filterMealsByCategory,
  filterMealsByIngredient,
} from '../services/mealdb.js';

export const initFilters = (id, filterFunction) => {
  const select = document.querySelector(id);
  if (!select) return;

  select.addEventListener('change', async () => {
    const value = select.value;

    resetOtherSelects(id);

    if (!value) {
      renderRecipeList([]);
      return;
    }

    const recipes = await filterFunction(value);
    renderRecipeList(recipes);
  });
};

export const initCategoryFilters = () => {
  initFilters('#discover-category-select', filterMealsByCategory);
};

export const initCountryFilters = () => {
  initFilters('#discover-country-select', filterMealsByArea);
};

export const initIngredientFilters = () => {
  initFilters('#discover-ingredients-select', filterMealsByIngredient);
};
