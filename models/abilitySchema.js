const mongoose = require("mongoose")

const abilitySchema = new mongoose.Schema({
    level: Number,
    skillName: String,
    type: String,
    cd: Number,
    baseStat: String,
    secondaryStat: String,
    dmgAmount: Number,
    healAmount: Number,
    buff: String,
    debuff: String,
})

module.exports = mongoose.model('AbilityModels', abilitySchema)