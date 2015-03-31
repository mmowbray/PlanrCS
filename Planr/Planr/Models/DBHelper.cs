using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

// DBHelper Class
// This class is responsible to interfacing with the JSON databases, ie reading and writing to them

namespace Planr.Models
{
    public static class DBHelper
    {
        private static readonly String DB_USERS_PATH = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/tbl_users.json");
        private static readonly String DB_SECTIONS_PATH = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/tbl_courses_sections.json");
        private static readonly String DB_COURSES_PATH = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/tbl_soen_courses.json");

        public static List<User> GetUsers()
        {
            StreamReader sr = new StreamReader(DB_USERS_PATH);
            List<User> returnList = JsonConvert.DeserializeObject<List<User>>(sr.ReadToEnd(), new UserItemConverter());
            sr.Close();
            return returnList;
        }

        public static List<Section> GetSections()
        {
            StreamReader sr = new StreamReader(DB_SECTIONS_PATH);
            List<Section> returnList = JsonConvert.DeserializeObject<List<Section>>(sr.ReadToEnd());
            sr.Close();
            return returnList;
        }

        public static List<Course> GetCourses()
        {
            StreamReader sr = new StreamReader(DB_COURSES_PATH);
            List<Course> returnList = JsonConvert.DeserializeObject<List<Course>>(sr.ReadToEnd());
            sr.Close();

            WriteValuesToDB(DB_COURSES_PATH, returnList);

            return returnList;
        }

        public static int UpdatePreferences(String studentname, Student.Preference preferences)
        {
            List<User> DBPreviousState = GetUsers();
            int studentIndex = DBPreviousState.FindIndex(usr => usr.UserName == studentname);

            if (studentIndex == -1) //entry not found in DB
                return 1; //1 = failure

            Student student1 = (Student)DBPreviousState[studentIndex];
            student1.SavedPreferences = preferences;
            DBPreviousState[studentIndex] = student1;

            WriteValuesToDB(DB_USERS_PATH, DBPreviousState);

            return 0; //0 = success
        }

        public static Schedule GetSchedule(String username)
        {
            Student student = GetStudent(username);
            return student.SavedSchedule;
        }

        public static Student GetStudent(String studentName)
        {
            return GetUsers().OfType<Student>().FirstOrDefault(student => student.UserName == studentName);
        }

        public static List<Student> GetStudents()
        {
            return (List<Student>) GetUsers().OfType<Student>();
        }

        static User GetUser(String username)
        {
            return GetUsers().FirstOrDefault(user => user.UserName == username);
        }

        public static Student.AcademicRecord GetRecord(string studentname)
        {
            return GetStudent(studentname).Record;
        }

        public static int SetPassword(String username, String newPassword)
        {
            List<User> DBPreviousState = GetUsers();
            int userIndex = DBPreviousState.FindIndex(usr => usr.UserName == username);

            if (userIndex == -1) //entry not found in DB
                return 1; //1 = failure

            User user1 = DBPreviousState[userIndex];
            user1.Password = newPassword;
            DBPreviousState[userIndex] = user1;

            WriteValuesToDB(DB_USERS_PATH, DBPreviousState);

            return 0; //0 = success
        }

        public static List<Schedule> GenerateSchedules(string StudentName, Student.Preference prefs)
        {
            //return Scheduler.GenerateSchedules(GetStudent(StudentName)); //TODO
            return new List<Schedule>();
        }

        public static int SaveSequence(string studentName, Sequence sequence)
        {
            List<User> DBPreviousState = GetUsers();
            int userIndex = DBPreviousState.FindIndex(usr => usr.UserName == studentName);

            if (userIndex == -1) //entry not found in DB
                return 1; //1 = failure

            Student student1 = (Student)DBPreviousState[userIndex];
            student1.SavedSequence = sequence;
            DBPreviousState[userIndex] = student1;

            WriteValuesToDB(DB_USERS_PATH, DBPreviousState);

            return 0; //0 = success
        }

        public static Sequence GetSequence(string studentName)
        {
            Student student = GetStudent(studentName);
            return student.SavedSequence;
        }

        public static int SaveSchedule(string studentName, Schedule schedule)
        {
            List<User> DBPreviousState = GetUsers();
            int userIndex = DBPreviousState.FindIndex(usr => usr.UserName == studentName);

            if (userIndex == -1) //entry not found in DB
                return 1; //1 = failure

            Student student1 = (Student)DBPreviousState[userIndex];
            student1.SavedSchedule = schedule;
            DBPreviousState[userIndex] = student1;

            WriteValuesToDB(DB_USERS_PATH, DBPreviousState);

            return 0; //0 = success        
        }

        public static int SavePreferences(string studentName, Student.Preference prefs)
        {
            List<User> DBPreviousState = GetUsers();
            int userIndex = DBPreviousState.FindIndex(usr => usr.UserName == studentName);

            if (userIndex == -1) //entry not found in DB
                return 1; //1 = failure

            Student student1 = (Student)DBPreviousState[userIndex];
            student1.SavedPreferences = prefs;
            DBPreviousState[userIndex] = student1;

            WriteValuesToDB(DB_USERS_PATH, DBPreviousState);
            return 0; //0 = success              
        }

        static void WriteValuesToDB<T>(String databasePath, List<T> updated)
        {
            StreamWriter file = File.CreateText(databasePath);
            var x = new JsonSerializer();
            x.Formatting = Formatting.Indented;
            x.Serialize(file, updated);
            file.Close();
        }

        public static int AddCourse(Course course)
        {
            List<Course> DBPreviousState = GetCourses();
            int courseIndex = DBPreviousState.FindIndex(acourse => acourse.CourseID == course.CourseID);

            if (courseIndex != -1) //entry already in the DB
                return 1; //1 = failure

            DBPreviousState.Add(course);

            WriteValuesToDB(DB_SECTIONS_PATH, DBPreviousState);
            return 0; //0 = success
        }
    }

    // UserItemConverter Class
    // This class tells the JSON Deserializer how to know if the User object it is deserializing is a Student of an Admin
    // That way we can do "true" deserialization of the user database into proper Student of Admin objects

    class UserItemConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return typeof(User).IsAssignableFrom(objectType);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            JObject item = JObject.Load(reader);
            if (item["Type"].Value<String>() == "Admin")
            {
                return item.ToObject<Admin>();
            }
            else
            {
                return item.ToObject<Student>();
            }
        }

        public override void WriteJson(JsonWriter writer,object value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }
    }
}