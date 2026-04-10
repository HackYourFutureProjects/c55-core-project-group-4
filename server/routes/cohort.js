import express from 'express';
import db from '../../database/db.js';

// Create a new router instance for cohort routes
const router = express.Router();

// GET /api/cohort — return all cohort dishes from the database
router.get('/', (req, res) => {
  try {
    // Prepare and execute SQL query to get all dishes
    const allDishes = db.prepare('SELECT * FROM cohort_dishes').all();
    // Send the result as JSON response
    res.json(allDishes);
  } catch {
    res.status(500).json({ error: 'Failed to fetch dishes' });
  }
});

// GET /api/cohort/:id — return a single dish by id
router.get('/:id', (req, res) => {
  try {
    // Get the id from the URL parameter and find the dish
    const dish = db
      .prepare('SELECT * FROM cohort_dishes WHERE id = ?')
      .get(req.params.id);

    // If dish not found — return 404 error
    if (!dish) {
      return res.status(404).json({ error: 'Dish not found' });
    }

    // Send the dish as JSON response
    res.json(dish);
  } catch (error) {
    // If database fails — return 500 error
    res.status(500).json({ error: 'Failed to fetch dish' });
  }
});

export default router;
