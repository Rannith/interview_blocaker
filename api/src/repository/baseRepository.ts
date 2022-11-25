import { Model, Schema } from "mongoose"
import { IBooking } from "../model/booking"

class BaseRepository {
    public checkBooking = async (Book: Model<IBooking, {}, {}, {}, any>, bookingId: string | Schema.Types.ObjectId) => {
        const slot = await Book.find({ _id: bookingId })

        if (slot.length <= 0)
            return true

        return false
    }

    public checkContent = async (Book: Model<IBooking, {}, {}, {}, any>, userId: string | Schema.Types.ObjectId) => {
        const bookedSlots = await Book.find({ userId: userId })

        if (bookedSlots.length <= 0)
            return true

        return false
    }
}

export default BaseRepository