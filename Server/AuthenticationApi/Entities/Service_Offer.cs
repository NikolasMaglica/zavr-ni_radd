using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Entities
{
    public class Service_Offer
    {
        [Key]
        public int id { get; set; }
        [Required]
        public int offerid { get; set; } 
        public Offer? offer { get; set; }
        [Required]

        public int serviceid { get; set; }
        public Service? service { get; set; }
        [Required]
        [MaxLength(5)]

        public int quantity { get; set; }
        [MaxLength(5)]

        public float discount { get; set; }
    }
}
