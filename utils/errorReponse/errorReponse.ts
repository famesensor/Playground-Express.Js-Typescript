export default class ErrorReponse extends Error {
    constructor(message: string, public statusCode: number) {
        super(message);
    }
}
