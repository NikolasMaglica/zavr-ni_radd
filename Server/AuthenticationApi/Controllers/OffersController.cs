using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AuthenticationApi.Extensions;

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
        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResultDto<string>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResultDto<string>))]
        public async Task<IActionResult> OfferCreate([FromBody] OfferCreation model)
        {
            var result = await _offer.OfferCreate(model);
            var resultDto = result.ToResultDto();

            if (!resultDto.IsSuccess)
            {
                return BadRequest(resultDto);
            }
            return Ok(resultDto);
        }
       
        [HttpDelete]
        [Route("{id:int}")]
        [AllowAnonymous]
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResultDto<string>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResultDto<string>))]

        public async Task<IActionResult> OfferDelete([FromRoute] int id)
        {
            var result = await _offer.DeleteOffer(id);
            var resultDto = result.ToResultDto();

            if (!resultDto.IsSuccess)
            {
                return BadRequest(resultDto);
            }
            return Ok(resultDto);
        }
        [HttpGet]
        [Route("{id:int}")]

        public IActionResult GetOffer([FromRoute] int id)
        {
            var update = _appDbContext.Offers?.Find(id);
            
               
            return Ok(update);
        }


        [HttpPut]
        [Route("{id:int}")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResultDto<string>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResultDto<string>))]
        public async Task<IActionResult> UpdateOffer(int id, [FromBody] OfferUpdate model)
        {
            var result = await _offer.UpdateOffer(id, model);
            var resultDto = result.ToResultDto();

            if (!resultDto.IsSuccess)
            {
                return BadRequest(resultDto);
            }
            return Ok(resultDto);
        }

    }
}
