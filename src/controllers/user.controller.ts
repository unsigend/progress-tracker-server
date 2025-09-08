// import dependencies
import { Request, Response, NextFunction } from "express";

// import service
import userService from "@/service/user.service";

// import types
import { UserType } from "@root/shared/types";

// import error
import AppError from "@/util/error";

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
        const userWithEmail = await userService.getUserByEmail(user.email);

        if (userWithEmail) {
            return next(new AppError("Email already in use", 400));
        }

        try {
            const newUser = await userService.createUser(user);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    },

    /**
     * Check if a user email is already in use
     * @param req - the request object
     * @param res - the response object
     * @param next - the next function
     * @api public: GET /api/v1/user/email/check?email=:email
     */
    checkUserEmail: async (req: Request, res: Response, next: NextFunction) => {
        const email: string = req.query.email as string;
        let userWithEmail: UserType | null = null;

        try {
            userWithEmail = await userService.getUserByEmail(email);
        } catch (error) {
            next(error);
        }

        if (userWithEmail) {
            return res.status(200).json({
                exists: true,
                message: "Email already in use",
            });
        } else {
            return res.status(200).json({
                exists: false,
                message: "Email is available",
            });
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
        const id: string = req.params.id as string;

        try {
            const deletedUser = await userService.deleteUserById(id);
            res.status(200).json(deletedUser);
        } catch (error) {
            next(error);
        }
    },

    /**
     * Update a user by ID
     * @param req - the request object
     * @param res - the response object
     * @param next - the next function
     * @api public: PUT /api/v1/user/:id
     */
    updateUserById: async (req: Request, res: Response, next: NextFunction) => {
        const id: string = req.params.id as string;
        const user: UserType = req.body;

        try {
            const updatedUser = await userService.updateUserById(id, user);
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    },
};

export default userController;
