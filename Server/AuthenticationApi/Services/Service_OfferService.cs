using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AutoMapper;


namespace AuthenticationApi.Services
{
    public class Service_OfferService : Repository<Service_Offer>, IService_Offer
    {
        private AppDbContext _appdbcontext;
        private readonly IMapper _mapper;
        public Service_OfferService(AppDbContext appDbContext, IMapper mapper) : base(appDbContext)
        {
            _appdbcontext = appDbContext;
            _mapper = mapper;
        }

        public void DeleteService_Offer(int id)
        {
            var offers = FindByCondition(service_offer => service_offer.id.Equals(id))
                                      .FirstOrDefault();
            if (offers == null)
                throw new KeyNotFoundException($"Ponuda s {id} nije pronađena u bazi podataka");
            Delete(offers);
            _appDbContext.SaveChanges();
        }

        public IEnumerable<Service_Offer> GetAllService_Offer()
        {
            return FindAll()
                                          .OrderBy(ow => ow.offerid)
                                          .ToList();
        }

        public void Service_OfferCreate(Service_OfferCreation model)
        {
            var services = _mapper.Map<Service_Offer>(model);
            Create(services);
            _appdbcontext.SaveChanges();
        }

        public void UpdateService_Offer(int id, Service_OfferUpdate model)
        {
            var services = FindByCondition(service_offer => service_offer.id.Equals(id))
                           .FirstOrDefault();
            if (services == null)
                throw new KeyNotFoundException($"Usluga na ponudi s {id} nije pronađena u bazi podataka");
            _mapper.Map(model, services);
           _appDbContext.Service_offers.Update(services);
            _appdbcontext.SaveChanges();
        }
    }
}
