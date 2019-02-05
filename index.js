const invariant = require('invariant')
const Octokit = require('@octokit/rest')
const env = require('require-env')
const {parse} = require('url')

module.exports = function createStatus(props) {
  const {
    // XXX This is a workaround for `act`, which initializes
    // GITHUB_REPOSITORY as the fully-qualified git remote URL
    // rather than just the "owner/repo" slug.
    repository = getURLPath(env.require('GITHUB_REPOSITORY')),
    sha = env.require('GITHUB_SHA'),
    state = env.require('GITHUB_ACTION_STATE'),
    context = env.require('GITHUB_ACTION_CONTEXT'),
    description = env.require('GITHUB_ACTION_DESC'),
    url = env.require('GITHUB_ACTION_TARGET_URL'),
    token = env.require('GITHUB_TOKEN')
  } = props

  const [owner, repo] = repository.split('/')

  const github = new Octokit({auth: `token ${token}`})
  return github.repos.createStatus({
    owner,
    repo,
    sha,
    context,
    state,
    description,
    target_url: url
  })
}

function getURLPath(str) {
  const {path} = parse(str)
  return path.replace(/^\//, '')
}
