/**
* class musician
* help from : http://book.mixu.net/node/ch6.html
*/

// Generate a v4 UUID (random) 
const uuidV4 = require('uuid/v4');

// Constructor
function Musician(instrument, sound) {
	this.uuid = uuidV4();
	this.instrument = instrument;
	this.sound = sound;
}

function Musician(uuid, instrument, sound) {
	this.uuid = uuid;
	this.instrument = instrument;
	this.sound = sound;
}

// class methods
Musician.prototype.getInstrument = function() {
	return this.instrument;
}

Musician.prototype.getSound = function() {
	return this.sound;
}

Musician.prototype.getUuid = function() {
	return this.uuid;
}

// export the class
module.exports = Musician;
