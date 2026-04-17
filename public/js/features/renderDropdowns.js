import { getAreas, getCategories, getIngredients } from '../services/mealdb.js';
import { createSelectOption } from '../components/createSelectOption.js';

import { createPlaceholderOption } from './helpers.js';

export async function renderSelectOptions(
  getFunction,
  selectId,
  placeholderLabel
) {
  const optionsList = await getFunction();

  const selectOption = document.querySelector(selectId);
  if (!selectOption) return;

  selectOption.replaceChildren();

  const placeholder = createPlaceholderOption(`Select ${placeholderLabel}`);

  selectOption.appendChild(placeholder);

  optionsList.forEach((option) => {
    const item = createSelectOption(option);
    selectOption.appendChild(item);
  });

  return selectOption;
}

export async function renderCategoryOptionMealDB() {
  await renderSelectOptions(
    getCategories,
    '#discover-category-select',
    'a category'
  );
}

export async function renderCountryOptionMealDB() {
  await renderSelectOptions(getAreas, '#discover-country-select', 'a country');
}

export async function renderIngredientsOptionMealDB() {
  await renderSelectOptions(
    getIngredients,
    '#discover-ingredients-select',
    'an ingredient'
  );
}
