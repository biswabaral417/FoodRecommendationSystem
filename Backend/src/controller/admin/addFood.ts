import { Request, Response } from 'express';
import { Food } from '../../db/QueryHandlers/food/food';
import { foodInputSchema } from '../../db/schemas/food';

export const addFood = async (req: Request, res: Response): Promise<any> => {
    try {
        const foodData = req.body;
        console.log(req.body)
        const validatedFood = foodInputSchema.parse(foodData);
        if (!validatedFood) {
            return res.status(403).json({ error: "parts of data missing" })
        }
        const insertParams = [
            validatedFood.name,
            validatedFood.cuisine,
            validatedFood.calories,
            validatedFood.imageUrl,
            validatedFood.fat,
            validatedFood.protein,
            validatedFood.carbs,
            validatedFood.tags,
            validatedFood.suitableWeatherTags,
            validatedFood.price,
        ]


        const newFood = await Food.add(insertParams);

        return res.status(201).json({ food: newFood });
    } catch (error: any) {
        if (error.name === 'ZodError') {
            console.log("hello")
            console.log(error)
            return res.status(400).json({ error: "payload is incorrect" });
        }
        console.error('Error adding food:', error);
        return res.status(500).json({ error: 'Failed to add food details' });
    }
};
