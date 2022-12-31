using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;

namespace AuthenticationApi.Services
{
    public interface IService
    {
        IEnumerable<Service> GetAllServices();
        void ServiceCreate(ServiceCreation model);
        void DeleteService(int id);
        void UpdateService(int id, ServiceUpdate model);
    }
}
