module.exports = {
    callback: async(message, args, client) => {
        ping = ""
        if(args.length === 0){
            ping = message.author.toString()
        }
        else{
            input = args.join(" ")
            //console.log(input)
            if(input === "everyone" || input === "@everyone"){
                ping = "@everyone"
            }else{
                message.guild.members.cache.every(function(value, key) {
                    const name = value.user.username
                    const nick = value.nickname
                    console.log(nick)
                    if(name.toLowerCase().includes(input)){
                        ping = value.user.toString()
                        return false
                    }else if (nick){
                        if(nick.toLowerCase().includes(input)){
                            ping = value.user.toString()
                            return false
                        }
                    }
                    else return true
                })

            }
        }
        if(ping != ""){
            message.channel.send(ping);
            /*for (var i = 0; i < Math.floor(Math.random() * 30) + 8; i++)
            {
                setTimeout(function(){  
                    message.channel.send(ping)
                }, Math.floor(Math.random() * 10000));
            }*/
        }
        else{
            message.channel.send("Whomst")
            console.log("failed")
        }
    }
}