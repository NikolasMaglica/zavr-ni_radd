

using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AutoMapper;
using FluentResults;
using System.Linq.Expressions;

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
            try
            {
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
            catch (Exception ex)
            {
                throw new Exception("Greška: " + ex.Message);
            }


        }


        public async Task<Result<string>> OfferCreate(OfferCreation model)

        {
            try
            {
                var material = _appDbContext.Materials!.Where(x => x.id == model.materialid).FirstOrDefault();
                if (material!.instockquantity - model!.materialquantity < 0)
                {
                    throw new Exception("Nemate dovoljno materijala na lageru");
                }
                var offers = _mapper.Map<Offer>(model);
                Create(offers);
                _appdbcontext.SaveChanges();
                return Result.Ok();

            }
            catch (Exception ex)
            {
                return Result.Fail("Greška: " + ex.Message);
            }
        }
      
        public async Task<Result<string>> DeleteOffer(int id)
        {
            try
            {
                var offers = _appDbContext.Offers.Find(id);
                if (offers == null)
                {
                    throw new KeyNotFoundException($"Vrsta vozila s id={id} nije pronađena");
                }

                else
                {

                    Delete(offers);
                    _appDbContext.SaveChanges();
                    return Result.Ok();
                }

            }
            catch (Exception ex)
            {
                return Result.Fail("Greška: " + ex.Message);
            }
        }

        public async Task<Result<string>> UpdateOffer(int id, OfferUpdate model)
            {
            try { 
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
                    if (material!.instockquantity - update!.materialquantity < 0)
                    {
                        throw new Exception("Nemate dovoljno materijala na lageru");
                    }
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
                return Result.Ok();

            }
            catch (Exception ex)
            {
                return Result.Fail("Greška: " + ex.Message);
            }

        }
}
}
