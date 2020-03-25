const { debug, error } = require("@actions/core");
const {
    context,
    GitHub,
} = require("@actions/github");

class PullRequestChecker {
    constructor(repoToken) {
        this.client = new GitHub(repoToken);
    }

    async process() {
        const commits = await this.client.pulls.listCommits({
            ...context.repo,
            pull_number: context.issue.number,
        });

        debug(`${commits.data.length} commit(s) in the pull request`);

        let blockedCommits = 0;
        for (const commit of commits.data) {
            const isMergeCommit = commit.commit.message.startsWith("Merge branch");

            if (isMergeCommit) {
                error(`Commit ${commit.sha} is a Merge commit: ${commit.url}`);

                blockedCommits++;
            }
        }

        if (blockedCommits) {
            throw Error(`${blockedCommits} commit(s) need to be removed`);
        }
    }
}

module.exports = PullRequestChecker;
