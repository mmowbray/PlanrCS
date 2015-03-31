using System;

namespace Planr.Models.PlanrModels
{
    public class Course
    {
        public String CourseName { get; set; }
        public int CourseID{ get; set; }
        public int Credits { get; set; }
        public String Prerequisites { get; set; }
        public String Corequisites { get; set; }
        public Section Section{ get; set; }
        public String CourseType { get; set; }
        public String Availability { get; set; }
    }
}