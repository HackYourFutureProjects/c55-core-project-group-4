import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cohortRouter from './routes/cohort.js';
import recipesRouter from './routes/recipes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/cohort', cohortRouter);
app.use('/api/recipes', recipesRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
