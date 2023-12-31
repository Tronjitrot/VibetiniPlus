const { EmbedBuilder } = require("discord.js")

module.exports = {
    callback: (message, args, client) => {

        const embed = new EmbedBuilder()
        .setTitle(`Commands`)
        .setColor('#5cfa58')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({
            iconURL: client.user.displayAvatarURL(),
            text: 'Stan Silver The Hedgehog or get cancelled'
        })
        .setTimestamp()
        .addFields([
            {
                name: '£music',
                value: `Music commands`,
                inline: false
            },
            {
                name: '£ping',
                value: `idk how to play this game`,
                inline: false
            },
            {
                name: '£marco / £marko',
                value: `idk how to play this one either`,
                inline: false
            },
            {
                name: '£mrping (user)',
                value: `funni`,
                inline: false
            },
            {
                name: '£search (prompt) / £silver / £shadow',
                value: `Ok Google, Show me funny monkey`,
                inline: false
            },
            {
                name: '£mimic (prompt)',
                value: `just like from`,
                inline: false
            },
        ])

        message.channel.send({
            embeds: [embed]
        })
    }
}