var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const buffSchema = new Schema({
    buffName: String,
    buffHp: Number,
    buffArmor: Number,
    buffStr: Number,
    buffDex: Number,
    buffVit: Number,
    buffInt: Number,
})

module.exports = mongoose.model('buffModels', buffSchema);