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

describe("Book Service: updateBook()", () => {
    let testBookId: string;

    const originalBook = {
        title: "Original Title",
        author: "Original Author",
        description: "Original description",
        pages: 300,
        image: "https://example.com/original.jpg",
        ISBN: "9780132350884",
    };

    beforeAll(async () => {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not set");
        }
        await mongoose.connect(process.env.MONGO_URI);
    });

    beforeEach(async () => {
        await BookModel.deleteMany({});
        const createdBook = await BookModel.create(originalBook);
        testBookId = createdBook._id.toString();
    });

    afterAll(async () => {
        await BookModel.deleteMany({});
        await mongoose.disconnect();
    });

    describe("Valid updates", () => {
        it("should update all fields", async () => {
            const updateData: BookType = {
                id: testBookId,
                title: "Updated Title",
                author: "Updated Author",
                description: "Updated description",
                pages: 500,
                image: "https://example.com/updated.jpg",
                ISBN: "9780201633610",
            };

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            expect(updatedBook).not.toBeNull();
            expect(updatedBook?.id).toBe(testBookId);
            expect(updatedBook?.title).toBe("Updated Title");
            expect(updatedBook?.author).toBe("Updated Author");
            expect(updatedBook?.description).toBe("Updated description");
            expect(updatedBook?.pages).toBe(500);
            expect(updatedBook?.image).toBe("https://example.com/updated.jpg");
            expect(updatedBook?.ISBN).toBe("9780201633610");
        });

        it("should update only title", async () => {
            const updateData: BookType = {
                id: testBookId,
                title: "Only Title Updated",
            };

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            expect(updatedBook?.title).toBe("Only Title Updated");
            expect(updatedBook?.author).toBe("Original Author");
            expect(updatedBook?.description).toBe("Original description");
            expect(updatedBook?.pages).toBe(300);
        });

        it("should update only author", async () => {
            const updateData: BookType = {
                id: testBookId,
                author: "Only Author Updated",
            };

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            expect(updatedBook?.title).toBe("Original Title");
            expect(updatedBook?.author).toBe("Only Author Updated");
            expect(updatedBook?.description).toBe("Original description");
        });

        it("should update multiple fields selectively", async () => {
            const updateData: BookType = {
                id: testBookId,
                title: "New Title",
                pages: 777,
                ISBN: "9780596517748",
            };

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            expect(updatedBook?.title).toBe("New Title");
            expect(updatedBook?.author).toBe("Original Author");
            expect(updatedBook?.description).toBe("Original description");
            expect(updatedBook?.pages).toBe(777);
            expect(updatedBook?.image).toBe("https://example.com/original.jpg");
            expect(updatedBook?.ISBN).toBe("9780596517748");
        });

        it("should update updatedAt timestamp", async () => {
            const originalTimestamp = (await BookModel.findById(testBookId))
                ?.updatedAt;

            // Wait a small amount to ensure timestamp difference
            await new Promise((resolve) => setTimeout(resolve, 100));

            const updateData: BookType = {
                id: testBookId,
                title: "Timestamp Test",
            };

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            expect(updatedBook?.updatedAt).toBeDefined();
            expect(updatedBook?.updatedAt).not.toEqual(originalTimestamp);
        });

        it("should preserve createdAt timestamp", async () => {
            const originalCreatedAt = (await BookModel.findById(testBookId))
                ?.createdAt;

            const updateData: BookType = {
                id: testBookId,
                title: "CreatedAt Test",
            };

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            expect(updatedBook?.createdAt).toEqual(originalCreatedAt);
        });
    });

    describe("Non-existent valid IDs", () => {
        it("should return null for non-existent valid ObjectId", async () => {
            const nonExistentId = new mongoose.Types.ObjectId().toString();
            const updateData: BookType = {
                id: nonExistentId,
                title: "Should not update",
            };

            const result = await bookService.updateBook(
                nonExistentId,
                updateData
            );

            expect(result).toBeNull();
        });

        it("should return null for multiple non-existent valid ObjectIds", async () => {
            const nonExistentIds = [
                new mongoose.Types.ObjectId().toString(),
                new mongoose.Types.ObjectId().toString(),
                new mongoose.Types.ObjectId().toString(),
            ];

            for (const id of nonExistentIds) {
                const updateData: BookType = {
                    id: id,
                    title: "Should not update",
                };

                const result = await bookService.updateBook(id, updateData);
                expect(result).toBeNull();
            }
        });

        it("should return null for valid ObjectId of deleted book", async () => {
            // Create and then delete a book
            const tempBook = await BookModel.create({
                title: "Temporary Book",
                author: "Temp Author",
            });

            const deletedBookId = tempBook._id.toString();

            // Delete the book
            await BookModel.findByIdAndDelete(deletedBookId);

            // Try to update the deleted book
            const updateData: BookType = {
                id: deletedBookId,
                title: "Should not update deleted book",
            };

            const result = await bookService.updateBook(
                deletedBookId,
                updateData
            );

            expect(result).toBeNull();
        });
    });

    describe("Edge case updates", () => {
        it("should handle empty string values", async () => {
            const updateData: BookType = {
                id: testBookId,
                title: "",
                author: "",
                description: "",
                image: "",
                ISBN: "",
            };

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            expect(updatedBook?.title).toBe("");
            expect(updatedBook?.author).toBe("");
            expect(updatedBook?.description).toBe("");
            expect(updatedBook?.image).toBe("");
            expect(updatedBook?.ISBN).toBe("");
        });

        it("should handle zero pages", async () => {
            const updateData: BookType = {
                id: testBookId,
                pages: 0,
            };

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            expect(updatedBook?.pages).toBe(0);
        });

        it("should handle negative pages", async () => {
            const updateData: BookType = {
                id: testBookId,
                pages: -100,
            };

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            expect(updatedBook?.pages).toBe(-100);
        });

        it("should handle very large page numbers", async () => {
            const updateData: BookType = {
                id: testBookId,
                pages: 999999999,
            };

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            expect(updatedBook?.pages).toBe(999999999);
        });

        it("should handle special characters", async () => {
            const updateData: BookType = {
                id: testBookId,
                title: "Special !@#$%^&*()_+-={}[]|\\:;\"'<>?,./",
                author: "Author with émojis 📚🚀",
                description: "Description with unicode: 中文 العربية",
            };

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            expect(updatedBook?.title).toBe(
                "Special !@#$%^&*()_+-={}[]|\\:;\"'<>?,./"
            );
            expect(updatedBook?.author).toBe("Author with émojis 📚🚀");
            expect(updatedBook?.description).toBe(
                "Description with unicode: 中文 العربية"
            );
        });

        it("should handle very long strings", async () => {
            const longTitle = "A".repeat(1000);
            const longAuthor = "B".repeat(500);

            const updateData: BookType = {
                id: testBookId,
                title: longTitle,
                author: longAuthor,
            };

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            expect(updatedBook?.title).toBe(longTitle);
            expect(updatedBook?.author).toBe(longAuthor);
        });

        it("should handle whitespace-only values", async () => {
            const updateData: BookType = {
                id: testBookId,
                title: "   ",
                author: "\t\n\r",
                description: "     ",
            };

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            expect(updatedBook?.title).toBe("   ");
            expect(updatedBook?.author).toBe("\t\n\r");
            expect(updatedBook?.description).toBe("     ");
        });

        it("should handle invalid ISBN format", async () => {
            const updateData: BookType = {
                id: testBookId,
                ISBN: "invalid-isbn-format-123",
            };

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            expect(updatedBook?.ISBN).toBe("invalid-isbn-format-123");
        });

        it("should handle null values (type assertion)", async () => {
            const updateData = {
                id: testBookId,
                title: "Title with nulls",
                author: null,
                description: null,
                pages: null,
                image: null,
                ISBN: null,
            } as any;

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            expect(updatedBook?.title).toBe("Title with nulls");
            // Null values should be handled by MongoDB/Mongoose
        });

        it("should handle partial updates (omitted fields)", async () => {
            const updateData: BookType = {
                id: testBookId,
                title: "Title with partial update",
                // Omitting other fields to test partial updates
            };

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            expect(updatedBook?.title).toBe("Title with partial update");
            // Original values should be preserved for omitted fields
            expect(updatedBook?.author).toBe("Original Author");
            expect(updatedBook?.description).toBe("Original description");
            expect(updatedBook?.pages).toBe(300);
            expect(updatedBook?.image).toBe("https://example.com/original.jpg");
            expect(updatedBook?.ISBN).toBe("9780132350884");
        });
    });

    describe("Database persistence", () => {
        it("should persist changes to database", async () => {
            const updateData: BookType = {
                id: testBookId,
                title: "Persistence Test",
                author: "New Author",
            };

            await bookService.updateBook(testBookId, updateData);
            const dbBook = await BookModel.findById(testBookId);

            expect(dbBook?.title).toBe("Persistence Test");
            expect(dbBook?.author).toBe("New Author");
            expect(dbBook?.description).toBe("Original description"); // Unchanged
        });

        it("should return the updated document", async () => {
            const updateData: BookType = {
                id: testBookId,
                title: "Return Test",
                pages: 999,
            };

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            expect(updatedBook).not.toBeNull();
            expect(updatedBook?.title).toBe("Return Test");
            expect(updatedBook?.pages).toBe(999);
        });

        it("should not affect other documents", async () => {
            // Create another book
            const otherBook = await BookModel.create({
                title: "Other Book",
                author: "Other Author",
                pages: 200,
            });

            const updateData: BookType = {
                id: testBookId,
                title: "Updated First Book",
            };

            await bookService.updateBook(testBookId, updateData);

            const unchangedBook = await BookModel.findById(otherBook._id);
            expect(unchangedBook?.title).toBe("Other Book");
            expect(unchangedBook?.author).toBe("Other Author");
            expect(unchangedBook?.pages).toBe(200);
        });
    });

    describe("Concurrent updates", () => {
        it("should handle multiple sequential updates", async () => {
            const update1: BookType = {
                id: testBookId,
                title: "First Update",
            };

            const update2: BookType = {
                id: testBookId,
                author: "Second Update Author",
            };

            const update3: BookType = {
                id: testBookId,
                pages: 123,
            };

            await bookService.updateBook(testBookId, update1);
            await bookService.updateBook(testBookId, update2);
            const finalResult = await bookService.updateBook(
                testBookId,
                update3
            );

            expect(finalResult?.title).toBe("First Update");
            expect(finalResult?.author).toBe("Second Update Author");
            expect(finalResult?.pages).toBe(123);
            expect(finalResult?.description).toBe("Original description"); // Unchanged
        });
    });

    describe("Type conversion", () => {
        it("should handle string numbers for pages", async () => {
            const updateData = {
                id: testBookId,
                pages: "456",
            } as any;

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            expect(typeof updatedBook?.pages).toBe("number");
            expect(updatedBook?.pages).toBe(456);
        });

        it("should handle boolean values (type assertion)", async () => {
            const updateData = {
                id: testBookId,
                title: true,
                pages: false,
            } as any;

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            // MongoDB will convert these as best it can
            expect(updatedBook).not.toBeNull();
        });
    });

    describe("Complex scenarios", () => {
        it("should handle updating to same values", async () => {
            const updateData: BookType = {
                id: testBookId,
                title: "Original Title",
                author: "Original Author",
                description: "Original description",
                pages: 300,
                image: "https://example.com/original.jpg",
                ISBN: "9780132350884",
            };

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            expect(updatedBook?.title).toBe("Original Title");
            expect(updatedBook?.author).toBe("Original Author");
            expect(updatedBook?.description).toBe("Original description");
            expect(updatedBook?.pages).toBe(300);
            expect(updatedBook?.image).toBe("https://example.com/original.jpg");
            expect(updatedBook?.ISBN).toBe("9780132350884");
        });

        it("should handle partial update with mixed data types", async () => {
            const updateData = {
                id: testBookId,
                title: "Mixed Update",
                pages: "999", // String number
                author: undefined, // Should not change
                description: "", // Empty string
            } as any;

            const updatedBook = await bookService.updateBook(
                testBookId,
                updateData
            );

            expect(updatedBook?.title).toBe("Mixed Update");
            expect(updatedBook?.pages).toBe(999);
            expect(updatedBook?.author).toBe("Original Author"); // Unchanged
            expect(updatedBook?.description).toBe(""); // Changed to empty
            expect(updatedBook?.image).toBe("https://example.com/original.jpg"); // Unchanged
        });
    });
});
