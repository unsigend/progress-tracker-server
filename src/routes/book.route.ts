// import dependencies
import { Router } from "express";

// import controllers
import bookController from "@/controllers/book.controller.js";

// create router instance
const bookRouter = Router();

// setup routes
bookRouter.get("/", bookController.getAllBooks);
bookRouter.get("/:id", bookController.getBookByID);
bookRouter.post("/", bookController.createBook);
bookRouter.put("/:id", bookController.updateBook);
bookRouter.delete("/:id", bookController.deleteBook);

export default bookRouter;
