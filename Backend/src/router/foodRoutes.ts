import { Router } from 'express';
import sortFoods from '../controller/foods/sortedFoods';
import { getAllFoods } from '../controller/foods/allFoods';
const foodRoutes = Router();

foodRoutes.get('/get_sorted', sortFoods);
foodRoutes.get('/get_all', getAllFoods)

export default foodRoutes;