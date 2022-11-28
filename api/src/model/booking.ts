import { time } from 'console'
import {Schema, model, Document, Types} from 'mongoose'

export interface IBooking extends Document {
    heading: string,
    userId: Types.ObjectId,
    date: string,
    technology: string[],
    startTime: string,
    endTime: string,
}

const bookingSchema = new Schema({
    meetingName: {
        type: String
    },
    userId: {
        type: Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: String
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