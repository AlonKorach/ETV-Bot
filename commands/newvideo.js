const Discord = require("discord.js");
const fs = require("fs");
const url = "https://www.youtube.com/feeds/videos.xml?channel_id=UC6MLHVqrpZqbegCMfKsTqUQ";
let Parser = require('rss-parser');
let parser = new Parser();
module.exports.run = async (bot, message, args) => {
    if (message.channel.id != 435455589418532865) return;
    if (message.author.id != 259324372882292736) return;
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
    rss();
    message.delete().catch(O_o=>{});
} 

module.exports.help = {
    name: 'ytfirst'
}