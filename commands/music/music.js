const { EmbedBuilder } = require("discord.js")

module.exports = {
    callback: (message, args, client) => {

        const embed = new EmbedBuilder()
        .setTitle(`Music Commands`)
        .setColor('#5cfa58')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({
            iconURL: client.user.displayAvatarURL(),
            text: 'Stan Silver The Hedgehog or get cancelled'
        })
        .setTimestamp()
        .addFields([
            {
                name: '£play / £p (search terms / link)',
                value: `Adds vibes to be played`,
                inline: false
            },
            {
                name: '£pause / £pkfreeze',
                value: `Pauses/Unpauses the current vibes`,
                inline: false
            },
            {
                name: '£queue / £q (page)',
                value: `Shows the vibe queue`,
                inline: false
            },
            {
                name: '£playing',
                value: `Shows the current vibe`,
                inline: false
            },
            {
                name: '£stop / £kill',
                value: `Stops the vibes...`,
                inline: false
            },
            {
                name: '£volume / £vol / £v (0-100, default 50)',
                value: `adjusts the volume`,
                inline: false
            },
            {
                name: '£skip / £sk / £previous / £prev',
                value: `Gets the next / previous vibe`,
                inline: false
            },
            {
                name: '£seek (H:M:S)',
                value: `Skip to a point in the current vibe`,
                inline: false
            },
            {
                name: '£shuffle / £sh',
                value: `Shuffles the queue`,
                inline: false
            },
            {
                name: '£loop (off / song / queue)',
                value: `Loops the vibes`,
                inline: false
            },
            {
                name: '£rips / £vibes / £siiva (amount)',
                value: `Let all hell break loose. Plays random siiva playlists`,
                inline: false
            },
        ])

        message.channel.send({
            embeds: [embed]
        })
    }
}