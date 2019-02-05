workflow "test it out" {
  on = "push"
  resolves = ["test"]
}

action "install" {
  uses = "actions/npm@master"
  args = "install"
}

action "test" {
  uses = "./"
  args = [
    "--context=test/status",
    "--state=success",
    "--desc='hello, world!'",
    "--url=https://example.com"
  ]
  secrets = ["GITHUB_TOKEN"]
}
