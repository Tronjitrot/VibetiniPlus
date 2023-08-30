module.exports = {
    callback: (message, args, client) => {
        const vc = message.member.voice.channel
        if(!vc) return message.channel.send("*No VC?*")

        const queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send("The silence grows ever louder")
        const volume = parseInt(args[0])
        if (isNaN(volume)) return message.channel.send(`£vol 0-100`)
        if (volume < 0 || volume > 100) return message.channel.send(`£vol 0-100`)
        queue.setVolume(volume)
        message.channel.send(`Volume set to ${volume}%`)
        if(volume === 69) message.channel.send("nice")
    }
}