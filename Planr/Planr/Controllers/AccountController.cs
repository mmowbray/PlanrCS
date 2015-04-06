using System.Threading.Tasks;
using System.Web.Mvc;
using Planr.Models;

// AccountController Class
// This class is responsible for dealing with logging in and out, as well as displaying the Login page

namespace Planr.Controllers
{
    [Authorize]
    [AllowAnonymous]
    public class AccountController : Controller
    {
        // GET: /Account/Login
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Logout()
        {
            Session.Abandon();
            return RedirectToAction("Login", "Account");
        }

        [HttpPost]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                User loggingInUser = DBInterfacer.GetUsers().Find(user => (user.UserName == model.UserName && user.Password == model.Password));

                if (loggingInUser != null)
                {
                    Session["username"] = loggingInUser.UserName;

                    if (loggingInUser.Type == "Admin")
                        return RedirectToAction("Editor", "Admin"); //user is an admin
                    return RedirectToAction("Dashboard", "Student"); //user is not an admin
                }
                else
                {
                    ModelState.AddModelError("", "Invalid username or password");   
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }
    }
}