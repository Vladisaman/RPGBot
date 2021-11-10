const abilitySchema = require("../models/abilitySchema");
const profileSchema = require("../models/profileSchema");
const AttackProfile = require("../util/battleProfile");


module.exports = {
    name: "fight",
    description: "battle script",
    async execute(client, message, args, Discord, attacker, attacked) {

        message.channel.send(`Начинается бой между ` + "<@" + attacker + ">" + ` и ` + "<@" + attacked + ">" + `.`);

        let attackerResponse = await profileSchema.findOne({ userID: attacker });
        let attackedResponse = await profileSchema.findOne({ userID: attacked });

        // message.channel.send(`${attackerResponse}  ${attackedResponse}`);

        let attackProfile = new AttackProfile();
        // let abilityProfile = new AbilityProfile();

        console.log(attackerResponse, attackedResponse);

        while (attackerResponse.hp > 0 && attackedResponse.hp > 0) {

            console.log(attackerResponse.hp, attackedResponse.hp, attackedResponse.str, attackerResponse.str);

            attackerResponse = await attackProfile.attack(attackedResponse.str, attackedResponse.dex, attackedResponse.userID, attackerResponse.userID, client, message);

            if (attackerResponse.hp < 0) {
                break;
            }

            attackedResponse = await attackProfile.attack(attackerResponse.str, attackerResponse.dex, attackerResponse.userID, attackedResponse.userID, client, message);
            
        }

        if (attackerResponse.hp <= 0) {
            message.channel.send("<@" + attackerResponse.userID + ">" + ` проиграл бой.`);
        }

        if (attackedResponse.hp <= 0) {
            message.channel.send("<@" + attackedResponse.userID + ">" + ` проиграл бой.`);
        }

        const response1 = await profileSchema.findOneAndUpdate(
            {
                userID: attacker,
            },
            {
                $set: {
                    hp: attackerResponse.maxHp,
                    isFighting: false,
                    duelID: null,
                },
            }
        );

        const response2 = await profileSchema.findOneAndUpdate(
            {
                userID: attacked,
            },
            {
                $set: {
                    hp: attackedResponse.maxHp,
                    isFighting: false,
                    duelID: null,
                },
            }
        );
    },
}