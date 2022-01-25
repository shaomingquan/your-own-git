const { spawnSync } = require('child_process');
const program = require('./profile.js').which_program
const { exitWithMessage } = require('./utils')

module.exports = (args) => {
    const [gitCommand, ...gitArgs] = args
    
    // when checkout new branch, must on master
    if (
        gitCommand === 'checkout' && 
        gitArgs[0] === '-b'
    ) {
        const ret = spawnSync(program, ['symbolic-ref', 'HEAD']).stdout.toString()
        if (
            typeof ret === 'string' && 
            'master' !== ret.split('/').pop().trim()
        ) {
            return exitWithMessage('每次checkout新分支，需要基于master')
        }
    }

    // merge release-xxx to other branch is dangerous 
    if (
        gitCommand === 'merge' && 
        (
            typeof gitArgs[0] === 'string' && 
            gitArgs[0].indexOf('release-') > -1
        )
    ) {
        return exitWithMessage('release分支不可线下合并，如果release含有不可上线功能，则永远不要以任何方式合并')
    }
}