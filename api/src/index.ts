import express, { json } from 'express'
import cors from 'cors'
import userRouter from './route/userRoute'
import bookingRouter from './route/bookingRoute'
import './database'
import ResponseWrapper from './utils/responseWrapper'
import { NextFunction, Request, Response } from 'express';
import ErrorHandler from './utils/errorHandler'

const app = express()

const port = process.env.PORT
const responseWrapper = new ResponseWrapper()

app.use(json())
app.use(cors())

app.use('/user', userRouter)
app.use('/booking', bookingRouter)

app.use(new ErrorHandler().handleErrors)
// app.use(function (err: {status: number, message: Object}, req: Request, res: Response, next: NextFunction) {    
//     if(err.status) {
//             res.status(err.status).json(responseWrapper.error(err.message, err.status))
//         }else {
//             res.status(500).json(responseWrapper.error(err, res.statusCode))
//         }
// })

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`App listening on port ${port}!`))