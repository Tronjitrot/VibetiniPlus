const { Client, GatewayIntentBits } = require('discord.js')
require('dotenv/config')

const express = require('express')
const axios = require('axios')

const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin} = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
})

client.distube = new DisTube(client, {
    leaveOnFinish: true,
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: true,
    emitAddListWhenCreatingQueue: true,
    youtubeCookie: "HSID=AGDYLeYq1sgBltBCM; SSID=Aa9HtnuOt3zFR2UHH; APISID=f1ag8GL-kFUJXGTG/ApEa5dK5bRdBsi-tz; SAPISID=SeFYk7_TRB7x8cRo/AIN9ppukcAi7McbXh; __Secure-1PAPISID=SeFYk7_TRB7x8cRo/AIN9ppukcAi7McbXh; __Secure-3PAPISID=SeFYk7_TRB7x8cRo/AIN9ppukcAi7McbXh; LOGIN_INFO=AFmmF2swRQIgOCKZIgImE87DPgMrTDJoG2HNUc0POuv5sSTXULZIj9oCIQCyevNyx4p_hUsLBArVi7A8gQUGAFog3T355bPB_1oJ5Q:QUQ3MjNmek82Q3AwNll3YTFFNDNTMWhXU0NzZ1BZenRLU1dYWTlydzVmZklaa0hGSnpibC1QNkJ0aVFNS3laNEdLZ01YdnBXeGZVRTFETUN5UGZzckhnWUhPTl9ub25mYUU5QzZkSUwzdFFwZWlMamZKSTlFNTNFaEt2b0ZtWm1jQUFLU2kzY2FCS1FBMGtncE9rWlFMWGZoM1FNNDJVYllB; __Secure-YEC=CgtSRkVOMVJTdEtwdyiinvCdBg==; VISITOR_INFO1_LIVE=0R0vZAF_D-Q; DEVICE_INFO=ChxOekU0TnpRNU9EZzNPVGcxTWpVM01URXpNdz09EKbA/J0GGKbA/J0G; OTZ=6861329_56_56_123900_52_436380; NID=511=fPpInlGFQttEEOuKtkX7Xl4rW3O-Emcgyh4AYz7i1ZdDDmqljmHQLms317M03PsjTseB2pUz_OSAAtztml42BdMfx1M8rtKYE2TNL0440ix8Ty6_lQPHBR6Y3Nh7Nj9SX_OJuy3rFbjwlzGedXKz8Xxdg7I0YI6SH3u4KIm-tDh0l1S9qnOvPDA; _ga=GA1.2.135915213.1674756800; PREF=tz=Europe.London&f4=4000000; SID=TQieVH-oGQFl8Ct27Cu-nNTNl5Q-KPeoJHh1ehRAJHOVb1VsSiRazEkzkAAq5XYJAWNaaQ.; __Secure-1PSID=TQieVH-oGQFl8Ct27Cu-nNTNl5Q-KPeoJHh1ehRAJHOVb1VsUd_ByMQem2_AT1kMQ3TdFA.; __Secure-3PSID=TQieVH-oGQFl8Ct27Cu-nNTNl5Q-KPeoJHh1ehRAJHOVb1VsCD0o26EVGRoeis24sEtnDw.; YSC=-Cf8_4ES6Ro; wide=1; SIDCC=AFvIBn9nOLowr-1RAhRHbzlMDWXrEBNn9VbBhU7da2STLjeerlJgqAxQP9Y-Azt5G-G_gutKuqI; __Secure-1PSIDCC=AFvIBn9MSaGzTkxHUVt1coKq1MXCSVfel-CIMNxFeNCX8bxpo04CLBAe3hHa_6hTv41LkIM4QS9P; __Secure-3PSIDCC=AFvIBn8AIz_ToWbfi4O-L8qICnWeUJ8-R3aTzZY8y7q59O_s7gBSFPa6Jp8WoQRslwP62yPLa87J",
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