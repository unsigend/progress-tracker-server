import chalk from "chalk";

// enum for log type
enum logType {
    FATAL = "FATAL",
    SUCCESS = "SUCCESS",
    INFO = "INFO",
    WARNING = "WARNING",
}

// map for log type to color
const colorMap = {
    [logType.FATAL]: chalk.red,
    [logType.SUCCESS]: chalk.green,
    [logType.INFO]: chalk.blue,
    [logType.WARNING]: chalk.yellow,
};

/**
 * Log a message to the console
 * @param type - log type from logType enum
 * @param message - message to log
 */
const serverLog = (type: logType, message: string) => {
    // get the max align space form logType
    const maxSpaceAlign = Object.values(logType).reduce(
        (max, type) => Math.max(max, type.length),
        0
    );
    // print the log
    console.log(
        `[${colorMap[type](type.padEnd(maxSpaceAlign, " "))}] ${message}`
    );
};

const logger = {
    serverLog: serverLog,
    logType: logType,
};

export default logger;
