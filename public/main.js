import {
  initCohortAddedByFilter,
  initCohortCountryFilter,
  initCohortDishNameFilter,
} from './js/events/handlerFiltersCohort.js';
import {
  initCategoryFilters,
  initCountryFilters,
  initIngredientFilters,
} from './js/events/handlerFiltersMealDB.js';
import { initMobileMenu } from './js/events/handlerMobileMenu.js';
import { initRandomRecipe } from './js/events/handlerRandomRecipe.js';
import { initSearchByDishName } from './js/events/handlerSearchByDishName.js';
import { initThemeToggle } from './js/events/handlerThemeToggle.js';
import {
  renderAddedByCohort,
  renderByDishNameCohort,
  renderCountryCohort,
} from './js/features/renderCohortDropdowns.js';
import { renderCohortRecipes } from './js/features/renderCohortRecipes.js';
import {
  renderCategoryOptionMealDB,
  renderCountryOptionMealDB,
  renderIngredientsOptionMealDB,
} from './js/features/renderDropdowns.js';
import { initFavorites } from './js/features/renderFavorites.js';
import { initRecipeModal } from './js/features/renderRecipeModal.js';
import { initChat } from './js/events/handlerChat.js';

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    renderByDishNameCohort(),
    renderAddedByCohort(),
    renderCountryCohort(),
    renderCohortRecipes(),
    renderCategoryOptionMealDB(),
    renderCountryOptionMealDB(),
    renderIngredientsOptionMealDB(),
  ]);

  initThemeToggle();
  initMobileMenu();
  initRecipeModal();
  initFavorites();

  initCohortDishNameFilter();
  initCohortAddedByFilter();
  initCohortCountryFilter();

  initCategoryFilters();
  initCountryFilters();
  initIngredientFilters();

  initRandomRecipe();

  initSearchByDishName();

  initChat();
});
