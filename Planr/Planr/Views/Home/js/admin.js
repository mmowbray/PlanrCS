var stringSemester = ["Fall", "Winter", "Fall/Winter", "Summer 1", "Summer 2"]; 
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
        
    function Course(sectionID,cName, cAvailable, lDay1,lDay2,startL,endL,tDay1,tDay2,startT,endT,labDay1,labDay2,startLab,endLab)
    {
        this.cName = cName;
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
		this.sectionID=sectionID; 
		this.cAvailable=cAvailable;
        var semester= stringSemester[cAvailable-1];   
        this.returnCourse = function()
        {
			var courseHTMLString = "";
			courseHTMLString += '<tr><td> ' +cName+ '</td><td>' +semester+ '</td><td>' +lDay1+ '</td><td>' +lDay2+ '</td><td>' +startL+ '</td><td>' +endL+  '</td>';
			courseHTMLString += '<td>' +tDay1+ '</td><td>' +tDay2+ '</td><td>' +startT+ '</td><td>' +endT+ '</td>';
			courseHTMLString += '<td>' +labDay1+ '</td><td>' +labDay2+ '</td><td>' +startLab+ '</td><td>' +endLab+ '</td>';
			courseHTMLString += '<td class="button_td"> <button onclick="editCourse('+sectionID+')" class = "buttons" type="submit" name="editSection"> Edit Section </button></td>';
			courseHTMLString += '<td class="button_td"> <button class = "buttons" type="submit" name="delSection" > Delete Section</button></td></tr>';    
			return courseHTMLString;       
		};
    }


    var myTable = new CourseTable();
    
    var course1 = new Course(22,"Course1", 2, "Wed", "Wed", "8:45", "10:00", "Wed", "Wed", "8:45", "10:00", "Wed", "Wed",  "8:45", "10:00"); 
    var course2 = new Course(23,"Course2", 4, "Mon", "Tues", "10:15", "11:30", "", "", "", "", "Wed", "", "12:00", "15:00"); 
    var course3 = new Course(34,"Course3", 3, "Wed", "Frid", "10:15", "11:30", "", "", "", "", "Thurs", "", "12:00", "15:00"); 
    var course4 = new Course(36,"Course1", 1, "Mon", "Tues", "8:45", "10:00", "Thurs", "", "8:45", "10:00", "", "", "", ""); 
    var course5 = new Course(47,"Course2", 2, "Mon", "Tues", "10:15", "11:30", "", "", "", "", "Wed", "", "12:00", "15:00"); 
    var course6 = new Course(78,"Course3", 5, "Wed", "Frid", "10:15", "11:30", "", "", "", "", "Thurs", "", "12:00", "15:00");
    var course7 = new Course(89,"Course1", 3, "Mon", "Tues", "8:45", "10:00", "Thurs", "", "8:45", "10:00", "", "", "", ""); 
    var course8 = new Course(44,"Course2", 1, "Mon", "Tues", "10:15", "11:30", "", "", "", "", "Wed", "", "12:00", "15:00"); 
    var course9 = new Course(31,"Course3", 5, "Wed", "Frid", "10:15", "11:30", "", "", "", "", "Thurs", "", "12:00", "15:00");
  
    var sectionArray = [course1, course2, course3, course4, course5, course6, course7, course8, course9]; 
    
    myTable.drawTable(sectionArray);



	function toggle_visibility(id) {
		if (document.getElementById("edit_section").style.display == 'block')
			document.getElementById("edit_section").style.display='none'; 
		
       var e = document.getElementById(id);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
    }

    function editCourse(courseID)
    {
		clearRadio();
		$('html,body').animate({scrollTop:0}, 'fast');
		if (document.getElementById("add_section").style.display == 'block')
			document.getElementById("add_section").style.display='none'; 
		
		document.getElementById("edit_section").style.display = 'block'; 
		
		var course = searchById(sectionArray, courseID); 
		document.getElementById("courseID").value= courseID;
		document.getElementById("editcName").value= course.cName;
		document.getElementById("editlDay1").value= course.lDay1;
		document.getElementById("editlDay2").value= course.lDay2;
		document.getElementById("editstartL").value= course.startL;
		document.getElementById("editendL").value= course.endL;
		document.getElementById("edittDay1").value= course.tDay1;
		document.getElementById("edittDay2").value= course.tDay2;
		document.getElementById("editstartT").value= course.startT;
		document.getElementById("editendT").value= course.endT;
		document.getElementById("editlabDay1").value= course.labDay1;
		document.getElementById("editlabDay2").value= course.labDay2;
		document.getElementById("editstartLab").value= course.startLab;
		document.getElementById("editendLab").value= course.endLab;
		document.getElementById(stringSemester[course.cAvailable-1]).checked=true;
		
    }

	function searchById(arrayOfCourses, id)
	{
		for(var i=0; i<arrayOfCourses.length; i++)
		{
			if(arrayOfCourses[i].sectionID==id)
			{
				return arrayOfCourses[i];
			}
		}
	}
	function clearRadio()
	{
		for(var i=0; i<stringSemester.length; i++)
		{
		document.getElementById(stringSemester[i]).checked=false;
		}
	}
	var $rows = $('#course_table tr');
	$('#search').keyup(function() {
    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
    
    $rows.show().filter(function() {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
    }).hide();
	});
	
		function save()
	{
			var idSection=document.getElementById("courseID").value;
			window.alert(idSection); 
			var section = searchById(sectionArray, idSection); 
			var index = sectionArray.indexOf(section);
			window.alert(index);
			sectionArray[index].lDay1= document.getElementById("editlDay1").value;
			window.alert(sectionArray[index].lDay1);
			var table = document.getElementById("course_table"); 
			if(table) {table.parentNode.removeChild(table); }
			myTable.drawTable(sectionArray);
			toggle_visibility("edit_section");
			
	}