//@ts-check
//Base URL for TheMealDB API
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * @typedef {Record<string, any>} MealData
 * @typedef {{strCategory: string}} CategoryItem
 * @typedef {{strArea: string}} AreaItem
 * @typedef {{strIngredient: string}} IngredientItem
 */

//**** GENERIC FETCH FUNCTION ****
/**
 * Fetch JSON data from a URL.
 * Throws an Error when the HTTP response is not OK.
 * @param {string} url
 * @returns {Promise<any>}
 */
async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// **** HELPER FUNCTIONS ****
/**
 * Extract ingredients and measurements from a TheMealDB meal object.
 * TheMealDB stores them as strIngredient1..20 and strMeasure1..20.
 * @param {MealData} meal
 * @returns {Array<{ingredient: string, measure: string}>}
 *
 */
function extractIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();

    if (ingredient) {
      ingredients.push({
        ingredient,
        measure: measure || '',
      });
    }
  }

  return ingredients;
}
/**
 * Normalize full meal data (search, random, lookup)
 * @param {MealData} meal
 * @returns {{
 *   id: string,
 *   title: string,
 *   category: string,
 *   area: string,
 *   image: string,
 *   instructions: string,
 *   tags: string[],
 *   youtube: string,
 *   ingredients: Array<{ingredient: string, measure: string}>
 * }}
 */
function normalizeMeal(meal) {
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory || '',
    area: meal.strArea || '',
    image: meal.strMealThumb || '',
    instructions: meal.strInstructions || '',
    tags: /** @type {string} */ (meal.strTags)
      ? /** @type {string} */ (meal.strTags)
          .split(',')
          .map((/** @type {string} */ tag) => tag.trim())
      : [],
    youtube: meal.strYoutube || '',
    ingredients: extractIngredients(meal),
  };
}
/**
 * Normalize short meal data (filter results)
 * @param {MealData} meal
 * @returns {{
 *   id: string,
 *   title: string,
 *   image: string
 * }}
 */
function normalizeShortMeal(meal) {
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
  };
}

// **** API FUNCTIONS ****
/**
 * Search meals by name.
 * @param {string} name
 * @returns {Promise<Array<object>>}
 */

async function searchMealsByName(name) {
  if (!name.trim()) return [];

  const data = await fetchJson(
    `${BASE_URL}/search.php?s=${encodeURIComponent(name)}`
  );
  return (data.meals || []).map(normalizeMeal);
}
/**
 * get a random meal.
 * @returns {Promise<object|null>}
 */
async function getRandomMeal() {
  const data = await fetchJson(`${BASE_URL}/random.php`);
  return data.meals ? normalizeMeal(data.meals[0]) : null;
}
/**
 * get categories (for dropdown)
 * @returns {Promise<Array<object>>}
 */
async function getCategories() {
  const data = await fetchJson(`${BASE_URL}/list.php?c=list`);
  return (data.meals || []).map(
    (/** @type {CategoryItem} */ item) => item.strCategory
  );
}

/**
 * get areas (countries)
 * @returns {Promise<string[]>}
 */
async function getAreas() {
  const data = await fetchJson(`${BASE_URL}/list.php?a=list`);
  return (data.meals || []).map((/** @type {AreaItem} */ item) => item.strArea);
}

/**
 * get ingredients (for dropdown)
 * @returns {Promise<string[]>}
 */
async function getIngredients() {
  const data = await fetchJson(`${BASE_URL}/list.php?i=list`);
  return (data.meals || []).map(
    (/** @type {IngredientItem} */ item) => item.strIngredient
  );
}

/**
 * filter meals by category
 * @param {string} category
 * @returns {Promise<Array<object>>}
 */
async function filterMealsByCategory(category) {
  if (!category.trim()) return [];

  const data = await fetchJson(
    `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`
  );
  return (data.meals || []).map(normalizeShortMeal);
}

/**
 * filter meals by area (country)
 * @param {string} area
 * @returns {Promise<Array<object>>}
 */
async function filterMealsByArea(area) {
  if (!area.trim()) return [];

  const data = await fetchJson(
    `${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`
  );
  return (data.meals || []).map(normalizeShortMeal);
}

/**
 * filter meals by ingredient
 * @param {string} ingredient
 * @returns {Promise<Array<object>>}
 */
async function filterMealsByIngredient(ingredient) {
  if (!ingredient.trim()) return [];

  const data = await fetchJson(
    `${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`
  );
  return (data.meals || []).map(normalizeShortMeal);
}
/**
 * get meal details by ID
 * @param {string} id
 * @returns {Promise<object|null>}
 */
async function getMealById(id) {
  if (!id) return null;

  const data = await fetchJson(
    `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`
  );
  return data.meals ? normalizeMeal(data.meals[0]) : null;
}

export {
  searchMealsByName,
  getRandomMeal,
  getCategories,
  getAreas,
  getIngredients,
  filterMealsByCategory,
  filterMealsByArea,
  filterMealsByIngredient,
  getMealById,
};
