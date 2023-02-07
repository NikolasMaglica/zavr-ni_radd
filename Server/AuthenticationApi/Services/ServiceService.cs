using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AutoMapper;
using FluentResults;
using nikolas.Extensions;
using System;

namespace AuthenticationApi.Services
{
    public class ServiceService : Repository<Service>, IService
    {
        private AppDbContext _appdbcontext;
        private readonly IMapper _mapper;
        public ServiceService(AppDbContext appDbContext, IMapper mapper) : base(appDbContext)
        {
            _appdbcontext = appDbContext;
            _mapper = mapper;
        }

        public async Task<Result<string>> DeleteService(int id)
        {
            try
            {
                var services = _appDbContext.Services.Find(id);
                if (services == null)
                {
                    throw new KeyNotFoundException($"Usluga s id={id} nije pronađena");
                }


                var offers = _appDbContext.Offers.Where(o => o.serviceid == id);
                if (offers.Any())
                {
                    throw new InvalidOperationException("Zapis je povezan s drugim zapisom");
                }

                else
                {

                    Delete(services);
                    _appDbContext.SaveChanges();
                    return Result.Ok();
                }

            }
            catch (Exception ex)
            {
                return Result.Fail("Greška: " + ex.Message);
            }
        }
        public IEnumerable<Service> GetAllServices()
        {
            return FindAll()
                                          .OrderBy(ow => ow.price)
                                          .ToList();
        }

        public async Task<Result<string>> ServiceCreate(ServiceCreation model)

        {
            try
            {
                var existingService = _appdbcontext.Services.FirstOrDefault(x => x.name == model.name);
                if (existingService != null)
                {
                    throw new Exception("Usluga već postoji");
                }
                else
                {
                    var services = _mapper.Map<Service>(model);
                    Create(services);
                    _appdbcontext.SaveChanges();
                    return Result.Ok();
                }
            }
            catch (Exception ex)
            {
                return Result.Fail("Greška: " + ex.Message);
            }



        }
        public async Task<Result<string>> UpdateService(int id, ServiceUpdate model)

        {
            try
            {
                var clients = _appdbcontext.Services?.Find(id);
                if (clients == null)
                    throw new KeyNotFoundException($"Usluga  s {id} nije pronađena u bazi podataka");
                var existingService = _appdbcontext.Services.FirstOrDefault(x => x.name == model.name);
                if (existingService != null && existingService.id != id)
                    throw new Exception("Usluga s tim nazivom već postoji u bazi podataka");
                var relatedRecords = _appdbcontext.Offers.Where(x => x.serviceid == id);
                if (relatedRecords.Any())
                    throw new Exception("Usluga je povezana sa drugom tablicom i ne može se ažurirati");
                clients.name = model.name;
                _mapper.Map(model, clients);
                Update(clients);
                _appdbcontext.SaveChanges();
                return Result.Ok();

            }
            catch (Exception ex)
            {
                return Result.Fail("Greška: " + ex.Message);
            }
        }
    }
}
