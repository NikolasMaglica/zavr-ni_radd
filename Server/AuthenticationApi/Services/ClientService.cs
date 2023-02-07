using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AutoMapper;
using FluentResults;
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
        public async Task<Result<string>> ClientCreate(ClientCreation model)
        {
         
            try
            {
                var existingClient = _appDbcontext.Clients.FirstOrDefault(x => x.firstlastname == model.firstlastname);
                if (existingClient != null)
                {
                    throw new Exception("Ime i prezime je uneseno");
                }
                var existingClient_email = _appDbcontext.Clients.FirstOrDefault(x => x.email == model.email);
                if (existingClient_email != null)
                {
                    throw new Exception("Email je unesen");
                }
                var existingClient_phonenumber = _appDbcontext.Clients.FirstOrDefault(x => x.phonenumber == model.phonenumber);
                if (existingClient_phonenumber != null)
                {
                    throw new Exception("Broj telefona je unesen");
                }
                else
                {
                    var clients = _mapper.Map<Client>(model);
                    Create(clients);
                    _appDbcontext.SaveChanges();
                    return Result.Ok();
                }
            }
            catch (Exception ex)
            {
                return Result.Fail("Greška: " + ex.Message);
            }



        }
        public async Task<Result<string>> DeleteClient(int id)
        {
            try
            {
                var clients = _appDbContext.Clients.Find(id);
                if (clients == null)
                {
                    throw new KeyNotFoundException($"Klijent s id={id} nije pronađen");
                }


                var relatedOfferRecords = _appDbContext.Offers.Where(o => o.clientid == id);
                var relatedVehicleRecords = _appDbContext.Vehicles.Where(o => o.clientid == id);

                if (relatedVehicleRecords.Any() || relatedOfferRecords.Any())
                {
                    throw new InvalidOperationException("Zapis je povezan s drugim zapisom");
                }

                else
                {

                    Delete(clients);
                    _appDbContext.SaveChanges();
                    return Result.Ok();
                }

            }
            catch (Exception ex)
            {
                return Result.Fail("Greška: " + ex.Message);
            }
        }

        public IEnumerable<Client> GetAllClients()
        {
            try
            {
                return FindAll()
                                                      .OrderBy(ow => ow.id)
                                                      .ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Greška: " + ex.Message);
            }
        }
        public async Task<Result<string>> UpdateClient(int id, ClientUpdate model)
        {
            try
            {
                var clients = _appDbcontext.Clients?.Find(id);
                if (clients == null)
                    throw new KeyNotFoundException($"Klijent s {id} nije pronađen u bazi podataka");
                var existingClients = _appDbcontext.Clients.FirstOrDefault(x => x.firstlastname == model.firstlastname);
                if (existingClients != null && existingClients.id != id)
                    throw new Exception("Ime i prezime već postoji");
                var existingClients_email = _appDbcontext.Clients.FirstOrDefault(x => x.email == model.email);
                if (existingClients_email != null && existingClients_email.id != id)
                    throw new Exception("Email već postoji");
                var existingClients_phonenumber = _appDbcontext.Clients.FirstOrDefault(x => x.phonenumber == model.phonenumber);
                if (existingClients_phonenumber != null && existingClients_phonenumber.id != id)
                    throw new Exception("Broj već postoji");
                var relatedOfferRecords = _appDbcontext.Offers.Where(x => x.clientid == id);
                var relatedVehicleRecords = _appDbcontext.Vehicles.Where(x => x.clientid == id);

                if (relatedVehicleRecords.Any() || relatedOfferRecords.Any())
                    throw new Exception("Vrsta vozila je povezana sa drugom tablicom i ne može se ažurirati");
                clients.firstlastname = model.firstlastname;
                _mapper.Map(model, clients);
                Update(clients);
                _appDbcontext.SaveChanges();
                return Result.Ok();

            }
            catch (Exception ex)
            {
                return Result.Fail("Greška: " + ex.Message);
            }
        }
    }
}
