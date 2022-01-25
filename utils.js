const { spawnSync } = require('child_process');
const {
    which_program: program,
    git_projects_to_check,
    git_commands_to_check,
} = require('./profile.js')

const gitProjectsSetToCheck = new Set(git_projects_to_check)
const gitCommandsSetToCheck = new Set(git_commands_to_check)

exports.exitWithMessage = (text, code = 128) => {
    process.stdout.write(text)
    process.exit(code)
}

exports.shouldCheckWithRules = (args) => {
    const [ command ] = args
    if (!gitCommandsSetToCheck.has(command)) {
        return false
    }
    
    const gitProject = spawnSync(program, ['remote', 'get-url', '--push', 'origin']).stdout.toString()
    if (!gitProjectsSetToCheck.has(gitProject.trim())) {
        return false
    }
    return true
}