using System.ComponentModel.DataAnnotations;

namespace AuthenticationApi.Dtos
{
    public class Vehicle_TypeCreation
    {
        [Required(ErrorMessage = "Unos naziva vrste vozila je obavezan.")]

        public string vehicle_typename { get; set; }=String.Empty;

    }
}
