class Controller {
  constructor({ logger, githubService }) {
    this.logger = logger;
    this.githubService = githubService;
  }

  healthCheck(req, res) {
    try {
      return res.status(200).json({
        message: "Health check",
      });
    } catch (error) {
      this.logger.logError(`[Error][Controller-healthCheck]: ${error}`);
    }
  }

  postWebHook(req, res) {
    try {
      const { action, pull_request: pullRequest } = req.body;

      if (action === "opened") {
        const pullRequestNumber = pullRequest.number;
        const commentData =
          "Thanks for creating this Pull Request, review is on its way!";

        this.githubService.createPullRequestComment(
          pullRequestNumber,
          commentData
        );

        return res.sendStatus(200);
      }
    } catch (error) {
      this.logger.logError(`[Error][Controller-postWebHook]: ${error}`);
      return res.sendStatus(500);
    }
  }
}

module.exports = Controller;