<<<<<<< HEAD
var stringSemester = ["Fall", "Winter", "Fall/Winter", "Summer 1", "Summer 2"]; 

        
=======

>>>>>>> 72f119e91869094e658076d1fcb672848f1c53d1
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
<<<<<<< HEAD
=======

>>>>>>> 72f119e91869094e658076d1fcb672848f1c53d1
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
		resetStyleEdit();
		
		var course = searchById(sectionArray, key); 
		document.getElementById("sectionID").value= key;
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
		// alert(course.Availability); 
		document.getElementById(course.Availability).checked=true;
		
		
<<<<<<< HEAD
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
		
=======
>>>>>>> 72f119e91869094e658076d1fcb672848f1c53d1
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
<<<<<<< HEAD
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
		
		
=======
			var courseOptionContent = '<label style="width:162.5px;" >Course Name</label> <select id="course_name" name="courses"> ';
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
		
>>>>>>> 72f119e91869094e658076d1fcb672848f1c53d1
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
<<<<<<< HEAD
		function deleteCourse(Course)
		{
		var course= searchById(sectionArray, Course);  
		window.alert("Are you sure you want to delete "+course.Course+"?"+course.UniqueID);
		}
=======

		function deleteCourse(Course)
		{
			var course= searchById(sectionArray, Course);  
			window.alert("Are you sure you want to delete "+course.Course+"?"+course.UniqueID);
		}

>>>>>>> 72f119e91869094e658076d1fcb672848f1c53d1
		function addCourse(course)
		{
		
		}
<<<<<<< HEAD
		function validateInputAdd()
		{
			
		}
=======
		

		// Function for overall validation
		function validateInputAdd()
		{
			
			var courseName = document.getElementById("course_name").value;
			var courseL1 = document.getElementById("lDay1").value.toUpperCase();
			var courseL2 = document.getElementById("lDay2").value.toUpperCase();
			var startLec = document.getElementById("startL").value;
			var endLec = document.getElementById("endL").value;
			var courseT1 = document.getElementById("tDay1").value.toUpperCase();
			var courseT2 = document.getElementById("tDay2").value.toUpperCase();
			var startTut = document.getElementById("startT").value;
			var endTut = document.getElementById("endT").value;
			var courseLab1 = document.getElementById("labDay1").value.toUpperCase();
			var startLab = document.getElementById("startLab").value;
			var endLab = document.getElementById("endLab").value;
			var courseSemester = getSelectedSemester("semester");
				
			
			var validL1 = validDay(courseL1, "lDay1");
			var validL2 = validDay(courseL2, "lDay2");
			var validStartL = validTime(startLec, "startL");
			var validEndL = validTime(endLec, "endL");
			var validT1 = validDay(courseT1, "tDay1");
			var validT2 = validDay(courseT2, "tDay2");
			var validStartTut = validTime(startTut, "startT");
			var validEndTut = validTime(endTut, "endT");
			var validLab = validDay(courseLab1, "labDay1");
			var validStartLab = validTime(startLab, "startLab");
			var validEndLab = validTime(endLab, "endLab");
			
			
			var isSemesterSelected = selectedSemester("semester");
			var lectureRequired = nonEmptyInput(courseL1, "lDay1");
			var lectureStartRequired = nonEmptyInput(startLec, "startL");
			var lectureEndRequired = nonEmptyInput(endLec, "endL");
			var inputNonEmpty = lectureRequired && lectureStartRequired && lectureEndRequired;
			
			var validInput = validL1 && validL2 && validStartL && validEndL && validT1 && validT2 && validStartTut && validEndTut && validLab && validStartLab && validEndLab && isSemesterSelected && inputNonEmpty;
			
			if (validInput)
				// CALL FIRAS FUNCTION --> addCourse()
				alert ("Valid input. Call Firas' function");
			else
				alert ("Mistakes shown is red.");
		}

		function validateInputEdit()
		{
			
			var courseL1 = document.getElementById("editlDay1").value.toUpperCase();
			var courseL2 = document.getElementById("editlDay2").value.toUpperCase();
			var startLec = document.getElementById("editstartL").value;
			var endLec = document.getElementById("editendL").value;
			var courseT1 = document.getElementById("edittDay1").value.toUpperCase();
			var courseT2 = document.getElementById("edittDay2").value.toUpperCase();
			var startTut = document.getElementById("editstartT").value;
			var endTut = document.getElementById("editendT").value;
			var courseLab1 = document.getElementById("editlabDay1").value.toUpperCase();
			var startLab = document.getElementById("editstartLab").value;
			var endLab = document.getElementById("editendLab").value;
			var courseSemester = getSelectedSemester("semester");
				
			
			var validL1 = validDay(courseL1, "editlDay1");
			var validL2 = validDay(courseL2, "editlDay2");
			var validStartL = validTime(startLec, "editstartL");
			var validEndL = validTime(endLec, "editendL");
			var validT1 = validDay(courseT1, "edittDay1");
			var validT2 = validDay(courseT2, "edittDay2");
			var validStartTut = validTime(startTut, "editstartT");
			var validEndTut = validTime(endTut, "editendT");
			var validLab = validDay(courseLab1, "editlabDay1");
			var validStartLab = validTime(startLab, "editstartLab");
			var validEndLab = validTime(endLab, "editendLab");
			
			var lectureRequired = nonEmptyInput(courseL1, "editlDay1");
			var lectureStartRequired = nonEmptyInput(startLec, "editstartL");
			var lectureEndRequired = nonEmptyInput(endLec, "editendL");
			var inputNonEmpty = lectureRequired && lectureStartRequired && lectureEndRequired;
			var isSemesterSelected = selectedSemester("editsemester");
			
			var validInput = validL1 && validL2 && validStartL && validEndL && validT1 && validT2 && validStartTut && validEndTut && validLab && validStartLab && validEndLab && isSemesterSelected && inputNonEmpty;
			
			if (validInput)
				// CALL FIRAS FUNCTION --> addCourse()
				alert ("Valid input. Call Firas' function");
			else
				alert ("Mistakes shown is red from edit.");
		}

		// Function that returns selected semester within the radio buttons
		function getSelectedSemester(radioGroup) {

				var radioSem = document.getElementsByName(radioGroup);
				
				for ( var i = 0; i < radioSem.length; i++) {
					if (radioSem.item(i).checked) 
						return radioSem.item(i).value;
			}
		}

		// Function that checks if a semester has been selected
		function selectedSemester(radioGroup) {

				var radioSem = document.getElementsByName(radioGroup);
				// var isSelected = false;
			
				for ( var l = 0; l < radioSem.length; l++)
					if (radioSem.item(l).checked === true) 
						return true;
					
				return false;	
			
		}

		// Function checks for right format of the days (M / T / W / J / F)
		function validDay(day, id)
		{
			var arrayDay = ["M", "T", "W", "J", "F", ""];
			var isValid = false;
			
			for (var i = 0; i < arrayDay.length; i++)
			{
				if (day == arrayDay[i])		
					isValid = true;
			}
			
			return changeInputField (isValid, id);
		}

		// Function checks for right format of the time (00:00)
		function validTime(time, id) 
		{
			var isValid = false;
			
			if (time === "")
				return true;
			else 
				isValid = /([0-1]\d|2[0-3]):([0-5]\d)/.test(time);
			
			
			return changeInputField (isValid, id);
		}

		// Function checks for non-empty input
		function nonEmptyInput(input, id) 
		{
			var isValid = false;
			
			if (input !== "")
				isValid = true;
			else 
				isValid = false;
			
			return changeInputField(isValid, id);
		}

		// Function changes the border of input fields to indicate to the user something has gone wrong.
		function changeInputField(valid, myId)
		{
			if (valid !== true) {
				document.getElementById(myId).style.borderColor = "red";

				return false;
			}
			else
				return true;
		}

		function resetInputEdit()
		{
			resetStyleEdit();
			
			var myKey = document.getElementById("sectionID").value;
			editCourse(myKey);
			
		}

		function resetStyleEdit(){
			
			document.getElementById("editlDay1").style.borderColor = "";
			document.getElementById("editlDay2").style.borderColor = "";
			document.getElementById("editstartL").style.borderColor = "";
			document.getElementById("editendL").style.borderColor = "";
			document.getElementById("edittDay1").style.borderColor = "";
			document.getElementById("editlDay2").style.borderColor = "";
			document.getElementById("editstartT").style.borderColor = "";
			document.getElementById("editendT").style.borderColor = "";
			document.getElementById("editlabDay1").style.borderColor = "";
			document.getElementById("editstartLab").style.borderColor = "";
			document.getElementById("editendLab").style.borderColor = "";
		}

		function resetInputAdd() {
			document.getElementById("lDay1").style.borderColor = "";
			document.getElementById("lDay2").style.borderColor = "";
			document.getElementById("startL").style.borderColor = "";
			document.getElementById("endL").style.borderColor = "";
			document.getElementById("tDay1").style.borderColor = "";
			document.getElementById("lDay2").style.borderColor = "";
			document.getElementById("startT").style.borderColor = "";
			document.getElementById("endT").style.borderColor = "";
			document.getElementById("labDay1").style.borderColor = "";
			document.getElementById("startLab").style.borderColor = "";
			document.getElementById("endLab").style.borderColor = "";
		}

function saveAddSection()
		{
			var section={}; 
			section.Course = document.getElementById("course_name").value;
			section.Day1 = document.getElementById("lDay1").value.toUpperCase();
			section.Day2 = document.getElementById("lDay2").value.toUpperCase();
			section.StartTime = document.getElementById("startL").value; 
			section.EndTime = document.getElementById("endL").value;
			section.TutorialDay1 = document.getElementById("tDay1").value.toUpperCase();
			section.TutorialDay2 = document.getElementById("tDay2").value.toUpperCase();
			section.TutorialStartTime = document.getElementById("startT").value;
			section.TutorialEndTime = document.getElementById("endT").value; 
			section.LabDay = document.getElementById("labDay1").value.toUpperCase();
			section.LabStartTime = document.getElementById("startLab").value;
			section.LabEndTime = document.getElementById("endLab").value;
			section.Availability = getSelectedSemester("semester");
			$.get( "http://planr.me/Admin/AddSection", section, function(responseCode ) {
						alert("Section has been successfully added");
						 location.reload();
				});
		}
		//function to delete a section
		function deleteCourse(sectionID)
		{
			$.get( "http://planr.me/Admin/DeleteSection", {"sectionUniqueID":sectionID}, function( responseCode ) {
					if(responseCode==0) {alert("Section Successfully deleted");
					location.reload();}
				});
		}
		
		//function to edit a section
		function saveEditSection()
		{
			var section={}; 
			
			section.Course = document.getElementById("editcName").value;
			section.CourseID= document.getElementById("courseID").value; 
			section.UniqueID= document.getElementById("sectionID").value; 
			section.Day1 = document.getElementById("editlDay1").value.toUpperCase();
			section.Day2 = document.getElementById("editlDay2").value.toUpperCase();
			section.StartTime = document.getElementById("editstartL").value;
			section.EndTime = document.getElementById("editendL").value;
			section.TutorialDay1 = document.getElementById("edittDay1").value.toUpperCase();
			section.TutorialDay2 = document.getElementById("edittDay2").value.toUpperCase();
			section.TutorialStartTime = document.getElementById("editstartT").value;
			section.TutorialEndTime = document.getElementById("editendT").value;
			section.LabDay = document.getElementById("editlabDay1").value.toUpperCase();
			section.LabStartTime = document.getElementById("editstartLab").value;
			section.LabEndTime = document.getElementById("editendLab").value;
			section.Availability = getSelectedSemester("editsemester");
			location.reload();
			$.get( "http://planr.me/Admin/UpdateExistingSection", section, function(responseCode ) {
						alert("Section has been successfully edited");	
					}
				);
			
			}
// filter table. 			
(function(document) {
	'use strict';

	var LightTableFilter = (function(Arr) {

		var _input;

		function _onInputEvent(e) {
			_input = e.target;
			var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
			Arr.forEach.call(tables, function(table) {
				Arr.forEach.call(table.tBodies, function(tbody) {
					Arr.forEach.call(tbody.rows, _filter);
				});
			});
		}

		function _filter(row) {
			var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
			row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
		}

		return {
			init: function() {
				var inputs = document.getElementsByClassName('light-table-filter');
				Arr.forEach.call(inputs, function(input) {
					input.oninput = _onInputEvent;
				});
			}
		};
	})(Array.prototype);

	document.addEventListener('readystatechange', function() {
		if (document.readyState === 'complete') {
			LightTableFilter.init();
		}
	});

})(document);

>>>>>>> 72f119e91869094e658076d1fcb672848f1c53d1
