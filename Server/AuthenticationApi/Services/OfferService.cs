

using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AutoMapper;


namespace AuthenticationApi.Services
{
    public class OfferService : Repository<Offer>, IOffer
    {
        private AppDbContext _appdbcontext;
        private readonly IMapper _mapper;

        public OfferService(AppDbContext appdbcontext, IMapper mapper) : base(appdbcontext)
        {
            _appdbcontext = appdbcontext;
            _mapper = mapper;
        }


        public IEnumerable<Offer> GetAllOffers()
        {
            // Dohvati sve ponude i sortiraj ih po cijeni
            var offers = FindAll().OrderBy(ow => ow.vehicleid).ToList();

            // Dohvati materijale za svaku ponudu
            foreach (var offer in offers)
            {
                var material = _appDbContext.Materials.Where(x => x.id == offer.materialid).FirstOrDefault();
                var service = _appDbContext.Services.Where(x => x.id == offer.serviceid).FirstOrDefault();


                // Ažuriraj totalPrice ponude s cijenom materijala
                offer.totalPrice = (Convert.ToDecimal(offer.materialquantity) * material.price) + (Convert.ToDecimal(offer.servicequantity) * service.price);
            }

            return offers;
        }

        public void OfferCreate(OfferCreation model)
        {
            var offer = _mapper.Map<Offer>(model);
            Create(offer);
            _appdbcontext.SaveChanges();
        }

        public void DeleteOffer(int id)
        {
            var offers = _appDbContext.Offers?.Find(id);
            if (offers == null)
                throw new KeyNotFoundException($"Ponuda s {id} nije pronađena u bazi podataka");
            Delete(offers);
            _appDbContext.SaveChanges();
        }

        public void UpdateOffer(int id, OfferUpdate model)
        {
            {

                var update = _appDbContext.Offers?.Find(id);
                if (update is null)
                {
                    throw new KeyNotFoundException("Ponuda nije pronađena u bazi podataka");

                }
                _mapper.Map(model, update);
                var material = _appDbContext.Materials!.Where(x => x.id == update.materialid).FirstOrDefault();
               
                var offer = _appDbContext.Offers!.Where(x => x.materialid == material!.id).FirstOrDefault();
                
                if (update.offer_statusid == 1)
                {
                   
                    material!.instockquantity -= update!.materialquantity;
                    _appDbContext.Offers.Update(update);
                    _appDbContext.Materials!.Update(material!);



                    _appDbContext.SaveChanges();
                }
                else
                {
                    _appDbContext.Offers.Update(update);



                    _appDbContext.SaveChanges();
                }

                _appDbContext.SaveChanges();




            }

    }
}
}
