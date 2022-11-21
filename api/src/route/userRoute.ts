import { Router } from "express";
import UserController from '../controller/userController';

const userRouter = Router()
const user = new UserController()

userRouter.post('/', user.registerUser)
userRouter.get('/', user.getAllUser)

export default userRouter