const buffSchema = require("../models/buffSchema")

module.exports = {
    async execute(client, message, args, Discord) {
        let LAB = await buffSchema.findOne({ buffName: "living_armor" });
        if (LAB === null) {
            let LivingArmorBuff = await buffSchema.create({
                buffName: "living_armor",
                buffHp: 0,
                buffArmor: 5,
                buffStr: 0,
                buffDex: 0,
                buffVit: 0,
                buffInt: 0,
            })
            LivingArmorBuff.save();
        }
    }
}