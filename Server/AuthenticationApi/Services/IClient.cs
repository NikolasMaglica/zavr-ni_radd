using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;

namespace AuthenticationApi.Services
{
    public interface IClient
    {
        IEnumerable<Client> GetAllClients();
        void ClientCreate(ClientCreation model);
        void DeleteClient(int id);
        void UpdateClient(int id, ClientUpdate model);
    }
}
