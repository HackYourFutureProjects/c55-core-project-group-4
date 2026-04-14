import { getAreas, getCategories, getIngredients } from '../services/mealdb.js';
import { createSelectOption } from '../components/createSelectOption.js';

import { createPlaceholderOption } from './helpers.js';

export async function renderOptionMealDB(getFunction, selectId, filter) {
  const optionsList = await getFunction();

  const selectOption = document.querySelector(selectId);

  if (!selectOption) return;

  const placeholder = createPlaceholderOption(`Select ${filter}`);

  selectOption.appendChild(placeholder);

  optionsList.forEach((option) => {
    const item = createSelectOption(option);
    selectOption.appendChild(item);
  });

  return selectOption;
}

export async function renderCategoryOptionMealDB() {
  renderOptionMealDB(getCategories, '#discover-category-select', 'a category');
}

export async function renderCountryOptionMealDB() {
  renderOptionMealDB(getAreas, '#discover-country-select', 'a country');
}

export async function renderIngredientsOptionMealDB() {
  renderOptionMealDB(
    getIngredients,
    '#discover-ingredients-select',
    'an ingredient'
  );
}
