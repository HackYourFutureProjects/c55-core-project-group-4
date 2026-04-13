import {
  getAreas,
  getCategories,
  getIngredients,
} from '../services/mealdb.js';
import { createSelectOption } from '../components/createSelectOption.js';

import { createPlaceholderOption } from './helpers.js';

export async function renderCategoryOptionMealDB() {
  const categories = await getCategories();

  const selectCategory = document.querySelector('#discover-category-select');

  if (!selectCategory) return;

  selectCategory.innerHTML = '';

  const placeholder = createPlaceholderOption('Select a category');

  selectCategory.appendChild(placeholder);

  categories.forEach((category) => {
    const option = createSelectOption(category);
    selectCategory.appendChild(option);
  });

  return selectCategory;
}

export async function renderCountryOptionMealDB() {
  const countries = await getAreas();

  const selectCountries = document.querySelector('#discover-country-select');

  if (!selectCountries) return;

  selectCountries.innerHTML = '';

  const placeholder = createPlaceholderOption('Select a country');

  selectCountries.appendChild(placeholder);

  countries.forEach((country) => {
    const option = createSelectOption(country);
    selectCountries.appendChild(option);
  });

  return selectCountries;
}

export async function renderIngredientsOptionMealDB() {
  const ingredients = await getIngredients();

  const selectIngredients = document.querySelector(
    '#discover-ingredients-select'
  );

  if (!selectIngredients) return;

  selectIngredients.innerHTML = '';

  const placeholder = createPlaceholderOption('Select an ingredient');

  selectIngredients.appendChild(placeholder);

  ingredients.forEach((ingredient) => {
    const option = createSelectOption(ingredient);
    selectIngredients.appendChild(option);
  });

  return selectIngredients;
}
