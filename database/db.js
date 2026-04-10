import Database from 'better-sqlite3';
import { readFileSync } from 'fs';

const db = new Database('./database/cookbook.db');
const schema = readFileSync('./database/schema.sql', 'utf-8');
db.exec(schema);

const count = db.prepare('SELECT COUNT(*) as count FROM cohort_dishes').get();
if (count.count === 0) {
  const seed = readFileSync('./database/seed.sql', 'utf-8');
  db.exec(seed);
}

export default db;
