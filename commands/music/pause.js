module.exports = {
    callback: (message, args, client) => {
        const vc = message.member.voice.channel
        if(!vc) return message.channel.send("*No VC?*")

        const queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send("No vibes to pause")
        try {
            client.distube.pause(message);
            message.channel.send("Vibes paused");
        } catch (e) {
            client.distube.resume(message);
            return message.channel.send("Vibes unpaused");
        }
    }
}