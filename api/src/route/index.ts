import { Router } from 'express'
import userRouter from './userRoute'
import bookingRouter from './bookingRoute'
import timeRouter from './timeRoute'

const router = Router()

router.use('/user', userRouter)
router.use('/booking', bookingRouter)
router.use('/timeValidator', timeRouter)

export default router