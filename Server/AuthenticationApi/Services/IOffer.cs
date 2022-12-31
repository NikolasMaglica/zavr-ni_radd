using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;


namespace AuthenticationApi.Services
{
    public interface IOffer
    {
        IEnumerable<Offer> GetAllOffers();
        void OfferCreate(OfferCreation model);
        void DeleteOffer(int id);
        void UpdateOffer(int id, OfferUpdate model);
    }
}
