using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Dtos
{
    public class OfferUpdate
    {
        [Required]
        public int price { get; set; }
        public int quantity { get; set; }
        public string userid { get; set; } = String.Empty;
        public int clientid { get; set; }
        public int vehicleid { get; set; }
        public int offer_statusid { get; set; }
        public int materialid { get; set; }

    }
}
