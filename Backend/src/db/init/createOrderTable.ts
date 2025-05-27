import { pool } from "../conn";

const createTableQuery = `
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  food_id INTEGER NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  quantity INTEGER DEFAULT 1
);`;

(async () => {
  try {
    await pool.query(createTableQuery);
    console.log('Orders table created (or already exists).');
  } catch (err) {
    console.error('Error creating orders table:', err);
  } finally {
    await pool.end(); // close the pool connection
  }
})();
