using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Entities
{
    public class Material_Offer
    {

        [Key]
        public int id { get; set; }
        public int materialid { get; set; }
        public Material? material { get; set; }
        public int offerid { get; set; }
        public Offer? offer { get; set; }
        [Required]
        public int quantity { get; set; }
        public int discount { get; set; }



    }
}
