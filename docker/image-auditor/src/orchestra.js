/**
* class Orchestra
*/

const Musician = require('./musician.js');

// Constructor
function Orchestra() {
	this.musicians = new Map();
	this.activity = new Map();
}

// class methods
// set ecrase si une cle est deja existante
Orchestra.prototype.add = function(musician) {
	this.musicians.set(musician.getUuid(),musician);
	this.activity.set(musician.getUuid(), Date.now());
}

Orchestra.prototype.get = function(id) {
	return this.musicians.get(id);
}

Orchestra.prototype.remove = function(id) {
	return this.musicians.delete(id);
}

Orchestra.prototype.removeInactive = function() {
	// loop au travers d'activity
	var keyArray = [];
	this.activity.forEach(function(val,key) {
		// si un plus vieux que 5 s
		console.log("value is : " + val);
		if(val < Date.now() - 5000) {
			// on supprime le musicien et l'activite
			console.log("found inactive musician : " + key);
			keyArray.push(key);
		}
	});
	for(var i = 0; i < keyArray.length; i++) {
		var value = keyArray[i];
		console.log("value is : " + value);
		this.musicians.delete(value);
		this.activity.delete(value);
	};
}

Orchestra.prototype.getJson = function() {
	var msg = Array.from(this.musicians.values());
	console.log(msg); // Will show ["clé1", "clé2"]
	return JSON.stringify(msg);
}

Orchestra.prototype.getActivity = function(id) {
	return this.activity.get(id);
}

// export the class
module.exports = Orchestra;
