using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AutoMapper;
using System;

namespace AuthenticationApi.Services
{
    public class Offer_StatusService : Repository<Offer_Status>, IOffer_Status
    {
        private AppDbContext _appdbcontext;
        private readonly IMapper _mapper;
        public Offer_StatusService(AppDbContext appDbContext, IMapper mapper) : base(appDbContext)
        {
            _appdbcontext = appDbContext;
            _mapper = mapper;
        }

        public IEnumerable<Offer_Status> GetAllOffer_Status()
        {
            return FindAll()
                                                .OrderBy(ow => ow.name)
                                                .ToList();
        }

        public void Offer_StatusCreate(Offer_StatusCreation model)
        {
            var offer_status = _mapper.Map<Offer_Status>(model);
            Create(offer_status);
            _appdbcontext.SaveChanges();
        }
    }
}
