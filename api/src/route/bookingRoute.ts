import { Router } from "express";
import BookController from '../controller/bookControler';

const bookingRouter = Router()
const booking = new BookController()

bookingRouter.get('/slots/:week/:userId', booking.getMyBookings)
bookingRouter.get('/technology', booking.getTechnology)
bookingRouter.post('/:userId',booking.saveBooking)
bookingRouter.delete('/:bookingId', booking.deleteBooking)
bookingRouter.put('/:bookingId', booking.updateBooking)

export default bookingRouter