

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

const createTableQuery =
    `CREATE TABLE foods (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cuisine VARCHAR(100),
  calories INTEGER NOT NULL,
  protein NUMERIC(5,2) NOT NULL,
  carbs NUMERIC(5,2) NOT NULL,
  fat NUMERIC(5,2) NOT NULL,
  tags TEXT[],               -- PostgreSQL array of text for generic tags
  suitable_weather_tags TEXT[],  -- Array for weather-related tags
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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
