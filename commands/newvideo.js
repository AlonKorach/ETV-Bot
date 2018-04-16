const Discord = require("discord.js");
const fs = require("fs");
const url = "https://www.youtube.com/feeds/videos.xml?channel_id=UC6MLHVqrpZqbegCMfKsTqUQ";
let Parser = require('rss-parser');
let parser = new Parser();
module.exports.run = async (bot, message, args) => {
    function rss() {
        (async () => {
            let feed = await parser.parseURL(url);
            let item = feed.items[0];
            bot.channel.send("123");

            if (JSON.parse(fs.readFileSync("./videos.json"))['title'] == item.title) return console.log('1');
            ;
    
            // message.channel.send(`העלאתי סרטון חדש! \n אתם מוזמנים לבוא לצפות ולהשאיר תגובה ולייק! \n \n ${item.link} \n \n @:tv:טלוויזיות:tv:`);
            try {
                // bot.guilds.channels.find("yt").send(`העלאתי סרטון חדש! \n אתם מוזמנים לבוא לצפות ולהשאיר תגובה ולייק! \n \n ${item.link} \n \n @:tv:טלוויזיות:tv:`);
                // bot.sendMessage("123", "434789368448942080");
            //    bot.message.sendMessage(`העלאתי סרטון חדש! \n אתם מוזמנים לבוא לצפות ולהשאיר תגובה ולייק! \n \n ${item.link} \n \n @:tv:טלוויזיות:tv:`, 'yt');

            } catch (e){
                console.log(e);                
            }
            fs.writeFile('./videos.json', JSON.stringify({title: item.title}), (err) => {
                if (err) console.log(err);
            });
        })()
    }
    setInterval(rss, 6000);
    message.delete().catch(O_o=>{});
} 

module.exports.help = {
    name: 'ytfirst'
}