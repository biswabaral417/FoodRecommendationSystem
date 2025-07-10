SELECT
    food_id AS id,
    SUM(quantity) AS order_count
FROM
    order_items
GROUP BY
    food_id
ORDER BY
    order_count DESC
LIMIT $1;
