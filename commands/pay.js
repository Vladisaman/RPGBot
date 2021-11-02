const profileSchema = require("../models/profileSchema")

module.exports = {
    name: "передать",
    description: "Pays another user",
    cooldown: 60,
    async execute(client, message, args, Discord, profileData) {
        const target = message.mentions.users.first();
        let userData = profileSchema.findOne({ userID: target.id })

        if (target === null || parseFloat(args[1]) === null || profileData === null || userData === null)  {
            message.reply(`Произошла ошибка во время использования команды. Возможно вы не указали сумму, либо у вас не создан профиль. Для того, чтобы передать другому игроку деньги, вы должны сделать сообщение-команду по следующим правилам: r!pay (упоминание человека) (количество монет).`)
        } else {

            try{
            var amount = parseFloat(args[1])

            amount = Math.floor(amount)

            if (profileData.gold < amount || amount < 0) {
                message.reply(`У вас недостаточно денег для данной операции или вы ввели команду некорректно.`);

            } else {

                const response1 = await profileSchema.findOneAndUpdate(
                    {
                        userID: message.author.id,
                    },
                    {
                        $inc: {
                            gold: -amount,
                        },
                    }
                );

                const response2 = await profileSchema.findOneAndUpdate(
                    {
                        userID: target.id,
                    },
                    {
                        $inc: {
                            gold: amount,
                        },
                    }
                );

                message.reply(`Успешно передано ${amount} золота от ${message.author.username} игроку ${target.username}.`)
            }
        } catch (err) {
            message.reply(`Попробуйте ввести корректную сумму денег.`)
        }
        };
    }
}