using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Dtos
{
    public class Offer_StatusCreation
    {
        [Required]
        public string name { get; set; } = String.Empty;
    }
}
