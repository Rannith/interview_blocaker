import express, { json } from 'express'
import cors from 'cors'
import userRouter from './route/userRoute'
import bookingRouter from './route/bookingRoute'
import './database'

const app = express()

const port = process.env.PORT

app.use(json())
app.use(cors())

app.use('/user', userRouter)
app.use('/booking', bookingRouter)

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))