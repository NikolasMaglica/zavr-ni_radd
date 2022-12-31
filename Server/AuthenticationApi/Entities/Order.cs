using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Entities
{
    public class Order
    {
        public int id { get; set; }
        [Required]
        [StringLength(10)]

        public string date { get; set; } = String.Empty;
        [Required]

        public int quantity { get; set; }
        [Required]
        public int materialid { get; set; }

        public virtual Material? material { get; set; }
        public int order_statusid { get; set; }

        public virtual Order_Status? order_status { get; set; }

    }
}
