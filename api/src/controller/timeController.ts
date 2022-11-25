import { NextFunction, Request, Response } from "express"
import TimeService from "../service/timeService"

class TimeController {
    timeService: TimeService
    constructor() {
        this.timeService = new TimeService()
    }

    public checkAvailableTime = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const checkAvailability = await this.timeService.checkAvailableTime(req.body)

            return res.status(200).json({ message: checkAvailability ? checkAvailability : "success" })
        }
        catch (err) {
            next(err)
        }
    }
}

export default TimeController