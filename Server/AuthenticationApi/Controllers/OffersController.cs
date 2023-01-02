using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace AuthenticationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OffersController : Controller
    {
        private readonly AppDbContext _appDbContext;
        private IMapper _mapper;
        private IOffer _offer;

        public OffersController(AppDbContext appDbContext, 
                    IMapper mapper, IOffer offer)
        {
        _appDbContext = appDbContext;
            _mapper = mapper;
            _offer = offer;
        }

        [HttpGet]
        public IActionResult GettAllOffers()
        {
            var offers = _offer.GetAllOffers();
            return Ok(offers);
        }
        [HttpPost]
        public IActionResult OfferCreate([FromBody] OfferCreation model)
        {

            _offer.OfferCreate(model);
            return Ok(new { message = "Uspješan unos nove ponude" });
        }
        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult OfferDelete([FromRoute] int id)
        {
            _offer.DeleteOffer(id);
            return Ok(new { message = "Uspješan ste izbrisali ponudu" });
        }

        [HttpGet]
        [Route("{id:int}")]

        public IActionResult GetOffer([FromRoute] int id)
        {
            var update = _appDbContext.Offers?.Find(id);
            if (update == null)
            {
                throw new KeyNotFoundException("Ponuda nije pronađena u bazi podataka");
            }

            var material = _appDbContext.Materials.Where(x => x.id == update.materialid).FirstOrDefault();
            if (material == null)
            {
                throw new KeyNotFoundException("Materijal nije pronađena u bazi podataka");
            }

            var offer = _appDbContext.Offers.Where(x => x.materialid == material.id).FirstOrDefault();
            if (offer == null)
            {
                throw new KeyNotFoundException("Ponuda_m nije pronađena u bazi podataka");
            }

            offer.totalPrice = offer.quantity * material.price;

            var serializerOptions = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve
            };

            var serializedObject = JsonSerializer.Serialize(update, serializerOptions);
            return Ok(serializedObject);
        }


        [HttpPut]
        [Route("{id:int}")]
        public IActionResult UpdateOffer(int id, [FromBody] OfferUpdate model)
        {
            _offer.UpdateOffer(id, model);
            return Ok(new { message = "Podaci o ponudi  su ažurirani" });
        }
    }
}
