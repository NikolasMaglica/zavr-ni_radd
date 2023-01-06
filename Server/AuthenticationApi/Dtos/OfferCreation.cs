using AuthenticationApi.Entities;
using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Dtos
{
    public class OfferCreation
    {
        [Required(ErrorMessage = "Unos cijene je obavezan.")]

        public int materialquantity { get; set; }
        public int servicequantity { get; set; }
       public string userid { get; set; } = String.Empty;
        public int clientid { get; set; }
        public int vehicleid { get; set; }
        public int offer_statusid { get; set; }
        public int materialid { get; set; }
        public int serviceid { get; set; }


    }
}
