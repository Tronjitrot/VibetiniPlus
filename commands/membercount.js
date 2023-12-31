module.exports = {
    callback: async(message, args, client) => {
        var count = 0
        members = await message.guild.members.cache
        members.each(r => {
            count += 1
        })

        message.channel.send("Members: " + count)
    }
}