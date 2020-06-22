"use strict";

//Start
const discord = require('discord.js');
const { prefix, DISCORD_TOKEN} = require('./config.json')
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
      client.user.setPresence({activity: {type: 'WATCHING',name: 'le café'}, status: 'dnd'});
  });

//bienvenue
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === '〢🌙accueil');
    if (!channel) return;
    const url = member.user.avatarURL({ format: 'png', dynamic: true, size: 1024 })
    const welcome = new discord.MessageEmbed()
    
       .setTitle(`Bienvenue dans notre café!`)
       .setColor(`#ffdfdf`)
       .setThumbnail(url)
       .setAuthor('Bienvenue', 'https://cdn.discordapp.com/attachments/648412438219325461/724619286924230666/a_762309dc83e08f460fd3c269aeaf8f3c.gif' )
       .setDescription(`Un nouveau client est arrivé: ${member.user.username}`)
       .addField("Avant tout: ", "• Lire le <#711111570163499018> \n • Prendre ses <#716566179967139963> \n • Et regarder le <#715954917327765504> \n ︶︶︶︶︶︶︶︶︶︶︶︶₊˚ˑ༄")
       .setImage('https://cdn.discordapp.com/attachments/705499848174206987/715828030626594846/c5c9476988f466622a97bafe5866ac93cc3ea0d2_hq.gif')
    channel.send(welcome)
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
        .setTitle("Hiku\'s Coffee")
        .setDescription("Membre correctement banni :cherry_blossom:")
        .addField(`Le membre a bien été banni pour la raison: ${reason}`, '︶︶︶︶︶︶︶︶︶︶︶︶︶︶︶︶︶₊˚ˑ༄' )
        .setTimestamp()
        message.channel.send(ban)
   
    const msgBan = new discord.MessageEmbed()
        .setColor('#ffdfdf') 
        .setTitle(`Tu as été banni du serveur ${message.guild.name}!`)
        .setDescription("Le BanHammer t'as frappé")
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
client.login(DISCORD_TOKEN);


//A effacer après utilisation !

//Staff
const Staff = new discord.MessageEmbed()
     .setColor('#583F73')
     .setAuthor('__Hiku\'s Coffee :__', 'https://cdn.discordapp.com/attachments/648412438219325461/724619286924230666/a_762309dc83e08f460fd3c269aeaf8f3c.gif' )
     .setDescription('Voice le staff du café :')
     .addField('__Fondatrice__', 'Hiku')
     .addField('__Administrateurs__', 'Toast \n Aik')
     .addField('__Helpeurs__', 'Ryuu \n Yuel')  
     .addField('__Bot__', 'Maid')
     .setImage('https://cdn.discordapp.com/attachments/705499848174206987/724606161394860042/1456244155_juttu2.gif')
    
     client.on('message', message => {
        if (!message.guild) return;

        if (message.content === 'Aik el bogossito') {
           message.channel.send(Staff);
        }
});

//Réglement 
const Reglement = new discord.MessageEmbed()
    .setColor('#ffdfdf')
    .setAuthor('Hiku\'s Coffee :', 'https://cdn.discordapp.com/attachments/648412438219325461/724619286924230666/a_762309dc83e08f460fd3c269aeaf8f3c.gif' )
    .setDescription('__Bienvenue au règlement de notre café.__')
    .addField(":cherry_blossom: 1 ⊱", "L'Nsfw, le gore, la pédophilie, le bestial sont interdis et bannis.")
    .addField(":cherry_blossom: 2 ⊱", "Ne pas être toxique, éviter les débats inutiles ou les régler en privé.")
    .addField(":cherry_blossom: 3 ⊱", "Aucune publicité pour d'autre serveurs n'est acceptée. Même en Mp.")
    .addField(":cherry_blossom: 4 ⊱", "Ne spammez pas, les bots vous banniront au bout de 3 warns.")
    .addField(":cherry_blossom: 5 ⊱", "Respectez le staff, ils font tous de leur mieux pour garder un serveur sain.")
    .addField(":cherry_blossom: 6 ⊱", "Pas de sujets sensibles comme la religion, l'homophobie, le sexisme ou le racisme.")
    .addField(":cherry_blossom: 7 ⊱", "Respectez les channels selon leurs thèmes.")
    .addField(":cherry_blossom: 8 ⊱", "Profitez du calme pour passer un bon moment, le troll est inutile, les bans sont rapides.")
    .addField(":cherry_blossom: 9 ⊱", "Cliquez sur la réaction pour avoir accès au serveur.")
    .setImage('https://cdn.discordapp.com/attachments/705499848174206987/715648159082086421/Capture.JPG')
    .setFooter("Bot développé par Aik et Toast, pour tout soucis contactez un pillier.")
    
  client.on('message', message => {
    if (!message.guild) return;

    if (message.content === 'Yxzubfrugtaioen') {
       message.channel.send(Reglement);
    }
});    

//Boosters
const Boosters = new discord.MessageEmbed()
    .setColor('#ff63da')
    .setAuthor('__Boosters :__', 'https://cdn.discordapp.com/attachments/648412438219325461/724619286924230666/a_762309dc83e08f460fd3c269aeaf8f3c.gif' )
    .setDescription('__En boostant le serveur vous aurez les avantages suivants:__')
    .addField(":cherry_blossom: 1 ⊱", "Un rôle personnalisé.")
    .addField(":cherry_blossom: 2 ⊱", "Une couleur au choix.")
    .addField(":cherry_blossom: 3 ⊱", "Une priorité en vocal.")
    .addField(":cherry_blossom: 4 ⊱", "Ajouter des emotes supplémentaires.")
    .addField(":cherry_blossom: 5 ⊱", "Place prioritaire pour les events et autres.")
    .addField(":cherry_blossom: 6 ⊱", "Avoir une place tout en haut de la liste des membres.")
    .addField(":cherry_blossom: 7 ⊱", "Contacter le staff plus facilement, en mp ou a l'écrit.")
    .addField(":cherry_blossom: 8 ⊱", "Envoyer des liens et des images sur les channels, le spam reste interdit.")
    .setImage('https://cdn.discordapp.com/attachments/705499848174206987/716684373402845194/giphy.gif')
    
  client.on('message', message => {
    if (!message.guild) return;

    if (message.content === 'fziuvneivnediez') {
       message.channel.send(Boosters);
    }
});    

//Grades
const role = new discord.MessageEmbed()
    .setColor('#FEE0E2')
    .setAuthor('__Les Grades :__', 'https://cdn.discordapp.com/attachments/648412438219325461/724619286924230666/a_762309dc83e08f460fd3c269aeaf8f3c.gif' )
    .addField('Vous pouvez gagner 10 à 20 d\'xp chaque minute avec tatsu pour monter en grade, le spam est inutile et l\'xp se farm très vite.')
    .setImage('https://cdn.discordapp.com/attachments/705499848174206987/715621316669210654/unknown.png')
    
  client.on('message', message => {
    if (!message.guild) return;

    if (message.content === 'aziuizecjnyzetgcziy') {
       message.channel.send(role);
    }
});

//Pings 
const pings = new discord.MessageEmbed()
    .setColor('#FEE0E2')
    .setAuthor('__Les Pings :__', 'https://cdn.discordapp.com/attachments/648412438219325461/724619286924230666/a_762309dc83e08f460fd3c269aeaf8f3c.gif' )
    .addField('Cliquez sur les réactions pour avoir les rôles {pings}, vous aurez une notifications à chaque event proposé, jeux ou nouveauté.',':cherry_blossom: ⊱ Event \n :tanabata_tree: ⊱ Jeux \n :star2: ⊱ Nouveautés')
client.on('message', message => {
    if (!message.guild) return;

    if (message.content === 'jkdxcsjhdfcujdrfecikesdol') {
       message.channel.send(pings);
    }
});

//Equipes
const equipes  = new discord.MessageEmbed()
    .setColor('#FEE0E2')
    .setAuthor('__Les Equipes :__', 'https://cdn.discordapp.com/attachments/648412438219325461/724619286924230666/a_762309dc83e08f460fd3c269aeaf8f3c.gif' )
    .addField('choisissez votre camp entre les démons et les pourfendeurs.',':fire: ⊱ Pourfendeurs  \n :knife: ⊱ Démons')
    client.on('message', message => {
        if (!message.guild) return;
    
        if (message.content === 'ergegegneuihdbvuhbeah') {
           message.channel.send(equipes);
        }
    });