using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

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
            var offers = _appDbContext.Offers?.FirstOrDefault(x => x.id == id);
            return Ok(offers);
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
