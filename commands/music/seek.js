const { EmbedBuilder, time } = require("discord.js")

module.exports = {
    callback: (message, args, client) => {
        const vc = message.member.voice.channel
        if(!vc) return message.channel.send("*No VC?*")

        const queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send('No vibe to seek through')

        if(!args[0]) return message.channel.send('I need a time to seek to. £seek (seconds/minutes:seconds/hours:minutes:seconds')

        const timesplit = args[0].split(':').reverse()
        console.log(timesplit)

        let time = 0

        if(timesplit.length > 3) return message.channel.send("How tf are you listening to something multiple days long?")
        
        const seconds = Number(timesplit[0])
        if (isNaN(seconds)) return message.channel.send(`Numbers only bls`)
        if (seconds < 0) return message.channel.send('no')
        time = time + seconds

        if (timesplit.length >= 2){
            const minutes = Number(timesplit[1])
            if (isNaN(minutes)) return message.channel.send('Numbers only bls')
            if (minutes > 59 || minutes < 0) return message.channel.send("die")
            time = time + (minutes * 60)
        }

        if (timesplit.length === 3)
        {
            const hours = Number(timesplit[2])
            if (isNaN(hours)) return message.channel.send('Numbers only bls')
            if (hours < 0) return message.channel.send("perish")
            time = time +((hours * 60) * 60)
        }

        queue.seek(time)
    }
}