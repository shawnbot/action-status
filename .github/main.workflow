workflow "test it out" {
  on = "push"
  resolves = "test"
}

action "install" {
  uses = "actions/npm@master"
  args = "install"
}

action "test" {
  uses = "actions/npm@master"
  runs = ["cli.js"]
  args = [
    "--context", "foo",
    "--state", "success",
    "--desc", "'hello, world!'",
    "--url", "https://example.com",
  ]
}
