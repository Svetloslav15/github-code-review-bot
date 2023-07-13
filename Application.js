const express = require('express');

class Application {
    constructor() {
        this.port = process.env.PORT;
        this.app = express();
    }

    async start() {
        await this.configureMiddlewares();
        await this.configureEndpoints();
    }

    async configureEndpoints() {
        //todo
    }

    async configureMiddlewares() {
        //todo
    }
}

module.exports = Application;