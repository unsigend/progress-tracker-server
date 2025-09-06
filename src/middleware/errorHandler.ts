// import dependencies
import { Request, Response, NextFunction } from "express";

// import util
import logger from "@/util/log";

// import error
import AppError from "@/util/error";

// default error handler
const errorHandler = (
    err: Error | AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    logger.serverLog(logger.logType.ERROR, err.message);
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    res.status(statusCode).json({
        error: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

export default errorHandler;
