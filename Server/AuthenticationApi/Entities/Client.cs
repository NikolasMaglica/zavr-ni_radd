using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Entities
{
    public class Client
    {
        public int id { get; set; }
        [Required]
        [StringLength(40)]

        public string firstlastname { get; set; } = String.Empty;
        [Required]
        [StringLength(40)]

        public string email { get; set; } = String.Empty;
        [Required]
        [StringLength(40)]
  
        public string Adress { get; set; } = String.Empty;
 
        [Required]
        [MaxLength(20)]
        public int phonenumber { get; set; }
        public virtual ICollection<Vehicle>? Vehicles { get; set; }
        public virtual ICollection<Offer>? Offers { get; set; }


    }
}
