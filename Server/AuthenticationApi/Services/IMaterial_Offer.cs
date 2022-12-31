using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;

namespace AuthenticationApi.Services
{
    public interface IMaterial_Offer
    {
        IEnumerable<Material_Offer> GetAllMaterial_Offer();
        void Create_Offer_Material(Material_OfferCreation model);
        void DeleteMaterial_Offer(int id);
        void UpdateMaterial_Offer(int id, Material_OfferUpdate model);
    }
}
