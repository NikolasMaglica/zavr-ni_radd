using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Entities
{
    public class Vehicle
    {
        public int id { get; set; }
        [Required]
        [StringLength(40)]
        public string manufacturer { get; set; } = String.Empty;
        [Required]
        [StringLength(40)]
        public string model { get; set; } = String.Empty;
        [Required]
        [MaxLength(20)]
        public int productionyear { get; set; }
        [Required]
        [MaxLength(20)]
        public float kilometerstraveled { get; set; }
        [Required]
        public int vehicle_typeid { get; set; }

        public virtual Vehicle_Type? vehicle_type { get; set; }
        [Required]
        public int clientid { get; set; }

        public virtual Client? client { get; set; }
        public virtual ICollection<Offer>? Offers { get; set; }
        public ICollection<User_Vehicle>? user_vehicle { get; set; }


    }
}
