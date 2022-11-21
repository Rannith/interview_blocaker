import { Schema, model, Document } from "mongoose";

export interface IUser extends Document{
    userName: string;
    email: string;
    aceNo: string;
}

const userSchema = new Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
    },
    aceNo: {
        type: String
    }
})

export default model<IUser>('user', userSchema)