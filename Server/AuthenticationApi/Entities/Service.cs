       using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Entities
{
    public class Service
    {
        [Required]

        public int id { get; set; }
        [Required]
        [StringLength(40)]
        public string name { get; set; }=String.Empty;
        [Required]
        [MaxLength(20)]
        public decimal price { get; set; }
        [MaxLength(200)]
        public string description { get; set; }= String.Empty;
        public ICollection<Offer>? Offers { get; set; }

    }
}
