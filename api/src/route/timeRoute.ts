import { Router } from "express";
import TimeController from "../controller/timeController";

const timeRouter = Router()
const time = new TimeController()

timeRouter.post('/', time.checkAvailableTime)

export default timeRouter;