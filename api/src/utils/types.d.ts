import { Document } from "mongoose";

export interface IUser extends Document {
    userName: string;
    email: string;
    aceNo: string;
}

export interface ITechnology extends Document {
    techlology: string
}


export interface IBooking extends Document {
    meetingName: string,
    userId: Types.ObjectId,
    date: string,
    technology: string[],
    startTime: string,
    endTime: string,
}
