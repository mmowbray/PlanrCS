
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Planr.Controllers;

namespace Planr.Tests.Controllers
{
    [TestClass]
    public class StudentControllerTest
    {
        [TestMethod]
        public void Dashboard()
        {
            // Arrange
            StudentController controller = new StudentController();

            // Act
            ViewResult result = controller.Dashboard() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ChangePassword()
        {
            
        }

        [TestMethod]
        public void GenerateSchedule()
        {

        }
    }
}
