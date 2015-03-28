using System;
using System.Collections.Generic;

namespace Planr.Models.PlanrModels
{
    public class Student : User
    {
        public int StudentID { get; set; }
        public Preference SavedPreferences { get; set; }
        public AcademicRecord Record{ get; set; }
        public Schedule SavedSchedule { get; set; }
        public Sequence SavedSequence { get; set; }


        
        public Student()
        {
            this.Type = "Student";
        }

        public class AcademicRecord
        {
            public int CreditsCompleted { get; set; }
            public String Options{ get; set; }
            public String CompletedCourses{ get; set; }
        }

        public class Preference
        {
            public String timeOff { get; set; }
            public bool dayOff { get; set; }
            public String priorityCourse { get; set; }

        }
    }
}