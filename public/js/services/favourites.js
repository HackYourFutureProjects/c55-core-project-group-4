// A fixed key used to store all favorite recipes in localStorage
const STORAGE_KEY = 'favoriteRecipes';

/**
 * @typedef {'mealdb' | 'cohort'} RecipeSource
 */

/**
 * @typedef {Object} RecipeInput
 * @property {string|number} id
 * @property {string} title
 * @property {string} image
 */

/**
 * @typedef {Object} FavoriteRecipe
 * @property {string} id
 * @property {RecipeSource} source
 * @property {string} key
 * @property {string} title
 * @property {string} image
 */

/**
 * Create a unique key using source + id
 * This prevents conflicts between MealDB and cohort recipes
 */
function createFavoriteKey(id, source) {
  return `${source}-${String(id)}`;
}

/**
 * Normalize recipe into a lightweight object for storage
 */
function normalizeFavorite(recipe, source) {
  return {
    id: String(recipe.id),
    source,
    key: createFavoriteKey(recipe.id, source),
    title: recipe.title,
    image: recipe.image,
  };
}

/**
 * Read all saved recipes from localStorage
 */
function getSavedRecipes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Save full array back to localStorage
 */
function setSavedRecipes(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

/**
 * Check if recipe is already saved
 */
function isRecipeSaved(id, source) {
  const favorites = getSavedRecipes();
  const key = createFavoriteKey(id, source);

  return favorites.some((item) => item.key === key);
}

/**
 * Save recipe if not already saved
 */
function saveRecipe(recipe, source) {
  const favorites = getSavedRecipes();
  const newFavorite = normalizeFavorite(recipe, source);

  const exists = favorites.some((item) => item.key === newFavorite.key);

  if (exists) return favorites;

  const updated = [...favorites, newFavorite];
  setSavedRecipes(updated);

  return updated;
}

/**
 * Remove recipe using id + source
 */
function removeSavedRecipe(id, source) {
  const favorites = getSavedRecipes();
  const key = createFavoriteKey(id, source);

  const updated = favorites.filter((item) => item.key !== key);
  setSavedRecipes(updated);

  return updated;
}

/**
 * Toggle favorite state
 */
function toggleFavourite(recipe, source) {
  if (isRecipeSaved(recipe.id, source)) {
    return removeSavedRecipe(recipe.id, source);
  }

  return saveRecipe(recipe, source);
}

/**
 * Export only public API functions
 * Helper functions remain private inside this file
 */
export {
  getSavedRecipes,
  saveRecipe,
  removeSavedRecipe,
  isRecipeSaved,
  toggleFavourite,
};
