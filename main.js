const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const dbadjetivos = require("./db/dbadjetivos")

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

var prefix = '$';
const comandos = [prefix + 'adj', prefix + 'prefix', prefix + 'avatar']

client.on('message', msg => {
  if (msg.author.bot) return;
  //Função dos Adjetivos
  if (msg.content.includes(prefix + 'adj')) {
    let item = dbadjetivos.adjetivos.flat()[Math.floor(Math.random() * dbadjetivos.adjetivos.flat().length)];
    let x = msg.content.replace("$adj", item);
    msg.channel.send("**" + msg.author.username + "** disse: " + x);
  }
  //Função trocar prefix
  if (msg.content.startsWith(prefix + 'prefix')) {
    var split = msg.content.split(' ');
    if (split.length > 2 || split[0].length > 7 || !split[1]) return;
    let novoPrefix = split[1].length == 1? split[1] : null;
    if (novoPrefix) {
      prefix = novoPrefix;
      return msg.channel.send("O novo prefix é **" + prefix + "**");
    }
  }
  //Função help
  if (msg.content === prefix + 'help') {
    var listaComandos = 'Os comandos são: \n';
    comandos.map((e, i) => {
      listaComandos += i+1 + '. ' + e + '\n'
    })
    return msg.channel.send(
      listaComandos
    )
  }
});



//Função de avatar
client.on('message', async msg => {
  if (!msg.content.startsWith(prefix + 'avatar') || msg.content.split(' ').length > 2 || msg.author.bot) return
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