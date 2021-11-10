const profileSchema = require("../models/profileSchema")

module.exports = {
    name: 'подтвердить',
    description: "",
    async execute(client, message, args, Discord) {
        const target = message.mentions.users.first();
        const AttackerData = profileSchema.findOne({ userID: target });
        const AttackedData = profileSchema.findOne({ userID: message.author.id });

        if (target === null || AttackerData === null || AttackerData.duelID != AttackedData.userID) {
            message.reply(`Цель не вызывала вас на дуэль, или у неё не создан профиль.`)
        } else {
            const Attacked = await profileSchema.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $set: {
                        duelID: target.id,
                        isFighting: true,
                    },
                }
            );

            const Attacker = await profileSchema.findOneAndUpdate(
                {
                    userID: target.id,
                },
                {
                    $set: {
                        isFighting: true,
                    },
                }
            );

            let fightComm = client.commands.get("fight");
            fightComm.execute(client, message, args, Discord, target.id, message.author.id);
        }
    }
}