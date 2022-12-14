class ResponseWrapper {
    
    public success = (message: string, results: object | any, statusCode: number) => {
        return {
            message,
            error: false,
            code: statusCode,
            results
        }
    }

    public error = (message: string | any, statusCode: number) => {
        const code = [200, 201, 400, 401, 404, 403, 422, 500]
        
        const findCode = code.find(code => code == statusCode)

        if(!findCode) statusCode == 500;
        else statusCode = findCode

        return {
            message,
            code: statusCode,
            error: true
        }
    }
}

export default ResponseWrapper;