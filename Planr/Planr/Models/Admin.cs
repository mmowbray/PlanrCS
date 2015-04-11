namespace Planr.Models
{
    public abstract class Admin : User
    {
        public Admin()
        {
            this.Type = "Admin";
        }

    }
}