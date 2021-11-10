var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const profileSchema = new Schema({
    userID: String,
    username: String,
    level: Number,
    gold: Number, //кошёлек
    hp: Number, // хп лол
    maxHp: Number,
    armor: Number, //броня в процентах, броня 1 = 1% шанса избежать урона
    str: Number, // Сила атаки, навыки силы
    dex: Number, // навыки ловкости, шанс крита. 1% крита за каждые 10 очков ловкости 
    vit: Number, // количество хп
    int: Number, // навыки инты, мб чо еще
    firstSkill: String,
    secondSkill: String, 
    buff: String,
    debuff: String,
    isFighting: Boolean,
    duelID: String,
})

module.exports = mongoose.model('ProfileModels', profileSchema);