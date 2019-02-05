const invariant = require('invariant')
const Octokit = require('@octokit/rest')
const env = require('require-env')

module.exports = function createStatus(props) {
  const {
    repository = env.require('GITHUB_REPOSITORY'),
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
