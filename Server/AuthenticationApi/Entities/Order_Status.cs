using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Entities
{
    public class Order_Status
    {
        public int id { get; set; }
        [Required]
        [StringLength(10)]
        public string status { get; set; } = String.Empty;
        public virtual ICollection<Order>? Orders { get; set; }


    }
}
