import {
  initCategoryFilters,
  initCountryFilters,
  initIngredientFilters,
} from './js/events/handlerFiltersMealDB.js';
import { initRandomRecipe } from './js/events/handlerRandomRecipe.js';
import { initSearchByDishName } from './js/events/handlerSearchByDishName.js';
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

  initRandomRecipe();

  initSearchByDishName();
});
