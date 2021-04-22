var Discord = require("discord.js")
var token = "NzQwNTM5ODM4MjYzOTg0MjI4.XyqfeA.A2xYGUofdWysOsCRSZlswqZvO6A"
var bot = new Discord.Client
var prefix = "/"
const ytdl = require("ytdl-core")
var musicchannel = "Général"
var loop = "nul"
var list = []



bot.on("ready", pret =>{
    console.log("TKLTbot demarré")
    
})


///////////////////////////////////////// ban /////////////////////////////////////////
bot.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return message.channel.send("Vous n'etes pas sur un serveur")
    if(message.content.startsWith(prefix + "ban")){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Seul les Admin peuveut ban.")
        if(message.member.hasPermission("ADMINISTRATOR")) {
        
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
    }
})

///////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// kick /////////////////////////////////////////

bot.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return message.channel.send("Tu peux pas utiliser cette fonction en mp")
    if(message.content.startsWith(prefix + "kick")){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Seul les Admin peuveut kick")
        if(message.member.hasPermission("ADMINISTRATOR")){
        
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
    }
})

///////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// mute /////////////////////////////////////////

bot.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return message.channel.send("Tu peux utiliser cette fonction uniquement sur des serveurs")
    if(message.content.startsWith(prefix + "mute")){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Seul les Admin peuveut mute")
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
    }
})
///////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////// unmute ////////////////////////////////////////

bot.on('message', message => {
    if(message.author.bot) return;
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
                        if(message.content === prefix + "stop"){
                            list = []
                            connection.dispatcher.destroy();
                            message.channel.send("music stopped")

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
        if(!message.member.voice.channel.name === "Général") return message.channel.send("tu n'es pas sur le bon salon musicale")
        if(message.member.voice.channel.name === "Général"){
            message.member.voice.channel.join().then(connection => {
                let args = message.content.split(" ");
                
                let dispatcher =connection.play(ytdl("https://www.youtube.com/watch?v=5yx6BWlEVcY", { quality: "highestaudio"}));
            
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
        if(!message.member.voice.channelID === "831853848850595854") return message.channel.send("tu n'es pas sur le bon salon musicale")
        if(message.member.voice.channelID === "831853848850595854"){
            message.member.voice.channel.join().then(connection => {
                let args = message.content.split(" ");
                
                let dispatcher =connection.play(ytdl("https://www.youtube.com/watch?v=6Irus3d5f0E", { quality: "highestaudio"}));
            
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
        if(!message.member.voice.channel.name === "Général") return ("tu n'es pas sur le bon salon musicale")
        if(message.member.voice.channel.name === "Général"){
            message.member.voice.channel.join().then(connection => {
                let args = message.content.split(" ");
                
                let dispatcher =connection.play(ytdl("https://www.youtube.com/watch?v=O-y3Obie94U", { quality: "highestaudio"}));
            
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
    .setDescription( "**Modérations**" + "```ban``` ```mute``` ```unmute``` ```kick``` " + "**Musique : ** " + "```play + URL``` ```radio + (chill,techno , elctro (more comming))``` ```volume(soon)``` ```pause(added)``` ```playlist(bug)``` ```resume(added)``` ```loop``` ```stop``` ```leave``` ```24/7 (buy for it)```" + " ```For defined music channel read setmusicchannel in chat ```" + "**Fun : ** ```game in chat coming soon``` "  + "**tool : ** ```tool for admin coming soon ```"  )

  message.channel.send(help).catch(err => {
      console.log("erreur de message" + err)
  })
})


bot.on('message', message => {
    if(message.content === "bot test")
    message.channel.send("https://discord.com/api/oauth2/authorize?client_id=740494635184422914&permissions=0&scope=bot")
})
bot.login(token)
