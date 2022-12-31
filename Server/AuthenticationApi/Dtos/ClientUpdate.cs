using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Dtos
{
    public class ClientUpdate
    {
        [Required] public string firstlastname { get; set; } = String.Empty;
        [Required]
        public string email { get; set; } = String.Empty;
        [Required]
        public string Adress { get; set; } = String.Empty;
        [Required]
        public int phonenumber { get; set; }
    }
}
