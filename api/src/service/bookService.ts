import BookRepository from "../repository/bookRepository"
import Booking, { IBooking } from '../model/booking'
import Technology from "../model/technology"
import { ObjectId, Schema, UpdateQuery } from "mongoose"
import dayjs from 'dayjs';

class BookService {
    bookRepository: BookRepository
    constructor() {
        this.bookRepository = new BookRepository()
    }

    public saveBooking = async (meetingName:string, date: string | number | Date | dayjs.Dayjs | null | undefined, startTime: any, endTime: any, technology: [string], userId: string) => {
        const book = new Booking({
            meetingName: meetingName,
            date: dayjs(date).format('YYYY-MM-DD'),
            startTime: startTime,
            endTime: endTime,
            technology: technology,
            usetId: userId
        })

        const saveBooking = await this.bookRepository.saveBooking(book)

        return saveBooking
    }

    public getMyBookings = async (userId: string | Schema.Types.ObjectId) => {
        const getMyBookings = await this.bookRepository.getMyBookings(Booking, userId)

        return getMyBookings
    }

    public getTechnology = async () => {
        const getTechnology = await this.bookRepository.getTechnology(Technology)

        return getTechnology
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