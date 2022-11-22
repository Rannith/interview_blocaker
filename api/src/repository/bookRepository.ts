import { Model, ObjectId, Types, Schema, UpdateQuery } from 'mongoose';
import { IBooking } from "../model/booking"
import BaseRepository from './baseRepository';

class BookRepository {
    baseRepository: BaseRepository;
    constructor() {
        this.baseRepository = new BaseRepository
    }
    public saveBooking = async (book: IBooking & { _id: Types.ObjectId }) => {
        const dbResult = await book.save()

        return dbResult
    }

    public getMyBookings = async (Book: Model<IBooking, {}, {}, {}, any>, userId: string | Schema.Types.ObjectId) => {
        const dbResult = await Book.find({ userId: userId })

        return dbResult
    }

    public deleteBooking = async (Book: Model<IBooking, {}, {}, {}, any>, bookingId: string | Schema.Types.ObjectId) => {
        if (await this.baseRepository.checkBooking(Book, bookingId)) {
            throw ({ status: 404, message: "Booking does not exist" })
        }
        const dbResult = await Book.findByIdAndDelete(bookingId)

        return dbResult
    }

    public updateBooking = async (Book: Model<IBooking, {}, {}, {}, any>, bookingId: string | Schema.Types.ObjectId, bookingPayload: UpdateQuery<IBooking> | undefined) => {
        if (await this.baseRepository.checkBooking(Book, bookingId)) {
            throw ({ status: 404, message: "Booking does not exist" })
        }
        const dbResult = await Book.findByIdAndUpdate(bookingId, bookingPayload)

        return dbResult
    }
}

export default BookRepository