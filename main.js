const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const dbnanaroles = require("./db/dbnanaroles")
const dbadjetivos = require("./db/dbadjetivos")

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
//Função dos Adjetivos
client.on('message', msg => {
  if (msg.content.includes('$adj')) {
    let item = dbadjetivos.adjetivos.flat()[Math.floor(Math.random() * dbadjetivos.adjetivos.flat().length)];
    let x = msg.content.replace("$adj", item);
    msg.channel.send("**" + msg.author.username + "** disse: " + x);
  }
});
//Função da nana hoje
client.on('message', msg => {
  if (msg.content.startsWith('$nanahj')) {
    var item = dbnanaroles.nanaroles[Math.floor(Math.random() * dbnanaroles.nanaroles.length)];
    msg.channel.send("Hoje a Nana está... " + item);
  }
});


//Função de avatar
client.on('message', async msg => {
  if (!msg.content.startsWith('$avatar') || msg.content.split(' ').length > 2) return
  const mensagens = msg.content.split(' ')
  const ping = msg.mentions.users.first()

  let user;
  if(ping) user = ping
  else if(mensagens.length === 2) {
    try {
      user = await client.users.fetch(mensagens[1])
    } catch {
      return  msg.channel.send('Id não existe');
    }
  } 
  else user = msg.author

  const embed = new Discord.MessageEmbed()
      .setColor(0x333333)
      .setAuthor(user.username)
      .setImage(user.avatarURL({size: 256}));
        
  return msg.channel.send(embed);
});


client.login(config.BOT_TOKEN);