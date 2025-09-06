// import models
import BookModel from "@/models/book.model";

// import types
import { BookType } from "@root/shared/types";

const bookService = {
    /**
     * Get all books
     * @returns {BookType[]} the list of books
     */
    getAllBooks: async (): Promise<BookType[]> => {
        const books = await BookModel.find();
        return books as BookType[];
    },

    /**
     * Get a book by ID
     * @param id - the id of the book to get
     * @returns {BookType | null} the book document or null if not found
     */
    getBookByID: async (id: string): Promise<BookType | null> => {
        const book = await BookModel.findById(id);
        return book as BookType | null;
    },

    /**
     * Create a new book
     * @param book - the book to create
     * @returns {BookType} the created book document
     */
    createBook: async (book: BookType): Promise<BookType> => {
        const newBook = await BookModel.create(book);
        return newBook as BookType;
    },

    /**
     * Update a book by ID
     * @param id - the id of the book to update
     * @param book - the book to update
     * @returns {BookType | null} the updated book document or null if not found
     */
    updateBook: async (id: string, book: BookType) => {
        const updatedBook = await BookModel.findByIdAndUpdate(id, book, {
            new: true,
        });
        return updatedBook as BookType | null;
    },

    /**
     * Delete a book by ID
     * @param id - the id of the book to delete
     * @returns {BookType | null} the deleted book document or null if not found
     */
    deleteBookByID: async (id: string): Promise<BookType | null> => {
        const deletedBook = await BookModel.findByIdAndDelete(id);
        return deletedBook as BookType | null;
    },
};

export default bookService;
