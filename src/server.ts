// import dependencies
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// import util
import logger from "@/util/log.js";

// import routes
import bookRouter from "@/routes/book.route.js";

// import config
import apiConfig from "@/config/api.js";
import { connectDB } from "@/config/db.js";

async function main() {
    // load environment variables
    dotenv.config();
    console.clear();

    // create app instance
    const app = express();

    // setup middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // setup routes
    app.use(apiConfig.bookAPIRoot, bookRouter);

    // setup port
    const port = process.env.PORT;
    if (!port) {
        logger.serverLog(logger.logType.FATAL, "Port is not set");
        process.exit(1);
    }

    // setup host
    const host = process.env.HOST || "localhost";

    // connect to database
    await connectDB();

    // start the server
    app.listen(port, () => {
        logger.serverLog(
            logger.logType.SUCCESS,
            `Server is running on http://${host}:${port}`
        );
    });
}

main();
