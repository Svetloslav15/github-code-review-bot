const express = require("express");
const GithubService = require("./GithubService");
const Logger = require("./Logger");
const Controller = require("./Controller");

class Application {
  constructor(octokit) {
    this.port = process.env.PORT;
    this.app = express();
    this.octokit = octokit;
    this.logger = new Logger();
    this.githubService = new GithubService(this);
    this.controller = new Controller(this);
    console.log('testt')
  }

  async start() {
    await this.configureMiddlewares();
    await this.configureEndpoints();

    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }

  async configureEndpoints() {
    this.app.get("/health-check", this.controller.healthCheck);
    this.app.post("/webhook", this.controller.postWebHook);
  }

  async configureMiddlewares() {
    this.app.use(express.json());
  }
}

module.exports = Application;
