const fs = require('fs')
const getFiles = require('./get-files')
require('dotenv/config')

module.exports = async (client) => {
    const commands = {}
    const suffix = '.js'

    let aliases = []
    
    fs.readFile("aliases.txt", "utf8", (err, data) => {
        if(err) console.log("biffed it")
        commandaliases = data.split("\r\n")
        //console.log(commandaliases.length)
        for(x = 0; x < commandaliases.length; x++) {
            aliases.push(commandaliases[x].split("-"))
        }

        //console.log(aliases)

        const commandFiles = getFiles(`./commands`, suffix)
    //console.log(commandFiles)

        for (const command of commandFiles) {
            let commandFile = require(command)
            if(commandFile.default) commandFile = commandFile.default

            const split = command.replace(/\\/g, '/').split('/')
            const commandName = split[split.length - 1].replace(suffix, '')

            isEntered = false;

            for (x = 0; x < aliases.length; x++) {
                if(aliases[x][0] == commandName) {
                    isEntered = true;
                    for (y = 0; y < aliases[x].length; y++) {
                        commands[aliases[x][y].toLowerCase()] = commandFile
                    }
                }
            }

            if (!isEntered) commands[commandName.toLowerCase()] = commandFile
        }
    })

    //console.log(commands)

    client.on('messageCreate', (message) => {

        if (!message.author.bot && message.content.toLowerCase().includes("joe")) {
            //message.channel.send("Joe Mama.")
            message.react('<a:letterj:1172555936381030521>')
			.then(() => message.react('<a:lettero:1172555962645745724>'))
			.then(() => message.react('<a:lettere:1172555971751583916>'))
            .then(() => message.react('<:vibesus:979177529917177896>'))
            .then(() => message.react('<a:letterm:1172555978382770217>'))
            .then(() => message.react('<a:lettera:1172555984191885343>'))
            .then(() => message.react('<a:letterm2:1172555991431270491>'))
            .then(() => message.react('<a:lettera2:1172555997169070172>'))
        }

        if (message.author.bot || !message.content.startsWith(process.env.prefix)) {
            return
        }

        //console.log(message.author.username, ": ", message.content)

        const args = message.content.slice(1).split(/ +/)
        //console.log(args)
        const commandName = args.shift().toLowerCase()

        if (!commands[commandName]) {
            return
        }

        console.log(message.author.username, ": ", message.content)

        try {
            commands[commandName].callback(message, args, client)
        } catch (error) {
            console.error(error)
        }
    })
}