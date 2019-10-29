const Discord = require('discord.js');
const fs = require('fs');
const { Client, Attachment } = require('discord.js');
const client = new Discord.Client();
var attachment;

client.on('ready', () => {
	console.log('Logging in...');
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setStatus('available');
	client.user.setPresence({
		game: {
			name: "for commands",
			type: "WATCHING"
		}
	});
});

client.on('message', msg => {
	if (!msg.author.bot) {
		if(msg.content == ",help"){
			msg.channel.send("To use this bot: \nType a comma followed by the filename of the reaction img you want. \nEx: `,josh` produces the josh image\nFor a list of all images, type `,list`");
		}else if(msg.content == ",list"){
			fs.readdir("Images/", function(err, items){
				var files = "";
				for(var i = 0; i < items.length; i++){
					files = files + items[i] + "\n";
				}
				msg.channel.send("__Here are all the reaction images available:__\n" + files);	
			});
		} else{
			var s = msg.content;
			var f = "";
			if(s.charAt(0) == ","){
				for(var i = 1; i < s.length; i++){
					f += s.charAt(i);
				}
				var path = "Images/" + f +".png";
				try{
					if(fs.existsSync(path)){
						attachment = new Attachment(path);
						msg.channel.send(attachment);
					} else{
						msg.channel.send("Image not found!");
					}
				} catch(err){
					console.error(err);
					msg.channel.send("Image not found!");
				}
			}
		}	
	}
});

client.login('<your token here>'); 
