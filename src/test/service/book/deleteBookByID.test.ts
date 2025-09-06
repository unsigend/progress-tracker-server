// import dependencies
import bookService from "@/service/book.service";

// import model
import BookModel from "@/models/book.model";

// import mongoose
import mongoose from "mongoose";

// import test
import { describe, it, expect } from "@jest/globals";

describe("Book Service: deleteBookByID()", () => {
    beforeAll(async () => {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not set");
        }
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    it("should delete a book by ID", async () => {
        const book = await BookModel.create({
            title: "Test Book",
            author: "Test Author",
            description: "Test Description",
            pages: 100,
            image: "Test Image",
        });
        const deletedBook = await bookService.deleteBookByID(
            book._id.toString()
        );
        expect(deletedBook).not.toBeNull();
        expect(deletedBook?.id).toEqual(book._id.toString());
        expect(deletedBook?.title).toEqual(book.title);
        expect(deletedBook?.author).toEqual(book.author);
        expect(deletedBook?.description).toEqual(book.description);
        expect(deletedBook?.pages).toEqual(book.pages);
        expect(deletedBook?.image).toEqual(book.image);
        expect(await BookModel.findById(book._id)).toBeNull();
    });

    it("should return null for non-existent ID", async () => {
        const nonExistentId = new mongoose.Types.ObjectId().toString();
        const deletedBook = await bookService.deleteBookByID(nonExistentId);

        expect(deletedBook).toBeNull();
    });

    it("should return null for non-existent valid ObjectId", async () => {
        const nonExistentId1 = new mongoose.Types.ObjectId().toString();
        const nonExistentId2 = new mongoose.Types.ObjectId().toString();
        const nonExistentId3 = new mongoose.Types.ObjectId().toString();

        const deletedBook1 = await bookService.deleteBookByID(nonExistentId1);
        const deletedBook2 = await bookService.deleteBookByID(nonExistentId2);
        const deletedBook3 = await bookService.deleteBookByID(nonExistentId3);

        expect(deletedBook1).toBeNull();
        expect(deletedBook2).toBeNull();
        expect(deletedBook3).toBeNull();
    });

    it("should delete book with minimal fields", async () => {
        const book = await BookModel.create({
            title: "Minimal Book to Delete",
        });

        const deletedBook = await bookService.deleteBookByID(
            book._id.toString()
        );

        expect(deletedBook).not.toBeNull();
        expect(deletedBook?.title).toBe("Minimal Book to Delete");
        expect(deletedBook?.author).toBeUndefined();
        expect(await BookModel.findById(book._id)).toBeNull();
    });

    it("should delete book with all fields", async () => {
        const book = await BookModel.create({
            title: "Complete Book to Delete",
            author: "Complete Author",
            description: "Complete Description",
            pages: 500,
            image: "https://example.com/complete.jpg",
            ISBN: "9780132350884",
        });

        const deletedBook = await bookService.deleteBookByID(
            book._id.toString()
        );

        expect(deletedBook).not.toBeNull();
        expect(deletedBook?.title).toBe("Complete Book to Delete");
        expect(deletedBook?.author).toBe("Complete Author");
        expect(deletedBook?.description).toBe("Complete Description");
        expect(deletedBook?.pages).toBe(500);
        expect(deletedBook?.image).toBe("https://example.com/complete.jpg");
        expect(deletedBook?.ISBN).toBe("9780132350884");
        expect(await BookModel.findById(book._id)).toBeNull();
    });

    it("should delete book with special characters", async () => {
        const book = await BookModel.create({
            title: "Special Characters: !@#$%^&*()_+-={}[]|\\:;\"'<>?,./",
            author: "Author with émojis 📚🚀",
            description: "Description with unicode: 中文 العربية",
        });

        const deletedBook = await bookService.deleteBookByID(
            book._id.toString()
        );

        expect(deletedBook).not.toBeNull();
        expect(deletedBook?.title).toBe(
            "Special Characters: !@#$%^&*()_+-={}[]|\\:;\"'<>?,./"
        );
        expect(deletedBook?.author).toBe("Author with émojis 📚🚀");
        expect(deletedBook?.description).toBe(
            "Description with unicode: 中文 العربية"
        );
        expect(await BookModel.findById(book._id)).toBeNull();
    });

    it("should delete book with extreme page numbers", async () => {
        const book = await BookModel.create({
            title: "Extreme Pages Book to Delete",
            pages: 999999999,
        });

        const deletedBook = await bookService.deleteBookByID(
            book._id.toString()
        );

        expect(deletedBook).not.toBeNull();
        expect(deletedBook?.pages).toBe(999999999);
        expect(await BookModel.findById(book._id)).toBeNull();
    });

    it("should delete book with zero pages", async () => {
        const book = await BookModel.create({
            title: "Zero Pages Book to Delete",
            pages: 0,
        });

        const deletedBook = await bookService.deleteBookByID(
            book._id.toString()
        );

        expect(deletedBook).not.toBeNull();
        expect(deletedBook?.pages).toBe(0);
        expect(await BookModel.findById(book._id)).toBeNull();
    });

    it("should delete book with negative pages", async () => {
        const book = await BookModel.create({
            title: "Negative Pages Book to Delete",
            pages: -100,
        });

        const deletedBook = await bookService.deleteBookByID(
            book._id.toString()
        );

        expect(deletedBook).not.toBeNull();
        expect(deletedBook?.pages).toBe(-100);
        expect(await BookModel.findById(book._id)).toBeNull();
    });

    it("should delete book with empty string fields", async () => {
        const book = await BookModel.create({
            title: "Empty Fields Book to Delete",
            author: "",
            description: "",
            image: "",
            ISBN: "",
        });

        const deletedBook = await bookService.deleteBookByID(
            book._id.toString()
        );

        expect(deletedBook).not.toBeNull();
        expect(deletedBook?.title).toBe("Empty Fields Book to Delete");
        expect(deletedBook?.author).toBe("");
        expect(deletedBook?.description).toBe("");
        expect(deletedBook?.image).toBe("");
        expect(deletedBook?.ISBN).toBe("");
        expect(await BookModel.findById(book._id)).toBeNull();
    });

    it("should not affect other books when deleting one", async () => {
        const book1 = await BookModel.create({
            title: "Book to Delete",
            author: "Author 1",
        });

        const book2 = await BookModel.create({
            title: "Book to Keep",
            author: "Author 2",
        });

        const deletedBook = await bookService.deleteBookByID(
            book1._id.toString()
        );

        expect(deletedBook).not.toBeNull();
        expect(deletedBook?.title).toBe("Book to Delete");
        expect(await BookModel.findById(book1._id)).toBeNull();

        const remainingBook = await BookModel.findById(book2._id);
        expect(remainingBook).not.toBeNull();
        expect(remainingBook?.title).toBe("Book to Keep");
    });

    it("should handle uppercase ObjectId", async () => {
        const book = await BookModel.create({
            title: "Uppercase ID Delete Test",
            author: "Test Author",
        });

        const uppercaseId = book._id.toString().toUpperCase();
        const deletedBook = await bookService.deleteBookByID(uppercaseId);

        expect(deletedBook).not.toBeNull();
        expect(deletedBook?.title).toBe("Uppercase ID Delete Test");
        expect(await BookModel.findById(book._id)).toBeNull();
    });

    it("should return the deleted book data", async () => {
        const originalData = {
            title: "Return Data Test",
            author: "Test Author",
            description: "Test Description",
            pages: 300,
            image: "https://example.com/test.jpg",
            ISBN: "9780132350884",
        };

        const book = await BookModel.create(originalData);
        const deletedBook = await bookService.deleteBookByID(
            book._id.toString()
        );

        expect(deletedBook).not.toBeNull();
        expect(deletedBook?.title).toBe(originalData.title);
        expect(deletedBook?.author).toBe(originalData.author);
        expect(deletedBook?.description).toBe(originalData.description);
        expect(deletedBook?.pages).toBe(originalData.pages);
        expect(deletedBook?.image).toBe(originalData.image);
        expect(deletedBook?.ISBN).toBe(originalData.ISBN);
        expect(deletedBook?.createdAt).toBeDefined();
        expect(deletedBook?.updatedAt).toBeDefined();
    });

    it("should handle attempting to delete the same book twice", async () => {
        const book = await BookModel.create({
            title: "Double Delete Test",
            author: "Test Author",
        });

        const bookId = book._id.toString();

        // First deletion should succeed
        const firstDelete = await bookService.deleteBookByID(bookId);
        expect(firstDelete).not.toBeNull();
        expect(firstDelete?.title).toBe("Double Delete Test");

        // Second deletion should return null
        const secondDelete = await bookService.deleteBookByID(bookId);
        expect(secondDelete).toBeNull();
    });

    it("should handle multiple non-existent IDs in sequence", async () => {
        const nonExistentIds = [
            new mongoose.Types.ObjectId().toString(),
            new mongoose.Types.ObjectId().toString(),
            new mongoose.Types.ObjectId().toString(),
            new mongoose.Types.ObjectId().toString(),
            new mongoose.Types.ObjectId().toString(),
        ];

        for (const id of nonExistentIds) {
            const deletedBook = await bookService.deleteBookByID(id);
            expect(deletedBook).toBeNull();
        }
    });

    it("should handle valid ObjectId that was previously deleted", async () => {
        const book = await BookModel.create({
            title: "Book to be deleted twice",
            author: "Test Author",
        });

        const bookId = book._id.toString();

        // First deletion should succeed
        const firstDelete = await bookService.deleteBookByID(bookId);
        expect(firstDelete).not.toBeNull();

        // Verify book is gone from database
        expect(await BookModel.findById(bookId)).toBeNull();

        // Second deletion with same valid ID should return null
        const secondDelete = await bookService.deleteBookByID(bookId);
        expect(secondDelete).toBeNull();
    });
});
