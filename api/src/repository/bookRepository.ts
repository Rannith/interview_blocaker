import { Model, ObjectId, Types, Schema, UpdateQuery } from 'mongoose';
import { IBooking } from "../model/booking"
import { ITechnology } from '../model/technology';
import BaseRepository from './baseRepository';
import dayjs from 'dayjs';

class BookRepository {
    baseRepository: BaseRepository;
    constructor() {
        this.baseRepository = new BaseRepository
    }
    public saveBooking = async (book: IBooking & { _id: Types.ObjectId }) => {
        const dbResult = await book.save()

        return dbResult
    }

    public getMyBookings = async (Book: Model<IBooking, {}, {}, {}, any>, userId: string | Schema.Types.ObjectId, friday: Date) => {
        if (await this.baseRepository.checkContent(Book, userId)) {
            throw ({ status: 404, message: "No Content" })
        }
        // let date = friday.toISOString();
        // console.log(friday);

        // console.log("LOg  : ", dayjs(friday).format('YYYY-MM-DD'));

        // const val = await Book.find({ userId: userId, date: { $lt: dayjs(friday).format('YYYY-MM-DD'), $gte: new Date(friday.setDate(friday.getDate() - 8)) } })

        // console.log("val : ", val);

        // const dbResult = await Book.find({ userId: userId })
        const dbResult = await Book.find({ userId: userId, date: { $lt: dayjs(friday).format('YYYY-MM-DD'), $gte: new Date(friday.setDate(friday.getDate() - 8)) } })

        return dbResult
    }

    public getTechnology = async (Technology: Model<ITechnology, {}, {}, {}, any>) => {
        const dbResult = await Technology.find()

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