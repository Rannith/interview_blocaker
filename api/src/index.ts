import express, { json } from 'express'
import cors from 'cors'
import './database'

const app = express()

const port = process.env.PORT

app.use(json())
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))