import BookRepository from "../repository/bookRepository";
import Booking from '../model/booking';
import { IBooking } from "../utils/types";
import User from '../model/user';
import Technology from "../model/technology";
import { ObjectId, Schema, UpdateQuery } from "mongoose";
import dayjs from 'dayjs';

class BookService {
    
    bookRepository: BookRepository
    constructor() {
        this.bookRepository = new BookRepository()
    }

    public saveBooking = async (meetingName: string, date: string | number | Date | dayjs.Dayjs | null | undefined, startTime: any, endTime: any, technology: [string], userId: string) => {
        const book = new Booking({
            meetingName: meetingName,
            date: dayjs(date).format('YYYY-MM-DD'),
            startTime: startTime,
            endTime: endTime,
            technology: technology,
            userId: userId
        })

        const saveBooking = await this.bookRepository.saveBooking(book)

        return saveBooking
    }

    public getMyBookings = async (userId: string | Schema.Types.ObjectId, week: string) => {
        let dateCopy
        week === "2" ?
            dateCopy = new Date(new Date(new Date().setDate(new Date().getDate() + ((7 - new Date().getDay() + 5) % 7 || 7))))
            :
            dateCopy = new Date()

        const getFriday = new Date(dateCopy.setDate(dateCopy.getDate() + ((7 - dateCopy.getDay() + 5) % 7 || 7)))

        const getMyBookings = await this.bookRepository.getMyBookings(Booking, userId, getFriday)

        return getMyBookings
    }

    public getTechnology = async () => {
        const getTechnology = await this.bookRepository.getTechnology(Technology)

        return getTechnology
    }

    public deleteBooking = async (bookingId: string | Schema.Types.ObjectId) => {
        const deleteBooking = await this.bookRepository.deleteBooking(Booking, bookingId)

        return deleteBooking
    }

    public updateBooking = async (bookingId: string | Schema.Types.ObjectId, bookingPayload: UpdateQuery<IBooking> | undefined) => {
        const updateBooking = await this.bookRepository.updateBooking(Booking, bookingId, bookingPayload)

        return updateBooking
    }

    public getAllUserDetails = async () => {
        const tuesday = new Date(new Date(new Date().setDate(new Date().getDate() + ((7 - new Date().getDay() + 2) % 7 || 7))))
        const getAllUserDetails = await this.bookRepository.getAllUserDetails(Booking, tuesday)

        const users = await User.find()
        let userArray: any = []

        users.map(user => {
            if (getAllUserDetails.length <= 0) {        //if no user booked the slot from last tues to current week tues -> storing the user to an array
                userArray.push(user._id)
            } else {                                    //
                getAllUserDetails.forEach(element => {
                    if (element.userId.toString() !== user._id.toString()) {
                        if (!userArray.includes(user._id)) {   
                            userArray.push(user._id)
                        } 
                    }
                })
            }
        })

        const notInUser = await User.find({_id: {$in: userArray}})

        console.log("user : ", notInUser)

        return notInUser
    }
}

export default BookService