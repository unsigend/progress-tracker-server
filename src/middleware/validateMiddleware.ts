// import types
import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

// import error
import AppError from "@/util/error";

/**
 * Validate middleware
 * @param schema - the schema to validate
 * @returns {Express.Handler} the request handler
 */
const validateMiddleware = (schema: ZodSchema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                // extract the first error message
                const firstErrorMessage =
                    error.issues[0]?.message || "Invalid request body";
                return next(new AppError(firstErrorMessage, 400));
            }
            return next(error);
        }
    };
};

export default validateMiddleware;
