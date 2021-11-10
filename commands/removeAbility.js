const abilitySchema = require("../models/abilitySchema");
const profileSchema = require("../models/profileSchema")

module.exports = {
    name: 'убрать',
    description: "",
    async execute(client, message, args, Discord) {
        let profileData = await profileSchema.findOne({userID: message.author.id})

        if(profileData === null){
            message.reply(`У вас не создан профиль. Вы можете исправить это, написав r!старт`);
        } else {
            if(args[0] === "1"){
                var name = profileData.firstSkill;

                const response1 = await profileSchema.findOneAndUpdate(
                    {
                        userID: message.author.id,
                    },
                    {
                        $set: {
                            firstSkill: null,
                        },
                    }
                );

                message.reply(`Навык ${name} был успешно убран из активных.`)
            } else if(args[0] === "2"){
                var name = profileData.secondSkill;

                const response1 = await profileSchema.findOneAndUpdate(
                    {
                        userID: message.author.id,
                    },
                    {
                        $set: {
                            secondSkill: null,
                        },
                    }
                );

                message.reply(`Навык ${name} был успешно убран из активных.`)
            } else {
                message.reply(`Для того, чтобы убрать навык, вы должны написать команду r!убрать (цифра слота навыка).`)
            }
        }
    }
}