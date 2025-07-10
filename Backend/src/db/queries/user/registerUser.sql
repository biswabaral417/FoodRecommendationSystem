-- src/db/queries/user/registerUser.sql
INSERT INTO users (  fname, lname, email, password, phone, imageUrl, address)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;
