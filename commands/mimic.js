module.exports = {
    callback: async (message, args, client) => {
        const command = message.content.split(" ")[0].toLowerCase()
        if (command == "£themimic") {message.delete()}
        sent = await message.channel.send(args.join(" "))
        sent.react('<a:THEMIMIC:1191133598833709106>')
    }
}