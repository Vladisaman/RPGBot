module.exports = {
    name: "кошелёк",
    cooldown: 10,
    description: "Shows users gold amount",
    execute(client, message, args, Discord, profileData) {
        var critChance2 = Math.floor(profileData.dex / 10);
        message.channel.send(`${critChance2}`)

        if (profileData === null) {
            message.reply(`Невозможно найти данные по вашему аккаунту. Может быть у вас не создан профиль?`)
        } else {
            message.reply(`На данный момент у вас ${profileData.gold} золотых монет.`)
        }
    }
}