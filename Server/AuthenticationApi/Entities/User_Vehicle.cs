using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthenticationApi.Entities
{
    public class User_Vehicle
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public string userid { get; set; }=String.Empty;
        public User? user { get; set; }
        public int vehicleid { get; set; }
        public Vehicle? vehicle { get; set; }

        public string description { get; set; } = String.Empty;
    }
}
