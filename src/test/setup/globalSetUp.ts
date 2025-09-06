// import dependencies
import { MongoMemoryServer } from "mongodb-memory-server";

/**
 * Global setup for the tests
 */
const globalSetUp = async () => {
    const mongoMemoryServer = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongoMemoryServer.getUri();
    (global as any).__MONGOINSTANCE__ = mongoMemoryServer;
};

export default globalSetUp;
