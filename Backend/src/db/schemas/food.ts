import { z } from 'zod';

export const foodInputSchema = z.object({
    name: z.string().min(1),
    cuisine: z.string().min(1),
    calories: z.number().nonnegative(),
    imageUrl: z.string(),
    fat: z.number().nonnegative(),
    protein: z.number().nonnegative(),
    carbs: z.number().nonnegative(),
    tags: z.array(z.string()).optional().default([]),
    suitableWeatherTags: z.array(z.string()).optional().default([]),
    price: z.number().nonnegative(),
});
