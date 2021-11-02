const profileSchema = require("../models/profileSchema")

module.exports = {
    name: 'дуэль',
    description: "",
    cooldown: 60,
    async execute(client, message, args, Discord, AttackerData) {
        const target = message.mentions.users.first()
        let AttackedData = profileSchema.findOne({ userID: target.id })

        if (target === null || AttackedData === null || message.author.id === target.id) {
            message.reply(`Произошла ошибка во время попытки вызвать игрока на дуель. У кого-то из вас не создан профиль, либо вы не указали цель вызова.`);
        } else {
            message.channel.send("<@" + target.id + ">" + `, с вами хочет устроить дуэль пользователь ` + "<@" + message.author.id + ">" + `. Для того, чтобы принять, вы должны написать r!подтвердить (упоминание пользователя)`)
            
            const response1 = await profileSchema.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $set: {
                        duelID: target.id,
                    },
                }
            );
        }

    }
}