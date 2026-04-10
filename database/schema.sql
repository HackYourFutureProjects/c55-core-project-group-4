
CREATE TABLE IF NOT EXISTS cohort_dishes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  area TEXT NOT NULL,
  instructions TEXT NOT NULL,
  image TEXT,
  ingredients TEXT NOT NULL,
  added_by TEXT NOT NULL
);