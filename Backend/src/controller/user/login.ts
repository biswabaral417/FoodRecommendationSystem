// login.ts
import { Request, Response } from 'express';
import { User } from '../../db/QueryHandlers/user/user';
import { createAccessToken, createRefreshToken } from '../../utils/auth/userAuth';

const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, phone, password } = req.body;

        if (!email && !phone) {
            return res.status(400).json({ error: 'Either email or phone is required' });
        }

        const user = await User.login({ email: email ?? undefined, phone: phone ?? undefined, password });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const accessToken = createAccessToken({ email: user.email, userId: user.id });
        const refreshToken = createRefreshToken({ email: user.email, userId: user.id });

        // Set tokens as HTTP-only cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        const userResponse = {
            id: user.id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            phone: user.phone,
            imageUrl: user.imageUrl,
            address: user.address,
        };

        return res.status(200).json({ message: 'Login successful', user: userResponse });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Failed to login' });
    }
};

export default login;
