import { Request, Response, NextFunction } from 'express';
import BookService from '../service/bookService';
import ResponseWrapper from '../utils/responseWrapper';

class BookController {

    bookService: BookService
    responseWrapper: ResponseWrapper
    constructor() {
        this.bookService = new BookService
        this.responseWrapper = new ResponseWrapper()
    }

    public saveBooking = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body)
            const { meetingName, date, startTime, endTime, technology } = req.body
            const { userId } = req.params
            const saveBooking = await this.bookService.saveBooking(meetingName, date, startTime, endTime, technology, userId)

            return res.status(201).json(this.responseWrapper.success(`${saveBooking.meetingName} Booked Successfully`, saveBooking, res.statusCode))
        }
        catch (err) {
            next(err)
        }
    }

    public getMyBookings = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getMyBooking = await this.bookService.getMyBookings(req.params.userId, req.params.week)

            return res.status(200).json(this.responseWrapper.success("Data Retrived Successfully", getMyBooking, res.statusCode))
        }
        catch (err) {
            next(err)
        }
    }

    public getTechnology = async (req: Request, res: Response, next: NextFunction) => {
        try {            
            const getTechnology = await this.bookService.getTechnology()

            return res.status(200).json(this.responseWrapper.success("Data Retrived Successfully", getTechnology, res.statusCode))
        }
        catch (err) {
            next(err)
        }
    }

    public deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteBooking = await this.bookService.deleteBooking(req.params.bookingId)

            return res.status(200).json(this.responseWrapper.success(`${deleteBooking?.meetingName} deleted Successfully`, deleteBooking, res.statusCode))
        }
        catch (err) {
            next(err)
        }
    }

    public updateBooking = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateBooking = await this.bookService.updateBooking(req.params.bookingId, req.body)

            return res.status(200).json(this.responseWrapper.success(`${updateBooking?.meetingName} updated Successfully`, updateBooking, res.statusCode))
        }
        catch (err) {
            next(err)
        }
    }

    public getAllUserDetails =async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getAllUser = await this.bookService.getAllUserDetails()
        }
        catch (err) {
            next(err)
        }
    }
}

export default BookController;