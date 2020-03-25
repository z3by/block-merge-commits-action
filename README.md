# Block Merge Commits Action

A Github Action to prevent merging pull requests containing **merge** commit messages.

## How it works

If any commit message in the pull request starts with `Merge branch` the check status will be set to `error`.

## Usage

```yaml
on: pull_request

name: Pull Requests

jobs:
  message-check:
    name: Block Merge Commits

    runs-on: ubuntu-latest

    steps:
      - name: Block Merge Commits
        uses: z3by/block-merge-commits-action@master
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

You'll also need to add a [required status check](https://help.github.com/en/articles/enabling-required-status-checks) rule for your action to block merging if it detects any `Merge` commits.
