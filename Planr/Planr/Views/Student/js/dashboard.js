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
function Preference(url, preferenceDOMID){
	// dayof, morning, night
	
	// private instance variables
	var preference = null;
	
	// public instance variables
	this.preferenceURL = url;
	this.DomId = preferenceDOMID;
}


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
		var self = this.self;
		$.get(this.sequenceUrl, function(data){
			self.setSequence(data);
		});
	},
	
	updateSequence:function(){
		//TODO: this code will read the sequence displayed in the dom and save it to the sequence instance variable
		//$(//some selector).each(//put in sequence);
	},
	
	//using the same url, pass in a sequence to save to the server
	saveSequenceToDatabase:function(){
		//TODO format sequence for backend
		var formattedSequence = JSON.stringify(this.getSequence());
		
		$.get(this.sequenceUrl + '?sequence=' + formattedSequence, function(data){
			//TODO compare with returned status code to make sure everything went ok
		});
	}
	
	//TODO check if course placed in a summer sessions
};




