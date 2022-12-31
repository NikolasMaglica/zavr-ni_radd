using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Entities
{
    public class Offer_Status
    {
        [Required]
        public int id { get; set; }
        [Required]
        public string name { get; set; } = String.Empty;
        public virtual ICollection<Offer>? Offers { get; set; }

    }
}
