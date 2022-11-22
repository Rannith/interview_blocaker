import { Model, Schema } from "mongoose"
import { IBooking } from "../model/booking"

class BaseRepository {
    public checkBooking = async (Book: Model<IBooking, {}, {}, {}, any>, bookingId: string | Schema.Types.ObjectId) => {
        const slot = await Book.find({ _id: bookingId })

        if (slot.length <= 0)
            return true

        return false
    }
}

export default BaseRepository