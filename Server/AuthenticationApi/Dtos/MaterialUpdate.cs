using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Dtos
{
    public class MaterialUpdate
    {
        [Required]

        public string name { get; set; } = String.Empty;
        [Required]

        public int instockquantity { get; set; }
        [Required]

        public float price { get; set; }
        public string description { get; set; } = String.Empty;
    }
}
