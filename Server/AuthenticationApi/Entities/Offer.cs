
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthenticationApi.Entities
{
    public class Offer
    {
        public int id { get; set; }
        [Required]
        [StringLength(10)]
        public string price { get; set; } = String.Empty;
        [Required]

        public string userid { get; set; } = String.Empty;

        public virtual User? User { get; set; }
        [Required]
        public int clientid { get; set; } 

        public virtual Client? client { get; set; }
        [Required]
        public int vehicleid { get; set; }

        public virtual Vehicle? vehicle { get; set; }
        [Required]
        public int offer_statusid { get; set; }

        public virtual Offer_Status? offer_status { get; set; }
        public ICollection<Service_Offer>? service_offer { get; set; }
        public ICollection<Material_Offer>? material_offer { get; set; }



    }
}