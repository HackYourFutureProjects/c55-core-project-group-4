// Import express to create router
import express from 'express';

// Import all MealDB service functions
import {
  searchMealsByName,
  getRandomMeal,
  getCategories,
  getAreas,
  getIngredients,
  filterMealsByCategory,
  filterMealsByArea,
  filterMealsByIngredient,
  getMealById,
} from '../../public/js/services/mealdb.js';

// Create a new router instance for recipe routes
const router = express.Router();

/**
 * GET /api/recipes/search?name=chicken
 * Search meals by name
 */
router.get('/search', async (req, res) => {
  try {
    // Get search query from URL
    const name = req.query.name || '';

    // Call service function
    const recipes = await searchMealsByName(name);

    // Return result as JSON
    res.json(recipes);
  } catch {
    // Handle server errors
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

/**
 * GET /api/recipes/random
 * Return one random meal
 */
router.get('/random', async (req, res) => {
  try {
    const recipe = await getRandomMeal();
    res.json(recipe);
  } catch {
    res.status(500).json({ error: 'Failed to fetch random recipe' });
  }
});

/**
 * GET /api/recipes/categories
 * Return all meal categories
 */
router.get('/categories', async (req, res) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

/**
 * GET /api/recipes/areas
 * Return all areas (countries)
 */
router.get('/areas', async (req, res) => {
  try {
    const areas = await getAreas();
    res.json(areas);
  } catch {
    res.status(500).json({ error: 'Failed to fetch areas' });
  }
});

/**
 * GET /api/recipes/ingredients
 * Return all ingredients
 */
router.get('/ingredients', async (req, res) => {
  try {
    const ingredients = await getIngredients();
    res.json(ingredients);
  } catch {
    res.status(500).json({ error: 'Failed to fetch ingredients' });
  }
});

/**
 * GET /api/recipes/category/:category
 * Filter meals by category
 */
router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const recipes = await filterMealsByCategory(category);
    res.json(recipes);
  } catch {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

/**
 * GET /api/recipes/area/:area
 * Filter meals by area (country)
 */
router.get('/area/:area', async (req, res) => {
  try {
    const area = req.params.area;
    const recipes = await filterMealsByArea(area);
    res.json(recipes);
  } catch {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

/**
 * GET /api/recipes/ingredient/:ingredient
 * Filter meals by ingredient
 */
router.get('/ingredient/:ingredient', async (req, res) => {
  try {
    const ingredient = req.params.ingredient;
    const recipes = await filterMealsByIngredient(ingredient);
    res.json(recipes);
  } catch {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

/**
 * GET /api/recipes/:id
 * Get full meal details by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Call service
    const recipe = await getMealById(id);

    // If not found → return 404
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json(recipe);
  } catch {
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
});

// Export router so it can be used in app.js
export default router;
