const Discord = require('discord.js');
require('dotenv').config();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const mongoose = require('mongoose');

const fs = require('fs');

client.on('ready', async () => {
    await mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
    }).then(() => {
        console.log('Connected to the database.');
    }).catch((err) => {
        console.log(err);
    })
})

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})


const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// client.on('messageCreate', message => {
//     if (!message.content.startsWith(prefix) || message.author.bot) return;

//     const args = message.content.slice(prefix.length).split(' ');
//     const command = args.shift().toLowerCase();

//     if(command === 'ping'){
//         client.commands.get('ping').execute(message, args)
//     }

//     if(command === 'start'){
//         client.commands.get('start').execute(message, args)
//     }



// });






















client.login(process.env.DISCORD_TOKEN);