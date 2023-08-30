const { EmbedBuilder } = require("discord.js")

module.exports = {
    callback: (message, args, client) => {
        const vc = message.member.voice.channel
        if(!vc) return message.channel.send("*No VC?*")

        const queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send('*Megamind Voice*: "No Vibes?"')
        if(queue.songs.length <= 0) return message.channel.send('*Megamind Voice*: "No Vibes?"')

        const q = queue.songs
        page = (args[0] * 1) - 1
        if(!args[0] || page < 0) page = 0
        const startPoint = 10 * page
        const endPoint = (10 * page) + 11

        const embed = new EmbedBuilder()
        .setTitle(`Queue Page ${page + 1}`)
        .setColor('#5cfa58')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({
            iconURL: client.user.displayAvatarURL(),
            text: 'Stan Silver The Hedgehog or get cancelled'
        })
        .setTimestamp()
        .addFields([
            {
                name: 'Current:',
                value: `[${q[0].name}](${q[0].url}) - ${q[0].formattedDuration}`,
                inline: false
            }
        ])

        if (endPoint > q.length) {
            for(i = startPoint + 1; i < q.length; i++){
                embed.addFields([
                    {
                        name: `${i}:`,
                        value: `[${q[i].name}](${q[i].url}) - ${q[i].formattedDuration}`,
                        inline: false
                    }
                ])
            }
        } else {
            for(i = startPoint + 1; i < endPoint; i++){
                embed.addFields([
                    {
                        name: `${i}:`,
                        value: `[${q[i].name}](${q[i].url}) - ${q[i].formattedDuration}`,
                        inline: false
                    }
                ])
            }

        }

        message.channel.send({
            embeds: [embed]
        })
    }
}