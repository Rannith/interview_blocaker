import { Schema, model, Document } from "mongoose";
import { IUser } from "../utils/types";

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

export default model<IUser>('user', userSchema);