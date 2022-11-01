// /////////////////////////////////////// //
// THIS BOT WAS CREATED BY BOPPE SCRIPTING //
//           Discord: boppe#3697           //
// /////////////////////////////////////// //
 
const { token, logChannelId, logActions, allowedUsers, allowedRoles, guildId } = require('./config.json')
const { Client, Intents } = require('discord.js')
const client = new Client({intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS ]})
const serverName = GetConvar('sv_hostname', '-- ERROR GETTING SERVER NAME --')
const QBCore = exports['qb-core'].GetCoreObject()
const checkAuthorization = require('./util/checkAuthorization')
const logMessage = require('./util/messageLogger')
 
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user?.setActivity(' ' + serverName, { type: 'WATCHING' })
    registerCommands(client);
});
 
client.on('interactionCreate', async(interaction) => {
    if (!interaction.isCommand()) return;
    await interaction.deferReply();
    boppeHandleCommand(interaction)
});
 
client.login(token);