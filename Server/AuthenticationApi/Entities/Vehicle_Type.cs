using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Entities
{
    public class Vehicle_Type
    {
        public int id { get; set; }
        [Required]
        [StringLength(30)]
        public string vehicle_typename { get; set; }=String.Empty;
        public virtual ICollection<Vehicle>? Vehicles { get; set; }

    }
}
