import e, { Request, Response } from 'express';
import { User } from '../../db/QueryHandlers/user/user';
import { createAccessToken, createRefreshToken } from '../../utils/auth/userAuth';
import cloudinary from '../../utils/cloudinary';
import streamifier from 'streamifier';

const register = async (req: Request, res: Response): Promise<any> => {
    try {
        const {
            fname ,
            lname ,
            email,
            password ,
            phone ,
            address,
        } = JSON.parse(req.body.data);

        if (!email.trim() || !password.trim() || !phone.trim()) {
            return res.status(400).json({ error: 'Email, phone, and password are required' });
        }

        // Optional: Check for existing user
        const existingUser = await User.findByEmailOrPhone({ email, phone });
        if (existingUser) {
            return res.status(409).json({ error: 'User with this email or phone already exists' });

        }

        let imageUrl: string | null = null;
        if (req.file) {
            const uploadStream = () => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: 'profile_images' },
                        (error, result) => {
                            if (result) resolve(result.secure_url);
                            else reject(error);
                        }
                    );
                    req.file && streamifier.createReadStream(req.file.buffer).pipe(stream);
                });
            };
            imageUrl = await uploadStream() as string;
        }

        const newUser = await User.register([
            fname.trim(),
            lname.trim(),
            email.trim(),
            password,
            phone.trim(),
            imageUrl?.trim() || null,
            address?.trim() || null,
        ]);

        const accessToken = createAccessToken({ email, userId: newUser.id });
        const refreshToken = createRefreshToken({ email: email, userId: newUser.id });

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
            id: newUser.id,
            fname: newUser.fname,
            lname: newUser.lname,
            email: newUser.email,
            phone: newUser.phone,
            imageUrl: newUser.imageUrl,
            address: newUser.address,
        };

        return res.status(201).json({
            message: 'Registration successful',
            user: userResponse,
        });
    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({ error: 'Failed to register user' });
    }
};

export default register;
