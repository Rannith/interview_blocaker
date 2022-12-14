import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import BookingService from '../service/bookService'

dotenv.config()

const bookingService = new BookingService()

const remainder = async () => {

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'interviewBlockerdotcom451@gmail.com',
            pass: 'uxsvyfmxhkrydmzy'
        }
    })

    const users = await bookingService.getAllUserDetails()
    let toMailArray: any = []

    users.forEach(user => {
        toMailArray.push(user.email)
    })

    console.log(toMailArray);

    let mailSlotBlocker = {
        from: process.env.USER,
        to: toMailArray,
        subject: "Interview Slot Block Remainder",
        html: `<h2>Hey, You have not booked any slot in this week. Please book the interview slot for this week.</h2>
            </div>`
    }

    transport.sendMail(mailSlotBlocker, function (err, info) {
        if (err) {
            console.log("err : ", err);
        } else {
            console.log("info : ", info.response);
        }
    })
}

export default remainder





// let mailSlotBlocker = {
//     from: process.env.USER,
//     to: 'kmrannithvikram451@gmail.com',
//     subject: "Interview Slot Booking",
//     html: `<h2>Hello, You have been booked the slot</h2>
//             </div>`
// }