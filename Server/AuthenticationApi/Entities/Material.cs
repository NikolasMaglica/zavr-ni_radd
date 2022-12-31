using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Entities
{
    public class Material
    {
        public int id { get; set; }
        [Required]
        [StringLength(40)]
        public string name { get; set; }=String.Empty;
        [Required]
        [MaxLength(10)]

        public int instockquantity { get; set; }
        [Required]
        [MaxLength(10)]
        public float price { get; set; }
        [StringLength(200)]

        public string description { get; set; } = String.Empty;
        public virtual ICollection<Order>? Orders { get; set; }
        public ICollection<Material_Offer>? material_offer { get; set; }


    }
}
