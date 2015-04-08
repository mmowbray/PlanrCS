using System.Web.Mvc;
using Planr.Models;

// AdminController Class
// This class is responsible for dealing with showing the Admin Editor page, and all its accompanying methods

namespace Planr.Controllers
{
    public class AdminController : Controller
    {
        // This method simply allows a user to view the Admin page

        public ActionResult Editor()
        {
            return View();
        }

        // This method returns a collection of all the sections from the database

        [HttpGet]
        public JsonResult GetSections()
        {
            return Json(DBInterfacer.GetSections(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult AddSection(Section newSection)
        {
            return Json(DBInterfacer.AddSection(newSection), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult UpdateExistingSection(Section section)
        {
            return Json(1);
            //return Json(DBHelper.UpdateExistingSection(section)); //TODO
        }

        [HttpGet]
        public JsonResult DeleteSection(int sectionUniqueID)
        {
            return Json(DBInterfacer.DeleteSection(sectionUniqueID), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult TESTNUMBER()
        {
            return Json('1', JsonRequestBehavior.AllowGet);
        }
    }
}