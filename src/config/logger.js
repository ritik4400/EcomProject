const winston = require("winston");
const path = require("path");

//log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each log level (for console output)
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

// Add the custom colors to Winston
winston.addColors(colors);

// Define the log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp}${info.level}:${info.message}` // Custom log message format
  )
);
// Define a separate format for file logs (without colorization)
const fileLogFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(
    (info) => `${info.timestamp}${info.level}:${info.message}` // Custom log message format
  )
);
// Configure transports
const transports = [
  // - Logs all levels (error, warn, info, http, debug) to the console.
  // - Uses the `logFormat` with colorization.
  new winston.transports.Console({
    level: "debug",
    format: logFormat,
  }),
  // File Transport for Errors:
  // - Logs only 'error' level messages to a dedicated error file.
  // - Uses `fileLogFormat` (no colors).
  new winston.transports.File({
    filename: path.join(__dirname, "../../../logs/error.log"), // Path to error log file
    level: "error", // Only log 'error' messages to this file
    format: fileLogFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    tailable: true, // Rotate logs by tailing
  }),
  // File Transport for General Logs:
  // - Logs 'info', 'warn', 'error', 'http', 'debug' to a combined log file.
  // - Uses `fileLogFormat` (no colors).
  new winston.transports.File({
    filename: path.join(__dirname, "../../../logs/combined.log"), // Path to combined log file
    level: "debug", // Log 'debug' and above to this file
    format: fileLogFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    tailable: true,
  }),
];

// Create the Winston logger instance
const logger = winston.createLogger({
  levels: levels, // Custom levels
  transports: transports, // Our defined transports
  exitOnError: false, // Do not exit on handled exceptions
});

module.exports = logger;
