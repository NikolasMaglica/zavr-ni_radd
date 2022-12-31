using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Dtos
{
    public class OfferUpdate
    {
        [Required]
        public string price { get; set; } = String.Empty;
        [Required]
        public string userid { get; set; } = String.Empty;
        public int clientid { get; set; }
        public int vehicleid { get; set; }
        public int offer_statusid { get; set; }

    }
}
