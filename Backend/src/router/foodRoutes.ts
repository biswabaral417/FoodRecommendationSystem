const express = require('express');
// create foods routes 
const router = express.Router();
import sortFoods from '../controller/foods/sortedFoods';
router.get('/sortedFoods', sortFoods);
export default router;