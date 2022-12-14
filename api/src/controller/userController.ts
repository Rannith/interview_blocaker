import { NextFunction, Request, Response } from "express";
import UserService from '../service/userService';

class UserController {

    userService: UserService;
    constructor() {
        this.userService = new UserService()
    }
    public registerUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const registerUser = await this.userService.registerUser(req.body)

            return res.status(201).json(registerUser)
        }
        catch (err) {
            return res.status(500).json({ error: err })
        }
    }

    public getAllUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getAllUser = await this.userService.getAllUser()

            return res.status(200).json(getAllUser)
        }
        catch (err) {
            return res.status(500).json({error: err})
        }
    }
}

export default UserController;