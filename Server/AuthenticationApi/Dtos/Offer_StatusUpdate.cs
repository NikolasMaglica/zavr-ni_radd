using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Dtos
{
    public class Offer_StatusUpdate
    {
        [Required]
        public string name { get; set; } = String.Empty;
    }
}
