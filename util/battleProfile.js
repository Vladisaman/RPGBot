const abilitySchema = require("../models/abilitySchema");
const profileSchema = require("../models/profileSchema");


let abcd1;
let abcd2;

class AttackProfile {

    constructor() { }

    async attack(str, dex, user1, user2, client, message) {
        var attacker = client.users.cache.get(user1.userID)
        var attacked = client.users.cache.get(user2.userID)

        var isBlocked = Math.floor(Math.random() * 100) + 1
        if (user2.armor >= isBlocked) {
            message.channel.send(`${attacked.username} блокирует весь полученный урон!`)

            var attackedResponse = await profileSchema.findOne({userID: user2.userID});

            return attackedResponse;
        } else {
            var attackDamage = Math.floor(Math.random() * str) + str;

            var critChance = Math.floor(dex / 10) + 15;
            var isCrit = Math.floor(Math.random() * 100) + 1;
            if (critChance >= isCrit) {
                attackDamage *= 2;
                message.channel.send(`${attacker.username} совершает критический удар!`);
            }

            var attackedResponse = await profileSchema.findOneAndUpdate(
                {
                    userID: user2.userID,
                },
                {
                    $inc: {
                        hp: -attackDamage,
                    },
                }
            );

            message.channel.send(`${attacked.username} получает ${attackDamage} урона.`)

            return attackedResponse;
        }
    }


}

module.exports = AttackProfile;