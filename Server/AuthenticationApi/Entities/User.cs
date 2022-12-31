using Microsoft.AspNetCore.Identity;

namespace AuthenticationApi.Entities;

public class User : IdentityUser
{
    public virtual ICollection<Offer>? Offers { get; set; }
    public ICollection<User_Vehicle>? user_vehicle { get; set; }



}

