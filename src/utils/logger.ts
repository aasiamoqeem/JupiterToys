
import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [
    // This can be enabled for debugging purpose
     new transports.Console({level: "debug"}),
     new transports.File({ 
         filename: 'debug.log',
         maxsize: 10*1024,
         maxFiles:1,
         level: "info",
      }),
     new transports.Console({level: "error"}),
     new transports.File({ 
         filename: 'error.log',
         maxsize: 10*1024,
         maxFiles:1,
         level: "error",
      }),
  ],
});
