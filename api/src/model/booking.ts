import {Schema, model, Document, Types} from 'mongoose'

export interface IBooking extends Document {
    userId: Types.ObjectId,
    date: Date,
    technology: string[],
    startTime: string,
    endTime: string,
}

const bookingSchema = new Schema({
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