import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { validateAccessToken, validateRefreshToken, createAccessToken, createRefreshToken } from '../../utils/auth/userAuth';
import { User } from '../../db/QueryHandlers/user/user';

dotenv.config();


export const verify_refresh_token = async (req: Request, res: Response): Promise<any> => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ loggedIn: false, message: 'No refresh token provided' });
        }

        const payload = await validateRefreshToken(refreshToken);
        if (!payload) {
            return res.status(401).json({ loggedIn: false, message: 'Invalid or expired refresh token' });
        }

        const user = await User.getByEmail(payload.email);
        if (!user) {
            return res.status(404).json({ loggedIn: false, message: 'User not found' });
        }

        // ✅ Generate new tokens
        const accessToken = createAccessToken(
            {
                userId: user.id,
                email: user.email,
            }
        )
        const newRefreshToken = createRefreshToken({
            userId: user.id,
            email: user.email,
        });

        // ✅ Set new tokens in cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 15, // 15 minutes
        });

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });

        return res.status(200).json({
            loggedIn: true,
            user: {
                id: user.id,
                email: user.email,
                fname: user.fname,
                lname: user.lname,
                phone: user.phone,
                imageUrl: user.imageUrl,
                address: user.address,
            }
        });

    } catch (error) {
        console.error('Token refresh failed:', error);
        return res.status(500).json({ loggedIn: false, message: 'Internal server error' });
    }
};



// middleware to check if user is logged in



export const authorize = async (req: Request, res: Response, next: any): Promise<any> => {
    try {
        const accessToken = req.cookies?.accessToken;
        console.log('Access Token:', accessToken);
        if (!accessToken) {
            return res.status(401).json({ loggedIn: false, message: 'No access token provided' });
        }

        const payload = await validateAccessToken(accessToken);
        console.log('Payload:', payload);
        if (!payload) {
            return res.status(401).json({ loggedIn: false, message: 'Invalid or expired access token' });
        }

        const user = await User.getByEmail(payload.email);
        if (!user) {
            return res.status(404).json({ loggedIn: false, message: 'User not found' });
        }

        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        console.error('Authentication check failed:', error);
        res.status(500).json({ loggedIn: false, message: 'Internal server error' });
    }
}