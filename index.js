#!/usr/bin/env node
const { spawnSync } = require('child_process');
const { shouldCheckWithRules } = require('./utils')
const program = require('./profile.js').which_program
const args = process.argv.slice(2)
shouldCheckWithRules(args) && require('./rules')(args)
const options = { stdio: 'inherit' }
process.exit(spawnSync(program, args, options).status)