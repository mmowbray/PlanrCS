////////////////////////////////////////////
//Student Record Class
////////////////////////////////////////////
function StudentRecord(url, recordDOMID){
	//private instance variables
	var record = null;
	
	//public instance variables
	this.fetching = false; //boolean stating if there is an ajax call to the server
	this.jqxhr = null; //ajax object
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
// Preferences class
/////////////////////////////////
function Preferences(url, preferencesDOMID){
	// Constants
	var SUCCESS_STATUS_CODE = 1;
	
	// private instance variables
	// dayof, morning, nightBooleans
	var morning = null;
	var dayOff = null;
	var night = null;
	
	
	// public instance variables
	//boolean stating if there is an ajax call to the server
	this.fetching = false;
	//ajax object
	this.jqxhr = null;
	this.preferencesURL = url;
	this.domID = preferencesDOMID;
	this.self = this;
	
	//accessor methods
	this.getMorning = function(){
		return morning;
	};
	
	this.setMorning = function(newMorning){
		morning = newMorning;
	};
	
	this.getDayOff = function(){
		return dayOff;
	};
	
	this.setDayOff = function(newDayOff){
		dayOff = newDayOff;
	};
	
	this.getNight = function(){
		return night;
	};
	
	this.setNight = function(newNight){
		night = newNight;
	};
	
	//return the success status code
	this.getSuccessStatusCode = function(){
		return SUCCESS_STATUS_CODE;
	};
}

Preferences.prototype = {
	constructor:Preferences,
	
	fetchPreferencesFromServer: function() {
		if (!this.fetching) { //if no current preference ajax goin on then fetch
			this.fetching = true; //set fetch flag to true
			var self = this.self;
			//perform get request
			this.jqxhr = $.get(this.preferencesURL, function(data) {
				//TODO: self.setPreferences(data);
				self.fetching = false;
			});
		}
	},
	
	savePreferencesToServer:function(){
		if (!this.fetching) { //if no current preference ajax goin on then fetch
			this.fetching = true; //set fetch flag to true
			var self = this.self;
			//perform get request
			this.jqxhr = $.get(this.preferencesURL + "?morning=" + this.getMorning() + "&dayOff=" + this.getDayOff() + "&night=" + this.getNight(), function(data) {
				//if the returned data is not the same as our success status code then alert the user and return false
				if (self.getSuccessStatusCode == data) {
					alert('failed to save data to server.');
					return false;
				}
				
				//TODO, what to do if it worked.
				self.fetching = false;
			});
		}
	},
	
	
	updatePreferences: function() {
		//TODO: Angular for data  binding?
	},
	
	updatePreferencesInDOM: function(){}
	
	
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
		if(!this.fetching){
			this.fetching = true;
			
			var self = this.self;
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
		else if(!this.fetching){
			//then fetch sequence from server
			this.fetchSequenceFromServer();
			//and call back insertInDOM when finished
			this.jqxhr.done(this.insertInDOM);
			
			//if there is already an ajax call to retreive the sequence
		} else if (!this.fetching)
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




