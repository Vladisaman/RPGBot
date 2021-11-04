const abilitySchema = require("../models/abilitySchema");

module.exports = {
    async execute(client, message, args, Discord) {

        let SP = await abilitySchema.findOne({ skillName: "Сильный_удар" })
        if (SP === null) {
            let StrongPunch = await abilitySchema.create({
                level: 1,
                skillName: "Сильный_удар",
                type: "attack",
                cd: 4,
                baseStat: "str",
                dmgAmount: 200,
                healAmount: 0,
                buff: "",
                debuff: "",
            });
            StrongPunch.save();
        }

        let SH = await abilitySchema.findOne({ skillName: "Восстановление" })
        if (SH === null) {
            let SelfHeal = await abilitySchema.create({
                level: 1,
                skillName: "Восстановление",
                type: "heal",
                cd: 5,
                baseStat: "int",
                dmgAmount: 0,
                healAmount: 5,
                buff: "",
                debuff: "",
            });
            SelfHeal.save();
        }

        // let LA = await abilitySchema.findOne({ skillName: "Живая_броня" });
        // if (LA === null) {
        //     let LivingArmor = await abilitySchema.create({
        //         level: 1,
        //         skillName: "Живая_броня",
        //         cd: 5,
        //         baseStat: "vig",
        //         dmgAmount: 0,
        //         healAmount: 0,
        //         buff: "living_armor",
        //         debuff: ","
        //     })
        //     LivingArmor.save();
        // }
    }
}