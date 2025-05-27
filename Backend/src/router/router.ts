const express = require('express')
const router = express.Router()

const foodRoutes = require('./foodRoutes')
const esewaRoutes = require('./esewaRoutes')
router.use('/foods', foodRoutes)
router.use('/esewa', esewaRoutes)


export default router