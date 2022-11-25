import Booking from "../model/booking";
import TimeRepository from "../repository/timeRepository";
import * as config from '../utils/config'

class TimeService {
    timeRepository: TimeRepository;
    constructor() {
        this.timeRepository = new TimeRepository()
    }
    public checkAvailableTime = async (payload: { date: any; startTime: any; endTime: any; }) => {
        const { date, startTime, endTime } = payload;
        let result

        const checkAvailableTime = await this.timeRepository.checkAvailableTime(Booking, date, startTime, endTime)

        checkAvailableTime.map(element => {
            const startedTime = new Date(config.dateValue + element.startTime)
            const endedTime = new Date(config.dateValue + element.endTime)

            const inStartTime = new Date(config.dateValue + startTime)
            const inEndTime = new Date(config.dateValue + endTime)

            if (startedTime <= inStartTime && inStartTime <= endedTime
                || startedTime <= inEndTime && inEndTime <= endedTime
                || inStartTime <= startedTime && startedTime <= inEndTime
                || inStartTime <= endedTime && endedTime <= inEndTime
                ) {
                    console.log("in time zone");
                    
                result = { message: `you have booked time slot of ${element.startTime} to ${element.endTime},please booked another time slot` }
            }
        })

        return result

    }
}

export default TimeService