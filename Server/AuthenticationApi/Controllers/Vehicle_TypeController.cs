using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Extensions;
using AuthenticationApi.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthenticationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Vehicle_TypeController : Controller
    {
        private readonly AppDbContext _appDbContext;
        private IMapper _mapper;
        private IVehicle_Type _vehicle;
        public Vehicle_TypeController(AppDbContext appDbContext,
                    IMapper mapper, IVehicle_Type ivehicletype)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
            _vehicle = ivehicletype;
        }
        [HttpGet]
        public IActionResult GettAllVehicle_Types()
        {
            var vehicles = _vehicle.GetAllVehicle_Types();    
            return Ok(vehicles);
        }
        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResultDto<string>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResultDto<string>))]
        public async Task<IActionResult> Vehicle_TypeCreate([FromBody] Vehicle_TypeCreation model)
        {
           var result= await _vehicle.CreateVehicle_Types(model);
            var resultDto = result.ToResultDto();

            if (!resultDto.IsSuccess)
            {
                return BadRequest(resultDto);
            }
            return Ok(resultDto);
        }

    

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Vehicle_TypeDelete([FromRoute] int id)
        {
            _vehicle.DeleteVehicle_Types(id);
            return Ok(new { message = "Uspješan ste izbrisali vrstu vozila" });
        }

        [HttpGet]
        [Route("{id:int}")]

        public IActionResult GetVehicle_Type([FromRoute] int id)
        {
            var vehicles = _appDbContext.Vehicle_Types?.FirstOrDefault(x => x.id == id);
            return Ok(vehicles);
        }
        [HttpPut]
        [Route("{id:int}")]
        public IActionResult UpdateVehicle_Type(int id, [FromBody] Vehicle_TypeUpdate model)
        {
            _vehicle.UpdateVehicle_Types(id, model);
            return Ok(new { message = "Podaci o vrsti vozila  su ažurirani" });
        }
    }
}
