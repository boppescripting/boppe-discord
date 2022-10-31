// /////////////////////////////////////// //
// THIS BOT WAS CREATED BY BOPPE SCRIPTING //
//           Discord: boppe#3697           //
// /////////////////////////////////////// //

const { token, guildId, logChannelId, logActions, allowedUsers, allowedRoles } = require('./config.json')
const {Client, Intents} = require('discord.js')
const client = new Client({intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS ]})
const QBCore = exports['qb-core'].GetCoreObject()
const serverName = GetConvar('sv_hostname', '-- ERROR GETTING SERVER NAME --')

// Functions
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

function logMessage (msg) {
    if (logActions) { client.channels.cache.get(logChannelId).send(msg) }
}

// Discord Events
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user?.setActivity(' ' + serverName, { type: 'WATCHING' })
    
    const guild = client.guilds.cache.get(guildId)
    let commands

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'setjob',
        description: 'Set a players job.',
        options: [
            {
                name: 'id',
                description: 'Server ID.',
                required: true,
                type: 'STRING'
            },
            {
                name: 'jobcode',
                description: 'Code for the job.',
                required: true,
                type: 'STRING'
            },
            {
                name: 'grade',
                description: 'Job grade.',
                required: true,
                type: 'STRING'
            },
        ]
    })

    commands?.create({
        name: 'addmoney',
        description: 'Give money to a player.',
        options: [
            {
                name: 'id',
                description: 'Server ID.',
                required: true,
                type: 'STRING'
            },
            {
                name: 'moneytype',
                description: 'Bank/Cash/Crypto.',
                required: true,
                type: 'STRING'
            },
            {
                name: 'amountofmoney',
                description: 'Amount of money.',
                required: true,
                type: 'STRING'
            },
        ]
    })

    commands?.create({
        name: 'setmoney',
        description: 'Set a players money.',
        options: [
            {
                name: 'id',
                description: 'Server ID.',
                required: true,
                type: 'STRING'
            },
            {
                name: 'moneytype',
                description: 'Bank/Cash/Crypto.',
                required: true,
                type: 'STRING'
            },
            {
                name: 'amountofmoney',
                description: 'Amount of money.',
                required: true,
                type: 'STRING'
            },
        ]
    })

    commands?.create({
        name: 'getmoney',
        description: 'Check a players money.',
        options: [
            {
                name: 'id',
                description: 'Server ID.',
                required: true,
                type: 'STRING'
            },
            {
                name: 'moneytype',
                description: 'Bank/Cash/Crypto.',
                required: true,
                type: 'STRING'
            },
        ]
    })

    commands?.create({
        name: 'revive',
        description: 'Revive a player.',
        options: [
            {
                name: 'id',
                description: 'Server ID.',
                required: true,
                type: 'STRING'
            },
        ]
    })
});

client.on('interactionCreate', async(interaction) => {
    // COMMANDS
	if (!interaction.isCommand()) return;
    const { commandName, options } = interaction

    if (commandName == 'setjob') {
        if (checkAuthorization(interaction) == false) { interaction.reply({content: `You don't have permission.`}); return; } 

        const sid = options.getString('id')
        const jobcode = options.getString('jobcode')
        const grade = options.getString('grade')

        const Player = QBCore.Functions.GetPlayer(parseInt(sid))
        if (Player === undefined) { interaction.reply({ content: `We could not find a player by the id: ${sid}.` }); return; }
        if (Player.Functions.SetJob(jobcode, grade)) {
            logMessage(`<@${interaction.user.id}> has just set the job for **SERVER ID** - ${sid} | **JOB CODE** - ${jobcode} | **JOB GRADE** - ${grade}`)
            interaction.reply({ content: `**JOB SET** -> **SERVER ID** - ${sid} | **JOB CODE** - ${jobcode} | **JOB GRADE** - ${grade}` })
        } else {
            interaction.reply({ content: `There was an error setting their job.` })
        }
    } else if (commandName == 'addmoney') {
        if (checkAuthorization(interaction) == false) { interaction.reply({content: `You don't have permission.`}); return; } 

        const sid = options.getString('id')
        const moneyType = options.getString('moneytype')
        const amountOfMoney = options.getString('amountofmoney')

        const Player = QBCore.Functions.GetPlayer(parseInt(sid))
        if (Player === undefined) { interaction.reply({ content: `We could not find a player by the id: ${sid}.` }); return; }
        if (Player.Functions.AddMoney(moneyType, amountOfMoney)) {
            logMessage(`<@${interaction.user.id}> has just added money for **SERVER ID** - ${sid} | **MONEY TYPE** - ${moneyType} | **AMOUNT** - ${amountOfMoney}`)
            interaction.reply({ content: `**MONEY ADDED** -> **SERVER ID** - ${sid} | **MONEY TYPE** - ${moneyType} | **AMOUNT** - ${amountOfMoney}` })
        } else {
            interaction.reply({ content: `There was an error adding their money.` })
        }
    } else if (commandName == 'setmoney') {
        if (checkAuthorization(interaction) == false) { interaction.reply({content: `You don't have permission.`}); return; } 

        const sid = options.getString('id')
        const moneyType = options.getString('moneytype')
        const amountOfMoney = options.getString('amountofmoney')

        const Player = QBCore.Functions.GetPlayer(parseInt(sid))
        if (Player === undefined) { interaction.reply({ content: `We could not find a player by the id: ${sid}.` }); return; }
        if (Player.Functions.SetMoney(moneyType, amountOfMoney)) {
            logMessage(`<@${interaction.user.id}> has just set money for **SERVER ID** - ${sid} | **MONEY TYPE** - ${moneyType} | **AMOUNT** - ${amountOfMoney}`)
            interaction.reply({ content: `**MONEY SET** -> **SERVER ID** - ${sid} | **MONEY TYPE** - ${moneyType} | **AMOUNT** - ${amountOfMoney}` })
        } else {
            interaction.reply({ content: `There was an error setting their money.` })
        }
    } else if (commandName == 'getmoney') {
        if (checkAuthorization(interaction) == false) { interaction.reply({content: `You don't have permission.`}); return; } 

        const sid = options.getString('id')
        const moneyType = options.getString('moneytype')
        const Player = QBCore.Functions.GetPlayer(parseInt(sid))
        if (Player === undefined) { interaction.reply({ content: `We could not find a player by the id: ${sid}.` }); return; }
        logMessage(`<@${interaction.user.id}> has just checked money for **SERVER ID** - ${sid} | **${moneyType.toUpperCase()}** - ${Player.PlayerData.money[moneyType.toLowerCase()]}`)
        interaction.reply({ content: `**MONEY CHECK** -> **SERVER ID** - ${sid} | **${moneyType}** - ${Player.PlayerData.money[moneyType]}` })
    } else if (commandName == 'revive') {
        if (checkAuthorization(interaction) == false) { interaction.reply({content: `You don't have permission.`}); return; } 

        const sid = options.getString('id')
        const Player = QBCore.Functions.GetPlayer(parseInt(sid))
        if (Player === undefined) { interaction.reply({ content: `We could not find a player by the id: ${sid}.` }); return; }
        emitNet("hospital:client:Revive", Player.PlayerData.source)
        logMessage(`<@${interaction.user.id}> has just revived **SERVER ID** - ${sid}`)
        interaction.reply({ content: `**REVIVE** -> **SERVER ID** - ${sid}` })
    }
});

client.login(token);