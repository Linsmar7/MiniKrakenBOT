const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.includes('$adj')) {
    let x = msg.content.replace("$adj", "lindo");
    msg.channel.send(x);
  }
});

client.login(config.BOT_TOKEN);