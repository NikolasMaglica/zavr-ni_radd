using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Dtos
{
    public class Material_OfferUpdate
    {
        public int materialid { get; set; }
        public int offerid { get; set; }
        [Required]
        public int quantity { get; set; }
        public int discount { get; set; }
    }
}
