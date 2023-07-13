const { Octokit } = require("octokit");
const Application = require("./Application");

const octokit = new Octokit({
  auth: process.env.OCTOKIT_TOKEN,
});

const app = new Application(octokit);
//Starting point of the application
app.start();
