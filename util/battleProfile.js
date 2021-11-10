const abilitySchema = require("../models/abilitySchema");
const profileSchema = require("../models/profileSchema");


class AttackProfile {

    constructor() { }

    async attack(str, dex, damagerid, damagedid, client, message) {
        console.log(str, dex, damagerid, damagedid);

        var damageruser = client.users.cache.get(damagerid);
        var damageduser = client.users.cache.get(damagedid);

        var damagedProfile = await profileSchema.findOne({ userID: damagedid });

        var armor = damagedProfile.armor;

        var isBlocked = Math.floor(Math.random() * 100) + 1
        if (armor >= isBlocked) {
            message.channel.send(`${damageduser.username} блокирует весь полученный урон!`)

            return damagedProfile;
        }

        // console.log(str);

        var attackDamage = Math.floor(Math.random() * str) + str;

        var critChance = Math.floor(dex / 10) + 15;
        var isCrit = Math.floor(Math.random() * 100) + 1;
        if (critChance >= isCrit) {
            attackDamage *= 2;
            message.channel.send(`${damageruser.username} совершает критический удар!`);
        }

        // console.log(damagedProfile.hp, attackDamage);

        return await profileSchema.findOneAndUpdate(
            {
                userID: damagedid,
            },
            {
                $set: {
                    hp: Math.max(0, damagedProfile.hp - attackDamage),
                },
            }
        ).then(attackedResponse => {
            message.channel.send(`${damageduser.username} получает ${attackDamage} урона.`);

            return profileSchema.findOne({userID: damagedid}).then(response => {
                return response;
            })
        })
    }
}



// class AttackProfile {

//     constructor() { }

//     async attack(str, dex, user1, user2, client, message) {
//         var attacker = client.users.cache.get(user1.userID).username;
//         var attacked = client.users.cache.get(user2.userID).username;;

//         var userid = user2.userID;

        // var isBlocked = Math.floor(Math.random() * 100) + 1
        // if (user2.armor >= isBlocked) {
        //     message.channel.send(`${attacked.username} блокирует весь полученный урон!`)

//         //     var attackedResponse = await profileSchema.findOne({ userID: user2.userID });

//         //     return attackedResponse;
//         // }

//         var attackDamage = Math.floor(Math.random() * str) + str;

//         var critChance = Math.floor(dex / 10) + 15;
//         var isCrit = Math.floor(Math.random() * 100) + 1;
//         if (critChance >= isCrit) {
//             attackDamage *= 2;
//             message.channel.send(`${attacker} совершает критический удар!`);
//         }

//         var attackedResponse = await profileSchema.findOneAndUpdate(
//             {
//                 userID: userid,
//             },
//             {
//                 $inc: {
//                     hp: -attackDamage,
//                 },
//             }
//         );

//         message.channel.send(`${attacked} получает ${attackDamage} урона.`)

//         return attackedResponse;
//     }
// }

module.exports = AttackProfile;