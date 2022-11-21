import { Request, Response, NextFunction } from 'express'
import BookService from '../service/bookService'

class BookController {
    bookService: BookService
    constructor() {
        this.bookService = new BookService
    }

    public saveBooking = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const saveBooking = await this.bookService.saveBooking(req.body)

            return res.status(201).json(saveBooking)
        }
        catch (err) {
            return res.status(500).json({error: err})
        }
    }

    public getMyBookings = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getMyBooking = await this.bookService.getMyBookings(req.params.userId)

            return res.status(200).json(getMyBooking)
        }
        catch (err) {
            return res.status(500).json({error: err})
        }
    }

    public deleteBooking = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const deleteBooking = await this.bookService.deleteBooking(req.params.bookingId)

            return res.status(200).json(deleteBooking)
        }
        catch (err) {
            res.status(500).json({error: err})
        }
    }

    public updateBooking = async (req: Request, res:Response, next: NextFunction) => {
        try {
            console.log("in booking");
            
            const updateBooking = await this.bookService.updateBooking(req.params.bookingId, req.body)

            return res.status(200).json(updateBooking)
        }
        catch (err) {
            return res.status(500).json({error: err})
        }
    }
}

export default BookController