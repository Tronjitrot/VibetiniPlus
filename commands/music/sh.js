module.exports = {
    callback: (message, args, client) => {
        const vc = message.member.voice.channel
        if(!vc) return message.channel.send("*No VC?*")

        const queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send("Nothing to shuffle")

        queue.shuffle()
        message.channel.send("Vibes Randomized")
    }
}