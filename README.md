# action-status
`action-status` makes it easy to create [check statuses] in [GitHub Actions].

## Why?
Currently, each action in a GitHub Actions workflow has its status set automatically, and you can't change anything useful about the status (such as its short textual description or "Details" link URL) because it'll be overwritten when the action is resolved in the workflow. `action-status` makes it easy to create separate status checks with a unique name that can include more useful information, for instance:

* A short description noting why the action succeeded or failed;
* Intentionally "pending" statuses that indicate things to be fixed in a pull request before it can be merged, a la [Semantic Pull Requests](https://github.com/probot/semantic-pull-requests);
* Point directly to relevant URLs from the "Details" link, such as site deployments;
* Report code coverage with ASCII characters;
* And so on!

## Usage
There are three different ways to use it:

1. [As an npm dependency](#npm)
1. [With `npx`](#npx)
1. [As a GitHub Action](#github-action)

### npm
You can install `action-status` via npm with:

```sh
npm install --save --dev action-status
```

Then, in your package's [run-scripts] you can call it via `action-status`, e.g. if you publish to npm from Actions, you could do this:

```json
{
  "scripts": {
    "prepublish": "action-status --context=\"publish $npm_package_name\" --state=pending --desc=\"Publishing $npm_package_version...\"",
    "postpublish": "action-status --context=\"publish $npm_package_name\" --state=success --desc=\"Published $npm_package_version\"",
  },
  "devDependencies": {
    "action-status": "1.0.0"
  }
}
```

:warning: **Warning:** npm is run as `root` in GitHub Actions, which means that pre- and post- lifecycle scripts will not be run unless you explicitly call `npm` with the `--unsafe-perms` option. Be warned, though, that this makes it possible for any of your dependencies to run (in a `preinstall` script, for instance) arbitrary commands with access to your secrets, source, and git history.

### npx
Using npm's [npx command][npx] allows you to run `action-status` without explicitly declaring it as a dependency in your `package.json`:

```sh
npx action-status --context=ping --state=success
```

**Note:** This is really only useful if you're running it once, though, since `npx` will reinstall the package each time you call it.

### GitHub Action
You can call the `action-status` command via an action with:

```hcl
action "status" {
  uses = "shawnbot/action-status@master"
  args = ["--context=ping", "--state=success"]
  secrets = ["GITHUB_TOKEN"]
}
```

**Note:** You must enable the automatic `GITHUB_TOKEN` secret unless you're going to provide a different access token via `--token=$SOME_OTHER_SECRET`

[check statuses]: https://help.github.com/articles/about-status-checks/
[github actions]: https://github.com/features/actions
[run-scripts]: https://docs.npmjs.com/misc/scripts
[npx]: https://www.npmjs.com/package/npx
