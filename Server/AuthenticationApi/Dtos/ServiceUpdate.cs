using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Dtos
{
    public class ServiceUpdate
    {

        [Required]

        public string name { get; set; } = String.Empty;
        [Required]

        public decimal price { get; set; }
        public string description { get; set; } = String.Empty;
    }
}
