const abilitySchema = require("../models/abilitySchema");
const profileSchema = require("../models/profileSchema")

module.exports = {
    name: "fight",
    description: "battle turn",
    cooldown: 0,
    async execute(client, message, args, Discord, AttackerData, AttackedData) {

        var attackerResponse = AttackerData;
        var attackedResponse = AttackedData;

        while (attackerResponse.hp > 0 || attackedResponse.hp > 0) {

            if (attackerResponse.hp <= 0 || attackedResponse <= 0) {
                break;
            }

            var attackedDamage = Math.floor(Math.random() * attackedResponse.str) + attackedResponse.str;

            attackerResponse = await profileSchema.findOneAndUpdate(
                {
                    userID: AttackerData.userID,
                },
                {
                    $inc: {
                        hp: -attackedDamage,
                    },
                }
            );

            attackerResponse.findOneAndUpdate(
                {
                    userID: AttackerData.userID,
                },
                {
                    $inc: {
                        hp: - (skill.dmgAmount + statDamage),
                    },
                })


            if (attackerResponse.hp <= 0 || attackedResponse <= 0) {
                break;
            }

            message.channel.send("<@" + AttackedData.userID + ">" + ` наносит удар по ` + "<@" + AttackerData.userID + ">" + ` и наносит ${attackedDamage} урона`);



            var attackerDamage = Math.floor(Math.random() * attackerResponse.str) + attackerResponse.str;

            attackedResponse = await profileSchema.findOneAndUpdate(
                {
                    userID: AttackedData.userID,
                },
                {
                    $inc: {
                        hp: -attackerDamage,
                    },
                }
            );

            if (attackerResponse.hp <= 0 || attackedResponse <= 0) {
                break;
            }

            message.channel.send("<@" + AttackerData.userID + ">" + ` наносит удар по ` + "<@" + AttackedData.userID + ">" + ` и наносит ${attackerDamage} урона`);

        }

        if (attackerResponse.hp <= 0) {
            message.channel.send("<@" + AttackerData.userID + ">" + ` проиграл бой.`);
        }

        if (attackedResponse.hp <= 0) {
            message.channel.send("<@" + AttackedData.userID + ">" + ` проиграл бой.`);
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
    }
}

    // try {
    //     let isAttackersTurn1 = isAttackersTurn;
    //     if (isAttackersTurn === false) {
    //         const collector = new Discord.MessageCollector(message.channel, m => m.author.id === AttackedData.userID);

    //         await collector.on('collect', message => {
    //             message.channel.send(`тест1`)

    //         });
    //     } else {
    //         const collector = new Discord.MessageCollector(message.channel, m => m.author.id === AttackerData.userID);

    //         await collector.on('collect', message => {
    //             message.channel.send(`тест2`)
    //         });
    //     }

    //     isAttackersTurn1 = -isAttackersTurn1;

    //     let turnComm = client.commands.get("turn");
    //     turnComm.execute(client, message, args, Discord, AttackerData, AttackedData, isAttackersTurn1)
    // } catch(err) {
    // console.log(err);