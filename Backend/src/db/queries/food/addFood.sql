INSERT INTO foods (name, cuisine, calories, imageurl, fat, protein, carbs,tags, suitable_weather_tags,price)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10)
RETURNING *;
