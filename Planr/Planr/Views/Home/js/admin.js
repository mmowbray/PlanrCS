

    function CourseTable ()
    {
      
        var table = " "; 
        
        this.drawTable = function(section)
		{ 
				
    		table +='<tbody><thead><tr><td rowspan ="3"> Course Number </td><td colspan = "12"> Section </td><td rowspan ="3"> Edit </td>';
            table += '<td rowspan ="3"> Delete </td></tr><tr><td colspan = "4"> Lecture </td><td colspan = "4"> Tutorial </td>';
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
        
    function Course(cName,lDay1,lDay2,startL,endL,tDay1,tDay2,startT,endT,labDay1,labDay2,startLab,endLab)
    {
        this.courseName = cName;
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
			courseHTMLString += '<tr><td> ' +cName+ '</td><td>' +lDay1+ '</td><td>' +lDay2+ '</td><td>' +startL+ '</td><td>' +endL+ '</td>';
			courseHTMLString += '<td>' +tDay1+ '</td><td>' +tDay2+ '</td><td>' +startT+ '</td><td>' +endT+ '</td>';
			courseHTMLString += '<td>' +labDay1+ '</td><td>' +labDay2+ '</td><td>' +startLab+ '</td><td>' +endLab+ '</td>';
			courseHTMLString += '<td class="button_td"> <form><button class = "buttons" type="submit" name="editSection"> Edit Section </button></form> </td>';
			courseHTMLString += '<td class="button_td"> <form><button class = "buttons" type="submit" name="delSection" > Delete Section</button></form></td></tr>';    
			return courseHTMLString;       
		};
    }


    var myTable = new CourseTable();
    
    var course1 = new Course("Course1", "Wednesday", "Wednesday", "8:45", "10:00", "Wednesday", "Wednesday", "8:45", "10:00", "Wednesday", "Wednesday",  "8:45", "10:00"); 
    var course2 = new Course("Course2", "Monday", "Tuesday", "10:15", "11:30", "", "", "", "", "Wednesday", "", "12:00", "15:00"); 
    var course3 = new Course("Course3", "Wednesday", "Friday", "10:15", "11:30", "", "", "", "", "Thursday", "", "12:00", "15:00"); 
    var course4 = new Course("Course1", "Monday", "Tuesday", "8:45", "10:00", "Thursday", "", "8:45", "10:00", "", "", "", ""); 
    var course5 = new Course("Course2", "Monday", "Tuesday", "10:15", "11:30", "", "", "", "", "Wednesday", "", "12:00", "15:00"); 
    var course6 = new Course("Course3", "Wednesday", "Friday", "10:15", "11:30", "", "", "", "", "Thursday", "", "12:00", "15:00");
    var course7 = new Course("Course1", "Monday", "Tuesday", "8:45", "10:00", "Thursday", "", "8:45", "10:00", "", "", "", ""); 
    var course8 = new Course("Course2", "Monday", "Tuesday", "10:15", "11:30", "", "", "", "", "Wednesday", "", "12:00", "15:00"); 
    var course9 = new Course("Course3", "Wednesday", "Friday", "10:15", "11:30", "", "", "", "", "Thursday", "", "12:00", "15:00");
  
    var sectionArray = [course1, course2, course3, course4, course5, course6, course7, course8, course9]; 
    
    myTable.drawTable(sectionArray);



	function addSectionToDb() {
		
		var myForm = '<div id= "add_sections"><form>';
		myForm += '<div class="form_field"><label for="cName" class="form_field_label">Course Name</label>';
        myForm += '<input class="form_field_label" name="cName" type="text" placeholder="Course name"  autocomplete="off" required/></div>';
		myForm += '<div class="form_field"><label for="cAvailability" class="form_field_label">Course Availability</label>';
		myForm += '<input class="form_field_label" name="cAvailability" type="text" placeholder="Course availability"  autocomplete="off" required/></div>';
		myForm += '<div class="form_field"><label for="lDay1" class="form_field_label">Lecture Day 1</label>';
		myForm += '<input class="form_field_label" name="lDay1" type="text" placeholder="Lecture Day 1"  autocomplete="off" required/></div>';
		myForm += '<div class="form_field"><label for="lDay2" class="form_field_label">Lecture Day 2</label>';
		myForm += '<input class="form_field_label" name="lDay2" type="text" placeholder="Lecture Day 2"  autocomplete="off" required/></div>';
		myForm += '<div class="form_field"><label for="lstart" class="form_field_label">Lecture Start time</label>';
        myForm += '<input class="form_field_label" name="lstart" type="text" placeholder="Lecture Start Time"  autocomplete="off" required/></div>';
		myForm += '<div class="form_field"><label for="lend" class="form_field_label">Lecture End time</label>';
		myForm += '<input class="form_field_label" name="lend" type="text" placeholder="Lecture End Time"  autocomplete="off" required/></div>';
		myForm += '<div class="form_field"><label for="tDay1" class="form_field_label">Tutorial Day 1</label>';
		myForm += '<input class="form_field_label" name="tDay1" type="text" placeholder="Tutorial Day 1"  autocomplete="off" required/></div>';
		myForm += '<div class="form_field"><label for="tDay2" class="form_field_label">Tutorial Day 2</label>';
		myForm += '<input class="form_field_label" name="tDay2" type="text" placeholder="Tutorial Day 2"  autocomplete="off" required/></div>';
		myForm += '<div class="form_field"><label for="tstart" class="form_field_label">Tutorial Start time</label>';
		myForm += '<input class="form_field_label" name="tstart" type="text" placeholder="Tutorial Start Time"  autocomplete="off" required/></div>';
		myForm += '<div class="form_field"><label for="tend" class="form_field_label">Tutorial End time</label>';
		myForm += '<input class="form_field_label" name="tend" type="text" placeholder="Tutorial End Time"  autocomplete="off" required/></div>';
		myForm += '<div class="form_field"><label for="labDay1" class="form_field_label">Lab Day 1</label>';
		myForm += '<input class="form_field_label" name="labDay1" type="text" placeholder="Lab Day 1"  autocomplete="off" required/></div>';
		myForm += '<div class="form_field"><label for="labDay2" class="form_field_label">Lab Day 2</label>';
		myForm += '<input class="form_field_label" name="labDay2" type="text" placeholder="Lab Day 2"  autocomplete="off" required/></div>';
		myForm += '<div class="form_field"><label for="labstart" class="form_field_label">Lab Start time</label>';
		myForm += '<input class="form_field_label" name="labstart" type="text" placeholder="Lab Start Time"  autocomplete="off" required/></div>';
		myForm += '<div class="form_field"><label for="labend" class="form_field_label">Lab End time</label>';
		myForm += '<input class="form_field_label" name="labend" type="text" placeholder="Lab End Time"  autocomplete="off" required/></div>';
		myForm += '<div id="add_course_but"><input id="adding_button" type="submit" value="Add Section" /></div></form></div>';
        
			 document.getElementById('add_section').innerHTML = myForm;
		
	}