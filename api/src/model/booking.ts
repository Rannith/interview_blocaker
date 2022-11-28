import {Schema, model, Document, Types} from 'mongoose'

export interface IBooking extends Document {
    meetingName: string,
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
        type: Date
    },
    technology: {
        type: [String]
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    }
},
    {
        timestamps: true
    })

export default model<IBooking>('booking', bookingSchema)