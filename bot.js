const Discord = require('discord.js');
const fs = require('fs');
const { Client, Attachment } = require('discord.js');
const request = require('request');
const client = new Discord.Client();
var attachment;
const extensions = [".gif", ".webm", ".png", ".jpg", ".jpeg", ".mp4"];
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

function downloadImg(url, filename, ex, msg)
{
    var path = "Images/" + filename + "." + ex;
    if(!(path.includes("../"))){
        if(extensions.includes("." + ex)){
            if(fs.existsSync(path)){
                msg.channel.send("Image already exists!");
                console.log("Failure. " + filename + "." + ex + " could not be added to the furReactions database");
            } else{
                try{
                    request.get(url)
                        .on('error', console.error)
                        .pipe(fs.createWriteStream(path));
                    console.log("Success! " + filename + "." + ex + " is now in the furReactions database.");
                    msg.channel.send("Congrats! Your submission: " +filename + "." + ex + " was accepted into the furReactions database!");
                } catch(err){
                    console.log(err);
                    console.log("Failure. " + filename + "." + ex + " could not be added to the furReactions database");
                    msg.channel.send("Sorry! Your sumbission: " + filename + "." + ex + " could not be added to the furReactions database.");
                }
            }
        } else{
            msg.channel.send("Please don't try to upload things that aren't images.");
        }
    } else{
        msg.channel.send("Please don't try to place things out of the Images folder.");
    }
}


client.on('message', msg => {
	if (!msg.author.bot) {
		if(msg.content == "**help"){
			msg.channel.send("To use this bot: \nType the filename (minus extension) surrounded in asterisks. Technically you only need one at the beginning but don't worry about it. \nEx: `bro you are *josh* joshing me` produces the josh image\nFor a list of all images, type `**list` \nTo upload an image, type `**upload <furReaction name>` with the file attached.");
		}else if(msg.content == "**list"){
			fs.readdir("Images/", function(err, items){
				var files = "";
				for(var i = 0; i < items.length; i++){
					files = files + items[i] + "\n";
				}
				msg.channel.send("__Here are all the reaction images available:__\n" + files);	
			});
        }else if(msg.content.includes("**upload")){
            if(msg.attachments.first()){
                var sub = msg.content.toLowerCase();
                sub = sub.split("**upload ");
                console.log(msg.author.username + " attempted to add: " + msg.attachments.first().filename + "(" + msg.attachments.first().url + ") to the database.");
                x = msg.attachments.first().filename;
                x = x.split(".");
                try{
                    downloadImg(msg.attachments.first().url, sub[1], x[1], msg);
                } catch(err){
                    msg.channel.send("Something went wrong! Please contact Minnowfeather for details.");
                    console.log(err);
                    
                }
            } else{
                msg.channel.send("You must attach an image!");
            }
		} else{
			var s = msg.content.toLowerCase();
			s = s.split('*');
			for(var i = 0; i < extensions.length; i++){
				try{
					var path = "Images/" + s[1] + extensions[i];
					if(fs.existsSync(path)){
						attachment = new Attachment(path);
						msg.channel.send(attachment);
						console.log(msg.author.username + " requested: " + path);
					} else{
						//do nothing try again
					}
				} catch(err){
					//do nothing, try again
				}
			}
		}	
	}
});

client.login('<your token here>'); 
