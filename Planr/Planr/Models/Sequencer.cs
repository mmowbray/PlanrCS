using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace Planr.Models
{
    public static class Sequencer
    {

        public static bool verifyPrereq(Course co, int i, List<String> complst, List<int> engr2, List<int> comp2, List<int> soen2, int[] removeA)
        {
            bool approved = false;
            int c = 0;
            String[] pre_req = null;
            String[] co_req = null;
            String[] availability;
            String x = null;
            string[] cmpare;
            bool pre_req_ok = false;
            bool co_req_ok = false;
            availability = co.Availability.Split('/');
            if (co.Corequisites != null)
                co_req = co.Corequisites.Split('/');
            if (co.Prerequisites != null)
                pre_req = co.Prerequisites.Split('/');
            if (co.Corequisites == null && co.Prerequisites == null)
            {
                pre_req_ok = true;
                co_req_ok = true;
            }
            else if (co.Prerequisites == null)
                pre_req_ok = true;
            else if (co.Corequisites == null)
                co_req_ok = true;
            if (Array.IndexOf(availability, (i).ToString()) != -1)
            {
                if (Array.IndexOf(removeA, co.CourseID) == -1)
                {
                    if (pre_req_ok == false)
                    {
                        while (c < pre_req.Length)
                        {
                            x = pre_req[c];
                            if (complst.Contains(x) == false)
                            {
                                pre_req_ok = false;
                                break;
                            }
                            else
                            {
                                pre_req_ok = true;
                            }
                            c++;
                        }
                    }
                    c = 0;
                    if (co_req_ok == false)
                    {
                        while (c < co_req.Length)
                        {
                            x = co_req[c];
                            if (complst.Contains(x) || Array.IndexOf(removeA, x) != -1)
                                co_req_ok = true;
                            else
                            {
                                co_req_ok = false;
                                break;
                            }

                            c++;
                        }
                    }
                }
                if (co_req_ok == true && pre_req_ok == true)
                {
                    cmpare = co.CourseName.Split(' ');
                    if (cmpare[0] == "ENGR" && (cmpare[1][0] == '3' || cmpare[1][0] == '4'))
                    {
                        if (engr2.Any() == false)
                            approved = true;
                    }
                    else if (cmpare[0] == "COMP" && (cmpare[1][0] == '3' || cmpare[1][0] == '4'))
                    {
                        if (comp2.Any() == false)
                            approved = true;
                    }
                    else if (cmpare[0] == "SOEN" && (cmpare[1][0] == '3' || cmpare[1][0] == '4'))
                    {
                        if (soen2.Any() == false)
                            approved = true;
                    }
                    else
                        approved = true;
                }
                else
                    approved = false;
            }
            return approved;
        }

        public static Sequence GenerateSequence(Student student, int semester_int, int summer_bool)
        {
            Course[,,] sequence = new Course[6, 5, 5];
            int[] engr = {68, 69, 70, 71};
            List<int> engr2 = engr.OfType<int>().ToList();
            int[] soen = {84, 85};
            List<int> soen2 = soen.OfType<int>().ToList();
            int[] comp = {77, 78, 79};
            List<int> comp2 = comp.OfType<int>().ToList();
            int i = 0, j = 0, k = 0;
            int general_elective = 1;
            int science = 2;
            int elective = 5;
            int[] student_p = {96, 93, 91, 90, 88, 89};
                // This will be default, but we can change these to student preference.
            Hashtable important = new Hashtable();
            Course General_Elective = new Course();
            General_Elective.CourseID = 111111;
            General_Elective.CourseName = "General Elective";
            Course Basic_Science = new Course();
            Basic_Science.CourseID = 222222;
            Basic_Science.CourseName = "Basic Science";
            Course Elective = new Course();
            Elective.CourseID = 333333;
            Elective.CourseName = "Elective Based on Option";
            bool chk = false;
            //ignore option//int tech_elective = 2;
            string student_Option = student.Record.Option;
            List<Student.AcademicRecord> academicRecords;
            List<Course> items;
            String[] student_Completed = null;
            if (student.Record.CompletedCourses != null)
                student_Completed = student.Record.CompletedCourses.Split('/');
            if (student.SavedPreferences.priorityCourse != null)
                student_p = student.SavedPreferences.priorityCourse.Split('/').Select( pref => Int32.Parse(pref)).ToArray();
            
            bool approved = false;
            items = DBInterfacer.GetCourses();
           
            String[] copyCompleted = new String[student_Completed.Length];
            Array.Copy(student_Completed, copyCompleted, student_Completed.Length);
            Hashtable neededCourses = new Hashtable();
            Hashtable allCourses = new Hashtable();
            foreach (var item in items)
            {

                allCourses.Add(item.CourseID, item);
                if (item.CourseType == "Eng Core" || item.CourseType == "Comp-Sci" ||
                    item.CourseType == "Software Eng Core")
                {
                    int tmp = Array.IndexOf(copyCompleted, item.CourseID.ToString());
                    if (tmp == -1)
                    {
                        neededCourses.Add(item.CourseID, item);
                        if (Array.IndexOf(student_p, item.CourseID) != -1)
                            important.Add(item.CourseID, item);
                    }
                    else
                    {
                        copyCompleted[tmp] = null;
                        if (soen2.Contains(item.CourseID))
                            soen2.Remove(item.CourseID);
                        else if (engr2.Contains(item.CourseID))
                            engr2.Remove(item.CourseID);
                        else if (comp2.Contains(item.CourseID))
                            comp2.Remove(item.CourseID);
                    }
                }
            }
            int c = 0;
            Course tmp_cse;
            String wut;
            while (c < copyCompleted.Length)
            {

                if (copyCompleted[c] != null)
                {

                    i = 0;
                    Int32.TryParse(copyCompleted[c], out i);
                    tmp_cse = (Course) allCourses[i];
                    wut = tmp_cse.CourseType;
                    if (wut == "General Elective")
                        general_elective--;
                    else if (wut == "Basic Science")
                        science--;
                    else //ignore option//
                        elective--;
                }
                c++;
            }
            //begining of sequencer
            // i: semester, j:year k: courses(sequence)
            //i = 0 online,1 fall/winter,2 fall,3 winter,4 summer1, 5 summer2 -- assume the student generate sequence for september
            //j= 0 current year
            i = semester_int;
            j = 0;
            k = 0;
            Course tmpCourse2;
            int z;
            int loopTwice = 0;
            Course tmpCourse;
            bool ready = false;
            int cr, ci;
            String[] co_req = new String[0];
            int counter = 0;
            Course co = null;
            int loopC = 0;
            bool abc = true;
            int[] removeA = new int[5];
            Course priority;
            List<String> complst = student_Completed.OfType<String>().ToList();
            while (general_elective != 0 || science != 0 || elective != 0 || neededCourses.Count != 0)
            {
                //Console.WriteLine(general_elective + " " + science + " " + elective + " " + neededCourses.Count);
                loopTwice = 0;
                loopC = 0;
                while (loopC < 20)
                {
                    abc = true;
                    while (loopTwice < 2)
                    {
                        ci = 0;
                        foreach (int key in important.Keys)
                        {
                            priority = (Course) important[key];
                            if (complst.Contains(priority.CourseID.ToString()) == false &&
                                Array.IndexOf(removeA, priority.CourseID) == -1)
                            {
                                approved = verifyPrereq(priority, i, complst, engr2, comp2, soen2, removeA);
                                if (approved == false)
                                {
                                    if (priority.Corequisites != null)
                                    {
                                        co_req = priority.Corequisites.Split('/');
                                        cr = co_req.Length;

                                    }
                                    else
                                    {
                                        cr = 0;
                                    }
                                    foreach (String cor in co_req)
                                    {
                                        Int32.TryParse(cor, out z);
                                        tmpCourse = (Course) allCourses[z];
                                        if (complst.Contains(tmpCourse.CourseID.ToString()) == false)
                                        {
                                            approved = verifyPrereq(tmpCourse, i, complst, engr2, comp2, soen2, removeA);
                                            if (approved != true)
                                            {
                                                approved = false;
                                                break;
                                            }
                                        }
                                    }
                                    if (approved == true && k + cr + 2 < 4 && i != 4 && i != 5)
                                    {
                                        foreach (String cor in co_req)
                                        {
                                            Int32.TryParse(cor, out z);
                                            tmpCourse = (Course) allCourses[z];
                                            if (complst.Contains(tmpCourse.CourseID.ToString()) == false)
                                            {
                                                sequence[i, j, k] = tmpCourse;
                                                removeA[k] = tmpCourse.CourseID;
                                                loopC = 0;
                                                k++;
                                                if (tmpCourse.CourseID == 89)
                                                {
                                                    tmpCourse2 = (Course) allCourses[90];
                                                    sequence[i, j, k] = tmpCourse2;
                                                    removeA[k] = tmpCourse2.CourseID;
                                                    loopC = 0;
                                                    k++;
                                                    if (neededCourses.ContainsKey(tmpCourse2.CourseID))
                                                        neededCourses.Remove(tmpCourse2.CourseID);
                                                }
                                                if (neededCourses.ContainsKey(tmpCourse.CourseID))
                                                    neededCourses.Remove(tmpCourse.CourseID);
                                            }
                                        }
                                        sequence[i, j, k] = priority;
                                        removeA[k] = priority.CourseID;
                                        loopC = 0;
                                        k++;
                                        if (neededCourses.ContainsKey(priority.CourseID))
                                            neededCourses.Remove(priority.CourseID);


                                    }
                                }
                                else if (approved == true)
                                {
                                    sequence[i, j, k] = priority;
                                    removeA[k] = priority.CourseID;
                                    loopC = 0;
                                    k++;
                                    if (neededCourses.ContainsKey(priority.CourseID))
                                        neededCourses.Remove(priority.CourseID);
                                    if (((priority.CourseID == 91 && Array.IndexOf(removeA, 93) != -1) ||
                                         (priority.CourseID == 93 && Array.IndexOf(removeA, 91) != -1) && k + 1 < 4 && i != 4 &&
                                         i != 5))
                                    {
                                        tmpCourse = (Course) allCourses[96];
                                        sequence[i, j, k] = tmpCourse;
                                        removeA[k] = tmpCourse.CourseID;
                                        loopC = 0;
                                        k++;
                                        if (neededCourses.ContainsKey(tmpCourse.CourseID))
                                            neededCourses.Remove(tmpCourse.CourseID);
                                    }
                                    if (priority.CourseID == 89 && k + 1 < 4 && i != 4 && i != 5)
                                    {
                                        tmpCourse = (Course) allCourses[90];
                                        sequence[i, j, k] = tmpCourse;
                                        removeA[k] = tmpCourse.CourseID;
                                        loopC = 0;
                                        k++;
                                        if (neededCourses.ContainsKey(tmpCourse.CourseID))
                                            neededCourses.Remove(tmpCourse.CourseID);
                                    }
                                    if (i == 4 || i == 5)
                                    {
                                        if (k >= 1)
                                            break;
                                    }
                                    if (k >= 4)
                                    {
                                        break;
                                    }
                                }
                            }
                        }
                        foreach (int key in neededCourses.Keys)
                        {
                            co = (Course) neededCourses[key];
                            approved = false;
                            c = 0;
                            if (Array.IndexOf(removeA, co.CourseID) == -1)
                            {
                                approved = verifyPrereq(co, i, complst, engr2, comp2, soen2, removeA);
                                if (approved == true)
                                {
                                    sequence[i, j, k] = co;
                                    removeA[k] = co.CourseID;
                                    if (important.ContainsKey(co.CourseID))
                                        important.Remove(co.CourseID);
                                    loopC = 0;
                                    k++;
                                    if (i == 4 || i == 5)
                                    {
                                        if (k >= 1)
                                            break;
                                    }
                                    if (k >= 4 && (science != 0 || general_elective != 0))
                                    {
                                        break;
                                    }
                                    else if (k > 4)
                                        break;
                                }
                            }
                        }
                        if (k < 4 && loopTwice == 0)
                            loopTwice++;
                        else
                            break;

                    }
                    while (abc == true)
                    {
                        chk = false;
                        if ((i == 2 || i == 3) && k < 5)
                        {
                            if (general_elective > 0 || science > 0 || elective > 0)
                            {

                                if (general_elective > 0 && i != 0 && i != 1)
                                {
                                    general_elective--;
                                    sequence[i, j, k] = General_Elective;
                                    chk = true;

                                }
                                else if (science > 0 && i != 0 && i != 1)
                                {
                                    science--;
                                    sequence[i, j, k] = Basic_Science;
                                    chk = true;
                                }

                                else if (elective > 0 && i != 0 && i != 1 && i != 4 && i != 5 && engr2.Any() == false &&
                                         comp2.Any() == false && soen2.Any() == false)
                                {
                                    elective--;
                                    sequence[i, j, k] = Elective;
                                    chk = true;
                                }
                                else
                                    abc = false;
                                if (chk == true)
                                {
                                    k++;
                                    loopC = 0;
                                    if (k > 4)
                                    {
                                        abc = false;
                                    }
                                }
                            }
                            else
                                abc = false;
                        }
                        else if ((i == 4 || i == 5) && k < 2)
                        {
                            if (general_elective > 0 || science > 0)
                            {
                                if (general_elective > 0 && i != 0 && i != 1)
                                {
                                    general_elective--;
                                    sequence[i, j, k] = General_Elective;
                                    chk = true;

                                }
                                else if (science > 0 && i != 0 && i != 1)
                                {
                                    science--;
                                    sequence[i, j, k] = Basic_Science;
                                    chk = true;
                                }
                                if (chk == true)
                                {
                                    k++;
                                    loopC = 0;
                                    if (k >= 1)
                                        abc = false;
                                }
                            }
                            else
                                abc = false;
                        }
                        else
                            abc = false;
                    }
                    if (i == 4 || i == 5)
                    {
                        if (k >= 1)
                            break;
                    }
                    if (k >= 4)
                        break;
                    loopC++;

                }


                k = 0;
                i++;
                if (summer_bool == 0)
                {
                    if (i > 3)
                    {
                        i = 0;
                        j++;
                        if (j > 5)
                            break;
                    }

                }
                else
                {
                    if (i > 5)
                    {
                        i = 0;
                        j++;
                        if (j > 5)
                            break;
                    }
                }


                counter = 0;
                while (counter < 5)
                {
                    neededCourses.Remove(removeA[counter]);
                    complst.Add(removeA[counter].ToString());
                    if (soen2.Contains(removeA[counter]))
                        soen2.Remove(removeA[counter]);
                    else if (engr2.Contains(removeA[counter]))
                        engr2.Remove(removeA[counter]);
                    else if (comp2.Contains(removeA[counter]))
                        comp2.Remove(removeA[counter]);
                    if (important.ContainsKey(removeA[counter]))
                    {
                        important.Remove(removeA[counter]);
                    }
                    counter++;

                }
            }

            counter = 0;
            int q = 1;
            int w = 0;
            while (w < 5)
            {
                k = w + 1;
                Console.WriteLine("Year: " + k);
                while (q < 6)
                {
                    if (q == 0)
                        Console.WriteLine("Semester: " + "online");
                    else if (q == 1)
                        Console.WriteLine("Semester: " + "fall/winter");
                    else if (q == 2)
                        Console.WriteLine("Semester: " + "fall");
                    else if (q == 3)
                        Console.WriteLine("Semester: " + "winter");
                    else if (q == 4)
                        Console.WriteLine("Semester: " + "summer1");
                    else if (q == 5)
                        Console.WriteLine("Semester: " + "summer2");
                    while (counter < 5)
                    {
                        if (sequence[q, w, counter] != null)
                            Console.WriteLine(" -- " + sequence[q, w, counter].CourseName + " " +
                                              sequence[q, w, counter].CourseID);
                        else
                            Console.WriteLine(" -- ");
                        counter++;
                    }
                    q++;
                    counter = 0;
                }
                w++;
                q = 1;
            }



            Sequence seq = new Sequence();
            seq.sequence = sequence;
            return seq;
        }
    }
}
