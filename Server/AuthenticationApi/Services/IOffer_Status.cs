using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;

namespace AuthenticationApi.Services
{
    public interface IOffer_Status
    {
        IEnumerable<Offer_Status> GetAllOffer_Status();
        void Offer_StatusCreate(Offer_StatusCreation model);
    }
}
