# Dependabot Auto-Fix Workflow

## Overview

The `on-dependabot-failure.yml` workflow automatically invokes the GitHub Copilot CLI to fix dependency compatibility issues when dependabot-created PRs fail the CI (Lint and Test) workflow.

## How It Works

### Automatic Trigger (workflow_run)
When the **Lint and Test** workflow (`on-pullrequest.yml`) completes with a **failure** on a PR created by `dependabot[bot]`, this workflow automatically:

1. **Detects the failure**: Triggers on `workflow_run` for `on-pullrequest.yml` with `conclusion == 'failure'`
2. **Validates the PR author**: Confirms the PR was created by `dependabot[bot]`
3. **Checks out the PR branch**: Uses the head branch and commit SHA from the failed workflow
4. **Installs dependencies**: Sets up Node.js and npm packages
5. **Invokes Copilot CLI**: Runs the `update-dependencies` agent in `--security-only` mode
6. **Commits fixes**: Automatically commits changes back to the PR branch if changes were made
7. **Notifies via comment**: Posts a comment on the PR confirming the fix was applied

### Manual Trigger (workflow_dispatch)
You can also manually trigger this workflow for any PR:

1. Go to **Actions** → **Fix Dependabot CI Failures**
2. Click **Run workflow**
3. Enter the PR number
4. Click **Run workflow**

This is useful if:
- You want to test the workflow on a specific PR
- The automatic trigger didn't work as expected
- You need to re-run the fix on an existing PR

## The update-dependencies Agent

The workflow invokes the GitHub Copilot CLI with the `update-dependencies.agent.md` agent. This agent:

- **Runs in `--security-only` mode** by default (patches security vulnerabilities only)
- **Avoids major version bumps** to reduce breaking changes
- **Skips EdFi packages** (those are handled separately)
- **Automatically commits in logical groups** as it updates dependencies
- **Verifies builds and tests after each update** to catch regressions early

## What Gets Fixed

| Category | Action |
|---|---|
| **Security vulnerabilities** | ✅ Automatically patched to the first safe version |
| **Minor/patch updates** | ✅ Automatically applied (safe, incremental) |
| **Major version bumps** | ❌ Skipped (too risky for auto-fix) |
| **EdFi packages** | ❌ Skipped (handled separately) |

## Workflow Permissions

The workflow requires:
- `contents: write` — To commit changes and push to the PR branch
- `pull-requests: write` — To post comments on the PR

## Configuration

The workflow is located at `.github/workflows/on-dependabot-failure.yml`.

**To customize:**
- Change the `--security-only` flag to `--minor` or `--all` (not recommended for automation)
- Adjust the agent file path if the agent documentation moves
- Modify the commit message format

## Example Flow

```
1. Dependabot creates PR: deps/npm/jest-123-abc456
   └─ Updates: jest 27.0.0 → 28.0.0 (major bump)

2. Lint and Test workflow runs and FAILS
   └─ Type errors or test failures due to jest changes

3. Fix Dependabot CI Failures workflow AUTOMATICALLY TRIGGERS
   └─ Copilot agent analyzes the failure
   └─ Agent downgrades jest to 27.5.0 (latest minor, avoids major)
   └─ Commits: "deps: auto-fix dependency issues from dependabot"
   └─ Pushes changes to the PR branch

4. Lint and Test workflow runs again (automatically)
   └─ Should pass with the fixes applied

5. PR is ready to merge!
   └─ Comment posted: "🤖 Copilot Auto-Fix Complete"
```

## Troubleshooting

### The workflow didn't run automatically
- Check that the PR author is `dependabot[bot]` (look at PR author field)
- Verify the Lint and Test workflow actually failed (not just a partial failure)
- Check workflow permissions in your repository settings

### The workflow ran but didn't fix the issue
- The agent may determine the build failure is unrelated to dependencies
- Complex breaking changes might require manual intervention
- Check the workflow run logs for details

### The agent needs to apply major version bumps
- Manually trigger the workflow via `workflow_dispatch`
- This will wait for approval if trying major bumps

## Related Documentation

- [update-dependencies.agent.md](./.agents/update-dependencies.agent.md) — Full agent behavior documentation
- [GitHub Copilot CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli) — Official Copilot CLI docs
- [on-pullrequest.yml](./on-pullrequest.yml) — The workflow that triggers this workflow
