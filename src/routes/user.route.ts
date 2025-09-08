// import dependencies
import { Router } from "express";

// import controllers
import userController from "@/controllers/user.controller";

// import middleware
import {
    validateBodyMiddleware,
    validateParamsMiddleware,
} from "@/middleware/validateMiddleware";

// import schema
import { userSchema, userUpdateSchema } from "@/schema/user.schema";
import { MongoDBObjectIdSchema } from "@/schema/general.schema";

// create router instance
const userRouter = Router();

// setup routes
userRouter.get("/email/:email", userController.getUserByEmail);
userRouter.get(
    "/:id",
    validateParamsMiddleware(MongoDBObjectIdSchema),
    userController.getUserById
);
userRouter.post(
    "/",
    validateBodyMiddleware(userSchema),
    userController.createUser
);
userRouter.delete(
    "/:id",
    validateParamsMiddleware(MongoDBObjectIdSchema),
    userController.deleteUserById
);

userRouter.put(
    "/:id",
    validateParamsMiddleware(MongoDBObjectIdSchema),
    validateBodyMiddleware(userUpdateSchema),
    userController.updateUserById
);

export default userRouter;
