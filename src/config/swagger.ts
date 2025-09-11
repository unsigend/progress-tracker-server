// import models
import BookModel from "@/models/book.model.js";
import UserModel from "@/models/user.model.js";

// import dependencies
import mongooseToSwagger from "mongoose-to-swagger";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Progress Tracker API",
            version: "1.0.0",
            description:
                "API documentation for the progress tracker application",
            contact: {
                name: "Yixiang Qiu",
            },
            license: {
                name: "MIT",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],
        components: {
            schemas: {
                Book: mongooseToSwagger(BookModel),
                User: mongooseToSwagger(UserModel),
                Error: {
                    type: "object",
                    properties: {
                        error: { type: "string" },
                        stack: { type: "string" },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export default swaggerOptions;
