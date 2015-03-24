using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Planr.Startup))]
namespace Planr
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
