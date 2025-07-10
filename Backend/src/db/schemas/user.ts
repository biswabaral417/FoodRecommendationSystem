import { z } from 'zod';

export const foodInputSchema = z.object({
    fname: z.string().min(1),
    lname: z.string().min(1),
    imageUrl: z.string().optional(),
    email: z.string(),
    password: z.string().min(8),
    phone: z.string().min(10).max(15),
    address: z.string().min(1),
});
