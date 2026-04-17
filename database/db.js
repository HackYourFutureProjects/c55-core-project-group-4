import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'cookbook.db'));
const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
db.exec(schema);

const count = db.prepare('SELECT COUNT(*) as count FROM cohort_dishes').get();
if (count.count === 0) {
  const seed = readFileSync('./database/seed.sql', 'utf-8');
  db.exec(seed);
}

export default db;





