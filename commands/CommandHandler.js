function boppeHandleCommand(interaction) {
    const { commandName } = interaction

    switch (commandName) {
        case 'setjob':
            executeSetJob(interaction)
            break
        case 'addmoney':
            executeAddMoney(interaction)
            break
        case 'setmoney':
            executeSetMoney(interaction)
            break
        case 'getmoney':
            executeGetMoney(interaction)
            break
        case 'revive':
            executeRevive(interaction)
            break
        case 'kick':
            executeKick(interaction)
            break
        default:
            console.log('Unknown case.')
            break
    }
}

module.exports = boppeHandleCommand;