const abilitySchema = require("../models/abilitySchema");

module.exports = {
    async execute(client, message, args, Discord) {

        let SP = await abilitySchema.findOne({ skillName: "Сильный_удар" })
        if (SP === null) {
            let StrongPunch = await abilitySchema.create({
                level: 1,
                skillName: "Сильный_удар",
                cd: 3,
                baseStat: "str",
                dmgAmount: 5,
                healAmount: 0,
            });
            StrongPunch.save();
        }

        let SH = await abilitySchema.findOne({ skillName: "Восстановление" })
        if (SH === null) {
            let SelfHeal = await abilitySchema.create({
                level: 1,
                skillName: "Восстановление",
                cd: 4,
                baseStat: "int",
                dmgAmount: 0,
                healAmount: 4,
            });
            SelfHeal.save();
        }
    }
}