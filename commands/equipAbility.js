const abilitySchema = require("../models/abilitySchema");
const profileSchema = require("../models/profileSchema")

module.exports = {
    name: 'надеть',
    description: "",
    async execute(client, message, args, Discord) {
        let profileData = await profileSchema.findOne({ userID: message.author.id })
        ability = await abilitySchema.findOne({ skillName: args[0] });

        if (profileData === null) {
            message.reply(`У вас не создан профиль. Вы можете исправить это, написав r!старт`);
        } else {
            if (!args[0] || !ability) {
                message.reply(`Данный навык не найден.`);
            } else if (ability) {
                if (!profileData.firstSkill) {
                    const response1 = await profileSchema.findOneAndUpdate(
                        {
                            userID: message.author.id,
                        },
                        {
                            $set: {
                                firstSkill: ability.skillName,
                            },
                        }
                    );

                    message.reply(`Умение ${ability.skillName} было успешно надето в слот 1.`)
                } else if (profileData.firstSkill && profileData.firstSkill == args[0]) {
                    message.reply(`Этот навык уже находится в используемых.`)
                } else if (!profileData.secondSkill && profileData.firstSkill != args[0]) {
                    const response2 = await profileSchema.findOneAndUpdate(
                        {
                            userID: message.author.id,
                        },
                        {
                            $set: {
                                secondSkill: ability.skillName,
                            },
                        }
                    );

                    message.reply(`Умение ${ability.skillName} было успешно надето в слот 2`)
                } else if (profileData.secondSkill && profileData.secondSkill == args[0]) {
                    message.reply(`Этот навык уже находится в используемых.`)
                }
            }
        }
    }
}