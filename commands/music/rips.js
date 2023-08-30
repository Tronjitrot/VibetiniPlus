const fs = require('fs')

module.exports = {
    callback: async (message, args, client) => {
        const vc = message.member.voice.channel
        if(!vc) return message.channel.send("*No VC?*")
        var input = parseInt(args[0])
        if(isNaN(input)) input = 15
        if(input > 100) return message.channel.send("bls no too many. utube will ban me for ddos ;-;")

        client.iskill = false

        var queue = client.distube.getQueue(message)

        var isqueue = false
        if(!queue) isqueue = true
        
        let current = []

        fs.readFile('playlists.txt', 'utf8', async (err, data) => {
            if(err) return console.error(err)
            if(input > 15) {
                message.channel.send("Damn that's a lot, hold up one sec...")
                client.iskill = true
            } else {
                message.channel.send("Spinning the wheel of vibes...")
            }
            var items = data.split(' - ')
            //console.log(items.length)
            for(x = 0; x < input;) {
                selection = Math.floor(Math.random() * items.length)
                if(!current.includes(selection)){
                    await client.distube.play(vc, items[selection], {
                        member: message.member,
                        textChannel: message.channel,
                        message
                    })
                    current.push(selection)
                    x++
                }
            }

            const liveandlearn = "https://www.youtube.com/playlist?list=PLXy1Q40n0K0hfQk107B0QQ69PjrWRYN5Q"

            client.iskill = true

            if(isqueue) {
                await client.distube.play(vc, liveandlearn, {
                    member: message.member,
                    textChannel: message.channel,
                    message
                })
            }

            client.iskill = false

            queue = client.distube.getQueue(message)
            queue.shuffle()

            if(input > 15) {
                message.channel.send("Phew, all done. enjoy the chaos.")
            } else {
                message.channel.send("Enjoy the chaos <3")
            }
        })
    }
}