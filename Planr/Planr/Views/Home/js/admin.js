
var table = ""; 

                table +='<tbody><thead><tr><td rowspan ="3"> Course NUMBER </td><td colspan = "12"> Section </td><td rowspan ="3"> Edit </td>';
                table += '<td rowspan ="3"> Delete </td></tr><tr><td colspan = "4"> Lecture </td><td colspan = "4"> Time </td>';
                table += '<td colspan = "4"> Tutorial </td><tr><td> Day 1 </td><td> Day 2 </td><td> Start </td>';
                table += '<td> End </td><td> Day 1 </td><td> Day 2 </td><td> Start </td><td> End </td><td> Day 1 </td><td> Day 2 </td>';
                table += '<td> Start </td><td> End </td></tr></tr></thead>';
                
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
             
                      this.drawCourse=function()
                      {
                        table += '<tr><td> ' +cName+ '</td><td>' +lDay1+ '</td><td>' +lDay2+ '</td><td>' +startL+ '</td><td>' +endL+ '</td>';
                        table += '<td>' +tDay1+ '</td><td>' +tDay2+ '</td><td>' +startT+ '</td><td>' +endT+ '</td>';
                        table += '<td>' +labDay1+ '</td><td>' +labDay2+ '</td><td>' +startLab+ '</td><td>' +endLab+ '</td>';
                        table += '<td> <form><button class = "button" type="submit" name="editCourse"> Edit Course </button></form> </td>';
                        table += '<td> <form><button class = "button" type="submit" name="delCourse" > Delete Course</button></form></td></tr>';    
                        
                      };
                }

                var course1 = new Course("Course1", "Monday", "Tuesday", "8:45", "10:00", "Thursday", "", "8:45", "10:00", "", "", "", ""); 
                var course2 = new Course("Course2", "Monday", "Tuesday", "10:15", "11:30", "", "", "", "", "Wednesday", "", "12:00", "15:00"); 
                var course3 = new Course("Course3", "Wednesday", "Friday", "10:15", "11:30", "", "", "", "", "Thursday", "", "12:00", "15:00"); 
                var course4 = new Course("Course1", "Monday", "Tuesday", "8:45", "10:00", "Thursday", "", "8:45", "10:00", "", "", "", ""); 
                var course5 = new Course("Course2", "Monday", "Tuesday", "10:15", "11:30", "", "", "", "", "Wednesday", "", "12:00", "15:00"); 
                var course6 = new Course("Course3", "Wednesday", "Friday", "10:15", "11:30", "", "", "", "", "Thursday", "", "12:00", "15:00");

                var schedules = [course1, course2, course3, course4, course5, course6]; 


				function drawTable(){ 
					for (var i=0; i < schedules.length; i++)
					{ 
					  schedules[i].drawCourse();
					}

					table += '</tbody></table>';

                document.getElementById("course_table").innerHTML = table;
					
				}
