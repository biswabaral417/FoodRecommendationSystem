import sortFoods from '../controller/foods/sortedFoods'
import { Router } from 'express'
// import esewaRoutes from './esewaRoutes'
import foodroutes from './foodRoutes'
import adminRoutes from './adminRoutes'
import authRoutes from './authroutes'
import orderRoutes from './orderRoutes'
const router = Router()

router.use('/foods', foodroutes)
router.use('/admin', adminRoutes)
router.use('/auth', authRoutes)
router.use('/order', orderRoutes)
router.get('/test_conn', (req, res) => {res.status(200).json({ success: "connected" })})

// router.use('esewa', esewaRoutes)

export default router

