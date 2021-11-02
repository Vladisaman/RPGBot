const abilities = require("../../skills/abilities");

module.exports = () => {
    console.log('The bot is online.');

    abilities.execute();
}