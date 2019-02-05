workflow "test it out" {
  on = "push"
  resolves = [
    "test",
    "debug"
]
}

action "install" {
  uses = "actions/npm@master"
  args = "install"
}

action "debug" {
  uses = "shawnbot/node-debug-action@master"
}

action "test" {
  uses = "docker://node:10-slim"
  runs = "node ./cli.js --context foo --state success --desc 'hello, world!' --url https://example.com"
}
