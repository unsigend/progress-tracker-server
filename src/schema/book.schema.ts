// import dependencies
import { z } from "zod";

// book schema
const bookSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(255, "Title must be less than 255 characters"),
    author: z.string().trim().optional().default(""),
    description: z.string().trim().optional().default(""),
    pages: z.coerce
        .number()
        .min(0, "Pages must be greater than 0")
        .max(4000, "Pages must be less than 4000")
        .optional()
        .default(0),
    image: z.string().trim().optional().default(""),
    ISBN: z.string().trim().optional().default(""),
});

// book update schema
const bookUpdateSchema = z.object({
    title: z.string().trim().optional().default(""),
    author: z.string().trim().optional().default(""),
    description: z.string().trim().optional().default(""),
    pages: z.coerce
        .number()
        .min(0, "Pages must be greater than 0")
        .max(4000, "Pages must be less than 4000")
        .optional()
        .default(0),
    image: z.string().trim().optional().default(""),
    ISBN: z.string().trim().optional().default(""),
});

// book query schema
const bookQuerySchema = z
    .object({
        sortedBy: z
            .enum(
                ["title", "createdAt"],
                "Sorted by must be either title or createdAt"
            )
            .optional()
            .default("createdAt"),
        order: z
            .enum(["asc", "desc"], "Order must be either asc or desc")
            .optional()
            .default("desc"),
        search: z.string().trim().optional().default(""),
        limit: z.coerce
            .number("Limit must be a number")
            .min(1, "Limit must be greater than 0")
            .max(100, "Limit must be less than 100")
            .optional()
            .default(10),
        page: z.coerce
            .number("Page must be a number")
            .min(1, "Page must be greater than 0")
            .optional()
            .default(1),
    })
    .strict();

export { bookSchema, bookUpdateSchema, bookQuerySchema };
