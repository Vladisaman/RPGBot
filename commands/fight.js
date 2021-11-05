const abilitySchema = require("../models/abilitySchema");
const profileSchema = require("../models/profileSchema");
const AttackProfile = require("../util/battleProfile");
const AbilityProfile = require("../util/abilityProfile");


module.exports = {
    name: "fight",
    description: "battle turn",
    cooldown: 0,
    async execute(client, message, args, Discord, AttackerData, AttackedData) {
        var i = 1

        let attackerResponse = AttackerData;
        let attackedResponse = AttackedData;

        let attackProfile = new AttackProfile();

        const attacked = client.users.cache.get(AttackedData.userID).username;
        const attacker = client.users.cache.get(AttackerData.userID).username;

        while (attackerResponse.hp > 0 && attackedResponse.hp > 0) {

            attackerResponse = attackProfile.attack(attackedResponse.str, attackedResponse.dex, attackedResponse, attackerResponse, client, message);

            // attackDamage = Math.floor(Math.random() * attackedResponse.str) + attackedResponse.str;

            // critChance = Math.floor(attackedResponse.dex / 10) + 15;
            // isCrit = Math.floor(Math.random() * 100) + 1;
            // if (critChance >= isCrit) {
            //     attackDamage *= 2;
            //     message.channel.send(`${attacked} совершает критический удар!`)
            // }

            // attackerResponse = await profileSchema.findOneAndUpdate(
            //     {
            //         userID: AttackerData.userID,
            //     },
            //     {
            //         $inc: {
            //             hp: -attackDamage,
            //         },
            //     }
            // );

            // message.channel.send(`${attacked} наносит удар по ${attacker} и наносит ${attackDamage} урона.`);

            if (attackerResponse.hp < 0) break;

            attackedResponse = attackProfile.attack(attackerResponse.str, attackerResponse.dex, attackerResponse, attackedResponse, client, message);

            // attackDamage = Math.floor(Math.random() * attackerResponse.str) + attackerResponse.str;

            // critChance = Math.floor(attackerResponse.dex / 10) + 15;
            // isCrit = Math.floor(Math.random() * 100) + 1;
            // if (critChance >= isCrit) {
            //     attackDamage *= 2;
            //     message.channel.send(`${attacker} совершает критический удар!`)
            // }

            // attackedResponse = await profileSchema.findOneAndUpdate(
            //     {
            //         userID: AttackedData.userID,
            //     },
            //     {
            //         $inc: {
            //             hp: -attackDamage,
            //         },
            //     }
            // );

            // message.channel.send(`${attacker} наносит удар по ${attacked} и наносит ${attackDamage} урона.`);
        }

        if (attackerResponse.hp <= 0) {
            message.channel.send("<@" + attackerResponse.userID + ">" + ` проиграл бой.`);
        }

        if (attackedResponse.hp <= 0) {
            message.channel.send("<@" + attackedResponse.userID + ">" + ` проиграл бой.`);
        }

        const response1 = await profileSchema.findOneAndUpdate(
            {
                userID: AttackedData.userID,
            },
            {
                $set: {
                    hp: AttackedData.maxHp,
                },
            }
        );

        const response2 = await profileSchema.findOneAndUpdate(
            {
                userID: AttackerData.userID,
            },
            {
                $set: {
                    hp: AttackerData.maxHp,
                },
            }
        );
    },
}