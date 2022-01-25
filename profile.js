let globalProfle = {}
let localProfile = {}

try {
    globalProfle = require('./profile.json')
} catch (e) {
    globalProfle = {}
}
try {
    localProfile = require('./profile.local.json')
} catch (e) {
    localProfile = {}
}

const profile = { ...globalProfle, ...localProfile }
module.exports = profile