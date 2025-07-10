import { Request, Response } from 'express';
import { Order } from '../../db/QueryHandlers/order/orders';
import { Food } from '../../db/QueryHandlers/food/food';

const createOrder = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = req.user?.id;
        const { items } = req.body;

        if (!userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Items must be a non-empty array' });
        }

        // Get prices for all food IDs
        const foodIds = items.map(item => item.food_id);
        const foods = await Food.getPriceByFoodIds(foodIds); // Should return array of { id, price }

        if (!foods) {
            return res.status(400).json({ error: 'Invalid food IDs provided' });
        }

        // Create a map of food_id to price
        const foodPriceMap = new Map(foods.map(food => [food.id, food.price]));

        const enrichedItems = [];
        for (const item of items) {
            const { food_id, quantity } = item;

            if (typeof food_id !== 'number' || typeof quantity !== 'number') {
                return res.status(400).json({ error: 'Invalid item structure' });
            }

            const price = foodPriceMap.get(food_id);
            if (price == null) {
                return res.status(400).json({ error: `Price not found for food_id: ${food_id}` });
            }

            enrichedItems.push({
                food_id,
                quantity,
                price_at_order: price,
            });
        }

        // Create the order
        const order = await Order.createWithItems(userId, 'COD', 'pending', enrichedItems);

        return res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error('Create Order error:', error);
        return res.status(500).json({ error: 'Failed to create order' });
    }
};

export default createOrder;
