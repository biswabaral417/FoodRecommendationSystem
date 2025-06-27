import { Request, Response } from 'express';
import { Food } from '../../db/QueryHandlers/food/food'

export const getAllFoods = async (req: Request, res: Response): Promise<any> => {
    try {
        const foods = await Food.getAll();
        if (!foods) {
            return res.status(404).json({ error: 'no Foods found' });
        }
        res.json(foods);
    } catch (error) {
        console.error('Error fetching food:', error);
        res.status(500).json({ error: 'Failed to fetch food details' });
    }
}