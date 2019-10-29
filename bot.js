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
		if(msg.content == "**help"){
			msg.channel.send("To use this bot: \nType the filename (minus extension) surrounded in asterisks. Technically you only need one at the beginning but don't worry about it. \nEx: `bro you are *josh* joshing me` produces the josh image\nFor a list of all images, type `**list`");
		}else if(msg.content == "**list"){
			fs.readdir("Images/", function(err, items){
				var files = "";
				for(var i = 0; i < items.length; i++){
					files = files + items[i] + "\n";
				}
				msg.channel.send("__Here are all the reaction images available:__\n" + files);	
			});
		} else{
			var s = msg.content;
			s = s.split('*');
			var path = "Images/" + s[1] +".png";
			try{
				if(fs.existsSync(path)){
					attachment = new Attachment(path);
					msg.channel.send(attachment);
					console.log(msg.author + " requested: " + path);
				} else{
					
				}
			} catch(err){}
		}	
	}
});

client.login('<enter token here>'); 
