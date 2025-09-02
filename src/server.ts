// import dependencies
import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";

async function main() {
    // load environment variables
    dotenv.config();

    // create app instance
    const app = express();

    // setup port
    const port = process.env.PORT;
    if (!port) {
        console.error(chalk.red("[FATAL]"));
        process.exit(1);
    }

    // setup host
    const host = process.env.HOST || "localhost";

    // start the server
    app.listen(port, () => {
        console.log(chalk.green("[RUNNING]"));
        console.log(chalk.green(`Server is running on http://${host}:${port}`));
    });
}

main();
