import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cohortRouter from './routes/cohort.js';
import chatRouter from './routes/chat.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/cohort', cohortRouter);
app.use('/api/chat', chatRouter);
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;
