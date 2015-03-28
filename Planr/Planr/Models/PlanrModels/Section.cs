using System;

namespace Planr.Models.PlanrModels
{
    public class Section
    {
        public int CourseID { get; set; }
        public int Availability { get; set; }
        public char Day1 { get; set; }
        public char Day2 { get; set; }
        public String SartTime { get; set; }
        public String EndTime { get; set; }
        public char TutorialDay1 { get; set; }
        public char TutorialDay2 { get; set; }
        public String TutorialStartTime { get; set; }
        public String TutorialEndTime { get; set; }
        public char LabDay { get; set; }
        public String LabStartTime { get; set; }
        public String LabEndTime { get; set; }
    }
}