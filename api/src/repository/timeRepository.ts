import { Model } from "mongoose";
import { IBooking } from "../utils/types";

class TimeRepository {

    public checkAvailableTime = async (Book: Model<IBooking, {}, {}, {}, any>, date: string, startTime: string, endTime: string) => {
        const dbResult = await Book.find({ date: date })

        return dbResult
    }
}

export default TimeRepository;