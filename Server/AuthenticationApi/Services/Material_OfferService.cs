using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AutoMapper;

namespace AuthenticationApi.Services
{
    public class Material_OfferService : Repository<Material_Offer>, IMaterial_Offer
    {
        private AppDbContext _appdbcontext;
        private readonly IMapper _mapper;
        public Material_OfferService(AppDbContext appDbContext, IMapper mapper) : base(appDbContext)
        {
            _appdbcontext = appDbContext;
            _mapper = mapper;
        }

        public void DeleteMaterial_Offer(int id)
        {

            var material = FindByCondition(material_offer => material_offer.id.Equals(id))
                                   .FirstOrDefault();
            if (material == null)
                throw new KeyNotFoundException($"Material s {id} nije pronađena u bazi podataka");
            Delete(material);
            _appDbContext.SaveChanges();
        }

       

        public void Create_Offer_Material(Material_OfferCreation model)
        {
            var materials = _mapper.Map<Material_Offer>(model);
            Create(materials);
            _appdbcontext.SaveChanges();
        }

        public void UpdateMaterial_Offer(int id, Material_OfferUpdate model)
        {
            var offer = _appdbcontext.Material_offer?.Find(id);
            if (offer == null)
                throw new KeyNotFoundException($"Materijal u ponudi s {id} nije pronađena u bazi podataka");
            offer.discount = model.discount;
            _mapper.Map(model, offer);

            Update(offer);
            _appdbcontext.SaveChanges();
        }

        public IEnumerable<Material_Offer> GetAllMaterial_Offer()
        {
            return FindAll()
                                                    .OrderBy(ow => ow.offerid)
                                                    .ToList();
        }
    }
}
