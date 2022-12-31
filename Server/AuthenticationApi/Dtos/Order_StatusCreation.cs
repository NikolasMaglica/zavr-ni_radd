using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Dtos
{
    public class Order_StatusCreation
    {
        [Required]
        [StringLength(10)]
        public string status { get; set; } = String.Empty;
    }
}
