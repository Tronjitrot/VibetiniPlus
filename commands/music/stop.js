const { EmbedBuilder } = require('discord.js')

k0 = "See you, space cowboy..."
k1 = "I am ded, not big soup rice"
k2 = "How dare"
k3 = "Here lies me: died of ligma"
k4 = "Watchmojo.com top 10 Last Words Before Death in Movies"
k5 = "No more vibes, now go touch grass"
k6 = "Et tu, Brute?"
k7 = "ass" //this causes the grass image to appear.
k8 = "It's no use! This'll end it! *dies of cringe*"
k9 = "SQUID GAMES❗❗"
k10 = "jimbo" //jimbo image
k11 = "vore" //god

const killList = [k0, k1, k2, k3, k4, k5, k6, k7, k8, k9, k10, k11]

module.exports = {
    callback: (message, args, client) => {
        const input = args.join(" ")
        const vc = message.member.voice.channel
        if(!vc) return message.channel.send("*No VC?*")

        const queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send('No Vibes to kill')

        const deathMessageEvent = () => {
            var killNumber = Math.floor(Math.random() * killList.length)
            console.log("message " + killNumber)
            if (killList[killNumber] == "ass")
                {
                    const embed = new EmbedBuilder().setImage('https://cdn.discordapp.com/attachments/452432724607893504/917966914662322206/meme.png') 
                    message.channel.send({
                        embeds: [embed]
                    })
                }
                else if (killList[killNumber] == "jimbo")
                {
                    const embed = new EmbedBuilder().setImage('https://cdn.discordapp.com/attachments/447004266717118474/960208448786690108/unknown.png') 
                    message.channel.send({
                        embeds: [embed]
                    })
                }
                else if (killList[killNumber] == "vore")
                {
                    const embed = new EmbedBuilder().setImage('https://64.media.tumblr.com/2658fe8736e6f74838afce0f11abc88f/f1371c9393e6bd40-34/s540x810/a6de74a902695d5584eee0e6597ec35604d2bbe8.pnj')
                    message.channel.send({
                        embeds: [embed]
                    })
                }
                else
                {
                    message.channel.send(killList[killNumber])
                }
                client.distube.off('disconnect', deathMessageEvent)
        }
        if(client.distube.listenerCount('disconnect') == 0) {
            client.distube.on('disconnect', deathMessageEvent)
        }

        client.distube.options.leaveOnStop = true
        client.distube.stop(message)
    }
}