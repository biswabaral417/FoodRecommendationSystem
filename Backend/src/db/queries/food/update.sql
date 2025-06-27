UPDATE foods
SET name = COALESCE($1, name),
    cuisine = COALESCE($2, cuisine),
    calories = COALESCE($3, calories),
    imageurl = COALESCE($4, imageurl),
    fat = COALESCE($5, fat),
    protein = COALESCE($6, protein),
    carbs = COALESCE($7, carbs),
    tags = COALESCE($8, tags),
    suitable_weather_tags = COALESCE($9, suitable_weather_tags),
    price = COALESCE($10, price),
    updated_at = NOW()
WHERE id = $11
RETURNING *;
