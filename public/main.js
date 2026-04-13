import {
  renderCategoryOptionMealDB,
  renderCountryOptionMealDB,
  renderIngredientsOptionMealDB,
} from './js/features/dropdowns.js';

document.addEventListener('DOMContentLoaded', async () => {
  await renderCategoryOptionMealDB();
  renderCountryOptionMealDB();
  renderIngredientsOptionMealDB();
});
