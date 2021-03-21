class ErrorReponse extends Error {
    constructor(public message: string, public statusCode: number) {
        super(message);
    }
}

export default ErrorReponse;
