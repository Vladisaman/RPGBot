const abilitySchema = require("../models/abilitySchema");
const profileSchema = require("../models/profileSchema")

module.exports = {
    name: "fight",
    description: "battle turn",
    cooldown: 0,
    async execute(client, message, args, Discord, AttackerData, AttackedData) {

        var attackerResponse = AttackerData;
        var attackedResponse = AttackedData;

        var attackerSk1 = attackerResponse.firstSkill;
        var attackerSk1cd;
        if(attackerSk1 != null) {
            attackerSk1cd = abilitySchema.findOne({skillName: attackerSk1}).cd;
        }

        var attackerSk2 = attackerResponse.secondSkill;
        var attackerSk2cd;
        if(attackerSk2 != null) {
            attackerSk2cd = abilitySchema.findOne({skillName: attackerSk2}).cd;
        }

        var attackedSk1 = attackedResponse.firstSkill;
        var attackedSk1cd;
        if(attackedSk1 != null) {
            attackedSk1cd = abilitySchema.findOne({skillName: attackedSk1}).cd;
        }

        var attackedSk2 = attackedResponse.secondSkill;
        var attackedSk2cd;
        if(attackedSk2 != null) {
            attackedSk2cd = abilitySchema.findOne({skillName: attackedSk2}).cd;
        }



        while (attackerResponse.hp > 0 || attackedResponse.hp > 0) {

            if (attackerResponse.hp <= 0 || attackedResponse <= 0) {
                break;
            }

            var attackedDamage = Math.floor(Math.random() * attackedResponse.str) + attackedResponse.str;

            var critChance = Math.floor(attackedResponse.dex / 10) + 15;
            var isCrit = Math.floor(Math.random() * 100) + 1;
            if(critChance >= isCrit){
                attackedDamage *= 2;
                message.channel.send("<@" + AttackedData.userID + ">" + ` совершает критический удар!`)
            }


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

            if (attackerResponse.hp <= 0 || attackedResponse <= 0) {
                break;
            }

            message.channel.send("<@" + AttackedData.userID + ">" + ` наносит удар по ` + "<@" + AttackerData.userID + ">" + ` и наносит ${attackedDamage} урона`);

            if(attackedSk1 != null && attackedSk1cd === abilitySchema.findOne({skillName: attackerSk1}).cd) {
                attackedSk1cd = 0;
                abilityDamage = abilitySchema.findOne({skillName: attackerSk1}).dmgAmount;
                abilityHeal = abilitySchema.findOne({skillName: attackerSk1}).healAmount;

                if(abilitySchema.findOne({skillName: attackedSk1}).dmgAmount > 0) {
                    attackerResponse = await profileSchema.findOneAndUpdate(
                        {
                            userID: AttackerData.userID,
                        },
                        {
                            $inc: {
                                hp: -abilityDamage,
                            },
                        }
                    );
                    message.channel.send("<@" + AttackedData.userID + ">" + ` использует ${attackedSk1} и наносит ${abilityDamage} урона.` )
                } else if (abilitySchema.findOne({skillName: attackedSk1}).healAmount > 0){
                    attackedResponse = await profileSchema.findOneAndUpdate(
                        {
                            userID: AttackedData.userID,
                        },
                        {
                            $inc: {
                                hp: +abilityHeal,
                            },
                        }
                    );
                    message.channel.send("<@" + AttackedData.userID + ">" + ` использует ${attackedSk1} и восстанавливает ${abilityHeal} урона.` )
                }
            }

            if(attackedSk2 != null && attackedSk2cd === abilitySchema.findOne({skillName: attackerSk2}).cd) {
                attackedSk2cd = 0;
                abilityDamage = abilitySchema.findOne({skillName: attackerSk2}).dmgAmount;
                abilityHeal = abilitySchema.findOne({skillName: attackerSk2}).healAmount;

                if(abilitySchema.findOne({skillName: attackedSk2}).dmgAmount > 0) {
                    attackerResponse = await profileSchema.findOneAndUpdate(
                        {
                            userID: AttackerData.userID,
                        },
                        {
                            $inc: {
                                hp: -abilityDamage,
                            },
                        }
                    );
                    message.channel.send("<@" + AttackedData.userID + ">" + ` использует ${attackedSk2} и наносит ${abilityDamage} урона.` )
                } else if (abilitySchema.findOne({skillName: attackedSk2}).healAmount > 0){
                    attackedResponse = await profileSchema.findOneAndUpdate(
                        {
                            userID: AttackedData.userID,
                        },
                        {
                            $inc: {
                                hp: +abilityHeal,
                            },
                        }
                    );
                    message.channel.send("<@" + AttackedData.userID + ">" + ` использует ${attackedSk2} и восстанавливает ${abilityHeal} урона.` )
                }
            }

            attackedSk1cd++;
            attackedSk2cd++;


            var attackerDamage = Math.floor(Math.random() * attackerResponse.str) + attackerResponse.str;

            var critChance2 = Math.floor(attackerResponse.dex / 10) + 15;
            var isCrit2 = Math.floor(Math.random() * 100) + 1;
            if(critChance2 >= isCrit2){
                attackerDamage *= 2;
                message.channel.send("<@" + AttackerData.userID + ">" + ` совершает критический удар!`)
            }

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