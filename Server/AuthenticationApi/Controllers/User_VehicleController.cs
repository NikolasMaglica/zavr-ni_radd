using AuthenticationApi.Db;
using AuthenticationApi.Dtos;
using AuthenticationApi.Services;
using AutoMapper;
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
        [HttpPost]
        public IActionResult User_VehicleCreate([FromBody] User_VehicleCreation model)
        {

            _user_vehicle.CreateUser_Vehicle(model);
            return Ok(new { message = "Uspješan unos novog klijentovog vozila" });
        }
        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult User_VehicleDelete([FromRoute] int id)
        {
            _user_vehicle.DeleteUser_Vehicle(id);
            return Ok(new { message = "Uspješan ste izbrisali klijentovo vozilo" });
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
        public IActionResult UpdateUser_Vehicle(int id, [FromBody] User_VehicleUpdate model)
        {
            _user_vehicle.UpdateUser_Vehicle(id, model);
            return Ok(new { message = "Podaci o klijentovom vozilu su ažurirani" });
        }
    }
}