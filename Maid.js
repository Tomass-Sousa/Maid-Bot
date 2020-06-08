"use strict";

//Start
const discord = require('discord.js');
const client = new discord.Client();

//Le Point Help
const help = new discord.MessageEmbed()
    .setColor('#ffdfdf')
    .setTitle('Aide')
    .setAuthor('Coffee\'s Staff', 'https://cdn.discordapp.com/attachments/705499848174206987/715573330001920020/AbkwNs1t_400x400.jpg')
    .setDescription('Retrouve la liste des commandes ici')
    .addField("help", "Affiche cette page")
    .addField("avatar", "Affiche l'avatar du membre")
    .addField("kick", "Permet d'expulser un membre")
    .addField("ban", "Permet de bannir un membre")
    .addField("ping ", "Ping le bot")
    .setImage('https://cdn.discordapp.com/attachments/705499848174206987/716251926710452234/OK6W_koKDTOqqqLDbIoPApKuI1qnjWj8DtVkFCcj45w.gif')
    .setFooter('Le Staff vous remercie pour votre activité !', 'https://cdn.discordapp.com/attachments/705499848174206987/715573330001920020/AbkwNs1t_400x400.jpg');
    

//log
client.on('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}!`);
      client.user.setActivity("le café", {
      type: "WATCHING",
    });
  });
var prefix = '.'

//bienvenue
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === '〢🌙général');
    if (!channel) return;
    const welcome = new discord.MessageEmbed()
       .setTitle(`Bienvenue dans notre café!`)
       .setColor(`#ffdfdf`)
       .setDescription(`Un nouveau client est arrivé: ${member}`)
       .addField("Avant tout: ", "︶︶︶︶︶︶︶︶︶︶︶︶ \n • Lire le <#711111570163499018> \n • Prendre ses <#716566179967139963> \n • Et regarder le <#715954917327765504> \n ︶︶︶︶︶︶︶︶︶︶︶︶")
       .setFooter("Pour tout soucis, contactez un pillier.")
       .setImage('https://cdn.discordapp.com/attachments/705499848174206987/715828030626594846/c5c9476988f466622a97bafe5866ac93cc3ea0d2_hq.gif'); 
    channel.send(welcome);
});

//ping
 client.on('message', message => {
     if (message.content === prefix + 'ping' ){
          message.reply('Pong')
     }
});

//kick
client.on('message', message => {
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);

    if(message.content.startsWith(".kick")){
    if(!message.member.hasPermission(["KICK_MEMBERS"],  ["BAN_MEMBERS"],  ["ADMINISTRATOR"])) return message.channel.send("Tu n'as pas la permission de faire cette commande.")

    let kickMember = message.mentions.members.first() //|| message.guild.members.get(args[0])
    if(!kickMember) return message.channel.send("Tu dois mentionner quelqu'un❌")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "Aucune raison donnée."

    if(!message.guild.me.hasPermission(["KICK_MEMBERS"], ["ADMINISTRATOR"])) return message.channel.send("Je n'ai pas la permission de faire ça.")
    
    const kick = new discord.MessageEmbed()
        .setColor('#ffdfdf') 
        .setTitle("• ⊰ Hiku\'s Coffee ⊱ •")
        .setDescription("Membre correctement expulsé ✅")
        .addField(`Le membre a bien été kick pour la raison: ${reason}`, "A plus dans le bus")
        .setTimestamp()
        .setFooter("Non mais après si il fait le con. . .")
        message.channel.send(kick)

    const msgKick = new discord.MessageEmbed()
        .setColor('#ffdfdf') 
        .setTitle(`Tu as été kick du serveur ${message.guild.name}!`)
        .setDescription("La police des frontières t'as expulsée")
        .addField(`${message.member.user.tag} t'as kick pour la raison suivante: ${reason}`, "Une erreur ça arrive. . .")
        .setTimestamp()
    kickMember.send(msgKick).then(() =>
    kickMember.kick()).catch(err => console.log(err))

}
});

//ban
client.on('message', message => {
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    let member = messageArray.slice(2);

    if(message.content.startsWith(".ban")){
    if(!message.member.hasPermission(["BAN_MEMBERS"], ["ADMINISTRATOR"])) return message.channel.send("Tu n'as pas la permission de faire cette commande.")

    let banMember = message.mentions.members.first() //|| message.guild.members.get(args[0])
    if(!banMember) return message.channel.send("Tu dois mentionner quelqu'un❌")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "Aucune raison donnée."

    if(!message.guild.me.hasPermission(["BAN_MEMBERS"], ["ADMINISTRATOR"])) return message.channel.send("Je n'ai pas la permission de faire ça.")
    
    const ban = new discord.MessageEmbed()
        .setColor('#ffdfdf') 
        .setTitle("• ⊰ Hiku\'s Coffee ⊱ •")
        .setDescription("Membre correctement banni ✅")
        .addField(`Le membre a bien été banni pour la raison: ${reason}`, '• Adieu' )
        .setTimestamp()
        message.channel.send(ban)
   
    const msgBan = new discord.MessageEmbed()
        .setColor('#ffdfdf') 
        .setTitle(`Tu as été banni du serveur ${message.guild.name}!`)
        .setDescription("Le HammerBan t'as frappé")
        .addField(`${message.member.user.tag} t'as banni pour la raison suivante: ${reason}`, "Bye Bye")
        .setTimestamp()
    banMember.send(msgBan).then(() =>
    banMember.ban()).catch(err => console.log(err))

}
});

//Pour voir l'avatar
client.on('message', message => {
    if (!message.guild) return;
    if (message.content.startsWith('.avatar')) {
      const user = message.mentions.users.first() || message.author;
      const avatarEmbed = new discord.MessageEmbed()
          .setColor(0x333333)
          .setAuthor("Avatar de: " + user.username)
          .setImage(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
      message.channel.send(avatarEmbed);
}
});

//help
client.on('message', message => {
     if (!message.guild) return;

     if (message.content === prefix + 'help') {
        message.channel.send(help);
     }
});    

//Info Bot
client.on('message', message => {
    if (!message.guild) return;

    if (message.content === prefix + 'info') {
       message.channel.send("j'ai été créée et développée par Aik, Toast et Zero, mon nom est Maid, mais vous pouvez m'appeler Kaori.");
    }
});

//login
client.login(process.env.DISCORD_TOKEN);
