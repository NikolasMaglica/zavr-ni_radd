using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Dtos
{
    public class OfferCreation
    {
        [Required(ErrorMessage = "Unos cijene je obavezan.")]
        public string price { get; set; } = String.Empty;
        [Required(ErrorMessage = "Unos zaposlenika je obavezan")]
        public string userid { get; set; } = String.Empty;
        public int clientid { get; set; }
        public int vehicleid { get; set; }
        public int offer_statusid { get; set; }


    }
}
