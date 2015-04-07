

    function CourseTable ()
    {
      
        var table = " "; 
        
        this.drawTable = function(section)
		{ 
				
    		table +='<tbody><thead><tr><td rowspan ="3"> Course Name </td><td colspan = "13"> Section </td><td rowspan ="3"> Edit </td>';
            table += '<td rowspan ="3"> Delete </td></tr><tr><td rowspan ="2">Semester Offered</td><td colspan = "4"> Lecture </td><td colspan = "4"> Tutorial </td>';
            table += '<td colspan = "4"> Lab </td><tr><td> Day 1 </td><td> Day 2 </td><td> Start </td>';
            table += '<td> End </td><td> Day 1 </td><td> Day 2 </td><td> Start </td><td> End </td><td> Day 1 </td><td> Day 2 </td>';
            table += '<td> Start </td><td> End </td></tr></tr></thead>';
			
			for (var i=0; i < section.length; i++)
			{ 
			  table += section[i].returnCourse();
			} 

			table += '</tbody>';

            document.getElementById('course_table').innerHTML = table;
		};

    }
        
    function Course(cName, cAvailable, lDay1,lDay2, startL, endL,tDay1,tDay2,startT,endT,labDay1,labDay2,startLab,endLab)
    {
        this.courseName = cName;
		this.courseAvailability = cAvailable;
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
           
        this.returnCourse = function()
        {
			
			var courseHTMLString = "";
			courseHTMLString += '<tr><form><td> ' +cName+ '</td><td>' +cAvailable+ '</td><td>' +lDay1+ '</td><td>' +lDay2+ '</td><td>' +startL+ '</td><td>' +endL+ '</td>';
			courseHTMLString += '<td>' +tDay1+ '</td><td>' +tDay2+ '</td><td>' +startT+ '</td><td>' +endT+ '</td>';
			courseHTMLString += '<td>' +labDay1+ '</td><td>' +labDay2+ '</td><td>' +startLab+ '</td><td>' +endLab+ '</td>';
			courseHTMLString += '<td class="button_td"><button onclick="editCourse()" class = "buttons" name="editSection"> Edit Section </button> </td>';
			courseHTMLString += '<td class="button_td"> <form><button class = "buttons" type="submit" name="delSection" > Delete Section</button></td></form></tr>';    
			return courseHTMLString;       
		};
    }


    var myTable = new CourseTable();
    
    var course1 = new Course("Course1", "Fall", "Wed", "Wed", "8:45", "10:00", "Wed", "Wed", "8:45", "10:00", "Wed", "Wed",  "8:45", "10:00"); 
    var course2 = new Course("Course2", "Winter", "Mon", "Tues", "10:15", "11:30", "", "", "", "", "Wed", "", "12:00", "15:00"); 
    var course3 = new Course("Course3", "Summer", "Wed", "Fri", "10:15", "11:30", "", "", "", "", "Thursd", "", "12:00", "15:00"); 
    var course4 = new Course("Course1", "Fall", "Mon", "Tues", "8:45", "10:00", "Thursd", "", "8:45", "10:00", "", "", "", ""); 
    var course5 = new Course("Course2", "Winter", "Mon", "Tues", "10:15", "11:30", "", "", "", "", "Wed", "", "12:00", "15:00"); 
    var course6 = new Course("Course3", "Summer", "Wed", "Fri", "10:15", "11:30", "", "", "", "", "Thursd", "", "12:00", "15:00");
    var course7 = new Course("Course1", "Fall", "Mon", "Tues", "8:45", "10:00", "Thursd", "", "8:45", "10:00", "", "", "", ""); 
    var course8 = new Course("Course2", "Winter", "Mon", "Tues", "10:15", "11:30", "", "", "", "", "Wed", "", "12:00", "15:00"); 
    var course9 = new Course("Course3", "Summer", "Wed", "Fri", "10:15", "11:30", "", "", "", "", "Thursd", "", "12:00", "15:00");
  
    var sectionArray = [course1, course2, course3, course4, course5, course6, course7, course8, course9]; 
    
    myTable.drawTable(sectionArray);


	function toggle_visibility(id) {
       var e = document.getElementById(id);
       
		if (document.getElementById("edit_section").style.display == 'block')
			document.getElementById("edit_section").style.display='none'; 
		
		if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
    }

    function editCourse()
    {
		if (document.getElementById("add_section").style.display == 'block')
			document.getElementById("add_section").style.display='none'; 
		
        document.getElementById("edit_section").style.display='block'; 	

    }