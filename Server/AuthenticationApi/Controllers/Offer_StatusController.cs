using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AuthenticationApi.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthenticationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Offer_StatusController : Controller
    {
        private readonly AppDbContext _appDbContext;
        private IMapper _mapper;
        private IOffer_Status _offer_status;
        public Offer_StatusController(AppDbContext appDbContext,
                    IMapper mapper, IOffer_Status offer_status)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
            _offer_status = offer_status;
        }
        [HttpGet]
        public IActionResult GettAllOffer_Statuses()
        {
            var offer_status = _offer_status.GetAllOffer_Status();
            return Ok(offer_status);
        }
        [HttpPost]
        public IActionResult Offer_StatusCreate([FromBody] Offer_StatusCreation model)
        {

            _offer_status.Offer_StatusCreate(model);
            return Ok(new { message = "Uspješan unos novog statusa ponude" });
        }
    }
}
