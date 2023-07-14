const { Octokit } = require("octokit");
const Application = require("./Application");

require('dotenv').config();
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const app = new Application(octokit);
//Starting point of the application
app.start();
