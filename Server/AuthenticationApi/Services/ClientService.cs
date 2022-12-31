using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AutoMapper;
using System;

namespace AuthenticationApi.Services
{
    public class ClientService : Repository<Client>, IClient
    {
        private AppDbContext _appDbcontext;
        private readonly IMapper _mapper;
        public ClientService(AppDbContext appDbContext, IMapper mapper) : base(appDbContext)
        {
            _appDbcontext = appDbContext;
            _mapper = mapper;
        }

        public void ClientCreate(ClientCreation model)
        {
            var client = _mapper.Map<Client>(model);
            Create(client);
            _appDbcontext.SaveChanges();
        }

        public void DeleteClient(int id)
        {
            var client = _appDbContext.Clients.Find(id);
            if (client == null)
                throw new KeyNotFoundException($"Klijent s {id} nije pronađen u bazi podataka");
            Delete(client);
            _appDbContext.SaveChanges();
        }

        public IEnumerable<Client> GetAllClients()
        {
            return FindAll()
                                                  .OrderBy(ow => ow.firstlastname)
                                                  .ToList();
        }

        public void UpdateClient(int id, ClientUpdate model)
        {
            var client = _appDbContext.Clients?.Find(id);
            if (client == null)
                throw new KeyNotFoundException($"Klijent s {id} nije pronađen u bazi podataka");
            client.firstlastname = model.firstlastname;
            _mapper.Map(model, client);

            Update(client);
            _appDbContext.SaveChanges();
        }
    }
}
