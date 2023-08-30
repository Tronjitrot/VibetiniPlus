module.exports = {
    callback: (message, args, client) => {
        if(!args[0] && message.attachments.size == 0) return message.channel.send("What 2 play?")

        const vc = message.member.voice.channel
        if(!vc) return message.channel.send("*No VC?*")

        client.iskill = false

        if(args[0]){
            const input = args.join(" ")
            try{
                client.distube.play(vc, input, {
                    member: message.member,
                    textChannel: message.channel,
                    message
                })
            } catch(e){
                console.log("error happened")
                this.callback(message, args, client)
            }
        }

        if(message.attachments.size > 0){
            message.attachments.forEach(Attachment => {
                playsong(client, message, vc, `${Attachment.url}`)
            })
        }
    }
}

function playsong (client, message, vc, input) {
    try{
        client.distube.play(vc, input, {
            member: message.member,
            textChannel: message.channel,
            message
        })
    } catch(e){
        console.log("error happened")
        console.log(input)
    }
}