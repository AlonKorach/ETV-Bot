const botconfig = require('./botconfig.json');
const Discord = require('discord.js');
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
let Parser = require('rss-parser');
let parser = new Parser();
bot.commands = new Discord.Collection();
const url = "https://www.youtube.com/feeds/videos.xml?channel_id=UC6MLHVqrpZqbegCMfKsTqUQ";

fs.readdir("./commands", (err, file) => {
    if (err) console.log(err);

    let jsFile = file.filter(f => f.split(".").pop() == "js");
    if (jsFile.length <= 0){
        console.log("Coldun't find commands.");
        return;
    }

    jsFile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
})

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;

    let prefix = "!";
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
   
    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if(commandFile) commandFile.run(bot, message, args);
});


bot.on("ready", async() => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("EverythingTV", {type: "WATCHING"})
    
   function rss() {
        (async () => {
            let feed = await parser.parseURL(url);
            let item = feed.items[0];

            if (JSON.parse(fs.readFileSync("./videos.json"))['title'] == item.title) return;
            channel = bot.channels.find("id", "435455589418532865");
            channel.send(`העלאתי סרטון חדש! \n אתם מוזמנים לבוא לצפות ולהשאיר תגובה ולייק! \n \n ${item.link} \n \n <@&350378591697240066>`);
            fs.writeFile('./videos.json', JSON.stringify({title: item.title}), (err) => {
                if (err) console.log(err);
            });
        })()
    }
    setInterval(rss, 6000);
})
bot.login(botconfig.token);