workflow "test it out" {
  on = "push"
  resolves = "test"
}

action "install" {
  uses = "actions/npm@master"
  args = "install"
}

action "test" {
  uses = "docker://node:10-slim"
  runs = "node cli.js --context foo --state success --desc 'hello, world!' --url https://example.com"
}
