function checkAuthorization(interaction) {
    var hasRole = false
 
    if (allowedRoles.length === 0 || allowedRoles === undefined) return false
    hasRole = interaction.member.roles.cache.some(r => allowedRoles.includes(r.name))
 
    if (allowedUsers.length === 0 || allowedUsers === undefined) return false
    if (hasRole == false) {
        if (allowedUsers.includes(interaction.user.id)) {
            hasRole = true
        }
    }
    return hasRole
}

module.exports = checkAuthorization;