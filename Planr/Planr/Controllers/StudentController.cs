using System;
using System.Web.Mvc;
using Planr.Models;

// HomeController Class
// This class is responsible for dealing with connections to the Dashboard and Admin pages, as well as their associated AJAX calls

//TODO: restrict admin page to admins, and dashboard to students

namespace Planr.Controllers
{
    public class StudentController : Controller
    {
        // This method simply allows a user to view the Dashboard page

        public ActionResult Dashboard()
        {
            return View();
        }

        // This method returns the saved sequence of the currently logged in user, retrieved from the Database

        [HttpGet]
        public JsonResult GetSequence() //receives AJAX call from front-end and returns a JSON array
        {
            Sequence sequence = DBInterfacer.GetSequence(Session["username"].ToString());

            return Json(sequence, JsonRequestBehavior.AllowGet);
        }

        // This method returns the saved schedule of the currently logged in user, retrieved from the Database

        [HttpGet]
        public JsonResult ViewSavedSchedule()
        {
            return Json(DBInterfacer.GetSchedule(Session["username"].ToString()), JsonRequestBehavior.AllowGet);
        }

        // This method accepts a sequence object from the front-end, and writes it to the database for the currently logged in user
        // 0 = SUCCESS, 1 = ERROR

        [HttpGet]
        public JsonResult SaveSequence(Sequence sequence)
        {
            return Json(DBInterfacer.SaveSequence(Session["username"].ToString(), sequence), JsonRequestBehavior.AllowGet);
        }

        // This method returns the saved record of the currently logged in user, retrieved from the Database

        [HttpGet]
        public JsonResult ViewRecord()
        {
            return Json(DBInterfacer.GetRecord(Session["username"].ToString()), JsonRequestBehavior.AllowGet);
        }

        // This method accepts a new password string from the front-end, and writes it to the database for the currently logged in user
        // 0 = SUCCESS, 1 = ERROR

        [HttpGet]
        public JsonResult ChangePassword(String newPassword)
        {
            return Json(DBInterfacer.SetPassword(Session["username"].ToString(), newPassword), JsonRequestBehavior.AllowGet);
        }

        // This method returns a collection of schedules for the currently logged in user

        [HttpGet]
        public JsonResult GenerateSchedules()
        {
            var x = Scheduler.GenerateSchedules(Sequencer.GenerateSequence(DBInterfacer.GetStudent(Session["username"].ToString()), 2, 0), 2, 0);
            return Json(x);
        }

        // This method accepts a Schedule object from the front-end, and writes it to the database for the currently logged in user
        // 0 = SUCCESS, 1 = ERROR

        [HttpGet]
        public JsonResult SaveSchedule(Schedule schedule)
        {
            return Json(DBInterfacer.SaveSchedule(Session["username"].ToString(), schedule), JsonRequestBehavior.AllowGet);
        }

        // This method accepts a Student.Preferences object from the front-end, and writes it to the database for the currently logged in user
        // 0 = SUCCESS, 1 = ERROR

        [HttpGet]
        public JsonResult SavePreferences(Student.Preference prefs)
        {
            return Json(DBInterfacer.SavePreferences(Session["username"].ToString(), prefs), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetSavedPreferences(Student.Preference prefs)
        {
            return Json(DBInterfacer.GetSavedPreferences(Session["username"].ToString()), JsonRequestBehavior.AllowGet);
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
    }
}