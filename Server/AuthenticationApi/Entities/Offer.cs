using AuthenticationApi.Db;
using AuthenticationApi.Entities;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

public class Offer
{
    public int id { get; set; }
   
    [Required]

    public int materialquantity { get; set; }
    [Required]

    public int servicequantity { get; set; }
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
    public int materialid { get; set; }

    public virtual Material? material { get; set; }
    public int serviceid { get; set; }

    public virtual Service? service { get; set; }
    public decimal totalPrice { get; set; }

  
}
