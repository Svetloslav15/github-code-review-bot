class GithubService {
  constructor({ octokit, logger }) {
    this.github = octokit.rest;
    this.logger = logger;
  }

  async createPullRequestComment(pullRequestNumber, content) {
    try {
      const response = await this.github.issues.createComment({
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        issue_number: pullRequestNumber,
        body: content,
      });

      const commentUrl = response.data.html_url;
      this.logger.logInfo(`Comment created successfully: ${commentUrl}`);

      return commentUrl;
    } catch (error) {
      this.logger.logError(error);
    }
  }

  async createPullRequestReview(review) {
    //todo
  }

  async getPullRequest(owner, repo, pullRequestNumber) {
    try {
      const response = await this.github.pulls.get({
        owner,
        repo,
        pull_number: pullRequestNumber,
      });

      const pullRequestTitle = response.data.title;
      this.logger.logInfo(
        `Pull Request ${pullRequestNumber} fetched successfully: ${pullRequestTitle}`
      );

      return response;
    } catch (error) {
      this.logger.logError(error);
    }
  }
}

module.exports = GithubService;
