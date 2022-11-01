function registerCommands(client) {
    const guild = client.guilds.cache.get(guildId)
    let commands = guild ? guild.commands : client.application?.commands;

    commands?.create({ name: "setjob", description: "Set a players job.", options: [{ name: "id", description: "Server ID.", required: true, type: "STRING" }, { name: "jobcode", description: "Code for the job.", required: true, type: "STRING" }, { name: "grade", description: "Job grade.", required: true, type: "STRING" },] });
    commands?.create({ name: "addmoney", description: "Give money to a player.", options: [{ name: "id", description: "Server ID.", required: true, type: "STRING" }, { name: "moneytype", description: "Bank/Cash/Crypto.", required: true, type: "STRING" }, { name: "amountofmoney", description: "Amount of money.", required: true, type: "STRING" },] });
    commands?.create({ name: "setmoney", description: "Set a players money.", options: [{ name: "id", description: "Server ID.", required: true, type: "STRING" }, { name: "moneytype", description: "Bank/Cash/Crypto.", required: true, type: "STRING" }, { name: "amountofmoney", description: "Amount of money.", required: true, type: "STRING" },] });
    commands?.create({ name: "getmoney", description: "Check a players money.", options: [{ name: "id", description: "Server ID.", required: true, type: "STRING" }, { name: "moneytype", description: "Bank/Cash/Crypto.", required: true, type: "STRING" },] });
    commands?.create({ name: "revive", description: "Revive a player.", options: [{ name: "id", description: "Server ID.", required: true, type: "STRING" },] });
    commands?.create({ name: "kick", description: "kick a player.", options: [{ name: "id", description: "Server ID.", required: true, type: "STRING" }, { name: "reason", description: "Kick reason.", required: true, type: "STRING" }] });
}

module.exports = registerCommands;