import { time } from 'console'
import {Schema, model, Document, Types} from 'mongoose'

export interface IBooking extends Document {
    heading: string,
    userId: Types.ObjectId,
    date: Date,
    technology: string[],
    startTime: string,
    endTime: string,
}

const bookingSchema = new Schema({
    heading: {
        type: String
    },
    userId: {
        type: Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date
    },
    technology: {
        type: [String]
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    }
})

export default model<IBooking>('booking', bookingSchema)