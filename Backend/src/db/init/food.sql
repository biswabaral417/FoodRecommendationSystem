CREATE TABLE foods (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,        -- Add this line
  tags TEXT[],            -- e.g. ['hot', 'rainy', 'cold']
  total_orders INT DEFAULT 0
);

INSERT INTO foods (id, name, description, tags)
VALUES
  (1, 'Tomato Soup', 'Warm and soothing tomato soup.', ARRAY['hot', 'cold', 'wet']),
  (2, 'Iced Lemon Tea', 'Refreshing cold lemon tea.', ARRAY['cold', 'dry']),
  (3, 'Spicy Chicken Curry', 'Fiery chicken curry for cold days.', ARRAY['hot', 'dry']),
  (4, 'Caesar Salad', 'Fresh and crunchy salad.', ARRAY['cold', 'wet']),
  (5, 'Mango Smoothie', 'Sweet and chilled mango smoothie.', ARRAY['cold', 'dry']),
  (6, 'Grilled Cheese Sandwich', 'Comfort food with melted cheese.', ARRAY['avg', 'dry']),
  (7, 'Hot Chocolate', 'Rich and creamy hot chocolate.', ARRAY['hot', 'wet']),
  (8, 'Fruit Salad', 'Mixed seasonal fruits.', ARRAY['avg', 'wet']),
  (9, 'Roast Beef', 'Juicy and savory roast beef.', ARRAY['avg', 'dry']),
  (10, 'Herbal Tea', 'Soothing herbal infusion.', ARRAY['hot', 'dry']);
