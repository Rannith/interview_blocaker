import { Router } from 'express';
import userRouter from './userRoute';
import bookingRouter from './bookingRoute';
import timeRouter from './timeRoute';
import cron from 'node-cron';
import remainder from '../utils/remainder';

const router = Router()

router.use('/user', userRouter)
router.use('/booking', bookingRouter)
router.use('/timeValidator', timeRouter)
cron.schedule('0 0 10 * * tuesday', remainder)

export default router;