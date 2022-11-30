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
        const inStartTime = new Date(config.dateValue + dayjs(startTime).format('HH:mm'))
        const inEndTime = new Date(config.dateValue + dayjs(endTime).format('HH:mm'))

        if(inStartTime >= inEndTime) {
            throw ({ status: 400, message: `Start time ust be less than end time, your selection ${dayjs(inStartTime).format('hh:mm A')} to ${dayjs(inEndTime).format('hh:mm A')}` })
        } else if(dayjs(inEndTime).diff(dayjs(inStartTime)) <= config.minimumMinute) {
            throw ({ status: 400, message: `Book slot minimum 30 minutes, you booked ${dayjs(inEndTime).diff(dayjs(inStartTime))/60000} minutes only` })
        }

        const checkAvailableTime = await this.timeRepository.checkAvailableTime(Booking, date, startTime, endTime)

        checkAvailableTime.map(element => {
            const startedTime = new Date(config.dateValue + dayjs(element.startTime).format('HH:mm'))
            const endedTime = new Date(config.dateValue + dayjs(element.endTime).format('HH:mm'))

            if (startedTime <= inStartTime && inStartTime <= endedTime
                || startedTime <= inEndTime && inEndTime <= endedTime
                || inStartTime <= startedTime && startedTime <= inEndTime
                || inStartTime <= endedTime && endedTime <= inEndTime
            ) {
                // result = { message: `you have booked time slot of ${dayjs(element.startTime).format('h:mm A')} to ${dayjs(element.endTime).format('h:mm A')},please booked another time slot` }
                throw ({ status: 400, message: `you have booked time slot of ${dayjs(element.startTime).format('h:mm A')} to ${dayjs(element.endTime).format('h:mm A')},please book another time slot` })
            }
        })

        return result

    }
}

export default TimeService