import { createLogger, config, format } from "winston";
import DailyRotateFile = require("winston-daily-rotate-file");

export const configWinston = {
    levels: {
        error: 0,
        debug: 1,
        warn: 2,
        data: 3,
        http: 4,
        info: 5,
        verbose: 6,
        silly: 7,
        custom: 8,
    },
    colors: {
        error: 'red',
        debug: 'blue',
        warn: 'yellow',
        data: 'grey',
        http: 'grey',
        info: 'green',
        verbose: 'cyan',
        silly: 'magenta',
        custom: 'yellow',
    },
}

config.addColors(configWinston.colors);

export const transportDailyRotateFile = new DailyRotateFile({
    dirname: 'mylog',
    filename: `%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '10m',
    maxFiles: '14d',
});

export const loggerInstance = createLogger({
    levels: configWinston.levels,
    format: format.simple(),
    // format: format.json(),
    transports: [
        transportDailyRotateFile,
    ]
});