import { Router } from 'express';
// const express = require('express');
import sortFoods from '../controller/foods/sortedFoods';
// const sortFoods=require('../controller/foods/sortedFoods');
const foodRoutes = Router();

foodRoutes.get('/sorted_foods', sortFoods);

export default foodRoutes;