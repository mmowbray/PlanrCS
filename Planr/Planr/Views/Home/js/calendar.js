var canvas = document.getElementById("calendar"); 
var ctx=canvas.getContext("2d");
var x=0, y=0; 
var s=0;
var day, hour; 
var days= ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]; 
var time = ["8:00", "8:15", "8:30", "8:45", "9:00", "9:15", "9:30", "9:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45" ,"23:00"]
var width = 0; 
var height = 0; 
	ctx.beginPath();
	ctx.strokeStyle="grey";
	ctx.lineWidth="0.5";
	ctx.rect(0,0,100,1024);
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle="grey";
	ctx.lineWidth="0.5";
	ctx.rect(0,0,600,16);
	ctx.stroke();
	
for(x=100; x<600; x+=100)
{
	day = days[s];
	ctx.beginPath();
	ctx.strokeStyle="grey";
	ctx.lineWidth="0.5";
	ctx.rect(x,0,100,1024);
	ctx.stroke();
	ctx.font = 'italic 10pt Calibri';
	ctx.textAlign = 'center';
    ctx.fillStyle = "red";
    ctx.fillText(day, x+50, 12);
	s+=1;
}
s=0;
for(y=16; y<1024; y+=16)
{
	hour = time[s];
	ctx.beginPath();
	ctx.strokeStyle="grey";
	ctx.lineWidth="0.5";
	ctx.rect(0,y,600,16);
	ctx.stroke();
	ctx.font = 'italic 10pt Calibri';
	ctx.textAlign = 'center';
    ctx.fillStyle = "red";
    ctx.fillText(hour, 50, y+12);
	s+=1;
}
var course1 = ["Comp335","9:45", "11:00","Lec", "Monday", "Wednesday", "13:45", "16:00", "tut", "Thursday"];
var name = course1[0];
var startLecture = time.indexOf(course1[1]);
var endLecture = time.indexOf(course1[2]);
var type = course1[3]; 
var day1 = days.indexOf(course1[4]); 
var day2 = days.indexOf(course1[5]);

var startTutorial = time.indexOf(course1[6]);
var endTutorial = time.indexOf(course1[7]);
var type2 = course1[8];
var dayTut = days.indexOf(course1[9]);  


startLecture=(startLecture+1)*16; 
endLecture = (endLecture+1)*16;
day1=(day1+1)*100; 
day2=(day2+1)*100; 

ctx.fillStyle = "grey";
ctx.fillRect(day1,startLecture,100,endLecture-startLecture);
ctx.font = 'italic 10pt Calibri';
ctx.textAlign = 'center';
ctx.fillStyle = "black";
ctx.fillText(course1[0], day1+50, (startLecture+endLecture)/2);
ctx.fillText(type.concat(" ",course1[1],"-",course1[2]), day1+50, (startLecture+endLecture)/2+16);

ctx.fillStyle = "grey";
ctx.fillRect(day2,startLecture,100,endLecture-startLecture);
ctx.font = 'italic 10pt Calibri';
ctx.textAlign = 'center';
ctx.fillStyle = "black";
ctx.fillText(course1[0], day2+50, (startLecture+endLecture)/2);
ctx.fillText(type.concat(" ",course1[1],"-",course1[2]), day2+50, (startLecture+endLecture)/2+16);

startTutorial=(startTutorial+1)*16; 
endTutorial = (endTutorial+1)*16;
dayTut=(dayTut+1)*100; 

ctx.fillStyle = "yellow";
ctx.fillRect(dayTut,startTutorial,100,endTutorial-startTutorial);
ctx.font = 'italic 10pt Calibri';
ctx.textAlign = 'center';
ctx.fillStyle = "black";
ctx.fillText(course1[0], dayTut+50, (startTutorial+endTutorial)/2);
ctx.fillText(type2.concat(" ",course1[6],"-",course1[7]), dayTut+50, (startTutorial+endTutorial)/2+16);




	