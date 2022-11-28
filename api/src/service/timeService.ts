import Booking from "../model/booking";
import TimeRepository from "../repository/timeRepository";
import * as config from '../utils/config'
import dayjs from 'dayjs';

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
            const startedTime = new Date(config.dateValue + dayjs(element.startTime).format('HH:mm'))
            const endedTime = new Date(config.dateValue + dayjs(element.endTime).format('HH:mm'))

            const inStartTime = new Date(config.dateValue + dayjs(startTime).format('HH:mm'))
            const inEndTime = new Date(config.dateValue + dayjs(endTime).format('HH:mm'))

            if (startedTime <= inStartTime && inStartTime <= endedTime
                || startedTime <= inEndTime && inEndTime <= endedTime
                || inStartTime <= startedTime && startedTime <= inEndTime
                || inStartTime <= endedTime && endedTime <= inEndTime
                ) {                    
                result = { message: `you have booked time slot of ${dayjs(element.startTime).format('h:mm A')} to ${dayjs(element.endTime).format('h:mm A')},please booked another time slot` }
            }
        })

        return result

    }
}

export default TimeService