const { Guild, GuildMember } = require("discord.js")

module.exports = {
    callback: async(message, args, client) => {
        var ping = ""

        if(args.length === 0){
            ping = message.author.toString()
        }
        else {
            input = args.join(" ")
            if(input === "everyone" || input === "@everyone"){
                ping = "@everyone"
            } else {
                members = await message.guild.members.cache
                members.every(r => {
                    const name = r.user.username
                    const nick = r.nickname
                    //console.log("name: " + name + " | nick: " + nick)
                    if((nick != null && nick.toLowerCase().includes(input))
                    || (name.toLowerCase().includes(input))){
                        ping = r.user.toString() 
                        return false  
                    } else return true
                })
            }
        }


        if(ping != ""){
            message.channel.send(ping);
            for (var i = 0; i < Math.floor(Math.random() * 30) + 8; i++)
            {
                setTimeout(function(){  
                    message.channel.send(ping)
                }, Math.floor(Math.random() * 30000));
            }
        }
        else{
            message.channel.send("Whomst")
            console.log("failed")
        }
    }
}