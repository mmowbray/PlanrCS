using System;

namespace Planr.Models
{
    public class Section
    {
        public int UniqueID { get; set; }
        public int CourseID { get; set; }
        public int Availability { get; set; }
        public String Day1 { get; set; }
        public String Day2 { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public String TutorialDay1 { get; set; }
        public String TutorialDay2 { get; set; }
        public DateTime TutorialStartTime { get; set; }
        public DateTime TutorialEndTime { get; set; }
        public String LabDay { get; set; }
        public DateTime LabStartTime { get; set; }
        public DateTime LabEndTime { get; set; }
    }
}