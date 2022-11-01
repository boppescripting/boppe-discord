async function executeAddMoney(interaction) {
    if (checkAuthorization(interaction) == false) { await interaction.editReply({ content: `You don't have permission.` }); return; }

    const { options } = interaction
    const sid = options.getString('id')
    const moneyType = options.getString('moneytype')
    const amountOfMoney = options.getString('amountofmoney')

    const Player = QBCore.Functions.GetPlayer(parseInt(sid))
    if (Player === undefined) { await interaction.editReply({ content: `We could not find a player by the id: ${sid}.` }); return; }
    const FirstName = Player.PlayerData.charinfo.firstname
    const LastName = Player.PlayerData.charinfo.lastname
    if (Player.Functions.AddMoney(moneyType, amountOfMoney)) {
        logMessage(interaction.client, `<@${interaction.user.id}> has just added money for **SERVER ID** - ${sid} | **NAME** ${FirstName} ${LastName} /  **MONEY TYPE** - ${moneyType} | **AMOUNT** - ${amountOfMoney}`)
        await interaction.editReply({ content: `**MONEY ADDED** -> **SERVER ID** - ${sid} | **MONEY TYPE** - ${moneyType} | **AMOUNT** - ${amountOfMoney}` })
    } else {
        await interaction.editReply({ content: `There was an error adding their money.` })
    }
}

module.exports = executeAddMoney