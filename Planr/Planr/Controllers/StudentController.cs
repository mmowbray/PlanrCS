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
        public JsonResult SaveSchedule(String input)
        {
            //List<Schedule> dsa = JsonConvert.DeserializeObject<List<Schedule>>(schedules);

            return Json(1, JsonRequestBehavior.AllowGet);
            //return Json(DBInterfacer.SaveSchedule((Session["username"] ?? TEST_STUDENT_USER).ToString(), schedules), JsonRequestBehavior.AllowGet);
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