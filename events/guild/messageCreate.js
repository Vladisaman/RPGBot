const profileSchema = require("../../models/profileSchema")

const cooldowns = new Map();

module.exports = async (Discord, client, message) => {
    const prefix = 'r!'
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let profileData
    try {
        profileData = await profileSchema.findOne({ userID: message.author.id });
    } catch (err) {
        console.log(err)
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);





    if (command) {
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const current_time = Date.now();
        const time_stamps = cooldowns.get(command.name);

        const cooldown_amount = (command.cooldown) * 1000;

        if (time_stamps.has(message.author.id)) {
            const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

            if (current_time < expiration_time) {
                const time_left = (expiration_time - current_time) / 1000;

                return message.reply(`Пожалуйста подождите еще ${time_left.toFixed(1)} секунд перед использованием данной команды.`)
            }
        }

        time_stamps.set(message.author.id, current_time);
        setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

        command.execute(client, message, args, Discord, profileData)

    } else {
        message.reply(`Произошла ошибка во время использования команды. Возможно вы неправильно написали её название?`)
    }
}