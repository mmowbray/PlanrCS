using System;

namespace Planr.Models
{
    public class Section
    {
        public String Course { get; set; } //not ideal, but this is the course that the section belongs to
        public int UniqueID { get; set; }
        public int CourseID { get; set; }
        public int Availability { get; set; }
        public String Day1 { get; set; }
        public String Day2 { get; set; }
        public String StartTime { get; set; }
        public String EndTime { get; set; }
        public String TutorialDay1 { get; set; }
        public String TutorialDay2 { get; set; }
        public String TutorialStartTime { get; set; }
        public String TutorialEndTime { get; set; }
        public String LabDay { get; set; }
        public String LabStartTime { get; set; }
        public String LabEndTime { get; set; }

        public DateTime GetStartTime()
        {
            return DateTime.Parse(StartTime);
        }

        public DateTime GetEndTime()
        {
            return DateTime.Parse(EndTime);
        }

        public DateTime GetTutorialStartTime()
        {
            return DateTime.Parse(TutorialStartTime);
        }

        public DateTime GetTutorialEndTime()
        {
            return DateTime.Parse(TutorialEndTime);
        }

        public DateTime GetLabStartTime()
        {
            return DateTime.Parse(LabStartTime);
        }

        public DateTime GetLabEndTime()
        {
            return DateTime.Parse(LabEndTime);
        }
    }
}