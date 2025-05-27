SELECT foods.*, COUNT(orders.id) AS order_count
FROM foods
JOIN orders ON foods.id = orders.food_id
WHERE DATE(orders.created_at) = CURRENT_DATE
GROUP BY foods.id
ORDER BY order_count DESC
LIMIT $1;
