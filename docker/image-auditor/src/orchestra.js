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
	this.musicians.set(musician.getUuid,musician);
	this.activity.set(musician.getUuid, Date.now);
}

Orchestra.prototype.get = function(id) {
	return this.musicians.get(id);
}

Orchestra.prototype.remove = function(musician) {
	return this.musicians.delete(musician.getUuid);
}

Orchestra.prototype.removeInactive = function() {
	// loop au travers d'activity
	this.activity.forEach(function(val,key) {
		// si un plus vieux que 5 s
		if(val < Date.now - 5000) 
		{// on supprime le musicien et l'activite
			this.musicians.delete(key);
			this.activity.delete(key);
			console.log("found inactive musician : " + key);
		}
	});
}

Orchestra.prototype.getJson = function() {
	var array = [this.musicians.values()];
	console.log(array); // Will show ["clé1", "clé2"]
	return JSON.stringify(array);
}

Orchestra.prototype.getActivity = function(id) {
	return this.activity.get(id);
}

// export the class
module.exports = Orchestra;
