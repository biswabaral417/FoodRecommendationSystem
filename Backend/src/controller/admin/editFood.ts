import { Request, Response } from 'express';
import { Food } from '../../db/QueryHandlers/food/food';
import { toSQLinOrder } from '../../utils/toSQLinOrder';

export const editFoods = async (req: Request, res: Response): Promise<any> => {
    try {
        const food = req.body;
        console.log(req.body)
        if (!food || typeof food.id !== 'number') {
            return res.status(400).json({ error: 'Invalid or missing food ID' });
        }
        const foodId = food.id;

        const existingFood = await Food.get(foodId);
        if (!existingFood) {
            return res.status(404).json({ error: 'Food not found' });
        }

        const orderedParams: FoodUpdateParams = toSQLinOrder(food, foodId); // make sure this matches your SQL order

        const updatedFood = await Food.edit(foodId, orderedParams);
        if (!updatedFood) {
            return res.status(500).json({ error: 'Food could not be updated' });
        }

        res.json(updatedFood);

    } catch (error) {
        console.error('Error editing food:', error);
        res.status(500).json({ error: 'Failed to edit food details' });
    }
};
