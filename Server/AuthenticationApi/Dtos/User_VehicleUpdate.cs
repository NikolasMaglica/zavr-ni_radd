using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Dtos
{
    public class User_VehicleUpdate
    {
        [Required]
        public string userid { get; set; } = String.Empty;
        [Required]
        public int vehicleid { get; set; }
        public string description { get; set; } = String.Empty;

    }
}
