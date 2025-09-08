// import dependencies
import { Router } from "express";

// import controllers
import bookController from "@/controllers/book.controller.js";

// import middleware
import {
    validateBodyMiddleware,
    validateParamsMiddleware,
    validateQueryMiddleware,
} from "@/middleware/validateMiddleware";

// import schema
import {
    bookQuerySchema,
    bookSchema,
    bookUpdateSchema,
} from "@/schema/book.schema";
import { MongoDBObjectIdSchema } from "@/schema/general.schema";

// create router instance
const bookRouter = Router();

// setup routes
bookRouter.get(
    "/",
    validateQueryMiddleware(bookQuerySchema),
    bookController.getAllBooks
);
bookRouter.get(
    "/:id",
    validateParamsMiddleware(MongoDBObjectIdSchema),
    bookController.getBookByID
);
bookRouter.post(
    "/",
    validateBodyMiddleware(bookSchema),
    bookController.createBook
);
bookRouter.put(
    "/:id",
    validateParamsMiddleware(MongoDBObjectIdSchema),
    validateBodyMiddleware(bookUpdateSchema),
    bookController.updateBook
);
bookRouter.delete(
    "/:id",
    validateParamsMiddleware(MongoDBObjectIdSchema),
    bookController.deleteBook
);

export default bookRouter;
