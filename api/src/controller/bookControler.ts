import { Request, Response, NextFunction } from 'express'
import BookService from '../service/bookService'
import ResponseWrapper from '../utils/responseWrapper'

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
            const saveBooking = await this.bookService.saveBooking(req.body)

            return res.status(201).json(this.responseWrapper.success("Slot Booked Successfully", saveBooking, res.statusCode))
        }
        catch (err) {
            next(err)
            // return res.status(500).json(this.responseWrapper.error(err, res.statusCode))
        }
    }

    public getMyBookings = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getMyBooking = await this.bookService.getMyBookings(req.params.userId)

            return res.status(200).json(this.responseWrapper.success("Data Retrived Successfully", getMyBooking, res.statusCode))
        }
        catch (err) {
            next(err)
            // return res.status(500).json(this.responseWrapper.error(err, res.statusCode))
        }
    }

    public deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteBooking = await this.bookService.deleteBooking(req.params.bookingId)

            return res.status(200).json(this.responseWrapper.success(`deleted Successfully`, deleteBooking, res.statusCode))
        }
        catch (err) {
            next(err)
            // if(err.status) {
            //     res.status(err.status).json(this.responseWrapper.error(err.message, err.status))
            // }else {
            //     res.status(500).json(this.responseWrapper.error(err, res.statusCode))
            // }
        }
    }

    public updateBooking = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateBooking = await this.bookService.updateBooking(req.params.bookingId, req.body)

            return res.status(200).json(this.responseWrapper.success(`${updateBooking?.meetingName} updated Successfully`, updateBooking, res.statusCode))
        }
        catch (err) {
            next(err)
            // return res.status(500).json(this.responseWrapper.error(err, res.statusCode))
        }
    }
}

export default BookController