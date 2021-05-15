var Discord = require("discord.js")
const { slice } = require("ffmpeg-static")
const { validateURL } = require("ytdl-core")
var BDD = ("./ds/BDD.json")
var token = "NzQwNTM5ODM4MjYzOTg0MjI4.XyqfeA.h3YAY60wvBL5bOtAAyybhle9E-U"
var bot = new Discord.Client
var prefix = "/"
const ytdl = require("ytdl-core")
var musicchannel = "🎶│Musique"
var loop = "nul"
var list = []
var typeserv = "Undefined, read settypeserv for define type of serv"
var radio = "🎶│Radio"

bot.on("ready", pret =>{
    console.log("TKLTbot demarré")
    
})
//////////////////////////////////////réseau////////////////////////////////////////////////
bot.on('message', message => {
    if(message.content.startsWith(prefix + "site")){
        message.channel.send("La création de notre propre site web est envisageable, mais n'est pas encore réalisé")
    }
})
bot.on('message', message => {
    if(message.content.startsWith(prefix + "snake")){
        message.channel.send("Tu peux télécharger le jeu snake créer en java par TKLT_CatChef à partir de ce lein : https://github.com/naolatam/Snake-game.git")
    }
})
/////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////ticket////////////////////////////////////////////////
bot.on("message",async message => {
    
        if(message.author.bot)return
        if(message.channel.type == "dm") return message.channel.send("is not enable in dm channel")
        if(message.content.startsWith(prefix + "ticket")){
            var role2 = message.guild.roles.cache.find(role2 => role2.name == "@everyone");

            const ticketembed = new Discord.MessageEmbed()
            .setColor("#03fcf4")
            .addField(`Hey ${message.author.username} !`, `Attend , un support arrive`)
            .setTimestamp()

            let ticketchannel = await message.guild.channels.create(`ticket-${message.author.discriminator}`)

            ticketchannel.send(ticketembed)
            ticketchannel.send(`${message.author.id}`).then(() => {
                const embedcreated = new Discord.MessageEmbed()
                .setColor("#03fcf4")
                .setTitle("Ticket")
                .setDescription("Ton ticket à bien était créé ." + `${ticketchannel}` )
                .setFooter("Ticket systeme")
                .setTimestamp()

                message.channel.send(embedcreated)
            })
    }
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

bot.on('message', message => {
    if(message.content ===prefix + "settypeserv")
    message.reply("pour définir le type de ton serveur tu dois écrire la même chause suivit d'un espace suivis du type")

    else{if(message.content.startsWith(prefix + "settypeserv")){
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Tu n'as pas la permission de gérer le serveur")
        if(message.member.hasPermission("MANAGE_GUILD")){
        let args = message.content.split(" ")

        if(args[1] == undefined) return message.channel.send("Tu dois précisez le type de ton serveur (multigaming , manga etc ) avec aucun espace dans le type de serveur")
        
        else{
            if(args[2] == undefined) return
            else{
            message.channel.send("Ton serveur est défini en tant que serveur : " + args[1], typeserv = args[1] + " " + args[2])}
        }}
    }}
})



///////////////////////////////////////// ban /////////////////////////////////////////
bot.on('message', message => {
    if(message.content === prefix + "ban")
    message.reply("La fonction de ban sert à ban un membre du serveur, pour l'utiliser il suffit d'écrire le prefix du serveur sur le quel tu te trouve suivis de ban suivis d'un espace suivis du membre à bannir du serveur.")
   
    else{if(message.author.bot) return;
    if(message.channel.type == "dm") return message.channel.send("Vous n'etes pas sur un serveur")
    if(message.content.startsWith(prefix + "ban")){
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Only admin can ban.")
        if(message.member.hasPermission("BAN_MEMBERS")) {
        
            let mention = message.mentions.members.first();

            
            if(mention == undefined){
                message.reply("TU dois preciser qui tu veux ban");
            }
            else{
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " a était banni du serveur par " + message.author.username)
                }
            }
        }
    }}
})

///////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// kick /////////////////////////////////////////

bot.on('message', message => {
    if(message.content === prefix + "kick")
   message.reply("la fonction de kick sert à expulser un membre du serveur, pour l'utiliser il suffit d'écrire le prefix du serveur sur le quelle tu te trouve suivis de kick suivis d'un espace suivis du membre à kick, Tu ne peux utiliser cette fonction uniquement si tu en as la permission")
    
   else{if(message.author.bot) return;
    if(message.channel.type == "dm") return message.channel.send("Tu peux pas utiliser cette fonction en mp")
    if(message.content.startsWith(prefix + "kick")){
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Only Admin can kick")
        if(message.member.hasPermission("KICK_MEMBERS")){
            let mention = message.mentions.members.first();
            let args = message.content.slice(" ")
            let raison = (args.split(2).join(''))

            if(mention == undefined){
                message.reply("Tu dois préciser un membre du serveur")
            }
            else{
                if(mention.kickable){
                    mention.kick(raison);
                    message.channel.send(mention.displayName + " a était kick du serveur par " + message.author.username)
                }
                
            }
        }
    }}
})

///////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// mute /////////////////////////////////////////

bot.on('message', message => {
    if(message.content === prefix + "mute")
    message.reply("La fonction mute sert à rendre muet un membre sur le serveur ,pour l'utiliser il te suffit d'écrire le prefix du serveur sur le quel tu te trouve suivis de mute suivis d'un espace suivis du membre à mute")
  
   else{if(message.author.bot) return;
    if(message.channel.type == "dm") return message.channel.send("Tu peux utiliser cette fonction uniquement sur des serveurs")
    if(message.content.startsWith(prefix + "mute")){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Only Admin can mute")
        if(message.member.hasPermission("ADMINISTRATOR")){
        
            let mention = message.mentions.members.first();
            let args = message.content.slice(" ")
            let raison = (args.split(2).join(''))

            if(mention == undefined){
                message.reply("Membre mal ou non mentionné.")
            }
            else{
                mention.roles.add("833765457889722418");
                message.channel.send(mention.displayName + " a était mute avec succés pour " + raison)
            }
        }
    }}
})
///////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////// unmute ////////////////////////////////////////

bot.on('message', message => {
   if(message.content === prefix + "unmute")
   message.reply("La fonction unmute sert à redonné l'accés à un membre du serveur ayant était mute précédemment, pour l'utiliser il te suffit d'écrire le prefix du serveur sur le quel tu te trouve suivis de unmute suivis d'un espace suivis du membre à unmute")


   else{if(message.author.bot) return;
    if(message.channel.type == "dm") return message.channel.send("Tu peux utiliser cette fonction uniquement sur des serveurs")
    if(message.content.startsWith(prefix + "unmute")){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Seul les Admin peuveut mute")
        if(message.member.hasPermission("ADMINISTRATOR")){
        
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre mal ou non mentionné.")
            }
            else{
                mention.roles.remove("833765457889722418");
                message.channel.send(mention.displayName + " a était unmute avec succés")
            }
        }
    }}
})

///////////////////////////////////////////////////////////////////////////////////////

//  _________        /\          /\         |
//      |           /  \        /  \        |
//      |          /    \      /    \       |
//      |         /      \    /      \      |
//      |         \      /    \      /      |
//      |          \    /      \    /       |
//      |           \  /        \  /        |
//      |            \/          \/         \______________


///////////////////////////////////////////////////////////////////////////////////////
     
////////////////////////////////// nick name //////////////////////////////////////////
     
bot.on("message", message => {
    if(message.content === prefix + "nickname")
    message.reply("La fonction nickname sert à changé le pseudo d'un membre , pour l'utiliser il te faudra écrire le prefix du serveur suivit de nickname ajoute un espace et écrit le nouveau pseudo , ensuite un dernier espace suivis du membre au quel tu veux changer le pseudo . si tu n'as pas la permission ça ne fonctionnera pas ")

    else{if(message.content.startsWith(prefix + "nickname")){
        if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.reply("Tu n'as pas la permission de changer les pseudo")
        if(message.member.hasPermission("MANAGE_NICKNAMES")){
            let args = message.content.split(" ")
            let mention = message.mentions.members.first()
            let newpseudo = args[1]
           
            if(newpseudo == undefined) return message.reply("Tu dois précisez le nouveau pseudo")
            if(mention == undefined) return message.reply("Tu dois précisez le membre")
            

            else{
                mention.setNickname(newpseudo)
                message.reply(`pseudo de ${mention.displayName} as était changé en ${newpseudo}`)
                
            }
        }
    }}
})
  
/////////////////////////////////////////////////////////////////////////////////////// 
/////////////////////////////////////// ping //////////////////////////////////////////

bot.on('message', message => {
    if (message.content === prefix + 'ping') {  
      message.reply(`🏓Pong , Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ws.ping)}ms`);
    }
  });
      
/////////////////////////////////////////////////////////////////////////////////////// 

////////////////////////////////////// avatar /////////////////////////////////////////

bot.on("message", message => {
if(message.content.startsWith(prefix+'avatar')){
    
        
    if(message.mentions.users.size){
        let member=message.mentions.users.first()
    if(member){
        const avatar = new Discord.MessageEmbed().setImage(member.displayAvatarURL()).setTitle(member.username)
        message.channel.send(avatar).catch(err => {
            console.log(err)
        })
        
    }
    else{
        message.channel.send("Sorry none found with that name")

    }
    }else{
        const emb=new Discord.MessageEmbed().setImage(message.author.displayAvatarURL()).setTitle(message.author.username)
        message.channel.send(emb).catch(err => {
            console.log(err)
        })
    }
  }
})
///////////////////////////////////////////////////////////////////////////////////////

bot.on("messageReactionAdd", (reaction, user) => {
    if(reaction.emoji.name === ":notes:"){
        user.send("Perdu")
    }
})
bot.on("message", message => {
    if(message.content === "test")
    message.react(":notes:")
})

/////////////////////////////////////// clear /////////////////////////////////////////

bot.on('message', message => {
    if(message.content.startsWith(prefix + "clear")){
    if(!message.member.hasPermission("MANAGE_MESSAGES"))return message.reply("Tu n'as pas la permission de gérer les message")
    if(message.member.hasPermission("MANAGE_MESSAGES")){
        let args = message.content.split(" ")

        if(args[1] == undefined ){
            message.reply("Nombre non ou mal mentionné");
        }
        else{
            let number = parseInt(args[1]);
            if(isNaN(number)){
                message.reply("Tu dois pécisez un nombre")
            }
            else{
                message.channel.bulkDelete(number).then(messages => {
                    message.reply("Supression de " + number + " message réussi")
                    
                    }).catch(err => {
                        console.log("Erreur de clear : " + err)
                        
                })
            }
        }
    }
 }
})



///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// profil ////////////////////////////////////////

bot.on('message', message => {
    if(message.content.startsWith(prefix + "profil")){
        let args = message.content.split(" ");
        let mention = message.mentions.users.first();
        var author = message.author.username

        if(mention == undefined){
            var profilme = new Discord.MessageEmbed()
            .setColor("#00ffff")
            .setTitle(message.author.username)
            .setDescription("Player name : " + message.author.tag + "\n Alias : " + message.author.username  + "\n Player id : " + message.author.id +  "\n Your avatar")
            .setImage(message.author.displayAvatarURL())
            message.channel.send(profilme)
        }
        else
            if(mention){
            var profil = new Discord.MessageEmbed()
            .setColor("#00ffff")
            .setTitle(message.author.username)
            .setDescription("Player name : " + mention.tag + "\n Alias : " + mention.username  + "\n Player id : " + mention.id +  "\n Avatar of " + mention.username + " : ")
            .setImage(mention.displayAvatarURL())
            message.channel.send(profil)
        }
    }
})

///////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////// musique ////////////////////////////////////////////1

bot.on('message', async message => {
   

     if(message.content === prefix + "playlist"){
        let msg = "** FILE DE LECTURE **\n";
        for(var i = 0;i < list.length;i++){
            let name;
            await  ytdl.getInfo(list[i], (err, info) => {
                if(err){
                    console.log("erreur d lien " + err);
                    list.splice(i, 1);
                }
                else{
                    name = list[i]
                }
            })
            msg += ">" + i + " _ " + name + "\n"
        }
        message.channel.send(msg)
    }

    else if(message.content.startsWith(prefix + "play")){
        if(!message.member.voice.channel.name === musicchannel ) return message.channel.send("tu n'es pas sur le bon salon musicale")
        if(message.member.voice.channel.name ===  musicchannel ){
            let args = message.content.split(" ");

          if(args[1] == undefined || !args[1].startsWith("https://www.youtube.")){
              message.reply("Lien non ou mal envoyé")
          }
          else{
              if(list.length > 0 ){
                  list.push(args[1]);
                  message.reply("vidéo ajouté à la liste.")
                
              }
              else{
                  list.push(args[1]);
                  message.reply("Vidéo mise à la lecture.")

                  message.member.voice.channel.join().then(connection => {

                    playmusic(connection);

                    bot.on("message", message => {
                        if(message.content === prefix + "leave"){
                            connection.disconnect();
                            connection.dispatcher.destroy();
                            list = []
                            message.channel.send("music bot leave")

                        }
                    })
                    
                    bot.on("message", message => {
                        if(message.content === prefix + "pause"){
                            connection.dispatcher.pause();
                            message.channel.send("music paused, send resume for relaunch music")

                        }
                    })

                    bot.on("message", message => {
                        if(message.content === prefix + "resume"){
                            connection.dispatcher.resume();
                            connection.play(ytdl(list[0]))
                            message.channel.send("music relaunch")

                        }
                    })

                    bot.on("message", message => {
                        if(message.content === prefix + "skip"){
                            list.shift();
                            playmusic(connection)
                            message.channel.send("music skipped")

                        }
                    })


                    
                  }).catch(err => {
                      console.log("erreur" + err)
                  })
              }
          }
        }
    }
})


function playmusic(connection){
    let dispatcher = connection.play(ytdl(list[0], {quality: "highestaudio" }));

    dispatcher.on("finish", () => {
        if(loop === "nul"){
            list.shift();
            dispatcher.destroy();

            if(list.length > 0 ){
                playmusic(connection)
            }
            else{
                connection.disconnect();
            }
        }
        else{
            playmusic(connection)
        }
        
    })
    dispatcher.on('error', () => {
        console.log('erreur de dispatcheur' + err);
        dispatcher.destroy();
        dispatcher.disconnect();
    })
}
///////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////// config musique /////////////////////////////////////////


/////////////////////////////// boucle / unloop/////////////////////////////////////////
bot.on('message', message => {
    if(message.content.startsWith(prefix + "loop")){
        let args = message.content.split(" ");
    message.channel.send(message.author.username + " as mis la lecture de " + list[0] + " à joué en boucle", loop = "true")
            
    }
})
bot.on('message', message =>  {
    if(message.content === prefix + "unloop")
    message.channel.send(message.author.username + " a supprimé la boucle", loop = "nul")
})

///////////////////////////////////////////////////////////////////////////////////////

/////////////////////musique channel //////////////////////////////////////////////////
 
 bot.on('message', message => {
    if(message.content.startsWith(prefix + "setmusicchannel")){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Tu nas pas la permission de définir un salon musique") 
        let args = message.content.split(" ")
        let newchannel = args[1]

        if(newchannel == undefined) return message.reply ("Tu dois définir le  nom du nouveau salon musique")

        else{
            message.reply("Tu as définis le salon : " + newchannel + " comme salon de musique", musicchannel = newchannel)

        }
    }
})

bot.on('message', message => {
    if(message.content.startsWith(prefix + "setradiochannel")){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Tu nas pas la permission de définir un salon musique") 
        let args = message.content.split(" ")
        let newchannel = args[1]

        if(newchannel == undefined) return message.reply ("Tu dois définir le  nom du nouveau salon musique")

        else{
            message.reply("Tu as définis le salon : " + newchannel + " comme salon de musique", radio = newchannel)

        }
    }
})
///////////////////////////////////////////////////////////////////////////////////////

/

///////////////////////////////////////////////////////////////////////////////////////



////////////           /\             / / /                 /           /\
//         /          /  \            /     /                          /  \
//         /         /    \           /        /                      /    \     
////////////        /      \          /           /         /        /      \
///                /        \         /           /         /        \      /   
//  /             /==========\        /        /            /         \    /
//     /         /            \       /      /              /          \  /
//        /     /              \      / / /                 /           \/



///////////////////////////// radio chill /////////////////////////////////////////////
bot.on('message', message => {
    if(message.content.startsWith(prefix + "radio chill"))
    if(message.member.voice.channel){
        if(!message.member.voice.channel.name === radio) return message.channel.send("tu n'es pas sur le bon salon musicale")
        if(message.member.voice.channel.name === radio){
            message.member.voice.channel.join().then(connection => {
                let args = message.content.split(" ");
                
                let dispatcher =connection.play(ytdl("https://www.youtube.com/watch?v=5yx6BWlEVcY", { quality: "highestaudio"}));
            
                bot.on("message", message => {
                    if(message.content === prefix + "leave"){
                        connection.disconnect();
                        connection.dispatcher.destroy();
                        message.channel.send("music stopped, bot leave channel")

                    }
                })
                
                bot.on("message", message => {
                    if(message.content === prefix + "pause"){
                        connection.dispatcher.pause();
                        message.channel.send("music paused, send resume for relaunch music")

                    }
                })

                bot.on("message", message => {
                    if(message.content === prefix + "resume"){
                        connection.dispatcher.resume();
                        connection.play(ytdl("https://www.youtube.com/watch?v=5yx6BWlEVcY"))
                        message.channel.send("music relaunch")

                    }
                })



                dispatcher.on('finish', () => {
                    dispatcher.destroy();
                });

                dispatcher.on("error", err => {
                    console.log("erreur de dispatcher : " + err);
                })
            }).catch(err => {
                message.reply("erreur pour se connecté")
            })
        }
    }
    else {
        message.reply("Vous n'êtes pas dans un serveur vocale")
    }
})

///////////////////////////////////////////////////////////////////////////////////////

///////////////////////////// radio techno /////////////////////////////////////////////
bot.on('message', message => {
    if(message.content.startsWith(prefix + "radio techno"))
    if(message.member.voice.channel){
        if(!message.member.voice.channel.name === radio) return message.channel.send("tu n'es pas sur le bon salon musicale")
        if(message.member.voice.channel.name === radio){
            message.member.voice.channel.join().then(connection => {
                let args = message.content.split(" ");
                
                let dispatcher =connection.play(ytdl("https://www.youtube.com/watch?v=6Irus3d5f0E", { quality: "highestaudio"}));
            

                bot.on("message", message => {
                    if(message.content === prefix + "leave"){
                        connection.disconnect();
                        connection.dispatcher.destroy();
                        message.channel.send("music stopped, bot leave channel")

                    }
                })
                
                bot.on("message", message => {
                    if(message.content === prefix + "pause"){
                        connection.dispatcher.pause();
                        message.channel.send("music paused, send resume for relaunch music")

                    }
                })

                bot.on("message", message => {
                    if(message.content === prefix + "resume"){
                        connection.dispatcher.resume();
                        connection.play(ytdl("https://www.youtube.com/watch?v=6Irus3d5f0E"))
                        message.channel.send("music relaunch")

                    }
                })


                dispatcher.on('finish', () => {
                    dispatcher.destroy();
                });

                dispatcher.on("error", err => {
                    console.log("erreur de dispatcher : " + err);
                })
            }).catch(err => {
                message.reply("erreur pour se connecté")
            })
        }
    }
    else {
        message.reply("Vous n'êtes pas dans un serveur vocale")
    }
})

///////////////////////////////////////////////////////////////////////////////////////

///////////////////////////// radio electro /////////////////////////////////////////////
bot.on('message', message => {
    if(message.content === prefix + "radio electro")
    if(message.member.voice.channel){
        if(!message.member.voice.channel.name === radio) return ("tu n'es pas sur le bon salon musicale")
        if(message.member.voice.channel.name === radio){
            message.member.voice.channel.join().then(connection => {
                let args = message.content.split(" ");
                
                let dispatcher =connection.play(ytdl("https://www.youtube.com/watch?v=O-y3Obie94U", { quality: "highestaudio"}));
                
                bot.on("message", message => {
                    if(message.content === prefix + "leave"){
                        connection.disconnect();
                        connection.dispatcher.destroy();
                        message.channel.send("music stopped, bot leave channel")

                    }
                })
                
                bot.on("message", message => {
                    if(message.content === prefix + "pause"){
                        connection.dispatcher.pause();
                        message.channel.send("music paused, send resume for relaunch music")

                    }
                })

                bot.on("message", message => {
                    if(message.content === prefix + "resume"){
                        connection.dispatcher.resume();
                        connection.play(ytdl("https://www.youtube.com/watch?v=O-y3Obie94U"))
                        message.channel.send("music relaunch")

                    }
                })


                dispatcher.on('finish', () => {
                    dispatcher.destroy();
                });

                dispatcher.on("error", err => {
                    console.log("erreur de dispatcher : " + err);
                })
            }).catch(err => {
                message.reply("erreur pour se connecté")
            })
        }
    }
    else {
        message.reply("Vous n'êtes pas dans un serveur vocale")
    }
})

///////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////// prefix //////////////////////////////////////////////

bot.on('message', message => {
    if(message.content.startsWith(prefix + "prefix")){
                let args = message.content.split(" ")
                let newpref = args[1]

               if(newpref == undefined) return message.channel.send("Veuillez préciser le nouveau prefix")
               
               else
        message.channel.send(`le prefix à bien était changé , c'est maintenant: ${args[1]}`, prefix = args[1])
    }

})
///////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////// help //////////////////////////////

bot.on("message", message => {
    if(message.content === prefix + "help")



    var help = new Discord.MessageEmbed()

    .setColor("#03fcf4")
    .setTitle("all Command")
    .setDescription( "**Modérations**" + "```ban``` ```mute``` ```unmute``` ```kick``` " + "**tool : ** ```nickname ``` ```serverinfo``` ```botinfo``` ```ping``` ```avatar``` ```clear``` ```profil```  " + "**Musique : ** " + "```play + URL``` ```radio + (chill,techno , elctro (more comming))``` ```volume(soon)``` ```skip``` ```pause``` ```playlist(bug)``` ```resume``` ```loop``` ```leave``` ```24/7 (soon , buy for it)```" + " ```For defined music channel read setmusicchannel in chat ```" + "**Fun : ** ```snake``` ```site``` "    )

  message.channel.send(help).catch(err => {
      console.log("erreur de message" + err)
  })
})

///////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////// si //////////////////////////////////////////

bot.on("message", message => {
    if(message.content === prefix + "serverinfo")

    var si = new Discord.MessageEmbed()

    .setColor("#03fcf4")
    .setTitle("INFO ABOUT A SERVER")
    .setDescription("Name of serv : " + message.member.guild.name + "\n" + "Created at : " + message.member.guild.createdAt + "\n" + "by : " + message.member.guild.owner.displayName + "\n" + "This serv is : " + typeserv + " server" + "\n Icon of serv : " )
    .setImage(message.guild.iconURL())

    message.channel.send(si).catch(err => {
        console.log("erreur de message embed si" + err)
    })
})
///////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////// bi //////////////////////////////////////////

bot.on("message", message => {
    if(message.content === prefix + "botinfo")

    var bi = new Discord.MessageEmbed()

    .setColor("#03fcf4")
    .setTitle("INFO ABOUT A TKLT BOT")
    .setDescription("TKLT bot has created at 20/04/2021 in french by TKLT_CatChef, \n _This bot is designed for open acces_. \n **About TKLT** : TKLT is a team created by TKLT_CatChef. This team create with TKLT_CatChef and Dady TKLT_Sy55ou. For add bot in your server go to the link below : \n ****")
    
    message.channel.send(bi).catch(err => {
        console.log("erreur bot emebed" + err)
    })
})
///////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// rule /////////////////////////////////////////

bot.on("message", message => {
    if(message.content === prefix + "rules")

    var Rules = new Discord.MessageEmbed()

    .setColor("#03fcf4")
    .setTitle("Rules of TKLT server")
    .setDescription("**HEY** \n _Bienvenyue à toi dans le serveur officiel de la team TKLT ._ \n Dans ce serveur tu peux rencontrer des joueurs pour jouer à  plein de jeux différents, ou bien parler de manga avec d'autres fan. **Avant tout : **, \n ```Tu dois être respectueux```  ```ne pas trash talk``` ```ici pas de racisme``` ```de sexisme et tout ce qui finis par isme.``` **Sinon tu seras sanctionné !!!**\n Je tiens à précisez que les temps de sanctions sont varié , celon l'erreur commise..\n **bot : ** Sur ce serveur tu pourras aussi sugérer des ajout à faire à notre bot discord , qui est bien en open acces . Pour l'ajouter à votre serveur rendez vous dans le salon bot puis faites la commande /invit. \n ```Je vous souhaite de passer un bon moment au sein de notre serveur```")
    
    message.channel.send(Rules).catch(err => {
        console.log("erreur bot emebed" + err)
    })
})

///////////////////////////////////////////////////////////////////////////////////////

function SaveBdd() {
    fs.writeFile("./db/BDD.json", JSON.stringify(BDD, null, 4), (err) => {
        if(err) message.channel.send("Une erreur est surevenue " + err);
    });
}

bot.login(token)
