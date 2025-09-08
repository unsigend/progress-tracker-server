// import dependencies
import { Router } from "express";

// import controllers
import userController from "@/controllers/user.controller";

// import middleware
import validateMiddleware from "@/middleware/validateMiddleware";

// import schema
import userSchema from "@/schema/user.schema";

// create router instance
const userRouter = Router();

// setup routes
userRouter.get("/email/:email", userController.getUserByEmail);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/", validateMiddleware(userSchema), userController.createUser);
userRouter.delete("/:id", userController.deleteUserById);

export default userRouter;
