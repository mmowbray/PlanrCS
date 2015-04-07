using System;

namespace Planr.Models
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
            public String Option{ get; set; }
            public String CompletedCourses{ get; set; }
        }

        public class Preference
        {
            public String priorityCourse { get; set; } //sequencer tries to put this course in 1st semester
            //not using dayoff and timeoff

        }
    }
}
