// import dependencies
import { z } from "zod";

// user schema
const userSchema = z.object({
    username: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters long")
        .max(20, "Username must be at most 20 characters long"),
    email: z.string().trim().email("Invalid email address"),
    password: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters long"),
    avatar: z.string().trim().optional().default(""),
});

// user update schema
const userUpdateSchema = z.object({
    username: z.string().trim().optional().default(""),
    email: z
        .string()
        .trim()
        .email("Invalid email address")
        .optional()
        .default(""),
    password: z.string().trim().optional().default(""),
    avatar: z.string().trim().optional().default(""),
});

export { userSchema, userUpdateSchema };
