/*
 * Include our own class
 */
const Musician = require('./musician.js');
var Orchestra = require('./orchestra.js');
var orchestra = new Orchestra();
// listen to the musicans
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

// lie le server et l'ip & port
server.bind(41234, function() {
	console.log("join 239.255.9.7:41234 group");
	server.addMembership("239.255.9.7");
});

// ecoute les message
server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  var json = JSON.parse(msg);
  var mus = new Musician(json.instrument, json.sound);
  mus.setUuid(json.uuid);
  orchestra.add(mus);
});

function checkInactive() {
	orchestra.removeInactive;
}

// on check chaque 2s, c'est pas opti mais bon
setInterval(checkInactive,2000);

// listen to TCP
const net = require('net');
var tcpListener = net.createServer(function(socket) {
	socket.write(orchestra.getJson + '\r\n');
	socket.end();
});

tcpListener.listen(2205);
