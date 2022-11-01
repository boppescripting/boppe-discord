async function executeGetMoney(interaction) {
    if (checkAuthorization(interaction) == false) { await interaction.editReply({ content: `You don't have permission.` }); return; }

    const { options } = interaction
    const sid = options.getString('id')
    const moneyType = options.getString('moneytype')
    const Player = QBCore.Functions.GetPlayer(parseInt(sid))
    if (Player === undefined) { await interaction.editReply({ content: `We could not find a player by the id: ${sid}.` }); return; }
    const FirstName = Player.PlayerData.charinfo.firstname
    const LastName = Player.PlayerData.charinfo.lastname
    logMessage(interaction.client, `<@${interaction.user.id}> has just checked money for **SERVER ID** - ${sid} | **NAME** ${FirstName} ${LastName} /  **${moneyType.toUpperCase()}** - ${Player.PlayerData.money[moneyType.toLowerCase()]}`)
    await interaction.editReply({ content: `**MONEY CHECK** -> **SERVER ID** - ${sid} | **${moneyType}** - ${Player.PlayerData.money[moneyType]}` })
}

module.exports = executeGetMoney