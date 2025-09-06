// import dependencies
import bookService from "@/service/book.service";

// import model
import BookModel from "@/models/book.model";

// import mongoose
import mongoose from "mongoose";

// import test
import {
    describe,
    it,
    expect,
    beforeAll,
    afterAll,
    beforeEach,
} from "@jest/globals";

// import types
import { BookQueryType } from "@root/shared/types";

describe("Book Service: getAllBooks()", () => {
    const testBooks = [
        {
            title: "The Art of Computer Programming",
            author: "Donald E. Knuth",
            description: "A comprehensive book about computer programming",
            pages: 1000,
            image: "https://example.com/image1.jpg",
            ISBN: "9780201038019",
        },
        {
            title: "Clean Code",
            author: "Robert C. Martin",
            description: "A handbook of agile software craftsmanship",
            pages: 464,
            image: "https://example.com/image2.jpg",
            ISBN: "9780132350884",
        },
        {
            title: "Design Patterns",
            author: "Gang of Four",
            description: "Elements of reusable object-oriented software",
            pages: 395,
            image: "https://example.com/image3.jpg",
            ISBN: "9780201633610",
        },
        {
            title: "JavaScript: The Good Parts",
            author: "Douglas Crockford",
            description: "Unearthing the excellence in JavaScript",
            pages: 176,
            image: "https://example.com/image4.jpg",
            ISBN: "9780596517748",
        },
    ];

    beforeAll(async () => {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not set");
        }
        await mongoose.connect(process.env.MONGO_URI);
    });

    beforeEach(async () => {
        await BookModel.deleteMany({});
        await BookModel.insertMany(testBooks);
    });

    afterAll(async () => {
        await BookModel.deleteMany({});
        await mongoose.disconnect();
    });

    describe("Basic functionality", () => {
        it("should get all books with default pagination", async () => {
            const query: BookQueryType = {};
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(4);
            expect(books[0]!.title).toBeDefined();
            expect(books[0]!.author).toBeDefined();
        });

        it("should return empty array when no books exist", async () => {
            await BookModel.deleteMany({});
            const query: BookQueryType = {};
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(0);
        });
    });

    describe("Pagination", () => {
        it("should paginate results correctly", async () => {
            const query: BookQueryType = { limit: 2, page: 1 };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(2);
        });

        it("should handle page 2 correctly", async () => {
            const query: BookQueryType = { limit: 2, page: 2 };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(2);
        });

        it("should handle page beyond available data", async () => {
            const query: BookQueryType = { limit: 10, page: 2 };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(0);
        });

        it("should handle large page numbers correctly", async () => {
            const query: BookQueryType = { limit: 2, page: 3 };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(0); // Page 3 with limit 2 should be empty
        });

        it("should handle large limit values", async () => {
            const query: BookQueryType = { limit: 100, page: 1 };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(4); // All books should be returned
        });

        it("should handle string pagination parameters", async () => {
            const query: BookQueryType = {
                limit: "2" as any,
                page: "1" as any,
            };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(2);
        });
    });

    describe("Sorting", () => {
        it("should sort by title ascending", async () => {
            const query: BookQueryType = { sortedBy: "title", order: "asc" };
            const books = await bookService.getAllBooks(query);

            expect(books[0]!.title).toBe("Clean Code");
            expect(books[1]!.title).toBe("Design Patterns");
        });

        it("should sort by title descending", async () => {
            const query: BookQueryType = { sortedBy: "title", order: "desc" };
            const books = await bookService.getAllBooks(query);

            expect(books[0]!.title).toBe("The Art of Computer Programming");
        });

        it("should sort by createdAt descending by default", async () => {
            const query: BookQueryType = {};
            const books = await bookService.getAllBooks(query);

            // Should be sorted by createdAt desc by default
            expect(books).toHaveLength(4);
        });

        it("should handle invalid sort field gracefully", async () => {
            const query: BookQueryType = { sortedBy: "invalidField" as any };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(4);
        });
    });

    describe("Search functionality", () => {
        it("should search by title", async () => {
            const query: BookQueryType = { search: "Clean" };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(1);
            expect(books[0]!.title).toBe("Clean Code");
        });

        it("should search by author", async () => {
            const query: BookQueryType = { search: "Martin" };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(1);
            expect(books[0]!.author).toBe("Robert C. Martin");
        });

        it("should search case-insensitively", async () => {
            const query: BookQueryType = { search: "CLEAN" };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(1);
            expect(books[0]!.title).toBe("Clean Code");
        });

        it("should search by partial match", async () => {
            const query: BookQueryType = { search: "Java" };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(1);
            expect(books[0]!.title).toBe("JavaScript: The Good Parts");
        });

        it("should return empty array for no matches", async () => {
            const query: BookQueryType = { search: "NonExistentBook" };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(0);
        });

        it("should search by valid ISBN", async () => {
            const query: BookQueryType = { search: "9780132350884" };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(1);
            expect(books[0]!.title).toBe("Clean Code");
        });

        it("should search by ISBN-10 format", async () => {
            const query: BookQueryType = { search: "0132350882" };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(1);
            expect(books[0]!.title).toBe("Clean Code");
        });

        it("should handle hyphenated ISBN", async () => {
            const query: BookQueryType = { search: "978-0-13-235088-4" };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(1);
            expect(books[0]!.title).toBe("Clean Code");
        });

        it("should handle empty search string", async () => {
            const query: BookQueryType = { search: "" };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(4);
        });
    });

    describe("Combined queries", () => {
        it("should combine search and pagination", async () => {
            const query: BookQueryType = { search: "The", limit: 1, page: 1 };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(1);
            expect(books[0]!.title).toContain("The");
        });

        it("should combine search and sorting", async () => {
            const query: BookQueryType = {
                search: "a",
                sortedBy: "title",
                order: "asc",
            };
            const books = await bookService.getAllBooks(query);

            expect(books.length).toBeGreaterThan(0);
            // Should be sorted by title ascending
            for (let i = 1; i < books.length; i++) {
                expect(books[i]!.title! >= books[i - 1]!.title!).toBe(true);
            }
        });

        it("should handle complex query with all parameters", async () => {
            const query: BookQueryType = {
                search: "a",
                sortedBy: "title",
                order: "desc",
                limit: 2,
                page: 1,
            };
            const books = await bookService.getAllBooks(query);

            expect(books.length).toBeLessThanOrEqual(2);
        });
    });

    describe("Edge cases", () => {
        it("should handle reasonable large limit values", async () => {
            const query: BookQueryType = { limit: 50, page: 1 };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(4); // Should return all available books
        });

        it("should handle pagination beyond available data", async () => {
            const query: BookQueryType = { limit: 5, page: 2 };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(0); // No books on page 2 with limit 5
        });

        it("should handle single item pagination", async () => {
            const query: BookQueryType = { limit: 1, page: 1 };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(1);
            expect(books[0]!.title).toBeDefined();
        });

        it("should handle special characters in search", async () => {
            const query: BookQueryType = { search: "!@#$%^&*()" };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(0);
        });

        it("should handle null values in query", async () => {
            const query: BookQueryType = {
                search: null as any,
                sortedBy: null as any,
                order: null as any,
                limit: null as any,
                page: null as any,
            };
            const books = await bookService.getAllBooks(query);

            expect(books).toHaveLength(4);
        });
    });
});
