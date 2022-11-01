function logMessage (client, msg) {
    if (logActions) { client.channels.cache.get(logChannelId).send(msg) }
}

module.exports = logMessage;