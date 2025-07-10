import { Request, Response } from 'express';
import { Food } from '../../db/QueryHandlers/food/food';
import { foodInputSchema } from '../../db/schemas/food';
import uploadImageToCloud from '../../utils/UploadToCloud'; // assuming you're uploading to cloud

export const addFood = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log(req.body)
        const data = req.body
        console.log(data.protein)
        
        const validatedFood = foodInputSchema.parse({
            name: data.name,
            cuisine: data.cuisine,
            calories: Number(data.calories),
            fat: Number(data.fat),
            protein: Number(data.protein), // ✅ FIXED HERE
            carbs: Number(data.carbs),
            price: Number(data.price),
            tags: JSON.parse(data.tags),
            suitableWeatherTags: JSON.parse(data.weatherTags),
        });





        let imageUrl = "";

        if (req.file) {
            const cloudUrl = await uploadImageToCloud(req.file); // returns string | null
            if (cloudUrl) {
                imageUrl = cloudUrl;
            }
        }

        const insertParams = [
            validatedFood.name,
            validatedFood.cuisine,
            validatedFood.calories,
            imageUrl,
            validatedFood.fat,
            validatedFood.protein,
            validatedFood.carbs,
            validatedFood.tags,
            validatedFood.suitableWeatherTags,
            validatedFood.price
        ];

        const newFood = await Food.add(insertParams);
        return res.status(201).json({ food: newFood });
    } catch (error: any) {
        console.error(error);
        return res.status(400).json({ error: error.message || "Something went wrong" });
    }
};

