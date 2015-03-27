var canvas = document.getElementById("schedule"); 
canvas.width = 1800;
canvas.height = 2880;
canvas.style.width = "600px";
canvas.style.height = "960px";
var ctx=canvas.getContext("2d");
ctx.scale(3,3);
var days= ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]; 
var hour = ["08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "15:00", "15:15", "15:30", "15:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45" ,"23:00"]
var time=[]; 
var backColor = ["black","gray","gold","cyan", "darkMagenta", "navy"];
var frontColor = ["yellow","white","mediumBlue","blue", "Gainsboro", "white"];
Array.prototype.min = function() {
  return Math.min.apply(null, this);
};
Array.prototype.max = function() {
  return Math.max.apply(null, this);
};
//function to draw one day of a course. 
function draw(name, day, start, end, type,bcolor,fcolor)
{
	var xAxis=(days.indexOf(day)+1)*100; 
	var startHour= start.substr(0,2).concat(":00");
	var startY=(time.indexOf(startHour)*15)+(parseInt(start.substr(3,2))*1)+15;
	var endHour= end.substr(0,2).concat(":00");
	var endY=(time.indexOf(endHour)*15)+parseInt(end.substr(3,2))+15;
	ctx.fillStyle = bcolor;
	ctx.fillRect(xAxis,startY,100,endY-startY);
	ctx.font = '10pt Calibri';
	ctx.textAlign = 'center';
	ctx.fillStyle = fcolor;
	ctx.fillText(name, xAxis+50, (startY+endY)/2);
	ctx.fillText(type.concat(" ",start,"-",end), xAxis+50, (startY+endY)/2+15);	
}
//course object 
function Course(name,lDay1,lDay2,startL,endL,tDay1,tDay2,startT,endT,labDay1,labDay2,startLab,endLab)
{
	this.name=name;
	this.lDay1=lDay1;  
	this.lDay2=lDay2;  
	this.startL=startL;  
	this.endL=endL;  
	this.tDay1=tDay1;  
	this.tDay2=tDay2;  
	this.startT=startT;  
	this.endT=endT;  
	this.labDay1=labDay1;  
	this.labDay2=labDay2;  
	this.startLab=startLab;  
	this.endLab=endLab;  
	this.drawCourse=function(bcolor, fcolor)
	{
		if(name!="")
	{
		if(lDay1!="")
		{
			draw(name, lDay1, startL, endL, "Lec",bcolor,fcolor);
		}
		if(lDay2!="")
		{
			draw(name, lDay2, startL, endL, "Lec",bcolor,fcolor);
		}
		if(tDay1!="")
		{
			draw(name, tDay1, startT, endT, "Tut",bcolor,fcolor);
		}
		if(tDay2!="")
		{
			draw(name, tDay2, startT, endT, "Tut",bcolor,fcolor);
		}
		if(labDay1!="")
		{
			draw(name, labDay1, startLab, endLab, "Lab",bcolor,fcolor);
		}
		if(labDay2!="")
		{
			draw(name, labDay2, startLab, endLab, "Lab",bcolor,fcolor);
		}
		
	}
	}
}
function minStart(a)
	{
		var b=[];
		for(var i = 0; i<a.length; i++)
		{
		var y1= a[i].startL.substr(0,2).concat(":00");
		var y2= a[i].startT.substr(0,2).concat(":00");
		var y3= a[i].startLab.substr(0,2).concat(":00"); 
		if(hour.indexOf(y1)!=-1)	b.push(hour.indexOf(y1)); 
		if(hour.indexOf(y2)!=-1) 	b.push(hour.indexOf(y2)); 
		if(hour.indexOf(y3)!=-1) 	b.push(hour.indexOf(y3)); 
		}
		return b.min();
	}
function maxFinish(a)
	{
		var b=[]; 
		for(var i = 0; i<a.length; i++)
		{
			var y1= a[i].endL.substr(0,2).concat(":00"); 
			var y2= a[i].endT.substr(0,2).concat(":00"); 
			var y3= a[i].endLab.substr(0,2).concat(":00"); 
			if(hour.indexOf(y1)!=-1) b.push(hour.indexOf(y1)); 
			if(hour.indexOf(y2)!=-1) b.push(hour.indexOf(y2)); 	
			if(hour.indexOf(y3)!=-1) b.push(hour.indexOf(y3)); 
		}
		return b.max()+4;
	}
function drawSchedule(schedule)
	{
	var start=minStart(schedule); 
	var finish = maxFinish(schedule); 
	var s =0; 
	for(var i=start ; i<=finish; i++)
	{
		time.push(hour[i]);
	}
	for(var x=100; x<600; x+=100)
	{
	day = days[s];
	ctx.beginPath();
	ctx.strokeStyle="grey";
	ctx.lineWidth="0.5";
	ctx.rect(x,0,100,time.length*15);
	ctx.stroke();
	ctx.font = '10pt Calibri';
	ctx.textAlign = 'center';
    ctx.fillStyle = "red";
    ctx.fillText(day, x+50, 12);
	s+=1;
	}
	s=0;
	for(var y=15; y<time.length*15; y+=15)
	{
	hours = time[s];
	ctx.beginPath();
	ctx.strokeStyle="grey";
	ctx.lineWidth="0.5";
	ctx.rect(0,y,600,15);
	ctx.stroke();
	ctx.font = '10pt Calibri';
	ctx.textAlign = 'center';
    ctx.fillStyle = "red";
    ctx.fillText(hours, 50, y+12);
	s+=1;
	}
	for (var i=0; i < schedule.length; i++)
	{	
	schedule[i].drawCourse(backColor[i],frontColor[i]);
	}
}
var course1 = new Course("Course1", "Monday", "Wednesday", "10:30", "12:00", "Friday", "", "11:00", "14:00", "", "", "", ""); 
var course2 = new Course("Course2", "Tuesday", "Thursday", "10:00", "12:00", "", "", "", "", "Wednesday", "", "12:15", "15:05"); 
var course3 = new Course("Course3", "Monday", "Wednesday", "15:30", "17:00", "Friday", "", "14:15", "17:00", "", "", "", ""); 
var course4 = new Course("Course4", "Tuesday", "Thursday", "12:15", "13:30", "", "", "", "", "Monday", "", "12:30", "14:45"); 
var course5 = new Course("Course5", "Tuesday", "Thursday", "14:00", "15:00", "", "", "", "", "Friday", "", "11:00", "14:07"); 
var schedules = [course1, course2, course3, course4, course5]; 

drawSchedule(schedules); 
