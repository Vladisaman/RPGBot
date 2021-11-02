const profileSchema = require("../models/profileSchema")

module.exports = {
    name: 'подтвердить',
    description: "",
    async execute(client, message, args, Discord, AttackedData) {
        const target = message.mentions.users.first();
        let AttackerData = await profileSchema.findOne({ userID: target.id });

        try {
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
                            isDueling: true,
                        },
                    }
                );

                const Attacker = await profileSchema.findOneAndUpdate(
                    {
                        userID: target.id,
                    },
                    {
                        $set: {
                            isDueling: true,
                        },
                    }
                );

                try {
                    let fightComm = client.commands.get("fight");
                    message.channel.send(`Начинается бой между ` + "<@" + AttackedData.userID + ">" + ` и ` + "<@" + AttackerData.userID + ">" + `.`);
                    fightComm.execute(client, message, args, Discord, AttackerData, AttackedData);
                } catch (err) {
                    console.log(err)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
}