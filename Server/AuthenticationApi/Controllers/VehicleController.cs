using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AuthenticationApi.Extensions;
using AuthenticationApi.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthenticationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : Controller
    {
        private readonly AppDbContext _appDbContext;
        private IMapper _mapper;
        private IVehicle _vehicle;
        public VehicleController(AppDbContext appDbContext,
                    IMapper mapper, IVehicle ivehicle)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
            _vehicle = ivehicle;
        }
        [HttpGet]
        public IActionResult GettAllVehicle()
        {
            var vehicles = _vehicle.GetAllVehicle();
            return Ok(vehicles);
        }
        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResultDto<string>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResultDto<string>))]
        public async Task<IActionResult> VehicleCreate([FromBody] VehicleCreation model)
        {
            var result = await _vehicle.CreateVehicle(model);
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

        public async Task<IActionResult> VehicleDelete([FromRoute] int id)
        {
            var result = await _vehicle.DeleteVehicle(id);
            var resultDto = result.ToResultDto();

            if (!resultDto.IsSuccess)
            {
                return BadRequest(resultDto);
            }
            return Ok(resultDto);
        }
    
        [HttpGet]
        [Route("{id:int}")]

        public IActionResult GetVehicle([FromRoute] int id)
        {
            var vehicles = _appDbContext.Vehicles?.FirstOrDefault(x => x.id == id);
            return Ok(vehicles);
        }
      
        [HttpPut]
        [Route("{id:int}")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResultDto<string>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResultDto<string>))]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] VehicleUpdate model)
        {
            var result = await _vehicle.UpdateVehicle(id, model);
            var resultDto = result.ToResultDto();

            if (!resultDto.IsSuccess)
            {
                return BadRequest(resultDto);
            }
            return Ok(resultDto);
        }
    }
}
