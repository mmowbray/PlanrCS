using System;
using System.Threading.Tasks;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Planr.Controllers;
using Planr.Models;

namespace Planr.Tests.Controllers
{
    [TestClass]
    public class AccountControllerTest
    {
        //Ensure the account controller returns the login page

        [TestMethod]
        public void Login()
        {
            // Arrange
            AccountController controller = new AccountController();

            // Act
            ViewResult result = controller.Login() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void SuccessfulLogin()
        {
            //AccountController controller = new AccountController();
            //Task<ActionResult> x = controller.Login(new LoginViewModel(), String.Empty);
            //var dsa = DBInterfacer.GetUsers();
            //Assert.AreEqual(x, RedirectToAction("Dashboard", "Student"));

            var context = new Mock<ControllerContext>();
            var session = new MockHttpSession();

            context.Setup(m => m.HttpContext.Session).Returns(session);

            AccountController ac = new AccountController();
            ac.ControllerContext = context.Object;

            LoginViewModel log = new LoginViewModel();
            log.UserName = "UnitTestStudent";
            log.Password = "uni73$t";

            Task<ActionResult> result = ac.Login(log, String.Empty);

            User sda = DBInterfacer.GetUser("UnitTestStudent");

            Assert.AreEqual(ac.Session["user"], "UnitTestStudent");

        }

        [TestMethod]
        public void UnsuccessfulLogin()
        {

        }

        [TestMethod]
        public void Logout()
        {

            /*RedirectToRouteResult result = (RedirectToRouteResult) new AccountController().Logout();
            Assert.AreEqual("Login", result.RouteValues["action"]);
            Assert.AreEqual("Account", result.RouteValues["controller"]);*/

            var context = new Mock<ControllerContext>();
            var session = new MockHttpSession();

            context.Setup(m => m.HttpContext.Session).Returns(session);

            AccountController ac = new AccountController();

            ac.ControllerContext = context.Object;

            ac.Logout();

            Assert.IsNull(ac.Session["user"]);

        }

        /*
        [TestMethod]
        public void DatabaseWriteToValuesTest()
        {
            var UsersDB = DBInterfacer.GetUsers();
            var SectionsDB = DBInterfacer.GetSections();
            var CoursesDB = DBInterfacer.GetCourses();

            DBInterfacer.WriteValuesToDB(DB_USERS_PATH, UsersDB);
            DBInterfacer.WriteValuesToDB(DB_SECTIONS_PATH, SectionsDB);
            DBInterfacer.WriteValuesToDB(DB_COURSES_PATH, CoursesDB);

            Assert.AreEqual(UsersDB, DBInterfacer.GetUsers());
            Assert.AreEqual(SectionsDB, DBInterfacer.GetSections());
            Assert.AreEqual(CoursesDB, DBInterfacer.GetCourses());
        }*/
    }
}
