const { EmbedBuilder } = require("discord.js")
const google = require('googlethis')

module.exports = {
    callback: async (message, args, client) => {
        const command = message.content.split(" ")[0]
        var input = args.join(" ")
        var title = input
        var custom = false
        if (command == "£silver")
        {input = "silver the hedgehog", custom = true, title = "SILVOR"}
        if (command == "£shadow")
        {input = "shadow the hedgehog", custom = true, title = "Shadow The Edgehog"}

        
        if(!args[0] && !custom){
            return message.channel.send("£search (thing)")
        }

        const images = await google.image(input, {
            safe: false
        })
        //console.log(images[Math.floor(Math.random() * 100)].url)
        var image = images[Math.floor(Math.random() * 100)].url
        while (true){
            if(image.endsWith(".png") || image.endsWith(".jpg")){break;}
            else image = images[Math.floor(Math.random() * 100)].url
        }
        console.log(image)

        const embed = new EmbedBuilder()
        .setTitle(title)
        .setColor('#5cfa58')
        //.setThumbnail(client.user.displayAvatarURL())
        .setImage(image)
        .setFooter({
            iconURL: client.user.displayAvatarURL(),
            text: 'Stan Silver The Hedgehog or get cancelled'
        })
        .setTimestamp()
        /*.addFields([
            {
                name: '£music',
                value: `Music commands`,
                inline: false
            },
        ])*/

        message.channel.send({
            embeds: [embed]
        })

    }
}