using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using FluentResults;

namespace AuthenticationApi.Services
{
    public interface IOffer
    {
       
        public IEnumerable<Offer> GetAllOffers();
        Task<Result<string>> OfferCreate(OfferCreation model);

        Task<Result<string>> DeleteOffer(int id);
        Task<Result<string>> UpdateOffer(int id, OfferUpdate model);
      


    }
}
