// Init Req
const colors = require('colors');
const Config = require('./config.json');
const Logger = require('./func/logger.js');


// Main Requirements
const Discord = require("discord.js");


// Extensions
//const Status = require('./func/Status');
require('./extendedMessage.js');

console.log("Loading".brightCyan);



const client = new Discord.Client({
    intents: ["GUILDS"],
});

const prefix = Config.Prefix;


const alternative  =  require('./m_alt.json').alt
const quesAwns     =  require('./m_que.json').que
const reply        =  require('./m_rep.json').rep
const robot        =  require('./m_rob.json').rob
const trigger      =  require('./m_tri.json').tri


client.once('ready', () => {

    console.log('Bot Ready!'.brightMagenta);

    let Guilds = client.guilds.cache.map(guild => guild.id);
    console.log(Guilds);

});


client.on('message', message => {

    try {
		
        //if (message.channel.type === 'dm') return;
		if (message.author.bot) return;
      	if (!message.content.toLowerCase().includes(prefix)) return;
	    

	    let input  =  message.content
		input      =  input.toLowerCase();
      	input      =  input.replace(prefix, '');
      	input      =  input.trim();

      	let response = output(input);
      	message.inlineReply(response[0]);
      
      	log(message, response);
      

    } catch (err) {
        console.error("Error");
        console.error(err.name);
        console.error(err.message);
        console.error(err.stack);
    }
});




function compare(triggerArray, replyArray, text) {
	try {

    	let item;
		let b = false;

    	for (let x = 0; x < triggerArray.length; x++) {
    		for (let y = 0; y < triggerArray[x].length; y++) {
				
				// Check for individual words (WIP)
				//let t = text.split(" ");
				//for(let i = 0; i < t.length; i++) {
				//	if (triggerArray[x][y].includes(t[i])) {
				//		items = replyArray[x];
				//		item = items[Math.floor(Math.random() * items.length)];
				//		b = true;
				//		break;
				//	}
				//}

				// Check for whole thing
				if (triggerArray[x][y].includes(text)) {
    				items = replyArray[x];
    				item = items[Math.floor(Math.random() * items.length)];
					b = true;
					break;
				}
			
				if(b) break;
   		 	}
			if(b) break;
    	}

    	return item;
  
  	} catch (err) {
    	console.error("Error");
   		console.error(err.name);
   		console.error(err.message);
    	console.trace("Error Trace");
  	}
}




function output(input) {
  try {

    let product;
    let text = input.toLowerCase().replace(/[^\w\s\d?]/gi, "");

    //compare arrays
    //then search keyword
    //then random alternative


	// Question
    if (text.endsWith("?")) {
      product = quesAwns[Math.floor(Math.random() * quesAwns.length)];
    }
	// Robot
	else if (text.match(/robot/gi) || text.match(/bot/gi) || text.match(/fake/gi)) {
      product = robot[Math.floor(Math.random() * robot.length)];
    }
	// Predefined Responses
	else if (compare(trigger, reply, text)) {
      product = compare(trigger, reply, text);
    }
	// Final Responses
	else {
      product = alternative[Math.floor(Math.random() * alternative.length)];
    }


    return([product, text]);


  } catch (err) {
    console.error("Error");
    console.error(err.name);
    console.error(err.message);
    console.trace("Error Trace");
  }
}


function log(message, response) {
  try {

    var now = Date.now();
    var dateObj = new Date(now);
    var hours = dateObj.getUTCHours();
    var minutes = dateObj.getUTCMinutes();
    var seconds = dateObj.getUTCSeconds();
    var comSendForm = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    console.log(`[CMD] ${comSendForm}  |  Message Sent From ${message.author.tag} : ${response[1]}`.brightCyan);

  } catch (err) {
    console.error("Error");
    console.error(err.name);
    console.error(err.message);
    console.trace("Error Trace");
  }
}




client.login(Config.Token)
    .then(r => console.log("Logged In".brightCyan));