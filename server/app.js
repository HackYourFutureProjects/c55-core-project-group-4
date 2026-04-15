import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import chatRouter from './routes/chat.js';
import cohortRouter from './routes/cohort.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(morgan('dev')); // Log HTTP requests to the console
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/cohort', cohortRouter);
app.use('/api/chat', chatRouter);
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;
