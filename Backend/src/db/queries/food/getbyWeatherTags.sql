SELECT * 
FROM foods
WHERE $1 = ANY(tags)