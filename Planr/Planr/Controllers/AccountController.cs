using System.Threading.Tasks;
using System.Web.Mvc;
using Planr.Models;
using Planr.Models.PlanrModels;

// AccountController Class
// This class is responsible for dealing with logging in and out, as well as displaying the Login page

namespace Planr.Controllers
{
    [Authorize]
    [AllowAnonymous]
    public class AccountController : Controller
    {
        // GET: /Account/Login
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                //System.Web.HttpContext.Current.Server.MapPath("~/App_Data/tbl_users.json")
                //List<User> RegisteredUsers = JsonConvert.DeserializeObject<List<User>>(new StreamReader(Server.MapPath("~/App_Data/tbl_users.json")).ReadToEnd());

                User loggingInUser = DBHelper.GetUsers().Find(user => (user.UserName == model.UserName && user.Password == model.Password));

                if (loggingInUser != null)
                {
                    Session["username"] = loggingInUser.UserName;

                    if (loggingInUser.Type == "Admin")
                        return RedirectToAction("Admin", "Home"); //user is an admin
                    return RedirectToAction("Dashboard", "Home"); //user is not an admin
                }
                else
                {
                    ModelState.AddModelError("", "Invalid username or password");   
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [HttpPost]
        public ActionResult Logout()
        {
            Session.Abandon();
            return RedirectToAction("Login", "Account");
        }
    }
}