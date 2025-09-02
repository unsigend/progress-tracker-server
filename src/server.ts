// import dependencies
import express from "express";
import dotenv from "dotenv";

// import util
import logger from "@/util/log.js";

async function main() {
    // load environment variables
    dotenv.config();
    console.clear();

    // create app instance
    const app = express();

    // setup port
    const port = process.env.PORT;
    if (!port) {
        logger.serverLog(logger.logType.FATAL, "Port is not set");
        process.exit(1);
    }

    // setup host
    const host = process.env.HOST || "localhost";

    // start the server
    app.listen(port, () => {
        logger.serverLog(
            logger.logType.SUCCESS,
            `Server is running on http://${host}:${port}`
        );
    });
}

main();
