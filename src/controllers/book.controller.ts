// import dependencies
import { Request, Response, NextFunction } from "express";

// import service
import bookService from "@/service/book.service";

// import types
import { BookQueryType, BookType } from "@root/shared/types";

/**
 * Book controller
 */
const bookController = {
    /**
     * @swagger
     * /api/v1/books:
     *   get:
     *     summary: Get all books
     *     tags: [Books]
     *     parameters:
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *         description: Maximum number of books to return
     *       - in: query
     *         name: offset
     *         schema:
     *           type: integer
     *         description: Number of books to skip
     *       - in: query
     *         name: search
     *         schema:
     *           type: string
     *         description: Search term for title or author
     *     responses:
     *       200:
     *         description: List of books
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Book'
     *       400:
     *         description: Bad request
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    getAllBooks: async (req: Request, res: Response, next: NextFunction) => {
        const query: BookQueryType = req.query;
        try {
            const allBooks = await bookService.getAllBooks(query);
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
        const id: string = req.params.id as string;

        try {
            const book = await bookService.getBookByID(id);
            res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    },

    /**
     * @swagger
     * /api/v1/books:
     *   post:
     *     summary: Create a new book
     *     tags: [Books]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Book'
     *     responses:
     *       201:
     *         description: Book created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Book'
     *       400:
     *         description: Invalid book data
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
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
