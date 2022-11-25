import { Model } from "mongoose"
import { IBooking } from "../model/booking"

class TimeRepository {
    public checkAvailableTime = async (Book: Model<IBooking, {}, {}, {}, any>, date: string, startTime: string, endTime: string) => {
        const dbResult = await Book.find({ date: date })

        return dbResult
        // dbResult.map(e => {
        //     const st = new Date(`1/1/2011 ` + e.startTime)
        //     const et = new Date(`1/1/2011 ` + e.endTime)

        //     console.log(`st for ${e.startTime} : `,typeof st)
        //     console.log(`et for ${e.endTime}: `, et)

        //     const inSt = new Date(`1/1/2011 ` + startTime)
        //     const inEt = new Date('1/1/2011 ' + endTime)
        //     console.log('inputs : ', typeof inSt)
            
        //     if(st <= inSt && inSt <= et || st <= inEt && inEt <= et) {
        //         console.log("with in time zone")
        //     } else if(inSt <= st && st <= inEt || inSt <= et && et <= inEt) {
        //         console.log("with in the time zone part 2")
        //     }
        // })

        // console.log(dbResult)
    }
}

export default TimeRepository