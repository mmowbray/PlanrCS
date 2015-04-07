using System;
using System.Collections;
using System.Collections.Generic;

namespace Planr.Models
{
    public static class Scheduler
    {

        static public Boolean checkSection(params Section[] sections)
        {
            List<Section> incrementalAdd = new List<Section>();
            Hashtable weekdayTime = new Hashtable();
            List<TimeSlot> day1Availability = new List<TimeSlot>();
            List<TimeSlot> day2Availability = new List<TimeSlot>();
            List<TimeSlot> day3Availability = new List<TimeSlot>();
            List<TimeSlot> day4Availability = new List<TimeSlot>();
            List<TimeSlot> day5Availability = new List<TimeSlot>();
            weekdayTime["M"] = day1Availability;
            weekdayTime["T"] = day2Availability;
            weekdayTime["W"] = day3Availability;
            weekdayTime["J"] = day4Availability;
            weekdayTime["F"] = day5Availability;
            List<TimeSlot> tmpList;
            foreach (Section s in sections)
            {
                if (s.CourseID != 111111 && s.CourseID != 222222 && s.CourseID != 333333)
                {

                    if (s.Day1 != null)
                    {
                        TimeSlot ts = new TimeSlot();

                        ts.timeslot[0] = s.StartTime;
                        ts.timeslot[1] = s.EndTime;
                        tmpList = (List<TimeSlot>)weekdayTime[s.Day1];
                        foreach (TimeSlot ts1 in tmpList)
                        {
                            if ((s.StartTime >= ts1.timeslot[0] && s.StartTime <= ts1.timeslot[1]) || (s.EndTime <= ts1.timeslot[1] && s.EndTime >= ts1.timeslot[0]))
                            {
                                return false;
                            }
                        }
                        tmpList.Add(ts);

                    }

                    if (s.Day2 != null)
                    {
                        TimeSlot ts = new TimeSlot();

                        ts.timeslot[0] = s.StartTime;
                        ts.timeslot[1] = s.EndTime;
                        tmpList = (List<TimeSlot>)weekdayTime[s.Day2];
                        foreach (TimeSlot ts1 in tmpList)
                        {
                            if ((s.StartTime >= ts1.timeslot[0] && s.StartTime <= ts1.timeslot[1]) || (s.EndTime <= ts1.timeslot[1] && s.EndTime >= ts1.timeslot[0]))
                            {
                                return false;
                            }
                        }

                        tmpList.Add(ts);
                    }
                    if (s.TutorialDay1 != null)
                    {
                        TimeSlot ts = new TimeSlot();

                        ts.timeslot[0] = s.TutorialStartTime;
                        ts.timeslot[1] = s.TutorialEndTime;
                        tmpList = (List<TimeSlot>)weekdayTime[s.TutorialDay1];
                        foreach (TimeSlot ts1 in tmpList)
                        {

                            if ((s.TutorialStartTime >= ts1.timeslot[0] && s.TutorialStartTime <= ts1.timeslot[1]) || (s.TutorialEndTime <= ts1.timeslot[1] && s.TutorialEndTime >= ts1.timeslot[0]))
                                return false;
                        }

                        tmpList.Add(ts);
                    }

                    if (s.TutorialDay2 != null)
                    {
                        TimeSlot ts = new TimeSlot();

                        ts.timeslot[0] = s.TutorialStartTime;
                        ts.timeslot[1] = s.TutorialEndTime;
                        tmpList = (List<TimeSlot>)weekdayTime[s.TutorialDay2];
                        foreach (TimeSlot ts1 in tmpList)
                        {

                            if ((s.TutorialStartTime >= ts1.timeslot[0] && s.TutorialStartTime <= ts1.timeslot[1]) || (s.TutorialEndTime <= ts1.timeslot[1] && s.TutorialEndTime >= ts1.timeslot[0]))
                                return false;
                        }
                        tmpList.Add(ts);

                    }

                    if (s.LabDay != null)
                    {
                        TimeSlot ts = new TimeSlot();

                        ts.timeslot[0] = s.LabStartTime;
                        ts.timeslot[1] = s.LabEndTime;
                        tmpList = (List<TimeSlot>)weekdayTime[s.LabDay];
                        foreach (TimeSlot ts1 in tmpList)
                        {

                            if ((s.LabStartTime >= ts1.timeslot[0] && s.LabStartTime <= ts1.timeslot[1]) || (s.LabEndTime <= ts1.timeslot[1] && s.LabEndTime >= ts1.timeslot[0]))
                                return false;
                        }
                        tmpList.Add(ts);

                    }
                }

            }

            return true;
        }
        static public void approvedSchedule(ref ScheduleTable scT, params Section[] sections)
        {
            Schedule tmpSchedule = new Schedule();
            tmpSchedule.schedule[0] = sections[0];
            tmpSchedule.schedule[1] = sections[1];
            tmpSchedule.schedule[2] = sections[2];
            tmpSchedule.schedule[3] = sections[3];
            tmpSchedule.schedule[4] = sections[4];
            scT.sem1.Add(tmpSchedule);
        }
        static public Section[, ,] GenerateSchedules(Sequence seq, int semester, int year)
        {
            List<Course> semester1 = new List<Course>();
            Hashtable semester1_sec = new Hashtable();
            List<Section> semester1_c1 = new List<Section>();
            List<Section> semester1_c2 = new List<Section>();
            List<Section> semester1_c3 = new List<Section>();
            List<Section> semester1_c4 = new List<Section>();
            List<Section> semester1_c5 = new List<Section>();
            semester1_sec[0] = semester1_c1;
            semester1_sec[1] = semester1_c2;
            semester1_sec[2] = semester1_c3;
            semester1_sec[3] = semester1_c4;
            semester1_sec[4] = semester1_c5;
            int[] course1 = new int[5];
            Course tmp;
            int tmpInt;
            List<Section> tmpList = new List<Section>();
            int i = 0;
            ScheduleTable scT = new ScheduleTable();
            Boolean approved = false;
            Section General_Elective = new Section();
            General_Elective.CourseID = 111111;
            Section Basic_Science = new Section();
            Basic_Science.CourseID = 222222;
            Section Elective = new Section();
            Elective.CourseID = 333333;
            Section EmptySection = new Section();

            while (i < 5)
            {
                tmp = seq.sequence[year, semester, i];
                semester1.Add(tmp);
                if (tmp == null)
                {
                    tmpList = (List<Section>)semester1_sec[i];
                    tmpList.Add(EmptySection);
                }
                else if (tmp.CourseID == 111111 || tmp.CourseID == 222222 || tmp.CourseID == 333333)
                {
                    tmpList = (List<Section>)semester1_sec[i];
                    if (tmp.CourseID == 111111)
                        tmpList.Add(General_Elective);
                    else if (tmp.CourseID == 222222)
                        tmpList.Add(Basic_Science);
                    else if (tmp.CourseID == 333333)
                        tmpList.Add(Elective);
                    course1[i] = tmp.CourseID;
                }
                else
                    course1[i] = tmp.CourseID;
                i++;
            }
            i = 0;
            Schedule schedule = new Schedule();

            List<Section> items = DBInterfacer.GetSections();

            foreach (Section item in items)
            {
                if (item.Availability == semester && Array.IndexOf(course1, item.CourseID) != -1)
                {//i think is here
                    //Console.WriteLine(item.CourseID + " " + item.StartTime.ToString("HH:mm") + " " + item.EndTime.ToString("HH:mm") + " " + item.tutorial_day1 + " " + item.tutorial_day2 + " " + item.TutorialStartTime.ToString("HH:mm") + " " + item.TutorialEndTime.ToString("HH:mm") + " " + item.lab_day + " " + item.LabStartTime.ToString("HH:mm") + " " + item.LabEndTime.ToString("HH:mm"));
                    tmpInt = item.CourseID;
                    tmpInt = Array.IndexOf(course1, tmpInt);
                    tmpList = (List<Section>)semester1_sec[tmpInt];
                    tmpList.Add(item);

                }
            }

            foreach (Section a in semester1_c1)
            {
                foreach (Section b in semester1_c2)
                {
                    foreach (Section c in semester1_c3)
                    {
                        foreach (Section d in semester1_c4)
                        {
                            foreach (Section e in semester1_c5)
                            {
                                approved = checkSection(a, b, c, d, e);
                                if (approved == true)
                                {
                                    approvedSchedule(ref scT, a, b, c, d, e);
                                }
                            }
                        }
                    }
                }
            }

            i = 0;
            Section[, ,] returnArray = new Section[1, scT.sem1.Count, 5];
            foreach (Schedule s in scT.sem1)
            {
                returnArray[0, i, 0] = s.schedule[0];
                returnArray[0, i, 1] = s.schedule[1];
                returnArray[0, i, 2] = s.schedule[2];
                returnArray[0, i, 3] = s.schedule[3];
                returnArray[0, i, 4] = s.schedule[4];
                i++;
            }
            return returnArray;
        }
    }

    public class TimeSlot
    {
        public DateTime[] timeslot = new DateTime[2];
    }
    public class ScheduleTable
    {
        public List<Schedule> sem1 = new List<Schedule>();
        public List<Schedule> sem2 = new List<Schedule>();
    }
}