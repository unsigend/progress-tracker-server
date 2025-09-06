/**
 * Custom error class for the application
 */
class AppError extends Error {
    statusCode: number = 500;

    /**
     * Constructor for the AppError class
     * @param message - the error message
     * @param statusCode - the status code of the error
     */
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export default AppError;
