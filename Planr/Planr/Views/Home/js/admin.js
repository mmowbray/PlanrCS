var stringSemester = ["Fall", "Winter", "Fall/Winter", "Summer 1", "Summer 2"]; 

        
        function drawTable(section)
		{ 
			var table=""; 	
    		table +='<thead><tr><td rowspan ="3"> Course Name </td><td colspan = "12"> Section </td><td rowspan ="3"> Edit </td>';
            table += '<td rowspan ="3"> Delete </td></tr><tr><td rowspan ="2">Semester Offered</td><td colspan = "4"> Lecture </td><td colspan = "4"> Tutorial </td>';
            table += '<td colspan = "3"> Lab </td><tr><td> Day 1 </td><td> Day 2 </td><td> Start </td>';
            table += '<td> End </td><td> Day 1 </td><td> Day 2 </td><td> Start </td><td> End </td><td> Day 1 </td>';
            table += '<td> Start </td><td> End </td></tr></tr></thead><tbody>';
			
			for (var i=0; i < section.length; i++)
			{ 
			  table += returnCourse(section[i]);
			} 

			table += '</tbody>';

            document.getElementById('course_table').innerHTML = table;
		}
        
		function returnCourse(course)
        {
			var courseHTMLString = "";
			courseHTMLString += '<tr><td> ' +course.Course+ '</td><td>' +course.Availability+ '</td><td>' +course.Day1+ '</td><td>' +course.Day2+ '</td><td>' +course.StartTime+ '</td><td>' +course.EndTime+  '</td>';
			courseHTMLString += '<td>' +course.TutorialDay1+ '</td><td>' +course.TutorialDay2+ '</td><td>' +course.TutorialStartTime+ '</td><td>' +course.TutorialEndTime+ '</td>';
			courseHTMLString += '<td>' +course.LabDay+ '</td><td>' +course.LabStartTime+ '</td><td>' +course.LabEndTime+ '</td>';
			courseHTMLString += '<td class="button_td"> <button onclick="editCourse('+course.UniqueID+')" class = "buttons" type="submit" name="editSection"> Edit </button></td>';
			courseHTMLString += '<td class="button_td"> <button onclick="deleteCourse('+course.UniqueID+')" class = "buttons" type="submit" name="delSection" > Delete</button></td></tr>';    
			return courseHTMLString;       
		}
	var sectionArray=[]; 
	$(document).ready(function() {
		$.get("http://planr.me/Admin/GetSections/",function(response){
		
		drawTable(response);
		sectionArray=response; 
		});
	});		

	function toggle_visibility(id) {
		if (document.getElementById("edit_section").style.display == 'block')
			document.getElementById("edit_section").style.display='none'; 
		
       var e = document.getElementById(id);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
    }

    function editCourse(key)
    {
		clearRadio();
		$('html,body').animate({scrollTop:0}, 'fast');
		if (document.getElementById("add_section").style.display == 'block')
			document.getElementById("add_section").style.display='none'; 
		
		document.getElementById("edit_section").style.display = 'block'; 
		
		var course = searchById(sectionArray, key); 
		document.getElementById("courseID").value= key;
		document.getElementById("editcName").value= course.Course;
		document.getElementById("editlDay1").value= course.Day1;
		document.getElementById("editlDay2").value= course.Day2;
		document.getElementById("editstartL").value= course.StartTime;
		document.getElementById("editendL").value= course.EndTime;
		document.getElementById("edittDay1").value= course.TutorialDay1;
		document.getElementById("edittDay2").value= course.TutorialDay2;
		document.getElementById("editstartT").value= course.TutorialStartTime;
		document.getElementById("editendT").value= course.TutorialEndTime;
		document.getElementById("editlabDay1").value= course.LabDay;
		document.getElementById("editstartLab").value= course.LabStartTime;
		document.getElementById("editendLab").value= course.LabEndTime;
		alert(course.Availability); 
		document.getElementById(course.Availability).checked=true;
		
    }

	function searchById(arrayOfCourses, id)
	{
		for(var i=0; i<arrayOfCourses.length; i++)
		{
			if(arrayOfCourses[i].UniqueID==id)
			{
				return arrayOfCourses[i];
			}
		}
	}
	function clearRadio()
	{
		for(var i=1; i<7; i++)
		{
		document.getElementById(i).checked=false;
		}
	}

	// TODO: change save to editSave, addSave.
		function save()
		{
			var idSection=document.getElementById("Course").value;
			window.alert(idSection); 
			var section = searchById(sectionArray, idSection); 
			window.reload(); 
		}
		
		
		
		
		function courseOption () {
			var courseOptionContent = '<label style="width:162.5px;" id="select_option">Course Name</label> <select name="courses"> ';
			var courseName=[]; 
			for(var i=0; i<sectionArray.length;i++)
			{
				courseName.push(sectionArray[i].Course); 
			}
			courseName=eliminateDuplicates(courseName);

			for (var i=0; i < courseName.length; i++)
			{
				courseOptionContent += '<option value=" ' + courseName[i] + ' "> ' +courseName[i]+ ' </option>';

			}

			courseOptionContent += '</select>';

			document.getElementById("select_option").innerHTML = courseOptionContent;
		}
		
		function eliminateDuplicates(arr) {
			var i,
			len=arr.length,
			out=[],
			obj={};

			for (i=0;i<len;i++) {
			obj[arr[i]]=0;
			}
			for (i in obj) {
			out.push(i);
			}
			return out;
		}

		function deleteCourse(Course)
		{
			var course= searchById(sectionArray, Course);  
			window.alert("Are you sure you want to delete "+course.Course+"?"+course.UniqueID);
		}

		function addCourse(course)
		{
		
		}
		
		function validateInputAdd()
		{
			
		}

		function validateInputEdit()
		{
			
		}