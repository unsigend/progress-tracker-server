// import dependencies
import { z } from "zod";

/**
 * ObjectId schema used for validating MongoDB ObjectId
 * @returns {ZodString} the ObjectId schema
 */
const MongoDBObjectIdSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Object Id"),
});

export { MongoDBObjectIdSchema };
