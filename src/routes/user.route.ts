// import dependencies
import { Router } from "express";

// import controllers
import userController from "@/controllers/user.controller";

// create router instance
const userRouter = Router();

// setup routes
userRouter.get("/email/:email", userController.getUserByEmail);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/", userController.createUser);
userRouter.delete("/:id", userController.deleteUserById);

export default userRouter;
