////////////////////////////////////////////
//Planr Class
//'Main' class, mostly binds events to functions
////////////////////////////////////////////
/*function Planr(){
	this.prefsID;
	this.recordID;
	this.sequenceID;
	this.loaderID;
	
	//var schedulesID??
	//var canvasID???
	
	//buttons id
	this.semester1ID;
	this.semester2ID
	this.morningID;
	this.nightID;
	this.dayOff;
	this.generateSchedulesID;
	this.profileID;
	
	
	
	
	//binding events
	
	
}*/

/*Planr.prototype = {
	constructor:Planr,
	
	toggleLoader: function(){
		$('#'+this.loaderID).toggle();
	},
	
	
};*/

//defin app controllers
/*var controllers = angular.module('AppControllers', []);

//define controller for sequence
controllers.controller('SequenceCtrl', function($scope) {
	var sequenceObj = new Sequence('/jsonTest/sequenceTest.html');
	$scope.sequenceArray = sequenceObj.getSequence();
});*/

//Create Planr Angular App
var Planr = angular.module('Planr', []);

//Create Sequence controller
Planr.controller('SequenceCtrl', function($scope) {
	//instantiate new obj
	//TODO: put the apply function
	var sequenceObj = new Sequence('jsonTest/sequenceTest.json', 'someID');
	//fetch from server
	sequenceObj.fetchSequenceFromServer($scope.$apply);
	//bind the object to the scope
	$scope.sequence = sequenceObj;
	
});

//Create Record controller
Planr.controller('RecordCtrl', function($scope) {
	//instantiate new obj
	var recordObj = new StudentRecord('jsonTest/studentRecodTest.json', 'someID');
	//fetch from server
	recordObj.fetchRecordFromServer($scope.$apply);
	//bind the object to the scope
	$scope.record = recordObj;
});

//Create Preferences controller
//TODO: make as a service
Planr.controller('PreferencesCtrl', function($scope) {
	//instantiate new obj
	var prefObj = new Preferences('jsonTest/getPreferencesTest.json', 'jsonTest/setPreferencesTest.html', 'someID');
	//fetch from server $scope.$apply
	prefObj.fetchPreferencesFromServer($scope.$apply);
	//bind the object to the scope
	$scope.pref = prefObj;
	$scope.count = 1;
});

//Create Schedules controller
//TODO make as service
/*Planr.controller('SchedulesCtrl', function($scope) {
	//instantiate new obj
	var schedulesObj = new Schedules('jsonTest/schedulesTest.html', 'jsonTest/schedulesTest.html', 'someID');
	//fetch from server $scope.$apply
	//bind the object to the scope
	$scope.schedules = schedulesObj;
});*/



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
		//bind the new sequence to the scope, using accessor to keep data private
	};
	
	
}

StudentRecord.prototype = {
	constructor:StudentRecord,
	
	fetchRecordFromServer:function(callback){

		var self = this.self;
		$.get(this.recordUrl, function(data){
			self.setRecord(data);
			callback();
		
		});
	},
	
	insertInDOM: function() {
		var self = this.self;
		if (this.getRecord !== null) {
			$('#' + this.DOMID).html(function() {
				//TO DO actual html code to be inserted
				return self.getRecord();
			});
		} else{
			this.fetchRecordFromServer();
			this.insertInDOM();
		}
	}
	
	
};

/////////////////////////////////
// Preferences class
/////////////////////////////////
function Preferences(fetchUrl, saveUrl, preferencesDOMID){
	// Constants
	var SUCCESS_STATUS_CODE = 1;
	
	// private instance variables
	// preferences object
	var preferences = {'morning':'yo', 'night':false, 'dayOff':false};
	
	
	// public instance variables
	//boolean stating if there is an ajax call to the server
	this.fetching = false;
	//ajax object
	this.jqxhr = null;
	this.fetchPreferencesURL = fetchUrl;
	this.savePreferencesURL = saveUrl;
	this.domID = preferencesDOMID;
	this.self = this;
	
	//accessor methods
	this.getPreferences = function(){
		return preferences;
	};
	
	this.setPreferences = function(newPreferences){
		preferences = newPreferences;
	};
	
	this.setMorning = function(value){
		preferences.morning = value;
	};
	
	this.setNight = function(value){
		preferences.night = value;
	};
	
	this.setDayOff = function(value){
		preferences.dayOff = value;
	};
	
	this.toggleMorning = function(){
		if(preferences.morning)
			preferences.morning = false;
		else
			preferences.morning = true;
	};
	
	this.toggleNight = function(){
		if(preferences.night)
			preferences.night = false;
		else
			preferences.night = true;
	};
	
	this.toggleDayOff = function(){
		if(preferences.dayOff)
			preferences.dayOff = false;
		else
			preferences.dayOff = true;
	};
	
	
	//return the success status code
	this.getSuccessStatusCode = function(){
		return SUCCESS_STATUS_CODE;
	};
}

Preferences.prototype = {
	constructor:Preferences,
	
	fetchPreferencesFromServer: function(callback) {
		if (!this.fetching) { //if no current preference ajax goin on then fetch
			this.fetching = true; //set fetch flag to true
			var self = this.self;
			//perform get request, format of returned data should be as follows: {"morning":true, "night":true, "dayOff":true}
			this.jqxhr = $.get(this.fetchPreferencesURL, function(data) {
				self.setPreferences(data);
				self.fetching = false;
				callback();
			});
		}
	},
	
	savePreferencesToServer:function(callback){
		if (!this.fetching) { //if no current preference ajax goin on then fetch
			this.fetching = true; //set fetch flag to true
			var self = this.self;
			//perform get request
			this.jqxhr = $.get(this.savePreferencesURL + "?morning=" + this.getPreferences().morning + "&dayOff=" + this.getPreferences().dayOff + "&night=" + this.getPreferences().night, function(data) {
				//if the returned data is not the same as our success status code then alert the user and return false
				if (self.getSuccessStatusCode() != data) {
					alert('failed to save data to server.');
					return false;
				}
				
				//TODO, what to do if it worked.
				self.fetching = false;
				callback()
			});
		}
	},
	
	
	updatePreferences: function() {
		//TODO: Angular for data  binding?
	},
	
	updatePreferencesInDOM: function(){}
	
	
};

/////////////////////////////////
//Sequence class
////////////////////////////////
function Sequence(url, sequenceDOMID){
	//private instance variables
	var sequence;
	
	//public instance variables
	//boolean stating if there is an ajax call to the server
	this.fetching = false;
	this.jqxhr = null; //ajax object
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
	
	this.setAjaxCallback = function(ajaxCallback){
		this.callback = ajaxCallback;
	};
}

Sequence.prototype = {
	//TODO courses of the sequence should have flag saying if they are freely movable
	constructor:Sequence,
	
	//this method fetches the sequence data from the server
	//and sets this instance variable, the server should
	//return the sequence in json format
	fetchSequenceFromServer:function(callback){
		//if there is no other ajax call already fetching the sequence
		if(!this.fetching){
			this.fetching = true;
			
			var self = this.self;
			
			//fetch sequence using get, sequence shoulds be returned in json array format eg: ["course1","course2","course3","course4"]
			self.jqxhr = $.get(this.sequenceUrl, function(data) {
				self.setSequence(data);
				self.fetching = false;
				callback();
			});
		}
	},
	
	htmlFormat:function(){
		var self = this.self;
		///TODO: self.getSequence();
		//return formattedSequence
	},
	
	insertInDOM:function(selfReference){
		var self = (selfReference === undefined) ? this.self : selfReference;
		//if sequence is loaded, insert
		if(self.getSequence() !== null)
			//TODO: properly html format
			$("#"+self.DOMID).html(this.getSequence());
		//if sequence is not loaded and there are no current ajax call going on
		else if(!this.fetching){
			//then fetch sequence from server
			this.fetchSequenceFromServer();
			//and call back insertInDOM when finished
			this.jqxhr.done(function(){self.insertInDOM(self);}); /*pass in the self referencing object 
			to the call back so that self can reference to the active object, this is done because the method 
			is passed as a stand alone object function which can't self reference the active object on its own. 
			Moreover, we wrapper it in an anonymous function because passing the self referencing object without 
			being wrapped would caused the function to execute.*/
			
			//if there is already an ajax call to retreive the sequence
		} else if (this.fetching)
			//then call back insertInDOM when finished
			this.jqxhr.done(function(){self.insertInDOM(self);});/*pass in the self referencing object 
			to the call back so that self can reference to the active object, this is done because the method 
			is passed as a stand alone object function which can't self reference the active object on its own. 
			Moreover, we wrapper it in an anonymous function because passing the self referencing object without 
			being wrapped would caused the function to execute.*/
			
			
	}
};

/////////////////////////////////
// Schedule class
/////////////////////////////////

function Schedule(coursesArray, scheduleSemester, scheduleYear){
	
	// private instace variables, array of course object
	var courses = coursesArray;
	var semester = scheduleSemester;
	var year = scheduleYear;

	this.self = this;
	
	// accessor methods
	
	this.getCoursesArray = function(){
		return courses;
	};
	
	this.setCoursesArray = function(coursesArray){
		courses = coursesArray;
	};
	
	this.getSemester = function(){
		return semester;
	};
	
	this.getYear = function(){
		return year;
	};
	
}

/////////////////////////////////
// Schedules class
/////////////////////////////////
function Schedules(fetchUrl, saveUrl,/* preferencesOBJ,*/ scheduleListDOMID){
	// Constants
	var SUCCESS_STATUS_CODE = 1;
	//public instance variables
	//boolean stating if there is an ajax call to the server
	this.fetching = false;
	//ajax object
	this.DOMID = scheduleListDOMID;
	this.jqxhr = null;
	this.fetchSchedulesUrl = fetchUrl;
	this.saveSchedulesUrl = saveUrl;
	//this.preferences = preferencesOBJ;
	this.callback = ajaxCallback;
	this.winterSchedules = null;
	this.fallSchedules = null;
	this.summerSchedules = null;
	this.self = this;
}

Schedules.prototype = {
	constructor: Schedule,
	
	//fetch schedules from server
	getSchedulesFromServer:function(callback){
		if(!this.fetching){
			this.fetching = true;
			
			var self = this.self;
			
			//fetch using get, set ajax ovject
			this.jqxhr = $.get(this.schedulesUrl /*+ '?morning=' + this.preferences.getPreferences().morning + '&night=' + this.preferences.getPreferences().night + '&dayoff' + this.preferences.getPreferences().dayOff*/, function(data){
				//build the schedule options based on the received data
				self.makeSchedules(data);
				self.fetching = false;
				//run a callback setted by the constructor
				callback();
			});
			
		}
	},
	
	//make schedule object based on supplied data array, the array should have the format semesters[schedules[courses[]]]
	makeSchedules:function(data){
		var self = this.self;
		//create fall schedules array
		this.fallSchedules = [];
		$.each(data[0], function(i, o){
			//push new schedules to schedules array
			self.fallSchedules.push(new Schedule(o, 'Fall', self.year));
		});
		
		//create winter schedules array
		this.winterSchedules = [];
		$.each(data[1], function(i, o){
			//push new schedules to schedules array
			self.winterSchedules.push(new Schedule(o, 'Winter', self.year));
		});
		
		//TODO: add check to make sure there is a summer semester given
		//create summer schedules array
		this.summerSchedules = [];
		$.each(data[2], function(i, o){
			//push new schedules to schedules array
			self.summerSchedules.push(new Schedule(o, 'Summer', self.year));
		});
		
	},
	
	saveSchedules:function(scheduleIDArray, callback){
		if (!this.fetching) { //if no current preference ajax goin on then fetch
			this.fetching = true; //set fetch flag to true
			var self = this.self;
			//perform get request
			this.jqxhr = $.get(this.saveSchedulesUrl, {'scheduleIDs[]': scheduleIDArray}, function(data) {
				//if the returned data is not the same as our success status code then alert the user and return false
				if (self.getSuccessStatusCode() != data) {
					alert('failed to save data to server.');
					return false;
				}
				
				//TODO, what to do if it worked.
				self.fetching = false;
				callback();
			});
		}
	},
	
	writeSemesterOneToDOM:function(){},
	
	writeSemesterTwoToDOM:function(){},
	
	writeSemesterThreeToDOM:function(){},
	
	
	
	
	
};
/////////////////////////////////
// Canvas class
/////////////////////////////////
function ScheduleCanvas(canvasID) {
	
	//define varables
	var canvas = document.getElementById(canvasID);
	canvas.width = 1800;
	canvas.height = 2880;
	canvas.style.width = "600px";
	canvas.style.height = "960px";
	var ctx = canvas.getContext("2d");
	ctx.scale(3, 3);
	var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
	var hour = ["08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "15:00", "15:15", "15:30", "15:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00"];
	var time = [];
	var backColor = ["black", "gray", "gold", "cyan", "darkMagenta", "navy"];
	var frontColor = ["yellow", "white", "mediumBlue", "blue", "Gainsboro", "white"];
	
	//some black magic here, TODO extend the array class
	Array.prototype.min = function() {
		return Math.min.apply(null, this);
	};
	Array.prototype.max = function() {
		return Math.max.apply(null, this);
	};
	
	//The methods, TODO: refactor them in the prototype
	
	//this method draw the schedule canvas to the dom element for the provided id
	this.drawSchedule = function (schedule) {
		var start = this.minStart(schedule);
		var finish = this.maxFinish(schedule);
		var s = 0;
		for (var i = start; i <= finish; i++) {
			time.push(hour[i]);
		}
		for (var x = 100; x < 600; x += 100) {
			var day = days[s];
			ctx.beginPath();
			ctx.strokeStyle = "grey";
			ctx.lineWidth = "0.5";
			ctx.rect(x, 0, 100, time.length * 15);
			ctx.stroke();
			ctx.font = '10pt Calibri';
			ctx.textAlign = 'center';
			ctx.fillStyle = "red";
			ctx.fillText(day, x + 50, 12);
			s += 1;
		}
		s = 0;
		for (var y = 15; y < time.length * 15; y += 15) {
			var hours = time[s];
			ctx.beginPath();
			ctx.strokeStyle = "grey";
			ctx.lineWidth = "0.5";
			ctx.rect(0, y, 600, 15);
			ctx.stroke();
			ctx.font = '10pt Calibri';
			ctx.textAlign = 'center';
			ctx.fillStyle = "red";
			ctx.fillText(hours, 50, y + 12);
			s += 1;
		}
		for (var i = 0; i < schedule.length; i++) {
			schedule[i].drawCourse(backColor[i], frontColor[i], ctx, time);
		}
	};
	
	this.maxFinish = function(a) {
		var b = [];
		for (var i = 0; i < a.length; i++) {
			var y1 = a[i].endL.substr(0, 2).concat(":00");
			var y2 = a[i].endT.substr(0, 2).concat(":00");
			var y3 = a[i].endLab.substr(0, 2).concat(":00");
			if (hour.indexOf(y1) != -1) b.push(hour.indexOf(y1));
			if (hour.indexOf(y2) != -1) b.push(hour.indexOf(y2));
			if (hour.indexOf(y3) != -1) b.push(hour.indexOf(y3));
		}
		return b.max() + 4;
	};
	
	this.minStart = function(a) {
		var b = [];
		for (var i = 0; i < a.length; i++) {
			var y1 = a[i].startL.substr(0, 2).concat(":00");
			var y2 = a[i].startT.substr(0, 2).concat(":00");
			var y3 = a[i].startLab.substr(0, 2).concat(":00");
			if (hour.indexOf(y1) != -1) b.push(hour.indexOf(y1));
			if (hour.indexOf(y2) != -1) b.push(hour.indexOf(y2));
			if (hour.indexOf(y3) != -1) b.push(hour.indexOf(y3));
		}
		return b.min();
	};
	
	
}

/////////////////////////////////
// Course class
/////////////////////////////////
function Course(name, lDay1, lDay2, startL, endL, tDay1, tDay2, startT, endT, labDay1, labDay2, startLab, endLab) {
	this.name = name;
	this.lDay1 = lDay1;
	this.lDay2 = lDay2;
	this.startL = startL;
	this.endL = endL;
	this.tDay1 = tDay1;
	this.tDay2 = tDay2;
	this.startT = startT;
	this.endT = endT;
	this.labDay1 = labDay1;
	this.labDay2 = labDay2;
	this.startLab = startLab;
	this.endLab = endLab;
	var ctx;
	var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
	var time;
	
	//function to draw one day of a course. 
	this.draw = function(name, day, start, end, type, bcolor, fcolor) {
		var xAxis = (days.indexOf(day) + 1) * 100;
		var startHour = start.substr(0, 2).concat(":00");
		var startY = (time.indexOf(startHour) * 15) + (parseInt(start.substr(3, 2)) * 1) + 15;
		var endHour = end.substr(0, 2).concat(":00");
		var endY = (time.indexOf(endHour) * 15) + parseInt(end.substr(3, 2)) + 15;
		ctx.fillStyle = bcolor;
		ctx.fillRect(xAxis, startY, 100, endY - startY);
		ctx.font = '10pt Calibri';
		ctx.textAlign = 'center';
		ctx.fillStyle = fcolor;
		ctx.fillText(name, xAxis + 50, (startY + endY) / 2);
		ctx.fillText(type.concat(" ", start, "-", end), xAxis + 50, (startY + endY) / 2 + 15);
	};
	
	
	this.drawCourse = function(bcolor, fcolor, suppliedCanvas, suppliedTime) {
		ctx = suppliedCanvas;
		time = suppliedTime;
		if (name != "") {
			if (lDay1 != "") {
				this.draw(name, lDay1, startL, endL, "Lec", bcolor, fcolor);
			}
			if (lDay2 != "") {
				this.draw(name, lDay2, startL, endL, "Lec", bcolor, fcolor);
			}
			if (tDay1 != "") {
				this.draw(name, tDay1, startT, endT, "Tut", bcolor, fcolor);
			}
			if (tDay2 != "") {
				this.draw(name, tDay2, startT, endT, "Tut", bcolor, fcolor);
			}
			if (labDay1 != "") {
				this.draw(name, labDay1, startLab, endLab, "Lab", bcolor, fcolor);
			}
			if (labDay2 != "") {
				this.draw(name, labDay2, startLab, endLab, "Lab", bcolor, fcolor);
			}

		}
	};
}

/*
how to draw the schedule with courses now:

->myCanvas = new ScheduleCanvas('canvas')

->var course1 = new Course("Course1", "Monday", "Wednesday", "10:30", "12:00", "Friday", "", "11:00", "14:00", "", "", "", "");
->var course2 = new Course("Course2", "Tuesday", "Thursday", "10:00", "12:00", "", "", "", "", "Wednesday", "", "12:15", "15:05");
->var course3 = new Course("Course3", "Monday", "Wednesday", "15:30", "17:00", "Friday", "", "14:15", "17:00", "", "", "", "");
->var course4 = new Course("Course4", "Tuesday", "Thursday", "12:15", "13:30", "", "", "", "", "Monday", "", "12:30", "14:45");
->var course5 = new Course("Course5", "Tuesday", "Thursday", "14:00", "15:00", "", "", "", "", "Friday", "", "11:00", "14:07");
->var schedules = [course1, course2, course3, course4, course5];

->myCanvas.drawSchedule(schedules)
*/