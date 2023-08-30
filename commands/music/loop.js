const { EmbedBuilder } = require("discord.js")

module.exports = {
    callback: (message, args, client) => {
        const vc = message.member.voice.channel
        if(!vc) return message.channel.send("*No VC?*")

        const queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send('No Vibes to loop')

        let mode = undefined
        switch (args[0].toLowerCase()) {
            case 'off':
                mode = 0
                break
            case 'song':
                mode = 1
                break
            case 'queue':
                mode = 2
                break
        }
        if (mode === undefined) return message.channel.send("How should i loop? £loop off/song/queue")
        queue.setRepeatMode(mode)
        mode = mode ? (mode === 2 ? 'The queue' : 'this vibe') : 'disabled'
        message.channel.send(`Looping ${mode}`)
    }
}