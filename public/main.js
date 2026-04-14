import {
  initCategoryFilters,
  initCountryFilters,
  initIngredientFilters,
} from './js/events/handlerFiltersMealDB.js';
import {
  renderCategoryOptionMealDB,
  renderCountryOptionMealDB,
  renderIngredientsOptionMealDB,
} from './js/features/renderDropdowns.js';

document.addEventListener('DOMContentLoaded', async () => {
  await renderCategoryOptionMealDB();
  await renderCountryOptionMealDB();
  await renderIngredientsOptionMealDB();

  initCategoryFilters();
  initCountryFilters();
  initIngredientFilters();
});
