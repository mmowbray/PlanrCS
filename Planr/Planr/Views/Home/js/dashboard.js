////////////////////////////////////////////
//Student Record Class
////////////////////////////////////////////
function StudentRecord(url, recordDOMID){
	//private instance variables
	var record = null;
	
	//public instance variables
	this.recordUrl = url;
	this.DOMID = recordDOMID;
	this.self = this;
	
	// TODO: revise StudentRecord.prototype.this.getRecord = function() 
	this.getRecord = function(){
		return record;
	};
	
	this.setRecord = function(recordObj){
		record = recordObj;
	};	
	
}

StudentRecord.prototype = {
	constructor:StudentRecord,
	
	fetchRecordFromServer:function(){
		var self = this.self;
		$.get(this.recordUrl, function(data){
			this.setRecord(data);
			
			//TODO add a callback
		
		});
	},
	
	insertInDOM: function() {

		if (this.getRecord !== null) {
			$('#' + this.DOMID).html(function() {
				//TO DO actual html code to be inserted
			});
		} else{
			this.fetchRecordFromServer();
			this.insertInDOM();
		}
	}
	
	
};

/////////////////////////////////
//User Class
////////////////////////////////
function User(url, recordDOMID){
	var studentRecord;
	var preferences;
	var schedule;
	var sequence;
	this.recordUrl = url;
	this.DOMID = recordDOMID;
	this.self = this;
		
}

/////////////////////////////////
// Preference class
/////////////////////////////////
function Preferences(url, preferencesDOMID, statusCode){
	// dayof, morning, night
	
	// private instance variables
	var preferences = null;
	
	// public instance variables
	this.preferencesURL = url;
	this.DomId = preferencesDOMID;
	this.statusCode = statusCode;
	this.self = this;
	
	this.getPreferences = function(){
		return preference;
	};
	
	this.setPreferences = function(newPreferences){
		preferences = newPreferences;
	};
}

Preferences.prototype = {
	constructor:Preferences,
	
	fetchPreferencesFromServer: function() {
		var self = this.self;
		$.get(this.preferencesURL, function(data) {
			self.setPreferences(data);
		});
	},
	
	updatePreferences: function() {
		//TODO
	}
	
	
};


/////////////////////////////////
// Schedule class
/////////////////////////////////

function Schedule(url, scheduleDOMID){
	
	// private instace variables
	var schedule = null;
	
	// public instance variables
	this.scheduleURL = url;
	this.DomId = scheduleDOMID;
	this.self = this;
	
	// accessor methods
	
	this.getSchedule = function(){
		return schedule;
	};
	
	this.setSchedule = function(scheduleObj){
		schedule = scheduleObj;
	};	
	
}

/*
Schedule.prototype = {
	constructor: Schedule;
	
}
*/

/////////////////////////////////

/////////////////////////////////
//Sequence class
////////////////////////////////
function Sequence(url, sequenceDOMID){
	//private instance variables
	var sequence = null;
	
	//public instance variables
	//boolean stating if there is an ajax call to the server
	this.fetching = false;
	//ajax object
	this.jqxhr = null;
	this.sequenceUrl = url;
	this.DOMID = sequenceDOMID;
	this.self = this;
	
	//accessor methods
	this.getSequence = function(){
		return sequence;
	};
	
	this.setSequence = function(newSequence){
		sequence = newSequence;
	};
}

Sequence.prototype = {
	//TODO courses of the sequence should have flag saying if they are freely movable
	constructor:Sequence,
	
	//this method fetches the sequence data from the server
	//and sets this instance variable, the server should
	//return the sequence in json format
	fetchSequenceFromServer:function(){
		//if there is no other ajax call already fetching the sequence
		if(this.fetching === false){
			var self = this.self;
			this.fetching = true;
			self.jqxhr = $.get(this.sequenceUrl, function(data) {
			self.setSequence(data);
			self.fetching = false;
			});
		}
	},
	
	htmlFormat:function(){
		var self = this.self;
		///TODO: self.getSequence();
		//return formattedSequence
	},
	
	insertInDOM:function(){
		var self = this.self;
		//if sequence is loaded, insert
		if(self.getSequence !== null)
			$("#"+self.DOMID).html();
		//if sequence is not loaded and there are no current ajax call going on
		else if(this.fetching === false){
			//then fetch sequence from server
			this.fetchSequenceFromServer();
			//and call back insertInDOM when finished
			this.jqxhr.done(this.insertInDOM);
			
			//if there is already an ajax call to retreive the sequence
		} else if (this.fetching === true)
			//then call back insertInDOM when finished
			this.jqxhr.done(this.insertInDOM);
			
			
	},
	
	/*updateSequence:function(){
		//TODO: this code will read the sequence displayed in the dom and save it to the sequence instance variable
		//$(//some selector).each(//put in sequence);
	},*/
	
	/*//using the same url, pass in a sequence to save to the server
	saveSequenceToDatabase:function(){
		//TODO format sequence for backend
		var formattedSequence = JSON.stringify(this.getSequence());
		
		$.get(this.sequenceUrl + '?sequence=' + formattedSequence, function(data){
			//TODO compare with returned status code to make sure everything went ok
		});
	}*/
	
	//TODO check if course placed in a summer sessions
};




