const profileSchema = require("../models/profileSchema")

module.exports = {
    name: 'старт',
    description: "",
    async execute(client, message, args, Discord) {

        let profileData = await profileSchema.findOne({ userID: message.author.id })
        if (profileData === null) {
            let profile = await profileSchema.create({
                userID: message.author.id,
                username: message.author.username,
                level: 1,
                gold: 50,
                hp: 25,
                maxHp: 25,
                armor: 0,
                str: 5,
                dex: 5,
                vit: 5,
                int: 5,
                firstSkill: null,
                secondSkill: null,
                isFighting: false,
                isDueling: false,
                duelID: "",
            });
            profile.save();
            
            message.reply(`На вашем аккаунте был успешно зарегистрирован профиль.`)
        } else {
            message.reply(`На вашем аккаунте уже зарегистрирован профиль.`)
        }
    }
}