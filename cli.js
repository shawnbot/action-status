#!/usr/bin/env node
const createStatus = require('.')
const {readFileSync} = require('fs')
const yargs = require('yargs')
  .usage('$0 [options]')
  .option('repository', {
    describe: 'The repository slug, in the form "owner/repo"',
    type: 'string',
    alias: ['repo', 'r']
  })
  .option('sha', {
    describe: 'The commit SHA',
    type: 'string'
  })
  .option('context', {
    describe: 'The status label in checks lists',
    type: 'string',
    alias: 'c'
  })
  .option('state', {
    describe: 'The state of your check',
    choices: ['pending', 'success', 'error', 'failure'],
    alias: 's'
  })
  .option('description', {
    describe: 'A short description of your check',
    type: 'string',
    alias: ['desc', 'd']
  })
  .option('url', {
    desscribe: 'The target URL of the "Details" link in your check',
    type: 'string',
    alias: 'u'
  })
  .option('json', {
    describe: 'Read the commit status properties from a JSON file',
    type: 'string',
    alias: ['read', 'j']
  })
  .alias('h', 'help')

const props = yargs.argv
if (props.help) {
  return yargs.showHelp()
} else {
  if (props.json) {
    const json = readFileSync(props.json, 'utf8')
    Object.assign(props, JSON.parse(json))
  }
  // console.dir(props)
  createStatus(props)
    .then(res => {
      console.log('status created!', res)
    })
    .catch(error => {
      console.error(error)
      process.exitCode = 1
    })
}
