using System.Web.Mvc;
using Planr.Models;

// AdminController Class
// This class is responsible for dealing with showing the Admin Editor page, and all its accompanying methods

namespace Planr.Controllers
{
    public class AdminController : Controller
    {
        public ActionResult Editor()
        {
            return View();
        }

        // This method returns a collection of all the sections from the database

        [HttpGet]
        public JsonResult GetSections()
        {
            return Json(DBHelper.GetSections());
        }

        [HttpGet]
        public JsonResult AddCourse(Course course)
        {
            return Json(DBHelper.AddCourse(course));
        }

        [HttpGet]
        public JsonResult UpdateExistingSection(Section section)
        {
            return Json(DBHelper.UpdateExistingSection(section)); //TODO
        }

        [HttpGet]
        public JsonResult DeleteSection(Section section)
        {
            return Json(DBHelper.DeleteSection(section)); //TODO
        }
	}
}