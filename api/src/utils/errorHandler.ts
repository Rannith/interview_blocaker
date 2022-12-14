import { NextFunction, Request, Response } from "express";
import ResponseWrapper from "./responseWrapper";

const responseWrapper = new ResponseWrapper()

class ErrorHandler {
    
    public handleErrors(err: {status: number, message: string}, req:Request, res: Response, next: NextFunction) {
        
        if(err.status) {
            res.status(err.status).json(responseWrapper.error(err.message, err.status))
        }else {
            res.status(500).json(responseWrapper.error(err, res.statusCode))
        }
    }
}

export default ErrorHandler;