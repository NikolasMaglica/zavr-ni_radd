using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Dtos
{
    public class Service_OfferUpdate
    {
        [Required]

        public int offerid { get; set; }
        [Required]

        public int serviceid { get; set; }
        [Required]
        public int quantity { get; set; }
        public float discount { get; set; }
    }
}
