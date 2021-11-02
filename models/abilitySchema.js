const mongoose = require("mongoose")

const abilitySchema = new mongoose.Schema({
    level: Number,
    skillName: String,
    cd: Number,
    baseStat: String,
    secondaryStat: String,
    dmgAmount: Number,
    healAmount: Number,
})

module.exports = mongoose.model('AbilityModels', abilitySchema)