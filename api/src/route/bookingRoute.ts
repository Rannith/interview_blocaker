import { Router } from "express";
import BookController from '../controller/bookControler';

const bookingRouter = Router()
const booking = new BookController()

bookingRouter.get('/slots/:userId', booking.getMyBookings)
bookingRouter.get('/technology', booking.getTechnology)
bookingRouter.post('/',booking.saveBooking)
bookingRouter.delete('/:bookingId', booking.deleteBooking)
bookingRouter.put('/:bookingId', booking.updateBooking)

export default bookingRouter