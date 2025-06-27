import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});


console.log({
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
});

export default async function connectDB() {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL database');
    return pool;
  } catch (err) {
    console.error('Failed to connect to PostgreSQL database:', err);
    connectDB()
  }
}
connectDB()
export  {pool}

