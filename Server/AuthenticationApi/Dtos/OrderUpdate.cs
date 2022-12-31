using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Dtos
{
    public class OrderUpdate
    {
        
        [Required]
        public string date { get; set; } = String.Empty;
        public int quantity { get; set; }

        public int materialid { get; set; }

        public int order_statusid { get; set; }
    }
}
