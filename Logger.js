const winston = require('winston');

class Logger {
    constructor() {
        this.logger = null;
        this.filePath = `logs/${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}.txt`;
        this.start();
    console.log('testt')

    }

    start() {
        this.logger = winston.createLogger({
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: this.filePath})]
        });
    }

    logInfo(message) {
        this.logger.info(message);
        this.logger.info(message);
    }
    
    logError(message) {
        this.logger.error(message);
    }
}


module.exports = Logger;