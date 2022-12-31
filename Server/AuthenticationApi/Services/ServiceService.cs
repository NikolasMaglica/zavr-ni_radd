using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AutoMapper;
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

        public void DeleteService(int id)
        {
            var servicess = _appDbContext.Services.Find(id);
            if (servicess == null)
                throw new KeyNotFoundException($"Usluga s {id} nije pronađena u bazi podataka");
            Delete(servicess);
            _appDbContext.SaveChanges();
        }

        public IEnumerable<Service> GetAllServices()
        {
            return FindAll()
                                          .OrderBy(ow => ow.price)
                                          .ToList();
        }

        public void ServiceCreate(ServiceCreation model)
        {
            var services = _mapper.Map<Service>(model);
            Create(services);
            _appdbcontext.SaveChanges();
        }

        public void UpdateService(int id, ServiceUpdate model)
        {
            var services = _appdbcontext.Services?.Find(id);
            if (services == null)
                throw new KeyNotFoundException($"Usluga s {id} nije pronađena u bazi podataka");
            services.price = model.price;
            _mapper.Map(model, services);
            Update(services);
            _appdbcontext.SaveChanges();
        }
    }
}
