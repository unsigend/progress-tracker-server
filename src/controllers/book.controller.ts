// import dependencies
import { Request, Response, NextFunction } from "express";

// import service
import bookService from "@/service/book.service";

// import error
import AppError from "@/util/error";

// import types
import { BookType } from "@root/shared/types";

/**
 * Book controller
 */
const bookController = {
    /**
     * Get all books
     * @param req - the request object
     * @param res - the response object
     * @param next - the next function
     * @api public: GET /api/v1/book
     */
    getAllBooks: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allBooks = await bookService.getAllBooks();
            res.status(200).json(allBooks);
        } catch (error) {
            next(error);
        }
    },

    /**
     * Get a book by ID
     * @param req - the request object
     * @param res - the response object
     * @param next - the next function
     * @api public: GET /api/v1/book/:id
     */
    getBookByID: async (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.id) {
            return next(new AppError("Book ID is required", 400));
        }
        const id: string = req.params.id as string;

        try {
            const book = await bookService.getBookByID(id);
            res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    },

    /**
     * Create a book
     * @param req - the request object
     * @param res - the response object
     * @param next - the next function
     * @api public: POST /api/v1/book
     */
    createBook: async (req: Request, res: Response, next: NextFunction) => {
        const book: BookType = req.body;

        try {
            const newBook = await bookService.createBook(book);
            res.status(201).json(newBook);
        } catch (error) {
            next(error);
        }
    },

    /**
     * Update a book
     * @param req - the request object
     * @param res - the response object
     * @param next - the next function
     * @api public: PUT /api/v1/book/:id
     */
    updateBook: async (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.id) {
            return next(new AppError("Book ID is required", 400));
        }
        const id: string = req.params.id as string;
        const book: BookType = req.body;

        try {
            const updatedBook = await bookService.updateBook(id, book);
            res.status(200).json(updatedBook);
        } catch (error) {
            next(error);
        }
    },

    /**
     * Delete a book
     * @param req - the request object
     * @param res - the response object
     * @param next - the next function
     * @api public: DELETE /api/v1/book/:id
     */
    deleteBook: async (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.id) {
            return next(new AppError("Book ID is required", 400));
        }
        const id: string = req.params.id as string;

        try {
            const deletedBook = await bookService.deleteBookByID(id);
            res.status(200).json(deletedBook);
        } catch (error) {
            next(error);
        }
    },
};

export default bookController;
