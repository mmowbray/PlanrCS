using System;

namespace Planr.Models
{
    public class Section
    {
        public int CourseID { get; set; }
        public int Availability { get; set; }
        public char Day1 { get; set; }
        public char Day2 { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public char TutorialDay1 { get; set; }
        public char TutorialDay2 { get; set; }
        public DateTime TutorialStartTime { get; set; }
        public DateTime TutorialEndTime { get; set; }
        public char LabDay { get; set; }
        public DateTime LabStartTime { get; set; }
        public DateTime LabEndTime { get; set; }
    }
}