// import dependencies
import bookService from "@/service/book.service";

// import model
import BookModel from "@/models/book.model";

// import mongoose
import mongoose from "mongoose";

// import test
import { describe, it, expect } from "@jest/globals";

describe("Book Service: getBookByID()", () => {
    beforeAll(async () => {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not set");
        }
        await mongoose.connect(process.env.MONGO_URI);
        await BookModel.insertMany([
            {
                title: "The Art of Computer Programming",
                author: "Donald E. Knuth",
                description: "A book about computer programming",
                pages: 1000,
                image: "https://m.media-amazon.com/images/I/51VWZr3Y9ML._SX331_BO1,204,203,200_.jpg",
                ISBN: "9780201038016",
            },
        ]);
    });

    afterAll(async () => {
        await BookModel.deleteMany({});
        await mongoose.disconnect();
    });

    it("should get a book by ID", async () => {
        const book = await BookModel.create({
            title: "Computer System: A Programmer's Perspective",
            author: "Randal E. Bryant",
            description: "A book about computer systems",
            pages: 1000,
            image: "https://m.media-amazon.com/images/I/51VWZr3Y9ML._SX331_BO1,204,203,200_.jpg",
            ISBN: "9780131489839",
        });

        expect(book).not.toBeNull();
        const bookByID = await bookService.getBookByID(book._id.toString());
        expect(bookByID).not.toBeNull();
        expect(bookByID?.id).toEqual(book._id.toString());
        expect(bookByID?.title).toEqual(book.title);
        expect(bookByID?.author).toEqual(book.author);
        expect(bookByID?.description).toEqual(book.description);
        expect(bookByID?.pages).toEqual(book.pages);
        expect(bookByID?.image).toEqual(book.image);
        expect(bookByID?.ISBN).toEqual(book.ISBN);
        expect(bookByID?.createdAt).toEqual(book.createdAt);
        expect(bookByID?.updatedAt).toEqual(book.updatedAt);
    });

    it("should return null for non-existent ID", async () => {
        const nonExistentId = new mongoose.Types.ObjectId().toString();
        const bookByID = await bookService.getBookByID(nonExistentId);

        expect(bookByID).toBeNull();
    });

    it("should return null for multiple non-existent valid ObjectIds", async () => {
        const nonExistentIds = [
            new mongoose.Types.ObjectId().toString(),
            new mongoose.Types.ObjectId().toString(),
            new mongoose.Types.ObjectId().toString(),
            new mongoose.Types.ObjectId().toString(),
            new mongoose.Types.ObjectId().toString(),
        ];

        for (const id of nonExistentIds) {
            const bookByID = await bookService.getBookByID(id);
            expect(bookByID).toBeNull();
        }
    });

    it("should return null for valid ObjectId of deleted book", async () => {
        const book = await BookModel.create({
            title: "Book to be deleted",
            author: "Test Author",
        });

        const bookId = book._id.toString();

        // Verify book exists first
        const existingBook = await bookService.getBookByID(bookId);
        expect(existingBook).not.toBeNull();

        // Delete the book
        await BookModel.findByIdAndDelete(bookId);

        // Now getBookByID should return null
        const deletedBook = await bookService.getBookByID(bookId);
        expect(deletedBook).toBeNull();
    });

    it("should handle uppercase ObjectId", async () => {
        const book = await BookModel.create({
            title: "Uppercase ID Test",
            author: "Test Author",
        });

        const uppercaseId = book._id.toString().toUpperCase();
        const bookByID = await bookService.getBookByID(uppercaseId);

        expect(bookByID).not.toBeNull();
        expect(bookByID?.title).toBe("Uppercase ID Test");
    });

    it("should handle book with minimal fields", async () => {
        const book = await BookModel.create({
            title: "Minimal Book",
        });

        const bookByID = await bookService.getBookByID(book._id.toString());

        expect(bookByID).not.toBeNull();
        expect(bookByID?.title).toBe("Minimal Book");
        expect(bookByID?.author).toBeUndefined();
        expect(bookByID?.description).toBeUndefined();
        expect(bookByID?.pages).toBeUndefined();
        expect(bookByID?.image).toBeUndefined();
        expect(bookByID?.ISBN).toBeUndefined();
        expect(bookByID?.createdAt).toBeDefined();
        expect(bookByID?.updatedAt).toBeDefined();
    });

    it("should handle book with empty string fields", async () => {
        const book = await BookModel.create({
            title: "Empty Fields Book",
            author: "",
            description: "",
            image: "",
            ISBN: "",
        });

        const bookByID = await bookService.getBookByID(book._id.toString());

        expect(bookByID).not.toBeNull();
        expect(bookByID?.title).toBe("Empty Fields Book");
        expect(bookByID?.author).toBe("");
        expect(bookByID?.description).toBe("");
        expect(bookByID?.image).toBe("");
        expect(bookByID?.ISBN).toBe("");
    });

    it("should handle book with special characters", async () => {
        const book = await BookModel.create({
            title: "Special Characters: !@#$%^&*()_+-={}[]|\\:;\"'<>?,./",
            author: "Author with émojis 📚🚀",
            description: "Description with unicode: 中文 العربية",
        });

        const bookByID = await bookService.getBookByID(book._id.toString());

        expect(bookByID).not.toBeNull();
        expect(bookByID?.title).toBe(
            "Special Characters: !@#$%^&*()_+-={}[]|\\:;\"'<>?,./"
        );
        expect(bookByID?.author).toBe("Author with émojis 📚🚀");
        expect(bookByID?.description).toBe(
            "Description with unicode: 中文 العربية"
        );
    });

    it("should handle book with extreme page numbers", async () => {
        const book = await BookModel.create({
            title: "Extreme Pages Book",
            pages: 999999999,
        });

        const bookByID = await bookService.getBookByID(book._id.toString());

        expect(bookByID).not.toBeNull();
        expect(bookByID?.pages).toBe(999999999);
    });

    it("should handle book with zero pages", async () => {
        const book = await BookModel.create({
            title: "Zero Pages Book",
            pages: 0,
        });

        const bookByID = await bookService.getBookByID(book._id.toString());

        expect(bookByID).not.toBeNull();
        expect(bookByID?.pages).toBe(0);
    });

    it("should handle book with negative pages", async () => {
        const book = await BookModel.create({
            title: "Negative Pages Book",
            pages: -100,
        });

        const bookByID = await bookService.getBookByID(book._id.toString());

        expect(bookByID).not.toBeNull();
        expect(bookByID?.pages).toBe(-100);
    });
});
