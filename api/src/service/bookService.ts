import BookRepository from "../repository/bookRepository"
import Booking, { IBooking } from '../model/booking'
import { ObjectId, Schema, UpdateQuery } from "mongoose"

class BookService {
    bookRepository: BookRepository
    constructor() {
        this.bookRepository = new BookRepository()
    }

    public saveBooking = async (bookPayload: Object) => {
        const book = new Booking(bookPayload)

        const saveBooking = await this.bookRepository.saveBooking(book)

        return saveBooking
    }

    public getMyBookings = async (userId: string | Schema.Types.ObjectId) => {
        const getMyBookings = await this.bookRepository.getMyBookings(Booking, userId)

        return getMyBookings
    }

    public deleteBooking = async (bookingId: string | Schema.Types.ObjectId) => {
        const deleteBooking = await this.bookRepository.deleteBooking(Booking,bookingId)

        return deleteBooking
    }

    public updateBooking = async (bookingId: string | Schema.Types.ObjectId, bookingPayload: UpdateQuery<IBooking> | undefined) => {
        const updateBooking = await this.bookRepository.updateBooking(Booking, bookingId, bookingPayload)

        return updateBooking
    }
}

export default BookService