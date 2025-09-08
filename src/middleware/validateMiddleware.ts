// import types
import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

// import error
import AppError from "@/util/error";

/**
 * Parse the first error message from a ZodError
 * @param error - the ZodError to parse
 * @returns {string} the first error message
 */
const parseFirstErrorMessage = (error: ZodError) => {
    return error.issues[0]?.message || "Invalid request";
};

/**
 * Validate Request Body middleware
 * @param schema - the schema to validate
 * @returns {Express.Handler} the request middleware
 */
const validateBodyMiddleware = (schema: ZodSchema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                // extract the first error message
                const firstErrorMessage = parseFirstErrorMessage(error);
                return next(new AppError(firstErrorMessage, 400));
            }
            return next(error);
        }
    };
};

/**
 * Validate Request Params middleware
 * @param schema - the schema to validate
 * @returns {Express.Handler} the request middleware
 */
const validateParamsMiddleware = (schema: ZodSchema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            req.params = schema.parse(req.params) as any;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const firstErrorMessage = parseFirstErrorMessage(error);
                return next(new AppError(firstErrorMessage, 400));
            }
            return next(error);
        }
    };
};

/**
 * Validate Request Query middleware
 * @param schema - the schema to validate
 * @returns {Express.Handler} the request middleware
 */
const validateQueryMiddleware = (schema: ZodSchema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            // parse the query but don't reassign the query to the request object
            schema.parse(req.query);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const firstErrorMessage = parseFirstErrorMessage(error);
                return next(new AppError(firstErrorMessage, 400));
            }
            return next(error);
        }
    };
};

export {
    validateBodyMiddleware,
    validateParamsMiddleware,
    validateQueryMiddleware,
};
