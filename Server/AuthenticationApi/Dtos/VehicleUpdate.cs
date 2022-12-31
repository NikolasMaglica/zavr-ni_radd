using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Dtos
{
    public class VehicleUpdate
    {
        [Required]
        public string manufacturer { get; set; } = String.Empty;
        [Required]
        public string model { get; set; } = String.Empty;
        [Required]
        public int productionyear { get; set; }
        [Required]
        public float kilometerstraveled { get; set; }
        [Required]
        public int vehicle_typeid { get; set; }
        [Required]
        public int clientid { get; set; }
    }
}
