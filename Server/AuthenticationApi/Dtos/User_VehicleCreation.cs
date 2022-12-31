using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Dtos
{
    public class User_VehicleCreation
    {
        [Required]
        public string userid { get; set; } = string.Empty;
        [Required]
        public int vehicleid { get; set; }
        public string description { get; set;}
    }
}
