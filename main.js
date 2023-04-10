#!/usr/bin/node

/* whatsapp-bot */

// Config

const logOutputToConsole = false;

// Main

const { Client } = require('whatsapp-web.js');
const fs = require('fs');

function appendToLog(data) {
    fs.appendFile('messages.log', data, err => {
        if (err) {
        }
    });
}

const client = new Client();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR -> ', qr);
});

client.on('ready', () => {
    console.log('[*] ~ Client started');
});

client.on('message', async msg => {
    const date_ob = new Date();
    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    const date = ("0" + date_ob.getDate()).slice(-2);
    const hours = date_ob.getHours();
    const minutes = date_ob.getMinutes();
    const seconds = date_ob.getSeconds();

    const time = month + ":" + date + ":" + hours + ":" + minutes + ":" + seconds;
    
    const sender = msg._data.notifyName;

    const content = "[" + time + "] > [" + sender + "] >> " + msg.body + "\n"

    if (logOutputToConsole) {
        console.log(content);
    }

    appendToLog(content);

    if(msg.hasMedia) {
	if (sender != "Diego") {
	    
            const mediafile = await msg.downloadMedia();
                const info = "[" + time + "] > [" + sender + "] >> Recieved new media > " + mediafile.filename + "\n";
                if (logOutputToConsole) {
                    console.log(info);
                }
                appendToLog(info);

            const path = "./media/" + time + "-" + sender + "-" + mediafile.filename;
            fs.writeFile(
                path,
                mediafile.data,
                "base64",
                function (err) {
                    if (err) {
                        //console.log(err);
                    }
                }
            );
	    const infoSaved = "[" + time + "] > Saved media to <" + path + "> [ OK ]\n";
                if (logOutputToConsole) {
	    if (logOutputToConsole) {
	        console.log(infoSaved);
	    }
	    appendToLog(infoSaved);

        }
    }

    /*if (sender == "username_you_want_to_catalog") {
        msg.reply("special response message");
    } 

	// basic ping bot
    if (msg.body == 'ping') {
	msg.reply('pong');
    } */
	    
    }
});

client.initialize();
