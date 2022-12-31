using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthenticationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Service_OfferController : Controller
    {
        private readonly AppDbContext _appDbContext;
        private IMapper _mapper;
        private IService_Offer _service_offer;

        public Service_OfferController(AppDbContext appDbContext,
                    IMapper mapper, IService_Offer service_offer)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
            _service_offer = service_offer;
        }

        [HttpGet]
        public IActionResult GettAllService_Offers()
        {
            var service_offer = _service_offer.GetAllService_Offer();
            return Ok(service_offer);
        }
        [HttpPost]
        public IActionResult Service_OfferCreate([FromBody] Service_OfferCreation model)
        {

            _service_offer.Service_OfferCreate(model);
            return Ok(new { message = "Uspješan unos nove usluge na ponudu" });
        }
        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Service_OfferDelete([FromRoute] int id)
        {
            _service_offer.DeleteService_Offer(id);
            return Ok(new { message = "Uspješan ste izbrisali uslugu na ponudi" });
        }

        [HttpGet]
        [Route("{id:int}")]

        public IActionResult GetService_Offer([FromRoute] int id)
        {
            var service_offer = _appDbContext.Service_offers?.FirstOrDefault(x => x.id == id);
            return Ok(service_offer);
        }
        [HttpPut]
        [Route("{id:int}")]
        public IActionResult UpdateService_Offer(int id, [FromBody] Service_OfferUpdate model)
        {
            _service_offer.UpdateService_Offer(id, model);
            return Ok(new { message = "Podaci o usluzi na ponudi su ažurirani" });
        }
    }
}