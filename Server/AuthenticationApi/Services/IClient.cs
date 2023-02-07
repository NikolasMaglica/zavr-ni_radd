using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using FluentResults;

namespace AuthenticationApi.Services
{
    public interface IClient
    {
      
        public IEnumerable<Client> GetAllClients();
        Task<Result<string>> ClientCreate(ClientCreation model);
        Task<Result<string>> DeleteClient(int id);
        Task<Result<string>> UpdateClient(int id, ClientUpdate model);

    }
}
