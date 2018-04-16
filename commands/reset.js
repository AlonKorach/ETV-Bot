const Discord = require("discord.js");
const fs = require("fs");
const url = "https://www.youtube.com/feeds/videos.xml?channel_id=UC6MLHVqrpZqbegCMfKsTqUQ";
let Parser = require('rss-parser');
let parser = new Parser();
module.exports.run = async (bot, message, args) => {
    if (message.channel.id != 435455589418532865) return;
    if (message.author.id != 259324372882292736) return;

    fs.writeFile("./videos.json", "{}", (err) => {
        console.log(err);
    })
} 

module.exports.help = {
    name: 'ytreset'
}