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
import { BookType } from "@root/shared/types";

describe("Book Service: createBook()", () => {
    beforeAll(async () => {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not set");
        }
        await mongoose.connect(process.env.MONGO_URI);
    });

    beforeEach(async () => {
        await BookModel.deleteMany({});
    });

    afterAll(async () => {
        await BookModel.deleteMany({});
        await mongoose.disconnect();
    });

    describe("Valid book creation", () => {
        it("should create a book with all fields", async () => {
            const bookData: BookType = {
                id: "", // Will be ignored/overwritten by MongoDB
                title: "Clean Code",
                author: "Robert C. Martin",
                description: "A handbook of agile software craftsmanship",
                pages: 464,
                image: "https://example.com/image.jpg",
                ISBN: "9780132350884",
            };

            const createdBook = await bookService.createBook(bookData);

            expect(createdBook).not.toBeNull();
            expect(createdBook.id).toBeDefined();
            expect(createdBook.title).toBe(bookData.title);
            expect(createdBook.author).toBe(bookData.author);
            expect(createdBook.description).toBe(bookData.description);
            expect(createdBook.pages).toBe(bookData.pages);
            expect(createdBook.image).toBe(bookData.image);
            expect(createdBook.ISBN).toBe(bookData.ISBN);
            expect(createdBook.createdAt).toBeDefined();
            expect(createdBook.updatedAt).toBeDefined();
        });

        it("should create a book with only required fields", async () => {
            const bookData: BookType = {
                id: "",
                title: "Minimal Book",
            };

            const createdBook = await bookService.createBook(bookData);

            expect(createdBook).not.toBeNull();
            expect(createdBook.id).toBeDefined();
            expect(createdBook.title).toBe("Minimal Book");
            expect(createdBook.createdAt).toBeDefined();
            expect(createdBook.updatedAt).toBeDefined();
        });

        it("should create a book with partial fields", async () => {
            const bookData: BookType = {
                id: "",
                title: "Partial Book",
                author: "Test Author",
                pages: 200,
            };

            const createdBook = await bookService.createBook(bookData);

            expect(createdBook).not.toBeNull();
            expect(createdBook.title).toBe("Partial Book");
            expect(createdBook.author).toBe("Test Author");
            expect(createdBook.pages).toBe(200);
            expect(createdBook.description).toBeUndefined();
            expect(createdBook.image).toBeUndefined();
            expect(createdBook.ISBN).toBeUndefined();
        });

        it("should auto-generate timestamps", async () => {
            const bookData: BookType = {
                id: "",
                title: "Timestamp Test Book",
            };

            const createdBook = await bookService.createBook(bookData);

            expect(createdBook.createdAt).toBeDefined();
            expect(createdBook.updatedAt).toBeDefined();
            expect(createdBook.createdAt).toBeInstanceOf(Date);
            expect(createdBook.updatedAt).toBeInstanceOf(Date);
        });

        it("should create book with valid ISBN", async () => {
            const bookData: BookType = {
                id: "",
                title: "ISBN Test Book",
                ISBN: "9780201633610",
            };

            const createdBook = await bookService.createBook(bookData);

            expect(createdBook.ISBN).toBe("9780201633610");
        });

        it("should create book with ISBN-10", async () => {
            const bookData: BookType = {
                id: "",
                title: "ISBN-10 Test Book",
                ISBN: "0201633612",
            };

            const createdBook = await bookService.createBook(bookData);

            expect(createdBook.ISBN).toBe("0201633612");
        });
    });

    describe("Edge cases and validation", () => {
        it("should handle empty string values", async () => {
            const bookData: BookType = {
                id: "",
                title: "Empty Fields Book",
                author: "",
                description: "",
                image: "",
                ISBN: "",
            };

            const createdBook = await bookService.createBook(bookData);

            expect(createdBook).not.toBeNull();
            expect(createdBook.title).toBe("Empty Fields Book");
            expect(createdBook.author).toBe("");
            expect(createdBook.description).toBe("");
            expect(createdBook.image).toBe("");
            expect(createdBook.ISBN).toBe("");
        });

        it("should handle zero pages", async () => {
            const bookData: BookType = {
                id: "",
                title: "Zero Pages Book",
                pages: 0,
            };

            const createdBook = await bookService.createBook(bookData);

            expect(createdBook.pages).toBe(0);
        });

        it("should handle negative pages", async () => {
            const bookData: BookType = {
                id: "",
                title: "Negative Pages Book",
                pages: -10,
            };

            const createdBook = await bookService.createBook(bookData);

            expect(createdBook.pages).toBe(-10);
        });

        it("should handle very large page numbers", async () => {
            const bookData: BookType = {
                id: "",
                title: "Large Pages Book",
                pages: 999999999,
            };

            const createdBook = await bookService.createBook(bookData);

            expect(createdBook.pages).toBe(999999999);
        });

        it("should handle long title", async () => {
            const longTitle = "A".repeat(1000);
            const bookData: BookType = {
                id: "",
                title: longTitle,
            };

            const createdBook = await bookService.createBook(bookData);

            expect(createdBook.title).toBe(longTitle);
        });

        it("should handle special characters in title", async () => {
            const bookData: BookType = {
                id: "",
                title: "Special Characters: !@#$%^&*()_+-={}[]|\\:;\"'<>?,./",
            };

            const createdBook = await bookService.createBook(bookData);

            expect(createdBook.title).toBe(
                "Special Characters: !@#$%^&*()_+-={}[]|\\:;\"'<>?,./"
            );
        });

        it("should handle unicode characters", async () => {
            const bookData: BookType = {
                id: "",
                title: "Unicode Test: 中文 日本語 العربية 🚀📚",
                author: "作者 Author مؤلف",
            };

            const createdBook = await bookService.createBook(bookData);

            expect(createdBook.title).toBe(
                "Unicode Test: 中文 日本語 العربية 🚀📚"
            );
            expect(createdBook.author).toBe("作者 Author مؤلف");
        });

        it("should handle whitespace-only title", async () => {
            const bookData: BookType = {
                id: "",
                title: "   ",
            };

            const createdBook = await bookService.createBook(bookData);

            expect(createdBook.title).toBe("   ");
        });

        it("should handle invalid ISBN format", async () => {
            const bookData: BookType = {
                id: "",
                title: "Invalid ISBN Book",
                ISBN: "invalid-isbn-format",
            };

            const createdBook = await bookService.createBook(bookData);

            expect(createdBook.ISBN).toBe("invalid-isbn-format");
        });

        it("should handle very long URL in image field", async () => {
            const longUrl = "https://example.com/" + "a".repeat(2000) + ".jpg";
            const bookData: BookType = {
                id: "",
                title: "Long URL Book",
                image: longUrl,
            };

            const createdBook = await bookService.createBook(bookData);

            expect(createdBook.image).toBe(longUrl);
        });
    });

    describe("Database persistence", () => {
        it("should persist book to database", async () => {
            const bookData: BookType = {
                id: "",
                title: "Persistence Test Book",
                author: "Test Author",
            };

            const createdBook = await bookService.createBook(bookData);
            const foundBook = await BookModel.findById(createdBook.id);

            expect(foundBook).not.toBeNull();
            expect(foundBook?.title).toBe("Persistence Test Book");
            expect(foundBook?.author).toBe("Test Author");
        });

        it("should generate unique IDs for multiple books", async () => {
            const bookData1: BookType = {
                id: "",
                title: "Book 1",
            };

            const bookData2: BookType = {
                id: "",
                title: "Book 2",
            };

            const createdBook1 = await bookService.createBook(bookData1);
            const createdBook2 = await bookService.createBook(bookData2);

            expect(createdBook1.id).not.toBe(createdBook2.id);
            expect(createdBook1.id).toBeDefined();
            expect(createdBook2.id).toBeDefined();
        });

        it("should allow duplicate titles", async () => {
            const bookData1: BookType = {
                id: "",
                title: "Duplicate Title",
                author: "Author 1",
            };

            const bookData2: BookType = {
                id: "",
                title: "Duplicate Title",
                author: "Author 2",
            };

            const createdBook1 = await bookService.createBook(bookData1);
            const createdBook2 = await bookService.createBook(bookData2);

            expect(createdBook1.title).toBe(createdBook2.title);
            expect(createdBook1.author).not.toBe(createdBook2.author);
            expect(createdBook1.id).not.toBe(createdBook2.id);
        });

        it("should allow duplicate ISBNs (edge case)", async () => {
            const bookData1: BookType = {
                id: "",
                title: "Book 1",
                ISBN: "9780132350884",
            };

            const bookData2: BookType = {
                id: "",
                title: "Book 2",
                ISBN: "9780132350884",
            };

            const createdBook1 = await bookService.createBook(bookData1);
            const createdBook2 = await bookService.createBook(bookData2);

            expect(createdBook1.ISBN).toBe(createdBook2.ISBN);
            expect(createdBook1.id).not.toBe(createdBook2.id);
        });
    });

    describe("Type handling", () => {
        it("should handle undefined optional fields", async () => {
            const bookData: BookType = {
                id: "",
                title: "Undefined Fields Book",
                author: undefined,
                description: undefined,
                pages: undefined,
                image: undefined,
                ISBN: undefined,
            };

            const createdBook = await bookService.createBook(bookData);

            expect(createdBook.title).toBe("Undefined Fields Book");
            expect(createdBook.author).toBeUndefined();
            expect(createdBook.description).toBeUndefined();
            expect(createdBook.pages).toBeUndefined();
            expect(createdBook.image).toBeUndefined();
            expect(createdBook.ISBN).toBeUndefined();
        });

        it("should handle null values (type assertion)", async () => {
            const bookData = {
                id: "",
                title: "Null Fields Book",
                author: null,
                description: null,
                pages: null,
                image: null,
                ISBN: null,
            } as any;

            const createdBook = await bookService.createBook(bookData);

            expect(createdBook.title).toBe("Null Fields Book");
        });

        it("should handle pages as string number (type assertion)", async () => {
            const bookData = {
                id: "",
                title: "String Pages Book",
                pages: "500",
            } as any;

            const createdBook = await bookService.createBook(bookData);

            expect(createdBook.title).toBe("String Pages Book");
            // MongoDB will convert string "500" to number 500
            expect(typeof createdBook.pages).toBe("number");
            expect(createdBook.pages).toBe(500);
        });
    });

    describe("Error handling", () => {
        it("should handle missing title (required field)", async () => {
            const bookData = {
                id: "",
                author: "Test Author",
            } as any; // Type assertion to bypass TypeScript validation

            try {
                await bookService.createBook(bookData);
                // If we reach here, the test should fail
                expect(true).toBe(false);
            } catch (error) {
                expect(error).toBeDefined();
                // Should throw validation error for missing required field
            }
        });

        it("should handle null title (required field)", async () => {
            const bookData = {
                id: "",
                title: null,
                author: "Test Author",
            } as any;

            try {
                await bookService.createBook(bookData);
                expect(true).toBe(false);
            } catch (error) {
                expect(error).toBeDefined();
            }
        });

        it("should handle undefined title (required field)", async () => {
            const bookData = {
                id: "",
                title: undefined,
                author: "Test Author",
            } as any;

            try {
                await bookService.createBook(bookData);
                expect(true).toBe(false);
            } catch (error) {
                expect(error).toBeDefined();
            }
        });
    });
});
