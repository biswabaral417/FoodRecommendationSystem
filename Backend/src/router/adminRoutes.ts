import { Router } from 'express';
import { Food } from '../db/QueryHandlers/food/food';
import { editFoods } from '../controller/admin/editFood';
import { addFood } from '../controller/admin/addFood';

const adminRoutes = Router();

adminRoutes.post('/add_food', addFood)
adminRoutes.post('/update_food', editFoods);
// adminRoutes.get('/delete_foood',)

export default adminRoutes;

