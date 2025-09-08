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

export default bookSchema;
