import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

console.log({
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: "postgres",
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
});
async function resetFoodData() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS foods (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      tags TEXT[],
      total_orders INT DEFAULT 0
    );
  `;

  const clearTableQuery = `DELETE FROM foods;`;

  const insertDataQuery = `
    INSERT INTO foods (id, name, description, tags)
    VALUES
      (1, 'Tomato Soup', 'Warm and soothing tomato soup.', ARRAY['hot', 'cloudy', 'normal']),
      (2, 'Iced Lemon Tea', 'Refreshing cold lemon tea.', ARRAY['cold', 'sunny', 'dry']),
      (3, 'Spicy Chicken Curry', 'Fiery chicken curry for cold days.', ARRAY['hot', 'sunny', 'dry']),
      (4, 'Caesar Salad', 'Fresh and crunchy salad.', ARRAY['cold', 'cloudy', 'normal']),
      (5, 'Mango Smoothie', 'Sweet and chilled mango smoothie.', ARRAY['cold', 'sunny', 'dry']),
      (6, 'Grilled Cheese Sandwich', 'Comfort food with melted cheese.', ARRAY['average', 'sunny', 'dry']),
      (7, 'Hot Chocolate', 'Rich and creamy hot chocolate.', ARRAY['hot', 'cloudy', 'humid']),
      (8, 'Fruit Salad', 'Mixed seasonal fruits.', ARRAY['average', 'cloudy', 'humid']),
      (9, 'Roast Beef', 'Juicy and savory roast beef.', ARRAY['average', 'sunny', 'dry']),
      (10, 'Herbal Tea', 'Soothing herbal infusion.', ARRAY['hot', 'sunny', 'dry']);
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Table created or already exists.');

    await pool.query(clearTableQuery);
    console.log('Old food data cleared.');

    await pool.query(insertDataQuery);
    console.log('New food data inserted successfully.');
  } catch (err) {
    console.error('Error resetting food data:', err);
  } finally {
    await pool.end();
  }
}

resetFoodData();
