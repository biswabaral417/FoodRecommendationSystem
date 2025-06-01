import sortFoods from '../controller/foods/sortedFoods'
import { Router } from 'express'
// import esewaRoutes from './esewaRoutes'
import foodroutes from './foodRoutes'
const router = Router()

router.use('/foods', foodroutes)
// router.use('esewa', esewaRoutes)


export default router
