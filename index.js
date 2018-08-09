const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
var twitchLive =require("./node_modules/TwitchLive");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const Wban = require("./node_modules/banWords")

bot.on('ready', async () => {
  console.log(`${bot.user.username} is online`);
  bot.user.setActivity("surveiller Lucie", "WATCHING");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


//            KICK


  if(cmd === `${prefix}kick`){


    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'as pas les droits boloss");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Cette personne ne peut être kick");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser}`)
    .addField("Kicked By", `<@${message.author.id}>`)
    .addField("Kicked In", message.channel)
    .addField("Tiime", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "log");
    if(!kickChannel) return message.channel.send("Je ne peux pas trouver le chan log");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

  //        BAN
  //				TEST

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Tu n'as pas les droits boloss");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Cette personne ne peut être kick");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} `)
    .addField("Banned By", `<@${message.author.id}> `)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "log");
    if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


    return;
  }

// SERVER INFO

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


// TWITCH STATUT

if(cmd === `${prefix}stream`){

  twitchLive(message.channel);

  
}
// WORDS BAN

if(cmd === `${prefix}banword`){

 Wban.add(args,message.channel);

}


// BOT INFO


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
