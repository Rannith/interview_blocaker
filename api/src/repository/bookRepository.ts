import { Model, ObjectId, Types, Schema, UpdateQuery } from 'mongoose';
import { IBooking } from "../model/booking"

class BookRepository {
    public saveBooking = async (book: IBooking & { _id: Types.ObjectId }) => {
        const dbResult = await book.save()

        return dbResult
    }

    public getMyBookings = async (Book: Model<IBooking, {}, {}, {}, any>, userId: string | Schema.Types.ObjectId) => {
        const dbResult = await Book.find({userId: userId})

        return dbResult
    }

    public deleteBooking = async (Book: Model<IBooking, {}, {}, {}, any>, bookingId: string | Schema.Types.ObjectId) => {
        const dbResult = await Book.findByIdAndDelete(bookingId)

        return dbResult
    }

    public updateBooking = async (Book: Model<IBooking, {}, {}, {}, any>, bookingId: string | Schema.Types.ObjectId, bookingPayload: UpdateQuery<IBooking> | undefined) => {
        const dbResult = await Book.findByIdAndUpdate(bookingId, bookingPayload)

        return dbResult
    }
}

export default BookRepository