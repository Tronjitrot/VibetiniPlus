const { Client, GatewayIntentBits } = require('discord.js')
require('dotenv/config')

const express = require('express')
const axios = require('axios')

const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin} = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

const fs = require("fs")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
    ],
})

client.distube = new DisTube(client, {
    leaveOnFinish: true,
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: true,
    emitAddListWhenCreatingQueue: true,
    youtubeCookie: JSON.parse(fs.readFileSync("cookie.json")),
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ]
})

client.app = express()
client.baseurl = 'https://www.googleapis.com/youtube/v3'
client.api = 'AIzaSyA6UCx3q0D23qj5NN_DUr2mRCuUq5o23vU'
client.port = 3000

client.iskill = false;

//https://www.googleapis.com/youtube/v3/search?key=AIzaSyA6UCx3q0D23qj5NN_DUr2mRCuUq5o23vU&type=playlist&part=snippet&q=foo

client.on('ready', () => {
    let handler = require(`./command-handler`);
    if (handler.default) handler = handler.default;
    handler(client)

    client.user.setActivity('Ultimate Vibes! (£)', { type: 2 });

    client.app.listen(client.port, () => {
        //console.log('API Online')
    })

    console.log('Epic Gamer Moment. (also bot online i guess)');

    client.distube.on("addList", (queue, playlist) => {
        if(client.iskill) return //client.iskill = false
        queue.textChannel.send(`\`${playlist.name} (${playlist.songs.length} songs)\` added to the vibe queue!`);
    });
    
    client.distube.on("addSong", (queue, song) => {
        if(client.iskill) return //client.iskill = false 
        queue.textChannel.send(`\`${song.name} - ${song.formattedDuration}\` added to the vibe queue!`);
    });
})

client.login(process.env.token);