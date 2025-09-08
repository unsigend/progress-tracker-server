// import util
import logger from "@/util/log";

// import mongoose
import mongoose from "mongoose";

/**
 * Connect to MongoDB
 * @returns {Promise<void>} void
 */
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            logger.serverLog(
                logger.logType.FATAL,
                "MONGO_URI is not set in the environment variables"
            );
            process.exit(1);
        }
        const connection = await mongoose.connect(process.env.MONGO_URI);
        logger.serverLog(
            logger.logType.SUCCESS,
            `Connected to MongoDB: ${connection.connection.host}`
        );
    } catch (error) {
        logger.serverLog(
            logger.logType.FATAL,
            `Failed to connect to MongoDB: ${error}`
        );
        process.exit(1);
    }
};

/**
 * Disconnect from MongoDB
 * @returns {Promise<void>} void
 */
const disconnectDB = async () => {
    await mongoose.disconnect();
    logger.serverLog(logger.logType.SUCCESS, "Disconnected from MongoDB");
};

export { connectDB, disconnectDB };
