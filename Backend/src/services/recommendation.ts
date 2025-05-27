import { pool } from "../db/conn";

export async function getFoodsByWeatherTag(tag: string) {
  const res = await pool.query(
    `SELECT * FROM foods WHERE $1 = ANY(tags)`,
    [tag]
  );
  return res.rows;
}

export async function getTopOrderedFoodsToday(limit = 5) {
  const res = await pool.query(
    `SELECT foods.*, COUNT(orders.id) AS order_count
     FROM foods
     JOIN orders ON foods.id = orders.food_id
     WHERE DATE(orders.created_at) = CURRENT_DATE
     GROUP BY foods.id
     ORDER BY order_count DESC
     LIMIT $1`,
    [limit]
  );
  return res.rows;
}

export async function getAllFoods() {
  const res = await pool.query(`SELECT * FROM foods`);
  return res.rows;
}
