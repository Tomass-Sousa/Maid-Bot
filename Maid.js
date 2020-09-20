"use strict";

//Start
const discord = require('discord.js');
const client = new discord.Client();
const { prefix, DISCORD_TOKEN} = require('./config.json')

//Musique 
const fs = require('ffmpeg-static');
const ytdl = require('ytdl-core')
const queue = new Map();

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

//Statut Maid
client.on('ready',  () => {
  console.log(`Connecté en tant que ${client.user.tag}!`);
  client.user.setStatus("dnd") 
});
client.on("guildMemberAdd", member => {  //event de join ca met a jour quand qq join 
     let membre = 0
     membre =  member.guild.memberCount ;
    client.user.setActivity(`${membre} clients`, {
          type: "WATCHING",
          url: "https://www.twitch.tv/HikuCoffee"
         }
        );
});
client.on("guildMemberRemove", member => {  //evenement de leave donc ca met a jour quand y'a un leave
     let membre = 0
     membre =  member.guild.memberCount ;
        client.user.setActivity(`${membre} clients`, {
           type: "WATCHING",
           url: "https://www.twitch.tv/HikuCoffee"
          }
        ); 
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
     .addField("Avant tout : ", "• Lire le <#711111570163499018> \n• Prendre ses <#716566179967139963> \n• Et regarder le <#715954917327765504> \n︶︶︶︶︶︶︶︶︶︶︶︶")
     .setImage('https://i.imgur.com/qm4Rg7M.gif')

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
  const say = new discord.MessageEmbed() 
  .setColor('#FEE0E2')
  .setFooter(`${user.tag}`)
  .setDescription(patate)
if(message.content.startsWith(".say")){
   if(message.channel.type ==="dm"||message.channel.type==="group")
    {return ;}
    if(patate == '') return;
    if(patate.length >= 1900) return message.delete() && message.channel.send("Vu la taille de ton message tu dois être ennuyant :/")
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

//Musique 
client.on("message", async message => {
  if (message.author.bot) return;
  if(message.channel.type ==="dm"||message.channel.type==="group")
  {return;}
  const serverQueue = queue.get(message.guild.id);
let args = message.content.substring(prefix.length).split(" ")

if (message.content.startsWith(`${prefix}play`)) {
  execute(message, serverQueue);
  return;
} else if (message.content.startsWith(`${prefix}skip`)) {
  skip(message, serverQueue);
  return;
} else if (message.content.startsWith(`${prefix}stop`)) {
  stop(message, serverQueue);
  return;
}
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "Vous devez être dans un channel vocal pour lancer une musique."
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "Je n'ai pas les permissions nécessaires pour rejoindre votre channel."
    );
  }
  const validate = await ytdl.validateURL(args[1])
  if(!validate) return message.channel.send('Vous devez mettre une url valide.')
  let songInfo = await ytdl.getInfo(args[1]);
  
  const song = {
    title: songInfo.videoDetails.title,
    url: songInfo.videoDetails.video_url
  };
  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 3,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      queue.delete(message.guild.id);
      return message.channel.send('Erreur');
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send("`" + song.title +"` a été ajouté à la file.");
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Tu dois être en vocal pour __skip__ une musique."
    );
  if (!serverQueue)
    return message.channel.send("Aucune musique présente dans la file.");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Tu dois être en vocal pour pouvoir __stop__ une musique."
    );
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(" `"+ song.title + "` est actuellement joué");
}

// __________________________________
//
// Embeds (enlever après utilisation)
//
// __________________________________

//Boosters
const Boosters = new discord.MessageEmbed()
    .setColor('#fafafa')
    .setAuthor('Les boosters :', 'https://cdn.discordapp.com/attachments/648412438219325461/724619286924230666/a_762309dc83e08f460fd3c269aeaf8f3c.gif' )
    .setDescription('Les boosters sont les clients qui soutiennent le serveur, grâce a eux nous pouvons vous donner plus de contenu\nVoici la liste de vos avantages si vous boostez le serveur :\n‏‏‎ ‎\n・ Un rôle personnalisé avec sa couleur et son nom au choix, suffit de ping un modo.\n‏‏‎ ‎\n・ Une priorité pour les events, annonces ou giveaways, avec une place réservé.\n‏‏‎ ‎\n・ La possibilité de demander une aide publicitaire, sauf pour des serveurs.\n‏‏‎ ‎\n・ Une place tout en haut de nos clients mais aussi de nos haut gradés.\n‏‏‎ ‎\n・ La possibilité de proposer de nouvelles emotes animés ou statiques.\n‏‏‎ ‎\n・ Un avantage auprès de notre bot, sur les mise a jour a venir.\n‏‏‎ ‎\n・ Des commandes utilitaires comme pour la musique ou autre.\n‏‏‎ ‎\n・ Un Contact plus rapide et plus facile avec notre staff.\n‏‏‎ ‎\n・ Envoyer des liens et des images sur tout les channels.')
    .setImage('https://i.imgur.com/flqBTd8.jpg')
   
    client.on('message', message => {
    if (!message.guild) return;

    if (message.content === "embedboosters") {
       message.channel.send(Boosters);
    }
}); 

//Rôles
 
//Grades
const role = new discord.MessageEmbed()
    
    .setColor('#ffdbc7')
    .setAuthor('Les Grades :', 'https://cdn.discordapp.com/attachments/648412438219325461/724619286924230666/a_762309dc83e08f460fd3c269aeaf8f3c.gif' )
    .setDescription('`[0] |` <@&711239854591049728> (300 pts)\n`[1] |` <@&712945730494660650> (1 000 pts)\n`[2] |` <@&711506317788971049> (3 000 pts)\n`[3] |` <@&713245195818500097> (10 000 pts)\n`[4] |` <@&713245189795348480> (30 000 pts)\n`[5] |` <@&713245183629590608> (50 000 pts)\n`[6] |` <@&713245177149521931> (70 000 pts)\n`[7] |` <@&713245169423745045> (100 000 pts)\n`[8] |` <@&713241995295981609> (150 000 pts)\n`[9] |` <@&745010431269011529> (200 000 pts)')
    .addFooter('Sélectionnez un rôle en\nutilisant des réactions.')
    
    client.on('message', message => {
    if (!message.guild) return;

    if (message.content === 'embedgrades') {
       message.channel.send(role);
    }
});

//Talents 
const talents = new discord.MessageEmbed()
    .setColor('#ffdbc7')
    .setAuthor('Les Talents :', 'https://cdn.discordapp.com/attachments/648412438219325461/724619286924230666/a_762309dc83e08f460fd3c269aeaf8f3c.gif' )
    .setDescription('1 - <@&745212160422182952>\n2 - <@&745212163001417728>\n3 - <@&745212158207590420>')
    .addFooter('Sélectionnez un rôle en\nutilisant des réactions.')

    client.on('message', message => {
      if (!message.guild) return;
  
      if (message.content === 'embedtalents') {
         message.channel.send(talents);
      }
});

//Pings 
const pings = new discord.MessageEmbed()
    .setColor('#FEE0E2')
    .setAuthor('Les Pings :', 'https://cdn.discordapp.com/attachments/648412438219325461/724619286924230666/a_762309dc83e08f460fd3c269aeaf8f3c.gif' )
    .setDescription('1 - <@&713792550418251827>\n2 - <@&716554210077966338>\n3 - <@&716554222602158111>')
    .addFooter('Sélectionnez un rôle en\nutilisant des réactions.')

    client.on('message', message => {
    if (!message.guild) return;

    if (message.content === 'embedpings') {
       message.channel.send(pings);
    }
});

//Equipes
const equipes  = new discord.MessageEmbed()
    .setColor('#FEE0E2')
    .setAuthor('Les Equipes :', 'https://cdn.discordapp.com/attachments/648412438219325461/724619286924230666/a_762309dc83e08f460fd3c269aeaf8f3c.gif' )
    .setDescription('1 - <@&716575123079168081\n2 - <@&716575070138400779>')
    .addFooter('Sélectionnez un rôle en\nutilisant des réactions.')

    client.on('message', message => {
    if (!message.guild) return;
    
    if (message.content === 'embedequipes') {
        message.channel.send(equipes);
    }
});

//Staff
const Staff = new discord.MessageEmbed()
    .setColor('#fafafa')
    .setAuthor('Hiku\'s Coffee :', 'https://cdn.discordapp.com/attachments/648412438219325461/724619286924230666/a_762309dc83e08f460fd3c269aeaf8f3c.gif' )
    .setDescription('__**Les piliers sont les gérants du café :**__\n‏‏‎ ‎\n__**Les Administrateurs :**__\n・Toast\n・Hiku\n・Aik\n‏‏‎ ‎\n__**Les Helpeurs :**__\n・Sashi\n・Yuel\n・Rain\n‏‏‎ ‎\n__**Notre Bot :**__\nMaid a été développée par aik et toast, elle propose beaucoup de contenu a l\'heure actuelle et n\'as pas fini d\'évoluer, elle propose beaucoup de commandes mais elle gére aussi l\'intégralité du serveur, n\'hésitez pas a utiliser le **.help** pour avoir la liste des commandes disponibles au clients.')
    .setImage('https://i.imgur.com/uxKDKKY.jpg')

client.on('message', message => {
   if (!message.guild) return;

   if (message.content === 'embedstaff') {
      message.channel.send(Staff);
   }
});

//login
client.login(DISCORD_TOKEN);  

