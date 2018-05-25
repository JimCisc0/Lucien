const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on('ready', async () => {
  console.log(`${bot.user.username} is online`);
  bot.user.setActivity("surveiller Lucie");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;


  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  // !hello

  // if(cmd === `${prefix}hello`){
  //   return message.channel.send("Hello!")
  // }

  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL; 
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Nom du serveur", message.guild.name)
    .addField("Créé le", message.guild.createdAt)
    .addField("Tu as rejoins le", message.member.joinedAt)
    .addField("Nombre total de membres:", message.guild.memberCount);

    return message.channel.send(serverembed);
  }

  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#1b3dc4")
    .setThumbnail(bicon)
    .setAuthor("Lucien, le diable qui vous observe !")
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);



    return message.channel.send(botembed);

  }


});

bot.login(tokenfile.token);
