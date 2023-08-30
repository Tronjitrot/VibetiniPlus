module.exports = {
    callback: (message, args, client) => {
        const vc = message.member.voice.channel
        if(!vc) return message.channel.send("*No VC?*")

        const queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send("Nothing to skip")

        if (queue.songs.length <= 1)  { return message.channel.send(`This is the last vibe.`) }
        client.distube.skip(message)
    }
}