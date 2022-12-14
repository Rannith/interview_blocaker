import express, { json } from 'express';
import cors from 'cors';
import './database';
import ErrorHandler from './utils/errorHandler';
import router from './route';

const app = express()

const port = process.env.PORT

app.use(json())
app.use(cors())

app.use('/api/v1', router)

app.use(new ErrorHandler().handleErrors)

app.listen(port, () => console.log(`App listening on port ${port}!`))