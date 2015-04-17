using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Planr.Models;

// HomeController Class
// This class is responsible for dealing with connections to the Dashboard and Admin pages, as well as their associated AJAX calls

//TODO: restrict admin page to admins, and dashboard to students

namespace Planr.Controllers
{
    public class StudentController : Controller
    {
        // This method simply allows a user to view the Dashboard page

        private static String TEST_STUDENT_USER = "Sally";

        public ActionResult Dashboard()
        {
            return View();
        }

        // This method returns the saved sequence of the currently logged in user, retrieved from the Database

        [HttpGet]
        public ContentResult GetSequence() //receives AJAX call from front-end and returns a JSON array
        {
            Sequence sequence = DBInterfacer.GetSequence((Session["username"] ?? TEST_STUDENT_USER).ToString());
            var sequenceJson = JObject.FromObject(sequence);
            return Content(sequenceJson.ToString(), "application/json");
        }

        // This method returns the saved schedule of the currently logged in user, retrieved from the Database

        [HttpGet]
        public JsonResult ViewSavedSchedule()
        {
            return Json(DBInterfacer.GetSchedule((Session["username"] ?? TEST_STUDENT_USER).ToString()), JsonRequestBehavior.AllowGet);
        }

        // This method accepts a sequence object from the front-end, and writes it to the database for the currently logged in user
        // 0 = SUCCESS, 1 = ERROR

        [HttpGet]
        public JsonResult SaveSequence(Sequence sequence)
        {
            return Json(DBInterfacer.SaveSequence((Session["username"] ?? TEST_STUDENT_USER).ToString(), sequence), JsonRequestBehavior.AllowGet);
        }

        // This method returns the saved record of the currently logged in user, retrieved from the Database

        [HttpGet]
        public JsonResult ViewRecord()
        {
            return Json(DBInterfacer.GetRecord((Session["username"] ?? TEST_STUDENT_USER).ToString()), JsonRequestBehavior.AllowGet);
        }

        // This method accepts a new password string from the front-end, and writes it to the database for the currently logged in user
        // 0 = SUCCESS, 1 = ERROR

        [HttpGet]
        public JsonResult ChangePassword(String newPassword)
        {
            return Json(DBInterfacer.SetPassword((Session["username"] ?? TEST_STUDENT_USER).ToString(), newPassword), JsonRequestBehavior.AllowGet);
        }

        // This method returns a collection of schedules for the currently logged in user

        [HttpGet]
        public ContentResult GenerateSchedules()
        {
            var x = Scheduler.GenerateSchedules(Sequencer.GenerateSequence(DBInterfacer.GetStudent((Session["username"] ?? TEST_STUDENT_USER).ToString()), 2, 0), 2, 0);
            var scheduleJson = JObject.FromObject(x);
            return Content(scheduleJson.ToString(), "application/json");
        }

        // This method accepts a Schedule object from the front-end, and writes it to the database for the currently logged in user
        // 0 = SUCCESS, 1 = ERROR

        [HttpGet]
        public JsonResult SaveSchedule1(String input)
        {

            dynamic dyn = JObject.Parse(input);

            String name = dyn.myArray[0].name;
            Schedule s1 = new Schedule();

            for (int i = 0; i < 5; i++)
            {
                s1.schedule[i] = new Section();

                s1.schedule[i].Course = dyn.myArray[i].name;
                s1.schedule[i].Day1 = dyn.myArray[i].lDay1;
                s1.schedule[i].Day2 = dyn.myArray[i].lDay2;
                s1.schedule[i].StartTime = dyn.myArray[i].startL;
                s1.schedule[i].EndTime = dyn.myArray[i].endL;
                s1.schedule[i].TutorialDay1 = dyn.myArray[i].tDay1;
                s1.schedule[i].TutorialDay2 = dyn.myArray[i].tDay2;
                s1.schedule[i].TutorialStartTime = dyn.myArray[i].startT;
                s1.schedule[i].TutorialEndTime = dyn.myArray[i].endT;
                s1.schedule[i].LabDay = dyn.myArray[i].labDay1;
                s1.schedule[i].LabStartTime = dyn.myArray[i].startLab;
                s1.schedule[i].LabEndTime = dyn.myArray[i].endLab;
            }

            return Json(DBInterfacer.SaveSchedule1((Session["username"] ?? TEST_STUDENT_USER).ToString(), s1), JsonRequestBehavior.AllowGet);
        }

        // This method accepts a Schedule object from the front-end, and writes it to the database for the currently logged in user
        // 0 = SUCCESS, 1 = ERROR

        [HttpGet]
        public JsonResult SaveSchedule2(String input)
        {

            dynamic dyn = JObject.Parse(input);

            String name = dyn.myArray[0].name;
            Schedule s2 = new Schedule();

            for (int i = 0; i < 5; i++)
            {
                s2.schedule[i] = new Section();

                s2.schedule[i].Course = dyn.myArray[i].name;
                s2.schedule[i].Day1 = dyn.myArray[i].lDay1;
                s2.schedule[i].Day2 = dyn.myArray[i].lDay2;
                s2.schedule[i].StartTime = dyn.myArray[i].startL;
                s2.schedule[i].EndTime = dyn.myArray[i].endL;
                s2.schedule[i].TutorialDay1 = dyn.myArray[i].tDay1;
                s2.schedule[i].TutorialDay2 = dyn.myArray[i].tDay2;
                s2.schedule[i].TutorialStartTime = dyn.myArray[i].startT;
                s2.schedule[i].TutorialEndTime = dyn.myArray[i].endT;
                s2.schedule[i].LabDay = dyn.myArray[i].labDay1;
                s2.schedule[i].LabStartTime = dyn.myArray[i].startLab;
                s2.schedule[i].LabEndTime = dyn.myArray[i].endLab;
            }

            return Json(DBInterfacer.SaveSchedule2((Session["username"] ?? TEST_STUDENT_USER).ToString(), s2), JsonRequestBehavior.AllowGet);
        }

        // This method accepts a Student.Preferences object from the front-end, and writes it to the database for the currently logged in user
        // 0 = SUCCESS, 1 = ERROR

        [HttpGet]
        public JsonResult SavePreferences(Student.Preference prefs)
        {
            return Json(DBInterfacer.SavePreferences((Session["username"] ?? TEST_STUDENT_USER).ToString(), prefs), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetSavedPreferences(Student.Preference prefs)
        {
            return Json(DBInterfacer.GetSavedPreferences((Session["username"] ?? TEST_STUDENT_USER).ToString()), JsonRequestBehavior.AllowGet);
        }

        // TEST METHODS AHEAD!!!

        //TEST METHOD, returning the count of the courses, pulled from the database

        [HttpGet]
        public JsonResult TestGetCourses()
        {
            return Json(DBInterfacer.GetCourses().Count, JsonRequestBehavior.AllowGet);
        }

        //TEST METHOD, returning the count of the sections, pulled from the database

        [HttpGet]
        public JsonResult TestGetSections()
        {
            return Json(DBInterfacer.GetSections(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult TestEchoUsernameFromDB()
        {
            return Json(DBInterfacer.GetUser((Session["username"] ?? TEST_STUDENT_USER).ToString()).UserName, JsonRequestBehavior.AllowGet);
        }
    }
}