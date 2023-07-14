class Controller {
  constructor({logger, githubService}) {
    this.logger = logger;
    this.githubService = githubService;
  }

  healthCheck = async (req, res) => {
    try {
      return res.status(200).json({
        message: "Health check",
      });
    } catch (error) {
      this.logger.logError(`[Error][Controller-healthCheck]: ${error}`);
    }
  }

  postWebHook = async (req, res) => {
    try {
      const { action, pull_request: pullRequest } = req.body;

      console.log(action);
      if (action === "opened" || action === 'closed' || action === 'reopened') {
        const pullRequestNumber = pullRequest.number;

        const commentData =
          "Thanks for creating this Pull Request, review is on its way!";

        await this.githubService.createPullRequestComment(
          pullRequestNumber,
          commentData
        );

        return res.sendStatus(200);
      }
    } catch (error) {
        console.log(error)
      //this.logger.logError(`[Error][Controller-postWebHook]: ${error}`);
      return res.sendStatus(500);
    }
  }
}

module.exports = Controller;
