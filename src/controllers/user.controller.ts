// import dependencies
import { Request, Response, NextFunction } from "express";

// import service
import userService from "@/service/user.service";

// import error
import AppError from "@/util/error";

// import types
import { UserType } from "@root/shared/types";

/**
 * User controller
 */
const userController = {
    /**
     * Get a user by ID
     * @param req - the request object
     * @param res - the response object
     * @param next - the next function
     * @api public: GET /api/v1/user/:id
     */
    getUserById: async (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.id) {
            return next(new AppError("User ID is required", 400));
        }
        const id: string = req.params.id as string;

        try {
            const user = await userService.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    /**
     * Get a user by email
     * @param req - the request object
     * @param res - the response object
     * @param next - the next function
     * @api public: GET /api/v1/user/email/:email
     */
    getUserByEmail: async (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.email) {
            return next(new AppError("User email is required", 400));
        }
        const email: string = req.params.email as string;

        try {
            const user = await userService.getUserByEmail(email);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    /**
     * Create a user
     * @param req - the request object
     * @param res - the response object
     * @param next - the next function
     * @api public: POST /api/v1/user
     */
    createUser: async (req: Request, res: Response, next: NextFunction) => {
        const user: UserType = req.body;

        try {
            const newUser = await userService.createUser(user);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    },

    /**
     * Delete a user by ID
     * @param req - the request object
     * @param res - the response object
     * @param next - the next function
     * @api public: DELETE /api/v1/user/:id
     */
    deleteUserById: async (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.id) {
            return next(new AppError("User ID is required", 400));
        }
        const id: string = req.params.id as string;

        try {
            const deletedUser = await userService.deleteUserById(id);
            res.status(200).json(deletedUser);
        } catch (error) {
            next(error);
        }
    },
};

export default userController;
