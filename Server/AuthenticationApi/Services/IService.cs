using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using FluentResults;

namespace AuthenticationApi.Services
{
    public interface IService
    {
       
        public IEnumerable<Service> GetAllServices();
        Task<Result<string>> ServiceCreate(ServiceCreation model);

        Task<Result<string>> DeleteService(int id);
        Task<Result<string>> UpdateService(int id, ServiceUpdate model);

    }
}
