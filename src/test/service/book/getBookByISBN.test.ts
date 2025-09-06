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
import ISBNUtil from "@/util/ISBN";

describe("Book Service: getBookByISBN()", () => {
    const testBooks = [
        {
            title: "Clean Code",
            author: "Robert C. Martin",
            description: "A handbook of agile software craftsmanship",
            pages: 464,
            image: "https://example.com/image1.jpg",
            ISBN: "9780132350884",
        },
        {
            title: "Design Patterns",
            author: "Gang of Four",
            description: "Elements of reusable object-oriented software",
            pages: 395,
            image: "https://example.com/image2.jpg",
            ISBN: "9780201633610",
        },
        {
            title: "Book Without ISBN",
            author: "Unknown Author",
            description: "A book without an ISBN",
            pages: 200,
            image: "https://example.com/image3.jpg",
            // No ISBN field
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

    describe("Valid ISBN searches", () => {
        it("should find book by valid ISBN-13", async () => {
            const book = await bookService.getBookByISBN("9780132350884");

            expect(book).not.toBeNull();
            expect(book?.title).toBe("Clean Code");
            expect(book?.author).toBe("Robert C. Martin");
            expect(book?.ISBN).toBe("9780132350884");
        });

        it("should find book by ISBN-10", async () => {
            const book = await bookService.getBookByISBN("0132350882");

            expect(book).not.toBeNull();
            expect(book?.title).toBe("Clean Code");
            expect(book?.ISBN).toBe("9780132350884"); // Should be normalized to ISBN-13
        });

        it("should find book by hyphenated ISBN-13", async () => {
            const book = await bookService.getBookByISBN("978-0-13-235088-4");

            expect(book).not.toBeNull();
            expect(book?.title).toBe("Clean Code");
        });

        it("should find book by hyphenated ISBN-10", async () => {
            const book = await bookService.getBookByISBN("0-13-235088-2");

            expect(book).not.toBeNull();
            expect(book?.title).toBe("Clean Code");
        });

        it("should find book with spaces in ISBN", async () => {
            const book = await bookService.getBookByISBN("978 0 13 235088 4");

            expect(book).not.toBeNull();
            expect(book?.title).toBe("Clean Code");
        });

        it("should handle ISBN with X check digit", async () => {
            // Add a book with X check digit (using the normalized form)
            await BookModel.create({
                title: "Test Book with X",
                author: "Test Author",
                ISBN: "9781985086593", // This is the normalized ISBN-13 for 198508659X
            });

            const book = await bookService.getBookByISBN("198508659X");

            expect(book).not.toBeNull();
            expect(book?.title).toBe("Test Book with X");
        });
    });

    describe("Non-existent valid ISBN searches", () => {
        it("should return null for non-existent valid ISBN-13", async () => {
            const validNonExistentISBNs = [
                "9780123456789", // Valid ISBN-13 format but doesn't exist in database
                "9781234567890", // Another valid ISBN-13 format
                "9789876543210", // Another valid ISBN-13 format
            ];

            for (const isbn of validNonExistentISBNs) {
                const book = await bookService.getBookByISBN(isbn);
                expect(book).toBeNull();
            }
        });

        it("should return null for non-existent valid ISBN-10", async () => {
            const validNonExistentISBN10s = [
                "0123456789", // Valid ISBN-10 format but doesn't exist
                "1234567890", // Another valid ISBN-10 format
                "9876543210", // Another valid ISBN-10 format
            ];

            for (const isbn of validNonExistentISBN10s) {
                const book = await bookService.getBookByISBN(isbn);
                expect(book).toBeNull();
            }
        });

        it("should return null for valid ISBN formats with different check digits", async () => {
            // These are valid ISBN formats but with different check digits than existing books
            const book1 = await bookService.getBookByISBN("9780132350881"); // Original ends in 4
            const book2 = await bookService.getBookByISBN("9780132350882"); // Different check digit
            const book3 = await bookService.getBookByISBN("9780132350883"); // Different check digit

            expect(book1).toBeNull();
            expect(book2).toBeNull();
            expect(book3).toBeNull();
        });
    });

    describe("Valid ISBN edge cases", () => {
        it("should be case insensitive for X check digit", async () => {
            // Add a book with the normalized ISBN-13
            await BookModel.create({
                title: "Test Book with x case",
                author: "Test Author",
                ISBN: "9781985086593", // Normalized form for both 198508659x and 198508659X
            });

            const book1 = await bookService.getBookByISBN("198508659x");
            const book2 = await bookService.getBookByISBN("198508659X");

            expect(book1).not.toBeNull();
            expect(book2).not.toBeNull();
            expect(book1?.title).toBe(book2?.title);
        });

        it("should handle different valid ISBN formats for same book", async () => {
            // Test various valid formats that should all find the same book
            const formats = [
                "0132350882", // ISBN-10
                "978-0-13-235088-4", // Hyphenated ISBN-13
                "978 0 13 235088 4", // Spaced ISBN-13
                "9780132350884", // Standard ISBN-13
            ];

            const results = [];
            for (const format of formats) {
                const book = await bookService.getBookByISBN(format);
                results.push(book);
            }

            // All should find the same book (Clean Code)
            results.forEach((book) => {
                expect(book).not.toBeNull();
                expect(book?.title).toBe("Clean Code");
            });

            // All should have the same ID (same book)
            const firstBookId = results[0]?.id;
            results.forEach((book) => {
                expect(book?.id).toBe(firstBookId);
            });
        });

        it("should handle ISBN lookup after book deletion", async () => {
            // Create a book with specific ISBN
            const newBook = await BookModel.create({
                title: "Book to be deleted",
                author: "Test Author",
                ISBN: ISBNUtil.normalizeISBN("9780987654321"),
            });

            // Verify book can be found
            const foundBook = await bookService.getBookByISBN("9780987654321");
            expect(foundBook).not.toBeNull();
            expect(foundBook?.title).toBe("Book to be deleted");

            // Delete the book
            await BookModel.findByIdAndDelete(newBook._id);

            // Now searching by ISBN should return null
            const deletedBook = await bookService.getBookByISBN(
                "9780987654321"
            );
            expect(deletedBook).toBeNull();
        });
    });

    describe("Database edge cases", () => {
        it("should handle books with null ISBN in database", async () => {
            await BookModel.create({
                title: "Book with null ISBN",
                author: "Test Author",
                ISBN: null,
            });

            const book = await bookService.getBookByISBN("9780132350884");

            expect(book?.title).toBe("Clean Code"); // Should still find the correct book
        });

        it("should handle books with empty string ISBN in database", async () => {
            await BookModel.create({
                title: "Book with empty ISBN",
                author: "Test Author",
                ISBN: "",
            });

            const book = await bookService.getBookByISBN("9780132350884");

            expect(book?.title).toBe("Clean Code"); // Should still find the correct book
        });

        it("should return first match if multiple books have same ISBN", async () => {
            // Create duplicate ISBNs (shouldn't happen in real world but testing edge case)
            await BookModel.create({
                title: "Duplicate ISBN Book 1",
                author: "Author 1",
                ISBN: "9780132350884",
            });

            await BookModel.create({
                title: "Duplicate ISBN Book 2",
                author: "Author 2",
                ISBN: "9780132350884",
            });

            const book = await bookService.getBookByISBN("9780132350884");

            expect(book).not.toBeNull();
            expect(book?.ISBN).toBe("9780132350884");
        });
    });

    describe("ISBN normalization", () => {
        it("should normalize ISBN-10 to ISBN-13 for database lookup", async () => {
            // This tests that the service properly normalizes the ISBN before querying
            const book = await bookService.getBookByISBN("0132350882");

            expect(book).not.toBeNull();
            expect(book?.title).toBe("Clean Code");
            // The stored ISBN should be the normalized version
            expect(book?.ISBN).toBe("9780132350884");
        });

        it("should handle mixed format searches consistently", async () => {
            const book1 = await bookService.getBookByISBN("0132350882");
            const book2 = await bookService.getBookByISBN("9780132350884");
            const book3 = await bookService.getBookByISBN("978-0-13-235088-4");

            expect(book1?.id).toBe(book2?.id);
            expect(book2?.id).toBe(book3?.id);
            expect(book1?.title).toBe("Clean Code");
        });
    });
});
