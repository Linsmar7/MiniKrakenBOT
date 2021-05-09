const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const dbnanaroles = require("./db/dbnanaroles")
const dbadjetivos = require("./db/dbadjetivos")

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.includes('$adj')) {
    let indiceX = Math.floor(Math.random() * dbadjetivos.adjetivos.length);
    let item = dbadjetivos.adjetivos[indiceX][Math.floor(Math.random() * dbadjetivos.adjetivos[indiceX].length)];
    let x = msg.content.replace("$adj", item);
    msg.channel.send(x);
  }
});

client.on('message', msg => {
  if (msg.content.includes('$nanahj')) {
    var item = dbnanaroles.nanaroles[Math.floor(Math.random() * dbnanaroles.nanaroles.length)];
    msg.channel.send("Hoje a Nana está... " + item);
  }
});
client.login(config.BOT_TOKEN);