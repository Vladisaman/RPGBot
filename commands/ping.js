module.exports = {
    name: 'ping',
    description: "",
    cooldown: 30,
    execute(client, message, args) {
        message.channel.send('pong');
    }
}