using System;
using System.Collections.Generic;

namespace Planr.Models.PlanrModels
{
    public class Course
    {
        public String CourseName { get; set; }
        public int CourseID{ get; set; }
        public int CourseNumber { get; set; }
        public int Credits { get; set; }
        public List<Course> Prerequisites { get; set; }
        public List<Course> Corequisites { get; set; }
        public Section Section{ get; set; }
    }
}