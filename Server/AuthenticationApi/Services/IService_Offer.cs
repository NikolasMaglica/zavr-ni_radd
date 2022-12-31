using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;

namespace AuthenticationApi.Services
{
    public interface IService_Offer
    {
        IEnumerable<Service_Offer> GetAllService_Offer();
        void Service_OfferCreate(Service_OfferCreation model);
        void DeleteService_Offer(int id);
        void UpdateService_Offer(int id, Service_OfferUpdate model);
    }
}
