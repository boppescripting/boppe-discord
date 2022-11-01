async function executeKick(interaction) {
    if (checkAuthorization(interaction) == false) { await interaction.editReply({ content: `You don't have permission.` }); return; }

    const { options } = interaction
    const sid = options.getString('id')
    const reason = options.getString('reason')
    const Player = QBCore.Functions.GetPlayer(parseInt(sid))
    if (Player === undefined) { await interaction.editReply({ content: `We could not find a player by the id: ${sid}.` }); return; }
    const FirstName = Player.PlayerData.charinfo.firstname
    const LastName = Player.PlayerData.charinfo.lastname
    DropPlayer(sid, reason)
    logMessage(interaction.client, `<@${interaction.user.id}> has just kicked **SERVER ID** - ${sid} | **NAME** ${FirstName} ${LastName} | **REASON** ${reason}`)
    await interaction.editReply({ content: `You have kicked **SERVER ID** - ${sid} | **NAME** ${FirstName} ${LastName} | **REASON** ${reason}` })
}

module.exports = executeKick