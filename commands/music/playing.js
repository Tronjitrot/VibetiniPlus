const { EmbedBuilder } = require("discord.js")

module.exports = {
    callback: (message, args, client) => {
        const vc = message.member.voice.channel
        if(!vc) return message.channel.send("*No VC?*")

        const queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send('*Megamind Voice*: "No Vibes?"')
        if(queue.songs.length <= 0) return message.channel.send('*Megamind Voice*: "No Vibes?"')

        const q = queue.songs

        const embed = new EmbedBuilder()
        .setTitle(`Current Vibes`)
        .setColor('#5cfa58')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({
            iconURL: client.user.displayAvatarURL(),
            text: 'Stan Silver The Hedgehog or get cancelled'
        })
        .setTimestamp()
        .addFields([
            {
                name: 'The Vibe:',
                value: `[${q[0].name}](${q[0].url}) - ${q[0].formattedDuration}`,
                inline: false
            }
        ])

        message.channel.send({
            embeds: [embed]
        })
    }
}