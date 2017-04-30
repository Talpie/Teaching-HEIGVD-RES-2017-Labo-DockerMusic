/*
 * Include our own class
 */
var Musician = require('./musician.js');

// global variable
var instruments = new Map();
	instruments.set("piano", "ti-ta-ti");
	instruments.set("trumpet", "pouet");
	instruments.set("flute", "trulu");
	instruments.set("violin", "gzi-gzi");
	instruments.set("drum", "boum-boum");
	
// arguments stuff [ from http://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments ]
if(!instruments.has(process.argv[2])) {
	throw new Error("Missing or wrong instrument");
}
// récupère l'instrument et le son
var instrument = process.argv[2];
var sound = instruments.get(instrument);

// creation du musicien
var musician = new Musician(instrument,sound);

// préparation payload
var message = new Buffer(JSON.stringify(musician));

// emission chaque seconde
const dgram = require('dgram');
const client = dgram.createSocket('udp4');

function sendMessage() {
client.send(message,0,message.length,41234, '239.255.9.7', (err) => {
	console.log(message + " sent to 239.255.9.7:41234");
});
}

setInterval(sendMessage,1000);
