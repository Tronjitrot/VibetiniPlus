module.exports = {
    callback: (message, args, client) => {
        const vc = message.member.voice.channel
        if(!vc) return message.delete()

        const queue = client.distube.getQueue(message)
        if(!queue) return message.delete()
        const volume = parseInt(args[0])
        if (isNaN(volume)) return message.delete()
        if (volume < 0) return message.delete()
        queue.setVolume(volume * 100)
        message.channel.send(`Lol, said vibetini, Lmao`)
        message.delete()
    }
}