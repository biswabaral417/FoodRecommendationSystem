// types/express/index.d.ts
import 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            id: number;
            email: string;
            // userId: number;
            phone: number;
            fname: string;
            lname: string;
            imageUrl: string;
            address: string;
            isAdmin: boolean;
        };
    }
}
