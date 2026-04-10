CREATE TABLE IF NOT EXISTS cohort_dishes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  strMeal TEXT NOT NULL,
  strCategory TEXT NOT NULL,
  strArea TEXT NOT NULL,
  strInstructions TEXT NOT NULL,
  strMealThumb TEXT,
  ingredients TEXT NOT NULL,
  added_by TEXT  NOT NULL
);

