async function executeSetJob(interaction) {
    if (checkAuthorization(interaction) == false) { await interaction.editReply({ content: `You don't have permission.` }); return; }

    const { options } = interaction
    const sid = options.getString('id')
    const jobcode = options.getString('jobcode')
    const grade = options.getString('grade')

    const Player = QBCore.Functions.GetPlayer(parseInt(sid))
    if (Player === undefined) { await interaction.editReply({ content: `We could not find a player by the id: ${sid}.` }); return; }
    const FirstName = Player.PlayerData.charinfo.firstname
    const LastName = Player.PlayerData.charinfo.lastname
    if (Player.Functions.SetJob(jobcode, grade)) {
        logMessage(interaction.client, `<@${interaction.user.id}> has just set the job for **SERVER ID** - ${sid} | **NAME** ${FirstName} ${LastName} / **JOB CODE** - ${jobcode} | **JOB GRADE** - ${grade}`)
        await interaction.editReply({ content: `**JOB SET** -> **SERVER ID** - ${sid} | **JOB CODE** - ${jobcode} | **JOB GRADE** - ${grade}` })
    } else {
        await interaction.editReply({ content: `There was an error setting their job.` })
    }
}

module.exports = executeSetJob