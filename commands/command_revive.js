async function executeRevive(interaction) {
    if (checkAuthorization(interaction) == false) { await interaction.editReply({ content: `You don't have permission.` }); return; }

    const { options } = interaction
    const sid = options.getString('id')
    const Player = QBCore.Functions.GetPlayer(parseInt(sid))
    if (Player === undefined) { await interaction.editReply({ content: `We could not find a player by the id: ${sid}.` }); return; }
    const FirstName = Player.PlayerData.charinfo.firstname
    const LastName = Player.PlayerData.charinfo.lastname
    emitNet("hospital:client:Revive", Player.PlayerData.source)
    logMessage(interaction.client, `<@${interaction.user.id}> has just revived **SERVER ID** - ${sid} | **NAME** ${FirstName} ${LastName}`)
    await interaction.editReply({ content: `**REVIVE** -> **SERVER ID** - ${sid}` })
}

module.exports = executeRevive