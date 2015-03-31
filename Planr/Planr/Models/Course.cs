using System;

namespace Planr.Models
{
    public class Course
    {
        public String CourseName { get; set; }
        public int CourseID{ get; set; }
        public float Credits { get; set; } //elec 275 and ENCS 282 are X.5 credits
        public String Prerequisites { get; set; }
        public String Corequisites { get; set; }
        public String CourseType { get; set; }
        public String Availability { get; set; }
    }
}