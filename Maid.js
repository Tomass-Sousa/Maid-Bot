"use strict";

//Start
const discord = require('discord.js');
const client = new discord.Client();
const { prefix, DISCORD_TOKEN} = require('./config.json')

//Le Point Help (.help)
const help = new discord.MessageEmbed()
    .setColor('#ffdfdf')
    .setTitle('Aide')
    .setAuthor('Hiku\'s Coffee :', 'https://cdn.discordapp.com/attachments/648412438219325461/724619286924230666/a_762309dc83e08f460fd3c269aeaf8f3c.gif')
    .setDescription('Retrouve la liste des commandes ici')
    .addField("__.ping__ ", "Ping le bot.")
    .addField("__.help__", "Affiche cette page.")
    .addField("__.say__", "Affiche votre message en embed.")
    .addField("__.info__", "Voir les createurs du bot.")
    .addField("__.avatar__", "Affiche l'avatar du membre.")
    .addField("__.purge__", "Pour effacer un nombre de messages.")
    .addField("__.si__", "Pour voir les informations du serveur")
    .setImage('https://cdn.discordapp.com/attachments/705499848174206987/716251926710452234/OK6W_koKDTOqqqLDbIoPApKuI1qnjWj8DtVkFCcj45w.gif');

//log
client.on('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}!`);
      client.user.setPresence({activity: {type: 'WATCHING',name: 'le café'}, status: 'Online'});
  });
  
//bienvenue
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(channel => channel.name === '〢💮accueil');
  if (!channel) return;
  const url = member.user.avatarURL({ format: 'png', dynamic: true, size: 1024 })
  const welcome = new discord.MessageEmbed()

     .setTitle(`Bienvenue dans notre café !`)
     .setColor(`#ffdfdf`)
     .setThumbnail(url)
     .setAuthor('Hiku\'s Coffee', 'https://cdn.discordapp.com/attachments/648412438219325461/724619286924230666/a_762309dc83e08f460fd3c269aeaf8f3c.gif' )
     .setDescription(`Un nouveau client est arrivé: ${member.user.username}\n Tu es notre ${member.guild.memberCount}ème client.`)
     .addField("Avant tout : ", "┊ ‧₊˚๑・Lire le <#711111570163499018> \n ┊ ‧₊˚๑・Prendre ses <#716566179967139963> \n ┊ ‧₊˚๑・Et regarder le <#715954917327765504> \n ╰────────────────────✦ ")
     .setImage('https://i.imgur.com/zfQogMb.gif')

  channel.send(welcome)
});

//ping (.ping)
 client.on('message', message => {
     if (message.content === prefix + 'ping' ){
     if (message.author.bot) return;
          message.reply('Pong')
     }
});

//kick (.kick)
  client.on('message', message => {
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);

    if(message.content.startsWith(".kick")){
if(message.channel.type==="dm"||message.channel.type==="group") {
    return message.reply('Tu te sens si seul ? Pauvre de toi. . ');
}
    if(!message.member.hasPermission(["KICK_MEMBERS"],  ["BAN_MEMBERS"],  ["ADMINISTRATOR"])) return message.channel.send("Tu n'as pas la permission de faire cette commande.")

    let kickMember = message.mentions.members.first() //|| message.guild.members.get(args[0])
    if(!kickMember) return message.channel.send("Tu n'as donné aucun utilisateur à kick...")


    let reason = args.slice(1).join(" ")
    if(!reason) reason = "Aucune raison donnée."

    if(!message.guild.me.hasPermission(["KICK_MEMBERS"], ["ADMINISTRATOR"])) return message.channel.send("Je n'ai pas la permission de faire ça.")
    
    const kick = new discord.MessageEmbed()
        .setTitle("Utilisateur kick!")
        .setDescription("Un utilisateur a été kick du serveur")
        .addField(`Le membre a bien été kick pour la raison: ${reason}`, "(logs envoyé dans le salon)")
        .setFooter("Non mais aussi si il fait des bêtises...")
        message.channel.send(kick)

    const msgKick = new discord.MessageEmbed()
        .setTitle(`Tu as été kick du serveur ${message.guild.name}!`)
        .setDescription("Tu as fait une bêtise et un modérateur t'as kick..")
        .addField(`${message.member.user.tag} t'as kick pour la raison suivante: ${reason}`, "Fais plus attention !")
    kickMember.send(msgKick).then(() =>
    kickMember.kick()).catch(err => console.log(err))

}
});

//ban (.ban)
client.on('message', message => {
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    let member = messageArray.slice(2);

    if(message.content.startsWith(".ban")){
        if(message.channel.type==="dm"||message.channel.type==="group") {
			return message.reply('Tu te sens si seul ? Pauvre de toi. . ');
		}
    if(!message.member.hasPermission(["BAN_MEMBERS"], ["ADMINISTRATOR"])) return message.channel.send("Tu n'as pas la permission de faire cette commande.")

    let banMember = message.mentions.members.first() //|| message.guild.members.get(args[0])
    if(!banMember) return message.channel.send("Tu n'as donné aucun utilisateur à bannir...");
    let reason = args.slice(1).join(" ")
    if(!reason) reason = "Aucune raison donnée."

    if(!message.guild.me.hasPermission(["BAN_MEMBERS"], ["ADMINISTRATOR"])) return message.channel.send("Je n'ai pas la permission de faire ça.")
    
    const ban = new discord.MessageEmbed()
        .setTitle("Maid a bien expulsé le client du café.")
        .setColor(`#ffdfdf`)
        .setDescription(`L'utilisateur a été banni`)
        .addField(`${message.member.user.username} t'as banni pour la raison suivante: ${reason}`, "Si le ban n'est pas justifié, merci de contacter un pilier.")
    message.channel.send(ban)
   
    const msgBan = new discord.MessageEmbed()
        .setTitle(`Tu as été banni du serveur Hiku's Coffee.`)
        .setColor(`#ffdfdf`)
        .addField(`${message.member.user.username} t'as banni pour la raison suivante: ${reason}`, "Bonne continuation")
    banMember.send(msgBan).then(() =>
    banMember.ban()).catch(err => console.log(err))
}
});

//Pour voir l'avatar (.avatar)
client.on('message', message => {
    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.content.startsWith('.avatar')) {
      const user = message.mentions.users.first() || message.author;
      const avatarEmbed = new discord.MessageEmbed()
          .setColor(0x333333)
          .setAuthor("Avatar de: " + user.username)
          .setImage(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
      message.channel.send(avatarEmbed);
}
});

//help (.help)
client.on('message', message => {
     if (!message.guild) return;
     if (message.author.bot) return;
     if (message.content === prefix + 'help') {
        message.delete()
        message.channel.send(help);
     }
});    

//Info Bot (.info)
client.on('message', message => {
    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.content === prefix + 'info') {
       message.channel.send("j'ai été créée et développée par Aik et Toast, mon nom est Maid, mais vous pouvez m'appeler Kaori.");
    }
});

//Purge (.purge)
client.on('message', message => {
    if (!message.guild) return;

if (message.content.startsWith(prefix + "purge")) {
message.delete()
if(!message.member.hasPermission(["KICK_MEMBERS"],  ["BAN_MEMBERS"],  ["ADMINISTRATOR"])) return message.reply("tu n'as pas la permission de faire cette commande.");
let messageArray = message.content.split(" ");
let args = messageArray.slice(1);
const id = args.join()
let number = id
let limit = 25
if (id > limit) {
number = 25
message.channel.bulkDelete(number)
}
if (id < limit) {
message.channel.bulkDelete(number)
} 
}
});

//Voici le .say les phrases en commentaires (comme celle-ci) 
//Correspondent à des choses pouvant être ajoutées ( 2 setcolor ne peuvent pas être dans un même embed donc si vous mettez la méthode pour obtenir une couleur aléatoire
//vous devrez d'abord supprimer le .setColor('#FEE0E2') puis retirer les //

client.on('message', message => {
    const user = message.author;
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1,Infinity)
    let patate = args.join(" ")
 //   const color = "#000000".replace(/0/g, function() { return (~~(Math.random() * 16)).toString(16); });
    const say = new discord.MessageEmbed() 
 //  .setColor(color)
    .setColor('#FEE0E2')
    .setFooter(`${user.tag}`)
    .setDescription(patate)
    
      if(message.content.startsWith(".say")){
      if(patate == '') return;
           message.delete()
         message.channel.send(say)
      }
  
  })

//BanId (.bi)
client.on('message', message => {
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
  
    if(message.content.startsWith(".bi")){
  //Vérifie si l'uilisateur est un bot
  
    if(message.author.bot) return;
  
  //Bloque la commande en DM et en GROUP pour éviter les crash. . .
  
     if(message.channel.type==="dm"||message.channel.type==="group") {
      return message.reply('Tu te sens si seul ? Pauvre de toi. . ');
      }
  //Vérifie les permisions de l'utilisateur
    if(!message.member.hasPermission(["BAN_MEMBERS"], ["ADMINISTRATOR"])) return message.channel.send("Tu n'as pas la permission de faire cette commande.")
    
  let BANMEMBER =  message.mentions.members.first() || message.guild.member(message.guild.members.cache.get(args[0]) )
  
  //<raison>
  
    let reason = args.slice(1).join(" ")
    if(!reason) reason = "Aucune raison donnée."
  
  //EMBED
  
    let banheu = new discord.MessageEmbed()
    .setTitle(`${message.guild.name} `)
    .setDescription("**Utilisateur banni :**")
    .addField("```ID :"+ args[0] + "```", `Raison : ${reason}`)
    .setTimestamp()
     if(args[0] == undefined);
     if(!Number(args[0])) return message.channel.send(".bi <id> <raison>");
  
  //Ne pas toucher 
  
     if(Number(args[0])){
    let ban = client.users.fetch(args[0])
    .then(users => message.guild.members.ban(users.id)).then(users => console.log()).catch(error => {
    if(error.code !== 1844 ) return message.delete() && message.channel.send('**ID INVALIDE**')}
    ).then(error => { if(!error) message.channel.send(banheu)})
    
  }} 
  })

//ServerInfo (.si)
  client.on('message', message => {
 
    if(message.content === prefix + "si"){
    if(message.channel.type==="dm"||message.channel.type==="group") {
      return false;
    }
    var iconguild = message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 })
    const guildname = message.guild.name
    let NivModServ = message.guild.verificationLevel
    if(message.guild.verificationLevel === "VERY_HIGH") {
      NivModServ = 'Sécurité maximale' }
     if(message.guild.verificationLevel === "HIGH"){ 
         NivModServ = 'Sécurité élevée'}
         if(message.guild.verificationLevel === "MEDIUM") {
          NivModServ = 'Sécurité moyenne'}
        if(message.guild.verificationLevel === "LOW") {
           NivModServ = 'Sécurité basse'}
        if(message.guild.verificationLevel === "NONE"){
       NivModServ = 'Aucun niveau de vérification' }
    const serverinf = new discord.MessageEmbed()
    .setAuthor(guildname,iconguild)
    .setThumbnail(iconguild)
    .setColor("RED")
    .setTitle(`ID: ${message.guild.id} `)
    .addField("Niveau de vérification :",NivModServ)
    .addField('**Propriétaire : **', message.guild.owner.user.username )
    .addField(`**Nombre de membres :**`,`**${message.guild.memberCount}**`)
    .addField(`**Nombre d'emojis :**`, `**${message.guild.emojis.cache.size}**`)
    .addField(`**Nombre de rôles :**`, `**${message.guild.roles.cache.size}**`)
    .setFooter(`Demandé par ${message.member.user.tag}`)
    .setTimestamp()
    
    message.channel.send(serverinf)
  }
  })

//Bannumber (.totalban)
client.on('message', message => {
    if(message.content === prefix  + "totalban"){
     message.guild.fetchBans()
     .then(banned => { 
       if(banned.size === 0||null||undefined) return message.channel.send('Aucun membre banni')
          message.channel.send(`${banned.size} users are banned`);
     
    })
    .catch(console.error);
  }})

//login
client.login(DISCORD_TOKEN);
