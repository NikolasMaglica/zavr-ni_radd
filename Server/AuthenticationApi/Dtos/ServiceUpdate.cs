using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Dtos
{
    public class ServiceUpdate
    {

        [Required]

        public string name { get; set; } = String.Empty;
        [Required]

        public float price { get; set; }
        public string description { get; set; } = String.Empty;
    }
}
