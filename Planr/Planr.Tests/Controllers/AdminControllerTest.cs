using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Planr.Controllers;

namespace Planr.Tests.Controllers
{
    [TestClass]
    public class AdminControllerTest
    {
        [TestMethod]
        public void Login()
        {
            // Arrange
            AdminController controller = new AdminController();

            // Act
            ViewResult result = controller.Editor() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }
    }
}
