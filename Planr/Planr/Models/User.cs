using System;

namespace Planr.Models
{
    public abstract class User
    {
        public String UserName{ get; set; }
        public String Password { get; set; }
        public String Type { get; set; } //should really only get, not set //TODO
    }
}