import { Router } from "express";
import BookController from '../controller/bookController';

const bookingRouter = Router()
const booking = new BookController()

bookingRouter.get('/slots/:week/:userId', booking.getMyBookings)
bookingRouter.get('/technology', booking.getTechnology)
bookingRouter.post('/:userId',booking.saveBooking)
bookingRouter.delete('/:bookingId', booking.deleteBooking)
bookingRouter.put('/:bookingId', booking.updateBooking)
bookingRouter.get('/', booking.getAllUserDetails)

export default bookingRouter;