var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const abilitySchema = require('./abilitySchema');


const profileSchema = new Schema({
    userID: String,
    level: Number,
    gold: Number, // бомж или не бомж, вот в чём вопрос?
    hp: Number, // хп лол
    maxHp: Number,
    armor: Number, //броня в процентах, броня 1 = 1% шанса избежать урона
    str: Number, // Сила атаки, навыки силы
    dex: Number, // навыки ловкости, шанс крита. 1% крита за каждые 20 очков ловкости 
    vit: Number, // количество хп
    int: Number, // навыки инты, мб чо еще
    firstSkill: String,
    secondSkill: String, 
    isFighting: Boolean,
    isDueling: Boolean,
    duelID: String,
})

module.exports = mongoose.model('ProfileModels', profileSchema);