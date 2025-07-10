import { Router } from 'express';

import login from '../controller/user/login';
import register from '../controller/user/register';
import { verify_refresh_token } from '../controller/user/tokenAuth';
import upload from '../utils/middleware/upload';
const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.post('/register', upload.single('image'), register);
authRoutes.post('/verify_refresh_token', verify_refresh_token)

export default authRoutes;