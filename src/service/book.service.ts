// import models
import BookModel from "@/models/book.model";

// import types
import { BookType, BookQueryType } from "@root/shared/types";

// import util
import ISBNUtil from "@/util/ISBN";

const queryConfig = {
    defaultSortBy: "createdAt",
    defaultOrder: "desc",
    defaultPage: 1,
    defaultLimit: 10,
};

const bookService = {
    /**
     * Get all books
     * @param query - the query object
     * @returns {BookType[]} the list of books
     */
    getAllBooks: async (query: BookQueryType): Promise<BookType[]> => {
        const filters: any = {};
        const projection = null;
        const options: any = {};

        // handle search
        if (query.search && query.search !== "") {
            if (ISBNUtil.isISBN(query.search)) {
                filters["ISBN"] = ISBNUtil.normalizeISBN(query.search);
            } else {
                filters.$or = [
                    { title: { $regex: query.search, $options: "i" } },
                    { author: { $regex: query.search, $options: "i" } },
                ];
            }
        }

        // handle sorting
        if (query.sortedBy) {
            const sortOrder = query.order === "asc" ? 1 : -1;
            options.sort = { [query.sortedBy]: sortOrder };
        } else {
            options.sort = {
                [queryConfig.defaultSortBy]: queryConfig.defaultOrder,
            };
        }

        // handle pagination
        const _page = query.page
            ? typeof query.page === "string"
                ? parseInt(query.page, 10)
                : query.page
            : queryConfig.defaultPage;
        const _limit = query.limit
            ? typeof query.limit === "string"
                ? parseInt(query.limit, 10)
                : query.limit
            : queryConfig.defaultLimit;

        options.skip = (_page - 1) * _limit;
        options.limit = _limit;

        const books = await BookModel.find(filters, projection, options);
        return books as any;
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
     * Get a book by ISBN
     * @param ISBN - the ISBN of the book to get
     * @returns {BookType | null} the book document or null if not found
     */
    getBookByISBN: async (ISBN: string): Promise<BookType | null> => {
        const book = await BookModel.findOne({
            ISBN: ISBNUtil.normalizeISBN(ISBN.toUpperCase()),
        });
        return book as BookType | null;
    },

    /**
     * Create a new book
     * @param book - the book to create
     * @returns {BookType} the created book document
     */
    createBook: async (book: BookType): Promise<BookType> => {
        // the server will save the ISBN as the normalized ISBN
        const normalizedISBN = ISBNUtil.normalizeISBN(book.ISBN || "");
        book.ISBN = normalizedISBN;
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
        const newBook = {
            ...book,
            updatedAt: new Date(),
        };
        const updatedBook = await BookModel.findByIdAndUpdate(id, newBook, {
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
