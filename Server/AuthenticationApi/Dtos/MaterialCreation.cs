using AuthenticationApi.Entities;
using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Dtos
{
    public class MaterialCreation
    {
        [Required]

        public string name { get; set; } = String.Empty;
        [Required]

        public decimal instockquantity { get; set; }
        [Required]

        public int price { get; set; }
        public string description { get; set; } = String.Empty;

    }
}
