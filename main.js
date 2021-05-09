const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const db = require("./db")

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.includes('$adj')) {
    let x = msg.content.replace("$adj", "lindo");
    msg.channel.send(x);
  }
});

client.on('message', msg => {
  if (msg.content.includes('$nanahj')) {
    var item = db.nanaroles[Math.floor(Math.random() * db.nanaroles.length)];
    msg.channel.send("Hoje a Nana está... " + item);
  }
});
console.log(db.nanaroles);
client.login(config.BOT_TOKEN);