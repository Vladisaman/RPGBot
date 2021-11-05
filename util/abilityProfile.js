const abilitySchema = require("../models/abilitySchema");
const profileSchema = require("../models/profileSchema");

class AbilityProfile {
    constructor(){}

    async castAbility(abilityName, target, caster, client, message) {
        let ability = await abilitySchema.findOne({ skillName: abilityName })
        let abcd1;

        if (ability != null) {


            if (abcd1 === null) {
                abcd1 = ability.cd
            };

            if (abcd1 === ability.cd) {
                if (ability.type === "attack") {
                    var damage;

                    if (ability.baseStat === "str") {
                        damage = ability.dmgAmount + (caster.str * 2);
                    } else if (ability.baseStat === "dex") {
                        damage = ability.dmgAmount + (caster.dex * 2);
                    } else if (ability.baseStat === "int") {
                        damage = ability.dmgAmount + (caster.int * 2);
                    }

                    targetResponse = await profileSchema.findOneAndUpdate(
                        {
                            userID: target.userID,
                        },
                        {
                            $inc: {
                                hp: -damage,
                            },
                        }
                    );

                    message.channel.send("<@" + caster.userID + ">"  ` использует ${abilityName} и наносит ${damage} урона`);

                    return attackedResponse;
                }
                abcd1 = 0;
            } else {
                abcd1++;
            }
        }
    }
}

module.exports = AbilityProfile;
