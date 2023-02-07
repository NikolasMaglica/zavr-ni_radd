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
    public class User_VehicleController : Controller
    {
        private readonly AppDbContext _appDbContext;
        private IMapper _mapper;
        private IUser_Vehicle _user_vehicle;

        public User_VehicleController(AppDbContext appDbContext,
                    IMapper mapper, IUser_Vehicle user_vehicle)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
            _user_vehicle = user_vehicle;
        }

        [HttpGet]
        public IActionResult GettAllUser_Vehicles()
        {
            var user_vehicle = _user_vehicle.GetAllUser_Vehicle();
            return Ok(user_vehicle);
        }
     
        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResultDto<string>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResultDto<string>))]
        public async Task<IActionResult> User_VehicleCreate([FromBody] User_VehicleCreation model)
        {
            var result = await _user_vehicle.CreateUser_Vehicle(model);
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

        public async Task<IActionResult> User_VehicleDelete([FromRoute] int id)
        {
            var result = await _user_vehicle.DeleteUser_Vehicle(id);
            var resultDto = result.ToResultDto();

            if (!resultDto.IsSuccess)
            {
                return BadRequest(resultDto);
            }
            return Ok(resultDto);
        }
        [HttpGet]
        [Route("{id:int}")]

        public IActionResult GetUser_Vehicle([FromRoute] int id)
        {
            var user_vehicle = _appDbContext.User_Vehicle?.FirstOrDefault(x => x.id == id);
            return Ok(user_vehicle);
        }
        [HttpPut]
        [Route("{id:int}")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResultDto<string>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ResultDto<string>))]
        public async Task<IActionResult> UpdateUser_Vehicle(int id, [FromBody] User_VehicleUpdate model)
        {
            var result = await _user_vehicle.UpdateUser_Vehicle(id, model);
            var resultDto = result.ToResultDto();

            if (!resultDto.IsSuccess)
            {
                return BadRequest(resultDto);
            }
            return Ok(resultDto);
        }
       
    }
}