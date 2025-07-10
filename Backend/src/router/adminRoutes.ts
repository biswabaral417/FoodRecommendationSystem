import { Router } from 'express';
import { editFoods } from '../controller/admin/editFood';
import { addFood } from '../controller/admin/addFood';
import upload from '../utils/middleware/upload';

const adminRoutes = Router();

adminRoutes.post('/add_food', upload.single('image'), addFood)
adminRoutes.post('/update_food', editFoods);
// adminRoutes.get('/delete_foood',)

export default adminRoutes;

